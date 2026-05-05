"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency, CURRENCIES } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
  isDark?: boolean;
}

export const CurrencySelector = ({ isDark = false }: CurrencySelectorProps) => {
  const { currency, setCurrencyCode } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 text-xs tracking-wider uppercase transition-colors font-medium",
          isDark
            ? "text-[var(--color-brand-primary)] hover:text-[var(--color-brand-accent)]"
            : "text-white hover:text-[var(--color-brand-accent)]"
        )}
        aria-label="Select currency"
      >
        <span>{currency.flag}</span>
        <span>{currency.code}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[200px] z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrencyCode(c.code);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                c.code === currency.code
                  ? "bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <span className="text-base">{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-xs text-gray-400 font-mono">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
