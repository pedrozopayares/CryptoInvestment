export interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmcRank: number;
  numMarketPairs: number;
  circulatingSupply: string;
  totalSupply: string;
  maxSupply: string;
  infiniteSupply: number;
  lastUpdated: string;
  dateAdded: string;
  tags: string;
  platform: string | null;
  selfReportedCirculatingSupply: string | null;
  selfReportedMarketCap: string | null;
  infoJson: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface CoinInfoJson {
  id: number;
  logo: string;
  name: string;
  slug: string;
  tags: string[];
  urls: {
    chat: string[];
    reddit: string[];
    twitter: string[];
    website: string[];
    explorer: string[];
    facebook: string[];
    source_code: string[];
    announcement: string[];
    message_board: string[];
    technical_doc: string[];
  };
  notice: string;
  symbol: string;
  category: string;
  platform: any; // Puede ser null o un objeto, ajusta según tu backend
  is_hidden: number;
  subreddit: string;
  "tag-names": string[];
  date_added: string;
  "tag-groups": string[];
  description: string;
  date_launched: string;
  infinite_supply: boolean;
  contract_address: string[];
  twitter_username: string;
  self_reported_tags: string[] | null;
  self_reported_market_cap: string | null;
  self_reported_circulating_supply: string | null;
}

export interface PriceHistory {
  id: number;
  cryptocurrencyId: number;
  price: string;
  marketCap: string;
  volume24h: string;
  percentChange1h: string;
  percentChange24h: string;
  percentChange7d: string;
  marketCapDominance: string;
  fullyDilutedMarketCap: string;
  volumeChange24h: string;
  lastUpdated: string;
  createdAt: string;
}

export interface FavoriteWithPrices {
  id: number;
  userId: number;
  cryptocurrencyId: number;
  createdAt: string; // ISO date string
  currency: Cryptocurrency | null;
  favorite: Cryptocurrency | null;
  prices: PriceHistory[];
}
