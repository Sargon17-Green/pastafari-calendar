import fs from 'node:fs';
import crypto from 'node:crypto';

const NativeMap = globalThis.Map;
const NativeWeakMap = globalThis.WeakMap;
const NativeWeakSet = globalThis.WeakSet;
const capturedMaps = [];
const capturedWeakMaps = [];
const capturedWeakSets = [];

globalThis.Map = new Proxy(NativeMap, {
  construct(target, args) {
    const value = Reflect.construct(target, args, target);
    capturedMaps.push(value);
    return value;
  },
});
globalThis.WeakMap = new Proxy(NativeWeakMap, {
  construct(target, args) {
    const value = Reflect.construct(target, args, target);
    capturedWeakMaps.push(value);
    return value;
  },
});
globalThis.WeakSet = new Proxy(NativeWeakSet, {
  construct(target, args) {
    const value = Reflect.construct(target, args, target);
    capturedWeakSets.push(value);
    return value;
  },
});

const pub = await import('../../src/public-api.js');
const raw = await import('../../src/5efdcc3e6fb071cbaffdcb117507a169dd76.js');

globalThis.Map = NativeMap;
globalThis.WeakMap = NativeWeakMap;
globalThis.WeakSet = NativeWeakSet;

const {
  addCacheEpochTraceHookForTests,
  cacheEpochSnapshotForTests,
  installAuthoritativeCacheEpochDetour,
} = await import('../../browser/cache-epoch-detour.js');
const { runtimePatchLedgerSnapshotForTests } = await import('../../browser/runtime-patch-ledger.js');

const baselineArtifact = JSON.parse(fs.readFileSync(new URL('./stage-01-baseline.json', import.meta.url), 'utf8'));
const baselineById = Object.fromEntries(baselineArtifact.canonicalSuccessVectors.map((v) => [v.id, v]));

function errorSummary(error) {
  return { name: error?.name ?? null, message: String(error?.message ?? error) };
}

function stableMapSnapshot() {
  return capturedMaps.map((map, index) => ({ index, size: map.size }));
}

function mapSizeDelta(before, after) {
  const changes = [];
  for (let i = 0; i < Math.max(before.length, after.length); i += 1) {
    const a = before[i]?.size ?? null;
    const b = after[i]?.size ?? null;
    if (a !== b) changes.push({ index: i, before: a, after: b, delta: a == null || b == null ? null : b - a });
  }
  return changes;
}

function weakMembership(key) {
  return capturedWeakMaps.map((map, index) => ({
    index,
    has: map.has(key),
    value: map.has(key) ? map.get(key) : undefined,
  }));
}

function weakSetMembership(key) {
  return capturedWeakSets.map((set, index) => ({ index, has: set.has(key) }));
}

function descriptorSnapshot(target, property) {
  const d = Object.getOwnPropertyDescriptor(target, property);
  if (!d) return { exists: false };
  return {
    exists: true,
    value: d.value,
    get: d.get,
    set: d.set,
    writable: d.writable,
    enumerable: d.enumerable,
    configurable: d.configurable,
  };
}

function descriptorComparison(before, after) {
  return {
    existsEqual: before.exists === after.exists,
    valueIdentityEqual: before.value === after.value,
    getIdentityEqual: before.get === after.get,
    setIdentityEqual: before.set === after.set,
    writableEqual: before.writable === after.writable,
    enumerableEqual: before.enumerable === after.enumerable,
    configurableEqual: before.configurable === after.configurable,
  };
}

function tuple(value) {
  return {
    year: String(value.year),
    cutletName: value.cutletName,
    dayInCutlet: value.dayInCutlet,
    monthName: value.monthName,
    dayInMonth: value.dayInMonth,
  };
}

function expectedTuple(vector) {
  return {
    year: String(vector.expected.year),
    cutletName: vector.expected.cutletName,
    dayInCutlet: vector.expected.dayInCutlet,
    monthName: vector.expected.monthName,
    dayInMonth: vector.expected.dayInMonth,
  };
}

