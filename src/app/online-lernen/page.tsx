import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { LinkButton } from "@/components/ui/button";
import { AnimatedCheckMark } from "@/components/ui/animated-check-mark";
import { Reveal } from "@/components/ui/reveal";
import { Heading, Text } from "@/components/ui/typography";
import { CtaSection } from "@/components/sections/cta-section";
import {
  discordSetup,
  discordFeatures,
  platforms,
  techNote,
} from "@/content/online-learning";
import { primaryCta } from "@/content/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Online lernen",
  description:
    "Nachhilfe über Discord oder MS Teams - live mit geteiltem Bildschirm, schnell eingerichtet, Materialien dauerhaft abrufbar.",
};

export default function OnlineLearningPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plattform · Unser Klassenzimmer"
        title="Nachhilfe auf Discord - schnell eingerichtet."
        titleClassName="max-w-[14em]"
        lead="Discord ist mein Standard-Klassenzimmer: kostenlos, stabil und praktisch. Du nutzt lieber MS Teams? Auch das geht - einfach Bescheid sagen."
      >
        <LinkButton href={primaryCta.href} variant="primary" size="lg">
          {primaryCta.label} →
        </LinkButton>
        <LinkButton href={routes.process} variant="outline" size="lg">
          Zum Ablauf
        </LinkButton>
      </PageHeader>

      <Container className="py-section-sm">
        <Reveal variant="rise-soft">
          <Heading size="h3" className="mb-8">
            In vier Schritten startklar
          </Heading>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {discordSetup.map((step, i) => (
            <Reveal
              key={step.n}
              variant="rise-soft"
              index={i}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <span className="font-heading text-[2.2rem] font-extrabold leading-none text-coral">
                {step.n}
              </span>
              <Heading as="h3" size="title" className="mt-3 mb-1.5">
                {step.title}
              </Heading>
              <Text size="small" tone="muted">
                {step.text}
              </Text>
            </Reveal>
          ))}
        </div>
      </Container>

      <Section surface>
        <Reveal variant="rise-soft">
          <Eyebrow>Server-Funktionen</Eyebrow>
        </Reveal>
        <Reveal variant="rise-soft" className="mt-4 mb-9 max-w-[16em]">
          <Heading size="h3">
            Alles an einem Ort - auch zwischen den Stunden.
          </Heading>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {discordFeatures.map((feature, index) => (
            <Reveal
              key={feature.title}
              variant="rise-soft"
              index={index}
              className="flex items-start gap-4 rounded-2xl border border-line bg-bg p-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--coral)_14%,transparent)] text-coral">
                <AnimatedCheckMark index={index} className="size-5" />
              </span>
              <div>
                <Heading as="h3" size="title" className="mb-1.5">
                  {feature.title}
                </Heading>
                <Text size="small" tone="muted">
                  {feature.text}
                </Text>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Container className="py-section-sm">
        <div className="grid gap-5 md:grid-cols-2">
          {platforms.map((platform, i) => (
            <Reveal
              key={platform.name}
              variant="rise-soft"
              index={i}
              className="rounded-2xl border border-line bg-surface p-7 shadow-card"
            >
              <div className="mb-3.5 flex items-center justify-between">
                <Heading as="h3" size="h4">
                  {platform.name}
                </Heading>
                <Tag>{platform.tag}</Tag>
              </div>
              <Text tone="muted">{platform.text}</Text>
            </Reveal>
          ))}
        </div>
        <Reveal
          variant="rise-soft"
          className="mt-6 flex flex-wrap items-center gap-3.5 rounded-2xl border border-line bg-surface-2 px-6 py-6"
        >
          <span className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-caption text-coral">
            Technik
          </span>
          <Text tone="muted">{techNote}</Text>
        </Reveal>
      </Container>

      <CtaSection />
    </>
  );
}
