export interface Token {
  symbol: string;
  chainId: number;
  name: string;
  featured?: boolean; // Mark the initial 4 as featured
}

// Featured tokens (always shown first)
export const FEATURED_TOKENS: Token[] = [
  {
    symbol: "USDC",
    chainId: 1,
    name: "USD Coin",
    featured: true,
  },
  {
    symbol: "USDT",
    chainId: 137,
    name: "Tether USD",
    featured: true,
  },
  {
    symbol: "ETH",
    chainId: 8453,
    name: "Ethereum",
    featured: true,
  },
  {
    symbol: "WBTC",
    chainId: 1,
    name: "Wrapped Bitcoin",
    featured: true,
  },
];

// Additional tokens (excluding those already in FEATURED_TOKENS to avoid duplicates)
export const ADDITIONAL_TOKENS: Token[] = [
  // Ethereum (Chain 1) - USDC & WBTC already featured
  { symbol: "DAI", chainId: 1, name: "Dai Stablecoin" },
  { symbol: "WETH", chainId: 1, name: "Wrapped Ether" },
  { symbol: "LINK", chainId: 1, name: "Chainlink" },
  { symbol: "UNI", chainId: 1, name: "Uniswap" },
  { symbol: "AAVE", chainId: 1, name: "Aave" },
  { symbol: "MKR", chainId: 1, name: "Maker" },
  { symbol: "SNX", chainId: 1, name: "Synthetix" },
  { symbol: "CRV", chainId: 1, name: "Curve DAO Token" },
  { symbol: "LDO", chainId: 1, name: "Lido DAO" },
  
  // Polygon (Chain 137) - USDT already featured
  { symbol: "USDC", chainId: 137, name: "USD Coin" },
  { symbol: "WETH", chainId: 137, name: "Wrapped Ether" },
  { symbol: "WMATIC", chainId: 137, name: "Wrapped Matic" },
  { symbol: "DAI", chainId: 137, name: "Dai Stablecoin" },
  { symbol: "AAVE", chainId: 137, name: "Aave" },
  { symbol: "LINK", chainId: 137, name: "Chainlink" },
  { symbol: "UNI", chainId: 137, name: "Uniswap" },
  
  // Base (Chain 8453) - ETH already featured
  { symbol: "USDC", chainId: 8453, name: "USD Coin" },
  { symbol: "WETH", chainId: 8453, name: "Wrapped Ether" },
  { symbol: "DAI", chainId: 8453, name: "Dai Stablecoin" },
  { symbol: "USDT", chainId: 8453, name: "Tether USD" },
  { symbol: "cbETH", chainId: 8453, name: "Coinbase Wrapped Staked ETH" },
  
  // Arbitrum (Chain 42161)
  { symbol: "ETH", chainId: 42161, name: "Ethereum" },
  { symbol: "USDC", chainId: 42161, name: "USD Coin" },
  { symbol: "USDT", chainId: 42161, name: "Tether USD" },
  { symbol: "WETH", chainId: 42161, name: "Wrapped Ether" },
  { symbol: "DAI", chainId: 42161, name: "Dai Stablecoin" },
  { symbol: "ARB", chainId: 42161, name: "Arbitrum" },
  { symbol: "LINK", chainId: 42161, name: "Chainlink" },
  
  // Optimism (Chain 10)
  { symbol: "ETH", chainId: 10, name: "Ethereum" },
  { symbol: "USDC", chainId: 10, name: "USD Coin" },
  { symbol: "USDT", chainId: 10, name: "Tether USD" },
  { symbol: "WETH", chainId: 10, name: "Wrapped Ether" },
  { symbol: "DAI", chainId: 10, name: "Dai Stablecoin" },
  { symbol: "OP", chainId: 10, name: "Optimism" },
  { symbol: "LINK", chainId: 10, name: "Chainlink" },
];

// All tokens combined
export const SUPPORTED_TOKENS: Token[] = [
  ...FEATURED_TOKENS,
  ...ADDITIONAL_TOKENS,
];

export const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  10: "Optimism",
  137: "Polygon",
  8453: "Base",
  42161: "Arbitrum",
};

