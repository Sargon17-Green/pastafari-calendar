import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import {
  FAST_IMPLEMENTATION_INFO,
  PastafariCalendar,
  SAME_AS_TARGET,
  findPastafariDate,
  getCutletView,
} from "../../../browser/pastafari-calendar-fast.js";

const SCRIPT_VERSION = "PASTAFARI-COBOL-COMPAT-1.0.0";
const here = dirname(fileURLToPath(import.meta.url));
const cobolDir = resolve(here, "..");
const repoRoot = resolve(cobolDir, "../..");
const buildDir = resolve(cobolDir, "build");
const batchExe = resolve(buildDir, `pastafari-batch${process.platform === "win32" ? ".exe" : ""}`);
const requestPath = resolve(buildDir, "cobol-validation-requests.txt");
const reportPath = resolve(buildDir, "cobol-validation-report.json");
const progressPath = resolve(buildDir, "cobol-validation-progress.log");
const fastPath = resolve(repoRoot, "browser/pastafari-calendar-fast.js");
const enginePath = resolve(cobolDir, "src/pastafari-engine.cob");
const runtimePath = resolve(cobolDir, "runtime/pastafari_bigint.c");
const runtimeHeaderPath = resolve(cobolDir, "runtime/pastafari_bigint.h");
const copybookPath = resolve(cobolDir, "copybook/pastafari-engine.cpy");
const batchSourcePath = resolve(cobolDir, "test/pastafari-batch.cob");
const validationScriptPath = fileURLToPath(import.meta.url);
const makefilePath = resolve(cobolDir, "Makefile");
const compatibilityTestPath = resolve(repoRoot, "test/fast-compatibility.test.js");

function envInt(name, fallback, min = 0) {
  if (process.env[name] === undefined) return fallback;
  const value = Number(process.env[name]);
  if (!Number.isSafeInteger(value) || value < min) {
    throw new RangeError(`${name} must be an integer >= ${min}.`);
  }
  return value;
}

const randomCases = envInt("PASTAFARI_COBOL_CASES", 10_000, 0);
const knownReverseCases = Math.min(
  envInt("PASTAFARI_COBOL_REVERSE_CASES", Math.min(1_000, randomCases), 0),
  randomCases,
);
const invalidReverseCases = Math.min(
  envInt("PASTAFARI_COBOL_INVALID_REVERSE_CASES", Math.min(200, knownReverseCases), 0),
  knownReverseCases,
);
const jsReverseCases = Math.min(
  envInt("PASTAFARI_COBOL_JS_REVERSE_CASES", Math.min(200, knownReverseCases), 0),
  knownReverseCases,
);
const selfExactCases = envInt("PASTAFARI_COBOL_SELF_CASES", 50, 0);
const selfRangeCases = envInt("PASTAFARI_COBOL_SELF_RANGE_CASES", 12, 0);
const selfRangeRadius = envInt("PASTAFARI_COBOL_SELF_RANGE_RADIUS", 5, 0);
const seedText = process.env.PASTAFARI_COBOL_SEED ?? "0x50A7FA81";
let rngState = Number(BigInt.asUintN(32, BigInt(seedText)));
if (rngState === 0) rngState = 0x50a7fa81;
const initialSeed = rngState >>> 0;
const startedAt = new Date();
const progressEvery = envInt("PASTAFARI_COBOL_PROGRESS_EVERY", 250, 1);
const reverseProgressEvery = envInt("PASTAFARI_COBOL_REVERSE_PROGRESS_EVERY", 25, 1);
const heartbeatSeconds = envInt("PASTAFARI_COBOL_HEARTBEAT_SECONDS", 15, 1);

mkdirSync(buildDir, { recursive: true });
writeFileSync(progressPath, "", "utf8");

