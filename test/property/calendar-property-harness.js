import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn,
  gregorianToJdn,
  jdnToGregorian,
} from "../../docs/calendar-converters.js";
import {
  calendarMonthChoices,
  normalizeCalendarInputValues,
  parseHebrewNumeral,
} from "../../docs/calendar-input-conventions.js";

export const PROPERTY_GENERATOR_VERSION = "calendar-properties-v1";
export const DEFAULT_PROPERTY_SEED = "0x7061737461666172";
export const DEFAULT_SMOKE_CASES = 24;
export const DEFAULT_SOAK_CASES = 750;
export const DEFAULT_COUNTEREXAMPLE_PATH = "artifacts/property-tests/counterexample.json";

const MASK_64 = (1n << 64n) - 1n;
const UINT64_MOD = 1n << 64n;
const INTL_CALENDARS = new Set(["islamic-umalqura", "solar-hijri-official", "chinese"]);
const ERA_DATA = Object.freeze({
  meiji: Object.freeze({ start: [1868n, 10, 23], end: [1912n, 7, 29] }),
  taisho: Object.freeze({ start: [1912n, 7, 30], end: [1926n, 12, 24] }),
  showa: Object.freeze({ start: [1926n, 12, 25], end: [1989n, 1, 7] }),
  heisei: Object.freeze({ start: [1989n, 1, 8], end: [2019n, 4, 30] }),
  reiwa: Object.freeze({ start: [2019n, 5, 1], end: [2099n, 12, 31] }),
});

function mod(a, b) {
  const value = a % b;
  return value < 0n ? value + b : value;
}

function floorDiv(a, b) {
  let q = a / b;
  const r = a % b;
  if (r !== 0n && ((r > 0n) !== (b > 0n))) q -= 1n;
  return q;
}

function parseSeed(seed) {
  if (typeof seed === "bigint") return seed & MASK_64;
  const text = String(seed ?? DEFAULT_PROPERTY_SEED).trim();
  if (!/^(?:0x[0-9a-f]+|[0-9]+)$/iu.test(text)) {
    throw new RangeError(`Invalid property seed: ${text}`);
  }
  return BigInt(text) & MASK_64;
}

function fnv1a64(text) {
  let hash = 0xcbf29ce484222325n;
  for (const byte of Buffer.from(text, "utf8")) {
    hash ^= BigInt(byte);
    hash = (hash * 0x100000001b3n) & MASK_64;
  }
  return hash;
}

export class SplitMix64 {
  constructor(seed) {
    this.state = parseSeed(seed);
  }

  nextU64() {
    this.state = (this.state + 0x9e3779b97f4a7c15n) & MASK_64;
    let z = this.state;
    z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & MASK_64;
    z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & MASK_64;
    return (z ^ (z >> 31n)) & MASK_64;
  }

  int(minimum, maximum) {
    if (!Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum) || maximum < minimum) {
      throw new RangeError("SplitMix64.int requires an ordered safe-integer range.");
    }
    const width = BigInt(maximum - minimum + 1);
    return minimum + Number(this.nextU64() % width);
  }

  bigint(minimum, maximum) {
    minimum = BigInt(minimum);
    maximum = BigInt(maximum);
    if (maximum < minimum) throw new RangeError("SplitMix64.bigint requires an ordered range.");
    const width = maximum - minimum + 1n;
    if (width <= UINT64_MOD) return minimum + (this.nextU64() % width);
    const high = this.nextU64();
    const low = this.nextU64();
    return minimum + (((high << 64n) | low) % width);
  }

  pick(values) {
    return values[this.int(0, values.length - 1)];
  }

  bool() {
    return (this.nextU64() & 1n) === 1n;
  }
}

function childSeed(rootSeed, calendar, property) {
  return (parseSeed(rootSeed) ^ fnv1a64(`${PROPERTY_GENERATOR_VERSION}|${calendar}|${property}`)) & MASK_64;
}

function bigintReplacer(_key, value) {
  return typeof value === "bigint" ? `${value}n` : value;
}

