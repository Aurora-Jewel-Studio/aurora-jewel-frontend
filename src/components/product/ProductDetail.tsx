"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface ProductDetailProps {
  product: any;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const { addToCart, isAdding } = useCart();

  const images = product.images?.length ? product.images : [{ url: "/images/hero-jewelry.png" }];

  // Find variant matching selected options
  const selectedVariant = product.variants?.find((variant: any) => {
    if (!variant.options) return false;
    return Object.entries(selectedOptions).every(
      ([key, value]) => variant.options[key] === value
    );
  }) || product.variants?.[0];

  // Get price for selected variant
  const price = selectedVariant?.prices?.find(
    (p: any) => p.currency_code === "npr"
  );

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addToCart(selectedVariant.id, 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left: Image Gallery */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)] mb-4">
          <img
            src={images[selectedImageIndex]?.url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3">
            {images.map((img: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                  idx === selectedImageIndex
                    ? "border-[var(--color-brand-primary)]"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={img.url}
                  alt={`${product.title} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Right: Product Info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
          <Link href="/" className="hover:text-[var(--color-brand-accent)]">Home</Link>
          <span>/</span>
          {product.categories?.[0] && (
            <>
              <Link
                href={`/collections/${product.categories[0].name.toLowerCase()}`}
                className="hover:text-[var(--color-brand-accent)]"
              >
                {product.categories[0].name}
              </Link>
              <span>/</span>
            </>
          )}
          <span>{product.title}</span>
        </div>

        {/* Category Badge */}
        {product.categories?.[0] && (
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand-accent)] font-semibold mb-2">
            {product.categories[0].name}
          </span>
        )}

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.title}</h1>

        {/* Price */}
        {price && (
          <p className="text-2xl font-light mb-6">
            {formatPrice(price.amount)}
          </p>
        )}

        {/* Description */}
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Options */}
        {product.options?.map((option: any) => (
          <div key={option.id} className="mb-6">
            <p className="text-sm uppercase tracking-wider font-semibold mb-3">
              {option.title}
            </p>
            <div className="flex gap-3 flex-wrap">
              {option.values?.map((val: any) => (
                <button
                  key={val.id}
                  onClick={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [option.title]: val.value,
                    }))
                  }
                  className={`px-5 py-2.5 border text-sm transition-all ${
                    selectedOptions[option.title] === val.value
                      ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white"
                      : "border-gray-300 hover:border-[var(--color-brand-primary)]"
                  }`}
                >
                  {val.value}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Actions */}
        <div className="flex gap-4 mt-auto pt-8">
           <Button
            variant="primary"
            size="lg"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
            isLoading={isAdding}
          >
            {!isAdding && <ShoppingBag size={20} />}
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
          <button className="p-4 border border-gray-300 hover:border-[var(--color-brand-primary)] transition-colors">
            <Heart size={20} />
          </button>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 space-y-3">
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
            ✓ Free shipping on orders above NPR 5,000
          </p>
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
            ✓ Authenticity guaranteed
          </p>
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
            ✓ Handcrafted with care
          </p>
        </div>
      </motion.div>
    </div>
  );
};
