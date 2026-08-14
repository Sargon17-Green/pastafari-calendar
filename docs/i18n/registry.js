"use strict";

import he from "./locales/he.js?v=8-year-structure";
import en from "./locales/en.js?v=8-year-structure";
import af from "./locales/af.js?v=8-year-structure";
import akk from "./locales/akk.js?v=8-year-structure";
import ang from "./locales/ang.js?v=8-year-structure";
import ar from "./locales/ar.js?v=8-year-structure";
import az from "./locales/az.js?v=8-year-structure";
import be from "./locales/be.js?v=8-year-structure";
import bg from "./locales/bg.js?v=8-year-structure";
import bn from "./locales/bn.js?v=8-year-structure";
import bs from "./locales/bs.js?v=8-year-structure";
import ca from "./locales/ca.js?v=8-year-structure";
import cop from "./locales/cop.js?v=8-year-structure";
import cs from "./locales/cs.js?v=8-year-structure";
import cu from "./locales/cu.js?v=8-year-structure";
import da from "./locales/da.js?v=8-year-structure";
import de from "./locales/de.js?v=8-year-structure";
import el from "./locales/el.js?v=8-year-structure";
import eo from "./locales/eo.js?v=8-year-structure";
import es from "./locales/es.js?v=8-year-structure";
import et from "./locales/et.js?v=8-year-structure";
import fa from "./locales/fa.js?v=8-year-structure";
import fi from "./locales/fi.js?v=8-year-structure";
import fil from "./locales/fil.js?v=8-year-structure";
import fo from "./locales/fo.js?v=8-year-structure";
import fr from "./locales/fr.js?v=8-year-structure";
import fy from "./locales/fy.js?v=8-year-structure";
import gl from "./locales/gl.js?v=8-year-structure";
import got from "./locales/got.js?v=8-year-structure";
import grc from "./locales/grc.js?v=8-year-structure";
import gu from "./locales/gu.js?v=8-year-structure";
import ha from "./locales/ha.js?v=8-year-structure";
import hi from "./locales/hi.js?v=8-year-structure";
import hr from "./locales/hr.js?v=8-year-structure";
import ht from "./locales/ht.js?v=8-year-structure";
import hu from "./locales/hu.js?v=8-year-structure";
import hy from "./locales/hy.js?v=8-year-structure";
import ia from "./locales/ia.js?v=8-year-structure";
import id from "./locales/id.js?v=8-year-structure";
import io from "./locales/io.js?v=8-year-structure";
import is from "./locales/is.js?v=8-year-structure";
import it from "./locales/it.js?v=8-year-structure";
import ja from "./locales/ja.js?v=8-year-structure";
import jbo from "./locales/jbo.js?v=8-year-structure";
import jv from "./locales/jv.js?v=8-year-structure";
import ka from "./locales/ka.js?v=8-year-structure";
import kk from "./locales/kk.js?v=8-year-structure";
import ko from "./locales/ko.js?v=8-year-structure";
import la from "./locales/la.js?v=8-year-structure";
import lb from "./locales/lb.js?v=8-year-structure";
import lt from "./locales/lt.js?v=8-year-structure";
import lv from "./locales/lv.js?v=8-year-structure";
import lzh from "./locales/lzh.js?v=8-year-structure";
import mk from "./locales/mk.js?v=8-year-structure";
import mr from "./locales/mr.js?v=8-year-structure";
import ms from "./locales/ms.js?v=8-year-structure";
import nb from "./locales/nb.js?v=8-year-structure";
import ne from "./locales/ne.js?v=8-year-structure";
import nl from "./locales/nl.js?v=8-year-structure";
import nn from "./locales/nn.js?v=8-year-structure";
import non from "./locales/non.js?v=8-year-structure";
import pa from "./locales/pa.js?v=8-year-structure";
import pl from "./locales/pl.js?v=8-year-structure";
import pt from "./locales/pt.js?v=8-year-structure";
import ro from "./locales/ro.js?v=8-year-structure";
import ru from "./locales/ru.js?v=8-year-structure";
import sa from "./locales/sa.js?v=8-year-structure";
import sk from "./locales/sk.js?v=8-year-structure";
import sl from "./locales/sl.js?v=8-year-structure";
import so from "./locales/so.js?v=8-year-structure";
import sq from "./locales/sq.js?v=8-year-structure";
import sr from "./locales/sr.js?v=8-year-structure";
import sux from "./locales/sux.js?v=8-year-structure";
import sv from "./locales/sv.js?v=8-year-structure";
import sw from "./locales/sw.js?v=8-year-structure";
import ta from "./locales/ta.js?v=8-year-structure";
import te from "./locales/te.js?v=8-year-structure";
import th from "./locales/th.js?v=8-year-structure";
import tlh from "./locales/tlh.js?v=8-year-structure";
import tok from "./locales/tok.js?v=8-year-structure";
import tr from "./locales/tr.js?v=8-year-structure";
import uk from "./locales/uk.js?v=8-year-structure";
import ur from "./locales/ur.js?v=8-year-structure";
import uz from "./locales/uz.js?v=8-year-structure";
import vi from "./locales/vi.js?v=8-year-structure";
import vo from "./locales/vo.js?v=8-year-structure";
import yo from "./locales/yo.js?v=8-year-structure";
import zh from "./locales/zh.js?v=8-year-structure";
import zu from "./locales/zu.js?v=8-year-structure";
import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=8-year-structure";

export const DEFAULT_LOCALE = "en";
export const LOCALES = Object.freeze([he, en, af, akk, ang, ar, az, be, bg, bn, bs, ca, cop, cs, cu, da, de, el, eo, es, et, fa, fi, fil, fo, fr, fy, gl, got, grc, gu, ha, hi, hr, ht, hu, hy, ia, id, io, is, it, ja, jbo, jv, ka, kk, ko, la, lb, lt, lv, lzh, mk, mr, ms, nb, ne, nl, nn, non, pa, pl, pt, ro, ru, sa, sk, sl, so, sq, sr, sux, sv, sw, ta, te, th, tlh, tok, tr, uk, ur, uz, vi, vo, yo, zh, zu]);
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
