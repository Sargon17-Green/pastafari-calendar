"use strict";

import { CUTLETS, MONTHS } from "./i18n/calendar-identifiers.js?v=8-year-structure";
import { PastafariConstraintClient, SAME_AS_TARGET } from "./engine/pastafari-constraints-client.js";

const cutletById = new Map(CUTLETS.map((entry) => [entry.id, entry]));
const monthById = new Map(MONTHS.map((entry) => [entry.id, entry]));

function integerText(value, fieldName, { positive = false } = {}) {
  const text = String(value ?? "").trim();
  if (!/^[+-]?\d+$/.test(text)) throw new TypeError(`${fieldName} must be an integer.`);
  const parsed = BigInt(text);
  if (positive && parsed < 1n) throw new RangeError(`${fieldName} must be positive.`);
  return parsed;
}

function positiveSafeInteger(value, fieldName) {
  const parsed = integerText(value, fieldName, { positive: true });
  if (parsed > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError(`${fieldName} is outside the safe integer range.`);
  }
  return Number(parsed);
}

function requireJdn(value, fieldName) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isSafeInteger(value)) return BigInt(value);
  if (typeof value === "string" && /^[+-]?\d+$/.test(value.trim())) return BigInt(value.trim());
  throw new TypeError(`${fieldName} must be an integer JDN.`);
}

export function canonicalPastafariInput(input) {
  if (!input || typeof input !== "object") throw new TypeError("Pastafari input must be an object.");
  const cutlet = cutletById.get(String(input.cutletId ?? ""));
  const month = monthById.get(String(input.monthId ?? ""));
  if (!cutlet) throw new RangeError("Unknown cutlet identifier.");
  if (!month) throw new RangeError("Unknown month identifier.");
  return Object.freeze({
    year: integerText(input.year, "year").toString(),
    cutletName: cutlet.internalName,
    dayInCutlet: positiveSafeInteger(input.dayInCutlet, "dayInCutlet"),
    monthName: month.internalName,
    dayInMonth: positiveSafeInteger(input.dayInMonth, "dayInMonth"),
  });
}

export function simpleReverseProblem(input, calculationJdn) {
  const date = canonicalPastafariInput(input);
  return Object.freeze({
    variables: Object.freeze({ target: Object.freeze({}) }),
    constraints: Object.freeze([
      Object.freeze({
        type: "pastafari",
        target: "target",
        calculationJdn: requireJdn(calculationJdn, "calculationJdn"),
        date,
      }),
    ]),
  });
}

export function sameTargetReverseProblem(input, range) {
  const date = canonicalPastafariInput(input);
  const domain = variableSpec({ range });
  return Object.freeze({
    variables: Object.freeze({ target: domain }),
    constraints: Object.freeze([
      Object.freeze({
        type: "pastafari",
        target: "target",
        calculation: SAME_AS_TARGET,
        date,
      }),
    ]),
  });
}

export function variableSpec({ jdn = null, range = null } = {}) {
  if (jdn !== null && range !== null) throw new TypeError("A variable may define jdn or range, not both.");
  if (jdn !== null) return Object.freeze({ jdn: requireJdn(jdn, "variable.jdn") });
  if (range !== null) {
    if (!Array.isArray(range) || range.length !== 2) throw new TypeError("Variable range must be [start,end].");
    const start = requireJdn(range[0], "variable.range.start");
    const end = requireJdn(range[1], "variable.range.end");
    if (end < start) throw new RangeError("Variable range end precedes start.");
    return Object.freeze({ range: Object.freeze([start, end]) });
  }
  return Object.freeze({});
}

