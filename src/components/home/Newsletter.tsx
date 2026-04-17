"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export const Newsletter = () => {
  return (
    <section className="py-32 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-4xl mb-4">Join the Aurora Circle</h2>
          <p className="text-[var(--text-secondary)] mb-10 max-w-xl mx-auto">
            Subscribe to receive exclusive access to new collections, invitations to private viewing events, and insights into our craftsmanship.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent border-b border-gray-400 dark:border-gray-600 px-4 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors rounded-none placeholder-gray-500"
              required
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};
