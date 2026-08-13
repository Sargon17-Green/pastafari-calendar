"use strict";

import he from "./locales/he.js?v=7-search-compare";
import en from "./locales/en.js?v=7-search-compare";
import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=7-search-compare";

export const DEFAULT_LOCALE = "en";
export const LOCALES = Object.freeze([he, en]);
const byCode = new Map(LOCALES.map((locale) => [canonicalTag(locale.code), locale]));

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

export function validateLocaleResources(locales = LOCALES) {
  if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("At least one locale is required.");
  const baseline = locales[0];
  const expectedMessageKeys = Object.keys(baseline.messages).sort();
  const expectedTermKeys = Object.keys(baseline.terminology).sort();
  const expectedCutletKeys = CUTLETS.map(({ id }) => id).sort();
  const expectedMonthKeys = MONTHS.map(({ id }) => id).sort();

  for (const locale of locales) {
    if (!locale || typeof locale !== "object") throw new TypeError("Locale must be an object.");
    if (!matchSupportedLocale(locale.code)) throw new RangeError(`Locale ${locale.code} is not registered.`);
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
