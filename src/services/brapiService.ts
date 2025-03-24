
import { toast } from "sonner";

export interface BrapiStock {
  symbol?: string;
  stock?: string;  // API returns either symbol or stock
  shortName?: string;
  name?: string;   // API returns either shortName or name
  longName?: string;
  currency?: string;
  regularMarketPrice?: number;
  close?: number;  // For list endpoint
  regularMarketChangePercent?: number;
  change?: number; // For list endpoint
  volume?: number;
  market_cap?: number;
  sector?: string;
  type?: string;
  logo?: string;
}

interface BrapiStockResponse {
  results?: BrapiStock[];
  stocks?: BrapiStock[];  // For list endpoint
  requestedAt?: string;
  took?: string;
}

const BRAPI_BASE_URL = 'https://brapi.dev/api';
const BRAPI_TOKEN = '5xhQLh548C4SKLu6g4giwz';

/**
 * Busca ações da Bovespa com base em um termo de pesquisa
 */
export const searchStocks = async (query: string): Promise<BrapiStock[]> => {
  if (!query || query.length < 2) {
    return [];
  }
  
  try {
    const response = await fetch(
      `${BRAPI_BASE_URL}/quote/list?search=${encodeURIComponent(query)}&sortBy=symbol&sortOrder=asc&token=${BRAPI_TOKEN}`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar ações: ${response.status}`);
    }
    
    const data: BrapiStockResponse = await response.json();
    
    // API retorna dados no campo "stocks" no endpoint list
    const stocks = data.stocks || [];
    console.log('Search stocks result:', stocks);
    
    // Normaliza os dados para manter compatibilidade com o restante da aplicação
    return stocks.map(stock => ({
      symbol: stock.stock,
      shortName: stock.name,
      currency: 'BRL',
      regularMarketPrice: stock.close,
      regularMarketChangePercent: stock.change,
      sector: stock.sector,
      type: stock.type,
      logo: stock.logo
    }));
  } catch (error) {
    console.error('Erro ao buscar ações:', error);
    toast.error('Não foi possível carregar a lista de ações');
    return [];
  }
};

/**
 * Busca ações por categoria (ações, FIIs, BDRs)
 */
export const searchStocksByType = async (type: string, query: string = ""): Promise<BrapiStock[]> => {
  try {
    if (query && query.length < 2) {
      return [];
    }
    
    let url = `${BRAPI_BASE_URL}/quote/list?token=${BRAPI_TOKEN}`;
    
    if (type) {
      url += `&type=${type}`;
    }
    
    if (query && query.length >= 2) {
      url += `&search=${encodeURIComponent(query)}`;
    }
    
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar ativos do tipo ${type}: ${response.status}`);
    }
    
    const data: BrapiStockResponse = await response.json();
    console.log('API response:', data);
    
    // API retorna dados no campo "stocks" no endpoint list
    const stocks = data.stocks || [];
    
    // Normaliza os dados para manter compatibilidade com o restante da aplicação
    return stocks.map(stock => ({
      symbol: stock.stock,
      shortName: stock.name,
      currency: 'BRL',
      regularMarketPrice: stock.close,
      regularMarketChangePercent: stock.change,
      sector: stock.sector,
      type: stock.type,
      logo: stock.logo
    }));
  } catch (error) {
    console.error(`Erro ao buscar ativos do tipo ${type}:`, error);
    toast.error(`Não foi possível carregar a lista de ${type === 'stock' ? 'ações' : type === 'fund' ? 'FIIs' : 'BDRs'}`);
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
    const response = await fetch(`${BRAPI_BASE_URL}/quote/${encodeURIComponent(symbol)}?token=${BRAPI_TOKEN}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes da ação: ${response.status}`);
    }
    
    const data: BrapiStockResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return null;
    }
    
    const stock = data.results[0];
    
    // Normaliza os dados para manter compatibilidade
    return {
      symbol: stock.symbol,
      shortName: stock.shortName || stock.longName,
      longName: stock.longName,
      currency: stock.currency || 'BRL',
      regularMarketPrice: stock.regularMarketPrice,
      regularMarketChangePercent: stock.regularMarketChangePercent
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes da ação:', error);
    toast.error('Não foi possível carregar os detalhes da ação');
    return null;
  }
};
