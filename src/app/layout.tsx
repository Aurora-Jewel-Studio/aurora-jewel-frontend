import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
