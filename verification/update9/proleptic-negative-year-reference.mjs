// Independent Update-9 arithmetic references.  This file imports no production
// converter and no generated engine.  It is only a small formula notebook for
// the six proleptic calendar domains tested in Update 9.
export const FOUNDATION_JDN = -13_334_246n;

export function floorDiv(a, b) {
  let quotient = a / b;
  const remainder = a % b;
  if (remainder !== 0n && ((remainder > 0n) !== (b > 0n))) quotient -= 1n;
  return quotient;
}

export function mod(a, b) {
  const value = a % b;
  return value < 0n ? value + b : value;
}

const HEBREW_EPOCH_JDN = 347_996n;
const ISLAMIC_EPOCH_JDN = 1_948_439n;
const COPTIC_EPOCH_JDN = 1_825_030n;
const ETHIOPIC_EPOCH_JDN = 1_724_221n;

export function gregorianToJdn({ year, month, day }) {
  const y0 = BigInt(year);
  const a = floorDiv(14n - BigInt(month), 12n);
  const y = y0 + 4800n - a;
  const m = BigInt(month) + 12n * a - 3n;
  return BigInt(day)
    + floorDiv(153n * m + 2n, 5n)
    + 365n * y
    + floorDiv(y, 4n)
    - floorDiv(y, 100n)
    + floorDiv(y, 400n)
    - 32045n;
}

export function isGregorianLeapYear(year) {
  const y = BigInt(year);
  return mod(y, 4n) === 0n && (mod(y, 100n) !== 0n || mod(y, 400n) === 0n);
}

export function isHebrewLeapYear(year) {
  return mod(7n * BigInt(year) + 1n, 19n) < 7n;
}

function hebrewDelay1(year) {
  const y = BigInt(year);
  const months = floorDiv(235n * y - 234n, 19n);
  const parts = 12_084n + 13_753n * months;
  let day = 29n * months + floorDiv(parts, 25_920n);
  if (mod(3n * (day + 1n), 7n) < 3n) day += 1n;
  return day;
}

function hebrewDelay2(year) {
  const last = hebrewDelay1(BigInt(year) - 1n);
  const present = hebrewDelay1(year);
  const next = hebrewDelay1(BigInt(year) + 1n);
  if (next - present === 356n) return 2n;
  if (present - last === 382n) return 1n;
  return 0n;
}

export function hebrewNewYearJdn(year) {
  return HEBREW_EPOCH_JDN + hebrewDelay1(year) + hebrewDelay2(year) + 2n;
}

export function daysInHebrewYear(year) {
  return Number(hebrewNewYearJdn(BigInt(year) + 1n) - hebrewNewYearJdn(year));
}

export function daysInHebrewMonth(year, month) {
  if (![1,2,3,4,5,6,7,8,9,10,11,12,13].includes(month)) throw new RangeError("invalid Hebrew month");
  if ([2, 4, 6, 10, 13].includes(month)) return 29;
  if (month === 12 && !isHebrewLeapYear(year)) return 29;
  const yearLength = daysInHebrewYear(year);
  if (month === 8 && yearLength % 10 !== 5) return 29;
  if (month === 9 && yearLength % 10 === 3) return 29;
  return 30;
}

export function hebrewToJdn({ year, month, day }) {
  const y = BigInt(year);
  const lastMonth = isHebrewLeapYear(y) ? 13 : 12;
  if (!Number.isInteger(month) || month < 1 || month > lastMonth) throw new RangeError("invalid Hebrew month");
  if (!Number.isInteger(day) || day < 1 || day > daysInHebrewMonth(y, month)) throw new RangeError("invalid Hebrew day");
  let result = hebrewNewYearJdn(y) + BigInt(day - 1);
  if (month < 7) {
    for (let cursor = 7; cursor <= lastMonth; cursor += 1) result += BigInt(daysInHebrewMonth(y, cursor));
    for (let cursor = 1; cursor < month; cursor += 1) result += BigInt(daysInHebrewMonth(y, cursor));
  } else {
    for (let cursor = 7; cursor < month; cursor += 1) result += BigInt(daysInHebrewMonth(y, cursor));
  }
  return result;
}

