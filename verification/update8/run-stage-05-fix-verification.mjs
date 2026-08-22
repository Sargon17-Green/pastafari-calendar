import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const SCRIPT = fileURLToPath(import.meta.url);
const RAW_CORE = path.join(ROOT, "src", "5efdcc3e6fb071cbaffdcb117507a169dd76.js");
const PUBLIC_API = path.join(ROOT, "src", "public-api.js");
const BASELINE_PATH = path.join(ROOT, "verification", "update8", "stage-01-baseline.json");
const OUT_JSON = path.join(ROOT, "artifacts", "update-08-stage-05-fix.json");
const OUT_REPORT = path.join(ROOT, "artifacts", "update-08-stage-05-report.md");
const OUT_SHA = path.join(ROOT, "artifacts", "update-08-stage-05-sha256sums.txt");

const CHECKPOINTS = new Set([0, 1, 2, 3, 10, 100, 1000]);
const MAX_BUFFER = 32 * 1024 * 1024;

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function serialize(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry !== undefined) out[key] = serialize(entry);
    }
    return out;
  }
  return value;
}

function normalizeTuple(result) {
  if (typeof result?.toJSON === "function") return result.toJSON();
  return {
    year: String(result.year),
    cutletName: result.cutletName,
    dayInCutlet: result.dayInCutlet,
    monthName: result.monthName,
    dayInMonth: result.dayInMonth,
  };
}

function summarizeError(error) {
  if (!error) return null;
  return {
    name: error.name ?? null,
    message: String(error.message ?? error),
  };
}

function descriptorSummary(object, property) {
  const d = Object.getOwnPropertyDescriptor(object, property);
  if (!d) return null;
  return {
    hasOwn: true,
    valueType: typeof d.value,
    valueName: typeof d.value === "function" ? d.value.name : null,
    getName: d.get?.name ?? null,
    setName: d.set?.name ?? null,
    writable: d.writable ?? null,
    enumerable: d.enumerable,
    configurable: d.configurable,
  };
}

function cellSignature(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return `Array:${value.length}`;
  if (typeof value === "function") return `Function:${value.name || "<anonymous>"}`;
  if (typeof value === "object") {
    let keys = [];
    try { keys = Reflect.ownKeys(value).slice(0, 8).map(String).sort(); } catch {}
    return `Object:${value.constructor?.name ?? "object"}:${keys.join(",")}`;
  }
  if (typeof value === "bigint") return `bigint:${value}`;
  if (typeof value === "string") return `string:${value.slice(0, 120)}`;
  return `${typeof value}:${String(value)}`;
}

function containsIdentity(value, needle, depth = 2, seen = new Set()) {
  if (value === needle) return true;
  if (depth <= 0 || value === null || (typeof value !== "object" && typeof value !== "function")) return false;
  if (seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) return value.some((entry) => containsIdentity(entry, needle, depth - 1, seen));
  return false;
}

function forceGc() {
  if (typeof global.gc === "function") {
    global.gc();
    global.gc();
  }
}

function memorySnapshot() {
  forceGc();
  const m = process.memoryUsage();
  return {
    rss: m.rss,
    heapTotal: m.heapTotal,
    heapUsed: m.heapUsed,
    external: m.external,
    arrayBuffers: m.arrayBuffers,
    gcAvailable: typeof global.gc === "function",
  };
}

function countHoles(array, start = 0) {
  let holes = 0;
  for (let i = start; i < array.length; i += 1) if (!(i in array)) holes += 1;
  return holes;
}

function loadStagePresence() {
  const dirs = [
    path.join(ROOT, "verification", "update8"),
    path.join(ROOT, "artifacts"),
  ];
  const names = [];
  for (const dir of dirs) {
    try {
      for (const name of fs.readdirSync(dir)) names.push(path.join(path.basename(dir), name));
    } catch {}
  }
  return {
    stage1: names.some((name) => /stage-01/i.test(name)),
    stage2a: names.some((name) => /stage-02a/i.test(name)),
    stage2b: names.some((name) => /stage-02b/i.test(name)),
    stage3: names.some((name) => /stage-0?3|stage03/i.test(name)),
    observedFiles: names.filter((name) => /stage-0?[123]|stage0?[123]/i.test(name)).sort(),
  };
}

