import test from 'node:test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW_CORE = path.join(ROOT, 'src', '5efdcc3e6fb071cbaffdcb117507a169dd76.js');
let importSerial = 0;

function errorSummary(error) {
  return { name: error?.name ?? null, message: String(error?.message ?? error) };
}

function sameError(actual, expected) {
  assert.equal(actual.name, expected.name);
  if ('message' in expected) assert.equal(actual.message, expected.message);
  if ('messageIncludes' in expected) assert.match(actual.message, new RegExp(expected.messageIncludes.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

function countHoles(array) {
  let holes = 0;
  for (let i = 0; i < array.length; i += 1) if (!(i in array)) holes += 1;
  return holes;
}

function changedArrayPrefix(before, after, limit = 12) {
  const sample = [];
  let count = 0;
  const n = Math.min(before.length, after.length);
  for (let i = 0; i < n; i += 1) {
    const beforeHas = i in before;
    const afterHas = i in after;
    if (beforeHas !== afterHas || (beforeHas && before[i] !== after[i])) {
      count += 1;
      if (sample.length < limit) sample.push(i);
    }
  }
  return { count, sample };
}

async function bootstrapInstrumented() {
  const OriginalFunction = globalThis.Function;
  const originalCtor = OriginalFunction.prototype.constructor;
  const OriginalMap = globalThis.Map;
  const OriginalWeakMap = globalThis.WeakMap;
  const capturedMaps = [];
  const capturedWeakMaps = [];

  const FunctionProxy = new Proxy(OriginalFunction, {
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    },
    construct(target, args, newTarget) {
      const patched = [...args];
      const bodyIndex = patched.length - 1;
      // The top-level generated source carrier is deliberately single-use.
      // Never coerce it here; instrument only already-materialized Function bodies.
      if (bodyIndex >= 1 && typeof patched[bodyIndex] === 'string') {
        const body = patched[bodyIndex];
        if (body.length > 7_000_000 && body.includes('mechanizm_51d0f2012a2c_mr')) {
          const firstParam = String(patched[0]);
          patched[bodyIndex] = body.replace(
            '"use strict";',
            `"use strict";globalThis.__PASTAFARI_STAGE5_ARENA=${firstParam};`,
          );
        }
      }
      return Reflect.construct(target, patched, newTarget === FunctionProxy ? target : newTarget);
    },
  });

  const MapProxy = new Proxy(OriginalMap, {
    construct(target, args, newTarget) {
      const value = Reflect.construct(target, args, newTarget === MapProxy ? target : newTarget);
      capturedMaps.push(value);
      return value;
    },
  });

  const WeakMapProxy = new Proxy(OriginalWeakMap, {
    construct(target, args, newTarget) {
      const value = Reflect.construct(target, args, newTarget === WeakMapProxy ? target : newTarget);
      capturedWeakMaps.push(value);
      return value;
    },
  });

  try {
    globalThis.__PASTAFARI_STAGE5_ARENA = null;
    globalThis.Function = FunctionProxy;
    OriginalFunction.prototype.constructor = FunctionProxy;
    globalThis.Map = MapProxy;
    globalThis.WeakMap = WeakMapProxy;
    const tag = `stage5-transactionality-${process.pid}-${++importSerial}`;
    const raw = await import(`${pathToFileURL(RAW_CORE).href}?${tag}`);
    const arena = globalThis.__PASTAFARI_STAGE5_ARENA;
    assert.ok(Array.isArray(arena), 'failed to capture authoritative shared arena');
    assert.ok(capturedWeakMaps.length >= 1, 'failed to capture generated WeakMaps');
    return { raw, arena, capturedMaps, capturedWeakMaps, identityMap: capturedWeakMaps[0] };
  } finally {
    globalThis.Function = OriginalFunction;
    OriginalFunction.prototype.constructor = originalCtor;
    globalThis.Map = OriginalMap;
    globalThis.WeakMap = OriginalWeakMap;
  }
}

function failureDefinitions(raw) {
  return [
    {
      id: 'F_BAHAI_INVALID_VARIANT',
      expected: { name: 'RangeError', message: 'variant של הלוח הבהאי חייב להיות "tehran-equinox" או "western-arithmetic"' },
      create() { const key = { variant: 'invalid-stage5' }; return { key, run: () => new raw.BahaiDate(183n, 1, 1, key) }; },
    },
    {
      id: 'F_GREGORIAN_NONINTEGER_MONTH',
      expected: { name: 'TypeError', message: 'החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים' },
      create() { return { key: null, run: () => new raw.GregorianDate(2026n, 1.25, 22) }; },
    },
    {
      id: 'F_HINDU_INVALID_SCHEME',
      expected: { name: 'RangeError', message: 'אין לוח הינדי יחיד; scheme חייב להיות "old-solar" או "old-lunar"' },
      create() { const key = { scheme: 'invalid-stage5' }; return { key, run: () => new raw.HinduDate(1948n, 1, 1, key) }; },
    },
    {
      id: 'F_ISLAMIC_INVALID_VARIANT',
      expected: { name: 'RangeError', message: 'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"' },
      create() { const key = { variant: 'invalid-stage5' }; return { key, run: () => new raw.IslamicDate(1448n, 1, 1, key) }; },
    },
    {
      id: 'F_JAPANESE_NONSTRING_ERA',
      expected: { name: 'TypeError', message: 'שם התקופה היפנית חייב להיות מחרוזת' },
      create() { return { key: null, run: () => new raw.JapaneseImperialDate(123, 8n, 1, 1) }; },
    },
    {
      id: 'F_MONTH_WEAVING_NONPOSITIVE',
      expected: { name: 'RangeError', message: 'אורכי החודשים חייבים להיות חיוביים' },
      create() { const key = [1, 0, 2]; return { key, run: () => new raw.MonthWeavingCounter(key) }; },
    },
    {
      id: 'F_PASTAFARI_INVALID_TODAY_PROVIDER',
      expected: { name: 'TypeError', message: 'todayProvider חייב להיות פונקציה' },
      create() { const key = { todayProvider: 123 }; return { key, run: () => new raw.PastafariCalendar(key) }; },
    },
    {
      id: 'F_SOLAR_HIJRI_INVALID_VARIANT',
      expected: { name: 'RangeError', message: 'variant של הלוח ההיג׳רי השמשי חייב להיות "official" או "arithmetic-2820"' },
      create() { const key = { variant: 'invalid-stage5' }; return { key, run: () => new raw.SolarHijriDate(1405n, 1, 1, key) }; },
    },
    {
      id: 'F_RAW_PASTAFARI_DEFAULT',
      expected: { name: 'ReferenceError', messageIncludes: 'localToday' },
      create() { return { key: null, run: () => new raw.PastafariCalendar() }; },
    },
  ];
}

function expectThrow(run) {
  try {
    run();
  } catch (error) {
    return errorSummary(error);
  }
  assert.fail('expected construction to throw');
}

function successGregorian(raw) {
  const value = new raw.GregorianDate(2026n, 8, 22);
  return { year: String(value.year), month: value.month, day: value.day };
}

async function runNaturalMatrix() {
  const env = await bootstrapInstrumented();
  const definitions = failureDefinitions(env.raw);
  const initialLength = env.arena.length;
  const initialHoles = countHoles(env.arena);
  const oneShot = [];

  for (const def of definitions) {
    const { key, run } = def.create();
    const before = env.arena.slice();
    const beforeLen = env.arena.length;
    const beforeHoles = countHoles(env.arena);
    const beforeWeak = key ? { has: env.identityMap.has(key), value: env.identityMap.get(key) } : null;
    const observed = expectThrow(run);
    const afterWeak = key ? { has: env.identityMap.has(key), value: env.identityMap.get(key) } : null;
    sameError(observed, def.expected);
    const prefixChurn = changedArrayPrefix(before, env.arena);
    assert.equal(env.arena.length, beforeLen, `${def.id}: arena length`);
    assert.equal(countHoles(env.arena), beforeHoles, `${def.id}: arena holes`);
    if (key) {
      assert.equal(beforeWeak.has, false, `${def.id}: test key unexpectedly pre-mapped`);
      assert.equal(afterWeak.has, false, `${def.id}: failed-new key remained mapped`);
    }
    oneShot.push({ id: def.id, beforeLen, afterLen: env.arena.length, arenaDelta: env.arena.length - beforeLen, beforeHoles, afterHoles: countHoles(env.arena), prefixChurn, keyAbsentAfter: key ? !afterWeak.has : null, exception: observed });
  }

  const repeated = [];
  for (const def of definitions) {
    const { key, run } = def.create();
    const beforeLen = env.arena.length;
    const beforeHoles = countHoles(env.arena);
    const checkpoints = [];
    let signature = null;
    for (let i = 1; i <= 1000; i += 1) {
      const observed = expectThrow(run);
      sameError(observed, def.expected);
      const currentSignature = `${observed.name}\0${observed.message}`;
      signature ??= currentSignature;
      assert.equal(currentSignature, signature, `${def.id}: exception changed at ${i}`);
      if (key) assert.equal(env.identityMap.has(key), false, `${def.id}: failed key mapped at ${i}`);
      if ([1, 10, 100, 1000].includes(i)) {
        checkpoints.push({ n: i, arenaDelta: env.arena.length - beforeLen, holesDelta: countHoles(env.arena) - beforeHoles, keyAbsent: key ? !env.identityMap.has(key) : null });
      }
    }
    assert.equal(env.arena.length, beforeLen, `${def.id}: repeated arena accumulation`);
    assert.equal(countHoles(env.arena), beforeHoles, `${def.id}: repeated holes drift`);
    repeated.push({ id: def.id, count: 1000, checkpoints, finalArenaDelta: env.arena.length - beforeLen, finalHolesDelta: countHoles(env.arena) - beforeHoles, exceptionSignature: signature });
  }

  // Explicit failed-reference retention campaign with distinct keys.
  const retentionStart = env.arena.length;
  const failedKeys = [];
  for (let i = 0; i < 100; i += 1) {
    const key = { todayProvider: i };
    failedKeys.push(key);
    const observed = expectThrow(() => new env.raw.PastafariCalendar(key));
    sameError(observed, { name: 'TypeError', message: 'todayProvider חייב להיות פונקציה' });
    assert.equal(env.identityMap.has(key), false);
  }
  assert.equal(env.arena.length, retentionStart);

  // A -> FAIL -> A using a cheap authoritative constructor as the success control.
  const aFailA = [];
  for (const def of definitions) {
    const a1 = successGregorian(env.raw);
    const beforeFailLen = env.arena.length;
    const { run } = def.create();
    const observed = expectThrow(run);
    sameError(observed, def.expected);
    assert.equal(env.arena.length, beforeFailLen);
    const a2 = successGregorian(env.raw);
    assert.deepEqual(a2, a1);
    aFailA.push({ id: def.id, A1: a1, A2: a2, equal: true, failureArenaDelta: env.arena.length - beforeFailLen, exception: observed });
  }

  const alternatingStart = env.arena.length;
  const alternating = [];
  for (let i = 0; i < 100; i += 1) {
    const success = successGregorian(env.raw);
    assert.deepEqual(success, { year: '2026', month: 8, day: 22 });
    const def = definitions[i % definitions.length];
    const { run } = def.create();
    const observed = expectThrow(run);
    sameError(observed, def.expected);
    alternating.push({ i, failureId: def.id, success, exception: observed });
  }
  assert.equal(env.arena.length, alternatingStart);

  const permDefs = new Map(definitions.map((d) => [d.id, d]));
  const permutationSequences = [
    ['F_GREGORIAN_NONINTEGER_MONTH', 'F_ISLAMIC_INVALID_VARIANT', 'F_MONTH_WEAVING_NONPOSITIVE'],
    ['F_MONTH_WEAVING_NONPOSITIVE', 'F_ISLAMIC_INVALID_VARIANT', 'F_GREGORIAN_NONINTEGER_MONTH'],
    ['F_GREGORIAN_NONINTEGER_MONTH', 'F_GREGORIAN_NONINTEGER_MONTH', 'F_ISLAMIC_INVALID_VARIANT', 'F_ISLAMIC_INVALID_VARIANT', 'F_MONTH_WEAVING_NONPOSITIVE', 'F_MONTH_WEAVING_NONPOSITIVE'],
    ['F_GREGORIAN_NONINTEGER_MONTH', 'F_ISLAMIC_INVALID_VARIANT', 'F_MONTH_WEAVING_NONPOSITIVE', 'F_GREGORIAN_NONINTEGER_MONTH', 'F_ISLAMIC_INVALID_VARIANT', 'F_MONTH_WEAVING_NONPOSITIVE'],
  ];
  const permutations = [];
  for (const sequence of permutationSequences) {
    const startLen = env.arena.length;
    const startHoles = countHoles(env.arena);
    for (const id of sequence) {
      const def = permDefs.get(id);
      const { key, run } = def.create();
      const observed = expectThrow(run);
      sameError(observed, def.expected);
      if (key) assert.equal(env.identityMap.has(key), false);
    }
    assert.equal(env.arena.length, startLen);
    assert.equal(countHoles(env.arena), startHoles);
    permutations.push({ sequence, finalArenaDelta: env.arena.length - startLen, finalHolesDelta: countHoles(env.arena) - startHoles });
  }

  assert.equal(env.arena.length, initialLength);
  assert.equal(countHoles(env.arena), initialHoles);
  return { initialLength, initialHoles, oneShot, repeated, retention: { count: failedKeys.length, arenaDelta: env.arena.length - initialLength, allKeysAbsent: failedKeys.every((key) => !env.identityMap.has(key)) }, aFailA, alternating: { count: alternating.length, finalArenaDelta: env.arena.length - alternatingStart }, permutations };
}

async function runIdentityMatrix() {
  // Preexisting mapping survives a later failure using the same key.
  const pre = await bootstrapInstrumented();
  const key = { variant: 'civil' };
  new pre.raw.IslamicDate(1448n, 1, 1, key);
  assert.equal(pre.identityMap.has(key), true);
  const preId = pre.identityMap.get(key);
  key.variant = 'invalid-stage5';
  const fail = expectThrow(() => new pre.raw.IslamicDate(1448n, 1, 1, key));
  sameError(fail, { name: 'RangeError', message: 'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"' });
  assert.equal(pre.identityMap.has(key), true);
  assert.equal(pre.identityMap.get(key), preId);

  // Same absent failed key remains absent after every failure.
  const same = await bootstrapInstrumented();
  const sameKey = { variant: 'invalid-stage5' };
  const sameStates = [];
  for (let i = 0; i < 10; i += 1) {
    expectThrow(() => new same.raw.IslamicDate(1448n, 1, 1, sameKey));
    sameStates.push({ i: i + 1, has: same.identityMap.has(sameKey) });
    assert.equal(same.identityMap.has(sameKey), false);
  }

  // Failed allocations must not consume identity numbers. Compare the allocation gap
  // inside each history instead of absolute IDs across independent bootstraps.
  const dirty = await bootstrapInstrumented();
  const dirtyBeforeKey = { variant: 'civil' };
  new dirty.raw.IslamicDate(1448n, 1, 1, dirtyBeforeKey);
  const dirtyBeforeId = dirty.identityMap.get(dirtyBeforeKey);
  const failedIds = [];
  for (let i = 0; i < 3; i += 1) {
    const failedKey = { variant: `invalid-${i}` };
    expectThrow(() => new dirty.raw.IslamicDate(1448n, 1, 1, failedKey));
    failedIds.push({ i, hasAfter: dirty.identityMap.has(failedKey) });
    assert.equal(dirty.identityMap.has(failedKey), false);
  }
  const dirtyAfterKey = { variant: 'civil' };
  new dirty.raw.IslamicDate(1448n, 1, 1, dirtyAfterKey);
  const dirtyAfterId = dirty.identityMap.get(dirtyAfterKey);
  const dirtyGap = (dirtyAfterId - dirtyBeforeId) >>> 0;
  assert.equal(dirtyGap, 1, 'failed identity allocations consumed counter values');

  const clean = await bootstrapInstrumented();
  const cleanBeforeKey = { variant: 'civil' };
  new clean.raw.IslamicDate(1448n, 1, 1, cleanBeforeKey);
  const cleanBeforeId = clean.identityMap.get(cleanBeforeKey);
  const cleanAfterKey = { variant: 'civil' };
  new clean.raw.IslamicDate(1448n, 1, 1, cleanAfterKey);
  const cleanAfterId = clean.identityMap.get(cleanAfterKey);
  const cleanGap = (cleanAfterId - cleanBeforeId) >>> 0;
  assert.equal(cleanGap, 1, 'clean identity allocation control is not sequential');
  assert.equal(dirtyGap, cleanGap, 'dirty and clean allocation sequences differ');

  return {
    preexisting: { idBefore: preId, idAfter: pre.identityMap.get(key), preserved: pre.identityMap.get(key) === preId, failure: fail },
    sameFailedKey: sameStates,
    distinctFailedKeys: failedIds,
    sequence: { dirtyBeforeId, dirtyAfterId, dirtyGap, cleanBeforeId, cleanAfterId, cleanGap, equal: dirtyGap === cleanGap },
  };
}

function makeNestedOptions(env, depth, trace, allOuterKeys, allInnerKeys) {
  const target = { todayProvider: () => null };
  let fired = false;
  let proxy;
  proxy = new Proxy(target, {
    ownKeys(t) {
      if (!fired) {
        fired = true;
        const before = env.arena.length;
        if (depth > 1) {
          const child = makeNestedOptions(env, depth - 1, trace, allOuterKeys, allInnerKeys);
          new env.raw.PastafariCalendar(child);
        } else {
          const innerKey = { variant: 'invalid-nested-stage5' };
          allInnerKeys.push(innerKey);
          const observed = expectThrow(() => new env.raw.IslamicDate(1448n, 1, 1, innerKey));
          sameError(observed, { name: 'RangeError', message: 'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"' });
          assert.equal(env.identityMap.has(innerKey), false);
        }
        const after = env.arena.length;
        trace.push({ depth, before, after, delta: after - before });
        assert.equal(after, before, `nested depth ${depth}: inner call destroyed/retained outer arena state`);
      }
      return Reflect.ownKeys(t);
    },
  });
  allOuterKeys.push(proxy);
  return proxy;
}

async function runNestedMatrix() {
  const env = await bootstrapInstrumented();
  const baselineLength = env.arena.length;
  const cases = [];
  for (const depth of [1, 2, 3, 5, 10]) {
    const trace = [];
    const outerKeys = [];
    const innerKeys = [];
    const options = makeNestedOptions(env, depth, trace, outerKeys, innerKeys);
    const value = new env.raw.PastafariCalendar(options);
    assert.ok(value);
    assert.equal(env.arena.length, baselineLength, `depth ${depth}: top-level success arena drift`);
    for (const outerKey of outerKeys) assert.equal(env.identityMap.has(outerKey), true, `depth ${depth}: successful outer identity missing`);
    for (const innerKey of innerKeys) assert.equal(env.identityMap.has(innerKey), false, `depth ${depth}: failed inner identity leaked`);
    cases.push({ depth, trace, finalArenaDelta: env.arena.length - baselineLength, outerKeysCommitted: outerKeys.every((k) => env.identityMap.has(k)), innerKeysAbsent: innerKeys.every((k) => !env.identityMap.has(k)) });
  }

  // Inner failure is caught, then the outer invocation itself fails: everything owned by outer must roll back.
  const outerTarget = { todayProvider: () => null };
  const innerKey = { variant: 'invalid-nested-stage5-outer-fail' };
  const outerFault = new Error('STAGE5_OUTER_FAULT_AFTER_INNER_FAILURE');
  outerFault.name = 'Stage5OuterFault';
  let fired = false;
  let beforeInner = null;
  let afterInner = null;
  const outerProxy = new Proxy(outerTarget, {
    ownKeys(t) {
      if (!fired) {
        fired = true;
        beforeInner = env.arena.length;
        const observedInner = expectThrow(() => new env.raw.IslamicDate(1448n, 1, 1, innerKey));
        sameError(observedInner, { name: 'RangeError', message: 'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"' });
        afterInner = env.arena.length;
        assert.equal(afterInner, beforeInner);
        throw outerFault;
      }
      return Reflect.ownKeys(t);
    },
  });
  const beforeOuter = env.arena.length;
  const observedOuter = expectThrow(() => new env.raw.PastafariCalendar(outerProxy));
  sameError(observedOuter, { name: 'Stage5OuterFault', message: 'STAGE5_OUTER_FAULT_AFTER_INNER_FAILURE' });
  assert.equal(env.arena.length, beforeOuter);
  assert.equal(env.identityMap.has(innerKey), false);
  assert.equal(env.identityMap.has(outerProxy), false);

  // Faults during argument measurement exercise the pre-constructor failure window.
  const faultCases = [];
  for (const kind of ['ownKeys']) {
    const target = { todayProvider: () => null };
    const fault = new Error(`STAGE5_INJECTED_${kind}`);
    fault.name = 'Stage5InjectedFault';
    let proxy;
    proxy = new Proxy(target, {
      ownKeys(t) {
        if (kind === 'ownKeys') throw fault;
        return Reflect.ownKeys(t);
      },
      getOwnPropertyDescriptor(t, p) {
        if (kind === 'getOwnPropertyDescriptor') throw fault;
        return Reflect.getOwnPropertyDescriptor(t, p);
      },
    });
    const before = env.arena.length;
    const observed = expectThrow(() => new env.raw.PastafariCalendar(proxy));
    sameError(observed, { name: 'Stage5InjectedFault', message: `STAGE5_INJECTED_${kind}` });
    assert.equal(env.arena.length, before);
    assert.equal(env.identityMap.has(proxy), false);
    faultCases.push({ kind, arenaDelta: env.arena.length - before, keyAbsent: !env.identityMap.has(proxy), exception: observed });
  }

  return {
    baselineLength,
    cases,
    outerFailure: { beforeInner, afterInner, innerArenaDelta: afterInner - beforeInner, finalArenaDelta: env.arena.length - beforeOuter, innerKeyAbsent: !env.identityMap.has(innerKey), outerKeyAbsent: !env.identityMap.has(outerProxy), exception: observedOuter },
    faultCases,
  };
}

let evidence = null;

test('Update 8 Stage 5 failed construction rollback is entry-relative and non-accumulating', async () => {
  const natural = await runNaturalMatrix();
  const identity = await runIdentityMatrix();
  const nested = await runNestedMatrix();
  evidence = { natural, identity, nested };
  globalThis.__PASTAFARI_STAGE5_TEST_EVIDENCE = evidence;
  if (process.env.PASTAFARI_STAGE5_WRITE_EVIDENCE === '1') {
    fs.writeFileSync(path.join(ROOT, 'artifacts', 'update-08-stage-05-transactionality.json'), JSON.stringify(evidence, null, 2) + '\n');
  }
});
