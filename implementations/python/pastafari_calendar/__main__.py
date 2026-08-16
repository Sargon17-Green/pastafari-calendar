"""Command-line entry point: ``python -m pastafari_calendar``."""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass

from .core import GregorianDate, PastafariCalendar


@dataclass(frozen=True, slots=True)
class Arguments:
    calculation: str
    target: str
    jdn: bool
    pretty: bool


def usage(program: str) -> str:
    return (
        f"Usage:\n"
        f"  {program} CALCULATION TARGET [--pretty]\n"
        f"  {program} --jdn CALCULATION_JDN TARGET_JDN [--pretty]\n"
        "The positional order is normative: calculation/action day first, queried/target day second.\n"
        "Gregorian dates use signed proleptic [+-]YYYY-MM-DD notation.\n"
        "There is no implicit civil-today fallback; a real-time Venus-day adapter is separate."
    )


def parse_arguments(argv: list[str]) -> Arguments:
    pretty = False
    jdn = False
    positional: list[str] = []
    for argument in argv[1:]:
        if argument in ("--help", "-h"):
            print(usage(argv[0]))
            raise SystemExit(0)
        if argument == "--pretty":
            pretty = True
            continue
        if argument == "--jdn":
            jdn = True
            continue
        positional.append(argument)
    if len(positional) != 2:
        raise SystemExit(usage(argv[0]))
    return Arguments(positional[0], positional[1], jdn, pretty)


def main() -> int:
    arguments = parse_arguments(sys.argv)
    calendar = PastafariCalendar()
    if arguments.jdn:
        value = calendar.convert_jdn(int(arguments.calculation), int(arguments.target))
    else:
        value = calendar.convert(
            GregorianDate.parse(arguments.calculation),
            GregorianDate.parse(arguments.target),
        )
    print(
        json.dumps(
            value.to_dict(),
            ensure_ascii=False,
            indent=2 if arguments.pretty else None,
            separators=None if arguments.pretty else (",", ":"),
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
