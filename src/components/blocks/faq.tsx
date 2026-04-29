import * as React from "react";

import {
  CTA,
  CTAActions,
  CTABadge,
  CTAHeader,
} from "@/components/blocks/cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { H2, H3, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type FAQItem = {
  value?: string;
  question: React.ReactNode;
  answer: React.ReactNode;
};

type FAQMoreQuestionsCTA = {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

type FAQProps = Omit<React.ComponentProps<"div">, "title"> & {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  items: FAQItem[];
  defaultValue?: string;
  collapsible?: boolean;
  moreQuestionsCTA?: FAQMoreQuestionsCTA;
};

function FAQ({
  badge,
  title,
  description,
  items,
  defaultValue,
  collapsible = true,
  moreQuestionsCTA,
  className,
  ...props
}: FAQProps) {
  const moreQuestionsTitle = moreQuestionsCTA?.title;
  const moreQuestionsDescription = moreQuestionsCTA?.description;
  const moreQuestionsActions = moreQuestionsCTA?.actions;

  return (
    <div
      data-slot="faq"
      className={cn("mx-auto flex w-full max-w-3xl flex-col gap-10", className)}
      {...props}
    >
      <CTA>
        <CTAHeader>
          {badge ? <CTABadge>{badge}</CTABadge> : null}
          <H2>{title}</H2>
          {description ? <P>{description}</P> : null}
        </CTAHeader>
      </CTA>

      <Card className="gap-0 py-0">
        <CardContent>
          <Accordion
            type="single"
            collapsible={collapsible}
            defaultValue={defaultValue}
          >
            {items.map((item, index) => {
              const value = item.value ?? `item-${index + 1}`;

              return (
                <AccordionItem key={value} value={value}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {typeof item.answer === "string" ? (
                      <p>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {moreQuestionsTitle ? (
        <CTA className="gap-6">
          <CTAHeader>
            <H3>{moreQuestionsTitle}</H3>
            {moreQuestionsDescription ? (
              <P>{moreQuestionsDescription}</P>
            ) : null}
          </CTAHeader>

          {moreQuestionsActions ? (
            <CTAActions>{moreQuestionsActions}</CTAActions>
          ) : null}
        </CTA>
      ) : null}
    </div>
  );
}

export { FAQ };
export type { FAQItem, FAQMoreQuestionsCTA, FAQProps };
