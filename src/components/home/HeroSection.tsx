"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/hero-jewelry.png"
          alt="Aurora Jewel Studio Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0A0A0A]" />
      </motion.div>

      {/* Floating Particles (Mocked via simple CSS animation) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-6"
        >
          Bespoke Gemstone Silver Jewelry
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight px-4"
          >
            Your{" "}
            <span className="italic font-light text-[var(--color-brand-accent)]">
              Sparkle
            </span>
            <br />
            Within
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-2xl text-gray-300 text-lg md:text-xl font-light mb-10"
        >
          We craft jewelry with precious stones to celebrate the woman of all
          ages. Carry your confidence with style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/collections/all">
            <Button
              size="lg"
              className="bg-[var(--color-brand-accent)] text-black hover:bg-[#b09040]"
            >
              Explore Collections
            </Button>
          </Link>
          <Link href="/bespoke">
            <Button
              size="lg"
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Bespoke Enquiry
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator down arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 inset-x-0 flex justify-center z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-white/50"
        />
      </motion.div>
    </section>
  );
};
