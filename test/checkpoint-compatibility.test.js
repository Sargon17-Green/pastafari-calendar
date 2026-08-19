"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";

const CHECKPOINT_TIMEOUT_MS = 1_200_000;

async function loadInstrumentedFastModule() {
  const sourcePath = fileURLToPath(
    new URL("../browser/pastafari-calendar-fast.js", import.meta.url),
  );
  const source = await readFile(sourcePath, "utf8");
  const diagnosticsUrl = new URL("../browser/pastafari-diagnostics.js", import.meta.url).href;
  const relocatedSource = source.replace(
    'from "./pastafari-diagnostics.js";',
    `from ${JSON.stringify(diagnosticsUrl)};`,
  );
  const instrumented = `${relocatedSource}\n\nexport {\n  GATE_CHECKPOINTS as __testGateCheckpoints,\n  gateDistance as __testGateDistance,\n  gatePosition as __testGatePosition,\n};\n`;
  const temporaryPath = join(
    tmpdir(),
    `pastafari-calendar-fast-checkpoint-${process.pid}-${randomUUID()}.mjs`,
  );
  await writeFile(temporaryPath, instrumented, "utf8");

  try {
    return await import(`${pathToFileURL(temporaryPath).href}?v=${randomUUID()}`);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

function assertCheckpointSides(instrumented, checkpointIndex) {
  const checkpoints = instrumented.__testGateCheckpoints;
  const gateDistance = instrumented.__testGateDistance;
  const gatePosition = instrumented.__testGatePosition;
  const [gateIndex, expectedPosition] = checkpoints[checkpointIndex];
  const gateIndexBigInt = BigInt(gateIndex);

  const leftPosition = gatePosition(gateIndexBigInt - 1n);
  const rightPosition = gatePosition(gateIndexBigInt + 1n);
  const expectedLeftDistance = gateIndex > 0
    ? gateDistance(gateIndexBigInt)
    : gateDistance(gateIndexBigInt - 1n);
  const expectedRightDistance = gateIndex < 0
    ? gateDistance(gateIndexBigInt)
    : gateDistance(gateIndexBigInt + 1n);

  assert.equal(gatePosition(gateIndexBigInt), expectedPosition);
  assert.equal(
    expectedPosition - leftPosition,
    BigInt(expectedLeftDistance),
    `Invalid distance immediately before checkpoint ${gateIndex}`,
  );
  assert.equal(
    rightPosition - expectedPosition,
    BigInt(expectedRightDistance),
    `Invalid distance immediately after checkpoint ${gateIndex}`,
  );
}

test(
  "optionally check representative checkpoints on both sides",
  {
    skip: process.env.PASTAFARI_CHECKPOINT_SIDES !== "1",
    timeout: CHECKPOINT_TIMEOUT_MS,
  },
  async () => {
    const instrumented = await loadInstrumentedFastModule();
    const last = instrumented.__testGateCheckpoints.length - 1;
    const sampleIndexes = [0, 8, 16, 24, 32, 40, 48, 56, last];

    for (const checkpointIndex of sampleIndexes) {
      assertCheckpointSides(instrumented, checkpointIndex);
    }
  },
);

test(
  "optionally check both sides of every checkpoint",
  {
    skip: process.env.PASTAFARI_EXHAUSTIVE_CHECKPOINTS !== "1",
    timeout: CHECKPOINT_TIMEOUT_MS,
  },
  async () => {
    const instrumented = await loadInstrumentedFastModule();
    for (
      let checkpointIndex = 0;
      checkpointIndex < instrumented.__testGateCheckpoints.length;
      checkpointIndex += 1
    ) {
      assertCheckpointSides(instrumented, checkpointIndex);
    }
  },
);

test(
  "optionally reconstruct every checkpoint interval from gate distances",
  {
    skip: process.env.PASTAFARI_REBUILD_CHECKPOINTS !== "1",
    timeout: CHECKPOINT_TIMEOUT_MS,
  },
  async () => {
    const instrumented = await loadInstrumentedFastModule();
    const checkpoints = instrumented.__testGateCheckpoints;
    const gateDistance = instrumented.__testGateDistance;

    for (let checkpoint = 1; checkpoint < checkpoints.length; checkpoint += 1) {
      const [leftIndex, leftPosition] = checkpoints[checkpoint - 1];
      const [rightIndex, rightPosition] = checkpoints[checkpoint];
      let reconstructed = leftPosition;

      for (let gateIndex = leftIndex; gateIndex < rightIndex; gateIndex += 1) {
        const distanceIndex = gateIndex < 0 ? gateIndex : gateIndex + 1;
        reconstructed += BigInt(gateDistance(BigInt(distanceIndex)));
      }

      assert.equal(
        reconstructed,
        rightPosition,
        `Checkpoint interval ${leftIndex}..${rightIndex} was not reconstructed exactly`,
      );
    }
  },
);
