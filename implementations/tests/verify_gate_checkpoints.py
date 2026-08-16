#!/usr/bin/env python3
"""Verify every production gate checkpoint from the sole normative Scroll.

The expected positions are recomputed from the test-only specification model in
``generate_spec_canonical.py``.  No production engine, JavaScript oracle, or
historical regression corpus supplies expected values.
"""
from __future__ import annotations

import importlib.util
import json
import multiprocessing as mp
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SOURCE_SHA256 = "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96"
CANONICAL_ID = "PASTAFARI-SCROLL-2026-08-16-D36B0C94"
FOUNDATION_JDN = -13_334_246

spec = importlib.util.spec_from_file_location(
    "pastafari_spec_reference", HERE / "generate_spec_canonical.py"
)
if spec is None or spec.loader is None:
    raise RuntimeError("cannot load specification-derived reference model")
reference = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = reference
spec.loader.exec_module(reference)

PAIR = re.compile(r"[\(\{\[]\s*(-?[0-9_]+)\s*,\s*(-?[0-9_]+)\s*[\)\}\]]")


def block(path: Path, start: str, end: str) -> str:
    text = path.read_text(encoding="utf-8")
    begin = text.index(start)
    finish = text.index(end, begin)
    return text[begin:finish]


def parse_pairs(text: str) -> list[tuple[int, int]]:
    text = text.replace("FOUNDATION_JDN", str(FOUNDATION_JDN))
    result = []
    for left, right in PAIR.findall(text):
        result.append((int(left.replace("_", "")), int(right.replace("_", ""))))
    return result


def load_tables() -> dict[str, list[tuple[int, int]]]:
    return {
        "python": parse_pairs(block(
            ROOT / "python/pastafari_calendar/core.py",
            "GATE_CHECKPOINTS: tuple[tuple[int, int], ...] = (",
            "\n)\n\n_CHECKPOINT_POSITIONS",
        )),
        "cpp": parse_pairs(block(
            ROOT / "cpp/src/calendar.cpp",
            "constexpr std::array<std::pair<int, std::int64_t>, 75> kGateCheckpoints = {{",
            "\n}};",
        )),
        "c": parse_pairs(block(
            ROOT / "c/src/gate_checkpoints.h",
            "static const GateEntry STATIC_GATE_CHECKPOINTS[] = {",
            "\n};",
        )),
        "java": parse_pairs(block(
            ROOT / "java/src/main/java/org/appointedtimes/PastafariCalendar.java",
            "private static final long[][] CHECKPOINT_DATA = {",
            "\n    };",
        )),
        "ruby": parse_pairs(block(
            ROOT / "ruby/pastafari_calendar.rb",
            "GATE_CHECKPOINTS = [",
            "\n  ].freeze",
        )),
    }


def _distance(index: int) -> int:
    return reference.gate_distance(index)


def derive_positions(indices: list[int]) -> dict[int, int]:
    # Derive all needed positions from G_0 = Foundation by the binding recurrence.
    # Gate distances are independent, so compute them in parallel and only then
    # perform the deterministic prefix sums.
    wanted = set(indices)
    minimum = min(wanted)
    maximum = max(wanted)
    positive_indices = list(range(1, maximum + 1))
    negative_indices = list(range(-1, minimum - 1, -1))
    workers = min(8, max(1, mp.cpu_count()))
    with mp.Pool(processes=workers) as pool:
        positive = pool.map(_distance, positive_indices, chunksize=128)
        negative = pool.map(_distance, negative_indices, chunksize=128)

    result = {0: FOUNDATION_JDN}
    position = FOUNDATION_JDN
    for index, distance in zip(positive_indices, positive):
        position += distance
        if index in wanted:
            result[index] = position

    position = FOUNDATION_JDN
    for index, distance in zip(negative_indices, negative):
        position -= distance
        if index in wanted:
            result[index] = position
    return result


def main() -> int:
    tables = load_tables()
    first = next(iter(tables.values()))
    if not first:
        raise RuntimeError("no checkpoints parsed")
    if len(first) != 75:
        raise RuntimeError(f"expected 75 checkpoints, parsed {len(first)}")

    for language, table in tables.items():
        if table != first:
            raise AssertionError(f"{language}: checkpoint table differs before derivation")

    indices = [index for index, _ in first]
    if indices != sorted(indices) or len(set(indices)) != len(indices):
        raise AssertionError("checkpoint indexes are not strictly increasing")
    if 0 not in indices:
        raise AssertionError("foundation checkpoint is missing")

    derived = derive_positions(indices)
    mismatches = []
    for index, stored in first:
        expected = derived[index]
        if stored != expected:
            mismatches.append((index, stored, expected))
    if mismatches:
        raise AssertionError(f"checkpoint mismatches: {mismatches[:8]}")

    document = {
        "canonicalId": CANONICAL_ID,
        "fixtureType": "specification-derived-gate-checkpoints",
        "normativeSourceSha256": SOURCE_SHA256,
        "derivation": (
            "Starting from G_0 = Foundation JDN, sum the binding source-derived "
            "gate distances forward and subtract them backward."
        ),
        "productionTablesVerified": list(tables),
        "checkpointCount": len(first),
        "checkpoints": [
            {"index": index, "positionJdn": str(derived[index])}
            for index in indices
        ],
    }
    output = HERE / "spec-derived-gate-checkpoints.json"
    output.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"gate checkpoints: {len(first)}/{len(first)} source-derived positions passed")
    print("production tables: " + ", ".join(tables))
    print(f"wrote {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
