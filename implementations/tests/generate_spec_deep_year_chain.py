#!/usr/bin/env python3
"""Generate the slow signed-year-chain witness from the specification reference."""
from __future__ import annotations

import json
from pathlib import Path

import generate_spec_canonical as spec


def main() -> int:
    year, _, _ = spec.year_5000(spec.FOUNDATION_JDN)
    rows = {5000: year}
    while year.number > -1:
        year = spec.previous_year(spec.FOUNDATION_JDN, year)
        if year.number in (2, 1, 0, -1):
            rows[year.number] = year
    document = {
        "canonicalId": spec.CANONICAL_ID,
        "normativeSourceSha256": spec.SOURCE_SHA256,
        "derivation": "year-by-year backward chaining from specification-derived year 5000; no production engine imported",
        "signedYearChain": [
            {
                "year": number,
                "openIndex": rows[number].open_index,
                "closeIndex": rows[number].close_index,
                "startJdn": str(rows[number].start_jdn),
                "endJdn": str(rows[number].end_jdn),
            }
            for number in (2, 1, 0, -1)
        ],
    }
    destination = Path(__file__).with_name("spec-derived-deep-year-chain.json")
    destination.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {destination}")
    for row in document["signedYearChain"]:
        print(row)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
