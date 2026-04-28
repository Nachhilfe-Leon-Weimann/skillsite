import { LucideIcon } from "lucide-react";
import { routes } from "@/lib/routes";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  tag?: string;
  children?: NavItem[];
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
    children: [
      {
        label: "Preise",
        href: routes.pricing,
        description: "Unsere Preise im Überblick.",
      },
    ],
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
