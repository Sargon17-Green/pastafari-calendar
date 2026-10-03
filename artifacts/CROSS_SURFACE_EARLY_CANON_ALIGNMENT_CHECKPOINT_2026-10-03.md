# Cross-surface early canon-alignment checkpoint — 2026-10-03

## State

Work branch:
`work/about-canon-transition-2026-09-27`

Corpus working input:
`source_revision 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`

Whole corpus remains explicitly nonfrozen.

This checkpoint extends:
`EARLY_CANON_RECONCILIATION_CHECKPOINT_2026-10-03.md`

No public/live/external repository has been modified by this pass. All new work is staged under this work branch's `artifacts/`.

## Completed surfaces

### 1. /about/

Already complete at early-reconciliation level:
- 85 tracked items
- 6 MATCH
- 5 CHANGE
- 48 BLOCKED
- 26 NOT-CANON

No public semantic patch applied.

### 2. Seer

Live repository inspected:
`Sargon-17-Green/Pastafarian-Calendar-Seer`

Live `main`:
`6f385e48ac0b0bd647d33705b2bb7bc54cded595`

Staged artifact:
`seer-early-corpus-alignment-delta-2026-10-03.md`

Closed authority/terminology findings:
- Scroll-alone supremacy/source-of-truth wording must move to final corpus/canonical-algorithm authority.
- Verified Seer implementation does not co-govern calendar semantics.
- Existing generated/test vectors and gate corpora are not canonical merely because they exist in the repository/tests/releases.
- Localization is presentation-only with respect to computation, but an admitted linguistic form may itself be standard/canonical.

Preserve:
- Seer is not semantic authority.
- Corpus explicitly says Seer is not a standard implementation.
- `presentation="canonical"` machine format.
- `canonicalIndex`.
- service-domain uses such as canonical hostname/origin.
- BCP-47 canonical casing.

Blocked:
- Monster/liturgical authorization theology until explicit corpus adoption.

### 3. App

Live repository:
`Sargon-17-Green/Pastafarian-Calendar-App`

Live `main`:
`4e94b3e15f21294e0c573ee6c3552c52880de214`

Staged artifact:
`app-live-early-corpus-alignment-delta-2026-10-03.md`

Closed terminology findings:
- the current numerical Venus implementation must not be described as canonical solely because it was ported from the 1.4.1 web implementation;
- the Kisurra fallback coordinate must not be called canonical without explicit corpus adoption.

No behavior change was authorized.

Blocked:
- numerical astronomy behavior until `GAP-ASTRO-MODEL` closes;
- Hebrew Kisurra form: App `כישורא` versus public `קיסורה`;
- Today numeric cutlet/month placeholders versus final admitted-name rendering.

Preserve:
- application-domain/storage uses of “canonical”;
- ordinary Week/Work Week product windows;
- Calculation-Day Override representation-only invariant;
- Seer binding as infrastructure-only.

### 4. Megillah / live cooking

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Source-audit branch:
`fix/megillah-live-source-audit@ea19d989606214343db4632207bb0aa23c8d861a`

JavaScript+Interlingue:
`JavaScript+Interlingue@ef8410fc5b2df2749c87946bc35c0a00804b0a1b`

Staged artifact:
`megillah-live-cooking-early-corpus-alignment-2026-10-03.md`

Closed findings:
- `MEGILLAH_CANONICAL_URL` is misleading authority terminology: a website/source URL is provenance, not canonical text/authority.
- Exact audited Scroll quotations remain exact quotations; do not harmonize them silently.
- JavaScript+Interlingue README month-8 correction is wrong: it says `Karshumb -> Karshumab`; corpus entity identity is `name.month.karshumav`, canonical index 8, and `Karshumab` is explicitly forbidden in English.
- Current source/test already use `Karshumav`, so only README/prose needs correction for this finding.
- `Palgurash` index 7 is compatible with the corpus entity.

Blocked:
- live explanatory “canonical order” prose until algorithm formalization freezes;
- historical/profile identifiers containing normative/canonical until their compatibility role is classified.

### 5. FSM article

Staged ledger:
`fsm-early-corpus-reconciliation-2026-10-03.json`

15/15 existing canon-decision items remain:
`BLOCKED_NO_EXPLICIT_ADOPTION_IN_NONFROZEN_CORPUS`.

