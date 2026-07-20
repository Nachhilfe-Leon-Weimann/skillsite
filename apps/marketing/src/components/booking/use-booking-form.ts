"use client";

import { useMemo, useState } from "react";

import {
  bookingEvents,
  type BookingEventKey,
  type BookingSubmission,
} from "@/lib/booking/config";
import { emptyValueFor, type FieldValue } from "@/lib/booking/fields";
import { validateBookingValues } from "@/lib/booking/validation";

/** Initial form state: empty per field, radios default to their first option. */
function initialValues(
  event: BookingEventKey,
  initialSubject?: string,
): Record<string, FieldValue> {
  const values: Record<string, FieldValue> = {};
  for (const field of bookingEvents[event].fields) {
    let value = emptyValueFor(field);
    if (field.kind === "radio" && field.options?.length) {
      value = field.options[0].value;
    }
    if (
      field.kind === "chips" &&
      initialSubject &&
      field.options?.some((option) => option.value === initialSubject)
    ) {
      value = field.multiple ? [initialSubject] : initialSubject;
    }
    values[field.key] = value;
  }
  return values;
}

/**
 * Form state for a schema-driven booking event: holds the field values plus the
 * anti-spam honeypot and mount timestamp, validates live against the event
 * schema, and assembles the `BookingSubmission` for the server action.
 */
export function useBookingForm(
  event: BookingEventKey,
  initialSubject?: string,
) {
  const [values, setValues] = useState(() =>
    initialValues(event, initialSubject),
  );
  const [honeypot, setHoneypot] = useState("");
  // Mount time (lazy initializer runs once); the server time-trap checks elapsed time.
  const [formLoadedAt] = useState(() => Date.now());

  const setValue = (key: string, value: FieldValue) =>
    setValues((current) => ({ ...current, [key]: value }));

  // Single source of truth for the submit gate and the "still open" hint.
  const missing = useMemo(
    () => validateBookingValues(event, values),
    [event, values],
  );

  const buildSubmission = (
    slot: string,
    duration?: number,
  ): BookingSubmission => ({
    event,
    slot,
    duration,
    values,
    honeypot,
    formLoadedAt,
  });

  return {
    values,
    setValue,
    honeypot,
    setHoneypot,
    missing,
    canSubmit: missing.length === 0,
    buildSubmission,
  };
}
