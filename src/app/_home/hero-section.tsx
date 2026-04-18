import Link from "next/link";

import { Section } from "@/components/layout/section";
import { CTAButton } from "@/components/shared/cta-button";
import { Badge } from "@/components/ui/badge";
import { H1, H2, P } from "@/components/ui/typography";
import { subjectList } from "@/content/subjects";

export function HeroSection() {
  return (
    <Section
      className="relative overflow-hidden"
      containerClassName="relative z-10 my-20 justify-evenly text-center"
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
    <div className="flex flex-col items-center gap-8">
      <div className="space-y-3">
        <H1>Gute Noten ohne Umweg</H1>
        <P>Professionelle Nachhilfe für Schüler:innen und Studenten</P>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-10 text-left">
        <NumberCard number={320} text="Gemeinsame Stunden" />
        <NumberCard number={35} text="Betreute Schüler" />
      </div>
    </div>
  );
}

function NumberCard({ number, text }: { number: number; text: string }) {
  return (
    <div className="space-y-1">
      <H2 className="text-primary">+{number}</H2>
      <P>{text}</P>
    </div>
  );
}

function BottomPart() {
  return (
    <div className="flex flex-col items-center gap-8">
      <CTAButton />

      <div className="flex flex-col items-center gap-4">
        <P>Hol dir Hilfe in</P>

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
        <Link key={subject.key} href={subject.href}>
          <Badge className="min-w-32" variant="outline">
            {subject.name}
          </Badge>
        </Link>
      ))}
    </>
  );
}
