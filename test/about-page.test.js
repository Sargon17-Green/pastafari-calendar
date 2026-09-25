import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { ARTICLE_FALLBACK_LOCALE, ARTICLE_LOCALES, resolveArticleLocale } from "../docs/about/content/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");

const EXPECTED_IDS = Object.freeze([
  "about-calendar", "date-parts", "working-day", "day-identity", "year-5000",
  "years-and-gates", "cutlets", "months-and-weaving", "month-interleaving",
  "next-day-in-month", "no-weeks", "canonical-names", "month-day-pairs",
  "calculation", "short-and-wide-choice", "structural-atlas", "anniversaries",
  "appointments", "travel-and-all-day", "day-boundary", "printed-calendar",
  "seer", "foundation-and-tablets", "anchors", "site-story", "reverse-conversion",
  "far-time-structure", "sauce-history", "summary",
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

test("Hebrew explanation preserves the full stable deep-link contract", async () => {
  const html = await readFile(path.join(DOCS, "about", "content", "he.html"), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, EXPECTED_IDS);
  assert.equal(new Set(ids).size, EXPECTED_IDS.length);
  assert.match(html, /<div class="about-section about-lead" id="about-calendar">/);
  assert.doesNotMatch(html, /<h2>על לוח השנה הפסטפרי<\/h2>/);
  for (const id of ["anchors", "site-story", "far-time-structure"]) {
    assert.match(html, new RegExp(`id="${id}" data-toc-section data-toc-level="3"`));
  }
  assert.equal((html.match(/class="about-table about-kv-table"/g) || []).length, 2);
  assert.equal((html.match(/class="about-table-scroll about-kv-table-wrap"/g) || []).length, 2);
  assert.match(html, /<th scope="col">גודל שנמדד<\/th><th scope="col">תוצאה במדגם<\/th>/);
  assert.match(html, /<th scope="col">מידע ידוע נוסף על היום<\/th><th scope="col">מספר מועמדים מרבי<\/th>/);
  assert.doesNotMatch(html, /נמדדתוצאה|היוםמספר/);
  assert.ok((html.match(/<bdi dir="ltr">/g) || []).length >= 20, "numeric table values should be isolated from RTL");
  assert.ok((html.match(/class="math-block"/g) || []).length >= 10);
  assert.equal(
    (html.match(/<pre class="math-block" dir="ltr" tabindex="0">/g) || []).length,
    (html.match(/class="math-block"/g) || []).length,
    "Every horizontally scrollable math block must be keyboard-focusable",
  );
  assert.doesNotMatch(html, /\\(?:operatorname|Rightarrow|times|le|text)\b/, "Raw TeX commands should not leak into rendered formulas");
  assert.match(html, /Q = 2<sup>127<\/sup> − 1/);
  assert.match(html, /R = SAVE\(S \+ 149r\)/);
  assert.match(html, /d<sub>K<\/sub>/);
  assert.match(html, /המכניקה שלו, לעומת זאת, מוגדרת במדויק/);
  assert.match(html, /יש תשובה אחת מדויקת/);
});

test("article translation registry deliberately falls back to Hebrew until translations are added", () => {
  assert.equal(ARTICLE_FALLBACK_LOCALE, "he");
  assert.deepEqual(Object.keys(ARTICLE_LOCALES), ["he"]);
  assert.equal(resolveArticleLocale("he").code, "he");
  assert.equal(resolveArticleLocale("en").code, "he");
  assert.equal(resolveArticleLocale("ar").code, "he");
});
