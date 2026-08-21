#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';

const C = -14035472n;
const T = -14009523n;
const EXPECTED = Object.freeze({ year:'5006', cutletName:'עקרב', dayInCutlet:296, monthName:'רימון', dayInMonth:89 });
const RAW_HISTORICAL = Object.freeze({ year:'5006', cutletName:'אפר', dayInCutlet:296, monthName:'טין', dayInMonth:12 });
const here = fileURLToPath(import.meta.url);
const rawSize = (map) => Object.getOwnPropertyDescriptor(Map.prototype, 'size').get.call(map);
const json = (value) => JSON.stringify(value, (_key, item) => typeof item === 'bigint' ? item.toString() : item);
const tuple = (value) => value?.toJSON?.() ?? value;
const fixedToday = (ns) => () => new ns.GregorianDate(2000n, 1, 1);
const timed = (fn) => { const started = performance.now(); const value = fn(); return { value, ms: performance.now() - started }; };

async function fastTuple() {
  const fast = await import('../../browser/pastafari-calendar-fast.js');
  fast.clearFastCache();
  const calendar = new fast.PastafariCalendar();
  const cold = timed(() => tuple(calendar.convertJdn(T, { calculationJdn: C })));
  const warm = timed(() => tuple(calendar.convertJdn(T, { calculationJdn: C })));
  return { cold, warm, stats: fast.getFastCacheStats() };
}

async function scenarioChroniclePublic() {
  const raw = await import('../../browser/pastafari-calendar-core-chronicle.js');
  const old = new raw.PastafariCalendar({ todayProvider: fixedToday(raw) });
  const before = timed(() => tuple(old.convertJdn(T, { calculationJdn: C })));
  const fossilSizesBefore = { anchor: rawSize(old.anchorCache), year: rawSize(old.yearCache), structure: rawSize(old.structureCache) };
  const identities = [old.anchorCache, old.yearCache, old.structureCache];
  const pub = await import('../../browser/pastafari-calendar-core.js');
  const epoch = await import('../../browser/cache-epoch-detour.js');
  const oldAfter = timed(() => tuple(old.convertJdn(T, { calculationJdn: C })));
  const oldWarm = timed(() => tuple(old.convertJdn(T, { calculationJdn: C })));
  const fresh = new pub.PastafariCalendar({ todayProvider: fixedToday(pub) });
  const freshCold = timed(() => tuple(fresh.convertJdn(T, { calculationJdn: C })));
  const snapshot = epoch.cacheEpochSnapshotForTests(old);
  const fossilSizesAfter = { anchor: rawSize(old.anchorCache), year: rawSize(old.yearCache), structure: rawSize(old.structureCache) };
  const identityPreserved = identities[0] === old.anchorCache && identities[1] === old.yearCache && identities[2] === old.structureCache;
  const fast = await fastTuple();
  return { scenario:'chronicle->warm->public', before, oldAfter, oldWarm, freshCold, fast, fossilSizesBefore, fossilSizesAfter, identityPreserved, snapshot };
}

async function scenarioPublicChronicle() {
  const pub = await import('../../browser/pastafari-calendar-core.js');
  const a = new pub.PastafariCalendar({ todayProvider: fixedToday(pub) });
  const first = timed(() => tuple(a.convertJdn(T, { calculationJdn: C })));
  const raw = await import('../../browser/pastafari-calendar-core-chronicle.js');
  const b = new raw.PastafariCalendar({ todayProvider: fixedToday(raw) });
  const second = timed(() => tuple(b.convertJdn(T, { calculationJdn: C })));
  return { scenario:'public->chronicle', first, second };
}

async function scenarioFastPublic() {
  const fast = await fastTuple();
  const pub = await import('../../browser/pastafari-calendar-core.js');
  const cal = new pub.PastafariCalendar({ todayProvider: fixedToday(pub) });
  const authoritative = timed(() => tuple(cal.convertJdn(T, { calculationJdn: C })));
  return { scenario:'fast->public', fast, authoritative };
}

async function scenarioPublicFast() {
  const pub = await import('../../browser/pastafari-calendar-core.js');
  const cal = new pub.PastafariCalendar({ todayProvider: fixedToday(pub) });
  const authoritative = timed(() => tuple(cal.convertJdn(T, { calculationJdn: C })));
  const fast = await fastTuple();
  return { scenario:'public->fast', authoritative, fast };
}

async function installCorrections(raw) {
  const gate = await import('../../browser/gate-data-detour.js');
  const d1 = await import('../../browser/year-ceiling-detour.js');
  const d2 = await import('../../browser/year-ceiling-detour-detour.js');
  const d3 = await import('../../browser/year-ceiling-detour-detour-detour.js');
  const epoch = await import('../../browser/cache-epoch-detour.js');
  gate.installGateDataDetour(raw.GateIndex);
  d2.installYearCeilingDetourDetour(raw.PastafariCalendar, raw.GateIndex);
  d3.installYearCeilingDetourDetourDetour(raw.PastafariCalendar, raw.GateIndex);
  d1.installYearCeilingDetour(raw.PastafariCalendar, raw.GateIndex);
  epoch.installAuthoritativeCacheEpochDetour(raw.PastafariCalendar);
}

