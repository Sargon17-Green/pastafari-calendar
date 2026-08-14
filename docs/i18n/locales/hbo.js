"use strict";

import base from "./he.js?v=10-i18n-90";

export default Object.freeze({
  code: "hbo",
  displayName: "עברית מקראית (ניסיוני)",
  dir: "rtl",
  intlLocale: "hbo",
  experimental: true,
  fallbackLocale: "he",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "לוח שנה פסטפרי",
    "language.label": "לשון",
    "field.year": "שנה",
    "field.month": "חודש",
    "field.day": "יום",
    "calendarHelp.hebrew": "את החודשים בוחרים בשמותם. את השנה ואת היום אפשר לכתוב בספרות או במספר עברי באותיות, כגון תשפ״ו או י״ד; שנה הכתובה באותיות בלא ציון האלפים נחשבת בתוספת 5,000.",
    "calendarHelp.hindu": "כתבו שנה ויום לפי המניין ההינדואי הקדום ובחרו את החודש בשמו. בלוח הירח אפשר לציין גם חודש נוסף.",
    "calendarHelp.japanese": "שנה 1 מתחילה ביום הראשון של התקופה; לשנה הראשונה אפשר לכתוב גם 元 או 元年. תאריך שלפני ראשית התקופה או אחרי סופה אינו מתקבל.",
    "calendarHelp.bahai": "בחרו את החודש בשמו או Ayyám-i-Há. שיטת שוויון טהראן נתמכת בטווח הגריגוריאני המקובל 1844–3000.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
