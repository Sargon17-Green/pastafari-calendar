import test from "node:test";
import assert from "node:assert/strict";
import { copyFile, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  FOUNDATION_JDN,
  ReferenceOracle,
  bowlPermutation,
  discoverYearCandidates,
  keep,
  sauce,
  serializeBigInts,
  MAX_YEAR_DAYS,
} from "../verification/reference-oracle/reference.mjs";
import { compareOrderedStages } from "../verification/reference-oracle/compare.mjs";
import { observeAuthoritative } from "../verification/reference-oracle/authoritative-adapter.mjs";
import { GateIndex, PastafariCalendar } from "../browser/pastafari-calendar-core.js";

const ROOT = process.cwd();
const REFERENCE = path.join(ROOT, "verification/reference-oracle/reference.mjs");
const VECTOR = path.join(ROOT, "implementations/tests/conformance-vectors.json");
const FIXTURE = path.join(ROOT, "implementations/tests/spec-derived-canonical-vectors.json");

function finalStirOneRound(bowls, roundNumber, useOrderNumberForU = false) {
  const bowlSum = bowls.reduce((total, value) => total + value, 0n);
  const orderNumber = keep(bowlSum + 149n * BigInt(roundNumber));
  const order = bowlPermutation(1n + ((orderNumber - 1n) % 720n)).map((value) => value - 1);
  const old = [...bowls];
  const next = new Array(6);
  for (let place = 0; place < 6; place += 1) {
    const bowlId = order[place];
    const previousId = order[(place + 5) % 6];
    const nextId = order[(place + 1) % 6];
    const semanticSum = useOrderNumberForU ? orderNumber : bowlSum;
    const u = old[bowlId] + 3n * old[previousId] + 5n * old[nextId] + semanticSum + BigInt(roundNumber) + BigInt((place + 1) ** 2);
    next[bowlId] = keep(u * u + 7n * old[previousId] * old[nextId]);
  }
  return { bowlSum, orderNumber, order: order.map((value) => value + 1), bowls: next };
}

