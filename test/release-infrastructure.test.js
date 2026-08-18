"use strict";

import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  assertGeneratedArtifactMatches,
  assertReproducibleArtifacts,
  buildChecksumManifest,
  computeServiceWorkerCoreDigest,
  sha256Buffer,
  validatePackageFileSet,
  validateServiceWorkerBaseline,
  validateTagVersion,
  verifyChecksumManifest,
} from "../scripts/release-lib.mjs";

async function withTemporaryDirectory(prefix, callback) {
  const root = await mkdtemp(path.join(tmpdir(), prefix));
  try {
    return await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("generated artifact drift is rejected with the artifact name", () => {
  assert.throws(
    () => assertGeneratedArtifactMatches(
      "browser/standalone/pastafari-date.js",
      Buffer.from("generated"),
      Buffer.from("manually edited"),
    ),
    /browser\/standalone\/pastafari-date\.js has generated-file drift/u,
  );
});

test("checksum verification rejects a modified file", async () => {
  await withTemporaryDirectory("pastafari-checksum-test-", async (root) => {
    await writeFile(path.join(root, "alpha.txt"), "one\n", "utf8");
    const manifest = await buildChecksumManifest(root, { exclude: () => false });
    await writeFile(path.join(root, "alpha.txt"), "two\n", "utf8");
    await assert.rejects(
      verifyChecksumManifest(root, manifest.text, {
        exclude: (relative) => relative === "manifest.txt",
        manifestName: "manifest.txt",
      }),
      /alpha\.txt: SHA-256 mismatch/u,
    );
  });
});

test("package validation rejects a missing explicit export target", () => {
  const fixture = {
    main: "./index.js",
    exports: {
      ".": "./index.js",
      "./missing": "./missing.js",
    },
  };
  assert.throws(
    () => validatePackageFileSet(fixture, ["index.js", "package.json"]),
    /Export \.\/missing target is missing/u,
  );
});

test("reproducibility comparison rejects different bytes from two builds", () => {
  const first = new Map([["artifact.js", Buffer.from("stable-a")]]);
  const second = new Map([["artifact.js", Buffer.from("stable-b")]]);
  assert.throws(
    () => assertReproducibleArtifacts(first, second, "fixture build"),
    /artifact\.js is not reproducible byte-for-byte/u,
  );
});

test("tag validation rejects a package version mismatch", () => {
  assert.deepEqual(validateTagVersion("v1.3.0", "1.3.0"), {
    checked: true,
    tag: "v1.3.0",
    version: "1.3.0",
  });
  assert.throws(
    () => validateTagVersion("v1.3.1", "1.3.0"),
    /Tag\/package version mismatch/u,
  );
});

test("PWA cache validation rejects changed core bytes without a VERSION bump", async () => {
  await withTemporaryDirectory("pastafari-pwa-test-", async (docsRoot) => {
    await mkdir(path.join(docsRoot, "assets"), { recursive: true });
    await writeFile(path.join(docsRoot, "assets", "app.js"), "v1\n", "utf8");
    const sw = `const VERSION = "cache-v1";\nconst CORE_ASSETS = ["./assets/app.js?v=1"];\n`;
    const initial = await computeServiceWorkerCoreDigest(docsRoot, sw);
    const baseline = {
      version: initial.version,
      coreAssetsSha256: initial.coreAssetsSha256,
    };

    await writeFile(path.join(docsRoot, "assets", "app.js"), "v2\n", "utf8");
    const changed = await computeServiceWorkerCoreDigest(docsRoot, sw);
    assert.throws(
      () => validateServiceWorkerBaseline(changed, baseline, { mode: "prepare" }),
      /core assets changed but docs\/sw\.js VERSION did not/u,
    );

    const bumpedSw = sw.replace("cache-v1", "cache-v2");
    const bumped = await computeServiceWorkerCoreDigest(docsRoot, bumpedSw);
    const result = validateServiceWorkerBaseline(bumped, baseline, { mode: "prepare" });
    assert.equal(result.changed, true);
    assert.equal(result.nextBaseline.version, "cache-v2");
    assert.equal(
      result.nextBaseline.coreAssetsSha256,
      sha256Buffer(Buffer.from(`./assets/app.js?v=1\0${sha256Buffer(Buffer.from("v2\n"))}\n`)),
    );
  });
});

test("checksum parser detects an extra repository file missing from the manifest", async () => {
  await withTemporaryDirectory("pastafari-checksum-extra-", async (root) => {
    await writeFile(path.join(root, "alpha.txt"), "alpha\n", "utf8");
    const manifest = await buildChecksumManifest(root, { exclude: () => false });
    await writeFile(path.join(root, "beta.txt"), "beta\n", "utf8");
    await assert.rejects(
      verifyChecksumManifest(root, manifest.text, {
        exclude: () => false,
        manifestName: "fixture.txt",
      }),
      /beta\.txt: file is not listed/u,
    );
  });
});
