"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";

import * as authoritative from "../browser/pastafari-calendar-core.js";
import * as fast from "../browser/pastafari-calendar-fast.js";

const FOUNDATION_JDN = -13_334_246n;
const REFERENCE_JDN_2000_01_01 = 2_451_545n;
const REFERENCE_JDN_2026_08_06 = 2_461_259n;
const FIRST_CHECKPOINT_JDN = -29_780_582n;
const LAST_CHECKPOINT_JDN = 3_111_357n;
const FAST_COMPATIBILITY_TIMEOUT_MS = process.platform === "win32" ? 1_200_000 : 360_000;

const EXPECTED_GATE_CHECKPOINTS = Object.freeze([
  [-32768, -29780582n], [-31744, -29275011n], [-30720, -28759536n],
  [-29696, -28231334n], [-28672, -27724269n], [-27648, -27204151n],
  [-26624, -26696050n], [-25600, -26184520n], [-24576, -25649224n],
  [-23552, -25126420n], [-22528, -24592746n], [-21504, -24077763n],
  [-20480, -23568941n], [-19456, -23056607n], [-18432, -22547059n],
  [-17408, -22028964n], [-16384, -21524216n], [-15360, -21021341n],
  [-14336, -20503094n], [-13312, -19986054n], [-12288, -19477387n],
  [-11264, -18959976n], [-10240, -18453214n], [-9216, -17930941n],
  [-8192, -17421559n], [-7168, -16901500n], [-6144, -16391773n],
  [-5120, -15892677n], [-4096, -15374389n], [-3072, -14869256n],
  [-2048, -14360710n], [-1024, -13845543n], [0, FOUNDATION_JDN],
  [1024, -12809003n], [2048, -12289556n], [3072, -11790578n],
  [4096, -11286642n], [5120, -10764244n], [6144, -10233818n],
  [7168, -9727528n], [8192, -9214186n], [9216, -8692730n],
  [10240, -8173976n], [11264, -7657486n], [12288, -7145425n],
  [13312, -6630698n], [14336, -6127086n], [15360, -5610968n],
  [16384, -5103400n], [17408, -4587432n], [18432, -4069417n],
  [19456, -3557452n], [20480, -3038147n], [21504, -2527530n],
  [22528, -2008636n], [23552, -1489691n], [24576, -975725n],
  [25600, -476208n], [26624, 32147n], [27648, 532296n],
  [28672, 1047264n], [29696, 1552344n], [30720, 2076748n],
  [31744, 2600784n], [32768, LAST_CHECKPOINT_JDN],
]);

const authoritativeCalendar = new authoritative.PastafariCalendar({
  todayProvider: () => new authoritative.GregorianDate(2000n, 1, 1),
});

const fastCalendar = new fast.PastafariCalendar({
  todayProvider: () => new fast.GregorianDate(2000n, 1, 1),
});

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}

function convertAuthoritative(targetJdn, calculationJdn) {
  return canonical(authoritativeCalendar.convertJdn(targetJdn, { calculationJdn }));
}

function convertFast(targetJdn, calculationJdn) {
  return canonical(fastCalendar.convertJdn(targetJdn, { calculationJdn }));
}

