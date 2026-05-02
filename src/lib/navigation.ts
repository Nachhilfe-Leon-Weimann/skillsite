import {
  BadgeDollarSign,
  CircleHelp,
  type LucideIcon,
  MessagesSquare,
  ReceiptText,
} from "lucide-react";
import type { SimpleIcon } from "simple-icons/icons";
import { siDiscord } from "simple-icons/icons";

import { routes } from "@/lib/routes";

export type NavIcon = LucideIcon | SimpleIcon;

export type NavDropdownItem = {
  title: string;
  href: string;
  description?: string;
  icon: NavIcon;
};

export type NavDropdownSection = {
  title: string;
  tag?: string;
  items: NavDropdownItem[];
};

export type NavItem = {
  label: string;
  href: string;
  dropdown?: {
    sections: NavDropdownSection[];
  };
};

export const navItems: NavItem[] = [
  { label: "Startseite", href: routes.home },
  {
    label: "Fächer",
    href: routes.subjects,
  },
  {
    label: "Details",
    href: routes.details,
    dropdown: {
      sections: [
        {
          title: "Konditionen",
          tag: "Transparent",
          items: [
            {
              title: "Preise & Zahlung",
              href: routes.pricing,
              description: "Alles im Überblick",
              icon: BadgeDollarSign,
            },
            {
              title: "Bildung und Teilhabe",
              href: routes.educationAndPraticipation,
              description: "Für uns kein Sonderfall",
              icon: ReceiptText,
            },
          ],
        },
        {
          title: "Organisation",
          tag: "Flexibel",
          items: [
            {
              title: "Discord Server",
              href: routes.communication,
              description: "Unterricht & Materialien",
              icon: siDiscord,
            },
            {
              title: "Ablauf",
              href: routes.process,
              description: "Wie wir zusammen lernen",
              icon: MessagesSquare,
            },
          ],
        },
        {
          title: "Orientierung",
          items: [
            {
              title: "Häufige Fragen",
              href: routes.faq,
              description: "Rund um unser Angebot",
              icon: CircleHelp,
            },
          ],
        },
      ],
    },
  },
  {
    label: "Über mich",
    href: routes.about,
  },
  {
    label: "Kontakt",
    href: routes.contact,
  },
];
