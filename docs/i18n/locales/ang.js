"use strict";

import base from "./en.js?v=10-i18n-90";

export default Object.freeze({
  code: "ang",
  displayName: "Ænglisc (experimental)",
  dir: "ltr",
  intlLocale: "ang",
  experimental: true,
  fallbackLocale: "en",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Pastafari Calendar",
    "language.label": "Sprǣc",
    "field.year": "Gēar",
    "field.month": "Mōnaþ",
    "field.day": "Dæġ",
    "calendarHelp.hebrew": "Þā mōnaþas sind be naman gecorene. Gēar and dæġ magon mid tīenlicum stafum oþþe Ebrēiscum rīm-stafum, swā תשפ״ו oþþe י״ד, beon awritene; gēar mid stafum būtan þūsendes tācne is gereahte mid 5,000 tōgeēacnodum.",
    "calendarHelp.hindu": "Wrīt þæt gēar and þone dæġ æfter þǣre ealdan Hindiscan getale and ceos þone mōnaþ be naman. Sē mōnaþlīca hād mæg ēac gemearcian intercalary mōnaþ.",
    "calendarHelp.japanese": "Gēar 1 onginnþ on þǣm forman dæġe þǣre tide; for þǣm forman gēare mæg man ēac 元 oþþe 元年 writan. Dægsetung ǣr onginne oþþe æfter ende þǣre tide biþ forsacen.",
    "calendarHelp.bahai": "Ceos þone mōnaþ be naman oþþe Ayyám-i-Há. Sē Teheran-equinox hād understent þone gewunelican Gregorianan ryne 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
