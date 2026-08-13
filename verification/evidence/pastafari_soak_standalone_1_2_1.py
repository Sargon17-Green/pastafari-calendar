#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Pastafari Calendar standalone soak verifier.

ONE FILE ONLY. This program contains an independent Python oracle derived from
"מגילת העיתים" (with the explicit 5,778-day erratum), and at runtime downloads
and exercises the production fast implementation directly from the configured
GitHub repository. It does not import or read verification/, a local checkout,
golden vectors, checkpoints, or any other project file.

Default repository:
    https://github.com/bwtbdyqtmsprytgydym-cpu/pastafari-calendar
Production file used:
    browser/pastafari-calendar-fast.js

The GitHub default branch is resolved at startup and pinned to its exact commit
SHA for the whole run. The downloaded JavaScript bytes are SHA-256 hashed and
recorded in every resume/failure record. A later run will refuse to resume a
state created for different production bytes.

Python: 3.10+
Node.js: used only to execute the GitHub JavaScript exactly as JavaScript. If
Node is absent on 64-bit Windows, this script bootstraps a pinned official
Node.js v22.23.2 archive and verifies both archive and node.exe SHA-256 hashes.
Runtime files are kept in a persistent per-user cache (never in %TEMP%) and are self-healing.
A finite successful run appends a terminal run-pass JSONL record and writes an upload-ready Markdown evidence report.
No pip packages are required.
"""
from __future__ import annotations

import argparse
import atexit
import multiprocessing as mp
import datetime as _dt
import hashlib
import io
import json
import os
import platform
import shutil
import subprocess
import sys
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from bisect import bisect_left, bisect_right
from dataclasses import dataclass
from functools import lru_cache
from math import comb, factorial, gcd
from pathlib import Path
from typing import Iterable, Sequence

SCRIPT_VERSION = "PASTAFARI-STANDALONE-SOAK-1.2.1"
DEFAULT_REPO = "bwtbdyqtmsprytgydym-cpu/pastafari-calendar"
FAST_PATH = "browser/pastafari-calendar-fast.js"
FIELDS = ("year", "cutletName", "dayInCutlet", "monthName", "dayInMonth")
MASK64 = (1 << 64) - 1

# Resume compatibility is intentionally restricted to exact historical files.
# 1.1.2 and 1.2.0 changed only runtime lifetime/recovery behavior, and 1.2.1
# adds evidence/reporting records.  The embedded Oracle, sampling algorithm,
# and comparison semantics are unchanged across these exact hashes.
LEGACY_RESUME_COMPAT = {
    (
        "PASTAFARI-STANDALONE-SOAK-1.1.0",
        "1ea3396d42b884cfcd267f9ff64fd4764271e93b6959397701f047afb70a2741",
    ),
    (
        "PASTAFARI-STANDALONE-SOAK-1.1.2",
        "dc25309aa95fe0a0a069214cbec542dd12f47bf9da72c619b1f6e1fe8d0f4b28",
    ),
    (
        "PASTAFARI-STANDALONE-SOAK-1.2.0",
        "5b4d261c6dedb65d41e0034146490d9995ac60c7fb033c3db7f10a07638be7f6",
    ),
}

# Infrastructure retry policy. Recognized transient failures retry indefinitely
# (Ctrl-C always stops the program). Unknown Node failures get a small finite
# replay budget so a real deterministic production error cannot be hidden forever.
INFRA_BACKOFF_INITIAL = 1.0
INFRA_BACKOFF_MAX = 60.0
UNKNOWN_NODE_RETRIES = 3

# ===== BEGIN EMBEDDED ORACLE: constants.py =====
"""Canonical constants transcribed from מגילת העיתים.

This module intentionally contains no imports from the production project.
Every non-obvious constant is annotated with the tablet/section that defines it.
The corrected year ceiling (5,778) follows footnote 13 / the explicit erratum.
"""

# Tablet 5: 127 doublings from 1, then subtract 1.
GREAT = (1 << 127) - 1

# Tablet 1: Day of Foundation in the project's integer-JDN coordinate system.
# Scroll gives continuous day -15,055,671 where Gregorian 0001-01-01 is day 1.
# Integer JDN for Gregorian 0001-01-01 is 1,721,426, so JDN = day + 1,721,425.
FOUNDATION_JDN = -13_334_246
GREGORIAN_DAY_ONE_JDN = 1_721_426

# Tablet 17: 1..922 then +41.
MIN_GATE_DISTANCE = 42
MAX_GATE_DISTANCE = 963
GATE_CHOICE_COUNT = 922

# Tablets 18-19 + corrected footnote 13.
MIN_YEAR_DAYS = 252
MAX_YEAR_DAYS = 5778
MIN_YEAR_GAPS = 6

# Tablet 20.
MIN_CUTLETS = 6
MAX_CUTLETS = 17
CUTLET_NAMES = (
    "ארד", "שועל", "כליה", "לגש", "מחשבה", "ארבעה חלקים מתשעה",
    "פַּלְגּוּרַשׁ", "גומא", "אשכול", "עקרב", "אפר", "חיטה", "נהר",
    "צחוק", "אכד", "קרן", "הכד הריק",
)

# Tablet 21.
MIN_MONTHS = 3
MAX_MONTHS = 47
MIN_MONTH_DAYS = 4
MAX_MONTH_DAYS = 123
MONTH_NAMES = (
    "טין", "רימון", "מרפק", "קנאה", "ארידו", "משחת־שיניים",
    "שלושה חלקים מחמישה", "כַּרְשׁוּמַב", "נמר", "בדיל", "ערפל", "לבונה",
    "כישור", "צלע", "חרוב", "אורוק", "בושה", "גמל", "נחושת", "באר",
    "חלמון", "כוכב", "דבש", "טחול", "אבן־גיר", "שמחה", "תאנה", "נינוה",
    "צפרדע", "זפת", "נר", "הדלת הסגורה", "שומשום", "עורף", "כסף", "שושן",
    "סערה", "חמור", "קמח", "חרטה", "בבל", "לשון", "פשתן", "מלח", "אגס",
    "קשת", "חול",
)

# Tablet 9: 11 grinding rows (q1,q2,q3,q4, stone index).
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

# Tablet 8: coefficients of target,distance,sum,direction for hidden drops 1..7.
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

# Tablet 10.
BOWL_PRIMES = (17, 19, 23, 29, 31, 37)

# Tablets 12-13.
DIRECT_MULTIPLIERS = (3, 5, 7)
DIRECT_STONES = (0, 1, 2)
DROP_MIX_STONES = (0, 1, 2, 3, 4, 0)

# Tablet 15: seals.
SEALS = {
    "gate_distance": 1,
    "year_5000": 10,
    "next_year": 11,
    "previous_year": 12,
    "cutlet_count": 20,
    "cutlet_partition": 21,
    "cutlet_names": 22,
    "month_count": 30,
    "month_lengths": 31,
    "month_weaving": 32,
    "month_names": 33,
}
# ===== END EMBEDDED ORACLE: constants.py =====

# ===== BEGIN EMBEDDED ORACLE: primitives.py =====
"""Small arithmetic/calendar primitives defined independently of production code."""


def keep(value: int) -> int:
    """Tablet 6 saved remainder: 1..GREAT, with exact multiples mapped to GREAT."""
    return (value - 1) % GREAT + 1


def ordinary_remainder(value: int, modulus: int) -> int:
    if modulus < 1:
        raise ValueError("modulus must be positive")
    return value % modulus


def day_number(jdn: int) -> int:
    """Tablet 1 odd/even numbering around the Day of Foundation."""
    delta = jdn - FOUNDATION_JDN
    if delta == 0:
        return 1
    if delta > 0:
        return 2 * delta + 1
    return 2 * (-delta)


def counters(calculation_jdn: int, target_jdn: int) -> tuple[int, int, int, int, int]:
    c = day_number(calculation_jdn)
    t = day_number(target_jdn)
    distance = abs(target_jdn - calculation_jdn) + 1
    combined = c + t
    direction = 1 if target_jdn < calculation_jdn else 2 if target_jdn == calculation_jdn else 3
    return c, t, distance, combined, direction


def is_gregorian_leap_year(year: int) -> bool:
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


def gregorian_month_length(year: int, month: int) -> int:
    if not 1 <= month <= 12:
        raise ValueError("month outside 1..12")
    if month == 2:
        return 29 if is_gregorian_leap_year(year) else 28
    return 30 if month in (4, 6, 9, 11) else 31


def gregorian_to_jdn(year: int, month: int, day: int) -> int:
    """Independent proleptic Gregorian -> integer JDN conversion.

    Uses the standard algebraic Gregorian formula with astronomical year numbering.
    It is deliberately local to the oracle and does not call project calendar helpers.
    """
    if not 1 <= day <= gregorian_month_length(year, month):
        raise ValueError("invalid Gregorian date")
    a = (14 - month) // 12
    y = year + 4800 - a
    m = month + 12 * a - 3
    return day + (153 * m + 2) // 5 + 365 * y + y // 4 - y // 100 + y // 400 - 32045


def jdn_to_gregorian(jdn: int) -> tuple[int, int, int]:
    """Inverse of gregorian_to_jdn for astronomical integer years."""
    # Hinnant-style conversion via days relative to 1970-01-01; handles negatives by floor division.
    z = jdn - 2_440_588
    z += 719468
    era = z // 146097
    doe = z - era * 146097
    yoe = (doe - doe // 1460 + doe // 36524 - doe // 146096) // 365
    y = yoe + era * 400
    doy = doe - (365 * yoe + yoe // 4 - yoe // 100)
    mp = (5 * doy + 2) // 153
    d = doy - (153 * mp + 2) // 5 + 1
    m = mp + 3 if mp < 10 else mp - 9
    y += 1 if m <= 2 else 0
    return y, m, d
# ===== END EMBEDDED ORACLE: primitives.py =====

# ===== BEGIN EMBEDDED ORACLE: combinatorics.py =====
"""Specification-oriented combinatorial ranking/unranking helpers.

