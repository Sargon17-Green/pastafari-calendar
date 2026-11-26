#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PASTAFARI SELF-DATE DIFFERENTIAL TESTBENCH (ONE PYTHON FILE) - V5

Compare:
  A. The JS API used by watch_government_legislation_memos.py:
     getPastafariDateAsync(date, date), bwtbdyqtmsprytgydym-cpu/pastafari-calendar
     (GitHub redirects that repository to Sargon17-Green/pastafari-calendar).
  B. Sargon17-Green/Pastafarian-Calendar, Celeritas-per-Sepulcra,
     via the actual C++ calendarDateSpaghetti(c,t), with c == t.

All 365 days of Gregorian 2026, plus 10,000 unique random days within
+/-50,000 proleptic Gregorian calendar years from 2026 (excluding 2026).
The full conditioned Pastafari year is also compared, where available:
  - JS: getCutletView for the same calculation date, from the production
    fast engine (distinct provenance from the public authoritative-first API);
  - C++: BaseMonsterManager::executeFinalIntegrationStage56 returns the same
    year's structure. Its five-field result is checked against production
    calendarDateSpaghetti before the year rows are accepted.

Source files are pinned to public commit SHAs. The Python file writes temporary
Node.js/C++ adapters itself, downloads the checked-out source files, compiles
C++ locally, maintains persistent subprocesses with per-case watchdogs,
and emits resumable, source-pinned evidence. No third-party Python packages.

Prerequisites: Python >= 3.10, Node.js >= 20, C++17 compiler (g++/clang++) internet to GitHub and (only if Boost is absent) to MSYS2 mirrors.
Boost headers are auto-vendored in a short user Temp cache on Windows,
without pacman, modifying global PATH, or system installation changes.

Run (no arguments runs ALL 10,365 dates and full-year comparisons):
    python pastafari_self_date_differential_v5.py

Optional:
    python pastafari_self_date_differential_v5.py --max-cases 3
    python pastafari_self_date_differential_v5.py --output MY_RESULTS --resume
    python pastafari_self_date_differential_v5.py --latest --output LATEST_RESULTS
    python pastafari_self_date_differential_v5.py --year off
    python pastafari_self_date_differential_v5.py --case-timeout 900
    python pastafari_self_date_differential_v5.py --case-id 003211 --resume

Notes:
- Agreement between implementations is not proof of normative correctness.
- Far-year dates use the proleptic Gregorian calendar with astronomical year 0.
- There is no Venus-boundary ambiguity: both inputs are explicit civil dates.
- Whole-year rows use the single fixed calculation day c=t_of_anchor. They are
  NOT additional 'self-date' calculations of each individual day in that year.
- No result is marked PASS until both engine responses and all requested
  year rows are received and compared. Errors/timeouts are separately counted.
