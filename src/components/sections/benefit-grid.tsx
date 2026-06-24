import { CheckMark } from "@/components/ui/check-mark";
import type { Benefit } from "@/content/home";

export function BenefitGrid({ items }: { items: Benefit[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((benefit) => (
        <div
          key={benefit.title}
          className="rounded-2xl border border-line bg-surface p-6 shadow-card"
        >
          <span className="mb-4 flex size-9.5 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--coral)_14%,transparent)] text-coral">
            <CheckMark />
          </span>
          <h3 className="mb-1.5 font-heading text-[1.12rem] font-bold text-ink">
            {benefit.title}
          </h3>
          <p className="text-[0.96rem] text-ink-soft">{benefit.text}</p>
        </div>
      ))}
    </div>
  );
}
