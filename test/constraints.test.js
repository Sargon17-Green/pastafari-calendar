"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import {
  GregorianDate,
  PastafariCalendar,
  findPastafariDate,
  gregorianToJdn,
  solvePastafariConstraints as solvePublishedConstraints,
} from "pastafari-calendar";
import {
  SAME_AS_TARGET,
  GregorianDate as FastGregorianDate,
  PastafariCalendar as FastCalendar,
  gregorianToJdn as fastGregorianToJdn,
} from "../browser/pastafari-calendar-fast.js";
import { solvePastafariConstraintsDirect } from "../browser/pastafari-constraints.js";
import { handlePastafariConstraintRequest } from "../browser/pastafari-reverse-worker.js";
import * as reverseSubpath from "pastafari-calendar/reverse";
import * as constraintsSubpath from "pastafari-calendar/constraints";

const BASE = fastGregorianToJdn(new FastGregorianDate(2026n, 8, 6));
const calendar = new FastCalendar();

function p(targetJdn, calculationJdn) {
  return calendar.convertJdn(targetJdn, { calculationJdn }).toJSON();
}

function jdns(solution) {
  return Object.fromEntries(Object.entries(solution).map(([name, value]) => [name, value.jdn]));
}

function cycleFixture(radius = 2n) {
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
        { type: "pastafari", target: "A", calculation: "B", date: p(A, B) },
        { type: "pastafari", target: "B", calculation: "A", date: p(B, A) },
      ],
    },
  };
}

test("constraint API is additive and ordinary reverse still works", async () => {
  assert.equal(typeof reverseSubpath.findPastafariDate, "function");
  assert.equal(typeof solvePublishedConstraints, "function");
  assert.equal(typeof constraintsSubpath.solvePastafariConstraints, "function");
  assert.equal(typeof constraintsSubpath.PastafariConstraintClient, "function");
  assert.equal(constraintsSubpath.SAME_AS_TARGET, "same-as-target");
  const calculationJdn = BASE;
  const targetJdn = BASE + 3n;
  const wanted = p(targetJdn, calculationJdn);
  const found = await findPastafariDate(wanted, { calculationJdn, timeoutMs: 30_000 });
  assert.deepStrictEqual(found.map((candidate) => candidate.targetJdn), [targetJdn]);
});

test("acyclic Pastafari chain reuses one-dimensional reverse", async () => {
  const anchor = BASE;
  const B = BASE + 4n;
  const A = BASE + 9n;
  const result = await solvePastafariConstraintsDirect({
    variables: { A: {}, B: {} },
    constraints: [
      { type: "pastafari", target: "B", calculationJdn: anchor, date: p(B, anchor) },
      { type: "pastafari", target: "A", calculation: "B", date: p(A, B) },
    ],
  });
  assert.equal(result.complete, true);
  assert.deepStrictEqual(jdns(result.solutions[0]), { A, B });
});

test("SAME_AS_TARGET remains the bounded diagonal primitive inside a chain", async () => {
  const C = BASE + 2n;
  const B = BASE + 5n;
  const A = BASE + 8n;
  const result = await solvePastafariConstraintsDirect({
    variables: { A: {}, B: {}, C: { range: [C - 1n, C + 1n] } },
    constraints: [
      { type: "pastafari", target: "C", calculation: SAME_AS_TARGET, date: p(C, C) },
      { type: "pastafari", target: "B", calculation: "C", date: p(B, C) },
      { type: "pastafari", target: "A", calculation: "B", date: p(A, B) },
    ],
  }, { yieldEvery: 1 });
  assert.equal(result.complete, true);
  assert.deepStrictEqual(jdns(result.solutions[0]), { A, B, C });
});

test("two-variable Pastafari cycle is solved jointly and fully verified", async () => {
  const { A, B, problem } = cycleFixture(2n);
  const result = await solvePastafariConstraintsDirect(problem, { yieldEvery: 1 });
  assert.equal(result.complete, true);
  assert.ok(result.solutions.some((solution) => solution.A.jdn === A && solution.B.jdn === B));
  assert.ok(result.stats.forwardVerifications >= 2n);
});

test("cyclic system can prove no solution in a finite domain", async () => {
  const { problem } = cycleFixture(1n);
  problem.constraints[1] = {
    ...problem.constraints[1],
    date: { ...problem.constraints[1].date, monthName: "__not_a_real_month__" },
  };
  const result = await solvePastafariConstraintsDirect(problem);
  assert.equal(result.complete, true);
  assert.deepStrictEqual(result.solutions, []);
});

