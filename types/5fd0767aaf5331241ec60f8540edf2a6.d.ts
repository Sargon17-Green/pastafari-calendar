export type IntegerLike = bigint | number;
export type IslamicVariant = "civil" | "umalqura";
export type SolarHijriVariant = "official" | "arithmetic-2820";
export type HinduScheme = "old-solar" | "old-lunar";
export type BahaiVariant = "tehran-equinox" | "western-arithmetic";

export class GregorianDate {
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class JulianDate {
  readonly calendar: "julian";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class HebrewDate {
  readonly calendar: "hebrew";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class IslamicDate {
  readonly calendar: "islamic";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  readonly variant: IslamicVariant;
  constructor(year: IntegerLike, month: number, day: number, options: { variant: IslamicVariant });
}

export class IslamicCivilDate extends IslamicDate {
  constructor(year: IntegerLike, month: number, day: number);
}

export class IslamicUmmAlQuraDate extends IslamicDate {
  constructor(year: IntegerLike, month: number, day: number);
}

export class SolarHijriDate {
  readonly calendar: "solar-hijri";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  readonly variant: SolarHijriVariant;
  constructor(year: IntegerLike, month: number, day: number, options?: { variant?: SolarHijriVariant });
}

export class ChineseDate {
  readonly calendar: "chinese";
  readonly relatedYear: bigint;
  readonly month: number;
  readonly day: number;
  readonly leapMonth: boolean;
  constructor(relatedYear: IntegerLike, month: number, day: number, options?: { leapMonth?: boolean });
}

export class HinduDate {
  readonly calendar: "hindu";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  readonly scheme: HinduScheme;
  readonly leapMonth: boolean;
  constructor(
    year: IntegerLike,
    month: number,
    day: number,
    options: { scheme: HinduScheme; leapMonth?: boolean },
  );
}

export class OldHinduSolarDate extends HinduDate {
  constructor(year: IntegerLike, month: number, day: number);
}

export class OldHinduLunarDate extends HinduDate {
  constructor(year: IntegerLike, month: number, day: number, options?: { leapMonth?: boolean });
}

export class SakaDate {
  readonly calendar: "saka";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class ThaiBuddhistDate {
  readonly calendar: "thai-buddhist";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class EthiopicDate {
  readonly calendar: "ethiopic";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class CopticDate {
  readonly calendar: "coptic";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class JapaneseImperialDate {
  readonly calendar: "japanese-imperial";
  readonly era: string;
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(era: string, year: IntegerLike, month: number, day: number);
}

export class MinguoDate {
  readonly calendar: "minguo";
  readonly year: bigint;
  readonly month: number;
  readonly day: number;
  constructor(year: IntegerLike, month: number, day: number);
}

export class BahaiDate {
  readonly calendar: "bahai";
  readonly year: bigint;
  readonly month: number | string;
  readonly day: number;
  readonly variant: BahaiVariant;
  constructor(
    year: IntegerLike,
    month: number | "ayyami-ha" | "ayyám-i-há" | "איאם-הא",
    day: number,
    options?: { variant?: BahaiVariant },
  );
}

export class MayaLongCountDate {
  readonly calendar: "maya-long-count";
  readonly baktun: bigint;
  readonly katun: number;
  readonly tun: number;
  readonly uinal: number;
  readonly kin: number;
  readonly correlation: bigint;
  constructor(
    baktun: IntegerLike,
    katun: number,
    tun: number,
    uinal: number,
    kin: number,
    options?: { correlation?: IntegerLike },
  );
}

export interface GenericCalendarObject {
  calendar: string;
  [key: string]: unknown;
}

export type CalendarDateInput =
  | GregorianDate
  | Date
  | string
  | JulianDate
  | HebrewDate
  | IslamicDate
  | SolarHijriDate
  | ChineseDate
  | HinduDate
  | SakaDate
  | ThaiBuddhistDate
  | EthiopicDate
  | CopticDate
  | JapaneseImperialDate
  | MinguoDate
  | BahaiDate
  | MayaLongCountDate
  | GenericCalendarObject;

export class PastafariDate {
  readonly year: bigint;
  readonly cutletName: string;
  readonly dayInCutlet: number;
  readonly monthName: string;
  readonly dayInMonth: number;
  constructor(year: IntegerLike, cutletName: string, dayInCutlet: number, monthName: string, dayInMonth: number);
  asTuple(): [bigint, string, number, string, number];
  toJSON(): {
    year: string;
    cutletName: string;
    dayInCutlet: number;
    monthName: string;
    dayInMonth: number;
  };
}

export class YearBounds {
  readonly number: bigint;
  readonly openingGate: bigint;
  readonly closingGate: bigint;
  readonly gateIndices: readonly number[];
  readonly firstDay: bigint;
  readonly lastDay: bigint;
  readonly length: number;
  readonly gapCount: number;
}

export class YearStructure {
  readonly year: YearBounds;
  readonly cutletGapCounts: readonly number[];
  readonly cutletNames: readonly string[];
  readonly monthLengths: readonly number[];
  readonly monthWeaving: readonly number[];
  readonly monthNames: readonly string[];
}

export class Stones {
  readonly wheat: bigint;
  readonly barley: bigint;
  readonly salt: bigint;
  readonly bitter: bigint;
  readonly red: bigint;
  asArray(): bigint[];
}

export class ResponseCycle {
  readonly first: bigint;
  readonly step: bigint;
  value(index: IntegerLike): bigint;
  chooseIndex(optionCount: IntegerLike): bigint;
}

export class SauceResult {
  readonly bowls: readonly bigint[];
  readonly finalDropOrder: readonly number[];
  responseCycle(bowlNumber: number, seal: IntegerLike): ResponseCycle;
  chooseIndex(bowlNumber: number, seal: IntegerLike, optionCount: IntegerLike): bigint;
}

export class GateIndex {
  positive: bigint[];
  negative: bigint[];
  gate(index: number): bigint;
  indexAtOrBefore(day: IntegerLike): number;
  indexAtOrAfter(day: IntegerLike): number;
  indicesBetween(firstDay: IntegerLike, lastDay: IntegerLike): number[];
  static forwardGap(number: number): number;
  static backwardGap(number: number): number;
}

export interface CalendarOptions {
  todayProvider?: () => CalendarDateInput;
}

export class PastafariCalendar {
  constructor(options?: CalendarOptions);
  convert(targetDate: CalendarDateInput, options?: { calculationDate?: CalendarDateInput | null }): PastafariDate;
  convertJdn(targetJdn: IntegerLike, options: { calculationJdn: IntegerLike }): PastafariDate;
}

export const M: bigint;
export const FOUNDATION_JDN: bigint;
export const DELIVERY_GREGORIAN_YEAR: bigint;
export const DELIVERY_GREGORIAN_MONTH: number;
export const DELIVERY_GREGORIAN_DAY: number;
export const DELIVERY_JDN: bigint;
export const DELIVERY_DISTANCE: bigint;
export const GREGORIAN_EPOCH_JDN: bigint;
export const JULIAN_EPOCH_JDN: bigint;
export const HEBREW_EPOCH_JDN: bigint;
export const ISLAMIC_EPOCH_JDN: bigint;
export const PERSIAN_EPOCH_JDN: bigint;
export const COPTIC_EPOCH_JDN: bigint;
export const ETHIOPIC_EPOCH_JDN: bigint;
export const UNIX_EPOCH_JDN: bigint;
export const MAYA_GMT_CORRELATION: bigint;
export const STONES: readonly Stones[];
export const CUTLET_NAMES: readonly string[];
export const MONTH_NAMES: readonly string[];

export function store(value: IntegerLike): bigint;
export function dayNumber(jdn: IntegerLike): bigint;
export function makeSauce(actionJdn: IntegerLike, targetJdn: IntegerLike): SauceResult;
export function makeSauceUncached(actionJdn: IntegerLike, targetJdn: IntegerLike): SauceResult;
export function isGregorianLeapYear(year: IntegerLike): boolean;
export function daysInGregorianMonth(year: IntegerLike, month: number): number;
export function validateGregorian(value: GregorianDate): void;
export function gregorianToJdn(value: GregorianDate | Date): bigint;
export function coerceGregorian(value: GregorianDate | Date): GregorianDate;
export function localToday(): GregorianDate;
export function parseHebrewGregorianDate(text: string): GregorianDate;
export function isJulianLeapYear(year: IntegerLike): boolean;
export function daysInJulianMonth(year: IntegerLike, month: number): number;
export function julianToJdn(value: JulianDate): bigint;
export function isHebrewLeapYear(year: IntegerLike): boolean;
export function daysInHebrewYear(year: IntegerLike): number;
export function daysInHebrewMonth(year: IntegerLike, month: number): number;
export function hebrewToJdn(value: HebrewDate): bigint;
export function isIslamicCivilLeapYear(year: IntegerLike): boolean;
export function daysInIslamicCivilMonth(year: IntegerLike, month: number): number;
export function islamicCivilToJdn(value: IslamicDate): bigint;
export function islamicToJdn(value: IslamicDate): bigint;
export function solarHijriArithmeticToJdn(value: SolarHijriDate): bigint;
export function solarHijriToJdn(value: SolarHijriDate): bigint;
export function chineseToJdn(value: ChineseDate): bigint;
export function hinduToJdn(value: HinduDate): bigint;
export function sakaToJdn(value: SakaDate): bigint;
export function thaiBuddhistToJdn(value: ThaiBuddhistDate): bigint;
export function ethiopicToJdn(value: EthiopicDate): bigint;
export function copticToJdn(value: CopticDate): bigint;
export function japaneseImperialToJdn(value: JapaneseImperialDate): bigint;
export function minguoToJdn(value: MinguoDate): bigint;
export function bahaiToJdn(value: BahaiDate): bigint;
export function mayaLongCountToJdn(value: MayaLongCountDate): bigint;
export function calendarObjectToDate(value: GenericCalendarObject): Exclude<CalendarDateInput, Date | string | GenericCalendarObject>;
export function calendarDateToJdn(value: CalendarDateInput): bigint;

export function factorial(n: number): bigint;
export function comb(n: number, k: number): bigint;
export function fallingFactorial(n: number, k: number): bigint;
export function unrankLexicographicPermutation<T>(items: readonly T[], rank: IntegerLike): T[];
export function unrankPartialPermutation<T>(items: readonly T[], length: number, rank: IntegerLike): T[];
export function boundedCompositionCount(total: number, parts: number, low: number, high: number): bigint;
export function unrankBoundedComposition(total: number, parts: number, low: number, high: number, rank: IntegerLike): number[];
export function unrankPositiveCompositionWithRequiredBoundary(
  total: number,
  parts: number,
  rank: IntegerLike,
  requiredBoundary?: number | null,
): number[];

export class MonthWeavingCounter {
  readonly lengths: readonly number[];
  readonly monthCount: number;
  readonly totalLength: number;
  constructor(lengths: readonly number[]);
  get count(): bigint;
  unrank(rank: IntegerLike): number[];
}
