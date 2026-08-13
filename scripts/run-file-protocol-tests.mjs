"use strict";

import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { chromium, firefox } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE_SMOKE_URL = pathToFileURL(path.join(ROOT, "test", "file-protocol-smoke.html")).href;
const TEST_TIMEOUT_MS = 600_000;
const FIELDS = Object.freeze([
  "year",
  "cutletName",
  "dayInCutlet",
  "monthName",
  "dayInMonth",
]);

const MIME_TYPES = Object.freeze({
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
});

function requestedBrowsers() {
  const cli = process.argv.find((argument) => argument.startsWith("--browser="));
  const value = cli?.slice("--browser=".length)
    ?? process.env.PASTAFARI_TEST_BROWSERS
    ?? "chromium,firefox";
  const names = [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))];
  for (const name of names) {
    if (!Object.hasOwn({ chromium, firefox }, name)) {
      throw new Error(`Unsupported browser ${name}; use chromium and/or firefox.`);
    }
  }
  return names;
}

function customExecutable(name) {
  return name === "chromium"
    ? process.env.PASTAFARI_CHROMIUM_EXECUTABLE
    : process.env.PASTAFARI_FIREFOX_EXECUTABLE;
}

function customArguments(name) {
  const raw = name === "chromium"
    ? process.env.PASTAFARI_CHROMIUM_ARGS
    : process.env.PASTAFARI_FIREFOX_ARGS;
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
    throw new TypeError(`PASTAFARI_${name.toUpperCase()}_ARGS must be a JSON string array.`);
  }
  return parsed;
}

async function launchBrowser(name) {
  const browserType = { chromium, firefox }[name];
  const customPath = customExecutable(name);
  const executablePath = customPath || browserType.executablePath();
  try {
    await access(executablePath);
  } catch {
    throw new Error(
      `${name} executable was not found at ${executablePath}. Run "npx playwright install ${name}" or set PASTAFARI_${name.toUpperCase()}_EXECUTABLE.`,
    );
  }

  return browserType.launch({
    executablePath,
    headless: true,
    args: customArguments(name)
      ?? (name === "chromium" && customPath ? ["--no-sandbox"] : []),
  });
}

function startStaticServer() {
  const server = createServer(async (request, response) => {
    const rawUrl = request.url || "/";
    let pathname = rawUrl;

    try {
      const url = new URL(rawUrl, "http://127.0.0.1");
      pathname = decodeURIComponent(url.pathname);
      const candidate = path.resolve(ROOT, `.${pathname}`);
      if (candidate !== ROOT && !candidate.startsWith(`${ROOT}${path.sep}`)) {
        process.stderr.write(
          `[file-protocol-static-server] 403 ${request.method || "GET"} ${pathname}\n`,
        );
        response.writeHead(403).end("Forbidden");
        return;
      }

      const info = await stat(candidate);
      if (!info.isFile()) {
        process.stderr.write(
          `[file-protocol-static-server] 404 ${request.method || "GET"} ${pathname}\n`,
        );
        response.writeHead(404).end("Not found");
        return;
      }

      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Length": info.size,
        "Content-Type": MIME_TYPES[path.extname(candidate)] || "application/octet-stream",
      });
      createReadStream(candidate).pipe(response);
    } catch (error) {
      process.stderr.write(
        `[file-protocol-static-server] 404 ${request.method || "GET"} ${pathname}`
          + ` :: ${error?.code || error?.name || "Error"}: ${error?.message || String(error)}\n`,
      );
      response.writeHead(404).end("Not found");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({
        server,
        origin: `http://127.0.0.1:${address.port}`,
      });
    });
  });
}

async function readCompleted(page, globalName) {
  await page.waitForFunction(
    (name) => globalThis[name]?.complete === true,
    globalName,
    { timeout: TEST_TIMEOUT_MS },
  );
  return page.evaluate((name) => globalThis[name], globalName);
}

function canonical(value) {
  return Object.fromEntries(FIELDS.map((field) => [field, value[field]]));
}

