import { subjects } from "@/content/subjects";
import type { FieldDef, FieldOption, FieldValue } from "@/lib/booking/fields";

export const BOOKING_TIMEZONE = "Europe/Berlin";

/** Cache tag for the Cal.com slots fetch - revalidated after every booking. */
export const CAL_SLOTS_TAG = "cal-slots";

export const calUsername = "nachhilfe-leonweimann";

export type BookingEventKey = "kennenlernen" | "nachhilfe";
export type BookingDuration = 45 | 60 | 90;

/** Upper bounds so oversized input never reaches Cal.com. */
export const FIELD_LIMITS = {
  name: 80,
  email: 254,
  phone: 32,
  note: 1000,
} as const;

/** Anti-spam thresholds for the public booking. Tune here only. */
export const ANTI_SPAM = {
  /** Min ms between form mount and submit (time-trap). */
  minFillMs: 3_000,
  /** Rate-limit windows per client IP. */
  rateLimit: {
    short: { max: 4, windowMs: 10 * 60 * 1_000 },
    daily: { max: 15, windowMs: 24 * 60 * 60 * 1_000 },
  },
} as const;

/** Subject choices, derived from the offered subjects so they stay in sync. */
const subjectOptions: FieldOption[] = subjects.map((subject) => ({
  value: subject.name,
  label: subject.name,
  icon: subject.glyph,
}));

export type BookingEventConfig = {
  calEventSlug: string;
  /** Selectable tutoring durations; `null` means a fixed-length event. */
  durations: BookingDuration[] | null;
  /** Minutes - the fixed length or the default selected duration. */
  defaultDuration: number;
  /** How the session happens. */
  medium: "phone" | "online";
  mediumLabel: string;
  /** € per hour, scaled linearly by the selected duration; null when free. */
  pricePerHour: number | null;
  /** Price shown in the booking sidebar. */
  priceLabel: string;
  /** Submit-button label for this event's form. */
  submitLabel: string;
  /** Reassurance line shown under the button once the form is complete. */
  formNote?: string;
  /** Schema-driven form fields; render, validation and Cal mapping read these. */
  fields: FieldDef[];
  /**
   * Constant booking-field responses Cal.com requires but we don't ask for
   * (e.g. a mandatory policy confirmation). Merged into the request verbatim.
   */
  calExtraResponses?: Record<string, unknown>;
};

/** Name + e-mail are shared by every event. */
const nameFields: FieldDef[] = [
  {
    key: "firstName",
    kind: "text",
    label: "Vorname",
    placeholder: "Max",
    half: true,
    autoComplete: "given-name",
    maxLength: FIELD_LIMITS.name,
    required: true,
    target: { to: "attendeeName", part: "first" },
  },
  {
    key: "lastName",
    kind: "text",
    label: "Nachname",
    placeholder: "Mustermann",
    half: true,
    autoComplete: "family-name",
    maxLength: FIELD_LIMITS.name,
    required: true,
    target: { to: "attendeeName", part: "last" },
  },
];

// `half` so it pairs with a neighbouring half field (e.g. phone in the
// first-meeting form); standing alone it simply renders full-width.
const emailField: FieldDef = {
  key: "email",
  kind: "email",
  label: "E-Mail",
  placeholder: "du@beispiel.de",
  half: true,
  autoComplete: "email",
  maxLength: FIELD_LIMITS.email,
  required: true,
  format: "email",
  target: { to: "attendee", field: "email" },
};

const noteField = (label: string): FieldDef => ({
  key: "note",
  kind: "textarea",
  label,
  hint: "(optional)",
  placeholder: "Klassenstufe, Thema, Ziel ...",
  maxLength: FIELD_LIMITS.note,
  target: { to: "bookingField", slug: "notes" },
});

export const bookingEvents: Record<BookingEventKey, BookingEventConfig> = {
  kennenlernen: {
    calEventSlug: "kennenlernen",
    durations: null,
    defaultDuration: 15,
    medium: "phone",
    mediumLabel: "Telefonisches Erstgespräch",
    pricePerHour: null,
    priceLabel: "Komplett kostenlos und unverbindlich",
    submitLabel: "Erstgespräch anfragen",
    formNote:
      "Unverbindlich & kostenlos. Ich rufe dich zum gewählten Termin an.",
    fields: [
      ...nameFields,
      emailField,
      {
        key: "phone",
        kind: "tel",
        label: "Telefon",
        placeholder: "+49 ...",
        half: true,
        autoComplete: "tel",
        maxLength: FIELD_LIMITS.phone,
        required: true,
        format: "phone",
        target: { to: "attendee", field: "phoneNumber" },
      },
      {
        key: "subjects",
        kind: "chips",
        label: "Fach / Fächer",
        multiple: true,
        required: true,
        options: subjectOptions,
        target: { to: "bookingField", slug: "subjects" },
      },
      noteField("Worum geht's?"),
    ],
  },
  nachhilfe: {
    calEventSlug: "nachhilfe-online",
    durations: [45, 60, 90],
    defaultDuration: 60,
    medium: "online",
    mediumLabel: "Online via Discord oder MS Teams",
    pricePerHour: 30,
    priceLabel: "30 € pro Stunde",
    submitLabel: "Termin buchen",
    formNote:
      "Online via Discord oder MS Teams. Bis 24 h vorher kostenfrei stornierbar.",
    // Cal marks "policies-accepted" required; we don't surface the checkbox in
    // v1, so we confirm it on the user's behalf to let the booking go through.
    calExtraResponses: { "policies-accepted": true },
    fields: [
      ...nameFields,
      emailField,
      {
        key: "location",
        kind: "radio",
        label: "Ort",
        required: true,
        options: [
          { value: "office365-video", label: "MS Teams" },
          { value: "discord-video", label: "Discord" },
        ],
        target: { to: "location" },
      },
      {
        key: "subject",
        kind: "chips",
        label: "Bei welchem Fach kann ich dir helfen?",
        shortLabel: "Fach",
        multiple: false,
        required: true,
        options: subjectOptions,
        target: { to: "bookingField", slug: "subject" },
      },
      noteField("Zusätzliche Notizen"),
    ],
  },
};

/** A single bookable slot - `time` for display (Berlin "HH:mm"), `start` the ISO instant. */
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
 * - `unconfigured`: no Cal credentials - nothing is served (and it's logged).
 * - `error`: Cal.com could not be reached / answered badly.
 */
export type AvailabilityStatus = "ok" | "unconfigured" | "error";

export type AvailabilityResponse = {
  status: AvailabilityStatus;
  timeZone: string;
  days: DayAvailability[];
};

/** A validated booking request handed from the form to the server action. */
export type BookingSubmission = {
  event: BookingEventKey;
  /** Selected slot - the exact Cal.com ISO start instant. */
  slot: string;
  /** Selected duration in minutes (variable-length events only). */
  duration?: number;
  /** Field values keyed by `FieldDef.key`. */
  values: Record<string, FieldValue>;
  /** Anti-spam honeypot - bots fill it, humans never see it. */
  honeypot?: string;
  /** Anti-spam: client ms timestamp at form mount (time-trap). */
  formLoadedAt?: number;
};

export type SubmitFailureReason =
  | "validation"
  | "slot_taken"
  | "rate_limited"
  | "generic";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; reason: SubmitFailureReason };
