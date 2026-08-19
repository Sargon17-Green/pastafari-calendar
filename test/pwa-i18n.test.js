import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import { LOCALES, loadAllLocales } from "../docs/i18n/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");

async function sha256(relativePath) {
  const data = await readFile(path.join(ROOT, relativePath));
  return createHash("sha256").update(data).digest("hex");
}

function parseStringArray(source, constantName) {
  const match = source.match(new RegExp(`\\bconst\\s+${constantName}\\s*=\\s*(?:Object\\.freeze\\()?\\[([\\s\\S]*?)\\]\\)?\\s*;`));
  assert.ok(match, `${constantName} list must be present`);
  return [...match[1].matchAll(/"((?:\\.|[^"\\])*)"/g)]
    .map((entry) => JSON.parse(`"${entry[1]}"`));
}

async function assertDeclaredAssetsExist(assets) {
  for (const entry of assets) {
    const pathname = entry.split("?", 1)[0];
    const file = path.join(DOCS, pathname.replace(/^\.\//, ""));
    assert.equal((await stat(file)).isFile(), true, `declared PWA asset does not exist: ${entry}`);
  }
}

test("Pages uses the audited canonical fast engine bytes without a divergent build", async () => {
  assert.equal(
    await sha256("browser/pastafari-calendar-fast.js"),
    "f2deba1ca1dfe876d38f29e98216071fcef7984bae77f931a8b17a9d931a74d4",
  );
  assert.equal(
    await sha256("docs/engine/pastafari-calendar-fast.js"),
    "f2deba1ca1dfe876d38f29e98216071fcef7984bae77f931a8b17a9d931a74d4",
  );
  assert.equal(
    await sha256("docs/engine/pastafari-calendar-fast.js"),
    await sha256("browser/pastafari-calendar-fast.js"),
  );
});


test("stable calendar identifiers preserve the engine's canonical name order", async () => {
  const source = await readFile(path.join(ROOT, "browser/pastafari-calendar-fast.js"), "utf8");
  const cutletBlock = source.match(/const CUTLET_NAMES = Object\.freeze\(\[(.*?)\]\);/s)?.[1];
  const monthBlock = source.match(/const MONTH_NAMES = Object\.freeze\(\[(.*?)\]\);/s)?.[1];
  assert.ok(cutletBlock && monthBlock, "engine name tables must be discoverable");
  const parseStrings = (block) => [...block.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((match) => JSON.parse(`"${match[1]}"`));
  assert.deepEqual(CUTLETS.map(({ internalName }) => internalName), parseStrings(cutletBlock));
  assert.deepEqual(MONTHS.map(({ internalName }) => internalName), parseStrings(monthBlock));
});

test("service worker keeps an atomic core shell and a bounded optional/on-demand cache", async () => {
  const source = await readFile(path.join(DOCS, "sw.js"), "utf8");
  const coreAssets = parseStringArray(source, "CORE_ASSETS");
  const optionalAssets = parseStringArray(source, "OPTIONAL_ASSETS");

  const requiredCore = [
    "./index.html",
    "./styles.css?v=13-reverse-i18n",
    "./app.js?v=20-cutlet-focus",
    "./reverse-ui.js?v=18-unified-i18n",
    "./reverse-search-controller.js",
    "./calendar-input-conventions.js?v=9-calendar-input-conventions",
    "./calendar-converters.js?v=8-year-structure",
    "./observer-location.js?v=10-venus-day-boundary",
    "./venus-day-boundary.js?v=10-venus-day-boundary",
    "./engine/pastafari-diagnostics.js",
    "./engine/pastafari-calendar-fast.js",
    "./engine/pastafari-fast-worker.js?v=8-year-structure",
    "./engine/pastafari-constraints-client.js",
    "./engine/pastafari-constraints.js",
    "./engine/pastafari-reverse-worker.js",
    "./i18n/calendar-identifiers.js?v=8-year-structure",
    "./i18n/registry.js?v=17-unified-i18n",
    "./i18n/runtime.js?v=17-unified-i18n",
    "./i18n/locales/en.js?v=16-unified-i18n",
  ];
  assert.deepEqual(coreAssets, requiredCore, "CORE_ASSETS must describe the complete deterministic offline application shell");
  assert.equal(coreAssets.length, 19);

  const requiredOptional = [
    "./manifest.webmanifest?v=8-year-structure",
    "./icons/icon.svg?v=8-year-structure",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
  ];
  assert.deepEqual(optionalAssets, requiredOptional, "OPTIONAL_ASSETS should contain non-bootstrap PWA metadata/icons only");
  assert.equal(optionalAssets.length, 4);
  assert.deepEqual(coreAssets.filter((entry) => optionalAssets.includes(entry)), [], "Core and optional lists must not overlap");

  await assertDeclaredAssetsExist(coreAssets);
  await assertDeclaredAssetsExist(optionalAssets);

  const localeAssets = coreAssets.filter((entry) => entry.startsWith("./i18n/locales/"));
  assert.deepEqual(localeAssets, ["./i18n/locales/en.js?v=16-unified-i18n"]);
  assert.equal(LOCALES.length, 72, "PWA accounting expects the current 72 registered locales");
  assert.equal(LOCALES.filter(({ code }) => code !== "en").length, 71, "Every non-English locale is optional/on-demand");

  assert.match(source, /const VERSION = "pastafari-static-pwa-hardening-13-diagnostics";/);
  assert.match(source, /const RUNTIME_CACHE = "pastafari-runtime-assets";/);
  assert.match(source, /const OPTIONAL_LOCALE_PATH = \/\^\\\/i18n\\\/locales/);
  assert.match(source, /url\.search === LOCALE_REVISION_SEARCH/);
  assert.match(source, /cacheKey: scoped\(`\.\/__pwa_core__\/\$\{index\}`\)/);
  assert.match(source, /const CORE_COMPLETE_KEY = scoped\("\.\/__pwa_core__\/complete"\);/);
  assert.match(source, /already exists; bump VERSION before changing sw\.js/);
  assert.match(source, /const responses = await Promise\.all\(CORE_ENTRIES\.map/);
  assert.match(source, /validateAssetResponse\(await fetch\(request\), entry\.url, entry\.path\)/);
  assert.match(source, /if \(response\.redirected\) throw new Error/);
  assert.match(source, /finalUrl\.origin !== SCOPE_URL\.origin \|\| finalUrl\.href !== expectedUrl/);
  assert.match(source, /Unexpected Content-Type/);
  assert.match(source, /await self\.skipWaiting\(\);/);
  assert.match(source, /await migrateCompatibleRuntimeEntries\(oldStaticCaches\);/);
  assert.match(source, /await pruneRuntimeCache\(\);/);
  assert.match(source, /await Promise\.all\(oldStaticCaches\.map\(\(name\) => caches\.delete\(name\)\)\);/);
  assert.match(source, /if \(url\.origin !== SCOPE_URL\.origin\) return;/);
  assert.match(source, /if \(isOptionalLocaleRequest\(url\)\)/);
  assert.match(source, /event\.respondWith\(fetch\(event\.request\)\);/);
  assert.doesNotMatch(source, /if \(response\.ok\)\s*\{[\s\S]{0,250}cache\.put\(event\.request/s, "generic same-origin GET caching must not return");

  const html = await readFile(path.join(DOCS, "index.html"), "utf8");
  for (const entry of [
    "./styles.css?v=13-reverse-i18n",
    "./app.js?v=20-cutlet-focus",
    "./manifest.webmanifest?v=8-year-structure",
    "./icons/icon.svg?v=8-year-structure",
  ]) {
    assert.ok(html.includes(entry), `index.html must request the revisioned asset ${entry}`);
  }
  const app = await readFile(path.join(DOCS, "app.js"), "utf8");
  assert.ok(app.includes("./engine/pastafari-fast-worker.js?v=${ASSET_REVISION}"));
  assert.match(app, /document\.readyState === "complete"\) registerServiceWorker\(\)/);
  assert.match(app, /addEventListener\("load", registerServiceWorker, \{ once: true \}\)/);
});

test("registry contains only dynamic locale imports", async () => {
  const source = await readFile(path.join(DOCS, "i18n", "registry.js"), "utf8");
  assert.doesNotMatch(source, /^import\s+\w+\s+from\s+["']\.\/locales\//m);
  const dynamicImports = [...source.matchAll(/import\(["']\.\/locales\/([^"'?]+)\.js\?v=16-unified-i18n["']\)/g)].map((match) => match[1]);
  assert.deepEqual(dynamicImports, LOCALES.map(({ code }) => code));
});

test("every static HTML translation binding exists in every locale", async () => {
  const html = await readFile(path.join(DOCS, "index.html"), "utf8");
  const keys = new Set([...html.matchAll(/\bdata-i18n="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/\bdata-i18n-attr="([^"]+)"/g)) {
    for (const binding of match[1].split(";").map((part) => part.trim()).filter(Boolean)) {
      const separator = binding.indexOf(":");
      assert.ok(separator > 0, `invalid data-i18n-attr binding: ${binding}`);
      keys.add(binding.slice(separator + 1).trim());
    }
  }
  assert.ok(keys.size > 20, "the audit should cover the public UI, not a token sample");
  const locales = await loadAllLocales();
  for (const locale of locales) {
    for (const key of keys) {
      assert.equal(typeof locale.messages[key], "string", `${locale.code} is missing HTML translation key ${key}`);
      assert.notEqual(locale.messages[key].trim(), "", `${locale.code} has an empty HTML translation key ${key}`);
    }
  }
});

test("application logic contains no Hebrew UI literals or hard-coded Hebrew Intl locale", async () => {
  const app = await readFile(path.join(DOCS, "app.js"), "utf8");
  assert.doesNotMatch(app, /[\u0590-\u05ff]/u);
  assert.doesNotMatch(app, /Intl\.(?:NumberFormat|DateTimeFormat)\(\s*["']he(?:-|["'])/u);
});

test("known user-facing runtime text has no side dictionaries or direct locale-table lookup", async () => {
  const registry = await readFile(path.join(DOCS, "i18n", "registry.js"), "utf8");
  const app = await readFile(path.join(DOCS, "app.js"), "utf8");
  const html = await readFile(path.join(DOCS, "index.html"), "utf8");
  for (const identifier of [
    "STALE_DAY_WARNING_TEMPLATES",
    "LOCATION_ASSUMPTION_TEMPLATES",
    "LOCATION_USE_DEVICE_TEMPLATES",
    "staleDayWarning",
    "locationAssumptionNotice",
    "locationUseDeviceLabel",
  ]) {
    assert.equal(registry.includes(identifier), false, `${identifier} must not remain in registry.js`);
    assert.equal(app.includes(identifier), false, `${identifier} must not remain in app.js`);
  }
  assert.doesNotMatch(app, /activeLocale\.messages\s*\[/);
  assert.match(app, /messageTemplate\(activeLocale, key\)/);
  assert.match(html, /class="eyebrow" data-i18n="app\.brand">PASTAFARI<\/p>/);
});

test("the public UI searches dates, keeps ordinary days non-interactive, and aligns desktop comparison rows", async () => {
  const html = await readFile(path.join(DOCS, "index.html"), "utf8");
  const app = await readFile(path.join(DOCS, "app.js"), "utf8");
  assert.match(html, /<form id="target-search-form"/);
  assert.match(html, /<details class="advanced-settings"/);
  assert.match(html, /<table class="comparison-table"/);
  assert.match(html, /href="#user-guide" data-guide-link/);
  assert.doesNotMatch(app, /createElement\("button"\).*day-card/s);
  assert.match(app, /createElement\("article"\);\n\s*card\.className = "day-card"/);
  assert.match(app, /secondary\.jdn !== primary\.jdn/);
  assert.match(app, /operation === "getRangeView"|workerRequest\("getRangeView"/);
  assert.match(html, /id="year-overview"/);
  assert.match(app, /workerRequest\("getYearStructure"/);
});

test("manifest is valid JSON with localized metadata for every registered locale", async () => {
  const manifest = JSON.parse(await readFile(path.join(DOCS, "manifest.webmanifest"), "utf8"));
  assert.equal(manifest.lang, "en");
  assert.equal(manifest.dir, "ltr");
  assert.equal(manifest.name, "Pastafari Calendar");

  const expectedCodes = LOCALES.map(({ code }) => code).sort();
  const resources = new Map((await loadAllLocales()).map((locale) => [locale.code, locale]));
  for (const field of ["name_localized", "short_name_localized", "description_localized"]) {
    assert.deepEqual(Object.keys(manifest[field]).sort(), expectedCodes);
  }

  for (const locale of LOCALES) {
    const name = manifest.name_localized[locale.code];
    const shortName = manifest.short_name_localized[locale.code];
    const description = manifest.description_localized[locale.code];
    for (const entry of [name, shortName, description]) {
      assert.equal(entry.lang, locale.code);
      assert.equal(entry.dir, locale.dir);
      assert.equal(typeof entry.value, "string");
      assert.notEqual(entry.value.trim(), "");
    }
    const resource = resources.get(locale.code);
    assert.equal(name.value, resource.messages["app.title"]);
    assert.equal(shortName.value, resource.messages["manifest.shortName"]);
    assert.equal(description.value, resource.messages["meta.description"]);
  }

  const english = resources.get("en");
  assert.equal(manifest.name, english.messages["app.title"]);
  assert.equal(manifest.short_name, english.messages["manifest.shortName"]);
  assert.equal(manifest.description, english.messages["manifest.defaultDescription"]);
  assert.equal(manifest.short_name_localized.en.value, "Pastafari");
  assert.equal(manifest.short_name_localized.he.value, "פסטפרי");
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 2);
});
