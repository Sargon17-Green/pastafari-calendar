"use strict";

import { performance } from "node:perf_hooks";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as published from "../../src/public-api.js";
import * as browserCore from "../../browser/koki-api.js";
import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn as docsCalendarDateToJdn,
  getCalendarDefinition,
  jdnToKoki as docsJdnToKoki,
  kokiToJdn as docsKokiToJdn,
} from "../../docs/calendar-converters.js";
import {
  referenceGregorianToJdn,
  referenceJdnToKoki,
  referenceKokiToJdn,
} from "./reference-koki.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const FOUNDATION_JDN = -13_334_246n;
const FOUNDATION_LINEAR_DAY = -15_055_671n;
const BASELINE_COMMIT = "1f33a5b66261f202082d9a2f1087ccfa1ff1ab51";
const SEED = 0x4b4f4b49;
const RANDOM_SAMPLES = 10_000;

function json(value) {
  return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item, 2);
}

function sameKoki(a, b) {
  return a.system === b.system
    && a.calendar === b.calendar
    && a.year === b.year
    && a.month === b.month
    && a.day === b.day;
}

function safeCall(fn) {
  try {
    const value = fn();
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: { name: error?.name || "Error", message: error?.message || String(error) } };
  }
}

function xorshift32Factory(seed) {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return state >>> 0;
  };
}

function randomBigIntInclusive(next, minimum, maximum) {
  const span = maximum - minimum + 1n;
  const high = BigInt(next());
  const low = BigInt(next());
  const bits = (high << 32n) | low;
  return minimum + bits % span;
}

async function sourceEvidence() {
  const sourceDir = path.join(ROOT, "sources");
  const names = await readdir(sourceDir);
  const magillahName = names.find((name) => name.endsWith(".md"));
  if (!magillahName) throw new Error("Magillah source file not found.");
  const text = await readFile(path.join(sourceDir, magillahName), "utf8");
  const lines = text.split(/\r?\n/u);
  const anchor = lines.find((line) => line.includes("40,561") && line.includes("קוֹקי"));
  const yearZero = lines.find((line) => line.startsWith("[^11]:"));
  if (!anchor || !yearZero) throw new Error("Required Kōki source evidence is missing from the Magillah.");
  return { canonicalPath: "sources/מגילת העיתים.md", anchor, yearZero };
}

function epochProof() {
  const vectors = [
    { koki: -2n, gregorianAstronomical: -662n, historical: "663 BCE" },
    { koki: -1n, gregorianAstronomical: -661n, historical: "662 BCE" },
    { koki: 0n, gregorianAstronomical: -660n, historical: "661 BCE" },
    { koki: 1n, gregorianAstronomical: -659n, historical: "660 BCE" },
    { koki: 2n, gregorianAstronomical: -658n, historical: "659 BCE" },
    { koki: 2600n, gregorianAstronomical: 1940n, historical: "1940 CE" },
    { koki: 2686n, gregorianAstronomical: 2026n, historical: "2026 CE" },
  ];
  return vectors.map((entry) => ({
    ...entry,
    january1Jdn: referenceKokiToJdn({ year: entry.koki, month: 1, day: 1 }),
    offsetCheck: entry.gregorianAstronomical + 660n,
  }));
}

function foundationEvidence() {
  const reference = referenceJdnToKoki(FOUNDATION_JDN);
  const node = published.jdnToKoki(FOUNDATION_JDN);
  const browser = browserCore.jdnToKoki(FOUNDATION_JDN);
  const docs = docsJdnToKoki(FOUNDATION_JDN);
  return {
    linearDay: FOUNDATION_LINEAR_DAY,
    jdn: FOUNDATION_JDN,
    gregorianAstronomical: { year: -41_221n, month: 12, day: 22 },
    reference,
    node,
    browser,
    docs,
    nodeRoundTrip: published.kokiToJdn(node),
    browserRoundTrip: browserCore.kokiToJdn(browser),
    docsRoundTrip: docsKokiToJdn(docs),
    match: sameKoki(reference, node)
      && sameKoki(reference, browser)
      && sameKoki(reference, docs)
      && published.kokiToJdn(node) === FOUNDATION_JDN
      && browserCore.kokiToJdn(browser) === FOUNDATION_JDN
      && docsKokiToJdn(docs) === FOUNDATION_JDN,
  };
}

