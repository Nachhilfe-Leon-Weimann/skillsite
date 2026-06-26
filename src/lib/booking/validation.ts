import { subjects } from "@/content/subjects";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Tolerant: optional leading +, then digits with common separators
// (space, (), /, -), requiring at least 6 actual digits.
export const PHONE_RE = /^\+?(?:[\s()/-]*\d){6,}[\s()/-]*$/;

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
