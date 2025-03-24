import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import AnimatedTransition from '@/components/ui-elements/AnimatedTransition';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Download,
  PlusCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { searchBovespaStocks } from '@/data/bovespaStocks';
import { Autocomplete, type AutocompleteOption } from '@/components/ui/autocomplete';

const transactions = [
  {
    id: 1,
    date: '2023-07-15',
    type: 'buy',
    asset: 'PETR4',
    name: 'Petrobras PN',
    category: 'Ações',
    quantity: 100,
    price: 32.5,
    total: 3250,
    broker: 'XP Investimentos',
  },
  {
    id: 2,
    date: '2023-07-10',
    type: 'dividend',
    asset: 'ITUB4',
    name: 'Itaú Unibanco PN',
    category: 'Ações',
    quantity: 0,
    price: 0,
    total: 420,
    broker: 'XP Investimentos',
  },
  {
    id: 3,
    date: '2023-07-05',
    type: 'sell',
    asset: 'VALE3',
    name: 'Vale ON',
    category: 'Ações',
    quantity: 50,
    price: 68.2,
    total: 3410,
    broker: 'Clear',
  },
  {
    id: 4,
    date: '2023-06-28',
    type: 'buy',
    asset: 'HGLG11',
    name: 'CSHG Logística FII',
    category: 'FIIs',
    quantity: 20,
    price: 170.5,
    total: 3410,
    broker: 'XP Investimentos',
  },
  {
    id: 5,
    date: '2023-06-20',
    type: 'dividend',
    asset: 'XPLG11',
    name: 'XP Log FII',
    category: 'FIIs',
    quantity: 0,
    price: 0,
    total: 185,
    broker: 'XP Investimentos',
  },
  {
    id: 6,
    date: '2023-06-15',
    type: 'buy',
    asset: 'Tesouro IPCA+ 2026',
    name: 'Tesouro IPCA+ 2026',
    category: 'Renda Fixa',
    quantity: 1,
    price: 3000,
    total: 3000,
    broker: 'Tesouro Direto',
  },
  {
    id: 7,
    date: '2023-06-10',
    type: 'buy',
    asset: 'BTC',
    name: 'Bitcoin',
    category: 'Cripto',
    quantity: 0.05,
    price: 180000,
    total: 9000,
    broker: 'Binance',
  },
  {
    id: 8,
    date: '2023-06-05',
    type: 'sell',
    asset: 'ETH',
    name: 'Ethereum',
    category: 'Cripto',
    quantity: 0.5,
    price: 9800,
    total: 4900,
    broker: 'Binance',
  },
  {
    id: 9,
    date: '2023-05-28',
    type: 'interest',
    asset: 'CDB Banco XYZ',
    name: 'CDB Banco XYZ',
    category: 'Renda Fixa',
    quantity: 0,
    price: 0,
    total: 250,
    broker: 'XP Investimentos',
  },
  {
    id: 10,
    date: '2023-05-20',
    type: 'buy',
    asset: 'LCI Banco ABC',
    name: 'LCI Banco ABC',
    category: 'Renda Fixa',
    quantity: 1,
    price: 5000,
    total: 5000,
    broker: 'Nubank',
  },
];

const typeLabels: Record<string, string> = {
  buy: 'Compra',
  sell: 'Venda',
  dividend: 'Dividendo',
  interest: 'Juros',
};

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [brokerFilter, setBrokerFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  
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

  const categories = Array.from(new Set(transactions.map((t) => t.category)));
  const brokers = Array.from(new Set(transactions.map((t) => t.broker)));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch =
      transaction.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase());

    const typeMatch = typeFilter === 'all' || transaction.type === typeFilter;

    const categoryMatch = categoryFilter === 'all' || transaction.category === categoryFilter;
    
    const brokerMatch = brokerFilter === 'all' || transaction.broker === brokerFilter;
    
    return searchMatch && typeMatch && categoryMatch && brokerMatch;
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case 'sell':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M14.78 11.78a.75.75 0 0 0-1.06 0L10 15.44l-3.72-3.72a.75.75 0 1 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case 'dividend':
      case 'interest':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTransactionType('buy');
      setTransactionDate(format(new Date(), 'yyyy-MM-dd'));
      setCategory('Ações');
      setAssetTickerInput('');
      setAssetName('');
      setQuantity('');
      setPrice('');
      setBroker('XP Investimentos');
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-[280px]">
        <div className="container px-4 py-6 md:px-8 md:py-8">
          <AnimatedTransition variant="fade" className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar transação..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                      <Filter size={16} />
                      Filtros
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-2">
                      <div className="mb-2">
                        <p className="text-xs font-medium mb-1">Tipo</p>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Todos os tipos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos os tipos</SelectItem>
                            <SelectItem value="buy">Compras</SelectItem>
                            <SelectItem value="sell">Vendas</SelectItem>
                            <SelectItem value="dividend">Dividendos</SelectItem>
                            <SelectItem value="interest">Juros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="mb-2">
                        <p className="text-xs font-medium mb-1">Categoria</p>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Todas as categorias" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas as categorias</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium mb-1">Corretora</p>
                        <Select value={brokerFilter} onValueChange={setBrokerFilter}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Todas as corretoras" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas as corretoras</SelectItem>
                            {brokers.map((broker) => (
                              <SelectItem key={broker} value={broker}>
                                {broker}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Download size={16} />
                  Exportar
                </Button>
                
                <Dialog open={open} onOpenChange={handleDialogOpenChange}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-9 gap-1">
                      <PlusCircle size={16} />
                      Nova transação
                    </Button>
                  </DialogTrigger>
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
                      <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                      <Button onClick={() => setOpen(false)}>Salvar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle>Histórico de transações</CardTitle>
                <CardDescription>
                  Visualize todas as suas operações de compra, venda e recebimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center space-x-4">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <div className="font-medium">
                            {transaction.asset} - {transaction.name}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                            <Badge variant="outline" className="text-xs">
                              {typeLabels[transaction.type]}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {transaction.type === 'buy'
                            ? `-${formatCurrency(transaction.total)}`
                            : `+${formatCurrency(transaction.total)}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.broker}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
