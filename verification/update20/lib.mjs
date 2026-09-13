"use strict";

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { inflateRawSync } from "node:zlib";
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

function readZipDirectory(zipPath) {
  const bytes = readFileSync(zipPath);
  const eocdSignature = 0x06054b50;
  const centralSignature = 0x02014b50;
  const localSignature = 0x04034b50;
  const minEocd = 22;
  const maxComment = 0xffff;
  let eocd = -1;
  for (let offset = bytes.length - minEocd; offset >= Math.max(0, bytes.length - minEocd - maxComment); offset -= 1) {
    if (bytes.readUInt32LE(offset) === eocdSignature) {
      eocd = offset;
      break;
    }
  }
  if (eocd < 0) throw new Error(`ZIP end-of-central-directory not found: ${zipPath}`);
  const entryCount = bytes.readUInt16LE(eocd + 10);
  const centralSize = bytes.readUInt32LE(eocd + 12);
  const centralOffset = bytes.readUInt32LE(eocd + 16);
  if (entryCount === 0xffff || centralSize === 0xffffffff || centralOffset === 0xffffffff) {
    throw new Error(`ZIP64 is not supported by the release evidence reader: ${zipPath}`);
  }
  const entries = [];
  let cursor = centralOffset;
  const centralEnd = centralOffset + centralSize;
  for (let index = 0; index < entryCount; index += 1) {
    if (cursor + 46 > bytes.length || bytes.readUInt32LE(cursor) !== centralSignature) {
      throw new Error(`Invalid ZIP central-directory entry ${index}: ${zipPath}`);
    }
    const flags = bytes.readUInt16LE(cursor + 8);
    const method = bytes.readUInt16LE(cursor + 10);
    const compressedSize = bytes.readUInt32LE(cursor + 20);
    const uncompressedSize = bytes.readUInt32LE(cursor + 24);
    const fileNameLength = bytes.readUInt16LE(cursor + 28);
    const extraLength = bytes.readUInt16LE(cursor + 30);
    const commentLength = bytes.readUInt16LE(cursor + 32);
    const localOffset = bytes.readUInt32LE(cursor + 42);
    if (compressedSize === 0xffffffff || uncompressedSize === 0xffffffff || localOffset === 0xffffffff) {
      throw new Error(`ZIP64 entry is not supported by the release evidence reader: ${zipPath}`);
    }
    const fileNameStart = cursor + 46;
    const fileNameEnd = fileNameStart + fileNameLength;
    if (fileNameEnd > bytes.length) throw new Error(`Truncated ZIP filename: ${zipPath}`);
    const name = bytes.subarray(fileNameStart, fileNameEnd).toString("utf8");
    entries.push({ name, method, compressedSize, uncompressedSize, localOffset });
    cursor = fileNameEnd + extraLength + commentLength;
  }
  if (cursor !== centralEnd) {
    throw new Error(`ZIP central-directory size mismatch: ${zipPath}`);
  }
  return { bytes, entries };
}

export function unzipList(zipPath) {
  return readZipDirectory(zipPath).entries.map((item) => item.name);
}

export function unzipText(zipPath, entry) {
  const { bytes, entries } = readZipDirectory(zipPath);
  const item = entries.find((candidate) => candidate.name === entry);
  if (!item) throw new Error(`ZIP entry not found: ${entry}`);
  const offset = item.localOffset;
  if (offset + 30 > bytes.length || bytes.readUInt32LE(offset) !== 0x04034b50) {
    throw new Error(`Invalid ZIP local header for ${entry}`);
  }
  const fileNameLength = bytes.readUInt16LE(offset + 26);
  const extraLength = bytes.readUInt16LE(offset + 28);
  const dataStart = offset + 30 + fileNameLength + extraLength;
  const dataEnd = dataStart + item.compressedSize;
  if (dataEnd > bytes.length) throw new Error(`Truncated ZIP payload for ${entry}`);
  const compressed = bytes.subarray(dataStart, dataEnd);
  let output;
  if (item.method === 0) output = Buffer.from(compressed);
  else if (item.method === 8) output = inflateRawSync(compressed);
  else throw new Error(`Unsupported ZIP compression method ${item.method} for ${entry}`);
  if (output.length !== item.uncompressedSize) {
    throw new Error(`ZIP size mismatch for ${entry}: expected ${item.uncompressedSize}, got ${output.length}`);
  }
  return output.toString("utf8");
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
