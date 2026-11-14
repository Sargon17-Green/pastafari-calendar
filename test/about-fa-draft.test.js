import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { ARTICLE_LOCALES } from "../docs/about/content/registry.js";
import faLocale from "../docs/i18n/locales/fa.js";
import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";

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


test("Persian 17 cutlet disclosure texts match the canonical labels and Hebrew markup", async () => {
  const [hebrew, cutlets] = await Promise.all([
    readFile(new URL("content/he.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.canonical-names.cutlets.partial.html", ROOT), "utf8"),
  ]);
  const start = hebrew.indexOf("<h3>17 הקציצות</h3>");
  const end = hebrew.indexOf("<h3>47 החודשים</h3>");
  assert.ok(start >= 0 && end > start, "Hebrew canonical cutlet block");
  const hebrewCutlets = hebrew.slice(start, end);
  const ids = CUTLETS.map(({ id }) => id);
  const labels = [...cutlets.matchAll(/<summary>([^<]+)<\/summary>/g)].map((m) => m[1]);
  assert.equal(labels.length, 17);
  assert.deepEqual(labels, ids.map((id) => faLocale.calendar.cutlets[id]));
  assert.equal((cutlets.match(/<p>/g) ?? []).length, 17);
  const innerStructure = (s) => [...s.matchAll(
    /<(\/?)(h3|ul|li|details|summary|p|code)\b[^>]*>/g,
  )].map((m) => m[1] + m[2]);
  assert.equal(innerStructure(hebrewCutlets).length, 144);
  assert.deepEqual(innerStructure(cutlets), innerStructure(hebrewCutlets));
  assert.ok(cutlets.includes("<code>|x − 4/9| ≤ e/103</code>"));
  assert.ok(cutlets.includes("<code>e/103</code>"));
  assert.match(cutlets, /این اجازهٔ واژگانی هیچ تغییری/);
  assert.match(cutlets, /کوزهٔ خالی/);
  assert.equal(ARTICLE_LOCALES.fa, undefined);
});

test("Persian 47 month disclosures match canonical IDs, Hebrew structure and critical exceptions", async () => {
  const [hebrew, months] = await Promise.all([
    readFile(new URL("content/he.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.canonical-names.months.partial.html", ROOT), "utf8"),
  ]);
  const start = hebrew.indexOf("<h3>47 החודשים</h3>");
  assert.ok(start >= 0, "Hebrew canonical month heading");
  const end = hebrew.indexOf("</ul>", start) + "</ul>".length;
  assert.ok(end > start, "Hebrew canonical month disclosures");
  const sourceBlock = hebrew.slice(start, end);
  const labels = [...months.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => match[1]);
  assert.equal(labels.length, 47);
  assert.deepEqual(labels, MONTHS.map(({ id }) => faLocale.calendar.months[id]));
  assert.equal((months.match(/<p>/g) ?? []).length, 47);
  const structure = (html) => [...html.matchAll(
    /<(\/?)(h3|ul|li|details|summary|p|code)\b[^>]*>/g,
  )].map((match) => match[1] + match[2]);
  assert.equal(structure(sourceBlock).length, 384);
  assert.deepEqual(structure(months), structure(sourceBlock));
  assert.ok(months.includes("<code>|x − 3/5| ≤ 1/367</code>"));
  assert.ok(months.includes("<code>−6°</code>"));
  assert.match(months, /نخستین نوزادِ زنده/);
  assert.match(months, /سقط یا مرده‌زایی/);
  assert.match(months, /180–220 میلی‌لیتر/);
  assert.match(months, /گنجایشِ ظرف است، نه مقدار/);
  assert.match(months, /هیچ تصمیمِ کانونیِ قطعی/);
  assert.match(months, /دری که بدون چرخاندنِ کلید بسته شده/);
  assert.match(months, /منظور ببر نیست/);
  assert.equal(ARTICLE_LOCALES.fa, undefined, "incomplete draft must stay unpublished");
});

