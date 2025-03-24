
// Mock data for Brazilian stocks (Bovespa)
export const bovespaStocks = [
  { ticker: "PETR3", name: "Petrobras ON", sector: "Petróleo e Gás" },
  { ticker: "PETR4", name: "Petrobras PN", sector: "Petróleo e Gás" },
  { ticker: "VALE3", name: "Vale ON", sector: "Mineração" },
  { ticker: "ITUB4", name: "Itaú Unibanco PN", sector: "Financeiro" },
  { ticker: "BBDC4", name: "Bradesco PN", sector: "Financeiro" },
  { ticker: "BBAS3", name: "Banco do Brasil ON", sector: "Financeiro" },
  { ticker: "ABEV3", name: "Ambev ON", sector: "Bebidas" },
  { ticker: "MGLU3", name: "Magazine Luiza ON", sector: "Varejo" },
  { ticker: "WEGE3", name: "WEG ON", sector: "Bens Industriais" },
  { ticker: "B3SA3", name: "B3 ON", sector: "Financeiro" },
  { ticker: "RENT3", name: "Localiza ON", sector: "Locação de Veículos" },
  { ticker: "BBDC3", name: "Bradesco ON", sector: "Financeiro" },
  { ticker: "ITSA4", name: "Itaúsa PN", sector: "Financeiro" },
  { ticker: "RADL3", name: "Raia Drogasil ON", sector: "Saúde" },
  { ticker: "CSAN3", name: "Cosan ON", sector: "Energia" },
  { ticker: "BRFS3", name: "BRF ON", sector: "Alimentos" },
  { ticker: "BEEF3", name: "Minerva ON", sector: "Alimentos" },
  { ticker: "GGBR4", name: "Gerdau PN", sector: "Siderurgia" },
  { ticker: "CSNA3", name: "CSN ON", sector: "Siderurgia" },
  { ticker: "BPAC11", name: "BTG Pactual UNT", sector: "Financeiro" },
  { ticker: "EQTL3", name: "Equatorial ON", sector: "Energia" },
  { ticker: "EGIE3", name: "Engie Brasil ON", sector: "Energia" },
  { ticker: "JBSS3", name: "JBS ON", sector: "Alimentos" },
  { ticker: "LREN3", name: "Lojas Renner ON", sector: "Varejo" },
  { ticker: "VIVT3", name: "Telefônica Brasil ON", sector: "Telecomunicações" },
  { ticker: "CPLE6", name: "Copel PNB", sector: "Energia" },
  { ticker: "ELET3", name: "Eletrobras ON", sector: "Energia" },
  { ticker: "ELET6", name: "Eletrobras PNB", sector: "Energia" },
  { ticker: "PRIO3", name: "PetroRio ON", sector: "Petróleo e Gás" },
  { ticker: "CVCB3", name: "CVC Brasil ON", sector: "Turismo" },
  { ticker: "VIIA3", name: "Via ON", sector: "Varejo" },
  { ticker: "COGN3", name: "Cogna ON", sector: "Educação" },
  { ticker: "NTCO3", name: "Natura ON", sector: "Cosméticos" },
  { ticker: "EMBR3", name: "Embraer ON", sector: "Aviação" },
  { ticker: "FLRY3", name: "Fleury ON", sector: "Saúde" },
  { ticker: "SBSP3", name: "Sabesp ON", sector: "Saneamento" },
  { ticker: "AZUL4", name: "Azul PN", sector: "Aviação" },
  { ticker: "GOLL4", name: "Gol PN", sector: "Aviação" },
  { ticker: "TOTS3", name: "Totvs ON", sector: "Tecnologia" },
  { ticker: "UGPA3", name: "Ultrapar ON", sector: "Petróleo e Gás" }
];

// Helper function to search for stocks
export const searchBovespaStocks = (query: string) => {
  const normalizedQuery = query.toUpperCase();
  return bovespaStocks.filter(
    stock => 
      stock.ticker.includes(normalizedQuery) || 
      stock.name.toUpperCase().includes(normalizedQuery)
  ).slice(0, 10); // Return max 10 results
};
