#!/usr/bin/env node
"use strict";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUTS = [
  "browser/standalone/pastafari-date.js",
  "browser/standalone/pastafari-date.min.js",
];
const REQUIRED_MARKERS = Object.freeze([
  "pastafari.update13.host-intl-taint",
  "pastafari.update13.tablets-semantic-seal",
]);

const files = [];
for (const relative of OUTPUTS) {
  const bytes = await readFile(path.join(ROOT, relative));
  const text = bytes.toString("utf8");
  const markers = Object.fromEntries(REQUIRED_MARKERS.map((marker) => [marker, text.includes(marker)]));
  files.push({
    file: relative,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    markers,
    pass: Object.values(markers).every(Boolean),
  });
}

const report = {
  schema: "pastafari-update13-standalone-firewall-v1",
  baselineCommit: "d8361bf852f54597f62daeaa293443e5c5d9ef84",
  requiredMarkers: REQUIRED_MARKERS,
  files,
  status: files.every((entry) => entry.pass) ? "PASS" : "FAIL",
};

await mkdir(path.join(ROOT, "artifacts"), { recursive: true });
await writeFile(
  path.join(ROOT, "artifacts", "update-13-standalone-firewall.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));
if (report.status !== "PASS") process.exitCode = 1;
