"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DocNavSection = {
  id: string;
  label: string;
};

type DocSectionNavProps = {
  sections: DocNavSection[];
  title?: string;
};

export function DocSectionNav({
  sections,
  title = "Übersicht",
}: DocSectionNavProps) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id);
  const ignoreObserverUntilRef = useRef(0);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  function activateSection(sectionId: string) {
    ignoreObserverUntilRef.current = Date.now() + 1000;
    setActiveSectionId(sectionId);
  }

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < ignoreObserverUntilRef.current) return;

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const nextActiveId = visibleEntries[0]?.target.id;

        if (nextActiveId) {
          setActiveSectionId(nextActiveId);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    function activateHashSection() {
      const hashId = decodeURIComponent(window.location.hash.slice(1));

      if (sections.some((section) => section.id === hashId)) {
        activateSection(hashId);
      }
    }

    activateHashSection();
    window.addEventListener("hashchange", activateHashSection);

    return () => window.removeEventListener("hashchange", activateHashSection);
  }, [sections]);

  useEffect(() => {
    if (!activeSectionId) return;

    linkRefs.current[activeSectionId]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [activeSectionId]);

  return (
    <Card className="rounded-lg py-0 shadow-sm">
      <CardContent className="max-h-[calc(100dvh-8rem)] overflow-y-auto p-4">
        <nav aria-labelledby="doc-navigation-heading">
          <p
            id="doc-navigation-heading"
            className="text-sm font-semibold tracking-tight"
          >
            {title}
          </p>
          <ol className="mt-3 space-y-1">
            {sections.map((section, index) => {
              const isActive = activeSectionId === section.id;

              return (
                <li key={section.id}>
                  <a
                    ref={(element) => {
                      linkRefs.current[section.id] = element;
                    }}
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => activateSection(section.id)}
                    className={cn(
                      "relative flex gap-2 rounded-md border border-transparent py-2 pr-2 pl-3 text-sm leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted/70 hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-y-2 left-0 w-0.5 rounded-full bg-foreground transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                      aria-hidden="true"
                    />
                    <span className="w-5 shrink-0 tabular-nums">
                      {index + 1}.
                    </span>
                    <span>{section.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </CardContent>
    </Card>
  );
}
