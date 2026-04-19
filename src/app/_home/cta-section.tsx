import { CTA, CTAActions, CTAHeader } from "@/components/blocks/cta";
import { Section } from "@/components/layout/section";
import { ContactAction } from "@/components/shared/contact-action";
import { H1, H4 } from "@/components/ui/typography";

export function CTASection() {
  return (
    <Section gradient="top" offsetFooter>
      <CTA className="max-w-4xl gap-12">
        <CTAHeader className="gap-12">
          <H1>Starte jetzt mit smarter Nachhilfe</H1>
          <H4 className="max-w-xl">
            Mehr Verständnis, mehr Selbstbewusstsein, weniger Lernstress.
          </H4>
        </CTAHeader>
        <CTAActions>
          <ContactAction />
        </CTAActions>
      </CTA>
    </Section>
  );
}
