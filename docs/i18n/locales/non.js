"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "non",
  displayName: "Norrœnt mál (experimental)",
  dir: "ltr",
  intlLocale: "non",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "language.label": "Tunga",
    "field.year": "Ár",
    "field.month": "Mánaðr",
    "field.day": "Dagr",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
