import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PastafariCalendar, GregorianDate } from '../../browser/pastafari-calendar-core.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const baseline = JSON.parse(fs.readFileSync(path.join(ROOT, 'verification', 'update8', 'stage-01-baseline.json'), 'utf8'));
const ids = new Set(['foundation_same', 'foundation_next', 'foundation_previous']);
const vectors = baseline.canonicalSuccessVectors.filter((entry) => ids.has(entry.id));
assert.equal(vectors.length, 3);
const calendar = new PastafariCalendar({ todayProvider: () => new GregorianDate(2026n, 8, 22) });
const normalize = (value) => ({
  year: String(value.year),
  cutletName: value.cutletName,
  dayInCutlet: value.dayInCutlet,
  monthName: value.monthName,
  dayInMonth: value.dayInMonth,
});
const results = [];
for (const vector of vectors) {
  const actual = normalize(calendar.convertJdn(BigInt(vector.input.targetJdn), { calculationJdn: BigInt(vector.input.calculationJdn) }));
  const expected = {
    year: String(vector.expected.year),
    cutletName: vector.expected.cutletName,
    dayInCutlet: vector.expected.dayInCutlet,
    monthName: vector.expected.monthName,
    dayInMonth: vector.expected.dayInMonth,
  };
  assert.deepEqual(actual, expected, vector.id);
  results.push({ id: vector.id, actual, expected, pass: true });
}
const artifact = {
  schema: 'pastafari.update8.stage05.browser-parity.v1',
  generatedAt: new Date().toISOString(),
  repository: 'Sargon17-Green/pastafari-calendar',
  currentMainCommitAtValidation: process.env.STAGE5_CURRENT_MAIN_COMMIT ?? null,
  productionBaselineCommit: '2bc2d97bd5638b498014ed8c1c925fb735819a6b',
  module: 'browser/pastafari-calendar-core.js',
  vectors: results,
  result: 'PASS',
};
const out = path.join(ROOT, 'artifacts', 'update-08-stage-05-browser-parity.json');
fs.writeFileSync(out, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(JSON.stringify({ result: artifact.result, output: out, vectors: results.map(({id, actual}) => ({id, actual})) }, null, 2));
