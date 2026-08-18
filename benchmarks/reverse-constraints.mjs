"use strict";

import assert from "node:assert/strict";
import {
  FIXED,
  canonical,
  digest,
  environment,
  fileSha256,
  sample,
  summarize,
  timed,
  writeReport,
} from "./lib.mjs";

const REVERSE_N = Number(process.env.PASTAFARI_BENCH_REVERSE_N || 5);
const CONSTRAINT_N = Number(process.env.PASTAFARI_BENCH_CONSTRAINT_N || 3);
const TIMEOUT_MS = Number(process.env.PASTAFARI_BENCH_SEARCH_TIMEOUT_MS || 20_000);

async function main() {
  const rows = [];
  const findings = [];
  const limitations = [];
  const memory = { beforeBytes: process.memoryUsage().heapUsed };

  const fast = await import("../browser/pastafari-calendar-fast.js");
  const constraints = await import("../browser/pastafari-constraints.js");
  const calendar = new fast.PastafariCalendar({
    todayProvider: () => new fast.GregorianDate(2000n, 1, 1),
  });

  function pastafari(targetJdn, calculationJdn) {
    return calendar.convertJdn(targetJdn, { calculationJdn }).toJSON();
  }

  const easyTarget = FIXED.calculationJdn + 3n;
  const mediumTarget = FIXED.calculationJdn + 137n;
  const farTarget = FIXED.calculationJdn + 36_524n;
  const reverseCases = [
    { id: "known-calculation-near", targetJdn: easyTarget, calculationJdn: FIXED.calculationJdn },
    { id: "known-calculation-medium", targetJdn: mediumTarget, calculationJdn: FIXED.calculationJdn },
    { id: "known-calculation-about-100-years", targetJdn: farTarget, calculationJdn: FIXED.calculationJdn },
  ];

  for (const item of reverseCases) {
    const wanted = pastafari(item.targetJdn, item.calculationJdn);
    const result = await sample({
      n: REVERSE_N,
      warmup: 1,
      operation: () => fast.findPastafariDate(wanted, { calculationJdn: item.calculationJdn }),
      validate: (value) => {
        assert.ok(Array.isArray(value));
        assert.ok(value.some((candidate) => candidate.targetJdn === item.targetJdn && candidate.calculationJdn === item.calculationJdn));
      },
    });
    rows.push({
      scenario: `reverse ${item.id}`,
      path: "reverse/direct-known-calculation",
      stats: result,
      notes: `target=${item.targetJdn}; calculation=${item.calculationJdn}`,
    });
  }

  // Significant bounded diagonal search, with real progress counters.
  const diagonalTarget = FIXED.calculationJdn + 23n;
  const diagonalWanted = pastafari(diagonalTarget, diagonalTarget);
  let lastProgress = null;
  const diagonal = await timed(() => fast.findPastafariDate(diagonalWanted, {
    calculationDate: fast.SAME_AS_TARGET,
    searchRange: [diagonalTarget - 50n, diagonalTarget + 50n],
    yieldEvery: 8,
    onProgress: (value) => { lastProgress = value; },
  }));
  assert.ok(diagonal.value.some((candidate) => candidate.targetJdn === diagonalTarget && candidate.calculationJdn === diagonalTarget));
  rows.push({
    scenario: "reverse bounded diagonal 101-day range",
    path: "reverse/same-as-target",
    stats: { ...summarize([diagonal.elapsedMs]), checksum: digest(diagonal.value.map((c) => [c.targetJdn, c.calculationJdn])) },
    notes: `progress scanned=${lastProgress?.scanned ?? "unknown"}/${lastProgress?.total ?? "unknown"}; matches=${lastProgress?.matches ?? "unknown"}`,
  });

  // Timeout is a benchmark outcome, not a correctness failure.
  let timeoutProgress = null;
  const timeoutStarted = performance.now();
  let timeoutError = null;
  try {
    const clientModule = await import("../browser/pastafari-reverse.js");
    const client = new clientModule.PastafariReverseClient();
    try {
      await client.find(diagonalWanted, {
        calculationDate: fast.SAME_AS_TARGET,
        searchRange: [diagonalTarget - 5_000n, diagonalTarget + 5_000n],
        yieldEvery: 8,
        timeoutMs: Math.min(100, TIMEOUT_MS),
        onProgress: (value) => { timeoutProgress = value; },
      });
    } finally {
      client.dispose();
    }
  } catch (error) {
    timeoutError = error;
  }
  const timeoutElapsed = performance.now() - timeoutStarted;
  assert.ok(timeoutError?.name === "TimeoutError" || timeoutError?.name === "AbortError", "expected reverse timeout/cancellation");
  rows.push({
    scenario: "reverse intentional timeout",
    path: "reverse/client-timeout",
    stats: summarize([timeoutElapsed]),
    notes: `TIMEOUT expected; code=${timeoutError?.code ?? "unknown"}; scanned=${timeoutProgress?.scanned ?? "unknown"}`,
  });

  const BASE = FIXED.calculationJdn;
  function cycleFixture(radius) {
    const A = BASE + 7n;
    const B = BASE + 19n;
    return {
      A,
      B,
      problem: {
        variables: {
          A: { range: [A - radius, A + radius] },
          B: { range: [B - radius, B + radius] },
        },
        constraints: [
          { type: "pastafari", target: "A", calculation: "B", date: pastafari(A, B) },
          { type: "pastafari", target: "B", calculation: "A", date: pastafari(B, A) },
        ],
      },
    };
  }

  const chainB = BASE + 4n;
  const chainA = BASE + 9n;
  const acyclicProblem = {
    variables: { A: {}, B: {} },
    constraints: [
      { type: "pastafari", target: "B", calculationJdn: BASE, date: pastafari(chainB, BASE) },
      { type: "pastafari", target: "A", calculation: "B", date: pastafari(chainA, chainB) },
    ],
  };
  const acyclic = await sample({
    n: CONSTRAINT_N,
    warmup: 1,
    operation: () => constraints.solvePastafariConstraintsDirect(acyclicProblem),
    validate: (value) => {
      assert.equal(value.complete, true);
      assert.ok(value.solutions.some((solution) => solution.A.jdn === chainA && solution.B.jdn === chainB));
    },
  });
  rows.push({ scenario: "constraint acyclic two-step chain", path: "constraints/direct", stats: acyclic, notes: "reuses one-dimensional reverse" });

  for (const radius of [2n, 8n]) {
    const fixture = cycleFixture(radius);
    let stats = null;
    const result = await sample({
      n: CONSTRAINT_N,
      warmup: radius === 2n ? 1 : 0,
      operation: async () => {
        const value = await constraints.solvePastafariConstraintsDirect(fixture.problem, { yieldEvery: 8 });
        stats = value.stats;
        return value;
      },
      validate: (value) => {
        assert.equal(value.complete, true);
        assert.ok(value.solutions.some((solution) => solution.A.jdn === fixture.A && solution.B.jdn === fixture.B));
      },
    });
    rows.push({
      scenario: `constraint cyclic radius ${radius}`,
      path: "constraints/joint-solver",
      stats: result,
      notes: `reverseCalls=${stats?.reverseCalls ?? "?"}; forwardVerifications=${stats?.forwardVerifications ?? "?"}`,
    });
  }

  // Constraint timeout/cancellation baseline via public client. In Node this uses the legitimate inline fallback.
  const hard = cycleFixture(50n);
  let constraintError = null;
  const constraintTimeoutStart = performance.now();
  try {
    const clientModule = await import("../browser/pastafari-constraints-client.js");
    const client = new clientModule.PastafariConstraintClient();
    try {
      await client.solve(hard.problem, { timeoutMs: 5, yieldEvery: 1 });
    } finally {
      client.dispose();
    }
  } catch (error) {
    constraintError = error;
  }
  const constraintTimeoutElapsed = performance.now() - constraintTimeoutStart;
  assert.ok(constraintError?.name === "TimeoutError" || constraintError?.name === "AbortError", "expected constraint timeout/cancellation");
  rows.push({
    scenario: "constraint intentional timeout",
    path: "constraints/client-timeout",
    stats: summarize([constraintTimeoutElapsed]),
    notes: `TIMEOUT expected; code=${constraintError?.code ?? "unknown"}; not a correctness failure`,
  });

  memory.afterBytes = process.memoryUsage().heapUsed;
  memory.deltaBytes = memory.afterBytes - memory.beforeBytes;
  findings.push("Reverse known-calculation, bounded diagonal search, explicit timeout, acyclic constraints, and cyclic constraints are separated instead of aggregating unlike workloads.");
  findings.push(`Heap used changed by ${(memory.deltaBytes / 2 ** 20).toFixed(1)} MiB across the reverse/constraint workload; this is a coarse baseline, not a leak proof.`);
  limitations.push("Reverse/constraint p95 values are low-confidence at the default sample counts; these operations can be expensive, so the raw sample arrays in JSON are the primary comparison data.");
  limitations.push("Node has no browser Worker global, so the reverse/constraint client rows use their production inline fallback. Browser Worker startup/round-trip is covered by web.mjs.");

  const report = {
    kind: "reverse-constraints",
    environment: environment({
      browserVersion: null,
      engineHashes: {
        "fast/reverse entry": fileSha256("browser/pastafari-calendar-fast.js"),
        "constraint solver": fileSha256("browser/pastafari-constraints.js"),
      },
    }),
    rows,
    findings,
    limitations,
    memory,
  };
  const paths = await writeReport("reverse-constraints", report);
  console.log(`Reverse/constraints benchmark complete: ${paths.mdPath}`);
}

await main();