export function isIslamicCivilLeapYear(year) {
  return mod(11n * BigInt(year) + 14n, 30n) < 11n;
}

export function daysInIslamicCivilMonth(year, month) {
  if (month < 1 || month > 12) throw new RangeError("invalid Islamic month");
  if (month === 12) return isIslamicCivilLeapYear(year) ? 30 : 29;
  return month % 2 === 1 ? 30 : 29;
}

export function islamicCivilToJdn({ year, month, day }) {
  const y = BigInt(year);
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new RangeError("invalid Islamic month");
  if (!Number.isInteger(day) || day < 1 || day > daysInIslamicCivilMonth(y, month)) throw new RangeError("invalid Islamic day");
  return ISLAMIC_EPOCH_JDN
    + BigInt(day)
    + floorDiv(59n * BigInt(month - 1) + 1n, 2n)
    + 354n * (y - 1n)
    + floorDiv(3n + 11n * y, 30n);
}

export function sakaToJdn({ year, month, day }) {
  const y = BigInt(year);
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new RangeError("invalid Saka month");
  const gregorianYear = y + 78n;
  const leap = isGregorianLeapYear(gregorianYear);
  const chaitraLength = leap ? 31 : 30;
  const monthLength = month === 1 ? chaitraLength : month <= 6 ? 31 : 30;
  if (!Number.isInteger(day) || day < 1 || day > monthLength) throw new RangeError("invalid Saka day");
  const start = gregorianToJdn({ year: gregorianYear, month: 3, day: leap ? 21 : 22 });
  if (month === 1) return start + BigInt(day - 1);
  if (month <= 6) return start + BigInt(chaitraLength + (month - 2) * 31 + day - 1);
  return start + BigInt(chaitraLength + 5 * 31 + (month - 7) * 30 + day - 1);
}

export function isFixedThirteenLeapYear(year) {
  return mod(BigInt(year), 4n) === 3n;
}

function fixedThirteenMonthToJdn({ year, month, day }, epoch) {
  const y = BigInt(year);
  if (!Number.isInteger(month) || month < 1 || month > 13) throw new RangeError("invalid fixed-13 month");
  const monthLength = month <= 12 ? 30 : isFixedThirteenLeapYear(y) ? 6 : 5;
  if (!Number.isInteger(day) || day < 1 || day > monthLength) throw new RangeError("invalid fixed-13 day");
  return epoch - 1n + 365n * (y - 1n) + floorDiv(y, 4n) + 30n * BigInt(month - 1) + BigInt(day);
}

export function ethiopicToJdn(date) {
  return fixedThirteenMonthToJdn(date, ETHIOPIC_EPOCH_JDN);
}

export function copticToJdn(date) {
  return fixedThirteenMonthToJdn(date, COPTIC_EPOCH_JDN);
}

export function bahaiWesternYearStart(year) {
  return gregorianToJdn({ year: 1843n + BigInt(year), month: 3, day: 21 });
}

export function bahaiWesternToJdn({ year, month, day }) {
  const y = BigInt(year);
  const start = bahaiWesternYearStart(y);
  const nextStart = bahaiWesternYearStart(y + 1n);
  const intercalaryLength = Number(nextStart - start) - 19 * 19;
  let offset;
  let monthLength = 19;
  if (month === "ayyami-ha") {
    offset = 18 * 19;
    monthLength = intercalaryLength;
  } else {
    const numericMonth = typeof month === "number" ? month : Number(month);
    if (!Number.isInteger(numericMonth) || numericMonth < 1 || numericMonth > 19) throw new RangeError("invalid Bahai month");
    if (numericMonth === 19) offset = 18 * 19 + intercalaryLength;
    else offset = (numericMonth - 1) * 19;
  }
  if (!Number.isInteger(day) || day < 1 || day > monthLength) throw new RangeError("invalid Bahai day");
  return start + BigInt(offset + day - 1);
}

