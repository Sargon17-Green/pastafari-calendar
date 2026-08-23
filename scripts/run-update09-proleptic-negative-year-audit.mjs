#!/usr/bin/env node
"use strict";

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as api from "../src/public-api.js";
import * as rawApi from "../src/5efdcc3e6fb071cbaffdcb117507a169dd76.js";
import * as browserCore from "../browser/pastafari-calendar-core.js";
import * as docs from "../docs/calendar-converters.js";
import { CALENDARS, FOUNDATION_JDN, fromJdn } from "../verification/update9/proleptic-negative-year-reference.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "artifacts", "update-09-proleptic-negative-year-audit.json");

const VECTORS = Object.freeze([
  Object.freeze({ id: "hebrew", docsId: "hebrew", className: "HebrewDate", specific: "hebrewToJdn", input: { year: -37460n, month: 3, day: 19 }, values: { year: "-37460", month: "3", day: "19" } }),
  Object.freeze({ id: "islamic-civil", docsId: "islamic-civil", className: "IslamicCivilDate", specific: "islamicCivilToJdn", extraSpecific: "islamicToJdn", input: { year: -43126n, month: 3, day: 27 }, values: { year: "-43126", month: "3", day: "27" } }),
  Object.freeze({ id: "saka", docsId: "saka", className: "SakaDate", specific: "sakaToJdn", input: { year: -41299n, month: 10, day: 1 }, values: { year: "-41299", month: "10", day: "1" } }),
  Object.freeze({ id: "ethiopic", docsId: "ethiopic", className: "EthiopicDate", specific: "ethiopicToJdn", input: { year: -41227n, month: 3, day: 1 }, values: { year: "-41227", month: "3", day: "1" } }),
  Object.freeze({ id: "coptic", docsId: "coptic", className: "CopticDate", specific: "copticToJdn", input: { year: -41503n, month: 3, day: 1 }, values: { year: "-41503", month: "3", day: "1" } }),
  Object.freeze({ id: "bahai-western", docsId: "bahai-western", className: "BahaiDate", specific: "bahaiToJdn", options: { variant: "western-arithmetic" }, input: { year: -43064n, month: 15, day: 11 }, values: { year: "-43064", month: "15", day: "11" } }),
]);

const BEFORE = Object.freeze({
  capturedAt: "2026-08-23T01:10:00Z",
  method: "direct execution on uploaded main snapshot before production changes; package raw bundle remains available as unchanged authoritative-before witness after the wrapper patch",
  packagePublicApi: Object.fromEntries(VECTORS.map((v) => [v.id, { accepted: false, exceptionClass: "RangeError", message: v.id === "hebrew" ? "השנה העברית חייבת להיות חיובית" : v.id === "islamic-civil" ? "השנה ההיג׳רית חייבת להיות חיובית" : v.id === "saka" ? "שנת סאקה חייבת להיות חיובית" : v.id === "ethiopic" ? "השנה אתיופי חייבת להיות חיובית" : v.id === "coptic" ? "השנה קופטי חייבת להיות חיובית" : "השנה הבהאית חייבת להיות חיובית" }])),
  docsPublicApi: {
    hebrew: { accepted: true, jdn: "-13334246" },
    "islamic-civil": { accepted: true, jdn: "-13334246" },
    saka: { accepted: true, jdn: "-13334246" },
    ethiopic: { accepted: true, jdn: "-13334246" },
    coptic: { accepted: true, jdn: "-13334246" },
    "bahai-western": { accepted: false, exceptionClass: "RangeError", message: "The Baha'i year must be positive." },
  },
});

function serialize(value) {
  return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item, 2);
}

function attempt(fn) {
  try {
    const value = fn();
    return { accepted: true, value: typeof value === "bigint" ? value.toString() : value };
  } catch (error) {
    return { accepted: false, exceptionClass: error?.name || "Error", message: error?.message || String(error) };
  }
}

function instance(ns, v, input = v.input) {
  const C = ns[v.className];
  if (v.options) return new C(input.year, input.month, input.day, v.options);
  return new C(input.year, input.month, input.day);
}

function docsValues(input) {
  return { year: String(input.year), month: String(input.month), day: String(input.day) };
}

function digest(rel) {
  return readFile(path.join(ROOT, rel)).then((buf) => [rel, createHash("sha256").update(buf).digest("hex")]);
}

