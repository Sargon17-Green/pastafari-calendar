"use strict";

import { readFile } from "node:fs/promises";
import { LOCALES, loadAllLocaleSources, validateLocaleResources } from "../docs/i18n/registry.js?v=17-unified-i18n";

const sources = await loadAllLocaleSources();
const english = sources.find(({ code }) => code === "en");
const reverseKeys = Object.keys(english?.messages ?? {}).filter((key) => key.startsWith("reverse.")).sort();
const metadataByCode = new Map(LOCALES.map((locale) => [locale.code, locale]));
const explicitComplete = [];
const fallbackAllowed = [];
const invalidComplete = [];

for (const locale of sources) {
  const metadata = metadataByCode.get(locale.code);
  const source = await readFile(new URL(`../docs/i18n/locales/${locale.code}.js`, import.meta.url), "utf8");
  const explicitKeys = [...source.matchAll(/^\s*["'](reverse\.[^"']+)["']\s*:/gm)].map((match) => match[1]).sort();
  const valuesComplete = reverseKeys.every((key) => typeof locale.messages?.[key] === "string" && locale.messages[key].trim() !== "");
  const keysComplete = explicitKeys.length === reverseKeys.length && explicitKeys.every((key, index) => key === reverseKeys[index]);
  const complete = valuesComplete && keysComplete;

  if (complete) {
    explicitComplete.push(locale.code);
  } else if (metadata?.support === "complete") {
    invalidComplete.push(locale.code);
  } else {
    fallbackAllowed.push(locale.code);
  }
}

validateLocaleResources(sources);
console.log(`Reverse i18n: ${explicitComplete.length}/${LOCALES.length} locales define all ${reverseKeys.length} reverse keys locally.`);
if (fallbackAllowed.length) console.log(`Fallback permitted by support status: ${fallbackAllowed.join(", ")}`);
if (invalidComplete.length) console.log(`Complete locales missing explicit reverse resources: ${invalidComplete.join(", ")}`);
if (process.argv.includes("--require-all") && invalidComplete.length) {
  console.error("A complete locale is missing explicit reverse-search resources; refusing validation.");
  process.exitCode = 1;
}
