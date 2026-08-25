"use strict";

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
export const OUT_DIR = path.join(ROOT, "artifacts", "final-release");

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export async function sha256File(relativePath) {
  return sha256(await readFile(path.join(ROOT, ...relativePath.split("/"))));
}

export function stable(value) {
  return JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v);
}

export async function writeJson(name, value) {
  await mkdir(OUT_DIR, { recursive: true });
  const target = path.join(OUT_DIR, name);
  await writeFile(target, `${JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v, 2)}\n`, "utf8");
  return target;
}

export function run(command, args, { timeoutMs = 30 * 60_000, maxBuffer = 64 * 1024 * 1024, env = process.env } = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    timeout: timeoutMs,
    maxBuffer,
    env,
  });
  return {
    command: [command, ...args].join(" "),
    status: result.status,
    signal: result.signal,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    error: result.error?.message ?? null,
    pass: result.status === 0,
  };
}

export function requireRun(command, args, options = {}) {
  const result = run(command, args, options);
  if (!result.pass) {
    throw new Error(`${result.command} failed (${result.signal ?? result.status ?? result.error ?? "unknown"})\n${result.stderr.slice(-8000)}\n${result.stdout.slice(-8000)}`);
  }
  return result;
}

export function gitText(args) {
  return requireRun("git", args, { timeoutMs: 60_000 }).stdout.trim();
}

export function unzipList(zipPath) {
  return requireRun("unzip", ["-Z1", zipPath], { timeoutMs: 60_000 }).stdout.split(/\r?\n/u).filter(Boolean);
}

export function unzipText(zipPath, entry) {
  return requireRun("unzip", ["-p", zipPath, entry], { timeoutMs: 60_000 }).stdout;
}

export function moduleInventory(namespace) {
  return Object.keys(namespace).sort().map((name) => {
    const value = namespace[name];
    return {
      name,
      type: typeof value,
      arity: typeof value === "function" ? value.length : null,
    };
  });
}
