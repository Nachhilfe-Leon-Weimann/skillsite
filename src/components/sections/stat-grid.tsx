import { cn } from "@/lib/utils";

type StatItem = { value: string; label: string };

type StatGridProps = {
  items: StatItem[];
  size?: "lg" | "sm";
  className?: string;
};

/** Hairline-separated stat band. Caller sets the column count via className. */
export function StatGrid({ items, size = "lg", className }: StatGridProps) {
  const lg = size === "lg";

  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden border border-line bg-line",
        lg ? "rounded-2xl" : "rounded-[18px]",
        className,
      )}
    >
      {items.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "bg-surface text-center",
            lg ? "px-5 py-7" : "px-3 py-4.5",
          )}
        >
          <div
            className={cn(
              "font-heading font-extrabold tracking-[-0.02em] text-ink",
              lg ? "text-[clamp(1.9rem,3.5vw,2.6rem)]" : "text-[1.5rem]",
            )}
          >
            {stat.value}
          </div>
          <div
            className={cn(
              "text-ink-soft",
              lg ? "mt-1 text-[0.92rem]" : "text-[0.78rem]",
            )}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
