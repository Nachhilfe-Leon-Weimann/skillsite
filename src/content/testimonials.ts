export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

/**
 * NOTE: These are illustrative example voices that mirror the kind of feedback
 * received, not verbatim published references. The UI labels them as examples.
 * Replace with real, consented testimonials before relying on them publicly.
 */
export const testimonialsAreExamples = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Zum ersten Mal habe ich verstanden, warum eine Rechnung funktioniert – nicht nur wie. Meine Mathenote ging von 4 auf 2.",
    name: "Lena M.",
    detail: "Mathematik · 10. Klasse",
  },
  {
    quote:
      "Leon ist ruhig, verlässlich und erklärt so lange, bis es sitzt. Als Eltern hatten wir sofort ein gutes Gefühl.",
    name: "Familie Schneider",
    detail: "Mathe & Physik · Oberstufe",
  },
  {
    quote:
      "Physik war für mich ein Buch mit sieben Siegeln. Jetzt trau ich mir wieder was zu – und es macht sogar Spaß.",
    name: "Jonas R.",
    detail: "Physik · 11. Klasse",
  },
  {
    quote:
      "Super geduldig, nie Druck. Ich konnte alles fragen, auch dasselbe dreimal.",
    name: "Sophie K.",
    detail: "Mathematik · 8. Klasse",
  },
  {
    quote:
      "Endlich Struktur statt Chaos. Die Stunden sind klar aufgebaut und genau auf unser Kind zugeschnitten.",
    name: "Familie Wagner",
    detail: "Mathematik · Mittelstufe",
  },
];