async function runStandardVectors(browser, origin) {
  const context = await browser.newContext({ serviceWorkers: "block" });
  const page = await context.newPage();
  const errors = [];
  const httpErrors = [];
  page.on("pageerror", (error) => errors.push(error.stack || error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console.error: ${message.text()}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      httpErrors.push(`HTTP ${response.status()} ${response.url()}`);
    }
  });

  try {
    await page.goto(`${origin}/test/standard-equivalence.html`, {
      timeout: TEST_TIMEOUT_MS,
      waitUntil: "load",
    });
    const result = await readCompleted(page, "__PASTAFARI_STANDARD_EQUIVALENCE__");
    assert.equal(result.error, undefined, result.error);
    assert.equal(result.vectors.length, 25);
    assert.deepEqual(httpErrors, []);
    assert.deepEqual(errors, []);
    return result.vectors;
  } finally {
    await context.close();
  }
}

async function runFileSmoke(browser, standardVectors, bundle) {
  const fileUrl = new URL(FILE_SMOKE_URL);
  if (bundle === "pastafari-date.min.js") fileUrl.searchParams.set("bundle", "min");
  const context = await browser.newContext({
    offline: true,
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  const remoteRequests = [];
  const pageErrors = [];
  page.on("request", (request) => {
    if (/^https?:/u.test(request.url())) remoteRequests.push(request.url());
  });
  page.on("pageerror", (error) => pageErrors.push(error.stack || error.message));
  page.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(`console.error: ${message.text()}`);
  });
  await context.route(/^https?:/u, (route) => route.abort("internetdisconnected"));

  try {
    await page.goto(fileUrl.href, {
      timeout: TEST_TIMEOUT_MS,
      waitUntil: "load",
    });
    const smoke = await readCompleted(page, "__PASTAFARI_FILE_SMOKE_RESULT__");
    assert.equal(smoke.protocol, "file:");
    assert.equal(smoke.failed, 0, smoke.fatalError || JSON.stringify(smoke.outcomes));
    assert.equal(smoke.passed, 15);
    assert.deepEqual(smoke.networkAttempts, []);
    assert.deepEqual(smoke.errors, []);
    assert.deepEqual(remoteRequests, []);
    assert.deepEqual(pageErrors, []);

    const standaloneVectors = await page.evaluate(async (vectors) => {
      const fields = ["year", "cutletName", "dayInCutlet", "monthName", "dayInMonth"];
      const output = [];
      for (const vector of vectors) {
        const value = await globalThis.PastafariCalendarStandalone.getPastafariDateAsync(
          vector.targetDate,
          vector.calculationDate,
        );
        output.push({
          offset: vector.offset,
          targetDate: vector.targetDate,
          calculationDate: vector.calculationDate,
          value: Object.fromEntries(fields.map((field) => [field, value[field]])),
        });
      }
      return output;
    }, standardVectors);

    assert.equal(standaloneVectors.length, standardVectors.length);
    for (let index = 0; index < standardVectors.length; index += 1) {
      assert.deepEqual(
        canonical(standaloneVectors[index].value),
        canonical(standardVectors[index].value),
        `Standalone mismatch for ${standardVectors[index].targetDate} / ${standardVectors[index].calculationDate}`,
      );
    }

    return {
      bundle,
      fileUrl: fileUrl.href,
      offline: true,
      smokeTests: smoke.passed,
      equivalentVectors: standaloneVectors.length,
      remoteRequests: remoteRequests.length,
    };
  } finally {
    await context.close();
  }
}

const names = requestedBrowsers();
const { server, origin } = await startStaticServer();
const summaries = [];

try {
  for (const name of names) {
    const standardBrowser = await launchBrowser(name);
    let standardVectors;
    try {
      standardVectors = await runStandardVectors(standardBrowser, origin);
    } finally {
      await standardBrowser.close().catch(() => {});
    }

    const files = [];
    for (const bundle of ["pastafari-date.js", "pastafari-date.min.js"]) {
      const fileBrowser = await launchBrowser(name);
      try {
        files.push(await runFileSmoke(fileBrowser, standardVectors, bundle));
      } finally {
        await fileBrowser.close().catch(() => {});
      }
    }
    summaries.push({ browser: name, files });
  }
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

process.stdout.write(`${JSON.stringify({ passed: true, browsers: summaries }, null, 2)}\n`);
