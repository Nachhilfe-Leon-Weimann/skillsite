import { routes } from "@/lib/routes";
import { Atom, Calculator, LucideIcon, MessageSquareCode } from "lucide-react";

export type SubjectKey = "maths" | "computer_science" | "physics";

export type SubjectDetail = {
  key: SubjectKey;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  tag?: string;
};

export const subjects = {
  maths: {
    key: "maths",
    name: "Mathematik",
    description:
      "Verständliche Nachhilfe in Mathematik mit Fokus auf sicheren Grundlagen, nachhaltigem Verständnis und gezielter Prüfungsvorbereitung.",
    icon: Calculator,
    href: routes.maths,
    tag: "Sehr gefragt",
  },

  computer_science: {
    key: "computer_science",
    name: "Informatik",
    description:
      "Nachhilfe in Informatik zu schulischen Grundlagen, Programmierung und algorithmischem Denken – klar strukturiert und praxisnah erklärt.",
    icon: MessageSquareCode,
    href: routes.computer_science,
  },

  physics: {
    key: "physics",
    name: "Physik",
    description:
      "Physik-Nachhilfe mit Fokus auf echtes Verständnis von Konzepten, Formeln und Zusammenhängen statt reinem Auswendiglernen.",
    icon: Atom,
    href: routes.physics,
    tag: "Neu",
  },
} satisfies Record<SubjectKey, SubjectDetail>;

export const subjectOrder: SubjectKey[] = [
  "maths",
  "computer_science",
  "physics",
];

export const subjectList = subjectOrder.map((key) => subjects[key]);

export function getSubject(key: SubjectKey): SubjectDetail {
  return subjects[key];
}
