"use strict";

import base from "./zh.js?v=10-i18n-90";

export default Object.freeze({
  code: "lzh",
  displayName: "文言 (experimental)",
  dir: "ltr",
  intlLocale: "lzh",
  experimental: true,
  fallbackLocale: "zh",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "飛麵教曆",
    "language.label": "語",
    "field.year": "年",
    "field.month": "月",
    "field.day": "日",
    "calendarHelp.hebrew": "月以名擇之。年日可書十進數，亦可用希伯來數字母，如 תשפ״ו、י״ד；年若以字母書而不標千位，則加五千而釋之。",
    "calendarHelp.hindu": "依古印度紀年書年與日，月則以名擇之。太陰式亦可標閏月。",
    "calendarHelp.japanese": "元年始於紀元之首日；第一年亦可書 元 或 元年。早於紀元之始或晚於其終者不受。",
    "calendarHelp.bahai": "月以名擇之，或擇 Ayyám-i-Há。德黑蘭春分式用公曆常規範圍 1844–3000。",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
