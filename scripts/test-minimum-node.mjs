import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import * as published from "../src/public-api.js";
import * as fast from "../browser/pastafari-calendar-fast.js";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

const engineRange = packageJson.engines?.node;
assert.equal(
  typeof engineRange,
  "string",
  "package.json must declare engines.node as a string.",
);

const lowerBoundMatch = /^\s*>=\s*(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?\s*$/.exec(
  engineRange,
);
assert.ok(
  lowerBoundMatch,
  `Unsupported engines.node form for the minimum-runtime smoke: ${JSON.stringify(engineRange)}. ` +
    "Update this smoke and the GitHub Actions node-version together if the declared range changes.",
);

const declaredMinimum = [
  lowerBoundMatch[1],
  lowerBoundMatch[2] ?? "0",
  lowerBoundMatch[3] ?? "0",
].join(".");

assert.equal(
  process.versions.node,
  declaredMinimum,
  `This smoke must run on the exact engines.node lower bound (${declaredMinimum}), ` +
    `but is running on ${process.versions.node}.`,
);

assert.equal(
  packageJson.main,
  "./src/public-api.js",
  "package.json main no longer points at src/public-api.js; update this smoke to the published entry point.",
);
assert.equal(
  packageJson.exports?.["."]?.import,
  "./src/public-api.js",
  "package exports no longer publish src/public-api.js; update this smoke to the published entry point.",
);

const selfPublished = await import(packageJson.name);
assert.equal(
  selfPublished.PastafariCalendar,
  published.PastafariCalendar,
  "Package self-import did not resolve to the same published PastafariCalendar entry point.",
);

const calendar = new published.PastafariCalendar();
assert.ok(
  calendar instanceof published.PastafariCalendar,
  "new PastafariCalendar() did not construct the published wrapper.",
);

const targetDate = new published.GregorianDate(2026n, 8, 6);
const calculationDate = new published.GregorianDate(2026n, 8, 6);
const converted = calendar.convert(targetDate, { calculationDate });

assert.ok(
  converted instanceof published.PastafariDate,
  "Published convert() did not return a PastafariDate.",
);

const convertedJson = converted.toJSON();
assert.match(convertedJson.year, /^-?\d+$/, "Pastafari year must serialize as an integer string.");
assert.ok(convertedJson.cutletName.length > 0, "Pastafari cutlet name must be non-empty.");
assert.ok(
  Number.isSafeInteger(convertedJson.dayInCutlet) && convertedJson.dayInCutlet > 0,
  "Pastafari dayInCutlet must be a positive safe integer.",
);
assert.ok(convertedJson.monthName.length > 0, "Pastafari month name must be non-empty.");
assert.ok(
  Number.isSafeInteger(convertedJson.dayInMonth) && convertedJson.dayInMonth > 0,
  "Pastafari dayInMonth must be a positive safe integer.",
);

assert.equal(
  fast.FAST_IMPLEMENTATION_INFO?.implementation,
  "fast",
  "Direct fast-engine import did not identify itself as the fast implementation.",
);

const fastGregorian = new fast.GregorianDate(2000n, 1, 1);
const fastJdn = fast.gregorianToJdn(fastGregorian);
assert.equal(
  fastJdn,
  2451545n,
  "Fast-engine Gregorian-to-JDN smoke returned the wrong JDN for 2000-01-01.",
);

console.log(`Node runtime: ${process.versions.node}`);
console.log(`Declared engines.node: ${engineRange} (minimum ${declaredMinimum})`);
console.log("Published entry: src/public-api.js (also verified via package self-import)");
console.log("Published construction: new PastafariCalendar() OK");
console.log(
  "Published runtime smoke: PastafariCalendar.convert(2026-08-06, calculationDate=2026-08-06) OK",
);
console.log(
  `Published result shape: year=${convertedJson.year}, cutlet=${convertedJson.cutletName}, ` +
    `dayInCutlet=${convertedJson.dayInCutlet}, month=${convertedJson.monthName}, ` +
    `dayInMonth=${convertedJson.dayInMonth}`,
);
console.log("Fast-engine import: browser/pastafari-calendar-fast.js OK");
console.log(`Fast-engine smoke: gregorianToJdn(2000-01-01) = ${fastJdn}`);
