import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import { LOCALES, loadLocale } from "../docs/i18n/registry.js";
import { ARTICLE_LOCALES } from "../docs/about/content/registry.js";
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

test("published About translations and site name dictionaries have identical approved labels", async () => {
  for (const code of Object.keys(ARTICLE_LOCALES)) {
    const html = await readFile(new URL(`../docs/about/content/${code}.html`, import.meta.url), "utf8");
    const labels = [...html.matchAll(/<summary>([^<]*)<\/summary>/g)].map((match) =>
      match[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    );
    const locale = await loadLocale(code);
    assert.deepEqual(labels, canonicalNameGroups(locale).flatMap(({ names }) => names.map(({ label }) => label)), code);
  }
});

test("new multilingual About module is included in the offline core and versioned shell", async () => {
  const sw = await readFile(new URL("../docs/sw.js", import.meta.url), "utf8");
  const shell = await readFile(new URL("../docs/about/index.html", import.meta.url), "utf8");
  const about = await readFile(new URL("../docs/about/about.js", import.meta.url), "utf8");
  assert.match(sw, /about\/canonical-names\.js\?v=20261113-multilingual/);
  assert.match(sw, /about\/about\.js\?v=20261114-fr17/);
  assert.match(shell, /about\.js\?v=20261114-fr17/);
  assert.match(about, /synchronizeCanonicalNameSummaries\(elements\["article-content"\], activeLocale\)/);
});

test("the PWA invalidates stale localized name dictionaries", async () => {
  const registry = await readFile(new URL("../docs/i18n/registry.js", import.meta.url), "utf8");
  const sw = await readFile(new URL("../docs/sw.js", import.meta.url), "utf8");
  const revision = registry.match(/const LOCALE_ASSET_REVISION = "([^"]+)"/)?.[1];
  assert.ok(revision, "the locale asset version must be explicit");
  const importVersions = [...registry.matchAll(/import\("\.\/locales\/[a-z-]+\.js\?v=([^"]+)"\)/g)]
    .map((match) => match[1]);
  assert.equal(importVersions.length, LOCALES.length, "every language must have a versioned import");
  assert.ok(importVersions.every((value) => value === revision), "locale imports must agree on the revision");
  assert.ok(
    sw.includes(`"./i18n/locales/en.js?v=${revision}"`),
    "the offline English core must use the same locale revision",
  );
  assert.match(sw, /const LOCALE_REVISION_SEARCH = /);
  assert.match(sw, /await pruneRuntimeCache\(\)/);
});
