from __future__ import annotations

import json
import unittest
from pathlib import Path

from pastafari_calendar import (
    ALGORITHM_ID,
    FOUNDATION_JDN,
    MAX_YEAR_DAYS,
    GregorianDate,
    PastafariCalendar,
    gregorian_to_jdn,
    jdn_to_gregorian,
)


VECTORS = (
    Path(__file__).resolve().parents[2] / "tests" / "conformance-vectors.json"
)


class ConformanceTests(unittest.TestCase):
    def test_published_vectors(self) -> None:
        document = json.loads(VECTORS.read_text(encoding="utf-8"))
        self.assertEqual(document["algorithmId"], ALGORITHM_ID)
        calendar = PastafariCalendar()
        for vector in document["vectors"]:
            with self.subTest(vector=vector["id"]):
                actual = calendar.convert_iso(
                    vector["target"], vector["calculation"]
                ).to_dict()
                self.assertEqual(actual, vector["expected"])

    def test_foundation_anchor(self) -> None:
        foundation = GregorianDate.parse("-41221-12-22")
        self.assertEqual(gregorian_to_jdn(foundation), FOUNDATION_JDN)

    def test_gregorian_round_trip_including_year_zero(self) -> None:
        samples = (
            "-43782-02-21",
            "-41221-12-22",
            "-0762-06-07",
            "0000-02-29",
            "0001-01-01",
            "2000-02-29",
            "2026-08-12",
        )
        for text in samples:
            with self.subTest(date=text):
                value = GregorianDate.parse(text)
                self.assertEqual(jdn_to_gregorian(gregorian_to_jdn(value)), value)

    def test_binding_year_limit(self) -> None:
        self.assertEqual(MAX_YEAR_DAYS, 5_778)


if __name__ == "__main__":
    unittest.main()
