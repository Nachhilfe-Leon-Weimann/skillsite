import type { MetadataRoute } from "next";

import { SITE_URL, routes } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    // The payment link belongs to one invoice and one customer; a crawler
    // following it would only ever produce noise in the log.
    rules: { userAgent: "*", allow: "/", disallow: [routes.payment] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