function stableSerialize(value) {
  if (typeof value === "bigint") return `bi:${value}`;
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function displayError(error) {
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}

function isGregorianLeap(year) {
  year = BigInt(year);
  return mod(year, 4n) === 0n && (mod(year, 100n) !== 0n || mod(year, 400n) === 0n);
}

function isJulianLeap(year) {
  return mod(BigInt(year), 4n) === 0n;
}

function civilMonthLength(year, month, leapFn) {
  if (month === 2) return leapFn(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function nextCivilDate({ year, month, day }, leapFn) {
  const last = civilMonthLength(year, month, leapFn);
  if (day < last) return { year, month, day: day + 1 };
  if (month < 12) return { year, month: month + 1, day: 1 };
  return { year: year + 1n, month: 1, day: 1 };
}

function isHebrewLeap(year) {
  return mod(7n * BigInt(year) + 1n, 19n) < 7n;
}

function isIslamicCivilLeap(year) {
  return mod(11n * BigInt(year) + 14n, 30n) < 11n;
}

function fixedLeap13(year) {
  return mod(BigInt(year), 4n) === 3n;
}

function toValues(date) {
  const result = {};
  for (const [key, value] of Object.entries(date)) result[key] = typeof value === "bigint" ? value.toString() : String(value);
  return result;
}

function accepts(calendarId, values) {
  try {
    calendarDateToJdn(calendarId, values);
    return true;
  } catch (error) {
    if (error instanceof RangeError) return false;
    throw error;
  }
}

function expectRangeError(fn, message) {
  assert.throws(fn, RangeError, message);
}

function gregorianDateFromRandom(rng, wide = true) {
  const boundaries = [-4000n, -400n, -100n, -4n, -1n, 0n, 1n, 4n, 100n, 400n, 1582n, 1970n, 2000n, 2026n, 10_000n];
  const year = rng.int(0, 3) === 0
    ? rng.pick(boundaries)
    : rng.bigint(wide ? -2_000_000n : 1600n, wide ? 2_000_000n : 2400n);
  const month = rng.int(1, 12);
  const day = rng.int(1, civilMonthLength(year, month, isGregorianLeap));
  return { year, month, day };
}

function validCivilRandom(rng, leapFn, yearMin = -100_000n, yearMax = 100_000n) {
  const year = rng.bigint(yearMin, yearMax);
  const month = rng.int(1, 12);
  return { year, month, day: rng.int(1, civilMonthLength(year, month, leapFn)) };
}

function dateToUtcJdn({ year, month, day }) {
  const numericYear = Number(year);
  const value = new Date(0);
  value.setUTCHours(0, 0, 0, 0);
  value.setUTCFullYear(numericYear, month - 1, day);
  assert.ok(!Number.isNaN(value.getTime()), "ECMAScript Date unexpectedly rejected generated Gregorian date");
  return 2_440_588n + BigInt(Math.floor(value.getTime() / 86_400_000));
}

function assertJdnProjection(calendarId, values) {
  const jdn = calendarDateToJdn(calendarId, values);
  assert.equal(typeof jdn, "bigint");
  const civil = jdnToGregorian(jdn);
  assert.equal(gregorianToJdn(civil), jdn);
  assert.equal(calendarDateToJdn(calendarId, { ...values }), jdn, "conversion must be deterministic");
}

function commonInvalidCases(calendarId) {
  const definition = CALENDAR_DEFINITIONS.find(({ id }) => id === calendarId);
  if (!definition) return [];
  const base = Object.fromEntries(definition.fields.map((field) => {
    if (field.kind === "checkbox") return [field.name, false];
    if (field.kind === "select") return [field.name, field.options?.[0]?.value ?? "1"];
    return [field.name, field.defaultValue ?? "1"];
  }));
  const cases = [];
  for (const field of definition.fields) {
    if (field.kind === "integer") {
      cases.push({ ...base, [field.name]: "1e3" });
      cases.push({ ...base, [field.name]: "NaN" });
    }
  }
  const month = definition.fields.find(({ name }) => name === "month" && definition.id !== "bahai-tehran" && definition.id !== "bahai-western");
  if (month) cases.push({ ...base, month: "0" }, { ...base, month: String(Number(month.max ?? 12) + 1) });
  const day = definition.fields.find(({ name }) => name === "day");
  if (day) cases.push({ ...base, day: "0" });
  return cases;
}

function makeProperties() {
  const properties = [];
  const add = (calendar, property, config) => properties.push({ calendar, property, ...config });

  add("gregorian", "jdn-roundtrip", {
    boundaries: [
      { jdn: -9_223_372_036_854_775_808n }, { jdn: -1n }, { jdn: 0n }, { jdn: 1n },
      { jdn: 1_721_426n }, { jdn: 2_440_588n }, { jdn: 9_223_372_036_854_775_807n },
    ],
    generate: (rng) => ({ jdn: rng.bigint(-20_000_000_000_000_000_000n, 20_000_000_000_000_000_000n) }),
    check: ({ jdn }) => assert.equal(gregorianToJdn(jdnToGregorian(jdn)), jdn),
    shrinkField: "jdn",
  });

  add("gregorian", "date-roundtrip", {
    boundaries: [
      { year: -400n, month: 2, day: 29 }, { year: -1n, month: 12, day: 31 },
      { year: 0n, month: 2, day: 29 }, { year: 1n, month: 1, day: 1 },
      { year: 1582n, month: 10, day: 15 }, { year: 2000n, month: 2, day: 29 },
      { year: 10_000n, month: 12, day: 31 },
    ],
    generate: (rng) => gregorianDateFromRandom(rng),
    check: (date) => assert.deepEqual(jdnToGregorian(gregorianToJdn(date)), date),
  });

  add("gregorian", "month-year-boundary-continuity", {
    boundaries: [
      { year: -1n, month: 12, day: 31 }, { year: 0n, month: 2, day: 29 },
      { year: 1900n, month: 2, day: 28 }, { year: 2000n, month: 2, day: 29 },
      { year: 2100n, month: 2, day: 28 },
    ],
    generate: (rng) => gregorianDateFromRandom(rng),
    check: (date) => {
      const next = nextCivilDate(date, isGregorianLeap);
      assert.equal(gregorianToJdn(next) - gregorianToJdn(date), 1n);
    },
  });

  add("gregorian", "leap-rule", {
    boundaries: [-400n, -100n, -4n, -1n, 0n, 1n, 4n, 100n, 400n, 1900n, 2000n, 2100n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(-200_000n, 200_000n) }),
    check: ({ year }) => {
      const values = { year: String(year), month: "2", day: "29" };
      assert.equal(accepts("gregorian", values), isGregorianLeap(year));
    },
  });

  add("gregorian", "ecmascript-utc-cross-check", {
    boundaries: [
      { year: 1600n, month: 2, day: 29 }, { year: 1900n, month: 3, day: 1 },
      { year: 1970n, month: 1, day: 1 }, { year: 2000n, month: 2, day: 29 },
      { year: 2400n, month: 12, day: 31 },
    ],
    generate: (rng) => gregorianDateFromRandom(rng, false),
    check: (date) => assert.equal(gregorianToJdn(date), dateToUtcJdn(date)),
  });

  add("julian", "month-year-boundary-continuity", {
    boundaries: [
      { year: -1n, month: 12, day: 31 }, { year: 0n, month: 2, day: 29 },
      { year: 1900n, month: 2, day: 29 }, { year: 2000n, month: 2, day: 29 },
    ],
    generate: (rng) => validCivilRandom(rng, isJulianLeap),
    check: (date) => {
      const next = nextCivilDate(date, isJulianLeap);
      const current = calendarDateToJdn("julian", toValues(date));
      const following = calendarDateToJdn("julian", toValues(next));
      assert.equal(following - current, 1n);
      assertJdnProjection("julian", toValues(date));
    },
  });

  add("julian", "leap-rule", {
    boundaries: [-8n, -4n, -1n, 0n, 1n, 4n, 100n, 1900n, 2000n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(-200_000n, 200_000n) }),
    check: ({ year }) => assert.equal(
      accepts("julian", { year: String(year), month: "2", day: "29" }),
      isJulianLeap(year),
    ),
  });

  add("hebrew", "metonic-year-and-month-boundaries", {
    boundaries: [-20n, -1n, 0n, 1n, 2n, 3n, 19n, 5783n, 5784n, 5786n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(-5000n, 20_000n) }),
    check: ({ year }) => {
      const start = calendarDateToJdn("hebrew", { year: String(year), month: "7", day: "1" });
      const nextYear = calendarDateToJdn("hebrew", { year: String(year + 1n), month: "7", day: "1" });
      const length = Number(nextYear - start);
      assert.ok(isHebrewLeap(year) ? [383, 384, 385].includes(length) : [353, 354, 355].includes(length), `Hebrew year length ${length}`);
      assert.equal(accepts("hebrew", { year: String(year), month: "13", day: "1" }), isHebrewLeap(year));
      const lastMonth = isHebrewLeap(year) ? 13 : 12;
      const order = [...Array.from({ length: lastMonth - 6 }, (_, i) => i + 7), 1, 2, 3, 4, 5, 6];
      const starts = order.map((month) => calendarDateToJdn("hebrew", { year: String(year), month: String(month), day: "1" }));
      starts.push(nextYear);
      for (let i = 0; i < order.length; i += 1) {
        const monthLength = Number(starts[i + 1] - starts[i]);
        assert.ok(monthLength === 29 || monthLength === 30, `Hebrew month ${order[i]} length ${monthLength}`);
        assert.equal(calendarDateToJdn("hebrew", { year: String(year), month: String(order[i]), day: String(monthLength) }), starts[i + 1] - 1n);
        expectRangeError(() => calendarDateToJdn("hebrew", { year: String(year), month: String(order[i]), day: String(monthLength + 1) }));
      }
    },
  });

  add("islamic-civil", "tabular-cycle-and-month-boundaries", {
    boundaries: [-30n, -1n, 0n, 1n, 2n, 30n, 1448n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(-100_000n, 100_000n) }),
    check: ({ year }) => {
      const start = calendarDateToJdn("islamic-civil", { year: String(year), month: "1", day: "1" });
      const next = calendarDateToJdn("islamic-civil", { year: String(year + 1n), month: "1", day: "1" });
      assert.equal(Number(next - start), isIslamicCivilLeap(year) ? 355 : 354);
      for (let month = 1; month <= 12; month += 1) {
        const monthStart = calendarDateToJdn("islamic-civil", { year: String(year), month: String(month), day: "1" });
        const following = month === 12 ? next : calendarDateToJdn("islamic-civil", { year: String(year), month: String(month + 1), day: "1" });
        const expected = month === 12 ? (isIslamicCivilLeap(year) ? 30 : 29) : (month % 2 === 1 ? 30 : 29);
        assert.equal(Number(following - monthStart), expected);
      }
    },
  });

  add("solar-hijri-arithmetic", "month-year-boundaries", {
    boundaries: [-2820n, -2n, -1n, 1n, 2n, 474n, 1399n, 1400n, 1403n].map((year) => ({ year })),
    generate: (rng) => {
      let year;
      do year = rng.bigint(-50_000n, 50_000n); while (year === 0n);
      return { year };
    },
    check: ({ year }) => {
      assert.notEqual(year, 0n);
      const followingYear = year === -1n ? 1n : year + 1n;
      const start = calendarDateToJdn("solar-hijri-arithmetic", { year: String(year), month: "1", day: "1" });
      const next = calendarDateToJdn("solar-hijri-arithmetic", { year: String(followingYear), month: "1", day: "1" });
      assert.ok([365n, 366n].includes(next - start));
      for (let month = 1; month <= 12; month += 1) {
        const monthStart = calendarDateToJdn("solar-hijri-arithmetic", { year: String(year), month: String(month), day: "1" });
        const following = month === 12 ? next : calendarDateToJdn("solar-hijri-arithmetic", { year: String(year), month: String(month + 1), day: "1" });
        const length = Number(following - monthStart);
        assert.equal(length, month <= 6 ? 31 : month <= 11 ? 30 : Number(next - start) - 336);
        expectRangeError(() => calendarDateToJdn("solar-hijri-arithmetic", { year: String(year), month: String(month), day: String(length + 1) }));
      }
    },
  });

  add("solar-hijri-arithmetic", "year-zero-domain", {
    boundaries: [{ year: 0n }],
    generate: () => ({ year: 0n }),
    check: ({ year }) => expectRangeError(
      () => calendarDateToJdn("solar-hijri-arithmetic", { year: String(year), month: "1", day: "1" }),
      "Solar Hijri arithmetic uses historical numbering and has no year zero",
    ),
  });

  for (const calendar of ["coptic", "ethiopic"]) {
    add(calendar, "thirteen-month-boundaries", {
      boundaries: [-1n, 0n, 1n, 2n, 3n, 4n, 2016n].map((year) => ({ year })),
      generate: (rng) => ({ year: rng.bigint(-100_000n, 100_000n) }),
      check: ({ year }) => {
        const start = calendarDateToJdn(calendar, { year: String(year), month: "1", day: "1" });
        const next = calendarDateToJdn(calendar, { year: String(year + 1n), month: "1", day: "1" });
        assert.equal(Number(next - start), fixedLeap13(year) ? 366 : 365);
        for (let month = 1; month <= 12; month += 1) {
          const a = calendarDateToJdn(calendar, { year: String(year), month: String(month), day: "1" });
          const b = calendarDateToJdn(calendar, { year: String(year), month: String(month + 1), day: "1" });
          assert.equal(b - a, 30n);
        }
        const epagomenal = fixedLeap13(year) ? 6 : 5;
        assert.doesNotThrow(() => calendarDateToJdn(calendar, { year: String(year), month: "13", day: String(epagomenal) }));
        expectRangeError(() => calendarDateToJdn(calendar, { year: String(year), month: "13", day: String(epagomenal + 1) }));
      },
    });
  }

  add("saka", "year-and-month-boundaries", {
    boundaries: [-79n, -78n, -1n, 0n, 1n, 1946n, 1948n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(-100_000n, 100_000n) }),
    check: ({ year }) => {
      const gregorianYear = year + 78n;
      const chaitra = isGregorianLeap(gregorianYear) ? 31 : 30;
      const start = calendarDateToJdn("saka", { year: String(year), month: "1", day: "1" });
      const next = calendarDateToJdn("saka", { year: String(year + 1n), month: "1", day: "1" });
      assert.ok([365n, 366n].includes(next - start));
      for (let month = 1; month <= 12; month += 1) {
        const a = calendarDateToJdn("saka", { year: String(year), month: String(month), day: "1" });
        const b = month === 12 ? next : calendarDateToJdn("saka", { year: String(year), month: String(month + 1), day: "1" });
        const expected = month === 1 ? chaitra : month <= 6 ? 31 : 30;
        assert.equal(Number(b - a), expected);
      }
    },
  });

  for (const [calendar, offset] of [["thai-buddhist", -543n], ["minguo", 1911n]]) {
    add(calendar, "gregorian-offset-equivalence", {
      boundaries: [-1n, 0n, 1n, 543n, 1911n, 2569n].map((year) => ({ year, month: 3, day: 1 })),
      generate: (rng) => {
        const year = rng.bigint(-100_000n, 100_000n);
        const gregorianYear = year + offset;
        const month = rng.int(1, 12);
        return { year, month, day: rng.int(1, civilMonthLength(gregorianYear, month, isGregorianLeap)) };
      },
      check: (date) => {
        const expected = gregorianToJdn({ ...date, year: date.year + offset });
        assert.equal(calendarDateToJdn(calendar, toValues(date)), expected);
      },
    });
  }

  add("japanese-imperial", "era-boundary-and-gregorian-equivalence", {
    boundaries: Object.entries(ERA_DATA).flatMap(([era, metadata]) => [
      { era, gregorian: { year: metadata.start[0], month: metadata.start[1], day: metadata.start[2] } },
      { era, gregorian: { year: metadata.end[0], month: metadata.end[1], day: metadata.end[2] } },
    ]),
    generate: (rng) => {
      const era = rng.pick(Object.keys(ERA_DATA));
      const metadata = ERA_DATA[era];
      for (;;) {
        const year = rng.bigint(metadata.start[0], metadata.end[0]);
        const month = rng.int(1, 12);
        const day = rng.int(1, civilMonthLength(year, month, isGregorianLeap));
        const jdn = gregorianToJdn({ year, month, day });
        if (jdn >= gregorianToJdn({ year: metadata.start[0], month: metadata.start[1], day: metadata.start[2] })
          && jdn <= gregorianToJdn({ year: metadata.end[0], month: metadata.end[1], day: metadata.end[2] })) {
          return { era, gregorian: { year, month, day } };
        }
      }
    },
    check: ({ era, gregorian }) => {
      const year = gregorian.year - ERA_DATA[era].start[0] + 1n;
      assert.equal(
        calendarDateToJdn("japanese-imperial", { era, year: String(year), month: String(gregorian.month), day: String(gregorian.day) }),
        gregorianToJdn(gregorian),
      );
    },
  });

  add("maya-long-count", "mixed-radix-linearity-and-carries", {
    boundaries: [
      { baktun: -1n, katun: 19, tun: 19, uinal: 17, kin: 19, correlation: 584_283n },
      { baktun: 0n, katun: 0, tun: 0, uinal: 0, kin: 0, correlation: 584_283n },
      { baktun: 13n, katun: 0, tun: 13, uinal: 15, kin: 8, correlation: 584_283n },
    ],
    generate: (rng) => ({
      baktun: rng.bigint(-1_000_000n, 1_000_000n),
      katun: rng.int(0, 19), tun: rng.int(0, 19), uinal: rng.int(0, 17), kin: rng.int(0, 19),
      correlation: rng.bigint(-1_000_000n, 1_000_000n),
    }),
    check: (date) => {
      const expected = date.correlation + date.baktun * 144_000n + BigInt(date.katun) * 7_200n
        + BigInt(date.tun) * 360n + BigInt(date.uinal) * 20n + BigInt(date.kin);
      assert.equal(calendarDateToJdn("maya-long-count", toValues(date)), expected);
      if (date.kin < 19) {
        assert.equal(calendarDateToJdn("maya-long-count", toValues({ ...date, kin: date.kin + 1 })) - expected, 1n);
      }
    },
  });

  add("bahai-western", "new-year-and-intercalary-boundaries", {
    boundaries: [1n, 2n, 181n, 182n, 183n, 1157n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(1n, 100_000n) }),
    check: ({ year }) => {
      const start = calendarDateToJdn("bahai-western", { year: String(year), month: "1", day: "1" });
      assert.equal(start, gregorianToJdn({ year: 1843n + year, month: 3, day: 21 }));
      const next = calendarDateToJdn("bahai-western", { year: String(year + 1n), month: "1", day: "1" });
      const intercalary = Number(next - start) - 361;
      assert.ok(intercalary === 4 || intercalary === 5);
      assert.doesNotThrow(() => calendarDateToJdn("bahai-western", { year: String(year), month: "ayyami-ha", day: String(intercalary) }));
      expectRangeError(() => calendarDateToJdn("bahai-western", { year: String(year), month: "ayyami-ha", day: String(intercalary + 1) }));
      assert.equal(calendarDateToJdn("bahai-western", { year: String(year), month: "19", day: "1" }), start + BigInt(342 + intercalary));
    },
  });

  add("bahai-tehran", "supported-range-and-year-continuity", {
    boundaries: [1n, 18n, 84n, 150n, 183n, 542n, 575n, 641n, 740n, 1156n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(1n, 1156n) }),
    check: ({ year }) => {
      const start = calendarDateToJdn("bahai-tehran", { year: String(year), month: "1", day: "1" });
      assertJdnProjection("bahai-tehran", { year: String(year), month: "1", day: "1" });
      if (year < 1156n) {
        const next = calendarDateToJdn("bahai-tehran", { year: String(year + 1n), month: "1", day: "1" });
        assert.ok([365n, 366n].includes(next - start));
      }
      expectRangeError(() => calendarDateToJdn("bahai-tehran", { year: "1157", month: "1", day: "1" }));
    },
  });

  add("hindu-old-solar", "adjacent-day-monotonicity", {
    boundaries: [0n, 1n, 5127n].map((year) => ({ year, month: 1, day: 1 })),
    generate: (rng) => ({ year: rng.bigint(-100_000n, 100_000n), month: rng.int(1, 12), day: rng.int(1, 30) }),
    check: (date) => {
      const a = calendarDateToJdn("hindu-old-solar", toValues(date));
      const b = calendarDateToJdn("hindu-old-solar", toValues({ ...date, day: date.day + 1 }));
      assert.equal(b - a, 1n);
      assertJdnProjection("hindu-old-solar", toValues(date));
    },
  });

  add("hindu-old-lunar", "tithi-monotonicity-and-leap-month-uniqueness", {
    boundaries: [5126n, 5127n].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.bigint(-20_000n, 20_000n) }),
    check: ({ year }) => {
      const month = 1;
      const a = calendarDateToJdn("hindu-old-lunar", { year: String(year), month: String(month), day: "1", leapMonth: false });
      const b = calendarDateToJdn("hindu-old-lunar", { year: String(year), month: String(month), day: "2", leapMonth: false });
      assert.ok(b - a === 0n || b - a === 1n);
      const leapMonths = [];
      for (let candidate = 1; candidate <= 12; candidate += 1) {
        if (accepts("hindu-old-lunar", { year: String(year), month: String(candidate), day: "1", leapMonth: true })) leapMonths.push(candidate);
      }
      assert.ok(leapMonths.length <= 1, `multiple Old Hindu Lunar leap months: ${leapMonths.join(",")}`);
    },
  });

  for (const [calendar, yearMin, yearMax] of [
    ["islamic-umalqura", 1350, 1500],
    ["solar-hijri-official", 1300, 1500],
  ]) {
    add(calendar, "intl-supported-date-determinism", {
      intl: true,
      boundaries: calendar === "islamic-umalqura"
        ? [{ year: 1448, month: 3, day: 1 }]
        : [{ year: 1405, month: 6, day: 1 }],
      generate: (rng) => ({ year: rng.int(yearMin, yearMax), month: rng.int(1, 12), day: 1 }),
      check: (date) => {
        const values = toValues(date);
        assertJdnProjection(calendar, values);
        const next = calendarDateToJdn(calendar, { ...values, day: "2" });
        assert.equal(next - calendarDateToJdn(calendar, values), 1n);
      },
    });
  }

  add("chinese", "intl-related-year-determinism", {
    intl: true,
    boundaries: [{ relatedYear: 2024, month: 1, day: 1 }, { relatedYear: 2026, month: 7, day: 1 }],
    generate: (rng) => ({ relatedYear: rng.int(1950, 2100), month: rng.int(1, 12), day: 1 }),
    check: (date) => {
      const values = { ...toValues(date), leapMonth: false };
      assertJdnProjection("chinese", values);
    },
  });

  add("input", "hebrew-numeral-unicode-and-whitespace", {
    boundaries: [
      { text: "א׳", expected: 1n, year: false }, { text: "י״ד", expected: 14n, year: false },
      { text: "ט״ו", expected: 15n, year: false }, { text: "תשפ״ו", expected: 5786n, year: true },
      { text: "ה׳תשפ״ו", expected: 5786n, year: true }, { text: "5786", expected: 5786n, year: true },
    ],
    generate: (rng) => {
      const samples = [
        ["א", 1n, false], ["י\u05b4ד", 14n, false], ["ל", 30n, false],
        ["תשפו", 5786n, true], ["ה׳תשפו", 5786n, true], [" 5786 ", 5786n, true],
      ];
      const [text, expected, year] = rng.pick(samples);
      return { text: rng.bool() ? ` \t${text}\n ` : text, expected, year };
    },
    check: ({ text, expected, year }) => assert.equal(parseHebrewNumeral(text, { year }), expected),
  });

  add("input", "japanese-gannen-normalization", {
    boundaries: ["元", "元年"].map((year) => ({ year })),
    generate: (rng) => ({ year: rng.pick(["元", "元年", " 元 ", " 元年 "]) }),
    check: ({ year }) => {
      const normalized = normalizeCalendarInputValues("japanese-imperial", { era: "reiwa", year, month: "5", day: "1" });
      assert.equal(normalized.year, "1");
      assert.equal(calendarDateToJdn("japanese-imperial", normalized), gregorianToJdn({ year: 2019n, month: 5, day: 1 }));
    },
  });

  add("input", "month-choice-cache-order-independence", {
    boundaries: CALENDAR_DEFINITIONS.filter((definition) => definition.fields.some(({ name }) => name === "month") && definition.id !== "maya-long-count")
      .map((definition) => ({ calendarId: definition.id })),
    generate: (rng) => ({ calendarId: rng.pick(CALENDAR_DEFINITIONS.filter((definition) => definition.fields.some(({ name }) => name === "month") && definition.id !== "maya-long-count").map(({ id }) => id)) }),
    check: ({ calendarId }) => {
      const definition = CALENDAR_DEFINITIONS.find(({ id }) => id === calendarId);
      const field = definition.fields.find(({ name }) => name === "month");
      const before = calendarMonthChoices(calendarId, field, "en");
      calendarMonthChoices("gregorian", CALENDAR_DEFINITIONS[0].fields.find(({ name }) => name === "month"), "he-IL");
      const after = calendarMonthChoices(calendarId, field, "en");
      assert.deepEqual(after, before);
      assert.ok(after === null || (Array.isArray(after) && after.every(({ value, label }) => value && label)));
    },
  });

  add("input", "malformed-inputs-reject-without-non-range-crashes", {
    boundaries: CALENDAR_DEFINITIONS.flatMap(({ id }) => commonInvalidCases(id).slice(0, 2).map((values) => ({ calendarId: id, values }))),
    generate: (rng) => {
      const definition = rng.pick(CALENDAR_DEFINITIONS);
      const cases = commonInvalidCases(definition.id);
      return { calendarId: definition.id, values: rng.pick(cases) };
    },
    check: ({ calendarId, values }) => expectRangeError(() => calendarDateToJdn(calendarId, values), `${calendarId} should reject malformed input`),
  });

  add("input", "conversion-order-independence", {
    boundaries: [
      { calendarId: "gregorian", values: { year: "2026", month: "8", day: "13" } },
      { calendarId: "hebrew", values: { year: "5786", month: "5", day: "30" } },
      { calendarId: "maya-long-count", values: { baktun: "13", katun: "0", tun: "13", uinal: "15", kin: "8", correlation: "584283" } },
    ],
    generate: (rng) => rng.pick([
      { calendarId: "gregorian", values: toValues(gregorianDateFromRandom(rng)) },
      { calendarId: "islamic-civil", values: { year: String(rng.bigint(-1000n, 3000n)), month: String(rng.int(1, 12)), day: "1" } },
      { calendarId: "coptic", values: { year: String(rng.bigint(-1000n, 3000n)), month: String(rng.int(1, 13)), day: "1" } },
    ]),
    check: ({ calendarId, values }) => {
      const first = calendarDateToJdn(calendarId, values);
      calendarDateToJdn("gregorian", { year: "1970", month: "1", day: "1" });
      calendarDateToJdn("maya-long-count", { baktun: "13", katun: "0", tun: "0", uinal: "0", kin: "0", correlation: "584283" });
      assert.equal(calendarDateToJdn(calendarId, values), first);
    },
  });

  return properties;
}

