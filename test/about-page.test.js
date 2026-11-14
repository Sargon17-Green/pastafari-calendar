import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { ARTICLE_FALLBACK_LOCALE, ARTICLE_LOCALES, resolveArticleLocale } from "../docs/about/content/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");

const EXPECTED_IDS = Object.freeze([
  "about-calendar",
  "date-parts",
  "working-day",
  "year-structure",
  "woven-months",
  "canonical-names",
  "day-boundary",
  "advantages",
  "practical-consequences",
  "foundation-and-tablets",
  "calendar-math",
  "research",
  "calculation",
  "about-the-monster",
  "authority",
  "summary"
]);

test("main page routes explanation links to the standalone about page", async () => {
  const html = await readFile(path.join(DOCS, "index.html"), "utf8");
  const app = await readFile(path.join(DOCS, "app.js"), "utf8");
  assert.equal((html.match(/data-about-link/g) || []).length, 2);
  assert.match(html, /href="\.\/about\/" data-about-link data-i18n="about\.open"/);
  assert.match(html, /href="\.\/about\/" data-about-link data-i18n="about\.openShort"/);
  assert.doesNotMatch(html, /id="user-guide"|href="#user-guide"|data-guide-link/);
  assert.match(app, /function syncAboutLinks\(\)/);
  assert.match(app, /urlWithLanguage\(new URL\("\.\/about\/", location\.href\), activeLocale\.code\)/);
});

test("about page is a lightweight document shell and keeps site usage secondary", async () => {
  const html = await readFile(path.join(DOCS, "about", "index.html"), "utf8");
  const js = await readFile(path.join(DOCS, "about", "about.js"), "utf8");
  assert.match(html, /<article id="article-content"[^>]*tabindex="-1"/);
  assert.match(html, /<details class="about-toc" id="about-toc" open>/);
  assert.match(html, /id="site-usage"/);
  assert.match(html, /<details class="about-site-usage-details" id="site-usage-details">/);
  assert.equal((html.match(/data-i18n="guide\.[1-7]\.heading"/g) || []).length, 7);
  assert.equal((html.match(/data-i18n="guide\.[1-7]\.body"/g) || []).length, 7);
  assert.match(js, /fetch\(url\)/);
  assert.match(js, /buildTableOfContents\(\)/);
  assert.match(js, /focusHashTarget\(\)/);
  assert.match(js, /matchMedia\("\(max-width: 860px\)"\)/);
  assert.match(js, /id === "site-usage"/);
  assert.doesNotMatch(js, /new Worker|pastafari-fast|calendar-converters|reverse-ui|reverse-search-controller/);
});

test("Hebrew explanation preserves the 16 canonical section identifiers and all 64 explanations", async () => {
  const html = await readFile(path.join(DOCS, "about", "content", "he.html"), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, EXPECTED_IDS);
  assert.equal(new Set(ids).size, EXPECTED_IDS.length);
  assert.match(html, /<div class="about-section about-lead" id="about-calendar">/);
  assert.doesNotMatch(html, /<h2>על לוח השנה הפסטפרי<\/h2>/);
  assert.equal((html.match(/<details\b/g) || []).length, 64);
  assert.equal((html.match(/<summary\b/g) || []).length, 64);
  assert.equal((html.match(/data-toc-section/g) || []).length, 15);
  for (const id of EXPECTED_IDS.slice(1)) {
    assert.match(html, new RegExp("id=\"" + id + "\" data-toc-section"));
  }
});

test("registered translated About and Monster pairs preserve canonical structures", async () => {
  const master = await readFile(path.join(DOCS, "about", "content", "he.html"), "utf8");
  const monsterMaster = await readFile(path.join(DOCS, "about", "monster", "index.html"), "utf8");
  const getIds = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const count = (html, re) => (html.match(re) || []).length;
  const monsterIds = getIds(monsterMaster);
  assert.equal(monsterIds.length, 39);
  for (const code of ["en", "af", "ar", "az", "be", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "eo", "es", "et", "fr", "fa"]) {
    const about = await readFile(path.join(DOCS, "about", "content", code + ".html"), "utf8");
    const monster = await readFile(path.join(DOCS, "about", "monster", code + ".html"), "utf8");
    assert.deepEqual(getIds(about), getIds(master), code + " About IDs");
    assert.deepEqual(getIds(monster), monsterIds, code + " Monster IDs");
    assert.equal(count(about, /<details\b/g), 64, code + " details");
    assert.equal(count(about, /<summary\b/g), 64, code + " summaries");
    assert.equal(count(about, /data-toc-section/g), 15, code + " TOC sections");
    assert.ok(about.includes("./monster/" + code + ".html"), code + " localized Monster link");
    assert.ok(monster.includes("../?lang=" + code), code + " localized About return link");
  }
});

test("registered articles resolve directly and missing articles fall back to Hebrew", () => {
  assert.equal(ARTICLE_FALLBACK_LOCALE, "he");
  assert.deepEqual(Object.keys(ARTICLE_LOCALES), ["he", "en", "af", "ar", "az", "be", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "eo", "es", "et", "fr", "fa"]);
  for (const code of ["en", "af", "ar", "az", "be", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "eo", "es", "et", "fr", "fa"]) {
    assert.equal(resolveArticleLocale(code).code, code);
  }
  assert.equal(resolveArticleLocale("fa").code, "fa");
  assert.equal(ARTICLE_LOCALES.ar.dir, "rtl");
  assert.equal(ARTICLE_LOCALES.fa.dir, "rtl");
});


test("every registered UI locale has either a same-language About article or explicit Hebrew fallback", async () => {
  const { LOCALES } = await import("../docs/i18n/registry.js");
  assert.equal(LOCALES.length, 73, "unexpected change to the registered UI locale catalog");
  const known = new Map(LOCALES.map(locale => [locale.code, locale]));
  const articleCodes = Object.keys(ARTICLE_LOCALES);
  assert.equal(new Set(articleCodes).size, articleCodes.length);
  assert.equal(ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE].dir, "rtl");
  for (const code of articleCodes) {
    assert.ok(known.has(code), "published About article without a registered UI locale: " + code);
    assert.equal(ARTICLE_LOCALES[code].dir, known.get(code).dir,
      "article direction disagrees with UI language direction: " + code);
  }
  const missing = [];
  for (const { code } of LOCALES) {
    const resolved = resolveArticleLocale(code);
    assert.ok(resolved && typeof resolved.asset === "string");
    if (Object.hasOwn(ARTICLE_LOCALES, code)) {
      assert.equal(resolved.code, code, "misrouted translated article: " + code);
    } else {
      missing.push(code);
      assert.equal(resolved.code, ARTICLE_FALLBACK_LOCALE,
        "missing article falsely marked as translated: " + code);
    }
  }
  assert.equal(missing.length + articleCodes.length, LOCALES.length);
  // UI resource completeness does not imply that its narrative is translated:
  assert.ok(missing.includes("ky"), "complete Kyrgyz UI must not masquerade as a translated article");
  const aboutPage = await readFile(path.join(DOCS, "about", "about.js"), "utf8");
  assert.match(aboutPage, /elements\["about-language-notice"\]\.hidden = articleCode === activeLocale\.code/);
});
