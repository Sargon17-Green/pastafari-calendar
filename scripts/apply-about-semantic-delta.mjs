import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const EXPECTED_IDS = Object.freeze([
  "about-calendar", "date-parts", "working-day", "day-identity", "year-5000",
  "years-and-gates", "cutlets", "months-and-weaving", "month-interleaving",
  "next-day-in-month", "no-weeks", "canonical-names", "month-day-pairs",
  "calculation", "short-and-wide-choice", "structural-atlas", "anniversaries",
  "appointments", "travel-and-all-day", "day-boundary", "printed-calendar",
  "seer", "foundation-and-tablets", "anchors", "site-story", "reverse-conversion",
  "far-time-structure", "sauce-history", "summary",
]);

const DEFAULT_ALLOWED_IDS = Object.freeze([
  "about-calendar", "months-and-weaving", "calculation", "structural-atlas",
  "appointments", "travel-and-all-day", "seer", "foundation-and-tablets",
  "site-story", "reverse-conversion", "far-time-structure", "sauce-history",
]);

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index < 0 || index + 1 >= process.argv.length) throw new Error("Missing " + name);
  return process.argv[index + 1];
}

function optionalArg(name) {
  const index = process.argv.indexOf(name);
  if (index < 0) return null;
  if (index + 1 >= process.argv.length) throw new Error("Missing value for " + name);
  return process.argv[index + 1];
}

const allowedIds = optionalArg("--allowed-ids")
  ? optionalArg("--allowed-ids").split(",").map((value) => value.trim()).filter(Boolean)
  : [...DEFAULT_ALLOWED_IDS];
for (const id of allowedIds) assert.ok(EXPECTED_IDS.includes(id), "Unknown allowed section: " + id);
const ALLOWED_IDS = new Set(allowedIds);

function idsIn(html) {
  return [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]).filter((id) => EXPECTED_IDS.includes(id));
}

function sectionAt(html, offset) {
  let best = null;
  for (const id of EXPECTED_IDS) {
    const needle = 'id="' + id + '"';
    const pos = html.indexOf(needle);
    assert.notEqual(pos, -1, id + ": stable ID missing before delta");
    if (pos < offset && (!best || pos > best.pos)) best = { id, pos };
  }
  return best?.id ?? null;
}

function parseResponse(text) {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trimEnd();
  const firstBreak = normalized.indexOf("\n");
  const first = (firstBreak < 0 ? normalized : normalized.slice(0, firstBreak)).trim();
  const rest = firstBreak < 0 ? "" : normalized.slice(firstBreak + 1);
  if (first === "SEMANTIC_DELTA_RESULT: ALREADY_ALIGNED") {
    if (rest.trim()) throw new Error("ALREADY_ALIGNED response must contain no extra text");
    return { verdict: "ALREADY_ALIGNED", replacements: [] };
  }
  if (first !== "SEMANTIC_DELTA_RESULT: CHANGED") throw new Error("Unexpected first line: " + first);
  const re = /<<<REPLACEMENT>>>\n<<<OLD>>>\n([\s\S]*?)\n<<<NEW>>>\n([\s\S]*?)\n<<<END>>>(?:\n|$)/g;
  const replacements = [];
  let match;
  let cursor = 0;
  while ((match = re.exec(rest))) {
    if (rest.slice(cursor, match.index).trim()) throw new Error("Unexpected text between replacement blocks");
    replacements.push({ oldText: match[1], newText: match[2] });
    cursor = re.lastIndex;
  }
  if (!replacements.length) throw new Error("CHANGED response contains no replacement blocks");
  if (rest.slice(cursor).trim()) throw new Error("Unexpected trailing text after replacement blocks");
  return { verdict: "CHANGED", replacements };
}

const file = arg("--file");
const responseFile = arg("--response");
const reportFile = arg("--report");
let html = await readFile(file, "utf8");
const original = html;
const originalIds = idsIn(original);
assert.deepEqual(originalIds, EXPECTED_IDS, "stable-ID contract is already broken before applying delta");
const parsed = parseResponse(await readFile(responseFile, "utf8"));
const touched = [];
const skipped = [];
let appliedCount = 0;

