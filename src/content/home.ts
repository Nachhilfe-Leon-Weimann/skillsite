export type Stat = { value: string; label: string };

export const homeStats: Stat[] = [
  { value: "320+", label: "Unterrichtsstunden" },
  { value: "35+", label: "begleitete Schüler:innen" },
  { value: "3", label: "Fächer aus einer Hand" },
  { value: "30 €", label: "pro Stunde, fix" },
];

export type Benefit = { title: string; text: string };

export const benefits: Benefit[] = [
  {
    title: "Keine Verträge",
    text: "Keine Mindestlaufzeit, jederzeit pausieren oder aufhören.",
  },
  {
    title: "Fairer Festpreis",
    text: "30 € pro Stunde für alle Fächer und Klassenstufen.",
  },
  {
    title: "Selbst buchen",
    text: "Freie Slots im Kalender, bis 24 h vorher kostenfrei absagen.",
  },
  {
    title: "Erreichbar über Discord",
    text: "Kurze Fragen zwischendurch jederzeit per Nachricht.",
  },
  {
    title: "Kostenloses Erstgespräch",
    text: "Der erste Schritt kostet nichts – unverbindlich.",
  },
  {
    title: "Immer dieselbe Person",
    text: "Persönlich und individuell statt nach Schema F.",
  },
];
