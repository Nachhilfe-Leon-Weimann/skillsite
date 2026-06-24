import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS
    ? process.env.ALLOWED_DEV_ORIGINS.split(",")
    : [],
  async redirects() {
    return [
      // Old structure → new flat sitemap.
      { source: "/details", destination: "/preise", permanent: true },
      { source: "/about", destination: "/ueber-mich", permanent: true },
      { source: "/discord", destination: "/online-lernen", permanent: true },
    ];
  },
};

export default nextConfig;
