#!/usr/bin/env node
/**
 * NON-NORMATIVE RAW-SUM MUTANT DIAGNOSTIC.
 *
 * This script is deliberately outside reference.mjs. It starts from the
 * canonical reference trace immediately after visible drop 46 and replays the
 * twelve final stirs with one intentional fault: raw S=sum(old bowls) is added
 * to u instead of the preserved R=SAVE(S+149*r).
 *
 * The canonical reference and production engine must agree, while this
 * rawSumMutant must diverge on a discriminator where S !== R.
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { observeAuthoritative } from "./authoritative-adapter.mjs";
import { bowlPermutation, keep, positiveMod, sauce, serializeBigInts } from "./reference.mjs";

function replayWithRawSumMutation(startBowls) {
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
        // Intentional mutant: canonical code uses orderNumber (the preserved sum).
        + bowlSum
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
  const rawSumMutant = replayWithRawSumMutation(prePost);
  const authoritative = observeAuthoritative(calculationJdn, targetJdn, { randomSeed });
  return {
    input: { calculationJdn: BigInt(calculationJdn), targetJdn: BigInt(targetJdn) },
    canonicalFinalMatchesAuthoritative: reference.final.bowls.every((v, i) => v === authoritative.sauce.final.bowls[i]),
    rawSumMutantMatchesAuthoritative: rawSumMutant.bowls.every((v, i) => v === authoritative.sauce.final.bowls[i]),
    discriminator: {
      rawS: reference.postStirs[0].bowlSum,
      preservedR: reference.postStirs[0].orderNumber,
      discriminates: reference.postStirs[0].bowlSum !== reference.postStirs[0].orderNumber,
    },
    referenceFinal: reference.final.bowls,
    rawSumMutantFinal: rawSumMutant.bowls,
    authoritativeFinal: authoritative.sauce.final.bowls,
    referenceRound1: reference.postStirs[0],
    rawSumMutantRound1: rawSumMutant.rounds[0],
  };
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (import.meta.url === invokedPath) {
  const c = BigInt(process.argv[2] ?? "0");
  const t = BigInt(process.argv[3] ?? "0");
  console.log(JSON.stringify(serializeBigInts(diagnose(c, t)), null, 2));
}
