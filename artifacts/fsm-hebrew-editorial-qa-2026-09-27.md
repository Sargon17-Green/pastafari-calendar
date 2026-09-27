# FSM consolidated candidate — Hebrew editorial QA
Date: 2026-09-27
Target: `artifacts/fsm-about-consolidated-candidate-2026-09-27.md`
Scope: Hebrew prose, internal structure and accidental ambiguity only. Canon-dependent content remains deferred.

## Overall assessment

The draft has a coherent dry/deadpan voice and is substantially readable as one article. Its main weaknesses are not basic Hebrew quality but provenance ambiguity, repeated epistemology motifs, and a few places where a joke can be mistaken for a sourced external claim.

No attempt is made here to flatten the style or explain the jokes.

## Safe mechanical fixes already applied

1. Repaired malformed escaped Markdown around `"אני ממש מעדיף שלא"`.
2. Replaced the crude Newton-only line with the later, scientifically safer Newton/Einstein distinction.
3. Corrected `כדורי־הבשר שלו עשויים בדרך כלל תחליף` → `...עשויים בדרך כלל מתחליף`.
4. Corrected the reconstructed penguin appendix's `זו אינה פותרת` → `הדבר אינו פותר`.

## Editorial findings

### E01 — Gender section currently sounds more sourced than it is
**Severity:** High  
**Section:** `זכר, נקבה או פחמימה`

The first paragraph is evidence-based language commentary. The second abruptly says that Pastafarian communities recognize three genders and that the Monster is carbohydrate. The source audit does not support that as a general community rule and the Loose Canon contains a different gender framing.

**Later action:** corpus/project-canon decision, then rewrite the paragraph so its voice matches its actual provenance.

### E02 — Heaven/hell transition is potentially misleading even before canon alignment
**Severity:** High  
**Section:** `אנטיפסטי והגיהנום`

The sentence about “מסורות אחדות” and entertainment facilities risks conflating externally familiar Pastafarian heaven motifs (Beer Volcano / Stripper Factory) with the draft's project-specific hell account.

**Later action:** when canon is available, make the contrast explicit rather than implying that the same source tradition puts those facilities in Hell.

### E03 — Several epistemology sections overlap heavily
**Severity:** Medium  
**Sections:** `סימנים שהמפלצת משאירה`, `תפילות שנענו`, `מה אפשר לדעת מתוצאות`, `צירופי מקרים`, `האם יש ראיות נגד`

They intentionally demonstrate different errors:
- confirmation/selection bias;
- one-sided prayer accounting;
- unfalsifiability/ad hoc rescue;
- post-selection of coincidences;
- inability to define a falsifier.

The concepts are distinct, but the reader may experience them as repeated versions of “evidence always counts in one direction”.

**Recommendation:** do not remove them now. At final editorial pass, either preserve all five with sharper differentiation or merge only genuinely redundant paragraphs.

### E04 — The article sometimes switches from “external Pastafarian tradition” to “project omniscient narrator” without a visible boundary
**Severity:** High  
Examples include:
- “בקהילות פסטפריות מקובלת...”
- “מסורות אחדות מתארות...”
- “ארוחה פסטפרית תקינה צריכה...”
- project-written metaphysics about autonomous chemistry/biology;
- the flood repair details.

The public style should remain direct and should **not** be cluttered with disclaimers. The solution is therefore not to add “according to source X” everywhere, but to settle provenance internally first and then write one coherent factual voice from the adopted canon.

### E05 — The opening promise is broader than the saved source status
**Severity:** Medium  
Opening:
`הישות שבראה את העולם ואת רוב הדברים שיש בו`

“בראה את העולם” is externally rooted. “ואת רוב הדברים שיש בו” is a broader project statement.

This is not a Hebrew defect; it is a precision flag for the later canon pass.

### E06 — The gravity section is now scientifically safer, but the joke's target should remain clear
**Severity:** Low  
The repaired Newton/Einstein sentence correctly leaves Newtonian gravity useful as an approximation while letting the article claim that neither Newton nor Einstein reached the noodles.

Do not later simplify it back to “Newton was disproved”.

### E07 — “תערו של אוקאם” paragraph is syntactically dense
**Severity:** Low  
Section: `איך היא נראית`

Current sentence:
`זהו גם ההסבר הפשוט ביותר, ולכן הנכון לפי תערו של אוקאם, לקביעה המדעית שלפיה...`

The deliberate misuse of Occam is part of the joke, but the sentence can be made syntactically cleaner later without fixing the bad inference itself.

