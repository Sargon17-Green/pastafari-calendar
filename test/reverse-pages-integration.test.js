"use strict";

import assert from "node:assert/strict";
import test from "node:test";

import {
  GregorianDate,
  PastafariCalendar,
  gregorianToJdn,
} from "../docs/engine/pastafari-calendar-fast.js";
import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import {
  ReverseSearchController,
  sameTargetReverseProblem,
  simpleReverseProblem,
} from "../docs/reverse-search-controller.js";

const calendar = new PastafariCalendar();
const BASE = gregorianToJdn(new GregorianDate(2026n, 8, 6));

function uiDate(targetJdn, calculationJdn) {
  const raw = calendar.convertJdn(targetJdn, { calculationJdn }).toJSON();
  const cutlet = CUTLETS.find(({ internalName }) => internalName === raw.cutletName);
  const month = MONTHS.find(({ internalName }) => internalName === raw.monthName);
  assert(cutlet, `missing cutlet id for ${raw.cutletName}`);
  assert(month, `missing month id for ${raw.monthName}`);
  return {
    year: raw.year,
    cutletId: cutlet.id,
    dayInCutlet: raw.dayInCutlet,
    monthId: month.id,
    dayInMonth: raw.dayInMonth,
  };
}

test("Pages controller solves a real single-date reverse query through the copied solver stack", async () => {
  const targetJdn = BASE + 3n;
  const controller = new ReverseSearchController();
  try {
    const { result } = await controller.solve(
      simpleReverseProblem(uiDate(targetJdn, BASE), BASE),
      { timeoutMs: 30_000 },
    );
    assert.equal(result.complete, true);
    assert.ok(result.solutions.some((solution) => solution.target.jdn === targetJdn));
  } finally {
    controller.dispose();
  }
});

test("Pages controller preserves the bounded c=t diagonal path", async () => {
  const targetJdn = BASE;
  const controller = new ReverseSearchController();
  try {
    const { result } = await controller.solve(
      sameTargetReverseProblem(uiDate(targetJdn, targetJdn), [targetJdn, targetJdn]),
      { timeoutMs: 30_000, yieldEvery: 1 },
    );
    assert.equal(result.complete, true);
    assert.deepEqual(result.solutions.map((solution) => solution.target.jdn), [targetJdn]);
  } finally {
    controller.dispose();
  }
});
