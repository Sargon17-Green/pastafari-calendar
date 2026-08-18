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

test("Pages uses the audited canonical fast engine bytes without a divergent build", async () => {
  assert.equal(
    await sha256("browser/pastafari-calendar-fast.js"),
    "61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b",
  );
  assert.equal(
    await sha256("docs/engine/pastafari-calendar-fast.js"),
    "61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b",
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

test("service worker precaches the core shell but not optional locale resources", async () => {
  const source = await readFile(path.join(DOCS, "sw.js"), "utf8");
  const assetBlock = source.match(/const CORE_ASSETS = \[(.*?)\];/s)?.[1];
  assert.ok(assetBlock, "CORE_ASSETS list must be present");
  const assets = [...assetBlock.matchAll(/"(\.\/[^"\n]+)"/g)].map((match) => match[1]);
  const required = [
    "./index.html",
    "./styles.css?v=13-reverse-i18n",
    "./app.js?v=16-accessibility-focus",
    "./reverse-ui.js?v=15-runtime-notices",
    "./reverse-search-controller.js",
    "./calendar-converters.js?v=8-year-structure",
    "./observer-location.js?v=10-venus-day-boundary",
    "./venus-day-boundary.js?v=10-venus-day-boundary",
    "./manifest.webmanifest?v=8-year-structure",
    "./engine/pastafari-calendar-fast.js",
    "./engine/pastafari-fast-worker.js?v=8-year-structure",
    "./engine/pastafari-constraints-client.js",
    "./engine/pastafari-constraints.js",
    "./engine/pastafari-reverse-worker.js",
    "./i18n/calendar-identifiers.js?v=8-year-structure",
    "./i18n/registry.js?v=15-runtime-notices",
    "./i18n/runtime.js?v=15-runtime-notices",
    "./i18n/locales/en.js?v=15-runtime-notices",
  ];
  for (const entry of required) assert.ok(assets.includes(entry), `${entry} is missing from the offline cache`);
  for (const entry of assets) {
    const pathname = entry.split("?", 1)[0];
    const file = path.join(DOCS, pathname.replace(/^\.\//, ""));
    assert.equal((await stat(file)).isFile(), true, `cached asset does not exist: ${entry}`);
  }
  const localeAssets = assets.filter((entry) => entry.startsWith("./i18n/locales/"));
  assert.deepEqual(localeAssets, ["./i18n/locales/en.js?v=15-runtime-notices"]);
  assert.ok(!localeAssets.some((entry) => entry.includes("/hbo.js")));
  assert.match(source, /const OPTIONAL_LOCALE_PATH = \/\\\/i18n\\\/locales/);
  assert.match(source, /await cache\.put\(event\.request, response\.clone\(\)\)/);
  assert.match(source, /const VERSION = "pastafari-static-reverse-search-[^"]+";/);
  const html = await readFile(path.join(DOCS, "index.html"), "utf8");
  for (const entry of [
    "./styles.css?v=13-reverse-i18n",
    "./app.js?v=16-accessibility-focus",
    "./manifest.webmanifest?v=8-year-structure",
  ]) {
    assert.ok(html.includes(entry), `index.html must request the revisioned asset ${entry}`);
  }
  const app = await readFile(path.join(DOCS, "app.js"), "utf8");
  assert.ok(app.includes("./engine/pastafari-fast-worker.js?v=${ASSET_REVISION}"));

});


test("registry contains only dynamic locale imports", async () => {
  const source = await readFile(path.join(DOCS, "i18n", "registry.js"), "utf8");
  assert.doesNotMatch(source, /^import\s+\w+\s+from\s+["']\.\/locales\//m);
  const dynamicImports = [...source.matchAll(/import\(["']\.\/locales\/([^"'?]+)\.js\?v=15-runtime-notices["']\)/g)].map((match) => match[1]);
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
    assert.equal(description.value, resource.messages["meta.description"]);
  }

  assert.equal(manifest.short_name_localized.en.value, "Pastafari");
  assert.equal(manifest.short_name_localized.he.value, "פסטפרי");
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 2);
});
