
import { useState } from 'react';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for stocks
const stocks = [
  {
    id: 1,
    ticker: 'PETR4',
    name: 'Petrobras PN',
    sector: 'Petróleo e Gás',
    quantity: 100,
    averagePrice: 32.5,
    currentPrice: 36.8,
    totalInvested: 3250,
    currentValue: 3680,
    change: 13.23,
  },
  {
    id: 2,
    ticker: 'VALE3',
    name: 'Vale ON',
    sector: 'Mineração',
    quantity: 150,
    averagePrice: 68.2,
    currentPrice: 65.4,
    totalInvested: 10230,
    currentValue: 9810,
    change: -4.11,
  },
  {
    id: 3,
    ticker: 'ITUB4',
    name: 'Itaú Unibanco PN',
    sector: 'Financeiro',
    quantity: 200,
    averagePrice: 24.8,
    currentPrice: 28.5,
    totalInvested: 4960,
    currentValue: 5700,
    change: 14.92,
  },
  {
    id: 4,
    ticker: 'WEGE3',
    name: 'WEG ON',
    sector: 'Bens de Capital',
    quantity: 80,
    averagePrice: 36.4,
    currentPrice: 40.2,
    totalInvested: 2912,
    currentValue: 3216,
    change: 10.44,
  },
  {
    id: 5,
    ticker: 'BBDC4',
    name: 'Bradesco PN',
    sector: 'Financeiro',
    quantity: 300,
    averagePrice: 16.8,
    currentPrice: 15.9,
    totalInvested: 5040,
    currentValue: 4770,
    change: -5.36,
  },
];

// Mock data for REITs (FIIs)
const reits = [
  {
    id: 1,
    ticker: 'HGLG11',
    name: 'CSHG Logística FII',
    segment: 'Logística',
    quantity: 50,
    averagePrice: 170.5,
    currentPrice: 175.8,
    totalInvested: 8525,
    currentValue: 8790,
    change: 3.11,
    dividendYield: 7.2,
  },
  {
    id: 2,
    ticker: 'XPLG11',
    name: 'XP Log FII',
    segment: 'Logística',
    quantity: 65,
    averagePrice: 98.2,
    currentPrice: 101.5,
    totalInvested: 6383,
    currentValue: 6597.5,
    change: 3.36,
    dividendYield: 8.4,
  },
  {
    id: 3,
    ticker: 'KNRI11',
    name: 'Kinea Renda Imobiliária FII',
    segment: 'Híbrido',
    quantity: 40,
    averagePrice: 138.5,
    currentPrice: 132.8,
    totalInvested: 5540,
    currentValue: 5312,
    change: -4.12,
    dividendYield: 6.8,
  },
  {
    id: 4,
    ticker: 'MXRF11',
    name: 'Maxi Renda FII',
    segment: 'Híbrido',
    quantity: 500,
    averagePrice: 10.2,
    currentPrice: 10.8,
    totalInvested: 5100,
    currentValue: 5400,
    change: 5.88,
    dividendYield: 9.2,
  },
];

// Mock data for fixed income
const fixedIncome = [
  {
    id: 1,
    name: 'CDB Banco XYZ',
    type: 'CDB',
    rate: '118% CDI',
    invested: 10000,
    currentValue: 10850,
    maturityDate: '2024-12-15',
    change: 8.5,
  },
  {
    id: 2,
    name: 'LCI Banco ABC',
    type: 'LCI',
    rate: '97% CDI',
    invested: 5000,
    currentValue: 5320,
    maturityDate: '2025-06-30',
    change: 6.4,
  },
  {
    id: 3,
    name: 'Tesouro IPCA+ 2026',
    type: 'Tesouro Direto',
    rate: 'IPCA + 5.2%',
    invested: 15000,
    currentValue: 16250,
    maturityDate: '2026-08-15',
    change: 8.33,
  },
  {
    id: 4,
    name: 'Debênture XPTO',
    type: 'Debênture',
    rate: 'IPCA + 6.5%',
    invested: 8000,
    currentValue: 8720,
    maturityDate: '2027-03-20',
    change: 9.0,
  },
];

