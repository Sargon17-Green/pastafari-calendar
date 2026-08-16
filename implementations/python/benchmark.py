"""Small reproducible benchmark; it is not part of the conformance suite."""

from __future__ import annotations

from statistics import median
from time import perf_counter

from pastafari_calendar import GregorianDate, PastafariCalendar, gregorian_to_jdn


def timed(callable_, repetitions: int = 1) -> float:
    started = perf_counter()
    for _ in range(repetitions):
        callable_()
    return perf_counter() - started


def main() -> None:
    target = GregorianDate.parse("2026-08-06")
    calculation = GregorianDate.parse("2026-08-06")
    calculation_jdn = gregorian_to_jdn(calculation)
    target_jdn = gregorian_to_jdn(target)

    cold_samples = []
    for _ in range(3):
        calendar = PastafariCalendar()
        cold_samples.append(
            timed(lambda: calendar.convert_jdn(calculation_jdn, target_jdn))
        )

    calendar = PastafariCalendar()
    calendar.convert_jdn(calculation_jdn, target_jdn)
    warm_repetitions = 10_000
    warm = timed(
        lambda: calendar.convert_jdn(calculation_jdn, target_jdn),
        warm_repetitions,
    )

    range_days = 365
    sequential = timed(
        lambda: [
            calendar.convert_jdn(calculation_jdn, target_jdn + offset)
            for offset in range(range_days)
        ]
    )

    print(f"cold median:        {median(cold_samples):.6f} s")
    print(f"cached conversion:  {warm / warm_repetitions * 1e6:.3f} us/op")
    print(f"365-day sequence:   {sequential:.6f} s")


if __name__ == "__main__":
    main()
