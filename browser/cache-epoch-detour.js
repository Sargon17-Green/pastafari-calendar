// Semantic cache fossil mask for late-installed authoritative corrections.
//
// The old Maps are intentionally kept alive and are still observable outside
// an authoritative conversion.  During a corrected conversion, however, their
// pre-detour entries are treated as fossils: reads see only a hidden normative
// shadow for the current semantic epoch.  New authoritative writes go to that
// shadow, so the historical Map may continue remembering stale values without
// being allowed to decide calendar semantics.

const DETOURED_CONSTRUCTORS = new WeakSet();
const CACHE_STATE = Symbol.for("pastafari.cache-epoch-detour.state");
const CACHE_METHODS_INSTALLED = Symbol.for("pastafari.cache-epoch-detour.methods-installed");
const TRACE_HOOKS = new Set();

const RAW_GET = Map.prototype.get;
const RAW_SET = Map.prototype.set;
const RAW_HAS = Map.prototype.has;
const RAW_DELETE = Map.prototype.delete;
const RAW_CLEAR = Map.prototype.clear;
const RAW_ENTRIES = Map.prototype.entries;
const RAW_KEYS = Map.prototype.keys;
const RAW_VALUES = Map.prototype.values;
const RAW_SIZE = Object.getOwnPropertyDescriptor(Map.prototype, "size").get;

// This is deliberately not package-version based.  It names the semantic
// ingredients that make cached year/structure values normative in this tree.
export const AUTHORITATIVE_CACHE_EPOCH = Object.freeze({
  id: "scroll-d36b0c94+sauce-bowlsum+gate-shadow-d36b0c94+year-ceiling-5778",
  scrollSha256: "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96",
  sauceMarker: "final-stir-u-uses-bowlSum",
  gateMarker: "pastafari-gate-shadow-v1:d36b0c94",
  yearCeiling: 5_778,
});

function emit(event) {
  for (const hook of TRACE_HOOKS) {
    try { hook(Object.freeze({ ...event })); } catch { /* tracing never steers semantics */ }
  }
}

function stateOf(cache) {
  return cache?.[CACHE_STATE] ?? null;
}

function inSemanticRead(state) {
  return (state?.depth ?? 0) > 0;
}

function activeTransaction(state) {
  return state?.transactions?.[state.transactions.length - 1] ?? null;
}

function rememberBeforeMutation(state, key) {
  const transaction = activeTransaction(state);
  if (!transaction || transaction.before.has(key)) return;
  transaction.before.set(key, {
    hadValue: RAW_HAS.call(state.shadow, key),
    value: RAW_GET.call(state.shadow, key),
    hadProvenance: state.provenance.has(key),
    provenance: state.provenance.get(key),
  });
}

function beginTransaction(state) {
  state.transactions.push({ before: new Map() });
}

function commitTransaction(state) {
  const completed = state.transactions.pop();
  const parent = activeTransaction(state);
  if (!completed || !parent) return;
  for (const [key, snapshot] of completed.before) {
    if (!parent.before.has(key)) parent.before.set(key, snapshot);
  }
}

function rollbackTransaction(state) {
  const failed = state.transactions.pop();
  if (!failed) return;
  const entries = [...failed.before.entries()].reverse();
  for (const [key, snapshot] of entries) {
    if (snapshot.hadValue) RAW_SET.call(state.shadow, key, snapshot.value);
    else RAW_DELETE.call(state.shadow, key);
    if (snapshot.hadProvenance) state.provenance.set(key, snapshot.provenance);
    else state.provenance.delete(key);
  }
}

function rawSize(cache) {
  return RAW_SIZE.call(cache);
}

function mergedEntries(cache, state) {
  return (function* mergedCacheEntries() {
    const emitted = new Set();
    for (const [key, value] of RAW_ENTRIES.call(state.shadow)) {
      emitted.add(key);
      if (state.foreignOverrides.has(key) && RAW_HAS.call(cache, key)) {
        yield [key, RAW_GET.call(cache, key)];
      } else {
        yield [key, value];
      }
    }
    for (const [key, value] of RAW_ENTRIES.call(cache)) {
      if (!emitted.has(key)) yield [key, value];
    }
  })();
}

function semanticEntries(state) {
  return RAW_ENTRIES.call(state.shadow);
}

