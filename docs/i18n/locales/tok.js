"use strict";

import base from "./en.js?v=10-i18n-90";

export default Object.freeze({
  code: "tok",
  displayName: "toki pona (experimental)",
  dir: "ltr",
  intlLocale: "tok",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "lipu tenpo Pastafari",
    "language.label": "toki",
    "field.year": "sike",
    "field.month": "mun",
    "field.day": "tenpo suno",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
