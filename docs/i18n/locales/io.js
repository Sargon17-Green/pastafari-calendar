"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "io",
  displayName: "Ido (experimental)",
  dir: "ltr",
  intlLocale: "io",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Pastafariana kalendaro",
    "language.label": "Linguo",
    "field.year": "Yaro",
    "field.month": "Monato",
    "field.day": "Dio",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