// Mock data for crypto
const crypto = [
  {
    id: 1,
    ticker: 'BTC',
    name: 'Bitcoin',
    quantity: 0.12,
    averagePrice: 180000,
    currentPrice: 210000,
    totalInvested: 21600,
    currentValue: 25200,
    change: 16.67,
  },
  {
    id: 2,
    ticker: 'ETH',
    name: 'Ethereum',
    quantity: 1.5,
    averagePrice: 9800,
    currentPrice: 11200,
    totalInvested: 14700,
    currentValue: 16800,
    change: 14.29,
  },
  {
    id: 3,
    ticker: 'SOL',
    name: 'Solana',
    quantity: 8,
    averagePrice: 520,
    currentPrice: 480,
    totalInvested: 4160,
    currentValue: 3840,
    change: -7.69,
  },
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-[280px]">
        <div className="container px-4 py-6 md:px-8 md:py-8">
          <AnimatedTransition variant="fade" className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h1 className="text-3xl font-bold tracking-tight">Carteira</h1>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar ativo..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      Ações
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Comprar</DropdownMenuItem>
                    <DropdownMenuItem>Vender</DropdownMenuItem>
                    <DropdownMenuItem>Registrar provento</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="stocks">Ações</TabsTrigger>
                <TabsTrigger value="reits">FIIs</TabsTrigger>
                <TabsTrigger value="fixedIncome">Renda Fixa</TabsTrigger>
                <TabsTrigger value="crypto">Cripto</TabsTrigger>
              </TabsList>

              <TabsContent value="stocks" className="mt-6">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle>Ações</CardTitle>
                    <CardDescription>
                      Gerencie sua carteira de ações brasileiras
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ativo</TableHead>
                            <TableHead>Setor</TableHead>
                            <TableHead>Qtde.</TableHead>
                            <TableHead>Preço médio</TableHead>
                            <TableHead>Preço atual</TableHead>
                            <TableHead>Total investido</TableHead>
                            <TableHead>Valor atual</TableHead>
                            <TableHead>Var. (%)</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stocks
                            .filter(
                              (stock) =>
                                stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                stock.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((stock) => (
                              <TableRow key={stock.id}>
                                <TableCell className="font-medium">
                                  <div>{stock.ticker}</div>
                                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{stock.sector}</Badge>
                                </TableCell>
                                <TableCell>{stock.quantity}</TableCell>
                                <TableCell>{formatCurrency(stock.averagePrice)}</TableCell>
                                <TableCell>{formatCurrency(stock.currentPrice)}</TableCell>
                                <TableCell>{formatCurrency(stock.totalInvested)}</TableCell>
                                <TableCell>{formatCurrency(stock.currentValue)}</TableCell>
                                <TableCell>
                                  <div
                                    className={
                                      stock.change > 0 ? 'text-green-600' : 'text-red-600'
                                    }
                                  >
                                    <div className="flex items-center">
                                      {stock.change > 0 ? (
                                        <ArrowUp className="mr-1 h-4 w-4" />
                                      ) : (
                                        <ArrowDown className="mr-1 h-4 w-4" />
                                      )}
                                      {Math.abs(stock.change).toFixed(2)}%
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <ChevronDown size={16} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Comprar mais</DropdownMenuItem>
                                      <DropdownMenuItem>Vender</DropdownMenuItem>
                                      <DropdownMenuItem>Detalhes</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reits" className="mt-6">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle>Fundos Imobiliários</CardTitle>
                    <CardDescription>
                      Gerencie sua carteira de FIIs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ativo</TableHead>
                            <TableHead>Segmento</TableHead>
                            <TableHead>Qtde.</TableHead>
                            <TableHead>Preço médio</TableHead>
                            <TableHead>Preço atual</TableHead>
                            <TableHead>Total investido</TableHead>
                            <TableHead>Valor atual</TableHead>
                            <TableHead>Dividend Yield</TableHead>
                            <TableHead>Var. (%)</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reits
                            .filter(
                              (reit) =>
                                reit.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                reit.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((reit) => (
                              <TableRow key={reit.id}>
                                <TableCell className="font-medium">
                                  <div>{reit.ticker}</div>
                                  <div className="text-sm text-muted-foreground">{reit.name}</div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{reit.segment}</Badge>
                                </TableCell>
                                <TableCell>{reit.quantity}</TableCell>
                                <TableCell>{formatCurrency(reit.averagePrice)}</TableCell>
                                <TableCell>{formatCurrency(reit.currentPrice)}</TableCell>
                                <TableCell>{formatCurrency(reit.totalInvested)}</TableCell>
                                <TableCell>{formatCurrency(reit.currentValue)}</TableCell>
                                <TableCell>{reit.dividendYield.toFixed(2)}%</TableCell>
                                <TableCell>
                                  <div
                                    className={
                                      reit.change > 0 ? 'text-green-600' : 'text-red-600'
                                    }
                                  >
                                    <div className="flex items-center">
                                      {reit.change > 0 ? (
                                        <ArrowUp className="mr-1 h-4 w-4" />
                                      ) : (
                                        <ArrowDown className="mr-1 h-4 w-4" />
                                      )}
                                      {Math.abs(reit.change).toFixed(2)}%
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <ChevronDown size={16} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Comprar mais</DropdownMenuItem>
                                      <DropdownMenuItem>Vender</DropdownMenuItem>
                                      <DropdownMenuItem>Registrar provento</DropdownMenuItem>
                                      <DropdownMenuItem>Detalhes</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fixedIncome" className="mt-6">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle>Renda Fixa</CardTitle>
                    <CardDescription>
                      Gerencie seus investimentos em renda fixa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Taxa</TableHead>
                            <TableHead>Valor investido</TableHead>
                            <TableHead>Valor atual</TableHead>
                            <TableHead>Vencimento</TableHead>
                            <TableHead>Rentabilidade</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fixedIncome
                            .filter((item) =>
                              item.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{item.type}</Badge>
                                </TableCell>
                                <TableCell>{item.rate}</TableCell>
                                <TableCell>{formatCurrency(item.invested)}</TableCell>
                                <TableCell>{formatCurrency(item.currentValue)}</TableCell>
                                <TableCell>
                                  {new Date(item.maturityDate).toLocaleDateString('pt-BR')}
                                </TableCell>
                                <TableCell>
                                  <div className="text-green-600">
                                    <div className="flex items-center">
                                      <ArrowUp className="mr-1 h-4 w-4" />
                                      {item.change.toFixed(2)}%
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <ChevronDown size={16} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Resgatar</DropdownMenuItem>
                                      <DropdownMenuItem>Detalhes</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="crypto" className="mt-6">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle>Criptomoedas</CardTitle>
                    <CardDescription>
                      Gerencie seus investimentos em criptomoedas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ativo</TableHead>
                            <TableHead>Qtde.</TableHead>
                            <TableHead>Preço médio</TableHead>
                            <TableHead>Preço atual</TableHead>
                            <TableHead>Total investido</TableHead>
                            <TableHead>Valor atual</TableHead>
                            <TableHead>Var. (%)</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {crypto
                            .filter(
                              (coin) =>
                                coin.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                coin.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((coin) => (
                              <TableRow key={coin.id}>
                                <TableCell className="font-medium">
                                  <div>{coin.ticker}</div>
                                  <div className="text-sm text-muted-foreground">{coin.name}</div>
                                </TableCell>
                                <TableCell>{coin.quantity}</TableCell>
                                <TableCell>{formatCurrency(coin.averagePrice)}</TableCell>
                                <TableCell>{formatCurrency(coin.currentPrice)}</TableCell>
                                <TableCell>{formatCurrency(coin.totalInvested)}</TableCell>
                                <TableCell>{formatCurrency(coin.currentValue)}</TableCell>
                                <TableCell>
                                  <div
                                    className={
                                      coin.change > 0 ? 'text-green-600' : 'text-red-600'
                                    }
                                  >
                                    <div className="flex items-center">
                                      {coin.change > 0 ? (
                                        <ArrowUp className="mr-1 h-4 w-4" />
                                      ) : (
                                        <ArrowDown className="mr-1 h-4 w-4" />
                                      )}
                                      {Math.abs(coin.change).toFixed(2)}%
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <ChevronDown size={16} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Comprar mais</DropdownMenuItem>
                                      <DropdownMenuItem>Vender</DropdownMenuItem>
                                      <DropdownMenuItem>Detalhes</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
