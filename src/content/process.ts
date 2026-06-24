export type Step = { n: string; title: string; text: string };

/** Onboarding in three steps (shared by the home page and /ablauf). */
export const startSteps: Step[] = [
  {
    n: "1",
    title: "Kostenloses Erstgespräch",
    text: "Wir klären Situation, Fach und Ziel – und schauen, ob die Chemie stimmt.",
  },
  {
    n: "2",
    title: "Erste Stunde",
    text: "Gemeinsam finden wir heraus, wo die Lücken wirklich liegen, und machen einen Plan.",
  },
  {
    n: "3",
    title: "Euer Rhythmus",
    text: "Wöchentlich, vor Klausuren intensiver oder nach Bedarf – du buchst selbst.",
  },
];

export const lessonFlow: Step[] = [
  { n: "1", title: "Ziel klären", text: "Was wollen wir heute schaffen?" },
  {
    n: "2",
    title: "Gemeinsam arbeiten",
    text: "Rechnen, programmieren, knobeln.",
  },
  { n: "3", title: "Festhalten", text: "Was bleibt – und was du übst." },
];

export const discordHighlights: string[] = [
  "Live im Sprachkanal mit geteiltem Bildschirm.",
  "Notizen & Materialien bleiben dauerhaft abrufbar.",
  "Kurze Fragen zwischendurch jederzeit möglich.",
];
