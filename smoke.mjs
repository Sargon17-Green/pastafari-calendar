"use strict";

import assert from "node:assert/strict";
import { FIXED, canonical, digest } from "./lib.mjs";

const fast = await import("../browser/pastafari-calendar-fast.js");
const pagesWorker = await import("../docs/engine/pastafari-fast-worker.js");
const constraints = await import("../browser/pastafari-constraints.js");
const published = await import("pastafari-calendar");
const reverseSubpath = await import("pastafari-calendar/reverse");
const constraintsSubpath = await import("pastafari-calendar/constraints");

assert.equal(typeof published.PastafariCalendar, "function");
assert.equal(typeof reverseSubpath.findPastafariDate, "function");
assert.equal(typeof constraintsSubpath.solvePastafariConstraints, "function");

const calendar = new fast.PastafariCalendar({
  todayProvider: () => new fast.GregorianDate(2000n, 1, 1),
});
fast.clearFastCache();
const value = calendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn });
const first = canonical(value);
const again = canonical(calendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn }));
assert.deepStrictEqual(again, first);
assert.ok(fast.getFastCacheStats().hits >= 1);

const view = await pagesWorker.handlePastafariWorkerRequest("getCutletView", {
  targetJdn: FIXED.targetSame,
  calculationJdn: FIXED.calculationJdn,
});
assert.ok(Array.isArray(view.days) && view.days.length > 0);
assert.equal(view.days[view.selectedIndex].jdn, FIXED.targetSame);

const reverse = await fast.findPastafariDate(first, { calculationJdn: FIXED.calculationJdn });
assert.ok(reverse.some((candidate) => candidate.targetJdn === FIXED.targetSame));

const solved = await constraints.solvePastafariConstraintsDirect({
  variables: { A: { jdn: FIXED.targetSame } },
  constraints: [],
});
assert.equal(solved.complete, true);
assert.equal(solved.solutions[0].A.jdn, FIXED.targetSame);

console.log(`benchmark smoke PASS checksum=${digest({ first, view: view.days.length })}`);
