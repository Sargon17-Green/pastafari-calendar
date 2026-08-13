"use strict";

const define = (entries) => Object.freeze(entries.map((entry, index) => Object.freeze({ ...entry, index })));

export const CUTLETS = define([
  { id: "bronze", internalName: "ארד" },
  { id: "fox", internalName: "שועל" },
  { id: "kidney", internalName: "כליה" },
  { id: "lagash", internalName: "לגש" },
  { id: "thought", internalName: "מחשבה" },
  { id: "fourPartsOfNine", internalName: "ארבעה חלקים מתשעה" },
  { id: "palgurash", internalName: "פַּלְגּוּרַשׁ" },
  { id: "papyrusSedge", internalName: "גומא" },
  { id: "cluster", internalName: "אשכול" },
  { id: "scorpion", internalName: "עקרב" },
  { id: "ash", internalName: "אפר" },
  { id: "wheat", internalName: "חיטה" },
  { id: "river", internalName: "נהר" },
  { id: "laughter", internalName: "צחוק" },
  { id: "akkad", internalName: "אכד" },
  { id: "horn", internalName: "קרן" },
  { id: "theEmptyJar", internalName: "הכד הריק" },
]);

export const MONTHS = define([
  { id: "clay", internalName: "טין" },
  { id: "pomegranate", internalName: "רימון" },
  { id: "elbow", internalName: "מרפק" },
  { id: "envy", internalName: "קנאה" },
  { id: "eridu", internalName: "ארידו" },
  { id: "toothpaste", internalName: "משחת־שיניים" },
  { id: "threePartsOfFive", internalName: "שלושה חלקים מחמישה" },
  { id: "karshumab", internalName: "כַּרְשׁוּמַב" },
  { id: "tiger", internalName: "נמר" },
  { id: "tin", internalName: "בדיל" },
  { id: "mist", internalName: "ערפל" },
  { id: "frankincense", internalName: "לבונה" },
  { id: "spindle", internalName: "כישור" },
  { id: "rib", internalName: "צלע" },
  { id: "carob", internalName: "חרוב" },
  { id: "uruk", internalName: "אורוק" },
  { id: "shame", internalName: "בושה" },
  { id: "camel", internalName: "גמל" },
  { id: "copper", internalName: "נחושת" },
  { id: "well", internalName: "באר" },
  { id: "yolk", internalName: "חלמון" },
  { id: "star", internalName: "כוכב" },
  { id: "honey", internalName: "דבש" },
  { id: "spleen", internalName: "טחול" },
  { id: "limestone", internalName: "אבן־גיר" },
  { id: "joy", internalName: "שמחה" },
  { id: "fig", internalName: "תאנה" },
  { id: "nineveh", internalName: "נינוה" },
  { id: "frog", internalName: "צפרדע" },
  { id: "pitch", internalName: "זפת" },
  { id: "lamp", internalName: "נר" },
  { id: "theClosedDoor", internalName: "הדלת הסגורה" },
  { id: "sesame", internalName: "שומשום" },
  { id: "nape", internalName: "עורף" },
  { id: "silver", internalName: "כסף" },
  { id: "susa", internalName: "שושן" },
  { id: "storm", internalName: "סערה" },
  { id: "donkey", internalName: "חמור" },
  { id: "flour", internalName: "קמח" },
  { id: "regret", internalName: "חרטה" },
  { id: "babylon", internalName: "בבל" },
  { id: "tongue", internalName: "לשון" },
  { id: "flax", internalName: "פשתן" },
  { id: "salt", internalName: "מלח" },
  { id: "pear", internalName: "אגס" },
  { id: "bow", internalName: "קשת" },
  { id: "sand", internalName: "חול" },
]);

const cutletIndexByInternalName = new Map(CUTLETS.map(({ internalName, index }) => [internalName, index]));
const monthIndexByInternalName = new Map(MONTHS.map(({ internalName, index }) => [internalName, index]));

function indexFor(map, value, type) {
  const index = map.get(String(value));
  if (index === undefined) throw new RangeError(`Unknown internal ${type} name.`);
  return index;
}

export function cutletIndexFromInternalName(name) {
  return indexFor(cutletIndexByInternalName, name, "cutlet");
}

export function monthIndexFromInternalName(name) {
  return indexFor(monthIndexByInternalName, name, "month");
}
