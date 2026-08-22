import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT = path.join(ROOT, 'artifacts', 'update-08-stage-03-reproduction.json');
const SCHEMA = path.join(ROOT, 'verification', 'update8', 'stage-03-snapshot-schema.json');
const RAW_CORE = path.join(ROOT, 'src', '5efdcc3e6fb071cbaffdcb117507a169dd76.js');
const PUBLIC_API = path.join(ROOT, 'src', 'public-api.js');
const STAGE1 = path.join(ROOT, 'verification', 'update8', 'stage-01-baseline.json');
const STAGE2A = path.join(ROOT, 'verification', 'update8', 'stage-02a-construction-inventory.json');
const STAGE2B = path.join(ROOT, 'verification', 'update8', 'stage-02b-shared-state-inventory.json');
const ARENA_HOOK = '__PASTAFARI_STAGE3_ARENA__';

function sha256Bytes(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

async function sha256File(file) {
  return sha256Bytes(await fs.readFile(file));
}

function git(args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

function jsonEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function errorSummary(error) {
  return {
    name: error?.name ?? null,
    message: String(error?.message ?? error),
    code: error?.code ?? null,
  };
}

const identityIds = new WeakMap();
let nextIdentityId = 1;
function identityId(value) {
  if ((typeof value !== 'object' && typeof value !== 'function') || value === null) return null;
  let id = identityIds.get(value);
  if (!id) {
    id = nextIdentityId++;
    identityIds.set(value, id);
  }
  return id;
}

function summarizeValue(value) {
  if (value === undefined) return { type: 'undefined' };
  if (value === null) return { type: 'null' };
  if (typeof value === 'bigint') return { type: 'bigint', value: value.toString() };
  if (typeof value === 'symbol') return { type: 'symbol', description: value.description ?? null };
  if (typeof value === 'function') return { type: 'function', name: value.name || '<anonymous>', identity: identityId(value) };
  if (Array.isArray(value)) return { type: 'Array', length: value.length, identity: identityId(value) };
  if (typeof value === 'object') return { type: 'object', identity: identityId(value) };
  return { type: typeof value, value };
}

function descriptorSnapshot(target, property) {
  const descriptor = Object.getOwnPropertyDescriptor(target, property);
  if (!descriptor) return { exists: false };
  return {
    exists: true,
    value: summarizeValue(descriptor.value),
    get: summarizeValue(descriptor.get),
    set: summarizeValue(descriptor.set),
    writable: descriptor.writable ?? null,
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
  };
}

function arraySnapshot(array, previousLength = array.length) {
  let numericOwnCount = 0;
  const firstOwnIndices = [];
  const lastOwnIndices = [];
  for (let i = 0; i < array.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(array, i)) continue;
    numericOwnCount += 1;
    if (firstOwnIndices.length < 8) firstOwnIndices.push(i);
    lastOwnIndices.push(i);
    if (lastOwnIndices.length > 8) lastOwnIndices.shift();
  }
  const sampleIndices = new Set();
  for (let i = 0; i < Math.min(8, array.length); i += 1) sampleIndices.add(i);
  for (let i = Math.max(0, previousLength - 8); i < Math.min(array.length, previousLength + 16); i += 1) sampleIndices.add(i);
  if (array.length > 16) {
    const mid = Math.floor(array.length / 2);
    for (let i = Math.max(0, mid - 4); i < Math.min(array.length, mid + 4); i += 1) sampleIndices.add(i);
  }
  const selectedEntries = [...sampleIndices].sort((a, b) => a - b).map((index) => ({
    index,
    hasOwn: Object.prototype.hasOwnProperty.call(array, index),
    value: Object.prototype.hasOwnProperty.call(array, index) ? summarizeValue(array[index]) : { type: 'hole' },
  }));
  return {
    length: array.length,
    numericOwnCount,
    holeCount: array.length - numericOwnCount,
    firstOwnIndices,
    lastOwnIndices,
    symbolKeys: Object.getOwnPropertySymbols(array).map((symbol) => symbol.description ?? null),
    lengthDescriptor: descriptorSnapshot(array, 'length'),
    selectedEntries,
  };
}

function mapSnapshot(map, index) {
  const entries = [];
  let seen = 0;
  for (const [key, value] of map) {
    if (seen >= 8) break;
    entries.push({ key: summarizeValue(key), value: summarizeValue(value) });
    seen += 1;
  }
  return { index, size: map.size, selectedEntries: entries };
}

function knownWeakMapSnapshot(map, index, key) {
  if (key === null) return { index, keyObserved: false, has: null, value: null };
  const has = map.has(key);
  return { index, keyObserved: true, has, value: has ? summarizeValue(map.get(key)) : null };
}

function knownWeakSetSnapshot(set, index, key) {
  if (key === null) return { index, keyObserved: false, has: null };
  return { index, keyObserved: true, has: set.has(key) };
}

const OriginalFunction = globalThis.Function;
const originalFunctionCtor = OriginalFunction.prototype.constructor;
const OriginalMap = globalThis.Map;
const OriginalWeakMap = globalThis.WeakMap;
const OriginalWeakSet = globalThis.WeakSet;
const capturedMaps = [];
const capturedWeakMaps = [];
const capturedWeakSets = [];

globalThis[ARENA_HOOK] = null;

function transformDecodedFunctionArgs(args) {
  if (!args.length) return args;
  const out = [...args];
  const bodyIndex = out.length - 1;
  const body = String(out[bodyIndex]);
  if (body.length <= 7_000_000) return out;
  const arenaParam = String(out[0]);
  const needle = '"use strict";';
  const i = body.indexOf(needle);
  if (i < 0) throw new Error('Stage 3 arena observation hook could not locate generated main body prologue');
  out[bodyIndex] = body.slice(0, i + needle.length)
    + `globalThis.${ARENA_HOOK}=${arenaParam};`
    + body.slice(i + needle.length);
  return out;
}

const FunctionProxy = new Proxy(OriginalFunction, {
  apply(target, thisArg, args) {
    return Reflect.apply(target, thisArg, args);
  },
  construct(target, args, newTarget) {
    const effectiveNewTarget = newTarget === FunctionProxy ? target : newTarget;
    return Reflect.construct(target, transformDecodedFunctionArgs(args), effectiveNewTarget);
  },
});
const MapProxy = new Proxy(OriginalMap, {
  construct(target, args) {
    const value = Reflect.construct(target, args, target);
    capturedMaps.push(value);
    return value;
  },
});
const WeakMapProxy = new Proxy(OriginalWeakMap, {
  construct(target, args) {
    const value = Reflect.construct(target, args, target);
    capturedWeakMaps.push(value);
    return value;
  },
});
const WeakSetProxy = new Proxy(OriginalWeakSet, {
  construct(target, args) {
    const value = Reflect.construct(target, args, target);
    capturedWeakSets.push(value);
    return value;
  },
});

let raw;
let publicApi;
try {
  globalThis.Function = FunctionProxy;
  OriginalFunction.prototype.constructor = FunctionProxy;
  globalThis.Map = MapProxy;
  globalThis.WeakMap = WeakMapProxy;
  globalThis.WeakSet = WeakSetProxy;
  raw = await import(pathToFileURL(RAW_CORE).href);
  globalThis.Function = OriginalFunction;
  OriginalFunction.prototype.constructor = originalFunctionCtor;
  publicApi = await import(`${pathToFileURL(PUBLIC_API).href}?stage3=${Date.now()}`);
} finally {
  globalThis.Function = OriginalFunction;
  OriginalFunction.prototype.constructor = originalFunctionCtor;
  globalThis.Map = OriginalMap;
  globalThis.WeakMap = OriginalWeakMap;
  globalThis.WeakSet = OriginalWeakSet;
}

const arena = globalThis[ARENA_HOOK];
if (!Array.isArray(arena)) throw new Error('Stage 3 failed to expose authoritative shared invocation arena');

const stage1 = JSON.parse(await fs.readFile(STAGE1, 'utf8'));
const stage2a = JSON.parse(await fs.readFile(STAGE2A, 'utf8'));
const stage2b = JSON.parse(await fs.readFile(STAGE2B, 'utf8'));
const packageJson = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
const schema = JSON.parse(await fs.readFile(SCHEMA, 'utf8'));

const productionHashChecks = {};
for (const [relativePath, expected] of Object.entries(stage2b.snapshot?.productionHashes ?? {})) {
  const actual = await sha256File(path.join(ROOT, relativePath));
  productionHashChecks[relativePath] = { expected, actual, equal: expected === actual };
}
const productionAlignedToStage2B = Object.values(productionHashChecks).every((record) => record.equal);

function publicIdentitySnapshot() {
  return {
    rawPastafariPrototype: identityId(raw.PastafariCalendar.prototype),
    rawGatePrototype: identityId(raw.GateIndex.prototype),
    publicPastafariPrototype: identityId(publicApi.PastafariCalendar.prototype),
    rawConvertJdn: descriptorSnapshot(raw.PastafariCalendar.prototype, 'convertJdn'),
    rawGate: descriptorSnapshot(raw.GateIndex.prototype, 'gate'),
    publicConstructor: descriptorSnapshot(publicApi.PastafariCalendar.prototype, 'constructor'),
    exportedFunctions: {
      GregorianDate: identityId(publicApi.GregorianDate),
      IslamicDate: identityId(publicApi.IslamicDate),
      SolarHijriDate: identityId(publicApi.SolarHijriDate),
      HinduDate: identityId(publicApi.HinduDate),
      JapaneseImperialDate: identityId(publicApi.JapaneseImperialDate),
      BahaiDate: identityId(publicApi.BahaiDate),
      MonthWeavingCounter: identityId(publicApi.MonthWeavingCounter),
      PastafariCalendar: identityId(publicApi.PastafariCalendar),
    },
  };
}

function snapshot(knownKey = null, previousArenaLength = arena.length) {
  return {
    'STATE:generated:shared-invocation-arena': arraySnapshot(arena, previousArenaLength),
    'STATE:captured:bootstrap-maps': capturedMaps.map(mapSnapshot),
    'STATE:generated:identity-map-known-key': capturedWeakMaps.map((map, index) => knownWeakMapSnapshot(map, index, knownKey)),
    'STATE:captured:bootstrap-weaksets-known-key': capturedWeakSets.map((set, index) => knownWeakSetSnapshot(set, index, knownKey)),
    'STATE:public:identity-descriptors-prototypes': publicIdentitySnapshot(),
  };
}

function compareSnapshots(before, after) {
  const differences = [];
  const beforeArena = before['STATE:generated:shared-invocation-arena'];
  const afterArena = after['STATE:generated:shared-invocation-arena'];
  if (beforeArena.length !== afterArena.length) {
    differences.push({
      stateId: 'STATE:generated:shared-invocation-arena',
      path: 'length',
      differenceType: 'LENGTH_CHANGED',
      before: beforeArena.length,
      after: afterArena.length,
      delta: afterArena.length - beforeArena.length,
      retainedTail: arena.slice(beforeArena.length, afterArena.length).map(summarizeValue),
    });
  }
  if (beforeArena.holeCount !== afterArena.holeCount) {
    differences.push({
      stateId: 'STATE:generated:shared-invocation-arena',
      path: 'holeCount',
      differenceType: 'HOLE_CHANGED',
      before: beforeArena.holeCount,
      after: afterArena.holeCount,
      delta: afterArena.holeCount - beforeArena.holeCount,
    });
  }

  const beforeMaps = before['STATE:captured:bootstrap-maps'];
  const afterMaps = after['STATE:captured:bootstrap-maps'];
  for (let i = 0; i < Math.max(beforeMaps.length, afterMaps.length); i += 1) {
    const a = beforeMaps[i];
    const b = afterMaps[i];
    if (!a || !b || a.size !== b.size || !jsonEqual(a.selectedEntries, b.selectedEntries)) {
      differences.push({
        stateId: `STATE:captured:bootstrap-map:${i}`,
        path: `maps[${i}]`,
        differenceType: 'CACHE_CHANGED',
        before: a ?? null,
        after: b ?? null,
      });
    }
  }

  const beforeWeak = before['STATE:generated:identity-map-known-key'];
  const afterWeak = after['STATE:generated:identity-map-known-key'];
  for (let i = 0; i < Math.max(beforeWeak.length, afterWeak.length); i += 1) {
    const a = beforeWeak[i];
    const b = afterWeak[i];
    if (jsonEqual(a, b)) continue;
    differences.push({
      stateId: 'STATE:generated:identity-map-and-counter',
      path: `knownKey.weakMap[${i}]`,
      differenceType: a?.has === false && b?.has === true ? 'ADDED' : 'VALUE_CHANGED',
      before: a ?? null,
      after: b ?? null,
    });
  }

  const beforeWeakSets = before['STATE:captured:bootstrap-weaksets-known-key'];
  const afterWeakSets = after['STATE:captured:bootstrap-weaksets-known-key'];
  for (let i = 0; i < Math.max(beforeWeakSets.length, afterWeakSets.length); i += 1) {
    if (!jsonEqual(beforeWeakSets[i], afterWeakSets[i])) {
      differences.push({
        stateId: `STATE:captured:bootstrap-weakset:${i}`,
        path: `weakSets[${i}]`,
        differenceType: 'REGISTRY_CHANGED',
        before: beforeWeakSets[i] ?? null,
        after: afterWeakSets[i] ?? null,
      });
    }
  }

  const beforeIdentity = before['STATE:public:identity-descriptors-prototypes'];
  const afterIdentity = after['STATE:public:identity-descriptors-prototypes'];
  if (!jsonEqual(beforeIdentity, afterIdentity)) {
    differences.push({
      stateId: 'STATE:public:identity-descriptors-prototypes',
      path: 'public/raw identity snapshot',
      differenceType: 'IDENTITY_CHANGED',
      before: beforeIdentity,
      after: afterIdentity,
    });
  }

  return {
    equal: differences.length === 0,
    differences,
    firstMismatch: differences[0] ?? null,
  };
}

function normalizeTuple(value) {
  return {
    year: String(value.year),
    cutletName: value.cutletName,
    dayInCutlet: value.dayInCutlet,
    monthName: value.monthName,
    dayInMonth: value.dayInMonth,
  };
}

const sanityVector = stage1.canonicalSuccessVectors.find((vector) => vector.id === 'foundation_same');
const semanticCalendar = new publicApi.PastafariCalendar({ todayProvider: () => null });
function semanticSanity() {
  const actual = normalizeTuple(semanticCalendar.convertJdn(
    BigInt(sanityVector.input.targetJdn),
    { calculationJdn: BigInt(sanityVector.input.calculationJdn) },
  ));
  return {
    id: sanityVector.id,
    input: sanityVector.input,
    cleanReferenceExpected: sanityVector.expected,
    authoritativeActual: actual,
    match: jsonEqual(actual, sanityVector.expected),
  };
}

const naturalCases = [
  {
    constructionId: 'CTOR:authoritative:GregorianDate',
    failurePath: 'noninteger month validation',
    symbol: 'GregorianDate',
    successDescription: 'new GregorianDate(2026n, 8, 22)',
    successArgs: () => [2026n, 8, 22],
    failureDescription: 'new GregorianDate(2026n, 1.25, 22)',
    failureArgs: () => [2026n, 1.25, 22],
  },
  {
    constructionId: 'CTOR:authoritative:IslamicDate',
    failurePath: 'invalid variant validation',
    symbol: 'IslamicDate',
    successDescription: 'new IslamicDate(1448n, 1, 1, {variant:"civil"})',
    successArgs: () => [1448n, 1, 1, { variant: 'civil' }],
    failureDescription: 'new IslamicDate(1448n, 1, 1, {variant:"invalid-stage3"})',
    failureArgs: () => [1448n, 1, 1, { variant: 'invalid-stage3' }],
    knownKeyIndex: 3,
  },
  {
    constructionId: 'CTOR:authoritative:SolarHijriDate',
    failurePath: 'invalid variant validation',
    symbol: 'SolarHijriDate',
    successDescription: 'new SolarHijriDate(1405n, 1, 1, {variant:"arithmetic-2820"})',
    successArgs: () => [1405n, 1, 1, { variant: 'arithmetic-2820' }],
    failureDescription: 'new SolarHijriDate(1405n, 1, 1, {variant:"invalid-stage3"})',
    failureArgs: () => [1405n, 1, 1, { variant: 'invalid-stage3' }],
    knownKeyIndex: 3,
  },
  {
    constructionId: 'CTOR:authoritative:HinduDate',
    failurePath: 'invalid scheme validation',
    symbol: 'HinduDate',
    successDescription: 'new HinduDate(2083n, 1, 1, {scheme:"old-solar"})',
    successArgs: () => [2083n, 1, 1, { scheme: 'old-solar' }],
    failureDescription: 'new HinduDate(2083n, 1, 1, {scheme:"invalid-stage3"})',
    failureArgs: () => [2083n, 1, 1, { scheme: 'invalid-stage3' }],
    knownKeyIndex: 3,
  },
  {
    constructionId: 'CTOR:authoritative:JapaneseImperialDate',
    failurePath: 'non-string era validation',
    symbol: 'JapaneseImperialDate',
    successDescription: 'new JapaneseImperialDate("Reiwa", 8n, 1, 1)',
    successArgs: () => ['Reiwa', 8n, 1, 1],
    failureDescription: 'new JapaneseImperialDate(123, 1n, 1, 1)',
    failureArgs: () => [123, 1n, 1, 1],
  },
  {
    constructionId: 'CTOR:authoritative:BahaiDate',
    failurePath: 'invalid variant validation',
    symbol: 'BahaiDate',
    successDescription: 'new BahaiDate(183n, 1, 1)',
    successArgs: () => [183n, 1, 1],
    failureDescription: 'new BahaiDate(183n, 1, 1, {variant:"invalid-stage3"})',
    failureArgs: () => [183n, 1, 1, { variant: 'invalid-stage3' }],
    knownKeyIndex: 3,
  },
  {
    constructionId: 'CTOR:authoritative:MonthWeavingCounter',
    failurePath: 'non-positive length validation',
    symbol: 'MonthWeavingCounter',
    successDescription: 'new MonthWeavingCounter([4,5,6])',
    successArgs: () => [[4, 5, 6]],
    failureDescription: 'new MonthWeavingCounter([1,0,2])',
    failureArgs: () => [[1, 0, 2]],
    knownKeyIndex: 0,
  },
  {
    constructionId: 'CTOR:authoritative:PastafariCalendar',
    failurePath: 'non-function todayProvider validation',
    symbol: 'PastafariCalendar',
    successDescription: 'new PastafariCalendar({todayProvider:()=>null})',
    successArgs: () => [{ todayProvider: () => null }],
    failureDescription: 'new PastafariCalendar({todayProvider:123})',
    failureArgs: () => [{ todayProvider: 123 }],
    knownKeyIndex: 0,
  },
];

function runConstruction(symbol, args) {
  return Reflect.construct(raw[symbol], args);
}

const result = {
  schema: 'pastafari.update8.stage03.reproduction.v1',
  stage: '3',
  generatedAt: new Date().toISOString(),
  repository: 'Sargon17-Green/pastafari-calendar',
  branch: git(['branch', '--show-current']) || process.env.GITHUB_REF_NAME || 'main',
  commit: git(['rev-parse', 'HEAD']) || process.env.GITHUB_SHA || null,
  packageVersion: packageJson.version,
  workingTreeStatus: git(['status', '--short']) ?? 'UNAVAILABLE_NO_GIT_METADATA',
  stateSchemaVersion: schema.version,
  alignment: {
    stage1Commit: stage1.mainCommit,
    stage2aCommit: stage2a.commit,
    stage2bProductionHashes: stage2b.snapshot?.productionHashes ?? {},
    productionHashChecks,
    productionAlignedToStage2B,
  },
  harness: {
    productionFilesChanged: false,
    faultInjection: false,
    rollbackOrCleanupAdded: false,
    observationOnlyFunctionBodyHook: true,
    mapWeakMapWeakSetCaptureDuringImport: true,
    identitySensitiveComparison: true,
    descriptorAndPrototypeComparison: true,
    arrayHoleComparison: true,
    firstMismatchReporting: true,
    fullStructuredDiff: true,
  },
  baselineSemanticSanityBefore: semanticSanity(),
  successCases: [],
  cases: [],
  repeatedFailureProbe: null,
  summary: {},
};

if (!result.baselineSemanticSanityBefore.match) {
  throw new Error('Stage 3 authoritative/reference sanity mismatch before failure probes');
}

for (const testCase of naturalCases) {
  const successBeforeLen = arena.length;
  const successBefore = snapshot(null, successBeforeLen);
  let successError = null;
  let successResult = null;
  try {
    successResult = runConstruction(testCase.symbol, testCase.successArgs());
  } catch (error) {
    successError = errorSummary(error);
  }
  const successAfter = snapshot(null, successBeforeLen);
  result.successCases.push({
    constructionId: testCase.constructionId,
    input: testCase.successDescription,
    status: successError ? 'UNRESOLVED_SUCCESS_CASE' : 'PASS',
    exception: successError,
    resultType: successResult?.constructor?.name ?? null,
    stateDelta: compareSnapshots(successBefore, successAfter),
  });

  const args = testCase.failureArgs();
  const knownKey = testCase.knownKeyIndex == null ? null : args[testCase.knownKeyIndex];
  const beforeLen = arena.length;
  const before = snapshot(knownKey, beforeLen);
  let thrown = null;
  let returned = false;
  try {
    runConstruction(testCase.symbol, args);
    returned = true;
  } catch (error) {
    thrown = errorSummary(error);
  }
  const after = snapshot(knownKey, beforeLen);
  const comparison = compareSnapshots(before, after);
  const semanticAfter = semanticSanity();
  result.cases.push({
    constructionId: testCase.constructionId,
    failurePath: testCase.failurePath,
    input: testCase.failureDescription,
    expectedThrowObserved: !returned,
    exception: thrown,
    stateBefore: before,
    stateAfter: after,
    equal: comparison.equal,
    differences: comparison.differences,
    firstMismatch: comparison.firstMismatch,
    classification: !returned && !comparison.equal && semanticAfter.match
      ? 'STATE_DIFF_SEMANTICS_SAME'
      : (!returned && comparison.equal && semanticAfter.match ? 'STATE_SAME_SEMANTICS_SAME' : 'REQUIRES_REVIEW'),
    postFailureSemanticChecks: [semanticAfter],
  });
}

const repeatSequence = [];
for (let i = 1; i <= 3; i += 1) {
  const options = { todayProvider: i };
  const beforeLen = arena.length;
  const before = snapshot(options, beforeLen);
  let error = null;
  try {
    new raw.PastafariCalendar(options);
  } catch (caught) {
    error = errorSummary(caught);
  }
  const after = snapshot(options, beforeLen);
  const comparison = compareSnapshots(before, after);
  repeatSequence.push({ iteration: i, beforeArenaLength: beforeLen, afterArenaLength: arena.length, error, comparison });
}
result.repeatedFailureProbe = {
  constructionId: 'CTOR:authoritative:PastafariCalendar',
  count: 3,
  sequence: repeatSequence,
  note: 'Measured only; no linearity is assumed beyond these three observations.',
};

result.baselineSemanticSanityAfter = semanticSanity();
const leaking = result.cases.filter((record) => record.expectedThrowObserved && record.equal === false).length;
const zeroDelta = result.cases.filter((record) => record.expectedThrowObserved && record.equal === true).length;
const unexpectedSuccess = result.cases.filter((record) => !record.expectedThrowObserved).length;
result.summary = {
  testedFailurePaths: result.cases.length,
  leakingFailurePaths: leaking,
  zeroDeltaFailurePaths: zeroDelta,
  unresolvedFailurePaths: unexpectedSuccess,
  successCasesTested: result.successCases.length,
  baselineSemanticsPreservedAfterCampaign: result.baselineSemanticSanityAfter.match,
  STAGE_3_RESULT: leaking > 0 ? 'CONFIRMED_LEAK' : (unexpectedSuccess > 0 ? 'INCONCLUSIVE' : 'NO_LEAK_IN_NATURAL_FAILURES'),
};

const output = JSON.stringify(result, null, 2) + '\n';
if (process.argv.includes('--write')) {
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, output);
}
process.stdout.write(output);
