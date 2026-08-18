"use strict";

import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=8-year-structure";

export const DEFAULT_LOCALE = "en";

// Lightweight metadata only. Locale resources are loaded on demand by loadLocale().
export const LOCALES = Object.freeze([
  Object.freeze({ code: "he", displayName: "עברית", dir: "rtl", intlLocale: "he-IL", asset: "./locales/he.js?v=15-runtime-notices", loader: () => import("./locales/he.js?v=15-runtime-notices") }),
  Object.freeze({ code: "en", displayName: "English", dir: "ltr", intlLocale: "en-US", asset: "./locales/en.js?v=15-runtime-notices", loader: () => import("./locales/en.js?v=15-runtime-notices") }),
  Object.freeze({ code: "af", displayName: "Afrikaans", dir: "ltr", intlLocale: "af-ZA", asset: "./locales/af.js?v=15-runtime-notices", loader: () => import("./locales/af.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ar", displayName: "العربية", dir: "rtl", intlLocale: "ar", asset: "./locales/ar.js?v=15-runtime-notices", loader: () => import("./locales/ar.js?v=15-runtime-notices") }),
  Object.freeze({ code: "az", displayName: "Azərbaycanca", dir: "ltr", intlLocale: "az-AZ", asset: "./locales/az.js?v=15-runtime-notices", loader: () => import("./locales/az.js?v=15-runtime-notices") }),
  Object.freeze({ code: "be", displayName: "Беларуская", dir: "ltr", intlLocale: "be-BY", asset: "./locales/be.js?v=15-runtime-notices", loader: () => import("./locales/be.js?v=15-runtime-notices") }),
  Object.freeze({ code: "bg", displayName: "Български", dir: "ltr", intlLocale: "bg-BG", asset: "./locales/bg.js?v=15-runtime-notices", loader: () => import("./locales/bg.js?v=15-runtime-notices") }),
  Object.freeze({ code: "bn", displayName: "বাংলা", dir: "ltr", intlLocale: "bn-BD", asset: "./locales/bn.js?v=15-runtime-notices", loader: () => import("./locales/bn.js?v=15-runtime-notices") }),
  Object.freeze({ code: "bs", displayName: "Bosanski", dir: "ltr", intlLocale: "bs-BA", asset: "./locales/bs.js?v=15-runtime-notices", loader: () => import("./locales/bs.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ca", displayName: "Català", dir: "ltr", intlLocale: "ca-ES", asset: "./locales/ca.js?v=15-runtime-notices", loader: () => import("./locales/ca.js?v=15-runtime-notices") }),
  Object.freeze({ code: "cs", displayName: "Čeština", dir: "ltr", intlLocale: "cs-CZ", asset: "./locales/cs.js?v=15-runtime-notices", loader: () => import("./locales/cs.js?v=15-runtime-notices") }),
  Object.freeze({ code: "da", displayName: "Dansk", dir: "ltr", intlLocale: "da-DK", asset: "./locales/da.js?v=15-runtime-notices", loader: () => import("./locales/da.js?v=15-runtime-notices") }),
  Object.freeze({ code: "de", displayName: "Deutsch", dir: "ltr", intlLocale: "de-DE", asset: "./locales/de.js?v=15-runtime-notices", loader: () => import("./locales/de.js?v=15-runtime-notices") }),
  Object.freeze({ code: "el", displayName: "Ελληνικά", dir: "ltr", intlLocale: "el-GR", asset: "./locales/el.js?v=15-runtime-notices", loader: () => import("./locales/el.js?v=15-runtime-notices") }),
  Object.freeze({ code: "eo", displayName: "Esperanto", dir: "ltr", intlLocale: "eo", asset: "./locales/eo.js?v=15-runtime-notices", loader: () => import("./locales/eo.js?v=15-runtime-notices") }),
  Object.freeze({ code: "es", displayName: "Español", dir: "ltr", intlLocale: "es-ES", asset: "./locales/es.js?v=15-runtime-notices", loader: () => import("./locales/es.js?v=15-runtime-notices") }),
  Object.freeze({ code: "et", displayName: "Eesti", dir: "ltr", intlLocale: "et-EE", asset: "./locales/et.js?v=15-runtime-notices", loader: () => import("./locales/et.js?v=15-runtime-notices") }),
  Object.freeze({ code: "fa", displayName: "فارسی", dir: "rtl", intlLocale: "fa-IR", asset: "./locales/fa.js?v=15-runtime-notices", loader: () => import("./locales/fa.js?v=15-runtime-notices") }),
  Object.freeze({ code: "fi", displayName: "Suomi", dir: "ltr", intlLocale: "fi-FI", asset: "./locales/fi.js?v=15-runtime-notices", loader: () => import("./locales/fi.js?v=15-runtime-notices") }),
  Object.freeze({ code: "fil", displayName: "Filipino", dir: "ltr", intlLocale: "fil-PH", asset: "./locales/fil.js?v=15-runtime-notices", loader: () => import("./locales/fil.js?v=15-runtime-notices") }),
  Object.freeze({ code: "fo", displayName: "Føroyskt", dir: "ltr", intlLocale: "fo-FO", asset: "./locales/fo.js?v=15-runtime-notices", loader: () => import("./locales/fo.js?v=15-runtime-notices") }),
  Object.freeze({ code: "fr", displayName: "Français", dir: "ltr", intlLocale: "fr-FR", asset: "./locales/fr.js?v=15-runtime-notices", loader: () => import("./locales/fr.js?v=15-runtime-notices") }),
  Object.freeze({ code: "fy", displayName: "Frysk", dir: "ltr", intlLocale: "fy-NL", asset: "./locales/fy.js?v=15-runtime-notices", loader: () => import("./locales/fy.js?v=15-runtime-notices") }),
  Object.freeze({ code: "gl", displayName: "Galego", dir: "ltr", intlLocale: "gl-ES", asset: "./locales/gl.js?v=15-runtime-notices", loader: () => import("./locales/gl.js?v=15-runtime-notices") }),
  Object.freeze({ code: "gu", displayName: "ગુજરાતી", dir: "ltr", intlLocale: "gu-IN", asset: "./locales/gu.js?v=15-runtime-notices", loader: () => import("./locales/gu.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ha", displayName: "Hausa", dir: "ltr", intlLocale: "ha-NG", asset: "./locales/ha.js?v=15-runtime-notices", loader: () => import("./locales/ha.js?v=15-runtime-notices") }),
  Object.freeze({ code: "hi", displayName: "हिन्दी", dir: "ltr", intlLocale: "hi-IN", asset: "./locales/hi.js?v=15-runtime-notices", loader: () => import("./locales/hi.js?v=15-runtime-notices") }),
  Object.freeze({ code: "hr", displayName: "Hrvatski", dir: "ltr", intlLocale: "hr-HR", asset: "./locales/hr.js?v=15-runtime-notices", loader: () => import("./locales/hr.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ht", displayName: "Kreyòl ayisyen", dir: "ltr", intlLocale: "ht-HT", asset: "./locales/ht.js?v=15-runtime-notices", loader: () => import("./locales/ht.js?v=15-runtime-notices") }),
  Object.freeze({ code: "hu", displayName: "Magyar", dir: "ltr", intlLocale: "hu-HU", asset: "./locales/hu.js?v=15-runtime-notices", loader: () => import("./locales/hu.js?v=15-runtime-notices") }),
  Object.freeze({ code: "hy", displayName: "Հայերեն", dir: "ltr", intlLocale: "hy-AM", asset: "./locales/hy.js?v=15-runtime-notices", loader: () => import("./locales/hy.js?v=15-runtime-notices") }),
  Object.freeze({ code: "id", displayName: "Bahasa Indonesia", dir: "ltr", intlLocale: "id-ID", asset: "./locales/id.js?v=15-runtime-notices", loader: () => import("./locales/id.js?v=15-runtime-notices") }),
  Object.freeze({ code: "is", displayName: "Íslenska", dir: "ltr", intlLocale: "is-IS", asset: "./locales/is.js?v=15-runtime-notices", loader: () => import("./locales/is.js?v=15-runtime-notices") }),
  Object.freeze({ code: "it", displayName: "Italiano", dir: "ltr", intlLocale: "it-IT", asset: "./locales/it.js?v=15-runtime-notices", loader: () => import("./locales/it.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ja", displayName: "日本語", dir: "ltr", intlLocale: "ja-JP", asset: "./locales/ja.js?v=15-runtime-notices", loader: () => import("./locales/ja.js?v=15-runtime-notices") }),
  Object.freeze({ code: "jv", displayName: "Basa Jawa", dir: "ltr", intlLocale: "jv-ID", asset: "./locales/jv.js?v=15-runtime-notices", loader: () => import("./locales/jv.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ka", displayName: "ქართული", dir: "ltr", intlLocale: "ka-GE", asset: "./locales/ka.js?v=15-runtime-notices", loader: () => import("./locales/ka.js?v=15-runtime-notices") }),
  Object.freeze({ code: "kk", displayName: "Қазақша", dir: "ltr", intlLocale: "kk-KZ", asset: "./locales/kk.js?v=15-runtime-notices", loader: () => import("./locales/kk.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ko", displayName: "한국어", dir: "ltr", intlLocale: "ko-KR", asset: "./locales/ko.js?v=15-runtime-notices", loader: () => import("./locales/ko.js?v=15-runtime-notices") }),
  Object.freeze({ code: "lb", displayName: "Lëtzebuergesch", dir: "ltr", intlLocale: "lb-LU", asset: "./locales/lb.js?v=15-runtime-notices", loader: () => import("./locales/lb.js?v=15-runtime-notices") }),
  Object.freeze({ code: "lt", displayName: "Lietuvių", dir: "ltr", intlLocale: "lt-LT", asset: "./locales/lt.js?v=15-runtime-notices", loader: () => import("./locales/lt.js?v=15-runtime-notices") }),
  Object.freeze({ code: "lv", displayName: "Latviešu", dir: "ltr", intlLocale: "lv-LV", asset: "./locales/lv.js?v=15-runtime-notices", loader: () => import("./locales/lv.js?v=15-runtime-notices") }),
  Object.freeze({ code: "mk", displayName: "Македонски", dir: "ltr", intlLocale: "mk-MK", asset: "./locales/mk.js?v=15-runtime-notices", loader: () => import("./locales/mk.js?v=15-runtime-notices") }),
  Object.freeze({ code: "mr", displayName: "मराठी", dir: "ltr", intlLocale: "mr-IN", asset: "./locales/mr.js?v=15-runtime-notices", loader: () => import("./locales/mr.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ms", displayName: "Bahasa Melayu", dir: "ltr", intlLocale: "ms-MY", asset: "./locales/ms.js?v=15-runtime-notices", loader: () => import("./locales/ms.js?v=15-runtime-notices") }),
  Object.freeze({ code: "nb", displayName: "Norsk bokmål", dir: "ltr", intlLocale: "nb-NO", asset: "./locales/nb.js?v=15-runtime-notices", loader: () => import("./locales/nb.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ne", displayName: "नेपाली", dir: "ltr", intlLocale: "ne-NP", asset: "./locales/ne.js?v=15-runtime-notices", loader: () => import("./locales/ne.js?v=15-runtime-notices") }),
  Object.freeze({ code: "nl", displayName: "Nederlands", dir: "ltr", intlLocale: "nl-NL", asset: "./locales/nl.js?v=15-runtime-notices", loader: () => import("./locales/nl.js?v=15-runtime-notices") }),
  Object.freeze({ code: "nn", displayName: "Norsk nynorsk", dir: "ltr", intlLocale: "nn-NO", asset: "./locales/nn.js?v=15-runtime-notices", loader: () => import("./locales/nn.js?v=15-runtime-notices") }),
  Object.freeze({ code: "pa", displayName: "ਪੰਜਾਬੀ", dir: "ltr", intlLocale: "pa-IN", asset: "./locales/pa.js?v=15-runtime-notices", loader: () => import("./locales/pa.js?v=15-runtime-notices") }),
  Object.freeze({ code: "pl", displayName: "Polski", dir: "ltr", intlLocale: "pl-PL", asset: "./locales/pl.js?v=15-runtime-notices", loader: () => import("./locales/pl.js?v=15-runtime-notices") }),
  Object.freeze({ code: "pt", displayName: "Português", dir: "ltr", intlLocale: "pt-BR", asset: "./locales/pt.js?v=15-runtime-notices", loader: () => import("./locales/pt.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ro", displayName: "Română", dir: "ltr", intlLocale: "ro-RO", asset: "./locales/ro.js?v=15-runtime-notices", loader: () => import("./locales/ro.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ru", displayName: "Русский", dir: "ltr", intlLocale: "ru-RU", asset: "./locales/ru.js?v=15-runtime-notices", loader: () => import("./locales/ru.js?v=15-runtime-notices") }),
  Object.freeze({ code: "sk", displayName: "Slovenčina", dir: "ltr", intlLocale: "sk-SK", asset: "./locales/sk.js?v=15-runtime-notices", loader: () => import("./locales/sk.js?v=15-runtime-notices") }),
  Object.freeze({ code: "sl", displayName: "Slovenščina", dir: "ltr", intlLocale: "sl-SI", asset: "./locales/sl.js?v=15-runtime-notices", loader: () => import("./locales/sl.js?v=15-runtime-notices") }),
  Object.freeze({ code: "so", displayName: "Soomaali", dir: "ltr", intlLocale: "so-SO", asset: "./locales/so.js?v=15-runtime-notices", loader: () => import("./locales/so.js?v=15-runtime-notices") }),
  Object.freeze({ code: "sq", displayName: "Shqip", dir: "ltr", intlLocale: "sq-AL", asset: "./locales/sq.js?v=15-runtime-notices", loader: () => import("./locales/sq.js?v=15-runtime-notices") }),
  Object.freeze({ code: "sr", displayName: "Srpski", dir: "ltr", intlLocale: "sr-Latn-RS", asset: "./locales/sr.js?v=15-runtime-notices", loader: () => import("./locales/sr.js?v=15-runtime-notices") }),
  Object.freeze({ code: "sv", displayName: "Svenska", dir: "ltr", intlLocale: "sv-SE", asset: "./locales/sv.js?v=15-runtime-notices", loader: () => import("./locales/sv.js?v=15-runtime-notices") }),
  Object.freeze({ code: "sw", displayName: "Kiswahili", dir: "ltr", intlLocale: "sw-TZ", asset: "./locales/sw.js?v=15-runtime-notices", loader: () => import("./locales/sw.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ta", displayName: "தமிழ்", dir: "ltr", intlLocale: "ta-IN", asset: "./locales/ta.js?v=15-runtime-notices", loader: () => import("./locales/ta.js?v=15-runtime-notices") }),
  Object.freeze({ code: "te", displayName: "తెలుగు", dir: "ltr", intlLocale: "te-IN", asset: "./locales/te.js?v=15-runtime-notices", loader: () => import("./locales/te.js?v=15-runtime-notices") }),
  Object.freeze({ code: "th", displayName: "ไทย", dir: "ltr", intlLocale: "th-TH", asset: "./locales/th.js?v=15-runtime-notices", loader: () => import("./locales/th.js?v=15-runtime-notices") }),
  Object.freeze({ code: "tr", displayName: "Türkçe", dir: "ltr", intlLocale: "tr-TR", asset: "./locales/tr.js?v=15-runtime-notices", loader: () => import("./locales/tr.js?v=15-runtime-notices") }),
  Object.freeze({ code: "uk", displayName: "Українська", dir: "ltr", intlLocale: "uk-UA", asset: "./locales/uk.js?v=15-runtime-notices", loader: () => import("./locales/uk.js?v=15-runtime-notices") }),
  Object.freeze({ code: "ur", displayName: "اردو", dir: "rtl", intlLocale: "ur-PK", asset: "./locales/ur.js?v=15-runtime-notices", loader: () => import("./locales/ur.js?v=15-runtime-notices") }),
  Object.freeze({ code: "uz", displayName: "O‘zbekcha", dir: "ltr", intlLocale: "uz-UZ", asset: "./locales/uz.js?v=15-runtime-notices", loader: () => import("./locales/uz.js?v=15-runtime-notices") }),
  Object.freeze({ code: "vi", displayName: "Tiếng Việt", dir: "ltr", intlLocale: "vi-VN", asset: "./locales/vi.js?v=15-runtime-notices", loader: () => import("./locales/vi.js?v=15-runtime-notices") }),
  Object.freeze({ code: "yo", displayName: "Yorùbá", dir: "ltr", intlLocale: "yo-NG", asset: "./locales/yo.js?v=15-runtime-notices", loader: () => import("./locales/yo.js?v=15-runtime-notices") }),
  Object.freeze({ code: "zh", displayName: "简体中文", dir: "ltr", intlLocale: "zh-CN", asset: "./locales/zh.js?v=15-runtime-notices", loader: () => import("./locales/zh.js?v=15-runtime-notices") }),
  Object.freeze({ code: "zu", displayName: "isiZulu", dir: "ltr", intlLocale: "zu-ZA", asset: "./locales/zu.js?v=15-runtime-notices", loader: () => import("./locales/zu.js?v=15-runtime-notices") }),
]);

const byCode = new Map(LOCALES.map((locale) => [canonicalTag(locale.code), locale]));
const loadedLocales = new Map();

function canonicalTag(tag) {
  if (typeof tag !== "string" || tag.trim() === "") return null;
  try {
    return Intl.getCanonicalLocales(tag.trim())[0] ?? null;
  } catch {
    return null;
  }
}

function fallbackTags(tag) {
  const canonical = canonicalTag(tag);
  if (!canonical) return [];
  const withoutExtensions = canonical.split("-u-")[0].split("-x-")[0];
  const parts = withoutExtensions.split("-");
  const candidates = [];
  for (let length = parts.length; length >= 1; length -= 1) {
    candidates.push(parts.slice(0, length).join("-"));
  }
  return [...new Set(candidates.map(canonicalTag).filter(Boolean))];
}

export function matchSupportedLocale(tag) {
  for (const candidate of fallbackTags(tag)) {
    const locale = byCode.get(candidate);
    if (locale) return locale;
  }
  return null;
}

export function resolveLocale({ urlLanguage = null, savedLanguage = null, browserLanguages = [] } = {}) {
  const urlLocale = matchSupportedLocale(urlLanguage);
  if (urlLocale) return Object.freeze({ locale: urlLocale, source: "url" });

  const savedLocale = matchSupportedLocale(savedLanguage);
  if (savedLocale) return Object.freeze({ locale: savedLocale, source: "saved" });

  for (const language of Array.isArray(browserLanguages) ? browserLanguages : []) {
    const browserLocale = matchSupportedLocale(language);
    if (browserLocale) return Object.freeze({ locale: browserLocale, source: "browser" });
  }

  return Object.freeze({ locale: byCode.get(canonicalTag(DEFAULT_LOCALE)), source: "fallback" });
}

export function getLocale(code) {
  return matchSupportedLocale(code) ?? byCode.get(canonicalTag(DEFAULT_LOCALE));
}

function assertLoadedLocaleMatchesMetadata(resource, metadata) {
  if (!resource || typeof resource !== "object") throw new TypeError(`Locale ${metadata.code} default export must be an object.`);
  if (resource.code !== metadata.code) throw new RangeError(`Locale module ${metadata.code} exports code ${String(resource.code)}.`);
  for (const key of ["displayName", "dir", "intlLocale"]) {
    if (resource[key] !== metadata[key]) throw new RangeError(`Locale ${metadata.code} metadata mismatch for ${key}.`);
  }
  if ((resource.experimental === true) !== (metadata.experimental === true)) throw new RangeError(`Locale ${metadata.code} metadata mismatch for experimental.`);
  if ((resource.fallbackLocale ?? null) !== (metadata.fallbackLocale ?? null)) throw new RangeError(`Locale ${metadata.code} metadata mismatch for fallbackLocale.`);
  return resource;
}

export function isLocaleLoaded(code) {
  return loadedLocales.has(getLocale(code).code);
}

export async function loadLocale(code) {
  const metadata = getLocale(code);
  const existing = loadedLocales.get(metadata.code);
  if (existing) return existing;

  const loading = metadata.loader().then((module) => assertLoadedLocaleMatchesMetadata(module.default, metadata));
  loadedLocales.set(metadata.code, loading);
  try {
    return await loading;
  } catch (error) {
    if (loadedLocales.get(metadata.code) === loading) loadedLocales.delete(metadata.code);
    throw error;
  }
}

export async function loadAllLocales() {
  return Promise.all(LOCALES.map((locale) => loadLocale(locale.code)));
}

function getPath(object, path) {
  return path.split(".").reduce((value, part) => value?.[part], object);
}

export function translate(locale, key, values = {}) {
  const template = locale?.messages?.[key];
  if (typeof template !== "string") throw new RangeError(`Missing translation key: ${key}`);
  return template.replace(/\{([A-Za-z0-9_.-]+)\}/g, (match, name) => {
    if (!(name in values)) throw new RangeError(`Missing interpolation value ${name} for ${key}`);
    return String(values[name]);
  });
}

export function staleDayWarning(locale, values = {}) {
  return translate(locale, "day.staleWarning", values);
}

export function locationAssumptionNotice(locale) {
  return translate(locale, "location.assumption");
}

export function locationUseDeviceLabel(locale) {
  return translate(locale, "location.useDevice");
}

export function calendarLabel(locale, type, index) {
  const identifiers = type === "cutlet" ? CUTLETS : type === "month" ? MONTHS : null;
  if (!identifiers || !Number.isInteger(index) || index < 0 || index >= identifiers.length) {
    throw new RangeError(`Invalid ${type} index.`);
  }
  const table = getPath(locale, `calendar.${type === "cutlet" ? "cutlets" : "months"}`);
  const label = table?.[identifiers[index].id];
  if (typeof label !== "string" || label === "") throw new RangeError(`Missing ${type} label at index ${index}.`);
  return label;
}

function sameKeySet(left, right) {
  const a = Object.keys(left).sort();
  const b = Object.keys(right).sort();
  return a.length === b.length && a.every((key, index) => key === b[index]);
}

export function validateLocaleResources(locales) {
  if (!Array.isArray(locales) || locales.length === 0) {
    throw new TypeError("Explicitly loaded locale resources are required for validation.");
  }
  const baseline = locales[0];
  const expectedMessageKeys = Object.keys(baseline.messages).sort();
  const expectedTermKeys = Object.keys(baseline.terminology).sort();
  const expectedCutletKeys = CUTLETS.map(({ id }) => id).sort();
  const expectedMonthKeys = MONTHS.map(({ id }) => id).sort();

  for (const locale of locales) {
    if (!locale || typeof locale !== "object") throw new TypeError("Locale must be an object.");
    const metadata = matchSupportedLocale(locale.code);
    if (!metadata) throw new RangeError(`Locale ${locale.code} is not registered.`);
    assertLoadedLocaleMatchesMetadata(locale, metadata);
    if (!["ltr", "rtl"].includes(locale.dir)) throw new RangeError(`Locale ${locale.code} has invalid direction.`);
    if (!canonicalTag(locale.intlLocale)) throw new RangeError(`Locale ${locale.code} has invalid Intl locale.`);
    if (!sameKeySet(locale.messages, Object.fromEntries(expectedMessageKeys.map((key) => [key, true])))) {
      throw new RangeError(`Locale ${locale.code} has incomplete message coverage.`);
    }
    if (!sameKeySet(locale.terminology, Object.fromEntries(expectedTermKeys.map((key) => [key, true])))) {
      throw new RangeError(`Locale ${locale.code} has incomplete terminology coverage.`);
    }
    if (!sameKeySet(locale.calendar.cutlets, Object.fromEntries(expectedCutletKeys.map((key) => [key, true])))) {
      throw new RangeError(`Locale ${locale.code} has incomplete cutlet coverage.`);
    }
    if (!sameKeySet(locale.calendar.months, Object.fromEntries(expectedMonthKeys.map((key) => [key, true])))) {
      throw new RangeError(`Locale ${locale.code} has incomplete month coverage.`);
    }
    for (const [groupName, values] of [
      ["messages", locale.messages],
      ["terminology", locale.terminology],
      ["cutlets", locale.calendar.cutlets],
      ["months", locale.calendar.months],
    ]) {
      for (const [key, value] of Object.entries(values)) {
        if (typeof value !== "string" || value.trim() === "") {
          throw new RangeError(`Locale ${locale.code} contains an empty ${groupName} value for ${key}.`);
        }
      }
    }
  }
  return true;
}
