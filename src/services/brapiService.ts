
import { toast } from "sonner";

export interface BrapiStock {
  symbol: string;
  shortName: string;
  longName?: string;
  currency: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
}

interface BrapiStockResponse {
  results: BrapiStock[];
  requestedAt: string;
  took: string;
}

const BRAPI_BASE_URL = 'https://brapi.dev/api';

/**
 * Busca ações da Bovespa com base em um termo de pesquisa
 */
export const searchStocks = async (query: string): Promise<BrapiStock[]> => {
  if (!query || query.length < 2) {
    return [];
  }
  
  try {
    const response = await fetch(`${BRAPI_BASE_URL}/quote/list?search=${encodeURIComponent(query)}&sortBy=symbol&sortOrder=asc`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar ações: ${response.status}`);
    }
    
    const data: BrapiStockResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro ao buscar ações:', error);
    toast.error('Não foi possível carregar a lista de ações');
    return [];
  }
};

/**
 * Obtém informações detalhadas de uma ação específica
 */
export const getStockDetails = async (symbol: string): Promise<BrapiStock | null> => {
  if (!symbol) {
    return null;
  }
  
  try {
    const response = await fetch(`${BRAPI_BASE_URL}/quote/${encodeURIComponent(symbol)}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes da ação: ${response.status}`);
    }
    
    const data: BrapiStockResponse = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error('Erro ao buscar detalhes da ação:', error);
    toast.error('Não foi possível carregar os detalhes da ação');
    return null;
  }
};