function foundationNeighborsAndBoundaries() {
  const year = -40_561n;
  const yearStart = referenceKokiToJdn({ year, month: 1, day: 1 });
  const nextStart = referenceKokiToJdn({ year: year + 1n, month: 1, day: 1 });
  const points = [
    FOUNDATION_JDN - 1n,
    FOUNDATION_JDN,
    FOUNDATION_JDN + 1n,
    yearStart - 1n,
    yearStart,
    nextStart - 1n,
    nextStart,
  ];
  return points.map((jdn) => ({ jdn, reference: referenceJdnToKoki(jdn), authoritative: published.jdnToKoki(jdn) }));
}

function leapEvidence() {
  const vectors = [
    { kokiYear: 2560n, gregorianYear: 1900n, feb29Legal: false },
    { kokiYear: 2600n, gregorianYear: 1940n, feb29Legal: true },
    { kokiYear: 2660n, gregorianYear: 2000n, feb29Legal: true },
    { kokiYear: 2700n, gregorianYear: 2040n, feb29Legal: true },
  ];
  return vectors.map((entry) => ({
    ...entry,
    result: safeCall(() => published.kokiToJdn(new published.KokiDate(entry.kokiYear, 2, 29))),
  }));
}

function eraRegressions() {
  const vectors = [
    ["meiji", 1n, 10, 23, 1868n, 10, 23],
    ["meiji", 45n, 7, 29, 1912n, 7, 29],
    ["taisho", 1n, 7, 30, 1912n, 7, 30],
    ["taisho", 15n, 12, 24, 1926n, 12, 24],
    ["showa", 1n, 12, 25, 1926n, 12, 25],
    ["showa", 64n, 1, 7, 1989n, 1, 7],
    ["heisei", 1n, 1, 8, 1989n, 1, 8],
    ["heisei", 31n, 4, 30, 2019n, 4, 30],
    ["reiwa", 1n, 5, 1, 2019n, 5, 1],
    ["reiwa", 8n, 8, 23, 2026n, 8, 23],
  ];
  return vectors.map(([era, eraYear, month, day, gy, gm, gd]) => {
    const actual = published.japaneseImperialToJdn(new published.JapaneseImperialDate(era, eraYear, month, day));
    const expected = referenceGregorianToJdn({ year: gy, month: gm, day: gd });
    return { era, eraYear, month, day, gregorian: { year: gy, month: gm, day: gd }, actual, expected, match: actual === expected };
  });
}

function modernDual() {
  const era = new published.JapaneseImperialDate("reiwa", 8n, 8, 23);
  const jdn = published.japaneseImperialToJdn(era);
  return {
    jdn,
    gregorian: { year: 2026n, month: 8, day: 23 },
    japaneseImperial: { era: era.era, year: era.year, month: era.month, day: era.day },
    koki: published.jdnToKoki(jdn),
  };
}

function intlFaultInjection() {
  const original = Intl.DateTimeFormat;
  Intl.DateTimeFormat = function ForbiddenIntlDateTimeFormat() {
    throw new Error("UPDATE12_INTL_FORBIDDEN");
  };
  try {
    return {
      node: safeCall(() => published.jdnToKoki(FOUNDATION_JDN)),
      browserModule: safeCall(() => browserCore.jdnToKoki(FOUNDATION_JDN)),
      docs: safeCall(() => docsJdnToKoki(FOUNDATION_JDN)),
      nodeReverse: safeCall(() => published.kokiToJdn(new published.KokiDate(-40_561n, 12, 22))),
      docsReverse: safeCall(() => docsCalendarDateToJdn("koki", { year: "-40561", month: "12", day: "22" })),
    };
  } finally {
    Intl.DateTimeFormat = original;
  }
}

