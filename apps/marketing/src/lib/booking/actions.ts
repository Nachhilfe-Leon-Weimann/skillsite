"use server";

import { headers } from "next/headers";
import { updateTag } from "next/cache";

import {
  ANTI_SPAM,
  bookingEvents,
  CAL_SLOTS_TAG,
  startsWithinWithdrawalPeriod,
  type BookingSubmission,
  type SubmitResult,
} from "@/lib/booking/config";
import { checkRateLimit } from "@/lib/booking/rate-limit";
import { validateBookingValues } from "@/lib/booking/validation";
import { buildCalBookingBody } from "@/lib/booking/mapping";
import { createCalBooking } from "@/lib/booking/cal/client";

/**
 * Real client IP behind Traefik (Dokploy). Traefik sets `x-forwarded-for` and
 * strips client-spoofed values as long as the app is only reachable via Traefik;
 * the first entry is the original client.
 */
async function clientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headerList.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Create a booking in Cal.com from a validated submission. Public endpoint, so
 * it re-runs the full schema validation and only forwards whitelisted values.
 * Thin orchestration: rate-limit -> anti-spam -> validate -> map -> Cal client.
 */
export async function requestBooking(
  submission: BookingSubmission,
): Promise<SubmitResult> {
  // Layer 1 - per-IP rate limit (counts every attempt, including ones dropped below).
  const ip = await clientIp();
  if (!checkRateLimit(ip).ok) {
    return {
      ok: false,
      reason: "rate_limited",
      error:
        "Zu viele Anfragen in kurzer Zeit. Bitte versuch es später erneut oder schreib mir direkt.",
    };
  }

  // Layer 2 - honeypot: a human never touches this hidden field, so any value
  // is a bot. Feign success so the bot gets no signal.
  if (submission.honeypot && submission.honeypot.length > 0) {
    return { ok: true };
  }

  // Layer 3 - time-trap: humans don't fill the form faster than minFillMs; a
  // missing timestamp counts as suspicious. Feign success too.
  if (
    !submission.formLoadedAt ||
    Date.now() - submission.formLoadedAt < ANTI_SPAM.minFillMs
  ) {
    return { ok: true };
  }

  if (!(submission.event in bookingEvents) || !submission.slot) {
    return {
      ok: false,
      error: "Bitte wähle einen Termin.",
      reason: "validation",
    };
  }

  const missing = validateBookingValues(submission.event, submission.values);
  if (missing.length > 0) {
    return {
      ok: false,
      error: `Bitte überprüfe deine Eingaben: ${missing.join(", ")}.`,
      reason: "validation",
    };
  }

  if (
    submission.event === "nachhilfe" &&
    !submission.agreements?.termsAccepted
  ) {
    return {
      ok: false,
      error: "Bitte bestätige die AGB.",
      reason: "validation",
    };
  }

  if (
    submission.event === "nachhilfe" &&
    startsWithinWithdrawalPeriod(submission.slot) &&
    !submission.agreements?.earlyPerformanceRequested
  ) {
    return {
      ok: false,
      error: "Bitte bestätige den Hinweis zum Widerrufsrecht.",
      reason: "validation",
    };
  }

  const result = await createCalBooking(buildCalBookingBody(submission));

  // A booked or gone slot both change availability, so drop the cached view in
  // either case. A generic failure leaves the slot intact - keep the cache.
  if (result.ok) {
    updateTag(CAL_SLOTS_TAG);
    return { ok: true };
  }
  if (result.slotTaken) {
    updateTag(CAL_SLOTS_TAG);
    return {
      ok: false,
      reason: "slot_taken",
      error:
        "Dieser Termin wurde gerade vergeben. Bitte wähle einen anderen Zeitpunkt.",
    };
  }
  return {
    ok: false,
    reason: "generic",
    error:
      "Die Buchung hat nicht geklappt. Bitte versuch es erneut oder schreib mir direkt.",
  };
}
