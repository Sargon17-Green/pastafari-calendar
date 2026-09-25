"use strict";

export const ARTICLE_FALLBACK_LOCALE = "he";

export const ARTICLE_LOCALES = Object.freeze({
  he: Object.freeze({
    code: "he",
    dir: "rtl",
    asset: "./content/he.html?v=1-hebrew-baseline",
  }),
});

export function resolveArticleLocale(code) {
  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
}
