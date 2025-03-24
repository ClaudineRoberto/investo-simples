
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="h-9 gap-1" onClick={openDialog}>
              <PlusCircle size={16} />
              Nova transação
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
};

export default TransactionsHeader;
