import { legalContact } from "@/content/legal";

export const agbEffectiveDate = new Date("2026-07-05");

export const agbContact = {
  email: legalContact.email,
  phone: legalContact.phone,
};

/**
 * Section registry: the single source of truth for order, numbering,
 * navigation label and heading (mirrors the privacy page setup).
 * - `label`: compact name shown in the on-page navigation
 * - `title`: full heading without a number (the number comes from the order)
 */
export const agbSections = [
  {
    id: "geltungsbereich",
    label: "Geltungsbereich",
    title: "Geltungsbereich",
  },
  {
    id: "vertragsschluss",
    label: "Vertragsschluss",
    title: "Vertragspartner und Vertragsschluss",
  },
  {
    id: "leistungen",
    label: "Leistungen",
    title: "Leistungen",
  },
  {
    id: "termine",
    label: "Termine und Ausfall",
    title: "Termine, Absage und Ausfall",
  },
  {
    id: "preise",
    label: "Preise und Zahlung",
    title: "Preise und Zahlung",
  },
  {
    id: "kuendigung",
    label: "Kündigung",
    title: "Laufzeit und Kündigung",
  },
  {
    id: "widerruf",
    label: "Widerrufsrecht",
    title: "Widerrufsrecht für Verbraucher",
  },
  {
    id: "haftung",
    label: "Haftung",
    title: "Haftung",
  },
  {
    id: "schluss",
    label: "Schlussbestimmungen",
    title: "Schlussbestimmungen",
  },
];

/** 1-based section number derived from the registry order. */
export function agbSectionNumber(id: string): number {
  const index = agbSections.findIndex((section) => section.id === id);
  return index === -1 ? 0 : index + 1;
}

/** Full, numbered heading for a section. */
export function agbSectionHeading(id: string): string {
  const section = agbSections.find((entry) => entry.id === id);
  if (!section) return "";
  return `${agbSectionNumber(id)}. ${section.title}`;
}
