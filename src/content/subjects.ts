import { routes } from "@/lib/routes";
import {
  Atom,
  Binary,
  Calculator,
  ChartLine,
  DraftingCompass,
  LucideIcon,
  Magnet,
  MessageSquareCode,
  Pi,
  Sigma,
  Workflow,
  Zap,
} from "lucide-react";

export type SubjectKey = "maths" | "computer_science" | "physics";

export type SubjectPricing = {
  amount: number;
  currency?: string;
  unit?: string;
  href?: string;
};

export type SubjectTopic = {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  alt?: string;
};

export type SubjectSection = {
  anchorId: string;
  headline: string;
  description: string;
  pricing: SubjectPricing;
  topics: SubjectTopic[];
  layout:
    | {
        type: "showcase";
        topAside: string;
        bottomAside: string;
      }
    | {
        type: "split";
        ctaSide: "left" | "right";
      };
};

export type SubjectDetail = {
  key: SubjectKey;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  tag?: string;
  section: SubjectSection;
};

export const subjects = {
  maths: {
    key: "maths",
    name: "Mathematik",
    description:
      "Ich zeige dir, wie Mathe funktioniert. Nicht nur wie man es auswendig lernt.",
    icon: Calculator,
    href: routes.maths,
    tag: "Sehr gefragt",
    section: {
      anchorId: "mathematik",
      headline: "Mathematik logisch erklärt",
      description:
        "Wir arbeiten an Verständnis, Struktur und sicheren Lösungswegen, damit du Aufgaben selbstständig nachvollziehen kannst.",
      pricing: {
        amount: 30,
        currency: "EUR",
        unit: "pro Stunde",
        href: routes.pricing,
      },
      layout: {
        type: "showcase",
        topAside:
          "Wir starten bei den Grundlagen und bauen daraus sichere Strategien für anspruchsvollere Aufgaben auf.",
        bottomAside:
          "So wird aus Unsicherheit Schritt für Schritt ein sauberer, nachvollziehbarer Lösungsweg.",
      },
      topics: [
        {
          title: "Grundlagen festigen",
          description:
            "Bruchrechnung, Terme und Gleichungen werden sauber und ohne Lücken aufgebaut.",
          icon: Sigma,
          image: "/subjects/maths-foundations.jpg",
          alt: "Abstrakte Mathematik-Illustration mit Formen, Symbolen und Grundlagenmotiven",
        },
        {
          title: "Funktionen verstehen",
          description:
            "Lineare, quadratische und andere Funktionen werden grafisch und rechnerisch greifbar.",
          icon: ChartLine,
          image: "/subjects/maths-functions.jpg",
          alt: "Illustration einer Funktionskurve in einer abstrahierten Lernszene",
        },
        {
          title: "Analysis sicher anwenden",
          description:
            "Ableitungen und Integrale werden Schritt für Schritt aus ihrer Logik heraus erklärt.",
          icon: Pi,
          image: "/subjects/maths-analysis.jpg",
          alt: "Abstrakte Analysis-Illustration mit Kurvenverlauf und Flächenbezug",
        },
        {
          title: "Geometrie mit System",
          description:
            "Winkel, Flächen und Beweise werden strukturiert statt auswendig gelernt.",
          icon: DraftingCompass,
          image: "/subjects/maths-geometry.jpg",
          alt: "Geometrische Illustration mit Körpern, Zirkel und Konstruktionslinien",
        },
      ],
    },
  },

  computer_science: {
    key: "computer_science",
    name: "Informatik",
    description:
      "Code verstehen statt kopieren – ich erkläre dir das „Warum“ hinter dem „Wie“",
    icon: MessageSquareCode,
    href: routes.computer_science,
    section: {
      anchorId: "informatik",
      headline: "Informatik verstehen statt nur programmieren",
      description:
        "Von den ersten Konzepten bis zu konkreten Projekten lernst du, Probleme sauber zu analysieren und strukturiert zu lösen.",
      pricing: {
        amount: 30,
        currency: "EUR",
        unit: "pro Stunde",
        href: routes.pricing,
      },
      layout: {
        type: "split",
        ctaSide: "left",
      },
      topics: [
        {
          title: "Programmieren mit Struktur",
          description:
            "Variablen, Bedingungen und Schleifen werden mit klaren Denkmodellen verständlich.",
          icon: Binary,
          image: "/subjects/cs-programming.jpg",
          alt: "Abstrakte Informatik-Illustration mit modularen Code- und Logikbausteinen",
        },
        {
          title: "Algorithmen nachvollziehen",
          description:
            "Abläufe werden so erklärt, dass du sie lesen, planen und selbst entwickeln kannst.",
          icon: Workflow,
          image: "/subjects/cs-algorithms.jpg",
          alt: "Illustration eines algorithmischen Ablaufs mit verbundenen Entscheidungsstrukturen",
        },
      ],
    },
  },

  physics: {
    key: "physics",
    name: "Physik",
    description: "Wie man hinter die Formel blickt: Schritt für Schritt.",
    icon: Atom,
    href: routes.physics,
    tag: "Neu",
    section: {
      anchorId: "physik",
      headline: "Physik greifbar gemacht",
      description:
        "Wir verbinden Formeln mit echten Zusammenhängen, damit Aufgaben nicht abstrakt bleiben, sondern nachvollziehbar werden.",
      pricing: {
        amount: 30,
        currency: "EUR",
        unit: "pro Stunde",
        href: routes.pricing,
      },
      layout: {
        type: "split",
        ctaSide: "right",
      },
      topics: [
        {
          title: "Mechanik verstehen",
          description:
            "Kräfte, Bewegung und Energie werden vom Alltag ausgehend systematisch erklärt.",
          icon: Magnet,
          image: "/subjects/physics-mechanics.jpg",
          alt: "Physik-Illustration mit Hebeln, Pendel und Bewegungsbahnen",
        },
        {
          title: "Elektrizität durchblicken",
          description:
            "Strom, Spannung und Schaltungen werden ohne Formeldschungel verständlich gemacht.",
          icon: Zap,
          image: "/subjects/physics-electricity.jpg",
          alt: "Illustration eines abstrahierten Stromkreises mit Lampe und Bauteilen",
        },
      ],
    },
  },
} satisfies Record<SubjectKey, SubjectDetail>;

export const subjectOrder: SubjectKey[] = [
  "maths",
  "computer_science",
  "physics",
];

export const subjectList: SubjectDetail[] = subjectOrder.map(
  (key) => subjects[key],
);

export function getSubject(key: SubjectKey): SubjectDetail {
  return subjects[key];
}

export function formatSubjectPrice({
  amount,
  currency = "EUR",
  unit = "pro Stunde",
}: SubjectPricing) {
  const formattedAmount = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

  return `Schon ab ${formattedAmount} ${unit}`;
}
