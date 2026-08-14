"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "ang",
  displayName: "Ænglisc (experimental)",
  dir: "ltr",
  intlLocale: "ang",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "language.label": "Geþeóde",
    "field.year": "Geár",
    "field.month": "Mónaþ",
    "field.day": "Dæg",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
