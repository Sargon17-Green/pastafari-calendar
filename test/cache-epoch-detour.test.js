import assert from 'node:assert/strict';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import {
  AUTHORITATIVE_CACHE_EPOCH,
  addCacheEpochTraceHookForTests,
  cacheEpochSnapshotForTests,
  installAuthoritativeCacheEpochDetour,
} from '../browser/cache-epoch-detour.js';

class FakeCalendar {
  constructor() {
    this.anchorCache = new Map();
    this.yearCache = new Map();
    this.structureCache = new Map();
    this.builds = 0;
    this.fail = false;
  }
  convertJdn(key) {
    if (this.anchorCache.has(key)) return this.anchorCache.get(key);
    this.builds += 1;
    this.anchorCache.set(key, `norm:${key}`);
    if (key === 'outer') this.convertJdn('inner');
    if (this.fail) throw new Error('injected population failure');
    return this.anchorCache.get(key);
  }
}
installAuthoritativeCacheEpochDetour(FakeCalendar);

test('a fossil entry remains physically present but cannot determine semantics', () => {
  const calendar = new FakeCalendar();
  Map.prototype.set.call(calendar.anchorCache, 'A', 'fossil:A');
  const identity = calendar.anchorCache;
  assert.equal(calendar.convertJdn('A'), 'norm:A');
  assert.equal(calendar.anchorCache, identity);
  assert.equal(Map.prototype.get.call(calendar.anchorCache, 'A'), 'fossil:A');
  assert.equal(calendar.anchorCache.get('A'), 'norm:A');
  const snapshot = cacheEpochSnapshotForTests(calendar).anchorCache;
  assert.equal(snapshot.fossilEntries, 1);
  assert.equal(snapshot.shadowEntries, 1);
  assert.equal(snapshot.algorithmMarker, AUTHORITATIVE_CACHE_EPOCH.id);
});

test('warm repeats hit the normative shadow instead of recomputing', () => {
  const calendar = new FakeCalendar();
  assert.equal(calendar.convertJdn('A'), 'norm:A');
  assert.equal(calendar.convertJdn('A'), 'norm:A');
  assert.equal(calendar.builds, 1);
});

test('manual external poisoning after warming is masked during conversion', () => {
  const calendar = new FakeCalendar();
  assert.equal(calendar.convertJdn('A'), 'norm:A');
  calendar.anchorCache.set('A', 'foreign:poison');
  assert.equal(calendar.anchorCache.get('A'), 'foreign:poison', 'outside the engine the old Map remains observable');
  assert.equal(calendar.convertJdn('A'), 'norm:A');
});

test('failed population rolls shadow mutations back and leaves no partial valid entry', () => {
  const calendar = new FakeCalendar();
  calendar.convertJdn('stable');
  const before = cacheEpochSnapshotForTests(calendar).anchorCache.shadowEntries;
  calendar.fail = true;
  assert.throws(() => calendar.convertJdn('FAIL'), /injected population failure/);
  calendar.fail = false;
  assert.equal(cacheEpochSnapshotForTests(calendar).anchorCache.shadowEntries, before);
  assert.equal(calendar.convertJdn('FAIL'), 'norm:FAIL');
});

test('nested population commits once and restores depth to zero', () => {
  const calendar = new FakeCalendar();
  assert.equal(calendar.convertJdn('outer'), 'norm:outer');
  assert.equal(calendar.convertJdn('inner'), 'norm:inner');
  const snapshot = cacheEpochSnapshotForTests(calendar).anchorCache;
  assert.equal(snapshot.callDepth, 0);
  assert.equal(snapshot.shadowEntries, 2);
  assert.equal(calendar.builds, 2);
});

test('trace instrumentation reports writer, depth, cache and algorithm marker', () => {
  const events = [];
  const stop = addCacheEpochTraceHookForTests((event) => events.push(event));
  try {
    const calendar = new FakeCalendar();
    calendar.convertJdn('trace');
  } finally {
    stop();
  }
  const write = events.find((event) => event.type === 'write' && event.cache === 'anchorCache');
  assert.ok(write);
  assert.equal(write.key, 'trace');
  assert.equal(write.writer, 'PastafariCalendar.convertJdn');
  assert.equal(write.callDepth, 1);
  assert.equal(write.algorithmMarker, AUTHORITATIVE_CACHE_EPOCH.id);
  assert.ok(events.some((event) => event.type === 'conversion-commit'));
});

test('historical core-before-public warmed instance converges to fresh public and fast results', { timeout: 90_000 }, () => {
  const audit = fileURLToPath(new URL('../verification/update7/run-cache-history-audit.mjs', import.meta.url));
  const stdout = execFileSync(process.execPath, [audit, '--scenario', 'chronicle-public'], { encoding:'utf8', timeout:85_000, maxBuffer:8*1024*1024 });
  const result = JSON.parse(stdout.trim().split(/\r?\n/).filter(Boolean).at(-1));
  assert.notDeepEqual(result.before.value, result.oldAfter.value, 'the historical raw path must remain a real discriminator');
  assert.deepEqual(result.oldAfter.value, result.freshCold.value);
  assert.deepEqual(result.oldAfter.value, result.fast.cold.value);
  assert.deepEqual(result.oldAfter.value, result.oldWarm.value);
  assert.equal(result.identityPreserved, true);
  assert.deepEqual(result.fossilSizesAfter, result.fossilSizesBefore, 'old fossil maps are not cleared');
  assert.ok(result.oldWarm.ms < result.oldAfter.ms, 'warm path should retain a cache advantage');
});
