"use strict";

import he from "./locales/he.js?v=13-reverse-i18n";
import en from "./locales/en.js?v=13-reverse-i18n";
import af from "./locales/af.js?v=13-reverse-i18n";
import ar from "./locales/ar.js?v=13-reverse-i18n";
import az from "./locales/az.js?v=13-reverse-i18n";
import be from "./locales/be.js?v=13-reverse-i18n";
import bg from "./locales/bg.js?v=13-reverse-i18n";
import bn from "./locales/bn.js?v=13-reverse-i18n";
import bs from "./locales/bs.js?v=13-reverse-i18n";
import ca from "./locales/ca.js?v=13-reverse-i18n";
import cs from "./locales/cs.js?v=13-reverse-i18n";
import da from "./locales/da.js?v=13-reverse-i18n";
import de from "./locales/de.js?v=13-reverse-i18n";
import el from "./locales/el.js?v=13-reverse-i18n";
import eo from "./locales/eo.js?v=13-reverse-i18n";
import es from "./locales/es.js?v=13-reverse-i18n";
import et from "./locales/et.js?v=13-reverse-i18n";
import fa from "./locales/fa.js?v=13-reverse-i18n";
import fi from "./locales/fi.js?v=13-reverse-i18n";
import fil from "./locales/fil.js?v=13-reverse-i18n";
import fo from "./locales/fo.js?v=13-reverse-i18n";
import fr from "./locales/fr.js?v=13-reverse-i18n";
import fy from "./locales/fy.js?v=13-reverse-i18n";
import gl from "./locales/gl.js?v=13-reverse-i18n";
import gu from "./locales/gu.js?v=13-reverse-i18n";
import ha from "./locales/ha.js?v=13-reverse-i18n";
import hi from "./locales/hi.js?v=13-reverse-i18n";
import hr from "./locales/hr.js?v=13-reverse-i18n";
import ht from "./locales/ht.js?v=13-reverse-i18n";
import hu from "./locales/hu.js?v=13-reverse-i18n";
import hy from "./locales/hy.js?v=13-reverse-i18n";
import id from "./locales/id.js?v=13-reverse-i18n";
import is from "./locales/is.js?v=13-reverse-i18n";
import it from "./locales/it.js?v=13-reverse-i18n";
import ja from "./locales/ja.js?v=13-reverse-i18n";
import jv from "./locales/jv.js?v=13-reverse-i18n";
import ka from "./locales/ka.js?v=13-reverse-i18n";
import kk from "./locales/kk.js?v=13-reverse-i18n";
import ko from "./locales/ko.js?v=13-reverse-i18n";
import lb from "./locales/lb.js?v=13-reverse-i18n";
import lt from "./locales/lt.js?v=13-reverse-i18n";
import lv from "./locales/lv.js?v=13-reverse-i18n";
import mk from "./locales/mk.js?v=13-reverse-i18n";
import mr from "./locales/mr.js?v=13-reverse-i18n";
import ms from "./locales/ms.js?v=13-reverse-i18n";
import nb from "./locales/nb.js?v=13-reverse-i18n";
import ne from "./locales/ne.js?v=13-reverse-i18n";
import nl from "./locales/nl.js?v=13-reverse-i18n";
import nn from "./locales/nn.js?v=13-reverse-i18n";
import pa from "./locales/pa.js?v=13-reverse-i18n";
import pl from "./locales/pl.js?v=13-reverse-i18n";
import pt from "./locales/pt.js?v=13-reverse-i18n";
import ro from "./locales/ro.js?v=13-reverse-i18n";
import ru from "./locales/ru.js?v=13-reverse-i18n";
import sk from "./locales/sk.js?v=13-reverse-i18n";
import sl from "./locales/sl.js?v=13-reverse-i18n";
import so from "./locales/so.js?v=13-reverse-i18n";
import sq from "./locales/sq.js?v=13-reverse-i18n";
import sr from "./locales/sr.js?v=13-reverse-i18n";
import sv from "./locales/sv.js?v=13-reverse-i18n";
import sw from "./locales/sw.js?v=13-reverse-i18n";
import ta from "./locales/ta.js?v=13-reverse-i18n";
import te from "./locales/te.js?v=13-reverse-i18n";
import th from "./locales/th.js?v=13-reverse-i18n";
import tr from "./locales/tr.js?v=13-reverse-i18n";
import uk from "./locales/uk.js?v=13-reverse-i18n";
import ur from "./locales/ur.js?v=13-reverse-i18n";
import uz from "./locales/uz.js?v=13-reverse-i18n";
import vi from "./locales/vi.js?v=13-reverse-i18n";
import yo from "./locales/yo.js?v=13-reverse-i18n";
import zh from "./locales/zh.js?v=13-reverse-i18n";
import zu from "./locales/zu.js?v=13-reverse-i18n";
import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=8-year-structure";

export const DEFAULT_LOCALE = "en";
export const LOCALES = Object.freeze([he, en, af, ar, az, be, bg, bn, bs, ca, cs, da, de, el, eo, es, et, fa, fi, fil, fo, fr, fy, gl, gu, ha, hi, hr, ht, hu, hy, id, is, it, ja, jv, ka, kk, ko, lb, lt, lv, mk, mr, ms, nb, ne, nl, nn, pa, pl, pt, ro, ru, sk, sl, so, sq, sr, sv, sw, ta, te, th, tr, uk, ur, uz, vi, yo, zh, zu]);
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

const STALE_DAY_WARNING_TEMPLATES = Object.freeze({
  en: "The current day changed from {previousDate} to {currentDate}. Because the day of working was the current day, the displayed dates are no longer up to date. They will be recalculated after you dismiss this message.",
  he: "היום הנוכחי השתנה מ־{previousDate} ל־{currentDate}. מאחר שיום המעשה היה היום הנוכחי, התאריכים המוצגים כבר אינם מעודכנים. הם יחושבו מחדש לאחר סגירת ההודעה.",
});

const LOCATION_ASSUMPTION_TEMPLATES = Object.freeze({
  en: "(In the absence of contrary information, the device is assumed to be in Kisurra.)",
  he: "(בהיעדר מידע סותר, הונח שהמכשיר נמצא בקיסורה.)",
});

const LOCATION_USE_DEVICE_TEMPLATES = Object.freeze({
  en: "Use device location",
  he: "השתמש במיקום המכשיר",
});

export function staleDayWarning(locale, values = {}) {
  const template = STALE_DAY_WARNING_TEMPLATES[canonicalTag(locale?.code)] ?? STALE_DAY_WARNING_TEMPLATES.en;
  return template.replace(/\{([A-Za-z0-9_.-]+)\}/g, (match, name) => {
    if (!(name in values)) throw new RangeError(`Missing interpolation value ${name} for stale-day warning`);
    return String(values[name]);
  });
}

export function locationAssumptionNotice(locale) {
  return LOCATION_ASSUMPTION_TEMPLATES[canonicalTag(locale?.code)] ?? LOCATION_ASSUMPTION_TEMPLATES.en;
}

export function locationUseDeviceLabel(locale) {
  return LOCATION_USE_DEVICE_TEMPLATES[canonicalTag(locale?.code)] ?? LOCATION_USE_DEVICE_TEMPLATES.en;
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
