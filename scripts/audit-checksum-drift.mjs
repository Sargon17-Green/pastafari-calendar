#!/usr/bin/env node
// Read-only SHA256SUMS provenance audit; never rewrites the manifest or tracked files.
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, realpath } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = await realpath(process.cwd());
const manifestName = process.argv[2] ?? 'SHA256SUMS.txt';
if (process.argv.length > 3 || manifestName.startsWith('-')) {
  console.error('Usage: node scripts/audit-checksum-drift.mjs [SHA256SUMS.txt]');
  process.exit(2);
}

function contained(target) {
  const relative = path.relative(root, target);
  return relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}
function git(args) {
  try {
    return execFileSync('git', ['-C', root, ...args], {
      encoding: 'utf8', timeout: 10000, maxBuffer: 65536, stdio: ['ignore', 'pipe', 'ignore'],
    }).trim() || null;
  } catch { return null; }
}
async function hashFile(filename) {
  const sha = createHash('sha256');
  for await (const chunk of createReadStream(filename)) sha.update(chunk);
  return sha.digest('hex');
}
function groupFor(filename) {
  if (filename.startsWith('docs/about/content/')) return 'about-content';
  if (filename.startsWith('docs/')) return 'website';
  if (filename.startsWith('test/')) return 'tests';
  if (filename.startsWith('artifacts/')) return 'artifacts';
  return 'other';
}

const report = {
  schemaVersion: 1, mode: 'read-only', head: git(['rev-parse', 'HEAD']),
  manifest: manifestName, checked: 0, matched: 0,
  mismatches: [], missing: [], invalid: [], categories: {},
};
try {
  const absoluteManifest = path.resolve(root, manifestName);
  if (!contained(absoluteManifest)) throw new Error('Manifest outside repository');
  const manifest = await readFile(absoluteManifest, 'utf8');
  const seen = new Set();
  const lines = manifest.split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (!line) continue;
    // GNU coreutils format: 64 hex bytes, one space, mode (' ' or '*'), filename.
    const match = /^([a-fA-F0-9]{64}) ([ *])(.+)$/.exec(line);
    if (!match || line.startsWith('\\')) {
      report.invalid.push({ line: index + 1, reason: 'Unrecognized SHA256SUMS line' });
      continue;
    }
    const [, expected, , filename] = match;
    const relativeName = filename.startsWith('./') ? filename.slice(2) : filename;
    const absolute = path.resolve(root, relativeName);
    if (!contained(absolute) || seen.has(relativeName)) {
      report.invalid.push({ line: index + 1, path: filename, reason: 'Unsafe or duplicate path' });
      continue;
    }
    seen.add(relativeName);
    report.checked++;
    let actual;
    try {
      const canonical = await realpath(absolute);
      if (!contained(canonical)) throw new Error('File resolves outside repository');
      actual = await hashFile(canonical);
    } catch (error) {
      report.missing.push({ line: index + 1, path: relativeName, reason: String(error.message) });
      continue;
    }
    if (actual.toLowerCase() === expected.toLowerCase()) {
      report.matched++;
      continue;
    }
    const group = groupFor(relativeName);
    report.categories[group] = (report.categories[group] ?? 0) + 1;
    report.mismatches.push({
      path: relativeName, expected: expected.toLowerCase(), actual, group,
      lastChange: git(['log', '-1', '--format=%h %cI %s', '--', relativeName]),
    });
  }
  report.mismatchCount = report.mismatches.length;
  report.missingCount = report.missing.length;
  report.invalidCount = report.invalid.length;
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.invalidCount || report.missingCount ? 2 : report.mismatchCount ? 1 : 0;
} catch (error) {
  console.error(JSON.stringify({ mode: 'read-only', error: String(error.message) }));
  process.exitCode = 2;
}
