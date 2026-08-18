"use strict";

import assert from "node:assert/strict";
import test from "node:test";

// This file is intended to live in the repository, where the controller can
// resolve docs/i18n/calendar-identifiers.js and the copied Pages solver.
import {
  ReverseSearchController,
  advancedReverseProblem,
  classifyConstraintResult,
  canonicalPastafariInput,
  sameTargetReverseProblem,
  simpleReverseProblem,
  variableSpec,
} from "../docs/reverse-search-controller.js";

const sample = Object.freeze({
  year: "5000",
  cutletId: "kidney",
  dayInCutlet: "443",
  monthId: "frankincense",
  dayInMonth: "40",
});

test("canonicalPastafariInput maps localized identifiers to internal engine names", () => {
  assert.deepEqual(canonicalPastafariInput(sample), {
    year: "5000",
    cutletName: "כליה",
    dayInCutlet: 443,
    monthName: "לבונה",
    dayInMonth: 40,
  });
});

test("simpleReverseProblem uses the active calculation JDN without inventing a search range", () => {
  const problem = simpleReverseProblem(sample, 2461259n);
  assert.deepEqual(problem.variables, { target: {} });
  assert.equal(problem.constraints.length, 1);
  assert.equal(problem.constraints[0].type, "pastafari");
  assert.equal(problem.constraints[0].target, "target");
  assert.equal(problem.constraints[0].calculationJdn, 2461259n);
});

test("sameTargetReverseProblem keeps c=t on a finite diagonal domain", () => {
  const problem = sameTargetReverseProblem(sample, [2461250n, 2461260n]);
  assert.deepEqual(problem.variables, { target: { range: [2461250n, 2461260n] } });
  assert.equal(problem.constraints[0].calculation, "same-as-target");
});

test("variableSpec accepts exact and bounded JDN domains", () => {
  assert.deepEqual(variableSpec({ jdn: "2461259" }), { jdn: 2461259n });
  assert.deepEqual(variableSpec({ range: [2461250n, 2461300n] }), { range: [2461250n, 2461300n] });
  assert.throws(() => variableSpec({ range: [2n, 1n] }), RangeError);
});

test("advancedReverseProblem preserves the four supported constraint families", () => {
  const problem = advancedReverseProblem({
    variables: {
      A: { range: [1n, 10n] },
      B: { range: [1n, 10n] },
    },
    constraints: [
      { type: "pastafari", target: "A", calculation: "B", date: sample },
      { type: "equal", left: "A", right: "B" },
      { type: "order", left: "A", op: "<=", right: "B" },
      { type: "difference", left: "B", right: "A", min: "0", max: "3" },
    ],
  });
  assert.deepEqual(problem.constraints.map(({ type }) => type), ["pastafari", "equal", "order", "difference"]);
  assert.equal(problem.constraints[3].min, 0n);
  assert.equal(problem.constraints[3].max, 3n);
});

test("controller cancels an older run before starting a newer run", async () => {
  const calls = [];
  const client = {
    async solve(problem, options) {
      calls.push({ problem, signal: options.signal });
      if (calls.length === 1) {
        await new Promise((resolve, reject) => {
          options.signal.addEventListener("abort", () => {
            const error = new Error("aborted");
            error.name = "AbortError";
            reject(error);
          }, { once: true });
        });
      }
      return { solutions: [], complete: true, termination: "complete" };
    },
    dispose() {},
  };
  const controller = new ReverseSearchController({ client });
  const first = controller.solve({ variables: { A: {} }, constraints: [] });
  const second = controller.solve({ variables: { B: {} }, constraints: [] });
  await assert.rejects(first, (error) => error?.name === "AbortError");
  const finished = await second;
  assert.equal(finished.result.complete, true);
  assert.equal(calls[0].signal.aborted, true);
});


test("result classification never confuses an incomplete empty search with no solution", () => {
  assert.deepEqual(classifyConstraintResult({ solutions: [], complete: true, termination: "complete" }), {
    state: "complete-empty",
    complete: true,
    solutionCount: 0,
    termination: "complete",
  });
  assert.deepEqual(classifyConstraintResult({ solutions: [], complete: false, termination: "max-scanned" }), {
    state: "partial-empty",
    complete: false,
    solutionCount: 0,
    termination: "max-scanned",
  });
  assert.deepEqual(classifyConstraintResult({ solutions: [{}], complete: false, termination: "max-solutions" }), {
    state: "partial-solutions",
    complete: false,
    solutionCount: 1,
    termination: "max-solutions",
  });
});
