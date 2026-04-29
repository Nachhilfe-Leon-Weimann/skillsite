import { FAQ, type FAQItem } from "@/components/blocks/faq";
import { Section } from "@/components/layout/section";
import { BrandIcon } from "@/components/social-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { socials } from "@/lib/socials";
import Link from "next/link";

const whatsapp = socials.find((social) => social.id === "whatsapp");

const subjectsFAQItems: FAQItem[] = [
  {
    value: "subjects",
    question: "Welche Fächer kann ich bei dir lernen?",
    answer:
      "Aktuell unterstütze ich dich in Mathematik, Informatik und Physik. Der Unterricht richtet sich nach deinem konkreten Stand und den Themen, die in Schule, Studium oder Prüfung gerade wichtig sind.",
  },
  {
    value: "level",
    question: "Für welches Niveau ist der Unterricht gedacht?",
    answer:
      "Wir können Grundlagen sauber aufbauen, Lücken schließen oder anspruchsvollere Aufgaben vorbereiten. Entscheidend ist nicht das Label deines Kurses, sondern wo du gerade stehst und was du erreichen möchtest.",
  },
  {
    value: "lesson-format",
    question: "Wie läuft eine typische Stunde ab?",
    answer:
      "Wir klären zuerst dein Ziel für die Stunde, arbeiten dann an konkreten Aufgaben oder Konzepten und halten am Ende fest, was du weiter üben solltest. So bleibt jede Einheit nachvollziehbar und verwertbar.",
  },
  {
    value: "preparation",
    question: "Muss ich etwas vorbereiten?",
    answer:
      "Wenn du Aufgaben, Mitschriften oder Themenlisten hast, bring sie gerne mit. Falls nicht, starten wir mit einer kurzen Standortbestimmung und bauen daraus den passenden Ablauf.",
  },
];

export function SubjectsFAQ() {
  return (
    <Section gradient="top" offsetFooter>
      <FAQ
        badge={<Badge variant="outline">FAQ</Badge>}
        title="Noch Fragen?"
        description="Hier steht alles, was du noch wissen musst."
        items={subjectsFAQItems}
        moreQuestionsCTA={{
          title: "Noch mehr Fragen?",
          description:
            "Kein Sorge, du kannst dich gerne persönlich an mich wenden.",
          actions: (
            <>
              <Button asChild>
                <Link href={routes.contact}>Kennenlernen planen</Link>
              </Button>
              <WhatsappButton />
            </>
          ),
        }}
      />
    </Section>
  );
}

function WhatsappButton() {
  if (!whatsapp?.href) return null;

  return (
    <Button variant="secondary" asChild>
      <Link href={whatsapp.href} target="_blank" rel="noopener noreferrer">
        <BrandIcon icon={whatsapp.icon} />
        Chatte mit mir
      </Link>
    </Button>
  );
}
