import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_PROPERTY_SEED,
  formatPropertyReport,
  runPropertySuite,
} from "./property/calendar-property-harness.js";

test("deterministic calendar conversion and input property smoke", { timeout: 30_000 }, async (t) => {
  const report = await runPropertySuite({
    seed: process.env.PASTAFARI_PROPERTY_SEED || DEFAULT_PROPERTY_SEED,
    mode: "smoke",
    cases: process.env.PASTAFARI_PROPERTY_CASES ? Number(process.env.PASTAFARI_PROPERTY_CASES) : undefined,
  });
  t.diagnostic(formatPropertyReport(report));
  assert.equal(report.totals.failed, 0);
});