test("assembled Persian sixth article unit is 1:1 with the Hebrew canonical-names structure", async () => {
  const [hebrew, canonicalNames] = await Promise.all([
    readFile(new URL("content/he.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.canonical-names.partial.html", ROOT), "utf8"),
  ]);
  const start = hebrew.indexOf('<section class="about-section" id="canonical-names"');
  const end = hebrew.indexOf("</section>", start) + "</section>".length;
  assert.ok(start >= 0 && end > start, "Hebrew sixth section must exist");
  const source = hebrew.slice(start, end);
  const sectionStructure = (html) => [...html.matchAll(
    /<(\/?)(section|h2|h3|p|ul|li|details|summary|strong|code)\b[^>]*>/g,
  )].map((match) => match[1] + match[2]);
  assert.deepEqual(sectionStructure(canonicalNames), sectionStructure(source));
  assert.deepEqual(sectionIds(canonicalNames), ["canonical-names"]);
  assert.equal((canonicalNames.match(/<summary>/g) ?? []).length, 64);
  assert.match(canonicalNames, /۱۷ نامِ کتلت/);
  assert.match(canonicalNames, /۴۷ نامِ ماه/);
  assert.match(canonicalNames, /هیچ نامی در یک خانواده دو بار/);
  assert.match(canonicalNames, /ترجمه یا آوانویسی/);
  assert.equal(ARTICLE_LOCALES.fa, undefined, "a complete sixth unit does not imply a complete article");
});


test("complete unpublished Persian draft retains all 16 units and source structure", async () => {
  const [source, full, prefix, names, remainder] = await Promise.all([
    readFile(new URL("content/he.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.complete.partial.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.partial.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.canonical-names.partial.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.remaining.partial.html", ROOT), "utf8"),
  ]);
  const clean = html => html.replace(/^\s*<!--[\s\S]*?-->\s*/, "").trimEnd();
  for (const fragment of [prefix, names, remainder]) assert.ok(full.includes(clean(fragment)));
  const sourceBody = source.slice(source.indexOf('<div class="about-section about-lead"'));
  const tags = html => [...html.matchAll(
    /<(\/?)(section|div|p|ul|ol|li|dl|dt|dd|blockquote|aside|h2|h3|details|summary|a|strong|em|code|br)(?=[\s>])[^>]*>/g,
  )].map(m => (m[1] ? "/" : "") + m[2]);
  assert.deepEqual(tags(full), tags(sourceBody));
  assert.deepEqual(sectionIds(full), sectionIds(sourceBody));
  assert.equal(sectionIds(full).length, 16);
  assert.equal((full.match(/data-toc-section/g) ?? []).length, 15);
  assert.equal((full.match(/<summary>/g) ?? []).length, 64);
  for (const n of ["365,243,000", "14,777,149", "5,781", "5,778", "4,096", "86,016", "97.482%", "2.998%", "77.56%", "51,954", "180–220"]) {
    assert.ok(full.includes(n), "canonical number missing: " + n);
  }
  assert.ok(full.includes('href="./birthdays/"'));
  assert.ok(full.includes('href="./birthdays/technical.html"'));
  assert.match(full, /یافته‌های تجربیِ به‌دست‌آمده از نمونه/);
  assert.match(full, /هنوز به‌طور کامل در کانون تثبیت نشده‌اند/);
  assert.equal(ARTICLE_LOCALES.fa, undefined, "a complete draft remains unpublished");
});


