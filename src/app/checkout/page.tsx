"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    payment_method: "cod",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        items,
        ...formData,
        total_amount: totalAmount,
        currency: "npr",
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create order");
      }

      // Order created successfully
      if (formData.payment_method === "cod") {
        clearCart();
        router.push("/checkout/success");
      } else {
        // Mock payment integration for Khalti/eSewa
        alert(`Integration for ${formData.payment_method} is pending. Proceeding as Cash on Delivery for now.`);
        clearCart();
        router.push("/checkout/success");
      }
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar darkText={true} />
        <section className="flex-1 pt-32 pb-16 flex items-center justify-center bg-[var(--bg-primary)]">
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-4 text-gray-900">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Add some items before proceeding to checkout.</p>
            <Link href="/collections/all">
              <Button>Explore Collections</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar darkText={true} />

      <section className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link href="/collections/all" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Continue Shopping
        </Link>
        
        <h1 className="font-serif text-4xl mb-12 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Section */}
          <div className="lg:col-span-7 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-serif text-2xl mb-6 text-gray-900">Shipping Details</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input required type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input required type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input required type="tel" name="customer_phone" value={formData.customer_phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                <textarea required name="shipping_address" value={formData.shipping_address} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]" placeholder="Street Address, City, Region"></textarea>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h2 className="font-serif text-2xl mb-6 text-gray-900">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="payment_method" value="cod" checked={formData.payment_method === "cod"} onChange={handleChange} className="h-4 w-4 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] border-gray-300" />
                    <span className="ml-3 font-medium text-gray-900">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="payment_method" value="khalti" checked={formData.payment_method === "khalti"} onChange={handleChange} className="h-4 w-4 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] border-gray-300" />
                    <div className="ml-3 flex flex-col">
                      <span className="font-medium text-gray-900">Khalti Digital Wallet</span>
                      <span className="text-xs text-gray-500">Pay securely via Khalti</span>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="payment_method" value="esewa" checked={formData.payment_method === "esewa"} onChange={handleChange} className="h-4 w-4 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] border-gray-300" />
                    <div className="ml-3 flex flex-col">
                      <span className="font-medium text-gray-900">eSewa</span>
                      <span className="text-xs text-gray-500">Pay securely via eSewa</span>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#011B12] text-white p-8 rounded-xl sticky top-32">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              
              <ul className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded overflow-hidden flex-shrink-0">
                      <img src={item.thumbnail || "/images/hero-jewelry.png"} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
                      <p className="text-white/60 text-xs mt-1">{item.variantTitle}</p>
                      <p className="text-white/60 text-xs mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-sm">
                      {formatPrice(item.price * item.quantity, item.currencyCode)}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/20 pt-6 space-y-4">
                <div className="flex justify-between text-sm text-white/80">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/80">
                  <span>Shipping</span>
                  <span>Standard Rate</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-4 border-t border-white/20">
                  <span>Total</span>
                  <span className="text-[var(--color-brand-accent)]">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <Button 
                form="checkout-form" 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-8 bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)]/90 text-[var(--bg-primary)]"
              >
                {isSubmitting ? "Processing..." : `Pay ${formatPrice(totalAmount)}`}
              </Button>
              <div className="mt-4 flex items-center justify-center text-xs text-white/50">
                <CheckCircle size={12} className="mr-1" /> Secure Encrypted Checkout
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </main>
  );
}