function installMethods(cache) {
  if (cache[CACHE_METHODS_INSTALLED]) return;

  Object.defineProperties(cache, {
    get: {
      configurable: true,
      writable: true,
      value(key) {
        const state = stateOf(this);
        if (!state) return RAW_GET.call(this, key);
        if (inSemanticRead(state)) {
          const hit = RAW_HAS.call(state.shadow, key);
          emit({
            type: "read",
            cache: state.owner,
            key,
            hit,
            source: hit ? "normative-shadow" : "masked-fossil",
            callDepth: state.depth,
            algorithmMarker: state.epoch.id,
          });
          return hit ? RAW_GET.call(state.shadow, key) : undefined;
        }
        if (state.foreignOverrides.has(key) && RAW_HAS.call(this, key)) return RAW_GET.call(this, key);
        if (RAW_HAS.call(state.shadow, key)) return RAW_GET.call(state.shadow, key);
        return RAW_GET.call(this, key);
      },
    },
    has: {
      configurable: true,
      writable: true,
      value(key) {
        const state = stateOf(this);
        if (!state) return RAW_HAS.call(this, key);
        if (inSemanticRead(state)) return RAW_HAS.call(state.shadow, key);
        return RAW_HAS.call(state.shadow, key) || RAW_HAS.call(this, key);
      },
    },
    set: {
      configurable: true,
      writable: true,
      value(key, value) {
        const state = stateOf(this);
        if (!state) return RAW_SET.call(this, key, value);
        if (!inSemanticRead(state)) {
          state.foreignOverrides.add(key);
          RAW_SET.call(this, key, value);
          emit({
            type: "foreign-write",
            cache: state.owner,
            key,
            newValue: value,
            writer: "outside-authoritative-conversion",
            callDepth: 0,
            algorithmMarker: state.epoch.id,
          });
          return this;
        }

        rememberBeforeMutation(state, key);
        const oldValue = RAW_HAS.call(state.shadow, key)
          ? RAW_GET.call(state.shadow, key)
          : (RAW_HAS.call(this, key) ? RAW_GET.call(this, key) : undefined);
        RAW_SET.call(state.shadow, key, value);
        state.provenance.set(key, Object.freeze({
          algorithmMarker: state.epoch.id,
          writer: "PastafariCalendar.convertJdn",
        }));
        emit({
          type: "write",
          cache: state.owner,
          key,
          oldValue,
          newValue: value,
          writer: "PastafariCalendar.convertJdn",
          callDepth: state.depth,
          algorithmMarker: state.epoch.id,
        });
        return this;
      },
    },
    delete: {
      configurable: true,
      writable: true,
      value(key) {
        const state = stateOf(this);
        if (!state) return RAW_DELETE.call(this, key);
        if (inSemanticRead(state)) {
          rememberBeforeMutation(state, key);
          state.provenance.delete(key);
          return RAW_DELETE.call(state.shadow, key);
        }
        state.provenance.delete(key);
        state.foreignOverrides.delete(key);
        const a = RAW_DELETE.call(state.shadow, key);
        const b = RAW_DELETE.call(this, key);
        return a || b;
      },
    },
    clear: {
      configurable: true,
      writable: true,
      value() {
        const state = stateOf(this);
        if (!state) return RAW_CLEAR.call(this);
        if (inSemanticRead(state)) {
          for (const key of RAW_KEYS.call(state.shadow)) rememberBeforeMutation(state, key);
          state.provenance.clear();
          RAW_CLEAR.call(state.shadow);
          return undefined;
        }
        state.provenance.clear();
        state.foreignOverrides.clear();
        RAW_CLEAR.call(state.shadow);
        RAW_CLEAR.call(this);
        return undefined;
      },
    },
    entries: {
      configurable: true,
      writable: true,
      value() {
        const state = stateOf(this);
        if (!state) return RAW_ENTRIES.call(this);
        return inSemanticRead(state) ? semanticEntries(state) : mergedEntries(this, state);
      },
    },
    keys: {
      configurable: true,
      writable: true,
      value() {
        const state = stateOf(this);
        if (!state) return RAW_KEYS.call(this);
        if (inSemanticRead(state)) return RAW_KEYS.call(state.shadow);
        return (function* mergedCacheKeys() {
          for (const [key] of mergedEntries(this, state)) yield key;
        }).call(this);
      },
    },
    values: {
      configurable: true,
      writable: true,
      value() {
        const state = stateOf(this);
        if (!state) return RAW_VALUES.call(this);
        if (inSemanticRead(state)) return RAW_VALUES.call(state.shadow);
        return (function* mergedCacheValues() {
          for (const [, value] of mergedEntries(this, state)) yield value;
        }).call(this);
      },
    },
    forEach: {
      configurable: true,
      writable: true,
      value(callback, thisArg) {
        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        for (const [key, value] of this.entries()) callback.call(thisArg, value, key, this);
      },
    },
    [Symbol.iterator]: {
      configurable: true,
      writable: true,
      value() { return this.entries(); },
    },
    size: {
      configurable: true,
      get() {
        const state = stateOf(this);
        if (!state) return rawSize(this);
        if (inSemanticRead(state)) return rawSize(state.shadow);
        let size = rawSize(state.shadow);
        for (const key of RAW_KEYS.call(this)) if (!RAW_HAS.call(state.shadow, key)) size += 1;
        return size;
      },
    },
  });

  Object.defineProperty(cache, CACHE_METHODS_INSTALLED, {
    configurable: true,
    value: true,
  });
}

