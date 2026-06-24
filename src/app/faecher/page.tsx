import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { Tag } from "@/components/ui/tag";
import { LinkButton } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { SubjectCards } from "@/components/sections/subject-cards";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { subjects } from "@/content/subjects";
import { subjectsFaq } from "@/content/faqs";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Fächer",
  description:
    "Mathematik, Informatik und Physik aus einer Hand – ein fairer Festpreis von 30 € pro Stunde für jede Klassenstufe.",
};

export default function SubjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fächer"
        title="Mathe, Informatik und Physik – aus einer Hand."
        titleClassName="max-w-[14em]"
        lead={
          <>
            Die drei Fächer gehören zusammen: Wer das Prinzip in einem versteht,
            tut sich auch in den anderen leichter. Ein fairer Festpreis von
            30&nbsp;€/h gilt für alle.
          </>
        }
      />

      <Container>
        <SubjectCards />
      </Container>

      {subjects.map((subject, index) => (
        <Section
          key={subject.key}
          id={subject.anchorId}
          surface={index % 2 === 1}
        >
          <div className="grid items-start gap-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex items-center gap-3.5">
                <span className="flex size-14.5 items-center justify-center rounded-2xl border border-line bg-surface font-heading text-[1.6rem] font-bold text-coral">
                  {subject.glyph}
                </span>
                <div>
                  <Heading size="h3">{subject.name}</Heading>
                  <Tag className="mt-2">30 € / Stunde</Tag>
                </div>
              </div>
              <Text size="lead" tone="muted" className="mt-6">
                {subject.description}
              </Text>
              <LinkButton
                href={routes.firstMeeting}
                variant="navy"
                className="mt-6"
              >
                Erstgespräch zu {subject.name} →
              </LinkButton>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {subject.topics.map((topic) => (
                <div
                  key={topic.title}
                  className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
                >
                  <div className="relative aspect-video border-b border-line">
                    <Image
                      src={topic.image}
                      alt={topic.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <Heading as="h3" size="title">
                      {topic.title}
                    </Heading>
                    <Text size="small" tone="muted" className="mt-1">
                      {topic.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <FaqSection
        id="faq"
        title="Häufige Fragen zu den Fächern"
        items={subjectsFaq}
      />
      <CtaSection />
    </>
  );
}
