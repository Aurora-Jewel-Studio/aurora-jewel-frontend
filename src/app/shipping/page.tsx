import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Learn about Aurora Jewel Studio's shipping policy, delivery timelines, and return process for handcrafted jewellery.",
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar darkText={true} />

      <section className="pt-32 pb-20 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight">
            Shipping &amp; Returns
          </h1>
          <p className="text-gray-500 text-lg mb-12 border-b border-gray-200 pb-8">
            Everything you need to know about receiving and returning your Aurora Jewel Studio pieces.
          </p>

          {/* Shipping */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-4">
              Shipping
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                All orders are carefully packaged in our signature gift box with protective cushioning to ensure your jewellery arrives in perfect condition.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-3 text-base">Delivery Timelines</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Inside Kathmandu Valley</span>
                    <span className="font-medium text-gray-900">1–3 business days</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Outside Kathmandu Valley</span>
                    <span className="font-medium text-gray-900">3–7 business days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Bespoke / Custom Orders</span>
                    <span className="font-medium text-gray-900">7–14 business days</span>
                  </li>
                </ul>
              </div>
              <p>
                You will receive a confirmation message with tracking details once your order has been dispatched.
              </p>
            </div>
          </div>

          {/* Shipping Charges */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-4">
              Shipping Charges
            </h2>
            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <p>
                We offer <strong className="text-gray-900">free shipping</strong> on all orders within Nepal. International shipping is available on request — please contact us for a quote.
              </p>
            </div>
          </div>

          {/* Returns */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-gray-900 mb-4">
              Returns &amp; Exchanges
            </h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                We accept returns within <strong className="text-gray-900">7 days</strong> of delivery for ready-made pieces in original, unworn condition with all packaging intact.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Bespoke and custom-made pieces are <strong className="text-gray-900">non-returnable</strong> as they are crafted specifically for you.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                To initiate a return, please contact us via Instagram DM or our contact page with your order details and reason for return.
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-brand-accent)] font-bold">•</span>
                Refunds will be processed within 5–7 business days after we receive and inspect the returned item.
              </li>
            </ul>
          </div>

          {/* Damaged Items */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="font-serif text-xl text-gray-900 mb-2">
              Received a Damaged Item?
            </h2>
            <p className="text-gray-500 text-sm">
              If your jewellery arrives damaged, please contact us within 48 hours with photos. We will arrange a replacement or full refund at no extra cost.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
