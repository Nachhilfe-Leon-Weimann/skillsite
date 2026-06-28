import {
  BOOKING_TIMEZONE,
  bookingEvents,
  calUsername,
  CAL_SLOTS_TAG,
  type AvailabilityResponse,
  type BookingEventKey,
  type DayAvailability,
} from "@/lib/booking/config";
import { bookingToday, daysInMonth, pad } from "@/lib/booking/dates";

/**
 * Fetch real availability from Cal.com. Returns the bookable days (possibly an
 * empty array - that simply means nothing is free) or `null` when Cal.com could
 * not be reached or answered badly.
 */
async function fetchCalSlots(
  event: BookingEventKey,
  year: number,
  month: number,
  durationMinutes: number,
): Promise<DayAvailability[] | null> {
  const apiKey = process.env.CAL_API_KEY as string;
  const config = bookingEvents[event];
  const today = bookingToday();
  const monthStart = `${year}-${pad(month)}-01`;
  const start = monthStart < today ? today : monthStart;
  const end = `${year}-${pad(month)}-${pad(daysInMonth(year, month))}`;

  const url = new URL("https://api.cal.com/v2/slots");
  url.searchParams.set("eventTypeSlug", config.calEventSlug);
  url.searchParams.set("username", calUsername);
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  url.searchParams.set("timeZone", BOOKING_TIMEZONE);
  if (config.durations)
    url.searchParams.set("duration", String(durationMinutes));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-09-04",
      },
      signal: controller.signal,
      next: { revalidate: 120, tags: [CAL_SLOTS_TAG] },
    });
    if (!res.ok) {
      console.error(`[booking] Cal.com slots request failed: ${res.status}`);
      return null;
    }

    const json = (await res.json()) as {
      data?: Record<string, Array<{ start?: string }>>;
    };
    if (!json.data) {
      console.error("[booking] Cal.com slots response had no `data` field");
      return null;
    }

    const formatter = new Intl.DateTimeFormat("de-DE", {
      timeZone: BOOKING_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return Object.entries(json.data)
      .map(([date, entries]) => ({
        date,
        slots: entries.flatMap((entry) =>
          entry.start
            ? [
                {
                  time: formatter.format(new Date(entry.start)),
                  start: entry.start,
                },
              ]
            : [],
        ),
      }))
      .filter((day) => day.slots.length)
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("[booking] Cal.com slots request timed out");
    } else {
      console.error("[booking] Cal.com slots request errored", error);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Month availability for a booking event. Only ever reports what Cal.com
 * actually offers - there is no synthetic fallback. When Cal.com is not
 * configured or unreachable, availability is reported as empty with a status the
 * UI surfaces, never as fabricated slots.
 */
export async function getAvailability(params: {
  event: BookingEventKey;
  year: number;
  month: number;
  durationMinutes: number;
}): Promise<AvailabilityResponse> {
  if (!process.env.CAL_API_KEY || !calUsername) {
    console.error(
      "[booking] Cal.com is not configured (CAL_API_KEY / NEXT_PUBLIC_BOOKING_CAL_USERNAME missing) - no availability served.",
    );
    return { status: "unconfigured", timeZone: BOOKING_TIMEZONE, days: [] };
  }

  const days = await fetchCalSlots(
    params.event,
    params.year,
    params.month,
    params.durationMinutes,
  );
  if (days === null) {
    return { status: "error", timeZone: BOOKING_TIMEZONE, days: [] };
  }

  return { status: "ok", timeZone: BOOKING_TIMEZONE, days };
}