async function bootstrapInstrumented() {
  const OriginalFunction = globalThis.Function;
  const originalCtor = OriginalFunction.prototype.constructor;
  const OriginalMap = globalThis.Map;
  const OriginalWeakMap = globalThis.WeakMap;

  let arena = null;
  const capturedMaps = [];
  const capturedWeakMaps = [];

  const FunctionProxy = new Proxy(OriginalFunction, {
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    },
    construct(target, args, newTarget) {
      const patched = [...args];
      const bodyIndex = patched.length - 1;
      // Stage 5: do not coerce the single-use generated source carrier.
      // Instrument only a body that has already become an ordinary string.
      if (bodyIndex >= 1 && typeof patched[bodyIndex] === "string") {
        const body = patched[bodyIndex];
        if (body.length > 7_000_000) {
          const firstParam = String(patched[0]);
          patched[bodyIndex] = body.replace(
            '"use strict";',
            `"use strict";globalThis.__PASTAFARI_STAGE4A_ARENA=${firstParam};`,
          );
        }
      }
      return Reflect.construct(
        target,
        patched,
        newTarget === FunctionProxy ? target : newTarget,
      );
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

  let raw;
  let published;
  try {
    globalThis.__PASTAFARI_STAGE4A_ARENA = null;
    globalThis.Function = FunctionProxy;
    OriginalFunction.prototype.constructor = FunctionProxy;
    globalThis.Map = MapProxy;
    globalThis.WeakMap = WeakMapProxy;

    // No query string: src/public-api.js must reuse this same instrumented raw module.
    raw = await import(pathToFileURL(RAW_CORE).href);
    published = await import(pathToFileURL(PUBLIC_API).href);
    arena = globalThis.__PASTAFARI_STAGE4A_ARENA;
  } finally {
    globalThis.Function = OriginalFunction;
    OriginalFunction.prototype.constructor = originalCtor;
    globalThis.Map = OriginalMap;
    globalThis.WeakMap = OriginalWeakMap;
  }

  if (!Array.isArray(arena)) throw new Error("Stage 4A failed to capture authoritative shared invocation arena");

  const identityBaseline = {
    constructors: {
      GregorianDate: raw.GregorianDate,
      IslamicDate: raw.IslamicDate,
      HinduDate: raw.HinduDate,
      BahaiDate: raw.BahaiDate,
      SolarHijriDate: raw.SolarHijriDate,
      JapaneseImperialDate: raw.JapaneseImperialDate,
      MonthWeavingCounter: raw.MonthWeavingCounter,
      PastafariCalendar: raw.PastafariCalendar,
    },
    prototypes: {
      GregorianDate: raw.GregorianDate.prototype,
      PastafariCalendar: raw.PastafariCalendar.prototype,
    },
    rawConvertJdn: Object.getOwnPropertyDescriptor(raw.PastafariCalendar.prototype, "convertJdn"),
  };

  function identitiesRestored() {
    const current = Object.getOwnPropertyDescriptor(raw.PastafariCalendar.prototype, "convertJdn");
    return (
      raw.GregorianDate === identityBaseline.constructors.GregorianDate &&
      raw.IslamicDate === identityBaseline.constructors.IslamicDate &&
      raw.HinduDate === identityBaseline.constructors.HinduDate &&
      raw.BahaiDate === identityBaseline.constructors.BahaiDate &&
      raw.SolarHijriDate === identityBaseline.constructors.SolarHijriDate &&
      raw.JapaneseImperialDate === identityBaseline.constructors.JapaneseImperialDate &&
      raw.MonthWeavingCounter === identityBaseline.constructors.MonthWeavingCounter &&
      raw.PastafariCalendar === identityBaseline.constructors.PastafariCalendar &&
      raw.GregorianDate.prototype === identityBaseline.prototypes.GregorianDate &&
      raw.PastafariCalendar.prototype === identityBaseline.prototypes.PastafariCalendar &&
      current?.value === identityBaseline.rawConvertJdn?.value &&
      current?.get === identityBaseline.rawConvertJdn?.get &&
      current?.set === identityBaseline.rawConvertJdn?.set &&
      current?.writable === identityBaseline.rawConvertJdn?.writable &&
      current?.enumerable === identityBaseline.rawConvertJdn?.enumerable &&
      current?.configurable === identityBaseline.rawConvertJdn?.configurable
    );
  }

  function weakKnownSnapshot(key) {
    if (!key || (typeof key !== "object" && typeof key !== "function")) return [];
    return capturedWeakMaps.map((map, index) => {
      let has = false;
      let value = null;
      try {
        has = map.has(key);
        if (has) value = cellSignature(map.get(key));
      } catch {}
      return { index, has, value };
    });
  }

  function snapshot({ baselineLength = arena.length, knownKey = null, includeMemory = false } = {}) {
    const tail = arena.slice(baselineLength);
    const tailSignatures = tail.map(cellSignature);
    return {
      arenaLength: arena.length,
      arenaDeltaFromBaseline: arena.length - baselineLength,
      arenaHoles: countHoles(arena),
      retainedTailLength: tail.length,
      retainedTailHoles: countHoles(arena, baselineLength),
      retainedTailFingerprint: sha256(JSON.stringify(tailSignatures)),
      retainedTailHead: tailSignatures.slice(0, 16),
      knownKeyReachableFromTailDepth2: knownKey
        ? tail.some((entry) => containsIdentity(entry, knownKey, 2))
        : null,
      maps: capturedMaps.map((map, index) => ({ index, size: map.size })),
      weakKnown: weakKnownSnapshot(knownKey),
      identitiesRestored: identitiesRestored(),
      descriptors: {
        rawConvertJdn: descriptorSummary(raw.PastafariCalendar.prototype, "convertJdn"),
      },
      memory: includeMemory ? memorySnapshot() : null,
    };
  }

  return {
    raw,
    published,
    arena,
    capturedMaps,
    capturedWeakMaps,
    snapshot,
    identitiesRestored,
  };
}

function failureDefinitions(raw) {
  const stablePastafariOptions = { todayProvider: 123 };
  const stableIslamicOptions = { variant: "invalid-stage4a" };
  const stableHinduOptions = { scheme: "invalid-stage4a" };
  const stableBahaiOptions = { variant: "invalid-stage4a" };
  const stableSolarOptions = { variant: "invalid-stage4a" };
  const stableMonthLengths = [1, 0, 2];

  return [
    {
      id: "F_BAHAI_INVALID_VARIANT",
      constructionId: "CTOR:authoritative:BahaiDate",
      input: ["183n", 1, 1, { variant: "invalid-stage4a" }],
      run: () => new raw.BahaiDate(183n, 1, 1, stableBahaiOptions),
      knownKey: stableBahaiOptions,
      expectedException: {
        name: "RangeError",
        message: 'variant של הלוח הבהאי חייב להיות "tehran-equinox" או "western-arithmetic"',
      },
    },
    {
      id: "F_GREGORIAN_NONINTEGER_MONTH",
      constructionId: "CTOR:authoritative:GregorianDate",
      input: ["2026n", 1.25, 22],
      run: () => new raw.GregorianDate(2026n, 1.25, 22),
      knownKey: null,
      expectedException: {
        name: "TypeError",
        message: "החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים",
      },
    },
    {
      id: "F_HINDU_INVALID_SCHEME",
      constructionId: "CTOR:authoritative:HinduDate",
      input: ["1948n", 1, 1, { scheme: "invalid-stage4a" }],
      run: () => new raw.HinduDate(1948n, 1, 1, stableHinduOptions),
      knownKey: stableHinduOptions,
      expectedException: {
        name: "RangeError",
        message: 'אין לוח הינדי יחיד; scheme חייב להיות "old-solar" או "old-lunar"',
      },
    },
    {
      id: "F_ISLAMIC_INVALID_VARIANT",
      constructionId: "CTOR:authoritative:IslamicDate",
      input: ["1448n", 1, 1, { variant: "invalid-stage4a" }],
      run: () => new raw.IslamicDate(1448n, 1, 1, stableIslamicOptions),
      knownKey: stableIslamicOptions,
      expectedException: {
        name: "RangeError",
        message: 'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"',
      },
    },
    {
      id: "F_JAPANESE_NONSTRING_ERA",
      constructionId: "CTOR:authoritative:JapaneseImperialDate",
      input: [123, "8n", 1, 1],
      run: () => new raw.JapaneseImperialDate(123, 8n, 1, 1),
      knownKey: null,
      expectedException: {
        name: "TypeError",
        message: "שם התקופה היפנית חייב להיות מחרוזת",
      },
    },
    {
      id: "F_MONTH_WEAVING_NONPOSITIVE",
      constructionId: "CTOR:authoritative:MonthWeavingCounter",
      input: [[1, 0, 2]],
      run: () => new raw.MonthWeavingCounter(stableMonthLengths),
      knownKey: stableMonthLengths,
      expectedException: {
        name: "RangeError",
        message: "אורכי החודשים חייבים להיות חיוביים",
      },
    },
    {
      id: "F_PASTAFARI_INVALID_TODAY_PROVIDER",
      constructionId: "CTOR:authoritative:PastafariCalendar",
      input: [{ todayProvider: 123 }],
      run: () => new raw.PastafariCalendar(stablePastafariOptions),
      knownKey: stablePastafariOptions,
      expectedException: {
        name: "TypeError",
        message: "todayProvider חייב להיות פונקציה",
      },
    },
    {
      id: "F_SOLAR_HIJRI_INVALID_VARIANT",
      constructionId: "CTOR:authoritative:SolarHijriDate",
      input: ["1405n", 1, 1, { variant: "invalid-stage4a" }],
      run: () => new raw.SolarHijriDate(1405n, 1, 1, stableSolarOptions),
      knownKey: stableSolarOptions,
      expectedException: {
        name: "RangeError",
        message: 'variant של הלוח ההיג׳רי השמשי חייב להיות "official" או "arithmetic-2820"',
      },
    },
    {
      id: "F_RAW_PASTAFARI_DEFAULT",
      constructionId: "CTOR:authoritative:PastafariCalendar:raw-default",
      input: [],
      run: () => new raw.PastafariCalendar(),
      knownKey: null,
      expectedException: { name: "ReferenceError", messageIncludes: "localToday" },
      conditionalConfirmedPath: true,
    },
  ];
}

function executeFailure(definition) {
  try {
    definition.run();
    return { threw: false, exception: null };
  } catch (error) {
    return { threw: true, exception: summarizeError(error) };
  }
}

function exceptionMatches(observed, expected) {
  if (!observed?.threw || observed.exception?.name !== expected.name) return false;
  if (typeof expected.message === "string") return observed.exception?.message === expected.message;
  if (typeof expected.messageIncludes === "string") return observed.exception?.message?.includes(expected.messageIncludes);
  return true;
}

function mapDeltas(before, after) {
  const result = [];
  const max = Math.max(before.maps.length, after.maps.length);
  for (let i = 0; i < max; i += 1) {
    const b = before.maps[i]?.size ?? null;
    const a = after.maps[i]?.size ?? null;
    if (b !== a) result.push({ index: i, before: b, after: a, delta: b === null || a === null ? null : a - b });
  }
  return result;
}

function weakDeltas(before, after) {
  const result = [];
  const max = Math.max(before.weakKnown.length, after.weakKnown.length);
  for (let i = 0; i < max; i += 1) {
    const b = before.weakKnown[i] ?? null;
    const a = after.weakKnown[i] ?? null;
    if (JSON.stringify(b) !== JSON.stringify(a)) result.push({ index: i, before: b, after: a });
  }
  return result;
}

function stateDiff(before, after) {
  return {
    arenaDelta: after.arenaLength - before.arenaLength,
    holesDelta: after.arenaHoles - before.arenaHoles,
    mapDeltas: mapDeltas(before, after),
    weakKnownDeltas: weakDeltas(before, after),
    identitiesRestored: after.identitiesRestored,
    descriptorStable: JSON.stringify(before.descriptors) === JSON.stringify(after.descriptors),
  };
}

function semanticStateStable(diff) {
  return (
    diff.arenaDelta === 0 &&
    diff.holesDelta === 0 &&
    diff.mapDeltas.length === 0 &&
    diff.weakKnownDeltas.length === 0 &&
    diff.identitiesRestored &&
    diff.descriptorStable
  );
}

function classify(stateStable, semanticsStable) {
  if (stateStable && semanticsStable) return "STATE_STABLE_SEMANTICS_STABLE";
  if (!stateStable && semanticsStable) return "STATE_DRIFT_SEMANTICS_STABLE";
  if (!stateStable && !semanticsStable) return "STATE_DRIFT_SEMANTICS_DRIFT";
  if (stateStable && !semanticsStable) return "STATE_STABLE_SEMANTICS_DRIFT";
  return "INCONCLUSIVE";
}

function loadCanonicalVectors() {
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  return baseline.canonicalSuccessVectors
    .filter((vector) => vector.status === "PASS")
    .map((vector) => ({
      id: vector.id,
      input: vector.input,
      expected: vector.expected,
    }));
}

function canonicalSubset() {
  const all = loadCanonicalVectors();
  const wanted = new Set([
    "foundation_same",
    "foundation_next",
    "foundation_previous",
    "present_same",
    "present_forward",
  ]);
  return all.filter((vector) => wanted.has(vector.id));
}

function runSuccessVector(published, vector) {
  const calendar = new published.PastafariCalendar({ todayProvider: () => null });
  let result = null;
  let error = null;
  try {
    result = normalizeTuple(calendar.convertJdn(
      BigInt(vector.input.targetJdn),
      { calculationJdn: BigInt(vector.input.calculationJdn) },
    ));
  } catch (caught) {
    error = summarizeError(caught);
  }
  const matchesReference = !error && JSON.stringify(result) === JSON.stringify(vector.expected);
  return {
    id: vector.id,
    input: vector.input,
    expected: vector.expected,
    actual: result,
    error,
    matchesReference,
  };
}

async function childSanity() {
  const env = await bootstrapInstrumented();
  const vectors = canonicalSubset().slice(0, 3);
  const before = env.snapshot({ includeMemory: true });
  const results = vectors.map((vector) => runSuccessVector(env.published, vector));
  const after = env.snapshot({ baselineLength: before.arenaLength, includeMemory: true });
  return {
    kind: "sanity",
    vectors: results,
    allMatch: results.every((item) => item.matchesReference),
    stateDiff: stateDiff(before, after),
  };
}

async function childRepeated(payload) {
  const env = await bootstrapInstrumented();
  const definition = failureDefinitions(env.raw).find((entry) => entry.id === payload.failureId);
  if (!definition) throw new Error(`unknown failure path: ${payload.failureId}`);

  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, knownKey: definition.knownKey, includeMemory: true });
  const checkpoints = [{ n: 0, snapshot: baseline, exception: null }];
  const signatures = new Map();
  let firstExceptionChange = null;
  let previousExceptionSignature = null;
  let expectedContractMatches = true;

  for (let i = 1; i <= 1000; i += 1) {
    const observed = executeFailure(definition);
    const signature = observed.threw
      ? `${observed.exception.name}\u0000${observed.exception.message}`
      : "<NO_THROW>";
    signatures.set(signature, (signatures.get(signature) ?? 0) + 1);
    if (previousExceptionSignature !== null && signature !== previousExceptionSignature && firstExceptionChange === null) {
      firstExceptionChange = { operationIndex: i, before: previousExceptionSignature, after: signature };
    }
    previousExceptionSignature = signature;
    expectedContractMatches &&= exceptionMatches(observed, definition.expectedException);

    if (CHECKPOINTS.has(i)) {
      checkpoints.push({
        n: i,
        snapshot: env.snapshot({
          baselineLength,
          knownKey: definition.knownKey,
          includeMemory: i === 100 || i === 1000,
        }),
        exception: observed,
      });
    }
  }

  const increments = [];
  for (let i = 1; i < checkpoints.length; i += 1) {
    increments.push({
      from: checkpoints[i - 1].n,
      to: checkpoints[i].n,
      arenaIncrement: checkpoints[i].snapshot.arenaLength - checkpoints[i - 1].snapshot.arenaLength,
      perCallAverage: (
        (checkpoints[i].snapshot.arenaLength - checkpoints[i - 1].snapshot.arenaLength) /
        (checkpoints[i].n - checkpoints[i - 1].n)
      ),
    });
  }

  const final = checkpoints.at(-1).snapshot;
  const diff = stateDiff(baseline, final);
  const exceptionStable = signatures.size === 1 && expectedContractMatches;

  return {
    kind: "repeated",
    failureId: definition.id,
    constructionId: definition.constructionId,
    input: definition.input,
    conditionalConfirmedPath: Boolean(definition.conditionalConfirmedPath),
    expectedException: definition.expectedException,
    baseline,
    checkpoints,
    increments,
    netDelta: diff,
    firstFailureSpecialCase: {
      firstArenaDelta: checkpoints.find((x) => x.n === 1).snapshot.arenaLength - baseline.arenaLength,
      secondArenaIncrement:
        checkpoints.find((x) => x.n === 2).snapshot.arenaLength -
        checkpoints.find((x) => x.n === 1).snapshot.arenaLength,
      firstWeakKnownChanges: weakDeltas(baseline, checkpoints.find((x) => x.n === 1).snapshot),
      secondWeakKnownChanges: weakDeltas(
        checkpoints.find((x) => x.n === 1).snapshot,
        checkpoints.find((x) => x.n === 2).snapshot,
      ),
    },
    exceptionStability: {
      stable: exceptionStable,
      uniqueSignatures: [...signatures.entries()].map(([signature, count]) => ({ signature, count })),
      firstChange: firstExceptionChange,
      expectedContractMatches,
    },
    classification: classify(semanticStateStable(diff), exceptionStable),
  };
}

