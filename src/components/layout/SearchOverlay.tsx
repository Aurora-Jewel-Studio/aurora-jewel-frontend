"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { getProducts, Product } from "@/lib/data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
      setSearchTerm("");
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const allProducts = await getProducts(100);
      setProducts(allProducts);
      setIsLoading(false);
    };

    if (isOpen && products.length === 0) {
      fetchProducts();
    }
  }, [isOpen, products.length]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col pt-20"
        >
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="text-white hover:text-[var(--color-brand-accent)] transition-colors p-2"
              aria-label="Close search"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="max-w-4xl mx-auto w-full px-6 flex flex-col flex-1 pb-10">
            <div className="relative mb-12">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, collections..."
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[var(--color-brand-accent)] outline-none text-white text-3xl md:text-5xl py-4 pl-14 transition-colors font-serif placeholder:text-gray-600"
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="w-8 h-8 text-[var(--color-brand-accent)] animate-spin" />
                </div>
              ) : searchTerm && filteredProducts.length === 0 ? (
                <div className="text-center text-gray-400 py-20 text-lg">
                  No results found for "{searchTerm}"
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.slice(0, 12).map((product) => (
                    <Link
                      href={`/products/${product.handle}`}
                      key={product.handle}
                      onClick={onClose}
                      className="group flex flex-col bg-[#1A1A1A] rounded-xl overflow-hidden hover:ring-1 hover:ring-[var(--color-brand-accent)] transition-all"
                    >
                      <div className="aspect-square relative overflow-hidden bg-white">
                        <img
                          src={product.thumbnail.startsWith("http") ? product.thumbnail : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aurorajewelstudio.com'}${product.thumbnail}`}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-white font-serif text-lg truncate">
                          {product.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
