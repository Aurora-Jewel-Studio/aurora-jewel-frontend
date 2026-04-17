"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-[var(--bg-primary)] flex flex-col pt-24 px-6 overflow-y-auto"
        >
          <nav className="flex-1 flex flex-col gap-6 font-serif text-2xl">
            <div className="border-b border-[var(--border-color)] pb-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-2">Home</Link>
            </div>
            
            <div className="border-b border-[var(--border-color)] pb-4">
              <p className="text-sm font-sans tracking-widest uppercase opacity-50 mb-4">Collections</p>
              <ul className="flex flex-col gap-4 text-xl">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/collections/${cat.id}`} onClick={() => setIsOpen(false)} className="flex items-center justify-between group">
                      <span>{cat.name}</span>
                      <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-b border-[var(--border-color)] pb-4">
              <Link href="/bespoke" onClick={() => setIsOpen(false)} className="block py-2">Bespoke Design</Link>
            </div>
            
            <div className="border-b border-[var(--border-color)] pb-4">
              <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2">Our Story</Link>
            </div>
          </nav>
          
          <div className="py-8 text-center text-sm opacity-70">
            <p>aurorajewelstudio.com</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
