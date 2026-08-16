"""Run an implementation CLI against every checked-in conformance vector."""

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
    for vector in document["vectors"]:
        completed = subprocess.run(
            [
                str(executable),
                vector["target"],
                "--calculation-date",
                vector["calculation"],
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
    print(f"{len(document['vectors'])} native CLI conformance vectors passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
