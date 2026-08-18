"use strict";

import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

import { LOCALES, translate, validateLocaleResources } from "../docs/i18n/registry.js";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Pages markup exposes one reverse-search mount point", async () => {
  const html = await read("docs/index.html");
  assert.equal((html.match(/id="reverse-app"/g) || []).length, 1);
  assert.match(html, /id="reverse-panel"/);
  assert.match(html, /styles\.css\?v=13-reverse-i18n/);
  assert.match(html, /app\.js\?v=13-reverse-i18n/);
});

test("app wires reverse results back into the canonical calendar state", async () => {
  const source = await read("docs/app.js");
  assert.match(source, /createReverseSearchUi/);
  assert.match(source, /function openReversePair\(targetJdn, calculationJdn\)/);
  assert.match(source, /state\.targetJdn = target/);
  assert.match(source, /state\.calculationJdn = calculation/);
  assert.match(source, /loadCutlet\(\)/);
});

test("service worker precaches every module required by offline reverse search", async () => {
  const source = await read("docs/sw.js");
  for (const asset of [
    "./reverse-ui.js?v=13-reverse-i18n",
    "./reverse-search-controller.js",
    "./engine/pastafari-calendar-fast.js",
    "./engine/pastafari-constraints-client.js",
    "./engine/pastafari-constraints.js",
    "./engine/pastafari-reverse-worker.js",
  ]) {
    assert.ok(source.includes(`"${asset}"`), `missing precache asset ${asset}`);
  }
});

test("all 72 site locales contain complete explicit reverse-search translations", async () => {
  validateLocaleResources();
  const english = LOCALES.find(({ code }) => code === "en");
  const keys = Object.keys(english.messages).filter((key) => key.startsWith("reverse.")).sort();
  assert.equal(keys.length, 96);
  assert.equal(LOCALES.length, 72);
  for (const locale of LOCALES) {
    const source = await read(`docs/i18n/locales/${locale.code}.js`);
    const explicit = [...source.matchAll(/^\s*["'](reverse\.[^"']+)["']\s*:/gm)].map((match) => match[1]).sort();
    assert.deepEqual(explicit, keys, `${locale.code} must define every reverse key explicitly`);
    for (const key of keys) {
      assert.equal(typeof locale.messages[key], "string");
      assert.notEqual(locale.messages[key].trim(), "");
      const rendered = translate(locale, key, { date: "x", count: 1, index: 1, jdn: 1 });
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
  const sw = await read("docs/sw.js");
  assert.doesNotMatch(sw, /reverse-i18n\.js/);
});
