import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CATEGORIES } from "@/lib/constants";

// Map collections to their cover images
const COLLECTION_IMAGES: Record<string, string> = {
  drops: "/images/collection-drops.png",
  nexus: "/images/collection-nexus.png",
  essence: "/images/collection-essence.png",
  sparkles: "/images/collection-sparkles.png",
  radiance: "/images/collection_radiance.png",
  emblem: "/images/collection_emblem.png",
};

export default function AllCollectionsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#011B12] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <AnimatedSection>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
              Masterpieces
            </p>
            <h1 className="font-serif text-5xl md:text-7xl mb-6">
              All Collections
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto font-light">
              Explore our complete range of exquisite silver and panchadhatu
              jewelry. Each collection is masterfully crafted to reflect a
              unique aspect of your inner spark.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-24 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {CATEGORIES.map((collection, index) => (
              <AnimatedSection
                key={collection.id}
                delay={index * 0.1}
                className="group relative"
              >
                <Link
                  href={`/collections/${collection.id}`}
                  className="block overflow-hidden relative aspect-[4/5] md:aspect-[3/4]"
                >
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 z-10" />

                  {/* Image */}
                  <img
                    src={
                      COLLECTION_IMAGES[collection.id] ||
                      "/images/hero-jewelry.png"
                    }
                    alt={collection.name}
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />

                  {/* Content Container */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h2 className="text-white font-serif text-4xl md:text-5xl mb-3">
                        {collection.name}
                      </h2>
                      <p className="text-white/90 text-lg font-light mb-6">
                        {collection.description}
                      </p>

                      <div className="flex items-center text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="pb-1 border-b border-transparent group-hover:border-[var(--color-brand-accent)] transition-colors">
                          Explore Collection
                        </span>
                        <ArrowRight
                          size={16}
                          className="ml-2 text-[var(--color-brand-accent)]"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
