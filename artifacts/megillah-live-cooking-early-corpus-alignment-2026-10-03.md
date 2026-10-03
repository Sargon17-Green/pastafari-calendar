# Megillah / live-cooking early corpus alignment — 2026-10-03

Status: **STAGED ONLY — no live-cooking or historical Scroll text changed**

## Inputs inspected

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Live-source audit branch:
`fix/megillah-live-source-audit`

HEAD:
`ea19d989606214343db4632207bb0aa23c8d861a`

Main live-cooking localization source:
`browser/i18n/locales.js`
blob:
`5f21f5af28597850b4dda26bf512a8543daec90b`

JavaScript+Interlingue branch:
`ef8410fc5b2df2749c87946bc35c0a00804b0a1b`

Relevant files:
- `README.md` blob `4297a79ce926e3a5e747ad98886e0e6d5c847377`
- `src/source-language-catalog.js` blob `16a563bac5fb1eb5d86cfe4820086e4a981b9c13`
- `tests/source-language-normative-names.js` blob `3ad6d06445ba9558e717358a2fed20d32f8d50f5`

Corpus:
`source_revision 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`

## CHANGE — URL provenance must not be called canonical

Current live code:
`MEGILLAH_CANONICAL_URL`

and the source comment:
“Canonical live-stage quotations copied verbatim from the Hebrew Scroll ...”

The adopted `rule.megillah.editions` distinguishes canonical **text** from external apparatus/navigation/location:
- the text of an admitted edition can be canonical;
- website quotation preferences, navigation, external apparatus and lineage are not canon unless separately adopted;
- multiple admitted editions have no automatic hierarchy.

Therefore the Blogger URL is a source/provenance location, not a canonical object.

Staged rename:
- `MEGILLAH_CANONICAL_URL` → `MEGILLAH_PUBLIC_SOURCE_URL` or `MEGILLAH_SOURCE_URL`.

Staged comment:
> Exact live-stage quotations copied verbatim from the inspected public Hebrew Scroll source. The quotation text is provenance-preserved; the URL is a source location, not semantic authority.

No URL value change is required by this finding.

## MATCH / PRESERVE — exact Scroll quotations

The 16 audited quotations in `megillahStageGuide` should **not** be silently rewritten to make them match a newer formalization.

The corpus explicitly allows:
- admitted canonical editions as textual objects;
- semantic differences/contradictions among admitted editions;
- no automatic hierarchy among editions.

Therefore:
- exact historical/source quotation remains exact quotation;
- explanatory prose may be aligned separately;
- if a quotation conflicts with another canonical rule, record the conflict rather than editing the quotation.

The existing 16-entry source inventory remains valid provenance evidence.

## BLOCKED — explanatory “canonical order” prose

Examples:
- English: “selected in canonical order”
- Hebrew: “לפי הסדר הקאנוני”

These appear in explanatory live-cooking strings, not the quoted Scroll text.

Because the relevant algorithm formalization remains under review, final semantic closure is BLOCKED.

No change is staged solely from wording.

## CHANGE — JavaScript+Interlingue README month-8 correction is stale/wrong

Current README says:
`Karshumb -> Karshumab`.

But current source/test already require:
- canonical index 8 → `Karshumav`;
- test explicitly rejects `Karshumab` and `Karshumb`.

The working corpus now independently confirms:
- canonical entity: `name.month.karshumav`;
- `canonical_index: 8`;
- `Karshumab` is explicitly listed as a forbidden English label.

Therefore the old anomaly can now be resolved:

- source catalog `Karshumav`: **compatible with canonical entity identity**
- focused test requiring `Karshumav`: **compatible**
- README claiming `Karshumab`: **CHANGE REQUIRED**

Staged README correction:
`Karshumb -> Karshumav`

The cutlet correction `Palgursh -> Palgurash` also matches the canonical entity `name.cutlet.palgurash`, index 7.

## PRESERVE — canonicalIndex terminology

`canonicalIndex` is semantic identity, not an authority claim.

The corpus explicitly uses canonical indices on period-name entities. Do not rename these fields.

## BLOCKED / PRESERVE — normative cooking trace labels

`src/normative-cooking-trace.js` contains identifiers such as:
- `NormativeExecutionRecorder`
- `PASTAFARIAN_STAGE57_CANONICAL_SAVED_SUM`

These are implementation/historical profile identifiers.

Do not mechanically rename them now:
- the algorithm formalization is not frozen;
- changing persistent/profile identifiers may have compatibility effects;
- “canonical” inside a named historical profile does not itself make the implementation an authority.

At final alignment, classify each identifier as:
- API/storage identity that must be preserved;
- current semantic label that should be renamed;
- historical artifact that should remain unchanged.

## Apply gate

Do not modify the historical Scroll source or the audited quotations.

When downstream propagation is authorized:
1. rename the URL constant/comment only after checking consumers and tests;
2. correct the JavaScript+Interlingue README month-8 prose;
3. leave source/test `Karshumav` intact unless the canonical language-form registry supplies a different explicitly admitted Interlingue form;
4. re-run focused name tests;
5. do not merge the independent branch into repository `main`;
6. keep quotation provenance and semantic authority as distinct layers.
