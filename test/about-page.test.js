import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { ARTICLE_FALLBACK_LOCALE, ARTICLE_LOCALES, ARTICLE_ROLLOUT_COMPLETE, resolveArticleLocale } from "../docs/about/content/registry.js";
import { LOCALES } from "../docs/i18n/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const CONTENT = path.join(DOCS, "about", "content");

const EXPECTED_IDS = Object.freeze([
  "about-calendar", "date-parts", "working-day", "day-identity", "year-5000",
  "years-and-gates", "cutlets", "months-and-weaving", "month-interleaving",
  "next-day-in-month", "no-weeks", "canonical-names", "month-day-pairs",
  "calculation", "short-and-wide-choice", "structural-atlas", "anniversaries",
  "appointments", "travel-and-all-day", "day-boundary", "printed-calendar",
  "seer", "foundation-and-tablets", "anchors", "site-story", "reverse-conversion",
  "far-time-structure", "sauce-history", "summary",
]);

const IMMUTABLE_CODE_LITERALS = Object.freeze([
  "F(c,t)",
  "F(t)",
  "day-id",
  "F(c_1,t)",
  "F(c_2,t)",
  "c=t",
  "5000",
  "Q=2^{127}-1",
  "R=\\operatorname{SAVE}(S+149r)",
  "8e155fa4198ea7bcfeb16138ac5d6662706f4d93",
  "RRULE:FREQ=YEARLY",
  "all-day",
  "14{,}777{,}149",
  "F(c,t)=(Y,K,d_K,M,d_M)",
  "F(c,t-H_c)= (Y-p_c,\\ K,\\ d_K,\\ M,\\ d_M)",
  "F(c+T,t+T)=F(c,t)",
]);

const EMPIRICAL_LITERALS = Object.freeze([
  "4,096", "86,016", "625,437", "3,535,422", "4,275.182", "4,343", "716 / 5,778",
  "7.271", "42.00%", "81.29%", "587.963", "41.102", "15.63%", "36.81%", "104.014",
  "100.897", "97.482%", "2.9976%", "40.408", "4,266.653", "24,786", "77.56%", "93.77%",
  "99.44%", "88.89%", "51,954", "250,000",
]);

function idsIn(html) {
  return [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
}

function tableBodyRowCounts(html) {
  return [...html.matchAll(/<table class="about-table">([\s\S]*?)<\/table>/g)].map((table) => {
    const body = table[1].match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1] ?? "";
    return (body.match(/<tr>/g) || []).length;
  });
}

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

test("about page is a lightweight localized shell with a generic article fallback", async () => {
  const html = await readFile(path.join(DOCS, "about", "index.html"), "utf8");
  const js = await readFile(path.join(DOCS, "about", "about.js"), "utf8");
  assert.match(html, /<article id="article-content"[^>]*tabindex="-1"/);
  assert.match(html, /<details class="about-toc" id="about-toc" open>/);
  assert.match(html, /id="site-usage"/);
  assert.match(html, /<details class="about-site-usage-details" id="site-usage-details">/);
  assert.equal((html.match(/data-i18n="guide\.[1-7]\.heading"/g) || []).length, 7);
  assert.equal((html.match(/data-i18n="guide\.[1-7]\.body"/g) || []).length, 7);
  assert.match(html, /data-i18n="about\.fallbackNotice"/);
  assert.doesNotMatch(html, /about\.hebrewOnly/);
  assert.match(js, /html = await fetchArticle\(articleLocale\)/);
  assert.match(js, /resolveArticleLocale\(ARTICLE_FALLBACK_LOCALE\)/);
  assert.match(js, /buildTableOfContents\(\)/);
  assert.match(js, /focusHashTarget\(\)/);
  assert.match(js, /matchMedia\("\(max-width: 760px\)"\)/);
  assert.match(js, /id === "site-usage"/);
  assert.doesNotMatch(js, /new Worker|pastafari-fast|calendar-converters|reverse-ui|reverse-search-controller/);
});