The algorithms are intentionally straightforward and structurally different from the
production engines.  They work from lexicographic block counts rather than enumerating
all candidate objects.
"""




@lru_cache(maxsize=250_000)
def _cached_comb(n: int, k: int) -> int:
    """Memoized exact binomial used only as a performance aid by the oracle."""
    return comb(n, k)

def falling_factorial(n: int, k: int) -> int:
    if k < 0 or k > n:
        return 0
    out = 1
    for x in range(n - k + 1, n + 1):
        out *= x
    return out


def unrank_partial_permutation(items: Sequence[str], length: int, rank1: int) -> tuple[str, ...]:
    """1-based lexicographic unranking of distinct-name rows."""
    if not 0 <= length <= len(items):
        raise ValueError("invalid partial permutation length")
    total = falling_factorial(len(items), length)
    if not 1 <= rank1 <= total:
        raise ValueError("rank outside permutation space")
    remaining = list(items)
    rank = rank1 - 1
    out: list[str] = []
    for pos in range(length):
        block = falling_factorial(len(remaining) - 1, length - pos - 1)
        index, rank = divmod(rank, block)
        out.append(remaining.pop(index))
    return tuple(out)


def unrank_positive_composition(total: int, parts: int, rank1: int, required_boundary: int | None = None) -> tuple[int, ...]:
    """Lexicographic positive composition unranking, optionally requiring a prefix boundary.

    required_boundary is a positive partial sum that must occur before the final part.
    """
    @lru_cache(maxsize=None)
    def count(remaining: int, parts_left: int, prefix: int) -> int:
        if parts_left == 0:
            if remaining != 0:
                return 0
            return int(required_boundary is None or prefix > required_boundary)
        if remaining < parts_left:
            return 0
        total_count = 0
        max_first = remaining - (parts_left - 1)
        for first in range(1, max_first + 1):
            new_prefix = prefix + first
            if required_boundary is not None and prefix < required_boundary < new_prefix:
                continue
            if required_boundary is not None and new_prefix > required_boundary and prefix < required_boundary:
                continue
            total_count += count(remaining - first, parts_left - 1, new_prefix)
        return total_count

    total_count = count(total, parts, 0)
    if not 1 <= rank1 <= total_count:
        raise ValueError("rank outside composition space")
    rank = rank1
    out: list[int] = []
    remaining = total
    prefix = 0
    for pos in range(parts):
        parts_left = parts - pos
        for first in range(1, remaining - (parts_left - 1) + 1):
            new_prefix = prefix + first
            if required_boundary is not None and prefix < required_boundary < new_prefix:
                continue
            if required_boundary is not None and new_prefix > required_boundary and prefix < required_boundary:
                continue
            block = count(remaining - first, parts_left - 1, new_prefix)
            if rank > block:
                rank -= block
                continue
            out.append(first)
            remaining -= first
            prefix = new_prefix
            break
        else:
            raise AssertionError("composition unranking failed")
    return tuple(out)


def bounded_composition_count(total: int, parts: int, low: int, high: int) -> int:
    @lru_cache(maxsize=None)
    def rec(remaining: int, k: int) -> int:
        if k == 0:
            return int(remaining == 0)
        if remaining < k * low or remaining > k * high:
            return 0
        return sum(rec(remaining - x, k - 1) for x in range(low, high + 1))
    return rec(total, parts)


def unrank_bounded_composition(total: int, parts: int, low: int, high: int, rank1: int) -> tuple[int, ...]:
    @lru_cache(maxsize=None)
    def rec(remaining: int, k: int) -> int:
        if k == 0:
            return int(remaining == 0)
        if remaining < k * low or remaining > k * high:
            return 0
        return sum(rec(remaining - x, k - 1) for x in range(low, high + 1))

    count = rec(total, parts)
    if not 1 <= rank1 <= count:
        raise ValueError("rank outside bounded composition space")
    rank = rank1
    remaining = total
    out: list[int] = []
    for pos in range(parts):
        left = parts - pos - 1
        for x in range(low, high + 1):
            block = rec(remaining - x, left)
            if rank > block:
                rank -= block
            else:
                out.append(x)
                remaining -= x
                break
        else:
            raise AssertionError("bounded composition unranking failed")
    return tuple(out)


def lexicographic_permutation_1_to_6(rank1: int) -> tuple[int, ...]:
    """Tablet 11 direct lexicographic unranking of the 720 bowl orders."""
    if not 1 <= rank1 <= 720:
        raise ValueError("bowl order outside 1..720")
    rank = rank1 - 1
    remaining = [0, 1, 2, 3, 4, 5]
    out: list[int] = []
    for slots_left in range(6, 0, -1):
        block = factorial(slots_left - 1)
        index, rank = divmod(rank, block)
        out.append(remaining.pop(index))
    return tuple(out)


class WeavingStateLimit(RuntimeError):
    """Kept for API compatibility; the factorized counter no longer needs a state cap."""


class MonthWeavingOracle:
    """Independent factorized counter/unranker for Tablet 21.

    Let months 1..h already have a first occurrence and let l be the first month
    not yet exhausted.  Two independent combinatorial pieces remain:

    1. Among the *already opened* months, only the order of their last occurrences
       is constrained.  If their remaining multiplicities are r_l..r_h, the number
       of valid merges is

           A = Π_{j=l+1..h} C((r_l+...+r_j)-1, r_j-1).

       This follows by inserting month j into a valid merge of the earlier active
       months: the merged word must end in j, so one of j's copies is fixed as the
       last symbol and the other r_j-1 copies choose positions among the preceding
       prefix plus themselves.

    2. Future months must be *opened* in increasing order.  For the fixed month
       lengths n_i, define T_i(q) by T_last(q)=1 and

           T_i(q) = Σ_{r=0..q-1} C(n_{i+1}+r-2, r)
                                  T_{i+1}(n_{i+1}+r).

       This partitions valid completions by how many tokens from the already-open
       prefix are interleaved around the first opening of month i+1.  The recurrence
       is evaluated bottom-up; no production checkpoints/tables are used.

    Therefore a prefix state has exactly A * T_h(R+1) completions, where R is the
    total remaining multiplicity of the already-open months.  Lexicographic
    unranking tests candidate next month numbers in ascending order and recomputes
    this formula directly.  For practical full-year unranking the oracle keeps the
    exact factor A for the selected prefix and derives candidate A values by simplifying
    the displayed binomial product algebraically.  This optimization was derived here
    from the formula and is checked against literal exhaustive enumeration on small
    spaces; it uses no production checkpoints, tables, or helper code.
    """
    def __init__(self, lengths: Sequence[int], state_limit: int = 2_000_000):
        if not lengths or any(x <= 0 for x in lengths):
            raise ValueError("month lengths must be positive")
        self.initial = tuple(int(x) for x in lengths)
        self.m = len(self.initial)
        self.state_limit = int(state_limit)  # retained only as reported configuration
        self._tables = self._build_tail_tables()
        self._count_queries = 0

    def _build_tail_tables(self) -> tuple[tuple[int, ...], ...]:
        m = self.m
        # Maximum q reachable after months 0..i have been opened and only their
        # mandatory first occurrences have been consumed.
        needed = []
        prefix = 0
        for i, n in enumerate(self.initial):
            prefix += n
            needed.append(prefix - i)

        tables: list[list[int] | None] = [None] * m
        tables[m - 1] = [1] * (needed[m - 1] + 1)
        for i in range(m - 2, -1, -1):
            n = self.initial[i + 1]
            nxt = tables[i + 1]
            assert nxt is not None
            cur = [0] * (needed[i] + 1)
            # coef(q) = C(n+q-3, q-1).  Advance it by the exact
            # multiplicative recurrence instead of recomputing a binomial from
            # scratch for every q.  This is a mechanical optimization of the
            # displayed formula, not a different counting rule.
            coef = 1  # q=1 -> C(n-2, 0)
            for q in range(1, needed[i] + 1):
                dep = n + q - 1
                cur[q] = cur[q - 1] + coef * nxt[dep]
                # coef(q+1) / coef(q) = (n+q-2) / q, always integral.
                coef = (coef * (n + q - 2)) // q
            tables[i] = cur
        return tuple(tuple(x or ()) for x in tables)

    @property
    def states_visited(self) -> int:
        # Historical diagnostic name: now counts direct completion-count queries.
        return self._count_queries

    @staticmethod
    def _active_last_order_ways(rem: Sequence[int], low: int, high: int) -> int:
        if low > high:
            return 1
        prefix = rem[low]
        ways = 1
        for j in range(low + 1, high + 1):
            r = rem[j]
            ways *= _cached_comb(prefix + r - 1, r - 1)
            prefix += r
        return ways

    def _completion_count(self, rem: Sequence[int], low: int, high: int) -> int:
        self._count_queries += 1
        if high < 0:
            return 0
        active_total = sum(rem[low:high + 1]) if low <= high else 0
        base = self._active_last_order_ways(rem, low, high)
        future = 1 if high == self.m - 1 else self._tables[high][active_total + 1]
        return base * future

    def count_all(self) -> int:
        # The first symbol must be month 1.  After consuming it, month 1 is open.
        if self.m == 1:
            return 1
        rem = list(self.initial)
        rem[0] -= 1
        return self._completion_count(rem, 0, 0)

    def unrank(self, rank1: int, stop_after: int | None = None) -> tuple[int, ...]:
        total = self.count_all()
        if not 1 <= rank1 <= total:
            raise ValueError("rank outside month-weaving space")
        total_len = sum(self.initial)
        target_len = total_len if stop_after is None else min(stop_after, total_len)
        if target_len <= 0:
            return ()

        # First-occurrence order forces the first day to month 1.
        out = [1]
        if target_len == 1:
            return tuple(out)
        rem = list(self.initial)
        rem[0] -= 1
        low = 0
        high = 0
        rank = rank1

        # A is the exact number of valid merges of the currently opened months
        # when only the required order of their last occurrences is considered.
        # It starts at one because only month 1 is open.
        active_ways = 1
        active_total = rem[0]

        while len(out) < target_len:
            # For the current state, derive in O(number of open months) all exact
            # ratios A_after(j)/A for consuming one token from an already-open
            # month j.  This is just an algebraic simplification of the product
            # displayed in the class docstring; it does not query production code.
            prefix = [0] * self.m
            tail_num = [1] * self.m
            tail_den = [1] * self.m
            if low <= high:
                running = 0
                for k in range(low, high + 1):
                    running += rem[k]
                    prefix[k] = running
                for j in range(high - 1, low - 1, -1):
                    # Decrementing month j reduces every later prefix S_k by one.
                    # For k=j+1 the factor ratio is S_j/(S_{j+1}-1).
                    n = tail_num[j + 1] * prefix[j]
                    d = tail_den[j + 1] * (prefix[j + 1] - 1)
                    g = gcd(n, d)
                    tail_num[j], tail_den[j] = n // g, d // g

            selected = False
            # Lexicographic candidates: all opened labels, then exactly one new label.
            for j in range(low, min(high + 1, self.m - 1) + 1):
                is_new = j == high + 1
                if is_new:
                    if j >= self.m:
                        continue
                    n_j = self.initial[j]
                    new_active_total = active_total + n_j - 1
                    # Opening j consumes its mandatory first occurrence.  In the
                    # active-last-order product this appends exactly one new factor.
                    candidate_active_ways = active_ways * _cached_comb(
                        active_total + n_j - 2, n_j - 2
                    )
                    new_high = j
                    new_low = low
                else:
                    candidate_remaining = rem[j]
                    if candidate_remaining <= 0:
                        continue
                    # A later month may not have its last occurrence before the
                    # lowest still-open month has had its last occurrence.
                    if candidate_remaining == 1 and j != low:
                        continue

                    n = tail_num[j]
                    d = tail_den[j]
                    if j > low:
                        # The j-th product factor also changes from
                        # C(S_j-1,r_j-1) to C(S_j-2,r_j-2).
                        n *= rem[j] - 1
                        d *= prefix[j] - 1
                        g = gcd(n, d)
                        n //= g
                        d //= g
                    product = active_ways * n
                    if product % d:
                        raise AssertionError("non-integral active-weaving ratio")
                    candidate_active_ways = product // d
                    new_active_total = active_total - 1
                    new_high = high
                    new_low = low + 1 if candidate_remaining == 1 else low

                future = (
                    1
                    if new_high == self.m - 1
                    else self._tables[new_high][new_active_total + 1]
                )
                block = candidate_active_ways * future
                self._count_queries += 1
                if rank > block:
                    rank -= block
                    continue

                if is_new:
                    rem[j] = self.initial[j] - 1
                else:
                    rem[j] -= 1
                low, high = new_low, new_high
                active_total = new_active_total
                active_ways = candidate_active_ways
                out.append(j + 1)
                selected = True
                break
            if not selected:
                raise AssertionError("month-weaving unranking exhausted valid branches")
        return tuple(out)
# ===== END EMBEDDED ORACLE: combinatorics.py =====

# ===== BEGIN EMBEDDED ORACLE: sauce.py =====
"""Independent transcription of Tablets 7-16 (stones, sauce, bowls, answers, choice).