test("Update 16 authority audit passes and writes machine-readable evidence", () => {
  const output = execFileSync(process.execPath, ["scripts/run-update16-authority-audit.mjs", "--write"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
  const report = JSON.parse(output);
  assert.equal(report.status, "PASS");
  assert.equal(report.productionReferenceImportHits.length, 0);
  assert.ok(report.authorityNamedPathCount >= 20);
  assert.deepEqual(report.notImplementedReferenceStages, []);
});

test("legacy vectors and generator are explicitly witnesses, not normative authorities", async () => {
  const compact = JSON.parse(await readFile(VECTOR, "utf8"));
  const expanded = JSON.parse(await readFile(FIXTURE, "utf8"));
  assert.equal(compact.authority.normativeAuthority, false);
  assert.equal(expanded.authority.normativeAuthority, false);
  assert.match(compact.authority.authorityWarning, /not be used as the normative oracle/);
  assert.match(expanded.authority.authorityWarning, /not be used as the normative oracle/);
});

test("manual final-stir discriminator rejects the historical orderNumber-for-u fault", () => {
  const initial = [17n, 19n, 23n, 29n, 31n, 37n];
  const normative = finalStirOneRound(initial, 1, false);
  const oldLike = finalStirOneRound(initial, 1, true);
  assert.notEqual(normative.bowlSum, normative.orderNumber);
  assert.deepEqual(oldLike.order, normative.order, "orderNumber still selects the same order");
  assert.notDeepEqual(oldLike.bowls, normative.bowls, "using orderNumber in u changes semantic output");
  const comparison = compareOrderedStages([
    { stage: "final-stir", field: "authoritative_old_like", authoritative: oldLike.bowls, reference: normative.bowls },
    { stage: "final-stir", field: "fast_old_like", authoritative: oldLike.bowls, reference: normative.bowls },
    { stage: "final-stir", field: "generator_old_like", authoritative: oldLike.bowls, reference: normative.bowls },
  ]);
  assert.equal(comparison.fields.every((row) => row.status === "mismatch"), true);
  assert.equal(comparison.firstMismatch.field, "authoritative_old_like");
});

test("majority agreement among old-like witnesses cannot override reference", () => {
  const referenceValue = "bowlSum-derived";
  const sharedWrong = "orderNumber-derived";
  const comparison = compareOrderedStages([
    { stage: "tie-break", field: "authoritative", authoritative: sharedWrong, reference: referenceValue },
    { stage: "tie-break", field: "fast", authoritative: sharedWrong, reference: referenceValue },
    { stage: "tie-break", field: "generator", authoritative: sharedWrong, reference: referenceValue },
  ]);
  assert.equal(comparison.fields.length, 3);
  assert.equal(comparison.fields.filter((row) => row.status === "mismatch").length, 3);
  assert.equal(comparison.firstMismatch.stage, "tie-break");
});

test("authoritative state mutation cannot change reference output", () => {
  const oracle = new ReferenceOracle();
  const before = serializeBigInts(oracle.sauce(123n, -456n, { detail: "summary" }));
  const oldGate = GateIndex.prototype.gate;
  const oldConvert = PastafariCalendar.prototype.convertJdn;
  try {
    GateIndex.prototype.gate = () => 999999999999n;
    PastafariCalendar.prototype.convertJdn = () => ({ tampered: true });
    const after = serializeBigInts(oracle.sauce(123n, -456n, { detail: "summary" }));
    assert.deepEqual(after, before);
  } finally {
    GateIndex.prototype.gate = oldGate;
    PastafariCalendar.prototype.convertJdn = oldConvert;
  }
});

test("generator, fixture and vector corruption do not mutate reference result", async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), "pastafari-update16-corruption-"));
  try {
    const refCopy = path.join(temp, "reference.mjs");
    const fixtureCopy = path.join(temp, "spec-derived-canonical-vectors.json");
    const vectorCopy = path.join(temp, "conformance-vectors.json");
    const generatorCopy = path.join(temp, "generate_spec_canonical.py");
    await copyFile(REFERENCE, refCopy);
    await copyFile(FIXTURE, fixtureCopy);
    await copyFile(VECTOR, vectorCopy);
    await copyFile(path.join(ROOT, "implementations/tests/generate_spec_canonical.py"), generatorCopy);
    const moduleUrl = pathToFileURL(refCopy).href;
    const mod1 = await import(`${moduleUrl}?before=1`);
    const before = mod1.serializeBigInts(mod1.sauce(321n, 654n, { detail: "summary" }));
    await writeFile(fixtureCopy, "{\"deliberately\":\"tampered fixture\"}\n", "utf8");
    await writeFile(vectorCopy, "{\"deliberately\":\"tampered vector\"}\n", "utf8");
    await writeFile(generatorCopy, "print('tampered generator')\n", "utf8");
    const mod2 = await import(`${moduleUrl}?after=1`);
    const after = mod2.serializeBigInts(mod2.sauce(321n, 654n, { detail: "summary" }));
    assert.deepEqual(after, before);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test("reference corruption is detected by a manual scroll-derived discriminator", () => {
  const trace = sauce(FOUNDATION_JDN, FOUNDATION_JDN, { detail: "sauce" });
  const beforeRound1 = trace.drops.at(-1).bowlsAfter;
  const normative = finalStirOneRound(beforeRound1, 1, false);
  const oldLike = finalStirOneRound(beforeRound1, 1, true);
  assert.deepEqual(normative.bowls, trace.postStirs[0].bowlsAfter);
  assert.notDeepEqual(oldLike.bowls, trace.postStirs[0].bowlsAfter);
});

test("5778 candidate exclusion is an independent small discriminator", () => {
  assert.equal(MAX_YEAR_DAYS, 5_778n);
  const positions = new Map([
    [0, 0n],
    [1, 300n],
    [2, 700n],
    [3, 1_100n],
    [4, 1_600n],
    [5, 2_100n],
    [6, 2_600n],
    [7, 5_778n],
    [8, 5_779n],
  ]);
  const gateAt = (index) => {
    if (!positions.has(index)) throw new RangeError(`synthetic gate ${index} is unavailable`);
    return positions.get(index);
  };
  const next = discoverYearCandidates({ mode: "next", fixedGateIndex: 0, gateAt });
  assert.equal(next.afterFiltering.some((candidate) => candidate.yearLength > MAX_YEAR_DAYS), false);
  assert.equal(next.beforeFiltering.at(-1).yearLength, 5_779n);
});

test("Update17-completed reference final tuple remains independent from production", () => {
  const oracle = new ReferenceOracle();
  assert.deepEqual(serializeBigInts(oracle.finalPastafarianTuple(FOUNDATION_JDN, FOUNDATION_JDN)), { year: "5000", cutletName: "לגש", dayInCutlet: 762, monthName: "לבונה", dayInMonth: 105 });
});

test("authoritative observation is random-call independent for comparable fields", () => {
  const first = observeAuthoritative(987654n, -123456n, { randomSeed: 1 });
  const second = observeAuthoritative(987654n, -123456n, { randomSeed: 0xdeadbeef });
  assert.deepEqual(first.sauce.final, second.sauce.final);
  assert.deepEqual(first.response, second.response);
});
