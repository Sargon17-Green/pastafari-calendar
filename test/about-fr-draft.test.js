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

test("unpublished French draft has all 16 current-canon article IDs and 15 navigable sections", async () => {
  const html = await readFile(new URL("drafts/fr.partial.html", ROOT), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, IDS);
  assert.equal(new Set(ids).size, IDS.length);
  assert.equal((html.match(/data-toc-section/g) ?? []).length, 15);
  assert.equal((html.match(/<details class="about-name-details">/g) ?? []).length, 64);
  assert.equal((html.match(/<summary>/g) ?? []).length, 64);
  assert.equal(ARTICLE_LOCALES.fr, undefined, "a partial translation must never be registered as published");
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
  assert.equal(frIds.length, 8, "the French Monster companion is an explicitly partial draft");
  assert.deepEqual(frIds, heIds.slice(0, frIds.length));
  assert.equal((partial.match(/<section id=/g) ?? []).length, (partial.match(/<\/section>/g) ?? []).length);
  assert.match(partial, /BROUILLON NON PUBLIÉ/);
});
