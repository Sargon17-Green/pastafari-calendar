import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const RAW_CORE = path.join(ROOT, 'src', '5efdcc3e6fb071cbaffdcb117507a169dd76.js');
const OUT = path.join(ROOT, 'artifacts', 'update-08-stage-05-matched-prefix.json');
const REPETITIONS = 20;

function countHoles(array) {
  let holes = 0;
  for (let i = 0; i < array.length; i += 1) if (!(i in array)) holes += 1;
  return holes;
}

function changedPrefix(before, after) {
  const changes = [];
  const n = Math.min(before.length, after.length);
  for (let i = 0; i < n; i += 1) {
    const beforeHas = i in before;
    const afterHas = i in after;
    if (beforeHas !== afterHas || (beforeHas && before[i] !== after[i])) {
      changes.push({ index: i, before: before[i], after: after[i] });
    }
  }
  return changes;
}

async function bootstrapInstrumented() {
  const OriginalFunction = globalThis.Function;
  const originalCtor = OriginalFunction.prototype.constructor;
  const FunctionProxy = new Proxy(OriginalFunction, {
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    },
    construct(target, args, newTarget) {
      const patched = [...args];
      const bodyIndex = patched.length - 1;
      // Never consume the single-use top-level generated source carrier.
      // Only instrument the already-materialized generated main body.
      if (
        bodyIndex >= 1 &&
        typeof patched[bodyIndex] === 'string' &&
        patched[bodyIndex].length > 7_000_000 &&
        patched[bodyIndex].includes('mechanizm_51d0f2012a2c_mr')
      ) {
        const firstParam = String(patched[0]);
        patched[bodyIndex] = patched[bodyIndex].replace(
          '"use strict";',
          `"use strict";globalThis.__PASTAFARI_STAGE5_MATCHED_PREFIX_ARENA=${firstParam};`,
        );
      }
      return Reflect.construct(target, patched, newTarget === FunctionProxy ? target : newTarget);
    },
  });

  try {
    globalThis.__PASTAFARI_STAGE5_MATCHED_PREFIX_ARENA = null;
    globalThis.Function = FunctionProxy;
    OriginalFunction.prototype.constructor = FunctionProxy;
    const raw = await import(`${pathToFileURL(RAW_CORE).href}?stage5-matched-prefix=${process.pid}-${Date.now()}`);
    const arena = globalThis.__PASTAFARI_STAGE5_MATCHED_PREFIX_ARENA;
    assert.ok(Array.isArray(arena), 'failed to capture authoritative shared arena');
    return { raw, arena };
  } finally {
    globalThis.Function = OriginalFunction;
    OriginalFunction.prototype.constructor = originalCtor;
  }
}

function makeCases(raw) {
  return [
    {
      id: 'BahaiDate',
      success: () => new raw.BahaiDate(183n, 1, 1, { variant: 'western-arithmetic' }),
      failure: () => new raw.BahaiDate(183n, 1, 1, { variant: 'invalid-stage5' }),
    },
    {
      id: 'GregorianDate',
      success: () => new raw.GregorianDate(2026n, 8, 22),
      failure: () => new raw.GregorianDate(2026n, 1.25, 22),
    },
    {
      id: 'HinduDate',
      success: () => new raw.HinduDate(2083n, 1, 1, { scheme: 'old-solar' }),
      failure: () => new raw.HinduDate(1948n, 1, 1, { scheme: 'invalid-stage5' }),
    },
    {
      id: 'IslamicDate',
      success: () => new raw.IslamicDate(1448n, 1, 1, { variant: 'civil' }),
      failure: () => new raw.IslamicDate(1448n, 1, 1, { variant: 'invalid-stage5' }),
    },
    {
      id: 'JapaneseImperialDate',
      success: () => new raw.JapaneseImperialDate('Reiwa', 8n, 1, 1),
      failure: () => new raw.JapaneseImperialDate(123, 8n, 1, 1),
    },
    {
      id: 'MonthWeavingCounter',
      success: () => new raw.MonthWeavingCounter([4, 5, 6]),
      failure: () => new raw.MonthWeavingCounter([1, 0, 2]),
    },
    {
      id: 'PastafariCalendar',
      success: () => new raw.PastafariCalendar({ todayProvider: () => null }),
      failure: () => new raw.PastafariCalendar({ todayProvider: 123 }),
    },
    {
      id: 'SolarHijriDate',
      success: () => new raw.SolarHijriDate(1405n, 1, 1, { variant: 'arithmetic-2820' }),
      failure: () => new raw.SolarHijriDate(1405n, 1, 1, { variant: 'invalid-stage5' }),
    },
    {
      id: 'PastafariCalendarDefault',
      success: () => new raw.PastafariCalendar({ todayProvider: () => null }),
      failure: () => new raw.PastafariCalendar(),
    },
  ];
}

const env = await bootstrapInstrumented();
const initialLength = env.arena.length;
const initialHoles = countHoles(env.arena);
const cases = [];

