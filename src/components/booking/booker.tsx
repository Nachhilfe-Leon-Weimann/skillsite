"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeEuro,
  CalendarClock,
  CalendarX2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  Phone,
  Video,
} from "lucide-react";

import { Button, LinkButton } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { KennenlernenForm } from "@/components/booking/kennenlernen-form";
import { requestFirstMeeting } from "@/lib/booking/actions";
import {
  BOOKING_TIMEZONE,
  bookingEvents,
  type AvailabilityResponse,
  type AvailabilityStatus,
  type BookingEventKey,
  type BookingSlot,
  type FirstMeetingRequest,
} from "@/lib/booking/config";
import {
  bookingToday,
  daysInMonth,
  pad,
  shownMonth,
} from "@/lib/booking/dates";
import { routes } from "@/lib/routes";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const MAX_MONTH_OFFSET = 3;

/** 0 = Mon … 6 = Sun. */
const firstWeekdayIndex = (year: number, month: number) =>
  (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;

function dateLabel(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

type BookerProps = {
  event: BookingEventKey;
  title: string;
  subtitle: string;
};

type Step = "select" | "form" | "account" | "result";

/** Lifecycle of the background Cal.com booking shown on the result step. */
type BookingPhase = "pending" | "confirmed" | "failed";

export function Booker({ event, title, subtitle }: BookerProps) {
  const config = bookingEvents[event];

  const [duration, setDuration] = useState(config.defaultDuration);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
    start: string;
  } | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [step, setStep] = useState<Step>("select");
  const [bookingPhase, setBookingPhase] = useState<BookingPhase>("pending");
  const [bookingError, setBookingError] = useState<{
    message: string;
    slotTaken: boolean;
  } | null>(null);
  const [bookingPayload, setBookingPayload] =
    useState<FirstMeetingRequest | null>(null);
  // Auto-skip empty months only while searching (initial load / duration
  // change). Manual month navigation switches this off so going "back" into an
  // empty month doesn't bounce the user forward again.
  const autoAdvance = useRef(true);

  const shown = useMemo(() => shownMonth(monthOffset), [monthOffset]);

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams({
      event,
      duration: String(duration),
      year: String(shown.year),
      month: String(shown.month),
    });
    fetch(`/api/booking/availability?${query}`, { signal: controller.signal })
      .then((res) => {
        // A non-OK response (e.g. 400) isn't an AvailabilityResponse — treat it
        // as an error instead of letting a missing `status` read as "ok".
        if (!res.ok)
          throw new Error(`Availability request failed: ${res.status}`);
        return res.json();
      })
      .then((data: AvailabilityResponse) => {
        setAvailability(data);
        setLoading(false);
        if (data.status !== "ok") return;
        if (data.days.length > 0) {
          // Preselect the soonest free day so its times show right away.
          setSelectedDate(data.days[0].date);
        } else if (autoAdvance.current && monthOffset < MAX_MONTH_OFFSET) {
          // Empty month → hop forward to the next month with free slots, but
          // only while auto-searching, never in response to manual navigation.
          setMonthOffset((current) => Math.min(MAX_MONTH_OFFSET, current + 1));
          setLoading(true);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setAvailability({
          status: "error",
          timeZone: BOOKING_TIMEZONE,
          days: [],
        });
        setLoading(false);
      });
    return () => controller.abort();
  }, [event, duration, shown.year, shown.month, reloadKey, monthOffset]);

  const resetSelection = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const changeDuration = (next: number) => {
    if (next === duration) return;
    setDuration(next);
    setLoading(true);
    // Fresh search for the new duration — let it skip to the soonest free month.
    autoAdvance.current = true;
    resetSelection();
  };

  const changeMonth = (delta: number) => {
    // Explicit navigation: respect the chosen month, don't auto-skip past it.
    autoAdvance.current = false;
    setMonthOffset((current) =>
      Math.min(MAX_MONTH_OFFSET, Math.max(0, current + delta)),
    );
    setLoading(true);
    resetSelection();
  };

  const retry = () => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  };

  const pickSlot = (date: string, slot: BookingSlot) => {
    setSelectedSlot({ date, time: slot.time, start: slot.start });
    setStep(config.requiresAccount ? "account" : "form");
  };

  const backToSelect = () => {
    setSelectedSlot(null);
    setStep("select");
  };

  // Leave the result step and start a fresh selection. Reloads availability
  // because a booking just changed it: the confirmed slot is now gone, and a
  // slot-taken conflict means our cached view was stale. The effect preselects
  // the soonest free day once the new data lands.
  const chooseAnotherSlot = () => {
    setSelectedSlot(null);
    setSelectedDate(null);
    setBookingError(null);
    setBookingPayload(null);
    setStep("select");
    autoAdvance.current = true;
    retry();
  };

  // Send the booking to Cal.com. We moved off the slot picker but wait on the
  // real result before claiming success — Cal's create pipeline (mail, calendar
  // event, webhooks) takes a few seconds, and a slot can be gone by now, so we
  // never tell the user "sent" until Cal.com confirms it.
  const finalizeBooking = async (payload: FirstMeetingRequest) => {
    setBookingPhase("pending");
    try {
      const result = await requestFirstMeeting(payload);
      if (result.ok) {
        setBookingPhase("confirmed");
      } else {
        setBookingError({
          message: result.error,
          slotTaken: Boolean(result.slotTaken),
        });
        setBookingPhase("failed");
      }
    } catch {
      setBookingError({
        message:
          "Die Buchung hat nicht geklappt. Bitte versuch es erneut oder schreib mir direkt.",
        slotTaken: false,
      });
      setBookingPhase("failed");
    }
  };

  const submitBooking = (payload: FirstMeetingRequest) => {
    setBookingPayload(payload);
    setBookingError(null);
    setStep("result");
    void finalizeBooking(payload);
  };

  const retryBooking = () => {
    if (!bookingPayload) return;
    setBookingError(null);
    void finalizeBooking(bookingPayload);
  };

  const status: AvailabilityStatus = availability?.status ?? "ok";
  const availableDates = new Set(
    (availability?.days ?? []).map((day) => day.date),
  );
  const daySlots =
    availability?.days.find((day) => day.date === selectedDate)?.slots ?? [];
  const summary = selectedSlot
    ? `${dateLabel(selectedSlot.date)} · ${selectedSlot.time} Uhr`
    : null;

  const durationLabel = config.durations
    ? `${duration} Minuten`
    : `${config.defaultDuration} Minuten`;
  const priceLabel = config.priceLabel;

  return (
    <div className="mx-auto @container overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
      <div className="grid @2xl:grid-cols-[20rem_1fr]">
        <aside className="flex flex-col bg-navy p-[clamp(1.5rem,3vw,2.25rem)] text-on-navy">
          <span className="inline-flex items-center gap-2.25 text-eyebrow uppercase text-accent-blue">
            <span className="size-1.75 rounded-full bg-coral" aria-hidden />
            Buchung
          </span>
          <Heading as="h2" size="h4" className="mt-3.5 text-white">
            {title}
          </Heading>
          <Text size="small" tone="on-navy-soft" className="mt-1 mb-5">
            {subtitle}
          </Text>

          <div className="flex flex-col gap-3">
            <InfoRow icon={<Clock className="size-4" aria-hidden />}>
              {durationLabel}
            </InfoRow>
            <InfoRow icon={<BadgeEuro className="size-4" aria-hidden />}>
              {priceLabel}
            </InfoRow>
            <InfoRow
              icon={
                config.medium === "phone" ? (
                  <Phone className="size-4" aria-hidden />
                ) : (
                  <Video className="size-4" aria-hidden />
                )
              }
            >
              {config.mediumLabel}
            </InfoRow>
          </div>

          {summary && step !== "result" ? (
            <div className="mt-6 rounded-2xl border border-white/12 bg-white/8 p-4">
              <p className="text-eyebrow uppercase text-accent-blue">
                Dein Termin
              </p>
              <p className="mt-1.5 font-heading font-bold text-white">
                {summary}
              </p>
            </div>
          ) : null}

          {event === "nachhilfe" ? (
            <Text
              size="caption"
              tone="inherit"
              className="mt-auto pt-6 text-on-navy-muted"
            >
              Bis 24&nbsp;h vorher kostenfrei verschieben oder absagen.
            </Text>
          ) : null}
        </aside>

        <AnimatedHeight className="flex min-h-96 flex-col p-[clamp(1.25rem,2.5vw,2rem)]">
          {step === "select" ? (
            <SelectStep
              config={config}
              duration={duration}
              onDuration={changeDuration}
              monthOffset={monthOffset}
              shown={shown}
              loading={loading}
              status={status}
              onRetry={retry}
              availableDates={availableDates}
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
              daySlots={daySlots}
              onPickSlot={pickSlot}
              onChangeMonth={changeMonth}
            />
          ) : null}

          {step === "form" && summary && selectedSlot ? (
            <div className="mx-auto w-full max-w-lg motion-safe:animate-[fade-up_0.28s_ease-out]">
              <KennenlernenForm
                slotLabel={summary}
                slotStart={selectedSlot.start}
                onBack={backToSelect}
                onSubmit={submitBooking}
              />
            </div>
          ) : null}

          {step === "account" ? (
            <CenteredState
              icon={<Lock className="size-7 text-coral" aria-hidden />}
              title="Fast geschafft"
            >
              <Text tone="muted" className="mb-1">
                Reguläre Nachhilfestunden buchst du über dein Konto.
              </Text>
              {summary ? (
                <Text className="mb-5">
                  Dein Wunschtermin:{" "}
                  <strong className="text-ink">{summary}</strong>
                </Text>
              ) : null}
              <div className="flex flex-wrap justify-center gap-3">
                <LinkButton href={routes.login} variant="primary">
                  Konto erstellen
                </LinkButton>
                <Button variant="outline" onClick={backToSelect}>
                  Anderen Termin wählen
                </Button>
              </div>
            </CenteredState>
          ) : null}

          {step === "result" ? (
            bookingPhase === "pending" ? (
              <CenteredState
                icon={
                  <span
                    className="size-6 animate-spin rounded-full border-2 border-coral border-t-transparent"
                    aria-hidden
                  />
                }
                title="Anfrage wird gesendet …"
              >
                <Text tone="muted" aria-live="polite">
                  Einen Moment – ich bestätige deinen Termin.
                </Text>
              </CenteredState>
            ) : bookingPhase === "confirmed" ? (
              <CenteredState
                icon={<Check className="size-7 text-coral" aria-hidden />}
                title="Anfrage gesendet!"
              >
                {summary ? (
                  <div className="mx-auto mb-5 flex max-w-xs items-center gap-3 rounded-2xl border border-line bg-bg p-3.5 text-left">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--coral)_12%,transparent)] text-coral">
                      <Phone className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-eyebrow uppercase text-ink-soft">
                        Dein Termin
                      </p>
                      <p className="font-heading font-bold text-ink">
                        {summary}
                      </p>
                    </div>
                  </div>
                ) : null}
                <Text tone="muted" className="mb-6">
                  Ich melde mich telefonisch zum Termin und bestätige vorab kurz
                  per Mail.
                </Text>
                {event === "nachhilfe" ? (
                  <Button variant="outline" onClick={chooseAnotherSlot}>
                    Weiteren Termin anfragen
                  </Button>
                ) : null}
              </CenteredState>
            ) : (
              <CenteredState
                icon={<CalendarX2 className="size-7 text-coral" aria-hidden />}
                title={
                  bookingError?.slotTaken
                    ? "Termin schon vergeben"
                    : "Das hat nicht ganz geklappt"
                }
              >
                <Text tone="muted" className="mb-5">
                  {bookingError?.message ??
                    "Die Buchung hat nicht geklappt. Bitte versuch es erneut oder schreib mir direkt."}
                </Text>
                <div className="flex flex-wrap justify-center gap-3">
                  {bookingError?.slotTaken ? (
                    <Button onClick={chooseAnotherSlot}>
                      Anderen Termin wählen
                    </Button>
                  ) : (
                    <>
                      <Button onClick={retryBooking}>Erneut senden</Button>
                      <Button variant="outline" onClick={chooseAnotherSlot}>
                        Anderen Termin wählen
                      </Button>
                    </>
                  )}
                </div>
              </CenteredState>
            )
          ) : null}
        </AnimatedHeight>
      </div>
    </div>
  );
}

