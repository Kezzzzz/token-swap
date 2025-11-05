"use client";

import { useState, useEffect } from "react";

interface TokenAvatarProps {
  symbol: string;
  chainId?: number;
  size?: "sm" | "md";
  className?: string;
}

// Simple mapping for common token logos
const TOKEN_LOGO_MAP: Record<string, string> = {
  eth: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  weth: "https://assets.coingecko.com/coins/images/2518/small/weth.png",
  usdc: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  usdt: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  dai: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png",
  wbtc: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  link: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  aave: "https://assets.coingecko.com/coins/images/12645/small/aave-token-round.png",
  uni: "https://assets.coingecko.com/coins/images/12504/small/uni.jpg",
  matic: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  arb: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  op: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
};

export default function TokenAvatar({ symbol, size = "md", className = "" }: TokenAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset error and loading states when symbol changes
  useEffect(() => {
    setImgError(false);
    setIsLoading(true);
  }, [symbol]);

  const sizeClasses = {
    sm: "h-9 w-9 text-xs",
    md: "h-10 w-10 text-sm",
  };

  // Get logo URL from map or fallback to CoinGecko generic
  const iconUrl = TOKEN_LOGO_MAP[symbol.toLowerCase()] || 
    `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${symbol.toLowerCase()}.png`;

  if (imgError) {
    // Fallback to letter avatar
    return (
      <div
        className={`flex ${sizeClasses[size]} shrink-0 items-center justify-center rounded-full bg-white/10 text-white font-bold border border-white/20 ${className}`}
      >
        {symbol.slice(0, 2)}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClasses[size]} shrink-0 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/10 text-white font-bold text-xs border border-white/20">
          {symbol.slice(0, 2)}
        </div>
      )}
      <img
        src={iconUrl}
        alt={`${symbol} logo`}
        className={`h-full w-full rounded-full object-cover ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

