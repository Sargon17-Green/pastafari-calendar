"use strict";

import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

import { validatePackageFileSet } from "./release-lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE_JSON = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
const DEFAULT_TIMEOUT_MS = 300_000;
const PACKAGE_BUDGET = Object.freeze({
  packageSize: 95_000_000,
  unpackedSize: 125_000_000,
  fileCount: 300,
});
const INTENTIONAL_PACKAGE_EXCLUSIONS = Object.freeze([
  "src/ABSTRACT.txt",
  "types/soak-fast-engine.mjs",
]);
const INTENTIONAL_PACKAGE_EXCLUDED_PREFIXES = Object.freeze([
  "61fe/",
]);

function npmExecutable() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function runCapture(command, args, { cwd = ROOT, timeoutMs = DEFAULT_TIMEOUT_MS, env = process.env } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 5_000).unref();
    }, timeoutMs);

    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => {
      settled = true;
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code, signal) => {
      settled = true;
      clearTimeout(timer);
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
        reject(new Error(
          `${command} ${args.join(" ")} failed with ${signal ? `signal ${signal}` : `exit code ${code}`}.`,
        ));
      }
    });
  });
}

function parseNpmPackJson(stdout) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch (error) {
    throw new Error(`npm pack did not return valid JSON: ${error.message}`);
  }
  if (!Array.isArray(parsed) || parsed.length !== 1 || !parsed[0] || typeof parsed[0] !== "object") {
    throw new Error("npm pack returned an unexpected JSON structure.");
  }
  return parsed[0];
}

function packedPaths(packResult) {
  if (!Array.isArray(packResult.files)) throw new Error("npm pack JSON has no files array.");
  return packResult.files.map((entry) => entry.path).filter((value) => typeof value === "string");
}

