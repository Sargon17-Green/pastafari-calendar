#!/usr/bin/env python3
"""Generate the historical Pastafari regression/conformance-format corpus.

Compatibility warning: this script keeps its legacy "spec canonical" filename
and still emits the historical canonical-format artifacts, but Update 16 makes
its authority status explicit.  It is a generator/witness, not the normative
oracle.  Normative conformance is judged by the scroll-derived independent
reference plus direct scroll-derived evidence, never by generator agreement or
majority vote.

This file does not import, execute, or query any production Pastafari
implementation.  The historical JavaScript engine and the retained 10,000-row
regression corpus are not inputs to this generator.
"""
from __future__ import annotations

import json
import os
from dataclasses import dataclass
from functools import lru_cache
from itertools import permutations
from pathlib import Path
from typing import Iterable

SOURCE_SHA256 = "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96"
CANONICAL_ID = "PASTAFARI-SCROLL-2026-08-16-D36B0C94"
M = (1 << 127) - 1
FOUNDATION_JDN = -13_334_246
MIN_YEAR_DAYS = 252
MAX_YEAR_DAYS = 5_778
MIN_YEAR_GAPS = 6
CUTLET_NAMES = (
    "ארד", "שועל", "כליה", "לגש", "מחשבה", "ארבעה חלקים מתשעה",
    "פַּלְגּוּרַשׁ", "גומא", "אשכול", "עקרב", "אפר", "חיטה", "נהר",
    "צחוק", "אכד", "קרן", "הכד הריק",
)
MONTH_NAMES = (
    "טין", "רימון", "מרפק", "קנאה", "ארידו", "משחת־שיניים",
    "שלושה חלקים מחמישה", "כַּרְשׁוּמַב", "נמר", "בדיל", "ערפל", "לבונה",
    "כישור", "צלע", "חרוב", "אורוק", "בושה", "גמל", "נחושת", "באר",
    "חלמון", "כוכב", "דבש", "טחול", "אבן־גיר", "שמחה", "תאנה", "נינוה",
    "צפרדע", "זפת", "נר", "הדלת הסגורה", "שומשום", "עורף", "כסף", "שושן",
    "סערה", "חמור", "קמח", "חרטה", "בבל", "לשון", "פשתן", "מלח", "אגס",
    "קשת", "חול",
)
GRIND_ROWS = (
    (3, 5, 7, 11, 0), (5, 7, 11, 13, 1), (7, 11, 13, 17, 2),
    (11, 13, 17, 19, 3), (13, 17, 19, 23, 4), (17, 19, 23, 29, 0),
    (19, 23, 29, 31, 1), (23, 29, 31, 37, 2), (29, 31, 37, 41, 3),
    (31, 37, 41, 43, 4), (37, 41, 43, 47, 0),
)
HIDDEN_COEFFICIENTS = (
    (3, 4, 6, 8), (5, 7, 10, 12), (7, 10, 14, 16), (9, 13, 18, 20),
    (11, 16, 22, 24), (13, 19, 26, 28), (15, 22, 30, 32),
)
HIDDEN_STONE_ORDER = (0, 1, 2, 3, 4, 0, 1)
BOWL_PRIMES = (17, 19, 23, 29, 31, 37)
DIRECT_MULTIPLIERS = (3, 5, 7)
DIRECT_STONES = (0, 1, 2)
DROP_MIX_STONES = (0, 1, 2, 3, 4, 0)
BOWL_PERMUTATIONS = tuple(permutations(range(6)))


def authority_metadata() -> dict[str, object]:
    return {
        "component": "implementations/tests/generate_spec_canonical.py",
        "role": "historical-fixture-generator",
        "generatorClass": "C",
        "normativeAuthority": False,
        "compatibilityNameRetained": True,
        "authorityWarning": (
            "Legacy canonical-format generator output is regression evidence only. "
            "It must not be used as the normative oracle; compare it downstream "
            "against the independent reference where the reference is implemented."
        ),
        "update16": {
            "corpusRegenerated": False,
            "fullCorpusRevalidationDeferredTo": "Update 17",
        },
    }


def saved(value: int) -> int:
    return ((value - 1) % M) + 1


def day_number(jdn: int) -> int:
    delta = jdn - FOUNDATION_JDN
    if delta == 0:
        return 1
    return 2 * delta + 1 if delta > 0 else -2 * delta


def build_stones() -> tuple[tuple[int, ...], ...]:
    rows: list[tuple[int, ...]] = [(17, 29, 43, 71, 101)]
    for drop_number in range(2, 47):
        w, b, s, bitter, red = rows[-1]
        rows.append((
            saved(w * w + 3 * b + drop_number),
            saved(b * b + 5 * s + w),
            saved(s * s + 7 * bitter + b),
            saved(bitter * bitter + 11 * red + s),
            saved(red * red + 13 * w + bitter),
        ))
    return tuple(rows)


STONES = build_stones()


def bowl_permutation(one_based_rank: int) -> tuple[int, ...]:
    if not 1 <= one_based_rank <= 720:
        raise ValueError("rank outside 1..720")
    return BOWL_PERMUTATIONS[one_based_rank - 1]


@dataclass(frozen=True)
class SauceTrace:
    hidden: tuple[int, ...]
    drops: tuple[int, ...]
    drop_orders: tuple[tuple[int, ...], ...]
    bowls_after_drops: tuple[tuple[int, ...], ...]
    stir_order_numbers: tuple[int, ...]
    stir_orders: tuple[tuple[int, ...], ...]
    bowls_after_stirs: tuple[tuple[int, ...], ...]

    @property
    def bowls(self) -> tuple[int, ...]:
        return self.bowls_after_stirs[-1]

    @property
    def last_drop_permutation(self) -> tuple[int, ...]:
        return self.drop_orders[-1]


