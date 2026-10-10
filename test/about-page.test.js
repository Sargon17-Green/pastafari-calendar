import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { ARTICLE_FALLBACK_LOCALE, ARTICLE_LOCALES, resolveArticleLocale } from "../docs/about/content/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");

const EXPECTED_IDS = Object.freeze([
  "about-calendar", "date-parts", "working-day", "year-structure",
  "woven-months", "canonical-names", "day-boundary", "advantages",
  "practical-consequences", "foundation-and-tablets", "calendar-math",
  "research", "calculation", "about-the-monster", "authority", "summary",
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

test("Hebrew About article follows the 2026-10-03 editorial rebuild and has valid TOC anchors", async () => {
  const html = await readFile(path.join(DOCS, "about", "content", "he.html"), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, EXPECTED_IDS);
  assert.equal(new Set(ids).size, ids.length, "Every article anchor must be unique");
  assert.match(html, /<div class="about-section about-lead" id="about-calendar">/);
  const tocIds = [...html.matchAll(/<section class="about-section" id="([^"]+)" data-toc-section data-toc-level="2">\s*<h2>/g)]
    .map((match) => match[1]);
  assert.deepEqual(tocIds, EXPECTED_IDS.slice(1), "Every actual article section must have a navigable heading");
  assert.match(html, /<section class="about-section" id="day-boundary" data-toc-section data-toc-level="2">/);
  assert.match(html, /<section class="about-section" id="foundation-and-tablets" data-toc-section data-toc-level="2">/);
  assert.match(html, /<section class="about-section" id="about-the-monster" data-toc-section data-toc-level="2">/);
  assert.match(html, /<a class="guide-link" href="\.\/monster\/">להסבר מורחב על המפלצת<\/a>/);
  assert.match(html, /<section class="about-section" id="authority" data-toc-section data-toc-level="2">/);
  assert.match(html, /<section class="about-section" id="summary" data-toc-section data-toc-level="2">/);
});

test("16 approved translations preserve canonical About and Monster structures", async () => {
  const master = await readFile(path.join(DOCS, "about", "content", "he.html"), "utf8");
  const monsterMaster = await readFile(path.join(DOCS, "about", "monster", "index.html"), "utf8");
  const getIds = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const count = (html, re) => (html.match(re) || []).length;
  const monsterIds = getIds(monsterMaster);
  assert.equal(monsterIds.length, 39);
  for (const code of ["en", "af", "ar", "az", "be", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "eo", "es", "et"]) {
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

test("16 approved articles resolve in their own language; unapproved articles still fall back to Hebrew", () => {
  assert.equal(ARTICLE_FALLBACK_LOCALE, "he");
  assert.deepEqual(Object.keys(ARTICLE_LOCALES), ["he", "en", "af", "ar", "az", "be", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "eo", "es", "et"]);
  for (const code of ["en", "af", "ar", "az", "be", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "eo", "es", "et"]) {
    assert.equal(resolveArticleLocale(code).code, code);
  }
  assert.equal(resolveArticleLocale("fi").code, "he");
  assert.equal(ARTICLE_LOCALES.ar.dir, "rtl");
});

test("legacy near-equivalent About hashes map conservatively", async () => {
  const js = await readFile(path.join(DOCS, "about", "about.js"), "utf8");
  const contents = await readFile(path.join(DOCS, "about", "content", "he.html"), "utf8");
  assert.ok(js.includes('"day-identity": "working-day"'), "legacy alias day-identity");
  assert.ok(contents.includes('id="working-day"'), "target for day-identity");
  assert.ok(js.includes('"year-5000": "working-day"'), "legacy alias year-5000");
  assert.ok(contents.includes('id="working-day"'), "target for year-5000");
  assert.ok(js.includes('"cutlets": "year-structure"'), "legacy alias cutlets");
  assert.ok(contents.includes('id="year-structure"'), "target for cutlets");
  assert.ok(js.includes('"months-and-weaving": "woven-months"'), "legacy alias months-and-weaving");
  assert.ok(contents.includes('id="woven-months"'), "target for months-and-weaving");
  assert.ok(js.includes('"month-interleaving": "woven-months"'), "legacy alias month-interleaving");
  assert.ok(contents.includes('id="woven-months"'), "target for month-interleaving");
  assert.ok(js.includes('"next-day-in-month": "woven-months"'), "legacy alias next-day-in-month");
  assert.ok(contents.includes('id="woven-months"'), "target for next-day-in-month");
  assert.ok(js.includes('"no-weeks": "about-calendar"'), "legacy alias no-weeks");
  assert.ok(contents.includes('id="about-calendar"'), "target for no-weeks");
  assert.ok(js.includes('"month-day-pairs": "calendar-math"'), "legacy alias month-day-pairs");
  assert.ok(contents.includes('id="calendar-math"'), "target for month-day-pairs");
  assert.ok(js.includes('"anniversaries": "practical-consequences"'), "legacy alias anniversaries");
  assert.ok(contents.includes('id="practical-consequences"'), "target for anniversaries");
  assert.ok(js.includes('"printed-calendar": "practical-consequences"'), "legacy alias printed-calendar");
  assert.ok(contents.includes('id="practical-consequences"'), "target for printed-calendar");
  assert.ok(js.includes('"seer": "calculation"'), "legacy alias seer");
  assert.ok(contents.includes('id="calculation"'), "target for seer");
  assert.ok(js.includes('"anchors": "foundation-and-tablets"'), "legacy alias anchors");
  assert.ok(contents.includes('id="foundation-and-tablets"'), "target for anchors");
  assert.ok(!js.includes('"years-and-gates":'), "unresolved hash must not be silently redirected: years-and-gates");
  assert.ok(!js.includes('"short-and-wide-choice":'), "unresolved hash must not be silently redirected: short-and-wide-choice");
  assert.ok(!js.includes('"structural-atlas":'), "unresolved hash must not be silently redirected: structural-atlas");
  assert.ok(!js.includes('"appointments":'), "unresolved hash must not be silently redirected: appointments");
  assert.ok(!js.includes('"travel-and-all-day":'), "unresolved hash must not be silently redirected: travel-and-all-day");
  assert.ok(!js.includes('"site-story":'), "unresolved hash must not be silently redirected: site-story");
  assert.ok(!js.includes('"reverse-conversion":'), "unresolved hash must not be silently redirected: reverse-conversion");
  assert.ok(!js.includes('"far-time-structure":'), "unresolved hash must not be silently redirected: far-time-structure");
  assert.ok(!js.includes('"sauce-history":'), "unresolved hash must not be silently redirected: sauce-history");
  assert.match(js, /Object\.hasOwn\(LEGACY_CLOSE_ANCHOR_TARGETS, id\)/);
  assert.match(js, /target\.focus\(\{ preventScroll: true \}\)/);
});