const PROPERTY_DEFINITIONS = makeProperties();

function numericShrinkCandidates(value) {
  value = BigInt(value);
  const candidates = [0n, value < 0n ? -1n : 1n, value / 2n];
  let cursor = value;
  for (let i = 0; i < 10 && cursor !== 0n; i += 1) {
    cursor /= 2n;
    candidates.push(cursor);
  }
  return [...new Set(candidates.filter((candidate) => candidate !== value))];
}

function tryCheck(property, input) {
  try {
    property.check(input);
    return false;
  } catch {
    return true;
  }
}

function shrinkCounterexample(property, input) {
  if (!property.shrinkField || !(property.shrinkField in input)) return input;
  let best = { ...input };
  for (const candidate of numericShrinkCandidates(best[property.shrinkField])) {
    const next = { ...best, [property.shrinkField]: candidate };
    if (tryCheck(property, next)) best = next;
  }
  return best;
}

function parseRegressionJson(text, source) {
  const parsed = JSON.parse(text, (_key, value) => (
    typeof value === "string" && /^-?\d+n$/u.test(value) ? BigInt(value.slice(0, -1)) : value
  ));
  const entries = Array.isArray(parsed) ? parsed : [parsed];
  if (entries.some((entry) => !entry || typeof entry !== "object" || Array.isArray(entry))) {
    throw new TypeError(`regression corpus entry must be an object: ${source}`);
  }
  return entries;
}