"""
from __future__ import annotations

import argparse
import collections
import csv
import hashlib
import json
import os
from pathlib import Path
import queue
import platform
import random
import re
import shutil
import signal
import subprocess
import sys
import tempfile
import threading
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request

JS_REPO = "Sargon17-Green/pastafari-calendar"  # redirect target of bot's old owner
CPP_REPO = "Sargon17-Green/Pastafarian-Calendar"
JS_SHA = "642cd881e59cfd7cafcb96e8ad30562916776cba"
CPP_SHA = "32ad50c8177233adc87eed1721c1e6f34f24ced1"
CPP_BRANCH = "Celeritas-per-Sepulcra"
JDN_ENGINE_OFFSET = 1721425
SEED_DEFAULT = 20261105
NUMBER_RANDOM = 10000
FIELDS = ("year", "cutlet_index", "day_in_cutlet", "month_index", "day_in_month")


# Exact dependency closure manually verified against the JS_SHA repository tree.
# No import scanning, GitHub directory search, or source discovery at runtime.
# Paths are relative to the repository root, NOT restricted to browser/.
JS_SOURCE_FILES = (
    "browser/pastafari-date.js",
    "browser/pastafari-calendar-fast.js",
    "browser/pastafari-calendar-router.js",
    "browser/pastafari-diagnostics.js",
    "browser/pastafari-engine-client.js",
    "browser/pastafari-calendar-router-core.js",
    "browser/pastafari-authoritative-worker.js",
    "browser/pastafari-fast-worker.js",
    "browser/pastafari-calendar-core.js",
    "browser/pastafari-calendar-core-chronicle.js",
    "browser/pastafari-calendar-core-1.js",
    "browser/pastafari-calendar-core-2.js",
    "browser/proleptic-negative-year-detour.js",
    "browser/intl-calendar-semantic-firewall.js",
    "browser/gate-data-detour.js",
    "browser/year-ceiling-detour.js",
    "browser/year-ceiling-detour-detour.js",
    "browser/year-ceiling-detour-detour-detour.js",
    "browser/cache-epoch-detour.js",
    "browser/month-weaving-domain-detour.js",
    "browser/short-selection-infeasible-work-detour.js",
    "browser/runtime-patch-ledger.js",
    "browser/generated/pastafari-gate-shadow.js",
    "docs/calendar-converters.js",
    "docs/chinese-calendrica-detour.js",
    "src/chinese-calendrica-detour.js",
)

# Immutable, official MSYS2 UCRT64 DEVELOPMENT HEADERS package, NOT Boost DLLs.
# https://packages.msys2.org/packages/mingw-w64-ucrt-x86_64-boost
BOOST_VERSION = "1.92.0-4"
BOOST_PKG_NAME = f"mingw-w64-ucrt-x86_64-boost-{BOOST_VERSION}-any.pkg.tar.zst"
BOOST_PKG_URL = f"https://mirror.msys2.org/mingw/ucrt64/{BOOST_PKG_NAME}"
BOOST_PKG_SHA256 = "2f9935335e17f9930cba7e93a8db95bf699df2dd1c250cffe6dce89c7ea70154"
BOOST_HEADER_REL = "boost/multiprecision/cpp_int.hpp"
# Critical files must exist after extraction. On traditional Windows installs,
# a path longer than MAX_PATH (260 UTF-16 characters including NUL) can make
# bsdtar silently omit nested files even while returning exit code 0.
BOOST_DEEP_HEADER_REL = "boost/multiprecision/detail/standalone_config.hpp"
BOOST_CACHE_DIRNAME = f"pfboost-{BOOST_PKG_SHA256[:12]}"


# JavaScript probe runs the REAL bot API for the single date. For full-year
# materialization it uses production fast getCutletView, whose provenance is
# separately recorded. No JS calendar arithmetic is reimplemented here.
JS_ADAPTER = r'''import readline from 'node:readline';
import { getPastafariDateAsync } from './browser/pastafari-date.js';
import { getCutletView } from './browser/pastafari-calendar-fast.js';
const cutletNames = __CUTLETS__;
const monthNames = __MONTHS__;
const cutletIndex = new Map(cutletNames.map((n, i) => [n, i + 1]));
const monthIndex = new Map(monthNames.map((n, i) => [n, i + 1]));
const idx = (map, s, label) => {
  const i = map.get(String(s));
  if (!Number.isInteger(i)) throw new Error(`unknown ${label} name: ${String(s)}`);
  return i;
};
const emit = (...values) => process.stdout.write(values.map(String).join('\t') + '\n');
const canonical = (value, jdn) => [
  String(jdn), String(value.year), idx(cutletIndex, value.cutletName, 'cutlet'),
  String(value.dayInCutlet), idx(monthIndex, value.monthName, 'month'),
  String(value.dayInMonth),
];

async function wholeYear(anchor, yearName) {
  const options = { calculationJdn: anchor };
  const startView = getCutletView(anchor, options);
  if (String(startView.year) !== String(yearName)) throw new Error('fast-year mismatch with public date');
  const visited = new Map([[String(startView.startJdn), startView]]);
  let scan = startView;
  for (let guard = 0; guard < 50; ++guard) {
    const p = getCutletView(scan.previousCutletJdn, options);
    if (String(p.year) !== String(yearName)) break;
    const key = String(p.startJdn);
    if (visited.has(key)) throw new Error('cycle in backward cutlet traversal');
    visited.set(key, p);
    scan = p;
    if (guard === 49) throw new Error('cutlet backward traversal limit');
  }
  scan = startView;
  for (let guard = 0; guard < 50; ++guard) {
    const p = getCutletView(scan.nextCutletJdn, options);
    if (String(p.year) !== String(yearName)) break;
    const key = String(p.startJdn);
    if (visited.has(key)) throw new Error('cycle in forward cutlet traversal');
    visited.set(key, p);
    scan = p;
    if (guard === 49) throw new Error('cutlet forward traversal limit');
  }
  const views = [...visited.values()].sort((x, y) => x.startJdn < y.startJdn ? -1 : 1);
  let previous = null;
  let total = 0;
  let selfSeen = false;
  for (const v of views) {
    for (const day of v.days) {
      if (previous !== null && day.jdn !== previous + 1n)
        throw new Error('non-contiguous year days');
      previous = day.jdn;
      if (day.jdn === anchor) selfSeen = true;
      emit('D', ...canonical(day, day.jdn));
      ++total;
    }
  }
  if (!selfSeen || total < 252 || total > 5778)
    throw new Error(`invalid full-year length or target absent: ${total}`);
  return total;
}

// Single-line command: CASE_ID<TAB>ISO<TAB>JDN<TAB>(Y|N).
for await (const line of readline.createInterface({ input: process.stdin, crlfDelay: Infinity })) {
  if (!line.trim()) continue;
  const [id, iso, jdnText, mode] = line.split('\t');
  try {
    const date = await getPastafariDateAsync(iso, iso);
    const anchor = BigInt(jdnText);
    emit('B', ...canonical(date, anchor), date.cutletName, date.monthName);
    let total = 0;
    if (mode === 'Y') total = await wholeYear(anchor, date.year);
    emit('E', id, total);
  } catch (e) {
    emit('X', id, (e && (e.stack || e.message) || String(e)).replace(/[\r\n\t]+/g, ' ').slice(0, 1800));
  }
}
'''

# The C++ adapter invokes BOTH the public accelerated production entrypoint
# and the Stage56 integration API which exposes the already-created structure.
# A mismatch between those two is an ENGINE-INTERNAL ERROR, never a comparator PASS.
CPP_ADAPTER = r'''#include "pastafari/monster.hpp"
#include "pastafari/source_language_catalog.hpp"
#include <algorithm>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>
using pastafari::Integer;
using pastafari::SpaghettiDateFive;

std::size_t ci(const std::string& name) {
  for (auto const& x : pastafari::CUTLET_SOURCE_CATALOG)
    if (name == x.text) return x.canonicalIndex;
  throw std::runtime_error("unrecognized Latin cutlet name: " + name);
}
std::size_t mi(const std::string& name) {
  for (auto const& x : pastafari::MONTH_SOURCE_CATALOG)
    if (name == x.text) return x.canonicalIndex;
  throw std::runtime_error("unrecognized Latin month name: " + name);
}
void emitDate(const char* kind, const Integer& jdn, const SpaghettiDateFive& value) {
  std::cout << kind << '\t' << jdn << '\t' << value.yearNumber << '\t'
    << ci(value.cutletName) << '\t' << value.dayInCutlet << '\t'
    << mi(value.monthName) << '\t' << value.dayInMonth;
  if (kind[0]=='B') std::cout << '\t' << value.cutletName << '\t' << value.monthName;
  std::cout << '\n';
}
void emitYear(const pastafari::Stage54IntegrationReport& report) {
  const auto& y = report.targetYear;
  const auto& s = report.structure;
  const auto first = y.openGateDay + 1;
  const Integer lengthBig = y.closeGateDay - y.openGateDay;
  if (lengthBig < 252 || lengthBig > 5778)
    throw std::runtime_error("C++ year outside required length 252..5778");
  const std::size_t length = lengthBig.convert_to<std::size_t>();
  if (s.monthWeaving.size() != length) throw std::runtime_error("C++ year weave not complete");
  std::vector<int> monthOccurrences(static_cast<std::size_t>(s.monthCount) + 1, 0);
  std::size_t cutletPosition = 0;
  bool selfSeen = false;
  for (std::size_t offset = 0; offset < length; ++offset) {
    const Integer day = first + Integer{offset};
    while (cutletPosition < s.cutlets.size() && day > s.cutlets[cutletPosition].lastDay)
      ++cutletPosition;
    if (cutletPosition >= s.cutlets.size() || day < s.cutlets[cutletPosition].firstDay)
      throw std::runtime_error("non-contiguous C++ cutlet span");
    const int monthId = s.monthWeaving.at(offset);
    if (monthId < 1 || monthId > s.monthCount)
      throw std::runtime_error("invalid C++ internal month id");
    const int monthIndex = s.monthNameIndices.at(static_cast<std::size_t>(monthId-1));
    const int cutletIndex = s.cutlets.at(cutletPosition).canonicalIndex;
    const Integer dayInCutlet = day - s.cutlets.at(cutletPosition).firstDay + 1;
    const int dayInMonth = ++monthOccurrences.at(static_cast<std::size_t>(monthId));
    const Integer jdn = day + Integer{1721425};
    std::cout << "D\t" << jdn << '\t' << y.number << '\t'
      << cutletIndex << '\t' << dayInCutlet << '\t'
      << monthIndex << '\t' << dayInMonth << '\n';
    if (day == report.targetYear.openGateDay + 1) selfSeen = true;
  }
  if (!selfSeen) throw std::runtime_error("C++ year first day missing");
}
int main() {
  std::ios::sync_with_stdio(false);
  std::cin.tie(nullptr);
  std::string line;
  pastafari::BaseMonsterManager manager;
  while (std::getline(std::cin, line)) {
    if (line.empty()) continue;
    std::istringstream stream(line);
    std::string id, iso, jdnText, mode;
    std::getline(stream, id, '\t');
    std::getline(stream, iso, '\t');
    std::getline(stream, jdnText, '\t');
    std::getline(stream, mode, '\t');
    try {
      const Integer jdn{jdnText};
      const Integer engineDay = jdn - Integer{1721425};
      const SpaghettiDateFive production = pastafari::calendarDateSpaghetti(engineDay, engineDay);
      emitDate("B", jdn, production);
      std::size_t count = 0;
      if (mode == "Y") {
        const auto report = manager.executeFinalIntegrationStage56(engineDay, engineDay);
        const auto& internal = report.result;
        if (!report.ready || internal.yearNumber != production.yearNumber ||
            internal.cutletName != production.cutletName ||
            internal.dayInCutlet != production.dayInCutlet ||
            internal.monthName != production.monthName ||
            internal.dayInMonth != production.dayInMonth)
          throw std::runtime_error("C++ public API differs from its Stage56 full-year path");
        count = (report.targetYear.closeGateDay-report.targetYear.openGateDay).convert_to<std::size_t>();
        emitYear(report);
      }
      std::cout << "E\t" << id << '\t' << count << '\n' << std::flush;
    } catch (const std::exception& e) {
      std::string err = e.what();
      std::replace(err.begin(), err.end(), '\t', ' ');
      std::replace(err.begin(), err.end(), '\n', ' ');
      std::cout << "X\t" << id << '\t' << err << '\n' << std::flush;
    } catch (...) {
      std::cout << "X\t" << id << "\tunknown C++ exception\n" << std::flush;
    }
  }
}
'''


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def log(message: str) -> None:
    print(time.strftime("[%Y-%m-%d %H:%M:%S]"), message, flush=True)


def http_get(url: str, attempts: int = 4) -> bytes:
    headers = {"User-Agent": "pastafari-self-differential/1.0", "Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token and url.startswith("https://api.github.com/"):
        headers["Authorization"] = "Bearer " + token
    last_error = None
    for i in range(attempts):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=120) as res:
                return res.read()
        except (OSError, urllib.error.HTTPError) as e:
            last_error = e
            if i + 1 < attempts:
                time.sleep(min(20, 2 ** i))
    raise RuntimeError(f"download failed: {url}; {last_error}")


def resolve_latest(repo: str, ref: str) -> str:
    url = f"https://api.github.com/repos/{repo}/branches/{urllib.parse.quote(ref, safe='')}"
    return json.loads(http_get(url).decode("utf-8"))["commit"]["sha"]


def fetch_source(repo: str, sha: str, path: str, destination: Path) -> None:
    if destination.is_file() and destination.stat().st_size > 0:
        return
    destination.parent.mkdir(parents=True, exist_ok=True)
    url = "https://raw.githubusercontent.com/" + repo + "/" + sha + "/" + path
    data = http_get(url)
    if not data:
        raise RuntimeError(f"empty source: {path}")
    temp = destination.with_suffix(destination.suffix + ".part")
    temp.write_bytes(data)
    temp.replace(destination)
    log(f"source {repo.split('/')[-1]}/{path}: {len(data):,} bytes")


def prepare_sources(root: Path, js_sha: str, cpp_sha: str) -> tuple[Path, Path, dict]:
    js_root = root / "sources" / "javascript" / js_sha
    cpp_root = root / "sources" / "cpp" / cpp_sha
    cpp_files = ["src/monster.cpp", "include/pastafari/monster.hpp",
                 "include/pastafari/source_language_catalog.hpp"]
    for name in cpp_files:
        fetch_source(CPP_REPO, cpp_sha, name, cpp_root / name)
    # Explicit, source-verified file manifest.  The required modules import
    # files from browser/, docs/, and src/; never reject valid cross-directory
    # imports, and never scan source files to discover additional downloads.
    for name in JS_SOURCE_FILES:
        fetch_source(JS_REPO, js_sha, name, js_root / name)
    (js_root / "package.json").write_text('{"private":true,"type":"module"}\n', encoding="utf-8")
    manifests = {
        "javascript": {name: sha256_file(js_root/name) for name in sorted(JS_SOURCE_FILES)},
        "cpp": {name: sha256_file(cpp_root/name) for name in cpp_files},
    }
    return js_root, cpp_root, manifests


def extract_name_array(source: str, symbol: str, expected_length: int) -> list[str]:
    match = re.search(r"const\s+" + re.escape(symbol) +
                      r"\s*=\s*Object\.freeze\(\s*\[([\s\S]*?)\]\s*\)", source)
    if not match:
        raise RuntimeError(f"cannot parse official JS catalog {symbol}")
    try:
        names = json.loads("[" + match.group(1).rstrip().rstrip(",") + "]")
    except json.JSONDecodeError as e:
        raise RuntimeError(f"cannot decode official JS catalog {symbol}: {e}") from e
    if len(names) != expected_length or len(set(names)) != expected_length:
        raise RuntimeError(f"invalid catalog {symbol}: expected {expected_length} unique names")
    return names


def extract_cpp_catalog(source: str, symbol: str, expected_length: int) -> list[str]:
    start = source.find(symbol)
    stop = source.find("}};", start)
    if start < 0 or stop < 0:
        raise RuntimeError(f"C++ catalog {symbol} not found")
    names = re.findall(r'\{(\d+),\s*"([^"]+)"\}', source[start:stop])
    if len(names) != expected_length or [int(n) for n, _ in names] != list(range(1, expected_length+1)):
        raise RuntimeError(f"invalid C++ catalog {symbol}")
    return [n for _, n in names]


def prepare_js_adapter(js_root: Path) -> dict:
    fast_text = (js_root / "browser/pastafari-calendar-fast.js").read_text(encoding="utf-8")
    cuts = extract_name_array(fast_text, "CUTLET_NAMES", 17)
    months = extract_name_array(fast_text, "MONTH_NAMES", 47)
    body = JS_ADAPTER.replace("__CUTLETS__", json.dumps(cuts, ensure_ascii=False))
    body = body.replace("__MONTHS__", json.dumps(months, ensure_ascii=False))
    path = js_root / "pastafari_one_file_adapter.mjs"
    path.write_text(body, encoding="utf-8")
    return {"path": str(path), "sha256": sha256_file(path),
            "cutletNames": cuts, "monthNames": months}


def which_compiler(explicit: str | None) -> str:
    choices = ([explicit] if explicit else ["g++", "clang++"])
    if os.name == "nt":
        for prefix in [r"C:\msys64\ucrt64\bin", r"C:\msys64\mingw64\bin",
                       r"C:\msys64\clang64\bin", r"C:\msys64\usr\bin"]:
            choices.extend(str(Path(prefix) / candidate) for candidate in ["g++.exe", "clang++.exe"])
    for choice in choices:
        resolved = shutil.which(choice) or (choice if os.path.isfile(choice) else None)
        if resolved:
            return str(resolved)
    raise RuntimeError("C++ compiler missing. Install g++/clang++ and Boost C++ headers (MSYS2 UCRT64 is supported).")


def compiler_runtime_environment(compiler: str) -> dict[str, str]:
    """Make MinGW/MSYS2 compiler and output .exe DLLs resolvable.

    On Windows an explicitly selected MSYS2 UCRT64 g++.exe can be
    found by Python even when the UCRT64 bin directory is absent from PATH.
    Windows then terminates the compiler (or the resulting program) before
    main() runs, frequently with NTSTATUS 0xC0000135 and empty stdout/stderr.
    This isolated child environment does not alter the user's global PATH.
    """
    env = os.environ.copy()
    compiler_dir = str(Path(compiler).resolve().parent)
    if os.name == "nt":
        path_key = next((key for key in env if key.casefold() == "path"), "PATH")
        existing = env.get(path_key, "")
        current_dirs = [p for p in existing.split(os.pathsep) if p]
        if os.path.normcase(os.path.normpath(compiler_dir)) not in {
            os.path.normcase(os.path.normpath(p)) for p in current_dirs
        }:
            env[path_key] = compiler_dir + (os.pathsep + existing if existing else "")
    return env


def process_exit_description(code: int) -> str:
    win_status = code & 0xFFFFFFFF
    special = {
        0xC0000135: "STATUS_DLL_NOT_FOUND: Windows could not load a required DLL; check MSYS2 UCRT64 installation/PATH",
        0xC000007B: "STATUS_INVALID_IMAGE_FORMAT: mismatched architecture or invalid DLL",
        0xC0000142: "STATUS_DLL_INIT_FAILED: a Windows DLL failed to initialize",
        0xC0000005: "STATUS_ACCESS_VIOLATION: compiler subprocess crashed",
        0xC000001D: "STATUS_ILLEGAL_INSTRUCTION: unsupported CPU instruction",
    }
    return f"returncode={code}, win_ntstatus=0x{win_status:08X}" + (
        f" ({special[win_status]})" if os.name == "nt" and win_status in special else ""
    )


def verify_cpp_compiler(compiler: str, env: dict[str, str], output_dir: Path) -> None:
    """Inspect compiler startup without hiding loader or toolchain failures."""
    command = [compiler, "--version"]
    try:
        result = subprocess.run(command, cwd=str(output_dir), env=env,
                                capture_output=True, text=True, encoding="utf-8",
                                errors="replace", timeout=25)
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise RuntimeError(f"C++ compiler preflight failed for {compiler}: {exc}") from exc
    if result.returncode != 0:
        raise RuntimeError(
            f"C++ compiler cannot start: {compiler}\n"
            f"{process_exit_description(result.returncode)}\n"
            f"stdout: {result.stdout[-2000:]!r}\n"
            f"stderr: {result.stderr[-2000:]!r}\n"
            "The compiler directory was already prepended to the child PATH. "
            "If this persists, repair/install the MSYS2 UCRT64 toolchain."
        )
    first_line = (result.stdout or result.stderr).splitlines()
    log(f"C++ compiler preflight OK: {first_line[0] if first_line else compiler}")


def check_boost_header_dir(path: Path) -> bool:
    """Recognize existing Boost without assuming its version."""
    return ((path / BOOST_HEADER_REL).is_file()
            and (path / "boost/config.hpp").is_file()
            and (path / "boost/multiprecision/number.hpp").is_file())


def validate_portable_boost_headers(includes: Path) -> None:
    """Reject silent partial extraction, including the exact V4 failure."""
    required = (
        BOOST_HEADER_REL, BOOST_DEEP_HEADER_REL,
        "boost/config.hpp", "boost/multiprecision/number.hpp",
        "boost/multiprecision/detail/number_base.hpp",
    )
    missing = [part for part in required if not (includes / part).is_file()]
    if missing:
        paths = [(part, len(str(includes / part))) for part in missing]
        raise RuntimeError(
            "Incomplete portable Boost extraction: missing path(s) (length in chars) "
            + repr(paths) + ". The archive must be extracted to a short path."
        )


def portable_boost_cache() -> Path:
    """Stable, short, user-writable cache independent of long batch paths.

    The previous design extracted beneath
      .../one_time_scripts/batch.../sources/cpp/<40-char-sha>/...,
    placing standalone_config.hpp at 262 characters on the user's system.
    Instead, pin both the archive and unpacked headers under the OS Temp
    directory; nothing is installed into MSYS2 or added to system PATH.
    """
    root = Path(tempfile.gettempdir()) / BOOST_CACHE_DIRNAME
    deepest = root / "boost_package/ucrt64/include" / BOOST_DEEP_HEADER_REL
    if os.name == "nt" and len(str(deepest)) > 225:
        raise RuntimeError(
            "Windows TEMP path is too long even for portable Boost: "
            f"{len(str(deepest))} characters at {deepest}. "
            "Use a shorter TEMP path for this process; no system changes required."
        )
    return root


def verify_boost_compiler(compiler: str, include_root: Path | None,
                          env: dict[str, str], cwd: Path) -> tuple[bool, str]:
    """Compiler preflight: ensure <boost/multiprecision/cpp_int.hpp> is usable."""
    command = [compiler, "-std=c++17", "-x", "c++", "-fsyntax-only"]
    if include_root is not None:
        command += ["-I", str(include_root)]
    command += ["-"]
    try:
        result = subprocess.run(
            command, cwd=str(cwd), env=env,
            input="#include <boost/multiprecision/cpp_int.hpp>\n"
                  "int main(){boost::multiprecision::cpp_int x=7; return x==7 ? 0 : 1;}\n",
            capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=90)
        return result.returncode == 0, (result.stdout + "\n" + result.stderr)[-3000:]
    except (OSError, subprocess.TimeoutExpired) as exc:
        return False, str(exc)


def download_verified_boost_package(cache_dir: Path) -> Path:
    """Download exact immutable package to test output; do not install with pacman."""
    cache_dir.mkdir(parents=True, exist_ok=True)
    archive = cache_dir / BOOST_PKG_NAME
    if archive.is_file():
        if sha256_file(archive) == BOOST_PKG_SHA256:
            log(f"Reusing verified portable Boost archive: {archive}")
            return archive
        archive.unlink()
    last_error = None
    for attempt in range(1, 4):
        temporary = archive.with_name(archive.name + ".part")
        try:
            log(f"Downloading portable Boost headers ({BOOST_VERSION}, about 15 MB), attempt {attempt}/3...")
            request = urllib.request.Request(BOOST_PKG_URL, headers={
                "User-Agent": "pastafari-self-differential/1.0",
                "Accept": "application/octet-stream"})
            sha = hashlib.sha256()
            total = 0
            with urllib.request.urlopen(request, timeout=120) as response, temporary.open("wb") as out:
                while True:
                    block = response.read(1024 * 1024)
                    if not block:
                        break
                    total += len(block)
                    if total > 70 * 1024 * 1024:
                        raise RuntimeError("Unexpectedly large Boost package (>70 MiB)")
                    out.write(block)
                    sha.update(block)
            actual = sha.hexdigest()
            if actual != BOOST_PKG_SHA256:
                raise RuntimeError(f"Boost archive checksum mismatch: got {actual}, expected {BOOST_PKG_SHA256}")
            temporary.replace(archive)
            log(f"Verified Boost package SHA-256: {actual}")
            return archive
        except Exception as exc:
            last_error = exc
            temporary.unlink(missing_ok=True)
            if attempt < 3:
                time.sleep(2 ** attempt)
    raise RuntimeError(f"Could not retrieve checksum-pinned Boost headers from {BOOST_PKG_URL}: {last_error}")


def archive_tool_candidates(compiler: str) -> list[str]:
    """Prefer the bsdtar bundled with MSYS2; standard Windows tar is fallback."""
    choices: list[str] = []
    compiler_path = Path(compiler).resolve()
    # C:\msys64\ucrt64\bin\g++.exe -> C:\msys64\usr\bin\bsdtar.exe
    if os.name == "nt":
        msys_root = compiler_path.parent.parent.parent
        choices.extend([str(msys_root / "usr/bin/bsdtar.exe"),
                        str(msys_root / "usr/bin/tar.exe"),
                        str(Path(os.environ.get("SystemRoot", r"C:\Windows")) / "System32/tar.exe")])
    choices.extend(["bsdtar", "tar"])
    found = []
    for choice in choices:
        exe = shutil.which(choice) or (choice if Path(choice).is_file() else None)
        if exe is not None and exe not in found:
            found.append(exe)
    return found


def archive_safe_members(lines: str) -> None:
    """Reject any possible path traversal, irrespective of a pinned upstream SHA."""
    from pathlib import PurePosixPath
    count = 0
    for line in lines.splitlines():
        name = line.strip().replace("\\", "/")
        if not name:
            continue
        parts = PurePosixPath(name).parts
        if (name.startswith("/") or ":" in name or
                any(part == ".." for part in parts)):
            raise RuntimeError(f"Unsafe path in Boost package: {name}")
        count += 1
    if count < 100:
        raise RuntimeError("Boost package looks unexpectedly empty")


def extract_portable_boost(archive: Path, cache_dir: Path, compiler: str,
                           env: dict[str, str]) -> Path:
    """Extract pinned package only into the results folder, never into the MSYS2 installation."""
    root = cache_dir / "boost_package"
    includes = root / "ucrt64/include"
    marker = root / "verified-boost.sha256"
    if marker.is_file() and marker.read_text(encoding="ascii").strip() == BOOST_PKG_SHA256:
        try:
            validate_portable_boost_headers(includes)
            log(f"Reusing previously extracted portable Boost headers: {includes}")
            return includes
        except RuntimeError as exc:
            log(f"Rejecting incomplete Boost cache: {exc}")
    # Incomplete extracts from earlier runs are discarded, rather than accepted.
    if root.exists():
        shutil.rmtree(root)
    root.mkdir(parents=True, exist_ok=True)
    tool_errors: list[str] = []
    for tool in archive_tool_candidates(compiler):
        runtime_env = env.copy()
        if os.name == "nt":
            # MSYS2 bsdtar itself requires /usr/bin DLLs at startup.
            msys_bin = str(Path(compiler).resolve().parent.parent.parent / "usr/bin")
            path_key = next((k for k in runtime_env if k.casefold() == "path"), "PATH")
            runtime_env[path_key] = msys_bin + os.pathsep + runtime_env.get(path_key, "")
        try:
            listing = subprocess.run(
                [tool, "-tf", str(archive)], cwd=str(root), env=runtime_env,
                text=True, capture_output=True, encoding="utf-8", errors="replace", timeout=120)
            if listing.returncode != 0:
                raise RuntimeError(f"listing exit={listing.returncode}: {listing.stderr[-500:]}")
            archive_safe_members(listing.stdout)
            log(f"Extracting portable Boost with {tool} (no MSYS2 installation changes)...")
            extracted = subprocess.run(
                [tool, "-xf", str(archive), "-C", str(root)], cwd=str(root), env=runtime_env,
                text=True, capture_output=True, encoding="utf-8", errors="replace", timeout=600)
            if extracted.returncode != 0:
                raise RuntimeError(f"extract exit={extracted.returncode}: {extracted.stderr[-1000:]}")
            validate_portable_boost_headers(includes)
            marker.write_text(BOOST_PKG_SHA256 + "\n", encoding="ascii")
            return includes
        except (OSError, RuntimeError, subprocess.TimeoutExpired) as exc:
            tool_errors.append(f"{tool}: {exc}")
            if root.exists():
                shutil.rmtree(root)
            root.mkdir(parents=True, exist_ok=True)
    raise RuntimeError("Could not decompress the verified MSYS2 Boost .tar.zst archive. "
                       "Tried: " + "; ".join(tool_errors))


def provision_boost_headers(compiler: str, cpp_root: Path,
                            env: dict[str, str], explicit: str | None = None) -> tuple[Path | None, str]:
    """Resolve Boost includes without changing machine toolchain/packages."""
    if explicit:
        chosen = Path(explicit).resolve()
        if not check_boost_header_dir(chosen):
            raise RuntimeError(f"--boost-include must contain {BOOST_HEADER_REL}: {chosen}")
        works, reason = verify_boost_compiler(compiler, chosen, env, cpp_root)
        if not works:
            raise RuntimeError(f"Boost from --boost-include failed compiler probe: {reason}")
        log(f"Using explicitly supplied Boost headers at {chosen}")
        return chosen, "explicit"

    # If the compiler already knows Boost (e.g. system include tree), do not download.
    works, failure = verify_boost_compiler(compiler, None, env, cpp_root)
    if works:
        log("Existing Boost headers: compiler probe passed; no download needed")
        return None, "compiler-default"

    # Check only common, concrete MSYS2 include directories; no source searching.
    compiler_path = Path(compiler).resolve()
    candidate_paths = [compiler_path.parent.parent / "include"]
    if os.name == "nt":
        root = compiler_path.parent.parent.parent
        candidate_paths.extend(root / x for x in
                               ("ucrt64/include", "mingw64/include", "clang64/include"))
    for candidate in dict.fromkeys(candidate_paths):
        if not check_boost_header_dir(candidate):
            continue
        works, failure = verify_boost_compiler(compiler, candidate, env, cpp_root)
        if works:
            log(f"Using Boost headers already installed at {candidate}")
            return candidate, "preexisting"

    if os.name != "nt":
        raise RuntimeError("Boost is not available to the C++ compiler. "
                           "Automatic portable MSYS2 header provisioning currently supports Windows UCRT64 only. "
                           f"Probe diagnostics: {failure}")
    compiler_dir = compiler_path.parent.parent.name.lower()
    if compiler_dir != "ucrt64":
        raise RuntimeError("Portable Boost package is pinned to MSYS2 UCRT64, but compiler appears "
                           f"to be in {compiler_path.parent}. Use UCRT64 g++ or --boost-include. "
                           f"Probe diagnostics: {failure}")
    cache_dir = portable_boost_cache()
    log(f"Using short, reusable Boost cache under {cache_dir} (avoids Windows MAX_PATH)")
    archive = download_verified_boost_package(cache_dir)
    includes = extract_portable_boost(archive, cache_dir, compiler, env)
    validate_portable_boost_headers(includes)
    works, reason = verify_boost_compiler(compiler, includes, env, cpp_root)
    if not works:
        raise RuntimeError(f"Portable Boost headers unpacked but compiler cannot use them: {reason}")
    log(f"Portable Boost compiler probe OK: {includes}")
    return includes, f"MSYS2 {BOOST_VERSION} SHA256={BOOST_PKG_SHA256}"


def prepare_cpp_adapter(cpp_root: Path, compiler: str, build_timeout: int,
                        explicit_boost_include: str | None = None) -> dict:
    catalog = (cpp_root / "include/pastafari/source_language_catalog.hpp").read_text(encoding="utf-8")
    extract_cpp_catalog(catalog, "CUTLET_SOURCE_CATALOG", 17)
    extract_cpp_catalog(catalog, "MONTH_SOURCE_CATALOG", 47)
    path = cpp_root / "pastafari_one_file_adapter.cpp"
    path.write_text(CPP_ADAPTER, encoding="utf-8")
    exe = cpp_root / ("pastafari_one_file_adapter.exe" if os.name == "nt" else "pastafari_one_file_adapter")
    marker = cpp_root / "compiled.sha256"
    runtime_env = compiler_runtime_environment(compiler)
    verify_cpp_compiler(compiler, runtime_env, cpp_root)
    boost_include, boost_provenance = provision_boost_headers(
        compiler, cpp_root, runtime_env, explicit_boost_include)
    boost_fingerprint = boost_provenance + (str(boost_include) if boost_include else "")
    build_key = hashlib.sha256((sha256_file(cpp_root/"src/monster.cpp") +
                                sha256_file(cpp_root/"include/pastafari/monster.hpp") +
                                sha256_file(path) + compiler + boost_fingerprint).encode("utf-8")).hexdigest()
    if not exe.is_file() or not marker.is_file() or marker.read_text().strip() != build_key:
        flags = [compiler, "-std=c++17", "-O2", "-pthread", "-I", str(cpp_root/"include")]
        if boost_include is not None:
            flags.extend(["-I", str(boost_include)])
        flags.extend([str(cpp_root/"src/monster.cpp"), str(path), "-o", str(exe)])
        compile_log = cpp_root / "cpp_compile.log"
        log("Compiling C++ Stage56 production adapter (may take time and memory)...")
        log(f"Compile diagnostics will be preserved at: {compile_log}")
        try:
            result = subprocess.run(flags, cwd=str(cpp_root), env=runtime_env,
                                    capture_output=True, text=True, encoding="utf-8",
                                    errors="replace", timeout=build_timeout)
        except subprocess.TimeoutExpired as exc:
            compile_log.write_text(
                "COMMAND: " + subprocess.list2cmdline(flags) + "\n" +
                f"TIMEOUT: {build_timeout}s\n" +
                f"STDOUT: {exc.stdout!r}\nSTDERR: {exc.stderr!r}\n", encoding="utf-8")
            raise RuntimeError(f"C++ compilation exceeded {build_timeout}s; see {compile_log}") from exc
        except OSError as exc:
            compile_log.write_text(
                "COMMAND: " + subprocess.list2cmdline(flags) + "\n" +
                f"OS ERROR: {exc!r}\n", encoding="utf-8")
            raise RuntimeError(f"C++ compiler process failed to launch: {exc}; see {compile_log}") from exc
        compile_log.write_text(
            "COMMAND: " + subprocess.list2cmdline(flags) + "\n" +
            "EXIT: " + process_exit_description(result.returncode) + "\n" +
            "STDOUT:\n" + result.stdout + "\nSTDERR:\n" + result.stderr,
            encoding="utf-8")
        if result.returncode:
            raise RuntimeError(
                "C++ compile failed: " + process_exit_description(result.returncode) +
                f"\nDiagnostic log: {compile_log}\n" +
                (result.stdout + "\n" + result.stderr)[-10000:]
            )
        if not exe.is_file():
            raise RuntimeError(f"compiler returned success but output .exe is missing; see {compile_log}")
        marker.write_text(build_key, encoding="utf-8")
        log("Compiled C++ adapter successfully")
    else:
        log("Using previously compiled matching C++ adapter")
    return {"path": str(exe), "sha256": sha256_file(exe),
            "source_sha256": sha256_file(path), "compiler": compiler,
            "boost_include": str(boost_include) if boost_include else None,
            "boost_provenance": boost_provenance}


def floor_div(a: int, b: int) -> int:
    return a // b


def gregorian_to_jdn(year: int, month: int, day: int) -> int:
    a = floor_div(14-month, 12)
    y = year + 4800 - a
    m = month + 12*a - 3
    return day + floor_div(153*m+2, 5) + 365*y + floor_div(y, 4) - floor_div(y, 100) + floor_div(y, 400) - 32045


def jdn_to_gregorian(jdn: int) -> tuple[int, int, int]:
    a = jdn + 32044
    b = floor_div(4*a+3, 146097)
    c = a - floor_div(146097*b, 4)
    d = floor_div(4*c+3, 1461)
    e = c - floor_div(1461*d, 4)
    m = floor_div(5*e+2, 153)
    day = e - floor_div(153*m+2, 5) + 1
    month = m + 3 - 12*floor_div(m, 10)
    year = 100*b + d - 4800 + floor_div(m, 10)
    if gregorian_to_jdn(year, month, day) != jdn:
        raise AssertionError(f"Gregorian inverse failed for {jdn}")
    return year, month, day


def iso_date(year: int, month: int, day: int) -> str:
    return ("-" if year < 0 else "") + f"{abs(year):04d}-{month:02d}-{day:02d}"


def cases_list(seed: int, n_random: int) -> list[dict]:
    start2026 = gregorian_to_jdn(2026, 1, 1)
    end2026 = gregorian_to_jdn(2026, 12, 31)
    assert end2026-start2026+1 == 365
    days = [("YEAR_2026", j) for j in range(start2026, end2026+1)]
    # Wide inclusive interval: from Jan 1 (2026 - 50,000) to Dec 31 (2026 + 50,000).
    low = gregorian_to_jdn(2026-50000, 1, 1)
    high = gregorian_to_jdn(2026+50000, 12, 31)
    random_gen = random.Random(seed)
    selected = set()
    while len(selected) < n_random:
        jdn = random_gen.randint(low, high)
        if start2026 <= jdn <= end2026:  # random cases are truly additional
            continue
        selected.add(jdn)
    random_days = sorted(selected)
    random_gen.shuffle(random_days)
    days.extend(("RANDOM", j) for j in random_days)
    output = []
    for i, (group, jdn) in enumerate(days):
        y, m, d = jdn_to_gregorian(jdn)
        output.append({"case_id": f"{i:06d}", "group": group, "jdn": jdn,
                       "iso": iso_date(y,m,d), "year": y})
    assert len(days) == 365+n_random and len({j for _,j in days}) == len(days)
    return output


class Worker:
    """Persistent newline worker with isolated process-tree timeout and clean restart."""
    def __init__(self, name: str, command: list[str], cwd: Path, error_log: Path,
                 env: dict[str, str] | None = None):
        self.name, self.command, self.cwd, self.error_log = name, command, cwd, error_log
        self.env = env
        self.proc = None
        self.reader = None
        self.incoming = None
        self.errhandle = None

    def start(self) -> None:
        self.stop()
        self.incoming = queue.Queue()
        self.error_log.parent.mkdir(parents=True, exist_ok=True)
        self.errhandle = self.error_log.open("ab", buffering=0)
        kwargs = {"cwd": str(self.cwd), "stdin": subprocess.PIPE,
                  "stdout": subprocess.PIPE, "stderr": self.errhandle, "env": self.env,
                  "text": True, "encoding": "utf-8", "errors": "replace", "bufsize": 1}
        if os.name == "nt":
            kwargs["creationflags"] = getattr(subprocess, "CREATE_NEW_PROCESS_GROUP", 0) | getattr(subprocess, "CREATE_NO_WINDOW", 0)
        else:
            kwargs["start_new_session"] = True
        self.proc = subprocess.Popen(self.command, **kwargs)
        proc = self.proc
        q = self.incoming
        def collect():
            try:
                for line in proc.stdout:
                    q.put(("LINE", line.rstrip("\r\n")))
            except Exception as e:
                q.put(("READ_ERROR", str(e)))
            finally:
                q.put(("EOF", ""))
        self.reader = threading.Thread(target=collect, daemon=True, name=f"{self.name}-stdout")
        self.reader.start()

    def stop(self) -> None:
        proc = self.proc
        self.proc = None
        if proc is not None and proc.poll() is None:
            try:
                if os.name == "nt":
                    subprocess.run(["taskkill", "/T", "/F", "/PID", str(proc.pid)],
                                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=15)
                else:
                    os.killpg(proc.pid, signal.SIGKILL)
            except Exception:
                try: proc.kill()
                except Exception: pass
            try: proc.wait(timeout=5)
            except Exception: pass
        if self.errhandle is not None:
            try: self.errhandle.close()
            except Exception: pass
            self.errhandle = None

    def request(self, case: dict, year: bool, timeout: float) -> dict:
        if self.proc is None or self.proc.poll() is not None:
            self.start()
        sent = "\t".join([case["case_id"], case["iso"], str(case["jdn"]), "Y" if year else "N"]) + "\n"
        answer = {"date": None, "year": {}, "error": None, "count": None}
        started = time.monotonic()
        try:
            self.proc.stdin.write(sent)
            self.proc.stdin.flush()
            while True:
                remaining = timeout-(time.monotonic()-started)
                if remaining <= 0:
                    raise TimeoutError(f"{self.name}: wall clock {timeout:.1f}s exceeded")
                try: kind, line = self.incoming.get(timeout=remaining)
                except queue.Empty:
                    raise TimeoutError(f"{self.name}: wall clock {timeout:.1f}s exceeded")
                if kind != "LINE":
                    raise RuntimeError(f"{self.name}: subprocess ended unexpectedly ({kind}: {line})")
                parts = line.split("\t")
                if not parts:
                    raise RuntimeError(f"{self.name}: empty response")
                if parts[0] == "B":
                    if answer["date"] is not None or len(parts) != 9:
                        raise RuntimeError(f"{self.name}: invalid duplicate/date record {line[:150]}")
                    answer["date"] = parse_day(parts[1:7], case["jdn"])
                    answer["names"] = [parts[7], parts[8]]
                elif parts[0] == "D":
                    if not year or len(parts) != 7:
                        raise RuntimeError(f"{self.name}: invalid unsolicited day row {line[:150]}")
                    row = parse_day(parts[1:7])
                    if row[0] in answer["year"]:
                        raise RuntimeError(f"{self.name}: duplicate JDN in whole year: {row[0]}")
                    answer["year"][row[0]] = row[1:]
                elif parts[0] == "E":
                    if len(parts) != 3 or parts[1] != case["case_id"]:
                        raise RuntimeError(f"{self.name}: wrong end marker {line[:150]}")
                    answer["count"] = int(parts[2])
                    if answer["date"] is None or answer["count"] != len(answer["year"]):
                        raise RuntimeError(f"{self.name}: incomplete response, count={answer['count']} rows={len(answer['year'])}")
                    if year:
                        actual = answer["year"].get(case["jdn"])
                        if actual is None or tuple(actual) != tuple(answer["date"][1:]):
                            raise RuntimeError(f"{self.name}: whole year disagrees with its own five-field date")
                        if list(sorted(answer["year"])) != list(range(min(answer["year"]),max(answer["year"])+1)):
                            raise RuntimeError(f"{self.name}: non-contiguous whole-year span")
                    return answer
                elif parts[0] == "X":
                    if len(parts) < 3 or parts[1] != case["case_id"]:
                        raise RuntimeError(f"{self.name}: wrong error marker {line[:150]}")
                    answer["error"] = "\t".join(parts[2:])
                    return answer
                else:
                    raise RuntimeError(f"{self.name}: unexpected protocol message {line[:200]}")
        except Exception as e:
            self.stop()
            answer["error"] = f"{type(e).__name__}: {e}"
            return answer


def parse_day(cols: list[str], expected_jdn: int | None = None) -> tuple[int, str, int, int, int, int]:
    jdn, year, cidx, cutday, midx, monthday = cols
    row = (int(jdn), str(int(year)), int(cidx), int(cutday), int(midx), int(monthday))
    if expected_jdn is not None and row[0] != expected_jdn:
        raise ValueError(f"received wrong JDN: {row[0]} != {expected_jdn}")
    if not (1 <= row[2] <= 17 and row[3] >= 1 and 1 <= row[4] <= 47 and row[5] >= 1):
        raise ValueError(f"invalid canonical date fields: {row}")
    return row


def compare_case(case: dict, js: dict, cpp: dict, year_enabled: bool) -> dict:
    details = {
        "case_id": case["case_id"], "group": case["group"], "iso": case["iso"],
        "jdn": case["jdn"], "js_date": js.get("date"), "cpp_date": cpp.get("date"),
        "js_names": js.get("names"), "cpp_names": cpp.get("names"),
        "js_error": js["error"], "cpp_error": cpp["error"],
        "js_year_rows": js["count"], "cpp_year_rows": cpp["count"],
        "date_mismatch_fields": [], "year_differences": 0, "year_examples": [],
    }
    if js["error"] or cpp["error"]:
        details["status"] = "ENGINE_ERROR_BOTH" if js["error"] and cpp["error"] else (
            "JS_ERROR" if js["error"] else "CPP_ERROR")
        return details
    for index, label in enumerate(("jdn",) + FIELDS):
        if js["date"][index] != cpp["date"][index]:
            details["date_mismatch_fields"].append(label)
    if year_enabled:
        left = js["year"]
        right = cpp["year"]
        all_days = sorted(left.keys() | right.keys())
        for jd in all_days:
            if left.get(jd) != right.get(jd):
                details["year_differences"] += 1
                if len(details["year_examples"]) < 15:
                    details["year_examples"].append({"jdn":jd,"js":left.get(jd),"cpp":right.get(jd)})
    date_diff = bool(details["date_mismatch_fields"])
    year_diff = details["year_differences"] > 0
    details["status"] = "BOTH_MISMATCH" if (date_diff and year_diff) else (
        "DATE_MISMATCH" if date_diff else "YEAR_MISMATCH" if year_diff else "PASS")
    return details


def atomic_json(path: Path, obj: object) -> None:
    temp = path.with_suffix(path.suffix + ".part")
    temp.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(path)


def get_node(explicit: str | None) -> str:
    choices = ([explicit] if explicit else ["node"])
    if os.name == "nt":
        choices += [r"C:\Program Files\nodejs\node.exe", r"C:\nodejs\node.exe"]
    for choice in choices:
        value = shutil.which(choice) or (choice if os.path.isfile(choice) else None)
        if value:
            version = subprocess.check_output([str(value), "--version"], text=True, timeout=10).strip()
            maj = int(re.search(r"v(\d+)", version).group(1))
            if maj < 20:
                raise RuntimeError(f"Node.js >= 20 required, got {version}")
            return str(value)
    raise RuntimeError("Node.js >= 20 missing; install Node LTS and rerun.")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Compare 10,365 self-dates and all computed Pastafari-year structures between bot JS and C++ Celeritas")
    p.add_argument("--output", type=Path, default=Path("pastafari_self_date_results"))
    p.add_argument("--seed", type=int, default=SEED_DEFAULT)
    p.add_argument("--random-count", type=int, default=NUMBER_RANDOM)
    p.add_argument("--max-cases", type=int, default=None, help="Small dry run, defaults to ALL")
    p.add_argument("--resume", action="store_true", help="Skip completed cases after validating source and sampling manifest")
    p.add_argument("--case-id", default=None, help="Run one identified case from the deterministic corpus, e.g. 003211")
    p.add_argument("--restart-every", type=int, default=100, help="Restart both workers every N cases to bound heap growth")
    p.add_argument("--year", choices=["all", "off"], default="all", help="all: compare entire fixed-action Pastafari year per sample")
    p.add_argument("--latest", action="store_true", help="Resolve both branches to latest commits rather than pinned snapshots")
    p.add_argument("--js-sha", default=None, help="Explicit 40-hex JS source commit")
    p.add_argument("--cpp-sha", default=None, help="Explicit 40-hex C++ source commit")
    p.add_argument("--case-timeout", type=float, default=900, help="Max seconds PER ENGINE per case")
    p.add_argument("--compile-timeout", type=int, default=1200)
    p.add_argument("--node", default=None)
    p.add_argument("--cxx", default=None)
    p.add_argument("--boost-include", default=None, help="Optional existing Boost include root, e.g. C:/msys64/ucrt64/include")
    p.add_argument("--progress-every", type=int, default=25)
    return p.parse_args()


def main() -> int:
    args = parse_args()
    if not (0 <= args.random_count <= 100000 and args.case_timeout >= 1 and args.progress_every >= 1 and args.restart_every >= 1):
        raise ValueError("invalid random-count / case-timeout / progress-every")
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    js_sha = args.js_sha or (resolve_latest(JS_REPO, "main") if args.latest else JS_SHA)
    cpp_sha = args.cpp_sha or (resolve_latest(CPP_REPO, CPP_BRANCH) if args.latest else CPP_SHA)
    if not re.fullmatch(r"[a-fA-F0-9]{40}", js_sha) or not re.fullmatch(r"[a-fA-F0-9]{40}", cpp_sha):
        raise ValueError("both source refs must be full 40-character Git commit hashes")
    settings = {"js_repo": JS_REPO, "cpp_repo": CPP_REPO, "js_commit": js_sha,
                "cpp_commit": cpp_sha, "seed": args.seed, "random_count": args.random_count,
                "year_mode": args.year, "jdn_offset": JDN_ENGINE_OFFSET,
                "self_date": True, "calendar": "proleptic Gregorian astronomical year numbering"}
    cases = cases_list(args.seed, args.random_count)
    selected = cases if args.max_cases is None else cases[:args.max_cases]
    if args.case_id is not None:
        selected = [c for c in cases if c["case_id"] == args.case_id]
    if len(selected) == 0:
        raise ValueError("zero cases selected")
    log(f"Created {len(cases):,} unique cases: 365 days of 2026 and {args.random_count:,} random dates")
    log(f"Run this invocation: {len(selected):,} cases; year comparison: {args.year}")
    manifest_path = output / "manifest.json"
    if manifest_path.is_file():
        previous = json.loads(manifest_path.read_text(encoding="utf-8"))
        if previous.get("settings") != settings:
            raise RuntimeError("OUTPUT DIRECTORY ALREADY HAS DIFFERENT SETTINGS; use a fresh --output path")
    else:
        atomic_json(manifest_path, {"settings": settings, "testbench": "pastafari_self_date_differential v5 (fixed JS manifest, safe portable pinned Boost headers)",
                                    "case_total": len(cases), "case_selected": len(selected),
                                    "range_start": iso_date(2026-50000,1,1),
                                    "range_end": iso_date(2026+50000,12,31)})
    cases_csv = output / "cases.csv"
    if not cases_csv.is_file():
        with cases_csv.open("w",newline="",encoding="utf-8") as f:
            w = csv.DictWriter(f,fieldnames=list(cases[0].keys()))
            w.writeheader(); w.writerows(cases)
    completed_path = output / "cases_results.jsonl"
    completed = set()
    if completed_path.exists():
        if not args.resume:
            raise RuntimeError("results already exist; use --resume to continue, or choose another --output")
        for line in completed_path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                item = json.loads(line)
                completed.add(item["case_id"])
    # Verify code/toolchain before starting a long run.
    node = get_node(args.node)
    compiler = which_compiler(args.cxx)
    log(f"Using Node: {node}; C++ compiler: {compiler}")
    js_root, cpp_root, sources = prepare_sources(output, js_sha, cpp_sha)
    js_adapter = prepare_js_adapter(js_root)
    cpp_adapter = prepare_cpp_adapter(cpp_root, compiler, args.compile_timeout,
                                      args.boost_include)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if "source_checksums" in manifest and manifest["source_checksums"] != sources:
        raise RuntimeError("cached sources changed; refusing nonreproducible resume")
    manifest.update({"source_checksums":sources,
                     "js_adapter_sha256":js_adapter["sha256"],
                     "cpp_adapter_source_sha256":cpp_adapter["source_sha256"],
                     "cpp_adapter_binary_sha256":cpp_adapter["sha256"],
                     "node_version":subprocess.check_output([node,"--version"],text=True).strip(),
                     "python_version":sys.version.split()[0],
                     "platform":platform.platform(),
                     "testbench_sha256":sha256_file(Path(__file__).resolve()),
                     "cpp_compiler":compiler,
                     "boost_include":cpp_adapter["boost_include"],
                     "boost_provenance":cpp_adapter["boost_provenance"],
                     "catalog_semantics":"names translated via their 1-based canonical catalog indices",
                     "year_semantics":"same fixed calculation c=anchor for all days of the anchor's Pastafari year"})
    atomic_json(manifest_path, manifest)
    jsworker = Worker("javascript",[node,js_adapter["path"]],js_root,output/"javascript_stderr.log")
    cppworker = Worker("cpp",[cpp_adapter["path"]],cpp_root,output/"cpp_stderr.log",
                       env=compiler_runtime_environment(compiler))
    counts = collections.Counter()
    seen_year = 0
    discrepancy_file = output / "discrepancies.jsonl"
    try:
        with completed_path.open("a",encoding="utf-8",buffering=1) as results, discrepancy_file.open("a",encoding="utf-8",buffering=1) as diffs:
            for n, case in enumerate(selected, 1):
                if case["case_id"] in completed:
                    continue
                js = jsworker.request(case,args.year=="all",args.case_timeout)
                cpp = cppworker.request(case,args.year=="all",args.case_timeout)
                item = compare_case(case,js,cpp,args.year=="all")
                counts[item["status"]] += 1
                seen_year += min(js["count"] or 0, cpp["count"] or 0)
                results.write(json.dumps(item,ensure_ascii=False,separators=(",",":"))+"\n")
                results.flush()
                os.fsync(results.fileno())
                if item["status"] != "PASS":
                    diffs.write(json.dumps(item,ensure_ascii=False)+"\n")
                    diffs.flush()
                    log(f"{n}/{len(selected)} {case['iso']} {item['status']} JS={item['js_error']} CPP={item['cpp_error']} year_differences={item['year_differences']}")
                elif n==1 or n % args.progress_every==0 or n==len(selected):
                    log(f"{n}/{len(selected)} {case['iso']} PASS; year rows compared this invocation: {seen_year:,}")
                if n % args.restart_every == 0:
                    jsworker.stop(); cppworker.stop()
    except KeyboardInterrupt:
        log("Interrupted by user; append-only results already flushed. Rerun with --resume.")
        return 130
    finally:
        jsworker.stop(); cppworker.stop()
    # Aggregate full on-disk ledger (including previous resumes).
    final_counts = collections.Counter()
    total_comparable_year_rows = 0
    processed = set()
    with completed_path.open(encoding="utf-8") as f:
        for line in f:
            if not line.strip(): continue
            item = json.loads(line)
            processed.add(item["case_id"])
            final_counts[item["status"]] += 1
            if item["status"] == "PASS" and args.year=="all":
                total_comparable_year_rows += item["js_year_rows"]
    all_done = all(c["case_id"] in processed for c in cases)
    failures = sum(v for k,v in final_counts.items() if k != "PASS")
    result = {
        "overall": ("PASS" if all_done and failures==0 else "FAIL" if failures else "PARTIAL"),
        "complete_all_10365": all_done if args.random_count==10000 else None,
        "completed": len(processed), "required":len(cases),
        "counts_by_status": dict(sorted(final_counts.items())),
        "fully_equal_year_days_in_passed_cases":total_comparable_year_rows,
        "year_mode":args.year,
        "source_commits":{"javascript":js_sha,"cpp":cpp_sha},
        "evidence":"cases_results.jsonl; discrepancies.jsonl; manifest.json; cases.csv",
        "caveat":"Two-engine agreement is not normative proof; errors and timeouts are not mismatches or PASS.",
    }
    atomic_json(output / "summary.json",result)
    log("SUMMARY " + json.dumps(result,ensure_ascii=False))
    return 0 if all_done and failures==0 else (2 if failures else 3)


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        traceback.print_exc()
        sys.exit(1)