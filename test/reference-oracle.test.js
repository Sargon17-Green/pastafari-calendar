import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, readdir, rm, writeFile, copyFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

import { GateIndex, PastafariCalendar } from "../browser/pastafari-calendar-core.js";
import { compareOrderedStages } from "../verification/reference-oracle/compare.mjs";
import { observeAuthoritative } from "../verification/reference-oracle/authoritative-adapter.mjs";
import {
  FOUNDATION_JDN,
  GREAT_NUMBER,
  ReferenceNotImplementedError,
  ReferenceOracle,
  bowlPermutation,
  canonicalCounters,
  generateStones,
  keep,
  sauce,
  serializeBigInts,
} from "../verification/reference-oracle/reference.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const REFERENCE = path.join(ROOT, "verification/reference-oracle/reference.mjs");
const FIXTURE = path.join(ROOT, "implementations/tests/spec-derived-canonical-vectors.json");
const SPEC_SHA256 = "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96";

async function repositoryScrollPath() {
  const sourceDir = path.join(ROOT, "sources");
  const names = await readdir(sourceDir);
  const markdown = names.filter((name) => name.endsWith(".md"));
  assert.equal(markdown.length, 1, "expected exactly one normative Markdown source under sources/");
  return path.join(sourceDir, markdown[0]);
}

test("reference source has the documented normative SHA-256", async () => {
  const bytes = await readFile(await repositoryScrollPath());
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(digest, SPEC_SHA256);
});

