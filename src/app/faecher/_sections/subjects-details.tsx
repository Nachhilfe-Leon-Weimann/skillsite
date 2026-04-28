import { CTA, CTABadge, CTAHeader } from "@/components/blocks/cta";
import { Section } from "@/components/layout/section";
import { PricingBadge } from "@/components/shared/pricing-badge";
import { SubjectDetailCard } from "@/components/shared/subject-detail-card";
import { Badge } from "@/components/ui/badge";
import { H1, H4, P } from "@/components/ui/typography";
import {
  SubjectDetail,
  formatSubjectPrice,
  subjectList,
} from "@/content/subjects";

export function SubjectsDetails() {
  return (
    <>
      {subjectList.map((subject) => (
        <SubjectDetailsSection key={subject.key} subject={subject} />
      ))}
    </>
  );
}

function SubjectDetailsSection({ subject }: { subject: SubjectDetail }) {
  const { section } = subject;

  if (section.layout.type === "showcase") {
    const [topLeftTopic, topRightTopic, bottomLeftTopic, bottomRightTopic] =
      section.topics;

    return (
      <Section
        id={section.anchorId}
        variant="content"
        className="scroll-mt-24"
        containerClassName="gap-16 lg:gap-32"
      >
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex w-full flex-col justify-center lg:w-1/2">
            <H4>{section.layout.topAside}</H4>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-1/2">
            {topLeftTopic ? <TopicCard topic={topLeftTopic} /> : null}
            {topRightTopic ? <TopicCard topic={topRightTopic} /> : null}
          </div>
        </div>

        <SubjectTitleBlock subject={subject} />

        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-1/2">
            {bottomLeftTopic ? <TopicCard topic={bottomLeftTopic} /> : null}
            {bottomRightTopic ? <TopicCard topic={bottomRightTopic} /> : null}
          </div>

          <div className="flex w-full flex-col justify-center text-left lg:w-1/2 lg:text-end">
            <H4>{section.layout.bottomAside}</H4>
          </div>
        </div>
      </Section>
    );
  }

  const cards = (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {section.topics.map((topic) => (
        <TopicCard key={topic.title} topic={topic} />
      ))}
    </div>
  );

  const title = <SubjectTitleBlock subject={subject} />;

  return (
    <Section id={section.anchorId} variant="content" className="scroll-mt-24">
      <div className="grid gap-16 lg:grid-cols-2">
        {section.layout.ctaSide === "left" ? title : cards}
        {section.layout.ctaSide === "left" ? cards : title}
      </div>
    </Section>
  );
}

function SubjectTitleBlock({ subject }: { subject: SubjectDetail }) {
  const Icon = subject.icon;
  const { section } = subject;

  return (
    <CTA variant="center" className="justify-center">
      <CTAHeader>
        <div className="rounded-2xl bg-card p-3">
          <Icon size={36} />
        </div>
        <CTABadge>
          {subject.tag && <Badge>{subject.tag}</Badge>}

          <PricingBadge href={section.pricing.href}>
            {formatSubjectPrice(section.pricing)}
          </PricingBadge>
        </CTABadge>
        <H1>{section.headline}</H1>
        <P>{section.description}</P>
      </CTAHeader>
    </CTA>
  );
}

function TopicCard({
  topic,
}: {
  topic: SubjectDetail["section"]["topics"][number];
}) {
  return (
    <SubjectDetailCard
      title={topic.title}
      description={topic.description}
      image={topic.image}
      alt={topic.alt}
      icon={topic.icon}
    />
  );
}
