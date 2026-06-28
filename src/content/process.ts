export type Step = { n: string; title: string; text: string };

/** Onboarding in three steps (shared by the home page and /ablauf). */
export const startSteps: Step[] = [
  {
    n: "1",
    title: "Kostenloses Erstgespräch",
    text: "Wir klären Fach, Ziel, aktuelle Probleme und ob die Zusammenarbeit passt.",
  },
  {
    n: "2",
    title: "Erste Stunde",
    text: "Wir schauen uns echte Aufgaben an, finden Lücken und legen fest, womit wir starten.",
  },
  {
    n: "3",
    title: "Flexibel weiterlernen",
    text: "Danach buchst du flexibel: regelmäßig, vor Klausuren intensiver oder nach Bedarf.",
  },
];

export const lessonFlow: Step[] = [
  {
    n: "1",
    title: "Kurz sortieren",
    text: "Was ist heute das Ziel? Hausaufgabe, Klausurthema oder Verständnisproblem?",
  },
  {
    n: "2",
    title: "Gemeinsam lösen",
    text: "Wir arbeiten an echten Aufgaben, bis der Denkweg sitzt.",
  },
  {
    n: "3",
    title: "Festhalten",
    text: "Am Ende ist klar, was du verstanden hast, und was du bis zum nächsten Mal übst.",
  },
];

export const discordHighlights: string[] = [
  "Live im Sprachkanal mit geteiltem Bildschirm.",
  "Notizen & Materialien bleiben dauerhaft abrufbar.",
  "Kurze Fragen zwischendurch jederzeit möglich.",
];
