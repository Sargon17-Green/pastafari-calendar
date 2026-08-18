"use strict";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_LOCALE,
  LOCALES,
  loadAllLocaleSources,
  validateLocaleResources,
} from "../docs/i18n/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = path.join(ROOT, "docs", "manifest.webmanifest");
const CHECK_ONLY = process.argv.includes("--check");
const unknownArgs = process.argv.slice(2).filter((arg) => arg !== "--check");
if (unknownArgs.length) throw new Error(`Unknown argument: ${unknownArgs[0]}`);

function localizedMap(sourceByCode, key) {
  return Object.fromEntries(LOCALES.map((metadata) => {
    const source = sourceByCode.get(metadata.code);
    const value = source?.messages?.[key];
    if (typeof value !== "string" || value.trim() === "") {
      throw new RangeError(`Manifest-bound message ${key} is missing for ${metadata.code}.`);
    }
    return [metadata.code, { value, lang: metadata.code, dir: metadata.dir }];
  }));
}

const currentText = await readFile(MANIFEST_PATH, "utf8");
const manifest = JSON.parse(currentText);
const sources = await loadAllLocaleSources();
validateLocaleResources(sources);
const sourceByCode = new Map(sources.map((locale) => [locale.code, locale]));
const english = sourceByCode.get(DEFAULT_LOCALE);
if (!english) throw new RangeError(`Missing source locale ${DEFAULT_LOCALE}.`);

manifest.name = english.messages["app.title"];
manifest.name_localized = localizedMap(sourceByCode, "app.title");
manifest.short_name = english.messages["manifest.shortName"];
manifest.short_name_localized = localizedMap(sourceByCode, "manifest.shortName");
manifest.description = english.messages["manifest.defaultDescription"];
manifest.description_localized = localizedMap(sourceByCode, "meta.description");
manifest.lang = english.code;
manifest.dir = english.dir;

const generatedText = `${JSON.stringify(manifest, null, 2)}\n`;
if (CHECK_ONLY) {
  if (generatedText !== currentText) {
    console.error("docs/manifest.webmanifest is out of sync with locale resources. Run npm run sync:manifest-i18n.");
    process.exitCode = 1;
  } else {
    console.log("Manifest i18n is synchronized with locale resources.");
  }
} else {
  await writeFile(MANIFEST_PATH, generatedText, "utf8");
  console.log("Synchronized docs/manifest.webmanifest from locale resources.");
}
