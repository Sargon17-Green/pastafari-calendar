"use strict";

import { execFileSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const CATEGORY_KEYS = Object.freeze([
  "engine",
  "browser_ui",
  "i18n",
  "documentation",
  "ci_tooling",
  "packaging",
  "benchmarks",
  "memory",
  "visual",
  "day_boundary",
  "compatibility",
  "deep",
  "checkpoints",
  "implementations",
  "impl_python",
  "impl_c",
  "impl_cpp",
  "impl_java",
  "impl_ruby",
  "impl_cobol",
  "impl_shared",
]);

const JOB_KEYS = Object.freeze([
  "node_compatibility",
  "node_deep",
  "browser_smoke",
  "accessibility",
  "checkpoint_test",
  "pwa_offline",
  "day_boundary_job",
  "node_minimum",
  "performance_regression",
  "benchmark_smoke",
  "memory_smoke",
  "visual_regression",
  "impl_python_job",
  "impl_c_job",
  "impl_cpp_job",
  "impl_java_job",
  "impl_ruby_job",
  "impl_cobol_job",
  "impl_gate_job",
]);

function freshFlags(keys) {
  return Object.fromEntries(keys.map((key) => [key, false]));
}

function mark(categories, ...keys) {
  for (const key of keys) categories[key] = true;
}

function isDocumentation(pathname) {
  return (
    /(^|\/)(README(?:-[^/]*)?\.md|README\.txt|CHANGELOG\.md|CONTRIBUTING\.md|VALIDATION\.md)$/i.test(pathname) ||
    /^(RELEASING|TESTING|UPLOAD-INSTRUCTIONS|UPLOAD-TO-GITHUB|CLEAN-ROOM-VALIDATION-[^/]+|I18N-BROWSER-AUDIT[^/]*)\.md$/i.test(pathname) ||
    pathname.endsWith(".md") ||
    pathname.endsWith(".txt")
  );
}

function classifyKnownPath(pathname, categories) {
  if (pathname.startsWith(".github/")) {
    mark(categories, "ci_tooling");
    return true;
  }

  if (pathname === "package.json" || pathname === "package-lock.json") {
    mark(categories, "ci_tooling", "packaging");
    return true;
  }

  if (pathname === "LICENSE") {
    mark(categories, "documentation", "packaging");
    return true;
  }

  if (pathname === "SHA256SUMS.txt") {
    // The root manifest changes alongside ordinary files; the always-on fast gate verifies it.
    return true;
  }

  if (pathname.startsWith("src/") || pathname.startsWith("61fe/") || pathname.startsWith("types/")) {
    mark(categories, "engine", "packaging");
    return true;
  }

  if (pathname.startsWith("implementations/")) {
    if (pathname.endsWith("SHA256SUMS.txt")) {
      return true;
    }
    if (isDocumentation(pathname)) {
      mark(categories, "documentation");
      return true;
    }

    mark(categories, "implementations");
    if (pathname.startsWith("implementations/python/")) mark(categories, "impl_python");
    else if (pathname.startsWith("implementations/c/")) mark(categories, "impl_c");
    else if (pathname.startsWith("implementations/cpp/")) mark(categories, "impl_cpp");
    else if (pathname.startsWith("implementations/java/")) mark(categories, "impl_java");
    else if (pathname.startsWith("implementations/ruby/")) mark(categories, "impl_ruby");
    else if (pathname.startsWith("implementations/cobol/")) mark(categories, "impl_cobol");
    else mark(categories, "impl_shared");

    if (pathname.startsWith("implementations/tests/") || pathname === "implementations/implementations.json") {
      mark(categories, "impl_shared");
    }
    return true;
  }

  if (pathname.startsWith("benchmarks/")) {
    mark(categories, "benchmarks");
    if (/memory/i.test(pathname)) mark(categories, "memory");
    return true;
  }

  if (pathname.startsWith("test/visual/")) {
    mark(categories, "visual", "browser_ui");
    return true;
  }

  if (pathname === "test/fast-compatibility.test.js" || pathname === "test/checkpoint-compatibility.test.js") {
    mark(categories, "compatibility");
    if (pathname.includes("checkpoint")) mark(categories, "checkpoints");
    return true;
  }

  if (
    [
      "test/constraints.test.js",
      "test/diagnostics.test.js",
      "test/extreme-performance.test.js",
      "test/i18n.test.js",
      "test/reverse.test.js",
      "test/year-structure.test.js",
    ].includes(pathname)
  ) {
    mark(categories, "deep");
    if (pathname === "test/i18n.test.js") mark(categories, "i18n");
    return true;
  }

  if (pathname.startsWith("test/")) {
    if (pathname.endsWith(".html")) mark(categories, "browser_ui");
    if (/i18n/i.test(pathname)) mark(categories, "i18n");
    if (/day-boundary/i.test(pathname)) mark(categories, "day_boundary");
    return true;
  }

  if (pathname.startsWith("browser/")) {
    if (isDocumentation(pathname)) {
      mark(categories, "documentation");
      return true;
    }
    if (pathname.endsWith(".html")) {
      mark(categories, "browser_ui");
      return true;
    }
    mark(categories, "engine", "browser_ui", "packaging");
    return true;
  }

  if (pathname.startsWith("docs/i18n/")) {
    mark(categories, "i18n", "browser_ui");
    return true;
  }

  if (pathname.startsWith("docs/engine/")) {
    mark(categories, "engine", "browser_ui");
    return true;
  }

  if (pathname.startsWith("docs/icons/")) {
    mark(categories, "browser_ui", "visual");
    return true;
  }

  if (pathname.startsWith("docs/")) {
    if (pathname === "docs/SHA256SUMS.txt") {
      return true;
    }
    if (isDocumentation(pathname) || pathname === "docs/LICENSE") {
      mark(categories, "documentation");
      return true;
    }
    if (/i18n|calendar-converters|calendar-input-conventions/i.test(pathname)) mark(categories, "i18n");
    if (/venus-day-boundary|observer-location/i.test(pathname)) mark(categories, "day_boundary");
    if (/styles\.css$|index\.html$|app\.js$|manifest\.webmanifest$|sw\.js$|reverse-|\.svg$|\.png$/i.test(pathname)) {
      mark(categories, "browser_ui");
      return true;
    }
    // Executable docs assets are part of the browser application; unknown executable assets are conservative browser changes.
    if (/\.(?:js|css|html|webmanifest|json)$/i.test(pathname)) {
      mark(categories, "browser_ui");
      return true;
    }
    return true;
  }

  if (pathname.startsWith("scripts/")) {
    if (/ci-change-classifier|check-supply-chain|check-package|check-sha-manifest|checksums|release(?:-lib)?\.mjs$/i.test(pathname)) {
      mark(categories, "ci_tooling");
      if (/package|checksum|release/i.test(pathname)) mark(categories, "packaging");
      return true;
    }
    if (/performance|benchmark|diagnose-extreme-performance/i.test(pathname)) {
      mark(categories, "benchmarks");
      return true;
    }
    if (/memory/i.test(pathname)) {
      mark(categories, "memory", "benchmarks");
      return true;
    }
    if (/visual/i.test(pathname)) {
      mark(categories, "visual", "browser_ui");
      return true;
    }
    if (/accessibility|pwa-offline|file-protocol|reverse-ui|user-e2e|ui-race/i.test(pathname)) {
      mark(categories, "browser_ui");
      return true;
    }
    if (/i18n|manifest-i18n|reverse-i18n/i.test(pathname)) {
      mark(categories, "i18n", "browser_ui");
      return true;
    }
    if (/day-boundary/i.test(pathname)) {
      mark(categories, "day_boundary", "browser_ui");
      return true;
    }
    if (/checkpoint/i.test(pathname)) {
      mark(categories, "checkpoints", "compatibility");
      return true;
    }
    if (/calendar-property-soak|year-ceiling-regression|soak-fast-engine/i.test(pathname)) {
      mark(categories, "deep", "engine");
      return true;
    }
    if (/build-standalone|standalone-entry|standalone-router|sync-pages-reverse-engine/i.test(pathname)) {
      mark(categories, "browser_ui", "packaging");
      return true;
    }
    if (/docs-consistency|docs-project-facts/i.test(pathname)) {
      mark(categories, "documentation");
      return true;
    }
    // Unknown scripts can alter build/test behavior, so fail safe to the full CI set.
    mark(categories, "ci_tooling");
    return true;
  }

  if (pathname.startsWith("verification/")) {
    mark(categories, "engine", "compatibility");
    return true;
  }

  if (isDocumentation(pathname)) {
    mark(categories, "documentation");
    return true;
  }

  return false;
}

export function classifyPaths(paths) {
  const categories = freshFlags(CATEGORY_KEYS);
  const normalized = [...new Set(paths.map((value) => String(value).replaceAll("\\", "/").replace(/^\.\//, "")).filter(Boolean))].sort();
  let all = false;
  const unknown = [];

  for (const pathname of normalized) {
    if (!classifyKnownPath(pathname, categories)) {
      all = true;
      unknown.push(pathname);
    }
  }

  // A change to CI/test tooling can change the correctness of the gates themselves. Run conservatively.
  if (categories.ci_tooling) all = true;

  const jobs = freshFlags(JOB_KEYS);
  const any = (...keys) => all || keys.some((key) => categories[key]);

  jobs.node_compatibility = any("engine", "compatibility", "packaging");
  jobs.node_deep = any("engine", "deep");
  jobs.browser_smoke = any("engine", "browser_ui", "i18n", "day_boundary", "packaging");
  jobs.accessibility = any("browser_ui", "i18n", "visual");
  jobs.checkpoint_test = any("engine", "compatibility", "checkpoints");
  jobs.pwa_offline = any("engine", "browser_ui", "i18n", "day_boundary");
  jobs.day_boundary_job = any("day_boundary");
  jobs.node_minimum = any("engine", "packaging");
  jobs.performance_regression = any("engine", "benchmarks");
  jobs.benchmark_smoke = any("engine", "benchmarks");
  jobs.memory_smoke = any("engine", "benchmarks", "memory");
  jobs.visual_regression = any("engine", "browser_ui", "i18n", "visual");

  const sharedImplImpact = all || categories.engine || categories.impl_shared;
  jobs.impl_python_job = sharedImplImpact || categories.impl_python;
  jobs.impl_c_job = sharedImplImpact || categories.impl_c;
  jobs.impl_cpp_job = sharedImplImpact || categories.impl_cpp;
  jobs.impl_java_job = sharedImplImpact || categories.impl_java;
  jobs.impl_ruby_job = sharedImplImpact || categories.impl_ruby;
  jobs.impl_cobol_job = sharedImplImpact || categories.impl_cobol;
  jobs.impl_gate_job = sharedImplImpact || categories.impl_c || categories.impl_cpp || categories.impl_java || categories.impl_ruby || categories.impl_cobol;

  return { all, paths: normalized, unknown, categories, jobs };
}

export function fullClassification(reason = "manual-or-fallback") {
  const categories = Object.fromEntries(CATEGORY_KEYS.map((key) => [key, true]));
  const jobs = Object.fromEntries(JOB_KEYS.map((key) => [key, true]));
  return { all: true, paths: [], unknown: [], categories, jobs, reason };
}

function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected argument: ${arg}`);
    const key = arg.slice(2);
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    result[key] = value;
    index += 1;
  }
  return result;
}

function isZeroSha(value) {
  return !value || /^0+$/.test(value);
}

function diffPaths(base, head, tripleDot = false, cwd = process.cwd()) {
  const separator = tripleDot ? "..." : "..";
  const output = execFileSync("git", ["diff", "--name-only", "-z", `${base}${separator}${head}`], {
    cwd,
    encoding: "buffer",
    maxBuffer: 16 * 1024 * 1024,
  });
  return output.toString("utf8").split("\0").filter(Boolean);
}

export function classifyEvent({ event, base, head, cwd = process.cwd() }) {
  if (event === "workflow_dispatch" || event === "schedule") {
    return fullClassification(event);
  }
  if (!head) return fullClassification("missing-head");

  try {
    if (event === "pull_request") {
      if (isZeroSha(base)) return fullClassification("missing-pr-base");
      return classifyPaths(diffPaths(base, head, true, cwd));
    }
    if (event === "push") {
      if (isZeroSha(base)) return fullClassification("new-branch-or-missing-before");
      return classifyPaths(diffPaths(base, head, false, cwd));
    }
    return fullClassification(`unsupported-event:${event || "<empty>"}`);
  } catch (error) {
    console.error(`[ci-change-classifier] git diff failed; falling back to full CI: ${error?.message ?? error}`);
    return fullClassification("git-diff-failed");
  }
}

function flattenOutputs(classification) {
  const outputs = {
    all: classification.all,
    ...classification.categories,
    ...classification.jobs,
  };
  return Object.fromEntries(Object.entries(outputs).map(([key, value]) => [key, value ? "true" : "false"]));
}

function renderSummary(classification) {
  const enabledCategories = Object.entries(classification.categories).filter(([, value]) => value).map(([key]) => key);
  const enabledJobs = Object.entries(classification.jobs).filter(([, value]) => value).map(([key]) => key);
  const lines = [
    "### CI change classification",
    `- Mode: ${classification.all ? "conservative/full" : "selective"}`,
    `- Changed paths: ${classification.paths.length}`,
    `- Categories: ${enabledCategories.join(", ") || "documentation/fast-gate only"}`,
    `- Heavy/specialized jobs enabled: ${enabledJobs.join(", ") || "none"}`,
  ];
  if (classification.reason) lines.push(`- Reason: ${classification.reason}`);
  if (classification.unknown.length) lines.push(`- Unknown paths (forced full CI): ${classification.unknown.join(", ")}`);
  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const classification = classifyEvent({
    event: args.event ?? process.env.GITHUB_EVENT_NAME ?? "",
    base: args.base ?? "",
    head: args.head ?? process.env.GITHUB_SHA ?? "",
  });
  const outputs = flattenOutputs(classification);
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    for (const [key, value] of Object.entries(outputs)) appendFileSync(outputFile, `${key}=${value}\n`);
  }
  const summary = renderSummary(classification);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  process.stdout.write(`${summary}${JSON.stringify({ ...classification, outputs }, null, 2)}\n`);
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  main();
}
