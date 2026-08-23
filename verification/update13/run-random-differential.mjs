#!/usr/bin/env node
"use strict";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as published from "../../src/public-api.js";
import * as update9 from "../update9/proleptic-negative-year-reference.mjs";
import * as kokiRef from "../update12/reference-koki.mjs";
import * as vikramaRef from "../update11/vikrama-reference.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "artifacts/update-13-random-differential.json");
const SAMPLE_COUNT = Number(process.env.UPDATE13_RANDOM_SAMPLES || 64);
if (!Number.isSafeInteger(SAMPLE_COUNT) || SAMPLE_COUNT < 1 || SAMPLE_COUNT > 512) throw new RangeError("UPDATE13_RANDOM_SAMPLES must be 1..512");

let state = 0x13c0ffee;
function nextU32() {
  state ^= state << 13; state >>>= 0;
  state ^= state >>> 17; state >>>= 0;
  state ^= state << 5; state >>>= 0;
  return state >>> 0;
}
function randomJdn() {
  const min = -13_600_000;
  const span = 16_200_001;
  return BigInt(min + (nextU32() % span));
}
const samples = Array.from({ length: SAMPLE_COUNT }, () => randomJdn());

const update9Adapters = {
  hebrew: (d) => published.hebrewToJdn(new published.HebrewDate(d.year, d.month, d.day)),
  "islamic-civil": (d) => published.islamicCivilToJdn(new published.IslamicCivilDate(d.year, d.month, d.day)),
  saka: (d) => published.sakaToJdn(new published.SakaDate(d.year, d.month, d.day)),
  ethiopic: (d) => published.ethiopicToJdn(new published.EthiopicDate(d.year, d.month, d.day)),
  coptic: (d) => published.copticToJdn(new published.CopticDate(d.year, d.month, d.day)),
  "bahai-western": (d) => published.bahaiToJdn(new published.BahaiDate(d.year, d.month, d.day, { variant: "western-arithmetic" })),
};

function withIntl(mode, fn) {
  const original = Intl.DateTimeFormat;
  let calls = 0;
  if (mode === "throw") {
    Intl.DateTimeFormat = function Update13RandomThrow() { calls += 1; throw new Error("UPDATE13_RANDOM_INTL_THROW"); };
  } else if (mode === "nonsense") {
    Intl.DateTimeFormat = function Update13RandomNonsense() {
      calls += 1;
      return { format: () => "nonsense", formatToParts: () => [{ type: "relatedYear", value: "999999" }] };
    };
  }
  try { return { result: fn(), calls }; }
  finally { Intl.DateTimeFormat = original; }
}

function executeMode(mode) {
  const stats = Object.fromEntries([
    ...Object.keys(update9Adapters), "gregorian", "koki", "vikrama",
  ].map((name) => [name, { samples: 0, mismatches: 0, examples: [] }]));
  const run = withIntl(mode, () => {
    for (const jdn of samples) {
      for (const [id, adapter] of Object.entries(update9Adapters)) {
        const date = update9.fromJdn(id, jdn);
        const actual = adapter(date);
        const bucket = stats[id];
        bucket.samples += 1;
        if (actual !== jdn) {
          bucket.mismatches += 1;
          if (bucket.examples.length < 5) bucket.examples.push({ jdn: jdn.toString(), date, actual: actual.toString() });
        }
      }

      const gregorian = kokiRef.referenceJdnToGregorian(jdn);
      const gregorianActual = published.gregorianToJdn(new published.GregorianDate(gregorian.year, gregorian.month, gregorian.day));
      stats.gregorian.samples += 1;
      if (gregorianActual !== jdn) stats.gregorian.mismatches += 1;

      const koki = kokiRef.referenceJdnToKoki(jdn);
      const kokiActual = published.kokiToJdn(new published.KokiDate(koki.year, koki.month, koki.day));
      stats.koki.samples += 1;
      if (kokiActual !== jdn) stats.koki.mismatches += 1;

      const vikrama = vikramaRef.referenceJdnToVikrama(jdn);
      const vikramaActual = published.vikramaToJdn(new published.VikramaDate(vikrama.year, vikrama.month, vikrama.tithi, {
        leapMonth: vikrama.leapMonth,
        leapTithi: vikrama.leapTithi,
      }));
      stats.vikrama.samples += 1;
      if (vikramaActual !== jdn) {
        stats.vikrama.mismatches += 1;
        if (stats.vikrama.examples.length < 5) stats.vikrama.examples.push({ jdn: jdn.toString(), date: vikrama, actual: vikramaActual.toString() });
      }
    }
    return stats;
  });
  const mismatchCount = Object.values(run.result).reduce((sum, item) => sum + item.mismatches, 0);
  return { mode, intlDateTimeFormatCalls: run.calls, mismatchCount, representations: run.result };
}

const modes = ["normal", "throw", "nonsense"].map(executeMode);
const failures = modes.filter((mode) => mode.mismatchCount !== 0 || (mode.mode !== "normal" && mode.intlDateTimeFormatCalls !== 0));
const report = {
  schema: "pastafari-update13-random-differential-v1",
  baselineCommit: "d8361bf852f54597f62daeaa293443e5c5d9ef84",
  seed: "0x13c0ffee",
  sampleCountPerRepresentation: SAMPLE_COUNT,
  sampledJdnRange: { min: "-13600000", max: "2600000" },
  referenceRepresentations: Object.keys(modes[0].representations),
  modes,
  status: failures.length === 0 ? "PASS" : "FAIL",
};
await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(report, (_k, v) => typeof v === "bigint" ? v.toString() : v, 2)}\n`);
console.log(JSON.stringify({ status: report.status, sampleCountPerRepresentation: SAMPLE_COUNT, modes: modes.map(({mode,mismatchCount,intlDateTimeFormatCalls}) => ({mode,mismatchCount,intlDateTimeFormatCalls})) }, null, 2));
if (failures.length) process.exitCode = 1;
