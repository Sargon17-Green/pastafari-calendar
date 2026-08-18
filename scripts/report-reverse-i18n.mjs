"use strict";

import { readFile } from "node:fs/promises";
import { LOCALES, loadAllLocales, validateLocaleResources } from "../docs/i18n/registry.js?v=15-runtime-notices";

const locales = await loadAllLocales();
const english = locales.find(({ code }) => code === "en");
const reverseKeys = Object.keys(english?.messages ?? {}).filter((key) => key.startsWith("reverse.")).sort();
const complete = [];
const incomplete = [];

for (const locale of locales) {
  const source = await readFile(new URL(`../docs/i18n/locales/${locale.code}.js`, import.meta.url), "utf8");
  const explicitKeys = [...source.matchAll(/^\s*["'](reverse\.[^"']+)["']\s*:/gm)].map((match) => match[1]).sort();
  const valuesComplete = reverseKeys.every((key) => typeof locale.messages[key] === "string" && locale.messages[key].trim() !== "");
  const explicitComplete = explicitKeys.length === reverseKeys.length && explicitKeys.every((key, index) => key === reverseKeys[index]);
  (valuesComplete && explicitComplete ? complete : incomplete).push(locale.code);
}

validateLocaleResources(locales);
console.log(`Reverse i18n: ${complete.length}/${LOCALES.length} locales, ${reverseKeys.length} explicit keys per complete locale.`);
if (incomplete.length) console.log(`Incomplete locales: ${incomplete.join(", ")}`);
if (process.argv.includes("--require-all") && incomplete.length) {
  console.error("Reverse i18n is not complete; refusing final-release validation.");
  process.exitCode = 1;
}