function deepEqualJSON(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function ownState(object) {
  if (!object) return null;
  const result = {};
  for (const key of Reflect.ownKeys(object)) {
    if (typeof key === 'symbol') continue;
    const d = Object.getOwnPropertyDescriptor(object, key);
    let value;
    try { value = object[key]; } catch { value = '<throws>'; }
    result[key] = {
      type: value instanceof NativeMap ? 'Map' : typeof value,
      mapSize: value instanceof NativeMap ? value.size : undefined,
      writable: d?.writable,
      enumerable: d?.enumerable,
      configurable: d?.configurable,
    };
  }
  return result;
}

function injectedPartialFailure(Constructor, args, orderedProperties, throwProperty) {
  let captured = null;
  function TestNewTarget() {}
  TestNewTarget.prototype = Object.create(Constructor.prototype);
  for (const property of orderedProperties) {
    Object.defineProperty(TestNewTarget.prototype, property, {
      configurable: true,
      set(value) {
        if (!captured) captured = this;
        Object.defineProperty(this, property, {
          value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        if (property === throwProperty) throw new Error(`STAGE4D_INJECT_AFTER_${property}`);
      },
    });
  }
  let error = null;
  try {
    Reflect.construct(Constructor, args, TestNewTarget);
  } catch (caught) {
    error = errorSummary(caught);
  }
  return {
    error,
    captured,
    ownState: ownState(captured),
    prototypeIsTestPrototype: captured ? Object.getPrototypeOf(captured) === TestNewTarget.prototype : false,
    identityWeakMaps: captured ? weakMembership(captured) : [],
  };
}

const report = {
  schema: 'pastafari.update8.stage04d.publication-cache.v1',
  stage: '4D',
  generatedAt: new Date().toISOString(),
  revision: {
    repository: 'Sargon17-Green/pastafari-calendar',
    branch: 'main',
    commit: '81cc54b1e15d8f3c0cd9cc8cb41d07f57fdecddf',
    packageVersion: JSON.parse(fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf8')).version,
    workingTree: 'archive snapshot; no .git metadata; analysis-only script/artifacts added locally',
  },
  capturedRuntimeStructures: {
    mapsAtImport: stableMapSnapshot(),
    weakMapCount: capturedWeakMaps.length,
    weakSetCount: capturedWeakSets.length,
  },
  failureCases: [],
  partialPublication: [],
  weakMapWeakSet: {},
  cacheChecks: {},
  identityAndDescriptors: {},
  semantics: {},
};

const rawProtoIdentity = raw.PastafariCalendar.prototype;
const rawGateProtoIdentity = raw.GateIndex.prototype;
const pubProtoIdentity = pub.PastafariCalendar.prototype;
const descriptorBefore = {
  rawConvertJdn: descriptorSnapshot(raw.PastafariCalendar.prototype, 'convertJdn'),
  rawGate: descriptorSnapshot(raw.GateIndex.prototype, 'gate'),
  publicConstructor: descriptorSnapshot(pub.PastafariCalendar.prototype, 'constructor'),
};
const exportedIdentityBefore = {
  GregorianDate: pub.GregorianDate,
  makeSauce: pub.makeSauce,
  STONES: pub.STONES,
  CUTLET_NAMES: pub.CUTLET_NAMES,
  MONTH_NAMES: pub.MONTH_NAMES,
};
const weakSetCalendarBefore = weakSetMembership(raw.PastafariCalendar);
const mapsBeforeFailures = stableMapSnapshot();

const naturalCases = [
  { id: 'GregorianDate_noninteger_month', C: raw.GregorianDate, args: [2026n, 1.25, 22] },
  { id: 'IslamicDate_invalid_variant', C: raw.IslamicDate, args: [1448n, 1, 1, { variant: 'invalid-stage4d' }], keyIndex: 3 },
  { id: 'SolarHijriDate_invalid_variant', C: raw.SolarHijriDate, args: [1405n, 1, 1, { variant: 'invalid-stage4d' }], keyIndex: 3 },
  { id: 'HinduDate_invalid_scheme', C: raw.HinduDate, args: [2083n, 1, 1, { scheme: 'invalid-stage4d' }], keyIndex: 3 },
  { id: 'JapaneseImperialDate_nonstring_era', C: raw.JapaneseImperialDate, args: [123, 1n, 1, 1] },
  { id: 'BahaiDate_invalid_variant', C: raw.BahaiDate, args: [183n, 1, 1, { variant: 'invalid-stage4d' }], keyIndex: 3 },
  { id: 'MonthWeavingCounter_nonpositive_length', C: raw.MonthWeavingCounter, args: [[1, 0, 2]], keyIndex: 0 },
  { id: 'PastafariCalendar_nonfunction_todayProvider', C: raw.PastafariCalendar, args: [{ todayProvider: 123 }], keyIndex: 0 },
];

for (const testCase of naturalCases) {
  const beforeMaps = stableMapSnapshot();
  const key = testCase.keyIndex == null ? null : testCase.args[testCase.keyIndex];
  const beforeWeak = key && (typeof key === 'object' || typeof key === 'function') ? weakMembership(key) : null;
  let error = null;
  let returned = false;
  try {
    Reflect.construct(testCase.C, testCase.args);
    returned = true;
  } catch (caught) {
    error = errorSummary(caught);
  }
  const afterMaps = stableMapSnapshot();
  const afterWeak = key && (typeof key === 'object' || typeof key === 'function') ? weakMembership(key) : null;
  report.failureCases.push({
    id: testCase.id,
    returned,
    error,
    mapSizeChanges: mapSizeDelta(beforeMaps, afterMaps),
    knownKeyWeakMapBefore: beforeWeak,
    knownKeyWeakMapAfter: afterWeak,
  });
}

const mapsAfterNaturalFailures = stableMapSnapshot();
report.cacheChecks.naturalConstructorFailureMapSizeChanges = mapSizeDelta(mapsBeforeFailures, mapsAfterNaturalFailures);

// Identify the generated identity WeakMap from a known failed options object.
const failedCalendarCase = report.failureCases.find((x) => x.id === 'PastafariCalendar_nonfunction_todayProvider');
const identityCandidates = (failedCalendarCase?.knownKeyWeakMapAfter ?? []).filter((x) => x.has);
report.weakMapWeakSet.generatedIdentityMapCandidates = identityCandidates;

// Same-key reuse: the failed key must not get a second identity entry; later valid construction should work.
const reuseOptions = { todayProvider: 0 };
let reuseFirstError = null;
try { new raw.PastafariCalendar(reuseOptions); } catch (caught) { reuseFirstError = errorSummary(caught); }
const reuseAfterFailure = weakMembership(reuseOptions);
reuseOptions.todayProvider = () => new raw.GregorianDate(2026n, 8, 22);
let reuseCalendar = null;
let reuseSecondError = null;
try { reuseCalendar = new raw.PastafariCalendar(reuseOptions); } catch (caught) { reuseSecondError = errorSummary(caught); }
const reuseAfterSuccess = weakMembership(reuseOptions);
report.weakMapWeakSet.sameKeyReuse = {
  firstError: reuseFirstError,
  afterFailure: reuseAfterFailure,
  secondError: reuseSecondError,
  successObjectFields: reuseCalendar ? Object.keys(reuseCalendar) : null,
  afterSuccess: reuseAfterSuccess,
};

// Repeated different failed keys reveal monotonic identity allocation without enumerating WeakMap.
const repeatedIdentity = [];
for (let i = 0; i < 8; i += 1) {
  const key = { todayProvider: i };
  try { new raw.PastafariCalendar(key); } catch {}
  repeatedIdentity.push({ iteration: i + 1, memberships: weakMembership(key).filter((x) => x.has) });
}
report.weakMapWeakSet.repeatedDifferentFailedKeys = repeatedIdentity;

// Inject controlled throws after object-field publication to `this` but before constructor return.
const gregorianPartial = injectedPartialFailure(
  raw.GregorianDate,
  [2026n, 8, 22],
  ['year', 'month', 'day'],
  'month',
);
report.partialPublication.push({
  id: 'GregorianDate_injected_after_month_assignment',
  publicationSite: 'this.year / this.month',
  productionExternalPublication: false,
  error: gregorianPartial.error,
  ownState: gregorianPartial.ownState,
  partialObjectRecordedInWeakMap: gregorianPartial.identityWeakMaps.filter((x) => x.has),
  classification: 'NO_EXTERNAL_PUBLICATION',
});

const calendarOptionsForPartial = { todayProvider: () => new raw.GregorianDate(2026n, 8, 22) };
const calendarPartial = injectedPartialFailure(
  raw.PastafariCalendar,
  [calendarOptionsForPartial],
  ['todayProvider', 'gates', 'anchorCache', 'yearCache', 'structureCache'],
  'structureCache',
);
report.partialPublication.push({
  id: 'PastafariCalendar_injected_after_structureCache_assignment',
  publicationSite: 'instance fields only',
  productionExternalPublication: false,
  error: calendarPartial.error,
  ownState: calendarPartial.ownState,
  partialObjectRecordedInWeakMap: calendarPartial.identityWeakMaps.filter((x) => x.has),
  cacheSizes: calendarPartial.captured ? {
    anchorCache: calendarPartial.captured.anchorCache?.size ?? null,
    yearCache: calendarPartial.captured.yearCache?.size ?? null,
    structureCache: calendarPartial.captured.structureCache?.size ?? null,
  } : null,
  classification: 'NO_EXTERNAL_PUBLICATION',
});

// Constructor failures must not mutate installed WeakSet registries.
report.weakMapWeakSet.constructorRegistry = {
  before: weakSetCalendarBefore,
  after: weakSetMembership(raw.PastafariCalendar),
};

// Post-failure reader validation plus a real cache-population failure on a cold instance.
// The injected setter delegates to the installed cache-epoch writer first, then throws;
// this tests whether the transaction exposes a partial valid cache entry.
const postFailureCalendar = new pub.PastafariCalendar({ todayProvider: () => new pub.GregorianDate(2026n, 8, 22) });
const foundation = baselineById.foundation_same;
const foundationExpected = expectedTuple(foundation);
const cacheBeforeInjectedFailure = cacheEpochSnapshotForTests(postFailureCalendar);
const ledgerBeforeInjectedFailure = runtimePatchLedgerSnapshotForTests(raw.GateIndex.prototype, 'gate');
const gateDescriptorBeforeInjectedFailure = descriptorSnapshot(raw.GateIndex.prototype, 'gate');
let installedStructureSet = null;
let injectedSetCount = 0;
let injectionArmed = false;
const stopInjectionHook = addCacheEpochTraceHookForTests((event) => {
  if (injectionArmed || event?.type !== 'write' || event?.cache !== 'anchorCache') return;
  injectionArmed = true;
  installedStructureSet = postFailureCalendar.structureCache.set;
  postFailureCalendar.structureCache.set = function stage4dInjectedStructureSet(key, value) {
    const result = installedStructureSet.call(this, key, value);
    injectedSetCount += 1;
    throw new Error('STAGE4D_CACHE_POPULATION_AFTER_SET');
  };
});
let realCacheFailure = null;
try {
  postFailureCalendar.convertJdn(BigInt(foundation.input.targetJdn), { calculationJdn: BigInt(foundation.input.calculationJdn) });
} catch (caught) {
  realCacheFailure = errorSummary(caught);
} finally {
  stopInjectionHook();
  if (installedStructureSet) postFailureCalendar.structureCache.set = installedStructureSet;
}
const cacheAfterInjectedFailure = cacheEpochSnapshotForTests(postFailureCalendar);
const ledgerAfterInjectedFailure = runtimePatchLedgerSnapshotForTests(raw.GateIndex.prototype, 'gate');
const gateDescriptorAfterInjectedFailure = descriptorSnapshot(raw.GateIndex.prototype, 'gate');
const foundationAfterFailure = tuple(postFailureCalendar.convertJdn(BigInt(foundation.input.targetJdn), { calculationJdn: BigInt(foundation.input.calculationJdn) }));
report.cacheChecks.realAuthoritativeFailureDuringPopulation = {
  vector: 'foundation_same',
  failure: realCacheFailure,
  injectedSetCount,
  before: cacheBeforeInjectedFailure,
  afterFailure: cacheAfterInjectedFailure,
  sameKeyAfterRestoration: foundationAfterFailure,
  expectedReference: foundationExpected,
  authoritativeEqualsReference: deepEqualJSON(foundationAfterFailure, foundationExpected),
  ledgerBefore: ledgerBeforeInjectedFailure,
  ledgerAfterFailure: ledgerAfterInjectedFailure,
  gateDescriptorRestored: descriptorComparison(gateDescriptorBeforeInjectedFailure, gateDescriptorAfterInjectedFailure),
};
report.semantics.coldFailuresThenSuccess = {
  vector: 'foundation_same',
  precedingFailures: 'natural constructor campaign + injected cache-population failure',
  actual: foundationAfterFailure,
  expectedReference: foundationExpected,
  authoritativeEqualsReference: deepEqualJSON(foundationAfterFailure, foundationExpected),
};

// Warm -> unrelated constructor failure -> the same cached success.
let warmConstructorFailure = null;
try { new raw.PastafariCalendar({ todayProvider: 'still-invalid' }); } catch (caught) { warmConstructorFailure = errorSummary(caught); }
const foundationWarmAfterFailure = tuple(postFailureCalendar.convertJdn(BigInt(foundation.input.targetJdn), { calculationJdn: BigInt(foundation.input.calculationJdn) }));
report.semantics.warmFailureThenSameSuccess = {
  failure: warmConstructorFailure,
  actual: foundationWarmAfterFailure,
  expectedReference: foundationExpected,
  authoritativeEqualsReference: deepEqualJSON(foundationWarmAfterFailure, foundationExpected),
  equalsPreviousSuccess: deepEqualJSON(foundationWarmAfterFailure, foundationAfterFailure),
};

// Generic cache-epoch same-key, different-key, and nested failure checks.
class FakeCalendar {
  constructor() {
    this.anchorCache = new NativeMap();
    this.yearCache = new NativeMap();
    this.structureCache = new NativeMap();
    this.builds = 0;
    this.failKeys = new Set();
  }
  convertJdn(key) {
    if (this.anchorCache.has(key)) return this.anchorCache.get(key);
    this.builds += 1;
    this.anchorCache.set(key, `norm:${key}`);
    if (key === 'outer') this.convertJdn('inner');
    if (this.failKeys.has(key)) throw new Error(`injected:${key}`);
    return this.anchorCache.get(key);
  }
}
installAuthoritativeCacheEpochDetour(FakeCalendar);
const fake = new FakeCalendar();
fake.convertJdn('stable');
const fakeBefore = cacheEpochSnapshotForTests(fake);
fake.failKeys.add('A');
const sameKeyErrors = [];
for (let i = 0; i < 3; i += 1) {
  try { fake.convertJdn('A'); } catch (caught) { sameKeyErrors.push(errorSummary(caught)); }
}
const fakeAfterRepeatedFailure = cacheEpochSnapshotForTests(fake);
fake.failKeys.delete('A');
const sameKeySuccess = fake.convertJdn('A');
const fakeAfterSameKeySuccess = cacheEpochSnapshotForTests(fake);
fake.failKeys.add('C');
let differentKeyFailure = null;
try { fake.convertJdn('C'); } catch (caught) { differentKeyFailure = errorSummary(caught); }
const differentKeySuccess = fake.convertJdn('B');
fake.failKeys.delete('C');
const fakeAfterDifferentKey = cacheEpochSnapshotForTests(fake);
const nested = new FakeCalendar();
nested.failKeys.add('inner');
let nestedFailure = null;
try { nested.convertJdn('outer'); } catch (caught) { nestedFailure = errorSummary(caught); }
const nestedAfterFailure = cacheEpochSnapshotForTests(nested);
nested.failKeys.clear();
const nestedRecoveryOuter = nested.convertJdn('outer');
const nestedRecoveryInner = nested.convertJdn('inner');
const nestedAfterRecovery = cacheEpochSnapshotForTests(nested);
report.cacheChecks.detourTransactionControls = {
  before: fakeBefore,
  sameKeyErrors,
  afterRepeatedSameKeyFailure: fakeAfterRepeatedFailure,
  sameKeySuccess,
  afterSameKeySuccess: fakeAfterSameKeySuccess,
  differentKeyFailure,
  differentKeySuccess,
  afterDifferentKey: fakeAfterDifferentKey,
  nestedFailure,
  nestedAfterFailure,
  nestedRecoveryOuter,
  nestedRecoveryInner,
  nestedAfterRecovery,
};

// Multi-instance publication/isolation: a fresh instance after A's failed population has distinct caches.
const instanceB = new pub.PastafariCalendar({ todayProvider: () => new pub.GregorianDate(2026n, 8, 22) });
report.cacheChecks.multiInstance = {
  instanceAFailureOccurred: Boolean(realCacheFailure),
  instanceBConstructed: true,
  instanceBCacheSizesAtConstruction: {
    anchorCache: instanceB.anchorCache.size,
    yearCache: instanceB.yearCache.size,
    structureCache: instanceB.structureCache.size,
  },
  cacheObjectIdentitySeparate: {
    anchorCache: instanceB.anchorCache !== postFailureCalendar.anchorCache,
    yearCache: instanceB.yearCache !== postFailureCalendar.yearCache,
    structureCache: instanceB.structureCache !== postFailureCalendar.structureCache,
  },
};

const descriptorAfter = {
  rawConvertJdn: descriptorSnapshot(raw.PastafariCalendar.prototype, 'convertJdn'),
  rawGate: descriptorSnapshot(raw.GateIndex.prototype, 'gate'),
  publicConstructor: descriptorSnapshot(pub.PastafariCalendar.prototype, 'constructor'),
};
report.identityAndDescriptors = {
  prototypeIdentity: {
    rawCalendarPrototypeSame: raw.PastafariCalendar.prototype === rawProtoIdentity,
    rawGatePrototypeSame: raw.GateIndex.prototype === rawGateProtoIdentity,
    publicCalendarPrototypeSame: pub.PastafariCalendar.prototype === pubProtoIdentity,
  },
  descriptors: {
    rawConvertJdn: descriptorComparison(descriptorBefore.rawConvertJdn, descriptorAfter.rawConvertJdn),
    rawGate: descriptorComparison(descriptorBefore.rawGate, descriptorAfter.rawGate),
    publicConstructor: descriptorComparison(descriptorBefore.publicConstructor, descriptorAfter.publicConstructor),
  },
  exportedIdentity: {
    GregorianDateSame: pub.GregorianDate === exportedIdentityBefore.GregorianDate,
    makeSauceSame: pub.makeSauce === exportedIdentityBefore.makeSauce,
    STONESSame: pub.STONES === exportedIdentityBefore.STONES,
    CUTLET_NAMESSame: pub.CUTLET_NAMES === exportedIdentityBefore.CUTLET_NAMES,
    MONTH_NAMESSame: pub.MONTH_NAMES === exportedIdentityBefore.MONTH_NAMES,
  },
};

report.cacheChecks.mapSizeChangesAcrossNaturalFailures = mapSizeDelta(mapsBeforeFailures, mapsAfterNaturalFailures);
report.cacheChecks.capturedPersistentMapLabels = {
  5: 'STATE:decoded:combinatorial-memo',
  6: 'STATE:decoded:sauce-lru',
  7: 'STATE:decoded:forward-gap-memo',
  8: 'STATE:decoded:backward-gap-memo',
  note: 'indices identified by isolated controlled success probes in the same snapshot; natural failed-constructor campaign was measured before those probes',
};

function jsonReplacer(_key, value) {
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'function') return `[Function ${value.name || 'anonymous'}]`;
  if (value === undefined) return null;
  return value;
}

const output = JSON.stringify(report, jsonReplacer, 2);
if (process.argv.includes('--write')) {
  const outPath = new URL('../../artifacts/update-08-stage-04d-publication-cache.json', import.meta.url);
  fs.mkdirSync(new URL('../../artifacts/', import.meta.url), { recursive: true });
  fs.writeFileSync(outPath, output + '\n');
  const hash = crypto.createHash('sha256').update(output + '\n').digest('hex');
  console.error(`wrote ${outPath.pathname} sha256=${hash}`);
}
console.log(output);
