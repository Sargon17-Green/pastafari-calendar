"use strict";

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  LOCALES,
  SUPPORT_LEVELS,
  auditLocaleResources,
  loadAllLocaleSources,
  validateLocaleInventory,
  validateLocaleResources,
  validateRegistryMetadata,
} from "../docs/i18n/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES_DIR = path.join(ROOT, "docs", "i18n", "locales");
const OUTPUT = path.join(ROOT, "artifacts", "i18n", "coverage.json");
const MANIFEST = path.join(ROOT, "docs", "manifest.webmanifest");
const CHECK_ONLY = process.argv.includes("--check");
const NO_WRITE = process.argv.includes("--no-write");

function percentage(value) {
  return `${Number(value).toFixed(2).replace(/\.00$/, "")}%`;
}

function pad(value, length) {
  const text = String(value);
  return text.length >= length ? text : text + " ".repeat(length - text.length);
}

function validateManifestLocalization(manifest, sources) {
  const fields = ["name_localized", "short_name_localized", "description_localized"];
  const expectedCodes = LOCALES.map(({ code }) => code).sort();
  const sourceByCode = new Map(sources.map((source) => [source.code, source]));
  const english = sourceByCode.get("en");
  if (!english) throw new RangeError("English source locale is required for manifest validation.");
  const expectedDefaults = {
    name: english.messages?.["app.title"],
    short_name: english.messages?.["manifest.shortName"],
    description: english.messages?.["manifest.defaultDescription"],
  };
  for (const [field, value] of Object.entries(expectedDefaults)) {
    if (manifest?.[field] !== value) throw new RangeError(`Manifest ${field} is out of sync with the English locale resource.`);
  }
  if (manifest?.lang !== english.code || manifest?.dir !== english.dir) {
    throw new RangeError("Manifest default lang/dir are out of sync with the English locale resource.");
  }

  const messageKeyByField = {
    name_localized: "app.title",
    short_name_localized: "manifest.shortName",
    description_localized: "meta.description",
  };
  for (const field of fields) {
    const table = manifest?.[field];
    if (!table || typeof table !== "object" || Array.isArray(table)) throw new RangeError(`Manifest ${field} must be an object.`);
    const actualCodes = Object.keys(table).sort();
    if (actualCodes.length !== expectedCodes.length || actualCodes.some((code, index) => code !== expectedCodes[index])) {
      throw new RangeError(`Manifest ${field} locale inventory does not match the i18n registry.`);
    }
    for (const metadata of LOCALES) {
      const entry = table[metadata.code];
      const source = sourceByCode.get(metadata.code);
      if (!entry || typeof entry !== "object") throw new RangeError(`Manifest ${field}.${metadata.code} is missing.`);
      if (entry.lang !== metadata.code) throw new RangeError(`Manifest ${field}.${metadata.code} has mismatching lang metadata.`);
      if (entry.dir !== metadata.dir) throw new RangeError(`Manifest ${field}.${metadata.code} has mismatching direction metadata.`);
      if (typeof entry.value !== "string" || entry.value.trim() === "") throw new RangeError(`Manifest ${field}.${metadata.code} has an empty or invalid value.`);
      const expectedValue = source?.messages?.[messageKeyByField[field]];
      if (entry.value !== expectedValue) throw new RangeError(`Manifest ${field}.${metadata.code} is out of sync with locale resources.`);
    }
  }
  return fields;
}

function addManifestCoverage(report, fields) {
  for (const locale of report) {
    locale.resourceGroups.manifest = {
      total: fields.length,
      local: fields.length,
      fallback: 0,
      coverage: 100,
      missingKeys: [],
      emptyKeys: [],
      unknownKeys: [],
      identicalToEnglish: [],
      allowedEnglish: [],
      suspiciousEnglish: [],
    };
    locale.totalKeys += fields.length;
    locale.localKeys += fields.length;
    locale.coverage = Number(((locale.localKeys / locale.totalKeys) * 100).toFixed(2));
  }
}

function printTable(report) {
  const rows = report.map((entry) => ({
    locale: entry.code,
    status: entry.status,
    ui: percentage(entry.resourceGroups.messages.coverage),
    fallbackUi: entry.resourceGroups.messages.fallback,
    terms: percentage(entry.resourceGroups.terminology.coverage),
    cutlets: percentage(entry.resourceGroups.cutlets.coverage),
    months: percentage(entry.resourceGroups.months.coverage),
    manifest: percentage(entry.resourceGroups.manifest.coverage),
    overall: percentage(entry.coverage),
    structural: entry.proposedStructuralStatus,
  }));
  const columns = [
    ["Locale", "locale"], ["Status", "status"], ["Local UI", "ui"], ["Fallback UI", "fallbackUi"],
    ["Terms", "terms"], ["Cutlets", "cutlets"], ["Months", "months"], ["Manifest", "manifest"],
    ["Overall", "overall"], ["Structural", "structural"],
  ];
  const widths = columns.map(([heading, key]) => Math.max(heading.length, ...rows.map((row) => String(row[key]).length)));
  console.log(columns.map(([heading], index) => pad(heading, widths[index])).join("  "));
  console.log(widths.map((width) => "-".repeat(width)).join("  "));
  for (const row of rows) {
    console.log(columns.map(([, key], index) => pad(row[key], widths[index])).join("  "));
  }
}

validateRegistryMetadata();
const files = await readdir(LOCALES_DIR);
validateLocaleInventory(files);
const sources = await loadAllLocaleSources();
validateLocaleResources(sources);
const locales = auditLocaleResources(sources);
const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
const manifestFields = validateManifestLocalization(manifest, sources);
addManifestCoverage(locales, manifestFields);

const statusCounts = Object.fromEntries(SUPPORT_LEVELS.map((status) => [status, LOCALES.filter(({ support }) => support === status).length]));
const fallbackLocales = locales.filter(({ fallbackKeys }) => fallbackKeys > 0).map(({ code }) => code);
const completeCandidates = locales.filter(({ proposedStructuralStatus }) => proposedStructuralStatus === "complete-candidate").map(({ code }) => code);
const suspiciousEnglishSignals = locales.reduce(
  (sum, locale) => sum + Object.values(locale.resourceGroups).reduce((groupSum, group) => groupSum + group.suspiciousEnglish.length, 0),
  0,
);

const payload = {
  schemaVersion: 2,
  registryLocaleCount: LOCALES.length,
  statusCounts,
  fallbackLocaleCount: fallbackLocales.length,
  fallbackLocales,
  completeCandidateCount: completeCandidates.length,
  completeCandidates,
  suspiciousEnglishSignals,
  resourceGroups: ["messages", "terminology", "cutlets", "months", "manifest"],
  locales,
};

printTable(locales);
console.log(`\nLocales: ${LOCALES.length}; complete=${statusCounts.complete ?? 0}; partial=${statusCounts.partial ?? 0}; experimental=${statusCounts.experimental ?? 0}.`);
console.log(`Locales using actual fallback values: ${fallbackLocales.length}. Structural complete-candidates: ${completeCandidates.length}. English-equality heuristic signals: ${suspiciousEnglishSignals}.`);

if (!NO_WRITE) {
  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`JSON: ${path.relative(ROOT, OUTPUT)}`);
}

if (CHECK_ONLY) console.log("i18n support-level validation: PASS");
