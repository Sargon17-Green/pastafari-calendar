import fs from 'node:fs';

const OriginalFunction = globalThis.Function;
globalThis.__PASTAFARI_STAGE4D_ARENA = null;
globalThis.Function = new Proxy(OriginalFunction, {
  construct(target, args) {
    const patched = [...args];
    const bodyIndex = patched.length - 1;
    const body = String(patched[bodyIndex]);
    if (body.length > 7_000_000) {
      const firstParam = String(patched[0]);
      patched[bodyIndex] = body.replace(
        '"use strict";',
        `"use strict";globalThis.__PASTAFARI_STAGE4D_ARENA=${firstParam};`,
      );
    }
    return Reflect.construct(target, patched, target);
  },
  apply(target, thisArg, args) {
    return Reflect.apply(target, thisArg, args);
  },
});
let raw;
try {
  raw = await import(`../../src/5efdcc3e6fb071cbaffdcb117507a169dd76.js?stage4d-arena=${Date.now()}`);
} finally {
  globalThis.Function = OriginalFunction;
}
const arena = globalThis.__PASTAFARI_STAGE4D_ARENA;
if (!Array.isArray(arena)) throw new Error('failed to expose authoritative shared invocation arena');

function errorSummary(error) {
  return { name: error?.name ?? null, message: String(error?.message ?? error) };
}
function containsIdentity(value, needle, depth = 2, seen = new Set()) {
  if (value === needle) return true;
  if (depth <= 0 || value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
  if (seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) return value.some((item) => containsIdentity(item, needle, depth - 1, seen));
  return false;
}
function summarizeCell(value) {
  if (value === null) return { type: 'null' };
  if (Array.isArray(value)) return { type: 'Array', length: value.length };
  if (typeof value === 'function') return { type: 'function', name: value.name || '<anonymous>' };
  if (typeof value === 'object') return { type: value.constructor?.name || 'object', keys: Reflect.ownKeys(value).slice(0, 6).map(String) };
  if (typeof value === 'bigint') return { type: 'bigint', value: String(value) };
  return { type: typeof value, value: typeof value === 'string' ? value.slice(0, 80) : value };
}

const result = {
  schema: 'pastafari.update8.stage04d.arena-publication.v1',
  stateId: 'STATE:generated:shared-invocation-arena',
  initialLength: arena.length,
  cases: [],
};

function runFailure(id, Constructor, args, knownKey = null) {
  const before = arena.length;
  let error = null;
  try { Reflect.construct(Constructor, args); } catch (caught) { error = errorSummary(caught); }
  const after = arena.length;
  const leaked = arena.slice(before, after);
  result.cases.push({
    id,
    before,
    after,
    delta: after - before,
    error,
    leakedCells: leaked.map(summarizeCell),
    knownKeyDirectlyInLeakedCells: knownKey ? leaked.some((value) => value === knownKey) : null,
    knownKeyReachableWithinLeakedArraysDepth2: knownKey ? leaked.some((value) => containsIdentity(value, knownKey, 2)) : null,
  });
}

const failedOpts = { todayProvider: 123 };
runFailure('PastafariCalendar_invalid_options', raw.PastafariCalendar, [failedOpts], failedOpts);
const islamicOpts = { variant: 'invalid-stage4d' };
runFailure('IslamicDate_invalid_variant', raw.IslamicDate, [1448n, 1, 1, islamicOpts], islamicOpts);
const lengths = [1, 0, 2];
runFailure('MonthWeavingCounter_invalid_lengths', raw.MonthWeavingCounter, [lengths], lengths);
runFailure('GregorianDate_noninteger_month', raw.GregorianDate, [2026n, 1.25, 22], null);

const repeatedStart = arena.length;
const repeatedKeys = [];
for (let i = 0; i < 10; i += 1) {
  const key = { todayProvider: i };
  repeatedKeys.push(key);
  try { new raw.PastafariCalendar(key); } catch {}
}
const repeatedEnd = arena.length;
const repeatedTail = arena.slice(repeatedStart, repeatedEnd);
result.repeatedDistinctFailures = {
  count: 10,
  before: repeatedStart,
  after: repeatedEnd,
  delta: repeatedEnd - repeatedStart,
  expectedIfTwelveEach: 120,
  exactTwelveEach: repeatedEnd - repeatedStart === 120,
  failedKeysReachableFromTail: repeatedKeys.map((key, index) => ({
    index,
    reachable: repeatedTail.some((value) => containsIdentity(value, key, 2)),
  })),
};

const beforeSuccess = arena.length;
let success = null;
let successError = null;
try {
  success = new raw.GregorianDate(2026n, 8, 22);
} catch (caught) {
  successError = errorSummary(caught);
}
result.successAfterFailures = {
  before: beforeSuccess,
  after: arena.length,
  delta: arena.length - beforeSuccess,
  error: successError,
  fields: success ? { year: String(success.year), month: success.month, day: success.day } : null,
  priorResiduePreserved: arena.length === beforeSuccess,
};

const output = JSON.stringify(result, null, 2) + '\n';
if (process.argv.includes('--write')) {
  fs.mkdirSync(new URL('../../artifacts/', import.meta.url), { recursive: true });
  fs.writeFileSync(new URL('../../artifacts/update-08-stage-04d-arena-publication.json', import.meta.url), output);
}
process.stdout.write(output);