export const CALENDARS = Object.freeze({
  hebrew: Object.freeze({ toJdn: hebrewToJdn, start: (year) => hebrewToJdn({ year, month: 7, day: 1 }) }),
  "islamic-civil": Object.freeze({ toJdn: islamicCivilToJdn, start: (year) => islamicCivilToJdn({ year, month: 1, day: 1 }) }),
  saka: Object.freeze({ toJdn: sakaToJdn, start: (year) => sakaToJdn({ year, month: 1, day: 1 }) }),
  ethiopic: Object.freeze({ toJdn: ethiopicToJdn, start: (year) => ethiopicToJdn({ year, month: 1, day: 1 }) }),
  coptic: Object.freeze({ toJdn: copticToJdn, start: (year) => copticToJdn({ year, month: 1, day: 1 }) }),
  "bahai-western": Object.freeze({ toJdn: bahaiWesternToJdn, start: (year) => bahaiWesternToJdn({ year, month: 1, day: 1 }) }),
});

function findYear(calendarId, jdn) {
  const target = BigInt(jdn);
  const start = CALENDARS[calendarId].start;
  let lo = -100_000n;
  let hi = 100_000n;
  while (start(lo) > target) { hi = lo; lo *= 2n; }
  while (start(hi + 1n) <= target) { lo = hi; hi *= 2n; }
  while (lo < hi) {
    const mid = floorDiv(lo + hi + 1n, 2n);
    if (start(mid) <= target) lo = mid;
    else hi = mid - 1n;
  }
  return lo;
}

export function fromJdn(calendarId, jdn) {
  const target = BigInt(jdn);
  const year = findYear(calendarId, target);
  if (calendarId === "hebrew") {
    const order = isHebrewLeapYear(year) ? [7,8,9,10,11,12,13,1,2,3,4,5,6] : [7,8,9,10,11,12,1,2,3,4,5,6];
    for (const month of order) {
      const start = hebrewToJdn({ year, month, day: 1 });
      const length = daysInHebrewMonth(year, month);
      if (target >= start && target < start + BigInt(length)) return { year, month, day: Number(target - start + 1n) };
    }
  }
  if (calendarId === "islamic-civil") {
    for (let month = 1; month <= 12; month += 1) {
      const start = islamicCivilToJdn({ year, month, day: 1 });
      const length = daysInIslamicCivilMonth(year, month);
      if (target >= start && target < start + BigInt(length)) return { year, month, day: Number(target - start + 1n) };
    }
  }
  if (calendarId === "saka") {
    for (let month = 1; month <= 12; month += 1) {
      const start = sakaToJdn({ year, month, day: 1 });
      const next = month === 12 ? sakaToJdn({ year: year + 1n, month: 1, day: 1 }) : sakaToJdn({ year, month: month + 1, day: 1 });
      if (target >= start && target < next) return { year, month, day: Number(target - start + 1n) };
    }
  }
  if (calendarId === "ethiopic" || calendarId === "coptic") {
    const toJdn = calendarId === "ethiopic" ? ethiopicToJdn : copticToJdn;
    for (let month = 1; month <= 13; month += 1) {
      const start = toJdn({ year, month, day: 1 });
      const length = month <= 12 ? 30 : isFixedThirteenLeapYear(year) ? 6 : 5;
      if (target >= start && target < start + BigInt(length)) return { year, month, day: Number(target - start + 1n) };
    }
  }
  if (calendarId === "bahai-western") {
    for (let month = 1; month <= 19; month += 1) {
      const start = bahaiWesternToJdn({ year, month, day: 1 });
      const next = month === 18
        ? bahaiWesternToJdn({ year, month: "ayyami-ha", day: 1 })
        : month === 19
          ? bahaiWesternToJdn({ year: year + 1n, month: 1, day: 1 })
          : bahaiWesternToJdn({ year, month: month + 1, day: 1 });
      if (target >= start && target < next) return { year, month, day: Number(target - start + 1n) };
      if (month === 18) {
        const a = bahaiWesternToJdn({ year, month: "ayyami-ha", day: 1 });
        const b = bahaiWesternToJdn({ year, month: 19, day: 1 });
        if (target >= a && target < b) return { year, month: "ayyami-ha", day: Number(target - a + 1n) };
      }
    }
  }
  throw new RangeError(`could not invert ${calendarId} ${jdn}`);
}

export function normalizeDateForCompare(value) {
  return {
    ...value,
    year: BigInt(value.year),
  };
}
