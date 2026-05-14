import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  H1,
  H2,
  H3,
  InlineLink,
  Lead,
  Small,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ExternalLink, Scale, type LucideIcon } from "lucide-react";

import { DocNavSection, DocSectionNav } from "./doc-section-nav";

type DocShellProps = {
  sections?: DocNavSection[];
  children: React.ReactNode;
};

export function DocShell({ sections, children }: DocShellProps) {
  return (
    <Section offsetFooter containerClassName="justify-start">
      <div
        className={cn(
          "mx-auto grid w-full max-w-6xl gap-10",
          sections ? "lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14" : "",
        )}
      >
        <article className="min-w-0">{children}</article>

        {sections ? (
          <aside className="order-first lg:order-last lg:sticky lg:top-28 lg:self-start">
            <DocSectionNav sections={sections} />
          </aside>
        ) : null}
      </div>
    </Section>
  );
}

type DocHeroProps = {
  badge: string;
  icon: LucideIcon;
  title: React.ReactNode;
  lead: React.ReactNode;
  facts?: Array<{
    icon: LucideIcon;
    label: string;
    children: React.ReactNode;
  }>;
};

export function DocHero({
  badge,
  icon: Icon,
  title,
  lead,
  facts,
}: DocHeroProps) {
  return (
    <Card className="py-0 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <header>
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
            <Icon className="size-4" aria-hidden="true" />
            {badge}
          </div>
          <H1
            variant="doc"
            className="mt-5 hyphens-auto text-4xl leading-tight sm:text-5xl"
          >
            {title}
          </H1>
          <Lead variant="doc" className="max-w-3xl">
            {lead}
          </Lead>

          {facts?.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <DocHeaderFact
                  key={fact.label}
                  icon={fact.icon}
                  label={fact.label}
                >
                  {fact.children}
                </DocHeaderFact>
              ))}
            </div>
          ) : null}
        </header>
      </CardContent>
    </Card>
  );
}

export function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-m-24 border-b py-10 last:border-b-0 sm:py-12"
    >
      <H2 variant="doc" className="max-w-3xl">
        {title}
      </H2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function DocSubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-l pl-4 not-first:mt-8 sm:pl-6">
      <H3 variant="doc" className="text-lg">
        {title}
      </H3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function DocGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-first:mt-10">
      <p className="mb-4 text-sm font-medium uppercase tracking-normal text-muted-foreground">
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}

export function DocList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("my-4 space-y-2 leading-7", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-foreground/45"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DocDetailGrid({ children }: { children: React.ReactNode }) {
  return <div className="my-5 grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function DocDetailList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card size="sm" className="rounded-lg bg-muted/35 py-0 shadow-none">
      <CardContent className="p-4">
        <p className="text-sm font-medium leading-6">{title}</p>
        <DocList items={items} className="my-3 text-sm leading-6" />
      </CardContent>
    </Card>
  );
}

export function DocLinkList({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <ul className="my-4 grid gap-2 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.href}>
          <Card
            size="sm"
            variant="interactive"
            className="rounded-lg py-0 shadow-none"
          >
            <CardContent className="p-0">
              <InlineLink
                variant="doc"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm no-underline"
              >
                <span>{link.label}</span>
                <ExternalLink
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
              </InlineLink>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function DocProviderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <p className="leading-7 text-foreground not-first:mt-4">
      <span className="text-muted-foreground">Datenschutzerklärung: </span>
      <InlineLink
        variant="doc"
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1"
      >
        {children}
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </InlineLink>
    </p>
  );
}

export function DocLegalBasis({ children }: { children: React.ReactNode }) {
  return (
    <Card size="sm" className="mt-4 rounded-lg bg-muted/50 py-0 shadow-none">
      <CardContent className="flex gap-3 p-3">
        <Scale className="mt-1 size-4 shrink-0 text-muted-foreground" />
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="font-medium text-foreground">Rechtsgrundlage: </span>
          {children}
        </p>
      </CardContent>
    </Card>
  );
}

function DocHeaderFact({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card size="sm" className="rounded-lg bg-background py-0 shadow-none">
      <CardContent className="flex items-center gap-3 p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <Small variant="doc" className="mt-0">
            {label}
          </Small>
          <p className="truncate text-sm font-medium leading-5">{children}</p>
        </div>
      </CardContent>
    </Card>
  );
}
