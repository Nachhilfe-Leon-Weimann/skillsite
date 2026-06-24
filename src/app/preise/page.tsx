import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { CheckMark } from "@/components/ui/check-mark";
import { Heading, Text } from "@/components/ui/typography";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import {
  lessonPrice,
  priceIncludes,
  fairConditions,
  paymentOptions,
  but,
} from "@/content/pricing";
import { pricingFaq } from "@/content/faqs";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Klare Preise ohne Überraschungen: 30 € pro 60 Minuten für alle Fächer und Klassenstufen. Förderung über Bildung & Teilhabe möglich.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        align="center"
        eyebrow="Preise"
        title="Klare Preise ohne Überraschungen."
        titleClassName="max-w-[12em]"
      />

      <Container className="py-section-sm">
        <div className="mx-auto max-w-230">
          <div className="grid overflow-hidden rounded-3xl border border-line shadow-card md:grid-cols-2">
            <div className="flex flex-col justify-center bg-navy p-[clamp(2rem,4vw,2.75rem)] text-white">
              <span className="font-semibold tracking-[0.04em] text-accent-blue">
                Festpreis für alle Fächer
              </span>
              <div className="my-2.5 flex items-baseline gap-2">
                <span className="font-heading text-[clamp(3.6rem,8vw,5.2rem)] font-extrabold leading-none">
                  {lessonPrice.amount}
                </span>
                <Text as="span" tone="on-navy-soft" className="text-[1.1rem]">
                  {lessonPrice.unit}
                </Text>
              </div>
              <Text tone="on-navy-soft" className="mb-6">
                {lessonPrice.note}
              </Text>
              <LinkButton
                href={routes.firstMeeting}
                variant="primary"
                className="w-full sm:w-fit"
              >
                Kostenloses Erstgespräch →
              </LinkButton>
            </div>
            <div className="flex flex-col justify-center gap-3.5 bg-surface p-[clamp(2rem,4vw,2.75rem)]">
              {priceIncludes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckMark className="mt-0.5 size-5 shrink-0 text-coral" />
                  <Text as="span">{item}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-section-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-7">
            <Heading as="h2" size="h4" className="mb-4">
              Fair bleibt fair
            </Heading>
            <div className="flex flex-col gap-3">
              {fairConditions.map((condition) => (
                <Text key={condition.text} tone="muted">
                  {condition.strong ? (
                    <strong className="text-ink">{condition.strong} </strong>
                  ) : null}
                  {condition.text}
                </Text>
              ))}
            </div>
          </Card>
          <Card className="p-7">
            <Heading as="h2" size="h4" className="mb-4">
              Zahlung &amp; Abrechnung
            </Heading>
            <div className="flex flex-col gap-3">
              {paymentOptions.map((option) => (
                <Text key={option.text} tone="muted">
                  {option.strong ? (
                    <strong className="text-ink">{option.strong} </strong>
                  ) : null}
                  {option.text}
                </Text>
              ))}
            </div>
          </Card>
        </div>
      </Container>

      <Section id="but" surface>
        <Eyebrow>Bildung &amp; Teilhabe</Eyebrow>
        <Heading size="h3" className="mt-4 mb-2.5 max-w-[18em]">
          Nachhilfe kann gefördert werden – ganz normaler Unterricht.
        </Heading>
        <Text tone="muted" className="mb-8 max-w-[38em]">
          {but.intro}
        </Text>
        <div className="grid gap-5 sm:grid-cols-3">
          {but.steps.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-line bg-bg p-6"
            >
              <span className="font-heading text-[2rem] font-extrabold leading-none text-coral">
                {step.n}
              </span>
              <Text className="mt-3">{step.text}</Text>
            </div>
          ))}
        </div>
      </Section>

      <FaqSection title="Fragen zu Preis & Zahlung" items={pricingFaq} />
      <CtaSection />
    </>
  );
}