def sauce(calculation_jdn: int, target_jdn: int) -> SauceTrace:
    calculation = day_number(calculation_jdn)
    target = day_number(target_jdn)
    distance = abs(target_jdn - calculation_jdn) + 1
    addition = calculation + target
    direction = 1 if target_jdn < calculation_jdn else 2 if target_jdn == calculation_jdn else 3

    hidden: list[int] = []
    for index, coefficients in enumerate(HIDDEN_COEFFICIENTS):
        stones = STONES[index]
        a, b, c, d = coefficients
        value = saved(calculation + a * target + b * distance + c * addition + d * direction + sum(stones))
        for round_number, stone_index in enumerate(HIDDEN_STONE_ORDER, 1):
            value = saved(value * value + 3 * value + stones[stone_index] + round_number)
        hidden.append(value)

    drops: list[int] = []
    bowls: list[int] = []
    for bowl_number, prime in enumerate(BOWL_PRIMES, 1):
        value = calculation + bowl_number * target + distance + addition + direction + prime * prime
        bowls.append(saved(value * value + bowl_number))

    drop_orders: list[tuple[int, ...]] = []
    bowls_after_drops: list[tuple[int, ...]] = []

    def prior(drop_number: int, back: int) -> int:
        wanted = drop_number - back
        return drops[wanted - 1] if wanted >= 1 else hidden[back - drop_number]

    for drop_number in range(1, 47):
        stones = STONES[drop_number - 1]
        previous = prior(drop_number, 1)
        third = prior(drop_number, 3)
        seventh = prior(drop_number, 7)
        value = saved(
            stones[0] * calculation + stones[1] * target + stones[2] * distance
            + stones[3] * addition + stones[4] * direction + previous
            + 3 * third + 5 * seventh + drop_number
        )
        for first, second, third_factor, fourth, stone_index in GRIND_ROWS:
            value = saved(
                value * value + first * value + second * previous
                + third_factor * third + fourth * seventh + stones[stone_index]
            )
        drops.append(value)
        order = bowl_permutation(1 + (value - 1) % 720)
        drop_orders.append(order)
        old = bowls
        direct = [0] * 6
        for place, (stone_index, multiplier) in enumerate(zip(DIRECT_STONES, DIRECT_MULTIPLIERS)):
            bowl_id = order[place]
            direct[bowl_id] = saved(
                value * value + stones[stone_index] * old[bowl_id]
                + multiplier * drop_number
            )
        bowls = [0] * 6
        for place, bowl_id in enumerate(order):
            previous_id = order[(place - 1) % 6]
            next_id = order[(place + 1) % 6]
            mixed = (
                old[bowl_id] + 2 * old[previous_id] + 3 * old[next_id]
                + direct[bowl_id] + value + stones[DROP_MIX_STONES[place]]
            )
            bowls[bowl_id] = saved(
                mixed * mixed + 5 * old[previous_id] * old[next_id]
                + drop_number * (place + 1)
            )
        bowls_after_drops.append(tuple(bowls))

    stir_order_numbers: list[int] = []
    stir_orders: list[tuple[int, ...]] = []
    bowls_after_stirs: list[tuple[int, ...]] = []
    for round_number in range(1, 13):
        bowl_sum = sum(bowls)
        order_number = saved(bowl_sum + 149 * round_number)
        stir_order_numbers.append(order_number)
        order = bowl_permutation(1 + (order_number - 1) % 720)
        stir_orders.append(order)
        old = bowls
        bowls = [0] * 6
        for place, bowl_id in enumerate(order):
            previous_id = order[(place - 1) % 6]
            next_id = order[(place + 1) % 6]
            mixed = (
                old[bowl_id] + 3 * old[previous_id] + 5 * old[next_id]
                + bowl_sum + round_number + (place + 1) ** 2
            )
            bowls[bowl_id] = saved(
                mixed * mixed + 7 * old[previous_id] * old[next_id]
            )
        bowls_after_stirs.append(tuple(bowls))

    return SauceTrace(
        tuple(hidden), tuple(drops), tuple(drop_orders), tuple(bowls_after_drops),
        tuple(stir_order_numbers), tuple(stir_orders), tuple(bowls_after_stirs),
    )



@dataclass(frozen=True)
class FinalSauce:
    bowls: tuple[int, ...]
    last_drop_permutation: tuple[int, ...]


@lru_cache(maxsize=2048)
def sauce_final(calculation_jdn: int, target_jdn: int) -> FinalSauce:
    """Compact source derivation for repeated gate/year/structure choices."""
    calculation = day_number(calculation_jdn)
    target = day_number(target_jdn)
    distance = abs(target_jdn - calculation_jdn) + 1
    addition = calculation + target
    direction = 1 if target_jdn < calculation_jdn else 2 if target_jdn == calculation_jdn else 3
    hidden: list[int] = []
    for index, coefficients in enumerate(HIDDEN_COEFFICIENTS):
        stones = STONES[index]
        a, b, c, d = coefficients
        value = saved(calculation + a * target + b * distance + c * addition + d * direction + sum(stones))
        for round_number, stone_index in enumerate(HIDDEN_STONE_ORDER, 1):
            value = saved(value * value + 3 * value + stones[stone_index] + round_number)
        hidden.append(value)
    drops: list[int] = []
    bowls: list[int] = []
    for bowl_number, prime in enumerate(BOWL_PRIMES, 1):
        value = calculation + bowl_number * target + distance + addition + direction + prime * prime
        bowls.append(saved(value * value + bowl_number))
    def prior(drop_number: int, back: int) -> int:
        wanted = drop_number - back
        return drops[wanted - 1] if wanted >= 1 else hidden[back - drop_number]
    last: tuple[int, ...] | None = None
    for drop_number in range(1, 47):
        stones = STONES[drop_number - 1]
        previous = prior(drop_number, 1)
        third = prior(drop_number, 3)
        seventh = prior(drop_number, 7)
        value = saved(stones[0] * calculation + stones[1] * target + stones[2] * distance + stones[3] * addition + stones[4] * direction + previous + 3 * third + 5 * seventh + drop_number)
        for first, second, third_factor, fourth, stone_index in GRIND_ROWS:
            value = saved(value * value + first * value + second * previous + third_factor * third + fourth * seventh + stones[stone_index])
        drops.append(value)
        order = bowl_permutation(1 + (value - 1) % 720)
        if drop_number == 46:
            last = order
        old = bowls
        direct = [0] * 6
        for place, (stone_index, multiplier) in enumerate(zip(DIRECT_STONES, DIRECT_MULTIPLIERS)):
            bowl_id = order[place]
            direct[bowl_id] = saved(value * value + stones[stone_index] * old[bowl_id] + multiplier * drop_number)
        bowls = [0] * 6
        for place, bowl_id in enumerate(order):
            previous_id = order[(place - 1) % 6]
            next_id = order[(place + 1) % 6]
            mixed = old[bowl_id] + 2 * old[previous_id] + 3 * old[next_id] + direct[bowl_id] + value + stones[DROP_MIX_STONES[place]]
            bowls[bowl_id] = saved(mixed * mixed + 5 * old[previous_id] * old[next_id] + drop_number * (place + 1))
    assert last is not None
    for round_number in range(1, 13):
        bowl_sum = sum(bowls)
        order_number = saved(bowl_sum + 149 * round_number)
        order = bowl_permutation(1 + (order_number - 1) % 720)
        old = bowls
        bowls = [0] * 6
        for place, bowl_id in enumerate(order):
            previous_id = order[(place - 1) % 6]
            next_id = order[(place + 1) % 6]
            mixed = old[bowl_id] + 3 * old[previous_id] + 5 * old[next_id] + bowl_sum + round_number + (place + 1) ** 2
            bowls[bowl_id] = saved(mixed * mixed + 7 * old[previous_id] * old[next_id])
    return FinalSauce(tuple(bowls), last)


