"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ---------- Types ----------

export interface CartItem {
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: number;
  currencyCode: string;
  quantity: number;
  thumbnail: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalQuantity: number;
  totalAmount: number;
  isAdding: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "aurora_cart";

// ---------- Helpers ----------

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

// ---------- Provider ----------

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setItems(loadCartFromStorage());
    setIsHydrated(true);
  }, []);

  // Persist to localStorage on every change (after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items);
    }
  }, [items, isHydrated]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      setIsAdding(true);

      setItems((prev) => {
        const existing = prev.find((i) => i.variantId === item.variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });

      setIsCartOpen(true);

      // Brief visual feedback delay
      setTimeout(() => setIsAdding(false), 400);
    },
    []
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.variantId !== variantId));
      } else {
        setItems((prev) =>
          prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
        );
      }
    },
    []
  );

  const removeFromCart = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalQuantity,
        totalAmount,
        isAdding,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