async function childAlternating(payload) {
  const env = await bootstrapInstrumented();
  const defs = failureDefinitions(env.raw);
  const f1 = defs.find((entry) => entry.id === payload.failureIds[0]);
  const f2 = defs.find((entry) => entry.id === payload.failureIds[1]);
  const vector = canonicalSubset().find((entry) => entry.id === payload.vectorId);
  if (!f1 || !f2 || !vector) throw new Error("alternating payload is invalid");

  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, includeMemory: true });
  const operations = [];

  function success(label) {
    const before = env.snapshot({ baselineLength });
    const result = runSuccessVector(env.published, vector);
    const after = env.snapshot({ baselineLength });
    operations.push({ label, type: "SUCCESS", result, stateDiff: stateDiff(before, after), snapshot: after });
  }
  function fail(label, def) {
    const before = env.snapshot({ baselineLength, knownKey: def.knownKey });
    const result = executeFailure(def);
    const after = env.snapshot({ baselineLength, knownKey: def.knownKey });
    operations.push({ label, type: "FAIL", failureId: def.id, result, stateDiff: stateDiff(before, after), snapshot: after });
  }

  success("S1");
  fail("F1", f1);
  success("S2");
  fail("F2", f2);
  success("S3");

  const final = env.snapshot({ baselineLength, includeMemory: true });
  const successesStable = operations.filter((x) => x.type === "SUCCESS").every((x) => x.result.matchesReference);
  const failuresStable = operations.filter((x) => x.type === "FAIL").every((x) => x.result.threw);
  const diff = stateDiff(baseline, final);

  return {
    kind: "alternating",
    vectorId: vector.id,
    failureIds: payload.failureIds,
    operations,
    final,
    finalDiff: diff,
    successesStable,
    failuresStable,
    classification: classify(semanticStateStable(diff), successesStable && failuresStable),
  };
}

