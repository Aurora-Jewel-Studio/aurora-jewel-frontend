"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { STORE_NAME } from "@/lib/constants";

interface NavbarProps {
  darkText?: boolean;
}

export const Navbar = ({ darkText = false }: NavbarProps = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const { totalQuantity, setIsCartOpen } = useCart();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Glass effect trigger
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide/show on scroll direction
    if (latest > 150 && latest > previous) {
      setIsHidden(true);
      setIsMobileMenuOpen(false); // Close menu on scroll down
    } else {
      setIsHidden(false);
    }
  });

  const isDarkTheme = darkText || isScrolled;

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
          isScrolled
            ? "glass shadow-sm"
            : "bg-transparent",
          isDarkTheme ? "text-[var(--color-brand-primary)]" : "text-white dark:text-white"
        )}
      >
        {/* Optional top announcement bar 
        <div className="bg-[var(--color-brand-primary)] text-white text-xs text-center py-2 px-4 tracking-wider">
          COMPLIMENTARY SHIPPING ON ORDERS OVER NPR 150,000
        </div>
        */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="flex-1 md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2"
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Navigation Left */}
          <nav
            className={cn(
              "hidden md:flex flex-1 gap-8 text-sm uppercase tracking-widest font-medium transition-colors",
              isDarkTheme ? "text-[var(--color-brand-primary)]" : "text-white",
            )}
          >
            <Link
              href="/collections/all"
              className="hover:text-[var(--color-brand-accent)] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="hover:text-[var(--color-brand-accent)] transition-colors"
            >
              About
            </Link>
            {/* <Link href="/contact" className="hover:text-[var(--color-brand-accent)] transition-colors">
              Contact
            </Link> */}
            <Link
              href="/bespoke"
              className="hover:text-[var(--color-brand-accent)] transition-colors"
            >
              Bespoke
            </Link>
          </nav>

          {/* Center Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex-shrink-0 flex items-center justify-center relative h-16 w-32 translate-y-[-2px]"
          >
            <img
              key={isDarkTheme ? "scrolled-logo" : "top-logo"}
              src={
                isDarkTheme
                  ? "/images/logo-green-transparent.png"
                  : "/images/logo-white-transparent.png"
              }
              alt={STORE_NAME}
              className="h-full w-full object-contain transition-all duration-500"
            />
          </Link>

          {/* Desktop/Mobile Navigation Right */}
          <div
            className={cn(
              "flex-1 flex items-center justify-end gap-4 md:gap-6 transition-colors",
              isDarkTheme ? "text-[var(--color-brand-primary)]" : "text-white",
            )}
          >
            <button
              aria-label="Search"
              className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:block"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label="Account"
              className="hover:text-[var(--color-brand-accent)] transition-colors hidden md:block"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="relative hover:text-[var(--color-brand-accent)] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-brand-accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <CartDrawer />
    </>
  );
};
