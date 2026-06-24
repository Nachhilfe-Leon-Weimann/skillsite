import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LinkButton } from "@/components/ui/button";
import { CheckMark } from "@/components/ui/check-mark";
import { Heading, Text } from "@/components/ui/typography";
import { StepGrid } from "@/components/sections/step-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { startSteps, lessonFlow, discordHighlights } from "@/content/process";
import { processFaq } from "@/content/faqs";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Ablauf",
  description:
    "So läuft die Nachhilfe ab: kostenloses Erstgespräch, erste Stunde, dein Rhythmus. Unterricht online über Discord oder MS Teams.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ablauf"
        title="So läuft die Nachhilfe bei mir ab."
        titleClassName="max-w-[13em]"
        lead="Kein Schema F. Wir starten dort, wo du wirklich stehst, und finden gemeinsam deinen Rhythmus."
      />

      <Container className="py-section-sm">
        <Heading size="h3" className="mb-8">
          Einstieg in drei Schritten
        </Heading>
        <StepGrid steps={startSteps} card />
      </Container>

      <Section surface>
        <div className="grid items-center gap-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-2">
          <div>
            <Eyebrow>Eine Stunde · 60 Minuten</Eyebrow>
            <Heading size="h3" className="mt-4 mb-6">
              So ist eine Stunde aufgebaut.
            </Heading>
            <div className="flex flex-col gap-4.5">
              {lessonFlow.map((step) => (
                <div key={step.n} className="flex items-start gap-4">
                  <span className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--coral)_14%,transparent)] text-small font-bold text-coral">
                    {step.n}
                  </span>
                  <div>
                    <strong className="block text-ink">{step.title}</strong>
                    <Text as="span" tone="muted">
                      {step.text}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            id="discord"
            className="scroll-mt-24 rounded-3xl bg-navy p-[clamp(1.75rem,4vw,2.5rem)] text-on-navy shadow-card"
          >
            <span className="text-eyebrow uppercase text-accent-blue">
              Unser Klassenzimmer
            </span>
            <Heading as="h3" size="h4" className="mt-3.5 mb-2.5 text-white">
              Unterricht über Discord oder MS Teams
            </Heading>
            <Text tone="on-navy-soft" className="mb-4">
              Live mit geteiltem Bildschirm – wie am selben Tisch, nur ohne
              Anfahrt. Du wählst die Plattform, die für dich am einfachsten ist.
            </Text>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/25 px-3.5 py-1.5 text-small font-semibold text-white">
                Discord
              </span>
              <span className="rounded-full border border-white/25 px-3.5 py-1.5 text-small font-semibold text-white">
                MS Teams
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {discordHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-2.5 text-on-navy"
                >
                  <CheckMark className="mt-0.5 size-4.5 shrink-0 text-coral-light" />
                  <Text as="span" size="small" tone="inherit">
                    {highlight}
                  </Text>
                </div>
              ))}
            </div>
            <LinkButton
              href={routes.onlineLearning}
              variant="white"
              className="mt-6"
            >
              So richtest du Discord ein →
            </LinkButton>
          </div>
        </div>
      </Section>

      <Container className="py-section-sm text-center">
        <Heading size="h3">Termine selbst buchen</Heading>
        <Text tone="muted" className="mx-auto mt-3 mb-7 max-w-[32em]">
          Freie Slots direkt im Kalender wählen – wöchentlich, vor Klausuren
          intensiver oder nach Bedarf. Bis 24&nbsp;h vorher kostenfrei absagen.
        </Text>
        <LinkButton href={routes.booking} variant="primary" size="lg">
          Verfügbare Termine ansehen →
        </LinkButton>
      </Container>

      <FaqSection
        id="faq"
        title="Häufige Fragen zum Ablauf"
        items={processFaq}
      />
      <CtaSection />
    </>
  );
}