function invalidInputEvidence() {
  const cases = [
    ["NaN", () => new published.KokiDate(NaN, 1, 1)],
    ["Infinity", () => new published.KokiDate(Infinity, 1, 1)],
    ["fractional", () => new published.KokiDate(1.5, 1, 1)],
    ["invalid type", () => new published.KokiDate({}, 1, 1)],
    ["bad month", () => new published.KokiDate(1n, 13, 1)],
    ["bad day", () => new published.KokiDate(1n, 2, 30)],
    ["unsupported shape", () => published.kokiToJdn({ calendar: "japanese-imperial", year: 1n, month: 1, day: 1 })],
  ];
  return cases.map(([label, run]) => ({ label, ...safeCall(run) }));
}

function wideDifferential() {
  const mismatches = [];
  let checked = 0;
  function check(jdn, source) {
    checked += 1;
    const reference = referenceJdnToKoki(jdn);
    const node = published.jdnToKoki(jdn);
    const browser = browserCore.jdnToKoki(jdn);
    const docs = docsJdnToKoki(jdn);
    const ok = sameKoki(reference, node)
      && sameKoki(reference, browser)
      && sameKoki(reference, docs)
      && published.kokiToJdn(node) === jdn
      && browserCore.kokiToJdn(browser) === jdn
      && docsKokiToJdn(docs) === jdn;
    if (!ok && mismatches.length < 20) mismatches.push({ source, jdn, reference, node, browser, docs });
  }

  for (let delta = -1000n; delta <= 1000n; delta += 1n) check(FOUNDATION_JDN + delta, "foundation-window");
  for (let year = -5n; year <= 5n; year += 1n) {
    check(referenceKokiToJdn({ year, month: 1, day: 1 }) - 1n, "epoch-boundary");
    check(referenceKokiToJdn({ year, month: 1, day: 1 }), "epoch-boundary");
  }

  const next = xorshift32Factory(SEED);
  const minimum = referenceGregorianToJdn({ year: -100_000n, month: 1, day: 1 });
  const maximum = referenceGregorianToJdn({ year: 100_000n, month: 12, day: 31 });
  for (let index = 0; index < RANDOM_SAMPLES; index += 1) {
    check(randomBigIntInclusive(next, minimum, maximum), "random");
  }

  return { seed: `0x${SEED.toString(16)}`, randomSamples: RANDOM_SAMPLES, checked, mismatches, mismatchCount: mismatches.length };
}

function performanceEvidence() {
  const count = 10_000;
  const startTo = performance.now();
  for (let index = 0; index < count; index += 1) {
    published.kokiToJdn(new published.KokiDate(-40_561n + BigInt(index % 400), 12, 22));
  }
  const toMs = performance.now() - startTo;

  const startFrom = performance.now();
  for (let index = 0; index < count; index += 1) {
    published.jdnToKoki(FOUNDATION_JDN + BigInt(index % 2001) - 1000n);
  }
  const fromMs = performance.now() - startFrom;
  return {
    count,
    kokiToJdnMs: toMs,
    jdnToKokiMs: fromMs,
    kokiToJdnMicrosecondsPerCall: toMs * 1000 / count,
    jdnToKokiMicrosecondsPerCall: fromMs * 1000 / count,
  };
}

function memoryEvidence() {
  const available = typeof global.gc === "function";
  if (!available) return { available: false };
  global.gc();
  const before = process.memoryUsage().heapUsed;
  for (let index = 0; index < 20_000; index += 1) {
    published.jdnToKoki(FOUNDATION_JDN + BigInt(index % 2001) - 1000n);
    published.kokiToJdn(new published.KokiDate(-40_561n + BigInt(index % 50), 12, 22));
  }
  global.gc();
  const after = process.memoryUsage().heapUsed;
  return { available: true, calls: 40_000, heapBefore: before, heapAfter: after, heapDelta: after - before };
}

