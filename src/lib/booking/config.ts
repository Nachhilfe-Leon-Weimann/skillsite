export const BOOKING_TIMEZONE = "Europe/Berlin";

/** Cache tag for the Cal.com slots fetch — revalidated after every booking. */
export const CAL_SLOTS_TAG = "cal-slots";

export type BookingEventKey = "kennenlernen" | "nachhilfe";
export type BookingDuration = 45 | 60 | 90;

export const calUsername = process.env.NEXT_PUBLIC_BOOKING_CAL_USERNAME || "";

export type BookingEventConfig = {
  calEventSlug: string;
  /** Selectable durations (Nachhilfe). `null` → fixed-length event (Kennenlernen). */
  durations: BookingDuration[] | null;
  /** Minutes — the fixed length or the default selected duration. */
  defaultDuration: number;
  /** Whether booking the slot requires a (future) account. */
  requiresAccount: boolean;
  /** How the session happens. */
  medium: "phone" | "online";
  mediumLabel: string;
  /** Price shown in the booking sidebar. */
  priceLabel: string;
};

export const bookingEvents: Record<BookingEventKey, BookingEventConfig> = {
  kennenlernen: {
    calEventSlug:
      process.env.NEXT_PUBLIC_BOOKING_EVENT_SLUG_KENNENLERNEN || "kennenlernen",
    durations: null,
    defaultDuration: 15,
    requiresAccount: false,
    medium: "phone",
    mediumLabel: "Telefonisches Erstgespräch",
    priceLabel: "Komplett kostenlos",
  },
  nachhilfe: {
    calEventSlug:
      process.env.NEXT_PUBLIC_BOOKING_EVENT_SLUG_TERMIN || "nachhilfe-online",
    durations: [45, 60, 90],
    defaultDuration: 60,
    requiresAccount: true,
    medium: "online",
    mediumLabel: "Online via Discord oder MS Teams",
    priceLabel: "30 € pro Stunde",
  },
};

/** A single bookable slot — `time` for display (Berlin "HH:mm"), `start` is the exact Cal.com ISO instant. */
export type BookingSlot = {
  time: string;
  start: string;
};

export type DayAvailability = {
  /** ISO date, "YYYY-MM-DD". */
  date: string;
  slots: BookingSlot[];
};

/**
 * - `ok`: Cal.com answered. `days` reflects exactly what is bookable (possibly empty).
 * - `unconfigured`: no Cal credentials — nothing is served (and it's logged).
 * - `error`: Cal.com could not be reached / answered badly.
 */
export type AvailabilityStatus = "ok" | "unconfigured" | "error";

export type AvailabilityResponse = {
  status: AvailabilityStatus;
  timeZone: string;
  days: DayAvailability[];
};

export type FirstMeetingRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  note?: string;
  /** Selected slot — the exact Cal.com ISO start instant. */
  slot: string;
};
