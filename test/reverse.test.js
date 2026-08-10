"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import {
  GregorianDate,
  JulianDate,
  PastafariCalendar as PublishedCalendar,
  findPastafariDate as findPublished,
  gregorianToJdn as publishedGregorianToJdn,
  julianToJdn,
} from "pastafari-calendar";
import {
  GregorianDate as FastGregorianDate,
  PastafariCalendar as FastCalendar,
  SAME_AS_TARGET,
  findPastafariDate as findDirect,
  gregorianToJdn,
} from "../browser/pastafari-calendar-fast.js";
import { handlePastafariReverseRequest } from "../browser/pastafari-reverse-worker.js";
import * as reverseSubpath from "pastafari-calendar/reverse";

const TODAY = new FastGregorianDate(2000n, 1, 1);
const TODAY_JDN = gregorianToJdn(TODAY);
const CALCULATION_JDN = gregorianToJdn(new FastGregorianDate(2026n, 8, 6));

const fastCalendar = new FastCalendar({ todayProvider: () => TODAY });

function candidatePairs(candidates) {
  return candidates.map(({ targetJdn, calculationJdn }) => [targetJdn, calculationJdn]);
}

test("the reverse package subpath exposes the worker-backed API", () => {
  assert.equal(typeof reverseSubpath.findPastafariDate, "function");
  assert.equal(reverseSubpath.SAME_AS_TARGET, "same-as-target");
});

test("the public reverse API finds a Gregorian target for a known calculation JDN", async () => {
  const calculationJdn = publishedGregorianToJdn(new GregorianDate(2026n, 8, 6));
  const targetJdn = calculationJdn + 137n;
  const calendar = new PublishedCalendar({
    todayProvider: () => new GregorianDate(2000n, 1, 1),
  });
  const pastafariDate = calendar.convertJdn(targetJdn, { calculationJdn });

  const found = await findPublished(pastafariDate, {
    calculationJdn,
    timeoutMs: 30_000,
  });

  assert.deepStrictEqual(candidatePairs(found), [[targetJdn, calculationJdn]]);
  assert.deepStrictEqual(
    [found[0].targetDate.year, found[0].targetDate.month, found[0].targetDate.day],
    [2026n, 12, 21],
  );
});

test("an omitted calculation day uses exactly one todayProvider snapshot", async () => {
  const targetJdn = TODAY_JDN - 42n;
  const pastafariDate = fastCalendar.convertJdn(targetJdn, { calculationJdn: TODAY_JDN });
  let calls = 0;

  const found = await findDirect(pastafariDate, {
    todayProvider: () => {
      calls += 1;
      return TODAY;
    },
  });

  assert.equal(calls, 1);
  assert.deepStrictEqual(candidatePairs(found), [[targetJdn, TODAY_JDN]]);
});

test("a Pastafari calculation day is resolved recursively before the target", async () => {
  const calculationJdn = TODAY_JDN + 63n;
  const targetJdn = calculationJdn + 19n;
  const calculationPastafari = fastCalendar.convertJdn(calculationJdn, {
    calculationJdn: TODAY_JDN,
  });
  const targetPastafari = fastCalendar.convertJdn(targetJdn, { calculationJdn });

  const found = await findDirect(targetPastafari, {
    calculationDate: calculationPastafari,
    todayProvider: () => TODAY,
  });

  assert.deepStrictEqual(candidatePairs(found), [[targetJdn, calculationJdn]]);
});

test("same-as-target performs a bounded diagonal search and reports progress", async () => {
  const targetJdn = CALCULATION_JDN;
  const pastafariDate = fastCalendar.convertJdn(targetJdn, { calculationJdn: targetJdn });
  const progress = [];

  const found = await findDirect(pastafariDate, {
    calculationDate: SAME_AS_TARGET,
    searchRange: [targetJdn, targetJdn],
    yieldEvery: 1,
    onProgress: (value) => progress.push(value),
  });

  assert.deepStrictEqual(candidatePairs(found), [[targetJdn, targetJdn]]);
  assert.deepStrictEqual(progress, [{ scanned: 1n, total: 1n, matches: 1 }]);
});

test("same-as-target refuses an unbounded search", async () => {
  const pastafariDate = fastCalendar.convertJdn(CALCULATION_JDN, {
    calculationJdn: CALCULATION_JDN,
  });

  await assert.rejects(
    findDirect(pastafariDate, { calculationDate: SAME_AS_TARGET }),
    (error) => error?.code === "ERR_SELF_RANGE_REQUIRED",
  );
});

test("a diagonal search can be cancelled through AbortSignal", async () => {
  const pastafariDate = fastCalendar.convertJdn(CALCULATION_JDN, {
    calculationJdn: CALCULATION_JDN,
  });
  const controller = new AbortController();

  await assert.rejects(
    findDirect(pastafariDate, {
      calculationDate: SAME_AS_TARGET,
      searchRange: [CALCULATION_JDN, CALCULATION_JDN + 2n],
      signal: controller.signal,
      yieldEvery: 1,
      onProgress: () => controller.abort(),
    }),
    (error) => error?.name === "AbortError" && error?.code === "ERR_REVERSE_ABORTED",
  );
});

test("other absolute calendars use the authoritative side door", async () => {
  const calculationDate = new JulianDate(2026n, 7, 24);
  const calculationJdn = julianToJdn(calculationDate);
  assert.equal(calculationJdn, CALCULATION_JDN);
  const targetJdn = calculationJdn + 7n;
  const pastafariDate = fastCalendar.convertJdn(targetJdn, { calculationJdn });

  const found = await findDirect(pastafariDate, {
    calculationDate,
    todayProvider: () => TODAY,
  });

  assert.deepStrictEqual(candidatePairs(found), [[targetJdn, calculationJdn]]);
});

test("the reverse worker handler restores a serialized today snapshot", async () => {
  const targetJdn = TODAY_JDN + 11n;
  const pastafariDate = fastCalendar.convertJdn(targetJdn, { calculationJdn: TODAY_JDN });

  const found = await handlePastafariReverseRequest({
    pastafariDate: pastafariDate.toJSON(),
    options: { todaySnapshot: { year: 2000, month: 1, day: 1 } },
  });

  assert.deepStrictEqual(candidatePairs(found), [[targetJdn, TODAY_JDN]]);
});
