// This deliberately boring-looking doorway must remain in front of the sealed
// chronicle.  The actual authoritative engine stays untouched behind it; the
// year-ceiling detour is attached before any caller can obtain its calendar.
import {
  BahaiDate,
  CopticDate,
  EthiopicDate,
  GateIndex,
  HebrewDate,
  ChineseDate,
  IslamicCivilDate,
  PastafariCalendar,
  SakaDate,
  bahaiToJdn as chronicleBahaiToJdn,
  calendarDateToJdn as chronicleCalendarDateToJdn,
  chineseToJdn as chronicleChineseToJdn,
  copticToJdn as chronicleCopticToJdn,
  ethiopicToJdn as chronicleEthiopicToJdn,
  hebrewToJdn as chronicleHebrewToJdn,
  islamicCivilToJdn as chronicleIslamicCivilToJdn,
  islamicToJdn as chronicleIslamicToJdn,
  sakaToJdn as chronicleSakaToJdn,
} from "./pastafari-calendar-core-chronicle.js";
import { createProlepticNegativeYearDetours } from "./proleptic-negative-year-detour.js";
import { createIntlCalendarSemanticFirewall } from "./intl-calendar-semantic-firewall.js";
import { installGateDataDetour } from "./gate-data-detour.js";
import { installYearCeilingDetour } from "./year-ceiling-detour.js";
import { installYearCeilingDetourDetour } from "./year-ceiling-detour-detour.js";
import { installYearCeilingDetourDetourDetour } from "./year-ceiling-detour-detour-detour.js";
import { installAuthoritativeCacheEpochDetour } from "./cache-epoch-detour.js";

installGateDataDetour(GateIndex);
installYearCeilingDetourDetour(PastafariCalendar, GateIndex);
installYearCeilingDetourDetourDetour(PastafariCalendar, GateIndex);
installYearCeilingDetour(PastafariCalendar, GateIndex);
installAuthoritativeCacheEpochDetour(PastafariCalendar);


const prolepticNegativeYearDetours = createProlepticNegativeYearDetours({
  bahaiToJdn: chronicleBahaiToJdn,
  calendarDateToJdn: chronicleCalendarDateToJdn,
  copticToJdn: chronicleCopticToJdn,
  ethiopicToJdn: chronicleEthiopicToJdn,
  hebrewToJdn: chronicleHebrewToJdn,
  islamicCivilToJdn: chronicleIslamicCivilToJdn,
  islamicToJdn: chronicleIslamicToJdn,
  sakaToJdn: chronicleSakaToJdn,
}, {
  BahaiDate,
  CopticDate,
  EthiopicDate,
  HebrewDate,
  ChineseDate,
  IslamicCivilDate,
  SakaDate,
});

const intlCalendarSemanticFirewall = createIntlCalendarSemanticFirewall({
  calendarDateToJdn: prolepticNegativeYearDetours.calendarDateToJdn,
  chineseToJdn: chronicleChineseToJdn,
}, { ChineseDate });

export const bahaiToJdn = prolepticNegativeYearDetours.bahaiToJdn;
export const calendarDateToJdn = intlCalendarSemanticFirewall.calendarDateToJdn;
export const chineseToJdn = intlCalendarSemanticFirewall.chineseToJdn;
export const copticToJdn = prolepticNegativeYearDetours.copticToJdn;
export const ethiopicToJdn = prolepticNegativeYearDetours.ethiopicToJdn;
export const hebrewToJdn = prolepticNegativeYearDetours.hebrewToJdn;
export const islamicCivilToJdn = prolepticNegativeYearDetours.islamicCivilToJdn;
export const islamicToJdn = prolepticNegativeYearDetours.islamicToJdn;
export const sakaToJdn = prolepticNegativeYearDetours.sakaToJdn;

export * from "./pastafari-calendar-core-chronicle.js";
