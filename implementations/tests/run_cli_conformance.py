"""Run one native CLI against the compact specification-derived canonical corpus."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 2:
        raise SystemExit("usage: run_cli_conformance.py EXECUTABLE")
    executable = Path(sys.argv[1]).resolve()
    vectors_path = Path(__file__).resolve().parent / "conformance-vectors.json"
    document = json.loads(vectors_path.read_text(encoding="utf-8"))
    if document.get("fixtureType") != "specification-derived-canonical":
        raise AssertionError("refusing to treat a non-canonical fixture as canonical")
    if document.get("inputOrder") != ["calculationJdn", "targetJdn"]:
        raise AssertionError("canonical fixture input order changed")
    for vector in document["vectors"]:
        completed = subprocess.run(
            [
                str(executable),
                "--jdn",
                vector["calculationJdn"],
                vector["targetJdn"],
            ],
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
        actual = json.loads(completed.stdout)
        if actual != vector["expected"]:
            raise AssertionError(
                f"{vector['id']}: expected {vector['expected']!r}, got {actual!r}"
            )
        print(f"ok: {vector['id']}")
    print(f"{len(document['vectors'])} specification-derived CLI vectors passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
