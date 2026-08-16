#!/usr/bin/env node

// Development-only corpus generator. It deliberately imports the repository's
// authoritative JavaScript implementation; generated vectors are consumed
// offline by the independent language implementations.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  GregorianDate,
  PastafariCalendar,
  gregorianToJdn,
} from "../../src/public-api.js";

const SEED = 0x5a17c9e3d4b26f81n;
const MASK_64 = (1n << 64n) - 1n;
const GROUP_COUNT = 40;
const CASES_PER_GROUP = 250;
const OFFSET_LIMIT = 5_000n;
const CALCULATION_LIMIT = 30_000_000n;

function nextRandom(state) {
  let value = state.value;
  value ^= (value << 13n) & MASK_64;
  value ^= value >> 7n;
  value ^= (value << 17n) & MASK_64;
  state.value = value & MASK_64;
  return state.value;
}

function randomSigned(state, limit) {
  const width = 2n * limit + 1n;
  return nextRandom(state) % width - limit;
}

function canonical(value) {
  const source = value.toJSON();
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}

function makeCalculationDays(state) {
  const fixed = [
    -14_269_936n, // the documented 5,778/5,781 discriminator
    -13_334_246n, // Day of Foundation
    -278_522n,    // Day of the Tablets
    -1n,
    0n,
    1n,
    gregorianToJdn(new GregorianDate(2000n, 1, 1)),
    gregorianToJdn(new GregorianDate(2026n, 8, 12)),
  ];
  const seen = new Set(fixed.map(String));
  while (fixed.length < GROUP_COUNT) {
    const candidate = randomSigned(state, CALCULATION_LIMIT);
    if (seen.has(String(candidate))) continue;
    seen.add(String(candidate));
    fixed.push(candidate);
  }
  return fixed;
}

function makeOffsets(state) {
  const offsets = new Set(["-5000", "-1", "0", "1", "5000"]);
  while (offsets.size < CASES_PER_GROUP) {
    offsets.add(String(randomSigned(state, OFFSET_LIMIT)));
  }
  return [...offsets].map(BigInt).sort((left, right) =>
    left < right ? -1 : left > right ? 1 : 0
  );
}

function main() {
  const outputPath = process.argv[2];
  if (!outputPath) {
    throw new Error("usage: generate_oracle_corpus.mjs OUTPUT.tsv");
  }
  const state = { value: SEED };
  const calendar = new PastafariCalendar({
    todayProvider: () => new GregorianDate(2000n, 1, 1),
  });
  const lines = [
    "# PASTAFARI authoritative differential corpus v1",
    `# seed=0x${SEED.toString(16)} groups=${GROUP_COUNT} cases_per_group=${CASES_PER_GROUP}`,
    "# target_jdn\tcalculation_jdn\texpected_utf8_json",
  ];

  let caseNumber = 0;
  for (const calculationJdn of makeCalculationDays(state)) {
    for (const offset of makeOffsets(state)) {
      const targetJdn = calculationJdn + offset;
      const result = calendar.convertJdn(targetJdn, { calculationJdn });
      lines.push(
        `${targetJdn}\t${calculationJdn}\t${JSON.stringify(canonical(result))}`
      );
      caseNumber += 1;
    }
    process.stderr.write(
      `generated ${caseNumber}/${GROUP_COUNT * CASES_PER_GROUP}\n`
    );
  }

  if (caseNumber !== 10_000) {
    throw new Error(`internal case-count error: ${caseNumber}`);
  }
  fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
}

main();
