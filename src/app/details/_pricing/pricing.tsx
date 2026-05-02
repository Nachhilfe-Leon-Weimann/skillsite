import { CTA, CTAHeader } from "@/components/blocks/cta";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, Lead, Muted, P, Small } from "@/components/ui/typography";
import { subjectList } from "@/content/subjects";
import {
  Banknote,
  CalendarClock,
  CalendarRange,
  Check,
  CreditCard,
  LucideIcon,
  ReceiptText,
  Repeat,
} from "lucide-react";
import { SubjectBadge } from "@/components/shared/subject-badge";
import { Magnetic } from "@/components/effects/magnetic";

type PaymentDetailData = {
  title: string;
  text?: string;
  icon: LucideIcon;
};

const paymentMethods = [
  {
    title: "Überweisung",
    text: "per Rechnung mit GiroCode",
    icon: ReceiptText,
  },
  {
    title: "PayPal",
    text: "mit Zahlungslink",
    icon: CreditCard,
  },
] as const;

const paymentOptions = [
  {
    title: "Einzeln",
    text: "Rechnung nach dem Termin",
    icon: Banknote,
  },
  {
    title: "Blockweise",
    text: "Mehrere Termine gebündelt",
    icon: CalendarRange,
  },
] as const;

const policyItems = [
  {
    title: "Kostenfrei absagen",
    text: "Bis 24 h vorher ohne Berechnung.",
    icon: CalendarClock,
  },
  {
    title: "Fair bei kurzfristigen Fällen",
    text: "Wenn es knapp wird, finden wir eine sinnvolle Lösung.",
    icon: Check,
  },
  {
    title: "Flexibel planbar",
    text: "Keine Mindestlaufzeit. Blöcke können angepasst werden.",
    icon: Repeat,
  },
] as const;

export function PricingSections() {
  return (
    <Section
      id="preise"
      gradient="bottom"
      containerClassName="gap-6"
      offsetFooter
    >
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] justify-center items-center gap-8">
        <CTA variant="left">
          <CTAHeader>
            <Lead>Einfach, transparent, flexibel</Lead>
            <H1>
              Klare Preise
              <br />
              ohne Überraschungen.
            </H1>
            <P>Ohne versteckte Kosten, oder Verpflichtungen.</P>
          </CTAHeader>
        </CTA>

        <Card size="sm">
          <CardContent className="grid gap-8">
            <div>
              <div className="font-heading text-6xl font-semibold tracking-tight sm:text-7xl">
                30 €
              </div>
              <Muted className="mt-2">für 60 Minuten</Muted>
            </div>

            <div className="flex flex-col gap-2">
              <Small>Alle Fächer zum gleichen Preis:</Small>
              <div className="flex flex-wrap gap-2">
                {subjectList.map((subject) => {
                  return (
                    <Magnetic key={subject.key}>
                      <SubjectBadge subject={subject} />
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {policyItems.map((item) => (
          <PolicyCard key={item.title} item={item} />
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] justify-center items-center gap-8">
        <PaymentCard />

        <CTA variant="right">
          <CTAHeader>
            <P>Transparent und ohne feste Vertragslaufzeit.</P>
            <H1>So kannst du zahlen</H1>
            <Lead>Zahlungsflow</Lead>
          </CTAHeader>
        </CTA>
      </div>
    </Section>
  );
}

function PaymentCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Zahlungsmethoden</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {paymentMethods.map((detail) => (
          <PolicyCard key={detail.title} item={detail} />
        ))}
      </CardContent>

      <CardHeader>
        <CardTitle>Abrechungsoptionen</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {paymentOptions.map((detail) => (
          <PolicyCard key={detail.title} item={detail} />
        ))}
      </CardContent>
    </Card>
  );
}

function PolicyCard({
  item,
}: {
  item: {
    title: string;
    text: string;
    icon: LucideIcon;
  };
}) {
  const Icon = item.icon;

  return (
    <Magnetic className="grid">
      <Card size="sm" variant="interactive">
        <CardContent className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon size={18} />
          </span>
          <div>
            <p className="font-medium">{item.title}</p>
            <Muted>{item.text}</Muted>
          </div>
        </CardContent>
      </Card>
    </Magnetic>
  );
}
