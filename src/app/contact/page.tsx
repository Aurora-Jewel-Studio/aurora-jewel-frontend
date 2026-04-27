"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-[#011B12] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <AnimatedSection>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-5xl md:text-7xl mb-6">Contact Us</h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto font-light">
              Our concierges are available to assist you with inquiries, bespoke
              requests, and private appointments.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Details */}
            <AnimatedSection>
              <h2 className="font-serif text-3xl mb-8">Client Services</h2>

              <div className="space-y-12">
                <div>
                  <h3 className="uppercase tracking-widest text-xs font-semibold text-gray-500 mb-3">
                    Studio Address
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Lazimpat, Kathmandu
                    <br />
                    Bagmati Province, Nepal
                    <br />
                    (By Appointment Only)
                  </p>
                </div>

                <div>
                  <h3 className="uppercase tracking-widest text-xs font-semibold text-gray-500 mb-3">
                    Direct Inquiries
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-1">
                    <a
                      href="mailto:concierge@aurorajewel.com"
                      className="hover:text-[var(--color-brand-accent)] transition-colors border-b border-transparent hover:border-[var(--color-brand-accent)] pb-1"
                    >
                      contact@aurorajewelstudio.com
                    </a>
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    <a
                      href="tel:+9779800000000"
                      className="hover:text-[var(--color-brand-accent)] transition-colors"
                    >
                      +977 980-0000000
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="uppercase tracking-widest text-xs font-semibold text-gray-500 mb-3">
                    Operating Hours
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Sunday - Friday
                    <br />
                    10:00 AM - 6:00 PM NPT
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection
              delay={0.2}
              className="bg-[var(--bg-secondary)] p-8 lg:p-12 shadow-sm"
            >
              <h2 className="font-serif text-2xl mb-8">Send a Message</h2>

              {isSubmitted ? (
                <div className="bg-[#024931]/10 border border-[#024931]/20 p-8 text-center text-[#024931]">
                  <p className="font-serif text-xl mb-2">Message Sent</p>
                  <p className="text-sm">
                    Thank you for reaching out. Our concierge team will contact
                    you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors text-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
