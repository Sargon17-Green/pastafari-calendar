#!/usr/bin/env node
"use strict";

// Update 17 clean normative corpus generator.
// IMPORTANT: this file imports only independent reference-side modules and reads
// source/provenance files. It never imports authoritative/fast production code
// and never reads an old expected/vector/golden corpus to create expected data.
import { createHash } from "node:crypto";
import { execFileSync, spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FOUNDATION_JDN,
  GREAT_NUMBER,
  MAX_YEAR_DAYS,
  ReferenceCalendar,
  canonicalCounters,
  chooseUniform,
  gateGap,
  monthInterleavingCount,
  responseDescriptor,
  sauce,
  serializeBigInts,
} from "../reference-oracle/reference.mjs";
import {
  enumerateMonthWeavings,
  referenceCount as exhaustiveWeaveCount,
  referenceRank as exhaustiveWeaveRank,
  referenceUnrank as exhaustiveWeaveUnrank,
} from "../update14/month-weaving-reference.mjs";
import { referenceJdnRepresentations } from "./external-calendar-reference.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DEFAULT_OUT = path.join(ROOT, "verification/update17/generated");
const SCROLL = "sources/מגילת העיתים.md";
const REFERENCE = "verification/reference-oracle/reference.mjs";
const GENERATOR = "verification/update17/generate-canonical-evidence.mjs";
const GATE_WORKER = "verification/update17/gate-batch-worker.mjs";
const GATE_CACHE_BUILDER = "verification/update17/build-ephemeral-gate-cache.mjs";
const ANCHOR_WORKER = "verification/update17/anchor-evidence-worker.mjs";
const SCHEMA_VERSION = 1;
const SOURCE_BASELINE_COMMIT = "482fb6cc0f11ef0c988b5c1934afbe722b3ac9f7";
const TABLETS_JDN = FOUNDATION_JDN + 14_777_149n;
const MODERN_SAMPLE_JDN = 2_461_259n;
const SEED = 0x17c0ffee;
const GATE_RANDOM_SEED = 0x5778b017;

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}
async function sha256File(rel) {
  return sha256Bytes(await readFile(path.join(ROOT, rel)));
}
function canonicalize(value) {
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("non-finite number in canonical JSON");
    return Object.is(value, -0) ? 0 : value;
  }
  if (typeof value === "string") return value.normalize("NFC");
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      const item = value[key];
      if (item !== undefined) out[key.normalize("NFC")] = canonicalize(item);
    }
    return out;
  }
  return value;
}
function canonicalJson(value) {
  return `${JSON.stringify(canonicalize(value), null, 2)}\n`;
}
function xorshift32(seed) {
  let state = seed >>> 0;
  if (state === 0) state = 0x6d2b79f5;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state;
  };
}
function uniformInt(next, min, max) {
  return min + (next() % (max - min + 1));
}

function runJsonChild(args, { timeoutMs = 120_000, attempts = 3 } = {}) {
  return new Promise(async (resolve, reject) => {
    let lastError = null;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const value = await new Promise((innerResolve, innerReject) => {
          const child = spawn(process.execPath, args, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
          let stdout = "";
          let stderr = "";
          child.stdout.setEncoding("utf8");
          child.stderr.setEncoding("utf8");
          child.stdout.on("data", (chunk) => { stdout += chunk; });
          child.stderr.on("data", (chunk) => { stderr += chunk; });
          const timer = setTimeout(() => child.kill("SIGKILL"), timeoutMs);
          child.on("error", (error) => { clearTimeout(timer); innerReject(error); });
          child.on("close", (code, signal) => {
            clearTimeout(timer);
            if (code !== 0) {
              innerReject(new Error(`child failed code=${code} signal=${signal || "none"}: ${stderr}`));
              return;
            }
            try { innerResolve(JSON.parse(stdout)); }
            catch (error) { innerReject(new Error(`invalid child JSON: ${error.message}\n${stdout}\n${stderr}`)); }
          });
        });
        resolve(value);
        return;
      } catch (error) {
        lastError = error;
        if (attempt < attempts) console.error(`[update17] child retry attempt=${attempt + 1}: ${error.message}`);
      }
    }
    reject(lastError);
  });
}

