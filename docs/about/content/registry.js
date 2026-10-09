"use strict";

export const ARTICLE_FALLBACK_LOCALE = "he";

export const ARTICLE_LOCALES = Object.freeze({
  he: Object.freeze({
    code: "he",
    dir: "rtl",
    asset: "./content/he.html?v=4-about-polish",
  }),
  en: Object.freeze({
    code: "en",
    dir: "ltr",
    asset: "./content/en.html?v=20261009-approved12",
  }),
  af: Object.freeze({
    code: "af",
    dir: "ltr",
    asset: "./content/af.html?v=20261009-approved12",
  }),
  ar: Object.freeze({
    code: "ar",
    dir: "rtl",
    asset: "./content/ar.html?v=20261009-approved12",
  }),
  az: Object.freeze({
    code: "az",
    dir: "ltr",
    asset: "./content/az.html?v=20261009-approved12",
  }),
  be: Object.freeze({
    code: "be",
    dir: "ltr",
    asset: "./content/be.html?v=20261009-approved12",
  }),
  bg: Object.freeze({
    code: "bg",
    dir: "ltr",
    asset: "./content/bg.html?v=20261009-approved12",
  }),
  bn: Object.freeze({
    code: "bn",
    dir: "ltr",
    asset: "./content/bn.html?v=20261009-approved12",
  }),
  bs: Object.freeze({
    code: "bs",
    dir: "ltr",
    asset: "./content/bs.html?v=20261009-approved12",
  }),
  ca: Object.freeze({
    code: "ca",
    dir: "ltr",
    asset: "./content/ca.html?v=20261009-approved12",
  }),
  cs: Object.freeze({
    code: "cs",
    dir: "ltr",
    asset: "./content/cs.html?v=20261009-approved12",
  }),
  da: Object.freeze({
    code: "da",
    dir: "ltr",
    asset: "./content/da.html?v=20261009-approved12",
  }),
  de: Object.freeze({
    code: "de",
    dir: "ltr",
    asset: "./content/de.html?v=20261009-approved12",
  }),
  el: Object.freeze({
    code: "el",
    dir: "ltr",
    asset: "./content/el.html?v=20261009-approved13",
  }),
});

export function resolveArticleLocale(code) {
  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
}
