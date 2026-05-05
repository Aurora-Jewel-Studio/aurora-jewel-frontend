import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STORE_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Aurora Jewel Studio's privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar darkText={true} />

      <section className="pt-32 pb-20 bg-[var(--bg-primary)] flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mb-12 border-b border-gray-200 pb-8">
            Last updated: May 2026
          </p>

          <div className="space-y-10 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                When you place an order or contact us, we may collect the following information:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Full name and contact number</li>
                <li>• Delivery address</li>
                <li>• Email address (if provided)</li>
                <li>• Payment transaction details (processed securely via Khalti)</li>
                <li>• Custom design preferences for bespoke orders</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>We use your information solely to:</p>
              <ul className="space-y-2 ml-4 mt-2">
                <li>• Process and deliver your orders</li>
                <li>• Communicate about your order status</li>
                <li>• Fulfill bespoke design requests</li>
                <li>• Improve our products and services</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">3. Data Protection</h2>
              <p>
                We do not sell, trade, or share your personal information with third parties. Payment details are processed
                securely through Khalti&apos;s encrypted payment gateway and are never stored on our servers.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">4. Cookies</h2>
              <p>
                Our website uses minimal cookies to support basic functionality such as your shopping cart session. We do
                not use tracking or advertising cookies.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">5. Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your personal data at any time by contacting us
                through our contact page or via Instagram.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-gray-900 mb-3">6. Contact</h2>
              <p>
                For any privacy-related questions, reach out to us at{" "}
                <a
                  href="mailto:concierge@aurorajewelstudio.com"
                  className="text-[var(--color-brand-accent)] hover:underline"
                >
                  concierge@aurorajewelstudio.com
                </a>{" "}
                or DM us on{" "}
                <a
                  href="https://www.instagram.com/aurorajewelstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-brand-accent)] hover:underline"
                >
                  Instagram
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
