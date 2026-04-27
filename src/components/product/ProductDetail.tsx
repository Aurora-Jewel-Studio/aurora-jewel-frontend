"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const AccordionItem = ({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-sm font-semibold tracking-widest uppercase transition-colors hover:text-[var(--color-brand-accent)] text-gray-900"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronLeft size={16} className="-rotate-90" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 text-[15px] text-gray-600 leading-relaxed font-light">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const { addToCart, isAdding } = useCart();

  const images = product.images?.length
    ? product.images
    : [{ url: "/images/hero-jewelry.png" }];

  // Find variant matching selected options
  const selectedVariant =
    product.variants?.find((variant) => {
      if (!variant.options) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variant.options[key] === value
      );
    }) || product.variants?.[0];

  // Get NPR price for selected variant
  let price = selectedVariant?.prices?.npr ?? product.price;

  // Enforce Panchadhatu price as 60% of Silver price
  if (selectedOptions["Material"] === "Panchadhatu") {
    const silverVariant = product.variants?.find(
      (v) =>
        v.options?.["Material"] === "Silver" ||
        v.options?.["Material"] === "Sterling Silver"
    );
    const baseSilverPrice = silverVariant?.prices?.npr ?? product.price;
    price = baseSilverPrice * 0.6;
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart({
      variantId: selectedVariant.id,
      productHandle: product.handle,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: price ?? 0,
      currencyCode: "npr",
      thumbnail: product.thumbnail,
    });
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
            {images.map((img, idx) => (
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
          <Link href="/" className="hover:text-[var(--color-brand-accent)]">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.category.toLowerCase()}`}
            className="hover:text-[var(--color-brand-accent)]"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        {/* Category Badge */}
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand-accent)] font-semibold mb-2">
          {product.category}
        </span>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl mb-4">
          {product.title}
        </h1>

        {/* Price */}
        {price !== undefined && (
          <p className="text-2xl font-light mb-6">{formatPrice(price)}</p>
        )}

        {/* Description */}
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Options */}
        {product.options?.map((option) => (
          <div key={option.title} className="mb-6">
            <p className="text-sm uppercase tracking-wider font-semibold mb-3">
              {option.title}
            </p>
            <div className="flex gap-3 flex-wrap">
              {option.values?.map((val) => (
                <button
                  key={val}
                  onClick={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [option.title]: val,
                    }))
                  }
                  className={`px-5 py-2.5 border text-sm transition-all ${
                    selectedOptions[option.title] === val
                      ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white"
                      : "border-gray-300 hover:border-[var(--color-brand-primary)]"
                  }`}
                >
                  {val}
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

        {/* Product Details Accordions */}
        <div className="mt-12">
          {/* Key Features */}
          <AccordionItem title="Key Features" defaultOpen={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 uppercase tracking-wider text-xs">Stone</span>
                <span className="font-medium text-gray-900">Green Onyx</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 uppercase tracking-wider text-xs">Type</span>
                <span className="font-medium text-gray-900">Simulated Stone</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 uppercase tracking-wider text-xs">Stone 2</span>
                <span className="font-medium text-gray-900">Moissanite</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 uppercase tracking-wider text-xs">Type 2</span>
                <span className="font-medium text-gray-900">Simulated Stone</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 uppercase tracking-wider text-xs">Color</span>
                <span className="font-medium text-gray-900">Green</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 uppercase tracking-wider text-xs">Chain length</span>
                <span className="font-medium text-gray-900">17" (customizable)</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2 md:col-span-2">
                <span className="text-gray-500 uppercase tracking-wider text-xs">Silver weight</span>
                <span className="font-medium text-gray-900">12.410 gm</span>
              </div>
            </div>
          </AccordionItem>

          {/* How to Care */}
          <AccordionItem title="How to Care">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                Store in a dry area & away from damp conditions
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                Avoid perfume, cosmetics or any other chemicals
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                Avoid washing or rubbing with water
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                Gently clean with a fresh cloth if needed
              </li>
            </ul>
          </AccordionItem>

          {/* Shipping */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <AccordionItem title="Shipping">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                  Products will be shipped between 15-21 days after placing order.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                  Worldwide shipping available.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                  Standard shipping costs apply. Please review upon checkout.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                  All tariffs for US & EU orders are included.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-brand-accent)] mt-0.5 text-xs">◇</span> 
                  All tariffs for Nepal & India are included.
                </li>
              </ul>
            </AccordionItem>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 pt-8 space-y-3">
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