test("reference module imports no project implementation, fast engine, fixture or generator", async () => {
  const text = await readFile(REFERENCE, "utf8");
  const imports = [...text.matchAll(/^\s*import\s.+?from\s+["'](.+?)["'];?\s*$/gm)].map((m) => m[1]);
  const sideEffectImports = [...text.matchAll(/^\s*import\s+["'](.+?)["'];?\s*$/gm)].map((m) => m[1]);
  assert.deepEqual([...imports, ...sideEffectImports], []);
});

test("small fixed expectations are independently checkable from explicit Scroll rules", () => {
  // Scroll tablet 5: 127 doublings then -1.
  assert.equal(GREAT_NUMBER, 170141183460469231731687303715884105727n);
  // Scroll tablet 6: exact multiple maps to M, and M+1 wraps to 1.
  assert.equal(keep(GREAT_NUMBER), GREAT_NUMBER);
  assert.equal(keep(GREAT_NUMBER + 1n), 1n);
  // Scroll tablet 11 explicitly states first and last lexicographic orders.
  assert.deepEqual(bowlPermutation(1n), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(bowlPermutation(720n), [6, 5, 4, 3, 2, 1]);
});

test("canonical counters match a hand-checkable Foundation + 1 example", () => {
  // c=Foundation, t=Foundation+1 -> day numbers 1 and 3; inclusive distance 2;
  // sum 4; direction 3 (target later than calculation).
  assert.deepEqual(canonicalCounters(FOUNDATION_JDN, FOUNDATION_JDN + 1n), {
    calculation: 1n,
    target: 3n,
    distance: 2n,
    sum: 4n,
    direction: 3n,
  });
});

test("stone recurrence has an independently hand-calculated second row", () => {
  const stones = generateStones(2);
  assert.deepEqual(stones[0], [17n, 29n, 43n, 71n, 101n]);
  // From Scroll tablet 7, all values are below M here:
  // 17²+3*29+2=378; 29²+5*43+17=1073; 43²+7*71+29=2375;
  // 71²+11*101+43=6195; 101²+13*17+71=10493.
  assert.deepEqual(stones[1], [378n, 1073n, 2375n, 6195n, 10493n]);
});

test("Foundation sauce exposes manually checkable initial values without self-generated fixtures", () => {
  const trace = sauce(FOUNDATION_JDN, FOUNDATION_JDN, { detail: "sauce" });
  // At Foundation both day numbers are 1; distance=1, sum=2, direction=2.
  // Bowl 1 inner sum: 1 + 1*1 + 1 + 2 + 2 + 17² = 296;
  // first content = 296² + 1 = 87617.
  assert.equal(trace.initialBowls[0], 87617n);
  // Hidden drop 1 before grinding:
  // 1 + 3*1 + 4*1 + 6*2 + 8*2 + (17+29+43+71+101) = 297.
  assert.equal(trace.hiddenDrops[0].initial, 297n);
});

test("mocking authoritative functions cannot change reference output", () => {
  const oracle = new ReferenceOracle();
  const before = serializeBigInts(oracle.sauce(123n, -456n, { detail: "summary" }));
  const oldGate = GateIndex.prototype.gate;
  const oldConvert = PastafariCalendar.prototype.convertJdn;
  try {
    GateIndex.prototype.gate = () => 999999999n;
    PastafariCalendar.prototype.convertJdn = () => ({ tampered: true });
    const after = serializeBigInts(oracle.sauce(123n, -456n, { detail: "summary" }));
    assert.deepEqual(after, before);
  } finally {
    GateIndex.prototype.gate = oldGate;
    PastafariCalendar.prototype.convertJdn = oldConvert;
  }
});

test("mutating a copied existing canonical fixture cannot affect the byte-identical reference module", async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), "pastafari-reference-fixture-independence-"));
  try {
    const refCopy = path.join(temp, "reference.mjs");
    const fixtureCopy = path.join(temp, "spec-derived-canonical-vectors.json");
    await copyFile(REFERENCE, refCopy);
    await copyFile(FIXTURE, fixtureCopy);
    const moduleUrl = pathToFileURL(refCopy).href;
    const copiedReference = await import(`${moduleUrl}?before=1`);
    const before = copiedReference.serializeBigInts(copiedReference.sauce(321n, 654n, { detail: "summary" }));
    await writeFile(fixtureCopy, "{\"deliberately\":\"tampered\"}\n", "utf8");
    const copiedReferenceAfter = await import(`${moduleUrl}?after=1`);
    const after = copiedReferenceAfter.serializeBigInts(copiedReferenceAfter.sauce(321n, 654n, { detail: "summary" }));
    assert.deepEqual(after, before);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test("authoritative observation is stable across controlled Math.random seeds", () => {
  const first = observeAuthoritative(987654n, -123456n, { randomSeed: 1 });
  const second = observeAuthoritative(987654n, -123456n, { randomSeed: 0xdeadbeef });
  assert.deepEqual(first.sauce.final, second.sauce.final);
  assert.deepEqual(first.response, second.response);
  assert.equal(first.execution.mathRandom.seed, 1);
  assert.equal(second.execution.mathRandom.seed, 0xdeadbeef >>> 0);
});

test("comparison runner detects an artificial mismatch", () => {
  const result = compareOrderedStages([
    { stage: "a", field: "x", authoritative: 10n, reference: 10n },
    { stage: "b", field: "y", authoritative: 20n, reference: 21n },
  ]);
  assert.equal(result.fields[0].status, "match");
  assert.equal(result.fields[1].status, "mismatch");
  assert.deepEqual(result.firstMismatch, {
    stage: "b", field: "y", authoritative: 20n, reference: 21n, context: null,
  });
});

test("comparison runner reports the first divergence, not a later/final one", () => {
  const result = compareOrderedStages([
    { stage: "round", field: "1", authoritative: 1, reference: 1 },
    { stage: "round", field: "2", authoritative: 2, reference: 999 },
    { stage: "final", field: "tuple", authoritative: "A", reference: "B" },
  ]);
  assert.equal(result.firstMismatch.stage, "round");
  assert.equal(result.firstMismatch.field, "2");
});

test("two identical reference executions return byte-for-byte equivalent trace data", () => {
  const first = serializeBigInts(sauce(-123456n, 789012n, { detail: "full" }));
  const second = serializeBigInts(sauce(-123456n, 789012n, { detail: "full" }));
  assert.deepEqual(second, first);
});

test("unimplemented calendar stages fail explicitly and never fall back", () => {
  const oracle = new ReferenceOracle();
  for (const method of [
    "discoverYearCandidates",
    "selectYear",
    "buildCutletStructure",
    "buildMonthStructure",
    "finalPastafarianTuple",
  ]) {
    assert.throws(() => oracle[method](), (error) => {
      assert.ok(error instanceof ReferenceNotImplementedError);
      assert.equal(error.code, "ERR_REFERENCE_NOT_IMPLEMENTED");
      return true;
    });
  }
});
