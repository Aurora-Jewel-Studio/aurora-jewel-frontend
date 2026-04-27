"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice, getCheapestPrice } from "@/lib/data";

interface ProductGridProps {
  products: any[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/products/${product.handle}`} className="group block">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-secondary)] mb-4">
              <img
                src={product.thumbnail || product.images?.[0]?.url || "/images/hero-jewelry.png"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Heart size={18} />
              </button>

              {/* Quick View */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-[var(--color-brand-primary)] text-white text-center py-3 text-sm uppercase tracking-wider font-medium">
                  View Details
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1">
              {product.categories?.[0] && (
                <p className="text-xs uppercase tracking-wider text-[var(--color-brand-accent)]">
                  {product.categories[0].name}
                </p>
              )}
              <h3 className="font-serif text-lg group-hover:text-[var(--color-brand-accent)] transition-colors">
                {product.title}
              </h3>
              {(() => {
                const price = getCheapestPrice(product);
                return price !== null ? (
                  <p className="text-sm text-[var(--text-secondary)]">
                    {formatPrice(price)}
                  </p>
                ) : null;
              })()}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
