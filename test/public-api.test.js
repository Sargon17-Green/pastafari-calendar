"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import * as monster from "../src/5efdcc3e6fb071cbaffdcb117507a169dd76.js";
import * as published from "pastafari-calendar";

test("the published calendar bypasses the monster default-today binding defect", () => {
  assert.throws(
    () => new monster.PastafariCalendar(),
    (error) => error instanceof ReferenceError && /localToday/.test(error.message),
  );
  assert.doesNotThrow(() => new published.PastafariCalendar());
});

test("the public bypass preserves an explicitly supplied todayProvider", () => {
  const sentinel = new Error("explicit today provider reached");
  const calendar = new published.PastafariCalendar({
    todayProvider: () => {
      throw sentinel;
    },
  });

  assert.throws(
    () => calendar.convert(new published.GregorianDate(2026n, 8, 6)),
    (error) => error === sentinel,
  );
});
