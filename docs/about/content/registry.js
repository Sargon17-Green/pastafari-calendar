"use strict";

import { LOCALES } from "../../i18n/registry.js?v=20-about-i18n";

export const ARTICLE_FALLBACK_LOCALE = "he";
export const ARTICLE_ASSET_REVISION = "3-about-i18n";

export const ARTICLE_LOCALES = Object.freeze(Object.fromEntries(
  LOCALES.map(({ code, dir, intlLocale }) => [
    code,
    Object.freeze({
      code,
      lang: intlLocale,
      dir,
      asset: `./content/${code}.html?v=${ARTICLE_ASSET_REVISION}`,
    }),
  ]),
));

export function resolveArticleLocale(code) {
  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
}
