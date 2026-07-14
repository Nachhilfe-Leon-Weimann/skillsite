import type { Metadata } from "next";

import { brand } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  canonical: string;
};

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Nachhilfe Leon Weimann – Mathematik, Informatik und Physik",
};

/** Keep search, Open Graph and Twitter copy aligned for every route. */
export function pageMetadata({
  title,
  description,
  canonical,
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} – ${brand.name}`;

  return {
    alternates: { canonical },
    title,
    description,
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: canonical,
      siteName: brand.name,
      title: socialTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
