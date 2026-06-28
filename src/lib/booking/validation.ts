import { subjects } from "@/content/subjects";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Tolerant: optional leading +, then digits with common separators
// (space, (), /, -), requiring at least 6 actual digits.
export const PHONE_RE = /^\+?(?:[\s()/-]*\d){6,}[\s()/-]*$/;

/**
 * Best-effort E.164 for Cal.com, which wants international numbers, not national
 * ones. Assumes German numbers: a leading `0` is the national trunk prefix and
 * becomes `+49`, `00` is the international prefix -> `+`, and a number already in
 * `+...` form is kept as-is.
 */
export function toE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (raw.trim().startsWith("+")) return `+${digits}`;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  if (digits.startsWith("0")) return `+49${digits.slice(1)}`;
  return `+49${digits}`;
}

/** The subjects we actually offer, the booking action only forwards these. */
export const VALID_SUBJECTS: ReadonlySet<string> = new Set(
  subjects.map((subject) => subject.name),
);

/** Upper bounds so oversized input never reaches Cal.com. */
export const FIELD_LIMITS = {
  name: 80,
  email: 254,
  phone: 32,
  note: 1000,
} as const;

/** Anti-spam thresholds for the public first-meeting booking. Tune here only. */
export const ANTI_SPAM = {
  /** Min ms between form mount and submit (time-trap). */
  minFillMs: 3_000,
  /** Rate-limit windows per client IP. */
  rateLimit: {
    short: { max: 4, windowMs: 10 * 60 * 1_000 },
    daily: { max: 15, windowMs: 24 * 60 * 60 * 1_000 },
  },
} as const;
