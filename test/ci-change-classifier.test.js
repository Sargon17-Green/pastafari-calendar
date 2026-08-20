"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import { classifyEvent, classifyPaths, fullClassification } from "../scripts/ci-change-classifier.mjs";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

function jobs(paths) {
  return classifyPaths(paths).jobs;
}

function categories(paths) {
  return classifyPaths(paths).categories;
}

test("engine changes enable the broad correctness, browser, performance, visual, and implementation gates", () => {
  const result = classifyPaths(["src/public-api.js"]);
  assert.equal(result.all, false);
  for (const key of [
    "node_compatibility",
    "node_deep",
    "browser_smoke",
    "checkpoint_test",
    "pwa_offline",
    "node_minimum",
    "performance_regression",
    "benchmark_smoke",
    "memory_smoke",
    "visual_regression",
    "impl_python_job",
    "impl_c_job",
    "impl_cpp_job",
    "impl_java_job",
    "impl_ruby_job",
    "impl_cobol_job",
    "impl_gate_job",
  ]) {
    assert.equal(result.jobs[key], true, key);
  }
});

test("CSS-only UI changes avoid algorithmic compatibility, deep, checkpoint, performance, and native implementation jobs", () => {
  const result = jobs(["docs/styles.css"]);
  assert.equal(result.browser_smoke, true);
  assert.equal(result.accessibility, true);
  assert.equal(result.pwa_offline, true);
  assert.equal(result.visual_regression, true);
  assert.equal(result.node_compatibility, false);
  assert.equal(result.node_deep, false);
  assert.equal(result.checkpoint_test, false);
  assert.equal(result.performance_regression, false);
  assert.equal(result.impl_python_job, false);
});

test("locale-only changes run i18n-relevant browser gates but not algorithmic heavy gates", () => {
  const result = classifyPaths(["docs/i18n/locales/ar.js"]);
  assert.equal(result.categories.i18n, true);
  assert.equal(result.jobs.browser_smoke, true);
  assert.equal(result.jobs.accessibility, true);
  assert.equal(result.jobs.pwa_offline, true);
  assert.equal(result.jobs.visual_regression, true);
  assert.equal(result.jobs.node_compatibility, false);
  assert.equal(result.jobs.node_deep, false);
  assert.equal(result.jobs.performance_regression, false);
  assert.equal(result.jobs.memory_smoke, false);
});

test("documentation-only changes leave specialized jobs disabled", () => {
  const result = classifyPaths(["README.md", "docs/ASTRONOMICAL-DAY.md"]);
  assert.equal(result.all, false);
  assert.equal(result.categories.documentation, true);
  assert.ok(Object.values(result.jobs).every((value) => value === false));
});

test("workflow changes force conservative full CI", () => {
  const result = classifyPaths([".github/workflows/test.yml"]);
  assert.equal(result.categories.ci_tooling, true);
  assert.equal(result.all, true);
  assert.ok(Object.values(result.jobs).every(Boolean));
});

test("package.json changes force conservative full CI and packaging coverage", () => {
  const result = classifyPaths(["package.json"]);
  assert.equal(result.categories.packaging, true);
  assert.equal(result.categories.ci_tooling, true);
  assert.equal(result.all, true);
  assert.ok(Object.values(result.jobs).every(Boolean));
});

test("mixed UI and engine changes take the union and therefore include engine-heavy gates", () => {
  const result = classifyPaths(["docs/styles.css", "browser/pastafari-calendar-fast.js"]);
  assert.equal(result.categories.browser_ui, true);
  assert.equal(result.categories.engine, true);
  assert.equal(result.jobs.node_deep, true);
  assert.equal(result.jobs.performance_regression, true);
  assert.equal(result.jobs.visual_regression, true);
});

test("manual classification is full by default", () => {
  const result = fullClassification("workflow_dispatch");
  assert.equal(result.all, true);
  assert.ok(Object.values(result.categories).every(Boolean));
  assert.ok(Object.values(result.jobs).every(Boolean));
});

test("PR and push resolve the complete changed-file range through the same policy", () => {
  const cwd = mkdtempSync(path.join(tmpdir(), "pastafari-ci-classifier-"));
  execFileSync("git", ["init", "-q"], { cwd });
  execFileSync("git", ["config", "user.email", "ci@example.invalid"], { cwd });
  execFileSync("git", ["config", "user.name", "CI classifier test"], { cwd });
  writeFileSync(path.join(cwd, "README.md"), "base\n");
  execFileSync("git", ["add", "README.md"], { cwd });
  execFileSync("git", ["commit", "-qm", "base"], { cwd });
  const base = execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim();
  writeFileSync(path.join(cwd, "README.md"), "changed\n");
  execFileSync("git", ["add", "README.md"], { cwd });
  execFileSync("git", ["commit", "-qm", "docs"], { cwd });
  const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim();

  const push = classifyEvent({ event: "push", base, head, cwd });
  const pr = classifyEvent({ event: "pull_request", base, head, cwd });
  assert.deepEqual(push.paths, ["README.md"]);
  assert.deepEqual(pr.paths, ["README.md"]);
  assert.deepEqual(push.jobs, pr.jobs);
  assert.ok(Object.values(push.jobs).every((value) => value === false));
});


test("checksum manifest updates do not erase the selectivity of the files they accompany", () => {
  const result = classifyPaths(["README.md", "SHA256SUMS.txt"]);
  assert.equal(result.all, false);
  assert.ok(Object.values(result.jobs).every((value) => value === false));
});

test("benchmark-only changes stay within benchmark and memory/performance gates", () => {
  const result = classifyPaths(["benchmarks/smoke.mjs"]);
  assert.equal(result.all, false);
  assert.equal(result.jobs.benchmark_smoke, true);
  assert.equal(result.jobs.memory_smoke, true);
  assert.equal(result.jobs.performance_regression, true);
  assert.equal(result.jobs.node_deep, false);
  assert.equal(result.jobs.impl_python_job, false);
});

test("unknown paths fail safe by forcing every specialized job", () => {
  const result = classifyPaths(["future-subsystem/opaque.bin"]);
  assert.equal(result.all, true);
  assert.deepEqual(result.unknown, ["future-subsystem/opaque.bin"]);
  assert.ok(Object.values(result.jobs).every(Boolean));
});

test("language-specific implementation changes do not fan out to unrelated implementations", () => {
  const result = jobs(["implementations/ruby/pastafari_calendar.rb"]);
  assert.equal(result.impl_ruby_job, true);
  assert.equal(result.impl_python_job, false);
  assert.equal(result.impl_c_job, false);
  assert.equal(result.impl_gate_job, true);
});

test("shared implementation vectors fan out to every implementation", () => {
  const result = jobs(["implementations/tests/conformance-vectors.json"]);
  for (const key of [
    "impl_python_job",
    "impl_c_job",
    "impl_cpp_job",
    "impl_java_job",
    "impl_ruby_job",
    "impl_cobol_job",
    "impl_gate_job",
  ]) assert.equal(result[key], true, key);
});

test("astronomical day-boundary assets enable the dedicated browser gate without engine benchmarks", () => {
  const c = categories(["docs/venus-day-boundary.js"]);
  const j = jobs(["docs/venus-day-boundary.js"]);
  assert.equal(c.day_boundary, true);
  assert.equal(j.day_boundary_job, true);
  assert.equal(j.browser_smoke, true);
  assert.equal(j.pwa_offline, true);
  assert.equal(j.performance_regression, false);
});
