import assert from "node:assert/strict";
import test from "node:test";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import {
  LOCALES,
  calendarLabel,
  getLocale,
  matchSupportedLocale,
  resolveLocale,
  translate,
  validateLocaleResources,
} from "../docs/i18n/registry.js";
import {
  LANGUAGE_STORAGE_KEY,
  applyDocumentLocale,
  persistLanguage,
  resolveBrowserLocale,
  urlWithLanguage,
} from "../docs/i18n/runtime.js";
import { handlePastafariWorkerRequest } from "../docs/engine/pastafari-fast-worker.js";

function fakeStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    snapshot() { return Object.fromEntries(values); },
  };
}

test("registry contains 89 locales and no Biblical Hebrew locale", () => {
  assert.equal(LOCALES.length, 89);
  assert.equal(LOCALES.some(({ code }) => code === "hbo"), false);
  assert.equal(matchSupportedLocale("hbo"), null);
});

test("locale resources have complete, matching coverage", () => {
  assert.equal(validateLocaleResources(), true);
  assert.equal(CUTLETS.length, 17);
  assert.equal(MONTHS.length, 47);
  for (const locale of LOCALES) {
    for (let index = 0; index < CUTLETS.length; index += 1) {
      assert.notEqual(calendarLabel(locale, "cutlet", index), "");
    }
    for (let index = 0; index < MONTHS.length; index += 1) {
      assert.notEqual(calendarLabel(locale, "month", index), "");
    }
  }
});

test("canonical English cutlet and month labels match the supplied Scroll terminology", () => {
  const en = getLocale("en");
  assert.deepEqual(CUTLETS.map((_, index) => calendarLabel(en, "cutlet", index)), [
    "Bronze", "Fox", "Kidney", "Lagash", "Thought", "Four Parts of Nine", "Palgurash",
    "Papyrus Sedge", "Cluster", "Scorpion", "Ash", "Wheat", "River", "Laughter", "Akkad",
    "Horn", "The Empty Jar",
  ]);
  assert.deepEqual(MONTHS.map((_, index) => calendarLabel(en, "month", index)), [
    "Clay", "Pomegranate", "Elbow", "Envy", "Eridu", "Toothpaste", "Three Parts of Five",
    "Karshumab", "Tiger", "Tin", "Mist", "Frankincense", "Spindle", "Rib", "Carob", "Uruk",
    "Shame", "Camel", "Copper", "Well", "Yolk", "Star", "Honey", "Spleen", "Limestone", "Joy",
    "Fig", "Nineveh", "Frog", "Pitch", "Lamp", "The Closed Door", "Sesame", "Nape", "Silver",
    "Susa", "Storm", "Donkey", "Flour", "Regret", "Babylon", "Tongue", "Flax", "Salt", "Pear",
    "Bow", "Sand",
  ]);
});


test("canonical English named quantities use the supplied Scroll wording", () => {
  assert.deepEqual(getLocale("en").terminology, {
    foundationDay: "Foundation Day",
    workingNumber: "Working Number",
    queryNumber: "Query Number",
    distanceNumber: "Distance Number",
    sumNumber: "Sum Number",
    directionNumber: "Direction Number",
    bowl: "Bowl",
    drop: "Drop",
    gate: "Gate",
    yearFiveThousand: "Year Five Thousand from the Creation of the World",
  });
});

test("locale matching normalizes region tags without assuming all locales are two-letter tags", () => {
  assert.equal(matchSupportedLocale("en-US")?.code, "en");
  assert.equal(matchSupportedLocale("en-GB")?.code, "en");
  assert.equal(matchSupportedLocale("he-IL")?.code, "he");
  assert.equal(matchSupportedLocale("EN-us")?.code, "en");
  assert.equal(matchSupportedLocale("not_a_locale"), null);
});

test("locale resolution follows URL > saved > navigator.languages > English fallback", () => {
  assert.deepEqual(resolveLocale({ urlLanguage: "en", savedLanguage: "he", browserLanguages: ["he-IL"] }), { locale: getLocale("en"), source: "url" });
  assert.deepEqual(resolveLocale({ urlLanguage: "he", savedLanguage: "en", browserLanguages: ["en-US"] }), { locale: getLocale("he"), source: "url" });
  assert.deepEqual(resolveLocale({ savedLanguage: "he", browserLanguages: ["en-US"] }), { locale: getLocale("he"), source: "saved" });
  assert.deepEqual(resolveLocale({ browserLanguages: ["he-IL", "en-US"] }), { locale: getLocale("he"), source: "browser" });
  assert.deepEqual(resolveLocale({ browserLanguages: ["en-US", "he-IL"] }), { locale: getLocale("en"), source: "browser" });
  assert.deepEqual(resolveLocale({ browserLanguages: ["de-DE", "fr-FR"] }), { locale: getLocale("en"), source: "fallback" });
  assert.deepEqual(resolveLocale({ urlLanguage: "%%%", savedLanguage: "he", browserLanguages: ["en-US"] }), { locale: getLocale("he"), source: "saved" });
});

