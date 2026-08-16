"""Command-line entry point: ``python -m pastafari_calendar``."""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass

from .core import GregorianDate, PastafariCalendar


@dataclass(frozen=True, slots=True)
class Arguments:
    target: str
    calculation_date: str | None
    pretty: bool


def usage(program: str) -> str:
    return (
        f"Usage: {program} TARGET [--calculation-date DATE] [--pretty]\n"
        "TARGET and DATE use the proleptic Gregorian [+-]YYYY-MM-DD form.\n"
        "If DATE is omitted, the local civil day at invocation time is used."
    )


def parse_arguments(argv: list[str]) -> Arguments:
    """Parse options without misclassifying a negative Gregorian year."""

    target: str | None = None
    calculation_date: str | None = None
    pretty = False
    index = 1
    while index < len(argv):
        argument = argv[index]
        if argument in ("--help", "-h"):
            print(usage(argv[0]))
            raise SystemExit(0)
        if argument == "--pretty":
            pretty = True
        elif argument in ("--calculation-date", "-c"):
            index += 1
            if index >= len(argv):
                raise SystemExit(f"{argument} requires a date\n{usage(argv[0])}")
            calculation_date = argv[index]
        elif argument.startswith("--calculation-date="):
            calculation_date = argument.split("=", 1)[1]
        elif target is None:
            target = argument
        else:
            raise SystemExit(f"Unexpected argument: {argument}\n{usage(argv[0])}")
        index += 1
    if target is None:
        raise SystemExit(usage(argv[0]))
    return Arguments(target, calculation_date, pretty)


def main() -> int:
    arguments = parse_arguments(sys.argv)
    calendar = PastafariCalendar()
    value = calendar.convert(
        GregorianDate.parse(arguments.target),
        None
        if arguments.calculation_date is None
        else GregorianDate.parse(arguments.calculation_date),
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