for (const definition of makeCases(env.raw)) {
  const successCounts = [];
  const failureCounts = [];
  const successIndices = new Set();
  const failureIndices = new Set();
  const nonNumericChurn = [];
  const failureExceptions = new Set();

  for (let repetition = 1; repetition <= REPETITIONS; repetition += 1) {
    const beforeSuccess = env.arena.slice();
    const successLength = env.arena.length;
    const successHoles = countHoles(env.arena);
    definition.success();
    const successChanges = changedPrefix(beforeSuccess, env.arena);
    assert.equal(env.arena.length, successLength, `${definition.id}: success length drift`);
    assert.equal(countHoles(env.arena), successHoles, `${definition.id}: success holes drift`);
    successCounts.push(successChanges.length);
    for (const change of successChanges) {
      successIndices.add(change.index);
      if (typeof change.before !== 'number' || typeof change.after !== 'number') {
        nonNumericChurn.push({ phase: 'success', repetition, index: change.index, beforeType: typeof change.before, afterType: typeof change.after });
      }
    }

    const beforeFailure = env.arena.slice();
    const failureLength = env.arena.length;
    const failureHoles = countHoles(env.arena);
    let observed = null;
    try {
      definition.failure();
    } catch (error) {
      observed = error;
    }
    assert.ok(observed, `${definition.id}: expected failure`);
    failureExceptions.add(`${observed.name}\0${observed.message}`);
    const failureChanges = changedPrefix(beforeFailure, env.arena);
    assert.equal(env.arena.length, failureLength, `${definition.id}: failure length drift`);
    assert.equal(countHoles(env.arena), failureHoles, `${definition.id}: failure holes drift`);
    failureCounts.push(failureChanges.length);
    for (const change of failureChanges) {
      failureIndices.add(change.index);
      if (typeof change.before !== 'number' || typeof change.after !== 'number') {
        nonNumericChurn.push({ phase: 'failure', repetition, index: change.index, beforeType: typeof change.before, afterType: typeof change.after });
      }
    }
  }

  const successMin = Math.min(...successCounts);
  const successMax = Math.max(...successCounts);
  const failureMin = Math.min(...failureCounts);
  const failureMax = Math.max(...failureCounts);
  assert.equal(nonNumericChurn.length, 0, `${definition.id}: failure/success prefix churn introduced non-numeric state`);
  assert.ok(failureMax <= successMax, `${definition.id}: failure churn exceeded matched success control`);

  cases.push({
    id: definition.id,
    repetitions: REPETITIONS,
    success: {
      minChangedPrefixCells: successMin,
      maxChangedPrefixCells: successMax,
      counts: successCounts,
      uniqueChangedIndices: successIndices.size,
    },
    failure: {
      minChangedPrefixCells: failureMin,
      maxChangedPrefixCells: failureMax,
      counts: failureCounts,
      uniqueChangedIndices: failureIndices.size,
      exceptionSignatures: [...failureExceptions],
    },
    checks: {
      everyCallPreservedLength: true,
      everyCallPreservedHoleCount: true,
      churnWasNumericOnly: true,
      failureChurnDidNotExceedMatchedSuccessControl: failureMax <= successMax,
    },
  });
}

assert.equal(env.arena.length, initialLength, 'campaign arena length drift');
assert.equal(countHoles(env.arena), initialHoles, 'campaign arena holes drift');

const evidence = {
  schema: 'pastafari.update8.stage05.matched-prefix.v1',
  generatedAt: new Date().toISOString(),
  repository: 'Sargon17-Green/pastafari-calendar',
  productionBaselineCommit: '2bc2d97bd5638b498014ed8c1c925fb735819a6b',
  currentMainCommitAtValidation: process.env.STAGE5_CURRENT_MAIN_COMMIT ?? null,
  mainDeltaNote: process.env.STAGE5_MAIN_DELTA_NOTE ?? null,
  stateFamily: 'STATE:generated:arena-prefix-churn',
  purpose: 'Distinguish known success-path numeric prefix churn from the two Stage-5 rollback defect families; this is a matched-control check, not a new rollback target.',
  repetitionsPerSuccessAndFailure: REPETITIONS,
  initialArenaLength: initialLength,
  finalArenaLength: env.arena.length,
  initialHoles,
  finalHoles: countHoles(env.arena),
  cases,
  conclusion: {
    arenaShapeRestoredAfterEveryFailure: true,
    noFailureIntroducedNonNumericPrefixState: true,
    noFailureExceededMatchedSuccessPrefixChurnCardinality: cases.every((entry) => entry.checks.failureChurnDidNotExceedMatchedSuccessControl),
    classification: 'MATCHED_SUCCESS_PATH_NUMERIC_CHURN_ONLY',
    stage5BlockingFinding: false,
  },
};

fs.writeFileSync(OUT, `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`PASS matched-prefix controls (${cases.length} families x ${REPETITIONS} success/failure pairs)`);
console.log(OUT);
