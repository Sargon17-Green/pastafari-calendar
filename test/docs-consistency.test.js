"use strict";

import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { runDocumentationChecks } from "../scripts/docs-consistency.mjs";

async function put(root, relativePath, contents = "") {
  const full = path.join(root, relativePath);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, contents, "utf8");
}

async function makeFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "pastafari-docs-check-"));
  await put(root, "package.json", JSON.stringify({
    name: "pastafari-calendar",
    version: "1.3.0",
    engines: { node: ">=18" },
    exports: { ".": "./src/public-api.js", "./constraints": "./browser/constraints.js", "./package.json": "./package.json" },
    scripts: { "docs:check": "node scripts/docs-consistency.mjs", test: "node --test" },
  }, null, 2));
  await put(root, "src/public-api.js");
  await put(root, "browser/constraints.js");
  await put(root, "scripts/build-standalone.mjs", "await bundleStandalone({ filename: \"pastafari-date.js\", minify: false, workerSources });\nawait bundleStandalone({ filename: \"pastafari-date.min.js\", minify: true, workerSources });\n");
  await put(root, "browser/standalone/pastafari-date.js");
  await put(root, "browser/standalone/pastafari-date.min.js");
  await put(root, ".github/workflows/test.yml", "jobs:\n  node-test:\n    steps:\n      - uses: actions/setup-node@v7\n        with:\n          node-version: 22\n  node-minimum:\n    steps:\n      - uses: actions/setup-node@v7\n        with:\n          node-version: 18.0.0\n");
  await put(root, "docs/i18n/registry.js", `export const DEFAULT_LOCALE = "en";
export const SUPPORT_LEVELS = Object.freeze(["complete", "partial", "experimental"]);
function defineLocale() {}
export const LOCALES = Object.freeze([
  defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=1")),
  defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=1")),
]);
`);
  await put(root, "docs/i18n/locales/en.js");
  await put(root, "docs/i18n/locales/he.js");
  await put(root, "implementations/implementations.json", JSON.stringify({
    normativeSourcePath: "../sources/source.md",
    normativeSourceSha256: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    expandedTargetCount: 84,
    readyFiveCount: 1,
    readyFiveFinalSpecCertifiedCount: 1,
    implementations: [{ language: "Python 3", path: "python", canonicalStatus: "pass" }],
  }, null, 2));
  await put(root, "implementations/python/README.md", "# Python\n");
  await put(root, "sources/source.md", "source\n");
  await put(root, "sources/SHA256SUMS.txt", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ./source.md\n");
  await put(root, "docs/README.md", "רשומים בו 2 משאבי locale. כל 2 ה-locales.\n");
  await put(root, "docs/I18N.md", "The current policy marks Hebrew and English as `complete`; the other 0 registered locales remain `partial`.\n");
  await put(root, "docs/I18N-SUPPORT-LEVELS.md", "In the current 2-locale set, Hebrew and English are `complete` and the 0 non-English/non-Hebrew locales remain `partial`.\n");
  await put(root, "browser/README.md", "לדוגמה `v1.3.0`\n`pastafari-date.js` and `pastafari-date.min.js`\n");
  await put(root, "implementations/docs/LANGUAGES.md", "contains **84 required targets\ncontributes **1/84 final-spec-certified\n| Python 3 | Yes |\n");
  await put(root, "docs/DOCUMENTATION-CONSISTENCY.md", `# Documentation consistency\n\n<!-- BEGIN GENERATED: project-facts -->\nstale\n<!-- END GENERATED: project-facts -->\n`);
  await runDocumentationChecks({ root, write: true, currentDocs: [], historicalDocs: [] });
  return root;
}

async function withFixture(fn) {
  const root = await makeFixture();
  try { await fn(root); } finally { await rm(root, { recursive: true, force: true }); }
}

function messages(result) {
  return result.issues.map((entry) => `${entry.file}: ${entry.message}`).join("\n");
}

test("locale-count mismatch fails deterministically", async () => {
  await withFixture(async (root) => {
    await put(root, "docs/README.md", "רשומים בו 99 משאבי locale. כל 99 ה-locales.\n");
    const result = await runDocumentationChecks({ root, currentDocs: [], historicalDocs: [] });
    assert.match(messages(result), /documented value 99; actual value 2/u);
  });
});

