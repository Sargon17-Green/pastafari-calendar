# Web i18n support levels

This document defines what it means for the Web UI to support a locale. A JavaScript locale file by itself is not evidence of complete language support.

## Source of truth

`docs/i18n/registry.js` is the single source of truth for locale support metadata. Every registered locale has exactly one `support` value:

- `complete`
- `partial`
- `experimental`

The legacy-style `experimental` property exposed by registry metadata is derived from `support === "experimental"`; it is not independently configured. Locale source modules must not declare `support`.

## Resource groups

Support-level validation covers all user-facing resource groups currently known to the i18n layer:

1. `messages` — normal UI, reverse search, errors, accessibility labels, comparison, year overview, the stale-current-day warning, the Kisurra location assumption, the “use device location” label and other interface text;
2. `terminology` — named quantities used by the calendar documentation/UI;
3. `calendar.cutlets` — every stable cutlet identifier;
4. `calendar.months` — every stable month identifier;
5. Web App Manifest localization — localized name, short name and description metadata. Manifest localization remains a registration invariant for every selectable locale.

The three runtime notices are ordinary message keys (`day.staleWarning`, `location.assumption`, and `location.useDevice`). They are not maintained in a second translation dictionary.

## `complete`

A `complete` locale is self-contained for every required resource group and has been approved by project policy. Validation fails if it has any of the following:

- a missing required message, terminology entry, cutlet name or month name;
- an unknown resource key;
- an empty string, `null`, `undefined` or other non-string resource value;
- invalid or mismatching locale metadata;
- a registry/module inventory mismatch.

A complete locale does not load English merely to render the UI. Adding a new English baseline key therefore requires every complete locale to add that key before `npm run check:i18n` passes.

`complete` means structurally complete and approved by project policy. Automated validation cannot prove that the language itself is idiomatic or correct.

## `partial`

A `partial` locale contains meaningful local translation resources and may use English fallback for missing entries. A partial locale may also currently be structurally complete but remain `partial` until linguistic review and promotion are explicit.

The validator still rejects:

- unknown keys;
- empty or non-string overrides;
- broken metadata;
- module/registry mismatches;
- a module that cannot be loaded.

At runtime the selected partial source is merged over the English baseline. Local values always win. Missing values are therefore explicit and measurable by the coverage audit rather than becoming `undefined`.

There is no arbitrary percentage threshold for `partial`. Coverage is reported as data, not used as a substitute for linguistic review.

## `experimental`

An `experimental` locale may be minimal. It may omit entire resource groups and rely broadly on English fallback. It is nevertheless subject to the same structural safety rules as `partial`: any provided override must use a known key and a non-empty string value, metadata must be valid, loading must succeed and the resolved runtime resource set must be complete after fallback.

Experimental therefore means “limited language coverage”, not “unvalidated code”.

## Fallback and provenance

English is the fallback baseline. Complete locales do not need English at runtime. Partial and experimental locales load their own module plus English on demand and are materialized as:

`resolved group = English baseline + local overrides`

The loader retains the original local source internally. `auditLocaleResources()` and `npm run i18n:coverage` inspect that source, so a fallback value is not misreported as a local translation merely because the final runtime object contains a string.

In the current 72-locale set, all locale modules are structurally complete for the four runtime resource groups, so the coverage report records zero actual fallback values. The 70 non-English/non-Hebrew locales remain `partial` as a policy status pending explicit linguistic review rather than being auto-promoted from key presence alone.

The existing locale-selection priority is unchanged:

1. supported `?lang=...` URL locale;
2. saved explicit selection;
3. browser language preferences;
4. English.

Support level does not hide or block a locale. Explicitly selected partial/experimental locales remain selectable.

## Coverage report

Run:

```text
npm run i18n:coverage
```

The command validates the registry, checks that locale files and registry entries are in one-to-one correspondence, loads every locale source, enforces the support-level contract and prints a human-readable table. It also writes:

```text
artifacts/i18n/coverage.json
```

Each locale entry includes metadata, declared status, total/local/fallback counts, overall coverage, per-group coverage (including the manifest group), missing/empty/unknown keys, English-equality signals and a structural status suggestion.

For CI, `npm run check:i18n` performs the same validation without writing the JSON artifact.

## English-leakage heuristic

The report records local values that are identical to English and contain Latin text. This is a review signal only, never an automatic failure. Equality can be legitimate for proper names, international terms, acronyms and coincidentally identical words. A deliberately small allowlist covers a few canonical proper-name calendar labels; it is not a general mechanism for suppressing warnings.

## Promotion policy

### `experimental` → `partial`

Promotion requires meaningful local UI translation, valid metadata and resource keys, no runtime failures and human confirmation that the locale is useful as an actual translated interface. A numeric coverage percentage alone is insufficient.

### `partial` → `complete`

Promotion requires:

- every required key in every resource group to be local;
- zero unintended English fallback;
- passing `npm run check:i18n`;
- passing representative browser smoke tests;
- human review of linguistic quality.

A structurally complete audit result may be described as a `complete-candidate`; it is not an automatic promotion.

## Demotion policy

If a new feature adds English UI text and a complete locale cannot be updated reliably, either supply a reviewed translation or explicitly change that locale to `partial`. Do not add a hidden English fallback while leaving the registry status as `complete`.

## Adding a locale

A new locale requires all of the following in the same change:

1. one source module under `docs/i18n/locales/`;
2. one registry entry with code, display name, direction, `Intl` locale and explicit support level;
3. valid local overrides only;
4. passing locale inventory and support-level validation;
5. any PWA/manifest localization updates required by the existing site architecture.

A new file without a registry entry fails validation, as does a registry entry without a matching module.

## What validation must not be gamed with

Do not invent translations, copy English text into a locale merely to reach 100%, create a broad English allowlist, or promote a locale solely because every key exists. Ancient, reconstructed or rare languages may legitimately remain `partial` or `experimental` when modern UI vocabulary cannot be translated reliably.

## Structural completeness vs. linguistic quality

Structural completeness is machine-checkable: keys, types, metadata, fallback provenance and inventory can be validated deterministically. Linguistic quality is not. Human review remains required for claims about correctness, naturalness, terminology and appropriate register.
