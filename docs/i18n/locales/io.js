"use strict";

import base from "./en.js?v=10-i18n-90";

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
    "calendarHelp.hebrew": "La monati selektesas segun lia nomi. Yaro e dio aceptas decimal cifri o Hebrea numeral literi, exemple תשפ״ו o י״ד; yaro skribita per literi sen indiko di mili interpretesas kun 5 000 adjuntita.",
    "calendarHelp.hindu": "Enrezistrez la yaro e dio segun la anciena Hindu-konto e selektez la monato segun nomo. La lunala formo povas anke markar interkalara monato.",
    "calendarHelp.japanese": "Yaro 1 komencas ye la unesma dio di la ero; por la unesma yaro on povas anke enrezistrar 元 o 元年. Dato ante la komenco o pos la fino di la ero refuzesas.",
    "calendarHelp.bahai": "Selektez la monato segun nomo o Ayyám-i-Há. La formo bazita sur la Teheran-equinoxo suportas la konvencional Gregoriana intervalo 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
