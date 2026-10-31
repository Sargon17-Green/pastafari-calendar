import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

// Read-only structural audit. Not a translation-accuracy review or checksum approval.
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).trimEnd();
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const status = JSON.parse(readFileSync('artifacts/about-canon-semantic-delta-status.json', 'utf8'));
const manifest = readFileSync('SHA256SUMS.txt', 'utf8').split(/\r?\n/);
const manifestCommit = git('log', '-1', '--format=%H', '--', 'SHA256SUMS.txt');
const expectedSections = ['canonical-names', 'printed-calendar', 'seer'];
const entries = manifest.map(line => /^([a-f0-9]{64})  \*?(.+)$/.exec(line)).filter(Boolean)
  .map(m => ({ path: m[2].replace(/^\.\//, ''), expected: m[1] }))
  .filter(e => /^docs\/about\/content\/[a-z]{2,3}\.html$/.test(e.path));
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
  check('blobLineageAndManifest', () => {
    assert.ok(record, 'no locale record');
    assert.equal(git('rev-parse', manifestCommit + ':' + e.path), record.before_blob);
    assert.equal(git('hash-object', e.path), record.after_blob);
    assert.notEqual(record.before_blob, record.after_blob);
    before = git('cat-file', 'blob', record.before_blob);
    after = readFileSync(e.path, 'utf8').trimEnd();
  });
  check('changedOnlyThreeCanonicalSections', () => {
    assert.notEqual(before, null);
    const a = sections(before), b = sections(after);
    assert.deepEqual(a.map(x => x.id), b.map(x => x.id), 'section IDs/order changed');
    assert.equal(new Set(a.map(x => x.id)).size, a.length, 'duplicate section ID');
    for (const id of expectedSections) {
      const aa = a.find(s => s.id === id), bb = b.find(s => s.id === id);
      assert.ok(aa && bb, 'missing section ' + id);
      if (aa.html !== bb.html) changedSectionIds.push(id);
    }
    assert.ok(changedSectionIds.length > 0, 'no semantic target sections changed');
    assert.equal(mask(before), mask(after), 'changes outside three sections');
  });
  let p1, p2;
  check('firstPassRecorded', () => {
    p1 = JSON.parse(readFileSync('artifacts/about-canon-semantic-delta-runs/' + locale + '.pass1.json', 'utf8'));
    assert.equal(p1.verdict, 'CHANGED');
    assert.ok(p1.replacement_count > 0);
    assert.equal(p1.replacement_count + p1.skipped_replacement_count, p1.proposed_replacement_count);
    assert.equal(p1.skipped_replacement_count, p1.skipped_replacements.length);
    assert.ok(p1.touched_sections.every(id => expectedSections.includes(id)));
    assert.deepEqual([...p1.touched_sections].sort(), [...changedSectionIds].sort());
    result.manualReviewFlags = p1.skipped_replacements.map(x => ({
      kind: 'SKIPPED_FIRST_PASS_REPLACEMENT', index: x.index, reason: x.reason, count: x.count
    }));
  });
  check('idempotentSecondPass', () => {
    p2 = JSON.parse(readFileSync('artifacts/about-canon-semantic-delta-runs/' + locale + '.pass2.json', 'utf8'));
    assert.equal(p2.verdict, 'ALREADY_ALIGNED');
    assert.equal(p2.replacement_count, 0);
    assert.equal(p2.proposed_replacement_count, 0);
    assert.equal(p2.skipped_replacement_count, 0);
    assert.deepEqual(p2.touched_sections, []);
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
