import test from "node:test";
import assert from "node:assert/strict";
import { captureScreenshotWithSizeFallback } from "../scripts/screenshot-bounds.mjs";

const LIMIT_ERROR = new Error("page.screenshot: Protocol error (Page.screenshot): Cannot take screenshot larger than 32767");

test("Firefox full-page height limit retains a viewport screenshot and reports the fallback", async () => {
  const calls = [];
  const page = { async screenshot(options) {
    calls.push(options);
    if (options.fullPage) throw LIMIT_ERROR;
  } };
  let warnings = 0;
  const result = await captureScreenshotWithSizeFallback(page, { path: "rtl-hebrew.png", fullPage: true }, () => { warnings++; });
  assert.equal(result, "viewport-fallback");
  assert.deepEqual(calls, [
    { path: "rtl-hebrew.png", fullPage: true },
    { path: "rtl-hebrew.png", fullPage: false },
  ]);
  assert.equal(warnings, 1);
});

test("successful full-page screenshots are not downgraded", async () => {
  const calls = [];
  const page = { async screenshot(options) { calls.push(options); } };
  let warnings = 0;
  assert.equal(await captureScreenshotWithSizeFallback(page, { path: "ok.png", fullPage: true }, () => { warnings++; }), "requested");
  assert.deepEqual(calls, [{ path: "ok.png", fullPage: true }]);
  assert.equal(warnings, 0);
});

test("other screenshot protocol errors propagate", async () => {
  let calls = 0;
  const page = { async screenshot() { calls++; throw new Error("Target page, context or browser has been closed"); } };
  await assert.rejects(captureScreenshotWithSizeFallback(page, { fullPage: true }), /closed/);
  assert.equal(calls, 1);
});

test("an explicitly requested viewport screenshot never retries", async () => {
  let calls = 0;
  const page = { async screenshot() { calls++; throw LIMIT_ERROR; } };
  await assert.rejects(captureScreenshotWithSizeFallback(page, { fullPage: false }), /32767/);
  assert.equal(calls, 1);
});

test("a failed fallback remains a test failure", async () => {
  let calls = 0;
  const page = { async screenshot(options) {
    calls++;
    if (options.fullPage) throw LIMIT_ERROR;
    throw new Error("viewport capture failed");
  } };
  let warnings = 0;
  await assert.rejects(captureScreenshotWithSizeFallback(page, { fullPage: true }, () => { warnings++; }), /viewport capture failed/);
  assert.equal(calls, 2);
  assert.equal(warnings, 0);
});
