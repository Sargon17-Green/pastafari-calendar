"use strict";

import base from "./en.js?v=8-year-structure";

export default Object.freeze({
  code: "ia",
  displayName: "Interlingua (experimental)",
  dir: "ltr",
  intlLocale: "ia",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Calendario pastafarian",
    "language.label": "Lingua",
    "field.year": "Anno",
    "field.month": "Mense",
    "field.day": "Die",
    "calendarHelp.hebrew": "Le menses es seligite per nomine. Anno e die accepta cifras decimal o litteras numeral hebree, per exemplo תשפ״ו o י״ד; un anno scribite in litteras sin indication del milles es interpretate con 5 000 addite.",
    "calendarHelp.hindu": "Introduce le anno e le die secundo le computo hindu antique e selige le mense per nomine. Le forma lunar pote etiam marcar un mense intercalari.",
    "calendarHelp.japanese": "Le anno 1 comencia le prime die del era; pro le prime anno on pote etiam introducer 元 o 元年. Un data ante le initio o post le fin del era es refusate.",
    "calendarHelp.bahai": "Selige le mense per nomine o Ayyám-i-Há. Le forma basate sur le equinoctio de Teheran supporta le intervallo gregorian conventional 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
