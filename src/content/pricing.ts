import {
  Banknote,
  CalendarClock,
  CalendarRange,
  Check,
  CreditCard,
  ReceiptText,
  Repeat,
  type LucideIcon,
} from "lucide-react";

import {
  standardLessonPricing,
  type LessonPricing,
} from "@/content/lesson-pricing";

export type PricingInfoItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PaymentDetailSection = {
  title: string;
  items: readonly PricingInfoItem[];
};

type PricingPageContent = {
  sectionId: string;
  hero: {
    lead: string;
    title: string;
    description: string;
  };
  priceSummary: {
    pricing: LessonPricing;
    subjectsLabel: string;
  };
  serviceDetails: readonly PricingInfoItem[];
  payment: {
    cta: {
      description: string;
      title: string;
      lead: string;
    };
    sections: readonly PaymentDetailSection[];
  };
};

export const pricingContent = {
  sectionId: "preise",
  hero: {
    lead: "Einfach, transparent, flexibel",
    title: "Klare Preise ohne Überraschungen.",
    description: "Ohne versteckte Kosten oder Verpflichtungen.",
  },
  priceSummary: {
    pricing: standardLessonPricing,
    subjectsLabel: "Alle Fächer zum gleichen Preis:",
  },
  serviceDetails: [
    {
      title: "Kostenfrei absagen",
      description: "Bis 24 h vorher ohne Berechnung.",
      icon: CalendarClock,
    },
    {
      title: "Fair bei kurzfristigen Fällen",
      description: "Wenn es knapp wird, finden wir eine sinnvolle Lösung.",
      icon: Check,
    },
    {
      title: "Flexibel planbar",
      description: "Keine Mindestlaufzeit. Blöcke können angepasst werden.",
      icon: Repeat,
    },
  ],
  payment: {
    cta: {
      description: "Transparent und ohne feste Vertragslaufzeit.",
      title: "So kannst du zahlen",
      lead: "Zahlungsflow",
    },
    sections: [
      {
        title: "Zahlungsmethoden",
        items: [
          {
            title: "Überweisung",
            description: "per Rechnung mit GiroCode",
            icon: ReceiptText,
          },
          {
            title: "PayPal",
            description: "mit Zahlungslink",
            icon: CreditCard,
          },
        ],
      },
      {
        title: "Abrechnungsoptionen",
        items: [
          {
            title: "Einzeln",
            description: "Rechnung nach dem Termin",
            icon: Banknote,
          },
          {
            title: "Blockweise",
            description: "Mehrere Termine gebündelt",
            icon: CalendarRange,
          },
        ],
      },
    ],
  },
} satisfies PricingPageContent;
