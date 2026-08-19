"use strict";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(TEST_DIR, "..");
const BROWSER_DIR = path.join(ROOT, "browser");
const DOCS_ENGINE_DIR = path.join(ROOT, "docs", "engine");

const COPIED_FILES = Object.freeze([
  "pastafari-calendar-fast.js",
  "pastafari-constraints-client.js",
  "pastafari-constraints.js",
  "pastafari-reverse-worker.js",
  "pastafari-diagnostics.js",
]);

for (const fileName of COPIED_FILES) {
  test(`Pages reverse artifact is byte-identical to browser/${fileName}`, async () => {
    const [canonical, pages] = await Promise.all([
      readFile(path.join(BROWSER_DIR, fileName)),
      readFile(path.join(DOCS_ENGINE_DIR, fileName)),
    ]);
    assert.equal(
      pages.equals(canonical),
      true,
      `${fileName} must be copied from browser/ without modification`,
    );
  });
}

test("Pages fast worker preserves the UI-specific adapter contract", async () => {
  const source = await readFile(path.join(DOCS_ENGINE_DIR, "pastafari-fast-worker.js"), "utf8");
  assert.match(source, /cutletIndexFromInternalName/);
  assert.match(source, /monthIndexFromInternalName/);
  assert.match(source, /case "getRangeView"/);
  assert.match(source, /case "getYearStructure"/);
});
test("Pages fast engine exposes the primitives required by the reverse solver", async () => {
  const engine = await import(pathToFileURL(path.join(DOCS_ENGINE_DIR, "pastafari-calendar-fast.js")).href);
  assert.equal(typeof engine.findPastafariDate, "function");
  assert.equal(typeof engine.getCutletView, "function");
  assert.equal(typeof engine.PastafariCalendar, "function");
  assert.equal(engine.SAME_AS_TARGET, "same-as-target");
});

test("Pages constraint module exposes the direct solver", async () => {
  const constraints = await import(pathToFileURL(path.join(DOCS_ENGINE_DIR, "pastafari-constraints.js")).href);
  assert.equal(typeof constraints.solvePastafariConstraintsDirect, "function");
});

test("Pages constraint client exposes the worker-backed public solver", async () => {
  const client = await import(pathToFileURL(path.join(DOCS_ENGINE_DIR, "pastafari-constraints-client.js")).href);
  assert.equal(typeof client.PastafariConstraintClient, "function");
  assert.equal(typeof client.solvePastafariConstraints, "function");
  assert.equal(client.SAME_AS_TARGET, "same-as-target");
});
