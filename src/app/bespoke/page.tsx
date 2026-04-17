"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export default function BespokePage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    budget: "",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_URL}/store/bespoke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      setStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        budget: "",
        description: "",
      });
    } catch (error: any) {
      console.error("Bespoke submission error:", error);
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 bg-[#011B12] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1599643477877-508b9ec0e722?w=1600" 
            alt="Bespoke Jewelry Process" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011B12] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-brand-accent)] mb-4">
              Custom Creations
            </p>
            <h1 className="font-serif text-5xl md:text-7xl mb-6">
              Aurora Bespoke
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto font-light">
              Transform your vision into a timeless masterpiece. Our master artisans in Nepal will work closely with you to design and handcraft a piece that is uniquely yours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 text-[var(--color-foreground)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === "success" ? (
            <AnimatedSection>
              <div className="text-center p-12 border border-[var(--color-brand-accent)] bg-green-50/50 dark:bg-green-900/10 rounded-lg">
                <h2 className="font-serif text-3xl mb-4 text-[var(--color-brand-primary)]">Request Received</h2>
                <p className="text-[var(--text-secondary)] mb-8">
                  Thank you for your interest in Aurora Bespoke. Our lead artisan will review your design requirements and contact you within 2-3 business days to arrange an initial consultation.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setStatus("idle")}
                >
                  Submit Another Request
                </Button>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl mb-4">Start Your Journey</h2>
                <p className="text-[var(--text-secondary)]">Please provide us with some details about the piece you wish to commission.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label htmlFor="first_name" className="text-sm font-medium tracking-wide uppercase">First Name *</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="space-y-2">
                    <label htmlFor="last_name" className="text-sm font-medium tracking-wide uppercase">Last Name *</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium tracking-wide uppercase">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium tracking-wide uppercase">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium tracking-wide uppercase">Estimated Budget (NPR)</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent transition-all outline-none appearance-none"
                  >
                    <option value="" className="bg-[var(--bg-primary)]">Select a range</option>
                    <option value="50K - 100K" className="bg-[var(--bg-primary)]">NPR 50,000 - 100,000</option>
                    <option value="100K - 300K" className="bg-[var(--bg-primary)]">NPR 100,000 - 300,000</option>
                    <option value="300K - 500K" className="bg-[var(--bg-primary)]">NPR 300,000 - 500,000</option>
                    <option value="500K+" className="bg-[var(--bg-primary)]">NPR 500,000+</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium tracking-wide uppercase">Design Vision *</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your vision, preferred materials (e.g. Silver, Panchadhatu), stones, or any specific inspirations..."
                    className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-sm border border-red-200 dark:border-red-800 rounded">
                    {errorMessage}
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full tracking-widest uppercase"
                  isLoading={status === "submitting"}
                >
                  {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
                </Button>
              </form>
            </AnimatedSection>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
