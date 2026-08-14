#!/usr/bin/env node
"use strict";

import { createHash, randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  access,
  appendFile,
  mkdir,
  open,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Worker, isMainThread, parentPort, threadId, workerData } from "node:worker_threads";

const HARNESS_VERSION = "PASTAFARI-FAST-SOAK-1.0.0";
const STATE_SCHEMA = 1;
const MASK64 = (1n << 64n) - 1n;
const DEFAULT_BATCH_SIZE = 12;
const DEFAULT_CHECKPOINT_K = 4;
const DEFAULT_INFRA_RETRIES = 2;
const DEFAULT_MAX_CPU = 50;
const DEFAULT_MEMORY_WARN_MB = 1800;
const SOAK_CLASS_CYCLE = Object.freeze([
  "regular",
  "regular",
  "checkpoint-neighbour",
  "regular",
  "far",
  "year-boundary",
  "regular",
  "cutlet-boundary",
  "regular",
  "checkpoint-neighbour",
  "extreme-year",
  "regular",
  "far",
  "year-boundary",
  "year-sweep",
  "regular",
]);
const SMOKE_CLASS_CYCLE = Object.freeze([
  "regular",
  "checkpoint-neighbour",
  "far",
  "year-boundary",
  "cutlet-boundary",
  "extreme-year",
  "year-sweep",
]);

class HarnessError extends Error {
  constructor(message, code = "ERR_HARNESS") {
    super(message);
    this.name = "HarnessError";
    this.code = code;
  }
}

class InfrastructureError extends Error {
  constructor(message, cause = undefined) {
    super(message, { cause });
    this.name = "InfrastructureError";
    this.code = "ERR_INFRASTRUCTURE";
  }
}

function jsonReplacer(_key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}

function stableJson(value, spacing = 2) {
  return `${JSON.stringify(value, jsonReplacer, spacing)}\n`;
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

function sameCanonical(a, b) {
  return a.year === b.year
    && a.cutletName === b.cutletName
    && a.dayInCutlet === b.dayInCutlet
    && a.monthName === b.monthName
    && a.dayInMonth === b.dayInMonth;
}

function assertInvariant(condition, message, details = undefined) {
  if (condition) return;
  const error = new Error(message);
  error.name = "InvariantViolation";
  error.code = "ERR_SOAK_INVARIANT";
  if (details !== undefined) error.details = details;
  throw error;
}

function validateTuple(tuple, label = "result") {
  assertInvariant(/^-?\d+$/.test(tuple.year), `${label}.year is not an integer string`, tuple);
  assertInvariant(tuple.cutletName.length > 0, `${label}.cutletName is empty`, tuple);
  assertInvariant(Number.isSafeInteger(tuple.dayInCutlet) && tuple.dayInCutlet >= 1,
    `${label}.dayInCutlet is invalid`, tuple);
  assertInvariant(tuple.monthName.length > 0, `${label}.monthName is empty`, tuple);
  assertInvariant(Number.isSafeInteger(tuple.dayInMonth) && tuple.dayInMonth >= 1,
    `${label}.dayInMonth is invalid`, tuple);
}

function validateAdjacent(a, b) {
  validateTuple(a, "day");
  validateTuple(b, "nextDay");
  if (a.year !== b.year) return;
  if (a.cutletName === b.cutletName) {
    assertInvariant(
      b.dayInCutlet === a.dayInCutlet + 1,
      "dayInCutlet did not increment inside the same cutlet",
      { a, b },
    );
  } else {
    assertInvariant(
      b.dayInCutlet === 1,
      "a new cutlet did not begin at day 1",
      { a, b },
    );
  }
  // Months may be interleaved. A name change therefore does NOT imply day 1.
  // The only adjacent-day implication that is safe is that if the month did
  // not change, its occurrence counter advances by exactly one.
  if (a.monthName === b.monthName) {
    assertInvariant(
      b.dayInMonth === a.dayInMonth + 1,
      "dayInMonth did not increment on adjacent occurrences of the same month",
      { a, b },
    );
  }
}

function parseInteger(value, name, { min = undefined, max = undefined } = {}) {
  if (!/^-?\d+$/.test(String(value))) throw new HarnessError(`${name} must be an integer.`, "ERR_CLI");
  const n = Number(value);
  if (!Number.isSafeInteger(n)) throw new HarnessError(`${name} is outside the safe integer range.`, "ERR_CLI");
  if (min !== undefined && n < min) throw new HarnessError(`${name} must be >= ${min}.`, "ERR_CLI");
  if (max !== undefined && n > max) throw new HarnessError(`${name} must be <= ${max}.`, "ERR_CLI");
  return n;
}

function parseDuration(value) {
  if (value === undefined || value === null || value === "") return null;
  const match = /^(\d+(?:\.\d+)?)(ms|s|m|h|d)?$/i.exec(String(value).trim());
  if (!match) throw new HarnessError("--duration must look like 90s, 30m, 6h, or 1d.", "ERR_CLI");
  const amount = Number(match[1]);
  const unit = (match[2] ?? "s").toLowerCase();
  const factor = { ms: 1, s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }[unit];
  return Math.floor(amount * factor);
}

function normalizeSeed(value) {
  if (value === undefined || value === null) {
    return BigInt(`0x${randomBytes(8).toString("hex")}`);
  }
  const text = String(value).trim().toLowerCase().replaceAll("_", "");
  let seed;
  if (/^0x[0-9a-f]+$/.test(text)) seed = BigInt(text);
  else if (/^\d+$/.test(text)) seed = BigInt(text);
  else throw new HarnessError("--seed must be an unsigned decimal or hexadecimal integer.", "ERR_CLI");
  if (seed < 0n || seed > MASK64) throw new HarnessError("--seed must fit in 64 bits.", "ERR_CLI");
  return seed;
}

function seedHex(seed) {
  return `0x${seed.toString(16).padStart(16, "0")}`;
}

function mix64(value) {
  let z = (value + 0x9e3779b97f4a7c15n) & MASK64;
  z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & MASK64;
  z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & MASK64;
  return (z ^ (z >> 31n)) & MASK64;
}

function randomWord(seed, batch, caseIndex, stream = 0) {
  let x = seed & MASK64;
  x ^= (BigInt(batch) * 0xd6e8feb86659fd93n) & MASK64;
  x ^= (BigInt(caseIndex) * 0xa5a35625aa5a3563n) & MASK64;
  x ^= (BigInt(stream) * 0x9e3779b97f4a7c15n) & MASK64;
  return mix64(x);
}

function randomInt(seed, batch, caseIndex, stream, maxExclusive) {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0) throw new Error("bad maxExclusive");
  return Number(randomWord(seed, batch, caseIndex, stream) % BigInt(maxExclusive));
}

function signedOffset(seed, batch, caseIndex, stream, radius) {
  const width = radius * 2 + 1;
  return BigInt(randomInt(seed, batch, caseIndex, stream, width) - radius);
}

function relationOf(c, t) {
  if (c === t) return "c=t";
  return c < t ? "c<t" : "c>t";
}

function classForBatch(mode, batch) {
  const cycle = mode === "smoke" ? SMOKE_CLASS_CYCLE : SOAK_CLASS_CYCLE;
  return cycle[batch % cycle.length];
}

function parseArgs(argv) {
  const args = [...argv];
  const command = args[0] && !args[0].startsWith("-") ? args.shift() : "soak";
  if (!["smoke", "soak", "resume", "replay", "help"].includes(command)) {
    throw new HarnessError(`Unknown command: ${command}`, "ERR_CLI");
  }
  const options = { command };
  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (!token.startsWith("--")) throw new HarnessError(`Unexpected argument: ${token}`, "ERR_CLI");
    const [rawKey, inlineValue] = token.slice(2).split("=", 2);
    const key = rawKey.replaceAll("-", "_");
    const booleanKeys = new Set(["continue_after_failure", "reset", "no_oracle", "oracle_far"]);
    if (booleanKeys.has(key)) {
      options[key] = inlineValue === undefined ? true : !["0", "false", "no"].includes(inlineValue.toLowerCase());
      continue;
    }
    const value = inlineValue ?? args[++i];
    if (value === undefined) throw new HarnessError(`Missing value for --${rawKey}`, "ERR_CLI");
    options[key] = value;
  }
  return options;
}

