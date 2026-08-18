"use strict";

import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=8-year-structure";

export const DEFAULT_LOCALE = "en";
export const SUPPORT_LEVELS = Object.freeze(["complete", "partial", "experimental"]);

const LOCALE_ASSET_REVISION = "16-unified-i18n";

function defineLocale(code, displayName, dir, intlLocale, support, loader, aliases = []) {
  const asset = `./locales/${code}.js?v=${LOCALE_ASSET_REVISION}`;
  return Object.freeze({
    code,
    displayName,
    dir,
    intlLocale,
    support,
    aliases: Object.freeze([...aliases]),
    ...(support === "experimental" ? { experimental: true } : {}),
    asset,
    loader,
  });
}

// Lightweight metadata only. Locale resources are loaded on demand by loadLocale().
// support is declared only here; locale source modules must not declare it.
export const LOCALES = Object.freeze([
  defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=16-unified-i18n")),
  defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=16-unified-i18n")),
  defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=16-unified-i18n")),
  defineLocale("ar", "العربية", "rtl", "ar", "partial", () => import("./locales/ar.js?v=16-unified-i18n")),
  defineLocale("az", "Azərbaycanca", "ltr", "az-AZ", "partial", () => import("./locales/az.js?v=16-unified-i18n")),
  defineLocale("be", "Беларуская", "ltr", "be-BY", "partial", () => import("./locales/be.js?v=16-unified-i18n")),
  defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=16-unified-i18n")),
  defineLocale("bn", "বাংলা", "ltr", "bn-BD", "partial", () => import("./locales/bn.js?v=16-unified-i18n")),
  defineLocale("bs", "Bosanski", "ltr", "bs-BA", "partial", () => import("./locales/bs.js?v=16-unified-i18n")),
  defineLocale("ca", "Català", "ltr", "ca-ES", "partial", () => import("./locales/ca.js?v=16-unified-i18n")),
  defineLocale("cs", "Čeština", "ltr", "cs-CZ", "partial", () => import("./locales/cs.js?v=16-unified-i18n")),
  defineLocale("da", "Dansk", "ltr", "da-DK", "partial", () => import("./locales/da.js?v=16-unified-i18n")),
  defineLocale("de", "Deutsch", "ltr", "de-DE", "partial", () => import("./locales/de.js?v=16-unified-i18n")),
  defineLocale("el", "Ελληνικά", "ltr", "el-GR", "partial", () => import("./locales/el.js?v=16-unified-i18n")),
  defineLocale("eo", "Esperanto", "ltr", "eo", "partial", () => import("./locales/eo.js?v=16-unified-i18n")),
  defineLocale("es", "Español", "ltr", "es-ES", "partial", () => import("./locales/es.js?v=16-unified-i18n")),
  defineLocale("et", "Eesti", "ltr", "et-EE", "partial", () => import("./locales/et.js?v=16-unified-i18n")),
  defineLocale("fa", "فارسی", "rtl", "fa-IR", "partial", () => import("./locales/fa.js?v=16-unified-i18n")),
  defineLocale("fi", "Suomi", "ltr", "fi-FI", "partial", () => import("./locales/fi.js?v=16-unified-i18n")),
  defineLocale("fil", "Filipino", "ltr", "fil-PH", "partial", () => import("./locales/fil.js?v=16-unified-i18n")),
  defineLocale("fo", "Føroyskt", "ltr", "fo-FO", "partial", () => import("./locales/fo.js?v=16-unified-i18n")),
  defineLocale("fr", "Français", "ltr", "fr-FR", "partial", () => import("./locales/fr.js?v=16-unified-i18n")),
  defineLocale("fy", "Frysk", "ltr", "fy-NL", "partial", () => import("./locales/fy.js?v=16-unified-i18n")),
  defineLocale("gl", "Galego", "ltr", "gl-ES", "partial", () => import("./locales/gl.js?v=16-unified-i18n")),
  defineLocale("gu", "ગુજરાતી", "ltr", "gu-IN", "partial", () => import("./locales/gu.js?v=16-unified-i18n")),
  defineLocale("ha", "Hausa", "ltr", "ha-NG", "partial", () => import("./locales/ha.js?v=16-unified-i18n")),
  defineLocale("hi", "हिन्दी", "ltr", "hi-IN", "partial", () => import("./locales/hi.js?v=16-unified-i18n")),
  defineLocale("hr", "Hrvatski", "ltr", "hr-HR", "partial", () => import("./locales/hr.js?v=16-unified-i18n")),
  defineLocale("ht", "Kreyòl ayisyen", "ltr", "ht-HT", "partial", () => import("./locales/ht.js?v=16-unified-i18n")),
  defineLocale("hu", "Magyar", "ltr", "hu-HU", "partial", () => import("./locales/hu.js?v=16-unified-i18n")),
  defineLocale("hy", "Հայերեն", "ltr", "hy-AM", "partial", () => import("./locales/hy.js?v=16-unified-i18n")),
  defineLocale("id", "Bahasa Indonesia", "ltr", "id-ID", "partial", () => import("./locales/id.js?v=16-unified-i18n")),
  defineLocale("is", "Íslenska", "ltr", "is-IS", "partial", () => import("./locales/is.js?v=16-unified-i18n")),
  defineLocale("it", "Italiano", "ltr", "it-IT", "partial", () => import("./locales/it.js?v=16-unified-i18n")),
  defineLocale("ja", "日本語", "ltr", "ja-JP", "partial", () => import("./locales/ja.js?v=16-unified-i18n")),
  defineLocale("jv", "Basa Jawa", "ltr", "jv-ID", "partial", () => import("./locales/jv.js?v=16-unified-i18n")),
  defineLocale("ka", "ქართული", "ltr", "ka-GE", "partial", () => import("./locales/ka.js?v=16-unified-i18n")),
  defineLocale("kk", "Қазақша", "ltr", "kk-KZ", "partial", () => import("./locales/kk.js?v=16-unified-i18n")),
  defineLocale("ko", "한국어", "ltr", "ko-KR", "partial", () => import("./locales/ko.js?v=16-unified-i18n")),
  defineLocale("lb", "Lëtzebuergesch", "ltr", "lb-LU", "partial", () => import("./locales/lb.js?v=16-unified-i18n")),
  defineLocale("lt", "Lietuvių", "ltr", "lt-LT", "partial", () => import("./locales/lt.js?v=16-unified-i18n")),
  defineLocale("lv", "Latviešu", "ltr", "lv-LV", "partial", () => import("./locales/lv.js?v=16-unified-i18n")),
  defineLocale("mk", "Македонски", "ltr", "mk-MK", "partial", () => import("./locales/mk.js?v=16-unified-i18n")),
  defineLocale("mr", "मराठी", "ltr", "mr-IN", "partial", () => import("./locales/mr.js?v=16-unified-i18n")),
  defineLocale("ms", "Bahasa Melayu", "ltr", "ms-MY", "partial", () => import("./locales/ms.js?v=16-unified-i18n")),
  defineLocale("nb", "Norsk bokmål", "ltr", "nb-NO", "partial", () => import("./locales/nb.js?v=16-unified-i18n")),
  defineLocale("ne", "नेपाली", "ltr", "ne-NP", "partial", () => import("./locales/ne.js?v=16-unified-i18n")),
  defineLocale("nl", "Nederlands", "ltr", "nl-NL", "partial", () => import("./locales/nl.js?v=16-unified-i18n")),
  defineLocale("nn", "Norsk nynorsk", "ltr", "nn-NO", "partial", () => import("./locales/nn.js?v=16-unified-i18n")),
  defineLocale("pa", "ਪੰਜਾਬੀ", "ltr", "pa-IN", "partial", () => import("./locales/pa.js?v=16-unified-i18n")),
  defineLocale("pl", "Polski", "ltr", "pl-PL", "partial", () => import("./locales/pl.js?v=16-unified-i18n")),
  defineLocale("pt", "Português", "ltr", "pt-BR", "partial", () => import("./locales/pt.js?v=16-unified-i18n")),
  defineLocale("ro", "Română", "ltr", "ro-RO", "partial", () => import("./locales/ro.js?v=16-unified-i18n")),
  defineLocale("ru", "Русский", "ltr", "ru-RU", "partial", () => import("./locales/ru.js?v=16-unified-i18n")),
  defineLocale("sk", "Slovenčina", "ltr", "sk-SK", "partial", () => import("./locales/sk.js?v=16-unified-i18n")),
  defineLocale("sl", "Slovenščina", "ltr", "sl-SI", "partial", () => import("./locales/sl.js?v=16-unified-i18n")),
  defineLocale("so", "Soomaali", "ltr", "so-SO", "partial", () => import("./locales/so.js?v=16-unified-i18n")),
  defineLocale("sq", "Shqip", "ltr", "sq-AL", "partial", () => import("./locales/sq.js?v=16-unified-i18n")),
  defineLocale("sr", "Srpski", "ltr", "sr-Latn-RS", "partial", () => import("./locales/sr.js?v=16-unified-i18n")),
  defineLocale("sv", "Svenska", "ltr", "sv-SE", "partial", () => import("./locales/sv.js?v=16-unified-i18n")),
  defineLocale("sw", "Kiswahili", "ltr", "sw-TZ", "partial", () => import("./locales/sw.js?v=16-unified-i18n")),
  defineLocale("ta", "தமிழ்", "ltr", "ta-IN", "partial", () => import("./locales/ta.js?v=16-unified-i18n")),
  defineLocale("te", "తెలుగు", "ltr", "te-IN", "partial", () => import("./locales/te.js?v=16-unified-i18n")),
  defineLocale("th", "ไทย", "ltr", "th-TH", "partial", () => import("./locales/th.js?v=16-unified-i18n")),
  defineLocale("tr", "Türkçe", "ltr", "tr-TR", "partial", () => import("./locales/tr.js?v=16-unified-i18n")),
  defineLocale("uk", "Українська", "ltr", "uk-UA", "partial", () => import("./locales/uk.js?v=16-unified-i18n")),
  defineLocale("ur", "اردو", "rtl", "ur-PK", "partial", () => import("./locales/ur.js?v=16-unified-i18n")),
  defineLocale("uz", "O‘zbekcha", "ltr", "uz-UZ", "partial", () => import("./locales/uz.js?v=16-unified-i18n")),
  defineLocale("vi", "Tiếng Việt", "ltr", "vi-VN", "partial", () => import("./locales/vi.js?v=16-unified-i18n")),
  defineLocale("yo", "Yorùbá", "ltr", "yo-NG", "partial", () => import("./locales/yo.js?v=16-unified-i18n")),
  defineLocale("zh", "简体中文", "ltr", "zh-CN", "partial", () => import("./locales/zh.js?v=16-unified-i18n")),
  defineLocale("zu", "isiZulu", "ltr", "zu-ZA", "partial", () => import("./locales/zu.js?v=16-unified-i18n")),
]);

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

