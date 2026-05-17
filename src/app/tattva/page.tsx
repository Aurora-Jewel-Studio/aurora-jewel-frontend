"use client";

import React, { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Gem, Leaf, RefreshCw } from "lucide-react";

const FIVE_METALS = [
  {
    name: "Gold",
    sanskrit: "Suvarna",
    symbol: "Au",
    description: "Symbolizes the Sun and prosperity. Gold brings warmth, vitality, and spiritual illumination to the wearer.",
    color: "#D4A843",
  },
  {
    name: "Silver",
    sanskrit: "Rajata",
    symbol: "Ag",
    description: "Represents the Moon and tranquility. Silver calms the mind, enhances intuition, and promotes emotional balance.",
    color: "#C0C0C0",
  },
  {
    name: "Copper",
    sanskrit: "Tamra",
    symbol: "Cu",
    description: "Linked to Mars and courage. Copper stimulates energy flow, supports joint health, and promotes vitality.",
    color: "#B87333",
  },
  {
    name: "Iron",
    sanskrit: "Loha",
    symbol: "Fe",
    description: "Associated with Saturn and strength. Iron builds resilience, grounds the spirit, and offers protective energy.",
    color: "#71797E",
  },
  {
    name: "Zinc",
    sanskrit: "Yashada",
    symbol: "Zn",
    description: "Connected to Jupiter and wisdom. Zinc supports immunity, promotes healing, and encourages mental clarity.",
    color: "#9EAEB5",
  },
];

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Ayurvedic Harmony",
    description: "The sacred blend of five metals is believed to balance the body's energies and promote holistic well-being.",
  },
  {
    icon: Shield,
    title: "Protective Energy",
    description: "Traditionally worn as a spiritual shield, Panchadhatu jewelry is thought to ward off negativity and bring good fortune.",
  },
  {
    icon: Gem,
    title: "Timeless Patina",
    description: "Unlike synthetic alloys, Panchadhatu develops a rich, living patina over time — a character uniquely yours.",
  },
  {
    icon: Leaf,
    title: "Skin-Friendly",
    description: "The natural composition of the five metals is gentle on the skin, making it suitable for everyday wear.",
  },
  {
    icon: RefreshCw,
    title: "Easy Maintenance",
    description: "A gentle polish restores their original luster, or let them evolve naturally — both choices honor the metal's living nature.",
  },
];

export default function TattvaPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex flex-col bg-[var(--bg-primary)] overflow-hidden"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 md:pt-52 md:pb-44 bg-[#011B12] text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]) }}
        >
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600"
            alt="Sacred metalwork"
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#011B12]/80 via-[#011B12]/60 to-[#011B12]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="uppercase tracking-[0.4em] text-xs font-semibold text-[var(--color-brand-accent)] mb-6">
              The Sacred Alloy
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9]">
              Tattva
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-light leading-relaxed">
              <span className="italic">Panchdhaatu</span> translates to &ldquo;five metals&rdquo; &mdash; a convergence of gold, silver, copper, iron, and zinc. Each metal believed to carry the whisper of celestial wisdom.
            </p>
          </motion.div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 L0,40 Q360,0 720,40 T1440,40 L1440,60 Z" fill="var(--bg-primary)" />
          </svg>
        </div>
      </section>

      {/* The Tattva Story */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 text-[var(--color-brand-primary)]">
                Sacred Science,<br />Wearable Art
              </h2>
              <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed font-light">
                <p>
                  The Tattva story doesn&rsquo;t simply use Panchdhaatu &mdash; it celebrates it. At Aurora, you can choose to order every single design in either sterling silver or Panchdhaatu.
                </p>
                <p>
                  The unique blend of these metals ages gracefully, developing a rich character that synthetic metals cannot replicate. Each piece tells its own story through its patina, making every Tattva creation truly one-of-a-kind.
                </p>
                <p>
                  Tattva pieces are designed for everyday enchantment. A gentle polish restores their luster, or let them evolve naturally &mdash; both choices honor the metal&rsquo;s living nature.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1515562141589-67f0d3e7c603?w=800"
                    alt="Panchadhatu jewelry crafting"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-8 -left-8 bg-[var(--color-brand-primary)] text-white p-8 max-w-[260px] hidden md:block">
                  <p className="font-serif text-2xl mb-2">5 Sacred Metals</p>
                  <p className="text-sm opacity-80 font-light">
                    Blended in harmony for spiritual balance
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Five Metals */}
      <section className="py-24 md:py-32 bg-[#011B12] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
                The Composition
              </p>
              <h2 className="font-serif text-4xl md:text-6xl mb-6">
                The Five Metals
              </h2>
              <p className="text-lg opacity-70 max-w-2xl mx-auto font-light">
                Each element brings its own celestial energy, creating a harmonious alloy that transcends mere adornment.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {FIVE_METALS.map((metal, index) => (
              <AnimatedSection key={metal.name} delay={index * 0.1}>
                <div className="group relative p-8 border border-white/10 hover:border-[var(--color-brand-accent)]/40 transition-all duration-500 h-full flex flex-col">
                  {/* Metal symbol accent */}
                  <div className="mb-6">
                    <span
                      className="text-5xl font-serif font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ color: metal.color }}
                    >
                      {metal.symbol}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl mb-1">{metal.name}</h3>
                  <p className="text-sm text-[var(--color-brand-accent)] italic mb-4">
                    {metal.sanskrit}
                  </p>
                  <p className="text-sm opacity-70 font-light leading-relaxed flex-1">
                    {metal.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
                Why Panchadhatu
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[var(--color-brand-primary)]">
                Beyond Adornment
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto font-light">
                More than jewelry — Panchadhatu is a bridge between ancient wisdom and modern elegance.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <div className="group p-8 border border-[var(--border-color)] hover:border-[var(--color-brand-accent)] transition-all duration-500">
                  <benefit.icon
                    size={28}
                    className="text-[var(--color-brand-accent)] mb-6 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="font-serif text-xl mb-3 text-[var(--color-brand-primary)]">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[var(--color-brand-primary)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-6">
              Choose Your Metal
            </p>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              Every Design,<br />Your Choice
            </h2>
            <p className="text-lg opacity-80 max-w-xl mx-auto font-light mb-12">
              At Aurora Jewel Studio, every piece in our collection is available in both sterling silver and Panchadhatu. The choice is yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-brand-primary)] font-medium uppercase tracking-widest text-sm hover:bg-[var(--color-brand-accent)] hover:text-white transition-colors duration-300"
              >
                Browse Collections
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/bespoke"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/30 text-white font-medium uppercase tracking-widest text-sm hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)] transition-colors duration-300"
              >
                Commission Bespoke
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
