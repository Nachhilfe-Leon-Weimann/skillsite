import { LucideIcon, Calculator, Atom, MessageSquareCode } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItemChildren[];
};

export type NavItemChildren = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  tag?: string;
};

export const navItems: NavItem[] = [
  { label: "Startseite", href: "/" },
  {
    label: "Fächer",
    href: "/fächer",
    children: [
      {
        label: "Mathematik",
        icon: Calculator,
        href: "/fächer/#mathematik",
        description: "Mathematik einfach erklärt.",
      },
      {
        label: "Informatik",
        icon: MessageSquareCode,
        href: "/fächer/#informatik",
      },
      {
        label: "Physik",
        icon: Atom,
        href: "/fächer/#physik",
        tag: "Neu",
      },
    ],
  },
  {
    label: "Details",
    href: "/details",
    children: [
      {
        label: "Preise",
        href: "/details/#preise",
        description: "Unsere Preise im Überblick.",
      },
    ],
  },
  {
    label: "Über mich",
    href: "/about",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];