test("cyclic system returns multiple solutions when a bounded degree of freedom remains", async () => {
  const { A, B, problem } = cycleFixture(0n);
  problem.variables.C = { range: [BASE, BASE + 1n] };
  const result = await solvePastafariConstraintsDirect(problem);
  assert.equal(result.complete, true);
  assert.equal(result.solutions.length, 2);
  assert.ok(result.solutions.every((solution) => solution.A.jdn === A && solution.B.jdn === B));
});

test("unanchored cycle fails instead of starting an unbounded search", async () => {
  const { problem } = cycleFixture(1n);
  problem.variables = { A: {}, B: {} };
  await assert.rejects(
    solvePastafariConstraintsDirect(problem),
    (error) => error?.code === "ERR_CONSTRAINT_RANGE_REQUIRED",
  );
});

test("incoming absolute Pastafari anchor can bound a cyclic component", async () => {
  const { A, B, problem } = cycleFixture(1n);
  problem.variables = { A: {}, B: {} };
  problem.constraints.unshift({
    type: "pastafari",
    target: "A",
    calculationJdn: BASE,
    date: p(A, BASE),
  });
  const result = await solvePastafariConstraintsDirect(problem);
  assert.equal(result.complete, true);
  assert.ok(result.solutions.some((solution) => solution.A.jdn === A && solution.B.jdn === B));
});

test("equality, order and bounded difference propagate before search", async () => {
  const A = BASE;
  const B = BASE + 3n;
  const result = await solvePastafariConstraintsDirect({
    variables: { A: { jdn: A }, B: { range: [BASE, BASE + 10n] } },
    constraints: [
      { type: "order", left: "A", op: "<", right: "B" },
      { type: "difference", left: "B", right: "A", equals: 3n },
    ],
  });
  assert.equal(result.complete, true);
  assert.deepStrictEqual(jdns(result.solutions[0]), { A, B });
});

test("cancellation interrupts joint solving", async () => {
  const { problem } = cycleFixture(8n);
  const controller = new AbortController();
  await assert.rejects(
    solvePastafariConstraintsDirect(problem, {
      signal: controller.signal,
      yieldEvery: 1,
      onProgress: () => controller.abort(),
    }),
    (error) => error?.name === "AbortError" && error?.code === "ERR_REVERSE_ABORTED",
  );
});

test("worker handler runs the constraint solver", async () => {
  const { A, B, problem } = cycleFixture(0n);
  const result = await handlePastafariConstraintRequest({ problem, options: { yieldEvery: 1 } });
  assert.equal(result.complete, true);
  assert.deepStrictEqual(jdns(result.solutions[0]), { A, B });
});

test("worker-backed public API timeout aborts inline fallback as well", async () => {
  const { problem } = cycleFixture(50n);
  await assert.rejects(
    constraintsSubpath.solvePastafariConstraints(problem, { timeoutMs: 1, yieldEvery: 1 }),
    (error) => error?.name === "TimeoutError" && error?.code === "ERR_REVERSE_TIMEOUT",
  );
});

test("progress is monotonic and never claims false completion", async () => {
  const { problem } = cycleFixture(5n);
  const progress = [];
  const result = await solvePastafariConstraintsDirect(problem, {
    yieldEvery: 1,
    maxScanned: 2n,
    onProgress: (value) => progress.push(value),
  });
  assert.equal(result.complete, false);
  assert.equal(progress.at(-1).complete, false);
  for (let i = 1; i < progress.length; i += 1) {
    assert.ok(progress[i].scanned >= progress[i - 1].scanned);
  }
});

test("small finite cycle reports completeness only after exhaustive verification", async () => {
  const { A, B, problem } = cycleFixture(0n);
  const result = await solvePastafariConstraintsDirect(problem, { yieldEvery: 1 });
  assert.equal(result.complete, true);
  assert.equal(result.termination, "complete");
  assert.deepStrictEqual(jdns(result.solutions[0]), { A, B });
  assert.equal(result.candidates >= result.verified, true);
  assert.equal(result.verified >= 1n, true);
  assert.equal(result.stats.forwardVerifications >= 2n, true);
});

test("cyclic propagation does not enumerate the Cartesian product", async () => {
  const radius = 3n;
  const { problem } = cycleFixture(radius);
  const width = 2n * radius + 1n;
  const result = await solvePastafariConstraintsDirect(problem);
  assert.equal(result.complete, true);
  assert.ok(result.stats.reverseCalls <= 2n * width);
  assert.ok(result.stats.reverseCalls < width * width);
});

test("maxSolutions distinguishes verified solutions from completeness", async () => {
  const result = await solvePastafariConstraintsDirect({
    variables: { A: { range: [BASE, BASE + 2n] } },
    constraints: [],
  }, { maxSolutions: 2 });
  assert.equal(result.solutions.length, 2);
  assert.equal(result.complete, false);
  assert.equal(result.termination, "max-solutions");
});