for (const [index, replacement] of parsed.replacements.entries()) {
  assert.ok(replacement.oldText.length > 0, "replacement " + (index + 1) + ": OLD is empty");
  assert.ok(!replacement.oldText.includes("\n"), "replacement " + (index + 1) + ": OLD must be exactly one physical line");
  assert.ok(!replacement.newText.includes("\n"), "replacement " + (index + 1) + ": NEW must be exactly one physical line");
  const count = html.split(replacement.oldText).length - 1;
  if (count !== 1) {
    skipped.push({ index: index + 1, reason: "old-occurrence-count", count });
    continue;
  }
  const start = html.indexOf(replacement.oldText);
  const stableIdsInOld = EXPECTED_IDS.filter((stableId) => replacement.oldText.includes('id="' + stableId + '"'));
  const stableIdsInNew = EXPECTED_IDS.filter((stableId) => replacement.newText.includes('id="' + stableId + '"'));
  if (stableIdsInOld.length > 1 || stableIdsInNew.length > 1) {
    skipped.push({ index: index + 1, reason: "multiple-stable-id-wrappers", oldIds: stableIdsInOld, newIds: stableIdsInNew });
    continue;
  }
  let section;
  if (stableIdsInOld.length === 1) {
    section = stableIdsInOld[0];
    if (stableIdsInNew.length !== 1 || stableIdsInNew[0] !== section) {
      skipped.push({ index: index + 1, reason: "stable-id-wrapper-not-preserved", section, newIds: stableIdsInNew });
      continue;
    }
    const oldNeedle = 'id="' + section + '"';
    const newNeedle = 'id="' + section + '"';
    assert.equal(replacement.oldText.split(oldNeedle).length - 1, 1, "replacement " + (index + 1) + ": OLD stable ID must occur exactly once");
    assert.equal(replacement.newText.split(newNeedle).length - 1, 1, "replacement " + (index + 1) + ": NEW stable ID must occur exactly once");
  } else {
    if (stableIdsInNew.length !== 0) {
      skipped.push({ index: index + 1, reason: "stable-id-wrapper-introduced", newIds: stableIdsInNew });
      continue;
    }
    section = sectionAt(html, start);
  }
  if (!section || !ALLOWED_IDS.has(section)) {
    skipped.push({ index: index + 1, reason: section ? "outside-semantic-delta-scope" : "no-containing-stable-section", section });
    continue;
  }
  assert.doesNotMatch(replacement.newText, /<(?:script|iframe|object)\b/i, "replacement " + (index + 1) + ": active HTML is forbidden");
  html = html.replace(replacement.oldText, replacement.newText);
  touched.push(section);
  appliedCount += 1;
}

if (parsed.verdict === "ALREADY_ALIGNED") assert.equal(html, original, "ALREADY_ALIGNED unexpectedly changed content");
if (appliedCount > 0) assert.notEqual(html, original, "applied replacements produced no content difference");
assert.deepEqual(idsIn(html), originalIds, "stable-ID contract changed during delta");
assert.doesNotMatch(html, /<(?:script|iframe|object)\b/i, "article contains active HTML after delta");

await writeFile(file, html);
const effectiveVerdict = parsed.verdict === "ALREADY_ALIGNED"
  ? "ALREADY_ALIGNED"
  : appliedCount > 0 ? "CHANGED" : "RETRY_REQUIRED";
await writeFile(reportFile, JSON.stringify({
  verdict: effectiveVerdict,
  proposed_replacement_count: parsed.replacements.length,
  replacement_count: appliedCount,
  skipped_replacement_count: skipped.length,
  skipped_replacements: skipped,
  touched_sections: [...new Set(touched)],
}, null, 2) + "\n");
process.stdout.write(effectiveVerdict + "\n");