async function childAFailA(payload) {
  const env = await bootstrapInstrumented();
  const def = failureDefinitions(env.raw).find((entry) => entry.id === payload.failureId);
  if (!def) throw new Error(`unknown failure path: ${payload.failureId}`);
  const vectors = canonicalSubset();

  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  const cases = [];

  for (const vector of vectors) {
    const beforeA1 = env.snapshot({ baselineLength, knownKey: def.knownKey });
    const a1 = runSuccessVector(env.published, vector);
    const afterA1 = env.snapshot({ baselineLength, knownKey: def.knownKey });

    const failure = executeFailure(def);
    const afterFailure = env.snapshot({ baselineLength, knownKey: def.knownKey });

    const a2 = runSuccessVector(env.published, vector);
    const afterA2 = env.snapshot({ baselineLength, knownKey: def.knownKey });

    cases.push({
      vectorId: vector.id,
      A1: a1,
      failure,
      A2: a2,
      a1EqualsA2: JSON.stringify(a1.actual) === JSON.stringify(a2.actual),
      bothEqualReference: a1.matchesReference && a2.matchesReference,
      snapshots: { beforeA1, afterA1, afterFailure, afterA2 },
      failureDiff: stateDiff(afterA1, afterFailure),
      A2Diff: stateDiff(afterFailure, afterA2),
    });
  }

  const final = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  const semanticsStable = cases.every((entry) => entry.bothEqualReference && entry.a1EqualsA2 && entry.failure.threw);
  const diff = stateDiff(baseline, final);
  return {
    kind: "a_fail_a",
    failureId: def.id,
    cases,
    final,
    finalDiff: diff,
    semanticsStable,
    classification: classify(semanticStateStable(diff), semanticsStable),
  };
}

async function childFreshComparison(payload) {
  const env = await bootstrapInstrumented();
  const vector = canonicalSubset().find((entry) => entry.id === payload.vectorId);
  const def = failureDefinitions(env.raw).find((entry) => entry.id === payload.failureId);
  if (!vector || !def) throw new Error("fresh comparison payload invalid");

  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  let failure = null;
  if (payload.withFailure) failure = executeFailure(def);
  const beforeSuccess = env.snapshot({ baselineLength, knownKey: def.knownKey });
  const success = runSuccessVector(env.published, vector);
  const final = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });

  return {
    kind: "fresh_comparison",
    vectorId: vector.id,
    failureId: def.id,
    withFailure: payload.withFailure,
    baseline,
    failure,
    beforeSuccess,
    success,
    final,
    finalDiff: stateDiff(baseline, final),
  };
}

async function childFailuresThenSuccess(payload) {
  const env = await bootstrapInstrumented();
  const vector = canonicalSubset().find((entry) => entry.id === payload.vectorId);
  const def = failureDefinitions(env.raw).find((entry) => entry.id === payload.failureId);
  if (!vector || !def) throw new Error("failures-then-success payload invalid");

  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  const signatures = [];
  for (let i = 0; i < payload.count; i += 1) {
    const observed = executeFailure(def);
    signatures.push(observed.threw ? `${observed.exception.name}\u0000${observed.exception.message}` : "<NO_THROW>");
  }
  const afterFailures = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  const success = runSuccessVector(env.published, vector);
  const final = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  return {
    kind: "failures_then_success",
    count: payload.count,
    failureId: def.id,
    vectorId: vector.id,
    baseline,
    afterFailures,
    success,
    final,
    failureArenaDelta: afterFailures.arenaLength - baseline.arenaLength,
    exceptionStable: new Set(signatures).size === 1,
    successMatchesReference: success.matchesReference,
    finalDiff: stateDiff(baseline, final),
  };
}

async function childPermutation(payload) {
  const env = await bootstrapInstrumented();
  const defs = new Map(failureDefinitions(env.raw).map((entry) => [entry.id, entry]));
  const vector = canonicalSubset().find((entry) => entry.id === (payload.vectorId ?? "foundation_same"));
  if (!vector) throw new Error(`unknown permutation success vector: ${payload.vectorId}`);
  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, includeMemory: true });
  const steps = [];
  for (let i = 0; i < payload.sequence.length; i += 1) {
    const def = defs.get(payload.sequence[i]);
    if (!def) throw new Error(`unknown permutation failure: ${payload.sequence[i]}`);
    const before = env.snapshot({ baselineLength, knownKey: def.knownKey });
    const result = executeFailure(def);
    const after = env.snapshot({ baselineLength, knownKey: def.knownKey });
    steps.push({
      operationIndex: i + 1,
      failureId: def.id,
      input: def.input,
      result,
      expectedContractMatches: exceptionMatches(result, def.expectedException),
      diff: stateDiff(before, after),
      normalizedState: {
        arenaDeltaFromBaseline: after.arenaDeltaFromBaseline,
        retainedTailLength: after.retainedTailLength,
        retainedTailHoles: after.retainedTailHoles,
        retainedTailFingerprint: after.retainedTailFingerprint,
        mapSizes: after.maps.map((entry) => entry.size),
        identitiesRestored: after.identitiesRestored,
      },
    });
  }
  const afterFailures = env.snapshot({ baselineLength, includeMemory: true });
  const success = runSuccessVector(env.published, vector);
  const final = env.snapshot({ baselineLength, includeMemory: true });
  const allThrow = steps.every((entry) => entry.result.threw);
  const allExpectedContracts = steps.every((entry) => entry.expectedContractMatches);
  const semanticsStable = allExpectedContracts && success.matchesReference;
  return {
    kind: "permutation",
    id: payload.id,
    sequence: payload.sequence,
    vectorId: vector.id,
    baseline,
    steps,
    afterFailures,
    successAfterSequence: success,
    final,
    finalDiff: stateDiff(baseline, final),
    allThrow,
    allExpectedContracts,
    semanticsStable,
    classification: classify(semanticStateStable(stateDiff(baseline, final)), semanticsStable),
  };
}