function durationText(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h${String(minutes).padStart(2, "0")}m${String(seconds).padStart(2, "0")}s`;
  if (minutes > 0) return `${minutes}m${String(seconds).padStart(2, "0")}s`;
  return `${seconds}s`;
}

function progress(message) {
  const now = new Date();
  const line = `[${now.toISOString()} +${durationText(now.getTime() - startedAt.getTime())}] ${message}`;
  console.log(line);
  appendFileSync(progressPath, `${line}\n`, "utf8");
}

function progressPoint(done, total, every) {
  return done <= 5 || done === total || done % every === 0;
}

function progressCounter(phase, done, total, phaseStartedAt, extra = "") {
  const elapsedMs = Date.now() - phaseStartedAt;
  const rate = elapsedMs > 0 && done > 0 ? done / (elapsedMs / 1000) : 0;
  const remaining = total - done;
  const etaMs = rate > 0 ? (remaining / rate) * 1000 : null;
  progress(
    `[${phase}] ${done}/${total}`
    + ` (${total > 0 ? ((done / total) * 100).toFixed(1) : "100.0"}%)`
    + ` rate=${rate.toFixed(2)}/s`
    + `${etaMs === null ? "" : ` eta=${durationText(etaMs)}`}`
    + `${extra ? ` ${extra}` : ""}`,
  );
}

function nextU32() {
  let x = rngState >>> 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  rngState = x >>> 0;
  return rngState;
}

function randomInt(min, max) {
  const span = max - min + 1;
  return min + (nextU32() % span);
}

function randomBigInt(min, max) {
  const span = max - min + 1n;
  const hi = BigInt(nextU32());
  const lo = BigInt(nextU32());
  const value = (hi << 32n) | lo;
  return min + (value % span);
}

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}

function sameDate(a, b) {
  return String(a.year) === String(b.year)
    && a.cutletName === b.cutletName
    && Number(a.dayInCutlet) === Number(b.dayInCutlet)
    && a.monthName === b.monthName
    && Number(a.dayInMonth) === Number(b.dayInMonth);
}

async function sha256(path) {
  const bytes = await readFile(path);
  return createHash("sha256").update(bytes).digest("hex");
}

function toolVersion(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.error) return `unavailable: ${result.error.message}`;
  return `${result.stdout || result.stderr}`.trim();
}

function gitHead() {
  const result = spawnSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : null;
}

function gitStatus() {
  const result = spawnSync("git", ["status", "--porcelain=v1"], { cwd: repoRoot, encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim().split(/\r?\n/).filter(Boolean) : null;
}

async function checkpointPositions() {
  const source = await readFile(compatibilityTestPath, "utf8");
  const block = source.match(/const EXPECTED_GATE_CHECKPOINTS = Object\.freeze\(\[(.*?)\]\);/s)?.[1];
  if (!block) throw new Error("Could not locate EXPECTED_GATE_CHECKPOINTS in fast-compatibility.test.js.");
  const positions = [...block.matchAll(/\[\s*-?\d+\s*,\s*(-?\d+)n\s*\]/g)]
    .map((match) => BigInt(match[1]));
  if (positions.length < 3) throw new Error(`Parsed only ${positions.length} gate checkpoints.`);
  return positions;
}

const calendar = new PastafariCalendar();
const REFERENCE_JDN = 2_461_259n;
const FOUNDATION_JDN = -13_334_246n;
const FIRST_CHECKPOINT_JDN = -29_780_582n;
const LAST_CHECKPOINT_JDN = 3_111_357n;

function randomCalculationJdn() {
  const bucket = nextU32() % 100;
  if (bucket < 70) {
    return REFERENCE_JDN + BigInt(randomInt(-365_250, 365_250));
  }
  if (bucket < 95) {
    return randomBigInt(FIRST_CHECKPOINT_JDN, LAST_CHECKPOINT_JDN);
  }
  if ((nextU32() & 1) === 0) {
    return FIRST_CHECKPOINT_JDN - BigInt(randomInt(1, 500_000));
  }
  return LAST_CHECKPOINT_JDN + BigInt(randomInt(1, 500_000));
}

function randomTargetOffset() {
  const bucket = nextU32() % 100;
  if (bucket < 95) return BigInt(randomInt(-1_000, 1_000));
  if (bucket < 99) return BigInt(randomInt(-10_000, 10_000));
  return BigInt(randomInt(-100_000, 100_000));
}

function sanitizeField(value) {
  const text = String(value);
  if (text.includes("|") || text.includes("\n") || text.includes("\r")) {
    throw new Error(`Unsafe batch field: ${JSON.stringify(text)}`);
  }
  return text;
}

const forwardExpected = new Map();
const knownReverseExpected = new Map();
const selfExpected = new Map();
const coverage = {
  cutletNames: new Set(),
  monthNames: new Set(),
  dayInCutletMin: Infinity,
  dayInCutletMax: 0,
  dayInMonthMin: Infinity,
  dayInMonthMax: 0,
};
const requestLines = [];
const randomForwardIds = [];
let nextId = 1;

function addForward(calculationJdn, targetJdn, reverse = false, label = "") {
  const id = `F${nextId++}`;
  const expected = canonical(calendar.convertJdn(targetJdn, { calculationJdn }));
  coverage.cutletNames.add(expected.cutletName);
  coverage.monthNames.add(expected.monthName);
  coverage.dayInCutletMin = Math.min(coverage.dayInCutletMin, expected.dayInCutlet);
  coverage.dayInCutletMax = Math.max(coverage.dayInCutletMax, expected.dayInCutlet);
  coverage.dayInMonthMin = Math.min(coverage.dayInMonthMin, expected.dayInMonth);
  coverage.dayInMonthMax = Math.max(coverage.dayInMonthMax, expected.dayInMonth);
  forwardExpected.set(id, { calculationJdn, targetJdn, expected, reverse, label });
  requestLines.push(`F|${id}|${calculationJdn}|${targetJdn}|${reverse ? "R" : "N"}`);
  return id;
}

function addKnownReverse(calculationJdn, wanted, expectedTargetJdn, found, label = "") {
  const id = `K${nextId++}`;
  knownReverseExpected.set(id, { expectedTargetJdn, found, label });
  requestLines.push([
    "K", id, calculationJdn, wanted.year, sanitizeField(wanted.cutletName), wanted.dayInCutlet,
    sanitizeField(wanted.monthName), wanted.dayInMonth,
  ].join("|"));
}

function addSelf(wanted, startJdn, endJdn, expectedJdns, label = "") {
  const id = `S${nextId++}`;
  selfExpected.set(id, { expectedJdns, label, rows: [], header: null });
  requestLines.push([
    "S", id, wanted.year, sanitizeField(wanted.cutletName), wanted.dayInCutlet,
    sanitizeField(wanted.monthName), wanted.dayInMonth, startJdn, endJdn, 256,
  ].join("|"));
}

const fixedOffsets = [-1000n, -366n, -42n, -2n, -1n, 0n, 1n, 2n, 42n, 366n, 1000n];
for (const calculationJdn of [FOUNDATION_JDN, 2_451_545n, REFERENCE_JDN]) {
  for (const offset of fixedOffsets) addForward(calculationJdn, calculationJdn + offset, true, "fixed");
}

const parsedCheckpointPositions = await checkpointPositions();
for (const checkpointJdn of parsedCheckpointPositions) {
  for (const offset of [-2n, -1n, 0n, 1n, 2n]) {
    addForward(checkpointJdn, checkpointJdn + offset, true, "checkpoint-neighbour");
  }
}

progress("[prepare-dense] start referenceCalculationDays=3");
const denseStartedAt = Date.now();
let denseProbe = 0;
for (const calculationJdn of [FOUNDATION_JDN, 2_451_545n, REFERENCE_JDN]) {
  progress(`[prepare-dense] calculationJdn=${calculationJdn} locating current cutlet`);
  const current = getCutletView(calculationJdn, { calculationJdn });
  for (const probeJdn of [current.previousCutletJdn, calculationJdn, current.nextCutletJdn]) {
    denseProbe += 1;
    progress(`[prepare-dense] probe=${denseProbe}/9 calculationJdn=${calculationJdn} probeJdn=${probeJdn} start`);
    const view = getCutletView(probeJdn, { calculationJdn });
    for (const day of view.days) addForward(calculationJdn, day.jdn, false, "dense-cutlet");
    progress(`[prepare-dense] probe=${denseProbe}/9 completed days=${view.days.length}`);
  }
}
progress(`[prepare-dense] done probes=${denseProbe} elapsed=${durationText(Date.now() - denseStartedAt)}`);

const sweepTotal = 733;
const sweepStartedAt = Date.now();
progress(`[prepare-sweep] start total=${sweepTotal} fixedTargetJdn=${REFERENCE_JDN}`);
let sweepDone = 0;
for (let offset = -366n; offset <= 366n; offset += 1n) {
  const calculationJdn = REFERENCE_JDN + offset;
  const sequence = sweepDone + 1;
  if (progressPoint(sequence, sweepTotal, 25)) {
    progress(`[prepare-sweep] starting ${sequence}/${sweepTotal} calculationJdn=${calculationJdn} offset=${offset}`);
  }
  const caseStartedAt = Date.now();
  addForward(calculationJdn, REFERENCE_JDN, false, "calculation-day-sweep");
  sweepDone = sequence;
  if (progressPoint(sweepDone, sweepTotal, 25)) {
    progressCounter(
      "prepare-sweep", sweepDone, sweepTotal, sweepStartedAt,
      `calculationJdn=${calculationJdn} caseMs=${Date.now() - caseStartedAt}`,
    );
  }
}
progress(`[prepare-sweep] done elapsed=${durationText(Date.now() - sweepStartedAt)}`);

const randomForwardStartedAt = Date.now();
progress(`[prepare-forward] start total=${randomCases} seed=0x${initialSeed.toString(16).padStart(8, "0")}`);
for (let i = 0; i < randomCases; i += 1) {
  const calculationJdn = randomCalculationJdn();
  const targetJdn = calculationJdn + randomTargetOffset();
  const id = addForward(calculationJdn, targetJdn, i < knownReverseCases, "random");
  randomForwardIds.push(id);
  const done = i + 1;
  if (progressPoint(done, randomCases, progressEvery)) {
    progressCounter("prepare-forward", done, randomCases, randomForwardStartedAt, `calculationJdn=${calculationJdn} targetJdn=${targetJdn}`);
  }
}

const knownReverseStartedAt = Date.now();
progress(`[prepare-known-reverse] start total=${knownReverseCases} directJsReverse=${jsReverseCases}`);
for (let i = 0; i < knownReverseCases; i += 1) {
  const source = forwardExpected.get(randomForwardIds[i]);
  const sequence = i + 1;
  if (progressPoint(sequence, knownReverseCases, reverseProgressEvery)) {
    progress(`[prepare-known-reverse] starting ${sequence}/${knownReverseCases} calculationJdn=${source.calculationJdn} targetJdn=${source.targetJdn}`);
  }
  let expectedTargetJdn = source.targetJdn;
  if (i < jsReverseCases) {
    const jsFound = await findPastafariDate(source.expected, { calculationJdn: source.calculationJdn });
    if (jsFound.length !== 1 || jsFound[0].targetJdn !== source.targetJdn) {
      throw new Error(`JavaScript known-c reverse self-check failed for random case ${i}.`);
    }
    expectedTargetJdn = jsFound[0].targetJdn;
  }
  addKnownReverse(
    source.calculationJdn, source.expected, expectedTargetJdn, true,
    i < jsReverseCases ? "direct-js-reverse" : "js-forward-derived",
  );
  if (progressPoint(sequence, knownReverseCases, reverseProgressEvery)) {
    progressCounter("prepare-known-reverse", sequence, knownReverseCases, knownReverseStartedAt);
  }
}

for (let i = 0; i < invalidReverseCases; i += 1) {
  const source = forwardExpected.get(randomForwardIds[i]);
  addKnownReverse(
    source.calculationJdn,
    { ...source.expected, monthName: "__NO_SUCH_PASTAFARI_MONTH__" },
    0n,
    false,
    "js-date-invalid-month",
  );
}

const selfExactStartedAt = Date.now();
progress(`[prepare-self-exact] start total=${selfExactCases}`);
for (let i = 0; i < selfExactCases; i += 1) {
  const jdn = randomCalculationJdn();
  const wanted = canonical(calendar.convertJdn(jdn, { calculationJdn: jdn }));
  addSelf(wanted, jdn, jdn, [jdn], "self-exact");
  const done = i + 1;
  if (progressPoint(done, selfExactCases, Math.max(1, Math.min(10, reverseProgressEvery)))) {
    progressCounter("prepare-self-exact", done, selfExactCases, selfExactStartedAt, `jdn=${jdn}`);
  }
}

const selfRangeStartedAt = Date.now();
progress(`[prepare-self-range] start total=${selfRangeCases} radius=${selfRangeRadius}`);
for (let i = 0; i < selfRangeCases; i += 1) {
  const center = randomCalculationJdn();
  const startJdn = center - BigInt(selfRangeRadius);
  const endJdn = center + BigInt(selfRangeRadius);
  const sequence = i + 1;
  progress(`[prepare-self-range] starting ${sequence}/${selfRangeCases} center=${center} range=${startJdn}..${endJdn}`);
  const wanted = canonical(calendar.convertJdn(center, { calculationJdn: center }));
  const jsFound = await findPastafariDate(wanted, {
    calculationDate: SAME_AS_TARGET,
    searchRange: [startJdn, endJdn],
    yieldEvery: 64,
  });
  addSelf(wanted, startJdn, endJdn, jsFound.map((item) => item.targetJdn), "self-bounded-range");
  progressCounter("prepare-self-range", sequence, selfRangeCases, selfRangeStartedAt, `matches=${jsFound.length}`);
}

progress(`[prepare] writing request corpus requests=${requestLines.length} path=${requestPath}`);
await writeFile(requestPath, `${requestLines.join("\n")}\n`, "utf8");
progress(`[prepare] request corpus ready requests=${requestLines.length}`);

const mismatchLimit = 50;
const mismatches = [];
let mismatchTotal = 0;
const counts = {
  forwardExpected: forwardExpected.size,
  forwardSeen: 0,
  forwardReverseChecked: 0,
  knownReverseExpected: knownReverseExpected.size,
  knownReverseSeen: 0,
  selfExpected: selfExpected.size,
  selfSeen: 0,
};

function mismatch(kind, id, details) {
  mismatchTotal += 1;
  if (mismatches.length < mismatchLimit) mismatches.push({ kind, id, ...details });
  if (mismatchTotal <= 5 || mismatchTotal % 10 === 0) {
    progress(`[mismatch] total=${mismatchTotal} kind=${kind} id=${id || "-"}`);
  }
}

function parseBig(text) {
  return BigInt(String(text).trim() || "0");
}

function parseNum(text) {
  return Number(String(text).trim() || "0");
}

function processOutputLine(raw) {
  if (!raw) return;
  const fields = raw.split("|");
  const kind = fields[0];
  const id = fields[1]?.trim();

  if (kind === "F") {
    const expected = forwardExpected.get(id);
    if (!expected) {
      mismatch("unexpected-forward", id, { raw });
      return;
    }
    counts.forwardSeen += 1;
    const forwardStatus = parseNum(fields[2]);
    const actual = {
      year: String(parseBig(fields[6])),
      cutletName: fields[7].trimEnd(),
      dayInCutlet: parseNum(fields[8]),
      monthName: fields[9].trimEnd(),
      dayInMonth: parseNum(fields[10]),
    };
    if (forwardStatus !== 0 || !sameDate(actual, expected.expected)) {
      mismatch("forward", id, {
        calculationJdn: String(expected.calculationJdn),
        targetJdn: String(expected.targetJdn),
        label: expected.label,
        forwardStatus,
        statusCode: fields[3]?.trim(),
        expected: expected.expected,
        actual,
      });
    }
    if (expected.reverse) {
      counts.forwardReverseChecked += 1;
      const reverseStatus = parseNum(fields[11]);
      const found = fields[13] === "Y";
      const foundTarget = parseBig(fields[14]);
      if (reverseStatus !== 0 || !found || foundTarget !== expected.targetJdn) {
        mismatch("forward-roundtrip-reverse", id, {
          calculationJdn: String(expected.calculationJdn),
          targetJdn: String(expected.targetJdn),
          reverseStatus,
          reverseCode: fields[12]?.trim(),
          found,
          foundTarget: String(foundTarget),
        });
      }
    }
    if (counts.forwardSeen <= 5 || counts.forwardSeen % progressEvery === 0 || counts.forwardSeen === counts.forwardExpected) {
      progress(`[batch-forward] ${counts.forwardSeen}/${counts.forwardExpected} mismatches=${mismatchTotal}`);
    }
    return;
  }

  if (kind === "K") {
    const expected = knownReverseExpected.get(id);
    if (!expected) {
      mismatch("unexpected-known-reverse", id, { raw });
      return;
    }
    counts.knownReverseSeen += 1;
    if (counts.knownReverseSeen <= 5 || counts.knownReverseSeen % reverseProgressEvery === 0 || counts.knownReverseSeen === counts.knownReverseExpected) {
      progress(`[batch-known-reverse] ${counts.knownReverseSeen}/${counts.knownReverseExpected} mismatches=${mismatchTotal}`);
    }
    const status = parseNum(fields[2]);
    const found = fields[4] === "Y";
    const target = parseBig(fields[5]);
    if (status !== 0 || found !== expected.found || (found && target !== expected.expectedTargetJdn)) {
      mismatch("known-reverse", id, {
        label: expected.label,
        status,
        statusCode: fields[3]?.trim(),
        found,
        target: String(target),
        expectedFound: expected.found,
        expectedTargetJdn: String(expected.expectedTargetJdn),
      });
    }
    return;
  }

  if (kind === "S") {
    const expected = selfExpected.get(id);
    if (!expected) {
      mismatch("unexpected-self-header", id, { raw });
      return;
    }
    counts.selfSeen += 1;
    progress(`[batch-self] ${counts.selfSeen}/${counts.selfExpected} id=${id}`);
    expected.header = {
      status: parseNum(fields[2]),
      statusCode: fields[3]?.trim(),
      count: parseNum(fields[4]),
      hasMore: fields[5],
      nextStart: parseBig(fields[6]),
    };
    return;
  }

  if (kind === "J") {
    const expected = selfExpected.get(id);
    if (!expected) {
      mismatch("unexpected-self-row", id, { raw });
      return;
    }
    expected.rows.push(parseBig(fields[3]));
    return;
  }

  if (kind === "E") {
    mismatch("batch-runner-error", id, { raw });
    return;
  }

  mismatch("unexpected-output", id ?? "", { raw });
}

progress(`[batch] starting requests=${requestLines.length} seed=0x${initialSeed.toString(16).padStart(8, "0")} executable=${batchExe}`);
const child = spawn(batchExe, [requestPath], {
  cwd: cobolDir,
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"],
});
progress(`[batch] child started pid=${child.pid ?? "unknown"}`);
let stderr = "";
child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => {
  if (stderr.length < 1_000_000) stderr += chunk;
});
const rl = createInterface({ input: child.stdout, crlfDelay: Infinity });
rl.on("line", processOutputLine);
const heartbeat = setInterval(() => {
  progress(
    `[heartbeat] phase=batch pid=${child.pid ?? "unknown"}`
    + ` forward=${counts.forwardSeen}/${counts.forwardExpected}`
    + ` knownReverse=${counts.knownReverseSeen}/${counts.knownReverseExpected}`
    + ` self=${counts.selfSeen}/${counts.selfExpected}`
    + ` mismatches=${mismatchTotal}`,
  );
}, heartbeatSeconds * 1000);
heartbeat.unref();
const exitCode = await new Promise((resolveExit, rejectExit) => {
  child.on("error", rejectExit);
  child.on("close", resolveExit);
});
clearInterval(heartbeat);
progress(`[batch] child exited code=${exitCode}`);

if (exitCode !== 0) mismatch("batch-process-exit", "", { exitCode, stderr: stderr.slice(-20_000) });
if (counts.forwardSeen !== counts.forwardExpected) mismatch("missing-forward-results", "", { expected: counts.forwardExpected, seen: counts.forwardSeen });
if (counts.knownReverseSeen !== counts.knownReverseExpected) mismatch("missing-known-reverse-results", "", { expected: counts.knownReverseExpected, seen: counts.knownReverseSeen });
if (counts.selfSeen !== counts.selfExpected) mismatch("missing-self-results", "", { expected: counts.selfExpected, seen: counts.selfSeen });

for (const [id, expected] of selfExpected) {
  if (!expected.header) continue;
  const actualStrings = expected.rows.map(String);
  const expectedStrings = expected.expectedJdns.map(String);
  if (
    expected.header.status !== 0
    || expected.header.hasMore === "Y"
    || expected.header.count !== expected.rows.length
    || actualStrings.length !== expectedStrings.length
    || actualStrings.some((value, index) => value !== expectedStrings[index])
  ) {
    mismatch("self-reverse", id, {
      label: expected.label,
      header: { ...expected.header, nextStart: String(expected.header.nextStart) },
      expectedJdns: expectedStrings,
      actualJdns: actualStrings,
    });
  }
}

const finishedAt = new Date();
const report = {
  type: "pastafari-cobol-cross-engine-validation",
  scriptVersion: SCRIPT_VERSION,
  result: mismatchTotal === 0 ? "PASS" : "FAIL",
  startedAt: startedAt.toISOString(),
  finishedAt: finishedAt.toISOString(),
  durationMs: finishedAt.getTime() - startedAt.getTime(),
  seed: `0x${initialSeed.toString(16).padStart(8, "0")}`,
  gitCommit: gitHead(),
  gitStatusPorcelain: gitStatus(),
  algorithm: FAST_IMPLEMENTATION_INFO,
  environment: {
    platform: process.platform,
    arch: process.arch,
    node: process.version,
    cobc: toolVersion("cobc", ["-V"]),
    cc: toolVersion(process.env.CC ?? "cc", ["--version"]).split(/\r?\n/)[0],
  },
  hashes: {
    fastJsSha256: await sha256(fastPath),
    cobolEngineSha256: await sha256(enginePath),
    bigintRuntimeSha256: await sha256(runtimePath),
    bigintRuntimeHeaderSha256: await sha256(runtimeHeaderPath),
    copybookSha256: await sha256(copybookPath),
    batchSourceSha256: await sha256(batchSourcePath),
    validationScriptSha256: await sha256(validationScriptPath),
    makefileSha256: await sha256(makefilePath),
    requestCorpusSha256: await sha256(requestPath),
    batchExecutableSha256: await sha256(batchExe),
  },
  requested: {
    randomCases,
    knownReverseCases,
    invalidReverseCases,
    jsReverseCases,
    selfExactCases,
    selfRangeCases,
    selfRangeRadius,
    progressEvery,
    reverseProgressEvery,
    heartbeatSeconds,
  },
  counts,
  coverage: {
    gateCheckpointCount: parsedCheckpointPositions.length,
    cutletNamesSeen: [...coverage.cutletNames].sort(),
    cutletNameCount: coverage.cutletNames.size,
    monthNamesSeen: [...coverage.monthNames].sort(),
    monthNameCount: coverage.monthNames.size,
    dayInCutletMin: Number.isFinite(coverage.dayInCutletMin) ? coverage.dayInCutletMin : null,
    dayInCutletMax: coverage.dayInCutletMax,
    dayInMonthMin: Number.isFinite(coverage.dayInMonthMin) ? coverage.dayInMonthMin : null,
    dayInMonthMax: coverage.dayInMonthMax,
  },
  artifacts: {
    requestCorpus: requestPath,
    report: reportPath,
    rollingProgressLog: progressPath,
  },
  mismatchTotal,
  mismatchCountRecorded: mismatches.length,
  mismatchRecordingLimit: mismatchLimit,
  mismatches,
};
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

progress(`[result] validation=${report.result}`);
progress(`[result] report=${reportPath}`);
progress(`[result] rollingLog=${progressPath}`);
if (mismatchTotal !== 0) {
  console.error(JSON.stringify(mismatches.slice(0, 5), null, 2));
  process.exitCode = 1;
} else {
  assert.equal(exitCode, 0);
  progress(
    `PASS: ${counts.forwardSeen} forward comparisons, ${counts.forwardReverseChecked} COBOL forward→reverse checks, `
    + `${counts.knownReverseSeen} JS→COBOL known-reverse checks, and ${counts.selfSeen} c=t reverse comparisons.`,
  );
}
