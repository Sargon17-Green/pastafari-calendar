import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, readdir, rm, writeFile, copyFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

import { GateIndex, PastafariCalendar } from "../browser/pastafari-calendar-core.js";
import { compareOrderedStages } from "../verification/reference-oracle/compare.mjs";
import { observeAuthoritative } from "../verification/reference-oracle/authoritative-adapter.mjs";
import { runDifferential } from "../verification/reference-oracle/differential.mjs";
import {
  FOUNDATION_JDN,
  GREAT_NUMBER,
  MAX_YEAR_DAYS,
  ReferenceOracle,
  bowlPermutation,
  canonicalCounters,
  discoverYearCandidates,
  generateStones,
  keep,
  sauce,
  selectYearCandidate,
  serializeBigInts,
} from "../verification/reference-oracle/reference.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const REFERENCE = path.join(ROOT, "verification/reference-oracle/reference.mjs");
const FIXTURE = path.join(ROOT, "implementations/tests/spec-derived-canonical-vectors.json");
const SPEC_SHA256 = "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96";



async function loadInstrumentedFastSauce() {
  const sourcePath = path.join(ROOT, "browser/pastafari-calendar-fast.js");
  const source = await readFile(sourcePath, "utf8");
  const diagnosticsUrl = pathToFileURL(path.join(ROOT, "browser/pastafari-diagnostics.js")).href;
  const relocatedSource = source.replace(
    'from "./pastafari-diagnostics.js";',
    `from ${JSON.stringify(diagnosticsUrl)};`,
  );
  const temporaryPath = path.join(
    os.tmpdir(),
    `pastafari-reference-fast-${process.pid}-${randomUUID()}.mjs`,
  );
  await writeFile(temporaryPath, `${relocatedSource}\nexport { sauce as __testSauce };\n`, "utf8");
  try {
    const module = await import(`${pathToFileURL(temporaryPath).href}?v=${randomUUID()}`);
    return module.__testSauce;
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

function authoritativeStirTrace(calculationJdn, targetJdn) {
  const runner = path.join(ROOT, "verification/reference-oracle/authoritative-stir-trace-runner.mjs");
  const child = spawnSync(
    process.execPath,
    [runner, String(calculationJdn), String(targetJdn)],
    { cwd: ROOT, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 },
  );
  assert.equal(child.status, 0, child.stderr || child.stdout);
  return JSON.parse(child.stdout);
}

function sum(values) {
  return values.reduce((total, value) => total + BigInt(value), 0n);
}

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

test("completed calendar reference produces the Foundation 5-tuple without production fallback", () => {
  const oracle = new ReferenceOracle();
  assert.deepEqual(serializeBigInts(oracle.finalPastafarianTuple(FOUNDATION_JDN, FOUNDATION_JDN)), { year: "5000", cutletName: "לגש", dayInCutlet: 762, monthName: "לבונה", dayInMonth: 105 });
});


test("year candidate reference filters above 5,778 before cardinality and selection", () => {
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
  assert.deepEqual(
    next.afterFiltering.map((candidate) => candidate.yearLength),
    [2_600n, 5_778n],
  );
  assert.equal(next.beforeFiltering.at(-1).yearLength, 5_779n, "first over-ceiling probe remains diagnostic only");
  assert.equal(next.cardinality, 2);

  const anchorGates = new GateIndex();
  const calculationJdn = -13_258_058n;
  const containingGateIndex = anchorGates.indexAtOrBefore(calculationJdn - 1n);
  const anchor = discoverYearCandidates({
    mode: "anchor",
    calculationJdn,
    containingGateIndex,
    gateAt: (index) => anchorGates.gate(index),
  });
  assert.equal(anchor.cardinality, 41);
  assert.equal(anchor.afterFiltering.some((candidate) => candidate.yearLength > MAX_YEAR_DAYS), false);
  assert.equal(
    anchor.beforeFiltering.some((candidate) => candidate.openGateIndex === 147 && candidate.closeGateIndex === 156 && candidate.yearLength === 5_779n),
    true,
    "fresh corrected-gate discriminator must expose the forbidden pair before normative filtering",
  );
  const selection = selectYearCandidate({ calculationJdn, discovery: anchor });
  assert.equal(selection.selectedOneBased, 27);
  assert.deepEqual(
    [selection.selectedCandidate.openGateIndex, selection.selectedCandidate.closeGateIndex, selection.selectedCandidate.yearLength],
    [139, 149, 4_785n],
  );
});

test("final-stir reference preserves the Scroll's two distinct sum/order roles and simultaneous snapshot", () => {
  const trace = sauce(2461273n, 2461273n, { detail: "full" });
  assert.equal(trace.postStirs.length, 12);

  for (let roundIndex = 0; roundIndex < trace.postStirs.length; roundIndex += 1) {
    const round = trace.postStirs[roundIndex];
    const expectedSum = sum(round.bowlsBefore);
    assert.equal(round.bowlSum, expectedSum, `round ${round.round}: bowlSum must be the raw pre-round sum`);
    assert.equal(
      round.orderNumber,
      keep(expectedSum + 149n * BigInt(round.round)),
      `round ${round.round}: orderNumber`,
    );
    assert.equal(round.permutationRank, 1n + ((round.orderNumber - 1n) % 720n));
    assert.deepEqual(round.permutation, bowlPermutation(round.permutationRank));

    const recomputedAfter = new Array(6).fill(null);
    for (const stir of round.stirs) {
      const bowl = stir.bowl - 1;
      const previous = stir.previousBowl - 1;
      const next = stir.nextBowl - 1;
      const expectedU = round.bowlsBefore[bowl]
        + 3n * round.bowlsBefore[previous]
        + 5n * round.bowlsBefore[next]
        + round.bowlSum
        + BigInt(round.round)
        + BigInt(stir.place) ** 2n;
      assert.equal(stir.u, expectedU, `round ${round.round}, place ${stir.place}: u must use bowlSum`);
      assert.equal(
        stir.output,
        keep(expectedU ** 2n + 7n * round.bowlsBefore[previous] * round.bowlsBefore[next]),
        `round ${round.round}, place ${stir.place}: kept output`,
      );
      recomputedAfter[bowl] = stir.output;
    }
    assert.deepEqual(recomputedAfter, round.bowlsAfter, `round ${round.round}: six outputs are applied together`);

    // Replacing bowl 1 in a mutable copy demonstrates why the saved sum cannot
    // be recomputed after any output has been produced in this round.
    const mutated = [...round.bowlsBefore];
    mutated[0] = round.bowlsAfter[0];
    assert.equal(round.bowlSum, expectedSum, `round ${round.round}: saved bowlSum is immutable for the round`);
    assert.notEqual(sum(mutated), round.bowlSum, `round ${round.round}: a sequentially recomputed sum would differ`);

    if (roundIndex + 1 < trace.postStirs.length) {
      const following = trace.postStirs[roundIndex + 1];
      assert.equal(following.bowlSum, sum(round.bowlsAfter), `round ${following.round}: next round takes a fresh sum`);
    }
  }

  // Anti-regression: using raw bowlSum to choose the permutation is also wrong.
  const first = trace.postStirs[0];
  const wrongRawSumRank = 1n + ((first.bowlSum - 1n) % 720n);
  assert.notEqual(wrongRawSumRank, first.permutationRank);
  assert.notDeepEqual(bowlPermutation(wrongRawSumRank), first.permutation);
});

test("authoritative generated final-stir trace matches the independent reference", { timeout: 120_000 }, () => {
  const c = 2461273n;
  const t = 2461273n;
  const authoritative = authoritativeStirTrace(c, t);
  const reference = sauce(c, t, { detail: "full" });
  assert.equal(authoritative.rounds.length, 12);

  for (let i = 0; i < 12; i += 1) {
    const actual = authoritative.rounds[i];
    const expected = reference.postStirs[i];
    assert.equal(actual.round, expected.round);
    assert.deepEqual(actual.bowlsBefore.map(BigInt), expected.bowlsBefore);
    assert.equal(BigInt(actual.bowlSum), expected.bowlSum);
    assert.equal(BigInt(actual.orderNumber), expected.orderNumber);
    assert.deepEqual(actual.permutation.map((value) => value + 1), expected.permutation);
    assert.equal(actual.stirs.length, 6);
    for (let j = 0; j < 6; j += 1) {
      const a = actual.stirs[j];
      const e = expected.stirs[j];
      assert.equal(a.place, e.place);
      assert.equal(a.bowlIndex + 1, e.bowl);
      assert.equal(a.previousIndex + 1, e.previousBowl);
      assert.equal(a.nextIndex + 1, e.nextBowl);
      assert.equal(BigInt(a.u), e.u);
      assert.equal(BigInt(a.output), e.output);
    }
  }
  assert.deepEqual(authoritative.final.bowls.map(BigInt), reference.final.bowls);
});

test("fast direct sauce matches reference on positive, negative and random discriminators", async () => {
  const fastSauce = await loadInstrumentedFastSauce();
  for (const [c, t] of [
    [2461273n, 2461273n],
    [0n, 0n],
    [2461273n, 2461200n],
    [2461273n, 2461350n],
    [-1000n, -1200n],
    [-19650164n, 5504306n],
  ]) {
    const actual = fastSauce(c, t);
    const expected = sauce(c, t, { detail: "summary" });
    assert.deepEqual(actual.bowls.map(BigInt), expected.final.bowls, `fast sauce mismatch for c=${c}, t=${t}`);
    assert.deepEqual(actual.lastDropPermutation, expected.final.lastDropPermutation.map((value) => value - 1));
  }
});

test("direct authoritative gate-gap calculation matches reference without checkpoints", () => {
  const oracle = new ReferenceOracle();
  for (const index of [1, 2, 3, -1, -2, -3]) {
    const target = FOUNDATION_JDN + BigInt(index);
    const authoritative = observeAuthoritative(FOUNDATION_JDN, target, { randomSeed: 0x00c0ffee });
    // Authoritative chooseIndex is zero-based; Scroll/reference chooseUniform is 1-based.
    const directGap = authoritative.response.choose922 + 42n;
    assert.equal(directGap, oracle.gateGap(index).gap, `direct gate gap ${index}`);
  }
});

test("differential normalizes the authoritative zero-based response choice", () => {
  const result = runDifferential({
    calculationJdn: 2461273n,
    targetJdn: 2461273n,
    detail: "summary",
    randomSeed: 0x00c0ffee,
  });
  const choice = result.comparison.fields.find(
    (row) => row.stage === "response" && row.field === "choose922",
  );
  assert.equal(choice?.status, "match");
  assert.equal(result.comparison.mismatchCount, 0);
});
