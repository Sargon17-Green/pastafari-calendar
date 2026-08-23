import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { MonthWeavingCounter } from "../../src/public-api.js";
import { enumerateMonthWeavings } from "./month-weaving-reference.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");

function vectors(maxMonths, maxLength, maxTotal) {
  const result = [];
  for (let monthCount = 1; monthCount <= maxMonths; monthCount += 1) {
    const current = [];
    const visit = () => {
      if (current.length === monthCount) {
        if (current.reduce((sum, value) => sum + value, 0) <= maxTotal) result.push([...current]);
        return;
      }
      for (let length = 1; length <= maxLength; length += 1) {
        current.push(length);
        visit();
        current.pop();
      }
    };
    visit();
  }
  return result;
}

function same(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function lexCompare(left, right) {
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

function errorRecord(error) {
  return { name: error?.constructor?.name ?? error?.name ?? "Error", message: String(error?.message ?? error) };
}

const cases = [];
let unrankOperations = 0;
let rankOperations = 0;
let mismatches = 0;

for (const lengths of vectors(4, 5, 12)) {
  const reference = enumerateMonthWeavings(lengths);
  const counter = new MonthWeavingCounter(lengths);
  const row = {
    parameters: { lengths },
    acceptedByValidator: true,
    productionCount: counter.count.toString(),
    referenceCount: String(reference.length),
    firstCountMismatch: null,
    firstUnrankFailure: null,
    firstUnrankMismatch: null,
    firstRankMismatch: null,
    firstDuplicate: null,
    firstOrderMismatch: null,
    classification: "PASS",
  };

  if (counter.count !== BigInt(reference.length)) {
    row.firstCountMismatch = { production: counter.count.toString(), reference: String(reference.length) };
    row.classification = "COUNT_MISMATCH";
    mismatches += 1;
    cases.push(row);
    continue;
  }

  const seen = new Set();
  let previous = null;
  for (let index = 0; index < reference.length; index += 1) {
    try {
      const actual = counter.unrank(BigInt(index));
      unrankOperations += 1;
      if (!same(actual, reference[index])) {
        row.firstUnrankMismatch = { index, expected: reference[index], actual };
        row.classification = "UNRANK_OR_ORDER_MISMATCH";
        mismatches += 1;
        break;
      }
      const key = JSON.stringify(actual);
      if (seen.has(key)) {
        row.firstDuplicate = { index, value: actual };
        row.classification = "DUPLICATE";
        mismatches += 1;
        break;
      }
      seen.add(key);
      if (previous !== null && lexCompare(previous, actual) >= 0) {
        row.firstOrderMismatch = { index: index - 1, nextIndex: index, previous, actual };
        row.classification = "ORDER_MISMATCH";
        mismatches += 1;
        break;
      }
      previous = actual;
    } catch (error) {
      row.firstUnrankFailure = { index, expected: reference[index], error: errorRecord(error) };
      row.classification = "UNRANK_FAILURE";
      mismatches += 1;
      break;
    }
  }

  if (row.classification === "PASS") {
    const rankIndices = new Set([0, Math.max(0, reference.length - 1), Math.floor(reference.length / 2)]);
    if (reference.length > 1) rankIndices.add(1);
    if (reference.length <= 20) {
      for (let index = 0; index < reference.length; index += 1) rankIndices.add(index);
    }
    for (const index of [...rankIndices].sort((a, b) => a - b)) {
      const actualRank = counter.rank(reference[index]);
      rankOperations += 1;
      if (actualRank !== BigInt(index)) {
        row.firstRankMismatch = { index, expected: String(index), actual: actualRank.toString(), weaving: reference[index] };
        row.classification = "RANK_MISMATCH";
        mismatches += 1;
        break;
      }
    }
  }

  cases.push(row);
}

const artifact = {
  schema: "pastafari.update14.month-weaving-domain.after.v1",
  generatedAt: new Date().toISOString(),
  baselineCommit: "c81a11f4b96adfb82743ed76d774308b6221466c",
  packageVersion: "1.3.0",
  reference: {
    kind: "direct multiset permutation enumeration + independent first/last-order filter + position-wise lexicographic sort",
    productionImports: false,
  },
  search: { monthCount: "1..4", monthLength: "1..5", maxTotalLength: 12, cases: cases.length },
  statistics: { cases: cases.length, mismatches, unrankOperations, rankOperations },
  result: mismatches === 0 ? "PASS" : "FAIL",
  cases,
};

const output = path.join(ROOT, "artifacts/month-weaving-domain-after.json");
fs.writeFileSync(output, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(JSON.stringify({ output, ...artifact.statistics, result: artifact.result }, null, 2));
if (mismatches !== 0) process.exitCode = 1;
