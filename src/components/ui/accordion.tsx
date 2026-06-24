"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

export type AccordionEntry = {
  question: string;
  answer: React.ReactNode;
};

/** Single-open accordion used for FAQ blocks. */
export function Accordion({
  items,
  className,
}: {
  items: AccordionEntry[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-line bg-surface shadow-card"
          >
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-heading text-[1.08rem] font-semibold text-ink"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-7.5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xl leading-none text-coral transition-transform duration-200",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-6 pb-6 leading-relaxed text-ink-soft"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
