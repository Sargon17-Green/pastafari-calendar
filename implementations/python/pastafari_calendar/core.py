"""Efficient, readable implementation of *The Scroll of the Appointed Times*.

The public algorithm consumes two civil days in a fixed order:

1. the calculation day (``calculation_jdn``); and
2. the queried day (``target_jdn``).

The implementation follows the binding 5,778-day upper year bound.  The
5,781 value that appears once in the prose is explicitly corrected by note 13
of the Scroll and is inconsistent with the six-gap proof (6 * 963 = 5,778).

Python's arbitrary-precision integers are used deliberately.  Replacing them
with machine integers silently corrupts the sauce, combinatorial ranks and
wide-choice arithmetic.
"""

from __future__ import annotations

from bisect import bisect_left
from collections import OrderedDict
from dataclasses import dataclass
from datetime import date as system_date
from math import comb
from typing import Generic, Sequence, TypeVar


GREAT = (1 << 127) - 1
FOUNDATION_JDN = -13_334_246
ALGORITHM_ID = "PASTAFARI-TABLETS-2026-08-11-V2-5778"

MIN_GATE_DISTANCE = 42
MAX_GATE_DISTANCE = 963
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
    (3, 5, 7, 11, 0),
    (5, 7, 11, 13, 1),
    (7, 11, 13, 17, 2),
    (11, 13, 17, 19, 3),
    (13, 17, 19, 23, 4),
    (17, 19, 23, 29, 0),
    (19, 23, 29, 31, 1),
    (23, 29, 31, 37, 2),
    (29, 31, 37, 41, 3),
    (31, 37, 41, 43, 4),
    (37, 41, 43, 47, 0),
)

HIDDEN_COEFFICIENTS = (
    (3, 4, 6, 8),
    (5, 7, 10, 12),
    (7, 10, 14, 16),
    (9, 13, 18, 20),
    (11, 16, 22, 24),
    (13, 19, 26, 28),
    (15, 22, 30, 32),
)

HIDDEN_STONE_ORDER = (0, 1, 2, 3, 4, 0, 1)
BOWL_PRIMES = (17, 19, 23, 29, 31, 37)
DIRECT_MULTIPLIERS = (3, 5, 7)
DIRECT_STONES = (0, 1, 2)
DROP_MIX_STONES = (0, 1, 2, 3, 4, 0)


class PastafariError(RuntimeError):
    """Base class for deterministic calendar failures."""


class InvalidInputError(ValueError, PastafariError):
    """Raised when a caller supplies an invalid date or rank."""


class InternalInvariantError(PastafariError):
    """Raised only when an algorithmic invariant has been violated."""


K = TypeVar("K")
V = TypeVar("V")


class LruCache(Generic[K, V]):
    """Small explicit LRU cache; values may legitimately be falsey."""

    __slots__ = ("_limit", "_items")

    def __init__(self, limit: int) -> None:
        if limit < 1:
            raise ValueError("LRU limit must be positive")
        self._limit = limit
        self._items: OrderedDict[K, V] = OrderedDict()

    def get(self, key: K) -> V | None:
        try:
            value = self._items.pop(key)
        except KeyError:
            return None
        self._items[key] = value
        return value

    def set(self, key: K, value: V) -> None:
        self._items.pop(key, None)
        self._items[key] = value
        if len(self._items) > self._limit:
            self._items.popitem(last=False)

    def clear(self) -> None:
        self._items.clear()

    def __len__(self) -> int:
        return len(self._items)


class GatePositionCache:
    """Bounded LRU cache that can also find the nearest cached gate index."""

    __slots__ = ("_limit", "_items", "_keys")

    def __init__(self, limit: int) -> None:
        self._limit = limit
        self._items: OrderedDict[int, int] = OrderedDict()
        self._keys: list[int] = []

    def get(self, index: int) -> int | None:
        try:
            value = self._items.pop(index)
        except KeyError:
            return None
        self._items[index] = value
        return value

    def set(self, index: int, value: int) -> None:
        if index in self._items:
            self._items.pop(index)
        else:
            self._keys.insert(bisect_left(self._keys, index), index)
        self._items[index] = value
        if len(self._items) > self._limit:
            evicted, _ = self._items.popitem(last=False)
            self._keys.pop(bisect_left(self._keys, evicted))

    def nearest(self, index: int) -> tuple[int, int]:
        if not self._keys:
            raise InternalInvariantError("Gate-position cache is empty")
        position = bisect_left(self._keys, index)
        if position == 0:
            selected = self._keys[0]
        elif position == len(self._keys):
            selected = self._keys[-1]
        else:
            right = self._keys[position]
            left = self._keys[position - 1]
            selected = left if index - left <= right - index else right
        value = self.get(selected)
        if value is None:  # pragma: no cover - synchronized structures
            raise InternalInvariantError("Sorted gate key is absent from LRU storage")
        return selected, value

    def clear(self) -> None:
        self._items.clear()
        self._keys.clear()


