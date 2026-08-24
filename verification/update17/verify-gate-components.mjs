"use strict";

import assert from "node:assert/strict";
import { readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";
import * as authoritative from "../../browser/pastafari-calendar-core.js";

const corpus = JSON.parse(await readFile(new URL("./generated/normative-gate-vectors.json", import.meta.url), "utf8"));

async function loadInstrumentedFast() {
  const sourcePath = fileURLToPath(new URL("../../browser/pastafari-calendar-fast.js", import.meta.url));
  const source = await readFile(sourcePath, "utf8");
  const diagnosticsUrl = new URL("../../browser/pastafari-diagnostics.js", import.meta.url).href;
  const relocated = source.replace('from "./pastafari-diagnostics.js";', `from ${JSON.stringify(diagnosticsUrl)};`);
  const temporaryPath = join(tmpdir(), `pastafari-update17-gate-fast-${process.pid}-${randomUUID()}.mjs`);
  await writeFile(temporaryPath, `${relocated}\nexport { gatePosition as __u17GatePosition, gateDistance as __u17GateDistance };\n`, "utf8");
  try {
    return await import(`${pathToFileURL(temporaryPath).href}?v=${randomUUID()}`);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

const fast = await loadInstrumentedFast();
const gateIndex = new authoritative.GateIndex();
let authoritativeDirect = 0;
let fastChecked = 0;

for (const vector of corpus.vectors) {
  const index = Number(vector.input.gateIndex);
  const expectedPosition = BigInt(vector.expected.positionJdn);
  const tractableAuthoritative = index >= -2048;

  if (tractableAuthoritative) {
    assert.equal(gateIndex.gate(index), expectedPosition, `${vector.id} authoritative position`);
    authoritativeDirect += 1;
  }
  assert.equal(fast.__u17GatePosition(BigInt(index)), expectedPosition, `${vector.id} fast position`);
  fastChecked += 1;

  if (vector.expected.gap !== null) {
    const expectedGap = BigInt(vector.expected.gap);
    if (tractableAuthoritative) {
      const authoritativeGap = index < 0
        ? gateIndex.gate(index + 1) - gateIndex.gate(index)
        : gateIndex.gate(index) - gateIndex.gate(index - 1);
      assert.equal(authoritativeGap, expectedGap, `${vector.id} authoritative gap`);
    }
    assert.equal(BigInt(fast.__u17GateDistance(BigInt(index))), expectedGap, `${vector.id} fast gap`);
  }
}

console.log(JSON.stringify({
  status: "UPDATE17_GATE_COMPONENT_PASS",
  corpusCases: corpus.vectors.length,
  fastChecked,
  authoritativeDirect,
  authoritativeDeepNegativeCoverage: "covered by final-tuple matrix + holdout",
}));
