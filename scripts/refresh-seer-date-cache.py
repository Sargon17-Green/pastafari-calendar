#!/usr/bin/env python3
"""Refresh the GitHub cache from Seer only when the canonical date changes.

Seer is the source of the computed date: this program does not implement,
approximate, or adjust the Pastafarian calendar algorithm.
"""
from __future__ import annotations

import datetime as dt
import json
import os
from pathlib import Path
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

URL = "https://seer-hosting-eval-render.onrender.com/v1/now?presentation=canonical&observer=kisurra"
OUTPUT = Path("docs/api/seer-now.json")


def positive_integer(value, field):
    if isinstance(value, bool) or not isinstance(value, (int, str)):
        raise ValueError(f"{field} is not an integer")
    number = str(value)
    if not number.isascii() or not number.isdecimal() or int(number) < 1:
        raise ValueError(f"{field} is not a positive integer")
    return int(number)


def date_key(data):
    past = data["pastafarianDate"]
    return (
        positive_integer(data["calculationDay"]["jdn"], "calculationDay.jdn"),
        positive_integer(data["targetDay"]["jdn"], "targetDay.jdn"),
        positive_integer(past["year"], "pastafarianDate.year"),
        positive_integer(past["cutlet"]["canonicalIndex"], "cutlet.canonicalIndex"),
        positive_integer(past["cutlet"]["day"], "cutlet.day"),
        positive_integer(past["month"]["canonicalIndex"], "month.canonicalIndex"),
        positive_integer(past["month"]["day"], "month.day"),
    )


def validate(data):
    if not isinstance(data, dict):
        raise ValueError("Expected a JSON object")
    if data.get("cacheMeta", {}).get("mode") == "connectivity-test":
        raise ValueError("Seer unexpectedly served the old connectivity test")
    stamp = data.get("calculationAt")
    if not isinstance(stamp, str):
        raise ValueError("Missing calculationAt")
    at = dt.datetime.fromisoformat(stamp.replace("Z", "+00:00"))
    if at.tzinfo is None:
        raise ValueError("Missing timezone in calculationAt")
    age = dt.datetime.now(dt.timezone.utc) - at
    if not (-dt.timedelta(minutes=5) <= age <= dt.timedelta(minutes=20)):
        raise ValueError(f"Noncurrent Seer result: age={age}")
    values = date_key(data)
    if values[0] != values[1]:
        raise ValueError("Seer /now returned different calculation and target days")
    utc_jdn = 2440588 + (dt.datetime.now(dt.timezone.utc).date() - dt.date(1970, 1, 1)).days
    if abs(values[1] - utc_jdn) > 1:
        raise ValueError("Seer current JDN is far from the current Gregorian day")
    if abs(float(data["observer"]["longitude"]) - 45.481) > 0.01:
        raise ValueError("Seer returned the wrong observer")
    if values[3] > 17 or values[5] > 47 or values[4] > 5778 or values[6] > 123:
        raise ValueError("Seer date outside display limits")
    return values


def fetch_seer():
    errors = []
    for attempt in range(1, 5):
        try:
            print(f"Seer fetch {attempt}/4", flush=True)
            request = Request(URL, headers={
                "Accept": "application/json",
                "Cache-Control": "no-cache",
                "User-Agent": "pastafari-date-cache-refresh/1.0",
            })
            with urlopen(request, timeout=55) as response:
                raw = response.read(512 * 1024 + 1)
                if response.status != 200:
                    raise ValueError(f"HTTP {response.status}")
                if len(raw) > 512 * 1024:
                    raise ValueError("Seer response too large")
            body = raw.decode("utf-8-sig")
            if body.lstrip().lower().startswith(("<html", "<!doctype")):
                raise ValueError("Seer returned HTML, not JSON")
            data = json.loads(body)
            print("Seer response validated:", validate(data), flush=True)
            return data
        except (ValueError, UnicodeError, HTTPError, URLError, TimeoutError, OSError, KeyError, TypeError) as e:
            errors.append(f"attempt {attempt}: {type(e).__name__}: {e}")
            print(errors[-1], file=sys.stderr, flush=True)
            if attempt < 4:
                time.sleep(5 * attempt)
    raise RuntimeError("All Seer attempts failed; old JSON left unchanged:\n" + "\n".join(errors))


def main():
    fresh = fetch_seer()
    key = date_key(fresh)
    if OUTPUT.exists():
        try:
            old = json.loads(OUTPUT.read_text(encoding="utf-8"))
            if (old.get("cacheMeta", {}).get("mode") == "automated-seer-snapshot"
                    and date_key(old) == key):
                print("UNCHANGED_DATE: skip write and skip commit", flush=True)
                return
        except (OSError, ValueError, KeyError, TypeError) as e:
            print("Replacing invalid previous cache:", e, flush=True)
    fresh["cacheMeta"] = {
        "mode": "automated-seer-snapshot",
        "source": "Seer /v1/now?presentation=canonical&observer=kisurra",
        "fetchedAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
        "maxSnapshotAgeHours": 26,
        "note": "Periodic Seer snapshot; not a live request from the reader's browser.",
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temp = OUTPUT.with_suffix(".json.tmp")
    temp.write_text(json.dumps(fresh, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    os.replace(temp, OUTPUT)
    print("UPDATED_DATE:", OUTPUT, flush=True)


if __name__ == "__main__":
    main()
