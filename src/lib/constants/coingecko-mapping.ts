/**
 * Mapping between our token symbols (with chain) and CoinGecko IDs
 * CoinGecko uses unique IDs for each token, not symbols
 */

interface CoinGeckoMapping {
  symbol: string;
  chainId: number;
  coingeckoId: string;
}

export const COINGECKO_TOKEN_MAP: CoinGeckoMapping[] = [
  // Ethereum tokens
  { symbol: "USDC", chainId: 1, coingeckoId: "usd-coin" },
  { symbol: "USDT", chainId: 1, coingeckoId: "tether" },
  { symbol: "ETH", chainId: 1, coingeckoId: "ethereum" },
  { symbol: "WETH", chainId: 1, coingeckoId: "weth" },
  { symbol: "WBTC", chainId: 1, coingeckoId: "wrapped-bitcoin" },
  { symbol: "DAI", chainId: 1, coingeckoId: "dai" },
  { symbol: "LINK", chainId: 1, coingeckoId: "chainlink" },
  { symbol: "UNI", chainId: 1, coingeckoId: "uniswap" },
  { symbol: "AAVE", chainId: 1, coingeckoId: "aave" },
  { symbol: "MKR", chainId: 1, coingeckoId: "maker" },
  { symbol: "SNX", chainId: 1, coingeckoId: "havven" },
  { symbol: "CRV", chainId: 1, coingeckoId: "curve-dao-token" },
  { symbol: "LDO", chainId: 1, coingeckoId: "lido-dao" },

  // Polygon tokens
  { symbol: "USDC", chainId: 137, coingeckoId: "usd-coin" },
  { symbol: "USDT", chainId: 137, coingeckoId: "tether" },
  { symbol: "WETH", chainId: 137, coingeckoId: "weth" },
  { symbol: "WMATIC", chainId: 137, coingeckoId: "wmatic" },
  { symbol: "DAI", chainId: 137, coingeckoId: "dai" },
  { symbol: "AAVE", chainId: 137, coingeckoId: "aave" },
  { symbol: "LINK", chainId: 137, coingeckoId: "chainlink" },
  { symbol: "UNI", chainId: 137, coingeckoId: "uniswap" },

  // Base tokens
  { symbol: "ETH", chainId: 8453, coingeckoId: "ethereum" },
  { symbol: "USDC", chainId: 8453, coingeckoId: "usd-coin" },
  { symbol: "WETH", chainId: 8453, coingeckoId: "weth" },
  { symbol: "DAI", chainId: 8453, coingeckoId: "dai" },
  { symbol: "USDT", chainId: 8453, coingeckoId: "tether" },
  { symbol: "cbETH", chainId: 8453, coingeckoId: "coinbase-wrapped-staked-eth" },

  // Arbitrum tokens
  { symbol: "ETH", chainId: 42161, coingeckoId: "ethereum" },
  { symbol: "USDC", chainId: 42161, coingeckoId: "usd-coin" },
  { symbol: "USDT", chainId: 42161, coingeckoId: "tether" },
  { symbol: "WETH", chainId: 42161, coingeckoId: "weth" },
  { symbol: "DAI", chainId: 42161, coingeckoId: "dai" },
  { symbol: "ARB", chainId: 42161, coingeckoId: "arbitrum" },
  { symbol: "LINK", chainId: 42161, coingeckoId: "chainlink" },

  // Optimism tokens
  { symbol: "ETH", chainId: 10, coingeckoId: "ethereum" },
  { symbol: "USDC", chainId: 10, coingeckoId: "usd-coin" },
  { symbol: "USDT", chainId: 10, coingeckoId: "tether" },
  { symbol: "WETH", chainId: 10, coingeckoId: "weth" },
  { symbol: "DAI", chainId: 10, coingeckoId: "dai" },
  { symbol: "OP", chainId: 10, coingeckoId: "optimism" },
  { symbol: "LINK", chainId: 10, coingeckoId: "chainlink" },
];

/**
 * Get CoinGecko ID for a token symbol and chain
 */
export function getCoinGeckoId(symbol: string, chainId: number): string | null {
  const mapping = COINGECKO_TOKEN_MAP.find(
    (m) => m.symbol === symbol && m.chainId === chainId
  );
  return mapping?.coingeckoId || null;
}

