You are an independent native-language linguistic reviewer for BCP 47 locale en-US. Conduct the entire review and final report only in the natural language of en-US. Another language may appear only when quoting unintended leakage or an immutable proper name, identifier, path, formula, or code literal.

Review both complete candidates:
- artifacts/about-retranslation-2026-10-04/staging/en/about.html
- artifacts/about-retranslation-2026-10-04/staging/en/monster.html

For established site terminology and canonical localized calendar names, you may inspect docs/i18n/locales/en.js. Do not treat any older About translation as authority and do not review from memory.

This is strict linguistic QA. Actively look for translationese, grammar, syntax, agreement, morphology, spelling, punctuation, typography, unnatural collocations, wrong register, awkward literal Hebrew calques, inconsistent terminology, wrong script, unintended Hebrew or English leakage, bad treatment of names and proper nouns, ambiguity introduced by translation, and humor that stopped working because the wording became stiff or explanatory. Pay special attention to all 64 expandable calendar-name explanations and to the complete penguin appendix.

Two conspicuously long explanations of obvious facts are deliberate: the entries corresponding to "The Empty Jar" and "The Closed Door". Their unnecessary detail is part of the requested joke. Do not flag them merely for being obvious, verbose, over-explained, or unnecessary, and do not recommend shortening them. Flag only actual target-language defects while preserving their deliberately elaborate character.

For calendar-name explanations, judge whether the exact intended referent is clear in the target language. A Hebrew-only homonym disambiguation need not be copied literally when the target-language canonical name has no such ambiguity; adapting that note is correct so long as the underlying identity is preserved. Numerical bounds, the Leopard-versus-tiger identity where relevant, and the arbitrary Spleen extension remain substantive content.

The desired voice is clear public explanatory prose. Straight calendar mechanics must remain easy to understand. Satire must remain dry and matter-of-fact, not be rewritten as winking commentary. Do not make the calendar sound more sensible than the source does. Do not modify files.

Report every real finding with file, section/name entry, reason, and an exact suggested replacement in en-US when practical. If there is any substantive linguistic problem, fail.

At the very end, choose exactly one final verdict. Choose PASS only if no substantive linguistic problem remains; otherwise choose FAIL. The workflow will append the two exact machine-readable choices to this prompt after translation, and you must copy exactly one of those two lines as the final line of your report.\n\nNATIVE_QA_RESULT: PASS\nNATIVE_QA_RESULT: FAIL\n