function dressCache(cache, owner) {
  if (!(cache instanceof Map)) return null;
  installMethods(cache);

  const existing = stateOf(cache);
  if (existing?.epoch?.id === AUTHORITATIVE_CACHE_EPOCH.id) {
    existing.owner = owner;
    return existing;
  }

  const state = {
    owner,
    epoch: AUTHORITATIVE_CACHE_EPOCH,
    shadow: new Map(),
    provenance: new Map(),
    foreignOverrides: new Set(),
    transactions: [],
    depth: 0,
    fossilEntriesAtDress: rawSize(cache),
    previousEpoch: existing ? Object.freeze({
      id: existing.epoch?.id ?? "unknown",
      shadowEntries: rawSize(existing.shadow),
    }) : null,
  };

  Object.defineProperty(cache, CACHE_STATE, {
    configurable: true,
    writable: true,
    value: state,
  });
  emit({
    type: "dress",
    cache: owner,
    fossilEntries: state.fossilEntriesAtDress,
    algorithmMarker: state.epoch.id,
  });
  return state;
}

function dressCalendarCaches(calendar) {
  const states = [];
  for (const owner of ["anchorCache", "yearCache", "structureCache"]) {
    const state = dressCache(calendar?.[owner], owner);
    if (state) states.push(state);
  }
  return states;
}

export function installAuthoritativeCacheEpochDetour(CalendarConstructor) {
  if (!CalendarConstructor?.prototype) throw new TypeError("PastafariCalendar constructor is required.");
  if (DETOURED_CONSTRUCTORS.has(CalendarConstructor)) return CalendarConstructor;

  const originalConvertJdn = CalendarConstructor.prototype.convertJdn;
  if (typeof originalConvertJdn !== "function") throw new TypeError("PastafariCalendar.convertJdn is required.");

  CalendarConstructor.prototype.convertJdn = function convertJdnThroughTheCacheFossilMask(...args) {
    const states = dressCalendarCaches(this);
    for (const state of states) {
      beginTransaction(state);
      state.depth += 1;
    }
    emit({
      type: "conversion-enter",
      caches: states.map((state) => state.owner),
      callDepth: states[0]?.depth ?? 0,
      algorithmMarker: AUTHORITATIVE_CACHE_EPOCH.id,
    });
    let succeeded = false;
    try {
      const result = originalConvertJdn.apply(this, args);
      succeeded = true;
      return result;
    } finally {
      for (let index = states.length - 1; index >= 0; index -= 1) {
        const state = states[index];
        if (succeeded) commitTransaction(state);
        else rollbackTransaction(state);
        state.depth -= 1;
      }
      emit({
        type: succeeded ? "conversion-commit" : "conversion-rollback",
        caches: states.map((state) => state.owner),
        callDepth: states[0]?.depth ?? 0,
        algorithmMarker: AUTHORITATIVE_CACHE_EPOCH.id,
      });
    }
  };

  DETOURED_CONSTRUCTORS.add(CalendarConstructor);
  return CalendarConstructor;
}

export function cacheEpochSnapshotForTests(calendar) {
  const result = {};
  for (const owner of ["anchorCache", "yearCache", "structureCache"]) {
    const cache = calendar?.[owner];
    const state = stateOf(cache);
    result[owner] = state ? Object.freeze({
      algorithmMarker: state.epoch.id,
      fossilEntries: rawSize(cache),
      shadowEntries: rawSize(state.shadow),
      visibleEntries: cache.size,
      callDepth: state.depth,
      provenance: Object.freeze([...state.provenance.entries()].map(([key, value]) => Object.freeze([key, value]))),
    }) : null;
  }
  return Object.freeze(result);
}

export function addCacheEpochTraceHookForTests(hook) {
  if (typeof hook !== "function") throw new TypeError("cache trace hook must be a function");
  TRACE_HOOKS.add(hook);
  return () => TRACE_HOOKS.delete(hook);
}