async function childSuccessSoak(payload) {
  const env = await bootstrapInstrumented();
  const def = failureDefinitions(env.raw).find((entry) => entry.id === payload.failureId);
  if (!def) throw new Error(`unknown failure path: ${payload.failureId}`);
  const vectors = canonicalSubset();

  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  const exceptions = [];
  for (let i = 0; i < payload.count; i += 1) {
    const result = executeFailure(def);
    exceptions.push(result.threw ? `${result.exception.name}\u0000${result.exception.message}` : "<NO_THROW>");
  }
  const afterFailures = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  const successes = [];
  const successRounds = payload.successRounds ?? 3;
  for (let round = 0; round < successRounds; round += 1) {
    for (const vector of vectors) successes.push({ round: round + 1, ...runSuccessVector(env.published, vector) });
  }
  const final = env.snapshot({ baselineLength, knownKey: def.knownKey, includeMemory: true });
  return {
    kind: "success_soak",
    failureId: def.id,
    count: payload.count,
    successRounds,
    baseline,
    afterFailures,
    successes,
    allSuccessesMatchReference: successes.every((entry) => entry.matchesReference),
    exceptionStable: new Set(exceptions).size === 1 && exceptions.every((signature) => !signature.startsWith("<NO_THROW>")),
    final,
    finalDiff: stateDiff(baseline, final),
  };
}

async function childZeroDeltaControl() {
  const env = await bootstrapInstrumented();
  const baselineLength = env.arena.length;
  const baseline = env.snapshot({ baselineLength, includeMemory: true });
  const checkpoints = [{ n: 0, snapshot: baseline }];
  let error = null;
  for (let i = 1; i <= 1000; i += 1) {
    try {
      new env.raw.GregorianDate(2026n, 8, 22);
    } catch (caught) {
      error = summarizeError(caught);
      break;
    }
    if (CHECKPOINTS.has(i)) {
      checkpoints.push({
        n: i,
        snapshot: env.snapshot({ baselineLength, includeMemory: i === 100 || i === 1000 }),
      });
    }
  }
  const final = env.snapshot({ baselineLength, includeMemory: true });
  const diff = stateDiff(baseline, final);
  return {
    kind: "zero_delta_control",
    id: "CONTROL_VALID_GREGORIAN_CONSTRUCTION",
    input: ["2026n", 8, 22],
    count: 1000,
    error,
    baseline,
    checkpoints,
    final,
    finalDiff: diff,
    passed: error === null && diff.arenaDelta === 0 && diff.mapDeltas.length === 0 && diff.identitiesRestored,
  };
}

async function runChild(kind, payload) {
  if (kind === "sanity") return childSanity();
  if (kind === "repeated") return childRepeated(payload);
  if (kind === "alternating") return childAlternating(payload);
  if (kind === "a_fail_a") return childAFailA(payload);
  if (kind === "fresh_comparison") return childFreshComparison(payload);
  if (kind === "failures_then_success") return childFailuresThenSuccess(payload);
  if (kind === "permutation") return childPermutation(payload);
  if (kind === "success_soak") return childSuccessSoak(payload);
  if (kind === "zero_delta_control") return childZeroDeltaControl(payload);
  throw new Error(`unknown child kind: ${kind}`);
}

function spawnChild(kind, payload = {}) {
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const child = spawnSync(
    process.execPath,
    ["--expose-gc", SCRIPT, "--child", kind, encoded],
    {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: MAX_BUFFER,
      env: { ...process.env, PASTAFARI_STAGE5_CHILD: "1" },
    },
  );
  if (child.status !== 0) {
    throw new Error(
      `child ${kind} failed with status ${child.status}\nSTDOUT:\n${child.stdout}\nSTDERR:\n${child.stderr}`,
    );
  }
  const marker = "__STAGE5_CHILD_JSON__";
  const line = child.stdout.split(/\r?\n/).find((entry) => entry.startsWith(marker));
  if (!line) throw new Error(`child ${kind} produced no JSON marker\n${child.stdout}`);
  return JSON.parse(line.slice(marker.length));
}

function firstPermutationDivergence(a, b) {
  const count = Math.min(a.steps.length, b.steps.length);
  for (let i = 0; i < count; i += 1) {
    const left = a.steps[i].normalizedState;
    const right = b.steps[i].normalizedState;
    if (JSON.stringify(left) !== JSON.stringify(right)) {
      return {
        operationIndex: i + 1,
        leftOperation: a.steps[i].failureId,
        rightOperation: b.steps[i].failureId,
        leftState: left,
        rightState: right,
      };
    }
  }
  if (a.steps.length !== b.steps.length) return { operationIndex: count + 1, reason: "sequence length differs" };
  return null;
}

function gitRevision() {
  const run = (args) => spawnSync("git", args, { cwd: ROOT, encoding: "utf8" });
  const sha = run(["rev-parse", "HEAD"]);
  const branch = run(["rev-parse", "--abbrev-ref", "HEAD"]);
  const status = run(["status", "--porcelain=v1"]);
  return {
    commit: sha.status === 0 ? sha.stdout.trim() : process.env.GITHUB_SHA ?? null,
    branch: branch.status === 0 ? branch.stdout.trim() : process.env.GITHUB_REF_NAME ?? null,
    workingTree: status.status === 0 ? (status.stdout.trim() || "clean") : "unavailable",
  };
}

function productionAlignment() {
  const inventoryPath = path.join(ROOT, "verification", "update8", "stage-02b-shared-state-inventory.json");
  const result = {
    source: "verification/update8/stage-02b-shared-state-inventory.json",
    available: false,
    files: [],
    allMatches: false,
  };
  try {
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
    const expected = inventory?.snapshot?.productionHashes ?? {};
    result.available = Object.keys(expected).length > 0;
    result.files = Object.entries(expected).map(([relativePath, expectedSha256]) => {
      const absolute = path.join(ROOT, relativePath);
      const actualSha256 = fs.existsSync(absolute) ? sha256(fs.readFileSync(absolute)) : null;
      return { relativePath, expectedSha256, actualSha256, matches: actualSha256 === expectedSha256 };
    });
    result.allMatches = result.available && result.files.every((entry) => entry.matches);
  } catch (error) {
    result.error = summarizeError(error);
  }
  return result;
}

function packageVersion() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
}

