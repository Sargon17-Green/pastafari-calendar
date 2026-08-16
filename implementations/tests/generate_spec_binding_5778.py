#!/usr/bin/env python3
"""Generate the 5,778-vs-5,781 discriminator vector from the specification reference."""
from __future__ import annotations
import json
from pathlib import Path
import generate_spec_canonical as spec


def main() -> int:
    calculation_iso = "-43782-02-21"
    target_iso = calculation_iso
    calculation_jdn = spec.jdn_from_iso(calculation_iso)
    target_jdn = spec.jdn_from_iso(target_iso)
    calendar = spec.Calendar(calculation_jdn)
    expected = calendar.convert(target_jdn)
    document = {
        "canonicalId": spec.CANONICAL_ID,
        "normativeSourceSha256": spec.SOURCE_SHA256,
        "bindingMaxYearDays": spec.MAX_YEAR_DAYS,
        "erroneousBodyValueNotBinding": 5781,
        "vector": spec.vector(
            "binding_5778_same", calculation_jdn, target_jdn, expected,
            "spec-derived discriminator for binding MAX_YEAR_DAYS=5778, not 5781",
        ),
    }
    destination = Path(__file__).with_name("spec-derived-binding-5778.json")
    destination.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {destination}")
    print(document["vector"])
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
