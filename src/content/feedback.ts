export type FeedbackItem = {
  id: string;
  name: string;
  role: string;
  subject: string;
  gradeLevel?: string;
  rating: number;
  quote: string;
};

export const feedbackList: FeedbackItem[] = [
  {
    id: "lena-m",
    name: "Lena M.",
    role: "Schülerin",
    subject: "Mathematik",
    gradeLevel: "10. Klasse",
    rating: 3,
    quote:
      "Vor der Nachhilfe hatte ich vor allem bei quadratischen Funktionen und Geometrie große Unsicherheiten. Der Unterricht war klar strukturiert, geduldig erklärt und immer auf meine Fragen angepasst. Nach wenigen Wochen habe ich mich deutlich sicherer gefühlt und meine Note von einer 4 auf eine 2 verbessert.",
  },
  {
    id: "familie-schneider",
    name: "Familie Schneider",
    role: "Eltern",
    subject: "Mathematik & Physik",
    gradeLevel: "Oberstufe",
    rating: 2,
    quote:
      "Besonders überzeugt hat uns die ruhige und verlässliche Art. Inhalte wurden nicht einfach nur wiederholt, sondern so erklärt, dass unser Sohn sie wirklich verstanden hat. Auch bei der Prüfungsvorbereitung war die Unterstützung sehr strukturiert und effektiv.",
  },
  {
    id: "jonas-r",
    name: "Jonas R.",
    role: "Schüler",
    subject: "Physik",
    gradeLevel: "11. Klasse",
    rating: 5,
    quote:
      "Ich hatte große Probleme damit, Formeln richtig anzuwenden und Aufgaben selbstständig zu lösen. In der Nachhilfe wurde Schritt für Schritt erklärt, wie man an physikalische Probleme herangeht. Dadurch konnte ich nicht nur bessere Ergebnisse schreiben, sondern den Stoff endlich nachvollziehen.",
  },
  {
    id: "sophie-k",
    name: "Sophie K.",
    role: "Schülerin",
    subject: "Mathematik",
    gradeLevel: "8. Klasse",
    rating: 0,
    quote:
      "Mir hat gefallen, dass alles verständlich und ohne Druck erklärt wurde. Ich konnte jederzeit nachfragen und habe mich nie unwohl gefühlt. Mittlerweile mache ich meine Hausaufgaben viel selbstständiger und gehe deutlich entspannter in Klassenarbeiten.",
  },
  {
    id: "familie-wagner",
    name: "Familie Wagner",
    role: "Eltern",
    subject: "Mathematik",
    gradeLevel: "Mittelstufe",
    rating: 2,
    quote:
      "Die Nachhilfe ist fachlich stark und gleichzeitig sehr menschlich. Unser Kind hat schnell Vertrauen aufgebaut und wieder Motivation für das Fach entwickelt. Man merkt deutlich, dass hier individuell gearbeitet wird und nicht nach einem starren Schema.",
  },
  {
    id: "emir-a",
    name: "Emir A.",
    role: "Schüler",
    subject: "Chemie",
    gradeLevel: "9. Klasse",
    rating: 5,
    quote:
      "Chemie war für mich vorher fast nur Auswendiglernen. In der Nachhilfe habe ich zum ersten Mal verstanden, warum Reaktionen so ablaufen und wie man Aufgaben logisch löst. Das hat mir im Unterricht sofort geholfen.",
  },
];
