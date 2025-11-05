"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoinGeckoId } from "@/lib/constants/coingecko-mapping";

export interface SparklineData {
  coingeckoId: string;
  prices: number[];
  priceChange: number;
  priceChangePercent: number;
  isPositive: boolean;
}

interface UseSparklineDataOptions {
  symbol: string;
  chainId: number;
  enabled?: boolean;
}

/**
 * Custom hook to fetch 7-day sparkline data from CoinGecko API
 */
export function useSparklineData({
  symbol,
  chainId,
  enabled = true,
}: UseSparklineDataOptions) {
  const coingeckoId = getCoinGeckoId(symbol, chainId);

  return useQuery({
    queryKey: ["sparkline", coingeckoId],
    queryFn: async (): Promise<SparklineData | null> => {
      if (!coingeckoId) return null;

      const response = await fetch(`/api/sparkline/${coingeckoId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch sparkline data");
      }

      return response.json();
    },
    enabled: enabled && !!coingeckoId,
    staleTime: 60 * 60 * 1000, // 1 hour - historical data doesn't change frequently
    retry: 1,
  });
}

