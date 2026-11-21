import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";
import { loadLocale } from "../docs/i18n/registry.js";
import { ARTICLE_LOCALES, resolveArticleLocale } from "../docs/about/content/registry.js";

const DOCS = new URL("../docs/", import.meta.url);
const read = path => readFile(new URL(path, DOCS), "utf8");
const tags = html => [...html.matchAll(
  /<(\/?)(article|section|div|p|ul|ol|li|dl|dt|dd|blockquote|aside|h2|h3|details|summary|a|strong|em|code|br)(?=[\s>])[^>]*>/g,
)].map(m => (m[1] ? "/" : "") + m[2]);
const ids = html => [...html.matchAll(/<section id="([^"]+)"/g)].map(m => m[1]);
const sectionIds = html => [...html.matchAll(/<(?:div|section) class="about-section(?: about-lead)?" id="([^"]+)"/g)].map(m => m[1]);

test("Persian article is registered and links to its own Monster, not Hebrew fallback", async () => {
  const article = await read("about/content/fa.html");
  assert.equal(ARTICLE_LOCALES.fa.code, "fa");
  assert.equal(ARTICLE_LOCALES.fa.dir, "rtl");
  assert.equal(resolveArticleLocale("fa").code, "fa");
  assert.match(ARTICLE_LOCALES.fa.asset, /\.\/content\/fa\.html\?v=20261115-fa20/);
  assert.match(article, /href="\.\/monster\/fa\.html" hreflang="fa"/);
  assert.doesNotMatch(article, /href="\.\/monster\/"(?:\s|>)/);
  assert.equal((article.match(/<summary>/g) ?? []).length, 64);
});

test("all Persian article units and name explanations match the Hebrew semantic skeleton", async () => {
  const [hebrew, persian] = await Promise.all([
    read("about/content/he.html"),
    read("about/content/fa.html"),
  ]);
  const hebrewIDs = sectionIds(hebrew);
  assert.equal(hebrewIDs.length, 16);
  assert.deepEqual(sectionIds(persian), hebrewIDs);
  assert.deepEqual(tags(persian), tags(hebrew));
  assert.equal((persian.match(/data-toc-section/g) ?? []).length, 15);
  const locale = await loadLocale("fa");
  const expected = [
    ...CUTLETS.map(({ id }) => locale.calendar.cutlets[id]),
    ...MONTHS.map(({ id }) => locale.calendar.months[id]),
  ];
  const actual = [...persian.matchAll(/<summary>([^<]*)<\/summary>/g)].map(m => m[1]);
  assert.deepEqual(actual, expected);
  assert.equal(actual.length, 64);
  assert.equal(locale.calendar.months.sand, "ماسه");
  assert.match(persian, /<summary>ماسه<\/summary>/);
  assert.match(persian, /href="\.\/birthdays\/technical\.html"/);
  for (const boundary of ["|x − 4/9| ≤ e/103", "|x − 3/5| ≤ 1/367",
    "−6°", "180–220", "14,777,149", "365,243,000", "97.482%", "77.56%"]) {
    assert.ok(persian.includes(boundary), "missing exact expression: " + boundary);
  }
});

test("Persian Monster content preserves 39 Hebrew anchors, all 21 notes and complete structure", async () => {
  const [hebrew, persian] = await Promise.all([
    read("about/monster/index.html"),
    read("about/monster/fa.html"),
  ]);
  const article = html => html.slice(html.indexOf('<article class="about-article">'),
    html.indexOf("</article>") + "</article>".length);
  const heBody = article(hebrew);
  const faBody = article(persian);
  assert.equal(ids(heBody).length, 39);
  assert.deepEqual(ids(faBody), ids(heBody));
  assert.deepEqual(tags(faBody), tags(heBody));
  assert.equal((faBody.match(/<details class="penguin-note">/g) ?? []).length, 21);
  assert.equal((faBody.match(/<details class="penguin-appendix">/g) ?? []).length, 1);
  assert.match(persian, /<html lang="fa" dir="rtl">/);
  assert.match(persian, /href="\.\.\/\?lang=fa"/);
  assert.doesNotMatch(persian, /<meta name="robots" content="noindex">/);
  assert.doesNotMatch(persian, /پیش‌نویسِ فارسی/);
  assert.match(persian, /styles\.css\?v=16-about-polish/);
});