function randomStats() {
  let state = 0x09c0ffee >>> 0;
  const next = () => (state = (Math.imul(state, 1664525) + 1013904223) >>> 0);
  const makers = {
    hebrew: (year) => ({ year, month: 7, day: 1 + Number(next() % 29) }),
    "islamic-civil": (year) => ({ year, month: 1 + Number(next() % 12), day: 1 }),
    saka: (year) => ({ year, month: 1 + Number(next() % 12), day: 1 }),
    ethiopic: (year) => ({ year, month: 1 + Number(next() % 13), day: 1 }),
    coptic: (year) => ({ year, month: 1 + Number(next() % 13), day: 1 }),
    "bahai-western": (year) => ({ year, month: 1 + Number(next() % 18), day: 1 + Number(next() % 19) }),
  };
  const out = {};
  for (const v of VECTORS) {
    let publicReferenceMismatches = 0;
    let docsReferenceMismatches = 0;
    let roundTripMismatches = 0;
    let exceptions = 0;
    for (let i = 0; i < 50; i += 1) {
      const year = -1n - BigInt(next() % 50_000);
      const input = makers[v.id](year);
      const expected = CALENDARS[v.id].toJdn(input);
      try {
        const got = api[v.specific](instance(api, v, input));
        if (got !== expected) publicReferenceMismatches += 1;
      } catch {
        exceptions += 1;
      }
      try {
        const got = docs.calendarDateToJdn(v.docsId, docsValues(input));
        if (got !== expected) docsReferenceMismatches += 1;
      } catch {
        exceptions += 1;
      }
      try {
        const back = fromJdn(v.id, expected);
        if (back.year !== input.year || back.month !== input.month || back.day !== input.day) roundTripMismatches += 1;
      } catch {
        roundTripMismatches += 1;
      }
    }
    out[v.id] = { sampleSize: 50, publicReferenceMismatches, docsReferenceMismatches, roundTripMismatches, exceptions };
  }
  return out;
}

const matrix = [];
for (const v of VECTORS) {
  const reference = CALENDARS[v.id].toJdn(v.input);
  const rawDate = instance(rawApi, v);
  const nodeDate = instance(api, v);
  const browserDate = instance(browserCore, v);
  const internal = docs.calendarDateToJdn(v.docsId, v.values);
  matrix.push({
    calendar: v.id,
    normativeRepresentation: v.values,
    reference: reference.toString(),
    foundationMatch: reference === FOUNDATION_JDN,
    rawAuthoritativeBefore: attempt(() => rawApi[v.specific](rawDate)),
    internalBrowserInputConverter: internal.toString(),
    docsPublicAfter: attempt(() => docs.calendarDateToJdn(v.docsId, v.values)),
    nodePublicAfterSpecific: attempt(() => api[v.specific](nodeDate)),
    nodePublicAfterGeneric: attempt(() => api.calendarDateToJdn(nodeDate)),
    browserCoreAfterSpecific: attempt(() => browserCore[v.specific](browserDate)),
    browserCoreAfterGeneric: attempt(() => browserCore.calendarDateToJdn(browserDate)),
    roundTrip: fromJdn(v.id, reference),
    classification: v.id === "bahai-western"
      ? "A: validation/domain restriction only in package public API and docs Bahai-western path"
      : "A for package public API; docs browser-input converter was already correct",
  });
}

const boundary = {};
for (const v of VECTORS) {
  boundary[v.id] = [];
  const md = v.id === "hebrew" ? { month: 7, day: 1 }
    : v.id === "islamic-civil" ? { month: 1, day: 1 }
      : v.id === "saka" ? { month: 1, day: 1 }
        : v.id === "ethiopic" || v.id === "coptic" ? { month: 13, day: 5 }
          : { month: 1, day: 1 };
  for (const year of [-2n, -1n, 0n, 1n, 2n]) {
    const input = { year, ...md };
    const expected = CALENDARS[v.id].toJdn(input);
    boundary[v.id].push({ input, reference: expected.toString(), public: attempt(() => api[v.specific](instance(api, v, input))) });
  }
}

const files = [
  "browser/proleptic-negative-year-detour.js",
  "browser/pastafari-calendar-core.js",
  "docs/calendar-converters.js",
  "src/public-api.js",
  "test/update09-proleptic-negative-year.test.js",
  "verification/update9/proleptic-negative-year-reference.mjs",
  "scripts/run-update09-proleptic-negative-year-audit.mjs",
  "package.json",
  "SHA256SUMS.txt",
  "docs/SHA256SUMS.txt",
];
const hashes = Object.fromEntries(await Promise.all(files.map(digest)));

const report = {
  update: 9,
  repository: "Sargon17-Green/pastafari-calendar",
  baseCommitSha: "86b511e46f6622f136d3501b835d1098b2910100",
  packageVersion: JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8")).version,
  foundationJdn: FOUNDATION_JDN.toString(),
  foundationLinearDayIndex: "-15055671",
  coordinateSystem: "integer JDN; Foundation JDN = Gregorian-ordinal Foundation index + 1721425",
  before: BEFORE,
  matrix,
  boundaryAroundZero: boundary,
  randomNegativeStatistics: randomStats(),
  tehranBahaiNegative: {
    status: "intentionally still rejected; not the arithmetic normative path for this update",
    docs: attempt(() => docs.calendarDateToJdn("bahai-tehran", { year: "-43064", month: "15", day: "11" })),
    node: attempt(() => api.bahaiToJdn(new api.BahaiDate(-43064n, 15, 11, { variant: "tehran-equinox" }))),
  },
  changedFileSha256: hashes,
};

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `${serialize(report)}\n`);
console.log(`Wrote ${path.relative(ROOT, OUT)}`);
