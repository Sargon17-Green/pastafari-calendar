import assert from "node:assert/strict";
import test from "node:test";

import { gregorianToJdn } from "../docs/calendar-converters.js";
import { handlePastafariWorkerRequest } from "../docs/engine/pastafari-fast-worker.js";

test("year structure materializes a complete internally consistent Pastafari year", async () => {
  const calculationJdn = gregorianToJdn({ year: 2026n, month: 8, day: 14 });
  const structure = await handlePastafariWorkerRequest("getYearStructure", {
    targetJdn: calculationJdn,
    calculationJdn,
  });

  assert.equal(structure.year, "5000");
  assert.ok(structure.length >= 252 && structure.length <= 5778);
  assert.equal(structure.endJdn - structure.startJdn + 1n, BigInt(structure.length));
  assert.ok(structure.cutletCount >= 6 && structure.cutletCount <= 17);
  assert.equal(structure.cutlets.length, structure.cutletCount);
  assert.ok(structure.monthCount >= 3 && structure.monthCount <= 47);
  assert.equal(structure.months.length, structure.monthCount);
  assert.equal(structure.cutlets.reduce((sum, cutlet) => sum + cutlet.length, 0), structure.length);
  assert.equal(structure.months.reduce((sum, month) => sum + month.length, 0), structure.length);

  assert.equal(structure.cutlets[0].startJdn, structure.startJdn);
  assert.equal(structure.cutlets.at(-1).endJdn, structure.endJdn);
  assert.equal(structure.cutlets[0].startDayOfYear, 1);
  assert.equal(structure.cutlets.at(-1).endDayOfYear, structure.length);
  for (let index = 1; index < structure.cutlets.length; index += 1) {
    assert.equal(structure.cutlets[index - 1].endJdn + 1n, structure.cutlets[index].startJdn);
    assert.equal(structure.cutlets[index - 1].endDayOfYear + 1, structure.cutlets[index].startDayOfYear);
  }

  for (const month of structure.months) {
    assert.ok(month.length >= 4 && month.length <= 123);
    assert.ok(month.runCount >= 1 && month.runCount <= month.length);
    assert.ok(month.firstDayOfYear >= 1 && month.firstDayOfYear <= structure.length);
    assert.ok(month.lastDayOfYear >= month.firstDayOfYear && month.lastDayOfYear <= structure.length);
  }
});
