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
    "calendarHelp.hebrew": "o anu e mun kepeken nimi ona. nanpa sike en nanpa pi tenpo suno li ken kepeken nanpa luka luka anu sitelen nanpa pi toki Iwisi, sama תשפ״ו anu י״ד. sike li kepeken sitelen taso li jo ala e sitelen pi mute suli la ilo li pana e 5,000 tawa ona.",
    "calendarHelp.hindu": "o pana e nanpa sike e nanpa pi tenpo suno lon nasin Hindu pi tenpo pini, o anu e mun kepeken nimi ona. nasin mun li ken pana kin e mun ante pi sike suli.",
    "calendarHelp.japanese": "sike 1 li open lon tenpo suno nanpa wan pi tenpo lawa. sina ken pana kin e 元 anu 元年 tawa sike nanpa wan. tenpo suno pi tenpo open ala anu pi tenpo pini kama li pona ala.",
    "calendarHelp.bahai": "o anu e mun kepeken nimi ona anu Ayyám-i-Há. nasin pi suno sama lon Tehran li pali lon sike Gregorian 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