def response_descriptor(trace: SauceTrace | FinalSauce, bowl_id: int, seal: int) -> tuple[int, int]:
    place = trace.last_drop_permutation.index(bowl_id)
    next_bowl = trace.last_drop_permutation[(place + 1) % 6]
    first = saved((trace.bowls[bowl_id] + seal + 181) ** 2 + 179 * trace.bowls[next_bowl] + seal)
    direction_number = saved((first + seal + 194) ** 2 + 193 * first + 197 * trace.bowls[5])
    return first, 1 if direction_number & 1 else -1


def response_at(first: int, step: int, offset: int, space: int = M) -> int:
    return ((first - 1 + step * offset) % space) + 1


def choose(trace: SauceTrace | FinalSauce, bowl_id: int, seal: int, count: int) -> int:
    if count < 1:
        raise ValueError("empty choice")
    first, step = response_descriptor(trace, bowl_id, seal)
    if count <= M:
        limit = (M // count) * count
        accepted = first if first <= limit else (1 if step > 0 else limit)
        return ((accepted - 1) % count) + 1
    width = 1
    space = M
    while space < count:
        space *= M
        width += 1
    value = 1
    weight = 1
    for offset in range(width):
        value += (response_at(first, step, offset) - 1) * weight
        weight *= M
    limit = (space // count) * count
    accepted = value if value <= limit else (1 if step > 0 else limit)
    return ((accepted - 1) % count) + 1


@lru_cache(maxsize=131072)
def gate_distance(index: int) -> int:
    if index == 0:
        raise ValueError("gate-distance index is never zero")
    return choose(sauce_final(FOUNDATION_JDN, FOUNDATION_JDN + index), 0, 1, 922) + 41


class GateTable:
    def __init__(self) -> None:
        self.positions: dict[int, int] = {0: FOUNDATION_JDN}
        cache_path = os.environ.get("PASTAFARI_REFERENCE_GATE_CACHE")
        if cache_path:
            document = json.loads(Path(cache_path).read_text(encoding="utf-8"))
            if document.get("canonicalId") != CANONICAL_ID or document.get("normativeSourceSha256") != SOURCE_SHA256:
                raise RuntimeError("reference gate cache was derived from a different normative source")
            self.positions.update({int(index): int(position) for index, position in document["positions"]})
        self.minimum = min(self.positions)
        self.maximum = max(self.positions)

    def ensure(self, index: int) -> None:
        while self.maximum < index:
            nxt = self.maximum + 1
            self.positions[nxt] = self.positions[self.maximum] + gate_distance(nxt)
            self.maximum = nxt
        while self.minimum > index:
            nxt = self.minimum - 1
            self.positions[nxt] = self.positions[self.minimum] - gate_distance(nxt)
            self.minimum = nxt

    def position(self, index: int) -> int:
        self.ensure(index)
        return self.positions[index]

    def containing_interval(self, jdn: int) -> int:
        # Locate k such that G_k < jdn <= G_(k+1).
        if jdn > FOUNDATION_JDN:
            index = max(0, (jdn - FOUNDATION_JDN) // 500 - 8)
            self.ensure(index)
            while self.position(index + 1) < jdn:
                index += 1
            while self.position(index) >= jdn:
                index -= 1
            return index
        index = min(-1, (jdn - FOUNDATION_JDN) // 500 + 8)
        self.ensure(index)
        while self.position(index) >= jdn:
            index -= 1
        while self.position(index + 1) < jdn:
            index += 1
        return index


GATES = GateTable()


@dataclass(frozen=True)
class Year:
    number: int
    open_index: int
    close_index: int
    start_jdn: int
    end_jdn: int
    length: int
    gaps: int


def make_year(number: int, open_index: int, close_index: int) -> Year:
    opening = GATES.position(open_index)
    closing = GATES.position(close_index)
    return Year(number, open_index, close_index, opening + 1, closing, closing - opening, close_index - open_index)


def enumerate_year_5000_candidates(calculation_jdn: int) -> list[tuple[int, int, int]]:
    interval = GATES.containing_interval(calculation_jdn)
    openings: list[tuple[int, int]] = []
    index = interval
    while calculation_jdn - GATES.position(index) <= MAX_YEAR_DAYS:
        openings.append((index, GATES.position(index)))
        index -= 1
    closings: list[tuple[int, int]] = []
    index = interval + 1
    while GATES.position(index) - calculation_jdn <= MAX_YEAR_DAYS:
        closings.append((index, GATES.position(index)))
        index += 1
    result: list[tuple[int, int, int]] = []
    for open_index, opening in openings:
        for close_index, closing in closings:
            gaps = close_index - open_index
            length = closing - opening
            if gaps >= MIN_YEAR_GAPS and MIN_YEAR_DAYS <= length <= MAX_YEAR_DAYS:
                result.append((open_index, close_index, length))
    result.sort(key=lambda row: (row[2], row[0]))
    return result


def year_5000(calculation_jdn: int) -> tuple[Year, int, int]:
    candidates = enumerate_year_5000_candidates(calculation_jdn)
    selected = choose(sauce_final(calculation_jdn, calculation_jdn), 0, 10, len(candidates))
    open_index, close_index, _ = candidates[selected - 1]
    return make_year(5000, open_index, close_index), len(candidates), selected


def adjacent_candidates(open_index: int | None = None, close_index: int | None = None) -> list[tuple[int, int]]:
    if (open_index is None) == (close_index is None):
        raise ValueError("exactly one boundary must be fixed")
    result: list[tuple[int, int]] = []
    if open_index is not None:
        opening = GATES.position(open_index)
        index = open_index + MIN_YEAR_GAPS
        while True:
            length = GATES.position(index) - opening
            if length > MAX_YEAR_DAYS:
                break
            if length >= MIN_YEAR_DAYS:
                result.append((index, length))
            index += 1
    else:
        assert close_index is not None
        closing = GATES.position(close_index)
        index = close_index - MIN_YEAR_GAPS
        while True:
            length = closing - GATES.position(index)
            if length > MAX_YEAR_DAYS:
                break
            if length >= MIN_YEAR_DAYS:
                result.append((index, length))
            index -= 1
    result.sort(key=lambda row: (row[1], row[0]))
    return result


def next_year(calculation_jdn: int, year: Year) -> Year:
    candidates = adjacent_candidates(open_index=year.close_index)
    target = GATES.position(year.close_index)
    selected = choose(sauce_final(calculation_jdn, target), 0, 11, len(candidates))
    close_index, _ = candidates[selected - 1]
    return make_year(year.number + 1, year.close_index, close_index)


def previous_year(calculation_jdn: int, year: Year) -> Year:
    candidates = adjacent_candidates(close_index=year.open_index)
    target = GATES.position(year.open_index)
    selected = choose(sauce_final(calculation_jdn, target), 0, 12, len(candidates))
    open_index, _ = candidates[selected - 1]
    return make_year(year.number - 1, open_index, year.open_index)


def binomial(n: int, k: int) -> int:
    if n < 0 or k < 0 or k > n:
        return 0
    k = min(k, n - k)
    result = 1
    for value in range(1, k + 1):
        result = result * (n - k + value) // value
    return result


def permutation_count(n: int, k: int) -> int:
    if k < 0 or k > n:
        return 0
    result = 1
    for value in range(n - k + 1, n + 1):
        result *= value
    return result


def unrank_names(names: tuple[str, ...], count: int, rank_one_based: int) -> tuple[str, ...]:
    available = list(names)
    rank = rank_one_based - 1
    result: list[str] = []
    for position in range(count):
        block = permutation_count(len(available) - 1, count - position - 1)
        index, rank = divmod(rank, block)
        result.append(available.pop(index))
    return tuple(result)


def composition_suffix_count(remaining: int, parts: int, mandatory_offset: int | None) -> int:
    if parts == 0:
        return int(remaining == 0 and mandatory_offset in (None, 0))
    if remaining < parts:
        return 0
    if mandatory_offset in (None, 0):
        return binomial(remaining - 1, parts - 1)
    if mandatory_offset <= 0 or mandatory_offset >= remaining or parts < 2:
        return 0
    return binomial(remaining - 2, parts - 2)


def unrank_composition(total: int, parts: int, mandatory_cut: int | None, rank_one_based: int) -> tuple[int, ...]:
    remaining = total
    cumulative = 0
    rank = rank_one_based
    hit = mandatory_cut is None
    result: list[int] = []
    for position in range(parts):
        left = parts - position - 1
        for value in range(1, remaining - left + 1):
            after = remaining - value
            new_cumulative = cumulative + value
            new_hit = hit or (mandatory_cut is not None and new_cumulative == mandatory_cut)
            mandatory_offset: int | None = None
            if not new_hit:
                if mandatory_cut is None or mandatory_cut < new_cumulative:
                    continue
                mandatory_offset = mandatory_cut - new_cumulative
            block = composition_suffix_count(after, left, None if new_hit else mandatory_offset)
            if rank > block:
                rank -= block
                continue
            result.append(value)
            remaining = after
            cumulative = new_cumulative
            hit = new_hit
            break
        else:
            raise RuntimeError("composition rank exhausted")
    return tuple(result)


@lru_cache(maxsize=None)
def bounded_month_length_count(total: int, parts: int) -> int:
    shifted = total - 4 * parts
    if shifted < 0 or shifted > 119 * parts:
        return 0
    answer = 0
    for excluded in range(0, min(parts, shifted // 120) + 1):
        ways = binomial(parts, excluded) * binomial(shifted - 120 * excluded + parts - 1, parts - 1)
        answer = answer + ways if excluded % 2 == 0 else answer - ways
    return answer


def unrank_month_lengths(total: int, parts: int, rank_one_based: int) -> tuple[int, ...]:
    remaining = total
    rank = rank_one_based
    result: list[int] = []
    for position in range(parts):
        left = parts - position - 1
        maximum = min(123, remaining - 4 * left)
        for value in range(4, maximum + 1):
            after = remaining - value
            block = int(after == 0) if left == 0 else bounded_month_length_count(after, left)
            if rank > block:
                rank -= block
                continue
            result.append(value)
            remaining = after
            break
        else:
            raise RuntimeError("month-length rank exhausted")
    return tuple(result)


class InterleavingCounter:
    """Prefix-count DP equivalent to the source's lexicographic enumeration."""
    def __init__(self, lengths: tuple[int, ...]):
        self.lengths = lengths
        self.cache: dict[int, tuple[int, ...]] = {}

    def get(self, last_seen: int, q: int) -> int:
        if last_seen >= len(self.lengths) - 1:
            return 1
        cached = self.cache.get(last_seen)
        if cached is None or len(cached) <= q:
            self.rebuild(last_seen, q)
        return self.cache[last_seen][q]

    def rebuild(self, start: int, q_start: int) -> None:
        needed = [0] * len(self.lengths)
        needed[start] = q_start
        for index in range(start, len(self.lengths) - 1):
            needed[index + 1] = needed[index] + self.lengths[index + 1] - 1
        following: list[int] | None = None
        self.cache.clear()
        for index in range(len(self.lengths) - 1, start - 1, -1):
            q_maximum = needed[index]
            if index == len(self.lengths) - 1:
                current = [1] * (q_maximum + 1)
            else:
                assert following is not None
                current = [0] * (q_maximum + 1)
                cumulative = 0
                weight = 1
                month_length = self.lengths[index + 1]
                for q in range(1, q_maximum + 1):
                    r = q - 1
                    cumulative += weight * following[month_length + r]
                    current[q] = cumulative
                    weight = weight * (month_length + r - 1) // (r + 1)
            following = current
            if index <= start + 7:
                self.cache[index] = tuple(current)


def interleaving_count(lengths: tuple[int, ...]) -> int:
    return InterleavingCounter(lengths).get(0, lengths[0])


def unrank_interleaving(lengths: tuple[int, ...], rank_one_based: int) -> tuple[int, ...]:
    month_count = len(lengths)
    total_length = sum(lengths)
    counter = InterleavingCounter(lengths)
    weave = [0] * total_length
    remaining = list(lengths)
    remaining[0] -= 1
    low = 0
    high = 0
    active_total = remaining[0]
    base_count = 1
    rank = rank_one_based
    expected_total = counter.get(0, active_total + 1)
    if rank < 1 or rank > expected_total:
        raise ValueError("interleaving rank outside range")
    for position in range(1, total_length):
        span = high - low + 1
        prefix: list[int] = []
        running = 0
        for index in range(low, high + 1):
            running += remaining[index]
            prefix.append(running)
        suffix_p = [1] * (span + 1)
        suffix_pm1 = [1] * (span + 1)
        for offset in range(span - 1, -1, -1):
            suffix_p[offset] = suffix_p[offset + 1] * prefix[offset]
            suffix_pm1[offset] = suffix_pm1[offset + 1] * (prefix[offset] - 1)
        future_same = counter.get(high, active_total) if high < month_count - 1 else 1
        selected = False
        for month in range(low, high + 1):
            remaining_for_month = remaining[month]
            if remaining_for_month == 1 and month != low:
                continue
            offset = month - low
            if remaining_for_month > 1:
                numerator = (remaining_for_month - 1) * suffix_p[offset]
                denominator = active_total * suffix_pm1[offset]
            else:
                numerator = suffix_p[offset + 1]
                denominator = active_total * suffix_pm1[offset + 1]
            next_base = base_count * numerator // denominator
            block = next_base * future_same
            if rank > block:
                rank -= block
                continue
            weave[position] = month
            remaining[month] -= 1
            active_total -= 1
            base_count = next_base
            if remaining[month] == 0:
                low += 1
            selected = True
            break
        if selected:
            continue
        if high + 1 >= month_count:
            raise RuntimeError("interleaving rank exhausted")
        month = high + 1
        new_remaining = lengths[month] - 1
        next_base = base_count * binomial(active_total + new_remaining - 1, new_remaining - 1)
        next_active = active_total + new_remaining
        future = counter.get(month, next_active + 1) if month < month_count - 1 else 1
        block = next_base * future
        if rank > block:
            raise RuntimeError("interleaving final branch exhausted")
        weave[position] = month
        high = month
        remaining[month] -= 1
        if low > month - 1:
            low = month
        active_total = next_active
        base_count = next_base
    return tuple(weave)


@dataclass(frozen=True)
class YearStructure:
    cutlet_gaps: tuple[int, ...]
    cutlet_names: tuple[str, ...]
    cutlet_starts: tuple[int, ...]
    cutlet_ends: tuple[int, ...]
    month_lengths: tuple[int, ...]
    month_names: tuple[str, ...]
    month_weave: tuple[int, ...]
    day_in_month: tuple[int, ...]


def build_year_structure(calculation_jdn: int, year: Year) -> YearStructure:
    trace = sauce_final(calculation_jdn, year.start_jdn)
    maximum_cutlets = min(17, year.gaps)
    cutlet_count = 5 + choose(trace, 1, 20, maximum_cutlets - 5)
    mandatory_cut: int | None = None
    if year.start_jdn <= calculation_jdn <= year.end_jdn:
        for gate_index in range(year.open_index + 1, year.close_index):
            if GATES.position(gate_index) == calculation_jdn:
                mandatory_cut = gate_index - year.open_index
                break
    partition_count = binomial(
        year.gaps - (1 if mandatory_cut is None else 2),
        cutlet_count - (1 if mandatory_cut is None else 2),
    )
    cutlet_gaps = unrank_composition(
        year.gaps, cutlet_count, mandatory_cut,
        choose(trace, 1, 21, partition_count),
    )
    cutlet_names = unrank_names(
        CUTLET_NAMES, cutlet_count,
        choose(trace, 4, 22, permutation_count(len(CUTLET_NAMES), cutlet_count)),
    )
    minimum_months = (year.length + 122) // 123
    maximum_months = min(47, year.length // 4)
    month_count = minimum_months - 1 + choose(trace, 2, 30, maximum_months - minimum_months + 1)
    month_lengths = unrank_month_lengths(
        year.length, month_count,
        choose(trace, 2, 31, bounded_month_length_count(year.length, month_count)),
    )
    weave_count = interleaving_count(month_lengths)
    month_weave = unrank_interleaving(month_lengths, choose(trace, 3, 32, weave_count))
    month_names = unrank_names(
        MONTH_NAMES, month_count,
        choose(trace, 4, 33, permutation_count(len(MONTH_NAMES), month_count)),
    )
    seen = [0] * month_count
    day_in_month: list[int] = []
    for month in month_weave:
        seen[month] += 1
        day_in_month.append(seen[month])
    cutlet_starts: list[int] = []
    cutlet_ends: list[int] = []
    gap_offset = 0
    day_offset = 0
    for gaps in cutlet_gaps:
        cutlet_starts.append(day_offset)
        gap_offset += gaps
        end_jdn = GATES.position(year.open_index + gap_offset)
        day_offset = end_jdn - year.start_jdn + 1
        cutlet_ends.append(day_offset - 1)
    return YearStructure(
        cutlet_gaps, cutlet_names, tuple(cutlet_starts), tuple(cutlet_ends),
        month_lengths, month_names, month_weave, tuple(day_in_month),
    )


def materialize(year: Year, structure: YearStructure, target_jdn: int) -> dict[str, object]:
    offset = target_jdn - year.start_jdn
    if not 0 <= offset < year.length:
        raise ValueError("target outside year")
    cutlet = next(i for i, (start, end) in enumerate(zip(structure.cutlet_starts, structure.cutlet_ends)) if start <= offset <= end)
    month = structure.month_weave[offset]
    return {
        "year": str(year.number),
        "cutletName": structure.cutlet_names[cutlet],
        "dayInCutlet": offset - structure.cutlet_starts[cutlet] + 1,
        "monthName": structure.month_names[month],
        "dayInMonth": structure.day_in_month[offset],
    }


class Calendar:
    def __init__(self, calculation_jdn: int):
        self.calculation_jdn = calculation_jdn
        self.years: dict[int, Year] = {}
        self.structures: dict[tuple[int, int], YearStructure] = {}
        y, _, _ = year_5000(calculation_jdn)
        self.years[5000] = y

    def find_year(self, target_jdn: int) -> Year:
        year = self.years[5000]
        if target_jdn < year.start_jdn:
            while target_jdn < year.start_jdn:
                number = year.number - 1
                year = self.years.get(number) or previous_year(self.calculation_jdn, year)
                self.years[number] = year
        else:
            while target_jdn > year.end_jdn:
                number = year.number + 1
                year = self.years.get(number) or next_year(self.calculation_jdn, year)
                self.years[number] = year
        return year

    def structure(self, year: Year) -> YearStructure:
        key = (year.open_index, year.close_index)
        if key not in self.structures:
            self.structures[key] = build_year_structure(self.calculation_jdn, year)
        return self.structures[key]

    def convert(self, target_jdn: int) -> dict[str, object]:
        year = self.find_year(target_jdn)
        return materialize(year, self.structure(year), target_jdn)


def gregorian_to_jdn(year: int, month: int, day: int) -> int:
    a = (14 - month) // 12
    y = year + 4800 - a
    m = month + 12 * a - 3
    return day + (153 * m + 2) // 5 + 365 * y + y // 4 - y // 100 + y // 400 - 32045


def iso_to_jdn(text: str) -> int:
    # Split from the right so negative years remain intact.
    year_text, month_text, day_text = text.rsplit("-", 2)
    if year_text == "":
        # For forms such as -41221-12-22, rsplit yields ['', '41221', ...]
        raise ValueError(text)
    return gregorian_to_jdn(int(year_text), int(month_text), int(day_text))


def parse_iso(text: str) -> tuple[int, int, int]:
    import re
    match = re.fullmatch(r"([+-]?\d+)-(\d{2})-(\d{2})", text)
    if not match:
        raise ValueError(text)
    return int(match.group(1)), int(match.group(2)), int(match.group(3))


def jdn_from_iso(text: str) -> int:
    return gregorian_to_jdn(*parse_iso(text))


def vector(vector_id: str, calculation_jdn: int, target_jdn: int, expected: dict[str, object], note: str) -> dict[str, object]:
    return {
        "id": vector_id,
        "calculationJdn": str(calculation_jdn),
        "targetJdn": str(target_jdn),
        "expected": expected,
        "note": note,
    }


def generate() -> dict[str, object]:
    print("stage: sauce vectors", flush=True)
    source_cases = []
    sauce_pairs = (
        ("foundation_same", FOUNDATION_JDN, FOUNDATION_JDN),
        ("foundation_backward", FOUNDATION_JDN + 17, FOUNDATION_JDN - 9),
        ("ordinary_forward", jdn_from_iso("2026-08-06"), jdn_from_iso("2026-08-12")),
    )
    for case_id, calculation_jdn, target_jdn in sauce_pairs:
        trace = sauce(calculation_jdn, target_jdn)
        source_cases.append({
            "id": case_id,
            "calculationJdn": str(calculation_jdn),
            "targetJdn": str(target_jdn),
            "dayNumbers": {
                "calculation": str(day_number(calculation_jdn)),
                "target": str(day_number(target_jdn)),
                "distance": str(abs(target_jdn - calculation_jdn) + 1),
                "addition": str(day_number(calculation_jdn) + day_number(target_jdn)),
                "direction": 1 if target_jdn < calculation_jdn else 2 if target_jdn == calculation_jdn else 3,
            },
            "hiddenDrops": [str(value) for value in trace.hidden],
            "visibleDrops": {str(index): str(trace.drops[index - 1]) for index in (1, 2, 3, 7, 8, 23, 46)},
            "drop1Order": [value + 1 for value in trace.drop_orders[0]],
            "bowlsAfterDrop1": [str(value) for value in trace.bowls_after_drops[0]],
            "drop46Order": [value + 1 for value in trace.drop_orders[45]],
            "bowlsAfterDrop46": [str(value) for value in trace.bowls_after_drops[45]],
            "stir1OrderNumber": str(trace.stir_order_numbers[0]),
            "stir1Order": [value + 1 for value in trace.stir_orders[0]],
            "bowlsAfterStir1": [str(value) for value in trace.bowls_after_stirs[0]],
            "stir12OrderNumber": str(trace.stir_order_numbers[11]),
            "stir12Order": [value + 1 for value in trace.stir_orders[11]],
            "finalBowls": [str(value) for value in trace.bowls],
            "responseDescriptors": [
                {"bowl": bowl + 1, "seal": seal, "first": str(response_descriptor(trace, bowl, seal)[0]), "step": response_descriptor(trace, bowl, seal)[1]}
                for bowl, seal in ((0, 1), (0, 10), (1, 21), (3, 32), (4, 33))
            ],
            "choices": [
                {"bowl": 1, "seal": 1, "count": str(count), "selected": str(choose(trace, 0, 1, count))}
                for count in (1, 17, 922, M - 12345, M + 1, M * M - 1_234_567)
            ],
        })

    print("stage: gate vectors", flush=True)
    gate_indices = (-1024, -7, -1, 0, 1, 7, 1024)
    gate_vectors = []
    for index in gate_indices:
        gate_vectors.append({
            "index": index,
            "positionJdn": str(GATES.position(index)),
            "distanceFromPrevious": None if index == 0 else gate_distance(index),
        })

    print("stage: foundation year", flush=True)
    foundation_year, foundation_candidate_count, foundation_selected = year_5000(FOUNDATION_JDN)

    print("stage: signed year chain fixture", flush=True)
    deep_chain_path = Path(__file__).with_name("spec-derived-deep-year-chain.json")
    if not deep_chain_path.exists():
        raise RuntimeError("run the specification-derived deep-year-chain generator before the main canonical generator")
    deep_chain = json.loads(deep_chain_path.read_text(encoding="utf-8"))
    if deep_chain.get("normativeSourceSha256") != SOURCE_SHA256:
        raise RuntimeError("deep year-chain fixture was derived from a different normative source")
    signed_year_chain = deep_chain["signedYearChain"]

    print("stage: combinatorics", flush=True)
    combinatorics = {
        "cutletCompositions": [
            {
                "total": 8, "parts": 3, "mandatoryCut": mandatory,
                "rows": [list(unrank_composition(8, 3, mandatory, rank)) for rank in range(1, (binomial(7, 2) if mandatory is None else binomial(6, 1)) + 1)],
            }
            for mandatory in (None, 3)
        ],
        "monthLengths": {
            "total": 14,
            "parts": 3,
            "count": bounded_month_length_count(14, 3),
            "rows": [list(unrank_month_lengths(14, 3, rank)) for rank in range(1, bounded_month_length_count(14, 3) + 1)],
        },
        "namePermutation": {
            "source": ["A", "B", "C", "D"],
            "selected": 3,
            "rows": [list(unrank_names(("A", "B", "C", "D"), 3, rank)) for rank in range(1, permutation_count(4, 3) + 1)],
        },
        "monthInterleaving": {
            "lengths": [4, 4, 4],
            "count": interleaving_count((4, 4, 4)),
            "selectedRanks": {
                str(rank): [value + 1 for value in unrank_interleaving((4, 4, 4), rank)]
                for rank in (1, 2, 650, 1300, 1301)
            },
        },
    }

    print("stage: ordinary vectors", flush=True)
    ordinary_iso_pairs = (
        ("foundation_same", "-41221-12-22", "-41221-12-22"),
        ("foundation_next", "-41221-12-22", "-41221-12-23"),
        ("foundation_previous", "-41221-12-22", "-41221-12-21"),
        ("present_same", "2026-08-06", "2026-08-06"),
        ("present_forward", "2026-08-06", "2026-08-12"),
    )
    full_vectors: list[dict[str, object]] = []
    calendars: dict[int, Calendar] = {}
    for vector_id, calculation_iso, target_iso in ordinary_iso_pairs:
        calculation_jdn = jdn_from_iso(calculation_iso)
        target_jdn = jdn_from_iso(target_iso)
        calendar = calendars.get(calculation_jdn)
        if calendar is None:
            calendar = Calendar(calculation_jdn)
            calendars[calculation_jdn] = calendar
        full_vectors.append(vector(vector_id, calculation_jdn, target_jdn, calendar.convert(target_jdn), f"spec-derived from {calculation_iso} -> {target_iso}"))

    print("stage: boundary witnesses", flush=True)
    binding_path = Path(__file__).with_name("spec-derived-binding-5778.json")
    if not binding_path.exists():
        raise RuntimeError("run generate_spec_binding_5778.py before the main canonical generator")
    binding_document = json.loads(binding_path.read_text(encoding="utf-8"))
    if binding_document.get("normativeSourceSha256") != SOURCE_SHA256:
        raise RuntimeError("5778 fixture was derived from a different normative source")
    full_vectors.append(binding_document["vector"])

    gregorian_vectors = [
        {"iso": text, "jdn": str(jdn_from_iso(text))}
        for text in (
            "-100000-03-01", "-41221-12-22", "-0001-12-31", "0000-02-29",
            "0001-01-01", "1600-02-29", "1700-03-01", "1900-03-01",
            "2000-02-29", "2100-03-01", "+100000-12-31",
        )
    ]

    # Boundary witnesses. Month weaving is expensive for a few pathological years,
    # so full five-field boundary vectors use the first two adjacent ordinary years;
    # all 17 cutlet names are covered separately by a cutlet-only source derivation.
    calculation_jdn = jdn_from_iso("2026-08-06")
    calendar = calendars.get(calculation_jdn)
    if calendar is None:
        calendar = Calendar(calculation_jdn)
        calendars[calculation_jdn] = calendar
    period_witnesses = {"cutlets": {}, "months": {}, "years": {}}
    boundary_targets: dict[int, list[str]] = {}

    def cutlet_only(year: Year) -> tuple[tuple[str, ...], tuple[int, ...], tuple[int, ...]]:
        trace = sauce_final(calculation_jdn, year.start_jdn)
        cutlet_count = 5 + choose(trace, 1, 20, min(17, year.gaps) - 5)
        mandatory_cut = None
        if year.start_jdn <= calculation_jdn <= year.end_jdn:
            for gate_index in range(year.open_index + 1, year.close_index):
                if GATES.position(gate_index) == calculation_jdn:
                    mandatory_cut = gate_index - year.open_index
                    break
        partition_count = binomial(
            year.gaps - (1 if mandatory_cut is None else 2),
            cutlet_count - (1 if mandatory_cut is None else 2),
        )
        gaps = unrank_composition(
            year.gaps, cutlet_count, mandatory_cut,
            choose(trace, 1, 21, partition_count),
        )
        names = unrank_names(
            CUTLET_NAMES, cutlet_count,
            choose(trace, 4, 22, permutation_count(len(CUTLET_NAMES), cutlet_count)),
        )
        starts: list[int] = []
        ends: list[int] = []
        gap_offset = 0
        day_offset = 0
        for gap_count in gaps:
            starts.append(day_offset)
            gap_offset += gap_count
            end_jdn = GATES.position(year.open_index + gap_offset)
            day_offset = end_jdn - year.start_jdn + 1
            ends.append(day_offset - 1)
        return names, tuple(starts), tuple(ends)

    # Full structures for 5000 and 5001 cover every month name at least once.
    print("boundary: calendar ready", flush=True)
    y5000 = calendar.years[5000]
    y5001 = calendar.years.get(5001) or next_year(calculation_jdn, y5000)
    calendar.years[5001] = y5001
    for year in (y5000, y5001):
        print(f"boundary: full structure {year.number}", flush=True)
        structure = calendar.structure(year)
        print(f"boundary: structure {year.number} ready", flush=True)
        period_witnesses["years"][str(year.number)] = {
            "firstJdn": str(year.start_jdn), "lastJdn": str(year.end_jdn)
        }
        boundary_targets.setdefault(year.start_jdn, []).append(f"year:{year.number}:first")
        boundary_targets.setdefault(year.end_jdn, []).append(f"year:{year.number}:last")
        for index, name in enumerate(structure.cutlet_names):
            first = year.start_jdn + structure.cutlet_starts[index]
            last = year.start_jdn + structure.cutlet_ends[index]
            period_witnesses["cutlets"].setdefault(name, {"firstJdn": str(first), "lastJdn": str(last), "year": year.number})
            boundary_targets.setdefault(first, []).append(f"cutlet:{name}:first")
            boundary_targets.setdefault(last, []).append(f"cutlet:{name}:last")
        for month_index, name in enumerate(structure.month_names):
            offsets = [i for i, value in enumerate(structure.month_weave) if value == month_index]
            first = year.start_jdn + offsets[0]
            last = year.start_jdn + offsets[-1]
            period_witnesses["months"].setdefault(name, {"firstJdn": str(first), "lastJdn": str(last), "year": year.number})
            boundary_targets.setdefault(first, []).append(f"month:{name}:first")
            boundary_targets.setdefault(last, []).append(f"month:{name}:last")

    # Continue adjacent years with cutlet-only derivation until all 17 names appear.
    radius = 1
    while len(period_witnesses["cutlets"]) < len(CUTLET_NAMES):
        for number in (5000 - radius, 5000 + radius + 1):
            if number < 5000:
                for n in range(4999, number - 1, -1):
                    if n not in calendar.years:
                        calendar.years[n] = previous_year(calculation_jdn, calendar.years[n + 1])
            else:
                for n in range(5002, number + 1):
                    if n not in calendar.years:
                        calendar.years[n] = next_year(calculation_jdn, calendar.years[n - 1])
            year = calendar.years[number]
            names, starts, ends = cutlet_only(year)
            for index, name in enumerate(names):
                first = year.start_jdn + starts[index]
                last = year.start_jdn + ends[index]
                period_witnesses["cutlets"].setdefault(name, {"firstJdn": str(first), "lastJdn": str(last), "year": year.number})
            if len(period_witnesses["cutlets"]) == len(CUTLET_NAMES):
                break
        radius += 1
        if radius > 30:
            raise RuntimeError("cutlet-name boundary coverage did not converge")

    print(f"boundary: coverage cutlets={len(period_witnesses['cutlets'])} months={len(period_witnesses['months'])}", flush=True)
    if len(period_witnesses["months"]) != len(MONTH_NAMES):
        raise RuntimeError("first two ordinary years did not cover every month name")

    # Materialize only witnesses that belong to the two already-built full structures.
    print(f"boundary: materialize {len(boundary_targets)} targets", flush=True)
    for ordinal, target_jdn in enumerate(sorted(boundary_targets), 1):
        full_vectors.append(vector(
            f"period_boundary_{ordinal:03d}", calculation_jdn, target_jdn,
            calendar.convert(target_jdn), "; ".join(sorted(boundary_targets[target_jdn])),
        ))

    print("stage: assemble document", flush=True)
    return {
        "canonicalId": CANONICAL_ID,
        "authority": authority_metadata(),
        "normativeSource": {
            "title": "מגילת העיתים — לוח סוד הרוטב ושמות הימים",
            "date": "2026-08-16",
            "sha256": SOURCE_SHA256,
        },
        "provenance": {
            "generator": "implementations/tests/generate_spec_canonical.py",
            "productionImplementationImported": False,
            "historicalJavaScriptUsed": False,
            "historicalRegressionCorpusUsed": False,
        },
        "constants": {
            "greatModulus": str(M),
            "foundationJdn": str(FOUNDATION_JDN),
            "maxYearDays": MAX_YEAR_DAYS,
            "erroneousBodyValueNotBinding": 5781,
            "sixMaximumGateGaps": 6 * 963,
        },
        "dayNumberBoundary": [
            {"offset": offset, "jdn": str(FOUNDATION_JDN + offset), "dayNumber": str(day_number(FOUNDATION_JDN + offset))}
            for offset in range(-3, 4)
        ],
        "bowlPermutationBoundary": [
            {"savedValue": str(value), "rank": 1 + (value - 1) % 720, "order": [item + 1 for item in bowl_permutation(1 + (value - 1) % 720)]}
            for value in (1, 720, 721, 1440)
        ],
        "answerRingBoundary": {
            "forwardFromM": [str(response_at(M, 1, offset)) for offset in range(4)],
            "backwardFrom1": [str(response_at(1, -1, offset)) for offset in range(4)],
        },
        "stones": {
            str(index): [str(value) for value in STONES[index - 1]]
            for index in (1, 2, 7, 23, 46)
        },
        "sauceVectors": source_cases,
        "gateVectors": gate_vectors,
        "year5000Foundation": {
            "candidateCount": foundation_candidate_count,
            "selectedOneBased": foundation_selected,
            "openIndex": foundation_year.open_index,
            "closeIndex": foundation_year.close_index,
            "startJdn": str(foundation_year.start_jdn),
            "endJdn": str(foundation_year.end_jdn),
            "length": foundation_year.length,
        },
        "signedYearChain": signed_year_chain,
        "structureTargetRule": {
            "calculationJdn": str(FOUNDATION_JDN),
            "year": foundation_year.number,
            "yearStartJdnUsedAsSauceTarget": str(foundation_year.start_jdn),
        },
        "combinatorics": combinatorics,
        "forwardVectors": full_vectors,
        "gregorianVectors": gregorian_vectors,
        "invalidInputCases": [
            {"kind": "gregorian", "value": "2026-02-29", "reason": "non-leap February 29"},
            {"kind": "gregorian", "value": "1900-02-29", "reason": "century is not leap unless divisible by 400"},
            {"kind": "gregorian", "value": "2026-13-01", "reason": "month outside 1..12"},
            {"kind": "gregorian", "value": "not-a-date", "reason": "invalid signed ISO syntax"},
        ],
        "coverage": {
            "cutletNames": sorted(period_witnesses["cutlets"]),
            "monthNames": sorted(period_witnesses["months"]),
            "yearsWithFullBoundaryVectors": [5000, 5001],
            "forwardVectorCount": len(full_vectors),
        },
        "periodBoundaryWitnesses": period_witnesses,
    }


def main() -> int:
    destination = Path(__file__).with_name("spec-derived-canonical-vectors.json")
    document = generate()
    destination.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    compact_ids = {
        "foundation_same", "foundation_next", "foundation_previous",
        "binding_5778_same", "present_same", "present_forward",
    }
    compact_vectors = [v for v in document["forwardVectors"] if v["id"] in compact_ids]
    if len(compact_vectors) != len(compact_ids):
        raise RuntimeError("compact canonical vector selection is incomplete")
    compact = {
        "canonicalId": CANONICAL_ID,
        "fixtureType": "legacy-canonical-format-regression",
        "authority": authority_metadata(),
        "normativeSourceSha256": SOURCE_SHA256,
        "inputOrder": ["calculationJdn", "targetJdn"],
        "vectors": compact_vectors,
    }
    compact_path = Path(__file__).with_name("conformance-vectors.json")
    compact_path.write_text(json.dumps(compact, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"wrote {destination}")
    print(f"wrote {compact_path}")
    print(f"forward vectors: {len(document['forwardVectors'])}")
    print(f"compact canonical vectors: {len(compact_vectors)}")
    print(f"cutlet names covered: {len(document['coverage']['cutletNames'])}/17")
    print(f"month names covered: {len(document['coverage']['monthNames'])}/47")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
