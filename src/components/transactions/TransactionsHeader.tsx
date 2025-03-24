
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal, 
  ModalContent,
} from '@heroui/react';
import {
  Search,
  Filter,
  Download,
  PlusCircle,
} from 'lucide-react';

interface TransactionsHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  brokerFilter: string;
  setBrokerFilter: (value: string) => void;
  categories: string[];
  brokers: string[];
  openDialog: () => void;
}

const TransactionsHeader = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  brokerFilter,
  setBrokerFilter,
  categories,
  brokers,
  openDialog,
}: TransactionsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Buscar transação..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="text-default-300" size={18} />}
          className="w-full sm:w-[200px]"
        />
        
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="flat" 
              size="sm" 
              startContent={<Filter size={16} />}
            >
              Filtros
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" aria-label="Filtros de transações" className="p-4 w-72">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Tipo</h4>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" size="sm" className="w-full justify-between">
                      {typeFilter === 'all' ? 'Todos os tipos' : 
                       typeFilter === 'buy' ? 'Compras' :
                       typeFilter === 'sell' ? 'Vendas' :
                       typeFilter === 'dividend' ? 'Dividendos' : 'Juros'}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    onAction={(key) => setTypeFilter(key as string)}
                    selectedKeys={[typeFilter]}
                  >
                    <DropdownItem key="all">Todos os tipos</DropdownItem>
                    <DropdownItem key="buy">Compras</DropdownItem>
                    <DropdownItem key="sell">Vendas</DropdownItem>
                    <DropdownItem key="dividend">Dividendos</DropdownItem>
                    <DropdownItem key="interest">Juros</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Categoria</h4>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" size="sm" className="w-full justify-between">
                      {categoryFilter === 'all' ? 'Todas as categorias' : categoryFilter}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    onAction={(key) => setCategoryFilter(key as string)}
                    selectedKeys={[categoryFilter]}
                  >
                    <DropdownItem key="all">Todas as categorias</DropdownItem>
                    {categories.map((category) => (
                      <DropdownItem key={category}>{category}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Corretora</h4>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" size="sm" className="w-full justify-between">
                      {brokerFilter === 'all' ? 'Todas as corretoras' : brokerFilter}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    onAction={(key) => setBrokerFilter(key as string)}
                    selectedKeys={[brokerFilter]}
                  >
                    <DropdownItem key="all">Todas as corretoras</DropdownItem>
                    {brokers.map((broker) => (
                      <DropdownItem key={broker}>{broker}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </DropdownMenu>
        </Dropdown>
        
        <Button 
          variant="flat" 
          size="sm" 
          startContent={<Download size={16} />}
        >
          Exportar
        </Button>
        
        <Button 
          color="primary" 
          size="sm" 
          startContent={<PlusCircle size={16} />}
          onClick={openDialog}
        >
          Nova transação
        </Button>
      </div>
    </div>
  );
};

export default TransactionsHeader;
