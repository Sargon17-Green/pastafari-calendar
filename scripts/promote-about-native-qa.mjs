#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

function fail(message) {
  console.error(message);
  process.exit(1);
}

const [locale, sequenceRaw] = process.argv.slice(2);
if (!locale || !/^[a-z]{2,3}(?:-[a-z0-9]+)*$/i.test(locale)) {
  fail("Usage: node scripts/promote-about-native-qa.mjs <locale> <sequence>");
}
if (!sequenceRaw || !/^\d+$/.test(sequenceRaw)) {
  fail("Sequence must be a positive integer.");
}
const sequence = Number(sequenceRaw);
if (!Number.isSafeInteger(sequence) || sequence < 1) fail("Invalid sequence.");

const root = process.cwd();
const localeDir = path.join(root, "artifacts", "about-i18n-native-sessions", locale);
const attemptsDir = path.join(localeDir, "attempts");
if (!fs.isDirectory(attemptsDir)) fail(`Missing attempts directory: ${attemptsDir}`);

const prefix = `${sequence}-`;
const attemptNames = fs.readdirSync(attemptsDir)
  .filter((name) => name.startsWith(prefix) && fs.statSync(path.join(attemptsDir, name)).isDirectory());

if (attemptNames.length !== 1) {
  fail(`Expected exactly one attempt for sequence ${sequence}; found ${attemptNames.length}.`);
}

const attemptDir = path.join(attemptsDir, attemptNames[0]);
const required = ["prompt.md", "review.md", "session.md", "reviewed-head.txt"];
for (const name of required) {
  const file = path.join(attemptDir, name);
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) fail(`Missing/empty evidence file: ${file}`);
}

const review = fs.readFileSync(path.join(attemptDir, "review.md"), "utf8");
const firstLine = review.split(/\r?\n/, 1)[0].trim();
if (firstLine !== "NATIVE_QA_RESULT: PASS") {
  fail(`Attempt cannot be promoted: verdict is ${JSON.stringify(firstLine)}.`);
}

const reviewedHead = fs.readFileSync(path.join(attemptDir, "reviewed-head.txt"), "utf8").trim();
if (!/^[0-9a-f]{40}$/.test(reviewedHead)) fail("reviewed-head.txt does not contain a full commit SHA.");
if (attemptNames[0] !== `${sequence}-${reviewedHead}`) {
  fail("Attempt directory name does not match sequence + reviewed HEAD.");
}

const sourcePaths = [
  `docs/i18n/locales/${locale}.js`,
  `docs/about/content/${locale}.html`,
  "docs/index.html",
  "docs/about/index.html",
  "docs/manifest.webmanifest",
  "docs/i18n/registry.js",
  "docs/i18n/runtime.js",
  "docs/app.js",
  "docs/reverse-ui.js",
  "docs/about/about.js",
];

for (const rel of sourcePaths.slice(0, 2)) {
  if (!fs.existsSync(path.join(root, rel))) fail(`Missing locale source file: ${rel}`);
}

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
  }).trim();
}

try {
  git(["cat-file", "-e", `${reviewedHead}^{commit}`]);
} catch {
  fail(`Reviewed commit is not available locally: ${reviewedHead}`);
}

let changed = [];
try {
  const output = git(["diff", "--name-only", `${reviewedHead}..HEAD`, "--", ...sourcePaths]);
  changed = output ? output.split(/\r?\n/).filter(Boolean) : [];
} catch (error) {
  fail(`Failed to compare reviewed HEAD to current HEAD: ${error.message}`);
}
if (changed.length) {
  fail("Cannot promote stale review; reviewed source surfaces changed:\n" + changed.map((x) => `- ${x}`).join("\n"));
}

for (const name of required) {
  fs.copyFileSync(path.join(attemptDir, name), path.join(localeDir, name));
}

const promotion = {
  locale,
  sequence,
  reviewed_head: reviewedHead,
  verdict: "PASS",
  source_paths_guarded: sourcePaths,
};
fs.writeFileSync(path.join(localeDir, "promotion.json"), JSON.stringify(promotion, null, 2) + "\n", "utf8");

console.log(`Promoted ${locale} sequence ${sequence} reviewed at ${reviewedHead}.`);