Important distinction:
- prior explicit project approval is preserved as historical decision evidence;
- under `rule.corpus.transition`, it is not a parallel source of present canon;
- current corpus silence is neither adoption nor rejection.

No FSM public prose change is justified yet solely from this corpus view.

The consolidated candidate's existing:
`NOT CANONICAL AND NOT PUBLIC-READY`
guard remains correct.

### 6. Independent implementations

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Scope completed:
**60/60 implementation-or-language branches**, each branch's `README.md`.

Consolidated ledger:
`independent-implementations-early-corpus-alignment-2026-10-03.json`

Raw batches:
- `independent-readme-authority-scan-2026-10-03-b01.json`
- `...-b02.json`
- `...-b03.json`
- `...-b04.json`

Aggregate:
- unavailable READMEs: 0
- confirmed direct authority conflicts from README scan: 0
- branch READMEs using normative oracle/reference terminology: 32
- branch READMEs using `canonicalIndex`: 45
- manual terminology review: 2
- concrete known README correction: 1 — JavaScript+Interlingue `Karshumav`
- no direct authority conflict found: 57

Rule:
- preserve `canonicalIndex`;
- a test-only `normative oracle/reference` is tooling, not a parallel canonical source;
- do not mass-rewrite 60 branches;
- do not merge independent branches into `main`;
- source/display forms called canonical/standard must eventually be checked against explicitly admitted corpus language forms.

## Cross-surface control artifacts

Machine-readable matrix:
`CROSS_SURFACE_EARLY_CANON_ALIGNMENT_2026-10-03.json`

Invalidation map:
`CROSS_SURFACE_CANON_INVALIDATION_MAP_2026-10-03.json`

The invalidation map records what each eventual patch must re-test and, equally important, what it does **not** invalidate.

Examples:
- authority prose changes do not invalidate calendar arithmetic;
- Seer vector terminology does not invalidate vector bytes;
- App astronomy authority-comment corrections do not authorize numerical model changes;
- Megillah URL identifier rename does not alter quoted text;
- /about/ bounded deltas do not justify restarting 71 translations.

## Global rules established by this pass

1. **Final corpus authority**
   Final corpus is the canonical authority. Implementations, Seer, tests, prior decisions, public explanations and source URLs do not become parallel top-level authority.

2. **Do not globally replace “canonical”**
   Domain-qualified meanings can be correct:
   - `canonicalIndex`;
   - Seer `presentation="canonical"`;
   - API/service canonical origin;
   - App canonical domain/state;
   - canonical textual edition.

3. **Text versus source location**
   A canonical edition's text can be canonical. Its Blogger/GitHub/website URL is provenance/navigation unless separately adopted.

4. **Vectors**
   A vector/test corpus is canonical only if explicitly adopted.

5. **Astronomy**
   No existing numerical Venus-boundary approximation is currently a canonical numerical profile while `GAP-ASTRO-MODEL` remains open.

6. **Prior approvals**
   A previously approved project decision is historical provenance after corpus transition; it becomes current canon only through corpus adoption.

## Public/edit state

No target repository was changed:
- no Seer edit;
- no App edit;
- no Pastafarian-Calendar independent-branch edit;
- no public /about/ edit;
- no Megillah quotation edit;
- no FSM public edit.

Only `artifacts/` on the work branch were changed.

## Next useful work before corpus freeze

The requested authority/terminology cross-surface pass is now complete.

Remaining useful pre-freeze work:
1. extract the corpus's admitted language-form registry into a machine-readable cross-language map, so source/display-name claims can be checked branch-by-branch without guessing;
2. classify the two manual terminology-review branches from the 60-branch scan at file level if needed;
3. prepare patch manifests (not patches) with exact target files/blobs for the closed CHANGE findings;
4. monitor corpus `source_revision`; if it changes, diff the adopted-rule layer before carrying these dispositions forward.

Final semantic application still waits for the relevant freeze/authorization gate.


## Canonical language-form registry and live drift — completed 2026-10-03

The full adopted 60-language / 3,840-label registry was recovered from the canonical corpus package at:
`Pastafarian-Canon/canon/languages.json`

Registry SHA-256:
`e0d69e7f7723607b91f50af01798066c06e4a66831b926e8666f7c0df08add62`

Control artifact:
`CANONICAL_LANGUAGE_FORM_REGISTRY_2026-10-03.json`

Important scope distinction:
- 60 normative 64-name catalogs are present;
- this is **not** equivalent to 60 complete locale profiles;
- productive grammar, metadata, accessibility and numeral profiles remain `GAP-LOCALE-PROFILES`.