The public helper functions intentionally expose the specification's intermediate
stages so specification tests can test each rule directly rather than only the final
five-field calendar result.
"""


def build_stones() -> tuple[tuple[int, int, int, int, int], ...]:
    """Tablet 7: fixed first row and 45 simultaneous five-stone updates."""
    rows: list[tuple[int, int, int, int, int]] = [(17, 29, 43, 71, 101)]
    for drop_no in range(2, 47):
        w, b, s, bitter, red = rows[-1]
        rows.append((
            keep(w*w + 3*b + drop_no),
            keep(b*b + 5*s + w),
            keep(s*s + 7*bitter + b),
            keep(bitter*bitter + 11*red + s),
            keep(red*red + 13*w + bitter),
        ))
    return tuple(rows)

STONES = build_stones()


def hidden_drops(calculation_jdn: int, target_jdn: int) -> tuple[int, ...]:
    """Tablet 8: seven hidden drops, numbered by distance from visible drop 1."""
    c, t, distance, combined, direction = counters(calculation_jdn, target_jdn)
    out: list[int] = []
    for j in range(7):
        a, b, d, e = HIDDEN_COEFFICIENTS[j]
        x = keep(c + a*t + b*distance + d*combined + e*direction + sum(STONES[j]))
        for grind_no, stone_index in enumerate(HIDDEN_STONE_ORDER, start=1):
            old = x
            x = keep(old*old + 3*old + STONES[j][stone_index] + grind_no)
        out.append(x)
    return tuple(out)


def visible_drops(calculation_jdn: int, target_jdn: int, hidden: tuple[int, ...] | None = None) -> tuple[int, ...]:
    """Tablet 9: all 46 visible drops using i-1, i-3 and i-7 dependencies."""
    c, t, distance, combined, direction = counters(calculation_jdn, target_jdn)
    hidden = hidden if hidden is not None else hidden_drops(calculation_jdn, target_jdn)
    if len(hidden) != 7:
        raise ValueError("exactly seven hidden drops are required")
    # Visible drop i is sequence index i; hidden drop h is sequence index 1-h.
    sequence: dict[int, int] = {1 - h: hidden[h - 1] for h in range(1, 8)}
    drops: list[int] = []
    for i in range(1, 47):
        prev, third, seventh = sequence[i - 1], sequence[i - 3], sequence[i - 7]
        w, barley, salt, bitter, red = STONES[i - 1]
        x = keep(
            w*c + barley*t + salt*distance + bitter*combined + red*direction
            + prev + 3*third + 5*seventh + i
        )
        for q1, q2, q3, q4, stone_index in GRIND_ROWS:
            old = x
            x = keep(old*old + q1*old + q2*prev + q3*third + q4*seventh + STONES[i - 1][stone_index])
        sequence[i] = x
        drops.append(x)
    return tuple(drops)


def initial_bowls(calculation_jdn: int, target_jdn: int) -> tuple[int, ...]:
    """Tablet 10: initial contents of bowls 1..6."""
    c, t, distance, combined, direction = counters(calculation_jdn, target_jdn)
    bowls=[]
    for bowl_no, prime in enumerate(BOWL_PRIMES, start=1):
        total = c + t*bowl_no + distance + combined + direction + prime*prime
        bowls.append(keep(total*total + bowl_no))
    return tuple(bowls)


def bowl_order(drop: int) -> tuple[int, ...]:
    """Tablet 11: direct 1..720 lexicographic order selection (0-based bowl ids)."""
    return lexicographic_permutation_1_to_6((drop - 1) % 720 + 1)


def direct_pourings(drop_no: int, drop: int, bowls: tuple[int, ...], order: tuple[int, ...]) -> dict[int, int]:
    """Tablet 12: direct pourings into the first three positions of the chosen order."""
    direct: dict[int, int] = {}
    for pos in range(3):
        bowl_id=order[pos]
        direct[bowl_id]=keep(
            drop*drop + STONES[drop_no-1][DIRECT_STONES[pos]]*bowls[bowl_id]
            + DIRECT_MULTIPLIERS[pos]*drop_no
        )
    return direct


def mix_visible_drop(drop_no: int, drop: int, bowls: tuple[int, ...], order: tuple[int, ...], direct: dict[int, int] | None = None) -> tuple[int, ...]:
    """Tablet 13: simultaneous six-bowl mixing for one visible drop."""
    if direct is None:
        direct=direct_pourings(drop_no,drop,bowls,order)
    old=tuple(bowls);new=[0]*6
    for pos,bowl_id in enumerate(order):
        prev_id,next_id=order[(pos-1)%6],order[(pos+1)%6]
        u=(old[bowl_id]+2*old[prev_id]+3*old[next_id]+direct.get(bowl_id,0)+drop+STONES[drop_no-1][DROP_MIX_STONES[pos]])
        new[bowl_id]=keep(u*u+5*old[prev_id]*old[next_id]+drop_no*(pos+1))
    return tuple(new)


def final_mix(bowls: tuple[int, ...], mix_no: int) -> tuple[int, ...]:
    """Tablet 14: one of the twelve post-pouring simultaneous mixes."""
    if not 1 <= mix_no <= 12:
        raise ValueError("final mix number outside 1..12")
    old=tuple(bowls)
    saved_sum=keep(sum(old)+149*mix_no)
    order=lexicographic_permutation_1_to_6((saved_sum-1)%720+1)
    new=[0]*6
    for pos,bowl_id in enumerate(order):
        prev_id,next_id=order[(pos-1)%6],order[(pos+1)%6]
        u=old[bowl_id]+3*old[prev_id]+5*old[next_id]+saved_sum+mix_no+(pos+1)**2
        new[bowl_id]=keep(u*u+7*old[prev_id]*old[next_id])
    return tuple(new)


@dataclass(frozen=True)
class Sauce:
    bowls: tuple[int, int, int, int, int, int]
    drop46_order: tuple[int, int, int, int, int, int]

    def response_stream(self, bowl_number: int, seal: int):
        """Tablet 15: first response plus the full +/-1 cyclic response stream."""
        if not 1 <= bowl_number <= 6:
            raise ValueError("bowl number outside 1..6")
        b=bowl_number-1;order=self.drop46_order;pos=order.index(b);next_bowl=order[(pos+1)%6]
        first=keep((self.bowls[b]+seal+181)**2+179*self.bowls[next_bowl]+seal)
        direction_number=keep((first+seal+1+193)**2+193*first+197*self.bowls[5])
        step=1 if direction_number%2 else -1
        value=first
        while True:
            yield value
            value=(value-1+step)%GREAT+1

    def choose(self, bowl_number: int, seal: int, choices: int) -> int:
        """Tablet 16 short/wide rejection selection; returns 1-based lexicographic rank."""
        if choices < 1: raise ValueError("choice count must be >=1")
        stream=self.response_stream(bowl_number,seal)
        if choices <= GREAT:
            limit=(GREAT//choices)*choices
            first=next(stream)
            if first<=limit:
                accepted=first
            else:
                # Tablet 15 proves the stream advances by exactly +1 or -1 on a
                # complete cycle.  The rejected set is the contiguous tail
                # limit+1..GREAT, so the first accepted value is known directly:
                # descending reaches limit; ascending wraps to 1.
                second=next(stream)
                step=1 if second==(first%GREAT)+1 else -1
                accepted=1 if step>0 else limit
            return (accepted-1)%choices+1
        digits=1;space=GREAT
        while space<choices:digits+=1;space*=GREAT
        wide=1;weight=1
        for _ in range(digits):
            wide+=(next(stream)-1)*weight;weight*=GREAT
        probe=self.response_stream(bowl_number,seal);first=next(probe);second=next(probe)
        step=1 if second==(first%GREAT)+1 else -1
        limit=(space//choices)*choices;value=wide
        if value>limit:
            # Same contiguous-tail argument as in the short choice, now on the
            # GREAT**digits-wide cycle specified by Tablet 16.
            value=1 if step>0 else limit
        return (value-1)%choices+1


@lru_cache(maxsize=4096)
def make_sauce(calculation_jdn: int, target_jdn: int) -> Sauce:
    hidden=hidden_drops(calculation_jdn,target_jdn)
    drops=visible_drops(calculation_jdn,target_jdn,hidden)
    bowls=initial_bowls(calculation_jdn,target_jdn)
    drop46_order=None
    for i,drop in enumerate(drops,start=1):
        order=bowl_order(drop)
        if i==46:drop46_order=order
        direct=direct_pourings(i,drop,bowls,order)
        bowls=mix_visible_drop(i,drop,bowls,order,direct)
    assert drop46_order is not None
    for mix_no in range(1,13):bowls=final_mix(bowls,mix_no)
    return Sauce(tuple(bowls),tuple(drop46_order))
# ===== END EMBEDDED ORACLE: sauce.py =====

# ===== BEGIN EMBEDDED ORACLE: calendar.py =====
"""Independent end-to-end oracle derived from Tablets 17 through the final tablet."""


@dataclass(frozen=True)
class Year:
    number: int
    opening_gate_index: int
    closing_gate_index: int
    start_jdn: int
    end_jdn: int

    @property
    def length(self) -> int:
        return self.end_jdn - self.start_jdn + 1

    @property
    def gap_count(self) -> int:
        return self.closing_gate_index - self.opening_gate_index


@dataclass(frozen=True)
class StructurePlan:
    cutlet_names: tuple[str, ...]
    cutlet_ranges: tuple[tuple[int, int], ...]
    cutlet_gaps: tuple[int, ...]
    month_names: tuple[str, ...]
    month_lengths: tuple[int, ...]
    month_weaving: tuple[int, ...]
    year_length: int
    year_gaps: int
    cutlet_count: int
    month_count: int
    weaving_queries: int


def _independent_gate_gap(index: int) -> int:
    """One Tablet-17 gate gap. Independent by index; safe for process workers."""
    if index == 0:
        raise ValueError("gate zero has no preceding gap")
    s = make_sauce(FOUNDATION_JDN, FOUNDATION_JDN + index)
    return s.choose(1, SEALS["gate_distance"], GATE_CHOICE_COUNT) + 41


class GateTable:
    """Oracle-generated gate table. No production checkpoints are read or imported.

    Tablet 17 makes each gap query depend only on the signed gate index: the sauce
    question is (Foundation, Foundation + index). Therefore distant gap *values* can
    be computed in parallel, then accumulated in index order without changing the
    specification. This is an execution optimization only.
    """
    def __init__(self, workers: int = 1, chunk_size: int = 1024):
        self.positions: dict[int, int] = {0: FOUNDATION_JDN}
        self.max_positive = 0
        self.max_negative = 0
        self.workers = max(1, int(workers))
        self.chunk_size = max(64, int(chunk_size))
        self._pool = None

    @staticmethod
    @lru_cache(maxsize=None)
    def gap(index: int) -> int:
        return _independent_gate_gap(index)

    def _get_pool(self):
        if self.workers <= 1:
            return None
        if self._pool is None:
            method = "spawn" if os.name == "nt" else "fork"
            self._pool = mp.get_context(method).Pool(processes=self.workers)
        return self._pool

    def close(self) -> None:
        if self._pool is not None:
            try:
                self._pool.close()
                self._pool.join()
            except Exception:
                try:
                    self._pool.terminate()
                except Exception:
                    pass
            self._pool = None

    def _gap_values(self, indices: list[int]) -> list[int]:
        if not indices:
            return []
        try:
            pool = self._get_pool()
            if pool is None or len(indices) < 16:
                return [self.gap(i) for i in indices]
            return pool.map(_independent_gate_gap, indices, chunksize=max(1, len(indices) // (self.workers * 8)))
        except KeyboardInterrupt:
            raise
        except Exception as e:
            # A broken/spawn-starved worker pool is infrastructure. Recompute the
            # exact same independent gaps serially. If the Oracle computation itself
            # is defective, the serial pass will raise too, so this cannot hide it.
            print(
                f"Oracle worker pool unavailable ({type(e).__name__}: {e}); "
                "falling back to serial gate generation for the rest of this run.",
                file=sys.stderr, flush=True,
            )
            if self._pool is not None:
                try:
                    self._pool.terminate()
                    self._pool.join()
                except Exception:
                    pass
                self._pool = None
            self.workers = 1
            return [self.gap(i) for i in indices]

    def _extend_positive(self, count: int) -> None:
        first = self.max_positive + 1
        indices = list(range(first, first + count))
        gaps = self._gap_values(indices)
        pos = self.positions[self.max_positive]
        for k, gap in zip(indices, gaps):
            pos += gap
            self.positions[k] = pos
        self.max_positive = indices[-1]

    def _extend_negative(self, count: int) -> None:
        indices = list(range(self.max_negative - 1, self.max_negative - count - 1, -1))
        gaps = self._gap_values(indices)
        pos = self.positions[self.max_negative]
        for k, gap in zip(indices, gaps):
            pos -= gap
            self.positions[k] = pos
        self.max_negative = indices[-1]

    def ensure_index(self, index: int) -> None:
        if index > self.max_positive:
            missing = index - self.max_positive
            if self.workers > 1 and missing >= 16:
                self._extend_positive(missing)
            else:
                for _ in range(missing):
                    self._extend_positive(1)
        elif index < self.max_negative:
            missing = self.max_negative - index
            if self.workers > 1 and missing >= 16:
                self._extend_negative(missing)
            else:
                for _ in range(missing):
                    self._extend_negative(1)

    def at(self, index: int) -> int:
        self.ensure_index(index)
        return self.positions[index]

    def bracket(self, jdn: int) -> tuple[int, int]:
        """Return gate indices surrounding jdn, extending in parallel chunks when far away."""
        if jdn >= FOUNDATION_JDN:
            while self.positions[self.max_positive] < jdn:
                count = self.chunk_size if self.workers > 1 else 1
                self._extend_positive(count)
                if self.workers > 1:
                    print(
                        f"  oracle gates: +{self.max_positive:,} -> JDN {self.positions[self.max_positive]:,}",
                        flush=True,
                    )
            hi = self.max_positive
            vals = [self.positions[i] for i in range(0, hi + 1)]
            k = bisect_left(vals, jdn)
            if k < len(vals) and vals[k] == jdn:
                return k - 1, k
            return k - 1, k

        while self.positions[self.max_negative] >= jdn:
            count = self.chunk_size if self.workers > 1 else 1
            self._extend_negative(count)
            if self.workers > 1:
                print(
                    f"  oracle gates: {self.max_negative:,} -> JDN {self.positions[self.max_negative]:,}",
                    flush=True,
                )
        lo = self.max_negative
        indices = list(range(lo, 1))
        vals = [self.positions[i] for i in indices]
        k = bisect_left(vals, jdn)
        if k < len(vals) and vals[k] == jdn:
            return indices[k] - 1, indices[k]
        return indices[k - 1], indices[k]


class OracleCalendar:
    def __init__(self, weaving_state_limit: int = 2_000_000, gate_workers: int = 1):
        self.gates = GateTable(workers=gate_workers)
        self.weaving_state_limit = weaving_state_limit

    def _candidate_years_containing(self, calculation_jdn: int) -> list[Year]:
        lo, hi = self.gates.bracket(calculation_jdn)
        # Need every opening/closing gate within MAX_YEAR_DAYS of c, plus endpoints.
        while self.gates.at(lo) >= calculation_jdn - MAX_YEAR_DAYS:
            lo -= 1
            self.gates.ensure_index(lo)
        while self.gates.at(hi) < calculation_jdn + MAX_YEAR_DAYS:
            hi += 1
            self.gates.ensure_index(hi)
        candidates: list[Year] = []
        for p in range(lo, hi):
            gp = self.gates.at(p)
            if not gp < calculation_jdn:
                continue
            for q in range(p + MIN_YEAR_GAPS, hi + 1):
                gq = self.gates.at(q)
                length = gq - gp
                if length > MAX_YEAR_DAYS:
                    break
                if gq < calculation_jdn:
                    continue
                if MIN_YEAR_DAYS <= length <= MAX_YEAR_DAYS:
                    candidates.append(Year(5000, p, q, gp + 1, gq))
        candidates.sort(key=lambda y: (y.length, self.gates.at(y.opening_gate_index)))
        return candidates

    @lru_cache(maxsize=128)
    def year_5000(self, calculation_jdn: int) -> Year:
        candidates = self._candidate_years_containing(calculation_jdn)
        if not candidates:
            raise AssertionError("specification guarantees at least one candidate year")
        s = make_sauce(calculation_jdn, calculation_jdn)
        rank = s.choose(1, SEALS["year_5000"], len(candidates))
        return candidates[rank - 1]

    def next_year(self, calculation_jdn: int, year: Year) -> Year:
        p = year.closing_gate_index
        candidates: list[Year] = []
        q = p + MIN_YEAR_GAPS
        while True:
            end = self.gates.at(q)
            length = end - self.gates.at(p)
            if length > MAX_YEAR_DAYS:
                break
            if length >= MIN_YEAR_DAYS:
                candidates.append(Year(year.number + 1, p, q, self.gates.at(p) + 1, end))
            q += 1
        candidates.sort(key=lambda y: y.length)
        s = make_sauce(calculation_jdn, self.gates.at(p))
        rank = s.choose(1, SEALS["next_year"], len(candidates))
        return candidates[rank - 1]

    def previous_year(self, calculation_jdn: int, year: Year) -> Year:
        q = year.opening_gate_index
        candidates: list[Year] = []
        p = q - MIN_YEAR_GAPS
        while True:
            start_gate = self.gates.at(p)
            length = self.gates.at(q) - start_gate
            if length > MAX_YEAR_DAYS:
                break
            if length >= MIN_YEAR_DAYS:
                candidates.append(Year(year.number - 1, p, q, start_gate + 1, self.gates.at(q)))
            p -= 1
        candidates.sort(key=lambda y: y.length)
        s = make_sauce(calculation_jdn, self.gates.at(q))
        rank = s.choose(1, SEALS["previous_year"], len(candidates))
        return candidates[rank - 1]

    def year_for(self, calculation_jdn: int, target_jdn: int) -> Year:
        year = self.year_5000(calculation_jdn)
        while target_jdn < year.start_jdn:
            year = self.previous_year(calculation_jdn, year)
        while target_jdn > year.end_jdn:
            year = self.next_year(calculation_jdn, year)
        return year

    @lru_cache(maxsize=64)
    def _structure_plan(self, calculation_jdn: int, year: Year) -> StructurePlan:
        """Build one complete year structure from the specification.

        The plan is target-independent: Tablet 20/21 explicitly fixes the sauce
        inputs for structure questions to (calculation day, first day of year).
        Caching this immutable plan therefore changes only cost, never semantics.
        """
        s = make_sauce(calculation_jdn, year.start_jdn)
        possible_cutlet_counts = list(range(MIN_CUTLETS, min(MAX_CUTLETS, year.gap_count) + 1))
        cutlet_count = possible_cutlet_counts[s.choose(2, SEALS["cutlet_count"], len(possible_cutlet_counts)) - 1]

        required_boundary = None
        if calculation_jdn != year.end_jdn and year.start_jdn <= calculation_jdn <= year.end_jdn:
            for k in range(year.opening_gate_index + 1, year.closing_gate_index):
                if self.gates.at(k) == calculation_jdn:
                    required_boundary = k - year.opening_gate_index
                    break

        from functools import lru_cache as _lru_cache
        @_lru_cache(maxsize=None)
        def comp_count(rem: int, parts_left: int, prefix: int) -> int:
            if parts_left == 0:
                return int(rem == 0 and (required_boundary is None or prefix > required_boundary))
            if rem < parts_left:
                return 0
            total = 0
            for first in range(1, rem - parts_left + 2):
                new_prefix = prefix + first
                if required_boundary is not None and prefix < required_boundary < new_prefix:
                    continue
                if required_boundary is not None and new_prefix > required_boundary and prefix < required_boundary:
                    continue
                total += comp_count(rem - first, parts_left - 1, new_prefix)
            return total

        partition_count = comp_count(year.gap_count, cutlet_count, 0)
        partition_rank = s.choose(2, SEALS["cutlet_partition"], partition_count)
        cutlet_gaps = unrank_positive_composition(
            year.gap_count, cutlet_count, partition_rank, required_boundary
        )

        cutlet_name_count = 1
        for x in range(len(CUTLET_NAMES) - cutlet_count + 1, len(CUTLET_NAMES) + 1):
            cutlet_name_count *= x
        cutlet_names = unrank_partial_permutation(
            CUTLET_NAMES, cutlet_count,
            s.choose(5, SEALS["cutlet_names"], cutlet_name_count),
        )

        month_min = (year.length + MAX_MONTH_DAYS - 1) // MAX_MONTH_DAYS
        month_max = min(MAX_MONTHS, year.length // MIN_MONTH_DAYS)
        month_count_candidates = list(range(month_min, month_max + 1))
        month_count = month_count_candidates[
            s.choose(3, SEALS["month_count"], len(month_count_candidates)) - 1
        ]

        length_count = bounded_composition_count(
            year.length, month_count, MIN_MONTH_DAYS, MAX_MONTH_DAYS
        )
        month_lengths = unrank_bounded_composition(
            year.length, month_count, MIN_MONTH_DAYS, MAX_MONTH_DAYS,
            s.choose(3, SEALS["month_lengths"], length_count),
        )

        weaving_counter = MonthWeavingOracle(month_lengths, state_limit=self.weaving_state_limit)
        weaving_count = weaving_counter.count_all()
        weaving_rank = s.choose(4, SEALS["month_weaving"], weaving_count)
        month_weaving = weaving_counter.unrank(weaving_rank)

        month_name_count = 1
        for x in range(len(MONTH_NAMES) - month_count + 1, len(MONTH_NAMES) + 1):
            month_name_count *= x
        month_names = unrank_partial_permutation(
            MONTH_NAMES, month_count,
            s.choose(5, SEALS["month_names"], month_name_count),
        )

        cumulative_gaps = 0
        cutlet_start = year.start_jdn
        ranges: list[tuple[int, int]] = []
        for gaps in cutlet_gaps:
            cumulative_gaps += gaps
            cutlet_end = self.gates.at(year.opening_gate_index + cumulative_gaps)
            ranges.append((cutlet_start, cutlet_end))
            cutlet_start = cutlet_end + 1

        return StructurePlan(
            cutlet_names=tuple(cutlet_names),
            cutlet_ranges=tuple(ranges),
            cutlet_gaps=tuple(cutlet_gaps),
            month_names=tuple(month_names),
            month_lengths=tuple(month_lengths),
            month_weaving=tuple(month_weaving),
            year_length=year.length,
            year_gaps=year.gap_count,
            cutlet_count=cutlet_count,
            month_count=month_count,
            weaving_queries=weaving_counter.states_visited,
        )

    def structure(self, calculation_jdn: int, year: Year, target_jdn: int) -> dict:
        if not year.start_jdn <= target_jdn <= year.end_jdn:
            raise ValueError("target is outside supplied year")
        plan = self._structure_plan(calculation_jdn, year)

        cutlet_index = None
        day_in_cutlet = None
        for i, (start, end) in enumerate(plan.cutlet_ranges):
            if start <= target_jdn <= end:
                cutlet_index = i
                day_in_cutlet = target_jdn - start + 1
                break
        if cutlet_index is None:
            raise AssertionError("target not located in cutlet partition")

        target_offset = target_jdn - year.start_jdn
        month_index = plan.month_weaving[target_offset] - 1
        day_in_month = sum(
            1 for x in plan.month_weaving[: target_offset + 1] if x == month_index + 1
        )
        return {
            "year": str(year.number),
            "cutletName": plan.cutlet_names[cutlet_index],
            "dayInCutlet": day_in_cutlet,
            "monthName": plan.month_names[month_index],
            "dayInMonth": day_in_month,
            "_diagnostics": {
                "yearLength": plan.year_length,
                "yearGaps": plan.year_gaps,
                "cutletCount": plan.cutlet_count,
                "monthCount": plan.month_count,
                "weavingStates": plan.weaving_queries,
            },
        }

    def convert_jdn(self, target_jdn: int, calculation_jdn: int) -> dict:
        year = self.year_for(calculation_jdn, target_jdn)
        return self.structure(calculation_jdn, year, target_jdn)
# ===== END EMBEDDED ORACLE: calendar.py =====

# =============================================================================
# Standalone GitHub/Node differential-soak harness
# =============================================================================

NODE_VERSION = "22.23.2"
NODE_WIN_X64_ARCHIVE_SHA256 = "1177b4137ba5adaa56354ae40f1080c7450e8ae09cecb47da459d1c52ac99f97"
NODE_WIN_X64_EXE_SHA256 = "0d0f5e39f9f3d9587bc19f73eab3c2c9c4903fd02d6dbf9c853dd81b3d95fad4"
NODE_WIN_X64_URL = f"https://nodejs.org/dist/v{NODE_VERSION}/node-v{NODE_VERSION}-win-x64.zip"

NODE_ADAPTER = r'''#!/usr/bin/env node
import fs from 'node:fs';
import * as fast from './fast.mjs';

function plain(value) {
  const x = typeof value?.toJSON === 'function' ? value.toJSON() : value;
  return {
    year: String(x.year),
    cutletName: x.cutletName,
    dayInCutlet: Number(x.dayInCutlet),
    monthName: x.monthName,
    dayInMonth: Number(x.dayInMonth),
  };
}
function dummyDate() { return new fast.GregorianDate(2000n, 1, 1); }
const cal = new fast.PastafariCalendar({todayProvider: dummyDate});
const req = JSON.parse(fs.readFileSync(0, 'utf8'));
let result;
if (req.op === 'meta') {
  result = { info: fast.FAST_IMPLEMENTATION_INFO ?? null };
} else if (req.op === 'range') {
  const rows = fast.convertJdnRange(BigInt(req.startJdn), Number(req.count), {
    calculationJdn: BigInt(req.calculationJdn),
  });
  result = rows.map(plain);
} else if (req.op === 'cases') {
  result = req.cases.map(c => plain(cal.convertJdn(BigInt(c.targetJdn), {
    calculationJdn: BigInt(c.calculationJdn),
  })));
} else {
  throw new Error(`Unknown op ${req.op}`);
}
console.log(JSON.stringify(result));
'''


def _sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def _script_sha256() -> str:
    try:
        return _sha256_file(Path(__file__).resolve())
    except Exception:
        return "unavailable"


def _git_blob_sha1(data: bytes) -> str:
    h = hashlib.sha1()
    h.update(f"blob {len(data)}\0".encode('ascii'))
    h.update(data)
    return h.hexdigest()


def _retry_delay(attempt: int) -> float:
    """Deterministic exponential backoff for infrastructure retries."""
    if attempt <= 0:
        return INFRA_BACKOFF_INITIAL
    return min(INFRA_BACKOFF_MAX, INFRA_BACKOFF_INITIAL * (2 ** min(attempt, 10)))


def _infra_retry_notice(label: str, attempt: int, exc: BaseException, delay: float) -> None:
    print(
        f"INFRASTRUCTURE UNAVAILABLE: {label}: {type(exc).__name__}: {exc}. "
        f"Retrying in {delay:g}s (attempt {attempt + 1}; Ctrl-C to stop)...",
        file=sys.stderr,
        flush=True,
    )


def _http_error_is_transient(e: urllib.error.HTTPError) -> bool:
    if e.code in {408, 425, 429} or 500 <= e.code <= 599:
        return True
    if e.code == 403:
        # GitHub rate limiting is temporary; an ordinary authorization failure is not.
        remaining = e.headers.get("X-RateLimit-Remaining") if e.headers else None
        retry_after = e.headers.get("Retry-After") if e.headers else None
        return remaining == "0" or retry_after is not None
    return False


def _http_bytes(url: str, *, timeout: int = 60, accept: str | None = None) -> bytes:
    headers = {
        "User-Agent": f"pastafari-calendar-standalone-soak/{SCRIPT_VERSION}",
        "Accept": accept or "*/*",
    }
    attempt = 0
    while True:
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            body = e.read(4096).decode('utf-8', 'replace')
            if not _http_error_is_transient(e):
                raise RuntimeError(f"HTTP {e.code} while fetching {url}: {body}") from e
            delay = _retry_delay(attempt)
            _infra_retry_notice(f"HTTP {e.code} while fetching {url}", attempt, e, delay)
        except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as e:
            delay = _retry_delay(attempt)
            _infra_retry_notice(f"network fetch {url}", attempt, e, delay)
        attempt += 1
        time.sleep(delay)


def _http_json(url: str, *, timeout: int = 60) -> dict:
    attempt = 0
    while True:
        raw = _http_bytes(url, timeout=timeout, accept="application/vnd.github+json")
        try:
            value = json.loads(raw.decode('utf-8'))
            if not isinstance(value, dict):
                raise ValueError(f"expected JSON object, got {type(value).__name__}")
            return value
        except (UnicodeDecodeError, json.JSONDecodeError, ValueError) as e:
            delay = _retry_delay(attempt)
            _infra_retry_notice(f"invalid transient JSON response from {url}", attempt, e, delay)
            attempt += 1
            time.sleep(delay)


def fetch_github_snapshot(repo: str, requested_branch: str | None) -> dict:
    if repo.count('/') != 1:
        raise ValueError("--repo must be OWNER/REPOSITORY")
    quoted_repo = '/'.join(urllib.parse.quote(x, safe='') for x in repo.split('/'))
    info = _http_json(f"https://api.github.com/repos/{quoted_repo}")
    branch = requested_branch or info["default_branch"]
    commit_info = _http_json(
        f"https://api.github.com/repos/{quoted_repo}/commits/{urllib.parse.quote(branch, safe='')}"
    )
    commit = commit_info["sha"]
    raw_url = (
        f"https://raw.githubusercontent.com/{quoted_repo}/{urllib.parse.quote(commit, safe='')}/"
        f"{FAST_PATH}"
    )
    fast_bytes = _http_bytes(raw_url, timeout=120)
    if b"export function convertJdnRange" not in fast_bytes:
        raise RuntimeError(
            f"{FAST_PATH} at {commit} does not expose convertJdnRange; refusing to guess a different API"
        )
    return {
        "repo": repo,
        "branch": branch,
        "commit": commit,
        "path": FAST_PATH,
        "rawUrl": raw_url,
        "fastBytes": fast_bytes,
        "fastSha256": _sha256_bytes(fast_bytes),
        "fastGitBlobSha1": _git_blob_sha1(fast_bytes),
        "fetchedAtUtc": _dt.datetime.now(_dt.timezone.utc).isoformat(),
    }


def _runtime_base() -> Path:
    """Persistent per-user runtime storage; deliberately never uses %TEMP%."""
    if os.name == "nt":
        local = os.environ.get("LOCALAPPDATA")
        if local:
            return Path(local) / "PastafariSoak"
        return Path.home() / "AppData" / "Local" / "PastafariSoak"
    xdg = os.environ.get("XDG_CACHE_HOME")
    return (Path(xdg) if xdg else Path.home() / ".cache") / "pastafari-soak"


def _atomic_write_bytes(path: Path, data: bytes) -> None:
    attempt = 0
    while True:
        tmp = path.with_name(path.name + f".tmp-{os.getpid()}")
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            tmp.write_bytes(data)
            os.replace(tmp, path)
            return
        except OSError as e:
            try:
                tmp.unlink(missing_ok=True)
            except OSError:
                pass
            delay = _retry_delay(attempt)
            _infra_retry_notice(f"write {path}", attempt, e, delay)
            attempt += 1
            time.sleep(delay)


def _atomic_write_text(path: Path, data: str) -> None:
    _atomic_write_bytes(path, data.encode("utf-8"))


def ensure_node() -> Path:
    found = shutil.which("node")
    if found:
        p = Path(found)
        try:
            v = subprocess.check_output([str(p), "--version"], text=True, timeout=10).strip()
            print(f"Node.js: {v} [{p}]", flush=True)
            return p
        except Exception as e:
            print(
                f"Node.js found on PATH at {p} but is temporarily unusable ({e}); "
                "falling back to the verified private bootstrap when possible.",
                file=sys.stderr,
                flush=True,
            )

    is_win_x64 = os.name == "nt" and platform.machine().lower() in {"amd64", "x86_64", "x64"}
    if not is_win_x64:
        if found:
            raise RuntimeError(
                "Node.js on PATH is not runnable and automatic bootstrap is available only on Windows x64."
            )
        raise RuntimeError(
            "Node.js is not on PATH. Automatic verified bootstrap is embedded for Windows x64 only. "
            "Install Node.js or put node on PATH on this platform."
        )

    cache = _runtime_base() / "node" / f"v{NODE_VERSION}-win-x64-verified"
    exe = cache / "node.exe"
    if exe.exists():
        try:
            if _sha256_file(exe) == NODE_WIN_X64_EXE_SHA256:
                try:
                    v = subprocess.check_output([str(exe), "--version"], text=True, timeout=10).strip()
                    print(f"Node.js: {v} [verified persistent bootstrap: {exe}]", flush=True)
                    return exe
                except Exception as e:
                    print(f"Cached node.exe is temporarily unusable ({e}); rebuilding it.", file=sys.stderr, flush=True)
        except OSError:
            pass

    attempt = 0
    while True:
        try:
            print(f"Node.js is not usable; downloading official Node.js v{NODE_VERSION} for Windows x64...", flush=True)
            archive = _http_bytes(NODE_WIN_X64_URL, timeout=180)
            archive_sha = _sha256_bytes(archive)
            if archive_sha != NODE_WIN_X64_ARCHIVE_SHA256:
                raise RuntimeError(
                    f"Node archive SHA-256 mismatch: expected {NODE_WIN_X64_ARCHIVE_SHA256}, got {archive_sha}"
                )
            print(f"Node archive SHA-256 verified: {archive_sha}", flush=True)
            cache.mkdir(parents=True, exist_ok=True)
            # No temporary filesystem dependency: extract node.exe directly from
            # the already verified ZIP bytes held in memory.
            with zipfile.ZipFile(io.BytesIO(archive)) as zf:
                member = f"node-v{NODE_VERSION}-win-x64/node.exe"
                data = zf.read(member)
            exe_sha = _sha256_bytes(data)
            if exe_sha != NODE_WIN_X64_EXE_SHA256:
                raise RuntimeError(
                    f"node.exe SHA-256 mismatch: expected {NODE_WIN_X64_EXE_SHA256}, got {exe_sha}"
                )
            _atomic_write_bytes(exe, data)
            if _sha256_file(exe) != NODE_WIN_X64_EXE_SHA256:
                raise RuntimeError("Persistent node.exe failed post-write SHA-256 verification")
            v = subprocess.check_output([str(exe), "--version"], text=True, timeout=10).strip()
            print(f"node.exe SHA-256 verified: {NODE_WIN_X64_EXE_SHA256}", flush=True)
            print(f"Node.js: {v} [verified persistent bootstrap: {exe}]", flush=True)
            return exe
        except RuntimeError as e:
            # A cryptographic mismatch is not availability; never retry it as if
            # it were harmless infrastructure noise.
            if "SHA-256 mismatch" in str(e) or "failed post-write SHA-256" in str(e):
                raise
            delay = _retry_delay(attempt)
            _infra_retry_notice("verified Node bootstrap", attempt, e, delay)
        except (OSError, subprocess.SubprocessError, zipfile.BadZipFile, KeyError) as e:
            delay = _retry_delay(attempt)
            _infra_retry_notice("verified Node bootstrap", attempt, e, delay)
        attempt += 1
        time.sleep(delay)


class TransientInfrastructureError(RuntimeError):
    """A failure that says nothing about calendar correctness and should retry."""


class ProductionExecutionError(RuntimeError):
    """A repeated production-process failure that may be deterministic."""


class ProductionRuntime:
    """Self-healing local runtime for the exact GitHub production bytes."""

    def __init__(self, fast_bytes: bytes, fast_sha256: str):
        self.fast_bytes = fast_bytes
        self.fast_sha256 = fast_sha256
        self.adapter_bytes = NODE_ADAPTER.encode("utf-8")
        self.adapter_sha256 = _sha256_bytes(self.adapter_bytes)
        self.root = _runtime_base() / "production" / fast_sha256
        self.fast_path = self.root / "fast.mjs"
        self.adapter_path = self.root / "adapter.mjs"
        self.node = ensure_node()
        self.recovery_count = 0
        self.ensure_files(force=False)

    def ensure_files(self, *, force: bool = False) -> None:
        while True:
            try:
                self.root.mkdir(parents=True, exist_ok=True)
                rewrite_fast = force or not self.fast_path.exists()
                if not rewrite_fast:
                    try:
                        rewrite_fast = _sha256_file(self.fast_path) != self.fast_sha256
                    except OSError:
                        rewrite_fast = True
                if rewrite_fast:
                    _atomic_write_bytes(self.fast_path, self.fast_bytes)
                if _sha256_file(self.fast_path) != self.fast_sha256:
                    raise RuntimeError("Persistent production module failed SHA-256 verification")

                rewrite_adapter = force or not self.adapter_path.exists()
                if not rewrite_adapter:
                    try:
                        rewrite_adapter = _sha256_file(self.adapter_path) != self.adapter_sha256
                    except OSError:
                        rewrite_adapter = True
                if rewrite_adapter:
                    _atomic_write_bytes(self.adapter_path, self.adapter_bytes)
                if _sha256_file(self.adapter_path) != self.adapter_sha256:
                    raise RuntimeError("Persistent Node adapter failed SHA-256 verification")
                return
            except OSError as e:
                # Path availability / sharing violations are infrastructure, not a
                # calendar verdict. Keep trying until the filesystem is available.
                delay = INFRA_BACKOFF_INITIAL
                _infra_retry_notice(f"production runtime files under {self.root}", 0, e, delay)
                time.sleep(delay)
                force = True

    def ensure_node(self) -> None:
        try:
            exists = self.node.exists()
        except OSError:
            exists = False
        if exists:
            # For our pinned bootstrap, verify bytes on every invocation. For a PATH
            # installation, existence is enough; subprocess errors still trigger repair.
            if self.node.parent.name == f"v{NODE_VERSION}-win-x64-verified":
                try:
                    if _sha256_file(self.node) == NODE_WIN_X64_EXE_SHA256:
                        return
                except OSError:
                    pass
            else:
                return
        self.node = ensure_node()

    @staticmethod
    def _stderr_looks_transient(stderr_tail: str) -> bool:
        low = stderr_tail.lower()
        markers = (
            "module_not_found", "err_module_not_found", "cannot find module",
            "enoent", "eacces", "eperm", "resource temporarily unavailable",
            "temporarily unavailable", "sharing violation", "being used by another process",
            "cannot access the file", "access is denied",
        )
        return any(m in low for m in markers)

    def _run_once(self, request: dict, timeout: int) -> object:
        self.ensure_files(force=False)
        self.ensure_node()
        try:
            p = subprocess.run(
                [str(self.node), str(self.adapter_path)],
                input=json.dumps(request, ensure_ascii=False, separators=(',', ':')),
                text=True,
                encoding='utf-8',
                errors='replace',
                capture_output=True,
                timeout=timeout,
                cwd=self.root,
            )
        except subprocess.TimeoutExpired as e:
            raise TransientInfrastructureError(
                f"NODE_TIMEOUT: production Node invocation exceeded {timeout}s"
            ) from e
        except (FileNotFoundError, PermissionError, OSError) as e:
            raise TransientInfrastructureError(f"RUNTIME_PROCESS_UNAVAILABLE: {e}") from e

        if p.returncode != 0:
            stderr_tail = p.stderr[-8000:]
            stdout_tail = p.stdout[-2000:]
            text = (
                f"Production Node adapter failed (exit {p.returncode}).\n"
                f"STDERR:\n{stderr_tail}\nSTDOUT:\n{stdout_tail}"
            )
            if self._stderr_looks_transient(stderr_tail):
                raise TransientInfrastructureError("RUNTIME_NODE_TRANSIENT: " + text)
            raise ProductionExecutionError("PRODUCTION_NODE_FAILED: " + text)

        try:
            value = json.loads(p.stdout)
        except Exception as e:
            # Truncated/empty stdout is commonly a killed process or I/O interruption.
            raise TransientInfrastructureError(
                f"NODE_OUTPUT_UNAVAILABLE: invalid JSON from production adapter: {p.stdout[-4000:]}"
            ) from e
        return value

    def _repair(self) -> None:
        # Re-resolve Node and rewrite both exact verified runtime files. None of
        # this changes production bytes or the Oracle.
        try:
            self.node = ensure_node()
        finally:
            self.ensure_files(force=True)

    def run(self, request: dict, timeout: int) -> object:
        transient_attempt = 0
        unknown_attempt = 0
        current_timeout = timeout
        while True:
            try:
                return self._run_once(request, current_timeout)
            except TransientInfrastructureError as e:
                self.recovery_count += 1
                delay = _retry_delay(transient_attempt)
                print(
                    f"Transient production-runtime failure: {e}\n"
                    f"Rebuilding verified runtime and retrying in {delay:g}s; the batch is NOT lost.",
                    file=sys.stderr,
                    flush=True,
                )
                # A timeout may merely be an unusually slow case. Increase its
                # allowance progressively rather than turning slowness into a crash.
                if str(e).startswith("NODE_TIMEOUT:"):
                    current_timeout = min(max(current_timeout * 2, current_timeout + 60), 86_400)
                    print(f"Node timeout allowance increased to {current_timeout}s for this same request.",
                          file=sys.stderr, flush=True)
                try:
                    self._repair()
                except KeyboardInterrupt:
                    raise
                except Exception as repair_error:
                    print(f"Runtime repair is temporarily unavailable too: {repair_error}",
                          file=sys.stderr, flush=True)
                transient_attempt += 1
                time.sleep(delay)
                continue
            except ProductionExecutionError as e:
                # A single unexplained non-zero exit may still be an AV kill, OS
                # hiccup, etc. Rebuild and replay a few times. If the same class of
                # failure persists, surface it instead of hiding a real engine defect.
                if unknown_attempt >= UNKNOWN_NODE_RETRIES:
                    raise
                self.recovery_count += 1
                delay = _retry_delay(unknown_attempt)
                print(
                    f"Unexplained Node failure; replaying the identical request after verified rebuild "
                    f"({unknown_attempt + 1}/{UNKNOWN_NODE_RETRIES}) in {delay:g}s.\n{e}",
                    file=sys.stderr,
                    flush=True,
                )
                self._repair()
                unknown_attempt += 1
                time.sleep(delay)


def run_node(runtime: ProductionRuntime, request: dict, timeout: int) -> object:
    return runtime.run(request, timeout)


def plain_date(x: dict) -> dict:
    return {k: x[k] for k in FIELDS}


def splitmix64(x: int) -> int:
    z = (x + 0x9E3779B97F4A7C15) & MASK64
    z = ((z ^ (z >> 30)) * 0xBF58476D1CE4E5B9) & MASK64
    z = ((z ^ (z >> 27)) * 0x94D049BB133111EB) & MASK64
    return (z ^ (z >> 31)) & MASK64


def deterministic_signed_offset(seed: int, batch: int, radius: int, salt: int = 0) -> int:
    if radius <= 0:
        return 0
    r = splitmix64((seed + batch * 0xD1342543DE82EF95 + salt) & MASK64)
    return int(r % (2 * radius + 1)) - radius


def calculation_for(seed: int, batch: int, anchor_jdn: int, near_days: int, far_days: int) -> tuple[int, str]:
    if batch == 0:
        return FOUNDATION_JDN, "foundation"
    if batch == 1:
        return anchor_jdn, "anchor"
    if batch == 2:
        return anchor_jdn - 1, "anchor-1"
    if batch == 3:
        return anchor_jdn + 1, "anchor+1"
    selector = splitmix64((seed ^ (batch * 0x9E3779B97F4A7C15)) & MASK64)
    if selector % 20:
        radius = near_days
        label = "near"
    else:
        radius = far_days
        label = "far"
    return anchor_jdn + deterministic_signed_offset(seed, batch, radius, 0xA5A5A5A5A5A5A5A5), label


def oracle_year_rows(cal: OracleCalendar, calculation_jdn: int, year: Year) -> list[dict]:
    """Materialize every day of one Oracle year in O(year length), not O(n^2)."""
    plan = cal._structure_plan(calculation_jdn, year)
    rows: list[dict] = []
    seen = [0] * plan.month_count
    cutlet_i = 0
    cut_start, cut_end = plan.cutlet_ranges[0]
    for off, month1 in enumerate(plan.month_weaving):
        target = year.start_jdn + off
        while target > cut_end:
            cutlet_i += 1
            cut_start, cut_end = plan.cutlet_ranges[cutlet_i]
        month0 = month1 - 1
        seen[month0] += 1
        rows.append({
            "year": str(year.number),
            "cutletName": plan.cutlet_names[cutlet_i],
            "dayInCutlet": target - cut_start + 1,
            "monthName": plan.month_names[month0],
            "dayInMonth": seen[month0],
        })
    return rows


def neighbor_targets(cal: OracleCalendar, seed: int, batch: int, c: int, y: Year, count: int) -> tuple[str, list[int]]:
    """Probe one immediately adjacent year, alternating previous/next.

    Adjacent year *structure* construction is intentionally periodic rather than
    per batch: it is much more expensive than exhaustively materializing the
    already-selected Year 5000, so doing both neighbors every time sharply reduces
    total differential coverage per hour.
    """
    side = "previous" if ((batch // 2) & 1) == 0 else "next"
    chosen = cal.previous_year(c, y) if side == "previous" else cal.next_year(c, y)
    values = {chosen.start_jdn, chosen.start_jdn + 1, chosen.end_jdn - 1, chosen.end_jdn}
    for i in range(max(0, count)):
        r = splitmix64((seed + batch * 0x94D049BB133111EB + i * 0xBF58476D1CE4E5B9) & MASK64)
        values.add(chosen.start_jdn + int(r % chosen.length))
    return side, sorted(values)


def compare_rows(expected: list[dict], actual: list[dict], *, c: int, start_jdn: int | None, targets: list[int] | None, batch: int) -> list[dict]:
    failures = []
    if len(expected) != len(actual):
        return [{
            "batch": batch,
            "kind": "length-mismatch",
            "calculationJdn": str(c),
            "expectedCount": len(expected),
            "actualCount": len(actual),
        }]
    for i, (e, a) in enumerate(zip(expected, actual)):
        a = plain_date(a)
        if e != a:
            t = targets[i] if targets is not None else int(start_jdn) + i
            failures.append({
                "batch": batch,
                "caseIndex": i,
                "calculationJdn": str(c),
                "targetJdn": str(t),
                "oracle": e,
                "fast": a,
            })
            break
    return failures


def atomic_write_json(path: Path, obj: dict) -> None:
    _atomic_write_text(path, json.dumps(obj, ensure_ascii=False, indent=2))


def append_jsonl(path: Path, obj: dict) -> None:
    line = json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n'
    attempt = 0
    while True:
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            with path.open('a', encoding='utf-8', newline='\n') as f:
                f.write(line)
                f.flush()
            return
        except OSError as e:
            delay = _retry_delay(attempt)
            _infra_retry_notice(f"append log {path}", attempt, e, delay)
            attempt += 1
            time.sleep(delay)



def sha256_file_resilient(path: Path) -> str:
    """SHA-256 a file, retrying transient filesystem failures indefinitely."""
    attempt = 0
    while True:
        try:
            return _sha256_file(path)
        except OSError as e:
            delay = _retry_delay(attempt)
            _infra_retry_notice(f"hash {path}", attempt, e, delay)
            attempt += 1
            time.sleep(delay)


def _md_code(value: object) -> str:
    """Render a value safely as inline Markdown code."""
    return "`" + str(value).replace("`", "\\`") + "`"


def write_pass_report(
    path: Path,
    *,
    signature: dict,
    args: argparse.Namespace,
    anchor_jdn: int,
    session_id: str,
    started_utc: str,
    finished_utc: str,
    start_batch: int,
    tested_at_start: int,
    completed_at_start: int,
    tested_total: int,
    completed_total: int,
    session_recoveries: int,
    total_seconds: float,
    log_path: Path,
    log_sha256: str,
) -> None:
    """Write a human-readable, upload-ready PASS evidence report."""
    requested = "unbounded" if args.batches == 0 else str(args.batches)
    session_tested = tested_total - tested_at_start
    session_batches = completed_total - completed_at_start
    repo_url = f"https://github.com/{signature['repo']}"
    commit_url = f"{repo_url}/commit/{signature['commit']}"
    production_url = f"{repo_url}/blob/{signature['commit']}/{signature['path']}"

    lines = [
        "# Pastafari Calendar Soak Verification Evidence",
        "",
        "**Status: PASS**",
        "",
        "This report was generated automatically by the standalone independent-Oracle "
        "soak verifier after the requested finite run completed without any "
        "Oracle-versus-production mismatch.",
        "",
        "## Production snapshot",
        "",
        f"- Repository: [{signature['repo']}]({repo_url})",
        f"- Branch resolved at start: {_md_code(signature['branch'])}",
        f"- Commit: [{signature['commit']}]({commit_url})",
        f"- Production file: [{signature['path']}]({production_url})",
        f"- Production SHA-256: {_md_code(signature['fastSha256'])}",
        f"- Production Git blob SHA-1: {_md_code(signature['fastGitBlobSha1'])}",
        "",
        "## Verifier identity",
        "",
        f"- Verifier version: {_md_code(SCRIPT_VERSION)}",
        f"- Verifier SHA-256: {_md_code(signature['scriptSha256'])}",
        "- Oracle: independent Python implementation embedded in this one-file verifier; "
        "it does not import project code, checkpoints, local verification files, or golden vectors.",
        "",
        "## Run parameters",
        "",
        f"- Session ID: {_md_code(session_id)}",
        f"- Seed: {_md_code(args.seed)} ({_md_code(f'0x{args.seed & MASK64:016x}')})",
        f"- Anchor JDN: {_md_code(anchor_jdn)}",
        f"- Near sampling window: ±{args.near_years} years (95% of random calculation days)",
        f"- Far sampling window: ±{args.far_years} years (5% of random calculation days)",
        f"- Requested batch endpoint: {_md_code(requested)}",
        f"- Neighbor probe cadence: every {args.neighbor_every} batches"
          if args.neighbor_every else "- Neighbor probes: disabled",
        f"- Oracle gate workers: {args.oracle_workers}",
        "",
        "## Result",
        "",
        f"- Cumulative completed batches: **{completed_total:,}**",
        f"- Cumulative Oracle-vs-production comparisons: **{tested_total:,}**",
        "- Mismatches: **0**",
        f"- Batches completed in this process invocation: {session_batches:,}",
        f"- Comparisons completed in this process invocation: {session_tested:,}",
        f"- Infrastructure recoveries in this process invocation: {session_recoveries:,}",
        f"- Process elapsed time: {total_seconds:,.3f} seconds",
        f"- Session started UTC: {_md_code(started_utc)}",
        f"- Session finished UTC: {_md_code(finished_utc)}",
        "",
        "A mismatch is a hard failure and stops the verifier on the first exact "
        "counterexample. Transient infrastructure failures are retried/recovered "
        "and are not counted as successful comparisons.",
        "",
        "## Raw evidence",
        "",
        f"- JSONL log file: {_md_code(log_path.name)}",
        f"- Final JSONL SHA-256: {_md_code(log_sha256)}",
        f"- Logical run resumed at batch: {start_batch}",
        f"- Comparisons already completed before this process invocation: {tested_at_start:,}",
        "",
        "The final JSONL record is a `run-pass` record binding the PASS result to "
        "the production commit, production SHA-256, verifier SHA-256, seed, "
        "cumulative counts, and session identifier. The SHA-256 above is computed "
        "after that final record is appended.",
        "",
    ]
    _atomic_write_text(path, "\n".join(lines))


def _read_text_resilient(path: Path, *, label: str) -> str:
    attempt = 0
    while True:
        try:
            return path.read_text(encoding='utf-8')
        except OSError as e:
            delay = _retry_delay(attempt)
            _infra_retry_notice(label, attempt, e, delay)
            attempt += 1
            time.sleep(delay)


def default_anchor_jdn() -> int:
    d = _dt.date.today()
    return gregorian_to_jdn(d.year, d.month, d.day)


def human_rate(n: int, seconds: float) -> str:
    return "∞" if seconds <= 0 else f"{n / seconds:,.1f}/s"


def build_replay_command(args: argparse.Namespace, batch: int, anchor_jdn: int, target: str | None = None) -> str:
    pieces = [
        Path(sys.argv[0]).name,
        "--seed", str(args.seed),
        "--anchor-jdn", str(anchor_jdn),
        "--near-years", str(args.near_years),
        "--far-years", str(args.far_years),
        "--extra-targets", str(args.extra_targets),
        "--neighbor-every", str(args.neighbor_every),
        "--oracle-workers", str(args.oracle_workers),
        "--replay-batch", str(batch),
        "--no-resume",
    ]
    if target is not None:
        pieces += ["--replay-target-jdn", str(target)]
    return "python " + " ".join(pieces)


def _resume_script_compatible(old: dict, signature: dict) -> bool:
    current = (
        old.get("scriptVersion") == SCRIPT_VERSION
        and old.get("scriptSha256") == signature.get("scriptSha256")
    )
    legacy = (old.get("scriptVersion"), old.get("scriptSha256")) in LEGACY_RESUME_COMPAT
    return current or legacy


def _resume_common_compatible(old: dict, signature: dict, args: argparse.Namespace, *, anchor_jdn: int | None) -> bool:
    if not _resume_script_compatible(old, signature):
        return False
    stable = (
        old.get("repo") == signature.get("repo")
        and old.get("commit") == signature.get("commit")
        and old.get("fastSha256") == signature.get("fastSha256")
        and old.get("seed") == args.seed
        and old.get("nearYears") == args.near_years
        and old.get("farYears") == args.far_years
        and old.get("extraTargets") == args.extra_targets
        and old.get("neighborEvery") == args.neighbor_every
        and old.get("oracleWorkers") == args.oracle_workers
    )
    if anchor_jdn is not None:
        stable = stable and old.get("anchorJdn") == anchor_jdn
    return stable


def choose_anchor_jdn(args: argparse.Namespace, resume_path: Path, signature: dict) -> int:
    if args.anchor_jdn is not None:
        return args.anchor_jdn
    if not args.no_resume and args.replay_batch is None and resume_path.exists():
        try:
            old = json.loads(_read_text_resilient(resume_path, label=f"read resume {resume_path}"))
            if _resume_common_compatible(old, signature, args, anchor_jdn=None) and isinstance(old.get("anchorJdn"), int):
                if old.get("scriptVersion") != SCRIPT_VERSION:
                    print(
                        f"Accepting exact legacy {old.get('scriptVersion')} resume across infrastructure-only 1.2.0 upgrade.",
                        flush=True,
                    )
                print(f"Reusing anchorJdn={old['anchorJdn']} from valid resume state.", flush=True)
                return int(old["anchorJdn"])
        except Exception:
            pass
    return default_anchor_jdn()


def load_resume(path: Path, signature: dict, args: argparse.Namespace, anchor_jdn: int) -> tuple[int, int, int]:
    if args.no_resume or args.replay_batch is not None or not path.exists():
        return 0, 0, 0
    try:
        old = json.loads(_read_text_resilient(path, label=f"read resume {path}"))
    except Exception as e:
        print(f"Resume file unreadable; starting fresh: {e}", file=sys.stderr)
        return 0, 0, 0
    if _resume_common_compatible(old, signature, args, anchor_jdn=anchor_jdn):
        if old.get("scriptVersion") != SCRIPT_VERSION:
            print(
                f"Continuing exact legacy {old.get('scriptVersion')} resume at nextBatch={old.get('nextBatch', 0)}; "
                "only infrastructure resilience changed.",
                flush=True,
            )
        return int(old.get("nextBatch", 0)), int(old.get("tested", 0)), int(old.get("batchesCompleted", 0))

    required = {
        "repo": signature["repo"],
        "commit": signature["commit"],
        "fastSha256": signature["fastSha256"],
        "seed": args.seed,
        "anchorJdn": anchor_jdn,
        "nearYears": args.near_years,
        "farYears": args.far_years,
        "extraTargets": args.extra_targets,
        "neighborEvery": args.neighbor_every,
        "oracleWorkers": args.oracle_workers,
    }
    mismatch = {k: (old.get(k), v) for k, v in required.items() if old.get(k) != v}
    if not _resume_script_compatible(old, signature):
        mismatch["scriptIdentity"] = (
            (old.get("scriptVersion"), old.get("scriptSha256")),
            (SCRIPT_VERSION, signature["scriptSha256"]),
        )
    print("Resume invalidated because the production snapshot or run parameters changed:", file=sys.stderr)
    for k, (was, now) in mismatch.items():
        print(f"  {k}: {was!r} -> {now!r}", file=sys.stderr)
    return 0, 0, 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Standalone independent-oracle soak against production fetched from GitHub.")
    ap.add_argument("--repo", default=DEFAULT_REPO, help="GitHub OWNER/REPO")
    ap.add_argument("--branch", default=None, help="Branch to resolve; default: repository default branch")
    ap.add_argument("--seed", type=lambda x: int(x, 0), default=0x534F414B5F535441, help="Explicit integer seed")
    ap.add_argument("--batches", type=int, default=240, help="Number of batches; 0 means run indefinitely")
    ap.add_argument("--anchor-jdn", type=int, default=None, help="Signed JDN anchor; default: local Gregorian today")
    ap.add_argument("--near-years", type=int, default=1000, help="95%% of random calculation days lie within this many years of anchor")
    ap.add_argument("--far-years", type=int, default=10000, help="5%% lie within this many years of anchor")
    ap.add_argument("--extra-targets", type=int, default=2, help="Random positions inside a periodically tested adjacent year")
    ap.add_argument("--neighbor-every", type=int, default=50, help="Probe one adjacent year every N batches; 0 disables")
    ap.add_argument("--sleep", type=float, default=0.10, help="Seconds to yield between batches")
    ap.add_argument("--node-timeout", type=int, default=900, help="Per Node invocation timeout seconds")
    ap.add_argument("--oracle-workers", type=int, default=min(4, max(1, (os.cpu_count() or 2) // 2)),
                    help="Processes for independent gate-gap generation; default: half logical CPUs, max 4")
    ap.add_argument("--resume-file", default="pastafari-soak-resume.json")
    ap.add_argument("--log-file", default="pastafari-soak-log.jsonl")
    ap.add_argument("--failure-file", default="pastafari-soak-failure.json")
    ap.add_argument("--report-file", default="pastafari-soak-report.md",
                    help="Markdown PASS evidence report written after a finite successful run")
    ap.add_argument("--no-resume", action="store_true")
    ap.add_argument("--replay-batch", type=int, default=None)
    ap.add_argument("--replay-target-jdn", type=int, default=None)
    ap.add_argument("--expect-commit", default=None, help="Abort unless GitHub resolves to this exact commit SHA")
    ap.add_argument("--expect-fast-sha256", default=None, help="Abort unless downloaded production JS has this SHA-256")
    args = ap.parse_args()

    if sys.version_info < (3, 10):
        raise RuntimeError("Python 3.10 or newer is required")
    if args.batches < 0 or args.near_years < 0 or args.far_years < 0 or args.extra_targets < 0 or args.neighbor_every < 0 or args.oracle_workers < 1:
        ap.error("batch/range/count arguments must be non-negative")

    print(f"{SCRIPT_VERSION}", flush=True)
    print(f"Resolving production implementation from GitHub: {args.repo}", flush=True)
    snap = fetch_github_snapshot(args.repo, args.branch)
    if args.expect_commit and snap["commit"].lower() != args.expect_commit.lower():
        raise RuntimeError(f"GitHub commit is {snap['commit']}, expected {args.expect_commit}")
    if args.expect_fast_sha256 and snap["fastSha256"].lower() != args.expect_fast_sha256.lower():
        raise RuntimeError(f"fast SHA-256 is {snap['fastSha256']}, expected {args.expect_fast_sha256}")
    print(f"GitHub branch: {snap['branch']}", flush=True)
    print(f"GitHub commit: {snap['commit']}", flush=True)
    print(f"Production path: {snap['path']}", flush=True)
    print(f"Production SHA-256: {snap['fastSha256']}", flush=True)
    print(f"Production Git blob SHA-1: {snap['fastGitBlobSha1']}", flush=True)

    resume_path = Path(args.resume_file).resolve()
    log_path = Path(args.log_file).resolve()
    failure_path = Path(args.failure_file).resolve()
    report_path = Path(args.report_file).resolve()
    signature = {k: snap[k] for k in ("repo", "branch", "commit", "path", "fastSha256", "fastGitBlobSha1")}
    signature["scriptSha256"] = _script_sha256()
    anchor_jdn = choose_anchor_jdn(args, resume_path, signature)
    near_days = int(round(args.near_years * 365.2425))
    far_days = int(round(args.far_years * 365.2425))
    start_batch, tested_total, completed_total = load_resume(resume_path, signature, args, anchor_jdn)
    tested_at_start = tested_total
    completed_at_start = completed_total
    session_started_utc = _dt.datetime.now(_dt.timezone.utc).isoformat()
    session_id = (
        session_started_utc.replace(":", "").replace("+", "_")
        + f"-pid{os.getpid()}-b{start_batch}"
    )

    if args.replay_batch is not None:
        indices: Iterable[int] = [args.replay_batch]
    elif args.batches == 0:
        def _forever(start: int):
            i = start
            while True:
                yield i
                i += 1
        indices = _forever(start_batch)
    else:
        indices = range(start_batch, args.batches)

    print(
        f"Seed={args.seed} (0x{args.seed & MASK64:016x}); anchorJdn={anchor_jdn}; "
        f"near=±{args.near_years}y; far=±{args.far_years}y; startBatch={start_batch}",
        flush=True,
    )
    print(f"Replay template: {build_replay_command(args, start_batch, anchor_jdn)}", flush=True)

    print(f"Independent Oracle gate workers: {args.oracle_workers}", flush=True)
    oracle = OracleCalendar(gate_workers=args.oracle_workers)
    atexit.register(oracle.gates.close)
    overall_start = time.perf_counter()
    runtime = ProductionRuntime(snap["fastBytes"], snap["fastSha256"])
    print(f"Persistent production runtime: {runtime.root}", flush=True)
    meta = run_node(runtime, {"op": "meta"}, timeout=60)
    print("Production module metadata: " + json.dumps(meta, ensure_ascii=False), flush=True)

    if args.replay_batch is None:
        run_start_record = {
            "type": "run-start", "scriptVersion": SCRIPT_VERSION, **signature,
            "sessionId": session_id,
            "seed": args.seed, "anchorJdn": anchor_jdn,
            "nearYears": args.near_years, "farYears": args.far_years,
            "extraTargets": args.extra_targets, "neighborEvery": args.neighbor_every,
            "oracleWorkers": args.oracle_workers,
            "requestedBatches": args.batches,
            "startBatch": start_batch,
            "testedAtStart": tested_at_start,
            "batchesCompletedAtStart": completed_at_start,
            "utc": session_started_utc,
        }
        append_jsonl(log_path, run_start_record)
        print(json.dumps(run_start_record, ensure_ascii=False), flush=True)

    try:
        for batch in indices:
            batch_start = time.perf_counter()
            infra_before = runtime.recovery_count
            c, sample_class = calculation_for(args.seed, batch, anchor_jdn, near_days, far_days)
            print(f"[batch {batch}] calculationJdn={c} class={sample_class}: locating Year 5000...", flush=True)
            y = oracle.year_5000(c)
            print(f"[batch {batch}] Year 5000 = {y.start_jdn}..{y.end_jdn} ({y.length} days).", flush=True)

            if args.replay_target_jdn is not None:
                targets = [args.replay_target_jdn]
                expected = [plain_date(oracle.convert_jdn(targets[0], c))]
                actual = run_node(runtime, {
                    "op": "cases",
                    "cases": [{"calculationJdn": str(c), "targetJdn": str(targets[0])}],
                }, timeout=args.node_timeout)
                failures = compare_rows(expected, actual, c=c, start_jdn=None, targets=targets, batch=batch)
                batch_tested = 1
            else:
                print(f"[batch {batch}] building independent Oracle year structure...", flush=True)
                expected_year = oracle_year_rows(oracle, c, y)
                print(f"[batch {batch}] running GitHub fast engine across all {y.length} days...", flush=True)
                actual_year = run_node(runtime, {
                    "op": "range",
                    "calculationJdn": str(c),
                    "startJdn": str(y.start_jdn),
                    "count": y.length,
                }, timeout=max(args.node_timeout, y.length // 10))
                failures = compare_rows(expected_year, actual_year, c=c, start_jdn=y.start_jdn, targets=None, batch=batch)
                batch_tested = y.length

                do_neighbor = (
                    not failures
                    and args.neighbor_every > 0
                    and (batch + 1) % args.neighbor_every == 0
                )
                if do_neighbor:
                    print(f"[batch {batch}] exhaustive year agrees; periodic adjacent-year probe...", flush=True)
                    side, targets = neighbor_targets(oracle, args.seed, batch, c, y, args.extra_targets)
                    print(f"[batch {batch}] building {side} adjacent-year structure for {len(targets)} probes...", flush=True)
                    cases = [{"calculationJdn": str(c), "targetJdn": str(t)} for t in targets]
                    expected_extra = [plain_date(oracle.convert_jdn(t, c)) for t in targets]
                    actual_extra = run_node(runtime, {"op": "cases", "cases": cases},
                                            timeout=max(args.node_timeout, len(cases) * 5))
                    failures = compare_rows(expected_extra, actual_extra, c=c, start_jdn=None, targets=targets, batch=batch)
                    batch_tested += len(targets)

            elapsed = time.perf_counter() - batch_start
            tested_total += batch_tested
            completed_total += 1
            record = {
                "type": "batch", "scriptVersion": SCRIPT_VERSION, **signature,
                "sessionId": session_id,
                "seed": args.seed, "anchorJdn": anchor_jdn, "batch": batch,
                "sampleClass": sample_class, "calculationJdn": str(c),
                "year5000": {"startJdn": str(y.start_jdn), "endJdn": str(y.end_jdn), "length": y.length},
                "testedBatch": batch_tested, "testedTotal": tested_total,
                "failures": len(failures),
                "infrastructureRecoveries": runtime.recovery_count - infra_before,
                "seconds": round(elapsed, 3),
                "rate": human_rate(batch_tested, elapsed),
                "utc": _dt.datetime.now(_dt.timezone.utc).isoformat(),
            }
            append_jsonl(log_path, record)
            print(json.dumps(record, ensure_ascii=False), flush=True)

            if failures:
                first = failures[0]
                replay_target = first.get("targetJdn")
                failure_record = {
                    "type": "failure", "scriptVersion": SCRIPT_VERSION, **signature,
                    "sessionId": session_id,
                    "seed": args.seed, "anchorJdn": anchor_jdn, "batch": batch,
                    "sampleClass": sample_class, "failure": first,
                    "replay": build_replay_command(args, batch, anchor_jdn, replay_target),
                    "utc": _dt.datetime.now(_dt.timezone.utc).isoformat(),
                }
                atomic_write_json(failure_path, failure_record)
                append_jsonl(log_path, failure_record)
                print("\nMISMATCH FOUND. Soak stopped on first exact counterexample.", file=sys.stderr)
                print(json.dumps(failure_record, ensure_ascii=False, indent=2), file=sys.stderr)
                return 1

            if args.replay_batch is not None:
                print("REPLAY PASS", flush=True)
                return 0

            if not args.no_resume:
                atomic_write_json(resume_path, {
                    "schema": 1, "scriptVersion": SCRIPT_VERSION, **signature,
                    "seed": args.seed, "anchorJdn": anchor_jdn,
                    "nearYears": args.near_years, "farYears": args.far_years,
                    "extraTargets": args.extra_targets, "neighborEvery": args.neighbor_every,
                    "oracleWorkers": args.oracle_workers, "nextBatch": batch + 1,
                    "tested": tested_total, "batchesCompleted": completed_total,
                    "updatedAtUtc": _dt.datetime.now(_dt.timezone.utc).isoformat(),
                })
            if args.sleep > 0:
                time.sleep(args.sleep)
    except KeyboardInterrupt:
        print("\nInterrupted by user. Last completed batch is safely recorded in the resume file.", file=sys.stderr)
        return 130

    total_seconds = time.perf_counter() - overall_start
    finished_utc = _dt.datetime.now(_dt.timezone.utc).isoformat()
    session_recoveries = runtime.recovery_count

    # A finite successful run gets a terminal machine-readable PASS record.
    # For --batches 0 this point is normally unreachable except via external
    # termination, so no false PASS can be written for an intentionally
    # unbounded run.
    run_pass_record = {
        "type": "run-pass", "scriptVersion": SCRIPT_VERSION, **signature,
        "sessionId": session_id,
        "seed": args.seed, "anchorJdn": anchor_jdn,
        "nearYears": args.near_years, "farYears": args.far_years,
        "extraTargets": args.extra_targets, "neighborEvery": args.neighbor_every,
        "oracleWorkers": args.oracle_workers,
        "requestedBatches": args.batches,
        "startBatch": start_batch,
        "batchesCompleted": completed_total,
        "testedTotal": tested_total,
        "mismatches": 0,
        "infrastructureRecoveriesThisSession": session_recoveries,
        "sessionComparisons": tested_total - tested_at_start,
        "sessionBatches": completed_total - completed_at_start,
        "secondsThisSession": round(total_seconds, 3),
        "startedUtc": session_started_utc,
        "finishedUtc": finished_utc,
    }
    append_jsonl(log_path, run_pass_record)
    log_sha256 = sha256_file_resilient(log_path)

    write_pass_report(
        report_path,
        signature=signature,
        args=args,
        anchor_jdn=anchor_jdn,
        session_id=session_id,
        started_utc=session_started_utc,
        finished_utc=finished_utc,
        start_batch=start_batch,
        tested_at_start=tested_at_start,
        completed_at_start=completed_at_start,
        tested_total=tested_total,
        completed_total=completed_total,
        session_recoveries=session_recoveries,
        total_seconds=total_seconds,
        log_path=log_path,
        log_sha256=log_sha256,
    )

    print(json.dumps(run_pass_record, ensure_ascii=False), flush=True)
    print(
        f"SOAK PASS: {tested_total:,} comparisons, {completed_total:,} batches, "
        f"{total_seconds:,.1f}s, production={snap['commit'][:12]} sha256={snap['fastSha256']}",
        flush=True,
    )
    print(f"PASS evidence report: {report_path}", flush=True)
    print(f"Final JSONL SHA-256: {log_sha256}", flush=True)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except SystemExit:
        raise
    except Exception as exc:
        print("FATAL: " + str(exc), file=sys.stderr)
        traceback.print_exc()
        raise SystemExit(2)
