"use client";

import { useState, useRef, useEffect } from "react";
import { SUPPORTED_TOKENS, Token, CHAIN_NAMES } from "@/lib/constants/tokens";
import { useSparklineData } from "@/hooks/useSparklineData";
import TokenListItem from "./TokenListItem";
import Sparkline from "./Sparkline";

interface TokenDropdownProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  excludeToken?: Token | null;
  label: string;
}

export default function TokenDropdown({
  selectedToken,
  onSelect,
  excludeToken,
  label,
}: TokenDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openUpward, setOpenUpward] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Fetch sparkline data for selected token
  const { data: selectedSparkline } = useSparklineData({
    symbol: selectedToken?.symbol || "",
    chainId: selectedToken?.chainId || 0,
    enabled: !!selectedToken,
  });

  const availableTokens = SUPPORTED_TOKENS.filter(
    (token) =>
      !excludeToken ||
      token.symbol !== excludeToken.symbol ||
      token.chainId !== excludeToken.chainId
  );

  // Filter and sort tokens - featured tokens always at the top
  const filteredTokens = availableTokens
    .filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        CHAIN_NAMES[token.chainId]
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Featured tokens always come first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Otherwise maintain original order
      return 0;
    });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input and detect dropdown direction when dropdown opens
  useEffect(() => {
    if (isOpen) {
      // Detect available space and determine dropdown direction
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 350; // Approximate height of dropdown with search + items
        const buffer = 50; // Extra buffer to ensure comfortable viewing

        // Open upward if there's not enough space below (with buffer) but more space above
        setOpenUpward(
          spaceBelow < dropdownHeight + buffer && spaceAbove > spaceBelow
        );
      }

      // Set highlighted index to currently selected token ONLY on open
      if (selectedToken) {
        const selectedIndex = availableTokens.findIndex(
          (token) =>
            token.symbol === selectedToken.symbol &&
            token.chainId === selectedToken.chainId
        );
        setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      } else {
        setHighlightedIndex(0);
      }

      // Focus search input
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
    // Only run when isOpen changes, not when selectedToken or availableTokens change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSelect = (token: Token) => {
    onSelect(token);
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredTokens.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredTokens[highlightedIndex]) {
          handleSelect(filteredTokens[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(0);
        break;
    }
  };

  // Reset highlighted index when search query changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listItemRefs.current[highlightedIndex]) {
      listItemRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="relative">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Container with pointer-events to prevent layout shift */}
      <div ref={dropdownRef} className="relative">
        {/* Dropdown Trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-full rounded-xl border border-gray-700/50 bg-[#1a1a20] px-4 py-3.5 text-left transition-all duration-200 hover:border-purple-500/50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        >
          <div className="flex items-center justify-between gap-3">
            {selectedToken ? (
              <div className="flex flex-1 items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-purple-500/20">
                  {selectedToken.symbol.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white leading-tight">
                    {selectedToken.symbol}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                    {selectedToken.name} • {CHAIN_NAMES[selectedToken.chainId]}
                  </div>
                </div>
              </div>
            ) : (
              <span className="flex-1 text-sm text-gray-500">
                Select token...
              </span>
            )}

            {/* Sparkline & Price Change (when token selected) */}
            {selectedToken &&
              selectedSparkline &&
              selectedSparkline.prices &&
              selectedSparkline.prices.length > 1 && (
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Sparkline
                    data={selectedSparkline.prices}
                    width={60}
                    height={24}
                    isPositive={selectedSparkline.isPositive}
                  />
                  <div
                    className={`text-xs font-semibold min-w-[45px] text-right ${
                      selectedSparkline.isPositive
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedSparkline.isPositive ? "+" : ""}
                    {selectedSparkline.priceChangePercent}%
                  </div>
                </div>
              )}

            {/* Chevron Icon */}
            <svg
              className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu - Absolutely positioned, doesn't affect parent height */}
        {isOpen && (
          <div
            className={`absolute left-0 right-0 z-[100] overflow-hidden rounded-xl border border-gray-700/50 bg-[#1a1a20] shadow-2xl shadow-black/50 ${
              openUpward ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            {/* Search Input */}
            <div className="border-b border-gray-700/50 p-3">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search tokens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-lg border border-gray-700/50 bg-[#0f0f14] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* Token List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token, index) => {
                  const isSelected =
                    selectedToken?.symbol === token.symbol &&
                    selectedToken?.chainId === token.chainId;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <TokenListItem
                      key={`${token.symbol}-${token.chainId}`}
                      token={token}
                      isSelected={isSelected}
                      isHighlighted={isHighlighted}
                      onClick={() => handleSelect(token)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      itemRef={(el) => {
                        listItemRefs.current[index] = el;
                      }}
                    />
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  No tokens found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
