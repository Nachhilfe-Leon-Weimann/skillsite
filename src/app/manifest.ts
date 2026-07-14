import type { MetadataRoute } from "next";

import { brand } from "@/content/site";

// Web app manifest. Next serves this at /manifest.webmanifest and auto-injects
// the <link rel="manifest"> tag. Icons reuse the file-based icons in this
// directory (icon.png / apple-icon.png), served at their root paths.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: "Nachhilfe",
    description:
      "Persönliche Online-Nachhilfe in Mathematik, Informatik und Physik.",
    lang: "de",
    start_url: "/",
    display: "standalone",
    // Matches the light theme-color in the root viewport export.
    background_color: "#faf6f0",
    theme_color: "#faf6f0",
    icons: [
      { src: "/icon.png", sizes: "512x503", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x177", type: "image/png" },
    ],
  };
}