function usage() {
  return `
Pastafari fast-engine local soak harness ${HARNESS_VERSION}

Usage:
  node scripts/soak-fast-engine.mjs smoke [options]
  node scripts/soak-fast-engine.mjs soak [options]
  node scripts/soak-fast-engine.mjs resume [options]
  node scripts/soak-fast-engine.mjs replay --replay-batch N --replay-case N [options]

Important options:
  --seed N                    64-bit decimal or 0x... seed
  --batch-size N              logical cases per normal batch (default ${DEFAULT_BATCH_SIZE})
  --workers N | --jobs N      worker threads (default 1)
  --max-cpu PERCENT           caps effective workers (default ${DEFAULT_MAX_CPU})
  --duration 6h               stop before the next batch after the duration
  --max-cases N               stop before exceeding this logical-case count
  --oracle-every N            deterministic base oracle sampling interval
  --oracle-far                also oracle-sample far/checkpoint classes (RAM-heavy)
  --no-oracle                 disable oracle comparison (not recommended for soak)
  --checkpoint-k N            test checkpoint +/- N (default ${DEFAULT_CHECKPOINT_K})
  --infra-retries N           bounded worker/I/O retry count (default ${DEFAULT_INFRA_RETRIES})
  --memory-warn-mb N          RSS warning threshold (default ${DEFAULT_MEMORY_WARN_MB})
  --state-dir PATH            state/log directory
  --continue-after-failure    continue after reproducible calculation failures
  --commit SHA                override git commit discovery (useful for exported ZIPs)
  --anchor-jdn JDN            fixed normal-period anchor; stored for replay
  --reset                     remove the selected state directory before a new smoke/soak run
                              resume inherits stored batch-size/checkpoint-k unless overridden

Default state directories:
  soak/resume: .pastafari-soak
  smoke:       .pastafari-soak-smoke

The harness never modifies browser/pastafari-calendar-fast.js.
`;
}

function runtimeInfo() {
  return {
    node: process.version,
    v8: process.versions.v8,
    uv: process.versions.uv,
    platform: process.platform,
    arch: process.arch,
    release: os.release(),
    cpus: os.availableParallelism?.() ?? os.cpus().length,
  };
}

async function sha256File(filePath) {
  const data = await readFile(filePath);
  return createHash("sha256").update(data).digest("hex");
}

