"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar darkText={true} />

      <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"
          >
            <CheckCircle size={40} />
          </motion.div>
          
          <h1 className="font-serif text-3xl mb-4 text-gray-900">Thank You For Your Order!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We've received your order and are preparing it for shipment. You will receive an email confirmation shortly with your order details.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-8 text-sm text-gray-600 text-left">
            <p className="font-medium text-gray-900 mb-1">What happens next?</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Our artisans will prepare your pieces with care.</li>
              <li>We will notify you once your package ships.</li>
              <li>If you chose Cash on Delivery, please have the exact amount ready.</li>
            </ul>
          </div>

          <Link href="/collections/all">
            <Button className="w-full">Return to Shop</Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
