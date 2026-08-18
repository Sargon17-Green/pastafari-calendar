"use strict";

import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

import {
  LOCALES,
  loadAllLocaleSources,
  loadLocale,
  translate,
  validateLocaleResources,
} from "../docs/i18n/registry.js";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Pages markup exposes one reverse-search mount point", async () => {
  const html = await read("docs/index.html");
  assert.equal((html.match(/id="reverse-app"/g) || []).length, 1);
  assert.match(html, /id="reverse-panel"[^>]*aria-labelledby="reverse-heading"/);
  assert.match(html, /styles\.css\?v=13-reverse-i18n/);
  assert.match(html, /app\.js\?v=19-unified-i18n/);
});

test("app wires reverse results back into the canonical calendar state", async () => {
  const source = await read("docs/app.js");
  assert.match(source, /createReverseSearchUi/);
  assert.match(source, /reverse-ui\.js\?v=18-unified-i18n/);
  assert.match(source, /function openReversePair\(targetJdn, calculationJdn\)/);
  assert.match(source, /state\.targetJdn = target/);
  assert.match(source, /state\.calculationJdn = calculation/);
  assert.match(source, /loadCutlet\(\)/);
});

test("service worker precaches every module required by offline reverse search", async () => {
  const source = await read("docs/sw.js");
  for (const asset of [
    "./reverse-ui.js?v=18-unified-i18n",
    "./reverse-search-controller.js",
    "./engine/pastafari-calendar-fast.js",
    "./engine/pastafari-constraints-client.js",
    "./engine/pastafari-constraints.js",
    "./engine/pastafari-reverse-worker.js",
  ]) {
    assert.ok(source.includes(`"${asset}"`), `missing precache asset ${asset}`);
  }
});

test("reverse-search resources obey the declared support-level contract", async () => {
  const sources = await loadAllLocaleSources();
  validateLocaleResources(sources);
  const english = sources.find(({ code }) => code === "en");
  const keys = Object.keys(english.messages).filter((key) => key.startsWith("reverse.")).sort();
  assert.equal(keys.length, 99);
  assert.equal(LOCALES.length, 72);

  for (const metadata of LOCALES) {
    const sourceText = await read(`docs/i18n/locales/${metadata.code}.js`);
    const explicit = [...sourceText.matchAll(/^\s*["'](reverse\.[^"']+)["']\s*:/gm)].map((match) => match[1]).sort();
    assert.equal(explicit.every((key) => keys.includes(key)), true, `${metadata.code} has an unknown reverse key`);
    if (metadata.support === "complete") {
      assert.deepEqual(explicit, keys, `${metadata.code} must define every reverse key explicitly`);
    }

    const locale = await loadLocale(metadata.code);
    for (const key of keys) {
      assert.equal(typeof locale.messages[key], "string");
      assert.notEqual(locale.messages[key].trim(), "");
      const rendered = translate(locale, key, { date: "x", count: 1, index: 1, jdn: 1, field: "maxSolutions" });
      assert.equal(typeof rendered, "string");
      assert.notEqual(rendered.trim(), "");
    }
  }
});

test("reverse UI uses the canonical site translator without a side fallback table", async () => {
  const source = await read("docs/reverse-ui.js");
  assert.match(source, /calendarLabel, translate/);
  assert.doesNotMatch(source, /reverseTranslate/);
  assert.doesNotMatch(source, /from\s+["'][^"']*reverse-i18n\.js/);
  assert.doesNotMatch(source, /error\?\.message/);
  assert.match(source, /headingTitle\.id = "reverse-heading"/);
  const sw = await read("docs/sw.js");
  assert.doesNotMatch(sw, /reverse-i18n\.js/);
});

test("known runtime-notice wrappers and direct message-table UI lookups are absent", async () => {
  const registry = await read("docs/i18n/registry.js");
  const app = await read("docs/app.js");
  for (const identifier of ["staleDayWarning", "locationAssumptionNotice", "locationUseDeviceLabel"]) {
    assert.doesNotMatch(registry, new RegExp(`\\b${identifier}\\b`));
    assert.doesNotMatch(app, new RegExp(`\\b${identifier}\\b`));
  }
  assert.doesNotMatch(app, /activeLocale\.messages\s*\[/);
  assert.match(app, /messageTemplate\(activeLocale, key\)/);
});
