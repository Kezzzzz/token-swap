"use client";

import { useState, useRef, useEffect } from "react";
import { Token, CHAIN_NAMES } from "@/lib/constants/tokens";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import TokenDropdown from "./TokenDropdown";

export default function SwapCard() {
  const [sourceToken, setSourceToken] = useState<Token | null>(null);
  const [targetToken, setTargetToken] = useState<Token | null>(null);
  const [usdAmount, setUsdAmount] = useState<string>("100");
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus amount input when source token is selected
  useEffect(() => {
    if (sourceToken && amountInputRef.current) {
      // Small delay to ensure DOM is updated and dropdown is closed
      setTimeout(() => {
        amountInputRef.current?.focus();
        amountInputRef.current?.select(); // Also select the text for easy editing
      }, 100);
    }
  }, [sourceToken]);

  const { data: sourcePrice, isLoading: sourceLoading } = useTokenPrice({
    symbol: sourceToken?.symbol || "",
    chainId: sourceToken?.chainId || 0,
    enabled: !!sourceToken,
  });

  const { data: targetPrice, isLoading: targetLoading } = useTokenPrice({
    symbol: targetToken?.symbol || "",
    chainId: targetToken?.chainId || 0,
    enabled: !!targetToken,
  });

  const usdValue = parseFloat(usdAmount) || 0;
  const sourceTokenAmount = sourcePrice?.price && usdValue > 0 ? usdValue / sourcePrice.price : 0;
  const targetTokenAmount = targetPrice?.price && usdValue > 0 ? usdValue / targetPrice.price : 0;

  const handleSwap = () => {
    setSourceToken(targetToken);
    setTargetToken(sourceToken);
  };

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      {/* Swap Card */}
      <div className="rounded-3xl border border-gray-800/50 bg-gradient-to-br from-[#141418] to-[#1a1a1f] p-4 shadow-2xl shadow-purple-900/10 backdrop-blur-xl">
        {/* Source Section - You Pay */}
        <div className="space-y-2">
          <label className="px-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            You pay
          </label>

          <div className="rounded-2xl border border-gray-800/30 bg-[#0f0f14] p-4">
            <div className="mb-3">
              <TokenDropdown
                selectedToken={sourceToken}
                onSelect={setSourceToken}
                excludeToken={targetToken}
                label=""
              />
            </div>

            {sourceToken ? (
              <>
                {/* Input Field with Visual Clarity */}
                <div className="relative mb-3 rounded-xl border-2 border-gray-700/50 bg-[#1a1a20] p-4 transition-all focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20">
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-purple-400">
                      $
                    </span>
                    <input
                      ref={amountInputRef}
                      type="number"
                      min="0"
                      step="0.01"
                      value={usdAmount}
                      onChange={(e) => setUsdAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full border-0 bg-transparent p-0 text-4xl font-bold text-white placeholder-gray-600 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                {/* Token Amount Display */}
                {sourceLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-700"></div>
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-700/50"></div>
                  </div>
                ) : sourcePrice ? (
                  <>
                    <div className="text-sm font-medium text-gray-300">
                      ≈ {sourceTokenAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 8,
                      })}{" "}
                      {sourceToken.symbol}
                    </div>
                    {sourcePrice.price && (
                      <div className="mt-2 text-xs text-gray-500">
                        1 {sourceToken.symbol} = ${sourcePrice.price.toFixed(4)}
                      </div>
                    )}
                  </>
                ) : null}
              </>
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">
                Select a token to continue
              </div>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <div className="relative my-2 flex justify-center">
          <button
            onClick={handleSwap}
            disabled={!sourceToken || !targetToken}
            className="group relative z-10 rounded-lg border border-gray-700/50 bg-[#1a1a20] p-2 transition-all duration-200 hover:enabled:bg-gray-700/50 hover:enabled:border-purple-500/30 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Swap tokens"
          >
            <svg
              className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:enabled:rotate-180 group-hover:enabled:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        {/* Target Section - You Receive */}
        <div className="space-y-2">
          <label className="px-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            You receive
          </label>

          <div className="rounded-2xl border border-gray-800/30 bg-[#0f0f14] p-4">
            <div className="mb-3">
              <TokenDropdown
                selectedToken={targetToken}
                onSelect={setTargetToken}
                excludeToken={sourceToken}
                label=""
              />
            </div>

            {targetToken ? (
              <>
                {targetLoading ? (
                  <div className="space-y-2">
                    <div className="h-12 w-3/4 animate-pulse rounded bg-gray-700"></div>
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-700/50"></div>
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-700/50"></div>
                  </div>
                ) : (
                  <>
                    <div className="mb-2 text-4xl font-bold text-white">
                      {targetTokenAmount > 0
                        ? targetTokenAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                          })
                        : "0.00"}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-400">
                        ≈ ${usdValue.toFixed(2)} USD
                      </span>
                    </div>
                    {targetPrice && targetPrice.price && (
                      <div className="mt-2 text-xs text-gray-500">
                        1 {targetToken.symbol} = ${targetPrice.price.toFixed(4)}
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">
                Select a token to continue
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-gray-300">
            <p className="font-semibold text-white">Real-time pricing</p>
            <p className="mt-1 text-gray-400">
              Prices update automatically every 60 seconds. This tool shows estimated
              values and is not intended for actual trading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

