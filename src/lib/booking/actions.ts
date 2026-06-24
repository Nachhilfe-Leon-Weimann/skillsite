"use server";

import { updateTag } from "next/cache";

import {
  BOOKING_TIMEZONE,
  bookingEvents,
  calUsername,
  CAL_SLOTS_TAG,
  type FirstMeetingRequest,
} from "@/lib/booking/config";
import {
  EMAIL_RE,
  FIELD_LIMITS,
  PHONE_RE,
  VALID_SUBJECTS,
} from "@/lib/booking/validation";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; slotTaken?: boolean };

/**
 * Creates the free first-meeting booking in Cal.com (v2 bookings API) from the
 * selected slot. Requires `CAL_API_KEY`.
 */
export async function requestFirstMeeting(
  data: FirstMeetingRequest,
): Promise<SubmitResult> {
  const firstName = data.firstName?.trim();
  const lastName = data.lastName?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.trim();

  if (!firstName || !lastName || !email || !phone || !data.slot) {
    return {
      ok: false,
      error: "Bitte fülle Name, E-Mail, Telefon und Termin aus.",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Bitte gib eine gültige E-Mail-Adresse an." };
  }
  if (!PHONE_RE.test(phone)) {
    return { ok: false, error: "Bitte gib eine gültige Telefonnummer an." };
  }
  // The action is public, so the server validates as strictly as the form and
  // never forwards arbitrary input to Cal.com: only subjects we actually offer
  // pass, and oversized fields are rejected outright.
  const subjects = (data.subjects ?? []).filter((subject) =>
    VALID_SUBJECTS.has(subject),
  );
  if (subjects.length === 0) {
    return { ok: false, error: "Bitte wähle mindestens ein Fach." };
  }
  if (
    firstName.length > FIELD_LIMITS.name ||
    lastName.length > FIELD_LIMITS.name ||
    email.length > FIELD_LIMITS.email ||
    phone.length > FIELD_LIMITS.phone
  ) {
    return { ok: false, error: "Bitte überprüfe deine Eingaben." };
  }

  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey || !calUsername) {
    console.error(
      "[booking] Cal.com is not configured — first-meeting request could not be created.",
    );
    return {
      ok: false,
      error: "Buchung ist gerade nicht möglich. Bitte schreib mir direkt.",
    };
  }

  // The Cal.com "kennenlernen" event still has a required free-text "notes"
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
        slotTaken,
        error: slotTaken
          ? "Dieser Termin wurde gerade vergeben. Bitte wähle einen anderen Zeitpunkt."
          : "Die Buchung hat nicht geklappt. Bitte versuch es erneut oder schreib mir direkt.",
      };
    }

    // Slot is now booked — invalidate the cached availability so the next lookup
    // no longer offers it.
    updateTag(CAL_SLOTS_TAG);
    return { ok: true };
  } catch (error) {
    console.error("[booking] Cal.com booking request errored", error);
    return {
      ok: false,
      error: "Die Buchung hat nicht geklappt. Bitte versuch es später erneut.",
    };
  }
}