function AnimatedHeight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // No mount-in animation needed: the first measured height equals the current
  // auto height, so that initial set transitions from the same value (no-op).
  return (
    <div
      style={{ height }}
      className="overflow-hidden motion-safe:transition-[height] motion-safe:duration-300 motion-safe:ease-out"
    >
      <div ref={innerRef} className={className}>
        {children}
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-on-navy">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-accent-blue">
        {icon}
      </span>
      <Text as="span" size="small" tone="inherit">
        {children}
      </Text>
    </div>
  );
}

function CenteredState({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto max-w-sm text-center motion-safe:animate-[fade-up_0.28s_ease-out]">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--coral)_16%,transparent)]">
        {icon}
      </div>
      <Heading as="h3" size="h4" className="mb-2">
        {title}
      </Heading>
      {children}
    </div>
  );
}

function UnavailableNotice({
  status,
  onRetry,
}: {
  status: "unconfigured" | "error";
  onRetry: () => void;
}) {
  if (status === "error") {
    return (
      <CenteredState
        icon={<CalendarX2 className="size-7 text-coral" aria-hidden />}
        title="Verfügbarkeit nicht geladen"
      >
        <Text tone="muted" className="mb-5">
          Das hat gerade nicht geklappt. Bitte versuch es noch einmal.
        </Text>
        <Button variant="outline" onClick={onRetry}>
          Erneut versuchen
        </Button>
      </CenteredState>
    );
  }

  return (
    <CenteredState
      icon={<CalendarClock className="size-7 text-coral" aria-hidden />}
      title="Online-Terminwahl gerade nicht verfügbar"
    >
      <Text tone="muted" className="mb-5">
        Schreib mir einfach direkt – wir finden zusammen einen passenden Termin.
      </Text>
      <LinkButton href={routes.contact} variant="primary">
        Direkt anfragen
      </LinkButton>
    </CenteredState>
  );
}