test("Persian route and optional PWA assets are version-consistent across the UI", async () => {
  const [shell, aboutShell, app, aboutJs, worker, registry, runtime, monsterIndex] =
    await Promise.all([
      read("index.html"), read("about/index.html"), read("app.js"), read("about/about.js"),
      read("sw.js"), read("i18n/registry.js"), read("i18n/runtime.js"),
      read("about/monster/index.html"),
    ]);
  assert.match(shell, /app\.js\?v=25-about-fa-20261114/);
  assert.match(aboutShell, /about\.js\?v=20261115-fa21/);
  assert.match(app, /i18n\/registry\.js\?v=20-about-fa-20261114/);
  assert.match(aboutJs, /content\/registry\.js\?v=20261115-fa20/);
  assert.match(runtime, /registry\.js\?v=20-about-fa-20261114/);
  assert.match(registry, /LOCALE_ASSET_REVISION = "21-about-fa-20261114"/);
  assert.match(worker, /pastafari-static-pwa-about-fa-20261115-editorial-v2/);
  assert.match(worker, /\.\/about\/content\/fa\.html\?v=20261115-fa20/);
  assert.match(worker, /\.\/about\/monster\/fa\.html/);
  assert.match(monsterIndex, /es,et,fr,fa/);
});


test("editorial candidate N3/N4: canonical donkey and regret glosses preserve Hebrew meaning", async () => {
  const about = await read("about/content/fa.html");
  assert.match(about, /الاغ، پستانداری اهلی\./);
  assert.match(about, /پشیمانی، اندوه یا تأسف از کاری، انتخابی یا نتیجه‌ای در گذشته\./);
  assert.doesNotMatch(about, /با گوش‌های بلند و سم‌های محکم|کاش طورِ دیگری رخ داده بود/);
});

test("Persian source-language adaptation avoids stale Hebrew-only copy and circular definitions", async () => {
  const [about, monster] = await Promise.all([
    read("about/content/fa.html"), read("about/monster/fa.html"),
  ]);
  assert.match(about, /بیشتر دربارهٔ هیولای اسپاگتیِ پرنده/);
  assert.doesNotMatch(about, /متنِ کامل فعلاً به عبری/);
  assert.doesNotMatch(about, /پستاندارِ اهلیِ الاغ|عنصر شیمیاییِ قلع|عنصر شیمیاییِ مس/);
  assert.match(about, /Sn/);
  assert.match(about, /Cu/);
  assert.match(about, /Ag/);
  assert.match(monster, /در فارسی این پرسش از نظرِ دستورِ زبان/);
  assert.match(monster, /به زبانِ فارسی قاطی کرده‌ای/);
  assert.doesNotMatch(monster, /به زبانِ عبری قاطی کرده‌ای/);
  assert.match(monster, /پنجاه شیرِ یک‌طرفه/);
});


test("all browser modules use the same live i18n registry revision", async () => {
  const [app, reverse, about, runtime, worker, supportProbe, lazyProbe] = await Promise.all([
    read("app.js"), read("reverse-ui.js"), read("about/about.js"),
    read("i18n/runtime.js"), read("sw.js"),
    readFile(new URL("../scripts/run-i18n-support-smoke.mjs", import.meta.url), "utf8"),
    readFile(new URL("../scripts/run-i18n-lazy-loading-smoke.mjs", import.meta.url), "utf8"),
  ]);
  const current = "20-about-fa-20261114";
  for (const [name, source] of [
    ["app", app], ["reverse", reverse], ["about", about],
    ["runtime", runtime], ["support probe", supportProbe], ["lazy probe", lazyProbe],
  ]) {
    assert.ok(source.includes("i18n/registry.js?v=" + current) || source.includes("./registry.js?v=" + current), name + " must import current registry");
    assert.doesNotMatch(source, /registry\.js\?v=19-about-page/, name + " may not import stale i18n code");
  }
  assert.match(app, /reverse-ui\.js\?v=21-about-fa-20261114/);
  assert.match(worker, /"\.\/reverse-ui\.js\?v=21-about-fa-20261114"/);
  assert.doesNotMatch(worker, /reverse-ui\.js\?v=20-about-page/);
  assert.match(reverse, /registry\.js\?v=20-about-fa-20261114/);
});


