"use strict";

import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { availableParallelism } from "node:os";
import { isMainThread, parentPort, workerData, Worker } from "node:worker_threads";

import { FOUNDATION_JDN, ReferenceOracle } from "../verification/reference-oracle/reference.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REFERENCE_PATH = path.join(ROOT, "verification/reference-oracle/reference.mjs");
const SOURCE_SHA256 = "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96";
const CANONICAL_ID = "PASTAFARI-SCROLL-2026-08-16-D36B0C94";
const FORMAT = "pastafari-gate-shadow-xor10-v1";
const POSITIVE_COUNT = 40_000;
const FAST_INDICES = Object.freeze(Array.from({ length: 65 }, (_, slot) => (slot - 32) * 1024));
const EXTENDED_INDICES = Object.freeze([
  ...Array.from({ length: 31 }, (_, slot) => -32768 + slot * 1024),
  -1856,
  -1024,
  0,
  ...Array.from({ length: 29 }, (_, slot) => 1024 + slot * 1024),
  29952, 30208, 30464, 30720, 30976, 31232, 31456, 31472, 31488, 31504,
  31744, 32768,
]);

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function chunk(values, width) {
  const out = [];
  for (let index = 0; index < values.length; index += width) out.push(values.slice(index, index + width));
  return out;
}

async function assertNormativeSource() {
  const sourceDir = path.join(ROOT, "sources");
  const names = (await readdir(sourceDir)).filter((name) => name.endsWith(".md"));
  if (names.length !== 1) throw new Error(`expected exactly one normative Markdown source, found ${names.length}`);
  const bytes = await readFile(path.join(sourceDir, names[0]));
  const actual = sha256(bytes);
  if (actual !== SOURCE_SHA256) throw new Error(`normative source hash drift: ${actual}`);
}

function xorMask(index) {
  return ((Math.imul(index, 613) + 149) ^ Math.imul(index >>> 3, 179)) & 1023;
}

function encodeGaps(gaps) {
  const bytes = Buffer.alloc(Math.ceil((gaps.length * 10) / 8));
  let accumulator = 0;
  let bits = 0;
  let offset = 0;
  for (let zero = 0; zero < gaps.length; zero += 1) {
    const gap = gaps[zero];
    if (!Number.isInteger(gap) || gap < 42 || gap > 963) throw new Error(`gap out of range at ${zero + 1}: ${gap}`);
    const stored = (gap - 42) ^ xorMask(zero + 1);
    accumulator |= stored << bits;
    bits += 10;
    while (bits >= 8) {
      bytes[offset++] = accumulator & 0xff;
      accumulator >>>= 8;
      bits -= 8;
    }
  }
  if (bits > 0) bytes[offset++] = accumulator & 0xff;
  if (offset !== bytes.length) throw new Error(`payload packing length mismatch ${offset} != ${bytes.length}`);
  return bytes;
}

