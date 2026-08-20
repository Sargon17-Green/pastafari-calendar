"use strict";

import { spawn } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { generateChecksums, verifyChecksums } from "./checksums.mjs";
import { inspectPackedPackage } from "./check-package.mjs";
import {
  assertNodeEngineSupported,
  atomicWriteFile,
  computeServiceWorkerCoreDigest,
  validatePackageLockVersion,
  validateServiceWorkerBaseline,
  validateTagVersion,
} from "./release-lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPORT_DIR = path.join(ROOT, "artifacts", "release");
const REPORT_PATH = path.join(REPORT_DIR, "report.json");
const PWA_STATE_PATH = path.join(ROOT, "verification", "pwa-cache-state.json");
const SW_PATH = path.join(ROOT, "docs", "sw.js");
const PACKAGE_PATH = path.join(ROOT, "package.json");
const LOCK_PATH = path.join(ROOT, "package-lock.json");

const PACKAGE = JSON.parse(await readFile(PACKAGE_PATH, "utf8"));
const PACKAGE_LOCK = JSON.parse(await readFile(LOCK_PATH, "utf8"));

const EXPECTED_GENERATED_PATHS = new Set([
  "SHA256SUMS.txt",
  "docs/SHA256SUMS.txt",
  "browser/standalone/pastafari-date.js",
  "browser/standalone/pastafari-date.min.js",
  "docs/engine/pastafari-calendar-fast.js",
  "docs/engine/pastafari-constraints-client.js",
  "docs/engine/pastafari-constraints.js",
  "docs/engine/pastafari-reverse-worker.js",
  "docs/DOCUMENTATION-CONSISTENCY.md",
  "docs/manifest.webmanifest",
  "verification/pwa-cache-state.json",
]);

const TIMEOUTS = Object.freeze({
  normal: 10 * 60_000,
  tests: 30 * 60_000,
  browser: 30 * 60_000,
});

function executable(name) {
  if (process.platform !== "win32") return name;
  if (name === "npm") return "npm.cmd";
  if (name === "git") return "git.exe";
  return name;
}

