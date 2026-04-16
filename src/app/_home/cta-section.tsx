import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { H1, H4, Muted } from "@/components/ui/typography";
import { routes } from "@/lib/routes";
import Link from "next/link";

export function CTASection() {
  return (
    <GradientBackground className="h-full">
      <Section className="h-full">
        <Container className="flex flex-col items-center text-center gap-12">
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
        </Container>
      </Section>
    </GradientBackground>
  );
}
