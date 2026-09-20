import type { MetadataRoute } from "next";

import { disallowedPaths, SITE_URL } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: disallowedPaths },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