test("browser resolution and persistence preserve the explicit-selection rule", () => {
  const storage = fakeStorage({ [LANGUAGE_STORAGE_KEY]: "he" });
  const fromUrl = resolveBrowserLocale({
    url: "https://example.test/?lang=en",
    storage,
    navigatorObject: { languages: ["he-IL", "en-US"] },
  });
  assert.equal(fromUrl.locale.code, "en");
  assert.equal(fromUrl.source, "url");
  assert.equal(storage.snapshot()[LANGUAGE_STORAGE_KEY], "he", "URL override must not overwrite saved preference");

  assert.equal(persistLanguage("en-US", storage), true);
  assert.equal(storage.snapshot()[LANGUAGE_STORAGE_KEY], "en");
  const afterReload = resolveBrowserLocale({
    url: "https://example.test/",
    storage,
    navigatorObject: { languages: ["he-IL"] },
  });
  assert.equal(afterReload.locale.code, "en");
  assert.equal(afterReload.source, "saved");
});


test("language URL updates preserve unrelated state parameters", () => {
  const next = urlWithLanguage("https://example.test/calendar?t=123&c=456&foo=bar&lang=he#guide", "en-US");
  assert.equal(next.searchParams.get("lang"), "en");
  assert.equal(next.searchParams.get("t"), "123");
  assert.equal(next.searchParams.get("c"), "456");
  assert.equal(next.searchParams.get("foo"), "bar");
  assert.equal(next.hash, "#guide");
});

test("document locale application updates lang, dir, text and translated attributes", () => {
  const textNode = { dataset: { i18n: "calendar.today" }, textContent: "" };
  const attrNode = {
    dataset: { i18nAttr: "aria-label:calendar.toolbarAria" },
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  const root = {
    documentElement: { lang: "", dir: "" },
    querySelectorAll(selector) {
      if (selector === "[data-i18n]") return [textNode];
      if (selector === "[data-i18n-attr]") return [attrNode];
      return [];
    },
  };
  applyDocumentLocale(getLocale("he"), root);
  assert.equal(root.documentElement.lang, "he");
  assert.equal(root.documentElement.dir, "rtl");
  assert.equal(textNode.textContent, "חזרה להיום");
  assert.equal(attrNode.attributes["aria-label"], "ניווט בין קציצות");
  applyDocumentLocale(getLocale("en"), root);
  assert.equal(root.documentElement.lang, "en");
  assert.equal(root.documentElement.dir, "ltr");
  assert.equal(textNode.textContent, "Back to today");
  assert.equal(attrNode.attributes["aria-label"], "Cutlet navigation");
});

test("locale direction metadata is independent of language-specific application branches", () => {
  assert.equal(getLocale("he").dir, "rtl");
  assert.equal(getLocale("en").dir, "ltr");
});

test("message templates support locale-specific word order", () => {
  assert.equal(
    translate(getLocale("he"), "date.monthLine", { dayInMonth: "76", monthName: "סערה" }),
    "76 בחודש סערה",
  );
  assert.equal(
    translate(getLocale("en"), "date.monthLine", { dayInMonth: "76", monthName: "Storm" }),
    "Day 76 in the month Storm",
  );
});

test("engine results are locale-invariant across a large real cutlet view", async () => {
  const targetJdn = 2_461_266n;
  const view = await handlePastafariWorkerRequest("getCutletView", {
    targetJdn,
    calculationJdn: targetJdn,
  });
  assert.ok(view.days.length > 100, "test should cover a substantial number of dates");

  const he = getLocale("he");
  const en = getLocale("en");
  for (const day of view.days) {
    const internal = {
      year: day.year,
      cutletIndex: day.cutletIndex,
      dayInCutlet: day.dayInCutlet,
      monthIndex: day.monthIndex,
      dayInMonth: day.dayInMonth,
    };
    const heDisplay = { ...internal, cutletName: calendarLabel(he, "cutlet", day.cutletIndex), monthName: calendarLabel(he, "month", day.monthIndex) };
    const enDisplay = { ...internal, cutletName: calendarLabel(en, "cutlet", day.cutletIndex), monthName: calendarLabel(en, "month", day.monthIndex) };
    assert.deepEqual(
      {
        year: heDisplay.year,
        cutletIndex: heDisplay.cutletIndex,
        dayInCutlet: heDisplay.dayInCutlet,
        monthIndex: heDisplay.monthIndex,
        dayInMonth: heDisplay.dayInMonth,
      },
      {
        year: enDisplay.year,
        cutletIndex: enDisplay.cutletIndex,
        dayInCutlet: enDisplay.dayInCutlet,
        monthIndex: enDisplay.monthIndex,
        dayInMonth: enDisplay.dayInMonth,
      },
    );
  }
});

test("comparison ranges keep each row on exactly the same queried JDN", async () => {
  const startJdn = 2_461_260n;
  const endJdn = startJdn + 30n;
  const primary = await handlePastafariWorkerRequest("getRangeView", {
    startJdn,
    endJdn,
    calculationJdn: 2_461_266n,
  });
  const secondary = await handlePastafariWorkerRequest("getRangeView", {
    startJdn,
    endJdn,
    calculationJdn: 2_461_267n,
  });
  assert.equal(primary.days.length, 31);
  assert.equal(secondary.days.length, 31);
  assert.deepEqual(
    primary.days.map(({ jdn }) => jdn),
    secondary.days.map(({ jdn }) => jdn),
  );
  assert.deepEqual(primary.days.map(({ jdn }) => jdn), Array.from({ length: 31 }, (_, index) => startJdn + BigInt(index)));
});
