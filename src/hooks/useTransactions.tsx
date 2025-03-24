
import { useState } from 'react';

// Transaction data type
export type Transaction = {
  id: number;
  date: string;
  type: string;
  asset: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  broker: string;
};

// Mock data for transactions
const mockTransactions: Transaction[] = [
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

export const typeLabels: Record<string, string> = {
  buy: 'Compra',
  sell: 'Venda',
  dividend: 'Dividendo',
  interest: 'Juros',
};

export const useTransactions = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);

  // Get unique categories and brokers for filters
  const categories = Array.from(new Set(transactions.map(t => t.category)));
  const brokers = Array.from(new Set(transactions.map(t => t.broker)));

  // Filter transactions based on search query and filters
  const filterTransactions = (
    searchQuery: string,
    typeFilter: string,
    categoryFilter: string,
    brokerFilter: string
  ) => {
    return transactions.filter(transaction => {
      const searchMatch =
        transaction.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.name.toLowerCase().includes(searchQuery.toLowerCase());

      const typeMatch = typeFilter === 'all' || transaction.type === typeFilter;

      const categoryMatch = categoryFilter === 'all' || transaction.category === categoryFilter;
      
      const brokerMatch = brokerFilter === 'all' || transaction.broker === brokerFilter;
      
      return searchMatch && typeMatch && categoryMatch && brokerMatch;
    });
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    // Na versão atual, apenas simulamos a adição - você pode implementar
    // a lógica real de adição ao banco de dados ou estado quando necessário
    console.log('Adicionando transação:', transaction);
  };

  return {
    transactions,
    categories,
    brokers,
    typeLabels,
    filterTransactions,
    addTransaction
  };
};
