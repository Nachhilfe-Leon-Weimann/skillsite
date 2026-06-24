import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LinkButton } from "@/components/ui/button";
import { Heading, Lead, Text } from "@/components/ui/typography";
import { StatGrid } from "@/components/sections/stat-grid";
import { ProfilePhoto } from "@/components/sections/profile-photo";
import { CtaSection } from "@/components/sections/cta-section";
import {
  aboutIntro,
  aboutStats,
  aboutQuote,
  principles,
  software,
} from "@/content/about";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Hi, ich bin Leon. Ich gebe Nachhilfe in Mathe, Informatik und Physik – individuell statt nach Schema, auf Augenhöhe und ohne Druck.",
};

export default function AboutPage() {
  return (
    <>
      <Container className="py-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="grid items-center gap-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-2">
          <div>
            <Eyebrow>Über mich</Eyebrow>
            <Heading as="h1" size="h1" className="mt-4">
              Hi, ich bin Leon.
            </Heading>
            <Lead className="mt-5 max-w-[30em]">{aboutIntro}</Lead>
            <LinkButton
              href={routes.firstMeeting}
              variant="primary"
              size="lg"
              className="mt-7"
            >
              Finde heraus, ob wir zusammenpassen →
            </LinkButton>
          </div>

          <div className="flex flex-col gap-4">
            <ProfilePhoto aspect="5/4" />
            <StatGrid items={aboutStats} size="sm" className="grid-cols-3" />
          </div>
        </div>
      </Container>

      <Container className="pb-section-sm">
        <div className="mx-auto max-w-[880px] rounded-3xl bg-navy p-[clamp(1.75rem,4vw,2.75rem)] shadow-card">
          <p className="font-heading text-[clamp(1.3rem,2.6vw,1.9rem)] font-medium leading-[1.35] text-white">
            „{aboutQuote}“
          </p>
        </div>
      </Container>

      <Container className="py-section-sm">
        <Heading size="h3" className="mb-8">
          Woran ich mich halte
        </Heading>
        <div className="grid gap-5 sm:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.n}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <span className="font-heading text-[2rem] font-extrabold leading-none text-coral">
                {principle.n}
              </span>
              <Heading as="h3" size="title" className="mt-3 mb-2">
                {principle.title}
              </Heading>
              <Text tone="muted">{principle.text}</Text>
            </div>
          ))}
        </div>
      </Container>

      <Section surface>
        <div className="grid items-center gap-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>{software.eyebrow}</Eyebrow>
            <Heading size="h3" className="mt-4 mb-4">
              {software.title}
            </Heading>
            <Text size="lead" tone="muted">
              {software.text}
            </Text>
          </div>
          <div className="rounded-2xl bg-navy p-6 font-mono text-[0.86rem] leading-[1.7] text-on-navy shadow-card">
            <div className="text-on-navy-muted">{"// das Prinzip zuerst"}</div>
            <div>
              <span className="text-coral-light">function</span>{" "}
              <span className="text-accent-blue">verstehen</span>
              {"(stoff) {"}
            </div>
            <div>
              {"  "}
              <span className="text-coral-light">if</span>
              {" (stoff.klickt) "}
              <span className="text-coral-light">return</span>{" "}
              <span className="text-[#8FD49B]">{"'kann ich selbst'"}</span>;
            </div>
            <div>
              {"  "}
              <span className="text-coral-light">return</span>{" "}
              <span className="text-accent-blue">nochmal</span>
              {"(stoff, anderswie);"}
            </div>
            <div>{"}"}</div>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
