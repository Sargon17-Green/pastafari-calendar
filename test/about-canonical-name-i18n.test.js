import assert from "node:assert/strict";
import test from "node:test";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import { LOCALES, loadLocale } from "../docs/i18n/registry.js";
import {
  canonicalNameGroups,
  synchronizeCanonicalNameSummaries,
} from "../docs/about/canonical-names.js";

function fakeArticle(lengths = [CUTLETS.length, MONTHS.length]) {
  const summaries = lengths.map((count) => Array.from({ length: count }, () => ({
    textContent: "initial",
    dataset: {},
    lang: "",
    dir: "",
  })));
  const lists = summaries.map((values) => ({
    querySelectorAll(query) {
      assert.equal(query, ":scope > li > details > summary");
      return values;
    },
  }));
  const section = {
    querySelectorAll(query) {
      assert.equal(query, "ul.about-name-disclosure-list");
      return lists;
    },
  };
  return {
    summaries,
    querySelector(query) {
      assert.equal(query, "#canonical-names");
      return section;
    },
  };
}

test("all registered site languages resolve the 17+47 stable canonical names", async () => {
  assert.ok(LOCALES.length >= 73);
  for (const { code } of LOCALES) {
    const locale = await loadLocale(code);
    const groups = canonicalNameGroups(locale);
    assert.deepEqual(groups.map(({ type }) => type), ["cutlet", "month"], code);
    assert.deepEqual(groups.map(({ names }) => names.length), [17, 47], code);
    assert.deepEqual(groups[0].names.map(({ id }) => id), CUTLETS.map(({ id }) => id), code);
    assert.deepEqual(groups[1].names.map(({ id }) => id), MONTHS.map(({ id }) => id), code);
    for (const { names } of groups) {
      for (const { label } of names) assert.ok(label.trim().length > 0, code);
    }
  }
});

test("the About name disclosures follow the selected locale even on article fallback", async () => {
  for (const code of ["he", "en", "ar", "et", "fa", "ky", "zh"]) {
    const locale = await loadLocale(code);
    const article = fakeArticle();
    assert.equal(synchronizeCanonicalNameSummaries(article, locale), 64);
    const flattened = article.summaries.flat();
    const names = canonicalNameGroups(locale).flatMap(({ names }) => names);
    for (const [index, summary] of flattened.entries()) {
      assert.equal(summary.dataset.canonicalNameId, names[index].id);
      assert.equal(summary.textContent, names[index].label);
      assert.equal(summary.lang, code);
      assert.equal(summary.dir, locale.dir);
    }
  }
});

test("malformed name markup is rejected before mutating any summary", async () => {
  const locale = await loadLocale("en");
  const article = fakeArticle([17, 46]);
  assert.throws(() => synchronizeCanonicalNameSummaries(article, locale), /47/);
  assert.ok(article.summaries.flat().every((summary) => summary.textContent === "initial"));
});