export function validateRegistryMetadata(locales = LOCALES) {
  if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("Locale metadata list must be non-empty.");
  const codes = new Map();
  const aliases = new Map();
  const assets = new Set();

  for (const locale of locales) {
    if (!locale || typeof locale !== "object") throw new TypeError("Locale metadata must be an object.");
    const canonicalCode = canonicalTag(locale.code);
    if (!canonicalCode || canonicalCode !== locale.code) throw new RangeError(`Locale ${String(locale.code)} has a non-canonical code.`);
    if (codes.has(canonicalCode)) throw new RangeError(`Duplicate locale code: ${canonicalCode}.`);
    if (typeof locale.displayName !== "string" || locale.displayName.trim() === "") throw new RangeError(`Locale ${canonicalCode} has no display name.`);
    if (!["ltr", "rtl"].includes(locale.dir)) throw new RangeError(`Locale ${canonicalCode} has invalid direction.`);
    if (!canonicalTag(locale.intlLocale)) throw new RangeError(`Locale ${canonicalCode} has invalid Intl locale.`);
    if (!SUPPORT_LEVELS.includes(locale.support)) throw new RangeError(`Locale ${canonicalCode} has invalid support status ${String(locale.support)}.`);
    if ((locale.experimental === true) !== (locale.support === "experimental")) throw new RangeError(`Locale ${canonicalCode} has inconsistent experimental projection.`);
    if (typeof locale.asset !== "string" || locale.asset === "") throw new RangeError(`Locale ${canonicalCode} has no asset path.`);
    if (assets.has(locale.asset)) throw new RangeError(`Duplicate locale asset: ${locale.asset}.`);
    if (typeof locale.loader !== "function") throw new RangeError(`Locale ${canonicalCode} has no loader.`);
    if (!Array.isArray(locale.aliases)) throw new RangeError(`Locale ${canonicalCode} aliases must be an array.`);
    codes.set(canonicalCode, locale);
    assets.add(locale.asset);
  }

  for (const locale of locales) {
    for (const alias of locale.aliases) {
      const canonicalAlias = canonicalTag(alias);
      if (!canonicalAlias) throw new RangeError(`Locale ${locale.code} has invalid alias ${String(alias)}.`);
      if (codes.has(canonicalAlias)) throw new RangeError(`Alias ${alias} duplicates registered locale code ${canonicalAlias}.`);
      const existing = aliases.get(canonicalAlias);
      if (existing) throw new RangeError(`Alias ${alias} is duplicated by ${existing.code} and ${locale.code}.`);
      aliases.set(canonicalAlias, locale);
    }
  }
  return true;
}