Candidate future shape:
`זהו ההסבר הפשוט ביותר; לכן, לפי השימוש המקובל כאן בתערו של אוקאם, זהו גם ההסבר הנכון ל...`

Do not apply until the final prose pass because the exact comic cadence is editorial.

### E08 — “קיימת גם העובדה” is slightly bureaucratic
**Severity:** Low  
Section: `בני האדם`

`קיימת גם העובדה שכל אדם...`

Natural Hebrew would normally prefer `יש גם העובדה ש...` or simply `כל אדם...`.

The stiffness may actually suit the article's pseudo-technical voice, so no automatic change was made.

### E09 — Prayer section contains a useful deliberate tension
**Severity:** No defect  
Earlier, fulfilled prayers are counted as evidence. Later:
`אין ראיה טובה לכך שהיא מקדישה תשומת לב רבה לתפילות אנושיות.`

This is not necessarily an accidental contradiction; it works as a second-order joke about selective evidence and divine inattention.

Do not “harmonize” it automatically.

### E10 — Final tradition paragraph must never become the actual editorial method
**Severity:** High operational risk  
The article says to prefer the version that sounds more familiar / is remembered by more people.

Within the article this is a deliberate bad-reasoning joke. Outside it, the real editorial process must use the canonical corpus and provenance ledger.

The current branch correctly separates those layers. Preserve that separation.

## Penguin appendix editorial QA

### P01 — Tone fit
The reconstruction matches the main article's dry style reasonably well: factual premises are followed by over-specific practical conclusions.

### P02 — Strongest lines
The most effective lines are those where the conclusion follows from an obviously mismatched capability without making a false biological claim, e.g.:
- flippers versus a pipe wrench;
- a computer still needing someone who knows what to enter;
- belly sliding versus enamel-tank transport;
- “פינגווין שאינו יודע לנהל מפעל אינו פינגווין גרוע. הוא פינגווין.”

### P03 — Undefined “average fish” comparison
**Status: fixed in staging.**

The reconstruction originally compared a solar water heater with an “average fish”. That quantity is undefined and unnecessary.

It now says that a solar water heater is a large/heavy object and “אינו דומה במיוחד לטרף ימי”, preserving the joke without making a numerical/biological comparison.

### P04 — Legal paragraph remains broad
Keep it staged until legal/jurisdictional wording is tightened. This is already tracked in the factual QA ledger.

### P05 — Not all penguins are polar
The reconstruction correctly avoids this common error. Preserve that correction.

## Structure recommendation for the eventual final article

Do not reorganize now. After canon alignment, a sensible final pass can test whether the article reads best in four broad movements:

1. nature / body / creation;
2. world mechanics / humans / history;
3. food / worship / pirates / moral material;
4. evidence / knowledge / tradition, followed by the penguin appendix.

This is only an editorial test, not a required structure.

## Current disposition

No further broad prose rewrite should be applied before:
- remaining source recovery is exhausted;
- the new canonical corpus supplies the project-level decisions;
- the intentional fallacy map is preserved.

The current candidate is suitable as a staging baseline, not as a publication candidate.


## Source-status updates after the first Hebrew pass

Later source work changes the **provenance confidence**, not the staged public prose.

### Prayer / RAmen
Repeated Loose Canon prayers and an official Church “FSM Prayer” establish RAmen/R'Amen as genuine prayer-closing usage. The remaining caution is only against presenting common usage as an absolute command.

### Pasta as worship
The Loose Canon directly states that sharing Pasta is a form of worship. Therefore the saved `פולחן` section has a stronger external basis than the first pass assumed.

### Friday
The official Church site states that every Friday is a religious holiday; the Loose Canon also contains a “Holy Friday” prayer. The saved Friday claim is strongly sourced.

### Gender
The source problem became sharper, not weaker: the Loose Canon contains a prayer describing the FSM as neither male nor female and beyond ordinary human gender categories. Therefore the saved “three genders / carbohydrate” community-attribution sentence should remain blocked pending a project-canon decision.

### Heaven / Hell
The source distinction is now clear:
- familiar Beer Volcano / Stripper Factory material is Heaven;
- Loose Canon Hell/HellLight material is different;
- the saved “antipasti instead of pasta” line is a project-specific version unless adopted by project canon.

### Creation chronology
Secondary chapter-level indexing now closely matches the saved sequence through light/dark, Beer Volcano, hangover, duplicate land, sun/moon/stars and later life. The chronology should therefore be preserved in staging rather than pruned merely for lack of source confidence.

