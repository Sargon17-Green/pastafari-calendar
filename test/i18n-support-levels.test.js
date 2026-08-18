import assert from "node:assert/strict";
import test from "node:test";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import {
  LOCALES,
  SUPPORT_LEVELS,
  auditLocaleResources,
  getLocale,
  loadAllLocaleSources,
  materializeLocaleResources,
  validateLocaleInventory,
  validateLocaleSourceContract,
  validateRegistryMetadata,
} from "../docs/i18n/registry.js";

const record = (keys, prefix) => Object.fromEntries(keys.map((key) => [key, `${prefix}-${key}`]));
const cutletKeys = CUTLETS.map(({ id }) => id);
const monthKeys = MONTHS.map(({ id }) => id);
const termKeys = ["foundationDay", "workingNumber", "queryNumber", "distanceNumber", "sumNumber", "directionNumber", "bowl", "drop", "gate", "yearFiveThousand"];

function sourceFor(metadata, overrides = {}) {
  return {
    code: metadata.code,
    displayName: metadata.displayName,
    dir: metadata.dir,
    intlLocale: metadata.intlLocale,
    messages: { a: `${metadata.code}-a`, b: `${metadata.code}-b` },
    terminology: record(termKeys, metadata.code),
    calendar: {
      cutlets: record(cutletKeys, metadata.code),
      months: record(monthKeys, metadata.code),
    },
    ...overrides,
  };
}

const enMetadata = getLocale("en");
const english = sourceFor(enMetadata, {
  messages: { a: "English A", b: "English B" },
  terminology: record(termKeys, "English"),
  calendar: { cutlets: record(cutletKeys, "English"), months: record(monthKeys, "English") },
});

test("registry is the single source of truth for explicit support levels", () => {
  assert.deepEqual(SUPPORT_LEVELS, ["complete", "partial", "experimental"]);
  assert.equal(LOCALES.length, 72);
  for (const locale of LOCALES) {
    assert(SUPPORT_LEVELS.includes(locale.support), `${locale.code} has no valid support status`);
    assert.equal(locale.experimental === true, locale.support === "experimental");
  }
  assert.deepEqual(LOCALES.filter(({ support }) => support === "complete").map(({ code }) => code), ["he", "en"]);
  assert.equal(LOCALES.filter(({ support }) => support === "partial").length, 70);
  assert.equal(LOCALES.filter(({ support }) => support === "experimental").length, 0);
});

test("a complete locale fails when a required key is missing", () => {
  const metadata = getLocale("he");
  const source = sourceFor(metadata, { messages: { a: "א" } });
  assert.throws(() => validateLocaleSourceContract(source, metadata, english), /Complete locale he is missing messages: b/);
});

test("a partial locale may omit a key and receives it from English fallback", () => {
  const metadata = getLocale("af");
  const source = sourceFor(metadata, { messages: { a: "Afrikaans A" } });
  assert.equal(validateLocaleSourceContract(source, metadata, english), true);
  const resolved = materializeLocaleResources(source, metadata, english);
  assert.equal(resolved.messages.a, "Afrikaans A");
  assert.equal(resolved.messages.b, "English B");
  assert.equal(Object.keys(resolved.calendar.cutlets).length, CUTLETS.length);
  assert.equal(Object.keys(resolved.calendar.months).length, MONTHS.length);
});

test("a minimal experimental locale remains loadable through fallback", () => {
  const metadata = {
    code: "x-exp",
    displayName: "Experimental",
    dir: "ltr",
    intlLocale: "en",
    support: "experimental",
    experimental: true,
    aliases: [],
    asset: "./locales/x-exp.js",
    loader() {},
  };
  const source = {
    code: metadata.code,
    displayName: metadata.displayName,
    dir: metadata.dir,
    intlLocale: metadata.intlLocale,
    messages: { a: "Local A" },
  };
  assert.equal(validateLocaleSourceContract(source, metadata, english), true);
  const resolved = materializeLocaleResources(source, metadata, english);
  assert.equal(resolved.messages.a, "Local A");
  assert.equal(resolved.messages.b, "English B");
  assert.deepEqual(Object.keys(resolved.terminology).sort(), Object.keys(english.terminology).sort());
  assert.equal(Object.keys(resolved.calendar.cutlets).length, CUTLETS.length);
  assert.equal(Object.keys(resolved.calendar.months).length, MONTHS.length);
});

test("unknown keys are rejected even for experimental locales", () => {
  const metadata = {
    code: "x-exp",
    displayName: "Experimental",
    dir: "ltr",
    intlLocale: "en",
    support: "experimental",
    experimental: true,
    aliases: [],
    asset: "./locales/x-exp.js",
    loader() {},
  };
  const source = {
    code: metadata.code,
    displayName: metadata.displayName,
    dir: metadata.dir,
    intlLocale: metadata.intlLocale,
    messages: { a: "Local A", madeUpKey: "bad" },
  };
  assert.throws(() => validateLocaleSourceContract(source, metadata, english), /unknown messages key madeUpKey/);
});

