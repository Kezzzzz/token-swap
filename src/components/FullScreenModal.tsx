"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function FullScreenModal({
  isOpen,
  onClose,
  children,
  title,
}: FullScreenModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Only render on client side
  if (typeof window === "undefined") return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
            onClick={handleBackdropClick}
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          />

          {/* Full Screen Modal */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              duration: 0.2,
              ease: "easeOut",
            }}
            className="absolute inset-0 flex flex-col bg-black"
          >
            {/* Header */}
            <div className="shrink-0 border-b border-white/10 px-4 py-4 safe-area-top">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 transition-colors hover:bg-white/10 active:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40"
                  aria-label="Close modal"
                >
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Render modal using portal to document.body
  return createPortal(modalContent, document.body);
}
