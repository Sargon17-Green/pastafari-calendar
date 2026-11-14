import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import { loadLocale } from "../docs/i18n/registry.js";
import { ARTICLE_LOCALES } from "../docs/about/content/registry.js";

const ROOT = new URL("../docs/about/", import.meta.url);
const IDS = Object.freeze([
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

test("the original French source draft has all 16 current-canon article IDs and 15 navigable sections", async () => {
  const html = await readFile(new URL("drafts/fr.partial.html", ROOT), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, IDS);
  assert.equal(new Set(ids).size, IDS.length);
  assert.equal((html.match(/data-toc-section/g) ?? []).length, 15);
  assert.equal((html.match(/<details class="about-name-details">/g) ?? []).length, 64);
  assert.equal((html.match(/<summary>/g) ?? []).length, 64);
  assert.equal(ARTICLE_LOCALES.fr?.code, "fr", "only the release candidate branch may register the complete French article");
});

test("all 64 French names retain canonical ID order and approved UI labels", async () => {
  const html = await readFile(new URL("drafts/fr.partial.html", ROOT), "utf8");
  const cutlets = await readFile(new URL("drafts/fr.canonical-names.cutlets.partial.html", ROOT), "utf8");
  const months = await readFile(new URL("drafts/fr.canonical-names.months.partial.html", ROOT), "utf8");
  const locale = await loadLocale("fr");
  const expected = [
    ...CUTLETS.map(({ id }) => locale.calendar.cutlets[id]),
    ...MONTHS.map(({ id }) => locale.calendar.months[id]),
  ];
  const summaries = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => match[1]);
  assert.equal(expected.length, 64);
  assert.deepEqual(summaries, expected);
  assert.deepEqual([...cutlets.matchAll(/<summary>([^<]+)<\/summary>/g)].map(m => m[1]), expected.slice(0, 17));
  assert.deepEqual([...months.matchAll(/<summary>([^<]+)<\/summary>/g)].map(m => m[1]), expected.slice(17));
  const explanations = [...html.matchAll(/<details class="about-name-details">\s*<summary>[^<]+<\/summary>\s*<p>([\s\S]+?)<\/p>\s*<\/details>/g)];
  assert.equal(explanations.length, 64);
  for (const [i, item] of explanations.entries()) {
    assert.ok(item[1].trim().length > 20, `missing explanation for canonical index ${i}`);
  }
});

test("exceptional French canonical descriptions retain exact numeric constraints", async () => {
  const html = await readFile(new URL("drafts/fr.partial.html", ROOT), "utf8");
  assert.ok(html.includes("|x − 4/9| ≤ e/103"), "four-ninths lexeme tolerance must be exact");
  assert.ok(html.includes("|x − 3/5| ≤ 1/367"), "three-fifths lexeme tolerance must be exact");
  assert.ok(html.includes("−6°"), "spleen extension must preserve the solar elevation boundary");
  assert.ok(html.includes("180 à 220 ml"), "spleen extension must preserve both container-capacity limits");
  assert.match(html, /céramique[\s\S]{0,120}glaçure rouge/);
  assert.ok(html.includes("fausse couche"), "earlier miscarriage must not disqualify the first live offspring");
  assert.ok(html.includes("mort-né"), "earlier stillbirth must not disqualify the first live offspring");
  assert.ok(html.includes("capacité du récipient, et non sur la quantité"), "volume refers to vessel capacity, not milk collected");
  assert.ok(html.includes("volontairement laissé indéterminé"), "sun-window endpoint inclusion is intentionally unresolved");
  assert.ok(html.includes("passage inférieur du centre de Vénus"), "day boundary must use Venus lower meridian transit");
  assert.ok(html.includes("pas encore entièrement fixé par le canon"), "astronomical numeric model must not be treated as canonically closed");
});

test("French full draft preserves fixed historical anchors and marks empirical findings", async () => {
  const html = await readFile(new URL("drafts/fr.partial.html", ROOT), "utf8");
  for (const exactNumber of [
    "5 781", "5 778", "4 096", "86 016",
    "4 275", "4 343", "7,27", "41,1", "97,482 %",
    "2,998 %", "77,56 %", "51 954", "14 777 149",
  ]) assert.ok(html.includes(exactNumber), `missing factual boundary: ${exactNumber}`);
  assert.match(html, /22 décembre 41 222 avant notre ère/);
  assert.match(html, /15 juin 763 avant notre ère/);
  assert.match(html, /7 juin 763 avant notre ère/);
  assert.match(html, /constatations empiriques tirées d’un échantillon/);
  assert.match(html, /ne constitue pas, à lui seul, une preuve mathématique/);
});

test("French draft explicitly separates the canon, implementation, and untranslated Monster page", async () => {
  const html = await readFile(new URL("drafts/fr.partial.html", ROOT), "utf8");
  const existingMonster = await readFile(new URL("monster/en.html", ROOT), "utf8");
  assert.ok(existingMonster.length > 300, "linked English Monster fallback must exist");
  assert.match(html, /href="\.\/monster\/en\.html" hreflang="en"/);
  assert.match(html, /en anglais/);
  assert.match(html, /ne constitue pas lui-même une implémentation normative/);
  assert.match(html, /éditions canoniques de la Megillah ne sont pas automatiquement hiérarchisées/);
});

// Compare the *complete* structural tag sequence, not only section IDs.
// This catches missing paragraphs, list entries, definitions, and name disclosures
// even if the translated text still carries the right 16 section anchors.
test("French draft retains the canonical 16-section semantic HTML skeleton", async () => {
  const sourceHe = await readFile(new URL("content/he.html", ROOT), "utf8");
  const sourceEn = await readFile(new URL("content/en.html", ROOT), "utf8");
  const draftFr = await readFile(new URL("drafts/fr.partial.html", ROOT), "utf8");
  const sequence = (html) => [...html.matchAll(
    /<(\/?)(section|div|p|ul|ol|li|dl|dt|dd|blockquote|aside|h2|h3|details|summary|a)(?=[\s>])[^>]*>/g,
  )].map((match) => (match[1] ? "/" : "") + match[2]);
  const hebrew = sequence(sourceHe);
  const english = sequence(sourceEn);
  const french = sequence(draftFr);
  assert.ok(hebrew.length > 700, "full canonical article skeleton must be examined");
  assert.deepEqual(english, hebrew, "Hebrew and English masters should agree structurally");
  assert.deepEqual(french, hebrew, "French draft must not omit or reorder canonical content blocks");
});

test("unpublished French Monster companion preserves the first source section identifiers", async () => {
  const [he, en, partial] = await Promise.all([
    readFile(new URL("monster/index.html", ROOT), "utf8"),
    readFile(new URL("monster/en.html", ROOT), "utf8"),
    readFile(new URL("drafts/fr.monster.partial.html", ROOT), "utf8"),
  ]);
  const names = (html) => [...html.matchAll(/<section id="([^"]+)" class="level2">/g)]
    .map((match) => match[1]);
  const heIds = names(he), enIds = names(en), frIds = names(partial);
  assert.ok(heIds.length >= 20, "the source must contain the full Monster article");
  assert.deepEqual(enIds, heIds, "source articles must share stable section identifiers");
  assert.equal(frIds.length, 25, "all regular Monster sections must be translated, before the appendix");
  assert.deepEqual(frIds, heIds.slice(0, frIds.length));
  assert.equal((partial.match(/<section id=/g) ?? []).length, (partial.match(/<\/section>/g) ?? []).length);
  assert.match(partial, /BROUILLON NON PUBLIÉ/);
  assert.ok(!partial.includes("penguin-appendix"), "Hebrew appendix and its notes are not yet translated or published");
});


test("full unpublished French penguin appendix preserves 13 IDs, 21 notes and complete Hebrew structure", async () => {
  const [hebrew, french] = await Promise.all([
    readFile(new URL("monster/index.html", ROOT), "utf8"),
    readFile(new URL("drafts/fr.monster.penguin.partial.html", ROOT), "utf8"),
  ]);
  const appendixStart = '<section id="נספח-מדוע-אין-להפקיד-ביתחרושת-לדודישמש-בידי-פינגווינים"';
  const begin = hebrew.indexOf(appendixStart);
  assert.ok(begin >= 0, "Hebrew canonical appendix must exist");
  const source = hebrew.slice(begin, hebrew.indexOf("</article>", begin));
  const target = french.slice(french.indexOf(appendixStart));
  const sectionIds = html => [...html.matchAll(/<section id="([^"]+)" class="level3">/g)]
    .map(match => match[1]);
  assert.equal(sectionIds(source).length, 13);
  assert.deepEqual(sectionIds(target), sectionIds(source));
  assert.equal((source.match(/<details class="penguin-note">/g) ?? []).length, 21);
  assert.equal((target.match(/<details class="penguin-note">/g) ?? []).length, 21);
  const structure = html => [...html.matchAll(
    /<(\/?)(section|details|summary|div|h2|h3|p|strong|em|ul|ol|li|a)\b[^>]*>/g,
  )].map(match => match[1] + match[2]);
  const referenceSequence = structure(source);
  assert.equal(referenceSequence.length, 354);
  assert.deepEqual(structure(target), referenceSequence, "nested notes must retain exact source positions");
  assert.equal((target.match(/<section\b/g) ?? []).length, (target.match(/<\/section>/g) ?? []).length);
  assert.equal((target.match(/<details\b/g) ?? []).length, (target.match(/<\/details>/g) ?? []).length);
  assert.match(french, /BROUILLON NON PUBLIÉ/);
  assert.doesNotMatch(french, /SOUS-SECTIONS RESTANTES/);
});


test("all 25 French Monster core sections match the Hebrew canonical paragraph and element counts", async () => {
  const [hebrew, french] = await Promise.all([
    readFile(new URL("monster/index.html", ROOT), "utf8"),
    readFile(new URL("drafts/fr.monster.partial.html", ROOT), "utf8"),
  ]);
  const sliceSections = (html) => {
    const starts = [...html.matchAll(/<section id="([^"]+)" class="level2">/g)];
    const appendix = html.indexOf('<section id="נספח-');
    return starts.map((match, index) => ({
      id: match[1],
      body: html.slice(
        match.index,
        Math.min(starts[index + 1]?.index ?? html.length, appendix < 0 ? html.length : appendix),
      ),
    }));
  };
  const source = sliceSections(hebrew), target = sliceSections(french);
  assert.equal(source.length, 25);
  assert.deepEqual(target.map(({ id }) => id), source.map(({ id }) => id));
  for (const [index, expected] of source.entries()) {
    for (const tag of ["p", "strong", "ul", "ol", "li", "a", "details"]) {
      const count = (s) => (s.match(new RegExp("<" + tag + "(?=[\\s>])", "g")) ?? []).length;
      assert.equal(
        count(target[index].body), count(expected.body),
        "French Monster " + expected.id + ": missing or extra <" + tag + "> element",
      );
    }
  }
});


test("complete standalone French Monster draft is correctly assembled and still unpublished", async () => {
  const [full, core, appendix] = await Promise.all([
    readFile(new URL("drafts/fr.monster.complete.html", ROOT), "utf8"),
    readFile(new URL("drafts/fr.monster.partial.html", ROOT), "utf8"),
    readFile(new URL("drafts/fr.monster.penguin.partial.html", ROOT), "utf8"),
  ]);
  assert.ok(full.startsWith('<!doctype html>\n<html lang="fr" dir="ltr">'));
  assert.match(full, /<meta name="robots" content="noindex">/);
  assert.match(full, /href="\.\.\/\.\.\/styles\.css"/);
  assert.match(full, /href="\.\.\/\?lang=fr"/);
  assert.doesNotMatch(full, /<script>/, "Hebrew locale redirect must not leak into the French preview");
  const stripLeadingComment = html => html.replace(/^\s*<!--[\s\S]*?-->\s*/, "").trim();
  assert.ok(full.includes(stripLeadingComment(core)), "all 25 core sections must be present verbatim");
  assert.ok(full.includes(stripLeadingComment(appendix)), "complete 21-note appendix must be present verbatim");
  assert.equal((full.match(/<article\b/g) ?? []).length, 1);
  assert.equal((full.match(/<\/article>/g) ?? []).length, 1);
  assert.equal((full.match(/<section\b/g) ?? []).length, 39);
  assert.equal((full.match(/<section\b/g) ?? []).length, (full.match(/<\/section>/g) ?? []).length);
  assert.equal((full.match(/<details\b/g) ?? []).length, 22);
  assert.equal((full.match(/<details\b/g) ?? []).length, (full.match(/<\/details>/g) ?? []).length);
  assert.equal((full.match(/<details class="penguin-note">/g) ?? []).length, 21);
});


test("French release candidate has complete localized About and Monster pages without draft indexing instructions", async () => {
  const [article, monster, draftArticle, draftMonster] = await Promise.all([
    readFile(new URL("content/fr.html", ROOT), "utf8"),
    readFile(new URL("monster/fr.html", ROOT), "utf8"),
    readFile(new URL("drafts/fr.partial.html", ROOT), "utf8"),
    readFile(new URL("drafts/fr.monster.complete.html", ROOT), "utf8"),
  ]);
  assert.equal(ARTICLE_LOCALES.fr.code, "fr");
  assert.equal(ARTICLE_LOCALES.fr.dir, "ltr");
  assert.equal(ARTICLE_LOCALES.fr.asset, "./content/fr.html?v=20261114-fr17");
  assert.equal((article.match(/<details class="about-name-details">/g) ?? []).length, 64);
  assert.deepEqual([...article.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]), IDS);
  assert.equal((article.match(/data-toc-section/g) ?? []).length, 15);
  assert.equal((article.match(/<summary>([^<]+)<\/summary>/g) ?? []).length, 64);
  assert.ok(article.includes('href="./monster/fr.html" hreflang="fr"'));
  assert.doesNotMatch(article, /Publication gate|English destination is real/, "no stale draft-only disclaimer in the published article");
  assert.ok(draftArticle.includes('href="./monster/en.html" hreflang="en"'));
  assert.ok(monster.startsWith('<!doctype html>\n<html lang="fr" dir="ltr">'));
  assert.ok(monster.includes('href="../?lang=fr"'));
  assert.ok(monster.includes("penguin-appendix"));
  assert.equal((monster.match(/<details class="penguin-note">/g) ?? []).length, 21);
  assert.equal((monster.match(/<section\b/g) ?? []).length, 39);
  assert.doesNotMatch(monster, /<meta name="robots" content="noindex">/);
  assert.match(draftMonster, /<meta name="robots" content="noindex">/);
  const regularNames = html => [...html.matchAll(/<section id="([^"]+)" class="level2">/g)].map(m => m[1]);
  assert.deepEqual(regularNames(monster), regularNames(draftMonster));
});

