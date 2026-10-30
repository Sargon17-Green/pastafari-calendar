"use strict";

// Read-only forensic audit: never regenerates or edits SHA256SUMS.txt.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createReadStream } from "node:fs";
import { lstat, mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function classify(relative) {
  if (relative.startsWith("docs/about/content/")) return "about_content";
  if (relative.startsWith("docs/")) return "docs_other";
  if (relative.startsWith("test/")) return "tests";
  if (relative.startsWith("artifacts/")) return "artifacts";
  return "other";
}

function parseManifest(text) {
  const result = [];
  const seen = new Set();
  for (const [i, raw] of text.split(/\r?\n/u).entries()) {
    if (!raw) continue;
    const match = /^([a-fA-F0-9]{64}) ([ *])(.+)$/u.exec(raw);
    if (!match) throw new Error(`Invalid SHA256SUMS line ${i + 1}`);
    const literal = match[3];
    if (literal.startsWith("\\")) throw new Error(`Unsupported escaped filename, line ${i + 1}`);
    const relative = literal.startsWith("./") ? literal.slice(2) : literal;
    if (!relative || path.isAbsolute(relative) || relative.split("/").includes("..") ||
        relative.includes("\\") || relative.includes("\0")) {
      throw new Error(`Unsafe filename in SHA256SUMS line ${i + 1}`);
    }
    if (seen.has(relative)) throw new Error(`Duplicate SHA256SUMS entry: ${relative}`);
    seen.add(relative);
    result.push({ path: relative, expected: match[1].toLowerCase(), line: i + 1 });
  }
  return result;
}

function gitLastCommit(root, name) {
  try {
    const result = execFileSync("git", ["-C", root, "log", "-1",
      "--format=%H%x09%cI%x09%s", "HEAD", "--", name], {
      encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 12000,
    }).trim();
    if (!result) return null;
    const [sha, date, ...subject] = result.split("\t");
    return { sha, date, subject: subject.join("\t") };
  } catch {
    return null; // Absence of history is recorded, never treated as approval.
  }
}

async function sha256(filename) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filename)) hash.update(chunk);
  return hash.digest("hex");
}

async function audit(root, manifest, history = true) {
  const rootReal = await realpath(root);
  const manifestAbs = path.resolve(rootReal, manifest);
  if (!manifestAbs.startsWith(rootReal + path.sep)) throw new Error("Manifest outside repository");
  const records = parseManifest(await readFile(manifestAbs, "utf8"));
  const mismatches = [];
  const missing = [];
  let matched = 0;
  for (const record of records) {
    const target = path.resolve(rootReal, record.path);
    if (!target.startsWith(rootReal + path.sep)) throw new Error(`Escaping manifest path: ${record.path}`);
    let info;
    try {
      info = await lstat(target);
    } catch (err) {
      if (err?.code !== "ENOENT") throw err;
      missing.push({ path: record.path, manifest_line: record.line });
      continue;
    }
    if (!info.isFile() || info.isSymbolicLink()) {
      missing.push({ path: record.path, manifest_line: record.line, reason: "non-regular" });
      continue;
    }
    const actual = await sha256(target);
    if (actual === record.expected) { matched++; continue; }
    mismatches.push({
      path: record.path,
      category: classify(record.path),
      manifest_line: record.line,
      expected_sha256: record.expected,
      actual_sha256: actual,
      // Never infer content authorization from a commit subject or timestamp.
      content_approved: "NOT_DETERMINED",
      last_file_commit: history ? gitLastCommit(rootReal, record.path) : null,
    });
  }
  const groups = { about_content: 0, docs_other: 0, tests: 0, artifacts: 0, other: 0 };
  for (const x of mismatches) groups[x.category]++;
  const manifestCommit = history ? gitLastCommit(rootReal, manifest) : null;
  return {
    verdict: mismatches.length || missing.length ? "UNRESOLVED_PROVENANCE" : "INTEGRITY_MATCH",
    audited_head: history ? (() => { try { return execFileSync("git", ["-C", rootReal, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(); } catch { return null; } })() : null,
    manifest, manifest_last_commit: manifestCommit,
    manifest_entries: records.length, matched, mismatch_count: mismatches.length,
    missing_count: missing.length, categories: groups, missing, mismatches,
    warning: "Hash mismatch is NOT evidence that a content edit is approved. Do not update manifests or visual baselines automatically.",
  };
}

async function selfTest() {
  const root = await mkdtemp(path.join(tmpdir(), "checksum-forensics-"));
  try {
    await writeFile(path.join(root, "unchanged.txt"), "hello\n");
    await writeFile(path.join(root, "changed.txt"), "new\n");
    const good = createHash("sha256").update("hello\n").digest("hex");
    const stale = createHash("sha256").update("old\n").digest("hex");
    await writeFile(path.join(root, "SHA256SUMS.txt"), `${good}  ./unchanged.txt
${stale}  ./changed.txt
`);
    const result = await audit(root, "SHA256SUMS.txt", false);
    assert.equal(result.manifest_entries, 2);
    assert.equal(result.matched, 1);
    assert.equal(result.mismatch_count, 1);
    assert.equal(result.missing_count, 0);
    assert.equal(result.mismatches[0].path, "changed.txt");
    assert.equal(result.mismatches[0].content_approved, "NOT_DETERMINED");
    assert.throws(() => parseManifest(`${good}  ./x
${good}  ./x
`), /Duplicate/);
    assert.throws(() => parseManifest(`${good}  ../escape
`), /Unsafe/);
    assert.throws(() => parseManifest("not a sha line"), /Invalid/);
    process.stdout.write("FORENSIC_SELF_TEST_PASS cases=7\n");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--self-test") { await selfTest(); return; }
  if (args.length || !process.argv[1]) {
    throw new Error("Usage: node scripts/audit-checksum-provenance.mjs [--self-test]");
  }
  const result = await audit(DEFAULT_ROOT, "SHA256SUMS.txt");
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
}

main().catch(err => {
  process.stderr.write(`FORENSIC_AUDIT_ERROR ${err?.stack || String(err)}
`);
  process.exitCode = 1;
});
