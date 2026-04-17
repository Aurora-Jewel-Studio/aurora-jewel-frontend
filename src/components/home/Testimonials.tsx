"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    id: 1,
    name: "Eleanor Vance",
    location: "London",
    text: "The Bespoke Ring created by Aurora Jewel Studio exceeded all my expectations. The craftsmanship is truly unparalleled. It's not just a piece of jewellery, it's an heirloom.",
  },
  {
    id: 2,
    name: "Sophia Chen",
    location: "New York",
    text: "I purchased the Emerald Cascade necklace for my anniversary. The stones catch the light in a way I've never seen before. Absolutely stunning quality and service.",
  },
  {
    id: 3,
    name: "Isabella Rossi",
    location: "Milan",
    text: "Their attention to detail is remarkable. From the initial consultation to the elegant packaging, the entire experience felt incredibly premium.",
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[var(--color-brand-primary)] text-white overflow-hidden relative">
      {/* Decorative background monogram/pattern */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
        <h1 className="font-serif text-[400px] leading-none select-none">A</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <AnimatedSection>
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 text-[var(--color-brand-accent)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="h-[200px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-serif text-2xl md:text-3xl leading-relaxed italic mb-8">
                &quot;{testimonials[currentIndex].text}&quot;
              </p>
              <div>
                <p className="font-sans uppercase tracking-widest text-sm font-semibold">
                  {testimonials[currentIndex].name}
                </p>
                <p className="font-sans text-xs opacity-60 mt-1">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-[var(--color-brand-accent)]" : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
