
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Autocomplete, type AutocompleteOption } from '@/components/ui/autocomplete';
import { searchStocks, searchStocksByType, type BrapiStock } from '@/services/brapiService';
import { toast } from 'sonner';
import { categoryTypes } from '@/hooks/useTransactions';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTransactionDialog = ({ open, onOpenChange }: AddTransactionDialogProps) => {
  const [transactionType, setTransactionType] = useState('buy');
  const [transactionDate, setTransactionDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [category, setCategory] = useState('Ações');
  const [assetTickerInput, setAssetTickerInput] = useState('');
  const [assetName, setAssetName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [broker, setBroker] = useState('XP Investimentos');
  
  const [stockOptions, setStockOptions] = useState<AutocompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      if (assetTickerInput.length >= 2) {
        setIsLoading(true);
        try {
          let assets: BrapiStock[] = [];
          
          let apiType = '';
          if (category === 'Ações') {
            apiType = 'stock';
          } else if (category === 'FIIs') {
            apiType = 'fund';
          } else if (category === 'BDRs') {
            apiType = 'bdr';
          }
          
          if (apiType) {
            console.log(`Searching for assets of type ${apiType} with query ${assetTickerInput}`);
            assets = await searchStocksByType(apiType, assetTickerInput);
          } else {
            // For other categories or general search
            console.log(`General search for assets with query ${assetTickerInput}`);
            assets = await searchStocks(assetTickerInput);
          }
          
          console.log('Assets found:', assets);
          
          setStockOptions(
            assets.map(asset => ({
              value: asset.symbol || '',
              label: asset.symbol || '',
              detail: asset.shortName || ''
            }))
          );
        } catch (error) {
          console.error('Erro ao buscar ativos:', error);
          setStockOptions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setStockOptions([]);
      }
    };

    // Usar um timeout para evitar muitas chamadas API durante a digitação
    const timeoutId = setTimeout(() => {
      fetchAssets();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [assetTickerInput, category]);

  const handleStockSelect = (option: AutocompleteOption) => {
    setAssetTickerInput(option.value);
    setAssetName(option.detail || '');
  };
  
  const handleDialogOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };
  
  const resetForm = () => {
    setTransactionType('buy');
    setTransactionDate(format(new Date(), 'yyyy-MM-dd'));
    setCategory('Ações');
    setAssetTickerInput('');
    setAssetName('');
    setQuantity('');
    setPrice('');
    setBroker('XP Investimentos');
    setStockOptions([]);
  };

  const handleSave = () => {
    // Verificações básicas
    if (!assetTickerInput || !assetName) {
      toast.error('Por favor, informe o ativo');
      return;
    }

    if (transactionType !== 'dividend' && transactionType !== 'interest' && (!quantity || !price)) {
      toast.error('Por favor, informe a quantidade e o preço');
      return;
    }

    // Aqui você poderia implementar a lógica para salvar a transação
    toast.success('Transação registrada com sucesso!');
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription>
            Registre uma nova transação em sua carteira.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select 
                value={transactionType} 
                onValueChange={setTransactionType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Compra</SelectItem>
                  <SelectItem value="sell">Venda</SelectItem>
                  <SelectItem value="dividend">Dividendo</SelectItem>
                  <SelectItem value="interest">Juros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>
              <Input 
                type="date" 
                value={transactionDate} 
                onChange={(e) => setTransactionDate(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ações">Ações</SelectItem>
                  <SelectItem value="FIIs">FIIs</SelectItem>
                  <SelectItem value="Renda Fixa">Renda Fixa</SelectItem>
                  <SelectItem value="Cripto">Cripto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Ativo</label>
              {category === 'Ações' || category === 'FIIs' ? (
                <Autocomplete 
                  options={stockOptions}
                  value={assetTickerInput}
                  onChange={setAssetTickerInput}
                  onOptionSelect={handleStockSelect}
                  placeholder={isLoading ? "Carregando..." : `Digite o código do ${category === 'Ações' ? 'ativo' : 'fundo'}`}
                  emptyMessage={`Nenhum ${category === 'Ações' ? 'ativo' : 'fundo'} encontrado`}
                  isLoading={isLoading}
                />
              ) : (
                <Input 
                  placeholder={category === 'Cripto' ? "BTC" : "Nome do ativo"} 
                  value={assetTickerInput}
                  onChange={(e) => setAssetTickerInput(e.target.value)}
                />
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do ativo</label>
            <Input 
              placeholder="Petrobras PN" 
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantidade</label>
              <Input 
                type="number" 
                placeholder="100" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={transactionType === 'dividend' || transactionType === 'interest'}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Preço unitário</label>
              <Input 
                type="number" 
                step="0.01" 
                placeholder="32.50" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={transactionType === 'dividend' || transactionType === 'interest'}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Corretora</label>
            <Select 
              value={broker} 
              onValueChange={setBroker}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a corretora" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XP Investimentos">XP Investimentos</SelectItem>
                <SelectItem value="Clear">Clear</SelectItem>
                <SelectItem value="Nubank">Nubank</SelectItem>
                <SelectItem value="Binance">Binance</SelectItem>
                <SelectItem value="Tesouro Direto">Tesouro Direto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
