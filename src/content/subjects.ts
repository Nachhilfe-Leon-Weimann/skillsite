import { routes } from "@/lib/routes";
import { BracesIcon, LucideIcon, SigmaIcon, TriangleIcon } from "lucide-react";

export type SubjectKey = "maths" | "computer_science" | "physics";

export type SubjectTopic = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type Subject = {
  key: SubjectKey;
  name: string;
  /** Distinctive glyph used in the subject tile. */
  glyph: LucideIcon;
  tag?: string;
  claim: string;
  description: string;
  anchorId: string;
  href: string;
  topics: SubjectTopic[];
};

export const subjects: Subject[] = [
  {
    key: "maths",
    name: "Mathematik",
    glyph: SigmaIcon,
    tag: "Sehr gefragt",
    claim: "Mathe logisch erklärt - nicht nur auswendig lernen.",
    description:
      "Von den Grundlagen bis zur Analysis: Wir bauen Sicherheit auf, statt Formeln zu pauken. Wer das Prinzip versteht, löst auch die unbekannte Aufgabe.",
    anchorId: "mathematik",
    href: routes.maths,
    topics: [
      {
        title: "Grundlagen festigen",
        description:
          "Bruchrechnung, Terme und Gleichungen werden sauber und ohne Lücken aufgebaut.",
        image: "/subjects/maths-foundations.jpg",
        alt: "Abstrakte Mathematik-Illustration mit Formen, Symbolen und Grundlagenmotiven",
      },
      {
        title: "Funktionen verstehen",
        description:
          "Lineare, quadratische und andere Funktionen werden grafisch und rechnerisch greifbar.",
        image: "/subjects/maths-functions.jpg",
        alt: "Illustration einer Funktionskurve in einer abstrahierten Lernszene",
      },
      {
        title: "Analysis sicher anwenden",
        description:
          "Ableitungen und Integrale werden Schritt für Schritt aus ihrer Logik heraus erklärt.",
        image: "/subjects/maths-analysis.jpg",
        alt: "Abstrakte Analysis-Illustration mit Kurvenverlauf und Flächenbezug",
      },
      {
        title: "Geometrie mit System",
        description:
          "Winkel, Flächen und Beweise werden strukturiert statt auswendig gelernt.",
        image: "/subjects/maths-geometry.jpg",
        alt: "Geometrische Illustration mit Körpern, Zirkel und Konstruktionslinien",
      },
    ],
  },
  {
    key: "computer_science",
    name: "Informatik",
    glyph: BracesIcon,
    claim: "Code verstehen statt kopieren - das Warum hinter dem Wie.",
    description:
      "Ich baue selbst Software - das fließt direkt in die Stunde ein. Echte Beispiele statt trockener Theorie: Code verstehen, nicht kopieren.",
    anchorId: "informatik",
    href: routes.computerScience,
    topics: [
      {
        title: "Programmieren mit Struktur",
        description:
          "Variablen, Bedingungen und Schleifen werden mit klaren Denkmodellen verständlich.",
        image: "/subjects/cs-programming.jpg",
        alt: "Abstrakte Informatik-Illustration mit modularen Code- und Logikbausteinen",
      },
      {
        title: "Algorithmen nachvollziehen",
        description:
          "Abläufe werden so erklärt, dass du sie lesen, planen und selbst entwickeln kannst.",
        image: "/subjects/cs-algorithms.jpg",
        alt: "Illustration eines algorithmischen Ablaufs mit verbundenen Entscheidungsstrukturen",
      },
    ],
  },
  {
    key: "physics",
    name: "Physik",
    glyph: TriangleIcon,
    tag: "Neu",
    claim: "Hinter die Formel blicken, Schritt für Schritt.",
    description:
      "Hinter jede Formel blicken: Was passiert da eigentlich? Wir verbinden Anschauung und Rechnung, bis der Stoff Sinn ergibt.",
    anchorId: "physik",
    href: routes.physics,
    topics: [
      {
        title: "Mechanik verstehen",
        description:
          "Kräfte, Bewegung und Energie werden vom Alltag ausgehend systematisch erklärt.",
        image: "/subjects/physics-mechanics.jpg",
        alt: "Physik-Illustration mit Hebeln, Pendel und Bewegungsbahnen",
      },
      {
        title: "Elektrizität durchblicken",
        description:
          "Strom, Spannung und Schaltungen werden ohne Formeldschungel verständlich gemacht.",
        image: "/subjects/physics-electricity.jpg",
        alt: "Illustration eines abstrahierten Stromkreises mit Lampe und Bauteilen",
      },
    ],
  },
];
