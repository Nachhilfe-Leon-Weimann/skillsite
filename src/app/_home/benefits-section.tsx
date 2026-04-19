import { Section } from "@/components/layout/section";
import { ContactAction } from "@/components/shared/contact-action";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1, H3, P } from "@/components/ui/typography";
import { Check, ImageIcon } from "lucide-react";

export function BenefitsSection() {
  return (
    <Section gradient="bottom" containerClassName="gap-24">
      <div className="grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <H1>Simpel & flexibel</H1>
          <H3>
            Nachhilfe ohne komplizierte Verträge – so, wie es für dich passt.
          </H3>
          <P>
            Bei mir gibt es keine langfristigen Verpflichtungen oder versteckten
            Bedingungen. Du kannst jederzeit aufhören oder flexibel zusätzliche
            Stunden buchen – genau so, wie es für dich am besten ist. <br />
            <br /> Mein Ansatz: Lernen soll sich an dein Leben anpassen, nicht
            umgekehrt.
          </P>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="bg-muted h-3/4 w-full flex items-center justify-center rounded-lg">
            <ImageIcon size={64} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.title}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>

      <ContactAction />
    </Section>
  );
}

const benefits = [
  {
    title: "Keine Verträge, keine Mindestlaufzeit.",
    description:
      "Du entscheidest, wie lange du Nachhilfe nehmen möchtest – ganz ohne Druck.",
  },
  {
    title: "Spontane Zusatztermine möglich.",
    description:
      "Braucht es kurzfristig eine extra Einheit? Ich bin flexibel und richte mich nach deinem Bedarf.",
  },
  {
    title: "Unkomplizierte Absagen.",
    description:
      "Falls mal etwas dazwischenkommt, kannst du deine Sitzung einfach absagen oder verschieben.",
  },
];

function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <Check size={18} />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
