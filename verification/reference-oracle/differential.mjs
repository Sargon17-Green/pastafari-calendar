#!/usr/bin/env node
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { observeAuthoritative } from "./authoritative-adapter.mjs";
import {
  FOUNDATION_JDN,
  ReferenceNotImplementedError,
  ReferenceOracle,
  serializeBigInts,
} from "./reference.mjs";
import { compareOrderedStages, firstArrayDifference } from "./compare.mjs";

function parseArgs(argv) {
  const out = { detail: "summary", json: false, convertFinal: false, gateIndex: null, randomSeed: 0x00c0ffee };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) throw new Error(`Missing value after ${arg}`);
      i += 1;
      return argv[i];
    };
    if (arg === "--calculation") out.calculationJdn = BigInt(next());
    else if (arg === "--target") out.targetJdn = BigInt(next());
    else if (arg === "--detail") out.detail = next();
    else if (arg === "--gate-index") out.gateIndex = Number(next());
    else if (arg === "--random-seed") out.randomSeed = Number(next());
    else if (arg === "--json") out.json = true;
    else if (arg === "--convert-final") out.convertFinal = true;
    else if (arg === "--foundation") {
      out.calculationJdn = FOUNDATION_JDN;
      out.targetJdn = FOUNDATION_JDN;
    } else if (arg === "--help" || arg === "-h") out.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (out.help) return out;
  if (out.calculationJdn === undefined || out.targetJdn === undefined) {
    throw new Error("--calculation and --target are required (or use --foundation)");
  }
  if (!["summary", "sauce", "full"].includes(out.detail)) {
    throw new Error("--detail must be summary, sauce, or full");
  }
  if (out.gateIndex !== null && (!Number.isSafeInteger(out.gateIndex) || out.gateIndex === 0)) {
    throw new Error("--gate-index must be a non-zero safe integer");
  }
  if (!Number.isSafeInteger(out.randomSeed) || out.randomSeed < 0 || out.randomSeed > 0xffffffff) {
    throw new Error("--random-seed must be an integer in 0..4294967295");
  }
  return out;
}

export function runDifferential(input) {
  const oracle = new ReferenceOracle();
  const referenceSauce = oracle.sauce(input.calculationJdn, input.targetJdn, { detail: input.detail ?? "summary" });
  const authoritative = observeAuthoritative(input.calculationJdn, input.targetJdn, {
    convertFinal: Boolean(input.convertFinal),
    gateIndex: input.gateIndex ?? null,
    randomSeed: input.randomSeed ?? 0x00c0ffee,
  });

  const stages = [
    {
      stage: "constants",
      field: "foundationJdn",
      authoritative: authoritative.constants.foundationJdn,
      reference: FOUNDATION_JDN,
    },
    {
      stage: "canonical-counters",
      field: "calculationDayNumber",
      authoritative: authoritative.counters.calculationDayNumber,
      reference: referenceSauce.counters.calculation,
    },
    {
      stage: "canonical-counters",
      field: "targetDayNumber",
      authoritative: authoritative.counters.targetDayNumber,
      reference: referenceSauce.counters.target,
    },
    // These reference counters are part of the stable trace schema, but the
    // authoritative engine does not expose them directly; do not pretend that
    // recomputing them in the adapter would prove its internal state.
    { stage: "canonical-counters", field: "distance", authoritative: undefined, reference: referenceSauce.counters.distance },
    { stage: "canonical-counters", field: "sum", authoritative: undefined, reference: referenceSauce.counters.sum },
    { stage: "canonical-counters", field: "direction", authoritative: undefined, reference: referenceSauce.counters.direction },
    {
      stage: "sauce.final",
      field: "lastDropPermutation",
      authoritative: authoritative.sauce.final.lastDropPermutation,
      reference: referenceSauce.final.lastDropPermutation,
    },
  ];

  const bowlDiff = firstArrayDifference(
    "sauce.final",
    "bowls",
    authoritative.sauce.final.bowls,
    referenceSauce.final.bowls,
  );
  if (bowlDiff) stages.push(bowlDiff);
  else stages.push({
    stage: "sauce.final",
    field: "bowls",
    authoritative: authoritative.sauce.final.bowls,
    reference: referenceSauce.final.bowls,
  });

  const referenceResponse = oracle.response(
    referenceSauce,
    { bowl: 1, seal: 1n, chooseCount: 922n },
  );
  stages.push({ stage: "response", field: "first", authoritative: authoritative.response.first, reference: referenceResponse.first });
  stages.push({ stage: "response", field: "step", authoritative: authoritative.response.step, reference: referenceResponse.step });
  // Authoritative chooseIndex is zero-based; the Scroll/reference choice is 1-based.
  stages.push({ stage: "response", field: "choose922", authoritative: authoritative.response.choose922 + 1n, reference: referenceResponse.choice });

  let referenceGate = null;
  if (Number.isSafeInteger(input.gateIndex) && input.gateIndex !== 0) {
    const position = oracle.gatePosition(input.gateIndex);
    const gap = oracle.gateGap(input.gateIndex).gap;
    referenceGate = { index: input.gateIndex, position, gap };
    stages.push({ stage: "gate", field: "gap", authoritative: authoritative.gate?.gap, reference: gap, context: { gateIndex: input.gateIndex } });
    stages.push({ stage: "gate", field: "position", authoritative: authoritative.gate?.position, reference: position, context: { gateIndex: input.gateIndex } });
  }

  let referenceFinal = null;
  if (input.convertFinal) {
    referenceFinal = oracle.finalPastafarianTuple(input.calculationJdn, input.targetJdn);
    const canonicalFinal = (value) => { const v = value?.toJSON?.() ?? value; return { year: String(v.year), cutletName: v.cutletName, dayInCutlet: Number(v.dayInCutlet), monthName: v.monthName, dayInMonth: Number(v.dayInMonth) }; };
    stages.push({ stage: "final-pastafarian-tuple", field: "tuple", authoritative: canonicalFinal(authoritative.final), reference: canonicalFinal(referenceFinal) });
  }

  const comparison = compareOrderedStages(stages);
  const comparable = comparison.fields.filter((row) => row.status === "match" || row.status === "mismatch");
  const finalTupleRow = comparison.fields.find((row) => row.stage === "final-pastafarian-tuple");
  const finalMatch = finalTupleRow?.status === "match" ? true
    : finalTupleRow?.status === "mismatch" ? false
      : null;

  return {
    schemaVersion: 1,
    input: { calculationJdn: BigInt(input.calculationJdn), targetJdn: BigInt(input.targetJdn) },
    authoritative,
    reference: {
      source: referenceSauce ? { title: "לוח סוד הרוטב ושמות הימים", sha256: "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96" } : null,
      counters: referenceSauce.counters,
      sauce: referenceSauce,
      response: referenceResponse,
      gate: referenceGate,
      yearCandidateDiscovery: { status: "implemented-not-observed-by-authoritative-adapter" },
      yearSelection: { status: "implemented-not-observed-by-authoritative-adapter" },
      cutletStructure: { status: "implemented-not-observed-by-authoritative-adapter" },
      monthStructure: { status: "implemented-not-observed-by-authoritative-adapter" },
      final: input.convertFinal ? referenceFinal : { status: "implemented-not-requested" },
    },
    comparison: {
      finalMatch,
      comparableFields: comparable.length,
      mismatchCount: comparable.filter((row) => row.status === "mismatch").length,
      firstMismatch: comparison.firstMismatch,
      fields: comparison.fields,
    },
  };
}