type SelectStepProps = {
  config: (typeof bookingEvents)[BookingEventKey];
  duration: number;
  onDuration: (value: number) => void;
  monthOffset: number;
  shown: { year: number; month: number };
  loading: boolean;
  status: AvailabilityStatus;
  onRetry: () => void;
  availableDates: Set<string>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  daySlots: BookingSlot[];
  onPickSlot: (date: string, slot: BookingSlot) => void;
  onChangeMonth: (delta: number) => void;
};

function SelectStep({
  config,
  duration,
  onDuration,
  monthOffset,
  shown,
  loading,
  status,
  onRetry,
  availableDates,
  selectedDate,
  onSelectDate,
  daySlots,
  onPickSlot,
  onChangeMonth,
}: SelectStepProps) {
  if (!loading && status !== "ok") {
    return <UnavailableNotice status={status} onRetry={onRetry} />;
  }

  const leading = firstWeekdayIndex(shown.year, shown.month);
  const total = daysInMonth(shown.year, shown.month);
  const todayStr = bookingToday();
  const noneThisMonth =
    !loading && status === "ok" && availableDates.size === 0;

  return (
    <div className="mx-auto flex w-full flex-1 flex-col justify-start motion-safe:animate-[fade-up_0.28s_ease-out]">
      {config.durations ? (
        <div className="mb-5">
          <p className="mb-2 text-small font-semibold text-ink">Dauer wählen</p>
          <div className="flex gap-2">
            {config.durations.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onDuration(value)}
                aria-pressed={value === duration}
                className={cn(
                  "flex-1 rounded-xl border px-3 py-2 text-small font-semibold transition-colors",
                  value === duration
                    ? "border-coral bg-coral text-white"
                    : "border-line bg-bg text-ink hover:border-coral",
                )}
              >
                {value} Min.
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-x-[clamp(1.25rem,2.5vw,2rem)] gap-y-5 @4xl:grid-cols-[3fr_1fr]">
        <div>
          {/* Month selection */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onChangeMonth(-1)}
              disabled={monthOffset === 0}
              aria-label="Vorheriger Monat"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <strong className="font-heading text-[1.05rem] text-ink">
              {MONTHS[shown.month - 1]} {shown.year}
            </strong>
            <button
              type="button"
              onClick={() => onChangeMonth(1)}
              disabled={monthOffset >= MAX_MONTH_OFFSET}
              aria-label="Nächster Monat"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>

          {/* Weekdays */}
          <div className="mb-2 grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-caption font-semibold text-ink-soft"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div
            key={`${shown.year}-${shown.month}`}
            className="grid grid-cols-7 gap-1.5 motion-safe:animate-[fade_0.25s_ease-out]"
            aria-busy={loading}
          >
            {Array.from({ length: leading }).map((_, index) => (
              <div key={`blank-${index}`} />
            ))}
            {Array.from({ length: total }).map((_, index) => {
              const day = index + 1;
              const date = `${shown.year}-${pad(shown.month)}-${pad(day)}`;
              const available = !loading && availableDates.has(date);
              const selected = selectedDate === date;
              const isToday = date === todayStr;

              return (
                <button
                  key={date}
                  type="button"
                  disabled={!available}
                  onClick={() => onSelectDate(date)}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-lg border text-small transition-colors",
                    selected && "border-coral bg-coral font-bold text-white",
                    !selected &&
                      available &&
                      "border-[color-mix(in_srgb,var(--coral)_45%,transparent)] bg-[color-mix(in_srgb,var(--coral)_11%,transparent)] font-semibold text-coral hover:bg-coral hover:text-white",
                    !available &&
                      "border-line bg-bg text-ink-soft/50 disabled:pointer-events-none",
                    loading && "animate-pulse",
                  )}
                >
                  {day}
                  {isToday ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full",
                        selected ? "bg-white" : "bg-coral",
                      )}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeslots */}
        <div className="flex min-h-0 flex-col">
          {selectedDate ? (
            <TimeSlots
              selectedDate={selectedDate}
              slots={daySlots}
              onPick={(slot) => onPickSlot(selectedDate, slot)}
            />
          ) : noneThisMonth ? (
            <Text size="small" tone="muted">
              In diesem Monat sind keine Termine frei. Schau im nächsten Monat
              nach.
            </Text>
          ) : (
            <Text size="small" tone="muted" className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-coral" aria-hidden />
              Wähle einen farbig markierten Tag, um freie Zeiten zu sehen.
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Free-time list for the selected day. Fills the full column height (matching
 * the calendar) and scrolls without a visible scrollbar — soft fades at the
 * top/bottom hint that there is more above/below instead of a hard mid-cut.
 */
function TimeSlots({
  selectedDate,
  slots,
  onPick,
}: {
  selectedDate: string;
  slots: BookingSlot[];
  onPick: (slot: BookingSlot) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setEdges({
      top: el.scrollTop > 4,
      bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 4,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [slots, update]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header rows mirror the calendar's month-nav + weekday rows so the
          slot list lines up with the day grid to the left. */}
      <div className="mb-4 flex h-9 items-center">
        <p className="text-small font-semibold text-ink">Freie Uhrzeiten</p>
      </div>
      <p className="mb-2 text-caption text-ink-soft">
        {dateLabel(selectedDate)}
      </p>
      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollRef}
          onScroll={update}
          className="no-scrollbar flex max-h-72 flex-col gap-2 overflow-y-auto @4xl:absolute @4xl:inset-0 @4xl:max-h-none"
        >
          {slots.map((slot) => (
            <button
              key={slot.start}
              type="button"
              onClick={() => onPick(slot)}
              className="w-full shrink-0 rounded-lg border border-coral px-3 py-2.5 text-center text-small font-semibold text-coral transition-colors hover:bg-coral hover:text-white"
            >
              {slot.time} Uhr
            </button>
          ))}
        </div>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-5 bg-linear-to-b from-surface to-transparent transition-opacity duration-200",
            edges.top ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 flex h-9 items-end justify-center bg-linear-to-t from-surface to-transparent transition-opacity duration-200",
            edges.bottom ? "opacity-100" : "opacity-0",
          )}
        >
          <ChevronDown className="size-4 text-coral" aria-hidden />
        </div>
      </div>
    </div>
  );
}
