export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

/**
 * Illustrative example voices — they mirror the *kind* of feedback received,
 * but are NOT real, attributable references (no invented individuals). While
 * this flag is true the UI labels the section "Beispielstimmen" and shows a
 * disclaimer. To publish real testimonials: replace the entries with consented
 * quotes (real name in `name`) and set `testimonialsAreExamples = false`.
 */
export const testimonialsAreExamples = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Zum ersten Mal habe ich verstanden, warum eine Rechnung funktioniert – nicht nur wie. Meine Mathenote ging von 4 auf 2.",
    name: "Schülerin, 10. Klasse",
    detail: "Mathematik",
  },
  {
    quote:
      "Leon ist ruhig, verlässlich und erklärt so lange, bis es sitzt. Als Eltern hatten wir sofort ein gutes Gefühl.",
    name: "Eltern",
    detail: "Mathe & Physik - Oberstufe",
  },
  {
    quote:
      "Physik war für mich ein Buch mit sieben Siegeln. Jetzt trau ich mir wieder was zu – und es macht sogar Spaß.",
    name: "Schüler, 11. Klasse",
    detail: "Physik",
  },
  {
    quote:
      "Super geduldig, nie Druck. Ich konnte alles fragen, auch dasselbe dreimal.",
    name: "Schülerin, 8. Klasse",
    detail: "Mathematik",
  },
  {
    quote:
      "Endlich Struktur statt Chaos. Die Stunden sind klar aufgebaut und genau auf unser Kind zugeschnitten.",
    name: "Eltern, Abitur",
    detail: "Mathematik - Mittelstufe",
  },
];