test("missing current local link fails", async () => {
  await withFixture(async (root) => {
    await put(root, "docs/current.md", "[missing](./does-not-exist.md)\n");
    const result = await runDocumentationChecks({ root, currentDocs: ["docs/current.md"], historicalDocs: [] });
    assert.match(messages(result), /missing local target/u);
  });
});

test("invalid npm run reference fails without executing it", async () => {
  await withFixture(async (root) => {
    await put(root, "docs/current.md", "Run `npm run does-not-exist`.\n");
    const result = await runDocumentationChecks({ root, currentDocs: ["docs/current.md"], historicalDocs: [] });
    assert.match(messages(result), /contains no such script/u);
  });
});

test("historical snapshot may retain old package and locale values", async () => {
  await withFixture(async (root) => {
    await put(root, "HISTORICAL.md", "# Validation — 2026-08-14\nHistorical audit snapshot at commit abcdef1. Package 0.1.0; 90 locales.\n");
    const result = await runDocumentationChecks({ root, currentDocs: [], historicalDocs: ["HISTORICAL.md"] });
    assert.equal(result.issues.length, 0, messages(result));
  });
});

test("generated section drift fails and generator repairs it", async () => {
  await withFixture(async (root) => {
    const file = path.join(root, "docs/DOCUMENTATION-CONSISTENCY.md");
    const original = await readFile(file, "utf8");
    await writeFile(file, original.replace("Registered locale resources: **2**", "Registered locale resources: **999**"), "utf8");
    let result = await runDocumentationChecks({ root, currentDocs: [], historicalDocs: [] });
    assert.match(messages(result), /generated project-facts section is stale/u);
    await runDocumentationChecks({ root, write: true, currentDocs: [], historicalDocs: [] });
    result = await runDocumentationChecks({ root, currentDocs: [], historicalDocs: [] });
    assert.equal(result.issues.length, 0, messages(result));
  });
});

test("wrong-case local path fails even on case-insensitive development systems", async () => {
  await withFixture(async (root) => {
    await put(root, "docs/Target.md", "ok\n");
    await put(root, "docs/current.md", "[target](./target.md)\n");
    const result = await runDocumentationChecks({ root, currentDocs: ["docs/current.md"], historicalDocs: [] });
    assert.match(messages(result), /wrong case/u);
  });
});

test("missing inline repository path fails conservatively", async () => {
  await withFixture(async (root) => {
    await put(root, "docs/current.md", "See `scripts/does-not-exist.mjs`.\n");
    const result = await runDocumentationChecks({ root, currentDocs: ["docs/current.md"], historicalDocs: [] });
    assert.match(messages(result), /missing repository path/u);
  });
});

test("package subpath import must exist in package.json exports", async () => {
  await withFixture(async (root) => {
    await put(root, "docs/current.md", "```js\nimport x from \"pastafari-calendar/reverse\";\n```\n");
    const result = await runDocumentationChecks({ root, currentDocs: ["docs/current.md"], historicalDocs: [] });
    assert.match(messages(result), /exports no matching entry point/u);
  });
});


test("support-level count mismatch fails deterministically", async () => {
  await withFixture(async (root) => {
    await put(root, "docs/I18N-SUPPORT-LEVELS.md", "In the current 2-locale set, Hebrew and English are `complete` and the 99 non-English/non-Hebrew locales remain `partial`.\n");
    const result = await runDocumentationChecks({ root, currentDocs: [], historicalDocs: [] });
    assert.match(messages(result), /documented value 99; actual value 0/u);
  });
});

test("Node pins in every workflow must honor the package minimum", async () => {
  await withFixture(async (root) => {
    await put(root, ".github/workflows/legacy.yml", "jobs:\n  legacy:\n    steps:\n      - uses: actions/setup-node@v7\n        with:\n          node-version: 17\n");
    const result = await runDocumentationChecks({ root, currentDocs: [], historicalDocs: [] });
    assert.match(messages(result), /legacy\.yml: CI uses Node 17, below package minimum >=18/u);
  });
});

test("normative source checksum metadata must match the source manifest", async () => {
  await withFixture(async (root) => {
    const registry = JSON.parse(await readFile(path.join(root, "implementations/implementations.json"), "utf8"));
    registry.normativeSourceSha256 = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
    await put(root, "implementations/implementations.json", JSON.stringify(registry, null, 2));
    const result = await runDocumentationChecks({ root, currentDocs: [], historicalDocs: [] });
    assert.match(messages(result), /source manifest records a{64}/u);
  });
});
