"use strict";

import base from "./en.js?v=10-i18n-90";

export default Object.freeze({
  code: "la",
  displayName: "Latina (experimental)",
  dir: "ltr",
  intlLocale: "la",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Calendarium Pastafarianum",
    "language.label": "Lingua",
    "field.year": "Annus",
    "field.month": "Mensis",
    "field.day": "Dies",
    "calendarHelp.hebrew": "Menses nominibus eliguntur. Annus et dies numeris decimalibus aut litteris numeralibus Hebraicis, exempli gratia תשפ״ו aut י״ד, scribi possunt; annus litteris sine nota milium scriptus additis 5 000 interpretatur.",
    "calendarHelp.hindu": "Annum et diem secundum computationem Hinduicam antiquam inscribe et mensem nomine elige. Forma lunaris etiam mensem intercalarem notare potest.",
    "calendarHelp.japanese": "Annus 1 primo die aetatis incipit; pro anno primo etiam 元 aut 元年 scribi potest. Dies ante initium aut post finem aetatis recusatur.",
    "calendarHelp.bahai": "Mensem nomine aut Ayyám-i-Há elige. Forma aequinoctii Teheranensis spatium Gregorianum usitatum 1844–3000 sustinet.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
