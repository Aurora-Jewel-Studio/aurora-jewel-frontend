"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { STORE_NAME, CATEGORIES } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-[#F5F0EB] pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="h-16 mb-6">
              <img src="/images/logo-white-transparent.png" alt={STORE_NAME} className="h-[120%] -ml-2 w-auto object-contain object-left pointer-events-none" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Crafting timeless elegance for the modern luxury connoisseur. 
              Our bespoke jewellery is a testament to unparalleled artistry and 
              the finest materials.
            </p>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-[var(--color-brand-accent)] transition-colors text-sm uppercase tracking-wider">Instagram</a>
              <a href="#" className="hover:text-[var(--color-brand-accent)] transition-colors text-sm uppercase tracking-wider">Facebook</a>
            </div>
          </div>

          {/* Links - Discover */}
          <div>
            <h3 className="font-sans uppercase tracking-widest text-xs mb-6 text-gray-500">Discover</h3>
            <ul className="space-y-4">
              {CATEGORIES.slice(0, 4).map(cat => (
                <li key={cat.id}>
                  <Link href={`/collections/${cat.id}`} className="hover:text-[var(--color-brand-accent)] transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Service */}
          <div>
            <h3 className="font-sans uppercase tracking-widest text-xs mb-6 text-gray-500">Client Service</h3>
            <ul className="space-y-4">
              <li><Link href="/bespoke" className="hover:text-[var(--color-brand-accent)] transition-colors text-sm">Bespoke Requests</Link></li>
              <li><Link href="/care" className="hover:text-[var(--color-brand-accent)] transition-colors text-sm">Jewellery Care</Link></li>
              <li><Link href="/shipping" className="hover:text-[var(--color-brand-accent)] transition-colors text-sm">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-brand-accent)] transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-sans uppercase tracking-widest text-xs mb-6 text-gray-500">Join the Circle</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive updates on new collections, exclusive events, and the latest from {STORE_NAME}.
            </p>
            <form className="flex mt-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-gray-600 px-0 py-2 w-full focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors text-sm rounded-none"
              />
              <button 
                type="submit" 
                className="border-b border-gray-600 px-4 py-2 hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors whitespace-nowrap text-sm uppercase tracking-widest font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {STORE_NAME}. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
