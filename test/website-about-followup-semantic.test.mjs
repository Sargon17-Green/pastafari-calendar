import { strict as assert } from 'node:assert';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// Independent scoped follow-up to failed historical pass/idempotence checks.
// Phrase checks are targeted regressions, NOT a full translation approval.
const status = JSON.parse(readFileSync('artifacts/about-canon-semantic-delta-status.json', 'utf8'));
const read = path => readFileSync(path, 'utf8');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trimEnd();
const requiredIds = ['canonical-names', 'printed-calendar', 'seer'];
const allSections = html => [...html.matchAll(/<section\b[^>]*\bid=(['"])([^'"\s]+)\1[^>]*>[\s\S]*?<\/section>/g)]
  .map(m => ({ id: m[2], text: m[0].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(), raw: m[0] }));

function section(locale, id) {
  const found = allSections(read('docs/about/content/' + locale + '.html')).filter(s => s.id === id);
  assert.equal(found.length, 1, locale + ': expected one section ' + id);
  return found[0].text;
}
function hasAll(text, expressions) {
  for (const re of expressions) assert.match(text, re);
}
const cases = {
  ko: {
    names: [/17개/, /47개/, /투표로 정해지지 않는다/, /번역이나 음역은 개체의 정체성을 바꾸지 않는다/],
    print: [/작업일이 바뀌면 새 달력이 필요할 수 있다/, /이산 알고리즘은 결정론적/, /천문 수치 프로필 자체는 아직 정규 기준으로 채택되지 않았다/, /7개의 숨은 방울/, /46개의 드러난 방울/, /여섯 그릇/, /12번 최종 젓기/],
    seer: [/Seer 자체는 표준 구현이 아니다/, /Seer가 틀린 것이다/, /SLA가 붙은 영구 호스팅형 운영 서비스를 선언한 것이 아니다/],
    passes: [
      { verdict: 'CHANGED', proposed: 3, replaced: 3, skipped: 0 },
      { verdict: 'CHANGED', proposed: 1, replaced: 1, skipped: 0 }
    ]
  },
  pa: {
    names: [/17 ਮਿਆਰੀ ਕਟਲੈਟ ਨਾਮ/, /47 ਮਿਆਰੀ ਮਹੀਨਾ ਨਾਮ/, /ਵੋਟਿੰਗ ਦਾ ਨਤੀਜਾ ਨਹੀਂ/, /ਅਨੁਵਾਦ ਜਾਂ ਲਿਪਾਂਤਰਨ ਨਾਲ ਇਕਾਈ ਦੀ ਪਛਾਣ ਨਹੀਂ ਬਦਲਦੀ/],
    print: [/ਕਾਰਵਾਈ ਦਾ ਦਿਨ ਬਦਲਣ ਤੇ ਨਵਾਂ ਕੈਲੰਡਰ ਲੱਗ ਸਕਦਾ ਹੈ/, /ਐਲਗੋਰਿਦਮ ਸਪਸ਼ਟ ਤੌਰ ਤੇ ਪਰਿਭਾਸ਼ਿਤ ਅਤੇ ਨਿਰਧਾਰਕ ਹੈ/, /ਅੰਕੀ ਮਾਪਦੰਡ ਹਾਲੇ ਕੈਨੋਨੀਕਲ ਨਹੀਂ ਹਨ/, /7 ਲੁਕੀਆਂ/, /46 ਦਿਖਣ ਵਾਲੀਆਂ/, /ਛੇ ਕਟੋਰੇ/, /12 ਅੰਤਿਮ ਮਿਸ਼ਰਣ/],
    seer: [/Seer ਆਪ ਮਿਆਰੀ ਲਾਗੂਕਰਨ ਨਹੀਂ/, /Seer ਗਲਤ ਹੈ/, /SLA ਵਾਲੀ ਸਥਾਈ ਹੋਸਟ ਕੀਤੀ ਉਤਪਾਦਨ ਸੇਵਾ ਦੀ ਘੋਸ਼ਣਾ ਨਹੀਂ/],
    passes: [
      { verdict: 'RETRY_REQUIRED', proposed: 3, replaced: 0, skipped: 3 },
      { verdict: 'CHANGED', proposed: 3, replaced: 3, skipped: 0 }
    ]
  },
  pl: {
    names: [/17 kanonicznych nazw kotletów/, /47 kanonicznych nazw miesięcy/, /nie wynika z głosowania/, /Tłumaczenie ani transliteracja nie zmieniają tożsamości encji/],
    print: [/po zmianie dnia działania może być potrzebny nowy kalendarz/, /dyskretny algorytm kalendarza jest deterministyczny/, /profil liczbowy nie jest jeszcze kanoniczny/, /7 ukrytych/, /46 widocznych/, /sześć mis/, /12 końcowych mieszań/],
    seer: [/sam Seer nie jest implementacją zgodną ze standardem/, /Seer się myli/, /SLA/],
    passes: [
      { verdict: 'CHANGED', proposed: 4, replaced: 4, skipped: 0 },
      { verdict: 'RETRY_REQUIRED', proposed: 1, replaced: 0, skipped: 1 }
    ]
  }
};

for (const [locale, spec] of Object.entries(cases)) {
  test(locale + ': unique canonical sections and retained historical blob', () => {
    const doc = allSections(read('docs/about/content/' + locale + '.html'));
    assert.equal(new Set(doc.map(s => s.id)).size, doc.length);
    for (const id of requiredIds) assert.equal(doc.filter(s => s.id === id).length, 1);
    const record = status.locales[locale];
    assert.ok(record?.final_verified_aligned);
    assert.equal(git('hash-object', 'docs/about/content/' + locale + '.html'), record.after_blob);
  });
  test(locale + ': canonical name identity smoke regressions', () => hasAll(section(locale, 'canonical-names'), spec.names));
  test(locale + ': action-day/discrete-versus-astronomical and hand-calculation smoke regressions', () =>
    hasAll(section(locale, 'printed-calendar'), spec.print));
  test(locale + ': Seer authority and deployment scope smoke regressions', () =>
    hasAll(section(locale, 'seer'), spec.seer));
  test(locale + ': preserve historical pass outcomes without falsely asserting idempotence', () => {
    const actual = [1, 2].map(p => JSON.parse(read('artifacts/about-canon-semantic-delta-runs/' + locale + '.pass' + p + '.json')));
    for (let i = 0; i < 2; i++) {
      const expected = spec.passes[i], p = actual[i];
      assert.equal(p.verdict, expected.verdict);
      assert.equal(p.proposed_replacement_count, expected.proposed);
      assert.equal(p.replacement_count, expected.replaced);
      assert.equal(p.skipped_replacement_count, expected.skipped);
      assert.equal(p.replacement_count + p.skipped_replacement_count, p.proposed_replacement_count);
      assert.equal(p.skipped_replacements.length, p.skipped_replacement_count);
    }
    // These are documented anomalies; they are NOT an idempotence PASS.
    assert.notEqual(actual[1].verdict, 'ALREADY_ALIGNED');
  });
}

test('ka: additional semantic patch has independent, non-rewritten blob lineage', () => {
  const path = 'docs/about/content/ka.html';
  const record = status.locales.ka;
  assert.equal(record.after_blob, '9bb0431b75d806c583f541307f906fc9a624ea1b');
  assert.equal(git('hash-object', path), '7216c551a7d70a896a5baaeeb5d99d0eca3bb7c9');
  const previous = git('cat-file', 'blob', record.after_blob);
  const current = read(path);
  const a = allSections(previous), b = allSections(current);
  assert.deepEqual(a.map(x => x.id), b.map(x => x.id));
  const changed = a.filter((s, i) => s.raw !== b[i].raw).map(s => s.id);
  assert.deepEqual(changed.sort(), ['canonical-names', 'printed-calendar']);
  const mask = html => html.replace(/<section\b[^>]*\bid=(['"])([^'"\s]+)\1[^>]*>[\s\S]*?<\/section>/g,
    (full, _quote, id) => changed.includes(id) ? '<AUDITED-SECTION id="' + id + '"/>' : full);
  assert.equal(mask(previous), mask(current), 'ka patch modified content outside its two documented sections');
});

// A PASS here establishes only bounded structural/phrase/lineage regressions.
// The 60-locale historical audit and independent linguistic approval remain separate.
