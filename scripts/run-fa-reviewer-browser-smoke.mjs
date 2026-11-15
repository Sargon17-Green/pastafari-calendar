// One-shot browser QA for the unpublished, self-contained Persian/Hebrew reviewer.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));
const html = path.resolve(here, "../verification/fa-release/offline-reviewer.html");
const expectedSource = "55c0f8a33114a7c6858a024cf5b75ca0cff89242";
const browser = await chromium.launch({ headless: true });
const errors = [], networkRequests = [];
let page;
try {
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1180, height: 840 },
    locale: "fa-IR",
  });
  page = await context.newPage();
  page.on("pageerror", e => errors.push(String(e)));
  page.on("request", req => {
    if (/^https?:/.test(req.url())) networkRequests.push(req.url());
  });
  await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
  await page.locator("#heading").waitFor();
  assert.match(await page.locator("#heading").textContent(), /^A01/);
  assert.match(await page.locator("#sha").textContent(), /^[a-f0-9]{40}$/);
  assert.equal(await page.locator("#sha").textContent(), expectedSource);
  assert.equal(await page.locator(".navitem").count(), 16);
  assert.match(await page.locator("#he-text").textContent(), /לוח השנה/);
  assert.match(await page.locator("#fa-text").textContent(), /تقویم/);

  // Exercise all four groups, source links, and a targeted N3 correction.
  await page.getByRole("button", { name: /نام‌های کانونی/ }).press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "heading", "group keyboard navigation should focus heading");
  assert.equal(await page.locator(".navitem").count(), 64);
  await page.locator(".navitem").filter({ hasText: "B55" }).press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "heading", "selected unit should focus its heading");
  assert.match(await page.locator("#fa-text").textContent(), /پستانداری اهلی/);
  assert.match(await page.locator("#he-text").textContent(), /היונק המבוית/);
  assert.match(await page.locator("#he-link").getAttribute("href"), /\/docs\/about\/content\/he.html#L/);
  assert.match(await page.locator("#fa-link").getAttribute("href"), /\/docs\/about\/content\/fa.html#L/);
  await page.locator("#note").fill("Reviewer test: verify source-fidelity scope.");
  await page.locator("#replacement").fill("پیشنهادِ ویرایشیِ آزمایشی.");
  await page.getByRole("button", { name: "نیازمند اصلاح" }).press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), "نیازمند اصلاح", "status button must retain focus after re-render");
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-pressed")), "true");
  assert.equal(await page.locator(".navitem").filter({ hasText: "B55" }).getAttribute("data-status"), "changes");
  assert.match(await page.locator("#progress").textContent(), /1 \/ 141/);
  // A real reviewer often writes a draft note before marking an item reviewed.
  await page.locator(".navitem").filter({ hasText: "B56" }).press("Enter");
  await page.locator("#note").fill("Draft, not reviewed: please check this idiom.");
  await page.locator("#replacement").fill("متنِ پیشنهادیِ موقت");
  assert.equal(await page.locator(".navitem").filter({ hasText: "B56" }).getAttribute("data-status"), "unreviewed");
  await page.locator("#reviewer").fill("E2E Test Reviewer");
  await page.locator("#qualification").selectOption("he-fa-fidelity");

  // Test local-only JSON export and re-import under source-hash lock.
  const dlWait = page.waitForEvent("download");
  await page.getByRole("button", { name: /گزارش JSON/ }).first().click();
  const download = await dlWait;
  const output = JSON.parse(await readFile(await download.path(), "utf8"));
  assert.equal(output.candidateSha, expectedSource);
  assert.equal(output.reviewedCount, 1);
  assert.equal(output.savedCount, 2);
  assert.equal(output.draftCount, 1);
  assert.equal(output.results.B56.status, "unreviewed");
  assert.equal(output.results.B56.note, "Draft, not reviewed: please check this idiom.");
  assert.equal(output.results.B56.proposedReplacement, "متنِ پیشنهادیِ موقت");
  assert.equal(output.releaseApproval, "NOT_GRANTED_BY_THIS_TOOL");
  assert.equal(output.results.B55.status, "changes");
  assert.equal(output.results.B55.note, "Reviewer test: verify source-fidelity scope.");
  assert.equal(output.results.B55.proposedReplacement, "پیشنهادِ ویرایشیِ آزمایشی.");
  assert.equal(output.competence, "he-fa-fidelity");

  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clear").click();
  assert.equal(await page.locator("#note").inputValue(), "");
  assert.equal(await page.locator(".navitem").filter({ hasText: "B55" }).getAttribute("data-status"), "unreviewed");
  await page.locator("#import").setInputFiles({
    name: "review.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(output), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("note").value === "Reviewer test: verify source-fidelity scope." || document.getElementById("note").value === "Draft, not reviewed: please check this idiom.");
  await page.locator(".navitem").filter({ hasText: "B55" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");
  assert.equal(await page.locator(".navitem").filter({ hasText: "B55" }).getAttribute("data-status"), "changes");
  await page.locator(".navitem").filter({ hasText: "B56" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Draft, not reviewed: please check this idiom.");
  assert.equal(await page.locator("#replacement").inputValue(), "متنِ پیشنهادیِ موقت");
  assert.equal(await page.locator(".navitem").filter({ hasText: "B56" }).getAttribute("data-status"), "unreviewed");
  assert.match(await page.locator("#progress").textContent(), /1 \/ 141/);

  // Cancel a same-source import: existing notes must never be overwritten silently.
  const legacy = { ...output, results: { B55: output.results.B55 } };
  delete legacy.savedCount;
  delete legacy.draftCount;
  page.once("dialog", dialog => dialog.dismiss());
  await page.locator("#import").setInputFiles({
    name: "legacy-review.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(legacy), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری لغو شد"));
  assert.equal(await page.locator("#note").inputValue(), "Draft, not reviewed: please check this idiom.");

  // Legacy, reviewed-only files remain importable with explicit replacement consent.
  page.once("dialog", dialog => dialog.accept());
  await page.locator("#import").setInputFiles({
    name: "legacy-review.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(legacy), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("note").value === "" && document.getElementById("notice").textContent.includes("گزارشِ محلی"));
  assert.equal(await page.locator(".navitem").filter({ hasText: "B56" }).getAttribute("data-status"), "unreviewed");
  await page.locator(".navitem").filter({ hasText: "B55" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");

  const corrupted = { ...output, candidateSha: "0".repeat(40) };
  await page.locator("#import").setInputFiles({
    name: "wrong-source.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(corrupted), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری نشد"));
  assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");

  await page.getByRole("button", { name: /متن هیولا/ }).press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "heading");
  assert.equal(await page.locator(".navitem").count(), 40);
  await page.locator(".navitem").filter({ hasText: "M39" }).click();
  assert.match(await page.locator("#fa-text").textContent(), /پنگوئن/);
  await page.getByRole("button", { name: /یادداشت‌های پنگوئن/ }).press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "heading");
  assert.equal(await page.locator(".navitem").count(), 21);
  await page.locator("#filter").fill("D21");
  assert.equal(await page.locator(".navitem").count(), 1);
  await page.locator("#filter").fill("");

  // Small/mobile viewport must not force horizontal clipping.
  await page.setViewportSize({ width: 390, height: 844 });
  const viewport = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  assert.ok(viewport.scrollWidth <= viewport.innerWidth + 1,
    "mobile content overflow: " + JSON.stringify(viewport));
  assert.deepEqual(errors, [], "reviewer UI must have no runtime JS errors");
  assert.deepEqual(networkRequests, [], "reviewer HTML must issue no network requests");
  console.log("[fa-review-browser] PASS — 141 source-locked units, notes, export/import, bad-source rejection, mobile reflow, 0 remote requests");
} finally {
  await browser.close();
}
