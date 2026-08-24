"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";
import * as authoritative from "../browser/pastafari-calendar-core.js";
import { MonthWeavingCounter } from "../src/public-api.js";

const sauceCorpus = JSON.parse(await readFile(new URL("../verification/update17/generated/normative-sauce-vectors.json", import.meta.url), "utf8"));
const gateCorpus = JSON.parse(await readFile(new URL("../verification/update17/generated/normative-gate-vectors.json", import.meta.url), "utf8"));
const weavingCorpus = JSON.parse(await readFile(new URL("../verification/update17/generated/month-weaving-small-domain.json", import.meta.url), "utf8"));

async function loadInstrumentedFast() {
  const sourcePath = fileURLToPath(new URL("../browser/pastafari-calendar-fast.js", import.meta.url));
  const source = await readFile(sourcePath, "utf8");
  const diagnosticsUrl = new URL("../browser/pastafari-diagnostics.js", import.meta.url).href;
  const relocated = source.replace('from "./pastafari-diagnostics.js";', `from ${JSON.stringify(diagnosticsUrl)};`);
  const temporaryPath = join(tmpdir(), `pastafari-update17-fast-${process.pid}-${randomUUID()}.mjs`);
  await writeFile(temporaryPath, `${relocated}\nexport { sauce as __u17Sauce, chooseUniform as __u17ChooseUniform, gatePosition as __u17GatePosition, gateDistance as __u17GateDistance };\n`, "utf8");
  try {
    return await import(`${pathToFileURL(temporaryPath).href}?v=${randomUUID()}`);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}
const fast = await loadInstrumentedFast();

function bigintArray(values) { return values.map((value) => BigInt(value)); }
function oneBasedPermutation(zeroBased) { return zeroBased.map((value) => value + 1); }

test("Update17 sauce corpus final states and uniform choices match authoritative and fast engines", () => {
  for (const vector of sauceCorpus.vectors) {
    const calculation = BigInt(vector.input.calculationJdn);
    const target = BigInt(vector.input.targetJdn);
    const expected = vector.expected;
    const authSauce = authoritative.makeSauceUncached(calculation, target);
    const fastSauce = fast.__u17Sauce(calculation, target);

    assert.deepEqual(authSauce.bowls, bigintArray(expected.finalBowls), `${vector.id} authoritative final bowls`);
    assert.deepEqual(fastSauce.bowls, bigintArray(expected.finalBowls), `${vector.id} fast final bowls`);
    assert.deepEqual(oneBasedPermutation(authSauce.finalDropOrder), expected.lastDropPermutation, `${vector.id} authoritative final permutation`);
    assert.deepEqual(oneBasedPermutation(fastSauce.lastDropPermutation), expected.lastDropPermutation, `${vector.id} fast final permutation`);

    const shortCount = 922n;
    assert.equal(authSauce.chooseIndex(1, 1n, shortCount) + 1n, BigInt(expected.gateChoice922.choice), `${vector.id} authoritative 1-based short choice`);
    assert.equal(fast.__u17ChooseUniform(fastSauce, 0, 1n, shortCount), BigInt(expected.gateChoice922.choice), `${vector.id} fast short choice`);

    const wideCount = BigInt(expected.wideChoice.count);
    assert.equal(authSauce.chooseIndex(1, 1n, wideCount) + 1n, BigInt(expected.wideChoice.choice), `${vector.id} authoritative 1-based wide choice`);
    assert.equal(fast.__u17ChooseUniform(fastSauce, 0, 1n, wideCount), BigInt(expected.wideChoice.choice), `${vector.id} fast wide choice`);
  }
});

test("Update17 independent MonthWeaving small-domain corpus matches public count/rank/unrank", () => {
  for (const vector of weavingCorpus.vectors) {
    const lengths = vector.input.lengths;
    const counter = new MonthWeavingCounter(lengths);
    assert.equal(counter.count, BigInt(vector.expected.count), `${vector.id} count`);
    assert.deepEqual(counter.unrank(0n), vector.expected.first, `${vector.id} first`);
    assert.deepEqual(counter.unrank(counter.count - 1n), vector.expected.last, `${vector.id} last`);
    for (const roundTrip of vector.expected.roundTrips) {
      const rank = BigInt(roundTrip.rank);
      assert.deepEqual(counter.unrank(rank), roundTrip.weaving, `${vector.id} unrank ${rank}`);
      assert.equal(counter.rank(roundTrip.weaving), rank, `${vector.id} rank ${rank}`);
    }
  }
});
