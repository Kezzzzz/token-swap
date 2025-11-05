"use client";

import { Token, CHAIN_NAMES } from "@/lib/constants/tokens";
import { useSparklineData } from "@/hooks/useSparklineData";

interface TokenListItemProps {
  token: Token;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  itemRef: (el: HTMLButtonElement | null) => void;
}

export default function TokenListItem({
  token,
  isSelected,
  isHighlighted,
  onClick,
  onMouseEnter,
  itemRef,
}: TokenListItemProps) {
  const { data: sparklineData } = useSparklineData({
    symbol: token.symbol,
    chainId: token.chainId,
  });

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
        isSelected
          ? "bg-purple-900/30 border-l-2 border-purple-500"
          : isHighlighted
          ? "bg-purple-800/30 border-l-2 border-purple-400"
          : "hover:bg-gray-800/50"
      }`}
    >
      {/* Token Icon */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-blue-600 text-white font-bold text-xs shadow-sm shadow-purple-500/20">
        {token.symbol.slice(0, 2)}
      </div>

      {/* Token Info */}
      <div className="flex-1 min-w-0">
        <div className="mb-0.5 flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-white text-sm">
            {token.symbol}
          </span>
          {token.featured && (
            <span className="rounded-full bg-linear-to-r from-purple-600 to-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white leading-none">
              Popular
            </span>
          )}
          <span className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] font-medium text-gray-400 leading-none">
            {CHAIN_NAMES[token.chainId]}
          </span>
        </div>
        <div className="text-[11px] text-gray-500 truncate leading-tight">
          {token.name}
        </div>
      </div>

      {/* Price Change % Only (No Sparkline to reduce API calls) */}
      <div className="flex shrink-0 items-center gap-3">
        {sparklineData && (
          <div className="text-right min-w-[50px]">
            <div
              className={`text-xs font-semibold ${
                sparklineData.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {sparklineData.isPositive ? "+" : ""}
              {sparklineData.priceChangePercent}%
            </div>
            <div className="text-xs text-gray-500">7d</div>
          </div>
        )}

        {/* Selected Checkmark */}
        {isSelected && (
          <svg
            className="h-5 w-5 text-purple-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
