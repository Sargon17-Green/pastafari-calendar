#!/usr/bin/env node
"use strict";

import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const engine = process.argv.find((arg) => arg.startsWith("--engine="))?.slice("--engine=".length) || "fast";
const calculationFilter = process.argv.find((arg) => arg.startsWith("--calculation="))?.slice("--calculation=".length);
const maxParallelArg = process.argv.find((arg) => arg.startsWith("--parallel="));
const maxParallel = Math.max(1, Number(maxParallelArg?.slice("--parallel=".length) || (engine === "authoritative" ? 2 : 3)));

if (!new Set(["fast", "authoritative"]).has(engine)) {
  throw new Error(`unknown engine ${engine}`);
}

const corpus = JSON.parse(await readFile(new URL("./generated/normative-final-tuples.json", import.meta.url), "utf8"));

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

async function directMatrix(calculationJdn) {
  const namespace = engine === "authoritative"
    ? await import("../../browser/pastafari-calendar-core.js")
    : await import("../../browser/pastafari-calendar-fast.js");
  const vectors = corpus.vectors.filter((vector) => String(vector.input.calculationJdn) === String(calculationJdn));
  const calendar = new namespace.PastafariCalendar({
    todayProvider: () => new namespace.GregorianDate(2000n, 1, 1),
  });
  const rows = [];
  let mismatches = 0;
  for (const vector of vectors) {
    const actual = canonical(calendar.convertJdn(BigInt(vector.input.targetJdn), {
      calculationJdn: BigInt(vector.input.calculationJdn),
    }));
    const expected = canonical(vector.expected);
    const match = JSON.stringify(actual) === JSON.stringify(expected);
    if (!match) mismatches += 1;
    rows.push({
      id: vector.id,
      calculationJdn: String(vector.input.calculationJdn),
      targetJdn: String(vector.input.targetJdn),
      match,
      ...(!match ? { expected, actual } : {}),
    });
  }
  return {
    schema: "pastafari-update17-engine-matrix-v1",
    engine,
    calculationJdn: String(calculationJdn),
    cases: rows.length,
    matches: rows.length - mismatches,
    mismatches,
    status: mismatches ? "FAIL" : "PASS",
    rows,
  };
}

async function childMatrix(calculationJdn) {
  const self = fileURLToPath(import.meta.url);
  const args = [self, `--engine=${engine}`, `--calculation=${calculationJdn}`];
  const timeoutMs = engine === "authoritative" ? 20 * 60_000 : 10 * 60_000;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`${engine} matrix timed out for calculation ${calculationJdn}`));
    }, timeoutMs);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`${engine} matrix child failed for calculation ${calculationJdn}: code=${code} signal=${signal || "none"}\n${stderr}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (error) {
        reject(new Error(`invalid matrix JSON for calculation ${calculationJdn}: ${error.message}\nstdout=${stdout}\nstderr=${stderr}`));
      }
    });
  });
}

async function pooled(items, concurrency, fn) {
  const output = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      const item = items[index];
      console.error(`[update17] ${engine} matrix calculation=${item}`);
      output[index] = await fn(item);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return output;
}

let result;
if (calculationFilter !== undefined) {
  result = await directMatrix(calculationFilter);
} else {
  const calculations = [...new Set(corpus.vectors.map((vector) => String(vector.input.calculationJdn)))];
  const parts = await pooled(calculations, maxParallel, childMatrix);
  const rows = parts.flatMap((part) => part.rows);
  const mismatches = parts.reduce((sum, part) => sum + part.mismatches, 0);
  result = {
    schema: "pastafari-update17-engine-matrix-v1",
    engine,
    calculationAnchors: calculations,
    execution: { isolatedByCalculationAnchor: true, maxParallel },
    cases: rows.length,
    matches: rows.length - mismatches,
    mismatches,
    status: mismatches ? "FAIL" : "PASS",
    rows,
  };
}

console.log(JSON.stringify(result, null, 2));
if (result.mismatches) process.exitCode = 2;
