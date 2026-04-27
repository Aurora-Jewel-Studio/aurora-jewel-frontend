"use client";

import React, { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex flex-col bg-[var(--bg-primary)] overflow-hidden selection:bg-[var(--color-brand-accent)] selection:text-[var(--bg-primary)]"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center bg-[#011B12] text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
        >
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600"
            alt="Silver craftsmanship"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#011B12]/90 via-[#011B12]/60 to-[#011B12]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="uppercase tracking-[0.4em] text-xs font-semibold text-[var(--color-brand-accent)] mb-8">
              The Aurora Legacy
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9]">
              Heritage <br />{" "}
              <span className="italic font-light opacity-90">&</span> Artistry
            </h1>
            <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto font-light leading-relaxed">
              Where timeless Nepali craftsmanship meets modern elegance. Every
              piece is a whispered secret of the mountains, forged into an
              eternal reflection of your inner radiance.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50"
        >
          <span className="uppercase tracking-[0.2em] text-[10px] font-medium">
            Discover
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Chapter 1: Rooted in the Mountains */}
      <section className="relative py-32 lg:py-48 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative z-10"
            >
              <div className="pl-4 border-l border-[var(--color-brand-accent)] mb-8">
                <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[var(--color-brand-accent)]">
                  Chapter I &mdash; Kathmandu, Nepal
                </p>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl mb-8 leading-tight">
                Rooted In <br />{" "}
                <span className="italic font-light text-[var(--color-brand-accent)]">
                  The Mountains
                </span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-[1.8] mb-8 font-light">
                Nested in the capital valley of Kathmandu, the first steps were
                set about when we sold a pair of chandelier earrings in 2002.
                We've now grown into crafting our own jewellery across this
                beautiful journey.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-[1.8] font-light">
                Today, we are proud to be over 1000+ active clients strong,
                growing our legacy one exquisite piece at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-6 lg:col-start-7 relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                <img
                  src="/images/kathmandu-workshop.png"
                  alt="Kathmandu Workshop"
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-[var(--color-brand-accent)] opacity-30 pointer-events-none hidden md:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Crafted from Heritage */}
      <section className="relative py-32 lg:py-48 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-7 order-2 lg:order-1 relative"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-sm relative shadow-2xl">
                <img
                  src="/images/jaipur-heritage.png"
                  alt="Jaipur Heritage"
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -top-8 -right-8 w-40 h-40 border-t border-r border-[var(--color-brand-accent)] opacity-30 pointer-events-none hidden md:block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-4 lg:col-start-9 order-1 lg:order-2 relative z-10"
            >
              <div className="pl-4 border-l border-[var(--color-brand-accent)] mb-8">
                <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[var(--color-brand-accent)]">
                  Chapter II &mdash; Jaipur, Rajasthan
                </p>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl mb-8 leading-tight text-white">
                Crafted From <br />{" "}
                <span className="italic font-light text-[var(--color-brand-accent)]">
                  Heritage
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-[1.8] font-light">
                We saddled on our camels and immersed ourselves in Rajasthan's
                profound cultural workmanship in 2011. Every stone is
                meticulously pieced together, etched into a story of artistry
                brought to life by hands carrying a gift from centuries past.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Break */}
      <section className="py-32 bg-[var(--color-brand-primary)] text-white relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              "Sparkling under the snow and sculpted in the sand,{" "}
              <span className="text-[var(--color-brand-accent)] italic">
                each design tells a unique story.
              </span>
              "
            </h2>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-white/50">
              A New Tale Everyday
            </p>
          </motion.div>
        </div>
      </section>

      {/* Epilogue: Aspire & Contact */}
      <section className="py-32 lg:py-40 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <h3 className="font-serif text-3xl mb-6 flex items-center gap-4">
                What Do We Aspire For?
              </h3>
              <p className="text-[var(--text-secondary)] leading-[1.8] font-light text-lg">
                We know how important it is to wear jewelry that reflects who
                you are. Each design is crafted with meticulous care to create a
                meaningful, eternal connection. Allow us the honor of being your
                trusted personal jewelers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-serif text-3xl mb-6">Talk To Us</h3>
              <p className="text-[var(--text-secondary)] leading-[1.8] font-light text-lg mb-8">
                The moments you cherish deserve to be celebrated in silver and
                gold. We welcome your ideas, suggestions, and bespoke custom
                designs. Share your story with us, and we'll be all ears!
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-white uppercase tracking-widest text-xs font-semibold group/link"
              >
                <span className="border-b border-[var(--color-brand-accent)] pb-1 transition-colors group-hover/link:text-[var(--color-brand-accent)]">
                  Contact Concierge
                </span>
                <ArrowRight
                  size={16}
                  className="text-[var(--color-brand-accent)] transform transition-transform group-hover/link:translate-x-2"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
