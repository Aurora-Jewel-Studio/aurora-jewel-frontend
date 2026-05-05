import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jewellery Care Guide",
  description:
    "Learn how to care for your Aurora Jewel Studio silver and Panchadhatu jewellery to maintain its brilliance for years.",
};

export default function CarePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar darkText={true} />

      <section className="pt-32 pb-20 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight">
            Jewellery Care
          </h1>
          <p className="text-gray-500 text-lg mb-12 border-b border-gray-200 pb-8">
            A few simple habits will keep your pieces sparkling for generations.
          </p>

          {/* Daily Wear */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-4">
              Daily Wear
            </h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Put jewellery on last — after perfume, lotion, and makeup.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Remove before swimming, exercising, or sleeping to avoid scratches and chemical exposure.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Avoid contact with household chemicals, bleach, and chlorine.
              </li>
            </ul>
          </div>

          {/* Silver Care */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-4">
              Sterling Silver Care
            </h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Silver naturally tarnishes over time. Gently polish with a soft, lint-free cloth to restore shine.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Store in an airtight pouch or zip-lock bag to slow tarnishing.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                For deeper cleaning, use warm water with a drop of mild dish soap. Rinse thoroughly and pat dry.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Avoid silver dip solutions on gemstone-set pieces — the chemicals can damage stones.
              </li>
            </ul>
          </div>

          {/* Gemstone Care */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-4">
              Gemstone Care
            </h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Different stones have different hardness levels. Avoid stacking pieces that may scratch each other.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Clean gemstones with a soft damp cloth. Never use ultrasonic cleaners on opals, pearls, or turquoise.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Keep away from prolonged direct sunlight — some stones (amethyst, rose quartz) may fade.
              </li>
            </ul>
          </div>

          {/* Storage */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-4">
              Storage Tips
            </h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Store each piece individually in the pouch provided to prevent tangles and scratches.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Keep in a cool, dry place away from humidity and direct heat.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Adding a small silica gel packet to your jewellery box helps absorb moisture.
              </li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="font-serif text-xl text-gray-900 mb-2">
              Need a Professional Clean?
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              We offer complimentary cleaning and polishing for all Aurora Jewel Studio pieces. Reach out via our contact page or DM us on Instagram.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
