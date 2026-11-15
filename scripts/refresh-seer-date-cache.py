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
import hashlib
import re
import subprocess
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



def file_digest(filename):
    value = hashlib.sha256()
    with filename.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            value.update(chunk)
    return value.hexdigest()


def read_manifest(filename):
    raw = filename.read_text(encoding="utf-8")
    if not raw.endswith("\n") or "\r" in raw:
        raise ValueError(f"Invalid manifest line endings: {filename}")
    entries = []
    seen = set()
    for line in raw.splitlines():
        match = re.fullmatch(r"([0-9a-f]{64})  \./(.+)", line)
        if not match:
            raise ValueError(f"Malformed checksum entry in {filename}")
        digest, rel = match.groups()
        if rel in seen:
            raise ValueError(f"Duplicate manifest path: {rel}")
        if "\\" in rel or any(part in ("", ".", "..") for part in rel.split("/")):
            raise ValueError(f"Unsafe manifest path: {rel}")
        seen.add(rel)
        entries.append((rel, digest))
    if [rel for rel, _ in entries] != sorted(seen, key=lambda s: s.encode("utf-8")):
        raise ValueError(f"Unsorted manifest: {filename}")
    return entries


def tracked_paths(root):
    raw = subprocess.check_output(["git", "-C", str(root), "ls-files", "-z"], timeout=30)
    return {v.decode("utf-8") for v in raw.split(b"\0") if v}


def existing_file(root, rel):
    candidate = (root / rel).resolve()
    if not candidate.is_relative_to(root.resolve()) or not candidate.is_file():
        raise ValueError(f"Missing/unsafe checksum path: {rel}")
    return candidate


def reconcile_seer_manifest_chain(root):
    """Fail closed on unrelated hash drift; update only Seer and nested manifest hashes.

    All three files are published as one Git commit, never as separate pushes.
    """
    root = root.resolve()
    docs = root / "docs"
    docs_file = docs / "SHA256SUMS.txt"
    root_file = root / "SHA256SUMS.txt"
    docs_entries = read_manifest(docs_file)
    root_entries = read_manifest(root_file)
    doc_hashes = dict(docs_entries)
    root_hashes = dict(root_entries)
    allowed = {"docs/api/seer-now.json", "docs/SHA256SUMS.txt"}
    if "api/seer-now.json" not in doc_hashes or not allowed.issubset(root_hashes):
        raise ValueError("Missing required Seer checksum entries")
    if doc_hashes["api/seer-now.json"] != root_hashes["docs/api/seer-now.json"]:
        raise ValueError("Seer checksum entries disagree")
    if root_hashes["docs/SHA256SUMS.txt"] != file_digest(docs_file):
        raise ValueError("Existing nested manifest checksum mismatch")

    tracked = tracked_paths(root)
    root_expected = tracked - {"SHA256SUMS.txt"}
    docs_expected = {rel[5:] for rel in tracked
                     if rel.startswith("docs/") and rel != "docs/SHA256SUMS.txt"}
    if set(root_hashes) != root_expected or set(doc_hashes) != docs_expected:
        raise ValueError("Checksum manifest tracked-file coverage mismatch")
    for rel, expected in docs_entries:
        if rel != "api/seer-now.json" and file_digest(existing_file(docs, rel)) != expected:
            raise ValueError(f"Unrelated docs checksum drift: {rel}")
    for rel, expected in root_entries:
        if rel not in allowed and file_digest(existing_file(root, rel)) != expected:
            raise ValueError(f"Unrelated root checksum drift: {rel}")

    seer_hash = file_digest(existing_file(docs, "api/seer-now.json"))
    new_docs = "".join(
        f"{seer_hash if rel == 'api/seer-now.json' else expected}  ./{rel}\n"
        for rel, expected in docs_entries
    )
    next_digests = {
        "docs/api/seer-now.json": seer_hash,
        "docs/SHA256SUMS.txt": hashlib.sha256(new_docs.encode("utf-8")).hexdigest(),
    }
    new_root = "".join(
        f"{next_digests.get(rel, expected)}  ./{rel}\n"
        for rel, expected in root_entries
    )
    if file_digest(existing_file(docs, "api/seer-now.json")) != seer_hash:
        raise RuntimeError("Seer JSON changed during checksum verification")
    if new_docs == docs_file.read_text(encoding="utf-8") and \
            new_root == root_file.read_text(encoding="utf-8"):
        return False
    for dest, data in ((docs_file, new_docs), (root_file, new_root)):
        temporary = dest.with_name(dest.name + ".tmp")
        try:
            temporary.write_text(data, encoding="utf-8", newline="\n")
            os.replace(temporary, dest)
        finally:
            temporary.unlink(missing_ok=True)
    print("MANIFESTS_UPDATED: seer / nested docs / root", flush=True)
    return True

def main():
    fresh = fetch_seer()
    key = date_key(fresh)
    if OUTPUT.exists():
        try:
            old = json.loads(OUTPUT.read_text(encoding="utf-8"))
            if old.get("cacheMeta", {}).get("mode") == "automated-seer-snapshot":
                old_key = date_key(old)
                if old_key == key:
                    print("UNCHANGED_DATE: skip write and skip commit", flush=True)
                    return
                previous_at = dt.datetime.fromisoformat(old["calculationAt"].replace("Z", "+00:00"))
                incoming_at = dt.datetime.fromisoformat(fresh["calculationAt"].replace("Z", "+00:00"))
                if previous_at.tzinfo is None or incoming_at.tzinfo is None:
                    raise RuntimeError("Cannot compare unzoned Seer snapshots")
                if incoming_at <= previous_at:
                    raise RuntimeError("Refusing to replace newer Seer snapshot with older data")
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
    reconcile_seer_manifest_chain(Path.cwd())
    print("UPDATED_DATE:", OUTPUT, flush=True)


if __name__ == "__main__":
    main()
