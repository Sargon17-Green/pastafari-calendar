"use strict";

import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const MANIFEST = "SHA256SUMS.txt";

function fail(message) {
  console.error(`SHA manifest completeness FAIL: ${message}`);
  process.exitCode = 1;
}

const manifestText = await readFile(MANIFEST, "utf8");
const manifestPaths = [];
const seen = new Set();
for (const [index, line] of manifestText.split(/\r?\n/).entries()) {
  if (line === "") continue;
  const match = /^([0-9a-f]{64})  \.\/(.+)$/.exec(line);
  if (!match) {
    fail(`invalid line ${index + 1}: ${JSON.stringify(line)}`);
    continue;
  }
  const path = match[2];
  if (path === MANIFEST) {
    fail(`${MANIFEST} must not hash itself`);
    continue;
  }
  if (seen.has(path)) {
    fail(`duplicate manifest path: ${path}`);
    continue;
  }
  seen.add(path);
  manifestPaths.push(path);
}

const { stdout } = await execFileAsync("git", ["ls-files", "-z"], {
  encoding: "buffer",
  maxBuffer: 16 * 1024 * 1024,
});
const tracked = stdout
  .toString("utf8")
  .split("\0")
  .filter(Boolean)
  .filter((path) => path !== MANIFEST)
  .sort();
const listed = [...manifestPaths].sort();
const trackedSet = new Set(tracked);
const listedSet = new Set(listed);
const unlisted = tracked.filter((path) => !listedSet.has(path));
const stale = listed.filter((path) => !trackedSet.has(path));

if (unlisted.length) fail(`tracked files missing from ${MANIFEST}: ${unlisted.join(", ")}`);
if (stale.length) fail(`manifest paths not tracked by git: ${stale.join(", ")}`);
if (!process.exitCode) {
  console.log(`SHA manifest completeness PASS: ${tracked.length} tracked files covered (excluding ${MANIFEST} itself).`);
}
