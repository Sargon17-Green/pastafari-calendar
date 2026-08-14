"use strict";

import base from "./en.js?v=10-i18n-90";

export default Object.freeze({
  code: "tlh",
  displayName: "tlhIngan Hol (experimental)",
  dir: "ltr",
  intlLocale: "tlh",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Pastafari Calendar",
    "language.label": "Hol",
    "field.year": "DIS",
    "field.month": "jar",
    "field.day": "jaj",
    "calendarHelp.hebrew": "Months are selected by name. Year and day accept decimal digits or Hebrew numeral letters, for example תשפ״ו or י״ד; a letter-form year with no thousands mark is interpreted with 5,000 added.",
    "calendarHelp.hindu": "Enter the year and day in the old Hindu count and choose the month by name. The lunar form can also mark a leap month.",
    "calendarHelp.japanese": "Year 1 begins on the first day of the era; you may also enter 元 or 元年 for the first year. A date before its beginning or after its end is rejected.",
    "calendarHelp.bahai": "Choose the month by name or Ayyám-i-Há. The Tehran-equinox form supports the conventional Gregorian range 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
