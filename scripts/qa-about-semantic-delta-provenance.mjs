import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';

// Read-only structural audit. Not a translation-accuracy review or checksum approval.
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).trimEnd();
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const status = JSON.parse(readFileSync('artifacts/about-canon-semantic-delta-status.json', 'utf8'));
const manifest = readFileSync('SHA256SUMS.txt', 'utf8').split(/\r?\n/);
const manifestCommit = git('log', '-1', '--format=%H', '--', 'SHA256SUMS.txt');
const expectedSections = ['canonical-names', 'printed-calendar', 'seer'];
const numericPatch = JSON.parse(readFileSync('artifacts/website-i18n-provenance-audit/about-numeric-anchor-patch.json', 'utf8'));
const numericByLocale = new Map(numericPatch.locales.map(e => [e.locale, e]));
const entries = manifest.map(line => /^([a-f0-9]{64})  \*?(.+)$/.exec(line)).filter(Boolean)
  .map(m => ({ path: m[2].replace(/^\.\//, ''), expected: m[1] }))
  .filter(e => /^docs\/about\/content\/[a-z]{2,3}\.html$/.test(e.path));
const passFiles = readdirSync('artifacts/about-canon-semantic-delta-runs');
const failures = [];
const inspected = [];
const matching = entries.filter(e => sha256(readFileSync(e.path)) === e.expected);
const changed = entries.filter(e => sha256(readFileSync(e.path)) !== e.expected);
const sectionPattern = /<section\b[^>]*\bid=(['"])([^'"\s]+)\1[^>]*>[\s\S]*?<\/section>/g;
const sections = html => [...html.matchAll(sectionPattern)].map(m => ({ id: m[2], html: m[0] }));
const mask = html => html.replace(sectionPattern, (full, _quote, id) =>
  expectedSections.includes(id) ? '<AUDITED-SECTION id="' + id + '"/>' : full);
for (const e of changed) {
  const locale = e.path.split('/').at(-1).replace(/\.html$/, '');
  const result = { path: e.path, locale, checks: {}, semanticApproval: 'NOT_DETERMINED', errors: [] };
  const check = (name, fn) => { try { fn(); result.checks[name] = true; } catch (err) {
    result.checks[name] = false; result.errors.push(name + ': ' + err.message);
  }};
  const record = status.locales?.[locale];
  let before = null, after = null, changedSectionIds = [];
  check('statusRecordAndApprovalFlag', () => {
    assert.ok(record, 'missing locale status');
    assert.equal(record.final_verified_aligned, true);
    assert.match(record.before_blob, /^[0-9a-f]{40}$/);
    assert.match(record.after_blob, /^[0-9a-f]{40}$/);
  });
  let historicalAfter = null;
  check('blobLineageAndManifest', () => {
    assert.ok(record, 'no locale record');
    assert.equal(git('rev-parse', manifestCommit + ':' + e.path), record.before_blob);
    const liveBlob = git('hash-object', e.path);
    before = git('cat-file', 'blob', record.before_blob);
    after = readFileSync(e.path, 'utf8').trimEnd();
    const overlay = numericByLocale.get(locale);
    const preNumeric = overlay ? git('cat-file', 'blob', overlay.before_blob) : after;
    if (overlay) {
      assert.equal(overlay.path, e.path);
      assert.equal(overlay.current_blob, liveBlob);
      const erroneous = '<code>14{,}777{,}149</code>';
      assert.equal(preNumeric.split(erroneous).length - 1, 1);
      assert.equal(preNumeric.replace(erroneous, '<code>14,777,149</code>'), after);
    }
    if (locale !== 'ka') {
      assert.equal(overlay ? overlay.before_blob : liveBlob, record.after_blob);
      historicalAfter = preNumeric;
      return;
    }
    // Georgian received an explicitly separate, later semantic patch.
    // Its historical status remains immutable, and the overlay has its own lineage.
    const patch = JSON.parse(readFileSync(
      'artifacts/website-i18n-provenance-audit/ka-postcanonical-patch.json', 'utf8'));
    assert.equal(patch.locale, locale);
    assert.equal(patch.path, e.path);
    assert.equal(patch.historical_after_blob, record.after_blob);
    assert.equal(patch.current_after_patch_blob, overlay ? overlay.before_blob : liveBlob);
    assert.equal(patch.historical_status_mutated, false);
    assert.equal(patch.semantic_translation_approval, 'NOT_DETERMINED');
    assert.match(patch.semantic_patch_commit, /^[0-9a-f]{40}$/);
    historicalAfter = git('cat-file', 'blob', record.after_blob);
    const oldSections = sections(historicalAfter);
    const newSections = sections(preNumeric);
    assert.deepEqual(oldSections.map(s => s.id), newSections.map(s => s.id));
    const changedPatchIds = oldSections.filter((s, i) => s.html !== newSections[i].html)
      .map(s => s.id).sort();
    assert.deepEqual(changedPatchIds, [...patch.changed_section_ids].sort());
    assert.ok(changedPatchIds.every(id => expectedSections.includes(id)));
    const maskPatch = html => html.replace(sectionPattern, (full, _quote, id) =>
      changedPatchIds.includes(id) ? '<PATCHED-SECTION id="' + id + '"/>' : full);
    assert.equal(maskPatch(historicalAfter), maskPatch(preNumeric),
      'Georgian postcanonical patch changed undeclared content');
    result.additionalPatch = { currentBlob: liveBlob, changedSectionIds: changedPatchIds };
  });
  check('changedOnlyThreeCanonicalSections', () => {
    assert.notEqual(before, null);
    assert.notEqual(historicalAfter, null);
    const a = sections(before), b = sections(historicalAfter);
    assert.deepEqual(a.map(x => x.id), b.map(x => x.id), 'section IDs/order changed');
    assert.equal(new Set(a.map(x => x.id)).size, a.length, 'duplicate section ID');
    for (const id of expectedSections) {
      const aa = a.find(s => s.id === id), bb = b.find(s => s.id === id);
      assert.ok(aa && bb, 'missing section ' + id);
      if (aa.html !== bb.html) changedSectionIds.push(id);
    }
    assert.ok(changedSectionIds.length > 0, 'no semantic target sections changed');
    assert.equal(mask(before), mask(historicalAfter), 'changes outside three sections');
    assert.deepEqual(sections(after).map(x => x.id), b.map(x => x.id),
      'live section IDs/order changed');
    assert.equal(mask(historicalAfter), mask(numericByLocale.has(locale) ? git('cat-file', 'blob', numericByLocale.get(locale).before_blob) : after),
      'live content changed outside canonical sections');
  });
  let passes = [];
  check('recordedPassSequence', () => {
    const prefix = locale + '.pass';
    const nums = passFiles
      .filter(name => name.startsWith(prefix) && /^.+\.pass\d+\.json$/.test(name))
      .map(name => Number(name.slice(prefix.length, -'.json'.length)))
      .sort((a, b) => a - b);
    assert.ok(nums.length >= 2, 'at least two historical passes required');
    assert.deepEqual(nums, Array.from({ length: nums.length }, (_, i) => i + 1),
      'historical pass numbering is incomplete');
    passes = nums.map(n => JSON.parse(readFileSync(
      'artifacts/about-canon-semantic-delta-runs/' + locale + '.pass' + n + '.json', 'utf8')));
    const touched = new Set();
    result.manualReviewFlags = [];
    for (let i = 0; i < passes.length; i++) {
      const p = passes[i], n = i + 1;
      assert.ok(['CHANGED', 'RETRY_REQUIRED', 'ALREADY_ALIGNED'].includes(p.verdict),
        'unknown historical verdict on pass ' + n);
      for (const count of [p.proposed_replacement_count, p.replacement_count, p.skipped_replacement_count]) {
        assert.ok(Number.isSafeInteger(count) && count >= 0, 'invalid count on pass ' + n);
      }
      assert.equal(p.replacement_count + p.skipped_replacement_count,
        p.proposed_replacement_count, 'replacement accounting on pass ' + n);
      assert.ok(Array.isArray(p.skipped_replacements));
      assert.equal(p.skipped_replacement_count, p.skipped_replacements.length);
      assert.ok(Array.isArray(p.touched_sections));
      assert.ok(p.touched_sections.every(id => expectedSections.includes(id)));
      for (const id of p.touched_sections) touched.add(id);
      for (const s of p.skipped_replacements) result.manualReviewFlags.push({
        kind: 'HISTORICAL_SKIPPED_REPLACEMENT', pass: n, ...s
      });
      if (p.verdict === 'CHANGED') assert.ok(p.replacement_count > 0,
        'CHANGED without replacements on pass ' + n);
      if (p.verdict === 'RETRY_REQUIRED') {
        assert.equal(p.replacement_count, 0);
        assert.ok(p.skipped_replacement_count > 0);
        assert.deepEqual(p.touched_sections, []);
      }
      if (p.verdict === 'ALREADY_ALIGNED') assert.equal(n, passes.length,
        'ALREADY_ALIGNED before terminal pass');
    }
    assert.deepEqual([...touched].sort(), [...changedSectionIds].sort(),
      'historical touched sections do not match source delta');
    result.historicalPassCount = passes.length;
    result.historicalPassVerdicts = passes.map(p => p.verdict);
  });
  check('terminalPassAligned', () => {
    assert.ok(passes.length > 0, 'missing pass sequence');
    const last = passes.at(-1);
    assert.equal(last.verdict, 'ALREADY_ALIGNED');
    assert.equal(last.proposed_replacement_count, 0);
    assert.equal(last.replacement_count, 0);
    assert.equal(last.skipped_replacement_count, 0);
    assert.deepEqual(last.skipped_replacements, []);
    assert.deepEqual(last.touched_sections, []);
    // A historical terminal response is not an independent dry run of today's content.
    result.historicalTerminalAlignment = 'RECORDED';
    result.currentIndependentIdempotence = 'NOT_DETERMINED';
  });
  result.structuralPass = result.errors.length === 0;
  if (!result.structuralPass) failures.push({ path: e.path, errors: result.errors });
  inspected.push(result);
}
const report = {
  schemaVersion: 1, mode: 'read-only-structural-about-qa', head: git('rev-parse', 'HEAD'),
  manifestCommit, expectedAboutMismatches: 60, aboutEntriesInManifest: entries.length,
  aboutMatched: matching.length, aboutMismatched: changed.length,
  structurallyPassed: inspected.filter(r => r.structuralPass).length,
  structurallyFailed: failures.length,
  manualReviewFlagCount: inspected.reduce((n, r) => n + (r.manualReviewFlags?.length ?? 0), 0),
  contentTranslationApproval: 'NOT_DETERMINED',
  currentIndependentIdempotenceApproval: 'NOT_DETERMINED',
  historicalSkippedReplacementCount: inspected.reduce((n, r) => n + (r.manualReviewFlags?.length ?? 0), 0),
  scope: expectedSections, failures, files: inspected
};
mkdirSync('artifacts/website-i18n-provenance-audit', { recursive: true });
writeFileSync('artifacts/website-i18n-provenance-audit/about-60-structural-qa.json',
  JSON.stringify(report, null, 2) + '\n');
if (changed.length !== 60 || failures.length) {
  console.error('ABOUT_STRUCTURAL_QA_FAILED inspected=' + changed.length + ' failures=' + failures.length + ' NOT_CONTENT_APPROVAL');
  process.exitCode = 1;
} else {
  console.log('ABOUT_STRUCTURAL_QA_PASS inspected=60 checks=' + (inspected.length * 5) + ' failures=0 NOT_CONTENT_APPROVAL');
}