test("empty, null and non-string overrides are rejected at every support level", () => {
  const metadata = getLocale("af");
  for (const bad of ["", "   ", null, undefined, 123]) {
    const source = sourceFor(metadata, { messages: { a: bad } });
    assert.throws(() => validateLocaleSourceContract(source, metadata, english), /empty or invalid messages value for a/);
  }
});

test("message placeholder names must match the English source while order may differ", () => {
  const metadata = getLocale("af");
  const englishWithPlaceholders = sourceFor(enMetadata, {
    messages: { a: "From {start} to {end}", b: "English B" },
  });
  assert.equal(validateLocaleSourceContract(
    sourceFor(metadata, { messages: { a: "{end} tot {start}" } }),
    metadata,
    englishWithPlaceholders,
  ), true);
  assert.throws(
    () => validateLocaleSourceContract(
      sourceFor(metadata, { messages: { a: "Van {start}" } }),
      metadata,
      englishWithPlaceholders,
    ),
    /placeholder mismatch for a/,
  );
  assert.throws(
    () => validateLocaleSourceContract(
      sourceFor(metadata, { messages: { a: "Van {start} tot {finish}" } }),
      metadata,
      englishWithPlaceholders,
    ),
    /placeholder mismatch for a/,
  );
});

test("malformed resource-group types fail even when fallback is permitted", () => {
  const metadata = getLocale("af");
  assert.throws(
    () => validateLocaleSourceContract(sourceFor(metadata, { terminology: null }), metadata, english),
    /invalid terminology resource group/,
  );
  assert.throws(
    () => validateLocaleSourceContract(sourceFor(metadata, { calendar: { cutlets: [], months: record(monthKeys, "af") } }), metadata, english),
    /invalid calendar\.cutlets resource group/,
  );
});

test("support metadata is not allowed inside a locale source module", () => {
  const metadata = getLocale("af");
  const source = sourceFor(metadata, { support: "complete" });
  assert.throws(() => validateLocaleSourceContract(source, metadata, english), /must not declare support/);
});

test("registry metadata validation catches invalid status, direction, codes and aliases", () => {
  const a = { ...getLocale("en"), aliases: [], loader() {} };
  const b = { ...getLocale("he"), aliases: [], loader() {} };
  assert.equal(validateRegistryMetadata([a, b]), true);
  assert.throws(() => validateRegistryMetadata([{ ...a, support: "gold" }]), /invalid support status/);
  assert.throws(() => validateRegistryMetadata([{ ...a, dir: "auto" }]), /invalid direction/);
  assert.throws(() => validateRegistryMetadata([a, { ...b, code: a.code }]), /Duplicate locale code/);
  assert.throws(() => validateRegistryMetadata([a, { ...b, aliases: [a.code] }]), /duplicates registered locale code/);
  assert.throws(() => validateRegistryMetadata([{ ...a, aliases: ["en-US", "en-us"] }]), /duplicated by/);
});

test("registry/module inventory mismatch is detected in both directions", () => {
  const files = LOCALES.map(({ code }) => `${code}.js`);
  assert.equal(validateLocaleInventory(files), true);
  assert.throws(() => validateLocaleInventory(files.slice(1)), /missing modules/);
  assert.throws(() => validateLocaleInventory([...files, "unregistered.js"]), /unregistered modules/);
});

test("runtime notices are ordinary message resources in every current locale", async () => {
  const keys = ["day.staleWarning", "location.assumption", "location.useDevice"];
  const sources = await loadAllLocaleSources();
  for (const locale of sources) {
    for (const key of keys) {
      assert.equal(typeof locale.messages?.[key], "string", `${locale.code} is missing ${key}`);
      assert.notEqual(locale.messages[key].trim(), "", `${locale.code} has an empty ${key}`);
    }
  }
});

test("current partial locales use the normal English fallback only for newly untranslated UI errors and brand text", async () => {
  const report = auditLocaleResources(await loadAllLocaleSources());
  assert.equal(report.length, LOCALES.length);
  const expectedMissingMessages = [
    "app.brand",
    "reverse.error.absoluteDateField",
    "reverse.error.limitPositive",
    "reverse.error.limitSafeInteger",
  ].sort();
  const partial = report.filter(({ status }) => status === "partial");
  assert.equal(partial.length, 70);
  for (const locale of partial) {
    assert.deepEqual(locale.resourceGroups.messages.missingKeys, expectedMissingMessages, `${locale.code} fallback set changed`);
    assert.equal(locale.fallbackKeys, expectedMissingMessages.length);
    assert.equal(locale.proposedStructuralStatus, "partial");
  }
  for (const locale of report.filter(({ status }) => status === "complete")) {
    assert.equal(locale.fallbackKeys, 0, `${locale.code} complete locale must not use fallback`);
    assert.equal(locale.proposedStructuralStatus, "complete-candidate");
  }
});
