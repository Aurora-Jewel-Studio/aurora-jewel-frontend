import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STORE_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Aurora Jewel Studio's terms of service — the terms and conditions governing the use of our website and purchase of our products.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar darkText={true} />

      <section className="pt-32 pb-20 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm mb-12 border-b border-gray-200 pb-8">
            Last updated: May 2026
          </p>

          <div className="space-y-10 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">1. General</h2>
              <p>
                By accessing and using the {STORE_NAME} website, you agree to be bound by these Terms of Service. If you
                do not agree, please do not use our website or purchase our products.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">2. Products &amp; Pricing</h2>
              <ul className="space-y-2 ml-4">
                <li>• All prices are listed in Nepalese Rupees (NPR) and include applicable taxes.</li>
                <li>• Product images are representative. Due to the handcrafted nature of our jewellery, minor variations in color, texture, and stone placement are natural and expected.</li>
                <li>• We reserve the right to update prices at any time without prior notice.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">3. Orders &amp; Payment</h2>
              <ul className="space-y-2 ml-4">
                <li>• An order is confirmed only after successful payment via our supported gateway (Khalti).</li>
                <li>• We reserve the right to cancel an order if the product is out of stock or if fraudulent activity is suspected.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">4. Bespoke Orders</h2>
              <p>
                Custom and bespoke pieces are crafted specifically for you. Once production has begun, bespoke orders
                cannot be cancelled or returned. Please ensure all design details are confirmed before placing your order.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">5. Intellectual Property</h2>
              <p>
                All content on this website — including images, text, logos, and product designs — is the intellectual
                property of {STORE_NAME} and may not be reproduced, distributed, or used without written permission.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">6. Limitation of Liability</h2>
              <p>
                {STORE_NAME} shall not be held liable for any indirect, incidental, or consequential damages arising from
                the use of our website or products, beyond the value of the purchased item.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">7. Governing Law</h2>
              <p>
                These terms are governed by the laws of Nepal. Any disputes will be subject to the jurisdiction of the
                courts in Kathmandu, Nepal.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">8. Contact</h2>
              <p>
                For questions about these terms, contact us at{" "}
                <a
                  href="mailto:concierge@aurorajewelstudio.com"
                  className="text-[var(--color-brand-accent)] hover:underline"
                >
                  concierge@aurorajewelstudio.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
