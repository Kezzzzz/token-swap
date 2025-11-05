"use client";

import { Token } from "@/lib/constants/tokens";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import { CHAIN_NAMES } from "@/lib/constants/tokens";

interface TokenPanelProps {
  token: Token | null;
  usdAmount: number;
  type: "source" | "target";
  onUsdChange?: (value: number) => void;
}

export default function TokenPanel({
  token,
  usdAmount,
  type,
  onUsdChange,
}: TokenPanelProps) {
  const { data: priceData, isLoading } = useTokenPrice({
    symbol: token?.symbol || "",
    chainId: token?.chainId || 0,
    enabled: !!token,
  });

  const tokenAmount = priceData?.price && usdAmount > 0 
    ? usdAmount / priceData.price 
    : 0;

  return (
    <div className="space-y-4">
      {/* USD Input (only for source) or Spacer (for target) */}
      {type === "source" ? (
        <div className="space-y-2">
          <label
            htmlFor="usd-input"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            USD Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              $
            </span>
            <input
              id="usd-input"
              type="number"
              min="0"
              step="0.01"
              value={usdAmount || ""}
              onChange={(e) => onUsdChange?.(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-4 pl-8 text-2xl font-semibold text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            />
          </div>
        </div>
      ) : (
        // Invisible spacer to maintain alignment
        <div className="space-y-2">
          <div className="text-sm font-medium text-transparent">Spacer</div>
          <div className="h-[68px]"></div>
        </div>
      )}

      {/* Token Display */}
      {token ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {type === "source" ? "You're paying" : "You'll receive"}
              </h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {token.symbol}
                </span>
                <span className="rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                  {CHAIN_NAMES[token.chainId]}
                </span>
              </div>
            </div>
          </div>

          {/* Token Amount */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-10 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ) : priceData ? (
              <>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {tokenAmount > 0
                    ? tokenAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 8,
                      })
                    : "0.00"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Price:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ${(priceData.price || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </span>
                </div>
                {type === "target" && usdAmount > 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ≈ ${usdAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} USD
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-400">No price data available</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Select a token above
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

