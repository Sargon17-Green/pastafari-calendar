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

test("the published Chinese converter uses the source-locked deterministic shadow engine", () => {
  assert.equal(
    published.chineseToJdn(new published.ChineseDate(2026n, 7, 1, { leapMonth: false })),
    2_461_266n,
  );
  assert.equal(
    published.chineseToJdn(new published.ChineseDate(-41221n, 1, 22, { leapMonth: false })),
    -13_334_246n,
  );
  assert.equal(
    published.calendarDateToJdn(new published.ChineseDate(-41221n, 1, 22, { leapMonth: false })),
    -13_334_246n,
  );
});