function makeReport(artifact) {
  const lines = [];
  lines.push("# Update 8 — Stage 4A: Repeated failures, history dependence and construction order");
  lines.push("");
  lines.push("## A. Revision");
  lines.push("");
  lines.push(`- repository: \`${artifact.revision.repository}\``);
  lines.push(`- branch: \`${artifact.revision.branch}\``);
  lines.push(`- commit: \`${artifact.revision.commit}\``);
  lines.push(`- package version: \`${artifact.revision.packageVersion}\``);
  lines.push(`- working tree at runner start: \`${artifact.revision.workingTree}\``);
  lines.push("");
  lines.push("## B. Alignment");
  lines.push("");
  lines.push(`- Stage 1 present: ${artifact.alignment.stagePresence.stage1}`);
  lines.push(`- Stage 2A present: ${artifact.alignment.stagePresence.stage2a}`);
  lines.push(`- Stage 2B present: ${artifact.alignment.stagePresence.stage2b}`);
  lines.push(`- Stage 3 artifact present: ${artifact.alignment.stagePresence.stage3}`);
  lines.push(`- focused revalidation performed: ${artifact.alignment.focusedRevalidationPerformed}`);
  lines.push("- snapshot schema basis: Stage 2B + committed Stage 4C/4D instrumentation contract.");
  lines.push("");
  lines.push("## C. Sanity");
  lines.push("");
  for (const v of artifact.sanity.vectors) lines.push(`- ${v.id}: ${v.matchesReference ? "PASS" : "FAIL"}`);
  lines.push("");
  lines.push("## D. Repeated natural failures");
  lines.push("");
  lines.push("| Path | Δ after 1 | Δ after 10 | Δ after 100 | Δ after 1000 | Exception stable | Classification |");
  lines.push("|---|---:|---:|---:|---:|---|---|");
  for (const item of artifact.repeatedFailures) {
    const cp = new Map(item.checkpoints.map((entry) => [entry.n, entry.snapshot.arenaDeltaFromBaseline]));
    lines.push(`| ${item.failureId} | ${cp.get(1)} | ${cp.get(10)} | ${cp.get(100)} | ${cp.get(1000)} | ${item.exceptionStability.stable} | ${item.classification} |`);
  }
  lines.push("");
  lines.push("## E. Alternating success/failure");
  lines.push("");
  lines.push(`- successes remain reference-equal: ${artifact.alternating.successesStable}`);
  lines.push(`- failures continued to throw: ${artifact.alternating.failuresStable}`);
  lines.push(`- classification: ${artifact.alternating.classification}`);
  lines.push("");
  lines.push("## F. A → FAIL → A");
  lines.push("");
  for (const c of artifact.aFailA.cases) lines.push(`- ${c.vectorId}: A1==A2==reference = ${c.bothEqualReference && c.a1EqualsA2}`);
  lines.push("");
  lines.push("## G. Failure-count thresholds before success");
  lines.push("");
  for (const c of artifact.failuresThenSuccess) {
    lines.push(`- FAIL×${c.count} → ${c.vectorId}: reference=${c.successMatchesReference}; arena Δ=${c.failureArenaDelta}; exception stable=${c.exceptionStable}`);
  }
  lines.push("");
  lines.push("## H. Same multiset, different order");
  lines.push("");
  for (const pair of artifact.permutationComparisons) {
    lines.push(`- ${pair.left} vs ${pair.right}: finalNormalizedEqual=${pair.finalNormalizedEqual}; firstDivergence=${pair.firstDivergence?.operationIndex ?? "none"}`);
  }
  lines.push("");
  lines.push("## I. Memory / boundedness");
  lines.push("");
  lines.push("- Heap measurements are recorded but treated as noisy; structural arena growth is the primary boundedness evidence.");
  for (const item of artifact.repeatedFailures) {
    const cp100 = item.checkpoints.find((entry) => entry.n === 100)?.snapshot;
    const cp1000 = item.checkpoints.find((entry) => entry.n === 1000)?.snapshot;
    lines.push(`- ${item.failureId}: arena Δ 100=${cp100?.arenaDeltaFromBaseline}; 1000=${cp1000?.arenaDeltaFromBaseline}; heapUsed100=${cp100?.memory?.heapUsed ?? "n/a"}; heapUsed1000=${cp1000?.memory?.heapUsed ?? "n/a"}`);
  }
  lines.push("");
  lines.push("## J. Post-failure success soak");
  lines.push("");
  lines.push(`- all canonical successes match reference: ${artifact.successSoak.allSuccessesMatchReference}`);
  lines.push(`- failure exception stable: ${artifact.successSoak.exceptionStable}`);
  lines.push("");
  lines.push("## K. First divergences");
  lines.push("");
  for (const pair of artifact.permutationComparisons) {
    lines.push(`- ${pair.left} vs ${pair.right}: ${pair.firstDivergence ? JSON.stringify(pair.firstDivergence) : "none"}`);
  }
  lines.push("");
  lines.push("## L. Files/artifacts created");
  lines.push("");
  lines.push("- `artifacts/update-08-stage-04a-history.json`");
  lines.push("- `artifacts/update-08-stage-04a-report.md`");
  lines.push("- `artifacts/update-08-stage-04a-sha256sums.txt`");
  lines.push("");
  lines.push("## M. Production files changed");
  lines.push("");
  lines.push("none");
  lines.push("");
  lines.push(`STAGE_4A_RESULT = ${artifact.stageConclusion.STAGE_4A_RESULT}`);
  lines.push("");
  lines.push(`confirmed accumulation = ${artifact.stageConclusion.confirmedAccumulation.join("; ") || "none"}`);
  lines.push(`history dependence = ${artifact.stageConclusion.historyDependence.join("; ") || "none"}`);
  lines.push(`semantic corruption = ${artifact.stageConclusion.semanticCorruption.join("; ") || "none"}`);
  lines.push(`zero-delta paths = ${artifact.stageConclusion.zeroDeltaPaths.join("; ") || "none"}`);
  lines.push(`unresolved = ${artifact.stageConclusion.unresolved.join("; ") || "none"}`);
  lines.push("");
  lines.push(`READY_FOR_STAGE_5_FROM_4A = ${artifact.stageConclusion.READY_FOR_STAGE_5_FROM_4A}`);
  lines.push("");
  return lines.join("\n");
}

function writeArtifacts(artifact) {
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(serialize(artifact), null, 2) + "\n", "utf8");
  fs.writeFileSync(OUT_REPORT, makeReport(artifact) + "\n", "utf8");
  const sums = [OUT_JSON, OUT_REPORT].map((file) => {
    const digest = sha256(fs.readFileSync(file));
    return `${digest}  ${path.relative(ROOT, file).replaceAll(path.sep, "/")}`;
  });
  fs.writeFileSync(OUT_SHA, sums.join("\n") + "\n", "utf8");
}

