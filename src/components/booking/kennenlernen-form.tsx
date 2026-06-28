"use client";

import { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { FirstMeetingRequest } from "@/lib/booking/config";
import { EMAIL_RE, FIELD_LIMITS, PHONE_RE } from "@/lib/booking/validation";
import { subjects } from "@/content/subjects";

const subjectChoices = subjects.map(({ name, glyph }) => ({ name, glyph }));

type KennenlernenFormProps = {
  slotLabel: string;
  /** Exact Cal.com ISO start instant. */
  slotStart: string;
  initialSubject?: string;
  onBack: () => void;
  /** Hand the validated request to the parent, which submits optimistically. */
  onSubmit: (payload: FirstMeetingRequest) => void;
};

export function KennenlernenForm({
  slotLabel,
  slotStart,
  initialSubject,
  onBack,
  onSubmit,
}: KennenlernenFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>(() =>
    initialSubject &&
    subjectChoices.some((subject) => subject.name === initialSubject)
      ? [initialSubject]
      : [],
  );
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  // Form mount time (lazy initializer runs once); the server time-trap checks the elapsed time.
  const [formLoadedAt] = useState(() => Date.now());

  const toggleSubject = (name: string) =>
    setSelected((current) =>
      current.includes(name)
        ? current.filter((entry) => entry !== name)
        : [...current, name],
    );

  // Single source of truth for both the submit gate and the "still open" hint.
  const missing = [
    !firstName.trim() && "Vorname",
    !lastName.trim() && "Nachname",
    !EMAIL_RE.test(email.trim()) && "E-Mail",
    !PHONE_RE.test(phone.trim()) && "Telefon",
    selected.length === 0 && "Fach",
  ].filter((label): label is string => Boolean(label));

  const canSubmit = missing.length === 0;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      firstName,
      lastName,
      email,
      phone,
      subjects: selected,
      note: note.trim() || undefined,
      slot: slotStart,
      honeypot,
      formLoadedAt,
    });
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
          onChange={(event) => setHoneypot(event.target.value)}
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

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Vorname" htmlFor="firstName">
          <Input
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Max"
            autoComplete="given-name"
            maxLength={FIELD_LIMITS.name}
          />
        </Field>
        <Field label="Nachname" htmlFor="lastName">
          <Input
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Mustermann"
            autoComplete="family-name"
            maxLength={FIELD_LIMITS.name}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="E-Mail" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="du@beispiel.de"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
          />
        </Field>
        <Field label="Telefon" htmlFor="phone">
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+49 ..."
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
          />
        </Field>
      </div>

      <div>
        <p className="mb-1.5 text-small font-semibold text-ink">
          Fach / Fächer
        </p>
        <div className="flex flex-wrap gap-2">
          {subjectChoices.map(({ name, glyph }) => {
            const active = selected.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleSubject(name)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-small font-semibold transition-colors",
                  active
                    ? "border-coral bg-coral text-white"
                    : "border-line bg-bg text-ink hover:border-coral",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "text-[0.95em]",
                    active ? "text-white/75" : "text-coral",
                  )}
                >
                  {glyph}
                </span>
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <Field label="Worum geht's?" htmlFor="note" hint="(optional)">
        <Textarea
          id="note"
          rows={2}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Klassenstufe, Thema, Ziel ..."
          maxLength={FIELD_LIMITS.note}
        />
      </Field>

      <Button type="submit" disabled={!canSubmit} className="mt-1">
        Erstgespräch anfragen →
      </Button>
      {canSubmit ? (
        <Text size="caption" tone="muted" className="text-center">
          Unverbindlich &amp; kostenlos. Ich rufe dich zum gewählten Termin an.
        </Text>
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
