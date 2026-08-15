"use strict";

import assert from "node:assert/strict";
import test from "node:test";

import { gregorianToJdn } from "../docs/calendar-converters.js";
import {
  KISURRA_OBSERVER,
  requestObserverLocation,
  resolveObserverLocation,
} from "../docs/observer-location.js";
import {
  DAY_BOUNDARY_MODEL_VERSION,
  FOUNDATION_JDN,
  FOUNDATION_LINEAR_DAY,
  boundaryForDayJdn,
  currentDayAt,
} from "../docs/venus-day-boundary.js";

test("Day of Foundation is the sole numbering anchor", () => {
  assert.equal(
    gregorianToJdn({ year: -41_221n, month: 12, day: 22 }),
    FOUNDATION_JDN,
  );
  assert.equal(FOUNDATION_JDN - 1_721_425n, FOUNDATION_LINEAR_DAY);
});

test("Kisurra boundaries are consecutive and the day changes exactly at the Venus boundary", () => {
  const day = 2_461_268n; // 2026-08-15 Gregorian label on the existing JDN axis.
  const boundary = boundaryForDayJdn(day, KISURRA_OBSERVER);
  const next = boundaryForDayJdn(day + 1n, KISURRA_OBSERVER);
  const hours = (next.instant.getTime() - boundary.instant.getTime()) / 3_600_000;
  assert.ok(hours > 22 && hours < 26, `unexpected boundary spacing: ${hours} h`);

  const before = currentDayAt(new Date(boundary.instant.getTime() - 1_000), KISURRA_OBSERVER);
  const after = currentDayAt(new Date(boundary.instant.getTime() + 1_000), KISURRA_OBSERVER);
  assert.equal(before.jdn, day - 1n);
  assert.equal(after.jdn, day);
  assert.equal(after.modelVersion, DAY_BOUNDARY_MODEL_VERSION);
});

test("observer coordinates affect the astronomical boundary", () => {
  const day = 2_461_268n;
  const kisurra = boundaryForDayJdn(day, KISURRA_OBSERVER).instant.getTime();
  const jerusalem = boundaryForDayJdn(day, {
    latitude: 31.778,
    longitude: 35.235,
    elevationM: 750,
  }).instant.getTime();
  assert.ok(Math.abs(kisurra - jerusalem) > 10 * 60 * 1000, "longitude should materially change the boundary");
});


test("astronomical boundaries stay ordered across the supported model range", () => {
  const observers = [
    KISURRA_OBSERVER,
    { latitude: 0, longitude: 0, elevationM: 0 },
    { latitude: 69.65, longitude: 18.96, elevationM: 0 },
    { latitude: -54.8, longitude: -68.3, elevationM: 0 },
  ];
  const years = [-2990, -2000, -1000, 1, 1000, 2000, 2026, 2990];
  for (const observer of observers) {
    for (const year of years) {
      const day = gregorianToJdn({ year: BigInt(year), month: 6, day: 15 });
      const first = boundaryForDayJdn(day, observer);
      const second = boundaryForDayJdn(day + 1n, observer);
      const spacingHours = (second.jd - first.jd) * 24;
      assert.ok(spacingHours > 22 && spacingHours < 26, `${year}: unexpected spacing ${spacingHours} h`);
      assert.ok(second.jd > first.jd, `${year}: boundaries must be strictly increasing`);
    }
  }
});

test("Kisurra boundaries remain one-per-day across a dense contemporary interval", () => {
  let day = gregorianToJdn({ year: 2025n, month: 1, day: 1 });
  let previous = boundaryForDayJdn(day, KISURRA_OBSERVER);
  for (let offset = 1; offset <= 800; offset += 1) {
    const current = boundaryForDayJdn(day + BigInt(offset), KISURRA_OBSERVER);
    const spacingHours = (current.jd - previous.jd) * 24;
    assert.ok(spacingHours > 22 && spacingHours < 26, `offset ${offset}: unexpected spacing ${spacingHours} h`);
    assert.ok(current.jd > previous.jd, `offset ${offset}: duplicate or reversed boundary`);
    previous = current;
  }
});

test("location resolver never prompts: non-granted permission falls back to Kisurra", async () => {
  let geolocationCalls = 0;
  const navigatorObject = {
    permissions: { query: async () => ({ state: "prompt" }) },
    geolocation: {
      getCurrentPosition() { geolocationCalls += 1; },
    },
  };
  const observer = await resolveObserverLocation({ navigatorObject });
  assert.equal(observer.assumed, true);
  assert.equal(observer.source, "kisurra");
  assert.equal(geolocationCalls, 0, "opening the site must not trigger a location prompt");
});

test("location resolver uses a valid device position when permission is already granted", async () => {
  const navigatorObject = {
    permissions: { query: async () => ({ state: "granted" }) },
    geolocation: {
      getCurrentPosition(success) {
        success({ coords: { latitude: 32.08, longitude: 34.78, altitude: 12, accuracy: 25 } });
      },
    },
  };
  const observer = await resolveObserverLocation({ navigatorObject });
  assert.equal(observer.assumed, false);
  assert.equal(observer.source, "device");
  assert.equal(observer.latitude, 32.08);
  assert.equal(observer.longitude, 34.78);
  assert.equal(observer.elevationM, 12);
});


test("explicit device-location request may call geolocation without changing the automatic no-prompt rule", async () => {
  let geolocationCalls = 0;
  const navigatorObject = {
    geolocation: {
      getCurrentPosition(success) {
        geolocationCalls += 1;
        success({ coords: { latitude: 31.77, longitude: 35.21, altitude: null, accuracy: 50 } });
      },
    },
  };
  const observer = await requestObserverLocation({ navigatorObject });
  assert.equal(geolocationCalls, 1);
  assert.equal(observer.assumed, false);
  assert.equal(observer.latitude, 31.77);
  assert.equal(observer.longitude, 35.21);
});