validateRegistryMetadata();

const byCode = new Map(LOCALES.map((locale) => [canonicalTag(locale.code), locale]));
const byAlias = new Map();
for (const locale of LOCALES) {
  for (const alias of locale.aliases) byAlias.set(canonicalTag(alias), locale);
}

const loadedSources = new Map();
const loadedLocales = new Map();
const LOCAL_SOURCE = Symbol("pastafari.i18n.localSource");

export function matchSupportedLocale(tag) {
  for (const candidate of fallbackTags(tag)) {
    const locale = byCode.get(candidate) ?? byAlias.get(candidate);
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
  if (Object.prototype.hasOwnProperty.call(resource, "support")) {
    throw new RangeError(`Locale ${metadata.code} must not declare support; the registry is the single source of truth.`);
  }
  if (Object.prototype.hasOwnProperty.call(resource, "experimental") && (resource.experimental === true) !== (metadata.support === "experimental")) {
    throw new RangeError(`Locale ${metadata.code} has stale experimental metadata.`);
  }
  return resource;
}

export function isLocaleLoaded(code) {
  return loadedLocales.has(getLocale(code).code);
}

export async function loadLocaleSource(code) {
  const metadata = getLocale(code);
  const existing = loadedSources.get(metadata.code);
  if (existing) return existing;

  const loading = metadata.loader().then((module) => assertLoadedLocaleMatchesMetadata(module.default, metadata));
  loadedSources.set(metadata.code, loading);
  try {
    return await loading;
  } catch (error) {
    if (loadedSources.get(metadata.code) === loading) loadedSources.delete(metadata.code);
    throw error;
  }
}

export async function loadAllLocaleSources() {
  return Promise.all(LOCALES.map((locale) => loadLocaleSource(locale.code)));
}

function getPath(object, path) {
  return path.split(".").reduce((value, part) => value?.[part], object);
}

function ownRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function assertOptionalRecord(owner, key, localeCode, label) {
  if (!owner || !Object.prototype.hasOwnProperty.call(owner, key)) return;
  const value = owner[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new RangeError(`Locale ${localeCode} has invalid ${label} resource group.`);
  }
}

function validateLocaleResourceShape(resource, localeCode) {
  assertOptionalRecord(resource, "messages", localeCode, "messages");
  assertOptionalRecord(resource, "terminology", localeCode, "terminology");
  assertOptionalRecord(resource, "calendar", localeCode, "calendar");
  if (resource?.calendar && typeof resource.calendar === "object" && !Array.isArray(resource.calendar)) {
    assertOptionalRecord(resource.calendar, "cutlets", localeCode, "calendar.cutlets");
    assertOptionalRecord(resource.calendar, "months", localeCode, "calendar.months");
  }
}

function localGroups(resource) {
  return {
    messages: ownRecord(resource?.messages),
    terminology: ownRecord(resource?.terminology),
    cutlets: ownRecord(resource?.calendar?.cutlets),
    months: ownRecord(resource?.calendar?.months),
  };
}

function baselineGroups(resource) {
  const groups = localGroups(resource);
  return {
    messages: Object.keys(groups.messages).sort(),
    terminology: Object.keys(groups.terminology).sort(),
    cutlets: CUTLETS.map(({ id }) => id).sort(),
    months: MONTHS.map(({ id }) => id).sort(),
  };
}

function assertKnownNonEmptyStringValues(localeCode, groupName, values, expectedKeys) {
  const expected = new Set(expectedKeys);
  for (const [key, value] of Object.entries(values)) {
    if (!expected.has(key)) throw new RangeError(`Locale ${localeCode} contains unknown ${groupName} key ${key}.`);
    if (typeof value !== "string" || value.trim() === "") {
      throw new RangeError(`Locale ${localeCode} contains an empty or invalid ${groupName} value for ${key}.`);
    }
  }
}

function missingKeys(values, expectedKeys) {
  return expectedKeys.filter((key) => !Object.prototype.hasOwnProperty.call(values, key));
}

const MESSAGE_PLACEHOLDER_PATTERN = /\{([A-Za-z0-9_.-]+)\}/g;

function messagePlaceholders(template) {
  return [...new Set([...String(template).matchAll(MESSAGE_PLACEHOLDER_PATTERN)].map((match) => match[1]))].sort();
}

function sameStringSet(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function validateMessagePlaceholders(localeCode, messages, englishMessages) {
  for (const [key, value] of Object.entries(messages)) {
    const baseline = englishMessages[key];
    if (typeof baseline !== "string") continue;
    const expected = messagePlaceholders(baseline);
    const actual = messagePlaceholders(value);
    if (!sameStringSet(actual, expected)) {
      throw new RangeError(
        `Locale ${localeCode} has placeholder mismatch for ${key}: expected {${expected.join(", ")}}, received {${actual.join(", ")}}.`,
      );
    }
  }
}

const ALWAYS_LOCAL_MESSAGE_KEYS = Object.freeze([
  "app.title",
  "meta.description",
  "manifest.shortName",
  "manifest.defaultDescription",
]);

export function validateLocaleSourceContract(resource, metadata, englishBaseline) {
  assertLoadedLocaleMatchesMetadata(resource, metadata);
  validateLocaleResourceShape(resource, metadata.code);
  validateLocaleResourceShape(englishBaseline, DEFAULT_LOCALE);
  if (!SUPPORT_LEVELS.includes(metadata.support)) throw new RangeError(`Locale ${metadata.code} has invalid support status.`);
  if (!["ltr", "rtl"].includes(metadata.dir)) throw new RangeError(`Locale ${metadata.code} has invalid direction.`);
  if (!canonicalTag(metadata.intlLocale)) throw new RangeError(`Locale ${metadata.code} has invalid Intl locale.`);

  const expected = baselineGroups(englishBaseline);
  const groups = localGroups(resource);
  for (const groupName of Object.keys(groups)) {
    assertKnownNonEmptyStringValues(metadata.code, groupName, groups[groupName], expected[groupName]);
  }

  validateMessagePlaceholders(metadata.code, groups.messages, localGroups(englishBaseline).messages);

  const requiredManifestMessages = ALWAYS_LOCAL_MESSAGE_KEYS.filter((key) => expected.messages.includes(key));
  const missingManifestMessages = missingKeys(groups.messages, requiredManifestMessages);
  if (missingManifestMessages.length) {
    throw new RangeError(`Locale ${metadata.code} must define manifest-bound messages locally: ${missingManifestMessages.join(", ")}.`);
  }

  if (metadata.support === "complete") {
    for (const groupName of Object.keys(groups)) {
      const missing = missingKeys(groups[groupName], expected[groupName]);
      if (missing.length) throw new RangeError(`Complete locale ${metadata.code} is missing ${groupName}: ${missing.join(", ")}.`);
    }
  }
  return true;
}

function mergeGroup(fallback, local) {
  return Object.freeze({ ...ownRecord(fallback), ...ownRecord(local) });
}

export function materializeLocaleResources(resource, metadata, englishBaseline) {
  validateLocaleSourceContract(resource, metadata, englishBaseline);
  const local = localGroups(resource);
  const fallback = localGroups(englishBaseline);
  const result = {
    ...resource,
    messages: mergeGroup(fallback.messages, local.messages),
    terminology: mergeGroup(fallback.terminology, local.terminology),
    calendar: Object.freeze({
      ...ownRecord(englishBaseline?.calendar),
      ...ownRecord(resource?.calendar),
      cutlets: mergeGroup(fallback.cutlets, local.cutlets),
      months: mergeGroup(fallback.months, local.months),
    }),
  };
  Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
  return Object.freeze(result);
}

function wrapCompleteLocaleSource(resource) {
  const result = { ...resource };
  Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
  return Object.freeze(result);
}

export async function loadLocale(code) {
  const metadata = getLocale(code);
  const existing = loadedLocales.get(metadata.code);
  if (existing) return existing;

  const loading = (async () => {
    const resource = await loadLocaleSource(metadata.code);
    if (metadata.support === "complete") return wrapCompleteLocaleSource(resource);
    const english = await loadLocaleSource(DEFAULT_LOCALE);
    return materializeLocaleResources(resource, metadata, english);
  })();
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

export function messageTemplate(locale, key) {
  const template = locale?.messages?.[key];
  if (typeof template !== "string") throw new RangeError(`Missing translation key: ${key}`);
  return template;
}

export function translate(locale, key, values = {}) {
  return messageTemplate(locale, key).replace(MESSAGE_PLACEHOLDER_PATTERN, (match, name) => {
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

const ENGLISH_EQUALITY_ALLOWLIST = Object.freeze(new Set([
  "messages.app.brand",
  "messages.manifest.shortName",
  "messages.manifest.defaultDescription",
  "messages.reverse.error.limitPositive",
  "messages.reverse.error.limitSafeInteger",
  "messages.reverse.error.absoluteDateField",
  "cutlets.lagash",
  "cutlets.palgurash",
  "cutlets.akkad",
  "months.eridu",
  "months.karshumab",
  "months.uruk",
  "months.susa",
  "months.babylon",
]));

function analyzeGroup(local, english, prefix, { checkEnglishLeakage = true } = {}) {
  const expectedKeys = Object.keys(english).sort();
  const localKeys = Object.keys(local).filter((key) => expectedKeys.includes(key)).sort();
  const missing = expectedKeys.filter((key) => !Object.prototype.hasOwnProperty.call(local, key));
  const empty = localKeys.filter((key) => typeof local[key] !== "string" || local[key].trim() === "");
  const unknown = Object.keys(local).filter((key) => !expectedKeys.includes(key)).sort();
  const identicalToEnglish = localKeys.filter((key) => typeof local[key] === "string" && local[key] === english[key]);
  const allowedEnglish = checkEnglishLeakage
    ? identicalToEnglish.filter((key) => ENGLISH_EQUALITY_ALLOWLIST.has(`${prefix}.${key}`))
    : [];
  const suspiciousEnglish = checkEnglishLeakage
    ? identicalToEnglish
      .filter((key) => /[A-Za-z]{3,}/.test(String(local[key])))
      .filter((key) => !ENGLISH_EQUALITY_ALLOWLIST.has(`${prefix}.${key}`))
    : [];
  return {
    total: expectedKeys.length,
    local: localKeys.length,
    fallback: missing.length,
    coverage: expectedKeys.length ? Number(((localKeys.length / expectedKeys.length) * 100).toFixed(2)) : 100,
    missingKeys: missing,
    emptyKeys: empty,
    unknownKeys: unknown,
    identicalToEnglish,
    allowedEnglish,
    suspiciousEnglish,
  };
}

export function auditLocaleResources(locales) {
  if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("Explicitly loaded locale resources are required for audit.");
  const sourceByCode = new Map(locales.map((locale) => {
    const source = locale?.[LOCAL_SOURCE] ?? locale;
    return [source?.code, source];
  }));
  const english = sourceByCode.get(DEFAULT_LOCALE);
  if (!english) throw new RangeError("English baseline locale is required for audit.");
  const englishGroups = localGroups(english);
  const report = [];

  for (const metadata of LOCALES) {
    const source = sourceByCode.get(metadata.code);
    if (!source) throw new RangeError(`Registered locale ${metadata.code} was not supplied for audit.`);
    const groups = localGroups(source);
    const resourceGroups = {
      messages: analyzeGroup(groups.messages, englishGroups.messages, "messages", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      terminology: analyzeGroup(groups.terminology, englishGroups.terminology, "terminology", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      cutlets: analyzeGroup(groups.cutlets, englishGroups.cutlets, "cutlets", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      months: analyzeGroup(groups.months, englishGroups.months, "months", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
    };

    const groupValues = Object.values(resourceGroups);
    const totalKeys = groupValues.reduce((sum, group) => sum + group.total, 0);
    const localKeys = groupValues.reduce((sum, group) => sum + group.local, 0);
    const fallbackKeys = groupValues.reduce((sum, group) => sum + group.fallback, 0);
    const emptyKeys = groupValues.flatMap((group) => group.emptyKeys);
    const unknownKeys = groupValues.flatMap((group) => group.unknownKeys);
    const coreGroupsPresent = ["messages", "terminology", "cutlets", "months"].every((name) => resourceGroups[name].local > 0);
    const structurallyComplete = fallbackKeys === 0 && emptyKeys.length === 0 && unknownKeys.length === 0;
    const proposedStructuralStatus = structurallyComplete ? "complete-candidate" : coreGroupsPresent ? "partial" : "experimental";

    report.push({
      code: metadata.code,
      canonicalTag: canonicalTag(metadata.code),
      aliases: [...metadata.aliases],
      displayName: metadata.displayName,
      dir: metadata.dir,
      intlLocale: metadata.intlLocale,
      status: metadata.support,
      experimental: metadata.support === "experimental",
      legacyExperimentalDeclared: Object.prototype.hasOwnProperty.call(source, "experimental") ? source.experimental : null,
      totalKeys,
      localKeys,
      fallbackKeys,
      coverage: totalKeys ? Number(((localKeys / totalKeys) * 100).toFixed(2)) : 100,
      resourceGroups,
      proposedStructuralStatus,
    });
  }
  return report;
}

export function validateLocaleResources(locales) {
  if (!Array.isArray(locales) || locales.length === 0) {
    throw new TypeError("Explicitly loaded locale resources are required for validation.");
  }
  const sources = locales.map((locale) => locale?.[LOCAL_SOURCE] ?? locale);
  const sourceByCode = new Map();
  for (const source of sources) {
    if (!source || typeof source !== "object") throw new TypeError("Locale must be an object.");
    if (sourceByCode.has(source.code)) throw new RangeError(`Duplicate loaded locale source ${source.code}.`);
    sourceByCode.set(source.code, source);
  }
  const english = sourceByCode.get(DEFAULT_LOCALE);
  if (!english) throw new RangeError("English baseline locale is required for validation.");
  if (sources.length !== LOCALES.length) throw new RangeError(`Expected ${LOCALES.length} locale resources, received ${sources.length}.`);

  for (const metadata of LOCALES) {
    const source = sourceByCode.get(metadata.code);
    if (!source) throw new RangeError(`Locale ${metadata.code} is registered but its module was not loaded.`);
    validateLocaleSourceContract(source, metadata, english);
  }
  for (const source of sources) {
    if (!matchSupportedLocale(source.code) || !byCode.has(canonicalTag(source.code))) {
      throw new RangeError(`Locale module ${String(source.code)} has no registry entry.`);
    }
  }
  return true;
}

export function validateLocaleInventory(fileNames, locales = LOCALES) {
  if (!Array.isArray(fileNames)) throw new TypeError("Locale file inventory must be an array.");
  const expected = locales.map(({ code }) => `${code}.js`).sort();
  const actual = fileNames.filter((name) => name.endsWith(".js")).sort();
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missingModules = expected.filter((name) => !actualSet.has(name));
  const unregisteredModules = actual.filter((name) => !expectedSet.has(name));
  if (missingModules.length || unregisteredModules.length) {
    const details = [
      missingModules.length ? `missing modules: ${missingModules.join(", ")}` : null,
      unregisteredModules.length ? `unregistered modules: ${unregisteredModules.join(", ")}` : null,
    ].filter(Boolean).join("; ");
    throw new RangeError(`Locale registry/module inventory mismatch (${details}).`);
  }
  return true;
}
