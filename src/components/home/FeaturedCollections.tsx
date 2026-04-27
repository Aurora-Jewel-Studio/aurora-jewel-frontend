"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const collections = [
  {
    id: "drops",
    name: "Drops",
    image: "/images/collection-drops.png",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "essence",
    name: "Essence",
    image: "/images/collection-essence.png",
    span: "col-span-1 row-span-1",
  },
  {
    id: "sparkles",
    name: "Sparkles",
    image: "/images/collection-sparkles.png",
    span: "col-span-1 row-span-1",
  },
  {
    id: "nexus",
    name: "Nexus",
    image: "/images/collection-nexus.png",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

export const FeaturedCollections = () => {
  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-black dark:bg-white opacity-30" />
            <span className="uppercase tracking-[0.2em] text-xs font-semibold">
              Discover
            </span>
            <div className="h-[1px] w-12 bg-black dark:bg-white opacity-30" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl">Our Collections</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <AnimatedSection
              key={collection.id}
              delay={index * 0.15}
              className={`group relative overflow-hidden ${collection.span}`}
            >
              <Link
                href={`/collections/${collection.id}`}
                className="block w-full h-full min-h-[300px] md:min-h-[400px]"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <h3 className="text-white font-serif text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {collection.name}
                  </h3>
                  <div className="flex items-center text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span>Explore</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 border-b border-black dark:border-white pb-1 font-sans uppercase tracking-widest text-sm hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors"
          >
            View All Creations <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
