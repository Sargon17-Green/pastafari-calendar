"use strict";

// Update 9 deliberately keeps the sealed authoritative calendar unchanged.
// This adapter is a crooked side door: the legacy converter still sees normal
// positive-year traffic, while non-positive years that the Scroll itself uses
// are smuggled through the already-existing browser calendar-input converter.
// The old validators remain in place behind this wrapper.
import { calendarDateToJdn as browserInputCalendarDateToJdn } from "../docs/calendar-converters.js";

const DETOUR_MARKER = Symbol.for("pastafari.update9.proleptic-negative-year-shadow");

function yearOf(date) {
  const year = date?.year;
  if (typeof year === "bigint") return year;
  if (typeof year === "number" && Number.isSafeInteger(year)) return BigInt(year);
  if (typeof year === "string" && /^[+-]?\d+$/u.test(year.trim())) return BigInt(year.trim());
  return null;
}

function dateIsInstanceOf(date, Constructor) {
  return typeof Constructor === "function" && date instanceof Constructor;
}

function commonValues(date) {
  const year = yearOf(date);
  return {
    year: year?.toString(),
    month: String(date?.month),
    day: String(date?.day),
  };
}

function bahaiValues(date) {
  const year = yearOf(date);
  return {
    year: year?.toString(),
    month: String(date?.month),
    day: String(date?.day),
  };
}

function routeFor(date, classes) {
  const year = yearOf(date);
  if (year === null || year > 0n) return null;

  if (dateIsInstanceOf(date, classes.HebrewDate)) {
    return { calendarId: "hebrew", values: commonValues(date), label: "hebrew" };
  }
  if (dateIsInstanceOf(date, classes.IslamicCivilDate)) {
    return { calendarId: "islamic-civil", values: commonValues(date), label: "islamic-civil" };
  }
  if (dateIsInstanceOf(date, classes.SakaDate)) {
    return { calendarId: "saka", values: commonValues(date), label: "saka" };
  }
  if (dateIsInstanceOf(date, classes.EthiopicDate)) {
    return { calendarId: "ethiopic", values: commonValues(date), label: "ethiopic" };
  }
  if (dateIsInstanceOf(date, classes.CopticDate)) {
    return { calendarId: "coptic", values: commonValues(date), label: "coptic" };
  }
  if (dateIsInstanceOf(date, classes.BahaiDate) && date?.variant === "western-arithmetic") {
    return { calendarId: "bahai-western", values: bahaiValues(date), label: "bahai-western" };
  }
  return null;
}

function detouredJdn(date, classes) {
  const route = routeFor(date, classes);
  if (!route) return null;

  const shadowInput = {
    ...route.values,
    [DETOUR_MARKER]: Object.freeze({ originalYear: yearOf(date).toString(), route: route.label }),
  };
  return browserInputCalendarDateToJdn(route.calendarId, shadowInput);
}

function wrapOne(rawFunction, classes, allowed) {
  return function prolepticNegativeYearDetour(date) {
    const route = routeFor(date, classes);
    if (route && allowed.has(route.label)) return detouredJdn(date, classes);
    return rawFunction(date);
  };
}

export function createProlepticNegativeYearDetours(rawFunctions, classes) {
  return Object.freeze({
    calendarDateToJdn: wrapOne(rawFunctions.calendarDateToJdn, classes, new Set([
      "hebrew",
      "islamic-civil",
      "saka",
      "ethiopic",
      "coptic",
      "bahai-western",
    ])),
    hebrewToJdn: wrapOne(rawFunctions.hebrewToJdn, classes, new Set(["hebrew"])),
    islamicCivilToJdn: wrapOne(rawFunctions.islamicCivilToJdn, classes, new Set(["islamic-civil"])),
    islamicToJdn: wrapOne(rawFunctions.islamicToJdn, classes, new Set(["islamic-civil"])),
    sakaToJdn: wrapOne(rawFunctions.sakaToJdn, classes, new Set(["saka"])),
    ethiopicToJdn: wrapOne(rawFunctions.ethiopicToJdn, classes, new Set(["ethiopic"])),
    copticToJdn: wrapOne(rawFunctions.copticToJdn, classes, new Set(["coptic"])),
    bahaiToJdn: wrapOne(rawFunctions.bahaiToJdn, classes, new Set(["bahai-western"])),
  });
}
