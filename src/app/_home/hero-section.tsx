import Link from "next/link";

import { Section } from "@/components/layout/section";
import { ContactAction } from "@/components/shared/contact-action";
import { Badge } from "@/components/ui/badge";
import { H1, H2, Lead, Muted, P } from "@/components/ui/typography";
import { subjectList } from "@/content/subjects";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <Section
      className="relative overflow-hidden flex flex-col items-center justify-center"
      containerClassName="relative z-10 my-20 justify-evenly text-center max-h-150 gap-32"
      gradient="bottom"
    >
      <HeroShapes />
      <TopPart />
      <BottomPart />
    </Section>
  );
}

function HeroShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute left-[14%] top-[30%] h-48 w-48 rounded-3xl border border-blue-300/60 bg-blue-100/50" />
      <div className="absolute left-[7%] top-[50%] h-48 w-48 rounded-3xl border border-red-300/60 bg-red-100/50" />
      <div className="absolute right-[8%] top-[20%] h-48 w-48 rounded-3xl border border-red-300/60 bg-red-100/50" />
      <div className="absolute right-[16%] top-[40%] h-48 w-48 rounded-3xl border border-blue-300/60 bg-blue-100/50" />
    </div>
  );
}

function TopPart() {
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="space-y-4">
        <H1 className="text-6xl">Gute Noten ohne Umweg</H1>
        <Lead className="font-medium">
          Professionelle Nachhilfe für Schüler:innen und Studenten
        </Lead>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-12 text-left">
        <NumberCard number={320} text="Gemeinsame Stunden" />
        <NumberCard number={35} text="Betreute Schüler" />
      </div>
    </div>
  );
}

function NumberCard({ number, text }: { number: number; text: string }) {
  return (
    <div className="space-y-1">
      <H2 className="font-semibold text-accent-foreground">+{number}</H2>
      <P className="mt-0!">{text}</P>
    </div>
  );
}

function BottomPart() {
  return (
    <div className="flex flex-col items-center gap-16">
      <ContactAction />

      <div className="flex flex-col items-center gap-4">
        <Muted>Hol dir Hilfe in</Muted>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <SubjectBadges />
        </div>
      </div>
    </div>
  );
}

function SubjectBadges() {
  return (
    <>
      {subjectList.map((subject) => (
        <Button
          key={subject.key}
          variant="link"
          className="p-0 hover:no-underline text-md"
          asChild
        >
          <Link href={subject.href}>
            <Badge
              className="min-w-42 text-md p-3.5 hover:border-primary/40 hover:bg-primary/5"
              variant="outline"
            >
              {subject.name}
            </Badge>
          </Link>
        </Button>
      ))}
    </>
  );
}