function human(result) {
  const lines = [];
  lines.push(`input c=${result.input.calculationJdn} t=${result.input.targetJdn}`);
  lines.push(`spec sha256=${result.reference.source.sha256}`);
  for (const row of result.comparison.fields) {
    const context = row.context ? ` ${JSON.stringify(serializeBigInts(row.context))}` : "";
    if (row.status === "match") lines.push(`MATCH    ${row.stage}.${row.field}${context}`);
    else if (row.status === "mismatch") lines.push(`MISMATCH ${row.stage}.${row.field}${context}: authoritative=${JSON.stringify(serializeBigInts(row.authoritative))} reference=${JSON.stringify(serializeBigInts(row.reference))}`);
    else lines.push(`${row.status.toUpperCase()} ${row.stage}.${row.field}${context}`);
  }
  if (result.comparison.firstMismatch) {
    const m = serializeBigInts(result.comparison.firstMismatch);
    lines.push(`FIRST MISMATCH: ${m.stage}.${m.field} authoritative=${JSON.stringify(m.authoritative)} reference=${JSON.stringify(m.reference)}`);
  } else {
    lines.push("FIRST MISMATCH: none among comparable fields");
  }
  lines.push(`final tuple match: ${result.comparison.finalMatch === null ? "not requested/comparable in this run" : result.comparison.finalMatch}`);
  return lines.join("\n");
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (import.meta.url === invokedPath) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log("Usage: node verification/reference-oracle/differential.mjs --calculation <JDN> --target <JDN> [--detail summary|sauce|full] [--gate-index N] [--random-seed N] [--convert-final] [--json]");
      process.exit(0);
    }
    const result = runDifferential(args);
    console.log(args.json ? JSON.stringify(serializeBigInts(result), null, 2) : human(result));
    process.exitCode = result.comparison.mismatchCount > 0 ? 2 : 0;
  } catch (error) {
    if (error instanceof ReferenceNotImplementedError) {
      console.error(`${error.code}: ${error.stage}`);
      process.exitCode = 3;
    } else {
      console.error(error?.stack || String(error));
      process.exitCode = 1;
    }
  }
}
