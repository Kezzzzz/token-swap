"use client";

import { useState } from "react";

interface TokenAvatarProps {
  symbol: string;
  size?: "sm" | "md";
  className?: string;
}

export default function TokenAvatar({ symbol, size = "md", className = "" }: TokenAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sizeClasses = {
    sm: "h-9 w-9 text-xs",
    md: "h-10 w-10 text-sm",
  };

  const iconUrl = `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/200`;

  if (imgError) {
    // Fallback to letter avatar
    return (
      <div
        className={`flex ${sizeClasses[size]} shrink-0 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-blue-600 text-white font-bold shadow-sm shadow-purple-500/20 ${className}`}
      >
        {symbol.slice(0, 2)}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClasses[size]} shrink-0 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-blue-600 text-white font-bold text-xs shadow-sm shadow-purple-500/20">
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

