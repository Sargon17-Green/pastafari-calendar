# About i18n — global integration findings

This file records findings surfaced by native-language whole-site reviewers that are shared across locales and therefore are not, by themselves, evidence that one target language is linguistically wrong.

## Open: no-JavaScript locale fallback

The static shells `docs/index.html` and `docs/about/index.html` start as English and rely on JavaScript to restore/select the active locale. With JavaScript disabled there is no runtime locale selection, and the current `<noscript>` content is deliberately minimal and language-neutral apart from the token `JavaScript`.

Native Icelandic review run `36261881614`, job `108459271015`, correctly surfaced this as a whole-site fallback/accessibility limitation.

This remains an **integration/PWA/fallback finding**. It must be resolved or explicitly adjudicated before final PASS. It is not treated as an Icelandic wording defect because no Icelandic locale is active when the JavaScript locale layer is unavailable.

## Open: manifest base-name fallback vs localized names

`docs/manifest.webmanifest` has an English base `name` and locale-specific entries under `name_localized`, including:

- `is`: `Pastafari-dagatal`
- RTL direction metadata where relevant.

Native Icelandic review run `36261881614`, job `108459271015`, flagged the possibility that a browser/install path may use the English base name instead of the localized member.

This remains an **integration/PWA compatibility finding** until rendered/install testing confirms the behavior of the supported browsers or the manifest strategy is changed. Changing the shared base name to Icelandic would not be a valid locale-specific fix.

## Resolved: reverse-search live announcements

The same native review found that reverse-search status and error changes were not exposed as live regions. This was a valid shared accessibility defect and was fixed in commit `360b510eeba66158fbd6fe33f71c674b225e821b` by adding:

- `role="status"`
- `aria-live="polite"`
- `aria-atomic="true"`
- `role="alert"` for the error region.

This fix is shared by all locales.
