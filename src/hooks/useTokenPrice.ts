"use client";

import { useQuery } from "@tanstack/react-query";

export interface PriceInfo {
  unitPrice: number;
  amount: number;
  total: number;
}

export interface AssetInfo {
  address: string;
  chain: string;
  decimals: number;
  name: string;
  symbol: string;
}

export interface TokenPriceData {
  symbol: string;
  chainId: number;
  address?: string;
  price?: number;
  priceInfo?: PriceInfo;
  assetInfo?: AssetInfo;
}

interface UseTokenPriceOptions {
  symbol: string;
  chainId: number;
  enabled?: boolean;
}

/**
 * Custom TanStack Query hook to fetch token price information
 * Uses Next.js API route (server-side) to avoid CORS issues
 */
export function useTokenPrice({
  symbol,
  chainId,
  enabled = true,
}: UseTokenPriceOptions) {
  return useQuery({
    queryKey: ["tokenPrice", symbol, chainId],
    queryFn: async (): Promise<TokenPriceData> => {
      const response = await fetch(`/api/token/${chainId}/${symbol}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch token data: ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled,
    staleTime: 30 * 1000, // 30 seconds - prices update frequently
    refetchInterval: 60 * 1000, // Refetch every minute
    retry: 2,
  });
}