def keep(value: int) -> int:
    """Return the Scroll's saved remainder in the inclusive range 1..GREAT."""

    return (value - 1) % GREAT + 1


def binomial(n: int, k: int) -> int:
    """Binomial coefficient with zero for an invalid combinatorial state."""

    if n < 0 or k < 0 or k > n:
        return 0
    return comb(n, k)


def permutation_count(n: int, k: int) -> int:
    if k < 0 or k > n:
        return 0
    result = 1
    for value in range(n - k + 1, n + 1):
        result *= value
    return result


@dataclass(frozen=True, slots=True)
class GregorianDate:
    """Proleptic Gregorian date using astronomical year numbering."""

    year: int
    month: int
    day: int

    def __post_init__(self) -> None:
        if not 1 <= self.month <= 12:
            raise InvalidInputError("Gregorian month must be in 1..12")
        maximum = gregorian_month_length(self.year, self.month)
        if not 1 <= self.day <= maximum:
            raise InvalidInputError(
                f"Gregorian day must be in 1..{maximum} for this month"
            )

    @classmethod
    def parse(cls, value: str) -> "GregorianDate":
        """Parse ``[+-]YYYY-MM-DD`` without the host date library's year limit."""

        text = value.strip()
        last_dash = text.rfind("-")
        middle_dash = text.rfind("-", 0, last_dash)
        if middle_dash <= 0 or last_dash <= middle_dash + 1:
            raise InvalidInputError("Date must use [+-]YYYY-MM-DD")
        year_text = text[:middle_dash]
        month_text = text[middle_dash + 1:last_dash]
        day_text = text[last_dash + 1:]
        if (
            not year_text.lstrip("+-").isdigit()
            or len(month_text) != 2
            or len(day_text) != 2
            or not month_text.isdigit()
            or not day_text.isdigit()
        ):
            raise InvalidInputError("Date must use [+-]YYYY-MM-DD")
        return cls(int(year_text), int(month_text), int(day_text))

    @classmethod
    def today(cls) -> "GregorianDate":
        current = system_date.today()
        return cls(current.year, current.month, current.day)

    def isoformat(self) -> str:
        sign = "-" if self.year < 0 else ""
        digits = str(abs(self.year)).rjust(4, "0")
        return f"{sign}{digits}-{self.month:02d}-{self.day:02d}"


def is_gregorian_leap_year(year: int) -> bool:
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


def gregorian_month_length(year: int, month: int) -> int:
    if month == 2:
        return 29 if is_gregorian_leap_year(year) else 28
    return 30 if month in (4, 6, 9, 11) else 31


def gregorian_to_jdn(value: GregorianDate) -> int:
    """Convert a proleptic Gregorian civil day to its integer JDN."""

    a = (14 - value.month) // 12
    y = value.year + 4_800 - a
    m = value.month + 12 * a - 3
    return (
        value.day
        + (153 * m + 2) // 5
        + 365 * y
        + y // 4
        - y // 100
        + y // 400
        - 32_045
    )


