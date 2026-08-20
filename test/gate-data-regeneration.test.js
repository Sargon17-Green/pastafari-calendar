"use strict";

import assert from "node:assert/strict";
import test from "node:test";

import { GateIndex as ChronicleGateIndex } from "../browser/pastafari-calendar-core-chronicle.js";
import { GateIndex } from "../browser/pastafari-calendar-core.js";
import {
  decodeGateShadowPayload,
  GATE_DATA_DETOUR_INFO,
} from "../browser/gate-data-detour.js";
import {
  GATE_SHADOW_META,
  GATE_SHADOW_PAYLOAD,
} from "../browser/generated/pastafari-gate-shadow.js";
import { FOUNDATION_JDN, ReferenceOracle } from "../verification/reference-oracle/reference.mjs";

function deterministicIndices(count, minimum, maximum, seed = 0x3a5f17) {
  let state = seed >>> 0;
  const span = maximum - minimum + 1;
  const values = [];
  const seen = new Set();
  while (values.length < count) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const value = minimum + (state % span);
    if (!seen.has(value)) {
      seen.add(value);
      values.push(value);
    }
  }
  return values;
}

test("generated gate shadow decodes to the declared 40,001 positive positions", () => {
  const positions = decodeGateShadowPayload();
  assert.equal(GATE_DATA_DETOUR_INFO.canonicalId, GATE_SHADOW_META.canonicalId);
  assert.equal(positions.length, 40_001);
  assert.equal(positions[0], FOUNDATION_JDN);
  assert.equal(positions[1].toString(), GATE_SHADOW_META.firstGateJdn);
  assert.equal(positions.at(-1).toString(), GATE_SHADOW_META.lastGateJdn);
  for (let index = 1; index < positions.length; index += 1) {
    const gap = positions[index] - positions[index - 1];
    assert.ok(gap >= 42n && gap <= 963n, `gate gap ${index} must remain in 42..963`);
  }
});

test("sealed historical positive table is stale but becomes semantically dead through the detour", () => {
  const normative = decodeGateShadowPayload();
  const gateIndex = new ChronicleGateIndex();
  const historical = gateIndex.positive;
  assert.equal(historical.length, 40_001);
  assert.notEqual(historical[1], normative[1], "the sealed pre-Update-3 table must remain independently observable as stale");

  historical[1] = 1234567890123456789n;
  const actual = gateIndex.gate(1);
  assert.equal(actual, normative[1]);
  assert.notStrictEqual(gateIndex.positive, historical, "runtime must detach from the obsolete array before lookup");
  assert.equal(historical[1], 1234567890123456789n, "corrupting the obsolete array must not be silently repaired in-place");
});

test("all 40,001 authoritative positive runtime lookups equal the regenerated shadow", () => {
  const normative = decodeGateShadowPayload();
  const gateIndex = new GateIndex();
  for (let index = 0; index < normative.length; index += 1) {
    assert.equal(gateIndex.gate(index), normative[index], `positive gate ${index}`);
  }
});

test("1,000 deterministic positive lookups exercise non-checkpoint and boundary positions", () => {
  const normative = decodeGateShadowPayload();
  const gateIndex = new GateIndex();
  const indices = new Set([
    0, 1, 2, 3, 1023, 1024, 1025, 2047, 2048, 2049,
    29951, 29952, 29953, 31471, 31472, 31473, 32767, 32768, 32769, 39999, 40000,
    ...deterministicIndices(979, 1, 40000),
  ]);
  assert.equal(indices.size, 1000);
  for (const index of indices) assert.equal(gateIndex.gate(index), normative[index], `sampled positive gate ${index}`);
});

test("direct authoritative and clear-reference negative gaps agree for -1..-2048", { timeout: 120_000 }, () => {
  const oracle = new ReferenceOracle();
  const gateIndex = new GateIndex();
  let position = FOUNDATION_JDN;
  for (let ordinal = 1; ordinal <= 2048; ordinal += 1) {
    const index = -ordinal;
    const referenceGap = oracle.gateGap(index).gap;
    const authoritativeGap = BigInt(GateIndex.backwardGap(ordinal));
    assert.equal(authoritativeGap, referenceGap, `direct negative gap ${index}`);
    position -= referenceGap;
    assert.equal(gateIndex.gate(index), position, `negative gate ${index}`);
  }
});

test("positive/negative proof sample includes ±1..20 plus deterministic non-fixture indices", { timeout: 120_000 }, () => {
  const oracle = new ReferenceOracle();
  const positives = [...Array.from({ length: 20 }, (_, zero) => zero + 1), ...deterministicIndices(20, 21, 40000, 0x17aa39)];
  const negatives = [...Array.from({ length: 20 }, (_, zero) => -(zero + 1)), ...deterministicIndices(20, 21, 2048, 0x91c2e7).map((value) => -value)];
  for (const index of positives) {
    assert.equal(BigInt(GateIndex.forwardGap(index)), oracle.gateGap(index).gap, `direct positive gap ${index}`);
  }
  for (const index of negatives) {
    assert.equal(BigInt(GateIndex.backwardGap(-index)), oracle.gateGap(index).gap, `direct negative gap ${index}`);
  }
});

test("one-byte corruption of the normative encoded payload is detected", () => {
  const bytes = Buffer.from(GATE_SHADOW_PAYLOAD, "base64");
  bytes[Math.floor(bytes.length / 3)] ^= 0x40;
  const corrupted = bytes.toString("base64");
  assert.throws(
    () => decodeGateShadowPayload(corrupted),
    /checksum mismatch|impossible gap|boundary seal mismatch/u,
  );
});
