
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Mock data
const portfolioData = [
  { name: 'Ações', value: 45000, color: '#0ea5e9' },
  { name: 'Fundos Imobiliários', value: 25000, color: '#8b5cf6' },
  { name: 'Renda Fixa', value: 30000, color: '#22c55e' },
  { name: 'Criptomoedas', value: 10000, color: '#f59e0b' },
];

const performanceData = [
  { date: '01/23', value: 100000 },
  { date: '02/23', value: 98000 },
  { date: '03/23', value: 102000 },
  { date: '04/23', value: 105000 },
  { date: '05/23', value: 108000 },
  { date: '06/23', value: 112000 },
  { date: '07/23', value: 110000 },
  { date: '08/23', value: 115000 },
  { date: '09/23', value: 120000 },
  { date: '10/23', value: 118000 },
  { date: '11/23', value: 122000 },
  { date: '12/23', value: 130000 },
  { date: '01/24', value: 132000 },
  { date: '02/24', value: 135000 },
  { date: '03/24', value: 140000 },
];

const recentTransactions = [
  {
    id: 1,
    type: 'buy',
    asset: 'PETR4',
    name: 'Petrobras PN',
    date: '2023-07-15',
    quantity: 100,
    price: 32.5,
    total: 3250,
  },
  {
    id: 2,
    type: 'dividend',
    asset: 'ITUB4',
    name: 'Itaú Unibanco PN',
    date: '2023-07-10',
    quantity: 0,
    price: 0,
    total: 420,
  },
  {
    id: 3,
    type: 'sell',
    asset: 'VALE3',
    name: 'Vale ON',
    date: '2023-07-05',
    quantity: 50,
    price: 68.2,
    total: 3410,
  },
  {
    id: 4,
    type: 'buy',
    asset: 'HGLG11',
    name: 'CSHG Logística FII',
    date: '2023-06-28',
    quantity: 20,
    price: 170.5,
    total: 3410,
  },
  {
    id: 5,
    type: 'dividend',
    asset: 'XPLG11',
    name: 'XP Log FII',
    date: '2023-06-20',
    quantity: 0,
    price: 0,
    total: 185,
  },
];

const Dashboard = () => {
  const [period, setPeriod] = useState('year');

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-[280px]">
        <div className="container px-4 py-6 md:px-8 md:py-8">
          <AnimatedTransition variant="fade" className="space-y-6">
            <div className="flex flex-col justify-between md:flex-row md:items-center">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                  <SelectItem value="all">Todo o período</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Valor total</CardDescription>
                  <CardTitle className="text-2xl">{formatCurrency(totalValue)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-green-500">+5.4%</span> desde o mês passado
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Rentabilidade (mês)</CardDescription>
                  <CardTitle className="text-2xl">+2.7%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-green-500">+1.2%</span> vs. CDI
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Rentabilidade (ano)</CardDescription>
                  <CardTitle className="text-2xl">+15.3%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-green-500">+3.8%</span> vs. Ibovespa
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Proventos (ano)</CardDescription>
                  <CardTitle className="text-2xl">{formatCurrency(7850)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-green-500">+12.4%</span> desde o ano passado
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="glass-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Evolução do patrimônio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={performanceData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis
                          tickFormatter={(value) => 
                            new Intl.NumberFormat('pt-BR', {
                              notation: 'compact',
                              compactDisplay: 'short',
                              currency: 'BRL',
                            }).format(value)
                          }
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip
                          formatter={(value) => [formatCurrency(value as number), 'Valor']}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#0ea5e9"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Alocação por classe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [formatCurrency(value as number), 'Valor']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Transações recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center space-x-4">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <div className="font-medium">
                              {transaction.asset} - {transaction.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={cn(
                              'font-medium',
                              transaction.type === 'buy'
                                ? 'text-red-600'
                                : transaction.type === 'sell'
                                ? 'text-green-600'
                                : 'text-blue-600'
                            )}
                          >
                            {transaction.type === 'buy'
                              ? `-${formatCurrency(transaction.total)}`
                              : `+${formatCurrency(transaction.total)}`}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.type === 'buy' || transaction.type === 'sell'
                              ? `${transaction.quantity} ${
                                  transaction.quantity > 1 ? 'unidades' : 'unidade'
                                }`
                              : 'Provento'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
