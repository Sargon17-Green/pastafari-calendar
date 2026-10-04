import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { ARTICLE_FALLBACK_LOCALE, ARTICLE_LOCALES, resolveArticleLocale } from "../docs/about/content/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");

const EXPECTED_HEBREW_IDS = Object.freeze([
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
  "summary",
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

test("about page remains a lightweight localized document shell", async () => {
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
  assert.doesNotMatch(js, /new Worker|pastafari-fast|calendar-converters|reverse-ui|reverse-search-controller/);
});

test("rebuilt Hebrew explanation preserves its new public contract", async () => {
  const html = await readFile(path.join(DOCS, "about", "content", "he.html"), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, EXPECTED_HEBREW_IDS);
  assert.equal(new Set(ids).size, EXPECTED_HEBREW_IDS.length);
  assert.match(html, /<div class="about-section about-lead" id="about-calendar">/);
  assert.equal((html.match(/<details\b/g) || []).length, 64, "17 cutlets + 47 months must have expandable explanations");
  assert.match(html, /id="canonical-names"/);
  assert.match(html, /id="advantages"/);
  assert.match(html, /id="about-the-monster"/);
  assert.match(html, /href="\.\/monster\/"[^>]*>\s*להסבר מורחב על המפלצת\s*</);
  assert.doesNotMatch(html, /—/, "Hebrew About intentionally uses en-dash rather than em-dash");
  assert.doesNotMatch(html, /דטרמיניסטי/);
  assert.match(html, /רצף הברות/);
  assert.match(html, /e\s*\/\s*103|e\/103/);
  assert.match(html, /1\s*\/\s*367|1\/367/);
});

test("full Hebrew monster page includes the complete penguin appendix", async () => {
  const html = await readFile(path.join(DOCS, "about", "monster", "index.html"), "utf8");
  assert.match(html, /אודות מפלצת הספגטי המעופפת/);
  assert.match(html, /נספח: מדוע אין להפקיד בית־חרושת לדודי־שמש בידי פינגווינים/);
  assert.match(html, /את הפינגווינים עדיף להשאיר בתפקידים שבהם העובדה שהם פינגווינים מהווה יתרון/);
});

test("article registry always has a Hebrew fallback and registered assets are locale-specific", async () => {
  assert.equal(ARTICLE_FALLBACK_LOCALE, "he");
  assert.equal(resolveArticleLocale("he").code, "he");
  assert.equal(ARTICLE_LOCALES.he.code, "he");
  assert.equal(ARTICLE_LOCALES.he.dir, "rtl");

  for (const [code, entry] of Object.entries(ARTICLE_LOCALES)) {
    assert.equal(entry.code, code);
    assert.match(entry.asset, new RegExp(`\\./content/${code}\\.html(?:\\?|$)`));
  }
});