test("French release references and Service Worker optional assets are exactly version-aligned", async () => {
  const [aboutScript, aboutShell, worker, registry, monsterIndex] = await Promise.all([
    readFile(new URL("about.js", ROOT), "utf8"),
    readFile(new URL("index.html", ROOT), "utf8"),
    readFile(new URL("../sw.js", ROOT), "utf8"),
    readFile(new URL("content/registry.js", ROOT), "utf8"),
    readFile(new URL("monster/index.html", ROOT), "utf8"),
  ]);
  assert.match(aboutScript, /registry\.js\?v=20261114-fr17/);
  assert.match(aboutShell, /about\.js\?v=20261114-fr17/);
  assert.match(worker, /const VERSION = "pastafari-static-pwa-about-fr-20261114";/);
  for (const asset of [
    "./about/about.js?v=20261114-fr17",
    "./about/content/registry.js?v=20261114-fr17",
    "./about/content/fr.html?v=20261114-fr17",
    "./about/monster/fr.html",
  ]) assert.ok(worker.includes('"' + asset + '"'), "missing PWA asset " + asset);
  assert.match(registry, /fr:\s*Object\.freeze\(\{/);
  assert.match(monsterIndex, /en,af,ar,az,be,bg,bn,bs,ca,cs,da,de,el,eo,es,et,fr/);
});
