"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/data";

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, totalAmount, cart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[var(--bg-surface)] shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
              <h2 className="font-serif text-2xl">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <ShoppingBag size={48} className="mb-4 text-[var(--color-brand-accent)]" />
                  <p className="font-serif text-xl mb-2">Your cart is empty</p>
                  <p className="text-sm">Discover our exquisite collections to find your next treasure.</p>
                  <Button onClick={() => setIsCartOpen(false)} className="mt-8">
                    Explore Collections
                  </Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-md overflow-hidden relative flex-shrink-0">
                        <img src={item.thumbnail || "/images/hero-jewelry.png"} alt={item.title} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-lg leading-tight pr-4">{item.title}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-sm underline opacity-70 hover:opacity-100">
                              Remove
                            </button>
                          </div>
                          <p className="text-sm opacity-70 mt-1">{item.variant?.title}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-[var(--border-color)] rounded-md">
                            <button 
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1);
                                } else {
                                  removeFromCart(item.id);
                                }
                              }}
                              className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 text-sm min-w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium">
                            {formatPrice(item.total, item.cart?.currency_code || "npr")}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
                <div className="flex justify-between mb-4 text-lg">
                  <span className="font-serif">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalAmount, cart?.currency_code || "npr")}</span>
                </div>
                <p className="text-sm opacity-70 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                <Button className="w-full h-12 text-lg">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
