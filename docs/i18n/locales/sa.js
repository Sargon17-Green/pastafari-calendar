"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "sa",
  displayName: "संस्कृतम् (experimental)",
  dir: "ltr",
  intlLocale: "sa",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "language.label": "भाषा",
    "field.year": "वर्षम्",
    "field.month": "मासः",
    "field.day": "दिनम्",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
