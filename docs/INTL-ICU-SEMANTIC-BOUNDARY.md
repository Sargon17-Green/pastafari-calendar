# Intl/ICU semantic boundary

This note records the boundary enforced by Update 13. It does not remove `Intl`, and it does not redefine host-backed convenience calendars as canonical calendars.

## Rule

A calendar representation that is normative under the Magillah must be computed from project-controlled deterministic arithmetic/source-locked code. `Intl`, ICU data, the process locale, the operating-system timezone database, localized era/month names, and host feature support may not determine any semantic field of that representation.

Host-backed and formatting APIs may continue to use `Intl`. Their output is not a tablets oracle.

## Normative representations

The current normative Foundation representations are Gregorian, Julian, Hebrew, arithmetic Islamic civil, arithmetic Solar Hijri (2820-cycle), deterministic Chinese, Vikrama, Saka, Thai Buddhist, Ethiopic, Coptic, Kōki, Minguo, western-arithmetic Bahá’í, and Maya Long Count. Kōki is distinct from Japanese imperial eras. Vikrama is distinct from the legacy Old Hindu converters.

The Magillah's Solar Hijri Foundation value is the arithmetic 2820-cycle representation. The `solar-hijri-official` host path is therefore not a substitute for it. Likewise, Umm al-Qura is an additional host convenience representation; the Magillah's Hijri Foundation anchor is arithmetic Islamic civil.

## Host-backed paths retained on purpose

`islamic-umalqura` and `solar-hijri-official` continue to use `Intl.DateTimeFormat`/ICU. They may vary by host support or fail when the host does not support the requested calendar/range. This behavior is allowed because these paths are non-normative convenience APIs.

The sealed chronicle also retains its historical host-backed Chinese converter. Update 13 deliberately does not delete or rewrite it.

## Chinese semantic firewall

The supported browser doorway, `browser/pastafari-calendar-core.js`, now places a semantic firewall in front of the chronicle's Chinese route. A Chinese-shaped normative request is diverted through the source-locked deterministic Chinese engine before the legacy host converter can answer. The legacy result can still be requested as a diagnostic witness inside the firewall, but it receives a hidden `Symbol` taint and is marked `source: "host-intl", normative: false`.

The implementation intentionally preserves the project's spaghetti constraint: the chronicle remains present, the host converter remains present, a `Proxy` shadows the normative dispatch, and the contaminated witness remains available behind the detour. No calendar-adapter rewrite was performed.

The critical dependency direction is therefore:

```text
normative deterministic engine -> normative public/browser result
host/Intl legacy converter      -> tainted witness or host-only API
```

There is no route from a tainted host witness back into normative Chinese output.

## Formatting-only Intl

`docs/calendar-input-conventions.js` may use `Intl.DateTimeFormat` for localized month labels and `Intl.NumberFormat` for localized digits. `docs/app.js` may use `Intl` to format already-determined values. Those uses are presentation-only: canonical year/month/day/JDN values are determined before formatting.

## Failure behavior

A failure of `Intl` must not break a normative calendar representation. A malformed or failed deterministic normative conversion must not silently fall back to a host answer. Conversely, a host-only API is allowed to throw when ICU does not support the requested calendar or date.

Machine-readable audit material is in `artifacts/intl-icu-dependency-matrix.json`, `artifacts/update-13-normative-representation-matrix.json`, and `artifacts/update-13-intl-host-static-inventory.json`.
