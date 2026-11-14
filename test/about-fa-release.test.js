import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import { loadLocale } from "../docs/i18n/registry.js";
import { ARTICLE_LOCALES, resolveArticleLocale } from "../docs/about/content/registry.js";

const DOCS = new URL("../docs/", import.meta.url);
const read = path => readFile(new URL(path, DOCS), "utf8");
const tags = html => [...html.matchAll(
  /<(\/?)(article|section|div|p|ul|ol|li|dl|dt|dd|blockquote|aside|h2|h3|details|summary|a|strong|em|code|br)(?=[\s>])[^>]*>/g,
)].map(m => (m[1] ? "/" : "") + m[2]);
const ids = html => [...html.matchAll(/<section id="([^"]+)"/g)].map(m => m[1]);
const sectionIds = html => [...html.matchAll(/<(?:div|section) class="about-section(?: about-lead)?" id="([^"]+)"/g)].map(m => m[1]);

test("Persian article is registered and links to its own Monster, not Hebrew fallback", async () => {
  const article = await read("about/content/fa.html");
  assert.equal(ARTICLE_LOCALES.fa.code, "fa");
  assert.equal(ARTICLE_LOCALES.fa.dir, "rtl");
  assert.equal(resolveArticleLocale("fa").code, "fa");
  assert.match(ARTICLE_LOCALES.fa.asset, /\.\/content\/fa\.html\?v=20261114-fa18/);
  assert.match(article, /href="\.\/monster\/fa\.html" hreflang="fa"/);
  assert.doesNotMatch(article, /href="\.\/monster\/"(?:\s|>)/);
  assert.equal((article.match(/<summary>/g) ?? []).length, 64);
});

test("all Persian article units and name explanations match the Hebrew semantic skeleton", async () => {
  const [hebrew, persian] = await Promise.all([
    read("about/content/he.html"),
    read("about/content/fa.html"),
  ]);
  const hebrewIDs = sectionIds(hebrew);
  assert.equal(hebrewIDs.length, 16);
  assert.deepEqual(sectionIds(persian), hebrewIDs);
  assert.deepEqual(tags(persian), tags(hebrew));
  assert.equal((persian.match(/data-toc-section/g) ?? []).length, 15);
  const locale = await loadLocale("fa");
  const expected = [
    ...CUTLETS.map(({ id }) => locale.calendar.cutlets[id]),
    ...MONTHS.map(({ id }) => locale.calendar.months[id]),
  ];
  const actual = [...persian.matchAll(/<summary>([^<]*)<\/summary>/g)].map(m => m[1]);
  assert.deepEqual(actual, expected);
  assert.equal(actual.length, 64);
  assert.equal(locale.calendar.months.sand, "ماسه");
  assert.match(persian, /<summary>ماسه<\/summary>/);
  assert.match(persian, /href="\.\/birthdays\/technical\.html"/);
  for (const boundary of ["|x − 4/9| ≤ e/103", "|x − 3/5| ≤ 1/367",
    "−6°", "180–220", "14,777,149", "365,243,000", "97.482%", "77.56%"]) {
    assert.ok(persian.includes(boundary), "missing exact expression: " + boundary);
  }
});

test("Persian Monster content preserves 39 Hebrew anchors, all 21 notes and complete structure", async () => {
  const [hebrew, persian] = await Promise.all([
    read("about/monster/index.html"),
    read("about/monster/fa.html"),
  ]);
  const article = html => html.slice(html.indexOf('<article class="about-article">'),
    html.indexOf("</article>") + "</article>".length);
  const heBody = article(hebrew);
  const faBody = article(persian);
  assert.equal(ids(heBody).length, 39);
  assert.deepEqual(ids(faBody), ids(heBody));
  assert.deepEqual(tags(faBody), tags(heBody));
  assert.equal((faBody.match(/<details class="penguin-note">/g) ?? []).length, 21);
  assert.equal((faBody.match(/<details class="penguin-appendix">/g) ?? []).length, 1);
  assert.match(persian, /<html lang="fa" dir="rtl">/);
  assert.match(persian, /href="\.\.\/\?lang=fa"/);
  assert.doesNotMatch(persian, /<meta name="robots" content="noindex">/);
  assert.doesNotMatch(persian, /پیش‌نویسِ فارسی/);
  assert.match(persian, /styles\.css\?v=16-about-polish/);
});