test("all 25 Persian Monster main sections retain canonical Hebrew structure", async () => {
  const [source, target] = await Promise.all([
    readFile(new URL("monster/index.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.monster.core.partial.html", ROOT), "utf8"),
  ]);
  const sourceStarts = [...source.matchAll(/<section id="([^"]+)" class="level2">/g)];
  const allCore = source.slice(sourceStarts[0].index, source.indexOf('<section id="נספח-', sourceStarts[24].index));
  const ids = s => [...s.matchAll(/<section id="([^"]+)" class="level2">/g)].map(m => m[1]);
  const tagStructure = s => [...s.matchAll(/<(\/?)(section|h2|p|strong)\b[^>]*>/g)].map(m => m[1] + m[2]);
  assert.deepEqual(ids(target), ids(allCore));
  assert.equal(ids(target).length, 25);
  assert.equal(tagStructure(allCore).length, 290);
  assert.deepEqual(tagStructure(target), tagStructure(allCore));
  assert.match(target, /پیش‌نویسِ منتشرنشده/);
  assert.match(target, /نر، ماده و کربوهیدرات/);
  assert.match(target, /تیغِ اوکام/);
  assert.match(target, /گرانش/);
  assert.match(target, /آنتی‌پاستی/);
  assert.match(target, /کربوهیدرات/);
  assert.equal(ARTICLE_LOCALES.fa, undefined);
});


test("full unpublished Persian Monster companion preserves all source paragraphs and 21 rebuttals", async () => {
  const [source, core, appendix, full] = await Promise.all([
    readFile(new URL("monster/index.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.monster.core.partial.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.monster.penguin.partial.html", ROOT), "utf8"),
    readFile(new URL("drafts/fa.monster.complete.html", ROOT), "utf8"),
  ]);
  const stripComment = html => html.replace(/^\s*<!--[\s\S]*?-->\s*/, "").trim();
  assert.ok(full.includes(stripComment(core)), "assembled Monster must contain all 25 core sections");
  assert.ok(full.includes(stripComment(appendix)), "assembled Monster must contain the entire penguin appendix");

  const articleStart = source.indexOf('<article class="about-article">');
  const articleEnd = source.indexOf("</article>", articleStart) + "</article>".length;
  assert.ok(articleStart >= 0 && articleEnd > articleStart);
  const hebrew = source.slice(articleStart, articleEnd);
  const persianStart = full.indexOf('<article class="about-article">');
  const persianEnd = full.indexOf("</article>", persianStart) + "</article>".length;
  const persian = full.slice(persianStart, persianEnd);
  const semanticTags = html => [...html.matchAll(
    /<(\/?)(article|section|details|summary|div|h2|h3|p|strong|em|ul|ol|li|a)(?=[\s>])[^>]*>/g,
  )].map(match => (match[1] ? "/" : "") + match[2]);
  assert.equal(semanticTags(hebrew).length, 652);
  assert.deepEqual(semanticTags(persian), semanticTags(hebrew));
  const ids = html => [...html.matchAll(/<section id="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(ids(persian), ids(hebrew));
  assert.equal(ids(persian).length, 39);
  assert.equal((persian.match(/<section id="[^"]+" class="level2">/g) ?? []).length, 25);
  assert.equal((persian.match(/<section id="[^"]+" class="level3">/g) ?? []).length, 13);
  assert.equal((persian.match(/<details class="penguin-note">/g) ?? []).length, 21);
  assert.equal((persian.match(/<details class="penguin-appendix">/g) ?? []).length, 1);
  for (const tag of ["section", "details"]) {
    assert.equal((persian.match(new RegExp("<" + tag + "\\b", "g")) ?? []).length,
      (persian.match(new RegExp("</" + tag + ">", "g")) ?? []).length, tag + " must be balanced");
  }
  assert.ok(full.startsWith('<!doctype html>\n<html lang="fa" dir="rtl">'));
  assert.match(full, /<meta name="robots" content="noindex">/);
  assert.doesNotMatch(full, /new URLSearchParams|location\.replace/);
  assert.match(full, /حضورِ هیولا/);
  assert.match(full, /یادداشت/);
  assert.equal(ARTICLE_LOCALES.fa, undefined, "draft must never be published automatically");
});
