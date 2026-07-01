import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Text } from "@/components/ui/typography";
import { Booker } from "@/components/booking/booker";
import { CtaSection } from "@/components/sections/cta-section";
import { routes } from "@/lib/routes";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/termin" },
  title: "Termin buchen",
  description:
    "Für bestehende Schüler:innen: freie Slots direkt im Kalender wählen. Bis 24 h vorher kostenfrei verschieben oder absagen.",
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Termin buchen"
        title="Buche deine nächste Nachhilfestunde."
        titleClassName="max-w-[14em]"
        lead="Für bestehende Schüler:innen: freie Slots direkt im Kalender wählen. Bis 24 h vorher kostenfrei verschieben oder absagen."
      />

      <Container className="py-section-sm">
        <Booker
          event="nachhilfe"
          title="Nachhilfestunde buchen"
          subtitle="Such dir einen freien Slot – wöchentlich oder nach Bedarf."
        />
        <Reveal variant="fade" as="p" className="mt-6">
          <Text as="span" tone="muted">
            Noch keine Schülerin / kein Schüler?{" "}
            <Link
              href={routes.firstMeeting}
              className="font-semibold text-coral underline underline-offset-[3px]"
            >
              Starte mit dem kostenlosen Erstgespräch{" "}
              <ArrowRight className="inline size-4" aria-hidden />
            </Link>
          </Text>
        </Reveal>
      </Container>

      <CtaSection />
    </>
  );
}
