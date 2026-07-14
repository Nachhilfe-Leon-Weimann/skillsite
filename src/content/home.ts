export type Stat = { value: string; label: string };

export const homeStats: Stat[] = [
  { value: "320+", label: "Unterrichtsstunden" },
  { value: "35+", label: "begleitete Schüler:innen" },
  { value: "3", label: "Fächer aus einer Hand" },
  { value: "30 €", label: "pro 60 Minuten" },
];

export type Benefit = { title: string; text: string };

export const benefits: Benefit[] = [
  {
    title: "Keine Mindestlaufzeit",
    text: "Jederzeit pausieren oder aufhören – ganz ohne Abo.",
  },
  {
    title: "Fairer Festpreis",
    text: "30 € pro 60 Minuten für alle angebotenen Fächer und Klassenstufen.",
  },
  {
    title: "Selbst buchen",
    text: "Freie Termine selbst buchen und bis 24 Stunden vorher kostenfrei absagen.",
  },
  {
    title: "Erreichbar über Discord",
    text: "Kurze Fragen kannst du mir auch zwischen den Stunden schreiben.",
  },
  {
    title: "Kostenloses Erstgespräch",
    text: "Erst kennenlernen, dann in Ruhe entscheiden.",
  },
  {
    title: "Immer dieselbe Person",
    text: "Persönlich und individuell statt nach Schema F.",
  },
];
