import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProductByHandle, getAllProductHandles } from "@/lib/data";
import { ProductDetail } from "@/components/product/ProductDetail";
import { notFound } from "next/navigation";

import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aurorajewelstudio.com";

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${siteUrl}/products/${product.handle}`,
      images: [
        {
          url: product.thumbnail.startsWith("http")
            ? product.thumbnail
            : `${siteUrl}${product.thumbnail}`,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [
        product.thumbnail.startsWith("http")
          ? product.thumbnail
          : `${siteUrl}${product.thumbnail}`,
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  // Await the API call
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aurorajewelstudio.com";

  // JSON-LD Structured Data for Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.thumbnail.startsWith("http")
      ? product.thumbnail
      : `${siteUrl}${product.thumbnail}`,
    description: product.description,
    sku: product.variants?.[0]?.sku || product.handle,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.handle}`,
      priceCurrency: "NPR",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Aurora Jewel Studio",
      },
    },
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar darkText={true} />

      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-28 pb-16 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetail product={product} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
// Allow fallback for pages not pre-rendered
export const dynamicParams = false;

// Pre-render all product pages at build time
// NOTE: Backend API must be running during build for full product page generation
export async function generateStaticParams() {
  try {
    const handles = await getAllProductHandles();
    if (handles.length === 0) {
      console.warn(
        "No product handles found. Make sure backend API is running.",
      );
    }
    return handles.map((handle) => ({ handle }));
  } catch {
    console.warn(
      "Could not fetch product handles for static generation. Start the backend API before building.",
    );
    return [];
  }
}
