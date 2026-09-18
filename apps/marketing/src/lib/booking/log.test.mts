import assert from "node:assert/strict";
import test from "node:test";

import { describeAttempt, logBooking, maskEmail } from "./log.ts";

test("e-mail addresses are masked down to a recognisable hint", () => {
  assert.equal(maskEmail("test.kunde@example.com"), "te***@example.com");
  assert.equal(maskEmail("  a@example.com "), "a***@example.com");
  assert.equal(maskEmail("not-an-email"), undefined);
  assert.equal(maskEmail(""), undefined);
  assert.equal(maskEmail(["a@example.com"]), undefined);
  assert.equal(maskEmail(undefined), undefined);
});

test("an attempt is described without names, phone numbers or notes", () => {
  const context = describeAttempt({
    event: "kennenlernen",
    slot: "2026-10-07T14:00:00.000Z",
    duration: 60,
    values: {
      firstName: "Test",
      lastName: "Kunde",
      email: "test.kunde@example.com",
      phone: "+49 170 0000000",
      note: "private note",
    },
    honeypot: "",
    fillDurationMs: 30_000,
  });

  assert.deepEqual(context, {
    event: "kennenlernen",
    slot: "2026-10-07T14:00:00.000Z",
    duration: 60,
    attendee: "te***@example.com",
    fillDurationMs: 30_000,
  });
});

test("a filled honeypot is logged, bounded, as evidence", () => {
  assert.deepEqual(describeAttempt({ honeypot: "Muster GmbH" }), {
    honeypot: "Muster GmbH",
  });
  assert.deepEqual(describeAttempt({ honeypot: "x".repeat(500) }), {
    honeypot: "x".repeat(64),
  });
  assert.deepEqual(describeAttempt({ honeypot: 42 }), {});
});

test("describing a malformed attempt never throws", () => {
  assert.deepEqual(describeAttempt(null), {});
  assert.deepEqual(describeAttempt("nope"), {});
  assert.deepEqual(describeAttempt({ event: 5, slot: {}, values: "x" }), {});
  assert.deepEqual(describeAttempt({ event: "e".repeat(500) }), {
    event: "e".repeat(64),
  });
});

test("every outcome is one greppable line at the matching level", (t) => {
  const info = t.mock.method(console, "info", () => {});
  const warn = t.mock.method(console, "warn", () => {});
  const error = t.mock.method(console, "error", () => {});

  logBooking("created", { calUid: "abc" });
  logBooking("blocked", { signal: "honeypot", honeypot: "line\nbreak" });
  logBooking("failed", {});

  assert.deepEqual(info.mock.calls[0]?.arguments, [
    '[booking] created {"calUid":"abc"}',
  ]);
  // Untrusted input stays on one line - no forged log entries.
  assert.deepEqual(warn.mock.calls[0]?.arguments, [
    '[booking] blocked {"signal":"honeypot","honeypot":"line\\nbreak"}',
  ]);
  assert.deepEqual(error.mock.calls[0]?.arguments, ["[booking] failed {}"]);
});
