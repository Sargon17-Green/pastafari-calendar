# Modern re-delivery dynamic Pastafarian display — implementation plan
Date: 2026-09-27
Status: pre-canon design only; do not implement/publish before corpus reconciliation

## Existing article state

Hebrew section:
`docs/about/content/he.html#site-story`

Current text already says:
- the modern re-delivery is a fixed historical event;
- it has no single fixed Pastafarian representation;
- its displayed Pastafarian date is computed under the relevant day of working;
- the same historical event can therefore receive a different Pastafarian representation under another day of working.

What is still missing is the previously planned **live rendered value**.

## Why the value must not be hard-coded

The date is a function of calculation/working day and target day.

The modern re-delivery event supplies the fixed target identity `t`.
The viewing/calculation context supplies `c`.

Therefore the UI should compute:
`F(c, t_redelivery)`

and must not embed one five-field tuple in the article HTML.

## Existing technical capability

The current site already has a browser worker:
`docs/engine/pastafari-fast-worker.js`

Its public worker request switch includes:
`operation: "convert"`

with payload:
- `targetJdn`
- `calculationJdn`

and returns the normalized Pastafarian representation.

So no new calendar algorithm is needed for this feature.

## Main unresolved input: how the About page chooses c

The About page currently does not instantiate the same temporal/observer state as the main calendar page.

The main page currently resolves the physical current day through:
- `observer-location.js`
- `venus-day-boundary.js`
- `currentDayAt(...)`
- product fallback observer when necessary.

Before implementation, corpus/product reconciliation must answer whether the live About display should use:
1. the viewer's current physical Pastafarian day using the same observer rules as the main page;
2. the product fallback observer without requesting location;
3. an explicitly selectable day of working;
4. some combination of these with visible context.

Do not silently choose one now.

## Proposed HTML contract

After corpus approval, add a non-authoritative presentation placeholder inside `#site-story`, after the prose explaining contextual representation.

Suggested semantic shape:

```html
<div class="about-live-example" data-redelivery-pastafarian-date>
  <p class="about-live-example-label">…localized label…</p>
  <output aria-live="polite">…loading/result/failure…</output>
  <p class="about-live-example-context">…working-day context…</p>
</div>
```

Requirements:
- no fixed five-field value in source HTML;
- result exposed as an `<output>` or equivalent accessible status region;
- visible indication of the day-of-working context used;
- graceful failure leaves the explanatory prose intact;
- no semantic dependence on JavaScript for understanding the rule.

## JavaScript integration shape

Do not duplicate calendar logic inside `about.js`.

Reuse:
- Gregorian/JDN converter from the site's existing calendar-converter module;
- the same current-day/observer resolver as the main app if that is the final product rule;
- the existing fast worker `convert` operation.

Pseudo-flow:

```text
article loaded
→ find [data-redelivery-pastafarian-date]
→ resolve fixed event target Day/JDN from canon-approved event identity
→ resolve current calculation day c under approved observer rule
→ worker convert(targetJdn=t, calculationJdn=c)
→ localize canonical indices/names and number formatting
→ render five fields + visible c-context
```

## Translation consequences

This feature introduces wrapper/UI strings but should not require rewriting the long article body.

Needed locale concepts are likely:
- “Pastafarian date of the re-delivery under the current day of working”;
- loading;
- unavailable/error;
- “calculated using day of working …”;
- perhaps reference-location/fallback text.

These should use the existing site localization system, not be embedded independently in every article.

## Naming consequence

Display names must come from the locale/canonical-name presentation layer.

Never use a translated display string as the identity of the cutlet/month.

## PWA/offline consequence

Adding a worker-backed computation to `/about/` changes runtime behavior even if the article stays readable without it.

After implementation re-run:
- offline first-load behavior;
- service-worker asset/update behavior;
- worker-load failure behavior;
- cache-version tests;
- locale switching after a computed value already exists.

## Accessibility consequence

Verify:
- the dynamic value is announced once, not repeatedly;
- BiDi isolation around numbers/Latin technical content;
- no focus stealing when the result arrives;
- loading/failure text is localized;
- the five-field result has an understandable spoken order in RTL and LTR locales.

## Performance consequence

Do not block article rendering on computation.

The article must render first.
The dynamic example may hydrate asynchronously.

If first conversion is expensive on a device, the explanatory text remains usable throughout.

## Corpus gate

Before implementation, pin from the corpus:
- exact identity/date of the modern re-delivery event;
- exact `F(c,t)` semantics;
- exact day-of-working/current-day rule;
- naming/display model;
- whether the event belongs in public origin history in this form.

## Current disposition

`DESIGN_READY / IMPLEMENTATION_BLOCKED_ON_CANON`

The useful engineering work is complete enough that, once the corpus is pinned, implementation should be a small UI/runtime delta rather than a fresh design exercise.
