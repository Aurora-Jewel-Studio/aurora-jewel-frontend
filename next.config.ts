import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Hostinger (Comment out for Vercel deployment)
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
