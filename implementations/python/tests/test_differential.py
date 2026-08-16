from __future__ import annotations

import json
import os
import unittest
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from pastafari_calendar import PastafariCalendar


CORPUS = (
    Path(__file__).resolve().parents[2]
    / "tests"
    / "oracle-differential-10000.tsv"
)


def _verify_group(
    rows: list[tuple[int, int, dict[str, object]]],
) -> int:
    """Verify one calculation-day group in an isolated native Python process."""
    calendar = PastafariCalendar()
    for row_number, (target, calculation, expected) in enumerate(rows, 1):
        actual = calendar.convert_jdn(calculation, target).to_dict()
        if actual != expected:
            raise AssertionError(
                f"Mismatch in calculation group {calculation}, row "
                f"{row_number}: expected {expected!r}, got {actual!r}"
            )
    return len(rows)


class DifferentialTests(unittest.TestCase):
    def test_historical_regression_corpus(self) -> None:
        groups: list[list[tuple[int, int, dict[str, object]]]] = []
        current: list[tuple[int, int, dict[str, object]]] = []
        current_calculation: int | None = None
        with CORPUS.open("r", encoding="utf-8", newline="") as source:
            for physical_line, raw_line in enumerate(source, 1):
                if raw_line.startswith("#") or not raw_line.strip():
                    continue
                try:
                    target_text, calculation_text, expected_text = (
                        raw_line.rstrip("\n").split("\t", 2)
                    )
                except ValueError as error:
                    self.fail(
                        f"Malformed corpus row at physical line "
                        f"{physical_line}: {error}"
                    )
                target = int(target_text)
                calculation = int(calculation_text)
                expected = json.loads(expected_text)
                if current_calculation is None:
                    current_calculation = calculation
                if calculation != current_calculation:
                    groups.append(current)
                    current = []
                    current_calculation = calculation
                current.append((target, calculation, expected))
        if current:
            groups.append(current)

        self.assertEqual(len(groups), 40)
        workers = min(8, os.cpu_count() or 1, len(groups))
        with ProcessPoolExecutor(max_workers=workers) as executor:
            checked = sum(executor.map(_verify_group, groups))
        self.assertEqual(checked, 10_000)
