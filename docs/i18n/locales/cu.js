"use strict";

import base from "./bg.js?v=10-i18n-90";

export default Object.freeze({
  code: "cu",
  displayName: "Словѣньскъ (experimental)",
  dir: "ltr",
  intlLocale: "cu",
  experimental: true,
  fallbackLocale: "bg",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Пастафарьскъ календарь",
    "language.label": "Ѩзыкъ",
    "field.year": "Лѣто",
    "field.month": "Мѣсѧць",
    "field.day": "Дьнь",
    "calendarHelp.hebrew": "Мѣсѧци по именемъ избираѭтъ сѧ. Лѣто и дьнь можьно въвести цифрами десѧтичными или еврейскими числовыми буквами, напримѣръ תשפ״ו или י״ד; лѣто буквами безъ знамениѧ тысѧщь написано съ прибавлениемъ 5000 толкуетъ сѧ.",
    "calendarHelp.hindu": "Въведи лѣто и дьнь по древнему индийскому счислению и избери мѣсѧць по имени. Въ лунномъ образѣ можьно знаменовати и мѣсѧць вставный.",
    "calendarHelp.japanese": "Лѣто 1 начьнетъ сѧ въ прьвый дьнь еры; за прьвое лѣто можьно въвести и 元 или 元年. Дата прежде начала или послѣ конца еры отвергаетъ сѧ.",
    "calendarHelp.bahai": "Избери мѣсѧць по имени или Ayyám-i-Há. Образъ тегеранскаго равноденствиѧ поддьрживаетъ обычный григорианский предѣлъ 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
