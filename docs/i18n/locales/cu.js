"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "cu",
  displayName: "Словѣньскъ (experimental)",
  dir: "ltr",
  intlLocale: "cu",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "language.label": "Ѩзыкъ",
    "field.year": "Лѣто",
    "field.month": "Мѣсѧць",
    "field.day": "Дьнь",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