function fnv32Gaps(gaps) {
  let hash = 0x811c9dc5;
  for (const gap of gaps) {
    hash ^= gap & 0xff;
    hash = Math.imul(hash, 0x01000193) >>> 0;
    hash ^= (gap >>> 8) & 0xff;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function positionsFromGaps(positiveGaps, negativeGaps) {
  const positive = new Array(positiveGaps.length + 1);
  positive[0] = FOUNDATION_JDN;
  for (let index = 1; index < positive.length; index += 1) {
    positive[index] = positive[index - 1] + BigInt(positiveGaps[index - 1]);
  }
  const negative = new Map([[0, FOUNDATION_JDN]]);
  let position = FOUNDATION_JDN;
  for (let ordinal = 1; ordinal <= negativeGaps.length; ordinal += 1) {
    position -= BigInt(negativeGaps[ordinal - 1]);
    negative.set(-ordinal, position);
  }
  return { positive, negative };
}

function positionAt(index, maps) {
  if (index >= 0) {
    if (index >= maps.positive.length) throw new Error(`positive index ${index} not generated`);
    return maps.positive[index];
  }
  const value = maps.negative.get(index);
  if (value === undefined) throw new Error(`negative index ${index} not generated`);
  return value;
}

function workerGateRange(start, end) {
  const oracle = new ReferenceOracle();
  const values = new Array(Math.abs(end - start) + 1);
  const step = start <= end ? 1 : -1;
  let cursor = start;
  for (let offset = 0; offset < values.length; offset += 1, cursor += step) {
    values[offset] = Number(oracle.gateGap(cursor).gap);
  }
  return values;
}

async function parallelGaps(indices) {
  const workers = Math.min(5, Math.max(1, availableParallelism()), indices.length);
  const sliceSize = Math.ceil(indices.length / workers);
  const slices = [];
  for (let worker = 0; worker < workers; worker += 1) {
    const slice = indices.slice(worker * sliceSize, Math.min(indices.length, (worker + 1) * sliceSize));
    if (slice.length === 0) continue;
    slices.push(new Promise((resolve, reject) => {
      const child = new Worker(fileURLToPath(import.meta.url), { workerData: { gateRange: [slice[0], slice.at(-1)] } });
      child.once("message", resolve);
      child.once("error", reject);
      child.once("exit", (code) => { if (code !== 0) reject(new Error(`gate generator worker exited ${code}`)); });
    }));
  }
  return (await Promise.all(slices)).flat();
}

async function derive() {
  await assertNormativeSource();
  const oracle = new ReferenceOracle();
  const negativeCount = Math.abs(Math.min(...FAST_INDICES, ...EXTENDED_INDICES, -2048));
  const [positiveGaps, negativeGaps] = await Promise.all([
    parallelGaps(Array.from({ length: POSITIVE_COUNT }, (_, zero) => zero + 1)),
    parallelGaps(Array.from({ length: negativeCount }, (_, zero) => -(zero + 1))),
  ]);
  const maps = positionsFromGaps(positiveGaps, negativeGaps);

  // Independent gap spot-checks call the clear reference directly rather than
  // trusting the generated arrays or any committed fixture/checkpoint. Full positions
  // are then accumulated solely from those reference-derived gaps.
  for (const index of [-2048, -1024, -20, -1, 1, 20, 1024, 2048, 40000]) {
    const direct = oracle.gateGap(index).gap;
    const generated = BigInt(index > 0 ? positiveGaps[index - 1] : negativeGaps[-index - 1]);
    if (direct !== generated) throw new Error(`reference/generator gap mismatch at ${index}: ${direct} != ${generated}`);
  }

  const fast = FAST_INDICES.map((index) => [index, positionAt(index, maps)]);
  const extended = EXTENDED_INDICES.map((index) => [index, positionAt(index, maps)]);
  const payload = encodeGaps(positiveGaps);
  const referenceSha256 = sha256(await readFile(REFERENCE_PATH));
  const generatorSha256 = sha256(await readFile(fileURLToPath(import.meta.url)));
  const gapText = positiveGaps.join(",");
  return {
    positiveGaps,
    negativeGaps,
    maps,
    fast,
    extended,
    payload,
    metadata: {
      canonicalId: CANONICAL_ID,
      format: FORMAT,
      normativeSourceSha256: SOURCE_SHA256,
      referenceSha256,
      generatorSha256,
      positiveEntryCount: POSITIVE_COUNT + 1,
      positiveGapCount: POSITIVE_COUNT,
      foundationJdn: FOUNDATION_JDN.toString(),
      firstGateJdn: maps.positive[1].toString(),
      lastGateJdn: maps.positive.at(-1).toString(),
      gapDatasetSha256: sha256(Buffer.from(gapText, "utf8")),
      encodedPayloadSha256: sha256(payload),
      decodedFNV32: fnv32Gaps(positiveGaps),
      encodedByteLength: payload.length,
      fastCheckpointCount: fast.length,
      extendedCheckpointCount: extended.length,
    },
  };
}

function renderShadowModule(result) {
  const base64 = result.payload.toString("base64");
  const lines = base64.match(/.{1,100}/g) ?? [];
  return `// Generated by scripts/regenerate-gate-artifacts.mjs from the independent Scroll reference.\n` +
    `// Do not edit the payload by hand.  The old sealed gate blob remains present behind the detour.\n` +
    `export const GATE_SHADOW_META = Object.freeze(${JSON.stringify(result.metadata, null, 2)});\n\n` +
    `export const GATE_SHADOW_PAYLOAD = [\n${lines.map((line) => `  ${JSON.stringify(line)},`).join("\n")}\n].join("");\n`;
}

function renderFastBlock(entries, declaration = "const GATE_CHECKPOINTS = Object.freeze([") {
  const pairs = entries.map(([index, position]) => `Object.freeze([${index}, ${position}n])`);
  const rows = chunk(pairs, 2).map((row) => `  ${row.join(", ")},`).join("\n");
  return `${declaration}\n${rows}\n]);`;
}

function renderExpectedFast(entries) {
  const pairs = entries.map(([index, position]) => `[${index}, ${position}n]`);
  return `const EXPECTED_GATE_CHECKPOINTS = Object.freeze([\n${chunk(pairs, 3).map((row) => `  ${row.join(", ")},`).join("\n")}\n]);`;
}

function renderPython(entries) {
  const pairs = entries.map(([index, position]) => `(${index}, ${position})`);
  return `GATE_CHECKPOINTS: tuple[tuple[int, int], ...] = (\n${chunk(pairs, 3).map((row) => `    ${row.join(", ")},`).join("\n")}\n)`;
}

function renderCpp(entries) {
  const pairs = entries.map(([index, position]) => `{${index}, ${position}}`);
  return `constexpr std::array<std::pair<int, std::int64_t>, ${entries.length}> kGateCheckpoints = {{\n${chunk(pairs, 3).map((row) => `    ${row.join(", ")},`).join("\n")}\n}};`;
}

function renderC(entries) {
  const pairs = entries.map(([index, position]) => `{${index}, ${position}}`);
  return `static const GateEntry STATIC_GATE_CHECKPOINTS[] = {\n${chunk(pairs, 3).map((row) => `    ${row.join(", ")},`).join("\n")}\n};`;
}

function renderJava(entries) {
  const pairs = entries.map(([index, position]) => `{${index}, ${position}}`);
  return `private static final long[][] CHECKPOINT_DATA = {\n${chunk(pairs, 3).map((row) => `        ${row.join(", ")},`).join("\n")}\n    };`;
}

function renderRuby(entries) {
  const pairs = entries.map(([index, position]) => `[${index}, ${index === 0 ? "FOUNDATION_JDN" : position}]`);
  return `GATE_CHECKPOINTS = [\n${chunk(pairs, 3).map((row) => `    ${row.join(", ")},`).join("\n")}\n  ].freeze`;
}

function renderCobol(entries) {
  const lines = ["INIT-CHECKPOINTS."];
  entries.forEach(([index, position], zero) => {
    lines.push(`    MOVE ${index} TO CP-INDEX(${zero + 1})`);
    lines.push(`    MOVE ${position} TO CP-JDN(${zero + 1})`);
  });
  return lines.join("\n");
}

function replaceOne(text, regex, replacement, label) {
  const matches = text.match(regex);
  if (!matches) throw new Error(`cannot locate ${label}`);
  return text.replace(regex, replacement);
}

async function expectedFiles(result) {
  const outputs = new Map();
  outputs.set("browser/generated/pastafari-gate-shadow.js", renderShadowModule(result));
  outputs.set("browser/generated/pastafari-gate-shadow.manifest.json", `${JSON.stringify({ ...result.metadata, generator: "scripts/regenerate-gate-artifacts.mjs", clearReference: "verification/reference-oracle/reference.mjs", historicalGateDataUsedForValues: false }, null, 2)}\n`);

  for (const relative of ["browser/pastafari-calendar-fast.js", "docs/engine/pastafari-calendar-fast.js"]) {
    const source = await readFile(path.join(ROOT, relative), "utf8");
    const updated = replaceOne(
      source,
      /const GATE_CHECKPOINTS = Object\.freeze\(\[\n[\s\S]*?\n\]\);/u,
      renderFastBlock(result.fast),
      `${relative} checkpoint block`,
    ).replace(
      "// Normative final-stir detour: orderNumber selects the permutation; raw bowlSum enters u. Gate checkpoints remain stale until their dedicated rebuild.",
      "// Normative final-stir detour: orderNumber selects the permutation; raw bowlSum enters u. Gate checkpoints below are generated from the same normative source.",
    );
    outputs.set(relative, updated);
  }

  {
    const relative = "test/fast-compatibility.test.js";
    let source = await readFile(path.join(ROOT, relative), "utf8");
    source = source.replace(/const FIRST_CHECKPOINT_JDN = -?\d+n;/u, `const FIRST_CHECKPOINT_JDN = ${result.fast[0][1]}n;`);
    source = source.replace(/const LAST_CHECKPOINT_JDN = -?\d+n;/u, `const LAST_CHECKPOINT_JDN = ${result.fast.at(-1)[1]}n;`);
    source = replaceOne(source, /const EXPECTED_GATE_CHECKPOINTS = Object\.freeze\(\[\n[\s\S]*?\n\]\);/u, renderExpectedFast(result.fast), "fast expected checkpoints");
    outputs.set(relative, source);
  }

  const tableTargets = [
    ["implementations/python/pastafari_calendar/core.py", /GATE_CHECKPOINTS: tuple\[tuple\[int, int\], \.\.\.\] = \(\n[\s\S]*?\n\)/u, renderPython(result.extended)],
    ["implementations/cpp/src/calendar.cpp", /constexpr std::array<std::pair<int, std::int64_t>, 75> kGateCheckpoints = \{\{\n[\s\S]*?\n\}\};/u, renderCpp(result.extended)],
    ["implementations/c/src/gate_checkpoints.h", /static const GateEntry STATIC_GATE_CHECKPOINTS\[\] = \{\n[\s\S]*?\n\};/u, renderC(result.extended)],
    ["implementations/java/src/main/java/org/appointedtimes/PastafariCalendar.java", /private static final long\[\]\[\] CHECKPOINT_DATA = \{\n[\s\S]*?\n    \};/u, renderJava(result.extended)],
    ["implementations/ruby/pastafari_calendar.rb", /GATE_CHECKPOINTS = \[\n[\s\S]*?\n  \]\.freeze/u, renderRuby(result.extended)],
  ];
  for (const [relative, regex, blockText] of tableTargets) {
    const source = await readFile(path.join(ROOT, relative), "utf8");
    outputs.set(relative, replaceOne(source, regex, blockText, `${relative} extended checkpoints`));
  }

  for (const relative of ["implementations/cobol/pastafari-engine.cob", "implementations/cobol/src/pastafari-engine.cob"]) {
    const source = await readFile(path.join(ROOT, relative), "utf8");
    outputs.set(relative, replaceOne(source, /INIT-CHECKPOINTS\.\n[\s\S]*?(?=\n    PERFORM VARYING WS-I FROM 1 BY 1 UNTIL WS-I > PF-CACHE-SIZE)/u, renderCobol(result.fast), `${relative} COBOL checkpoints`));
  }

  return outputs;
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.size > 1 || (![...args].every((arg) => arg === "--write" || arg === "--check"))) {
    throw new Error("usage: node scripts/regenerate-gate-artifacts.mjs [--write|--check]");
  }
  const mode = args.has("--write") ? "write" : "check";
  const started = Date.now();
  const result = await derive();
  const outputs = await expectedFiles(result);
  const drift = [];

  for (const [relative, expected] of outputs) {
    const target = path.join(ROOT, relative);
    let current = null;
    try { current = await readFile(target, "utf8"); } catch (error) { if (error?.code !== "ENOENT") throw error; }
    if (current !== expected) {
      drift.push(relative);
      if (mode === "write") await writeFile(target, expected, "utf8");
    }
  }

  const report = {
    mode,
    canonicalId: CANONICAL_ID,
    positiveGapCount: result.positiveGaps.length,
    negativeGapCount: result.negativeGaps.length,
    fastCheckpointCount: result.fast.length,
    extendedCheckpointCount: result.extended.length,
    firstGateJdn: result.metadata.firstGateJdn,
    lastGateJdn: result.metadata.lastGateJdn,
    gapDatasetSha256: result.metadata.gapDatasetSha256,
    encodedPayloadSha256: result.metadata.encodedPayloadSha256,
    drift,
    elapsedMs: Date.now() - started,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (mode === "check" && drift.length) process.exitCode = 1;
}

if (!isMainThread && workerData?.gateRange) {
  const [start, end] = workerData.gateRange;
  parentPort.postMessage(workerGateRange(start, end));
} else {
  main().catch((error) => {
    console.error(error?.stack ?? error);
    process.exitCode = 1;
  });
}
