#!/usr/bin/env node
"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { ReferenceCalendar, serializeBigInts } from "../reference-oracle/reference.mjs";

const [cachePathArg, id, jdnArg, domain, seededBeforeArg, seededAfterArg] = process.argv.slice(2);
if (!cachePathArg || !id || jdnArg === undefined || domain === undefined || seededBeforeArg === undefined || seededAfterArg === undefined) {
  throw new Error("usage: anchor-evidence-worker.mjs <gate-cache> <id> <jdn> <domain> <seeded-before-offset> <seeded-after-offset>");
}
const cachePath = path.resolve(cachePathArg);
const cache = JSON.parse(await readFile(cachePath, "utf8"));
const gaps = new Map(cache.gaps.map(([index, gap]) => [Number(index), BigInt(gap)]));
const FOUNDATION_JDN = -13_334_246n;
const positions = new Map([[0, FOUNDATION_JDN]]);
let running = FOUNDATION_JDN;
for (let index = -1; index >= cache.minimum; index -= 1) {
  running -= gaps.get(index);
  positions.set(index, running);
}
running = FOUNDATION_JDN;
for (let index = 1; index <= cache.maximum; index += 1) {
  running += gaps.get(index);
  positions.set(index, running);
}
const gateTable = {
  minimum: cache.minimum,
  maximum: cache.maximum,
  position(index) {
    const value = positions.get(index);
    if (value === undefined) throw new RangeError(`Update17 anchor worker missing gate ${index}`);
    return value;
  },
  containingInterval(jdnValue) {
    const day = BigInt(jdnValue);
    let lo = this.minimum;
    let hi = this.maximum - 1;
    while (lo < hi) {
      const mid = Math.floor((lo + hi + 1) / 2);
      if (this.position(mid) < day) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  },
};

const calculationJdn = BigInt(jdnArg);
const calendar = new ReferenceCalendar(calculationJdn, { gateTable });
const anchor = calendar.anchorEvidence;
const year = anchor.year;
const structure = calendar.structure(year);
const seededOffsets = [Number(seededBeforeArg), Number(seededAfterArg)];
const targets = [
  { tag: "same-day", jdn: calculationJdn },
  { tag: "before-1", jdn: calculationJdn - 1n },
  { tag: "after-1", jdn: calculationJdn + 1n },
  { tag: "before-137", jdn: calculationJdn - 137n },
  { tag: "after-137", jdn: calculationJdn + 137n },
  { tag: "year-start", jdn: year.startJdn },
  { tag: "year-end", jdn: year.endJdn },
  { tag: "seeded-before", jdn: calculationJdn + BigInt(seededOffsets[0]) },
  { tag: "seeded-after", jdn: calculationJdn + BigInt(seededOffsets[1]) },
];
if (new Set(["foundation", "tablets", "modern"]).has(id)) {
  targets.push(
    { tag: "previous-year-boundary", jdn: year.startJdn - 1n },
    { tag: "next-year-boundary", jdn: year.endJdn + 1n },
  );
}
const result = {
  id,
  calculationJdn,
  domain,
  yearExpected: {
    containingGateIndex: anchor.containingGateIndex,
    candidateGates: anchor.discovery.beforeFiltering,
    filteredCandidateSet: anchor.discovery.afterFiltering,
    candidateCount: anchor.selection.candidateCount,
    selectedIndex: anchor.selection.selectedOneBased,
    selectedYear: year,
  },
  structureExpected: {
    year,
    cutlets: {
      cutletCount: structure.cutletCount,
      mandatoryCut: structure.mandatoryCut,
      partitionCount: structure.partitionCount,
      cutletGaps: structure.cutletGaps,
      cutletNames: structure.cutletNames,
      cutletStartOffsets: structure.cutletStartOffsets,
      cutletEndOffsets: structure.cutletEndOffsets,
    },
    months: {
      monthCount: structure.monthCount,
      monthLengthWays: structure.monthLengthWays,
      monthLengths: structure.monthLengths,
      minimumObservedMonthLength: Math.min(...structure.monthLengths),
      maximumObservedMonthLength: Math.max(...structure.monthLengths),
      weaveWays: structure.weaveWays,
      monthWeave: structure.monthWeave,
      monthNameWays: structure.monthNameWays,
      monthNames: structure.monthNames,
      dayInMonth: structure.dayInMonth,
    },
  },
  finalEntries: targets.map((target) => ({
    tag: target.tag,
    targetJdn: target.jdn,
    expected: calendar.convertJdn(target.jdn),
  })),
};
process.stdout.write(`${JSON.stringify(serializeBigInts(result))}\n`);
