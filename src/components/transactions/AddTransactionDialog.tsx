
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
import { searchBovespaStocks } from '@/data/bovespaStocks';

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

  useEffect(() => {
    if (assetTickerInput.length > 1) {
      const results = searchBovespaStocks(assetTickerInput);
      setStockOptions(
        results.map(stock => ({
          value: stock.ticker,
          label: stock.ticker,
          detail: stock.name
        }))
      );
    } else {
      setStockOptions([]);
    }
  }, [assetTickerInput]);

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
              {category === 'Ações' ? (
                <Autocomplete 
                  options={stockOptions}
                  value={assetTickerInput}
                  onChange={setAssetTickerInput}
                  onOptionSelect={handleStockSelect}
                  placeholder="Digite o ticker (ex: PETR4)"
                  emptyMessage="Nenhum ativo encontrado"
                />
              ) : (
                <Input 
                  placeholder="PETR4" 
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
          <Button onClick={() => onOpenChange(false)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
