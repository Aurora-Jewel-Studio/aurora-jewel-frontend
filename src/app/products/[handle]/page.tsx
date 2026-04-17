import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProductByHandle } from "@/lib/data";
import { ProductDetail } from "@/components/product/ProductDetail";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-28 pb-16 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetail product={product} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