The owner incorporation changed exactly cutlet canonical index 8:
- 58 canonical languages received a new adopted form;
- Hebrew `גומא` and Sahidic Coptic `ϫⲟⲟⲩϥ` were retained;
- the other 3,780 labels were explicitly preserved.

Live audit scope:
- 61 current catalog witnesses in `Sargon17-Green/Pastafarian-Calendar`;
- 60 canonical languages;
- the extra witness is the second independent Latin implementation.

Live result:
- **59 CHANGE**
- **2 MATCH**
- **0 unresolved/unreadable**

The MATCH witnesses are:
- `Dart+עברית` — `גומא`
- `x86-64-Assembly+ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ` — `ϫⲟⲟⲩϥ`

All other live catalog witnesses still carry the pre-27.9 cutlet-8 form.

Evidence:
- `INDEPENDENT_LANGUAGE_FORM_LIVE_DRIFT_2026-10-03.json`
- `INDEPENDENT_LANGUAGE_FORM_LIVE_DRIFT_2026-10-03.md`

Staged propagation manifest:
`INDEPENDENT_LANGUAGE_FORM_PATCH_MANIFEST_2026-10-03.json`

It contains 59 blob-guarded source edits and explicitly does **not** authorize applying them. Any target blob drift requires re-audit first.

No implementation branch was modified by this pass.


## Branch-local duplicate discovery and complete guarded patch sets — completed 2026-10-03

The 59 staged cutlet-8 changes were scanned against each live branch ref with a full tracked-file git grep, not only the known catalog path.

Replay:
- target branches: **59**
- source blob guards: **59/59 PASS**
- scan errors: **0**
- case-only stale variants: **0**
- tracked files containing the old cutlet-8 literal directly: **115**
- content-file patch operations after manual review: **115**
- SHA-lock refresh operations: **59**
- total guarded file operations: **174**

Direct-hit classification before manual closure:
- 59 authoritative/source catalog files
- 15 tests/fixtures
- 33 current catalog/README docs
- 4 other current code/audit-table copies
- 4 prose files requiring contextual review

All 59 branches use `CANONICAL_NAMES_LOCK.sha256` that must be refreshed. `WAT+Español` locks two changed files; the other 58 branches lock one changed source file each.

The four contextual reviews were closed without rewriting history:
- `APL+Deutsch/KANONISCHE_NAMENSKORREKTUR_DE.md`: preserve the dated 13-Sep correction and append the 27-Sep `Papyrusstaude -> Zypergras` supersession.
- `BASIC+ਪੰਜਾਬੀ/CANONICAL_NAME_CORRECTION_NOTE_PA.md`: preserve the earlier correction chain and append `ਪੈਪੀਰਸ ਸੇਜ -> ਮੋਥਾ`.
- `Python+Türkçe/KANONIK_KAYNAK_ADI_DUZELTME_NOTU.md`: preserve the dated `Papirüs -> Papirüs bitkisi` correction and append `Papirüs bitkisi -> topalak`.
- `Shakespeare-Programming-Language+മലയാളം/SOURCE_LANGUAGE_RULES.md`: this is current rule text, so replace the obsolete Papyrus-Sedge rationale with the explicit adopted `മുത്തങ്ങ` override.

### JavaScript+Interlingue special case

The branch contains a multi-locale browser bundle. A blind `papirus -> cyperus` replacement would be incomplete.

The complete staged patch:
- changes the source lookup key to `cyperus`;
- applies explicitly adopted values for `ie`, `en`, `he`, `ar`, `de`, `es`, `it`, `cs`;
- preserves Russian and French strings only as noncanonical presentation data because no corresponding admitted form exists in the 60-language registry;
- changes the locale-matrix test consistently;
- replaces the old comment that implied repository translations themselves carried semantic/canonical authority.

No Russian or French canonical form is invented.

Complete machine patch set:
`INDEPENDENT_LANGUAGE_FORM_BRANCH_PATCHSETS_2026-10-03.json`

Human summary:
`INDEPENDENT_LANGUAGE_FORM_DUPLICATE_DISCOVERY_2026-10-03.md`

The earlier `INDEPENDENT_LANGUAGE_FORM_PATCH_MANIFEST_2026-10-03.json` is now explicitly source-only and must **not** be used by itself for application.

No target implementation branch was modified.
