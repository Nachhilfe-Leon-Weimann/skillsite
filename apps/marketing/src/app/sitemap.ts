import type { MetadataRoute } from "next";

import { indexablePaths, SITE_URL } from "@/lib/routes";

// No lastModified: without real per-page modification dates, a build-time
// timestamp would mark every URL as freshly changed on each deploy (#79).
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
