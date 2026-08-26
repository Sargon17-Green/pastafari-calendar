#!/usr/bin/env node
"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import * as publicApi from "../../src/public-api.js";
import * as authoritative from "../../browser/pastafari-calendar-core.js";
import * as fast from "../../browser/pastafari-calendar-fast.js";
import { OUT_DIR, ROOT, moduleInventory, stable, unzipList, unzipText, writeJson } from "./lib.mjs";

const ZIP = path.join(OUT_DIR, "update19-final-evidence.zip");
const entries = unzipList(ZIP);
const inventoryEntry = entries.find((entry) => entry.includes("u19-node-") && entry.endsWith("/public-api-inventory.json"));
if (!inventoryEntry) throw new Error("Update 19 public API inventory not found in archived evidence");
const expected = JSON.parse(unzipText(ZIP, inventoryEntry));
const packageJson = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));

const current = {
  package: {
    name: packageJson.name,
    version: packageJson.version,
    exports: packageJson.exports,
    bin: packageJson.bin ?? null,
    scripts: Object.keys(packageJson.scripts ?? {}).sort(),
  },
  public: moduleInventory(publicApi),
  authoritative: moduleInventory(authoritative),
  fast: moduleInventory(fast),
};
const failures = [];
if (packageJson.version !== "1.4.0") failures.push("package version is not 1.4.0");
for (const key of ["name", "exports", "bin", "scripts"]) {
  if (stable(current.package[key]) !== stable(expected.package[key])) failures.push(`package ${key} changed since Update 19`);
}
for (const key of ["public", "authoritative", "fast"]) {
  if (stable(current[key]) !== stable(expected[key])) failures.push(`${key} export/type/arity inventory changed since Update 19`);
}
const artifact = {
  schema: "pastafari.update20.api-compatibility.v1",
  generatedAt: new Date().toISOString(),
  status: failures.length ? "FAIL" : "PASS",
  update19InventoryEntry: inventoryEntry,
  expectedCounts: { public: expected.public.length, authoritative: expected.authoritative.length, fast: expected.fast.length },
  currentCounts: { public: current.public.length, authoritative: current.authoritative.length, fast: current.fast.length },
  packageExports: current.package.exports,
  publicApiBreakingChange: failures.length ? "DETECTED" : "NONE_DETECTED",
  failures,
};
await writeJson("api-compatibility.json", artifact);
console.log(JSON.stringify(artifact, null, 2));
if (failures.length) process.exitCode = 1;
