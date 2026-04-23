import { CTA, CTABadge, CTAHeader } from "@/components/blocks/cta";
import { Magnetic } from "@/components/effects/magnetic";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1, P } from "@/components/ui/typography";
import { subjectList } from "@/content/subjects";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export function SubjectsHero() {
  return (
    <Section gradient="bottom" containerClassName="gap-24" offsetFooter>
      <CTA className="max-w-full">
        <CTAHeader>
          <CTABadge>
            <Badge variant="outline">Fächerübersicht</Badge>
          </CTABadge>

          <H1>Starke Fächer für starke Leistungen</H1>
          <P>Weil echtes Verständnis mehr zählt als auswendig lernen.</P>
        </CTAHeader>
      </CTA>

      <div className="grid grid-cols-3 gap-8">
        {subjectList.map((subject) => (
          <SubjectCard
            key={subject.key}
            icon={subject.icon}
            title={subject.name}
            description={subject.description}
            linkLabel="Mehr erfahren"
            linkHref={subject.href}
            tag={subject.tag}
          />
        ))}
      </div>
    </Section>
  );
}

function SubjectCard({
  icon,
  title,
  description,
  linkLabel,
  linkHref,
  tag,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  tag?: string;
}) {
  const Icon = icon;

  return (
    <Magnetic>
      <Card variant="interactive">
        <CardHeader>
          <div>
            <Magnetic className="w-fit p-3 bg-muted rounded-lg">
              <Icon size={32} />
            </Magnetic>
          </div>

          {tag && (
            <CardAction>
              <Badge>{tag}</Badge>
            </CardAction>
          )}
        </CardHeader>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0" asChild>
            <Link href={linkHref}>{linkLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </Magnetic>
  );
}
