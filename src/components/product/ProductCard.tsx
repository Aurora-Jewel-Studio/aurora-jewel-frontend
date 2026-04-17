"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: any; // Using any for brevity, should type with Medusa Product type
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, isAdding } = useCart();

  const handleQuickBuy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Quick Add adds the first variant
    const variantId = product.variants?.[0]?.id;
    if (variantId) {
      await addToCart(variantId, 1);
    }
  };

  return (
    <div 
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="relative aspect-[4/5] overflow-hidden bg-gray-100 flex items-center justify-center">
        {/* Wishlist Button */}
        <button 
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-[var(--color-brand-accent)] transition-colors"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <Heart className="w-5 h-5" />
        </button>

        {/* Dynamic Image focusing effect */}
        <motion.div
           animate={{ scale: isHovered ? 1.05 : 1 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="w-full h-full relative"
        >
          <img 
            src={product.thumbnail || product.images?.[0]?.url || "/images/hero-jewelry.png"} 
            alt={product.title}
            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
          />
        </motion.div>

        {/* Quick View / Add overlay */}
        <div 
          className={`absolute bottom-0 inset-x-0 p-4 transition-transform duration-300 ease-out transform ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <button 
             onClick={handleQuickBuy}
             disabled={isAdding}
             className="w-full bg-[var(--color-brand-primary)] text-white py-3 px-4 font-medium tracking-wide uppercase text-xs flex items-center justify-center gap-2 hover:bg-[#024931] transition-colors"
          >
            {isAdding ? "Adding..." : (
               <>
                 <Plus size={16} /> Quick Add
               </>
            )}
          </button>
        </div>
      </Link>

      <div className="mt-4 text-center">
        <p className="text-sm text-[var(--color-brand-accent)] uppercase tracking-widest mb-1">
          {product.categories?.[0]?.name}
        </p>
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-serif text-xl text-[var(--color-foreground)] hover:text-[var(--color-brand-accent)] transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="mt-2 text-[var(--text-secondary)] font-medium">
          {(() => {
            // Find base NPR price
            const price = product.variants?.[0]?.prices?.find(
              (p: any) => p.currency_code === "npr"
            );
            return price ? `NPR ${price.amount.toLocaleString()}` : "Price unavailable";
          })()}
        </p>
      </div>
    </div>
  );
};
