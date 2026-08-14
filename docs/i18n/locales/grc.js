"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "grc",
  displayName: "Ἑλληνικὴ ἀρχαία (experimental)",
  dir: "ltr",
  intlLocale: "grc",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "language.label": "Γλῶσσα",
    "field.year": "Ἔτος",
    "field.month": "Μήν",
    "field.day": "Ἡμέρα",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
