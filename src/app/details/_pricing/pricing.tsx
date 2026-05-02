import { CTA, CTAHeader } from "@/components/blocks/cta";
import { Section } from "@/components/layout/section";
import { IconInfoCard } from "@/components/shared/icon-info-card";
import { PaymentCard } from "@/app/details/_pricing/payment-card";
import { Card, CardContent } from "@/components/ui/card";
import { H1, Lead, Muted, P, Small } from "@/components/ui/typography";
import {
  formatLessonAmount,
  formatLessonDuration,
} from "@/content/lesson-pricing";
import { pricingContent } from "@/content/pricing";
import { subjectList } from "@/content/subjects";
import { SubjectBadge } from "@/components/shared/subject-badge";
import { Magnetic } from "@/components/effects/magnetic";

export function PricingSections() {
  const pricing = pricingContent.priceSummary.pricing;

  return (
    <Section
      id={pricingContent.sectionId}
      gradient="bottom"
      containerClassName="gap-6"
      offsetFooter
    >
      <div className="grid items-center justify-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <CTA variant="left">
          <CTAHeader>
            <Lead>{pricingContent.hero.lead}</Lead>
            <H1>{pricingContent.hero.title}</H1>
            <P>{pricingContent.hero.description}</P>
          </CTAHeader>
        </CTA>

        <Card size="sm">
          <CardContent className="grid gap-8">
            <div>
              <div className="font-heading text-6xl text-accent-foreground font-semibold tracking-tight sm:text-7xl">
                {formatLessonAmount(pricing)}
              </div>
              <Muted className="mt-2">{formatLessonDuration(pricing)}</Muted>
            </div>

            <div className="flex flex-col gap-2">
              <Small>{pricingContent.priceSummary.subjectsLabel}</Small>
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

      <div className="grid gap-6 md:grid-cols-3">
        {pricingContent.serviceDetails.map((item) => (
          <IconInfoCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="grid items-center justify-center gap-8 lg:grid-cols-2">
        <PaymentCard sections={pricingContent.payment.sections} />

        <CTA variant="right">
          <CTAHeader>
            <P>{pricingContent.payment.cta.description}</P>
            <H1>{pricingContent.payment.cta.title}</H1>
            <Lead>{pricingContent.payment.cta.lead}</Lead>
          </CTAHeader>
        </CTA>
      </div>
    </Section>
  );
}