async function pooled(items, concurrency, fn) {
  const output = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      output[index] = await fn(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return output;
}
function stableCaseId(prefix, input) {
  const digest = sha256Bytes(Buffer.from(canonicalJson(input))).slice(0, 12);
  return `${prefix}-${digest}`;
}

async function main() {
  const outArg = process.argv.find((arg) => arg.startsWith("--out="));
  const gateCacheArg = process.argv.find((arg) => arg.startsWith("--gate-cache="));
  const outDir = outArg ? path.resolve(ROOT, outArg.slice(6)) : DEFAULT_OUT;
  const clean = !process.argv.includes("--no-clean");
  if (clean) await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const scrollHash = await sha256File(SCROLL);
  const referenceHash = await sha256File(REFERENCE);
  const generatorComponentHashes = Object.freeze({
    generator: await sha256File(GENERATOR),
    gateBatchWorker: await sha256File(GATE_WORKER),
    gateCacheBuilder: await sha256File(GATE_CACHE_BUILDER),
    anchorEvidenceWorker: await sha256File(ANCHOR_WORKER),
    externalCalendarReference: await sha256File("verification/update17/external-calendar-reference.mjs"),
    chineseReference: await sha256File("verification/update17/chinese-reference.mjs"),
    monthWeavingReference: await sha256File("verification/update14/month-weaving-reference.mjs"),
    negativeCalendarReference: await sha256File("verification/update9/proleptic-negative-year-reference.mjs"),
    vikramaReference: await sha256File("verification/update11/vikrama-reference.mjs"),
    kokiReference: await sha256File("verification/update12/reference-koki.mjs"),
  });
  const generatorHash = sha256Bytes(Buffer.from(canonicalJson(generatorComponentHashes)));
  const meta = Object.freeze({
    schemaVersion: SCHEMA_VERSION,
    sourceBaselineCommit: SOURCE_BASELINE_COMMIT,
    packageVersion: pkg.version,
    scrollPath: SCROLL,
    scrollHash,
    referencePath: REFERENCE,
    referenceHash,
    generatorPath: GENERATOR,
    generatorHash,
    generatorComponentHashes,
    canonicalSerialization: "UTF-8 NFC, LF, sorted object keys, decimal BigInt strings, -0 normalized to 0",
  });

  const written = [];
  async function emit(name, role, payload, inputDomain, caseCount) {
    const document = { meta: { ...meta, role, inputDomain, caseCount }, ...payload };
    const text = canonicalJson(document);
    const file = path.join(outDir, name);
    await writeFile(file, text, "utf8");
    const hash = sha256Bytes(Buffer.from(text));
    written.push({ artifact: name, role, schemaVersion: SCHEMA_VERSION, scrollHash, referenceHash, generatorHash, caseCount, inputDomain, deterministicRebuildHash: hash, status: "generated" });
    return document;
  }

  // A. Sauce vectors. Expected values come directly from the independent reference.
  const sauceInputs = [
    { label: "foundation-same", c: FOUNDATION_JDN, t: FOUNDATION_JDN },
    { label: "foundation-before", c: FOUNDATION_JDN, t: FOUNDATION_JDN - 1n },
    { label: "foundation-after", c: FOUNDATION_JDN, t: FOUNDATION_JDN + 1n },
    { label: "negative-linear", c: -20_000_000n, t: -19_999_137n },
    { label: "positive-linear", c: 2_461_259n, t: 2_462_256n },
    { label: "cross-sign-sauce-only", c: -123_456n, t: 987_654n },
  ];
  const sauceVectors = [];
  for (const entry of sauceInputs) {
    const detailed = sauce(entry.c, entry.t, { detail: "sauce" });
    const gateChoice = chooseUniform(detailed, 1, 1n, 922n);
    const wideChoice = chooseUniform(detailed, 1, 1n, GREAT_NUMBER + 12_345n);
    const postStirs = detailed.postStirs.map((round) => ({
      round: round.round,
      bowlSum: round.bowlSum,
      orderNumber: round.orderNumber,
      permutation: round.permutation,
      stirs: round.stirs.map((stir) => ({ place: stir.place, bowl: stir.bowl, previousBowl: stir.previousBowl, nextBowl: stir.nextBowl, u: stir.u, output: stir.output })),
      bowlsAfter: round.bowlsAfter,
    }));
    sauceVectors.push({
      id: `sauce-${entry.label}`,
      category: "A-normative-conformance",
      input: { calculationJdn: entry.c, targetJdn: entry.t },
      expected: {
        counters: detailed.counters,
        initialBowls: detailed.initialBowls,
        final12Stirs: postStirs,
        finalBowls: detailed.final.bowls,
        lastDropPermutation: detailed.final.lastDropPermutation,
        responseBowl1Seal1: responseDescriptor(detailed, 1, 1n),
        gateChoice922: gateChoice,
        resultingGap: gateChoice.choice + 41n,
        wideChoice: {
          count: GREAT_NUMBER + 12_345n,
          mode: wideChoice.mode,
          width: wideChoice.width,
          space: wideChoice.space,
          digits: wideChoice.digits,
          wideFirst: wideChoice.wideFirst,
          acceptanceLimit: wideChoice.acceptanceLimit,
          acceptedResponse: wideChoice.acceptedResponse,
          discarded: wideChoice.discarded,
          choice: wideChoice.choice,
        },
      },
      traceNote: "Final 12 stirs retain both raw bowlSum and kept orderNumber. The current scroll/reference contains no cryptographic root/key stage, so none is fabricated here.",
    });
  }
  await emit("normative-sauce-vectors.json", "A-normative-conformance", { vectors: sauceVectors }, "six fixed calculation/target pairs spanning same/before/after, negative, positive and cross-sign sauce inputs", sauceVectors.length);

  // Gate table is reference-derived only. To avoid long-lived-runtime allocation/throttling
  // effects, compute deterministic chunks in fresh worker processes and assemble them in-memory.
  const gateMinimum = -32_768;
  const gateMaximum = 40_000;
  const gateGaps = new Map();
  function runGateChunk(start, end) {
    const text = execFileSync(process.execPath, [path.join(ROOT, GATE_WORKER), String(start), String(end)], {
      cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, timeout: 120_000,
    });
    for (const [index, gap] of JSON.parse(text)) gateGaps.set(index, BigInt(gap));
  }
  if (gateCacheArg) {
    const cachePath = path.resolve(ROOT, gateCacheArg.slice("--gate-cache=".length));
    const cache = JSON.parse(await readFile(cachePath, "utf8"));
    if (cache.minimum !== gateMinimum || cache.maximum !== gateMaximum || !Array.isArray(cache.gaps)) {
      throw new Error("invalid Update17 ephemeral gate cache domain");
    }
    for (const [index, gap] of cache.gaps) gateGaps.set(Number(index), BigInt(gap));
    // Incremental/dev cache is never trusted blindly: recompute fixed witnesses from
    // the independent reference. The default canonical mode below reads no cache.
    for (const index of [-32768, -20001, -1024, -1, 1, 1024, 20001, 32768, 40000]) {
      if (gateGaps.get(index) !== gateGap(index).gap) throw new Error(`ephemeral gate cache witness mismatch at ${index}`);
    }
  } else {
    // Clean canonical mode builds a brand-new ephemeral cache only from the
    // independent reference worker.  It never reads a previous corpus.  The
    // cache is a process-orchestration aid, not authority, and is deleted
    // before the generator exits.
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "pastafari-update17-gates-"));
    const cachePath = path.join(tempDir, "fresh-gates.json");
    try {
      execFileSync(process.execPath, [path.join(ROOT, GATE_CACHE_BUILDER), `--out=${cachePath}`, "--parallel=4"], {
        cwd: ROOT, stdio: "inherit", timeout: 600_000,
      });
      const cache = JSON.parse(await readFile(cachePath, "utf8"));
      if (cache.minimum !== gateMinimum || cache.maximum !== gateMaximum || !Array.isArray(cache.gaps)) {
        throw new Error("fresh Update17 gate cache domain mismatch");
      }
      for (const [index, gap] of cache.gaps) gateGaps.set(Number(index), BigInt(gap));
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  }
  if (gateGaps.size !== gateMaximum - gateMinimum) throw new Error(`incomplete gate gap domain: ${gateGaps.size}`);
  const gatePositions = new Map([[0, FOUNDATION_JDN]]);
  let running = FOUNDATION_JDN;
  for (let index = -1; index >= gateMinimum; index -= 1) {
    running -= gateGaps.get(index);
    gatePositions.set(index, running);
  }
  running = FOUNDATION_JDN;
  for (let index = 1; index <= gateMaximum; index += 1) {
    running += gateGaps.get(index);
    gatePositions.set(index, running);
  }
  class SeededReferenceGateTable {
    constructor() { this.minimum = gateMinimum; this.maximum = gateMaximum; }
    position(index) {
      const value = gatePositions.get(index);
      if (value === undefined) throw new RangeError(`Update17 clean gate table missing index ${index}`);
      return value;
    }
    containingInterval(jdnValue) {
      const day = BigInt(jdnValue);
      let lo = gateMinimum;
      let hi = gateMaximum - 1;
      while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (this.position(mid) < day) lo = mid; else hi = mid - 1;
      }
      return lo;
    }
  }
  const gateTable = new SeededReferenceGateTable();
  const gateIndices = [-32768, -10000, -2048, -1024, -2, -1, 0, 1, 2, 1024, 2048, 10000, 32768, 40000];
  const gateRandom = xorshift32(GATE_RANDOM_SEED);
  for (let i = 0; i < 12; i += 1) gateIndices.push(uniformInt(gateRandom, -32768, 40000));
  const uniqueGateIndices = [...new Set(gateIndices)].sort((a, b) => a - b);
  const gateVectors = uniqueGateIndices.map((index) => {
    const positionJdn = gateTable.position(index);
    const gap = index === 0 ? null : gateGaps.get(index);
    return {
      id: `gate-${index >= 0 ? "p" : "n"}${Math.abs(index)}`,
      category: "A-normative-conformance",
      input: { gateIndex: index },
      expected: { positionJdn, gap },
      boundaryClass: [-32768, 40000].includes(index) ? "precomputed-range-boundary" : Math.abs(index) <= 2 ? "foundation-neighbor" : "sample",
    };
  });
  await emit("normative-gate-vectors.json", "A-normative-conformance", {
    generation: { randomSeed: GATE_RANDOM_SEED, generatedRange: { minimumGateIndex: -32768, maximumGateIndex: 40000 } },
    vectors: gateVectors,
  }, "cumulative gate positions and gaps across -32768..40000 including exact production checkpoint boundaries and seeded random positions", gateVectors.length);

  // Re-discover 5779/5780/5781 raw candidates rather than copying historic JDNs.
  const wanted = new Map([[5779n, null], [5780n, null], [5781n, null]]);
  const searchMin = -32_768;
  const searchMax = 40_000;
  for (let open = searchMin; open < searchMax && [...wanted.values()].some((v) => v === null); open += 1) {
    const opening = gateTable.position(open);
    for (let close = open + 6; close <= Math.min(searchMax, open + 20); close += 1) {
      const length = gateTable.position(close) - opening;
      if (length > 5_781n) break;
      if (wanted.has(length) && wanted.get(length) === null) {
        wanted.set(length, { openGateIndex: open, closeGateIndex: close, openingGate: opening, closingGate: gateTable.position(close), rawYearLength: length, gapCount: close - open, normativeAccepted: length <= MAX_YEAR_DAYS });
      }
    }
  }
  const ceilingRediscovery = [...wanted.entries()].map(([yearLength, found]) => ({ yearLength, status: found ? "found" : "not found in searched domain", searchedGateIndexRange: [searchMin, searchMax], candidate: found }));

  const calculations = [
    { id: "foundation", jdn: FOUNDATION_JDN, domain: "Foundation anchor" },
    { id: "tablets", jdn: TABLETS_JDN, domain: "Tablets/delivery anchor" },
    { id: "modern", jdn: MODERN_SAMPLE_JDN, domain: "modern positive JDN" },
    { id: "deep-past", jdn: FOUNDATION_JDN - 5_000_000n, domain: "~13.7k years before Foundation" },
    { id: "deep-future", jdn: FOUNDATION_JDN + 5_000_000n, domain: "~13.7k years after Foundation" },
  ];
  const yearVectors = [];
  const structureVectors = [];
  const finalVectors = [];
  const random = xorshift32(SEED);

  // Each anchor is evaluated in a fresh reference-only process.  This prevents
  // allocation/history effects from making later anchors pathologically slow
  // while preserving the exact same independent reference semantics.
  const anchorCacheDir = await mkdtemp(path.join(os.tmpdir(), "pastafari-update17-anchor-cache-"));
  const anchorCachePath = path.join(anchorCacheDir, "gates.json");
  try {
    const cacheDocument = {
      schema: "pastafari-update17-ephemeral-gate-cache-v1",
      minimum: gateMinimum,
      maximum: gateMaximum,
      gaps: [...gateGaps.entries()].sort((a, b) => a[0] - b[0]).map(([index, gap]) => [index, gap.toString()]),
    };
    await writeFile(anchorCachePath, `${JSON.stringify(cacheDocument)}\n`, "utf8");
    const anchorJobs = calculations.map((calc) => ({
      calc,
      seededOffsets: [uniformInt(random, -5000, -1000), uniformInt(random, 1000, 5000)],
    }));
    const anchorResults = await pooled(anchorJobs, 3, async ({ calc, seededOffsets }) => {
      console.error(`[update17] reference anchor worker ${calc.id}`);
      return runJsonChild([
        path.join(ROOT, ANCHOR_WORKER),
        anchorCachePath, calc.id, calc.jdn.toString(), calc.domain,
        String(seededOffsets[0]), String(seededOffsets[1]),
      ], { timeoutMs: 120_000, attempts: 4 });
    });
    for (let anchorIndex = 0; anchorIndex < calculations.length; anchorIndex += 1) {
      const calc = calculations[anchorIndex];
      const result = anchorResults[anchorIndex];
      yearVectors.push({
        id: `year5000-${calc.id}`,
        category: "A-normative-conformance",
        input: { calculationJdn: calc.jdn, domain: calc.domain },
        expected: result.yearExpected,
      });
      structureVectors.push({
        id: `structure-year5000-${calc.id}`,
        category: "A-normative-conformance",
        input: { calculationJdn: calc.jdn, year: result.structureExpected.year.number, yearStartJdn: result.structureExpected.year.startJdn },
        expected: result.structureExpected,
      });
      for (const entry of result.finalEntries) {
        const input = { calculationJdn: calc.jdn, targetJdn: BigInt(entry.targetJdn) };
        finalVectors.push({
          id: stableCaseId(`final-${calc.id}-${entry.tag}`, input),
          category: "A-normative-conformance",
          stratum: entry.tag,
          calculationDomain: calc.domain,
          input,
          expected: entry.expected,
        });
      }
    }
  } finally {
    await rm(anchorCacheDir, { recursive: true, force: true });
  }

  console.error("[update17] anchors assembled");

  await emit("normative-year-vectors.json", "A-normative-conformance", {
    ceiling: { normativeMaximumYearDays: MAX_YEAR_DAYS, rediscovery: ceilingRediscovery },
    vectors: yearVectors,
  }, "five calculation anchors; complete year-5000 candidate traces; 5779/5780/5781 rediscovery across gate indices -32768..40000", yearVectors.length + ceilingRediscovery.length);

  console.error("[update17] year vectors emitted");
  await emit("normative-structure-vectors.json", "A-normative-conformance", {
    vectors: structureVectors,
  }, "year-5000 cutlet/month structures for Foundation, Tablets, modern and deep proleptic calculation anchors", structureVectors.length);

  console.error("[update17] structure vectors emitted");
  await emit("normative-final-tuples.json", "A-normative-conformance", {
    distribution: {
      seed: SEED,
      calculationAnchors: calculations,
      fixedStrataPerAnchor: ["same-day", "before-1", "after-1", "before-137", "after-137", "year-start", "year-end"],
      crossYearBoundaryAnchors: ["foundation", "tablets", "modern"],
      crossYearBoundaryStrata: ["previous-year-boundary", "next-year-boundary"],
      seededStrataPerAnchor: ["seeded-before", "seeded-after"],
    },
    vectors: finalVectors,
  }, "51 stratified calculation/target pairs across same/before/after, year boundaries, Foundation, Tablets, modern positive JDN and ~±13.7k-year absolute anchors; explicit cross-year neighbor cases retained on the three principal anchors", finalVectors.length);

  console.error("[update17] final tuples emitted");

  // B. Exhaustive independent MonthWeaving evidence in small tractable domains.
  const weavingDomains = [[1], [1,1], [2,2], [2,3], [3,2], [2,2,2], [3,2,2], [4,4]];
  const weavingEvidence = [];
  for (const lengths of weavingDomains) {
    const all = enumerateMonthWeavings(lengths);
    const count = exhaustiveWeaveCount(lengths);
    const checkpoints = [...new Set([0, Math.floor(all.length / 2), Math.max(0, all.length - 1)])];
    const roundTrips = checkpoints.map((index) => {
      const weaving = exhaustiveWeaveUnrank(lengths, BigInt(index));
      const rank = exhaustiveWeaveRank(lengths, weaving);
      return { rank, weaving, roundTripRank: rank };
    });
    weavingEvidence.push({
      id: `month-weaving-${lengths.join("x")}`,
      category: "B-independent-hand-property-discriminator",
      input: { lengths },
      expected: { count, first: all[0], last: all.at(-1), roundTrips },
      independentMethod: "literal multiset enumeration, appearance-order filter, lexicographic sort",
    });
  }
  console.error("[update17] weaving evidence assembled");
  await emit("month-weaving-small-domain.json", "B-independent-hand-property-discriminator", { vectors: weavingEvidence }, "eight exhaustively tractable abstract MonthWeaving domains, including count/rank/unrank round trips", weavingEvidence.length);

  // B. Hand/property discriminators that are not generated by implementation under test.
  const foundationSauce = sauce(FOUNDATION_JDN, FOUNDATION_JDN, { detail: "sauce" });
  const stir1 = foundationSauce.postStirs[0];
  const firstStir = stir1.stirs[0];
  const old = stir1.bowlsBefore;
  const order = stir1.permutation;
  const place = 0;
  const bowl = order[place] - 1;
  const prev = order[(place + 5) % 6] - 1;
  const next = order[(place + 1) % 6] - 1;
  const wrongU = old[bowl] + 3n * old[prev] + 5n * old[next] + stir1.orderNumber + 1n + 1n;
  const handDiscriminators = [
    {
      id: "final-stir-bowlSum-vs-orderNumber",
      category: "B-independent-hand-property-discriminator",
      input: { calculationJdn: FOUNDATION_JDN, targetJdn: FOUNDATION_JDN, round: 1, place: 1 },
      expected: { bowlSum: stir1.bowlSum, orderNumber: stir1.orderNumber, normativeU: firstStir.u, wrongOrderNumberU: wrongU, changesU: wrongU !== firstStir.u },
      derivation: "direct substitution into scroll final-stir formula; orderNumber selects permutation only",
    },
    ...ceilingRediscovery.filter((row) => row.status === "found").map((row) => ({
      id: `year-ceiling-reject-${row.yearLength}`,
      category: "B-independent-hand-property-discriminator",
      input: row.candidate,
      expected: { acceptedByNormativeCandidateSet: false, maximum: MAX_YEAR_DAYS },
      derivation: "raw cumulative gate length independently rediscovered, then direct 252..5778 rule",
    })),
    {
      id: "month-weaving-lexicographic-order-2x2",
      category: "B-independent-hand-property-discriminator",
      input: { lengths: [2,2] },
      expected: { sequence: enumerateMonthWeavings([2,2]), count: exhaustiveWeaveCount([2,2]) },
      derivation: "literal enumeration, not dynamic counter",
    },
  ];
  console.error("[update17] hand discriminators assembled");
  await emit("hand-discriminators.json", "B-independent-hand-property-discriminator", { vectors: handDiscriminators }, "direct scroll formulas plus exhaustive small-domain properties", handDiscriminators.length);

  // Foundation package + external calendar independent references.
  console.error("[update17] hand discriminators emitted");
  const foundationRepresentations = referenceJdnRepresentations(FOUNDATION_JDN);
  const foundationExpectedFromScroll = {
    gregorian: { year: -41221n, month: 12, day: 22 },
    julian: { historicalYear: -41221n, month: 10, day: 28 },
    hebrew: { year: -37460n, month: 3, day: 19 },
    islamicCivil: { year: -43126n, month: 3, day: 27 },
    solarHijriArithmetic: { year: -41843n, month: 9, day: 18 },
    chinese: { cycle: -643, yearInCycle: 57, stem: 7, branch: 9, month: 1, leapMonth: false, day: 22 },
    vikrama: { year: -41162n, monthName: "Kārttika", leapMonth: false, tithi: 16, leapTithi: false },
    saka: { year: -41299n, month: 10, day: 1 },
    thaiBuddhist: { year: -40678n, month: 12, day: 22 },
    ethiopic: { year: -41227n, month: 3, day: 1 },
    coptic: { year: -41503n, month: 3, day: 1 },
    koki: { year: -40561n, month: 12, day: 22 },
    minguo: { year: -43132n, month: 12, day: 22 },
    bahaiWestern: { year: -43064n, month: 15, day: 11 },
    mayaLongCount: { baktun: -97n, katun: 6n, tun: 17n, uinal: 7n, kin: 11n },
  };
  function subsetMatches(actual, expected) {
    if (typeof expected === "bigint") return BigInt(actual) === expected;
    if (Array.isArray(expected)) return expected.length === actual.length && expected.every((v,i) => subsetMatches(actual[i],v));
    if (expected && typeof expected === "object") return Object.entries(expected).every(([k,v]) => actual && subsetMatches(actual[k],v));
    return actual === expected;
  }
  const foundationChecks = Object.entries(foundationExpectedFromScroll).map(([calendar, expected]) => ({ calendar, expected, actual: foundationRepresentations[calendar], match: subsetMatches(foundationRepresentations[calendar], expected) }));
  if (foundationChecks.some((row) => !row.match)) {
    throw new Error(`Foundation independent representation mismatch: ${canonicalJson(foundationChecks.filter((row) => !row.match))}`);
  }
  console.error("[update17] foundation representations checked");
  await emit("foundation-evidence.json", "B-independent-hand-property-discriminator", {
    foundationJdn: FOUNDATION_JDN,
    scrollAnchors: foundationExpectedFromScroll,
    independentReferenceRepresentations: foundationRepresentations,
    checks: foundationChecks,
    allRepresentationsPointToSameAbsoluteDay: true,
  }, "Foundation absolute day and all implemented normative external representations", foundationChecks.length);

  console.error("[update17] foundation evidence emitted");
  const externalJdns = [FOUNDATION_JDN, FOUNDATION_JDN - 1n, FOUNDATION_JDN + 1n, -13_000_000n, TABLETS_JDN, MODERN_SAMPLE_JDN];
  const externalVectors = externalJdns.map((jdn) => ({
    id: stableCaseId("external", { jdn }),
    category: "A-normative-conformance",
    input: { jdn },
    expected: referenceJdnRepresentations(jdn),
  }));
  console.error("[update17] external representations assembled");
  await emit("external-calendar-vectors.json", "A-normative-conformance", {
    policy: {
      normative: ["gregorian", "julian", "hebrew arithmetic", "islamic civil arithmetic", "solar-hijri arithmetic 2820", "Chinese source-locked deterministic", "Vikrama source-locked", "Saka", "Thai Buddhist arithmetic", "Ethiopic", "Coptic", "Kōki", "Minguo", "Bahá’í western arithmetic", "Maya Long Count GMT"],
      excludedHostBacked: ["Umm al-Qura", "Solar Hijri official/Intl Persian", "locale-dependent Japanese era display"],
    },
    vectors: externalVectors,
  }, "Foundation neighbors, ancient, Tablets and modern JDNs across every currently implemented normative external representation; host-backed APIs excluded", externalVectors.length);

  console.error("[update17] external vectors emitted");
  const coverage = {
    features: [
      { feature: "counters/sauce", referenceCoverage: "full", vectorCoverage: sauceVectors.length, boundaryCoverage: true, randomCoverage: false, handDerivedCoverage: true, status: "covered" },
      { feature: "final 12 stirs bowlSum/orderNumber", referenceCoverage: "full", vectorCoverage: sauceVectors.length, boundaryCoverage: true, randomCoverage: false, handDerivedCoverage: true, status: "covered" },
      { feature: "gates", referenceCoverage: "-32768..40000 cumulatively rebuilt", vectorCoverage: gateVectors.length, boundaryCoverage: true, randomCoverage: true, handDerivedCoverage: false, status: "covered" },
      { feature: "year candidates/5778", referenceCoverage: "full on selected calculations plus raw ceiling search", vectorCoverage: yearVectors.length, boundaryCoverage: true, randomCoverage: false, handDerivedCoverage: true, status: "covered" },
      { feature: "cutlets", referenceCoverage: "full", vectorCoverage: structureVectors.length, boundaryCoverage: true, randomCoverage: false, handDerivedCoverage: false, status: "covered" },
      { feature: "months", referenceCoverage: "full", vectorCoverage: structureVectors.length, boundaryCoverage: true, randomCoverage: false, handDerivedCoverage: true, status: "covered" },
      { feature: "MonthWeaving count/rank/unrank", referenceCoverage: "exhaustive small domains + full combinatorial unrank in calendar reference", vectorCoverage: weavingEvidence.length, boundaryCoverage: true, randomCoverage: false, handDerivedCoverage: true, status: "covered" },
      { feature: "final tuple", referenceCoverage: "full", vectorCoverage: finalVectors.length, boundaryCoverage: true, randomCoverage: true, handDerivedCoverage: false, status: "covered" },
      { feature: "external calendars", referenceCoverage: "all normative representations currently declared by Update13 boundary; host-backed excluded", vectorCoverage: externalVectors.length, boundaryCoverage: true, randomCoverage: false, handDerivedCoverage: true, status: "covered" },
      { feature: "cryptographic roots/keys", referenceCoverage: "not applicable to current scroll", vectorCoverage: 0, boundaryCoverage: false, randomCoverage: false, handDerivedCoverage: false, status: "NOT_IN_CURRENT_SCROLL" },
      { feature: "state/reentrancy/cache/random scenarios", referenceCoverage: "semantic expected supplied by final-tuple corpus; scenario execution is verifier-side", vectorCoverage: 0, boundaryCoverage: true, randomCoverage: true, handDerivedCoverage: false, status: "verifier-side" },
    ],
  };
  console.error("[update17] coverage assembled");
  await emit("coverage-report.json", "coverage-metadata", coverage, "Update17 acceptance coverage by semantic feature", coverage.features.length);

  console.error("[update17] coverage emitted");

  // Manifest is built after all payloads, and is itself canonical/deterministic.
  const manifest = {
    meta: { ...meta, role: "normative-evidence-manifest", caseCount: written.reduce((sum, row) => sum + row.caseCount, 0), inputDomain: "all generated Update17 evidence" },
    authorityChain: ["sources/מגילת העיתים.md", "verification/reference-oracle/reference.mjs and dedicated independent external references", "Update17 canonical evidence"],
    forbiddenExpectedSources: ["authoritative engine", "fast engine", "legacy generator", "legacy vectors", "majority vote", "Intl/ICU host data"],
    artifacts: written,
  };
  const manifestText = canonicalJson(manifest);
  await writeFile(path.join(outDir, "normative-evidence-manifest.json"), manifestText, "utf8");
  const manifestHash = sha256Bytes(Buffer.from(manifestText));
  const sumRows = [...written.map((row) => ({ name: row.artifact, hash: row.deterministicRebuildHash })), { name: "normative-evidence-manifest.json", hash: manifestHash }].sort((a,b) => a.name.localeCompare(b.name, "en"));
  await writeFile(path.join(outDir, "SHA256SUMS.txt"), `${sumRows.map((row) => `${row.hash}  ./${row.name}`).join("\n")}\n`, "utf8");

  console.log(canonicalJson({
    status: "GENERATED",
    outDir: path.relative(ROOT, outDir),
    scrollHash,
    referenceHash,
    generatorHash,
    artifactCount: written.length + 2,
    normativeFinalTupleCases: finalVectors.length,
    gateRangeGenerated: [gateTable.minimum, gateTable.maximum],
    ceilingRediscovery,
  }));
}


main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exitCode = 1;
});
