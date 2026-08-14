"use strict";

import base from "./is.js?v=10-i18n-90";

export default Object.freeze({
  code: "non",
  displayName: "Norrœnt mál (experimental)",
  dir: "ltr",
  intlLocale: "non",
  experimental: true,
  fallbackLocale: "is",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Pastafari dagatal",
    "language.label": "Tunga",
    "field.year": "Ár",
    "field.month": "Mánaðr",
    "field.day": "DagR",
    "calendarHelp.hebrew": "Mánaðir eru valdir eptir nafni. Ár ok dag má rita með tugtölum eða hebreskum talstöfum, til dæmis תשפ״ו eða י״ד; ár ritað með stöfum án þúsundamerkis er skilið með 5.000 við bættum.",
    "calendarHelp.hindu": "Rita ár ok dag eptir fornum hindúskum reikningi ok vel mánaðinn eptir nafni. Í tunglformi má einnig marka innskotsmánað.",
    "calendarHelp.japanese": "Ár 1 hefst á fyrsta degi tímabilsins; fyrir fyrsta árið má einnig rita 元 eða 元年. Dagsetning fyrir upphaf eða eftir lok tímabilsins er hafnað.",
    "calendarHelp.bahai": "Vel mánaðinn eptir nafni eða Ayyám-i-Há. Formið með jafndægri í Teheran styður hið venjulega gregoríska bil 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
