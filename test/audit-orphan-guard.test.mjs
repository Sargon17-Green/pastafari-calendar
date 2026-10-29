import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildChecksumManifest, verifyChecksumManifest } from "../scripts/release-lib.mjs";

const historicPath = ".github/workflows/one-shot-kyrgyz-complete-policy-fix-final.yml";
const historicHash = "0d5475295bd76170b365f42220f6cdb1be0c00fc1600500f15821f0513492067";
const frozenLine = `${historicHash}  ./${historicPath}\n`;

await test("one historical checksum exception, not a general orphan policy", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "pastafari-audit-orphan-"));
  try {
    await mkdir(path.join(root, "data"));
    await writeFile(path.join(root, "data", "actual.txt"), "original\n");
    const base = await buildChecksumManifest(root, { exclude: () => false });
    const input = frozenLine + base.text;
    const options = { exclude: () => false, manifestName: "SHA256SUMS.txt", allowHistoricalRootOrphan: true };
    const ok = await verifyChecksumManifest(root, input, options);
    assert.equal(ok.count, 2);
    await assert.rejects(verifyChecksumManifest(root, input + `${historicHash}  ./another-orphan.txt\n`, options), /another-orphan\.txt.*missing/s);
    await assert.rejects(verifyChecksumManifest(root, input.replace(base.entries[0].hash, "0".repeat(64)), options), /SHA-256 mismatch/);
    await assert.rejects(verifyChecksumManifest(root, input.replace(historicHash, "0".repeat(64)), options), /frozen historical SHA/);
    await assert.rejects(verifyChecksumManifest(root, input, { ...options, manifestName: "docs/SHA256SUMS.txt" }), /missing/);
    await assert.rejects(verifyChecksumManifest(root, input, { ...options, allowHistoricalRootOrphan: false }), /missing/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
