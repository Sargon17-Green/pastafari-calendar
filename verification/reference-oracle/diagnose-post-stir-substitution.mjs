#!/usr/bin/env node
/**
 * NON-NORMATIVE DIAGNOSTIC.
 *
 * This script is deliberately outside reference.mjs.  It starts from the
 * reference trace immediately after visible drop 46 and asks a narrow
 * behavioral question: if the post-pour stir adds the kept orderNumber where
 * the Scroll says to add the saved raw bowlSum, does that mutated replay match
 * the current authoritative final bowls?
 *
 * A match is evidence about current authoritative behavior.  It is NOT used to
 * calculate any reference answer and it does not modify production code.
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { observeAuthoritative } from "./authoritative-adapter.mjs";
import { bowlPermutation, keep, positiveMod, sauce, serializeBigInts } from "./reference.mjs";

function replayWithOrderNumberSubstitution(startBowls) {
  let bowls = startBowls.map(BigInt);
  const rounds = [];
  for (let round = 1; round <= 12; round += 1) {
    const r = BigInt(round);
    const old = bowls.slice();
    const bowlSum = old.reduce((total, value) => total + value, 0n);
    const orderNumber = keep(bowlSum + 149n * r);
    const permutation = bowlPermutation(positiveMod(orderNumber - 1n, 720n) + 1n);
    const next = new Array(6);
    for (let place = 0; place < 6; place += 1) {
      const bowlIndex = permutation[place] - 1;
      const previousIndex = permutation[(place + 5) % 6] - 1;
      const nextIndex = permutation[(place + 1) % 6] - 1;
      const u = old[bowlIndex]
        + 3n * old[previousIndex]
        + 5n * old[nextIndex]
        // Diagnostic mutation: the normative code uses bowlSum here.
        + orderNumber
        + r
        + BigInt((place + 1) ** 2);
      next[bowlIndex] = keep(u * u + 7n * old[previousIndex] * old[nextIndex]);
    }
    bowls = next;
    rounds.push({ round, bowlSum, orderNumber, bowlsAfter: bowls.slice() });
  }
  return { bowls, rounds };
}

export function diagnose(calculationJdn, targetJdn, randomSeed = 0x00c0ffee) {
  const reference = sauce(calculationJdn, targetJdn, { detail: "sauce" });
  const prePost = reference.drops.at(-1).bowlsAfter;
  const mutated = replayWithOrderNumberSubstitution(prePost);
  const authoritative = observeAuthoritative(calculationJdn, targetJdn, { randomSeed });
  return {
    input: { calculationJdn: BigInt(calculationJdn), targetJdn: BigInt(targetJdn) },
    normativeFinalMatchesAuthoritative: reference.final.bowls.every((v, i) => v === authoritative.sauce.final.bowls[i]),
    orderNumberSubstitutionMatchesAuthoritative: mutated.bowls.every((v, i) => v === authoritative.sauce.final.bowls[i]),
    referenceFinal: reference.final.bowls,
    diagnosticMutatedFinal: mutated.bowls,
    authoritativeFinal: authoritative.sauce.final.bowls,
    referenceRound1: reference.postStirs[0],
    diagnosticRound1: mutated.rounds[0],
  };
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (import.meta.url === invokedPath) {
  const c = BigInt(process.argv[2] ?? "0");
  const t = BigInt(process.argv[3] ?? "0");
  console.log(JSON.stringify(serializeBigInts(diagnose(c, t)), null, 2));
}
