import path from "node:path";

import type { NextConfig } from "next";

// Baseline security headers applied to every response. Intentionally excludes a
// Content-Security-Policy: a strict CSP needs per-request nonces for the theme
// script and an allowlist for the Umami tracker, so it's deferred to its own
// change rather than risking silent breakage here.
const securityHeaders = [
  // Force HTTPS for two years (HTTP→HTTPS redirect already happens at the edge).
  // No `preload` on purpose — that's a commitment for the whole apex domain.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Don't let browsers MIME-sniff responses away from their declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send only the origin as referrer on cross-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Clickjacking protection: the site is never meant to be framed elsewhere.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Disable powerful features the site doesn't use, incl. the Topics API.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone) so the Docker
  // runtime image ships only the server plus the node_modules it actually uses.
  output: "standalone",
  // The app lives in a pnpm workspace; trace files from the repo root so the
  // standalone bundle includes dependencies hoisted to the root store.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS
    ? process.env.ALLOWED_DEV_ORIGINS.split(",")
    : [],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
