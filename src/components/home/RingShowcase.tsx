"use client";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the 3D model to avoid SSR issues
const RingModel = dynamic(() => import("./RingModel"), { ssr: false });

/* ------------------------------------------------------------------ */
/*  Loading Spinner                                                    */
/* ------------------------------------------------------------------ */

const RingLoader = () => (
  <div className="ring-showcase__loader">
    <div className="ring-showcase__loader-ring" />
    <p className="ring-showcase__loader-text">Loading 3D Experience...</p>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main Showcase Component                                            */
/* ------------------------------------------------------------------ */

export const RingShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0);

  // Track scroll progress through the section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Use motion value event to update the scroll value for Three.js
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollValue(latest);
  });

  // Animation transforms based on scroll
  const ringScale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.6, 1, 1.1, 1.05, 0.9]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const ringY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [120, 0, 0, -80]);

  // Text animations
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.65, 0.8], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.25, 0.65, 0.8], [60, 0, 0, -40]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.75], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.75], [40, 0, 0, -30]);

  const ctaOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.55, 0.7], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.35, 0.5, 0.55, 0.7], [30, 0, 0, -20]);

  // Glow intensity based on scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8, 1], [0, 0.3, 0.7, 0.5, 0]);

  // Check if client-side (Canvas only renders on client)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <section ref={containerRef} className="ring-showcase" id="ring-showcase" style={{ position: "relative" }}>
      <div className="ring-showcase__sticky">
        {/* Background effects */}
        <div className="ring-showcase__bg" />
        <motion.div className="ring-showcase__glow" style={{ opacity: glowOpacity }} />
        <motion.div className="ring-showcase__glow ring-showcase__glow--accent" style={{ opacity: glowOpacity }} />

        {/* 3D Canvas */}
        <motion.div
          className="ring-showcase__canvas-wrapper"
          style={{
            scale: ringScale,
            opacity: ringOpacity,
            y: ringY,
          }}
        >
          {isClient && (
            <Suspense fallback={<RingLoader />}>
              <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                dpr={[1, 2]}
                gl={{ 
                  antialias: true, 
                  alpha: true,
                  powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
              >
                <RingModel scrollProgress={scrollValue} />
              </Canvas>
            </Suspense>
          )}
        </motion.div>

        {/* Text overlay */}
        <div className="ring-showcase__content">
          <motion.div
            className="ring-showcase__text-group"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <span className="ring-showcase__label">Signature Piece</span>
            <h2 className="ring-showcase__title">
              Crafted with <br />
              <span className="ring-showcase__title-accent">Precision</span>
            </h2>
          </motion.div>

          <motion.p
            className="ring-showcase__subtitle"
            style={{ opacity: subtitleOpacity, y: subtitleY }}
          >
            Each gemstone is hand-selected and set by our master artisans, producing a ring
            that captures light from every angle.
          </motion.p>

          <motion.div
            className="ring-showcase__cta"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <a href="/collections" className="ring-showcase__cta-button">
              Explore the Collection
            </a>
          </motion.div>
        </div>

        {/* Floating decorative lines */}
        <motion.div
          className="ring-showcase__deco ring-showcase__deco--left"
          style={{ opacity: glowOpacity }}
        />
        <motion.div
          className="ring-showcase__deco ring-showcase__deco--right"
          style={{ opacity: glowOpacity }}
        />
      </div>
    </section>
  );
};