async function main() {
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const source = await sourceEvidence();
  const preFix = JSON.parse(await readFile(path.join(ROOT, "artifacts", "update-12-koki-pre-fix-differential.json"), "utf8"));
  const wide = wideDifferential();
  const eras = eraRegressions();
  const intl = intlFaultInjection();
  const foundation = foundationEvidence();
  const hiddenDefinition = getCalendarDefinition("koki");
  const visibleCalendarIds = CALENDAR_DEFINITIONS.map((entry) => entry.id);

  const evidence = {
    update: 12,
    status: "PASS",
    baseline: { commitSha: BASELINE_COMMIT, packageVersion: pkg.version },
    classification: "B_KOKI_WAS_MISSING_COMPLETELY",
    normative: {
      source,
      convention: {
        formula: "kokiYear = prolepticGregorianAstronomicalYear + 660",
        inverse: "gregorianAstronomicalYear = kokiYear - 660",
        monthDay: "same proleptic-Gregorian month/day",
        signedYearZero: true,
        epoch: "Koki 1 = Gregorian astronomical -659 = 660 BCE; Koki 0 = astronomical -660 = 661 BCE",
        imperialErasAreSeparate: true,
      },
      externalCorroboration: [
        "National Archives of Japan, Imperial Ordinance No. 90 (1898): leap-year rule subtracts 660 from the Jimmu-era year before Gregorian century handling.",
        "National Diet Library reference: 1940 = Koki 2600; epoch is 660 BCE.",
      ],
    },
    preFix,
    foundation,
    epochProof: epochProof(),
    foundationNeighborsAndBoundaries: foundationNeighborsAndBoundaries(),
    leapEvidence: leapEvidence(),
    modernDual: modernDual(),
    eraRegressions: eras,
    intlFaultInjection: intl,
    invalidInputs: invalidInputEvidence(),
    wideDifferential: wide,
    api: {
      nodeKokiExports: Object.keys(published).filter((name) => /koki/iu.test(name)).sort(),
      browserKokiExports: Object.keys(browserCore).filter((name) => /koki/iu.test(name)).sort(),
      docsHiddenDefinition: hiddenDefinition,
      docsVisibleCalendarListContainsKoki: visibleCalendarIds.includes("koki"),
      note: "The docs adapter accepts Koki through a hidden definition so the existing translated UI list is not refactored in Update 12.",
    },
    spaghetti: {
      legacyJapaneseEraTableRemoved: false,
      intlPathRemoved: false,
      mechanism: "Each Koki conversion deliberately sends a synthetic era='koki' request through the legacy Japanese-imperial converter. Its normal rejection (or any accidental future success) is discarded. A separate signed arithmetic shadow then applies the normative Koki/Gregorian year relation and returns the public result.",
      sharedMutablePatch: false,
      exceptionCleanupNeeded: false,
      reentrancyRisk: "none introduced; no temporary global/table mutation is installed",
      publicEraMutationDependency: false,
    },
    performance: performanceEvidence(),
    memory: memoryEvidence(),
    environment: { node: process.version, platform: process.platform, arch: process.arch },
  };

  const failures = [];
  if (!foundation.match) failures.push("Foundation mismatch");
  if (wide.mismatchCount !== 0) failures.push("wide differential mismatch");
  if (eras.some((item) => !item.match)) failures.push("Japanese era regression");
  for (const [name, item] of Object.entries(intl)) if (!item.ok) failures.push(`Intl fault injection failed: ${name}`);
  const invalidSuccess = evidence.invalidInputs.filter((item) => item.ok);
  if (invalidSuccess.length) failures.push(`invalid inputs accepted: ${invalidSuccess.map((item) => item.label).join(", ")}`);
  if (evidence.memory.available && evidence.memory.heapDelta > 8 * 1024 * 1024) failures.push("memory growth sanity threshold exceeded");
  evidence.status = failures.length ? "FAIL" : "PASS";
  evidence.failures = failures;

  const output = path.join(ROOT, "artifacts", "update-12-koki-post-fix-evidence.json");
  await writeFile(output, `${json(evidence)}\n`);
  console.log(json({ status: evidence.status, output, foundation: evidence.foundation, wide: evidence.wideDifferential, performance: evidence.performance, memory: evidence.memory, failures }));
  if (failures.length) process.exitCode = 1;
}

await main();
