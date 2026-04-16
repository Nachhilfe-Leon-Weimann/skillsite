import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { H1, H4, Muted } from "@/components/ui/typography";
import { routes } from "@/lib/routes";
import Link from "next/link";

export function CTASection() {
  return (
    <Section
      gradient="top"
      containerClassName="items-center text-center gap-12"
      offsetFooter
    >
      <H1>Starte jetzt mit smarter Nachhilfe</H1>
      <H4 className="max-w-xl">
        Mehr Verständnis, mehr Selbstbewusstsein, weniger Lernstress.
      </H4>
      <div className="flex flex-col items-center gap-4">
        <Button asChild>
          <Link href={routes.contact}>Jetzt durchstarten</Link>
        </Button>
        <Muted>Sichere dir dein unverbindliches Kennenlerngespräch</Muted>
      </div>
    </Section>
  );
}
