"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/use-in-view";

type Segment = { t: string; c?: string };

// Mirrors the original static block (same text, same colours); each line now
// types in one after another once the block scrolls into view.
const LINES: Segment[][] = [
  [{ t: "// das Prinzip zuerst", c: "text-on-navy-muted" }],
  [
    { t: "function ", c: "text-coral-light" },
    { t: "verstehen", c: "text-accent-blue" },
    { t: "(stoff) {" },
  ],
  [
    { t: "if", c: "text-coral-light" },
    { t: " (stoff.klickt) " },
    { t: "return ", c: "text-coral-light" },
    { t: "'kann ich selbst'", c: "text-[#8FD49B]" },
    { t: ";" },
  ],
  [
    { t: "return ", c: "text-coral-light" },
    { t: "nochmal", c: "text-accent-blue" },
    { t: "(stoff, anderswie);" },
  ],
  [{ t: "}" }],
];

const INDENT = [false, false, true, true, false];

export function CodeMockup() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-shown={inView || undefined}
      style={{ "--code-line-count": LINES.length } as CSSProperties}
      className="rounded-2xl bg-navy p-6 font-mono text-[0.86rem] leading-[1.7] text-on-navy shadow-card"
    >
      {LINES.map((segments, i) => (
        <div
          key={i}
          className={cn("code-line", INDENT[i] && "ml-4")}
          style={{ "--reveal-index": i } as CSSProperties}
        >
          {segments.map((segment, j) => (
            <span key={j} className={segment.c}>
              {segment.t}
            </span>
          ))}
          {i === LINES.length - 1 && (
            <span
              aria-hidden
              className="code-cursor ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.12em] rounded-[1px] bg-coral"
            />
          )}
        </div>
      ))}
    </div>
  );
}
