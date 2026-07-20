import type { MetadataRoute } from "next";

import { routes, SITE_URL } from "@/lib/routes";

// Every route resolves to an indexable page once hash anchors are stripped.
const pagePaths = [
  ...new Set(Object.values(routes).map((href) => href.split("#")[0])),
];

// No lastModified: without real per-page modification dates, a build-time
// timestamp would mark every URL as freshly changed on each deploy (#79).
export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
