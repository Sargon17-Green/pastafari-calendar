#!/usr/bin/env node
"use strict";

import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WORKER = path.join(ROOT, "verification/update17/gate-batch-worker.mjs");
const outArg = process.argv.find((arg) => arg.startsWith("--out="));
if (!outArg) throw new Error("--out=<path> is required");
const outputPath = path.resolve(ROOT, outArg.slice("--out=".length));
const parallelArg = process.argv.find((arg) => arg.startsWith("--parallel="));
const concurrency = Math.max(1, Math.min(8, Number(parallelArg?.slice("--parallel=".length) || 4)));
const minimum = -32_768;
const maximum = 40_000;
const chunkSize = 2_000;
const timeoutMs = 90_000;
const maxAttempts = 4;

function chunksForRange(start, end) {
  const chunks = [];
  if (start < 0) {
    for (let high = -1; high >= start; high -= chunkSize) {
      chunks.push([high, Math.max(start, high - chunkSize + 1)]);
    }
  } else {
    for (let low = start; low <= end; low += chunkSize) {
      chunks.push([low, Math.min(end, low + chunkSize - 1)]);
    }
  }
  return chunks;
}

function runChunk(start, end, attempt = 1) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [WORKER, String(start), String(end)], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
    }, timeoutMs);
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (code === 0) {
        try {
          const rows = JSON.parse(stdout);
          resolve(rows);
        } catch (error) {
          reject(new Error(`invalid gate worker JSON ${start}..${end}: ${error.message}`));
        }
        return;
      }
      reject(new Error(`gate worker ${start}..${end} attempt ${attempt} failed: code=${code} signal=${signal || "none"} ${stderr}`));
    });
  });
}

async function runChunkWithRetry(start, end) {
  let last;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      if (attempt > 1) console.error(`[update17] retry gate chunk ${start}..${end} attempt=${attempt}`);
      return await runChunk(start, end, attempt);
    } catch (error) {
      last = error;
    }
  }
  throw last;
}

async function pooled(items, limit, fn) {
  const output = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      const [start, end] = items[index];
      console.error(`[update17] fresh gate cache chunk ${start}..${end}`);
      output[index] = await fn(start, end);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return output;
}

const chunks = [
  ...chunksForRange(minimum, -1),
  ...chunksForRange(1, maximum),
];
const parts = await pooled(chunks, concurrency, runChunkWithRetry);
const map = new Map();
for (const rows of parts) {
  for (const [index, gap] of rows) {
    const numericIndex = Number(index);
    if (map.has(numericIndex)) throw new Error(`duplicate gate gap ${numericIndex}`);
    map.set(numericIndex, String(gap));
  }
}
if (map.size !== maximum - minimum) {
  throw new Error(`incomplete gate cache: ${map.size} != ${maximum - minimum}`);
}
for (let index = minimum; index <= maximum; index += 1) {
  if (index === 0) continue;
  if (!map.has(index)) throw new Error(`missing gate gap ${index}`);
}
const gaps = [...map.entries()].sort((a, b) => a[0] - b[0]);
const document = { schema: "pastafari-update17-ephemeral-gate-cache-v1", minimum, maximum, gaps };
await writeFile(outputPath, `${JSON.stringify(document)}\n`, "utf8");
console.error(`[update17] fresh gate cache complete gaps=${gaps.length}`);