async function listFilesRecursively(directory, relativePrefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = relativePrefix ? `${relativePrefix}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFilesRecursively(absolute, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }
  return files.sort();
}

export function validatePackageSizeBudget(packResult, budget = PACKAGE_BUDGET) {
  const failures = [];
  for (const key of ["packageSize", "unpackedSize"]) {
    const actual = packResult[key];
    const maximum = budget[key];
    if (typeof actual !== "number") failures.push(`npm pack did not report ${key}`);
    else if (actual > maximum) failures.push(`${key} ${actual} exceeds budget ${maximum}`);
  }
  const fileCount = Array.isArray(packResult.files) ? packResult.files.length : packResult.entryCount;
  if (typeof fileCount !== "number") failures.push("npm pack did not report file count");
  else if (fileCount > budget.fileCount) failures.push(`fileCount ${fileCount} exceeds budget ${budget.fileCount}`);
  if (failures.length) throw new Error(`Package-size regression guard failed:\n${failures.map((x) => `- ${x}`).join("\n")}`);
  return { packageSize: packResult.packageSize, unpackedSize: packResult.unpackedSize, fileCount };
}

async function validatePackageContentPolicy(packResult, root = ROOT) {
  const files = new Set(packedPaths(packResult));
  const failures = [];

  for (const excluded of INTENTIONAL_PACKAGE_EXCLUSIONS) {
    if (files.has(excluded)) failures.push(`development-only file leaked into package: ${excluded}`);
  }
  for (const prefix of INTENTIONAL_PACKAGE_EXCLUDED_PREFIXES) {
    for (const file of files) {
      if (file.startsWith(prefix)) failures.push(`development-only path leaked into package: ${file}`);
    }
  }

  // ./browser/* is a public wildcard export.  Packaging must therefore keep
  // every browser file that exists in the source tree, including nested
  // standalone assets and non-module static examples.
  const sourceBrowserFiles = (await listFilesRecursively(path.join(root, "browser")))
    .map((file) => `browser/${file}`);
  const missingBrowserFiles = sourceBrowserFiles.filter((file) => !files.has(file));
  if (missingBrowserFiles.length) {
    failures.push(`public ./browser/* files missing from package: ${missingBrowserFiles.join(", ")}`);
  }

  if (failures.length) {
    throw new Error(`Package-content policy failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  }
  return {
    browserFilesChecked: sourceBrowserFiles.length,
    intentionalExclusionsChecked: INTENTIONAL_PACKAGE_EXCLUSIONS.length
      + INTENTIONAL_PACKAGE_EXCLUDED_PREFIXES.length,
  };
}

async function smokePackedPackage(consumerRoot) {
  const smokeSource = String.raw`
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { access } from "node:fs/promises";
import * as root from "pastafari-calendar";
import * as reverse from "pastafari-calendar/reverse";
import * as constraints from "pastafari-calendar/constraints";
import * as fast from "pastafari-calendar/browser/pastafari-calendar-fast.js";
import * as router from "pastafari-calendar/browser/pastafari-calendar-router.js";
import * as diagnostics from "pastafari-calendar/browser/pastafari-diagnostics.js";
import * as routerCore from "pastafari-calendar/browser/pastafari-calendar-router-core.js";

const require = createRequire(import.meta.url);
const metadata = require("pastafari-calendar/package.json");
assert.equal(metadata.name, "pastafari-calendar");
assert.equal(metadata.version, ${JSON.stringify(PACKAGE_JSON.version)});
assert.equal(typeof root.PastafariCalendar, "function");
assert.equal(typeof root.GregorianDate, "function");
assert.equal(typeof reverse.findPastafariDate, "function");
assert.equal(typeof constraints.solvePastafariConstraints, "function");
assert.equal(typeof fast.PastafariCalendar, "function");
assert.equal(typeof fast.GregorianDate, "function");
assert.equal(typeof router.PastafariCalendarRouter, "function");
assert.equal(typeof routerCore.PastafariCalendarRouterCore, "function");
assert.equal(typeof diagnostics.getPastafariDiagnosticsSnapshot, "function");

const calculationJdn = 2451545n;
const calendar = new fast.PastafariCalendar({
  todayProvider: () => new fast.GregorianDate(2000n, 1, 1),
});
const converted = calendar.convertJdn(calculationJdn, { calculationJdn });
const canonical = typeof converted?.toJSON === "function" ? converted.toJSON() : converted;
assert.notEqual(canonical.year, undefined);
assert.equal(typeof canonical.cutletName, "string");
assert.ok(Number.isInteger(canonical.dayInCutlet) && canonical.dayInCutlet >= 1);
assert.equal(typeof canonical.monthName, "string");
assert.ok(Number.isInteger(canonical.dayInMonth) && canonical.dayInMonth >= 1);

await access(new URL("./node_modules/pastafari-calendar/${PACKAGE_JSON.types.replace(/^\.\//u, "")}", import.meta.url));
for (const relative of [
  "browser/pastafari-authoritative-worker.js",
  "browser/pastafari-fast-worker.js",
  "browser/pastafari-calendar-core-1.js",
  "browser/pastafari-calendar-core-2.js",
  "browser/standalone/pastafari-date.js",
  "browser/standalone/pastafari-date.min.js",
  "browser/standalone/example-file.html",
  "browser/example.html",
  "browser/example_weekly_colored.html",
]) {
  await access(new URL("./node_modules/pastafari-calendar/" + relative, import.meta.url));
}
router.sharedPastafariRouter?.dispose?.();
console.log("packed-package smoke PASS", JSON.stringify({ version: metadata.version, calculationJdn: String(calculationJdn) }));
`;
  const smokePath = path.join(consumerRoot, "smoke.mjs");
  await writeFile(smokePath, smokeSource, "utf8");
  await runCapture(process.execPath, [smokePath], { cwd: consumerRoot, timeoutMs: 180_000 });
}

export async function inspectPackedPackage({ root = ROOT } = {}) {
  const npm = npmExecutable();
  process.stdout.write("[package] npm pack --dry-run\n");
  const dryRun = parseNpmPackJson((await runCapture(
    npm,
    ["pack", "--json", "--dry-run", "--ignore-scripts"],
    { cwd: root },
  )).stdout);

  if (dryRun.name !== PACKAGE_JSON.name || dryRun.version !== PACKAGE_JSON.version) {
    throw new Error(
      `npm pack metadata mismatch: expected ${PACKAGE_JSON.name}@${PACKAGE_JSON.version}, got ${dryRun.name}@${dryRun.version}.`,
    );
  }

  const filePaths = packedPaths(dryRun);
  const validation = validatePackageFileSet(PACKAGE_JSON, filePaths);
  const sizeBudget = validatePackageSizeBudget({
    packageSize: dryRun.size,
    unpackedSize: dryRun.unpackedSize,
    files: dryRun.files,
  });
  const contentPolicy = await validatePackageContentPolicy(dryRun, root);
  const tempRoot = await mkdtemp(path.join(tmpdir(), "pastafari-release-pack-"));
  const packDirectory = path.join(tempRoot, "pack");
  const consumerRoot = path.join(tempRoot, "consumer");

  try {
    const { mkdir } = await import("node:fs/promises");
    await mkdir(packDirectory, { recursive: true });
    await mkdir(consumerRoot, { recursive: true });

    process.stdout.write("[package] npm pack (temporary tarball)\n");
    const packed = parseNpmPackJson((await runCapture(
      npm,
      ["pack", "--json", "--ignore-scripts", "--pack-destination", packDirectory],
      { cwd: root },
    )).stdout);

    const candidates = await readdir(packDirectory);
    const tarballName = packed.filename ?? candidates.find((name) => name.endsWith(".tgz"));
    if (!tarballName) throw new Error("npm pack did not create a .tgz tarball.");
    const tarballPath = path.join(packDirectory, tarballName);

    await writeFile(
      path.join(consumerRoot, "package.json"),
      `${JSON.stringify({ private: true, type: "module" }, null, 2)}\n`,
      "utf8",
    );

    process.stdout.write("[package] install temporary tarball with scripts disabled\n");
    await runCapture(
      npm,
      [
        "install",
        "--ignore-scripts",
        "--no-audit",
        "--no-fund",
        "--package-lock=false",
        tarballPath,
      ],
      { cwd: consumerRoot },
    );
    await smokePackedPackage(consumerRoot);

    return {
      name: dryRun.name,
      version: dryRun.version,
      filename: packed.filename ?? tarballName,
      packageSize: packed.size ?? dryRun.size ?? null,
      unpackedSize: packed.unpackedSize ?? dryRun.unpackedSize ?? null,
      fileCount: filePaths.length,
      files: filePaths,
      checkedTargets: validation.checkedTargets,
      sizeBudget,
      contentPolicy,
      smoke: "PASS",
      temporaryTarballRemoved: true,
    };
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  inspectPackedPackage().then((report) => {
    process.stdout.write(
      `[package] PASS — ${report.name}@${report.version}, files=${report.fileCount}, packed=${report.packageSize ?? "unknown"} bytes\n`,
    );
  }).catch((error) => {
    console.error(`[package] FAIL\n${error?.stack ?? error}`);
    process.exitCode = 1;
  });
}
