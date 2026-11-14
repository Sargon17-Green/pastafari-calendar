import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { ARTICLE_LOCALES } from "../docs/about/content/registry.js";
import faLocale from "../docs/i18n/locales/fa.js";

const ROOT = new URL("../docs/about/", import.meta.url);
const EXPECTED_PREFIX = Object.freeze([
  "about-calendar",
  "date-parts",
  "working-day",
  "year-structure",
  "woven-months",
]);

function sectionIds(html) {
  return [...html.matchAll(/<(?:div|section) class="about-section(?: about-lead)?" id="([^"]+)"/g)]
    .map((match) => match[1]);
}

function tagSequence(html) {
  return [...html.matchAll(/<(\/?)(div|section|p|h2|h3|ul|ol|li|strong|em|code|aside|blockquote|br)\b[^>]*>/g)]
    .map((match) => match[1] + match[2]);
}

test("Persian About remains an unpublished RTL prefix draft", async () => {
  const draft = await readFile(new URL("drafts/fa.partial.html", ROOT), "utf8");
  assert.match(draft, /پیش‌نویس منتشرنشده/);
  assert.equal(faLocale.code, "fa");
  assert.equal(faLocale.dir, "rtl");
  assert.equal(ARTICLE_LOCALES.fa, undefined, "partial Persian About must not be registered");
  assert.deepEqual(sectionIds(draft), EXPECTED_PREFIX);
  assert.equal((draft.match(/data-toc-section/g) ?? []).length, 4);
  assert.doesNotMatch(draft, /id="canonical-names"/);
  assert.doesNotMatch(draft, /<details\b/);
});

test("first five Persian units retain the exact Hebrew structural tag sequence", async () => {
  const [source, draft] = await Promise.all([
    readFile(new URL("content/he.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.partial.html", ROOT), "utf8"),
  ]);
  const sourceStart = source.indexOf('<div class="about-section about-lead"');
  const sourceStop = source.indexOf('<section class="about-section" id="canonical-names"');
  assert.ok(sourceStart >= 0 && sourceStop > sourceStart);
  const hebrewPrefix = source.slice(sourceStart, sourceStop);
  const persianPrefix = draft.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
  assert.deepEqual(sectionIds(persianPrefix), sectionIds(hebrewPrefix));
  assert.equal(tagSequence(hebrewPrefix).length, 142);
  assert.deepEqual(tagSequence(persianPrefix), tagSequence(hebrewPrefix));
});

test("Persian initial explanation preserves the five date fields and independent c,t operands", async () => {
  const draft = await readFile(new URL("drafts/fa.partial.html", ROOT), "utf8");
  assert.match(draft, /دقیقاً پنج جزء/);
  assert.equal((draft.match(/<ol>/g) ?? []).length, 1);
  assert.equal((draft.match(/<li>/g) ?? []).length, 9);
  assert.match(draft, /<strong>روزِ عمل<\/strong>/);
  assert.match(draft, /<strong>روزِ مورد پرسش<\/strong>/);
  assert.match(draft, /<code>F\(c,t\)<\/code>/);
  assert.match(draft, /<code>F\(t\)<\/code>/);
  assert.match(draft, /<code>c=t<\/code>/);
  assert.match(draft, /سال 5000/);
  assert.match(draft, /سال 0/);
  assert.match(draft, /شمارهٔ منفی/);
});

test("Persian year and interwoven-month examples preserve canonical numeric bounds", async () => {
  const draft = await readFile(new URL("drafts/fa.partial.html", ROOT), "utf8");
  for (const number of ["252", "5,778", "251", "5,779", "42", "123", "250", "251", "18", "17", "104", "119", "120"]) {
    assert.ok(draft.includes(number), "missing numeric example: " + number);
  }
  assert.match(draft, /6 تا 17 کتلت/);
  assert.match(draft, /3 تا 47 ماهِ ساختاری/);
  assert.match(draft, /4 تا 123 روز/);
  assert.match(draft, /ماه الف — روز 14/);
  assert.match(draft, /ماه ب — روز 9/);
  assert.match(draft, /ماه الف — روز 15/);
  assert.match(draft, /هفتهٔ رسمی یا کانونی/);
});
