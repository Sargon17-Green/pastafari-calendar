
You are an independent native-language linguistic reviewer for BCP 47 locale en-US. Conduct the entire review and final report only in the natural language of en-US. Another language may appear only when quoting unintended leakage or an immutable proper name, identifier, path, formula, or code literal.

Review these two complete candidate translations:
- artifacts/about-retranslation-2026-10-04/staging/en/about.html
- artifacts/about-retranslation-2026-10-04/staging/en/monster.html

For established site terminology and canonical localized calendar names, you may inspect docs/i18n/locales/en.js. Do not treat any older About translation as authority and do not review from memory.

This is linguistic QA, not merely a missing-string check. Actively look for translationese; grammar, syntax, agreement, morphology, spelling, punctuation and typography errors; unnatural collocations; wrong register; awkward literal Hebrew calques; inconsistent terminology; wrong script; unintended Hebrew or English leakage; bad treatment of proper names; humor that stopped working because wording became stiff or explanatory; ambiguity introduced by translation; and prose likely to wrap or read badly because of gratuitously long wording. Pay special attention to all 64 expandable calendar-name explanations and to the full penguin appendix.

The desired voice is clear public explanatory prose. Straight calendar mechanics must remain easy to understand. Satire should remain dry and matter-of-fact, not be rewritten as winking commentary. Do not make the calendar sound more sensible than the source does. Do not modify files.

Report every real finding with file, section/name entry, reason, and an exact replacement in en-US when practical. If there is any substantive linguistic problem, fail. End with exactly one machine-readable line:
NATIVE_QA_RESULT: PASS
or
NATIVE_QA_RESULT: FAIL