test("Persian About preserves all numeric constraints within each Hebrew source unit", async () => {
  const [hebrew, persian] = await Promise.all([
    read("about/content/he.html"),
    read("about/content/fa.html"),
  ]);
  const units = html => {
    const starts = [...html.matchAll(
      /<(?:div|section) class="about-section(?: about-lead)?" id="([^"]+)"/g,
    )];
    return starts.map((match, index) => ({
      id: match[1],
      body: html.slice(match.index, starts[index + 1]?.index ?? html.length),
    }));
  };
  const numbers = html => {
    const visible = html.replace(/<[^>]+>/g, " ").replace(/&[^;]{1,15};/g, " ")
      .replace(/[\u06f0-\u06f9\u0660-\u0669]/g, digit => {
        const code = digit.codePointAt(0);
        return String(code >= 0x6f0 ? code - 0x6f0 : code - 0x660);
      })
      .replace(/\u066c/g, ",").replace(/\u066b/g, ".");
    return [...new Set([...visible.matchAll(/(?<![\w-])[-−]?\d+(?:[,.]\d+)?/g)]
      .map(match => match[0]))].sort();
  };
  const source = units(hebrew);
  const localized = units(persian);
  assert.equal(source.length, 16);
  assert.deepEqual(localized.map(unit => unit.id), source.map(unit => unit.id));
  for (let index = 0; index < source.length; index++) {
    assert.deepEqual(numbers(localized[index].body), numbers(source[index].body),
      "Numerical source parity changed in About unit " + source[index].id);
  }
});


