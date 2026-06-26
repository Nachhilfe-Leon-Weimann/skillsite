"use server";

import { headers } from "next/headers";
import { updateTag } from "next/cache";

import {
  BOOKING_TIMEZONE,
  bookingEvents,
  calUsername,
  CAL_SLOTS_TAG,
  type FirstMeetingRequest,
  type SubmitResult,
} from "@/lib/booking/config";
import { checkRateLimit } from "@/lib/booking/rate-limit";
import {
  ANTI_SPAM,
  EMAIL_RE,
  FIELD_LIMITS,
  PHONE_RE,
  VALID_SUBJECTS,
} from "@/lib/booking/validation";

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
 * Creates the free first-meeting booking in Cal.com (v2 bookings API) from the
 * selected slot. Requires `CAL_API_KEY`.
 */
export async function requestFirstMeeting(
  data: FirstMeetingRequest,
): Promise<SubmitResult> {
  // Layer 1 — per-IP rate limit (counts every attempt, including ones dropped below).
  const ip = await clientIp();
  if (!checkRateLimit(ip).ok) {
    return {
      ok: false,
      reason: "rate_limited",
      error:
        "Zu viele Anfragen in kurzer Zeit. Bitte versuch es später erneut oder schreib mir direkt.",
    };
  }

  // Layer 2 — honeypot: a human never touches this hidden field, so any value
  // (even whitespace) is a bot. Feign success so the bot gets no signal.
  if (data.honeypot && data.honeypot.length > 0) {
    return { ok: true };
  }

  // Layer 3 — time-trap: humans don't fill the form faster than minFillMs; a
  // missing timestamp counts as suspicious. Feign success too.
  if (
    !data.formLoadedAt ||
    Date.now() - data.formLoadedAt < ANTI_SPAM.minFillMs
  ) {
    return { ok: true };
  }

  const firstName = data.firstName?.trim();
  const lastName = data.lastName?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.trim();

  if (!firstName || !lastName || !email || !phone || !data.slot) {
    return {
      ok: false,
      error: "Bitte fülle Name, E-Mail, Telefon und Termin aus.",
      reason: "validation",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return {
      ok: false,
      error: "Bitte gib eine gültige E-Mail-Adresse an.",
      reason: "validation",
    };
  }
  if (!PHONE_RE.test(phone)) {
    return {
      ok: false,
      error: "Bitte gib eine gültige Telefonnummer an.",
      reason: "validation",
    };
  }
  // The action is public, so the server validates as strictly as the form and
  // never forwards arbitrary input to Cal.com: only subjects we actually offer
  // pass, and oversized fields are rejected outright.
  const subjects = (data.subjects ?? []).filter((subject) =>
    VALID_SUBJECTS.has(subject),
  );
  if (subjects.length === 0) {
    return {
      ok: false,
      error: "Bitte wähle mindestens ein Fach.",
      reason: "validation",
    };
  }
  if (
    firstName.length > FIELD_LIMITS.name ||
    lastName.length > FIELD_LIMITS.name ||
    email.length > FIELD_LIMITS.email ||
    phone.length > FIELD_LIMITS.phone
  ) {
    return {
      ok: false,
      error: "Bitte überprüfe deine Eingaben.",
      reason: "validation",
    };
  }

  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey || !calUsername) {
    console.error(
      "[booking] Cal.com is not configured — first-meeting request could not be created.",
    );
    return {
      ok: false,
      error: "Buchung ist gerade nicht möglich. Bitte schreib mir direkt.",
      reason: "generic",
    };
  }

  // The first-meeting Cal.com event still has a required free-text "notes"
  // field; keep it optional on our side and fall back to a neutral note.
  const note = data.note?.trim().slice(0, FIELD_LIMITS.note);

  try {
    const res = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: data.slot,
        eventTypeSlug: bookingEvents.kennenlernen.calEventSlug,
        username: calUsername,
        attendee: {
          name: `${firstName} ${lastName}`,
          email,
          phoneNumber: phone,
          timeZone: BOOKING_TIMEZONE,
          language: "de",
        },
        bookingFieldsResponses: {
          name: { firstName, lastName },
          subjects,
          notes: note || "Keine weiteren Angaben.",
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        `[booking] Cal.com booking failed: ${res.status} ${detail}`,
      );
      // Cal.com doesn't return a stable machine code for "slot already taken",
      // so detect that conflict defensively from the status + message. On a hit
      // we send the user back to pick a fresh slot instead of offering a retry
      // that would just hit the same gone slot again, and drop the now-stale
      // cached availability. A generic failure (network, 5xx) leaves the slot
      // intact, so keep the cache and let the user retry the same one.
      const slotTaken =
        res.status === 409 ||
        /no longer available|not available|already booked|fully booked|no available|seats[_ ]?full|slot.*(taken|unavailable)/i.test(
          detail,
        );
      if (slotTaken) updateTag(CAL_SLOTS_TAG);
      return {
        ok: false,
        reason: slotTaken ? "slot_taken" : "generic",
        error: slotTaken
          ? "Dieser Termin wurde gerade vergeben. Bitte wähle einen anderen Zeitpunkt."
          : "Die Buchung hat nicht geklappt. Bitte versuch es erneut oder schreib mir direkt.",
      };
    }

    // Slot is now booked - invalidate the cached availability so the next lookup
    // no longer offers it.
    updateTag(CAL_SLOTS_TAG);
    return { ok: true };
  } catch (error) {
    console.error("[booking] Cal.com booking request errored", error);
    return {
      ok: false,
      error: "Die Buchung hat nicht geklappt. Bitte versuch es später erneut.",
      reason: "generic",
    };
  }
}
