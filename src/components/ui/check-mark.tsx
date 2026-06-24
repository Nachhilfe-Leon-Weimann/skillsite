import { cn } from "@/lib/utils";

/** The design's hand-tuned check glyph. Colour comes from `currentColor`. */
export function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-4.75", className)}
    >
      <path
        d="M4 12.5l5 5L20 6.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