test("Persian route and optional PWA assets are version-consistent across the UI", async () => {
  const [shell, aboutShell, app, aboutJs, worker, registry, runtime, monsterIndex] =
    await Promise.all([
      read("index.html"), read("about/index.html"), read("app.js"), read("about/about.js"),
      read("sw.js"), read("i18n/registry.js"), read("i18n/runtime.js"),
      read("about/monster/index.html"),
    ]);
  assert.match(shell, /app\.js\?v=25-about-fa-20261114/);
  assert.match(aboutShell, /about\.js\?v=20261114-fa18/);
  assert.match(app, /i18n\/registry\.js\?v=20-about-fa-20261114/);
  assert.match(aboutJs, /content\/registry\.js\?v=20261114-fa18/);
  assert.match(runtime, /registry\.js\?v=20-about-fa-20261114/);
  assert.match(registry, /LOCALE_ASSET_REVISION = "21-about-fa-20261114"/);
  assert.match(worker, /pastafari-static-pwa-about-fa-20261114/);
  assert.match(worker, /\.\/about\/content\/fa\.html\?v=20261114-fa18/);
  assert.match(worker, /\.\/about\/monster\/fa\.html/);
  assert.match(monsterIndex, /es,et,fr,fa/);
});


test("Persian source-language adaptation avoids stale Hebrew-only copy and circular definitions", async () => {
  const [about, monster] = await Promise.all([
    read("about/content/fa.html"), read("about/monster/fa.html"),
  ]);
  assert.match(about, /بیشتر دربارهٔ هیولای اسپاگتیِ پرنده/);
  assert.doesNotMatch(about, /متنِ کامل فعلاً به عبری/);
  assert.doesNotMatch(about, /پستاندارِ اهلیِ الاغ|عنصر شیمیاییِ قلع|عنصر شیمیاییِ مس/);
  assert.match(about, /Sn/);
  assert.match(about, /Cu/);
  assert.match(about, /Ag/);
  assert.match(monster, /در فارسی این پرسش از نظرِ دستورِ زبان/);
  assert.match(monster, /به زبانِ فارسی قاطی کرده‌ای/);
  assert.doesNotMatch(monster, /به زبانِ عبری قاطی کرده‌ای/);
  assert.match(monster, /پنجاه شیرِ یک‌طرفه/);
});


test("all browser modules use the same live i18n registry revision", async () => {
  const [app, reverse, about, runtime, worker, supportProbe, lazyProbe] = await Promise.all([
    read("app.js"), read("reverse-ui.js"), read("about/about.js"),
    read("i18n/runtime.js"), read("sw.js"),
    readFile(new URL("../scripts/run-i18n-support-smoke.mjs", import.meta.url), "utf8"),
    readFile(new URL("../scripts/run-i18n-lazy-loading-smoke.mjs", import.meta.url), "utf8"),
  ]);
  const current = "20-about-fa-20261114";
  for (const [name, source] of [
    ["app", app], ["reverse", reverse], ["about", about],
    ["runtime", runtime], ["support probe", supportProbe], ["lazy probe", lazyProbe],
  ]) {
    assert.ok(source.includes("i18n/registry.js?v=" + current) || source.includes("./registry.js?v=" + current), name + " must import current registry");
    assert.doesNotMatch(source, /registry\.js\?v=19-about-page/, name + " may not import stale i18n code");
  }
  assert.match(app, /reverse-ui\.js\?v=21-about-fa-20261114/);
  assert.match(worker, /"\.\/reverse-ui\.js\?v=21-about-fa-20261114"/);
  assert.doesNotMatch(worker, /reverse-ui\.js\?v=20-about-page/);
  assert.match(reverse, /registry\.js\?v=20-about-fa-20261114/);
});


test("Persian About preserves all numeric constraints within each Hebrew source unit", async () => {
  const [hebrew, persian] = await Promise.all([
    read("about/content/he.html"),
    read("about/content/fa.html"),
  ]);
  const units = html => {
    const starts = [...html.matchAll(
      /<(?:div|section) class="about-section(?: about-lead)?" id="([^"]+)"/g,
    )];
    return starts.map((match, index) => ({
      id: match[1],
      body: html.slice(match.index, starts[index + 1]?.index ?? html.length),
    }));
  };
  const numbers = html => {
    const visible = html.replace(/<[^>]+>/g, " ").replace(/&[^;]{1,15};/g, " ")
      .replace(/[\u06f0-\u06f9\u0660-\u0669]/g, digit => {
        const code = digit.codePointAt(0);
        return String(code >= 0x6f0 ? code - 0x6f0 : code - 0x660);
      })
      .replace(/\u066c/g, ",").replace(/\u066b/g, ".");
    return [...new Set([...visible.matchAll(/(?<![\w-])[-−]?\d+(?:[,.]\d+)?/g)]
      .map(match => match[0]))].sort();
  };
  const source = units(hebrew);
  const localized = units(persian);
  assert.equal(source.length, 16);
  assert.deepEqual(localized.map(unit => unit.id), source.map(unit => unit.id));
  for (let index = 0; index < source.length; index++) {
    assert.deepEqual(numbers(localized[index].body), numbers(source[index].body),
      "Numerical source parity changed in About unit " + source[index].id);
  }
});
