import { Section } from "@/components/layout/section";
import { BenefitCard } from "@/components/shared/benefit-card";
import { H5 } from "@/components/ui/typography";
import { BookOpen, Crosshair } from "lucide-react";

export function BriefBenefitsSection() {
  return (
    <Section
      variant="content"
      containerClassName="flex flex-row justify-between"
      gradient="filled"
    >
      <H5 className="pt-6">Was du von meiner Nachhilfe erwarten kannst</H5>

      <div className="grid grid-cols-[repeat(2,minmax(22rem,1fr))] gap-6">
        <BenefitCard
          title="Verständlich statt auswendig"
          description="Praxisnahe Übungen – Gezielte Erklärungen"
          icon={BookOpen}
          href="f"
          linkLabel="Beispiel Unterlagen ansehen"
        />

        <BenefitCard
          title="Erfahrung, die dich weiterbringt"
          description="Verständlich und strukturiert, damit du dich sicher fühlst"
          icon={Crosshair}
          href="f"
          linkLabel="Beispiel Unterlagen ansehen"
        />
      </div>
    </Section>
  );
}
