"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "lzh",
  displayName: "文言 (experimental)",
  dir: "ltr",
  intlLocale: "lzh",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "language.label": "語",
    "field.year": "年",
    "field.month": "月",
    "field.day": "日",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
