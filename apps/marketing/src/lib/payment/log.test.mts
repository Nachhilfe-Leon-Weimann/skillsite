import assert from "node:assert/strict";
import test from "node:test";

import { describeLink, logPayment } from "./log.ts";

test("every outcome is one greppable line at the matching level", (t) => {
  const info = t.mock.method(console, "info", () => {});
  const warn = t.mock.method(console, "warn", () => {});

  logPayment("redirected", { invoice: "RE-1840", amount: "90.00" });
  logPayment("rejected", { reason: "amount", betrag: "90,00 USD" });

  assert.deepEqual(info.mock.calls[0]?.arguments, [
    '[payment] redirected {"invoice":"RE-1840","amount":"90.00"}',
  ]);
  assert.deepEqual(warn.mock.calls[0]?.arguments, [
    '[payment] rejected {"reason":"amount","betrag":"90,00 USD"}',
  ]);
});

test("a rejected link is logged verbatim so a broken template is fixable", () => {
  assert.deepEqual(describeLink({ re: "RE-1840", betrag: "90,00 USD" }), {
    re: "RE-1840",
    betrag: "90,00 USD",
  });
});

test("untrusted link input is bounded and cannot forge a log entry", (t) => {
  const warn = t.mock.method(console, "warn", () => {});

  logPayment(
    "rejected",
    describeLink({ re: "R".repeat(500), betrag: "1\n[payment] redirected {}" }),
  );

  assert.deepEqual(warn.mock.calls[0]?.arguments, [
    `[payment] rejected {"re":"${"R".repeat(64)}","betrag":"1\\n[payment] redirected {}"}`,
  ]);
});

test("describing a malformed link never throws and omits what it can't read", () => {
  assert.deepEqual(describeLink({}), {});
  assert.deepEqual(describeLink({ re: "RE-1840" }), { re: "RE-1840" });
  assert.deepEqual(describeLink({ re: ["RE-1840", "RE-1841"] }), {});
  assert.deepEqual(describeLink({ re: undefined, betrag: undefined }), {});
});