function discoverGitCommit(repoRoot) {
  try {
    return execFileSync("git", ["-C", repoRoot, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

async function appendSynced(filePath, text) {
  const handle = await open(filePath, "a");
  try {
    await handle.writeFile(text, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
}

async function atomicWrite(filePath, text, retries, onRetry = undefined) {
  await mkdir(path.dirname(filePath), { recursive: true });
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const tmp = `${filePath}.tmp-${process.pid}-${Date.now()}-${attempt}`;
    try {
      const handle = await open(tmp, "w");
      try {
        await handle.writeFile(text, "utf8");
        await handle.sync();
      } finally {
        await handle.close();
      }
      await rename(tmp, filePath);
      return;
    } catch (error) {
      lastError = error;
      await rm(tmp, { force: true }).catch(() => {});
      if (attempt >= retries) break;
      if (onRetry) await onRetry(attempt + 1, error);
      await new Promise((resolve) => setTimeout(resolve, 100 * (attempt + 1)));
    }
  }
  throw new InfrastructureError(`Atomic write failed for ${filePath}`, lastError);
}

async function atomicWriteJson(filePath, value, retries, onRetry = undefined) {
  return atomicWrite(filePath, stableJson(value), retries, onRetry);
}

async function pathExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function countJsonFiles(dirPath) {
  try {
    const names = await readdir(dirPath);
    return names.filter((name) => name.endsWith(".json")).length;
  } catch {
    return 0;
  }
}

function configFromOptions(parsed, mode) {
  const workersRequested = parseInteger(parsed.workers ?? parsed.jobs ?? "1", "--workers", { min: 1, max: 64 });
  const maxCpu = parseInteger(parsed.max_cpu ?? String(DEFAULT_MAX_CPU), "--max-cpu", { min: 1, max: 100 });
  const cpuCount = os.availableParallelism?.() ?? os.cpus().length;
  const cpuCap = Math.max(1, Math.floor(cpuCount * maxCpu / 100));
  const workers = Math.min(workersRequested, cpuCap);
  const batchSize = parseInteger(parsed.batch_size ?? String(DEFAULT_BATCH_SIZE), "--batch-size", { min: 1, max: 100_000 });
  const checkpointK = parseInteger(parsed.checkpoint_k ?? String(DEFAULT_CHECKPOINT_K), "--checkpoint-k", { min: 1, max: 64 });
  const infraRetries = parseInteger(parsed.infra_retries ?? String(DEFAULT_INFRA_RETRIES), "--infra-retries", { min: 0, max: 20 });
  const memoryWarnMb = parseInteger(parsed.memory_warn_mb ?? String(DEFAULT_MEMORY_WARN_MB), "--memory-warn-mb", { min: 128 });
  const oracleEveryDefault = mode === "smoke" ? 3 : 12;
  const oracleEvery = parseInteger(parsed.oracle_every ?? String(oracleEveryDefault), "--oracle-every", { min: 1 });
  const maxCases = parsed.max_cases === undefined
    ? (mode === "smoke" ? SMOKE_CLASS_CYCLE.length : null)
    : parseInteger(parsed.max_cases, "--max-cases", { min: 1 });
  return {
    workersRequested,
    workers,
    maxCpu,
    cpuCount,
    batchSize,
    checkpointK,
    infraRetries,
    memoryWarnMb,
    oracleEvery,
    oracleEnabled: !parsed.no_oracle,
    oracleFar: Boolean(parsed.oracle_far),
    durationMs: parseDuration(parsed.duration),
    maxCases,
    continueAfterFailure: Boolean(parsed.continue_after_failure),
  };
}

function caseGenerationFingerprint(config) {
  return {
    batchSize: config.batchSize,
    checkpointK: config.checkpointK,
    generator: "splitmix64-derived-v1",
    classCycle: "v1",
  };
}

function pidAppearsAlive(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code === "EPERM";
  }
}

async function acquireStateLock(stateDir) {
  // Keep the lock beside, not inside, the state directory. Otherwise --reset
  // could delete another live run's lock before noticing it.
  const lockPath = `${stateDir}.run.lock`;
  await mkdir(path.dirname(lockPath), { recursive: true });
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const handle = await open(lockPath, "wx");
      try {
        await handle.writeFile(stableJson({
          pid: process.pid,
          hostname: os.hostname(),
          startedUtc: new Date().toISOString(),
        }), "utf8");
        await handle.sync();
      } finally {
        await handle.close();
      }
      return async () => {
        await rm(lockPath, { force: true }).catch(() => {});
      };
    } catch (error) {
      if (error?.code !== "EEXIST") throw error;
      let owner = null;
      try { owner = JSON.parse(await readFile(lockPath, "utf8")); } catch {}
      if (owner?.hostname && owner.hostname !== os.hostname()) {
        throw new HarnessError(
          `State directory is locked by PID ${owner.pid ?? "?"} on ${owner.hostname}.`,
          "ERR_STATE_LOCKED",
        );
      }
      if (pidAppearsAlive(Number(owner?.pid))) {
        throw new HarnessError(
          `State directory is already in use by PID ${owner.pid}.`,
          "ERR_STATE_LOCKED",
        );
      }
      // Crash, power loss or hard termination can leave the lock behind. A
      // dead local PID makes it safe to remove and reacquire on resume.
      await rm(lockPath, { force: true });
    }
  }
  throw new HarnessError("Could not acquire the state-directory lock.", "ERR_STATE_LOCKED");
}

async function buildInstrumentedFast(repoRoot, stateDir, fastHash, infraRetries, recordRetry) {
  const sourcePath = path.join(repoRoot, "browser", "pastafari-calendar-fast.js");
  const cacheDir = path.join(stateDir, "cache");
  await mkdir(cacheDir, { recursive: true });
  const outputPath = path.join(cacheDir, `pastafari-calendar-fast-instrumented-${fastHash.slice(0, 16)}.mjs`);
  if (await pathExists(outputPath)) return outputPath;
  const source = await readFile(sourcePath, "utf8");
  const suffix = `\n\n// Added only by the local soak harness; production source is unchanged.\nexport {\n  GATE_CHECKPOINTS as __soakGateCheckpoints,\n  gatePosition as __soakGatePosition,\n  gateDistance as __soakGateDistance,\n  getCalculationState as __soakGetCalculationState,\n  MIN_YEAR_DAYS as __soakMinYearDays,\n  MAX_YEAR_DAYS as __soakMaxYearDays,\n  FOUNDATION_JDN as __soakFoundationJdn,\n};\n`;
  await atomicWrite(outputPath, source + suffix, infraRetries, recordRetry);
  return outputPath;
}

function targetRelation(baseTarget, relation, distance) {
  if (relation === 0) return { c: baseTarget, t: baseTarget };
  if (relation === 1) return { c: baseTarget + distance, t: baseTarget }; // t < c
  return { c: baseTarget - distance, t: baseTarget }; // t > c
}

function generateCase({ seed, batch, caseIndex, sampleClass, anchorJdn, checkpoints, checkpointK }) {
  const relation = (batch + caseIndex) % 3;
  const distance = BigInt(1 + randomInt(seed, batch, caseIndex, 91, 10_000));
  let c;
  let t;
  const metadata = {};

  if (sampleClass === "regular") {
    const wide = randomInt(seed, batch, caseIndex, 1, 5) === 0;
    const radius = wide ? 3_652_500 : 365_250;
    const base = anchorJdn + signedOffset(seed, batch, caseIndex, 2, radius);
    ({ c, t } = targetRelation(base, relation, distance));
    metadata.window = wide ? "normal-wide-10k-years" : "normal-near-1k-years";
  } else if (sampleClass === "checkpoint-neighbour") {
    const cpIndex = (batch * 7 + Math.floor(caseIndex / (2 * checkpointK + 1))) % checkpoints.length;
    const checkpoint = checkpoints[cpIndex];
    const offset = BigInt((caseIndex % (2 * checkpointK + 1)) - checkpointK);
    const base = BigInt(checkpoint[1]) + offset;
    ({ c, t } = targetRelation(base, relation, distance));
    metadata.checkpointIndex = Number(checkpoint[0]);
    metadata.checkpointJdn = String(checkpoint[1]);
    metadata.checkpointOffset = Number(offset);
  } else if (sampleClass === "far") {
    const first = BigInt(checkpoints[0][1]);
    const last = BigInt(checkpoints.at(-1)[1]);
    const anchors = [first - 100_000n, first, last, last + 100_000n];
    // Deterministic cycling guarantees both table edges and both out-of-table
    // regions are exercised; it does not rely on random luck over a long run.
    const farAnchor = anchors[(batch + caseIndex) % anchors.length];
    const base = farAnchor + signedOffset(seed, batch, caseIndex, 4, 50_000);
    ({ c, t } = targetRelation(base, relation, distance));
    metadata.farAnchor = String(farAnchor);
  } else {
    const baseC = anchorJdn + signedOffset(seed, batch, caseIndex, 5, 2_000_000);
    const targetOffset = signedOffset(seed, batch, caseIndex, 6, 25_000);
    t = baseC + targetOffset;
    if (relation === 0) c = t;
    else if (relation === 1) c = t + distance;
    else c = t - distance;
    if (sampleClass === "extreme-year") {
      const probes = [];
      for (let i = 0; i < 12; i += 1) {
        probes.push(String(t + signedOffset(seed, batch, caseIndex, 100 + i, 120_000)));
      }
      metadata.probes = probes;
    }
  }

  return {
    schema: 1,
    seed: seedHex(seed),
    batch,
    case: caseIndex,
    sampleClass,
    c: String(c),
    t: String(t),
    relation: relationOf(c, t),
    metadata,
    checkDeterminism: randomInt(seed, batch, caseIndex, 77, 16) === 0,
  };
}

function batchCaseCount(mode, sampleClass, config, remainingCases) {
  let count = mode === "smoke" ? 1 : config.batchSize;
  if (sampleClass === "year-sweep") count = 1;
  else if (sampleClass === "extreme-year") count = Math.min(2, count);
  if (remainingCases !== null) count = Math.min(count, remainingCases);
  return Math.max(0, count);
}

function validateFullYearValues(values, yearNumber) {
  assertInvariant(values.length > 0, "year sweep returned no days");
  const monthLast = new Map();
  let previous = null;
  let currentCutlet = null;
  let currentCutletLength = 0;
  let longestCutlet = 0;
  let currentMonthRun = null;
  let currentMonthRunLength = 0;
  let longestMonthRun = 0;

  for (const raw of values) {
    const value = canonical(raw);
    validateTuple(value, "yearSweepDay");
    assertInvariant(value.year === String(yearNumber), "year sweep crossed the expected year boundary", {
      expectedYear: String(yearNumber), actual: value,
    });

    if (previous !== null) validateAdjacent(previous, value);

    if (value.cutletName !== currentCutlet) {
      if (currentCutlet !== null) longestCutlet = Math.max(longestCutlet, currentCutletLength);
      currentCutlet = value.cutletName;
      currentCutletLength = 1;
      assertInvariant(value.dayInCutlet === 1, "cutlet in year sweep did not begin at day 1", value);
    } else {
      currentCutletLength += 1;
    }

    const priorMonthDay = monthLast.get(value.monthName);
    if (priorMonthDay === undefined) {
      assertInvariant(value.dayInMonth === 1, "first occurrence of a month was not day 1", value);
    } else {
      assertInvariant(value.dayInMonth === priorMonthDay + 1,
        "month occurrence counter is not consecutive across the year", { previousDay: priorMonthDay, value });
    }
    monthLast.set(value.monthName, value.dayInMonth);

    if (value.monthName === currentMonthRun) currentMonthRunLength += 1;
    else {
      longestMonthRun = Math.max(longestMonthRun, currentMonthRunLength);
      currentMonthRun = value.monthName;
      currentMonthRunLength = 1;
    }
    previous = value;
  }
  longestCutlet = Math.max(longestCutlet, currentCutletLength);
  longestMonthRun = Math.max(longestMonthRun, currentMonthRunLength);
  for (const [monthName, length] of monthLast) {
    assertInvariant(length >= 4 && length <= 123,
      "month length inferred from occurrences is outside 4..123", { monthName, length });
  }
  return {
    monthCount: monthLast.size,
    inferredMonthLengths: Object.fromEntries(monthLast),
    longestCutlet,
    longestMonthRun,
  };
}

function validateYearBoundary(mod, calendar, state, targetJdn, calculationJdn, { fullSweep = false } = {}) {
  const year = state.findYear(targetJdn);
  assertInvariant(year.length >= mod.__soakMinYearDays && year.length <= mod.__soakMaxYearDays,
    "year length is outside the fast engine's own declared bounds", {
      length: year.length, min: mod.__soakMinYearDays, max: mod.__soakMaxYearDays,
    });
  assertInvariant(targetJdn >= year.startJdn && targetJdn <= year.endJdn,
    "findYear returned a year that does not contain the target", { targetJdn, year });
  assertInvariant(year.endJdn - year.startJdn + 1n === BigInt(year.length),
    "year start/end are inconsistent with year.length", year);

  const before = canonical(calendar.convertJdn(year.startJdn - 1n, { calculationJdn }));
  const first = canonical(calendar.convertJdn(year.startJdn, { calculationJdn }));
  const last = canonical(calendar.convertJdn(year.endJdn, { calculationJdn }));
  const after = canonical(calendar.convertJdn(year.endJdn + 1n, { calculationJdn }));
  [before, first, last, after].forEach((v) => validateTuple(v, "yearBoundary"));
  assertInvariant(first.year === String(year.number), "first year day has the wrong year", { first, year });
  assertInvariant(last.year === String(year.number), "last year day has the wrong year", { last, year });
  assertInvariant(before.year !== String(year.number), "day before year start stayed in the same year", { before, year });
  assertInvariant(after.year !== String(year.number), "day after year end stayed in the same year", { after, year });
  assertInvariant(first.dayInCutlet === 1, "year does not begin at cutlet day 1", { first, year });

  let sweep = null;
  let checkedDays = 4;
  if (fullSweep) {
    const values = mod.convertJdnRange(year.startJdn, year.length, { calculationJdn });
    sweep = validateFullYearValues(values, year.number);
    checkedDays += year.length;
  }
  return {
    year: {
      number: String(year.number),
      startJdn: String(year.startJdn),
      endJdn: String(year.endJdn),
      length: year.length,
      gaps: year.gaps,
    },
    oracleTargets: [
      String(year.startJdn - 1n),
      String(year.startJdn),
      String(year.endJdn),
      String(year.endJdn + 1n),
    ],
    oracleValues: {
      [String(year.startJdn - 1n)]: before,
      [String(year.startJdn)]: first,
      [String(year.endJdn)]: last,
      [String(year.endJdn + 1n)]: after,
    },
    checkedDays,
    sweep,
  };
}

function executeFastCase(mod, calendar, descriptor) {
  const c = BigInt(descriptor.c);
  const t = BigInt(descriptor.t);
  let checkedDays = 0;
  const yearRecords = [];
  const oracleTargets = new Set([descriptor.t]);
  const oracleValues = {};
  let fullYearDays = 0;
  let cutletLength = null;
  let sweepDetails = null;
  const primary = canonical(calendar.convertJdn(t, { calculationJdn: c }));
  oracleValues[descriptor.t] = primary;
  checkedDays += 1;
  validateTuple(primary, "primary");

  if (descriptor.checkDeterminism) {
    mod.clearFastCache();
    const repeated = canonical(calendar.convertJdn(t, { calculationJdn: c }));
    checkedDays += 1;
    assertInvariant(sameCanonical(primary, repeated), "same (c,t) changed after a cache-clear recomputation", {
      first: primary, repeated,
    });
  }

  if (["regular", "far", "checkpoint-neighbour"].includes(descriptor.sampleClass)) {
    const next = canonical(calendar.convertJdn(t + 1n, { calculationJdn: c }));
    checkedDays += 1;
    validateAdjacent(primary, next);
  }

  if (descriptor.sampleClass === "checkpoint-neighbour") {
    const expected = BigInt(descriptor.metadata.checkpointJdn);
    const actual = mod.__soakGatePosition(BigInt(descriptor.metadata.checkpointIndex));
    assertInvariant(actual === expected, "checkpoint gate position changed", {
      checkpointIndex: descriptor.metadata.checkpointIndex,
      expected: String(expected),
      actual: String(actual),
    });
  }

  if (descriptor.sampleClass === "year-boundary") {
    const state = mod.__soakGetCalculationState(c);
    const details = validateYearBoundary(mod, calendar, state, t, c);
    yearRecords.push(details.year);
    details.oracleTargets.forEach((x) => oracleTargets.add(x));
    Object.assign(oracleValues, details.oracleValues);
    checkedDays += details.checkedDays;
  }

  if (descriptor.sampleClass === "year-sweep") {
    const state = mod.__soakGetCalculationState(c);
    const details = validateYearBoundary(mod, calendar, state, t, c, { fullSweep: true });
    yearRecords.push(details.year);
    details.oracleTargets.forEach((x) => oracleTargets.add(x));
    Object.assign(oracleValues, details.oracleValues);
    checkedDays += details.checkedDays;
    fullYearDays += details.year.length;
    sweepDetails = details.sweep;
  }

  if (descriptor.sampleClass === "cutlet-boundary") {
    const view = mod.getCutletView(t, { calculationJdn: c });
    assertInvariant(view.days.length === Number(view.endJdn - view.startJdn + 1n),
      "cutlet view length does not match its JDN bounds", view);
    assertInvariant(view.days.length > 0, "cutlet view is empty");
    assertInvariant(view.days[0].dayInCutlet === 1, "cutlet does not start at day 1", view.days[0]);
    assertInvariant(view.days.at(-1).dayInCutlet === view.days.length,
      "cutlet end does not match cutlet length", view.days.at(-1));
    const selected = canonical(view.days[view.selectedIndex]);
    assertInvariant(sameCanonical(primary, selected), "cutlet view selected day differs from convertJdn", {
      primary, selected,
    });
    let lastSeenByMonth = new Map();
    for (const raw of view.days) {
      const value = canonical(raw);
      validateTuple(value, "cutletViewDay");
      const prior = lastSeenByMonth.get(value.monthName);
      if (prior !== undefined) {
        assertInvariant(value.dayInMonth === prior + 1,
          "month occurrence counter is inconsistent inside cutlet view", { prior, value });
      }
      lastSeenByMonth.set(value.monthName, value.dayInMonth);
    }
    const prev = canonical(calendar.convertJdn(view.previousCutletJdn, { calculationJdn: c }));
    const next = canonical(calendar.convertJdn(view.nextCutletJdn, { calculationJdn: c }));
    oracleValues[String(view.previousCutletJdn)] = prev;
    oracleValues[String(view.startJdn)] = canonical(view.days[0]);
    oracleValues[String(view.endJdn)] = canonical(view.days.at(-1));
    oracleValues[String(view.nextCutletJdn)] = next;
    checkedDays += view.days.length + 2;
    if (prev.year === view.year) {
      assertInvariant(prev.cutletName !== view.cutletName, "previous cutlet boundary did not change cutlet", { prev, view });
    }
    if (next.year === view.year) {
      assertInvariant(next.cutletName !== view.cutletName, "next cutlet boundary did not change cutlet", { next, view });
      assertInvariant(next.dayInCutlet === 1, "next cutlet did not begin at day 1", { next, view });
    }
    cutletLength = view.days.length;
    [view.startJdn - 1n, view.startJdn, view.endJdn, view.endJdn + 1n]
      .forEach((x) => oracleTargets.add(String(x)));
  }

  if (descriptor.sampleClass === "extreme-year") {
    const state = mod.__soakGetCalculationState(c);
    const candidates = [];
    for (const probe of descriptor.metadata.probes) {
      const year = state.findYear(BigInt(probe));
      candidates.push(year);
    }
    candidates.sort((a, b) => a.length - b.length || (a.startJdn < b.startJdn ? -1 : 1));
    const shortest = candidates[0];
    const longest = candidates.at(-1);
    const unique = shortest.startJdn === longest.startJdn ? [shortest] : [shortest, longest];
    for (const year of unique) {
      // An extreme-search case deliberately expands around both locally shortest
      // and locally longest discovered years instead of sampling one day only.
      const details = validateYearBoundary(mod, calendar, state, year.startJdn, c, { fullSweep: true });
      yearRecords.push(details.year);
      details.oracleTargets.forEach((x) => oracleTargets.add(x));
      Object.assign(oracleValues, details.oracleValues);
      checkedDays += details.checkedDays;
      fullYearDays += details.year.length;
    }
  }

  return {
    status: "ok",
    primary,
    checkedDays,
    fullYearDays,
    yearRecords,
    cutletLength,
    sweepDetails,
    oracleTargets: [...oracleTargets],
    oracleValues,
    cacheStats: mod.getFastCacheStats(),
  };
}

async function workerEntry() {
  const moduleUrl = `${pathToFileURL(workerData.instrumentedFastPath).href}?worker=${threadId}`;
  const mod = await import(moduleUrl);
  const calendar = new mod.PastafariCalendar({
    todayProvider: () => new mod.GregorianDate(2000n, 1, 1),
  });
  parentPort.on("message", (message) => {
    if (message?.type === "shutdown") {
      process.exit(0);
      return;
    }
    if (message?.type !== "case") return;
    try {
      const result = executeFastCase(mod, calendar, message.descriptor);
      parentPort.postMessage({ id: message.id, ok: true, result });
    } catch (error) {
      parentPort.postMessage({
        id: message.id,
        ok: true,
        result: {
          status: "calculation-failure",
          error: {
            name: error?.name ?? "Error",
            code: error?.code ?? null,
            message: String(error?.message ?? error),
            stack: String(error?.stack ?? ""),
            details: error?.details ?? null,
          },
        },
      });
    }
  });
}

class WorkerClient {
  constructor(index, scriptUrl, instrumentedFastPath) {
    this.index = index;
    this.scriptUrl = scriptUrl;
    this.instrumentedFastPath = instrumentedFastPath;
    this.worker = null;
    this.sequence = 0;
    this.pending = null;
  }

  start() {
    if (this.worker) return;
    const worker = new Worker(this.scriptUrl, {
      workerData: { role: "soak-worker", instrumentedFastPath: this.instrumentedFastPath },
    });
    this.worker = worker;
    worker.on("message", (message) => {
      if (!this.pending || message.id !== this.pending.id) return;
      const pending = this.pending;
      this.pending = null;
      pending.resolve(message.result);
    });
    worker.on("error", (error) => this.#failPending(error));
    worker.on("exit", (code) => {
      const old = this.worker;
      this.worker = null;
      if (this.pending) this.#failPending(new Error(`worker ${this.index} exited with code ${code}`));
      if (old) old.removeAllListeners();
    });
  }

  #failPending(error) {
    if (!this.pending) return;
    const pending = this.pending;
    this.pending = null;
    pending.reject(new InfrastructureError(`worker ${this.index} failed`, error));
  }

  async run(descriptor) {
    this.start();
    if (this.pending) throw new InfrastructureError(`worker ${this.index} received overlapping work`);
    const id = `${this.index}:${++this.sequence}`;
    return new Promise((resolve, reject) => {
      this.pending = { id, resolve, reject };
      try {
        this.worker.postMessage({ type: "case", id, descriptor });
      } catch (error) {
        this.pending = null;
        reject(new InfrastructureError(`could not post work to worker ${this.index}`, error));
      }
    });
  }

  async restart() {
    if (this.worker) {
      const worker = this.worker;
      this.worker = null;
      await worker.terminate().catch(() => {});
    }
    this.pending = null;
    this.start();
  }

  async close() {
    if (!this.worker) return;
    const worker = this.worker;
    this.worker = null;
    await worker.terminate().catch(() => {});
    this.pending = null;
  }
}

// Oracle independence: the expected tuple is computed by the repository's
// separate authoritative doorway (pastafari-calendar-core.js -> chronicle ->
// core-1/core-2), never by importing or calling fast-engine internals. The two
// implementations intentionally share the public calendar contract/specification
// and the repository's year-ceiling policy; those shared requirements are not
// treated as evidence that the oracle is independent.
async function oracleOneShotWorkerEntry() {
  try {
    const mod = await import(pathToFileURL(workerData.corePath).href);
    const calendar = new mod.PastafariCalendar({
      todayProvider: () => new mod.GregorianDate(2000n, 1, 1),
    });
    const results = {};
    for (const target of workerData.targets) {
      results[target] = canonical(calendar.convertJdn(BigInt(target), { calculationJdn: BigInt(workerData.c) }));
    }
    parentPort.postMessage({ status: "ok", results });
  } catch (error) {
    parentPort.postMessage({
      status: "oracle-failure",
      error: {
        name: error?.name ?? "Error",
        code: error?.code ?? null,
        message: String(error?.message ?? error),
        stack: String(error?.stack ?? ""),
      },
    });
  }
}

async function runOracleOneShot(scriptUrl, repoRoot, descriptor, targets) {
  const corePath = path.join(repoRoot, "browser", "pastafari-calendar-core.js");
  const worker = new Worker(scriptUrl, {
    workerData: { role: "oracle-one-shot", corePath, c: descriptor.c, targets },
  });
  return new Promise((resolve, reject) => {
    let settled = false;
    worker.once("message", async (message) => {
      settled = true;
      resolve(message);
      await worker.terminate().catch(() => {});
    });
    worker.once("error", (error) => {
      if (settled) return;
      settled = true;
      reject(new InfrastructureError("oracle worker failed", error));
    });
    worker.once("exit", (code) => {
      if (settled) return;
      settled = true;
      reject(new InfrastructureError(`oracle worker exited before replying (code ${code})`));
    });
  });
}

function shouldUseOracle(descriptor, config) {
  if (!config.oracleEnabled) return false;
  if (["far", "checkpoint-neighbour"].includes(descriptor.sampleClass) && !config.oracleFar) return false;
  if (["year-boundary", "cutlet-boundary", "year-sweep"].includes(descriptor.sampleClass)) return true;
  const token = randomWord(BigInt(descriptor.seed), descriptor.batch, descriptor.case, 909);
  return token % BigInt(config.oracleEvery) === 0n;
}

function oracleTargetsForCase(descriptor, fastResult) {
  const targets = [...fastResult.oracleTargets];
  if (descriptor.sampleClass === "far") return targets.slice(0, 1);
  if (descriptor.sampleClass === "checkpoint-neighbour") return targets.slice(0, 2);
  if (targets.length <= 5) return targets;
  // Structural cases may discover many useful targets; cap the expensive oracle
  // while always retaining beginning/end boundary representatives.
  return [targets[0], targets[1], targets[Math.floor(targets.length / 2)], targets.at(-2), targets.at(-1)]
    .filter((value, index, array) => array.indexOf(value) === index);
}

async function compareOracle(scriptUrl, repoRoot, descriptor, fastResult, config, stateDir) {
  const targets = oracleTargetsForCase(descriptor, fastResult);
  let response;
  let lastError;
  for (let attempt = 0; attempt <= config.infraRetries; attempt += 1) {
    try {
      response = await runOracleOneShot(scriptUrl, repoRoot, descriptor, targets);
      break;
    } catch (error) {
      lastError = error;
      if (attempt >= config.infraRetries) throw error;
      await recordInfrastructureRetry(stateDir, {
        operation: "oracle-worker",
        attempt: attempt + 1,
        batch: descriptor.batch,
        case: descriptor.case,
        message: String(error?.message ?? error),
      });
    }
  }
  if (!response) throw lastError ?? new InfrastructureError("oracle worker returned no response");
  if (response.status !== "ok") return { targetsChecked: targets, mismatches: [], oracleFailure: response.error };
  const mismatches = [];
  for (const target of targets) {
    const actual = fastResult.oracleValues[target];
    const expected = response.results[target];
    if (!actual) {
      throw new HarnessError(`Fast case did not retain oracle target ${target}`, "ERR_ORACLE_FAST_VALUE_MISSING");
    }
    if (!sameCanonical(actual, expected)) mismatches.push({ target, actual, expected });
  }
  return { targetsChecked: targets, mismatches, oracleFailure: null };
}

function initialTotals() {
  return {
    batches: 0,
    totalCases: 0,
    totalEngineDaysChecked: 0,
    fullYearDaysChecked: 0,
    relations: { "c=t": 0, "c<t": 0, "c>t": 0 },
    checkpointNeighbourCases: 0,
    minJdn: null,
    maxJdn: null,
    minYearLength: null,
    maxYearLength: null,
    longestCutlet: null,
    runtimeSeconds: 0,
    rssPeakMb: 0,
  };
}

function updateJdnRange(totals, descriptor) {
  for (const value of [BigInt(descriptor.c), BigInt(descriptor.t)]) {
    if (totals.minJdn === null || value < BigInt(totals.minJdn)) totals.minJdn = String(value);
    if (totals.maxJdn === null || value > BigInt(totals.maxJdn)) totals.maxJdn = String(value);
  }
}

function updateYearExtremes(totals, descriptor, fastResult) {
  for (const year of fastResult.yearRecords ?? []) {
    const record = { ...year, batch: descriptor.batch, case: descriptor.case, c: descriptor.c, t: descriptor.t };
    if (totals.minYearLength === null || year.length < totals.minYearLength.length) totals.minYearLength = record;
    if (totals.maxYearLength === null || year.length > totals.maxYearLength.length) totals.maxYearLength = record;
  }
  if (fastResult.cutletLength !== null && fastResult.cutletLength !== undefined) {
    if (totals.longestCutlet === null || fastResult.cutletLength > totals.longestCutlet.length) {
      totals.longestCutlet = {
        length: fastResult.cutletLength,
        batch: descriptor.batch,
        case: descriptor.case,
        c: descriptor.c,
        t: descriptor.t,
      };
    }
  }
  if (fastResult.sweepDetails?.longestCutlet) {
    if (totals.longestCutlet === null || fastResult.sweepDetails.longestCutlet > totals.longestCutlet.length) {
      totals.longestCutlet = {
        length: fastResult.sweepDetails.longestCutlet,
        batch: descriptor.batch,
        case: descriptor.case,
        c: descriptor.c,
        t: descriptor.t,
      };
    }
  }
}

function applySuccessfulCase(totals, descriptor, fastResult) {
  totals.totalCases += 1;
  totals.totalEngineDaysChecked += fastResult.checkedDays ?? 1;
  totals.fullYearDaysChecked += fastResult.fullYearDays ?? 0;
  totals.relations[descriptor.relation] += 1;
  if (descriptor.sampleClass === "checkpoint-neighbour") totals.checkpointNeighbourCases += 1;
  updateJdnRange(totals, descriptor);
  updateYearExtremes(totals, descriptor, fastResult);
}

function applyFailedCase(totals, descriptor, fastResult) {
  // In --continue-after-failure mode the failed input itself is still a tested
  // logical case. Count the input and any work completed before the failure,
  // but never derive structural extrema from an invalid result.
  totals.totalCases += 1;
  totals.totalEngineDaysChecked += fastResult?.checkedDays ?? 1;
  totals.fullYearDaysChecked += fastResult?.fullYearDays ?? 0;
  totals.relations[descriptor.relation] += 1;
  if (descriptor.sampleClass === "checkpoint-neighbour") totals.checkpointNeighbourCases += 1;
  updateJdnRange(totals, descriptor);
}

function summaryProjection(state, extra) {
  const totals = state.totals;
  return {
    schema: STATE_SCHEMA,
    harnessVersion: HARNESS_VERSION,
    seed: state.seed,
    commit: state.commit,
    fastEngineSha256: state.fastEngineSha256,
    fastEngineInfo: state.fastEngineInfo,
    startedUtc: state.startedUtc,
    lastCommittedUtc: state.lastCommittedUtc,
    nextBatch: state.nextBatch,
    totalBatches: totals.batches,
    totalCases: totals.totalCases,
    totalEngineDaysChecked: totals.totalEngineDaysChecked,
    fullYearDaysChecked: totals.fullYearDaysChecked,
    failures: extra.failures,
    infrastructureRetries: extra.infrastructureRetries,
    jdnRange: { min: totals.minJdn, max: totals.maxJdn },
    relationCounts: totals.relations,
    checkpointNeighbourCases: totals.checkpointNeighbourCases,
    minYearLength: totals.minYearLength,
    maxYearLength: totals.maxYearLength,
    longestCutlet: totals.longestCutlet,
    runtimeSeconds: Number(totals.runtimeSeconds.toFixed(3)),
    averageLogicalCasesPerSecond: totals.runtimeSeconds > 0
      ? Number((totals.totalCases / totals.runtimeSeconds).toFixed(6))
      : 0,
    rssPeakMb: Number(totals.rssPeakMb.toFixed(1)),
    runtime: state.runtime,
    paths: state.paths,
  };
}

async function readRetryCount(stateDir) {
  const filePath = path.join(stateDir, "infrastructure-retries.ndjson");
  try {
    const text = await readFile(filePath, "utf8");
    return text.split(/\r?\n/).filter(Boolean).length;
  } catch {
    return 0;
  }
}

async function writeSummary(state, stateDir, config, recordRetry) {
  const failures = await countJsonFiles(path.join(stateDir, "failures"));
  const infrastructureRetries = await readRetryCount(stateDir);
  const summary = summaryProjection(state, { failures, infrastructureRetries });
  await atomicWriteJson(path.join(stateDir, "summary.json"), summary, config.infraRetries, recordRetry);
  return summary;
}

async function createFailureRecord({ state, descriptor, fastResult, oracleResult, replayResult, kind, command, runtime, fastHash }) {
  return {
    schema: 1,
    harnessVersion: HARNESS_VERSION,
    kind,
    utc: new Date().toISOString(),
    seed: state.seed,
    batch: descriptor.batch,
    case: descriptor.case,
    sampleClass: descriptor.sampleClass,
    c: descriptor.c,
    t: descriptor.t,
    relation: descriptor.relation,
    fastResult: fastResult ?? null,
    expectedOracleResult: oracleResult ?? null,
    replayResult: replayResult ?? null,
    commit: state.commit,
    fastEngineSha256: fastHash,
    runtime,
    replayCommand: command,
  };
}

function replayCommand(scriptPath, state, descriptor) {
  const rel = path.relative(path.dirname(path.dirname(scriptPath)), scriptPath).replaceAll(path.sep, "/");
  return `node ${rel} replay --seed ${state.seed} --anchor-jdn ${state.anchorJdn} --batch-size ${state.generation.batchSize} --checkpoint-k ${state.generation.checkpointK} --replay-batch ${descriptor.batch} --replay-case ${descriptor.case} --sample-class ${descriptor.sampleClass} --commit ${state.commit}`;
}

async function saveFailure(stateDir, record, config, recordRetry) {
  await mkdir(path.join(stateDir, "failures"), { recursive: true });
  const id = `batch-${String(record.batch).padStart(8, "0")}-case-${String(record.case).padStart(6, "0")}-${Date.now()}`;
  const filePath = path.join(stateDir, "failures", `${id}.json`);
  await atomicWriteJson(filePath, record, config.infraRetries, recordRetry);
  await appendSynced(path.join(stateDir, "run.log"),
    `[FAILURE] ${record.utc} batch=${record.batch} case=${record.case} class=${record.sampleClass} kind=${record.kind} c=${record.c} t=${record.t}\n`);
  return filePath;
}

async function persistFailureAndReplay({
  stateDir,
  state,
  descriptor,
  fastResult,
  oracleResult,
  kind,
  config,
  recordRetry,
  scriptPath,
  repoRoot,
  instrumentedFastPath,
  fastHash,
}) {
  const command = replayCommand(scriptPath, state, descriptor);
  let replayResult;
  try {
    const replayFast = await runFreshReplay(pathToFileURL(scriptPath), instrumentedFastPath, descriptor);
    let replayOracle = null;
    if (kind === "oracle-mismatch" && replayFast.status === "ok") {
      replayOracle = await compareOracle(pathToFileURL(scriptPath), repoRoot, descriptor, replayFast, config, stateDir);
    }
    replayResult = {
      fast: replayFast,
      oracle: replayOracle,
      reproduced: kind === "oracle-mismatch"
        ? Boolean(replayOracle?.mismatches?.length)
        : replayFast.status !== "ok",
    };
  } catch (error) {
    replayResult = {
      status: "replay-infrastructure-failure",
      error: String(error?.stack ?? error),
      reproduced: null,
    };
  }

  const record = await createFailureRecord({
    state,
    descriptor,
    fastResult,
    oracleResult,
    replayResult,
    kind,
    command,
    runtime: runtimeInfo(),
    fastHash,
  });
  const failureFile = await saveFailure(stateDir, record, config, recordRetry);
  process.stderr.write(`FAILURE saved: ${failureFile}\nReplay: ${command}\n`);
  return { failureFile, replayResult, command };
}

async function recordInfrastructureRetry(stateDir, details) {
  const record = { utc: new Date().toISOString(), ...details };
  try {
    await appendSynced(path.join(stateDir, "infrastructure-retries.ndjson"), `${JSON.stringify(record)}\n`);
    await appendSynced(path.join(stateDir, "run.log"),
      `[INFRA-RETRY] ${record.utc} operation=${record.operation} attempt=${record.attempt} message=${record.message}\n`);
  } catch {
    process.stderr.write(`[INFRA-RETRY-UNLOGGED] ${JSON.stringify(record)}\n`);
  }
}

async function runFastCaseWithRetry(worker, descriptor, stateDir, config) {
  let lastError;
  for (let attempt = 0; attempt <= config.infraRetries; attempt += 1) {
    try {
      return await worker.run(descriptor);
    } catch (error) {
      lastError = error;
      if (attempt >= config.infraRetries) break;
      await recordInfrastructureRetry(stateDir, {
        operation: `worker-${worker.index}-case`,
        attempt: attempt + 1,
        batch: descriptor.batch,
        case: descriptor.case,
        message: String(error?.message ?? error),
      });
      await worker.restart();
    }
  }
  throw new InfrastructureError(
    `Worker ${worker.index} could not complete batch ${descriptor.batch} case ${descriptor.case} after ${config.infraRetries} retries`,
    lastError,
  );
}

async function runFreshReplay(scriptUrl, instrumentedFastPath, descriptor) {
  const worker = new WorkerClient(10_000, scriptUrl, instrumentedFastPath);
  try {
    return await worker.run({ ...descriptor, checkDeterminism: true });
  } finally {
    await worker.close();
  }
}

async function runReplay({ parsed, repoRoot, scriptPath, instrumentedFastPath, instrumented, config, state }) {
  const batch = parseInteger(parsed.replay_batch, "--replay-batch", { min: 0 });
  const caseIndex = parseInteger(parsed.replay_case, "--replay-case", { min: 0 });
  const seed = normalizeSeed(parsed.seed ?? state?.seed);
  const anchorJdn = BigInt(parsed.anchor_jdn ?? state?.anchorJdn ?? (() => { throw new HarnessError("Replay needs --anchor-jdn or an existing state file.", "ERR_REPLAY"); })());
  const generation = state?.generation ?? caseGenerationFingerprint(config);
  const sampleClass = parsed.sample_class ?? classForBatch("soak", batch);
  if (sampleClass === "year-sweep" && caseIndex > 0) {
    throw new HarnessError("A year-sweep batch has only case 0.", "ERR_REPLAY");
  }
  const descriptor = generateCase({
    seed,
    batch,
    caseIndex,
    sampleClass,
    anchorJdn,
    checkpoints: instrumented.__soakGateCheckpoints,
    checkpointK: Number(generation.checkpointK),
  });
  const scriptUrl = pathToFileURL(scriptPath);
  const fast = await runFreshReplay(scriptUrl, instrumentedFastPath, descriptor);
  let expected = null;
  let oracleError = null;
  try {
    const oracleResponse = await runOracleOneShot(pathToFileURL(scriptPath), repoRoot, descriptor, [descriptor.t]);
    if (oracleResponse.status === "ok") expected = oracleResponse.results[descriptor.t];
    else oracleError = oracleResponse.error;
  } catch (error) {
    oracleError = { name: error?.name, message: error?.message, stack: error?.stack };
  }
  const output = {
    harnessVersion: HARNESS_VERSION,
    seed: seedHex(seed),
    batch,
    case: caseIndex,
    descriptor,
    fast,
    oraclePrimary: expected,
    oracleError,
    primaryMatchesOracle: fast.status === "ok" && expected !== null ? sameCanonical(fast.primary, expected) : null,
  };
  process.stdout.write(stableJson(output));
  return fast.status === "ok" && (expected === null || sameCanonical(fast.primary, expected)) ? 0 : 1;
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.command === "help") {
    process.stdout.write(usage());
    return 0;
  }

  const scriptPath = fileURLToPath(import.meta.url);
  const repoRoot = path.resolve(path.dirname(scriptPath), "..");
  const mode = parsed.command === "smoke" ? "smoke" : "soak";
  const config = configFromOptions(parsed, mode);
  const defaultStateName = mode === "smoke" ? ".pastafari-soak-smoke" : ".pastafari-soak";
  const stateDir = path.resolve(repoRoot, parsed.state_dir ?? defaultStateName);
  // Acquire before --reset so a second invocation can never delete a live
  // run's checkpoint directory or its lock.
  const releaseStateLock = parsed.command === "replay" ? null : await acquireStateLock(stateDir);
  if (parsed.reset && parsed.command !== "replay") await rm(stateDir, { recursive: true, force: true });
  await mkdir(stateDir, { recursive: true });
  await mkdir(path.join(stateDir, "batches"), { recursive: true });
  await mkdir(path.join(stateDir, "failures"), { recursive: true });

  const logPath = path.join(stateDir, "run.log");
  const recordRetry = async (attempt, error) => recordInfrastructureRetry(stateDir, {
    operation: "atomic-write",
    attempt,
    message: String(error?.message ?? error),
  });

  const fastPath = path.join(repoRoot, "browser", "pastafari-calendar-fast.js");
  const corePath = path.join(repoRoot, "browser", "pastafari-calendar-core.js");
  await access(fastPath, fsConstants.R_OK).catch(() => {
    throw new HarnessError(`Fast engine not found: ${fastPath}`, "ERR_FAST_ENGINE_MISSING");
  });
  if (config.oracleEnabled || parsed.command === "replay") {
    await access(corePath, fsConstants.R_OK).catch(() => {
      throw new HarnessError(`Oracle module not found: ${corePath}`, "ERR_ORACLE_MISSING");
    });
  }

  const fastHash = await sha256File(fastPath);
  const discoveredCommit = parsed.commit ?? discoverGitCommit(repoRoot);
  const commit = discoveredCommit ?? "not-available";
  const instrumentedFastPath = await buildInstrumentedFast(
    repoRoot, stateDir, fastHash, config.infraRetries, recordRetry,
  );
  const instrumented = await import(`${pathToFileURL(instrumentedFastPath).href}?main=${Date.now()}`);
  const checkpoints = instrumented.__soakGateCheckpoints;
  assertInvariant(Array.isArray(checkpoints) && checkpoints.length > 0, "fast engine exposes no checkpoints to the soak harness");
  const engineInfo = instrumented.FAST_IMPLEMENTATION_INFO;

  const statePath = path.join(stateDir, "state.json");
  let existingState = null;
  if (await pathExists(statePath)) existingState = JSON.parse(await readFile(statePath, "utf8"));

  if (parsed.command === "replay") {
    return runReplay({ parsed, repoRoot, scriptPath, instrumentedFastPath, instrumented, config, state: existingState });
  }

  if (parsed.command === "resume" && existingState === null) {
    throw new HarnessError(`No checkpoint exists in ${stateDir}`, "ERR_NO_STATE");
  }
  if (parsed.command === "resume" && existingState !== null) {
    // Resume inherits the deterministic case-generation settings unless the
    // user explicitly supplies them. Resource/oracle settings may be changed
    // between sessions without changing which cases are generated.
    if (parsed.batch_size === undefined) config.batchSize = existingState.generation.batchSize;
    if (parsed.checkpoint_k === undefined) config.checkpointK = existingState.generation.checkpointK;
  }
  if (parsed.command === "smoke" && existingState !== null && !parsed.reset) {
    throw new HarnessError(`Smoke state already exists in ${stateDir}; use --reset or another --state-dir.`, "ERR_STATE_EXISTS");
  }

  const seed = existingState ? normalizeSeed(existingState.seed) : normalizeSeed(parsed.seed);
  let anchorJdn;
  if (existingState) {
    anchorJdn = BigInt(existingState.anchorJdn);
  } else if (parsed.anchor_jdn !== undefined) {
    anchorJdn = BigInt(parsed.anchor_jdn);
  } else {
    const now = new Date();
    anchorJdn = instrumented.gregorianToJdn(
      new instrumented.GregorianDate(BigInt(now.getUTCFullYear()), now.getUTCMonth() + 1, now.getUTCDate()),
    );
  }

  let state;
  if (existingState) {
    if (existingState.fastEngineSha256 !== fastHash) {
      throw new HarnessError(
        `Refusing resume: fast-engine hash changed from ${existingState.fastEngineSha256} to ${fastHash}.`,
        "ERR_RESUME_HASH_CHANGED",
      );
    }
    if (existingState.commit !== "not-available" && commit !== "not-available" && existingState.commit !== commit) {
      throw new HarnessError(
        `Refusing resume: commit changed from ${existingState.commit} to ${commit}.`,
        "ERR_RESUME_COMMIT_CHANGED",
      );
    }
    const wantedGeneration = caseGenerationFingerprint(config);
    if (stableJson(existingState.generation) !== stableJson(wantedGeneration)) {
      throw new HarnessError(
        "Refusing resume: case-generation settings changed. Use the original --batch-size/--checkpoint-k or a new --state-dir.",
        "ERR_RESUME_CONFIG_CHANGED",
      );
    }
    state = existingState;
  } else {
    state = {
      schema: STATE_SCHEMA,
      harnessVersion: HARNESS_VERSION,
      seed: seedHex(seed),
      anchorJdn: String(anchorJdn),
      commit,
      fastEngineSha256: fastHash,
      fastEngineInfo: engineInfo,
      generation: caseGenerationFingerprint(config),
      startedUtc: new Date().toISOString(),
      lastCommittedUtc: null,
      nextBatch: 0,
      totals: initialTotals(),
      runtime: runtimeInfo(),
      paths: {
        log: path.relative(repoRoot, logPath),
        checkpoint: path.relative(repoRoot, statePath),
        summary: path.relative(repoRoot, path.join(stateDir, "summary.json")),
        failures: path.relative(repoRoot, path.join(stateDir, "failures")),
        batches: path.relative(repoRoot, path.join(stateDir, "batches")),
      },
    };
    await writeSummary(state, stateDir, config, recordRetry);
    await atomicWriteJson(statePath, state, config.infraRetries, recordRetry);
  }

  if (state.commit === "not-available" && commit !== "not-available") state.commit = commit;

  const header = {
    type: "run-start",
    utc: new Date().toISOString(),
    harnessVersion: HARNESS_VERSION,
    mode,
    seed: state.seed,
    anchorJdn: state.anchorJdn,
    commit: state.commit,
    fastEngineSha256: fastHash,
    fastEngineInfo: engineInfo,
    minYearDays: instrumented.__soakMinYearDays,
    maxYearDays: instrumented.__soakMaxYearDays,
    checkpoints: checkpoints.length,
    checkpointFirst: checkpoints[0],
    checkpointLast: checkpoints.at(-1),
    runtime: runtimeInfo(),
    config,
  };
  await appendSynced(logPath, `${JSON.stringify(header, jsonReplacer)}\n`);
  process.stdout.write(
    `Pastafari fast soak ${HARNESS_VERSION}\n`
    + `mode=${mode} seed=${state.seed} commit=${state.commit}\n`
    + `fast-sha256=${fastHash}\n`
    + `year-days=${instrumented.__soakMinYearDays}..${instrumented.__soakMaxYearDays} checkpoints=${checkpoints.length}\n`
    + `state=${stateDir}\n`
    + `workers=${config.workers} (requested ${config.workersRequested}, CPU cap ${config.maxCpu}%) oracle=${config.oracleEnabled ? `1/${config.oracleEvery} + structural` : "disabled"}\n`,
  );
  if (config.workers < config.workersRequested) {
    process.stdout.write(`worker count clamped from ${config.workersRequested} to ${config.workers} by --max-cpu\n`);
  }
  if (config.workers > 1 && config.oracleEnabled) {
    process.stdout.write("warning: multiple fast workers plus the large oracle can use substantial RAM\n");
  }

  const workers = Array.from({ length: config.workers }, (_, index) => new WorkerClient(
    index, pathToFileURL(scriptPath), instrumentedFastPath,
  ));
  workers.forEach((worker) => worker.start());
  let stopRequested = false;
  let secondSignal = false;
  const signalHandler = (signal) => {
    if (stopRequested) {
      secondSignal = true;
      process.stderr.write(`\nSecond ${signal}: terminating immediately; last committed batch remains resumable.\n`);
      workers.forEach((worker) => worker.close().catch(() => {}));
      process.exit(130);
    }
    stopRequested = true;
    process.stderr.write(`\n${signal}: will stop after the current batch is durably committed.\n`);
  };
  process.on("SIGINT", signalHandler);
  process.on("SIGTERM", signalHandler);

  const sessionStart = performance.now();
  const initialTotalCases = state.totals.totalCases;
  let exitCode = 0;

  try {
    while (true) {
      const elapsedMs = performance.now() - sessionStart;
      if (stopRequested) break;
      if (config.durationMs !== null && elapsedMs >= config.durationMs) break;
      if (config.maxCases !== null && state.totals.totalCases - initialTotalCases >= config.maxCases) break;

      const batch = state.nextBatch;
      const sampleClass = classForBatch(mode, batch);
      const remaining = config.maxCases === null
        ? null
        : config.maxCases - (state.totals.totalCases - initialTotalCases);
      const casesInBatch = batchCaseCount(mode, sampleClass, config, remaining);
      if (casesInBatch <= 0) break;
      const descriptors = [];
      for (let caseIndex = 0; caseIndex < casesInBatch; caseIndex += 1) {
        descriptors.push(generateCase({
          seed,
          batch,
          caseIndex,
          sampleClass,
          anchorJdn,
          checkpoints,
          checkpointK: config.checkpointK,
        }));
      }

      const batchStart = performance.now();
      const batchTotalsBefore = structuredClone(state.totals);
      const completed = [];
      const continuedFailures = [];
      let batchFailure = null;

      const continueOrStopFailure = async (failure) => {
        if (!config.continueAfterFailure) {
          batchFailure = failure;
          return false;
        }
        const persisted = await persistFailureAndReplay({
          stateDir,
          state,
          descriptor: failure.descriptor,
          fastResult: failure.fastResult,
          oracleResult: failure.oracleResult,
          kind: failure.kind,
          config,
          recordRetry,
          scriptPath,
          repoRoot,
          instrumentedFastPath,
          fastHash,
        });
        applyFailedCase(state.totals, failure.descriptor, failure.fastResult);
        continuedFailures.push({
          descriptor: failure.descriptor,
          kind: failure.kind,
          failureFile: path.relative(repoRoot, persisted.failureFile),
          fastResult: failure.fastResult,
        });
        return true;
      };

      for (let offset = 0; offset < descriptors.length && batchFailure === null; offset += config.workers) {
        const chunk = descriptors.slice(offset, offset + config.workers);
        const chunkResults = await Promise.all(chunk.map((descriptor, index) =>
          runFastCaseWithRetry(workers[index], descriptor, stateDir, config)
            .then((result) => ({ descriptor, result, workerIndex: index }))));
        chunkResults.sort((a, b) => a.descriptor.case - b.descriptor.case);

        for (const item of chunkResults) {
          const { descriptor, result } = item;
          if (result.status !== "ok") {
            const shouldContinue = await continueOrStopFailure({
              descriptor, fastResult: result, kind: "engine-or-invariant-failure", oracleResult: null,
            });
            if (!shouldContinue) break;
            continue;
          }

          let oracleResult = null;
          if (shouldUseOracle(descriptor, config)) {
            try {
              // Release the fast worker's calculation caches before loading the
              // very large oracle isolate. This keeps the default usable on a
              // personal computer without changing which result was tested.
              await workers[item.workerIndex].restart();
              oracleResult = await compareOracle(pathToFileURL(scriptPath), repoRoot, descriptor, result, config, stateDir);
            } catch (error) {
              const shouldContinue = await continueOrStopFailure({
                descriptor,
                fastResult: result,
                kind: "oracle-execution-failure",
                oracleResult: { error: { name: error?.name, message: error?.message, stack: error?.stack } },
              });
              if (!shouldContinue) break;
              continue;
            }
            if (oracleResult.oracleFailure) {
              const shouldContinue = await continueOrStopFailure({
                descriptor, fastResult: result, kind: "oracle-execution-failure", oracleResult,
              });
              if (!shouldContinue) break;
              continue;
            }
            if (oracleResult.mismatches.length > 0) {
              const shouldContinue = await continueOrStopFailure({
                descriptor, fastResult: result, kind: "oracle-mismatch", oracleResult,
              });
              if (!shouldContinue) break;
              continue;
            }
          }

          applySuccessfulCase(state.totals, descriptor, result);
          completed.push({ descriptor, result, oracle: oracleResult });
        }
      }

      if (batchFailure !== null) {
        const persisted = await persistFailureAndReplay({
          stateDir,
          state,
          descriptor: batchFailure.descriptor,
          fastResult: batchFailure.fastResult,
          oracleResult: batchFailure.oracleResult,
          kind: batchFailure.kind,
          config,
          recordRetry,
          scriptPath,
          repoRoot,
          instrumentedFastPath,
          fastHash,
        });

        // Default stop mode never commits a partially failed deterministic
        // batch. Restore its successful-prefix counters so resume reruns the
        // whole batch from the last durable checkpoint. The failure evidence
        // itself remains durable and independently replayable.
        state.totals = batchTotalsBefore;
        await writeSummary(state, stateDir, config, recordRetry);
        void persisted;
        exitCode = 1;
        break;
      }

      const seconds = (performance.now() - batchStart) / 1000;
      const rssMb = process.memoryUsage().rss / 1024 / 1024;
      state.totals.runtimeSeconds += seconds;
      state.totals.rssPeakMb = Math.max(state.totals.rssPeakMb, rssMb);
      state.totals.batches += 1;
      state.nextBatch += 1;
      state.lastCommittedUtc = new Date().toISOString();
      const batchEngineDays = completed.reduce((sum, item) => sum + (item.result.checkedDays ?? 0), 0)
        + continuedFailures.reduce((sum, item) => sum + (item.fastResult?.checkedDays ?? 1), 0);
      const fullYearRecords = completed.flatMap((item) => (item.result.fullYearDays > 0 ? item.result.yearRecords : []));
      const record = {
        type: "batch",
        harnessVersion: HARNESS_VERSION,
        seed: state.seed,
        batch,
        sampleClass,
        casesInBatch: completed.length + continuedFailures.length,
        failedCasesInBatch: continuedFailures.length,
        totalCases: state.totals.totalCases,
        engineDaysCheckedInBatch: batchEngineDays,
        fullYearDaysCheckedInBatch: completed.reduce((sum, item) => sum + (item.result.fullYearDays ?? 0), 0),
        failures: await countJsonFiles(path.join(stateDir, "failures")),
        infrastructureRetries: await readRetryCount(stateDir),
        seconds: Number(seconds.toFixed(3)),
        casesPerSecond: Number(((completed.length + continuedFailures.length) / seconds).toFixed(6)),
        rssMb: Number(rssMb.toFixed(1)),
        workers: config.workers,
        processes: 1,
        commit: state.commit,
        fastEngineSha256: fastHash,
        utc: state.lastCommittedUtc,
        yearSweeps: fullYearRecords,
        cases: completed.map((item) => ({
          case: item.descriptor.case,
          c: item.descriptor.c,
          t: item.descriptor.t,
          relation: item.descriptor.relation,
          sampleClass: item.descriptor.sampleClass,
          checkedDays: item.result.checkedDays,
          fullYearDays: item.result.fullYearDays,
          oracleTargetsChecked: item.oracle?.targetsChecked ?? [],
          yearRecords: item.result.yearRecords,
          cutletLength: item.result.cutletLength,
        })),
        failedCases: continuedFailures.map((item) => ({
          case: item.descriptor.case,
          c: item.descriptor.c,
          t: item.descriptor.t,
          relation: item.descriptor.relation,
          sampleClass: item.descriptor.sampleClass,
          kind: item.kind,
          failureFile: item.failureFile,
        })),
      };

      const batchFile = path.join(stateDir, "batches", `batch-${String(batch).padStart(8, "0")}.json`);
      // Durability order: batch evidence -> human log -> summary -> checkpoint LAST.
      // Therefore a power loss never advances nextBatch before its evidence exists.
      await atomicWriteJson(batchFile, record, config.infraRetries, recordRetry);
      await appendSynced(logPath, `[BATCH] ${JSON.stringify(record)}\n`);
      const summary = await writeSummary(state, stateDir, config, recordRetry);
      await atomicWriteJson(statePath, state, config.infraRetries, recordRetry);

      process.stdout.write(
        `[batch ${batch}] class=${sampleClass} cases=${record.casesInBatch} total=${record.totalCases} `
        + `failures=${record.failures} seconds=${record.seconds} rate=${record.casesPerSecond}/s `
        + `rss=${record.rssMb}MB utc=${record.utc}\n`,
      );
      if (fullYearRecords.length > 0) {
        for (const year of fullYearRecords) {
          process.stdout.write(
            `  year start=${year.startJdn} end=${year.endJdn} length=${year.length} days-checked=${year.length}\n`,
          );
        }
      }
      if (rssMb >= config.memoryWarnMb) {
        const warning = `[MEMORY-WARNING] RSS ${rssMb.toFixed(1)}MB >= ${config.memoryWarnMb}MB at batch ${batch}`;
        process.stderr.write(`${warning}\n`);
        await appendSynced(logPath, `${warning}\n`);
      }
      void summary;
    }
  } finally {
    process.removeListener("SIGINT", signalHandler);
    process.removeListener("SIGTERM", signalHandler);
    await Promise.all(workers.map((worker) => worker.close()));
    await writeSummary(state, stateDir, config, recordRetry).catch(() => {});
    if (releaseStateLock) await releaseStateLock();
  }

  const reason = secondSignal ? "second-signal" : stopRequested ? "signal" : exitCode ? "failure" : "limit-or-complete";
  process.stdout.write(`Stopped: ${reason}. Resume checkpoint: ${statePath}\n`);
  return exitCode;
}

if (!isMainThread && workerData?.role === "soak-worker") {
  await workerEntry();
} else if (!isMainThread && workerData?.role === "oracle-one-shot") {
  await oracleOneShotWorkerEntry();
} else if (isMainThread) {
  try {
    const code = await main();
    process.exitCode = code;
  } catch (error) {
    process.stderr.write(`${error?.stack ?? error}\n`);
    process.exitCode = 1;
  }
}
