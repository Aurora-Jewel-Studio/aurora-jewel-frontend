import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { RingShowcase } from "@/components/home/RingShowcase";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BespokeServices } from "@/components/home/BespokeServices";
import { DiscoverServices } from "@/components/home/DiscoverServices";
import { Newsletter } from "@/components/home/Newsletter";

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
