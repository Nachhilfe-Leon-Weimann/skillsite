import { bookingEvents, type BookingEventKey } from "@/lib/booking/config";
import {
  isFieldEmpty,
  isMultiValue,
  type FieldDef,
  type FieldValue,
} from "@/lib/booking/fields";

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

/** Whether a single field's value satisfies its declaration. */
function isFieldValid(field: FieldDef, value: FieldValue | undefined): boolean {
  if (isFieldEmpty(value)) return !field.required;

  if (
    field.maxLength &&
    typeof value === "string" &&
    value.length > field.maxLength
  ) {
    return false;
  }

  const text = isMultiValue(value) ? "" : value!.trim();
  if (field.format === "email" && !EMAIL_RE.test(text)) return false;
  if (field.format === "phone" && !PHONE_RE.test(text)) return false;

  // Choice fields: every selected value must be an offered option. This is the
  // server-side whitelist - arbitrary values never reach Cal.com.
  if (field.options) {
    const allowed = new Set(field.options.map((option) => option.value));
    const selected = isMultiValue(value) ? value : [value as string];
    if (!selected.every((entry) => allowed.has(entry))) return false;
  }

  return true;
}

/**
 * Validate a submission's values against the event schema. Returns the labels of
 * the fields that are missing or invalid - an empty array means valid. One
 * source of truth: the client uses it live (submit gate + "still open" hint) and
 * the server action re-runs it before forwarding anything to Cal.com.
 */
export function validateBookingValues(
  event: BookingEventKey,
  values: Record<string, FieldValue>,
): string[] {
  return bookingEvents[event].fields
    .filter((field) => !isFieldValid(field, values[field.key]))
    .map((field) => field.shortLabel ?? field.label);
}
