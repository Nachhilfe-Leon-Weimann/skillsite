import type { Stat } from "@/content/home";

export const aboutIntro =
  "Ich gebe Nachhilfe in Mathe, Informatik und Physik – immer dieselbe Person, individuell statt nach Schema. Ich glaube: Es gibt keine „Mathe-Menschen“ und „Nicht-Mathe-Menschen“, nur Erklärungen, die passen, und solche, die es nicht tun.";

export const aboutStats: Stat[] = [
  { value: "320+", label: "Stunden" },
  { value: "35+", label: "Schüler:innen" },
  { value: "3", label: "Fächer" },
];

export const aboutQuote =
  "Keine dummen Fragen – nur unverständliche Erklärungen. Und die gehen auf mich.";

export type Principle = { n: string; title: string; text: string };

export const principles: Principle[] = [
  {
    n: "1",
    title: "Verstehen schlägt Auswendiglernen",
    text: "Wer das Prinzip versteht, löst auch die unbekannte Aufgabe.",
  },
  {
    n: "2",
    title: "Dein Tempo, dein Weg",
    text: "Kein starres Programm – Start dort, wo du wirklich stehst.",
  },
  {
    n: "3",
    title: "Auf Augenhöhe, ohne Druck",
    text: "Keine dummen Fragen. Nur Erklärungen, die noch nicht passen.",
  },
];

export const software = {
  eyebrow: "Praxis statt Lehrbuch",
  title: "Ich baue selbst Software.",
  text: "Diese Website samt Buchungssystem habe ich von Design bis Code selbst entwickelt. In der Informatik-Nachhilfe heißt das: echte Beispiele statt trockener Theorie – Code verstehen, nicht kopieren.",
};
