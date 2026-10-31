import { strict as assert } from 'node:assert';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// The source is Hebrew HTML. This bounded review does not approve translations or hashes.
const read = path => readFileSync(path, 'utf8');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trimEnd();
const provenance = JSON.parse(read('artifacts/website-i18n-provenance-audit/about-numeric-anchor-patch.json'));
const oldCode = '<code>14{,}777{,}149</code>';
const correctCode = '<code>14,777,149</code>';
const section = html => {
  const start = html.indexOf('id="foundation-and-tablets"');
  assert.ok(start !== -1, 'missing foundation-and-tablets section');
  const end = html.indexOf('</section>', start);
  assert.ok(end > start, 'unterminated foundation-and-tablets');
  return html.slice(start, end);
};
test('Hebrew authoritative HTML contains exact numeric anchor', () => {
  assert.equal(git('hash-object', 'docs/about/content/he.html'), provenance.source_he_blob);
  assert.equal(section(read('docs/about/content/he.html')).split(correctCode).length - 1, 1);
});
for (const entry of provenance.locales) {
  test(entry.locale + ': literal correction only, historical content retained', () => {
    const now = read(entry.path).trimEnd();
    const before = git('cat-file', 'blob', entry.before_blob);
    assert.equal(git('hash-object', entry.path), entry.current_blob);
    assert.equal(section(before).split(oldCode).length - 1, 1);
    assert.equal(section(now).split(correctCode).length - 1, 1);
    assert.equal(now, before.replace(oldCode, correctCode));
  });
}