async function loadRegressionCorpus(path) {
  try {
    const names = (await readdir(path, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => entry.name)
      .sort();
    const entries = [];
    for (const name of names) {
      const source = `${path}/${name}`;
      entries.push(...parseRegressionJson(await readFile(source, "utf8"), source));
    }
    return entries;
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function writeCounterexample(path, payload) {
  if (!path) return;
  const absolute = resolve(path);
  await mkdir(dirname(absolute), { recursive: true });
  await writeFile(absolute, `${JSON.stringify(payload, bigintReplacer, 2)}\n`, "utf8");
}

function reproductionCommand({ seed, calendar, property, caseLabel, mode, cases }) {
  return `node scripts/run-calendar-property-soak.mjs --mode ${mode} --seed ${seed} --cases ${cases} --calendar ${calendar} --property ${property} --case ${caseLabel}`;
}

function parseCaseFilter(value) {
  if (value === undefined || value === null || value === "") return null;
  const match = String(value).match(/^([br]):(\d+)$/u);
  if (!match) throw new RangeError("--case must be b:N or r:N");
  return { kind: match[1] === "b" ? "boundary" : "random", index: Number(match[2]) };
}

export async function runPropertySuite({
  seed = DEFAULT_PROPERTY_SEED,
  mode = "smoke",
  cases = mode === "soak" ? DEFAULT_SOAK_CASES : DEFAULT_SMOKE_CASES,
  calendar = null,
  property = null,
  caseFilter = null,
  counterexamplePath = DEFAULT_COUNTEREXAMPLE_PATH,
  regressionPath = "test/property/regressions",
} = {}) {
  if (!Number.isSafeInteger(cases) || cases < 1 || cases > 1_000_000) throw new RangeError("cases must be 1..1000000");
  if (!new Set(["smoke", "soak"]).has(mode)) throw new RangeError("mode must be smoke or soak");
  const rootSeed = `0x${parseSeed(seed).toString(16).padStart(16, "0")}`;
  const selectedCase = typeof caseFilter === "string" ? parseCaseFilter(caseFilter) : caseFilter;
  const checksum = createHash("sha256");
  const started = Date.now();
  const report = {
    generatorVersion: PROPERTY_GENERATOR_VERSION,
    seed: rootSeed,
    mode,
    requestedRandomCasesPerProperty: cases,
    totals: { properties: 0, boundary: 0, random: 0, regressions: 0, passed: 0, failed: 0 },
    groups: [],
    checksum: null,
    elapsedMs: null,
  };

  const definitions = PROPERTY_DEFINITIONS.filter((entry) => (!calendar || entry.calendar === calendar) && (!property || entry.property === property));
  if (definitions.length === 0) throw new RangeError(`No property matched calendar=${calendar ?? "*"} property=${property ?? "*"}`);

  const corpus = await loadRegressionCorpus(regressionPath);
  for (const entry of corpus) {
    const definition = PROPERTY_DEFINITIONS.find((item) => item.calendar === entry.calendar && item.property === entry.property);
    if (!definition) throw new RangeError(`Unknown regression property ${entry.calendar}/${entry.property}`);
    if (calendar && entry.calendar !== calendar) continue;
    if (property && entry.property !== property) continue;
    const input = entry.input;
    checksum.update(`regression|${entry.calendar}|${entry.property}|${stableSerialize(input)}\n`);
    definition.check(input);
    report.totals.regressions += 1;
    report.totals.passed += 1;
  }

  for (const definition of definitions) {
    report.totals.properties += 1;
    const group = { calendar: definition.calendar, property: definition.property, boundary: 0, random: 0, passed: 0, failed: 0 };
    report.groups.push(group);
    const rng = new SplitMix64(childSeed(rootSeed, definition.calendar, definition.property));
    const randomLimit = definition.intl ? Math.min(cases, mode === "smoke" ? 4 : 100) : cases;
    const allCases = [];
    definition.boundaries.forEach((input, index) => allCases.push({ kind: "boundary", index, input }));
    for (let index = 0; index < randomLimit; index += 1) allCases.push({ kind: "random", index, input: definition.generate(rng, index) });

    for (const item of allCases) {
      if (selectedCase && (item.kind !== selectedCase.kind || item.index !== selectedCase.index)) continue;
      const caseLabel = `${item.kind === "boundary" ? "b" : "r"}:${item.index}`;
      checksum.update(`${definition.calendar}|${definition.property}|${caseLabel}|${stableSerialize(item.input)}\n`);
      if (item.kind === "boundary") {
        group.boundary += 1;
        report.totals.boundary += 1;
      } else {
        group.random += 1;
        report.totals.random += 1;
      }
      try {
        definition.check(item.input);
        group.passed += 1;
        report.totals.passed += 1;
      } catch (error) {
        group.failed += 1;
        report.totals.failed += 1;
        const shrunk = shrinkCounterexample(definition, item.input);
        const reproduce = reproductionCommand({ seed: rootSeed, calendar: definition.calendar, property: definition.property, caseLabel, mode, cases });
        const failure = {
          generatorVersion: PROPERTY_GENERATOR_VERSION,
          seed: rootSeed,
          mode,
          calendar: definition.calendar,
          property: definition.property,
          case: caseLabel,
          input: item.input,
          shrunkInput: shrunk,
          error: displayError(error),
          reproduce,
        };
        await writeCounterexample(counterexamplePath, failure);
        const wrapped = new Error(`Property failure ${definition.calendar}/${definition.property} ${caseLabel}: ${displayError(error)}\nReproduce: ${reproduce}`, { cause: error });
        wrapped.counterexample = failure;
        wrapped.partialReport = report;
        throw wrapped;
      }
    }
  }

  report.checksum = checksum.digest("hex");
  report.elapsedMs = Date.now() - started;
  return report;
}

export function formatPropertyReport(report) {
  const lines = [
    `calendar-property generator=${report.generatorVersion} seed=${report.seed} mode=${report.mode}`,
    `checksum=${report.checksum} elapsedMs=${report.elapsedMs}`,
    `totals properties=${report.totals.properties} boundary=${report.totals.boundary} random=${report.totals.random} regressions=${report.totals.regressions} passed=${report.totals.passed} failed=${report.totals.failed}`,
  ];
  for (const group of report.groups) {
    lines.push(`${group.calendar}/${group.property}: boundary=${group.boundary} random=${group.random} passed=${group.passed} failed=${group.failed}`);
  }
  return lines.join("\n");
}
