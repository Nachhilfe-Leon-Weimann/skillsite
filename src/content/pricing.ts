import type { Step } from "@/content/process";

export const lessonPrice = {
  amount: "30 €",
  unit: "/ 60 Min.",
  note: "Einheitlich für Mathe, Informatik und Physik – jede Klassenstufe.",
};

export const priceIncludes: string[] = [
  "Keine Anmeldegebühr, keine versteckten Kosten",
  "Keine Mindestlaufzeit – flexibel planbar",
  "Bis 24 h vorher kostenfrei absagen",
  "Materialien & Notizen inklusive",
  "Förderung über Bildung & Teilhabe möglich",
];

export type Condition = { strong?: string; text: string };

export const fairConditions: Condition[] = [
  {
    strong: "Bis 24 Stunden vorher",
    text: "kostenfrei absagen oder verschieben.",
  },
  { text: "Bei kurzfristigen Notfällen finden wir eine faire Lösung." },
  { text: "Flexibel planbar, keine Mindestlaufzeit – Blöcke nach Bedarf." },
];

export const paymentOptions: Condition[] = [
  { strong: "Überweisung", text: "– Rechnung mit GiroCode." },
  { strong: "PayPal", text: "– einfacher Zahlungslink." },
  { text: "Abrechnung einzeln nach dem Termin oder gebündelt als Block." },
];

export const but = {
  intro:
    "Über das Bildungs- und Teilhabepaket (z. B. bei Bürgergeld, Wohngeld mit Kinderzuschlag). Kein Sonderfall für mich, die Abrechnung übernehme ich direkt mit der Stelle.",
  officialInfo: {
    href: "https://familienportal.de/familienportal/familienleistungen/bildung-und-teilhabe/wie-beantrage-ich-leistungen-fuer-bildung-und-teilhabe--136770",
    label: "Offizielle BuT-Infos",
    source: "familienportal.de",
  },
  steps: [
    {
      n: "1",
      title: "",
      text: "Förderbedarf von der Schule bestätigen lassen.",
    },
    {
      n: "2",
      title: "",
      text: "Antrag beim Jobcenter oder Landratsamt stellen.",
    },
    {
      n: "3",
      title: "",
      text: "Unterricht startet – Abrechnung übernehme ich direkt.",
    },
  ] satisfies Step[],
};
