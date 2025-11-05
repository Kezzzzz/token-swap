"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Token } from "@/lib/constants/tokens";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import TokenDropdown from "./TokenDropdown";

export default function SwapCard() {
  const [sourceToken, setSourceToken] = useState<Token | null>(null);
  const [targetToken, setTargetToken] = useState<Token | null>(null);
  const [usdAmount, setUsdAmount] = useState<string>("100");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [swapKey, setSwapKey] = useState(0);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
  const sourceTokenAmount =
    sourcePrice?.price && usdValue > 0 ? usdValue / sourcePrice.price : 0;
  const targetTokenAmount =
    targetPrice?.price && usdValue > 0 ? usdValue / targetPrice.price : 0;

  const handleSwap = () => {
    setSourceToken(targetToken);
    setTargetToken(sourceToken);
    setSwapKey(prev => prev + 1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      {/* Swap Card with Mouse Glow Border */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative rounded-3xl p-[2px]"
        style={{
          ["--mouse-x" as string]: `${mousePosition.x}px`,
          ["--mouse-y" as string]: `${mousePosition.y}px`,
        }}
      >
        {/* Animated border glow that follows mouse */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.8), transparent 80%)`,
          }}
        />

        {/* Static border fallback */}
        <div className="absolute inset-0 rounded-3xl bg-gray-800/50 z-0" />

          {/* Content container - Single merged container */}
          <div className="relative z-10 rounded-3xl bg-linear-to-br from-[#141418] to-[#1a1a1f] p-4 shadow-2xl shadow-purple-900/10 backdrop-blur-xl">
            <div className="rounded-2xl border border-gray-800/30 bg-[#0f0f14] p-4">
              {/* Source Section - You Pay */}
              <div className="space-y-2">
                <label className="px-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                  You pay
                </label>

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
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`source-${sourceToken.symbol}-${sourceToken.chainId}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-sm font-medium text-gray-300">
                            ≈{" "}
                            {sourceTokenAmount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 8,
                            })}{" "}
                            {sourceToken.symbol}
                          </div>
                          {sourcePrice.price && (
                            <div className="mt-2 text-xs text-gray-500">
                              1 {sourceToken.symbol} = $
                              {sourcePrice.price.toFixed(4)}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    ) : null}
                  </>
                ) : (
                  <div className="py-8 text-center text-sm text-gray-500">
                    Select a token to continue
                  </div>
                )}
              </div>

              {/* Divider with Swap Button */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800/50"></div>
                </div>
                <div className="relative">
                  <motion.button
                    onClick={handleSwap}
                    disabled={!sourceToken || !targetToken}
                    className="rounded-full border border-gray-800/50 bg-[#0f0f14] p-2 transition-colors duration-200 hover:enabled:bg-[#1a1a20] hover:enabled:border-purple-500/30 disabled:cursor-not-allowed disabled:bg-[#0f0f14]"
                    aria-label="Swap tokens"
                    whileTap={sourceToken && targetToken ? { scale: 0.9 } : {}}
                    animate={{ rotate: swapKey * 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <svg
                      className="h-4 w-4 text-gray-400"
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
                  </motion.button>
                </div>
              </div>

              {/* Target Section - You Receive */}
              <div className="space-y-2">
                <label className="px-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                  You receive
                </label>

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
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`target-${targetToken.symbol}-${targetToken.chainId}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
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
                              1 {targetToken.symbol} = $
                              {targetPrice.price.toFixed(4)}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
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
        </div>
    </div>
  );
}
