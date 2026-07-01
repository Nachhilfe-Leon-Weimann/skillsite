import type { MetadataRoute } from "next";

const BASE_URL = "https://nachhilfe.leonweimann.de";

// Per-route priority; everything else defaults to 0.7.
const PRIORITY: Record<string, number> = {
  "": 1,
  "/faecher": 0.9,
  "/preise": 0.9,
  "/kontakt": 0.8,
  "/impressum": 0.3,
  "/datenschutz": 0.3,
};

const PATHS = [
  "",
  "/faecher",
  "/ablauf",
  "/preise",
  "/online-lernen",
  "/ueber-mich",
  "/kontakt",
  "/termin",
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/impressum" || path === "/datenschutz" ? "yearly" : "monthly",
    priority: PRIORITY[path] ?? 0.7,
  }));
}