function parseArguments(argv) {
  const mode = argv[0];
  if (mode !== "prepare" && mode !== "verify") {
    throw new Error("Usage: node scripts/release.mjs <prepare|verify> [--tag vX.Y.Z]");
  }
  let tag = null;
  for (let index = 1; index < argv.length; index += 1) {
    if (argv[index] === "--tag") {
      tag = argv[index + 1];
      if (!tag) throw new Error("--tag requires a value.");
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argv[index]}`);
    }
  }
  return { mode, tag };
}

function run(command, args, {
  cwd = ROOT,
  timeoutMs = TIMEOUTS.normal,
  capture = false,
  env = process.env,
} = {}) {
  return new Promise((resolve, reject) => {
    const actual = executable(command);
    const child = spawn(actual, args, {
      cwd,
      env,
      windowsHide: true,
      stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 5_000).unref();
    }, timeoutMs);

    if (capture) {
      child.stdout.on("data", (chunk) => { stdout += chunk; });
      child.stderr.on("data", (chunk) => { stderr += chunk; });
    }
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (code === 0 && !timedOut) {
        resolve({ stdout, stderr });
      } else {
        if (capture && stdout) process.stdout.write(stdout);
        if (capture && stderr) process.stderr.write(stderr);
        reject(new Error(
          timedOut
            ? `${command} ${args.join(" ")} timed out after ${timeoutMs}ms.`
            : `${command} ${args.join(" ")} failed with ${signal ? `signal ${signal}` : `exit code ${code}`}.`,
        ));
      }
    });
  });
}

async function capture(command, args, options = {}) {
  const result = await run(command, args, { ...options, capture: true });
  return result.stdout.trim();
}

async function commandExists(command) {
  try {
    await run(command, ["--version"], { capture: true, timeoutMs: 10_000 });
    return true;
  } catch {
    return false;
  }
}

async function gitChangedPaths() {
  const [tracked, untracked] = await Promise.all([
    capture("git", ["diff", "--name-only", "HEAD", "--"]),
    capture("git", ["ls-files", "--others", "--exclude-standard"]),
  ]);
  return [...new Set(
    `${tracked}\n${untracked}`.split(/\r?\n/u).filter(Boolean).map((value) => value.replaceAll("\\", "/")),
  )].sort();
}

function untrackedFromStatus(status) {
  return (status ?? [])
    .filter((line) => line.startsWith("?? "))
    .map((line) => line.slice(3));
}

async function gitInfo() {
  if (!await commandExists("git")) {
    return { available: false, commit: null, branch: null, clean: null, status: null, changedPaths: null };
  }
  try {
    const [commit, branch, status, changedPaths] = await Promise.all([
      capture("git", ["rev-parse", "HEAD"]),
      capture("git", ["branch", "--show-current"]),
      capture("git", ["status", "--porcelain=v1", "--untracked-files=all"]),
      gitChangedPaths(),
    ]);
    return {
      available: true,
      commit,
      branch: branch || null,
      clean: status === "",
      status: status === "" ? [] : status.split(/\r?\n/u),
      changedPaths,
    };
  } catch {
    return { available: false, commit: null, branch: null, clean: null, status: null, changedPaths: null };
  }
}

async function installedPackageVersion(packageName) {
  try {
    const text = await readFile(path.join(ROOT, "node_modules", packageName, "package.json"), "utf8");
    return JSON.parse(text).version ?? null;
  } catch {
    return null;
  }
}

function configuredBrowserLaunch(name) {
  const upper = name.toUpperCase();
  const executablePath = process.env[`PASTAFARI_${upper}_EXECUTABLE`] || undefined;
  const rawArguments = process.env[`PASTAFARI_${upper}_ARGS`];
  let args;
  if (rawArguments) {
    args = JSON.parse(rawArguments);
    if (!Array.isArray(args) || !args.every((value) => typeof value === "string")) {
      throw new Error(`PASTAFARI_${upper}_ARGS must be a JSON string array.`);
    }
  } else if (name === "chromium" && executablePath) {
    args = ["--no-sandbox"];
  }
  return {
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    ...(args ? { args } : {}),
  };
}

async function browserVersions() {
  const { chromium, firefox } = await import("playwright");
  const versions = {};
  for (const [name, browserType] of [["chromium", chromium], ["firefox", firefox]]) {
    let browser;
    try {
      browser = await browserType.launch(configuredBrowserLaunch(name));
      versions[name] = browser.version();
    } catch (error) {
      throw new Error(
        `Playwright ${name} browser is not launchable. Install the locked browser binaries before release verification. ${error?.message ?? error}`,
      );
    } finally {
      await browser?.close().catch(() => {});
    }
  }
  return versions;
}

async function verifyEnvironment({ tag }) {
  assertNodeEngineSupported(PACKAGE.engines?.node, process.versions.node);
  validatePackageLockVersion(PACKAGE, PACKAGE_LOCK);
  const npmVersion = await capture("npm", ["--version"]);
  const esbuild = await installedPackageVersion("esbuild");
  const playwright = await installedPackageVersion("playwright");
  const axeCore = await installedPackageVersion("axe-core");
  if (!esbuild || !playwright || !axeCore) {
    throw new Error("Release verification requires dependencies installed by npm ci (esbuild, playwright and axe-core are required)." );
  }
  if (PACKAGE.devDependencies?.esbuild !== esbuild) {
    throw new Error(`Installed esbuild ${esbuild} does not match package.json ${PACKAGE.devDependencies?.esbuild}.`);
  }
  if (PACKAGE.devDependencies?.playwright !== playwright) {
    throw new Error(`Installed Playwright ${playwright} does not match package.json ${PACKAGE.devDependencies?.playwright}.`);
  }
  if (PACKAGE.devDependencies?.["axe-core"] !== axeCore) {
    throw new Error(`Installed axe-core ${axeCore} does not match package.json ${PACKAGE.devDependencies?.["axe-core"]}.`);
  }
  const browsers = await browserVersions();
  const tagResult = validateTagVersion(tag, PACKAGE.version);
  return {
    node: process.versions.node,
    npm: npmVersion,
    esbuild,
    playwright,
    axeCore,
    browsers,
    platform: `${process.platform}-${process.arch}`,
    engines: PACKAGE.engines?.node ?? null,
    tag: tagResult.checked ? tagResult.tag : null,
  };
}

async function verifyPwaCache(mode) {
  const [swSource, baselineSource] = await Promise.all([
    readFile(SW_PATH, "utf8"),
    readFile(PWA_STATE_PATH, "utf8"),
  ]);
  const current = await computeServiceWorkerCoreDigest(path.join(ROOT, "docs"), swSource);
  const baseline = JSON.parse(baselineSource);
  const validation = validateServiceWorkerBaseline(current, baseline, { mode });
  if (mode === "prepare" && validation.changed) {
    await atomicWriteFile(PWA_STATE_PATH, `${JSON.stringify(validation.nextBaseline, null, 2)}\n`);
    process.stdout.write(`[release] PWA cache baseline updated for ${current.version}\n`);
  }
  return {
    version: current.version,
    coreAssetsSha256: current.coreAssetsSha256,
    coreAssetCount: current.assets.length,
    baselineChanged: mode === "prepare" && validation.changed,
  };
}

async function readStandaloneReport(reportPath) {
  return JSON.parse(await readFile(reportPath, "utf8"));
}

async function step(report, label, fn, command = null) {
  const number = report.steps.length + 1;
  const start = Date.now();
  process.stdout.write(`\n[release] ${number}. ${label}${command ? `\n[release]    ${command}` : ""}\n`);
  const record = { name: label, command, status: "RUNNING", durationMs: null };
  report.steps.push(record);
  try {
    const value = await fn();
    record.status = "PASS";
    record.durationMs = Date.now() - start;
    process.stdout.write(`[release] ${label} ... PASS (${record.durationMs}ms)\n`);
    return value;
  } catch (error) {
    record.status = "FAIL";
    record.durationMs = Date.now() - start;
    record.error = error?.message ?? String(error);
    process.stderr.write(`[release] ${label} ... FAIL\n${error?.stack ?? error}\n`);
    throw error;
  }
}

async function writeReport(report) {
  await mkdir(REPORT_DIR, { recursive: true });
  await atomicWriteFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
}

export async function runRelease({ mode, tag = null }) {
  const started = Date.now();
  const tempRoot = await mkdtemp(path.join(tmpdir(), "pastafari-release-"));
  const standaloneReportPath = path.join(tempRoot, "standalone.json");
  const report = {
    schemaVersion: 1,
    mode,
    status: "RUNNING",
    version: PACKAGE.version,
    commit: null,
    branch: null,
    initialGitClean: null,
    initialGitStatus: null,
    initialChangedPaths: null,
    initialUntrackedFiles: null,
    finalGitClean: null,
    finalGitStatus: null,
    finalChangedPaths: null,
    finalUntrackedFiles: null,
    environment: null,
    steps: [],
    generatedArtifacts: null,
    checksums: null,
    package: null,
    pwa: null,
    suites: {
      required: [
        "documentation consistency",
        "manifest/localization synchronization",
        "locale coverage validation",
        "reverse i18n validation",
        "node correctness tiers (fast + compatibility + deep)",
        "i18n support-level browser smoke",
        "file:// standalone/browser smoke",
        "PWA offline smoke",
        "reverse UI smoke",
        "astronomical day-boundary smoke",
        "accessibility smoke",
        "benchmark API smoke",
      ],
      notRunByReleaseVerify: [
        "visual regression workflow",
        "checkpoint sides matrix",
        "checkpoint exhaustive matrix",
        "checkpoint rebuild matrix",
        "minimum Node 18.0.0 CI job",
        "performance regression comparison job",
        "independent implementations matrix",
        "long soak suites",
        "full performance benchmarks",
        "full user E2E suite",
      ],
    },
    durationMs: null,
  };

  try {
    const initialGit = await gitInfo();
    report.commit = initialGit.commit;
    report.branch = initialGit.branch;
    report.initialGitClean = initialGit.clean;
    report.initialGitStatus = initialGit.status;
    report.initialChangedPaths = initialGit.changedPaths;
    report.initialUntrackedFiles = untrackedFromStatus(initialGit.status);
    if (mode === "verify") {
      if (!initialGit.available) throw new Error("release:verify requires a Git working tree.");
      if (!initialGit.clean) {
        throw new Error(
          `release:verify requires a clean working tree. Current changes:\n${initialGit.status.join("\n")}`,
        );
      }
    }

    report.environment = await step(
      report,
      "Validate environment, package/lock version and optional tag",
      () => verifyEnvironment({ tag }),
      "node/npm/package-lock validation",
    );

    await step(
      report,
      mode === "verify" ? "Verify generated/current documentation facts" : "Regenerate generated/current documentation facts",
      () => run("npm", ["run", mode === "verify" ? "docs:check" : "docs:generate"], { timeoutMs: TIMEOUTS.normal }),
      `npm run ${mode === "verify" ? "docs:check" : "docs:generate"}`,
    );

    await step(
      report,
      mode === "verify" ? "Verify localized Web App Manifest" : "Regenerate localized Web App Manifest",
      () => run("npm", ["run", mode === "verify" ? "check:manifest-i18n" : "sync:manifest-i18n"], { timeoutMs: TIMEOUTS.normal }),
      `npm run ${mode === "verify" ? "check:manifest-i18n" : "sync:manifest-i18n"}`,
    );

    await step(
      report,
      "Validate locale coverage/support metadata",
      () => run("npm", ["run", "check:i18n"], { timeoutMs: TIMEOUTS.normal }),
      "npm run check:i18n",
    );

    await step(
      report,
      mode === "verify" ? "Verify Pages engine copies" : "Regenerate Pages engine copies",
      () => run(process.execPath, ["scripts/sync-pages-reverse-engine.mjs", ...(mode === "verify" ? ["--verify"] : [])]),
      `node scripts/sync-pages-reverse-engine.mjs${mode === "verify" ? " --verify" : ""}`,
    );

    await step(
      report,
      mode === "verify" ? "Verify standalone build and reproducibility" : "Regenerate standalone build and verify reproducibility",
      () => run(process.execPath, [
        "scripts/build-standalone.mjs",
        ...(mode === "verify" ? ["--verify"] : []),
        "--report",
        standaloneReportPath,
      ], { timeoutMs: TIMEOUTS.normal }),
      `node scripts/build-standalone.mjs${mode === "verify" ? " --verify" : ""} --report <temp>`,
    );
    report.generatedArtifacts = (await readStandaloneReport(standaloneReportPath)).artifacts;

    report.pwa = await step(
      report,
      "Validate PWA cache/version coupling",
      () => verifyPwaCache(mode),
      "PWA CORE_ASSETS content digest vs verification/pwa-cache-state.json",
    );

    if (mode === "prepare") {
      report.checksums = await step(
        report,
        "Regenerate docs and repository SHA-256 manifests",
        generateChecksums,
        "npm run checksums:generate",
      );
    } else {
      report.checksums = await step(
        report,
        "Verify docs and repository SHA-256 manifests",
        verifyChecksums,
        "npm run checksums:verify",
      );
    }

    await step(
      report,
      "Validate reverse-search localization coverage",
      () => run("npm", ["run", "check:reverse-i18n"], { timeoutMs: TIMEOUTS.normal }),
      "npm run check:reverse-i18n",
    );

    await step(
      report,
      "Run release-critical Node correctness tiers",
      () => run("npm", ["run", "test:release"], { timeoutMs: TIMEOUTS.tests }),
      "npm run test:release",
    );

    await step(
      report,
      "Run i18n support-level browser smoke",
      () => run("npm", ["run", "test:i18n-support"], { timeoutMs: TIMEOUTS.browser }),
      "npm run test:i18n-support",
    );

    await step(
      report,
      "Run standalone file:// browser smoke",
      () => run("npm", ["run", "test:file-protocol"], { timeoutMs: TIMEOUTS.browser }),
      "npm run test:file-protocol",
    );

    await step(
      report,
      "Run PWA offline smoke",
      () => run(process.execPath, ["scripts/run-pwa-offline-smoke.mjs"], { timeoutMs: TIMEOUTS.browser }),
      "node scripts/run-pwa-offline-smoke.mjs",
    );

    await step(
      report,
      "Run reverse UI smoke",
      () => run("npm", ["run", "test:reverse-ui"], { timeoutMs: TIMEOUTS.browser }),
      "npm run test:reverse-ui",
    );

    await step(
      report,
      "Run astronomical day-boundary smoke",
      () => run("npm", ["run", "test:day-boundary"], { timeoutMs: TIMEOUTS.browser }),
      "npm run test:day-boundary",
    );

    await step(
      report,
      "Run automated accessibility release gate",
      () => run("npm", ["run", "test:accessibility"], { timeoutMs: TIMEOUTS.browser }),
      "npm run test:accessibility",
    );

    await step(
      report,
      "Run benchmark/API smoke (not a full benchmark)",
      () => run("npm", ["run", "benchmark:smoke"], { timeoutMs: TIMEOUTS.normal }),
      "npm run benchmark:smoke",
    );

    report.checksums = await step(
      report,
      "Verify final SHA-256 manifests after tests",
      verifyChecksums,
      "npm run checksums:verify",
    );

    if (mode === "verify") {
      await step(
        report,
        "Verify SHA manifest covers exactly the committed file set",
        () => run(process.execPath, ["scripts/check-sha-manifest-completeness.mjs"], { timeoutMs: TIMEOUTS.normal }),
        "node scripts/check-sha-manifest-completeness.mjs",
      );
    }

    report.package = await step(
      report,
      "Inspect, pack, install and smoke-test the exact npm artifact",
      () => inspectPackedPackage({ root: ROOT }),
      "npm pack --dry-run + temporary npm pack/install smoke",
    );

    const finalGit = await gitInfo();
    report.finalGitClean = finalGit.clean;
    report.finalGitStatus = finalGit.status;
    report.finalChangedPaths = finalGit.changedPaths;
    report.finalUntrackedFiles = untrackedFromStatus(finalGit.status);
    if (mode === "prepare" && initialGit.available && finalGit.available) {
      const initialPaths = new Set(initialGit.changedPaths ?? []);
      const newlyChanged = (finalGit.changedPaths ?? []).filter((relativePath) => !initialPaths.has(relativePath));
      const unexpected = newlyChanged.filter((relativePath) => !EXPECTED_GENERATED_PATHS.has(relativePath));
      if (unexpected.length > 0) {
        throw new Error(
          `Release preparation created unexpected working-tree changes:\n${unexpected.map((value) => `- ${value}`).join("\n")}`,
        );
      }
    }
    if (mode === "verify" && !finalGit.clean) {
      throw new Error(
        `release:verify modified the working tree:\n${finalGit.status?.join("\n") ?? "<status unavailable>"}`,
      );
    }

    report.status = mode === "prepare" && finalGit.clean === false
      ? "PASS_REVIEW_AND_COMMIT_REQUIRED"
      : "PASS";
    report.durationMs = Date.now() - started;
    await writeReport(report);

    process.stdout.write("\nRelease preparation/verification summary\n");
    process.stdout.write(`Mode: ${mode}\n`);
    process.stdout.write(`Result: ${report.status}\n`);
    process.stdout.write(`Version: ${report.version}\n`);
    process.stdout.write(`Commit: ${report.commit ?? "unavailable"}\n`);
    process.stdout.write("Generated artifacts: reproducible\n");
    process.stdout.write("Checksums: verified\n");
    process.stdout.write("Required tests: PASS\n");
    process.stdout.write("Packed package smoke: PASS\n");
    process.stdout.write(`Heavy/optional suites: NOT RUN (${report.suites.notRunByReleaseVerify.join(", ")})\n`);
    process.stdout.write(`Report: ${path.relative(ROOT, REPORT_PATH)}\n`);
    if (mode === "prepare" && finalGit.clean === false) {
      process.stdout.write("Generated/source diff exists: REVIEW AND COMMIT IT, then run npm run release:verify.\n");
    }
    return report;
  } catch (error) {
    report.status = "FAIL";
    report.durationMs = Date.now() - started;
    try {
      const finalGit = await gitInfo();
      report.finalGitClean = finalGit.clean;
      report.finalGitStatus = finalGit.status;
      report.finalChangedPaths = finalGit.changedPaths;
      report.finalUntrackedFiles = untrackedFromStatus(finalGit.status);
      await writeReport(report);
    } catch {
      // The original failure is the authoritative failure.
    }
    throw error;
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exit(2);
  }
  runRelease(options).catch((error) => {
    console.error(`\n[release] ${options.mode.toUpperCase()} FAIL\n${error?.message ?? error}`);
    process.exitCode = 1;
  });
}