function canonicalConstraint(source) {
  if (!source || typeof source !== "object") throw new TypeError("Constraint must be an object.");
  switch (source.type) {
    case "pastafari": {
      const result = {
        type: "pastafari",
        target: String(source.target),
        date: canonicalPastafariInput(source.date),
      };
      if (source.calculationJdn !== undefined) result.calculationJdn = requireJdn(source.calculationJdn, "constraint.calculationJdn");
      else result.calculation = source.calculation;
      return Object.freeze(result);
    }
    case "equal":
      return Object.freeze({ type: "equal", left: String(source.left), right: String(source.right) });
    case "order": {
      const op = String(source.op);
      if (!["<", "<=", ">", ">="].includes(op)) throw new RangeError("Unsupported order operator.");
      return Object.freeze({ type: "order", left: String(source.left), op, right: String(source.right) });
    }
    case "difference": {
      const result = { type: "difference", left: String(source.left), right: String(source.right) };
      if (source.equals !== undefined && source.equals !== null && source.equals !== "") {
        result.equals = integerText(source.equals, "difference.equals");
      } else {
        if (source.min !== undefined && source.min !== null && source.min !== "") result.min = integerText(source.min, "difference.min");
        if (source.max !== undefined && source.max !== null && source.max !== "") result.max = integerText(source.max, "difference.max");
        if (result.min === undefined && result.max === undefined) throw new TypeError("Difference requires equals, min or max.");
        if (result.min !== undefined && result.max !== undefined && result.max < result.min) {
          throw new RangeError("Difference max is smaller than min.");
        }
      }
      return Object.freeze(result);
    }
    default:
      throw new RangeError("Unsupported constraint type.");
  }
}

export function advancedReverseProblem({ variables, constraints }) {
  if (!variables || typeof variables !== "object" || Array.isArray(variables)) {
    throw new TypeError("variables must be an object.");
  }
  if (!Array.isArray(constraints)) throw new TypeError("constraints must be an array.");
  const normalizedVariables = {};
  for (const [name, spec] of Object.entries(variables)) {
    if (!name) throw new RangeError("Variable name must not be empty.");
    normalizedVariables[name] = variableSpec(spec);
  }
  if (Object.keys(normalizedVariables).length === 0) throw new RangeError("At least one variable is required.");
  return Object.freeze({
    variables: Object.freeze(normalizedVariables),
    constraints: Object.freeze(constraints.map(canonicalConstraint)),
  });
}

export function classifyConstraintResult(result) {
  if (!result || typeof result !== "object" || !Array.isArray(result.solutions)) {
    throw new TypeError("Constraint result is invalid.");
  }
  const solutionCount = result.solutions.length;
  if (result.complete === true) {
    return Object.freeze({
      state: solutionCount === 0 ? "complete-empty" : "complete-solutions",
      complete: true,
      solutionCount,
      termination: "complete",
    });
  }
  const termination = String(result.termination ?? "");
  if (!["max-solutions", "max-scanned"].includes(termination)) {
    throw new RangeError("Incomplete constraint result has an unknown termination reason.");
  }
  return Object.freeze({
    state: solutionCount === 0 ? "partial-empty" : "partial-solutions",
    complete: false,
    solutionCount,
    termination,
  });
}

export class ReverseSearchController {
  constructor({ client = new PastafariConstraintClient() } = {}) {
    this.client = client;
    this.sequence = 0;
    this.active = null;
  }

  get running() {
    return this.active !== null;
  }

  cancel() {
    if (!this.active) return false;
    this.active.controller.abort();
    this.active = null;
    return true;
  }

  async solve(problem, options = {}) {
    this.cancel();
    const sequence = ++this.sequence;
    const controller = new AbortController();
    const externalSignal = options.signal ?? null;
    const onExternalAbort = () => controller.abort();
    externalSignal?.addEventListener("abort", onExternalAbort, { once: true });
    this.active = { sequence, controller };

    const onProgress = typeof options.onProgress === "function"
      ? (progress) => {
          if (this.active?.sequence !== sequence) return;
          options.onProgress(progress);
        }
      : undefined;

    try {
      const result = await this.client.solve(problem, {
        ...options,
        signal: controller.signal,
        onProgress,
      });
      if (this.active?.sequence !== sequence) {
        const error = new Error("A newer reverse search superseded this result.");
        error.name = "AbortError";
        error.code = "ERR_REVERSE_SUPERSEDED";
        throw error;
      }
      return Object.freeze({ sequence, result });
    } finally {
      externalSignal?.removeEventListener("abort", onExternalAbort);
      if (this.active?.sequence === sequence) this.active = null;
    }
  }

  dispose() {
    this.cancel();
    this.client.dispose();
  }
}