test("article registry mirrors every supported locale without changing site support levels", () => {
  assert.equal(ARTICLE_FALLBACK_LOCALE, "he");
  assert.deepEqual(Object.keys(ARTICLE_LOCALES), LOCALES.map(({ code }) => code));
  for (const locale of LOCALES) {
    const article = ARTICLE_LOCALES[locale.code];
    assert.equal(article.code, locale.code);
    assert.equal(article.lang, locale.intlLocale);
    assert.equal(article.dir, locale.dir);
    assert.match(article.asset, new RegExp(`^\\.\\/content/${locale.code}\\.html\\?v=`));
    assert.equal(resolveArticleLocale(locale.code), article);
  }
  assert.equal(resolveArticleLocale("not-a-locale").code, ARTICLE_FALLBACK_LOCALE);
  assert.deepEqual(
    LOCALES.filter(({ support }) => support === "complete").map(({ code }) => code),
    ["he", "en"],
    "finishing /about/ must not promote partial site locales to complete",
  );
});

test("every present locale article is structurally and semantically guarded", async () => {
  const articleCodes = (await readdir(CONTENT))
    .filter((name) => name.endsWith(".html"))
    .map((name) => name.slice(0, -5))
    .sort();
  const supportedCodes = LOCALES.map(({ code }) => code).sort();
  assert.ok(articleCodes.includes(ARTICLE_FALLBACK_LOCALE), "fallback article must always exist");
  for (const code of articleCodes) assert.ok(supportedCodes.includes(code), `unregistered article locale ${code}`);
  if (ARTICLE_ROLLOUT_COMPLETE) {
    assert.deepEqual(articleCodes, supportedCodes, "completed article rollout must cover every registered locale");
  } else {
    assert.ok(articleCodes.length < supportedCodes.length, "all locale articles exist: flip ARTICLE_ROLLOUT_COMPLETE to true");
  }

  for (const code of articleCodes) {
    const locale = LOCALES.find((entry) => entry.code === code);
    const html = await readFile(path.join(CONTENT, `${code}.html`), "utf8");
    const ids = idsIn(html);
    assert.deepEqual(ids, EXPECTED_IDS, `${locale.code}: stable section ID contract changed`);
    assert.equal(new Set(ids).size, EXPECTED_IDS.length, `${locale.code}: duplicate stable ID`);
    assert.match(html, /<div class="about-section about-lead" id="about-calendar">/);
    for (const id of ["anchors", "site-story", "far-time-structure"]) {
      assert.match(html, new RegExp(`id="${id}" data-toc-section data-toc-level="3"`), `${locale.code}: bad subsection level for ${id}`);
    }
    assert.deepEqual(tableBodyRowCounts(html), [19, 9], `${locale.code}: semantic table rows changed`);
    assert.equal((html.match(/class="about-table"/g) || []).length, 2, `${locale.code}: table count changed`);
    assert.ok((html.match(/class="math-block"/g) || []).length >= 10, `${locale.code}: math blocks unexpectedly missing`);
    assert.equal(
      (html.match(/<pre class="math-block" dir="ltr" tabindex="0">/g) || []).length,
      (html.match(/class="math-block"/g) || []).length,
      `${locale.code}: every math block must stay LTR and keyboard-focusable`,
    );
    for (const literal of IMMUTABLE_CODE_LITERALS) {
      assert.ok(html.includes(literal), `${locale.code}: missing immutable literal ${literal}`);
    }
    for (const literal of EMPIRICAL_LITERALS) {
      assert.ok(html.includes(literal), `${locale.code}: missing empirical value ${literal}`);
    }
    assert.doesNotMatch(html, /<(?:script|iframe|object)\b/i, `${locale.code}: article content must remain inert HTML`);
    assert.doesNotMatch(html, /\b(?:TODO|TBD|TRANSLATE|PLACEHOLDER)\b/i, `${locale.code}: unfinished translation marker`);
    if (locale.code !== "he") {
      assert.doesNotMatch(html, /[\u0590-\u05ff]/u, `${locale.code}: unintended Hebrew leakage`);
    }
  }
});
