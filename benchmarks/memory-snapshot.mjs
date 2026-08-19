"use strict";

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { writeHeapSnapshot } from "node:v8";

import { ARTIFACT_DIR, FIXED } from "./lib.mjs";
import { forceGc, requireExposedGc } from "./memory-lib.mjs";

function parseOutput(argv) {
  if (argv.length === 0) return resolve(ARTIFACT_DIR, `manual-memory-${process.pid}.heapsnapshot`);
  if (argv.length === 2 && argv[0] === "--output") return resolve(argv[1]);
  throw new Error("Usage: node --expose-gc benchmarks/memory-snapshot.mjs [--output path.heapsnapshot]");
}

requireExposedGc();
const output = parseOutput(process.argv.slice(2));
const fast = await import("../browser/pastafari-calendar-fast.js");
const calendar = new fast.PastafariCalendar();
fast.clearFastCache();
calendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn });
for (let index = 0; index < 1_200; index += 1) {
  calendar.convertJdn(FIXED.targetSame + BigInt(index), { calculationJdn: FIXED.calculationJdn });
}
await forceGc(2);
await mkdir(dirname(output), { recursive: true });
const written = writeHeapSnapshot(output);
console.log(`Heap snapshot written locally to ${written}`);
console.log("Heap snapshots may contain paths, environment strings, and runtime data. Do not upload them to public CI artifacts by default.");
