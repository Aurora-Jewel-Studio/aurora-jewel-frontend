"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const BespokeServices = () => {
  return (
    <section className="py-24 bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Image */}
          <AnimatedSection direction="right" className="flex-1 w-full relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="/images/bespoke-crafting.png" 
                alt="Bespoke Jewellery Crafting" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[var(--color-brand-accent)] -z-10 hidden md:block" />
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection direction="left" delay={0.2} className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-[var(--color-brand-accent)]">Atelier</span>
              <div className="h-[1px] w-12 bg-[var(--color-brand-accent)]" />
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Bespoke Services & <br />
              Custom Creations
            </h2>
            
            <p className="text-[var(--text-secondary)] mb-8 text-lg font-light leading-relaxed">
              Transform your vision into a timeless masterpiece. Our master artisans work closely with you 
              to source the finest silver and panchadhatu to craft a piece that tells your unique story. From the initial 
              sketch to the final polish, experience the journey of creation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div>
                <h4 className="font-serif text-xl mb-2">01. Design</h4>
                <p className="text-sm text-[var(--text-secondary)]">Consultation & Sketching</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">02. Source</h4>
                <p className="text-sm text-[var(--text-secondary)]">Gemstone Selection</p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">03. Craft</h4>
                <p className="text-sm text-[var(--text-secondary)]">Artisan Fabrication</p>
              </div>
            </div>

            <Link href="/bespoke">
              <Button variant="primary" size="lg">
                Start Your Journey
              </Button>
            </Link>
          </AnimatedSection>
          
        </div>
      </div>
    </section>
  );
};
