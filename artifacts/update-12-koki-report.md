# Update 12 — Kōki proleptic normative support

## Baseline alignment

- Repository: `Sargon17-Green/pastafari-calendar`
- Aligned baseline commit: `1f33a5b66261f202082d9a2f1087ccfa1ff1ab51`
- Baseline package version: `1.3.0`
- Uploaded baseline: `pastafari-calendar-main(20260823-151507).zip`
- Update 11 Vikrama final files were preserved; no Update 11 production file was removed.

## Classification before repair

`B_KOKI_WAS_MISSING_COMPLETELY`

The aligned baseline exported the historical Japanese imperial representation but no Kōki API. The Japanese constructor rejected the Foundation discriminator as a non-positive imperial-era year, and the docs converter rejected calendar id `koki`.

## Normative convention

The Magillah Foundation discriminator is reproduced by the signed proleptic convention:

```text
Kōki year = proleptic Gregorian astronomical year + 660
Gregorian astronomical year = Kōki year - 660
```

Signed year numbering includes year zero. Kōki is kept separate from Meiji/Taishō/Shōwa/Heisei/Reiwa.

## Foundation proof

```text
Foundation linear day = -15055671
Foundation JDN        = -13334246
Gregorian             = -41221-12-22
Reference Kōki        = -40561-12-22
Node Kōki             = -40561-12-22
Browser side-door     = -40561-12-22
Docs adapter          = -40561-12-22
match                 = true
```

The historical candidate `-40561` is therefore confirmed exactly.

## Spaghetti mechanism

Kōki is implemented as a separate public side-door. Each conversion first sends a synthetic `era = "koki"` request through the unchanged legacy Japanese-imperial doorway. Its rejection is deliberately ignored. A shadow arithmetic layer then performs the normative signed proleptic conversion. The Meiji/Reiwa machinery, era table and any existing Intl path remain intact.

The authoritative browser core was deliberately restored byte-for-byte to the aligned baseline. Kōki is exposed from `browser/koki-api.js`, analogous to Update 11's separate Vikrama browser API. This avoids changing the standalone authoritative-worker input graph merely to expose an external calendar side-door.

## Differential and regression results

- Wide differential seed: `0x4b4f4b49`
- Wide differential checked: `12023`
- Random samples: `10000`
- Mismatches: `0`
- Update 11 + Update 12 focused tests: 16/16 PASS
- Update 11 full regression/audit: PASS; Foundation ±1000 days = 2001 samples, 0 mismatches; seeded random = 512 samples, 0 mismatches
- Fast suite excluding generated standalone rebuild: 217 PASS, 0 FAIL, 4 intentional SKIP
- Existing standalone structural tests: 3/3 PASS
- Package verification: PASS; temporary tarball installs with scripts disabled
- Intl fault injection: PASS in Node/reference audit; browser and Worker smoke include the same fault injection and are wired into CI

## Standalone and browser/Worker status

`browser/pastafari-calendar-core.js` is byte-for-byte identical to the aligned baseline, and both checked-in standalone bundles are byte-for-byte unchanged. The package version remains `1.3.0`. Therefore this delta does not alter the standalone source graph used by the public standalone API.

A real Chromium browser + module-Worker smoke is added as `test:update12:koki:browser` and is added to the existing browser CI job. It should be treated as CI verification after upload because the local container lacks the installed Playwright dependency/browser environment needed for the canonical project smoke runner.

## Performance and memory sanity

- Kōki → JDN: 70.854 µs/call in the audit run
- JDN → Kōki: 35.701 µs/call in the audit run
- Repeated calls: 40000
- Observed heap delta after GC: -50376 bytes

No unbounded wrapper/cache growth was observed.

## Acceptance state

```text
READY_FOR_UPLOAD_AND_CI = yes
UPDATE_12_NUMERIC_AND_NODE_AUDIT = PASS
UPDATE_12_BROWSER_WORKER_CI = pending upload/CI
UPDATE_12_FINAL_CLOSURE = pending CI
```

No production refactor was performed, no imperial era was removed, and no existing Vikrama API was removed or replaced.
