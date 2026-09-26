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

const ALLOWED_IDS = new Set([
  "about-calendar", "calculation", "structural-atlas", "appointments",
  "travel-and-all-day", "seer", "site-story", "reverse-conversion",
  "far-time-structure", "sauce-history",
]);

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index < 0 || index + 1 >= process.argv.length) throw new Error("Missing " + name);
  return process.argv[index + 1];
}

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

for (const [index, replacement] of parsed.replacements.entries()) {
  assert.ok(replacement.oldText.length > 0, "replacement " + (index + 1) + ": OLD is empty");
  assert.ok(!replacement.oldText.includes("\n"), "replacement " + (index + 1) + ": OLD must be exactly one physical line");
  assert.ok(!replacement.newText.includes("\n"), "replacement " + (index + 1) + ": NEW must be exactly one physical line");
  const count = html.split(replacement.oldText).length - 1;
  assert.equal(count, 1, "replacement " + (index + 1) + ": OLD must occur exactly once; got " + count);
  const start = html.indexOf(replacement.oldText);
  const section = sectionAt(html, start);
  assert.ok(section, "replacement " + (index + 1) + ": no containing stable section");
  assert.ok(ALLOWED_IDS.has(section), "replacement " + (index + 1) + ": section " + section + " is outside semantic-delta scope");
  assert.doesNotMatch(replacement.newText, /<(?:script|iframe|object)\b/i, "replacement " + (index + 1) + ": active HTML is forbidden");
  for (const stableId of EXPECTED_IDS) {
    assert.ok(!replacement.oldText.includes('id="' + stableId + '"'), "replacement " + (index + 1) + ": OLD must not include stable-ID wrapper");
    assert.ok(!replacement.newText.includes('id="' + stableId + '"'), "replacement " + (index + 1) + ": NEW must not include stable-ID wrapper");
  }
  html = html.replace(replacement.oldText, replacement.newText);
  touched.push(section);
}

if (parsed.verdict === "ALREADY_ALIGNED") assert.equal(html, original, "ALREADY_ALIGNED unexpectedly changed content");
if (parsed.verdict === "CHANGED") assert.notEqual(html, original, "CHANGED produced no content difference");
assert.deepEqual(idsIn(html), originalIds, "stable-ID contract changed during delta");
assert.doesNotMatch(html, /<(?:script|iframe|object)\b/i, "article contains active HTML after delta");

await writeFile(file, html);
await writeFile(reportFile, JSON.stringify({
  verdict: parsed.verdict,
  replacement_count: parsed.replacements.length,
  touched_sections: [...new Set(touched)],
}, null, 2) + "\n");
