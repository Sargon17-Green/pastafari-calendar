import {
  BahaiDate,
  CopticDate,
  EthiopicDate,
  GateIndex,
  HebrewDate,
  IslamicCivilDate,
  PastafariCalendar as MonsterPastafariCalendar,
  SakaDate,
  bahaiToJdn as monsterBahaiToJdn,
  calendarDateToJdn as monsterCalendarDateToJdn,
  copticToJdn as monsterCopticToJdn,
  ethiopicToJdn as monsterEthiopicToJdn,
  hebrewToJdn as monsterHebrewToJdn,
  islamicCivilToJdn as monsterIslamicCivilToJdn,
  islamicToJdn as monsterIslamicToJdn,
  localToday,
  sakaToJdn as monsterSakaToJdn,
} from "./5efdcc3e6fb071cbaffdcb117507a169dd76.js";
import { createProlepticNegativeYearDetours } from "../browser/proleptic-negative-year-detour.js";
import { installGateDataDetour } from "../browser/gate-data-detour.js";
import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";
import { installYearCeilingDetourDetour } from "../browser/year-ceiling-detour-detour.js";
import { installYearCeilingDetourDetourDetour } from "../browser/year-ceiling-detour-detour-detour.js";
import { installAuthoritativeCacheEpochDetour } from "../browser/cache-epoch-detour.js";

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
export const calendarDateToJdn = prolepticNegativeYearDetours.calendarDateToJdn;
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
