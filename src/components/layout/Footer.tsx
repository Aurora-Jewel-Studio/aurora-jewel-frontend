"use client";

import React from "react";
import Link from "next/link";
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
              <img
                src="/images/logo-white-transparent.png"
                alt={STORE_NAME}
                className="h-[120%] -ml-2 w-auto object-contain object-left pointer-events-none"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Bespoke and skin-friendly real silver gemstone jewelry. Check out
              our collection or customize today.
            </p>
            <div className="flex gap-4 text-gray-400">
              <a
                href="https://www.instagram.com/aurorajewelstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-brand-accent)] transition-colors text-sm uppercase tracking-wider"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Links - Discover */}
          <div>
            <h3 className="font-sans uppercase tracking-widest text-xs mb-6 text-gray-500">
              Discover
            </h3>
            <ul className="space-y-4">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/collections/${cat.id}`}
                    className="hover:text-[var(--color-brand-accent)] transition-colors text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--color-brand-accent)] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Service */}
          <div>
            <h3 className="font-sans uppercase tracking-widest text-xs mb-6 text-gray-500">
              Client Service
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/bespoke"
                  className="hover:text-[var(--color-brand-accent)] transition-colors text-sm"
                >
                  Bespoke Requests
                </Link>
              </li>
              <li>
                <Link
                  href="/care"
                  className="hover:text-[var(--color-brand-accent)] transition-colors text-sm"
                >
                  Jewellery Care
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-[var(--color-brand-accent)] transition-colors text-sm"
                >
                  Shipping &amp; Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us / CTA */}
          <div>
            <h3 className="font-sans uppercase tracking-widest text-xs mb-6 text-gray-500">
              Stay Connected
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              Follow us on Instagram for new drops, behind-the-scenes craft, and
              exclusive offers.
            </p>
            <a
              href="https://www.instagram.com/aurorajewelstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-gray-700 rounded-full px-6 py-3 text-sm uppercase tracking-wider hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)] transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @aurorajewelstudio
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
