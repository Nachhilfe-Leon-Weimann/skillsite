import { brand } from "@/content/site";
import { legalContact } from "@/content/legal";
import { contactDetails } from "@/content/contact";
import { socials } from "@/content/socials";

const BASE_URL = "https://nachhilfe.leonweimann.de";

// legalContact.city is "77963 Schwanau" -> split into postal code + locality.
const [postalCode, ...localityParts] = legalContact.city.split(" ");
const addressLocality = localityParts.join(" ");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": `${BASE_URL}/#business`,
  name: brand.name,
  url: BASE_URL,
  description:
    "Persönliche Online-Nachhilfe in Mathematik, Informatik und Physik – ohne Vertrag, 30 € pro 60 Minuten.",
  founder: { "@type": "Person", name: legalContact.ownerName },
  email: contactDetails.eMail.content,
  telephone: legalContact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: legalContact.street,
    postalCode,
    addressLocality,
    addressCountry: "DE",
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  knowsAbout: ["Mathematik", "Informatik", "Physik", "Nachhilfe"],
  priceRange: "€",
  makesOffer: {
    "@type": "Offer",
    price: "30",
    priceCurrency: "EUR",
    itemOffered: {
      "@type": "Service",
      name: "Nachhilfe (60 Minuten)",
      serviceType: "Online-Nachhilfe",
    },
  },
  // Social profiles (WhatsApp is a contact link, not a profile, so it's excluded).
  sameAs: socials.filter((s) => s.key !== "whatsapp").map((s) => s.href),
};

/** Site-wide Organization/LocalBusiness structured data for search engines. */
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
