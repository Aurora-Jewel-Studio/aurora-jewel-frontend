import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { RingShowcase } from "@/components/home/RingShowcase";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BespokeServices } from "@/components/home/BespokeServices";
import { DiscoverServices } from "@/components/home/DiscoverServices";
import { Newsletter } from "@/components/home/Newsletter";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Jewel Studio | Premium Handcrafted Jewellery from Nepal",
  description: "Discover Aurora Jewel Studio. We specialize in exquisite handcrafted jewellery, bespoke designs, sterling silver, and traditional Panchadhatu pieces.",
  alternates: {
    canonical: "https://aurorajewelstudio.com",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Navbar />
      
      <div className="flex-1">
        <HeroSection />
        <RingShowcase />
        <FeaturedCollections />
        <BespokeServices />
        <DiscoverServices />
        <Newsletter />
      </div>

      <Footer />
    </main>
  );
}
