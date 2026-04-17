"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { sdk } from "@/lib/medusa-client";

interface CartContextType {
  cart: any | null;
  items: any[];
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalQuantity: number;
  totalAmount: number;
  isAdding: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "aurora_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    initCart();
  }, []);

  const initCart = async () => {
    try {
      const cartId = localStorage.getItem(CART_KEY);
      if (cartId) {
        const { cart: fetchedCart } = await sdk.store.cart.retrieve(cartId, {
          fields: "+items,+items.variant,+items.variant.product",
        });
        setCart(fetchedCart);
      } else {
        await createNewCart();
      }
    } catch (e) {
      console.error("Cart init error, creating new cart.", e);
      await createNewCart();
    }
  };

  const createNewCart = async () => {
    const { cart: newCart } = await sdk.store.cart.create({
      currency_code: "npr",
    });
    setCart(newCart);
    localStorage.setItem(CART_KEY, newCart.id);
    return newCart;
  };

  const addToCart = async (variantId: string, quantity: number) => {
    setIsAdding(true);
    try {
      let currentCart = cart;
      if (!currentCart) {
        currentCart = await createNewCart();
      }

      await sdk.store.cart.createLineItem(currentCart.id, {
        variant_id: variantId,
        quantity,
      });

      // Refresh cart to get updated subtotals
      const { cart: updatedCart } = await sdk.store.cart.retrieve(currentCart.id, {
        fields: "+items,+items.variant,+items.variant.product",
      });
      setCart(updatedCart);
      setIsCartOpen(true);
    } catch (e) {
      console.error("Failed to add to cart:", e);
    } finally {
      setIsAdding(false);
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart) return;
    try {
      await sdk.store.cart.updateLineItem(cart.id, lineItemId, {
        quantity,
      });
      const { cart: updatedCart } = await sdk.store.cart.retrieve(cart.id, {
        fields: "+items,+items.variant,+items.variant.product",
      });
      setCart(updatedCart);
    } catch (e) {
      console.error("Failed to update item quantity:", e);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    if (!cart) return;
    try {
      await sdk.store.cart.deleteLineItem(cart.id, lineItemId);
      const { cart: updatedCart } = await sdk.store.cart.retrieve(cart.id, {
         fields: "+items,+items.variant,+items.variant.product",
      });
      setCart(updatedCart);
    } catch (e) {
      console.error("Failed to remove item:", e);
    }
  };

  const items = cart?.items || [];
  const totalQuantity = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const totalAmount = cart?.total || 0;

  return (
    <CartContext.Provider value={{
      cart,
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      isCartOpen,
      setIsCartOpen,
      totalQuantity,
      totalAmount,
      isAdding
    }}>
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
