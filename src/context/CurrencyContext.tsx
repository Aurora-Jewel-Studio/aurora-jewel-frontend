"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Currency definitions ────────────────────────────────────────────────────
export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  decimals: number;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", symbol: "$",  name: "US Dollar",          flag: "🇺🇸", decimals: 2 },
  { code: "GBP", symbol: "£",  name: "British Pound",      flag: "🇬🇧", decimals: 2 },
  { code: "EUR", symbol: "€",  name: "Euro",               flag: "🇪🇺", decimals: 2 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar",  flag: "🇦🇺", decimals: 2 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar",     flag: "🇨🇦", decimals: 2 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham",         flag: "🇦🇪", decimals: 2 },
  { code: "INR", symbol: "₹",  name: "Indian Rupee",       flag: "🇮🇳", decimals: 0 },
  { code: "NPR", symbol: "Rs", name: "Nepalese Rupee",     flag: "🇳🇵", decimals: 0 },
  { code: "JPY", symbol: "¥",  name: "Japanese Yen",       flag: "🇯🇵", decimals: 0 },
  { code: "CNY", symbol: "¥",  name: "Chinese Yuan",       flag: "🇨🇳", decimals: 2 },
];

// ── Context types ───────────────────────────────────────────────────────────
interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrencyCode: (code: string) => void;
  rates: Record<string, number>;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

// ── Provider ────────────────────────────────────────────────────────────────
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [isLoading, setIsLoading] = useState(true);

  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  // Fetch exchange rates on mount
  useEffect(() => {
    async function loadRates() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${apiUrl}/api/exchange-rates`);
        if (res.ok) {
          const data = await res.json();
          setRates(data.rates);
        }
      } catch (err) {
        console.warn("Could not load exchange rates, using defaults");
      } finally {
        setIsLoading(false);
      }
    }

    loadRates();
  }, []);

  // Persist currency preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aurora-currency");
      if (saved && CURRENCIES.some((c) => c.code === saved)) {
        setCurrencyCodeState(saved);
      }
    }
  }, []);

  const setCurrencyCode = useCallback((code: string) => {
    setCurrencyCodeState(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("aurora-currency", code);
    }
  }, []);

  const convertPrice = useCallback(
    (usdPrice: number): number => {
      const rate = rates[currencyCode] || 1;
      return usdPrice * rate;
    },
    [rates, currencyCode]
  );

  const formatPrice = useCallback(
    (usdPrice: number): string => {
      const converted = convertPrice(usdPrice);
      const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: currency.decimals,
        maximumFractionDigits: currency.decimals,
      }).format(converted);

      return `${currency.symbol}${formatted}`;
    },
    [convertPrice, currency]
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrencyCode, rates, convertPrice, formatPrice, isLoading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

// ── Hook ────────────────────────────────────────────────────────────────────
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
