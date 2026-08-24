#!/usr/bin/env node
"use strict";
// Pure Update17 packaging worker: computes gate gaps only through the independent reference.
import { gateGap } from "../reference-oracle/reference.mjs";
const start = Number(process.argv[2]);
const end = Number(process.argv[3]);
if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start === 0 || end === 0 || Math.sign(start) !== Math.sign(end)) {
  throw new RangeError("usage: gate-batch-worker.mjs <nonzero-start> <same-sign-end>");
}
const step = start <= end ? 1 : -1;
const rows = [];
for (let index = start; ; index += step) {
  rows.push([index, gateGap(index).gap.toString()]);
  if (index === end) break;
}
process.stdout.write(`${JSON.stringify(rows)}\n`);
