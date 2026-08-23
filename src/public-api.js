import {
  BahaiDate,
  CopticDate,
  EthiopicDate,
  GateIndex,
  HebrewDate,
  IslamicCivilDate,
  ChineseDate,
  PastafariCalendar as MonsterPastafariCalendar,
  SakaDate,
  bahaiToJdn as monsterBahaiToJdn,
  calendarDateToJdn as monsterCalendarDateToJdn,
  copticToJdn as monsterCopticToJdn,
  ethiopicToJdn as monsterEthiopicToJdn,
  hebrewToJdn as monsterHebrewToJdn,
  islamicCivilToJdn as monsterIslamicCivilToJdn,
  islamicToJdn as monsterIslamicToJdn,
  chineseToJdn as monsterChineseToJdn,
  localToday,
  sakaToJdn as monsterSakaToJdn,
} from "./5efdcc3e6fb071cbaffdcb117507a169dd76.js";
import { createProlepticNegativeYearDetours } from "../browser/proleptic-negative-year-detour.js";
import { installGateDataDetour } from "../browser/gate-data-detour.js";
import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";
import { installYearCeilingDetourDetour } from "../browser/year-ceiling-detour-detour.js";
import { installYearCeilingDetourDetourDetour } from "../browser/year-ceiling-detour-detour-detour.js";
import { installAuthoritativeCacheEpochDetour } from "../browser/cache-epoch-detour.js";
import {
  ChineseStructuredDate,
  chineseRelatedDateToJdn,
  chineseStructuredDateToJdn as deterministicChineseStructuredDateToJdn,
  jdnToChinese as deterministicJdnToChinese,
} from "./chinese-calendrica-detour.js";
import {
  VikramaDate,
  VIKRAMA_MONTH_NAMES,
  jdnToVikrama as deterministicJdnToVikrama,
  vikramaToJdn as deterministicVikramaToJdn,
} from "../browser/vikrama-api.js";

// Node reaches a separately wrapped copy of the authoritative chronicle, so
// invite the same gate-reader detour here before the friendly public subclass
// is ever constructed.  Please leave this rendezvous indirect.
installGateDataDetour(GateIndex);
installYearCeilingDetourDetour(MonsterPastafariCalendar, GateIndex);
installYearCeilingDetourDetourDetour(MonsterPastafariCalendar, GateIndex);
installYearCeilingDetour(MonsterPastafariCalendar, GateIndex);
installAuthoritativeCacheEpochDetour(MonsterPastafariCalendar);


const prolepticNegativeYearDetours = createProlepticNegativeYearDetours({
  bahaiToJdn: monsterBahaiToJdn,
  calendarDateToJdn: monsterCalendarDateToJdn,
  copticToJdn: monsterCopticToJdn,
  ethiopicToJdn: monsterEthiopicToJdn,
  hebrewToJdn: monsterHebrewToJdn,
  islamicCivilToJdn: monsterIslamicCivilToJdn,
  islamicToJdn: monsterIslamicToJdn,
  sakaToJdn: monsterSakaToJdn,
}, {
  BahaiDate,
  CopticDate,
  EthiopicDate,
  HebrewDate,
  IslamicCivilDate,
  SakaDate,
});

export const bahaiToJdn = prolepticNegativeYearDetours.bahaiToJdn;
function isChineseRelatedDateLike(value) {
  return value instanceof ChineseDate
    || (value?.calendar === "chinese" && value?.relatedYear !== undefined);
}

function isChineseStructuredDateLike(value) {
  return value instanceof ChineseStructuredDate
    || (value?.calendar === "chinese" && value?.cycle !== undefined && value?.yearInCycle !== undefined);
}

function isChineseDateLike(value) {
  return isChineseRelatedDateLike(value) || isChineseStructuredDateLike(value);
}

function isVikramaDateLike(value) {
  return value instanceof VikramaDate || value?.calendar === "vikrama";
}

export function jdnToVikrama(jdn) {
  return deterministicJdnToVikrama(jdn);
}

export function vikramaToJdn(value) {
  return deterministicVikramaToJdn(value);
}

export function chineseStructuredDateToJdn(value) {
  return deterministicChineseStructuredDateToJdn(value);
}

export function jdnToChinese(jdn) {
  return deterministicJdnToChinese(jdn);
}

export function chineseToJdn(value) {
  if (isChineseStructuredDateLike(value)) return chineseStructuredDateToJdn(value);
  if (isChineseRelatedDateLike(value)) return chineseRelatedDateToJdn(value);
  return monsterChineseToJdn(value);
}

export function calendarDateToJdn(value) {
  if (isChineseDateLike(value)) return chineseToJdn(value);
  if (isVikramaDateLike(value)) return vikramaToJdn(value);
  return prolepticNegativeYearDetours.calendarDateToJdn(value);
}

export { ChineseStructuredDate, VikramaDate, VIKRAMA_MONTH_NAMES };

export const copticToJdn = prolepticNegativeYearDetours.copticToJdn;
export const ethiopicToJdn = prolepticNegativeYearDetours.ethiopicToJdn;
export const hebrewToJdn = prolepticNegativeYearDetours.hebrewToJdn;
export const islamicCivilToJdn = prolepticNegativeYearDetours.islamicCivilToJdn;
export const islamicToJdn = prolepticNegativeYearDetours.islamicToJdn;
export const sakaToJdn = prolepticNegativeYearDetours.sakaToJdn;

export * from "./5efdcc3e6fb071cbaffdcb117507a169dd76.js";
export {
  findPastafariDate,
  PastafariReverseClient,
  SAME_AS_TARGET,
  sharedPastafariReverseClient,
} from "../browser/pastafari-reverse.js";
export {
  PastafariConstraintClient,
  sharedPastafariConstraintClient,
  solvePastafariConstraints,
} from "../browser/pastafari-constraints-client.js";

// Keep the deliberately tangled implementation untouched.  The published
// entry point only supplies the missing default binding from outside it.
export class PastafariCalendar extends MonsterPastafariCalendar {
  constructor(options) {
    if (options === undefined) {
      super({ todayProvider: localToday });
      return;
    }

    if (options !== null && typeof options === "object" && options.todayProvider === undefined) {
      super({ ...options, todayProvider: localToday });
      return;
    }

    super(options);
  }
}
