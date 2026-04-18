import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { H1, H4 } from "@/components/ui/typography";

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
      <CTAButton />
    </Section>
  );
}
