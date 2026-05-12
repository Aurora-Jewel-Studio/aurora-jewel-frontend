import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aurorajewelstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aurora Jewel Studio | Premium Handcrafted Jewellery",
    template: "%s | Aurora Jewel Studio",
  },
  description:
    "Exquisite handcrafted jewellery from Nepal. Specialized in bespoke designs, sterling silver, and traditional Panchadhatu pieces.",
  keywords: [
    "Jewellery",
    "Nepal",
    "Handcrafted",
    "Silver",
    "Panchadhatu",
    "Bespoke",
    "Rings",
    "Necklaces",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Aurora Jewel Studio",
    title: "Aurora Jewel Studio | Premium Handcrafted Jewellery",
    description:
      "Exquisite handcrafted jewellery from Nepal. Specialized in bespoke designs, sterling silver, and traditional Panchadhatu pieces.",
    images: [
      {
        url: "/images/hero-jewelry.png",
        width: 1200,
        height: 630,
        alt: "Aurora Jewel Studio Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Jewel Studio | Premium Handcrafted Jewellery",
    description:
      "Exquisite handcrafted jewellery from Nepal. Specialized in bespoke designs, sterling silver, and traditional Panchadhatu pieces.",
    images: ["/images/hero-jewelry.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CurrencyProvider>
          <CartProvider>{children}</CartProvider>
        </CurrencyProvider>
        {/* Global JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Aurora Jewel Studio",
                  description: "Premium handcrafted jewellery from Nepal.",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                },
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Aurora Jewel Studio",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/android-chrome-512x512.png`,
                  },
                  sameAs: [
                    "https://www.instagram.com/aurorajewelstudio",
                  ],
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
