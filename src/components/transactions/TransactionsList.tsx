
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Avatar,
} from '@heroui/react';

type Transaction = {
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

interface TransactionsListProps {
  transactions: Transaction[];
  typeLabels: Record<string, string>;
}

const TransactionsList = ({ transactions, typeLabels }: TransactionsListProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'buy':
        return "success";
      case 'sell':
        return "danger";
      case 'dividend':
      case 'interest':
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Histórico de transações</h3>
        <p className="text-default-500">
          Visualize todas as suas operações de compra, venda e recebimentos
        </p>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg p-3 transition-colors hover:bg-default-100 dark:hover:bg-default-50/10"
            >
              <div className="flex items-center gap-4">
                <Avatar
                  radius="lg"
                  size="md"
                  color={getTransactionColor(transaction.type)}
                  isBordered
                  fallback={transaction.asset.charAt(0)}
                />
                <div>
                  <div className="font-medium">
                    {transaction.asset} - {transaction.name}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-default-500">
                    <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                    <Chip 
                      size="sm" 
                      color={getTransactionColor(transaction.type)}
                      variant="flat"
                      className="text-xs"
                    >
                      {typeLabels[transaction.type]}
                    </Chip>
                    <Chip 
                      size="sm" 
                      variant="flat"
                      className="text-xs"
                    >
                      {transaction.category}
                    </Chip>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${transaction.type === 'buy' ? 'text-danger' : 'text-success'}`}>
                  {transaction.type === 'buy'
                    ? `-${formatCurrency(transaction.total)}`
                    : `+${formatCurrency(transaction.total)}`}
                </div>
                <div className="text-sm text-default-500">
                  {transaction.broker}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionsList;
