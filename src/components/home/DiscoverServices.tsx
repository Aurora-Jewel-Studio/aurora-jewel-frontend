"use client";

import Link from "next/link";
import { ShoppingBag, PenTool, TrendingUp } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const services = [
  {
    title: "Buy From Online Store",
    description: "Purchase your favorite piece from our store and have it delivered to your doorstep.",
    icon: <ShoppingBag className="w-8 h-8 text-[var(--color-brand-accent)]" />,
    link: "/collections/all"
  },
  {
    title: "Customize Your Designs",
    description: "Tell us about the design you want & we will make it exclusively for you.",
    icon: <PenTool className="w-8 h-8 text-[var(--color-brand-accent)]" />,
    link: "/bespoke"
  },
  {
    title: "Exports & Wholesale",
    description: "We will manufacture your B2B orders to help you build your own brand.",
    icon: <TrendingUp className="w-8 h-8 text-[var(--color-brand-accent)]" />,
    link: "/bespoke" // Placeholder, could be a wholesale contact page later
  }
];

export const DiscoverServices = () => {
  return (
    <section className="py-24 bg-[var(--color-brand-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Discover Our Services</h2>
          <div className="h-[1px] w-24 bg-[var(--color-brand-accent)] mx-auto opacity-50" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.2} className="flex flex-col items-center">
              <Link href={service.link} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 group-hover:border-[var(--color-brand-accent)] transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl mb-4 group-hover:text-[var(--color-brand-accent)] transition-colors">{service.title}</h3>
                <p className="text-gray-300 font-light text-sm leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
