#!/usr/bin/env node
/**
 * Generate the signed-year-chain witness directly from the clear JavaScript
 * reference oracle.  No production engine, checkpoint table, fixture, or
 * committed gate blob is read as a value source.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import os from "node:os";
import {
  FOUNDATION_JDN,
  SPEC,
  gateGap,
  sauce,
  chooseUniform,
} from "../../verification/reference-oracle/reference.mjs";

const MIN_YEAR_DAYS = 252;
const MAX_YEAR_DAYS = 5_778;
const MIN_YEAR_GAPS = 6;
const CANONICAL_ID = SPEC.canonicalId;
const SOURCE_SHA256 = SPEC.sha256;

class GateTable {
  constructor(precomputedGaps = new Map()) {
    this.precomputedGaps = precomputedGaps;
    this.positions = new Map([[0, Number(FOUNDATION_JDN)]]);
    this.minimum = 0;
    this.maximum = 0;
  }

  position(index) {
    if (!Number.isSafeInteger(index)) throw new RangeError("gate index must be a safe integer");
    while (this.maximum < index) {
      const next = this.maximum + 1;
      const distance = this.precomputedGaps.get(next) ?? Number(gateGap(next).gap);
      this.positions.set(next, this.positions.get(this.maximum) + distance);
      this.maximum = next;
    }
    while (this.minimum > index) {
      const next = this.minimum - 1;
      const distance = this.precomputedGaps.get(next) ?? Number(gateGap(next).gap);
      this.positions.set(next, this.positions.get(this.minimum) - distance);
      this.minimum = next;
    }
    return this.positions.get(index);
  }

  containingInterval(jdn) {
    const foundation = Number(FOUNDATION_JDN);
    if (jdn > foundation) {
      let index = Math.max(0, Math.floor((jdn - foundation) / 500) - 8);
      this.position(index);
      while (this.position(index + 1) < jdn) index += 1;
      while (this.position(index) >= jdn) index -= 1;
      return index;
    }
    let index = Math.min(-1, Math.floor((jdn - foundation) / 500) + 8);
    this.position(index);
    while (this.position(index) >= jdn) index -= 1;
    while (this.position(index + 1) < jdn) index += 1;
    return index;
  }
}

let GATES;

function workerRange(start, end) {
  const rows = [];
  const step = start <= end ? 1 : -1;
  for (let index = start; ; index += step) {
    if (index !== 0) rows.push([index, Number(gateGap(index).gap)]);
    if (index === end) break;
  }
  return rows;
}

async function precomputeGaps(minimum = -50_000, maximum = 64) {
  const indices = [];
  for (let i = minimum; i <= -1; i += 1) indices.push(i);
  for (let i = 1; i <= maximum; i += 1) indices.push(i);
  const workerCount = Math.min(6, Math.max(2, os.cpus().length || 2));
  const chunkSize = Math.ceil(indices.length / workerCount);
  const tasks = [];
  for (let offset = 0; offset < indices.length; offset += chunkSize) {
    const slice = indices.slice(offset, offset + chunkSize);
    tasks.push(new Promise((resolve, reject) => {
      const worker = new Worker(new URL(import.meta.url), { workerData: { gateRange: [slice[0], slice.at(-1)] } });
      worker.once("message", resolve);
      worker.once("error", reject);
      worker.once("exit", (code) => { if (code !== 0) reject(new Error(`gate worker exited ${code}`)); });
    }));
  }
  const rows = (await Promise.all(tasks)).flat();
  return new Map(rows);
}

function choose(calculationJdn, targetJdn, seal, count) {
  const trace = sauce(BigInt(calculationJdn), BigInt(targetJdn), { detail: "summary" });
  return Number(chooseUniform(trace, 1, BigInt(seal), BigInt(count)).choice);
}

function makeYear(number, openIndex, closeIndex) {
  const opening = GATES.position(openIndex);
  const closing = GATES.position(closeIndex);
  return Object.freeze({
    number,
    openIndex,
    closeIndex,
    startJdn: opening + 1,
    endJdn: closing,
    length: closing - opening,
    gaps: closeIndex - openIndex,
  });
}

function enumerateYear5000Candidates(calculationJdn) {
  const interval = GATES.containingInterval(calculationJdn);
  const openings = [];
  let index = interval;
  while (calculationJdn - GATES.position(index) <= MAX_YEAR_DAYS) {
    openings.push([index, GATES.position(index)]);
    index -= 1;
  }
  const closings = [];
  index = interval + 1;
  while (GATES.position(index) - calculationJdn <= MAX_YEAR_DAYS) {
    closings.push([index, GATES.position(index)]);
    index += 1;
  }
  const result = [];
  for (const [openIndex, opening] of openings) {
    for (const [closeIndex, closing] of closings) {
      const gaps = closeIndex - openIndex;
      const length = closing - opening;
      if (gaps >= MIN_YEAR_GAPS && length >= MIN_YEAR_DAYS && length <= MAX_YEAR_DAYS) {
        result.push([openIndex, closeIndex, length]);
      }
    }
  }
  result.sort((a, b) => a[2] - b[2] || a[0] - b[0]);
  return result;
}

function year5000(calculationJdn) {
  const candidates = enumerateYear5000Candidates(calculationJdn);
  const selected = choose(calculationJdn, calculationJdn, 10, candidates.length);
  const [openIndex, closeIndex] = candidates[selected - 1];
  return makeYear(5000, openIndex, closeIndex);
}

function adjacentCandidatesForPrevious(closeIndex) {
  const closing = GATES.position(closeIndex);
  const result = [];
  let index = closeIndex - MIN_YEAR_GAPS;
  while (true) {
    const length = closing - GATES.position(index);
    if (length > MAX_YEAR_DAYS) break;
    if (length >= MIN_YEAR_DAYS) result.push([index, length]);
    index -= 1;
  }
  result.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  return result;
}

function previousYear(calculationJdn, year) {
  const candidates = adjacentCandidatesForPrevious(year.openIndex);
  const target = GATES.position(year.openIndex);
  const selected = choose(calculationJdn, target, 12, candidates.length);
  const [openIndex] = candidates[selected - 1];
  return makeYear(year.number - 1, openIndex, year.openIndex);
}

async function main() {
  const precomputed = await precomputeGaps();
  GATES = new GateTable(precomputed);
  const calculationJdn = Number(FOUNDATION_JDN);
  let year = year5000(calculationJdn);
  const rows = new Map([[5000, year]]);
  while (year.number > -1) {
    year = previousYear(calculationJdn, year);
    if ([2, 1, 0, -1].includes(year.number)) rows.set(year.number, year);
  }
  const document = {
    canonicalId: CANONICAL_ID,
    normativeSourceSha256: SOURCE_SHA256,
    derivation: "year-by-year backward chaining from specification-derived year 5000 using verification/reference-oracle/reference.mjs; no production engine imported",
    signedYearChain: [2, 1, 0, -1].map((number) => {
      const row = rows.get(number);
      return {
        year: number,
        openIndex: row.openIndex,
        closeIndex: row.closeIndex,
        startJdn: String(row.startJdn),
        endJdn: String(row.endJdn),
      };
    }),
  };
  const destination = path.join(path.dirname(fileURLToPath(import.meta.url)), "spec-derived-deep-year-chain.json");
  await writeFile(destination, `${JSON.stringify(document, null, 2)}\n`, "utf8");
  console.log(`wrote ${destination}`);
  for (const row of document.signedYearChain) console.log(row);
}

if (!isMainThread && workerData?.gateRange) {
  const [start, end] = workerData.gateRange;
  parentPort.postMessage(workerRange(start, end));
} else {
  await main();
}
