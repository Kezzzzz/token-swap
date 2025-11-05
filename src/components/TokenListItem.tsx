"use client";

import { Token, CHAIN_NAMES } from "@/lib/constants/tokens";
import { useSparklineData } from "@/hooks/useSparklineData";
import TokenAvatar from "./TokenAvatar";

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
  // Always fetch sparkline data
  const { data: sparklineData } = useSparklineData({
    symbol: token.symbol,
    chainId: token.chainId,
  });

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
        isSelected
          ? "bg-purple-900/30 border-l-2 border-purple-500"
          : isHighlighted
          ? "bg-purple-800/30 border-l-2 border-purple-400"
          : "hover:bg-gray-800/50"
      }`}
    >
      {/* Token Icon */}
      <TokenAvatar symbol={token.symbol} size="sm" />

      {/* Token Info - Minimal */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-white text-sm">
            {token.symbol}
          </span>
          <span className="text-[10px] text-gray-500">
            {CHAIN_NAMES[token.chainId]}
          </span>
        </div>
      </div>

      {/* Price Change % - Minimal */}
      <div className="flex shrink-0 items-center gap-2">
        {sparklineData && (
          <div
            className={`text-xs font-medium ${
              sparklineData.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {sparklineData.isPositive ? "+" : ""}
            {sparklineData.priceChangePercent}%
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