test("reviewer matrix is not stale relative to the Hebrew and Persian sources", async () => {
  const { createHash } = await import("node:crypto");
  const matrix = await readFile(new URL("../verification/fa-release/reviewer-matrix.md", import.meta.url), "utf8");
  const contentSnapshotSha = "55c0f8a33114a7c6858a024cf5b75ca0cff89242";
  assert.ok(matrix.includes(`Pinned linguistic content snapshot (not current code HEAD): \`${contentSnapshotSha}\``));
  const aboutSourceRefs = [...matrix.matchAll(/https:\/\/github\\.com\/Sargon17-Green\/pastafari-calendar\/blob\/([0-9a-f]{40})\//g)].map(match => match[1]);
  assert.ok(aboutSourceRefs.length > 0 && aboutSourceRefs.every(sha => sha === contentSnapshotSha),
    "About reviewer matrix links must resolve to the locked content snapshot");
  for (const path of [
    "about/content/he.html", "about/content/fa.html",
    "about/monster/index.html", "about/monster/fa.html",
  ]) {
    const blob = await readFile(new URL(path, DOCS));
    const actual = createHash("sha1").update("blob " + blob.length + "\0")
      .update(blob).digest("hex");
    assert.ok(matrix.includes("| \`docs/" + path + "\` | \`" + actual + "\` |"),
      "review matrix is stale for docs/" + path);
  }
  assert.equal((matrix.match(/^### A\d{2} —/gm) ?? []).length, 16);
  assert.equal((matrix.match(/^### B\d{2} —/gm) ?? []).length, 64);
  assert.equal((matrix.match(/^### D\d{2} /gm) ?? []).length, 21);
  assert.match(matrix, /Status: NOT HUMAN-APPROVED/);
});


test("Monster reviewer prose matrix spans the entire source and preserves section-scoped numbers", async () => {
  const { createHash } = await import("node:crypto");
  const packet = await readFile(new URL("../verification/fa-release/monster-prose-matrix.md", import.meta.url), "utf8");
  const contentSnapshotSha = "55c0f8a33114a7c6858a024cf5b75ca0cff89242";
  assert.ok(packet.includes(`Pinned linguistic content snapshot (not current code HEAD): \`${contentSnapshotSha}\``));
  const monsterSourceRefs = [...packet.matchAll(/https:\/\/github\\.com\/Sargon17-Green\/pastafari-calendar\/blob\/([0-9a-f]{40})\//g)].map(match => match[1]);
  assert.ok(monsterSourceRefs.length > 0 && monsterSourceRefs.every(sha => sha === contentSnapshotSha),
    "Monster reviewer matrix links must resolve to the locked content snapshot");
  const splitArticle = html => {
    const start = html.indexOf('<article class="about-article">');
    const end = html.indexOf("</article>", start);
    assert.ok(start >= 0 && end > start, "complete Monster article expected");
    const article = html.slice(start, end);
    const anchors = [...article.matchAll(/<section id="([^"]+)"[^>]*>/g)];
    assert.equal(anchors.length, 39, "39 stable Monster section anchors expected");
    return [
      { id: "__introduction__", body: article.slice(0, anchors[0].index) },
      ...anchors.map((match, index) => ({
        id: match[1],
        body: article.slice(match.index, anchors[index + 1]?.index ?? article.length),
      })),
    ];
  };
  const numbers = html => {
    const visible = html.replace(/<[^>]+>/g, " ")
      .replace(/[\u06f0-\u06f9\u0660-\u0669]/g, digit =>
        String(digit.codePointAt(0) - (digit.codePointAt(0) >= 0x6f0 ? 0x6f0 : 0x660)));
    return [...new Set([...visible.matchAll(/(?<![\w-])[-−]?\d+(?:[,.]\d+)?/g)]
      .map(match => match[0]))].sort();
  };
  const [hebrew, persian] = await Promise.all([
    read("about/monster/index.html"), read("about/monster/fa.html"),
  ]);
  for (const [relativePath, content] of [
    ["about/monster/index.html", hebrew], ["about/monster/fa.html", persian],
  ]) {
    const bytes = Buffer.from(content, "utf8");
    const gitBlobSha = createHash("sha1").update("blob " + bytes.length + "\0")
      .update(bytes).digest("hex");
    assert.ok(packet.includes("| \`docs/" + relativePath + "\` | \`" + gitBlobSha + "\` |"),
      "full Monster reviewer prose matrix is stale for docs/" + relativePath);
  }
  const source = splitArticle(hebrew);
  const translated = splitArticle(persian);
  assert.equal(source.length, 40);
  assert.deepEqual(translated.map(x => x.id), source.map(x => x.id));
  assert.equal((packet.match(/^### M\d{2} —/gm) ?? []).length, 40);
  assert.match(packet, /Status: NOT HUMAN-APPROVED/);
  for (let index = 0; index < source.length; index++) {
    const id = source[index].id;
    const countParagraphs = html => (html.match(/<p(?:\s[^>]*)?>/g) ?? []).length;
    const countNotes = html => (html.match(/<details class="penguin-note">/g) ?? []).length;
    assert.equal(countParagraphs(translated[index].body), countParagraphs(source[index].body),
      "paragraph count changed in Monster section " + id);
    assert.equal(countNotes(translated[index].body), countNotes(source[index].body),
      "penguin note count changed in Monster section " + id);
    assert.deepEqual(numbers(translated[index].body), numbers(source[index].body),
      "numerical source parity changed in Monster section " + id);
  }
  assert.match(packet, /NOT HUMAN-APPROVED/);
});


test("localized articles and canonical names reject destructive Chrome auto-translation", async () => {
  const [aboutJs, namesJs, monster] = await Promise.all([
    read("about/about.js"), read("about/canonical-names.js"), read("about/monster/fa.html"),
  ]);
  assert.match(aboutJs, /const exact = articleLocale\.code === activeLocale\.code/);
  assert.match(aboutJs, /elements\["article-content"\]\.translate = !exact/);
  assert.match(aboutJs, /classList\.toggle\("notranslate", exact\)/);
  assert.match(namesJs, /summary\.translate = false/);
  assert.match(namesJs, /summary\.classList\.add\("notranslate"\)/);
  assert.match(monster, /<meta name="google" content="notranslate">/);
});


test("offline Persian human-review dashboard is self-contained, complete and source-locked", async () => {
  const { createHash } = await import("node:crypto");
  const { Script } = await import("node:vm");
  const html = await readFile(new URL("../verification/fa-release/offline-reviewer.html", import.meta.url), "utf8");
  const embedded = html.match(/<script id="fa-review-dataset" type="application\/json">([\s\S]*?)<\/script>/);
  assert.ok(embedded, "embedded offline reviewer data");
  const d = JSON.parse(embedded[1]);
  assert.equal(d.schema, "fa-release-editorial-audit-v1");
  assert.equal(d.candidateSha, "55c0f8a33114a7c6858a024cf5b75ca0cff89242");
  assert.deepEqual(d.counts, { A: 16, B: 64, M: 40, D: 21 });
  assert.equal(d.items.length, 141);
  assert.equal(new Set(d.items.map(x => x.id)).size, 141);
  for (const [kind,n,start] of [["A",16,1],["B",64,1],["M",40,0],["D",21,1]]) {
    assert.deepEqual(d.items.filter(x=>x.kind===kind).map(x=>x.id),
      Array.from({length:n},(_,i)=>kind+String(start+i).padStart(2,"0")));
  }
  for (const e of d.items) {
    assert.ok(e.he.trim() && e.fa.trim() && e.title.trim(),e.id);
    assert.match(e.heUrl,/^https:\/\/github\.com\/Sargon17-Green\/pastafari-calendar\/blob\/[a-f0-9]{40}\/docs\/about\//);
    assert.match(e.faUrl,/^https:\/\/github\.com\/Sargon17-Green\/pastafari-calendar\/blob\/[a-f0-9]{40}\/docs\/about\//);
  }
  for(const [path,expected] of Object.entries(d.sourceBlobSha1)){
    const bytes=await readFile(new URL("../"+path,import.meta.url));
    const actual=createHash("sha1").update("blob "+bytes.length+"\0").update(bytes).digest("hex");
    assert.equal(actual,expected,"source mismatch: "+path);
  }
  assert.match(d.items.find(x=>x.id==="B55").fa,/پستانداری اهلی/);
  assert.match(d.items.find(x=>x.id==="B57").fa,/تأسف/);
  assert.match(d.items.find(x=>x.id==="A06").he,/64/);
  const script=html.match(/<script>\s*("use strict";[\s\S]*?)<\/script>/);
  assert.ok(script,"embedded offline UI script");
  new Script(script[1],{filename:"offline-reviewer.html"});
  assert.match(script[1],/releaseApproval:"NOT_GRANTED_BY_THIS_TOOL"/);
  assert.match(script[1],/candidateSha!==data\.candidateSha/);
  assert.match(script[1],/sourceBlobSha1/);
  assert.doesNotMatch(script[1],/\bfetch\s*\(|XMLHttpRequest|sendBeacon/);
  assert.doesNotMatch(html,/<script[^>]+\bsrc=/i);
  assert.doesNotMatch(html,/<link[^>]+\bhref=/i);
  assert.match(html,/هیچ تأییدِ انسانی ثبت نشده است/);
});


test("independent Persian reviewer JSON verifier never grants release approval", async () => {
  const { readLockedDataset, inspectReviewReport } =
    await import("../verification/fa-release/verify-report.mjs");
  const dataset = await readLockedDataset();
  const baseline = {
    schema: "fa-release-editorial-audit-result/v1",
    candidateSha: dataset.candidateSha,
    sourceBlobSha1: dataset.sourceBlobSha1,
    reviewer: "Example human reviewer (test fixture)",
    competence: "he-fa-fidelity",
    releaseApproval: "NOT_GRANTED_BY_THIS_TOOL",
    storageSnapshotStatus: "CURRENT",
    unsavedLocalEdits: false,
    reconciliationRequired: false,
    results: {
      A01: { status: "changes", note: "Check this wording", proposedReplacement: "" },
      A02: { status: "unreviewed", note: "Draft observation", proposedReplacement: "" }
    },
    reviewedCount: 1, savedCount: 2, draftCount: 1, totalUnits: 141
  };
  const verify = patch => inspectReviewReport({ ...baseline, ...patch }, dataset);
  const first = verify({});
  assert.equal(first.structurallyValid, true);
  assert.equal(first.coverageComplete, false);
  assert.equal(first.groups.A.reviewed, 1);
  assert.equal(first.groups.A.drafts, 1);
  assert.equal(first.unresolvedChanges, true);
  assert.deepEqual(first.changeRequiredUnitIds, ["A01"]);
  assert.deepEqual(first.savedDraftUnitIds, ["A02"]);
  assert.deepEqual(first.missingReviewedUnitIds.slice(0, 4), ["A02", "A03", "A04", "A05"]);
  assert.equal(first.missingReviewedUnitIds.length, 140);
  assert.equal(first.groups.A.missing, 15);
  assert.equal(first.groups.B.missing, 64);
  assert.equal(first.claimedReviewScope, "BILINGUAL_SELF_REPORTED");
  assert.equal(first.provenanceClaim, "SELF_REPORTED_CURRENT");
  assert.equal(first.provenanceCheckRequired, false);
  assert.equal(first.humanLanguageSignoff, "NOT_VERIFIED");
  assert.equal(first.releaseApproval, "NOT_GRANTED_BY_THIS_TOOL");

  for (const [field, bad] of [
    ["reviewedCount", 141], ["savedCount", 1], ["draftCount", 0],
    ["totalUnits", 140], ["reviewedCount", "1"],
    ["releaseApproval", "APPROVED"], ["releaseApproval", null],
    ["candidateSha", "0".repeat(40)], ["sourceBlobSha1", {}],
    ["competence", "unverified-fidelity"]
  ]) {
    assert.equal(verify({ [field]: bad }).structurallyValid, false, field);
  }
  const legacy = { ...baseline };
  delete legacy.reviewedCount;
  delete legacy.savedCount;
  delete legacy.draftCount;
  delete legacy.totalUnits;
  delete legacy.releaseApproval;
  assert.equal(inspectReviewReport(legacy, dataset).structurallyValid, true,
    "old reports may omit optional count/release metadata");
  delete legacy.storageSnapshotStatus;
  delete legacy.unsavedLocalEdits;
  delete legacy.reconciliationRequired;
  const legacyResult = inspectReviewReport(legacy, dataset);
  assert.equal(legacyResult.structurallyValid, true);
  assert.equal(legacyResult.needsReconciliation, false);
  assert.equal(legacyResult.provenanceCheckRequired, true,
    "missing legacy storage provenance cannot be treated as a verified clean snapshot");
  assert.equal(legacyResult.provenanceClaim, "INCOMPLETE_LEGACY_METADATA");
  assert.deepEqual(legacyResult.missingProvenanceFields,
    ["storageSnapshotStatus", "unsavedLocalEdits", "reconciliationRequired"]);

  const unresolved = verify({
    storageSnapshotStatus: "STALE_AFTER_EXTERNAL_CHANGE",
    unsavedLocalEdits: true,
    reconciliationRequired: true
  });
  assert.equal(unresolved.structurallyValid, true);
  assert.equal(unresolved.needsReconciliation, true);
  assert.equal(unresolved.provenanceCheckRequired, true);
  assert.equal(unresolved.provenanceClaim, "SELF_REPORTED_CONFLICT_OR_UNSAVED");
  assert.equal(unresolved.releaseApproval, "NOT_GRANTED_BY_THIS_TOOL");

  const fullResults = Object.fromEntries(dataset.items.map(item =>
    [item.id, { status: "approved", note: "", proposedReplacement: "" }]));
  const full = verify({
    results: fullResults, reviewedCount: 141, savedCount: 141, draftCount: 0
  });
  assert.equal(full.structurallyValid, true);
  assert.equal(full.coverageComplete, true);
  assert.deepEqual(full.missingReviewedUnitIds, []);
  assert.deepEqual(full.changeRequiredUnitIds, []);
  assert.deepEqual(full.savedDraftUnitIds, []);
  assert.deepEqual(Object.fromEntries(Object.entries(full.groups).map(([k,v]) =>
    [k, v.reviewed])), { A: 16, B: 64, M: 40, D: 21 });
  assert.equal(full.humanLanguageSignoff, "NOT_VERIFIED",
    "141 machine-checkable declarations never constitute independent human signoff");
  assert.equal(full.physicalAccessibilitySignoff, "NOT_VERIFIED");
  assert.equal(full.releaseApproval, "NOT_GRANTED_BY_THIS_TOOL");
});


test("independent Persian reviewer verifier CLI validates files but cannot approve a release", async () => {
  const { spawnSync } = await import("node:child_process");
  const { mkdtemp, writeFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const { readLockedDataset } =
    await import("../verification/fa-release/verify-report.mjs");
  const dataset = await readLockedDataset();
  const verifier = fileURLToPath(new URL("../verification/fa-release/verify-report.mjs", import.meta.url));
  const temp = await mkdtemp(join(tmpdir(), "fa-review-gate-"));
  try {
    const input = join(temp, "review.json");
    const report = {
      schema: "fa-release-editorial-audit-result/v1",
      candidateSha: dataset.candidateSha,
      sourceBlobSha1: dataset.sourceBlobSha1,
      reviewer: "CLI fixture reviewer",
      competence: "fa-style-only",
      reviewedCount: 1,
      savedCount: 1,
      draftCount: 0,
      totalUnits: 141,
      releaseApproval: "NOT_GRANTED_BY_THIS_TOOL",
      results: { A01: { status: "approved", note: "", proposedReplacement: "" } }
    };
    await writeFile(input, JSON.stringify(report));
    const good = spawnSync(process.execPath, [verifier, input],
      { encoding: "utf8", timeout: 20000 });
    assert.equal(good.status, 0, good.stderr);
    const output = JSON.parse(good.stdout);
    assert.equal(output.structurallyValid, true);
    assert.equal(output.groups.A.reviewed, 1);
    assert.equal(output.coverageComplete, false);
    assert.deepEqual(output.missingReviewedUnitIds.slice(0, 3), ["A02", "A03", "A04"]);
    assert.equal(output.missingReviewedUnitIds.length, 140);
    assert.equal(output.claimedReviewScope, "PERSIAN_STYLE_SELF_REPORTED");
    assert.equal(output.provenanceCheckRequired, true,
      "missing backup provenance in a CLI report must be flagged, not assumed clean");
    assert.equal(output.humanLanguageSignoff, "NOT_VERIFIED");
    assert.equal(output.releaseApproval, "NOT_GRANTED_BY_THIS_TOOL");

    await writeFile(input, JSON.stringify({ ...report, reviewedCount: 141 }));
    const invalid = spawnSync(process.execPath, [verifier, input],
      { encoding: "utf8", timeout: 20000 });
    assert.equal(invalid.status, 2, invalid.stderr);
    assert.equal(JSON.parse(invalid.stdout).structurallyValid, false);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});


test("independent Persian review CLI checks actual locked source file bytes", async () => {
  const { mkdtemp, mkdir, writeFile, appendFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join, dirname, sep } = await import("node:path");
  const { pathToFileURL } = await import("node:url");
  const { readLockedDataset, assertLockedSourceFiles } =
    await import("../verification/fa-release/verify-report.mjs");
  const dataset = await readLockedDataset();
  await assert.rejects(
    () => assertLockedSourceFiles({ ...dataset, candidateSha: "0".repeat(40) }),
    /immutable source lock/);
  const firstPath = Object.keys(dataset.sourceBlobSha1)[0];
  await assert.rejects(
    () => assertLockedSourceFiles({
      ...dataset, sourceBlobSha1: {
        ...dataset.sourceBlobSha1, [firstPath]: "0".repeat(40)
      }
    }), /Embedded source blob map/);

  // Assemble an isolated checkout with the exact source blobs. Mutating one
  // byte must fail even when the embedded JSON still advertises correct hashes.
  const temp = await mkdtemp(join(tmpdir(), "fa-review-source-lock-"));
  try {
    for (const filename of Object.keys(dataset.sourceBlobSha1)) {
      const target = join(temp, filename);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, await readFile(new URL("../" + filename, import.meta.url)));
    }
    const root = pathToFileURL(temp + sep);
    await assertLockedSourceFiles(dataset, root);
    await appendFile(join(temp, firstPath), "\nTAMPERED_SOURCE\n");
    await assert.rejects(
      () => assertLockedSourceFiles(dataset, root),
      /Source file changed after content lock/);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});


test("independent reviewer rejects altered embedded 141-unit dataset and false group coverage", async () => {
  const { readLockedDataset, assertLockedReviewDataset, inspectReviewReport } =
    await import("../verification/fa-release/verify-report.mjs");
  const dataset = await readLockedDataset();
  assert.doesNotThrow(() => assertLockedReviewDataset(dataset));

  const results = Object.fromEntries(dataset.items.map(item =>
    [item.id, { status: "approved", note: "", proposedReplacement: "" }]));
  const report = {
    schema: "fa-release-editorial-audit-result/v1",
    candidateSha: dataset.candidateSha, sourceBlobSha1: dataset.sourceBlobSha1,
    results, reviewedCount: 141, savedCount: 141, draftCount: 0,
    totalUnits: 141, releaseApproval: "NOT_GRANTED_BY_THIS_TOOL"
  };
  assert.equal(inspectReviewReport(report, dataset).coverageComplete, true);

  // Previously the CLI said 141/141 covered despite A=15/16, B=65/64.
  const wrongGroup = JSON.parse(JSON.stringify(dataset));
  wrongGroup.items[0].kind = "B";
  assert.throws(() => assertLockedReviewDataset(wrongGroup), /unit layout/);
  const corruptSummary = inspectReviewReport(report, wrongGroup);
  assert.equal(corruptSummary.structurallyValid, false);
  assert.equal(corruptSummary.coverageComplete, false);
  assert.equal(corruptSummary.groups.A.reviewed, 16);
  assert.equal(corruptSummary.groups.B.reviewed, 64);
  assert.equal(corruptSummary.groups.B.missing, 0);
  assert.match(corruptSummary.errors.join(" "), /Untrusted reviewer dataset/);

  const duplicate = JSON.parse(JSON.stringify(dataset));
  duplicate.items[1].id = duplicate.items[0].id;
  assert.throws(() => assertLockedReviewDataset(duplicate), /unit layout/);
  assert.equal(inspectReviewReport(report, duplicate).coverageComplete, false);

  // Even a content-only change that preserves the IDs, kinds and original
  // source-file checksums must be rejected by the separately pinned SHA-256.
  const changedPersian = JSON.parse(JSON.stringify(dataset));
  changedPersian.items[0].fa += " متنِ تغییریافته";
  assert.throws(() => assertLockedReviewDataset(changedPersian), /SHA-256 mismatch/);
  assert.equal(inspectReviewReport(report, changedPersian).coverageComplete, false);

  const truncated = JSON.parse(JSON.stringify(dataset));
  truncated.items.pop();
  assert.throws(() => assertLockedReviewDataset(truncated), /structure or count/);
  assert.equal(inspectReviewReport(report, truncated).coverageComplete, false);
});
