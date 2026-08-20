#!/usr/bin/env node
/**
 * Export a temporary gate-position cache derived directly from the clear JS
 * reference.  It exists only to accelerate the independent Python fixture
 * generator; production artifacts are never read as value sources.
 */
import { writeFile } from "node:fs/promises";
import os from "node:os";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import {
  FOUNDATION_JDN,
  SPEC,
  gateGap,
} from "../../verification/reference-oracle/reference.mjs";

const MINIMUM = -32_768;
const MAXIMUM = 40_000;

function deriveRange(start, end) {
  const rows = [];
  for (let index = start; index <= end; index += 1) {
    if (index !== 0) rows.push([index, Number(gateGap(index).gap)]);
  }
  return rows;
}

function splitRange(start, end, pieces) {
  const total = end - start + 1;
  const size = Math.ceil(total / pieces);
  const ranges = [];
  for (let first = start; first <= end; first += size) {
    ranges.push([first, Math.min(end, first + size - 1)]);
  }
  return ranges;
}

async function main() {
  const destination = process.argv[2];
  if (!destination) throw new Error("usage: node implementations/tests/export_reference_gate_cache.mjs <output.json>");
  const count = Math.min(6, Math.max(2, os.cpus().length || 2));
  const ranges = [
    ...splitRange(MINIMUM, -1, Math.ceil(count / 2)),
    ...splitRange(1, MAXIMUM, Math.floor(count / 2)),
  ];
  const chunks = await Promise.all(ranges.map(([start, end]) => new Promise((resolve, reject) => {
    const worker = new Worker(new URL(import.meta.url), { workerData: { start, end } });
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => { if (code !== 0) reject(new Error(`gate-cache worker exited ${code}`)); });
  })));
  const gaps = new Map(chunks.flat());
  const positions = [[0, Number(FOUNDATION_JDN)]];
  let position = Number(FOUNDATION_JDN);
  const negative = [];
  for (let index = -1; index >= MINIMUM; index -= 1) {
    position -= gaps.get(index);
    negative.push([index, position]);
  }
  negative.reverse();
  position = Number(FOUNDATION_JDN);
  const positive = [];
  for (let index = 1; index <= MAXIMUM; index += 1) {
    position += gaps.get(index);
    positive.push([index, position]);
  }
  const document = {
    canonicalId: SPEC.canonicalId,
    normativeSourceSha256: SPEC.sha256,
    derivation: "verification/reference-oracle/reference.mjs gateGap; parallel scheduling only",
    minimumIndex: MINIMUM,
    maximumIndex: MAXIMUM,
    positions: [...negative, ...positions, ...positive],
  };
  await writeFile(destination, `${JSON.stringify(document)}\n`, "utf8");
  console.log(JSON.stringify({ destination, positions: document.positions.length, minimumIndex: MINIMUM, maximumIndex: MAXIMUM }));
}

if (!isMainThread && workerData?.start !== undefined) {
  parentPort.postMessage(deriveRange(workerData.start, workerData.end));
} else {
  await main();
}