async function scenarioCorrectionCore() {
  await Promise.all([
    import('../../browser/gate-data-detour.js'),
    import('../../browser/year-ceiling-detour.js'),
    import('../../browser/year-ceiling-detour-detour.js'),
    import('../../browser/year-ceiling-detour-detour-detour.js'),
    import('../../browser/cache-epoch-detour.js'),
  ]);
  const raw = await import('../../browser/pastafari-calendar-core-chronicle.js');
  await installCorrections(raw);
  const cal = new raw.PastafariCalendar({ todayProvider: fixedToday(raw) });
  return { scenario:'corrections->chronicle', authoritative: timed(() => tuple(cal.convertJdn(T, { calculationJdn: C }))) };
}

async function scenarioCoreCorrection() {
  const raw = await import('../../browser/pastafari-calendar-core-chronicle.js');
  const cal = new raw.PastafariCalendar({ todayProvider: fixedToday(raw) });
  await installCorrections(raw);
  return { scenario:'chronicle->corrections', authoritative: timed(() => tuple(cal.convertJdn(T, { calculationJdn: C }))) };
}

async function scenarioStaleManual() {
  const pub = await import('../../browser/pastafari-calendar-core.js');
  const cal = new pub.PastafariCalendar({ todayProvider: fixedToday(pub) });
  cal.anchorCache.set(C, Object.freeze({ deliberately:'poisoned-anchor' }));
  cal.yearCache.set(`${C}|5006`, Object.freeze({ deliberately:'poisoned-year' }));
  cal.structureCache.set(`${C}|poisoned|poisoned`, Object.freeze({ deliberately:'poisoned-structure' }));
  const result = timed(() => tuple(cal.convertJdn(T, { calculationJdn: C })));
  return { scenario:'manual-stale-seed', result };
}

async function scenarioRandomSequence() {
  const pub = await import('../../browser/pastafari-calendar-core.js');
  const fast = await import('../../browser/pastafari-calendar-fast.js');
  const c = 2460000n;
  const offsets = [0n, 1n, -1n, 17n, -23n, 1n, 31n, 0n, -23n, 7n, 17n, -9n];
  const run = (order) => {
    const authoritative = new pub.PastafariCalendar({ todayProvider: fixedToday(pub) });
    fast.clearFastCache();
    const fastCalendar = new fast.PastafariCalendar();
    const rows = [];
    for (const offset of order) {
      const target = c + offset;
      const a = tuple(authoritative.convertJdn(target, { calculationJdn: c }));
      const f = tuple(fastCalendar.convertJdn(target, { calculationJdn: c }));
      rows.push({ offset, authoritative:a, fast:f, match:json(a)===json(f) });
    }
    return rows;
  };
  const forward = run(offsets);
  const reverse = run([...offsets].reverse());
  const mismatches = [...forward, ...reverse].filter((row) => !row.match).length;
  return { scenario:'random-sequence-fixed-seed', seed:'offset-list-v1', operations:forward.length+reverse.length, mismatches, forward, reverse };
}

async function scenarioReferenceCold() {
  const { runDifferential } = await import('../reference-oracle/differential.mjs');
  const inputs = [
    { calculationJdn:0n, targetJdn:0n, detail:'summary' },
    { calculationJdn:12345n, targetJdn:12000n, detail:'summary' },
    { calculationJdn:12345n, targetJdn:13000n, detail:'summary' },
    { calculationJdn:-12345n, targetJdn:-13000n, detail:'summary' },
  ];
  const rows = inputs.map((input) => {
    const result = runDifferential(input);
    const comparable = result.comparison.fields.filter((field) => field.status === 'match' || field.status === 'mismatch');
    return { input, comparableFields:comparable.length, mismatches:comparable.filter((field)=>field.status==='mismatch').length, firstMismatch:result.comparison.firstMismatch };
  });
  return { scenario:'cold-reference-comparable-stages', rows, finalTupleReferenceImplemented:false };
}

const SCENARIOS = {
  'chronicle-public': scenarioChroniclePublic,
  'public-chronicle': scenarioPublicChronicle,
  'fast-public': scenarioFastPublic,
  'public-fast': scenarioPublicFast,
  'correction-core': scenarioCorrectionCore,
  'core-correction': scenarioCoreCorrection,
  'stale-manual': scenarioStaleManual,
  'random-sequence': scenarioRandomSequence,
  'reference-cold': scenarioReferenceCold,
};

const index = process.argv.indexOf('--scenario');
if (index >= 0) {
  const name = process.argv[index + 1];
  if (!SCENARIOS[name]) throw new Error(`unknown scenario ${name}`);
  const payload = json(await SCENARIOS[name]());
  process.stdout.write(`${payload}\n`);
  process.exit(0);
} else {
  const names = Object.keys(SCENARIOS);
  const results = [];
  for (const name of names) {
    const stdout = execFileSync(process.execPath, [here, '--scenario', name], { encoding:'utf8', timeout:180_000, maxBuffer:16*1024*1024 });
    const line = stdout.trim().split(/\r?\n/).filter(Boolean).at(-1);
    results.push(JSON.parse(line));
  }
  const finalTuples = [];
  for (const result of results) {
    const visit = (value) => {
      if (!value || typeof value !== 'object') return;
      if (value.year && value.cutletName && value.monthName) finalTuples.push(value);
      for (const child of Object.values(value)) visit(child);
    };
    visit(result);
  }
  const postFixMismatches = finalTuples.filter((item) => json(item) !== json(EXPECTED) && json(item) !== json(RAW_HISTORICAL));
  console.log(JSON.stringify({
    schema:'pastafari-cache-history-update7-audit-v1',
    discriminator:{ calculationJdn:String(C), targetJdn:String(T), expected:EXPECTED, historicalRaw:RAW_HISTORICAL },
    results,
    postFixUnexpectedFinalTuples:postFixMismatches,
  }, null, 2));
}
