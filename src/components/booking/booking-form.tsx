"use client";

import { useMemo } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InlineLink, Text } from "@/components/ui/typography";
import { routes } from "@/lib/routes";
import {
  bookingEvents,
  type BookingEventKey,
  type BookingSubmission,
} from "@/lib/booking/config";
import type { FieldDef, FieldValue } from "@/lib/booking/fields";
import { useBookingForm } from "@/components/booking/use-booking-form";
import { TextField } from "@/components/booking/fields/text-field";
import { ChipsField } from "@/components/booking/fields/chips-field";
import { RadioField } from "@/components/booking/fields/radio-field";

/** Pick the renderer for a field's kind. */
function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
}) {
  switch (field.kind) {
    case "chips":
      return <ChipsField field={field} value={value} onChange={onChange} />;
    case "radio":
      return (
        <RadioField field={field} value={value as string} onChange={onChange} />
      );
    default:
      return (
        <TextField field={field} value={value as string} onChange={onChange} />
      );
  }
}

/** Group consecutive `half` fields into pairs; everything else stands alone. */
function groupFields(fields: FieldDef[]): FieldDef[][] {
  const groups: FieldDef[][] = [];
  for (const field of fields) {
    const last = groups[groups.length - 1];
    if (field.half && last?.length === 1 && last[0].half) last.push(field);
    else groups.push([field]);
  }
  return groups;
}

type BookingFormProps = {
  event: BookingEventKey;
  slotLabel: string;
  /** Exact Cal.com ISO start instant. */
  slotStart: string;
  /** Selected duration in minutes (variable-length events). */
  duration?: number;
  initialSubject?: string;
  onBack: () => void;
  /** Hand the assembled submission to the parent, which submits optimistically. */
  onSubmit: (payload: BookingSubmission) => void;
};

/**
 * Schema-driven booking form: renders the event's declared fields, validates
 * live against the same schema the server re-checks, and emits a
 * `BookingSubmission`. One component serves every event.
 */
export function BookingForm({
  event,
  slotLabel,
  slotStart,
  duration,
  initialSubject,
  onBack,
  onSubmit,
}: BookingFormProps) {
  const config = bookingEvents[event];
  const {
    values,
    setValue,
    honeypot,
    setHoneypot,
    missing,
    canSubmit,
    buildSubmission,
  } = useBookingForm(event, initialSubject);

  const groups = useMemo(() => groupFields(config.fields), [config.fields]);

  function handleSubmit(formEvent: React.FormEvent) {
    formEvent.preventDefault();
    if (!canSubmit) return;
    onSubmit(buildSubmission(slotStart, duration));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot: off-screen, invisible to humans; bots auto-fill it and the booking is dropped server-side. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-2500 top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Firma (bitte leer lassen)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(formEvent) => setHoneypot(formEvent.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Zurück zur Terminwahl"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
        <div className="min-w-0">
          <Text className="font-semibold text-ink">Deine Daten</Text>
          <span className="mt-0.5 flex items-center gap-1.5 text-small text-ink-soft">
            <Calendar className="size-3.5 shrink-0 text-coral" aria-hidden />
            {slotLabel}
          </span>
        </div>
      </div>

      {groups.map((group) =>
        group.length === 2 ? (
          <div key={group[0].key} className="grid gap-4 sm:grid-cols-2">
            {group.map((field) => (
              <FieldControl
                key={field.key}
                field={field}
                value={values[field.key]}
                onChange={(value) => setValue(field.key, value)}
              />
            ))}
          </div>
        ) : (
          <FieldControl
            key={group[0].key}
            field={group[0]}
            value={values[group[0].key]}
            onChange={(value) => setValue(group[0].key, value)}
          />
        ),
      )}

      <Button type="submit" disabled={!canSubmit} className="mt-1">
        {config.submitLabel} <ArrowRight className="size-4" />
      </Button>
      <Text tone="muted" className="text-center text-sm">
        Mit Absenden der Anfrage werden deine Angaben zur Terminbuchung an
        Cal.com übermittelt. Details findest du in der{" "}
        <InlineLink href={routes.datenschutz}>Datenschutzerklärung</InlineLink>.
      </Text>
      {canSubmit ? (
        config.formNote ? (
          <Text size="caption" tone="muted" className="text-center">
            {config.formNote}
          </Text>
        ) : null
      ) : (
        <p
          aria-live="polite"
          className="text-center text-caption text-ink-soft"
        >
          Noch offen:{" "}
          <span className="font-semibold text-ink">{missing.join(" - ")}</span>
        </p>
      )}
    </form>
  );
}