def jdn_to_gregorian(jdn: int) -> GregorianDate:
    """Inverse of :func:`gregorian_to_jdn`, including negative years."""

    a = jdn + 32_044
    b = (4 * a + 3) // 146_097
    c = a - (146_097 * b) // 4
    d = (4 * c + 3) // 1_461
    e = c - (1_461 * d) // 4
    m = (5 * e + 2) // 153
    day = e - (153 * m + 2) // 5 + 1
    month = m + 3 - 12 * (m // 10)
    year = 100 * b + d - 4_800 + m // 10
    return GregorianDate(year, month, day)


@dataclass(frozen=True, slots=True)
class PastafariDate:
    year: int
    cutlet_name: str
    day_in_cutlet: int
    month_name: str
    day_in_month: int

    def to_dict(self) -> dict[str, str | int]:
        # The year is a string so JSON consumers never lose precision.
        return {
            "year": str(self.year),
            "cutletName": self.cutlet_name,
            "dayInCutlet": self.day_in_cutlet,
            "monthName": self.month_name,
            "dayInMonth": self.day_in_month,
        }


def _build_stones() -> tuple[tuple[int, ...], ...]:
    rows: list[tuple[int, ...]] = [(17, 29, 43, 71, 101)]
    for drop_number in range(2, 47):
        old = rows[-1]
        rows.append((
            keep(old[0] * old[0] + 3 * old[1] + drop_number),
            keep(old[1] * old[1] + 5 * old[2] + old[0]),
            keep(old[2] * old[2] + 7 * old[3] + old[1]),
            keep(old[3] * old[3] + 11 * old[4] + old[2]),
            keep(old[4] * old[4] + 13 * old[0] + old[3]),
        ))
    return tuple(rows)


STONE_TABLE = _build_stones()


def day_number(jdn: int) -> int:
    delta = jdn - FOUNDATION_JDN
    if delta == 0:
        return 1
    return 2 * delta + 1 if delta > 0 else -2 * delta


def bowl_permutation(rank_one_based: int) -> tuple[int, ...]:
    if not 1 <= rank_one_based <= 720:
        raise InvalidInputError("Bowl permutation rank must be in 1..720")
    rank = rank_one_based - 1
    available = [0, 1, 2, 3, 4, 5]
    result: list[int] = []
    factorial = (1, 1, 2, 6, 24, 120, 720)
    for position in range(6):
        block = factorial[5 - position]
        index, rank = divmod(rank, block)
        result.append(available.pop(index))
    return tuple(result)


@dataclass(frozen=True, slots=True)
class SauceResult:
    bowls: tuple[int, ...]
    last_drop_permutation: tuple[int, ...]


def sauce(calculation_jdn: int, target_jdn: int) -> SauceResult:
    """Produce the six final bowls for one ordered pair of days."""

    calculation = day_number(calculation_jdn)
    target = day_number(target_jdn)
    distance = abs(target_jdn - calculation_jdn) + 1
    addition = calculation + target
    direction = 1 if target_jdn < calculation_jdn else 2 if target_jdn == calculation_jdn else 3

    hidden: list[int] = [0] * 7
    for index, coefficients in enumerate(HIDDEN_COEFFICIENTS):
        stones = STONE_TABLE[index]
        value = keep(
            calculation
            + coefficients[0] * target
            + coefficients[1] * distance
            + coefficients[2] * addition
            + coefficients[3] * direction
            + sum(stones)
        )
        for round_index, stone_index in enumerate(HIDDEN_STONE_ORDER, start=1):
            value = keep(value * value + 3 * value + stones[stone_index] + round_index)
        hidden[index] = value

    drops: list[int] = [0] * 46

    def prior(drop_number: int, back: int) -> int:
        wanted = drop_number - back
        return drops[wanted - 1] if wanted >= 1 else hidden[back - drop_number]

    bowls: list[int] = []
    for index, prime in enumerate(BOWL_PRIMES, start=1):
        value = calculation + target * index + distance + addition + direction + prime * prime
        bowls.append(keep(value * value + index))

    last_drop_permutation: tuple[int, ...] | None = None
    for drop_index in range(46):
        drop_number = drop_index + 1
        stones = STONE_TABLE[drop_index]
        previous = prior(drop_number, 1)
        third = prior(drop_number, 3)
        seventh = prior(drop_number, 7)
        value = keep(
            stones[0] * calculation
            + stones[1] * target
            + stones[2] * distance
            + stones[3] * addition
            + stones[4] * direction
            + previous
            + 3 * third
            + 5 * seventh
            + drop_number
        )
        for first, second, third_factor, fourth, stone_index in GRIND_ROWS:
            value = keep(
                value * value
                + first * value
                + second * previous
                + third_factor * third
                + fourth * seventh
                + stones[stone_index]
            )
        drops[drop_index] = value

        order = bowl_permutation(1 + (value - 1) % 720)
        if drop_number == 46:
            last_drop_permutation = order

        direct = [0] * 6
        for place in range(3):
            bowl_id = order[place]
            direct[bowl_id] = keep(
                value * value
                + stones[DIRECT_STONES[place]] * bowls[bowl_id]
                + DIRECT_MULTIPLIERS[place] * drop_number
            )

        old = bowls
        bowls = [0] * 6
        for place, bowl_id in enumerate(order):
            previous_id = order[(place - 1) % 6]
            next_id = order[(place + 1) % 6]
            mixed = (
                old[bowl_id]
                + 2 * old[previous_id]
                + 3 * old[next_id]
                + direct[bowl_id]
                + value
                + stones[DROP_MIX_STONES[place]]
            )
            bowls[bowl_id] = keep(
                mixed * mixed
                + 5 * old[previous_id] * old[next_id]
                + drop_number * (place + 1)
            )

    if last_drop_permutation is None:  # pragma: no cover - loop invariant
        raise InternalInvariantError("The 46th drop did not define a bowl order")

    for round_number in range(1, 13):
        bowl_sum = sum(bowls)
        order_number = keep(bowl_sum + 149 * round_number)
        order = bowl_permutation(1 + (order_number - 1) % 720)
        old = bowls
        bowls = [0] * 6
        for place, bowl_id in enumerate(order):
            previous_id = order[(place - 1) % 6]
            next_id = order[(place + 1) % 6]
            mixed = (
                old[bowl_id]
                + 3 * old[previous_id]
                + 5 * old[next_id]
                + order_number
                + round_number
                + (place + 1) ** 2
            )
            bowls[bowl_id] = keep(
                mixed * mixed + 7 * old[previous_id] * old[next_id]
            )

    return SauceResult(tuple(bowls), last_drop_permutation)


@dataclass(frozen=True, slots=True)
class ResponseDescriptor:
    first: int
    step: int


def response_descriptor(result: SauceResult, bowl_id: int, seal: int) -> ResponseDescriptor:
    place = result.last_drop_permutation.index(bowl_id)
    next_bowl_id = result.last_drop_permutation[(place + 1) % 6]
    first_base = result.bowls[bowl_id] + seal + 181
    first = keep(first_base * first_base + 179 * result.bowls[next_bowl_id] + seal)
    direction_base = first + seal + 1 + 193
    direction_number = keep(
        direction_base * direction_base + 193 * first + 197 * result.bowls[5]
    )
    return ResponseDescriptor(first, 1 if direction_number & 1 else -1)


def response_at(descriptor: ResponseDescriptor, offset: int) -> int:
    return (descriptor.first - 1 + descriptor.step * offset) % GREAT + 1


def choose_uniform(result: SauceResult, bowl_id: int, seal: int, count: int) -> int:
    """Return a one-based deterministic choice, including the Scroll's wide rule."""

    if count < 1:
        raise InvalidInputError("Choice count must be positive")
    descriptor = response_descriptor(result, bowl_id, seal)

    if count <= GREAT:
        limit = GREAT - GREAT % count
        accepted = descriptor.first
        if accepted > limit:
            # Response numbers advance by exactly one around the complete ring.
            accepted = 1 if descriptor.step > 0 else limit
        return (accepted - 1) % count + 1

    width = 1
    space = GREAT
    while space < count:
        space *= GREAT
        width += 1
    value = 1
    weight = 1
    for offset in range(width):
        value += (response_at(descriptor, offset) - 1) * weight
        weight *= GREAT
    limit = space - space % count
    accepted = value
    if accepted > limit:
        accepted = 1 if descriptor.step > 0 else limit
    return (accepted - 1) % count + 1


# Gate checkpoints are generated from the binding gate-distance rule.  They do
# not alter the algorithm: they cap cold-start traversal at roughly 512 gates.
GATE_CHECKPOINTS: tuple[tuple[int, int], ...] = (
    (-32768, -29780582), (-31744, -29275011), (-30720, -28759536),
    (-29696, -28231334), (-28672, -27724269), (-27648, -27204151),
    (-26624, -26696050), (-25600, -26184520), (-24576, -25649224),
    (-23552, -25126420), (-22528, -24592746), (-21504, -24077763),
    (-20480, -23568941), (-19456, -23056607), (-18432, -22547059),
    (-17408, -22028964), (-16384, -21524216), (-15360, -21021341),
    (-14336, -20503094), (-13312, -19986054), (-12288, -19477387),
    (-11264, -18959976), (-10240, -18453214), (-9216, -17930941),
    (-8192, -17421559), (-7168, -16901500), (-6144, -16391773),
    (-5120, -15892677), (-4096, -15374389), (-3072, -14869256),
    (-2048, -14360710), (-1856, -14269240), (-1024, -13845543),
    (0, FOUNDATION_JDN),
    (1024, -12809003), (2048, -12289556), (3072, -11790578),
    (4096, -11286642), (5120, -10764244), (6144, -10233818),
    (7168, -9727528), (8192, -9214186), (9216, -8692730),
    (10240, -8173976), (11264, -7657486), (12288, -7145425),
    (13312, -6630698), (14336, -6127086), (15360, -5610968),
    (16384, -5103400), (17408, -4587432), (18432, -4069417),
    (19456, -3557452), (20480, -3038147), (21504, -2527530),
    (22528, -2008636), (23552, -1489691), (24576, -975725),
    (25600, -476208), (26624, 32147), (27648, 532296),
    (28672, 1047264), (29696, 1552344), (29952, 1682615),
    (30208, 1812845), (30464, 1938704), (30720, 2076748),
    (30976, 2207399), (31232, 2341220), (31456, 2450464),
    (31472, 2458435), (31488, 2467368), (31504, 2474392),
    (31744, 2600784), (32768, 3111357),
)

_CHECKPOINT_POSITIONS = tuple(position for _, position in GATE_CHECKPOINTS)
_GATE_DISTANCE_CACHE: LruCache[int, int] = LruCache(4096)
_GATE_POSITION_CACHE = GatePositionCache(4096)
for _checkpoint_index, _checkpoint_position in GATE_CHECKPOINTS:
    _GATE_POSITION_CACHE.set(_checkpoint_index, _checkpoint_position)


def gate_distance(index: int) -> int:
    if index == 0:
        raise InvalidInputError("Gate-distance index may not be zero")
    cached = _GATE_DISTANCE_CACHE.get(index)
    if cached is not None:
        return cached
    result = sauce(FOUNDATION_JDN, FOUNDATION_JDN + index)
    distance = choose_uniform(result, 0, 1, 922) + 41
    _GATE_DISTANCE_CACHE.set(index, distance)
    return distance


def gate_position(index: int) -> int:
    cached = _GATE_POSITION_CACHE.get(index)
    if cached is not None:
        return cached
    current_index, position = _GATE_POSITION_CACHE.nearest(index)
    if current_index < index:
        while current_index < index:
            distance_index = current_index if current_index < 0 else current_index + 1
            position += gate_distance(distance_index)
            current_index += 1
            _GATE_POSITION_CACHE.set(current_index, position)
    else:
        while current_index > index:
            distance_index = current_index if current_index > 0 else current_index - 1
            position -= gate_distance(distance_index)
            current_index -= 1
            _GATE_POSITION_CACHE.set(current_index, position)
    return position


def containing_gate_interval(jdn: int) -> int:
    # Start from the checkpoint immediately before this civil day.
    position = bisect_left(_CHECKPOINT_POSITIONS, jdn)
    if position == 0:
        index = GATE_CHECKPOINTS[0][0]
    elif position == len(GATE_CHECKPOINTS):
        index = GATE_CHECKPOINTS[-1][0]
    else:
        index = GATE_CHECKPOINTS[position - 1][0]

    gate = gate_position(index)
    if gate >= jdn:
        while gate >= jdn:
            index -= 1
            gate = gate_position(index)
        return index
    while gate_position(index + 1) < jdn:
        index += 1
    return index


@dataclass(frozen=True, slots=True)
class Year:
    number: int
    open_index: int
    close_index: int
    start_jdn: int
    end_jdn: int
    length: int
    gaps: int


def make_year(number: int, open_index: int, close_index: int) -> Year:
    opening = gate_position(open_index)
    closing = gate_position(close_index)
    return Year(
        number=number,
        open_index=open_index,
        close_index=close_index,
        start_jdn=opening + 1,
        end_jdn=closing,
        length=closing - opening,
        gaps=close_index - open_index,
    )


def enumerate_year_5000_candidates(calculation_jdn: int) -> list[tuple[int, int, int]]:
    interval = containing_gate_interval(calculation_jdn)
    openings: list[tuple[int, int]] = []
    index = interval
    while True:
        position = gate_position(index)
        if calculation_jdn - position > MAX_YEAR_DAYS:
            break
        openings.append((index, position))
        index -= 1

    closings: list[tuple[int, int]] = []
    index = interval + 1
    while True:
        position = gate_position(index)
        if position - calculation_jdn > MAX_YEAR_DAYS:
            break
        closings.append((index, position))
        index += 1

    candidates: list[tuple[int, int, int]] = []
    for open_index, opening in openings:
        for close_index, closing in closings:
            gaps = close_index - open_index
            length = closing - opening
            if gaps >= MIN_YEAR_GAPS and MIN_YEAR_DAYS <= length <= MAX_YEAR_DAYS:
                candidates.append((open_index, close_index, length))
    candidates.sort(key=lambda item: (item[2], item[0]))
    return candidates


def enumerate_next_years(open_index: int) -> list[tuple[int, int]]:
    opening = gate_position(open_index)
    candidates: list[tuple[int, int]] = []
    close_index = open_index + MIN_YEAR_GAPS
    while True:
        length = gate_position(close_index) - opening
        if length > MAX_YEAR_DAYS:
            break
        if length >= MIN_YEAR_DAYS:
            candidates.append((close_index, length))
        close_index += 1
    candidates.sort(key=lambda item: (item[1], item[0]))
    return candidates


def enumerate_previous_years(close_index: int) -> list[tuple[int, int]]:
    closing = gate_position(close_index)
    candidates: list[tuple[int, int]] = []
    open_index = close_index - MIN_YEAR_GAPS
    while True:
        length = closing - gate_position(open_index)
        if length > MAX_YEAR_DAYS:
            break
        if length >= MIN_YEAR_DAYS:
            candidates.append((open_index, length))
        open_index -= 1
    candidates.sort(key=lambda item: (item[1], item[0]))
    return candidates


def unrank_permutation_names(names: Sequence[str], count: int, rank_one_based: int) -> list[str]:
    available = list(names)
    result: list[str] = []
    rank = rank_one_based - 1
    for position in range(count):
        block = permutation_count(len(available) - 1, count - position - 1)
        index, rank = (0, 0) if block == 0 else divmod(rank, block)
        result.append(available.pop(index))
    return result


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


def unrank_composition(
    total: int,
    parts: int,
    mandatory_cut: int | None,
    rank_one_based: int,
) -> list[int]:
    result: list[int] = []
    remaining = total
    cumulative = 0
    rank = rank_one_based
    hit = mandatory_cut is None
    for position in range(parts):
        left = parts - position - 1
        selected = False
        for value in range(1, remaining - left + 1):
            after = remaining - value
            new_cumulative = cumulative + value
            new_hit = hit or new_cumulative == mandatory_cut
            mandatory_offset: int | None = None
            if not new_hit:
                if mandatory_cut is None or mandatory_cut < new_cumulative:
                    continue
                mandatory_offset = mandatory_cut - new_cumulative
            block = composition_suffix_count(
                after, left, None if new_hit else mandatory_offset
            )
            if rank > block:
                rank -= block
                continue
            result.append(value)
            remaining = after
            cumulative = new_cumulative
            hit = new_hit
            selected = True
            break
        if not selected:
            raise InternalInvariantError("Composition unranking exhausted its branches")
    return result


def bounded_month_length_count(total: int, parts: int) -> int:
    shifted = total - 4 * parts
    if shifted < 0 or shifted > 119 * parts:
        return 0
    answer = 0
    for excluded in range(0, min(parts, shifted // 120) + 1):
        ways = (
            binomial(parts, excluded)
            * binomial(shifted - 120 * excluded + parts - 1, parts - 1)
        )
        answer += ways if excluded % 2 == 0 else -ways
    return answer


def unrank_month_lengths(total: int, parts: int, rank_one_based: int) -> list[int]:
    result: list[int] = []
    remaining = total
    rank = rank_one_based
    memo: dict[tuple[int, int], int] = {}

    def count(sum_value: int, part_count: int) -> int:
        key = (sum_value, part_count)
        if key not in memo:
            memo[key] = bounded_month_length_count(sum_value, part_count)
        return memo[key]

    for position in range(parts):
        left = parts - position - 1
        selected = False
        for value in range(4, min(123, remaining - 4 * left) + 1):
            after = remaining - value
            block = int(after == 0) if left == 0 else count(after, left)
            if rank > block:
                rank -= block
                continue
            result.append(value)
            remaining = after
            selected = True
            break
        if not selected:
            raise InternalInvariantError("Month-length unranking exhausted its branches")
    return result


class InterleavingCounter:
    """DP counter for the first/last-occurrence constrained month weave."""

    __slots__ = ("lengths", "cache")

    def __init__(self, lengths: Sequence[int]) -> None:
        self.lengths = tuple(lengths)
        self.cache: dict[int, list[int]] = {}

    def get(self, last_seen: int, q: int) -> int:
        last = len(self.lengths) - 1
        if last_seen >= last:
            return 1
        cached = self.cache.get(last_seen)
        if cached is not None and len(cached) > q:
            return cached[q]
        self._rebuild(last_seen, q)
        return self.cache[last_seen][q]

    def _rebuild(self, start: int, q_start: int) -> None:
        month_count = len(self.lengths)
        needed = [0] * month_count
        needed[start] = q_start
        for index in range(start, month_count - 1):
            needed[index + 1] = needed[index] + self.lengths[index + 1] - 1

        following: list[int] | None = None
        self.cache.clear()
        for index in range(month_count - 1, start - 1, -1):
            q_max = needed[index]
            if index == month_count - 1:
                current = [1] * (q_max + 1)
            else:
                if following is None:  # pragma: no cover - loop invariant
                    raise InternalInvariantError("Missing DP suffix")
                current = [0] * (q_max + 1)
                month_length = self.lengths[index + 1]
                cumulative = 0
                weight = 1
                for q in range(1, q_max + 1):
                    r = q - 1
                    cumulative += weight * following[month_length + r]
                    current[q] = cumulative
                    weight = weight * (month_length + r - 1) // (r + 1)
            following = current
            # A short look-ahead window prevents most rebuilds without retaining
            # the enormous transient table for the entire year.
            if index <= start + 7:
                self.cache[index] = current


def interleaving_count(lengths: Sequence[int]) -> int:
    return InterleavingCounter(lengths).get(0, lengths[0])


def unrank_month_interleaving(lengths: Sequence[int], rank_one_based: int) -> list[int]:
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
    if not 1 <= rank <= expected_total:
        raise InvalidInputError("Interleaving rank is outside its valid range")

    for position in range(1, total_length):
        prefix: list[int] = []
        running = 0
        for index in range(low, high + 1):
            running += remaining[index]
            prefix.append(running)

        span = len(prefix)
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
            next_base_count = base_count * numerator // denominator
            block = next_base_count * future_same
            if rank > block:
                rank -= block
                continue
            weave[position] = month
            remaining[month] -= 1
            active_total -= 1
            base_count = next_base_count
            if remaining[month] == 0:
                low += 1
            selected = True
            break
        if selected:
            continue

        if high + 1 >= month_count:
            raise InternalInvariantError("Interleaving exhausted all valid branches")
        month = high + 1
        new_remaining = lengths[month] - 1
        next_base_count = base_count * binomial(
            active_total + new_remaining - 1, new_remaining - 1
        )
        next_active_total = active_total + new_remaining
        future = counter.get(month, next_active_total + 1) if month < month_count - 1 else 1
        block = next_base_count * future
        if rank > block:
            raise InternalInvariantError("Rank exceeded the final lexicographic branch")
        weave[position] = month
        high = month
        remaining[month] -= 1
        if low > month - 1:
            low = month
        active_total = next_active_total
        base_count = next_base_count

    return weave


@dataclass(frozen=True, slots=True)
class YearStructure:
    cutlet_count: int
    cutlet_gaps: tuple[int, ...]
    cutlet_names: tuple[str, ...]
    cutlet_start_offsets: tuple[int, ...]
    cutlet_end_offsets: tuple[int, ...]
    month_count: int
    month_lengths: tuple[int, ...]
    month_names: tuple[str, ...]
    month_weave: tuple[int, ...]
    day_in_month: tuple[int, ...]


def build_year_structure(state: "CalculationState", year: Year) -> YearStructure:
    result = state.get_sauce(year.start_jdn)
    cutlet_counts = list(range(6, min(17, year.gaps) + 1))
    cutlet_count = cutlet_counts[
        choose_uniform(result, 1, 20, len(cutlet_counts)) - 1
    ]

    mandatory_cut: int | None = None
    if year.start_jdn <= state.calculation_jdn <= year.end_jdn:
        for gate_index in range(year.open_index + 1, year.close_index):
            if gate_position(gate_index) == state.calculation_jdn:
                mandatory_cut = gate_index - year.open_index
                break

    partition_count = (
        binomial(year.gaps - 1, cutlet_count - 1)
        if mandatory_cut is None
        else binomial(year.gaps - 2, cutlet_count - 2)
    )
    cutlet_gaps = unrank_composition(
        year.gaps,
        cutlet_count,
        mandatory_cut,
        choose_uniform(result, 1, 21, partition_count),
    )

    cutlet_name_ways = permutation_count(len(CUTLET_NAMES), cutlet_count)
    cutlet_names = unrank_permutation_names(
        CUTLET_NAMES,
        cutlet_count,
        choose_uniform(result, 4, 22, cutlet_name_ways),
    )

    minimum_months = (year.length + 122) // 123
    maximum_months = min(47, year.length // 4)
    month_count = minimum_months + choose_uniform(
        result, 2, 30, maximum_months - minimum_months + 1
    ) - 1

    month_length_ways = bounded_month_length_count(year.length, month_count)
    month_lengths = unrank_month_lengths(
        year.length,
        month_count,
        choose_uniform(result, 2, 31, month_length_ways),
    )

    weave_ways = interleaving_count(month_lengths)
    month_weave = unrank_month_interleaving(
        month_lengths, choose_uniform(result, 3, 32, weave_ways)
    )

    month_name_ways = permutation_count(len(MONTH_NAMES), month_count)
    month_names = unrank_permutation_names(
        MONTH_NAMES,
        month_count,
        choose_uniform(result, 4, 33, month_name_ways),
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
    for cutlet_gap_count in cutlet_gaps:
        cutlet_starts.append(day_offset)
        gap_offset += cutlet_gap_count
        end_jdn = gate_position(year.open_index + gap_offset)
        day_offset = end_jdn - year.start_jdn + 1
        cutlet_ends.append(day_offset - 1)

    return YearStructure(
        cutlet_count=cutlet_count,
        cutlet_gaps=tuple(cutlet_gaps),
        cutlet_names=tuple(cutlet_names),
        cutlet_start_offsets=tuple(cutlet_starts),
        cutlet_end_offsets=tuple(cutlet_ends),
        month_count=month_count,
        month_lengths=tuple(month_lengths),
        month_names=tuple(month_names),
        month_weave=tuple(month_weave),
        day_in_month=tuple(day_in_month),
    )


def find_cutlet(structure: YearStructure, offset: int) -> int:
    low = 0
    high = structure.cutlet_count - 1
    while low <= high:
        middle = (low + high) // 2
        if offset < structure.cutlet_start_offsets[middle]:
            high = middle - 1
        elif offset > structure.cutlet_end_offsets[middle]:
            low = middle + 1
        else:
            return middle
    raise InternalInvariantError("Day offset is not contained in a cutlet")


def materialize(year: Year, structure: YearStructure, target_jdn: int) -> PastafariDate:
    offset = target_jdn - year.start_jdn
    cutlet = find_cutlet(structure, offset)
    month = structure.month_weave[offset]
    return PastafariDate(
        year=year.number,
        cutlet_name=structure.cutlet_names[cutlet],
        day_in_cutlet=offset - structure.cutlet_start_offsets[cutlet] + 1,
        month_name=structure.month_names[month],
        day_in_month=structure.day_in_month[offset],
    )


class CalculationState:
    """Caches the expensive structures shared by one calculation day."""

    __slots__ = (
        "calculation_jdn", "_sauces", "_structures", "_years", "_year_5000"
    )

    def __init__(self, calculation_jdn: int) -> None:
        self.calculation_jdn = calculation_jdn
        self._sauces: LruCache[int, SauceResult] = LruCache(64)
        self._structures: LruCache[tuple[int, int], YearStructure] = LruCache(8)
        self._years: dict[int, Year] = {}
        self._year_5000: Year | None = None

    def get_sauce(self, target_jdn: int) -> SauceResult:
        cached = self._sauces.get(target_jdn)
        if cached is not None:
            return cached
        result = sauce(self.calculation_jdn, target_jdn)
        self._sauces.set(target_jdn, result)
        return result

    def get_year_5000(self) -> Year:
        if self._year_5000 is not None:
            return self._year_5000
        candidates = enumerate_year_5000_candidates(self.calculation_jdn)
        if not candidates:
            raise InternalInvariantError("No valid year-5000 candidate exists")
        choice = choose_uniform(
            self.get_sauce(self.calculation_jdn), 0, 10, len(candidates)
        )
        open_index, close_index, _ = candidates[choice - 1]
        result = make_year(5_000, open_index, close_index)
        self._year_5000 = result
        self._years[5_000] = result
        return result

    def next_year(self, year: Year) -> Year:
        number = year.number + 1
        if number in self._years:
            return self._years[number]
        candidates = enumerate_next_years(year.close_index)
        result = self.get_sauce(gate_position(year.close_index))
        choice = choose_uniform(result, 0, 11, len(candidates))
        close_index, _ = candidates[choice - 1]
        selected = make_year(number, year.close_index, close_index)
        self._years[number] = selected
        return selected

    def previous_year(self, year: Year) -> Year:
        number = year.number - 1
        if number in self._years:
            return self._years[number]
        candidates = enumerate_previous_years(year.open_index)
        result = self.get_sauce(gate_position(year.open_index))
        choice = choose_uniform(result, 0, 12, len(candidates))
        open_index, _ = candidates[choice - 1]
        selected = make_year(number, open_index, year.open_index)
        self._years[number] = selected
        return selected

    def find_year(self, target_jdn: int) -> Year:
        year = self.get_year_5000()
        if target_jdn < year.start_jdn:
            while target_jdn < year.start_jdn:
                year = self.previous_year(year)
        else:
            while target_jdn > year.end_jdn:
                year = self.next_year(year)
        return year

    def get_structure(self, year: Year) -> YearStructure:
        key = (year.open_index, year.close_index)
        cached = self._structures.get(key)
        if cached is not None:
            return cached
        result = build_year_structure(self, year)
        self._structures.set(key, result)
        return result

    def convert(self, target_jdn: int) -> PastafariDate:
        year = self.find_year(target_jdn)
        return materialize(year, self.get_structure(year), target_jdn)


class PastafariCalendar:
    """Reusable converter with bounded caches and no hidden global date state."""

    __slots__ = ("_states", "_results")

    def __init__(self) -> None:
        self._states: LruCache[int, CalculationState] = LruCache(4)
        self._results: LruCache[tuple[int, int], PastafariDate] = LruCache(1024)

    def convert_jdn(
        self,
        target_jdn: int,
        calculation_jdn: int | None = None,
    ) -> PastafariDate:
        if calculation_jdn is None:
            calculation_jdn = gregorian_to_jdn(GregorianDate.today())
        key = (calculation_jdn, target_jdn)
        cached = self._results.get(key)
        if cached is not None:
            return cached
        state = self._states.get(calculation_jdn)
        if state is None:
            state = CalculationState(calculation_jdn)
            self._states.set(calculation_jdn, state)
        result = state.convert(target_jdn)
        self._results.set(key, result)
        return result

    def convert(
        self,
        target_date: GregorianDate,
        calculation_date: GregorianDate | None = None,
    ) -> PastafariDate:
        return self.convert_jdn(
            gregorian_to_jdn(target_date),
            None if calculation_date is None else gregorian_to_jdn(calculation_date),
        )

    def convert_iso(
        self,
        target_date: str,
        calculation_date: str | None = None,
    ) -> PastafariDate:
        return self.convert(
            GregorianDate.parse(target_date),
            None if calculation_date is None else GregorianDate.parse(calculation_date),
        )

    def clear(self) -> None:
        self._states.clear()
        self._results.clear()


def clear_global_gate_caches() -> None:
    """Clear performance caches without changing any observable result."""

    _GATE_DISTANCE_CACHE.clear()
    _GATE_POSITION_CACHE.clear()
    for index, position in GATE_CHECKPOINTS:
        _GATE_POSITION_CACHE.set(index, position)


__all__ = [
    "ALGORITHM_ID",
    "FOUNDATION_JDN",
    "GREAT",
    "MAX_YEAR_DAYS",
    "GregorianDate",
    "PastafariCalendar",
    "PastafariDate",
    "gregorian_to_jdn",
    "jdn_to_gregorian",
]