async function orchestrate() {
  const revision = gitRevision();
  const stagePresence = loadStagePresence();
  const productionAlignmentData = productionAlignment();

  const sanity = spawnChild("sanity");

  const requiredFailureIds = [
    "F_BAHAI_INVALID_VARIANT",
    "F_GREGORIAN_NONINTEGER_MONTH",
    "F_HINDU_INVALID_SCHEME",
    "F_ISLAMIC_INVALID_VARIANT",
    "F_JAPANESE_NONSTRING_ERA",
    "F_MONTH_WEAVING_NONPOSITIVE",
    "F_PASTAFARI_INVALID_TODAY_PROVIDER",
    "F_SOLAR_HIJRI_INVALID_VARIANT",
  ];

  const failureIds = [
    "F_BAHAI_INVALID_VARIANT",
    "F_GREGORIAN_NONINTEGER_MONTH",
    "F_HINDU_INVALID_SCHEME",
    "F_ISLAMIC_INVALID_VARIANT",
    "F_JAPANESE_NONSTRING_ERA",
    "F_MONTH_WEAVING_NONPOSITIVE",
    "F_PASTAFARI_INVALID_TODAY_PROVIDER",
    "F_SOLAR_HIJRI_INVALID_VARIANT",
    "F_RAW_PASTAFARI_DEFAULT",
  ];

  const repeatedFailures = failureIds.map((failureId) => spawnChild("repeated", { failureId }));
  const requiredRepeated = repeatedFailures.filter((entry) => requiredFailureIds.includes(entry.failureId));
  const confirmedNatural = repeatedFailures.filter((entry) =>
    entry.checkpoints.some((cp) => cp.n === 1 && cp.exception?.threw)
  );

  const alternating = spawnChild("alternating", {
    vectorId: "foundation_same",
    failureIds: ["F_GREGORIAN_NONINTEGER_MONTH", "F_PASTAFARI_INVALID_TODAY_PROVIDER"],
  });

  const aFailA = spawnChild("a_fail_a", {
    failureId: "F_PASTAFARI_INVALID_TODAY_PROVIDER",
  });

  const freshPairs = [];
  for (const vectorId of ["foundation_previous", "present_same", "present_forward"]) {
    const dirty = spawnChild("fresh_comparison", {
      vectorId,
      failureId: "F_PASTAFARI_INVALID_TODAY_PROVIDER",
      withFailure: true,
    });
    const clean = spawnChild("fresh_comparison", {
      vectorId,
      failureId: "F_PASTAFARI_INVALID_TODAY_PROVIDER",
      withFailure: false,
    });
    freshPairs.push({
      vectorId,
      dirty,
      clean,
      resultAfterFailureEqualsClean:
        JSON.stringify(dirty.success.actual) === JSON.stringify(clean.success.actual),
      bothEqualReference: dirty.success.matchesReference && clean.success.matchesReference,
      structuralComparison: {
        dirtyArenaDelta: dirty.final.arenaDeltaFromBaseline,
        cleanArenaDelta: clean.final.arenaDeltaFromBaseline,
      },
    });
  }

  const failuresThenSuccess = [1, 2, 5, 10, 100].map((count) =>
    spawnChild("failures_then_success", {
      count,
      failureId: "F_PASTAFARI_INVALID_TODAY_PROVIDER",
      vectorId: "foundation_same",
    })
  );

  const P = {
    A: "F_GREGORIAN_NONINTEGER_MONTH",
    B: "F_ISLAMIC_INVALID_VARIANT",
    C: "F_MONTH_WEAVING_NONPOSITIVE",
    D: "F_PASTAFARI_INVALID_TODAY_PROVIDER",
    E: "F_HINDU_INVALID_SCHEME",
    F: "F_SOLAR_HIJRI_INVALID_VARIANT",
  };
  const permutationSpecs = [
    { id: "ABC", sequence: [P.A, P.B, P.C] },
    { id: "CBA", sequence: [P.C, P.B, P.A] },
    { id: "AABBCC", sequence: [P.A, P.A, P.B, P.B, P.C, P.C] },
    { id: "ABCABC", sequence: [P.A, P.B, P.C, P.A, P.B, P.C] },
    { id: "ACAC", sequence: [P.A, P.C, P.A, P.C] },
    { id: "BACB", sequence: [P.B, P.A, P.C, P.B] },
    { id: "ABCDEF", sequence: [P.A, P.B, P.C, P.D, P.E, P.F] },
    { id: "FEDCBA", sequence: [P.F, P.E, P.D, P.C, P.B, P.A] },
    { id: "ACEBDF", sequence: [P.A, P.C, P.E, P.B, P.D, P.F] },
  ];
  const permutations = permutationSpecs.map((spec) => spawnChild("permutation", spec));

  function normalizedFinal(permutation) {
    return {
      arenaDelta: permutation.final.arenaDeltaFromBaseline,
      tailLength: permutation.final.retainedTailLength,
      tailHoles: permutation.final.retainedTailHoles,
      tailFingerprint: permutation.final.retainedTailFingerprint,
      mapSizes: permutation.final.maps.map((entry) => entry.size),
      identitiesRestored: permutation.final.identitiesRestored,
    };
  }

  const pairIds = [
    ["ABC", "CBA"],
    ["AABBCC", "ABCABC"],
    ["ABCDEF", "FEDCBA"],
    ["ABCDEF", "ACEBDF"],
  ];
  const permutationComparisons = pairIds.map(([leftId, rightId]) => {
    const left = permutations.find((entry) => entry.id === leftId);
    const right = permutations.find((entry) => entry.id === rightId);
    return {
      left: leftId,
      right: rightId,
      sameMultiset: true,
      finalNormalizedEqual: JSON.stringify(normalizedFinal(left)) === JSON.stringify(normalizedFinal(right)),
      leftFinal: normalizedFinal(left),
      rightFinal: normalizedFinal(right),
      firstDivergence: firstPermutationDivergence(left, right),
    };
  });

  const successSoak = spawnChild("success_soak", {
    count: 1000,
    successRounds: 3,
    failureId: "F_PASTAFARI_INVALID_TODAY_PROVIDER",
  });
  const zeroDeltaControl = spawnChild("zero_delta_control");

  const allRepeated100 = confirmedNatural.every((entry) => entry.checkpoints.some((cp) => cp.n === 100));
  const allRepeated1000 = confirmedNatural.every((entry) => entry.checkpoints.some((cp) => cp.n === 1000));
  const requiredExceptionsExactAndStable =
    requiredRepeated.length === requiredFailureIds.length &&
    requiredRepeated.every((entry) => entry.exceptionStability.stable && entry.exceptionStability.expectedContractMatches);
  const exceptionsStable = confirmedNatural.every((entry) => entry.exceptionStability.stable);
  const allSuccessComparisonsStable =
    sanity.allMatch &&
    alternating.successesStable &&
    aFailA.semanticsStable &&
    freshPairs.every((entry) => entry.resultAfterFailureEqualsClean && entry.bothEqualReference) &&
    failuresThenSuccess.every((entry) => entry.successMatchesReference) &&
    permutations.every((entry) => entry.successAfterSequence.matchesReference) &&
    successSoak.allSuccessesMatchReference;

  const confirmedAccumulation = confirmedNatural
    .filter((entry) => entry.checkpoints.find((cp) => cp.n === 1000)?.snapshot.arenaDeltaFromBaseline > 0)
    .map((entry) => {
      const cp = entry.checkpoints.find((x) => x.n === 1000);
      return `${entry.failureId}: arena Δ=${cp.snapshot.arenaDeltaFromBaseline} after 1000 measured failures`;
    });

  const zeroDeltaPaths = confirmedNatural
    .filter((entry) => entry.checkpoints.find((cp) => cp.n === 1000)?.snapshot.arenaDeltaFromBaseline === 0)
    .map((entry) => entry.failureId);
  if (zeroDeltaControl.passed) zeroDeltaPaths.push(zeroDeltaControl.id);

  const orderDependentPairs = permutationComparisons
    .filter((entry) => !entry.finalNormalizedEqual)
    .map((entry) => `${entry.left} vs ${entry.right}, first divergence at operation ${entry.firstDivergence?.operationIndex ?? "unknown"}`);

  const semanticCorruption = [];
  if (!allSuccessComparisonsStable) semanticCorruption.push("At least one authoritative success after failures did not equal its Stage-1/spec reference result.");

  const unresolved = [];
  if (!stagePresence.stage3) unresolved.push("Stage 3 artifact is absent; Stage 4A used focused revalidation with the Stage-2B + 4C/4D snapshot contract.");
  const rawDefault = repeatedFailures.find((entry) => entry.failureId === "F_RAW_PASTAFARI_DEFAULT");
  if (!rawDefault?.exceptionStability.expectedContractMatches) unresolved.push("Raw PastafariCalendar default-path historical ReferenceError did not reproduce with the expected contract.");
  if (!allRepeated100) unresolved.push("Not every confirmed natural failure path reached 100 repetitions.");
  if (!allRepeated1000) unresolved.push("Not every confirmed natural failure path reached 1000 repetitions.");
  if (!exceptionsStable) unresolved.push("At least one repeated natural failure changed exception class/message.");
  if (!requiredExceptionsExactAndStable) unresolved.push("At least one required Stage-2A validation path did not preserve the exact exception class/message baseline.");
  if (!productionAlignmentData.allMatches) unresolved.push("Current production hashes do not fully align with the Stage-2B production snapshot.");
  if (!zeroDeltaControl.passed) unresolved.push("The 1000-call valid-construction zero-delta control did not remain structurally stable.");
  if (!allSuccessComparisonsStable) unresolved.push("At least one semantic comparison is unstable.");

  const technicalAcceptance =
    sanity.allMatch &&
    productionAlignmentData.allMatches &&
    requiredExceptionsExactAndStable &&
    confirmedNatural.length >= 8 &&
    allRepeated100 &&
    allRepeated1000 &&
    exceptionsStable &&
    alternating.successesStable &&
    alternating.failuresStable &&
    aFailA.semanticsStable &&
    freshPairs.every((entry) => entry.resultAfterFailureEqualsClean && entry.bothEqualReference) &&
    failuresThenSuccess.every((entry) => entry.successMatchesReference && entry.exceptionStable) &&
    permutations.every((entry) => entry.allThrow && entry.allExpectedContracts && entry.successAfterSequence.matchesReference) &&
    zeroDeltaControl.passed &&
    successSoak.allSuccessesMatchReference &&
    successSoak.exceptionStable;

  const artifact = {
    schema: "pastafari.update8.stage04a.history.v1",
    stage: "4A",
    generatedAt: new Date().toISOString(),
    revision: {
      repository: "Sargon17-Green/pastafari-calendar",
      branch: revision.branch,
      commit: revision.commit,
      packageVersion: packageVersion(),
      workingTree: revision.workingTree,
    },
    alignment: {
      stagePresence,
      productionAlignment: productionAlignmentData,
      focusedRevalidationPerformed: true,
      snapshotSchemaBasis: [
        "verification/update8/stage-02b-shared-state-inventory.json",
        "artifacts/update-08-stage-04c-fault-injection.json",
        "artifacts/update-08-stage-04d-arena-publication.json",
      ],
      productionBehaviorChangedByRunner: false,
    },
    sanity,
    failurePathsAttempted: failureIds,
    confirmedNaturalFailurePaths: confirmedNatural.map((entry) => entry.failureId),
    repeatedFailures,
    alternating,
    aFailA,
    freshProcessComparisons: freshPairs,
    failuresThenSuccess,
    permutations,
    permutationComparisons,
    successSoak,
    zeroDeltaControl,
    deterministicGeneration: { randomUsed: false, seed: null, note: "All Stage 4A sequences and inputs are fixed and deterministic." },
    boundedness: {
      primaryStructuralMetric: "STATE:generated:shared-invocation-arena length / retained tail",
      heapMeasurementPolicy: "heapUsed/RSS recorded after explicit GC where available; heap trend alone is not treated as proof of leakage",
      repeated100And1000: repeatedFailures.map((entry) => ({
        failureId: entry.failureId,
        after100: entry.checkpoints.find((cp) => cp.n === 100)?.snapshot ?? null,
        after1000: entry.checkpoints.find((cp) => cp.n === 1000)?.snapshot ?? null,
      })),
    },
    firstDivergences: permutationComparisons.map((entry) => ({
      pair: `${entry.left}::${entry.right}`,
      firstDivergence: entry.firstDivergence,
    })),
    productionFilesChanged: [],
    artifactsCreated: [
      "artifacts/update-08-stage-04a-history.json",
      "artifacts/update-08-stage-04a-report.md",
      "artifacts/update-08-stage-04a-sha256sums.txt",
    ],
    acceptance: {
      technicalAcceptance,
      allConfirmedNaturalFailurePathsRepeatedAtLeast100: allRepeated100,
      repeated1000CompletedWhereCheap: allRepeated1000,
      alternatingCompleted: true,
      aFailACompleted: true,
      multipleFailureOrdersCompleted: true,
      fullSnapshotProjectionUsed: true,
      referenceComparisonAfterFailuresCompleted: true,
      exceptionBaselinesPreserved: exceptionsStable,
      requiredStage2AExceptionBaselinesExact: requiredExceptionsExactAndStable,
      productionAlignmentWithStage2B: productionAlignmentData.allMatches,
      zeroDeltaControl1000Passed: zeroDeltaControl.passed,
      productionBehaviorChanged: false,
    },
    stageConclusion: {
      STAGE_4A_RESULT: technicalAcceptance
        ? "TECHNICAL_EVIDENCE_COMPLETE"
        : "INCOMPLETE_OR_SEMANTIC_INSTABILITY",
      confirmedAccumulation,
      historyDependence: [
        ...confirmedAccumulation.length ? ["failure-count dependence confirmed by retained structural state"] : [],
        ...orderDependentPairs,
      ],
      semanticCorruption,
      zeroDeltaPaths,
      unresolved,
      READY_FOR_STAGE_5_FROM_4A: technicalAcceptance ? "yes" : "no",
    },
  };

  if (process.argv.includes("--write")) writeArtifacts(artifact);

  process.stdout.write(JSON.stringify({
    stage: artifact.stage,
    commit: artifact.revision.commit,
    confirmedNaturalFailurePaths: artifact.confirmedNaturalFailurePaths.length,
    technicalAcceptance,
    STAGE_4A_RESULT: artifact.stageConclusion.STAGE_4A_RESULT,
    READY_FOR_STAGE_5_FROM_4A: artifact.stageConclusion.READY_FOR_STAGE_5_FROM_4A,
    output: process.argv.includes("--write") ? OUT_JSON : null,
  }, null, 2) + "\n");

  if (!technicalAcceptance) process.exitCode = 1;
}

const childIndex = process.argv.indexOf("--child");
if (childIndex >= 0) {
  const kind = process.argv[childIndex + 1];
  const encoded = process.argv[childIndex + 2] ?? "";
  const payload = encoded
    ? JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"))
    : {};
  try {
    const result = await runChild(kind, payload);
    process.stdout.write(`__STAGE5_CHILD_JSON__${JSON.stringify(serialize(result))}\n`);
  } catch (error) {
    console.error(error?.stack ?? error);
    process.exitCode = 1;
  }
} else {
  try {
    await orchestrate();
  } catch (error) {
    console.error(error?.stack ?? error);
    process.exitCode = 1;
  }
}
