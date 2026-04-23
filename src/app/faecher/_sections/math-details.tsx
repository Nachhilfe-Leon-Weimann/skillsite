import { CTA, CTABadge, CTAHeader } from "@/components/blocks/cta";
import { Section } from "@/components/layout/section";
import { PricingBadge } from "@/components/shared/pricing-badge";
import { SubjectDetailCard } from "@/components/shared/subject-detail-card";
import { H1, H4, P } from "@/components/ui/typography";
import { subjects } from "@/content/subjects";

export function MathDetails() {
  return (
    <Section containerClassName="gap-32">
      <div className="flex flex-row gap-16">
        <div className="w-1/2 flex flex-col justify-center">
          <H4>fsfsfs</H4>
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-6">
          <SubjectDetailCard
            title="Lineare Funktionen"
            image="/logo-icon.png"
          />
          <SubjectDetailCard title="Integralrechnung" />
        </div>
      </div>

      <TitleBlock />

      <div className="flex flex-row gap-16">
        <div className="w-1/2 grid grid-cols-2 gap-6">
          <SubjectDetailCard title="Ableitungsregeln" />
          <SubjectDetailCard title="Trigonometrie" />
        </div>
        <div className="w-1/2 flex flex-col justify-center text-end">
          <H4>fsfsfs</H4>
        </div>
      </div>
    </Section>
  );
}

function TitleBlock() {
  return (
    <CTA variant="center">
      <CTAHeader>
        <MathIcon />
        <CTABadge>
          <PricingBadge href="#">Schon ab 30€ pro Stunde</PricingBadge>
        </CTABadge>
        <H1>Mathematik logisch erklärt</H1>
        <P>
          So findest du Anschluss – unabhängig vom aktuellen Leistungsstand.
        </P>
      </CTAHeader>
    </CTA>
  );
}

function MathIcon() {
  const math = subjects.maths;
  return (
    <div className="p-3 bg-card rounded-2xl">
      <math.icon size={36} />
    </div>
  );
}
