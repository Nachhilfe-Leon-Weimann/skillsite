import { routes } from "@/lib/routes";

export type LessonPricing = {
  amount: number;
  currency: string;
  durationMinutes: number;
  unit: string;
  href: string;
};

export const standardLessonPricing = {
  amount: 30,
  currency: "EUR",
  durationMinutes: 60,
  unit: "pro Stunde",
  href: routes.pricing,
} satisfies LessonPricing;

export function formatLessonAmount({
  amount,
  currency,
}: Pick<LessonPricing, "amount" | "currency">) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLessonDuration({
  durationMinutes,
}: Pick<LessonPricing, "durationMinutes">) {
  return `für ${durationMinutes} Minuten`;
}