function assertCompatible(targetJdn, calculationJdn, message = "") {
  assert.deepStrictEqual(
    convertFast(targetJdn, calculationJdn),
    convertAuthoritative(targetJdn, calculationJdn),
    message || `Mismatch at target JDN ${targetJdn}, calculation JDN ${calculationJdn}`,
  );
}

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
  const instrumented = `${relocatedSource}\n\nexport {\n  GATE_CHECKPOINTS as __testGateCheckpoints,\n  gateDistance as __testGateDistance,\n  gatePosition as __testGatePosition,\n  sauce as __testSauce,\n  chooseUniform as __testChooseUniform,\n};\n`;
  const temporaryPath = join(
    tmpdir(),
    `pastafari-calendar-fast-instrumented-${process.pid}-${randomUUID()}.mjs`,
  );
  await writeFile(temporaryPath, instrumented, "utf8");

  try {
    return await import(`${pathToFileURL(temporaryPath).href}?v=${randomUUID()}`);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

async function compareWholeCutlet(targetJdn, calculationJdn) {
  const view = fast.getCutletView(targetJdn, { calculationJdn });
  assert.equal(view.days.length, Number(view.endJdn - view.startJdn + 1n));

  for (const day of view.days) {
    assert.deepStrictEqual(
      canonical(day),
      convertAuthoritative(day.jdn, calculationJdn),
      `Cutlet mismatch at JDN ${day.jdn}, calculation JDN ${calculationJdn}`,
    );
  }

  return view;
}

test(
  "the fast implementation matches the authoritative implementation",
  { timeout: FAST_COMPATIBILITY_TIMEOUT_MS },
  async (suite) => {
    const fixedOffsets = [-1000n, -366n, -42n, -1n, 0n, 1n, 42n, 366n, 1000n];
    for (const [label, calculationJdn] of [
      ["2026-08-06", REFERENCE_JDN_2026_08_06],
      ["2000-01-01", REFERENCE_JDN_2000_01_01],
      ["foundation", FOUNDATION_JDN],
    ]) {
      await suite.test(`fixed vectors with calculation day ${label}`, () => {
        for (const offset of fixedOffsets) {
          assertCompatible(
            calculationJdn + offset,
            calculationJdn,
            `Fixed-vector mismatch at offset ${offset} from calculation JDN ${calculationJdn}`,
          );
        }
      });
    }

    await suite.test("the foundation day and its immediate surroundings match", () => {
      for (let offset = -7n; offset <= 7n; offset += 1n) {
        assertCompatible(
          FOUNDATION_JDN + offset,
          FOUNDATION_JDN,
          `Foundation-neighbour mismatch at offset ${offset}`,
        );
      }
    });

    await suite.test("deterministic pseudo-random target days match", () => {
      let state = 0x7a5f_193d;
      for (let index = 0; index < 16; index += 1) {
        state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
        const offset = BigInt((state % 20_001) - 10_000);
        assertCompatible(
          REFERENCE_JDN_2026_08_06 + offset,
          REFERENCE_JDN_2026_08_06,
          `Pseudo-random mismatch at offset ${offset}`,
        );
      }
    });

    await suite.test("short and wide uniform choices match", async () => {
      const instrumented = await loadInstrumentedFastModule();
      const fastSauce = instrumented.__testSauce(
        REFERENCE_JDN_2026_08_06,
        REFERENCE_JDN_2026_08_06 + 137n,
      );
      const authoritativeSauce = authoritative.makeSauce(
        REFERENCE_JDN_2026_08_06,
        REFERENCE_JDN_2026_08_06 + 137n,
      );
      const counts = [
        1n,
        2n,
        authoritative.M - 1n,
        authoritative.M,
        authoritative.M + 1n,
        authoritative.M * 3n + 17n,
      ];

      for (let bowl = 0; bowl < 6; bowl += 1) {
        for (const seal of [1n, 21n, 31n, 97n]) {
          for (const count of counts) {
            const fastChoice = instrumented.__testChooseUniform(fastSauce, bowl, seal, count);
            const authoritativeChoice = authoritativeSauce.chooseIndex(bowl + 1, seal, count) + 1n;
            assert.equal(
              fastChoice,
              authoritativeChoice,
              `Choice mismatch for bowl ${bowl + 1}, seal ${seal}, count ${count}`,
            );
          }
        }
      }
    });

    await suite.test("complete previous, current and next cutlets match", async () => {
      const calculationJdn = REFERENCE_JDN_2026_08_06;
      const current = await compareWholeCutlet(calculationJdn, calculationJdn);
      const previous = await compareWholeCutlet(current.previousCutletJdn, calculationJdn);
      const next = await compareWholeCutlet(current.nextCutletJdn, calculationJdn);

      assert.equal(previous.endJdn + 1n, current.startJdn);
      assert.equal(current.endJdn + 1n, next.startJdn);
      assert.equal(previous.days.at(-1).dayInCutlet, previous.days.length);
      assert.equal(current.days.at(-1).dayInCutlet, current.days.length);
      assert.equal(next.days.at(-1).dayInCutlet, next.days.length);
      assert.equal(current.days[0].dayInCutlet, 1);
      assert.equal(next.days[0].dayInCutlet, 1);
    });

    await suite.test("the generated checkpoint table is exactly the corrected table", async () => {
      const instrumented = await loadInstrumentedFastModule();
      assert.deepStrictEqual(
        instrumented.__testGateCheckpoints.map(([index, position]) => [index, position]),
        EXPECTED_GATE_CHECKPOINTS,
      );

      for (let index = 1; index < EXPECTED_GATE_CHECKPOINTS.length; index += 1) {
        assert.ok(EXPECTED_GATE_CHECKPOINTS[index - 1][0] < EXPECTED_GATE_CHECKPOINTS[index][0]);
        assert.ok(EXPECTED_GATE_CHECKPOINTS[index - 1][1] < EXPECTED_GATE_CHECKPOINTS[index][1]);
      }
    });

    await suite.test("all 65 checkpoints match the authoritative gate index", () => {
      const gateIndex = new authoritative.GateIndex();
      for (const [index, expectedPosition] of EXPECTED_GATE_CHECKPOINTS) {
        assert.equal(
          gateIndex.gate(index),
          expectedPosition,
          `Authoritative checkpoint mismatch at gate ${index}`,
        );
      }
    });

    for (const [label, calculationJdn] of [
      ["before the first checkpoint", FIRST_CHECKPOINT_JDN - 5_000n],
      ["after the last checkpoint", LAST_CHECKPOINT_JDN + 5_000n],
    ]) {
      await suite.test(`dates ${label} match`, () => {
        for (let offset = -2n; offset <= 2n; offset += 1n) {
          assertCompatible(
            calculationJdn + offset,
            calculationJdn,
            `Out-of-checkpoint-range mismatch at ${calculationJdn + offset}`,
          );
        }
      });
    }

  },
);
