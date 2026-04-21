import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 bg-[#011B12] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600" 
            alt="Silver craftsmanship" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#011B12]/80 via-[#011B12]/40 to-[#011B12]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
              Our Heritage
            </p>
            <h1 className="font-serif text-5xl md:text-7xl mb-6">
              About Aurora Jewel Studio
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto font-light">
              Where timeless Nepali craftsmanship meets modern elegance. Every piece tells a story of heritage, artistry, and the inner radiance of the wearer.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 md:order-1">
              <h2 className="font-serif text-4xl mb-6">Our Philosophy</h2>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Aurora Jewel Studio was born from a desire to elevate silver jewelry to its rightful place—as a medium of profound beauty and expression. We believe that true luxury lies not in the price of the metal, but in the perfection of the craft.
              </p>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                By integrating traditional Panchadhatu detailing—a sacred blend of five metals—with premium 925 sterling silver, we create pieces that ground you in tradition while illuminating your contemporary style.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="order-1 md:order-2">
               <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800" 
                    alt="Jewelry workshop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border border-[var(--color-brand-accent)] m-4 opacity-50 pointer-events-none" />
               </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl lg:text-5xl mb-16">The Art of the Craft</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              <div>
                <span className="text-[var(--color-brand-accent)] text-4xl font-serif mb-4 block">01</span>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-wider">Purity</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  We source only the finest 925 sterling silver, ensuring exceptional durability and a brilliant luster that will not fade with time.
                </p>
              </div>
              
              <div>
                <span className="text-[var(--color-brand-accent)] text-4xl font-serif mb-4 block">02</span>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-wider">Heritage</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Our artisans carry forward generations of Nepali metalworking techniques, blending ancient wisdom with precision engineering.
                </p>
              </div>
              
              <div>
                <span className="text-[var(--color-brand-accent)] text-4xl font-serif mb-4 block">03</span>
                <h3 className="text-xl font-serif mb-4 uppercase tracking-wider">Design</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Every silhouette is meticulously conceptualized to flatter the wearer, creating an effortless transition from daily elegance to evening glamour.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
