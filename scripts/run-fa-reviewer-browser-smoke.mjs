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
  assert.equal(await page.locator("#backup-corrupt").isVisible(), false, "raw recovery backup is shown only if browser state is damaged");
  assert.match(await page.locator("header .meta").textContent(), /کامیتِ مرجعِ محتوا \(نه HEAD کد\)/);
  assert.equal(await page.locator('header .meta a').getAttribute("href"),
    "https://github.com/Sargon17-Green/pastafari-calendar/pull/41");
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
  // Storage denial must not falsely count a review verdict as completed.
  const beforeStatusDenial = await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource);
  await page.evaluate(() => {
    window.__reviewerStorageOriginalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key.startsWith("fa-review:")) throw new DOMException("Status write denied", "QuotaExceededError");
      return window.__reviewerStorageOriginalSetItem.call(this, key, value);
    };
  });
  await page.getByRole("button", { name: "نیازمند اصلاح" }).press("Enter");
  assert.match(await page.locator("#notice").textContent(), /وضعیت ذخیره نشد/);
  assert.equal(await page.locator(".navitem").filter({ hasText: "B55" }).getAttribute("data-status"), "unreviewed");
  assert.equal(await page.getByRole("button", { name: "نیازمند اصلاح" }).getAttribute("aria-pressed"), "false");
  assert.match(await page.locator("#progress").textContent(), /0 \/ 141/);
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
    beforeStatusDenial, "failed review-verdict write must preserve original stored bytes");
  assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");
  await page.evaluate(() => {
    Storage.prototype.setItem = window.__reviewerStorageOriginalSetItem;
    delete window.__reviewerStorageOriginalSetItem;
  });
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
  // Metadata-only work must also require explicit confirmation before import.
  await page.locator("#reviewer").fill("Metadata-only reviewer");
  await page.locator("#qualification").selectOption("fa-style-only");
  const metadataOnlyStored = await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource);
  page.once("dialog", dialog => dialog.dismiss());
  await page.locator("#import").setInputFiles({
    name: "metadata-only-cancel.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(output), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری لغو شد"));
  assert.equal(await page.locator("#reviewer").inputValue(), "Metadata-only reviewer");
  assert.equal(await page.locator("#qualification").inputValue(), "fa-style-only");
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
    metadataOnlyStored, "canceled metadata-only import must retain stored reviewer fields");
  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clear").click();
  assert.equal(await page.locator("#reviewer").inputValue(), "");
  assert.equal(await page.locator("#qualification").inputValue(), "");

  // Equivalent maps with different JSON key orders must reimport successfully.
  const reversedBlobs = { ...output, sourceBlobSha1: Object.fromEntries(Object.entries(output.sourceBlobSha1).reverse()) };
  assert.notEqual(JSON.stringify(reversedBlobs.sourceBlobSha1), JSON.stringify(output.sourceBlobSha1));
  await page.locator("#import").setInputFiles({
    name: "review-reordered.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(reversedBlobs), "utf8"),
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

  // A browser storage failure must never replace the in-memory report or
  // display an import-success notice. Simulate a quota/security denial.
  const beforeWriteFailure = await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource);
  await page.evaluate(() => {
    window.__reviewerStorageOriginalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key.startsWith("fa-review:")) throw new DOMException("Storage unavailable", "QuotaExceededError");
      return window.__reviewerStorageOriginalSetItem.call(this, key, value);
    };
  });
  page.once("dialog", dialog => dialog.accept());
  await page.locator("#import").setInputFiles({
    name: "storage-denied.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(output), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری نشد"));
  assert.match(await page.locator("#notice").textContent(), /ذخیرهٔ مرورگر/);
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
    beforeWriteFailure, "failed import must retain existing persisted bytes");
  assert.match(await page.locator("#progress").textContent(), /1 \/ 141/);
  await page.locator(".navitem").filter({ hasText: "B56" }).click();
  assert.equal(await page.locator("#note").inputValue(), "", "failed import must not add a draft note to in-memory state");
  await page.locator(".navitem").filter({ hasText: "B55" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");
  await page.evaluate(() => {
    Storage.prototype.setItem = window.__reviewerStorageOriginalSetItem;
    delete window.__reviewerStorageOriginalSetItem;
  });

  // Reject missing, extra and mismatching file-to-hash mappings without
  // relying on their serialization order. Keep the existing review untouched.
  const sourceEntries = Object.entries(output.sourceBlobSha1);
  assert.ok(sourceEntries.length >= 2);
  for (const [label, blobs] of [
    ["changed-hash", { ...output.sourceBlobSha1, [sourceEntries[0][0]]: "0".repeat(40) }],
    ["missing-file", Object.fromEntries(sourceEntries.slice(1))],
    ["extra-file", { ...output.sourceBlobSha1, "unexpected/report-source.html": "0".repeat(40) }],
  ]) {
    await page.evaluate(() => { document.getElementById("notice").textContent = ""; });
    await page.locator("#import").setInputFiles({
      name: label + ".json", mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ ...output, sourceBlobSha1: blobs }), "utf8"),
    });
    await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری نشد"));
    assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.",
      label + " must preserve the imported review");
    assert.equal(await page.locator(".navitem").filter({ hasText: "B55" }).getAttribute("data-status"), "changes");
  }

  // Invalid or missing results must not be interpreted as an empty valid
  // report: doing so could wipe existing draft notes after an import.
  const { results: _discardedResults, ...withoutResults } = output;
  const beforeMalformed = await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource);
  for (const [label, imported] of [
    ["missing-results", withoutResults],
    ["null-results", { ...output, results: null }],
    ["empty-results", { ...output, results: {} }],
    ["array-results", { ...output, results: [] }],
    ["string-results", { ...output, results: "" }],
  ]) {
    await page.evaluate(() => { document.getElementById("notice").textContent = ""; });
    await page.locator("#import").setInputFiles({
      name: label + ".json", mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(imported), "utf8"),
    });
    await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری نشد"));
    assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
      beforeMalformed, label + " must not overwrite valid local review notes");
    assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");
    assert.equal(await page.locator(".navitem").filter({ hasText: "B55" }).getAttribute("data-status"), "changes");
  }

  // Untrusted metadata must not create a "successful" import that becomes
  // malformed persisted state on the next reload.
  for (const [label, fields] of [
    ["reviewer-object", { reviewer: { name: "spoofed" } }],
    ["reviewer-number", { reviewer: 17 }],
    ["competence-array", { competence: ["he-fa-fidelity"] }],
    ["competence-unsupported", { competence: "unverified-fidelity" }],
  ]) {
    await page.evaluate(() => { document.getElementById("notice").textContent = ""; });
    await page.locator("#import").setInputFiles({
      name: label + ".json", mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ ...output, ...fields }), "utf8"),
    });
    await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری نشد"));
    assert.match(await page.locator("#notice").textContent(), /بازبین/);
    assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
      beforeMalformed, label + " must preserve existing local review bytes");
    assert.equal(await page.locator("#reviewer").inputValue(), "E2E Test Reviewer");
    assert.equal(await page.locator("#qualification").inputValue(), "he-fa-fidelity");
    assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");
  }

  const corrupted = { ...output, candidateSha: "0".repeat(40) };
  await page.locator("#import").setInputFiles({
    name: "wrong-source.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(corrupted), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری نشد"));
  assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.");

  // A locally stored unknown qualification must enter raw-backup recovery,
  // rather than silently appear as an empty but editable competence.
  const beforeInvalidQualification = await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource);
  const invalidQualificationRaw = await page.evaluate(source => {
    const k = "fa-review:" + source + ":v1";
    const old = JSON.parse(localStorage.getItem(k));
    old.qualification = "unverified-fidelity";
    const raw = JSON.stringify(old);
    localStorage.setItem(k, raw);
    return raw;
  }, expectedSource);
  await page.reload({ waitUntil: "load" });
  assert.match(await page.locator("#notice").textContent(), /نامعتبر/);
  assert.equal(await page.locator("#qualification").isDisabled(), true);
  assert.equal(await page.locator("#qualification").inputValue(), "");
  assert.equal(await page.locator("#backup-corrupt").isVisible(), true);
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
    invalidQualificationRaw, "unsupported competence must not overwrite original raw bytes");
  await page.evaluate(([source, raw]) => localStorage.setItem("fa-review:" + source + ":v1", raw),
    [expectedSource, beforeInvalidQualification]);
  await page.reload({ waitUntil: "load" });
  assert.equal(await page.locator("#qualification").isDisabled(), false);
  assert.equal(await page.locator("#qualification").inputValue(), "he-fa-fidelity");
  assert.equal(await page.locator("#backup-corrupt").isVisible(), false);

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

  // Persisted local state is untrusted. A bad status must not count as reviewed;
  // valid notes survive partial damage and the original stored bytes are not
  // silently overwritten during recovery.
  await page.evaluate(source => {
    localStorage.setItem("fa-review:" + source + ":v1", JSON.stringify({
      reviewer: "Recovered reviewer", qualification: "he-fa-fidelity",
      items: {
        B55: { status: "changes", note: "Preserved reviewed note", replacement: "متنِ سالم" },
        B56: { status: "unexpected", note: "Preserved unreviewed draft", replacement: "" },
        A02: { note: "Legacy draft missing status", replacement: "" },
        A01: null,
        M01: "invalid primitive",
        Z99: { status: "approved", note: "unknown ID must be ignored" },
      },
    }));
  }, expectedSource);
  await page.reload({ waitUntil: "load" });
  assert.match(await page.locator("#progress").textContent(), /1 \/ 141/,
    "invalid statuses must never inflate the reviewed count");
  assert.match(await page.locator("#notice").textContent(), /نامعتبر/);
  assert.equal(await page.locator("#reviewer").inputValue(), "Recovered reviewer");
  assert.equal(await page.locator("#reviewer").isDisabled(), true, "partial corruption must lock reviewer edits until explicit recovery");
  assert.equal(await page.locator("#note").isDisabled(), true, "recovered notes must not be overwritten before backup/import/reset");
  assert.equal(await page.locator("#status-buttons button").first().isDisabled(), true, "cannot record approval while recovery is unresolved");
  assert.equal(await page.locator("#backup-corrupt").isVisible(), true);
  const partialRaw = await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource);
  const partialWait = page.waitForEvent("download");
  await page.locator("#backup-corrupt").click();
  const partialDownload = await partialWait;
  assert.match(partialDownload.suggestedFilename(), /^fa-review-damaged-[a-f0-9]{8}-\d{4}-\d{2}-\d{2}\.txt$/);
  assert.equal(await readFile(await partialDownload.path(), "utf8"), partialRaw, "partial damage backup must preserve every raw byte");
  await page.getByRole("button", { name: /نام‌های کانونی/ }).click();
  await page.locator(".navitem").filter({ hasText: "B55" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Preserved reviewed note");
  assert.equal(await page.locator(".navitem").filter({ hasText: "B55" }).getAttribute("data-status"), "changes");
  await page.locator(".navitem").filter({ hasText: "B56" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Preserved unreviewed draft");
  assert.equal(await page.locator(".navitem").filter({ hasText: "B56" }).getAttribute("data-status"), "unreviewed");
  await page.getByRole("button", { name: /دربارهٔ تقویم/ }).click();
  await page.locator(".navitem").filter({ hasText: "A02" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Legacy draft missing status");
  assert.equal(await page.locator(".navitem").filter({ hasText: "A02" }).getAttribute("data-status"), "unreviewed");

  await page.evaluate(source => {
    localStorage.setItem("fa-review:" + source + ":v1", "{broken JSON");
  }, expectedSource);
  await page.reload({ waitUntil: "load" });
  assert.match(await page.locator("#heading").textContent(), /^A01/);
  assert.match(await page.locator("#progress").textContent(), /0 \/ 141/);
  assert.match(await page.locator("#notice").textContent(), /خواندنی نیستند/);
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"),
    expectedSource), "{broken JSON", "damaged data must not be silently overwritten");
  assert.equal(await page.locator("#reviewer").isDisabled(), true);
  assert.equal(await page.locator("#note").isDisabled(), true);
  assert.equal(await page.locator("#replacement").isDisabled(), true);
  assert.equal(await page.locator("#status-buttons button").first().isDisabled(), true);
  assert.equal(await page.locator("#backup-corrupt").isVisible(), true);
  const badRawWait = page.waitForEvent("download");
  await page.locator("#backup-corrupt").click();
  const badRaw = await badRawWait;
  assert.equal(await readFile(await badRaw.path(), "utf8"), "{broken JSON", "invalid JSON bytes must be downloadable verbatim");

  // Import on a damaged source must obtain explicit permission, not silently
  // replace the original even if no in-memory reviewed items were recovered.
  page.once("dialog", dialog => dialog.dismiss());
  await page.locator("#import").setInputFiles({
    name: "recovery.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(output), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری لغو شد"));
  assert.equal(await page.locator("#note").isDisabled(), true, "canceled import must keep review editing locked");
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"),
    expectedSource), "{broken JSON", "cancelled import must preserve the corrupted bytes");

  // Failed storage when recovering damaged state must keep the emergency
  // backup available, editing locked and the exact damaged bytes untouched.
  await page.evaluate(() => {
    window.__reviewerStorageOriginalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key.startsWith("fa-review:")) throw new DOMException("Storage unavailable", "QuotaExceededError");
      return window.__reviewerStorageOriginalSetItem.call(this, key, value);
    };
  });
  page.once("dialog", dialog => dialog.accept());
  await page.locator("#import").setInputFiles({
    name: "recovery-storage-denied.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(output), "utf8"),
  });
  await page.waitForFunction(() => document.getElementById("notice").textContent.includes("بارگذاری نشد"));
  assert.equal(await page.locator("#note").isDisabled(), true);
  assert.equal(await page.locator("#backup-corrupt").isVisible(), true);
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
    "{broken JSON", "failed recovery must not replace damaged data");
  await page.evaluate(() => {
    Storage.prototype.setItem = window.__reviewerStorageOriginalSetItem;
    delete window.__reviewerStorageOriginalSetItem;
  });

  // A denied reset must not clear or unlock a damaged review; raw backup stays available.
  await page.evaluate(() => {
    window.__reviewerStorageOriginalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key.startsWith("fa-review:")) throw new DOMException("Reset denied", "QuotaExceededError");
      return window.__reviewerStorageOriginalSetItem.call(this, key, value);
    };
  });
  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clear").click();
  assert.match(await page.locator("#notice").textContent(), /بازنشانی انجام نشد/);
  assert.equal(await page.locator("#note").isDisabled(), true, "failed reset must preserve recovery lock");
  assert.equal(await page.locator("#backup-corrupt").isVisible(), true, "failed reset must preserve raw backup");
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
    "{broken JSON", "failed reset must preserve damaged browser bytes");
  await page.evaluate(() => {
    Storage.prototype.setItem = window.__reviewerStorageOriginalSetItem;
    delete window.__reviewerStorageOriginalSetItem;
  });

  page.once("dialog", dialog => dialog.accept());
  await page.locator("#import").setInputFiles({
    name: "recovery.json", mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(output), "utf8"),
  });
  await page.waitForFunction(() => !document.getElementById("note").disabled);
  assert.match(await page.locator("#progress").textContent(), /1 \/ 141/);
  assert.equal(await page.locator("#reviewer").isDisabled(), false);
  assert.equal(await page.locator("#status-buttons button").first().isDisabled(), false);
  assert.equal(await page.locator("#backup-corrupt").isVisible(), false, "a successful import removes the emergency raw-backup control");
  assert.equal((await page.evaluate(source => JSON.parse(localStorage.getItem("fa-review:" + source + ":v1")),
    expectedSource)).items.B55.note, "Reviewer test: verify source-fidelity scope.");

  // A denied reset of healthy work must preserve the stored report and visible state.
  const beforeResetDenial = await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource);
  await page.evaluate(() => {
    window.__reviewerStorageOriginalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key.startsWith("fa-review:")) throw new DOMException("Reset denied", "QuotaExceededError");
      return window.__reviewerStorageOriginalSetItem.call(this, key, value);
    };
  });
  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clear").click();
  assert.match(await page.locator("#notice").textContent(), /بازنشانی انجام نشد/);
  assert.match(await page.locator("#progress").textContent(), /1 \/ 141/);
  assert.equal(await page.locator("#reviewer").inputValue(), "E2E Test Reviewer");
  assert.equal(await page.locator("#backup-corrupt").isVisible(), false);
  assert.equal(await page.evaluate(source => localStorage.getItem("fa-review:" + source + ":v1"), expectedSource),
    beforeResetDenial, "failed reset must preserve the healthy stored report");
  await page.getByRole("button", { name: /نام‌های کانونی/ }).click();
  await page.locator(".navitem").filter({ hasText: "B55" }).click();
  assert.equal(await page.locator("#note").inputValue(), "Reviewer test: verify source-fidelity scope.",
    "failed reset must preserve the healthy in-memory notes");
  await page.evaluate(() => {
    Storage.prototype.setItem = window.__reviewerStorageOriginalSetItem;
    delete window.__reviewerStorageOriginalSetItem;
  });

  // Explicitly confirmed reset is the other permitted recovery path.
  await page.evaluate(source => localStorage.setItem("fa-review:" + source + ":v1", "{broken JSON"),
    expectedSource);
  await page.reload({ waitUntil: "load" });
  assert.equal(await page.locator("#note").isDisabled(), true);
  page.once("dialog", dialog => dialog.accept());
  await page.locator("#clear").click();
  assert.equal(await page.locator("#note").isDisabled(), false);
  assert.equal(await page.locator("#backup-corrupt").isVisible(), false, "confirmed reset clears the recovery-only button");
  assert.match(await page.locator("#progress").textContent(), /0 \/ 141/);
  assert.deepEqual((await page.evaluate(source => JSON.parse(localStorage.getItem("fa-review:" + source + ":v1")),
    expectedSource)).items, {});


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
  console.log("[fa-review-browser] PASS — 141 source-locked units, notes, export/import, bad-source rejection, corrupt local recovery, mobile reflow, 0 remote requests");
} finally {
  await browser.close();
}
