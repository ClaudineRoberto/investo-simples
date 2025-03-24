
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import AnimatedTransition from '@/components/ui-elements/AnimatedTransition';
import TransactionsHeader from '@/components/transactions/TransactionsHeader';
import TransactionsList from '@/components/transactions/TransactionsList';
import AddTransactionDialog from '@/components/transactions/AddTransactionDialog';
import { useTransactions, typeLabels } from '@/hooks/useTransactions';

const Transactions = () => {
  const { categories, brokers, filterTransactions } = useTransactions();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [brokerFilter, setBrokerFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  
  const filteredTransactions = filterTransactions(
    searchQuery,
    typeFilter,
    categoryFilter,
    brokerFilter
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-[280px]">
        <div className="container py-6 md:py-8">
          <AnimatedTransition variant="fade" className="space-y-6">
            <TransactionsHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              brokerFilter={brokerFilter}
              setBrokerFilter={setBrokerFilter}
              categories={categories}
              brokers={brokers}
              openDialog={() => setOpen(true)}
            />

            <TransactionsList 
              transactions={filteredTransactions} 
              typeLabels={typeLabels}
            />
            
            <AddTransactionDialog 
              open={open} 
              onOpenChange={setOpen} 
            />
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
