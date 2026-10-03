# About retranslation – 71 locales

This directory is the staging and evidence area for the complete retranslation of the rebuilt Hebrew About pages.

Authority and workflow:

1. `docs/about/content/he.html` and `docs/about/monster/index.html` at the pinned source revision are the sole semantic source.
2. Every non-Hebrew page is translated from scratch. Older About translations are not source text and must not be used as sentence/section templates.
3. `docs/i18n/locales/<code>.js` may be consulted only for already-established target-language UI terminology and canonical calendar-name forms.
4. The generated translation is staged here first; nothing is public from this directory.
5. A fresh LLM reviewer receives a reviewer prompt written in the target language and performs linguistic QA.
6. A separate LLM session compares the candidate directly against the Hebrew source for omissions, additions, semantic drift, numerical/formula errors, jokes/tone, canonical names, and HTML/invariant preservation.
7. Any repair returns through linguistic QA. Publication is atomic: all 71 locales must pass both gates before the public registry is enabled and files are copied to `docs/about/`.
8. Hebrew is never translated through English or another pivot language.

Expected per-locale evidence after the workflow:
`staging/<code>/about.html`, `monster.html`, translated reviewer prompt, native-language QA report, Hebrew-source comparison report, session logs where available, and `status.json`.
