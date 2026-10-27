"use strict";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

// Exercise the actual UI class without starting the browser DOM.
const source = await readFile(new URL("../docs/reverse-ui.js", import.meta.url), "utf8");
const script = source
  .replace(/^import\s+[\s\S]*?\s+from\s+["'][^"']+["'];\s*/gm, "")
  .replace(/^export\s+function\s+/gm, "function ")
  + "\n;globalThis.ReverseSearchUiForTest = ReverseSearchUi;";
const context = {};
vm.runInNewContext(script, context, { filename: "reverse-ui.js", timeout: 5_000 });
const Ui = context.ReverseSearchUiForTest;

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function harness() {
  const calls = [], rendered = [], failures = [], progress = [], busy = [];
  let cancellations = 0;
  const ui = Object.create(Ui.prototype);
  ui.runSequence = 0;
  ui.lastRun = null;
  ui.visibleErrorMessage = null;
  ui.output = { hidden: true };
  ui.error = { hidden: true };
  ui.status = { textContent: "" };
  ui.progress = { textContent: "" };
  ui.solutions = { replaceChildren() {} };
  ui.rt = (key) => key;
  ui.setRunning = (running) => busy.push(running);
  ui.renderProgress = (value) => progress.push(value);
  ui.renderResult = (result) => rendered.push(result);
  ui.handleSearchError = (err) => failures.push(err);
  ui.controller = {
    solve(_problem, options) {
      const future = deferred();
      calls.push({ future, onProgress: options.onProgress });
      return future.promise;
    },
    cancel() { ++cancellations; return true; },
  };
  return { ui, calls, rendered, failures, progress, busy, get cancellations() { return cancellations; } };
}

test("superseded reverse search cannot overwrite a newer result or clear its busy state", async () => {
  const h = harness();
  const first = h.ui.run({ id: 1 }, {}, { kind: "basic" });
  const second = h.ui.run({ id: 2 }, {}, { kind: "advanced" });
  h.calls[0].onProgress({ scanned: 1n });
  h.calls[1].onProgress({ scanned: 2n });
  assert.deepEqual(h.progress.map((x) => x.scanned), [2n]);
  h.calls[0].future.resolve({ result: { id: "stale" } });
  await first;
  assert.equal(h.ui.lastRun, null);
  assert.equal(h.busy.at(-1), true);
  h.calls[1].future.resolve({ result: { id: "current" } });
  await second;
  assert.equal(h.ui.lastRun.result.id, "current");
  assert.deepEqual(h.rendered.map((x) => x.id), ["current"]);
  assert.equal(h.busy.at(-1), false);
  assert.equal(h.failures.length, 0);
});

test("cancelled reverse request does not show an obsolete failure or completion", async () => {
  const h = harness();
  const work = h.ui.run({}, {}, {});
  h.ui.cancel();
  assert.equal(h.ui.status.textContent, "reverse.status.cancelled");
  h.calls[0].future.reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
  await work;
  assert.equal(h.failures.length, 0);
  assert.equal(h.rendered.length, 0);
  assert.equal(h.busy.at(-1), false);
});

test("clear cancels work and keeps the result panel closed after late resolve", async () => {
  const h = harness();
  const work = h.ui.run({}, {}, {});
  h.ui.clearResults();
  assert.equal(h.cancellations, 1);
  assert.equal(h.ui.output.hidden, true);
  h.calls[0].future.resolve({ result: { id: "late" } });
  await work;
  assert.equal(h.ui.output.hidden, true);
  assert.equal(h.ui.lastRun, null);
  assert.equal(h.rendered.length, 0);
  assert.equal(h.busy.at(-1), false);
});
