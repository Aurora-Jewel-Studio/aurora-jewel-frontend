import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProductsByCategory } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CATEGORIES } from "@/lib/constants";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

const COLLECTION_IMAGES: Record<string, string> = {
  drops: "/images/collection-drops.png",
  nexus: "/images/collection-nexus.png",
  essence: "/images/collection-essence.png",
  sparkles: "/images/collection-sparkles.png",
  radiance: "/images/collection_radiance.png",
  emblem: "/images/collection_emblem.png",
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  
  // Find the category info from our constants
  const categoryInfo = CATEGORIES.find(
    (c) => c.id.toLowerCase() === handle.toLowerCase()
  );

  if (!categoryInfo) {
    notFound();
  }

  // Fetch products from Medusa by category name
  const { products, category } = await getProductsByCategory(categoryInfo.name);

  // Determine cover image
  const coverImage = COLLECTION_IMAGES[categoryInfo.id] || "/images/hero-jewelry.png";

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Immersive Hero Banner */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 bg-[#011B12] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={coverImage} 
            alt={categoryInfo.name} 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011B12]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
            Our Collection
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto font-light">
            {categoryInfo.description}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--text-secondary)] text-lg">
                No products found in this collection yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Generate static params for known categories
export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    handle: cat.id,
  }));
}
