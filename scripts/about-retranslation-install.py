#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "artifacts/about-retranslation-2026-10-04"
STAGING = BASE / "staging"
MANIFEST = BASE / "locales.json"
REV = "6-about-retranslation"

def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)

def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")

def write(path: Path, value: str) -> None:
    path.write_text(value, encoding="utf-8")

def verify_all(locales: list[dict]) -> None:
    errors = []
    for row in locales:
        code = row["code"]
        folder = STAGING / code
        status_path = folder / "status.json"
        if not status_path.exists():
            errors.append(f"{code}: missing status.json")
            continue
        status = json.loads(read(status_path))
        if status.get("state") != "PASS":
            errors.append(f"{code}: state={status.get('state')!r}")
        if status.get("native_qa") != "PASS":
            errors.append(f"{code}: native_qa={status.get('native_qa')!r}")
        if status.get("hebrew_compare") != "PASS":
            errors.append(f"{code}: hebrew_compare={status.get('hebrew_compare')!r}")
        for name in ["about.html", "monster.html", "native-qa-final.md", "hebrew-compare-final.md"]:
            if not (folder / name).is_file():
                errors.append(f"{code}: missing {name}")
    require(not errors, "Publication gate failed:\n" + "\n".join(errors))

def install_pages(locales: list[dict]) -> None:
    content = ROOT / "docs/about/content"
    monster = ROOT / "docs/about/monster"
    monster.mkdir(parents=True, exist_ok=True)
    for row in locales:
        code = row["code"]
        shutil.copy2(STAGING / code / "about.html", content / f"{code}.html")
        shutil.copy2(STAGING / code / "monster.html", monster / f"{code}.html")

def registry_source(locales: list[dict]) -> str:
    rows = [{"code": "he", "tag": "he-IL", "dir": "rtl"}] + locales
    blocks = []
    for row in rows:
        code, tag, direction = row["code"], row["tag"], row["dir"]
        blocks.append(
            f'''  "{code}": Object.freeze({{\n'''
            f'''    code: "{code}",\n'''
            f'''    lang: "{tag}",\n'''
            f'''    dir: "{direction}",\n'''
            f'''    asset: "./content/{code}.html?v={REV}",\n'''
            f'''  }}),'''
        )
    joined = "\n".join(blocks)
    return f'''"use strict";\n\nexport const ARTICLE_FALLBACK_LOCALE = "he";\nexport const ARTICLE_ROLLOUT_COMPLETE = true;\n\nexport const ARTICLE_LOCALES = Object.freeze({{\n{joined}\n}});\n\nexport function resolveArticleLocale(code) {{\n  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];\n}}\n'''

def patch_about_runtime() -> None:
    path = ROOT / "docs/about/about.js"
    s = read(path)
    s2 = re.sub(r'from "\./content/registry\.js\?v=[^"]+";', f'from "./content/registry.js?v={REV}";', s, count=1)
    require(s2 != s, "about.js registry revision was not patched")
    s = s2.replace(
        'elements["article-content"].lang = articleLocale.code;',
        'elements["article-content"].lang = articleLocale.lang ?? articleLocale.code;',
    )
    write(path, s)

    path = ROOT / "docs/about/index.html"
    s = read(path)
    s2 = re.sub(r'src="\./about\.js\?v=[^"]+"', f'src="./about.js?v={REV}"', s, count=1)
    require(s2 != s, "about/index.html about.js revision was not patched")
    write(path, s2)

def patch_service_worker() -> None:
    path = ROOT / "docs/sw.js"
    s = read(path)
    s = re.sub(r'const VERSION = "[^"]+";', 'const VERSION = "pastafari-static-pwa-hardening-24-about-retranslation";', s, count=1)
    s = re.sub(r'"\./about/about\.js\?v=[^"]+"', f'"./about/about.js?v={REV}"', s, count=1)
    s = re.sub(r'"\./about/content/registry\.js\?v=[^"]+"', f'"./about/content/registry.js?v={REV}"', s, count=1)
    s = re.sub(r'"\./about/content/he\.html\?v=[^"]+"', f'"./about/content/he.html?v={REV}"', s, count=1)

    marker = 'const OPTIONAL_LOCALE_PATH = /^\\/i18n\\/locales\\/[A-Za-z0-9-]+\\.js$/;'
    require(marker in s, "sw.js locale optional-path marker missing")
    if "OPTIONAL_ARTICLE_PATH" not in s:
        s = s.replace(marker, marker + '\nconst OPTIONAL_ARTICLE_PATH = /^\\/about\\/content\\/[A-Za-z0-9-]+\\.html$/;')

    locale_rev = 'const LOCALE_REVISION_SEARCH = new URL(scoped(ENGLISH_LOCALE_ASSET)).search;'
    require(locale_rev in s, "sw.js locale revision marker missing")
    if "ARTICLE_REVISION_SEARCH" not in s:
        s = s.replace(
            locale_rev,
            locale_rev + '\nconst FALLBACK_ARTICLE_ASSET = CORE_ASSETS.find((path) => path.startsWith("./about/content/he.html?"));\n'
            'if (!FALLBACK_ARTICLE_ASSET) throw new Error("Fallback article is missing from CORE_ASSETS.");\n'
            'const ARTICLE_REVISION_SEARCH = new URL(scoped(FALLBACK_ARTICLE_ASSET)).search;',
        )

    locale_fn = '''function isOptionalLocaleRequest(url) {\n  const relativePath = scopeRelativePath(url);\n  return relativePath !== null\n    && OPTIONAL_LOCALE_PATH.test(relativePath)\n    && url.search === LOCALE_REVISION_SEARCH;\n}\n'''
    require(locale_fn in s, "sw.js optional locale function shape changed")
    if "function isOptionalArticleRequest" not in s:
        s = s.replace(
            locale_fn,
            locale_fn + '''\nfunction isOptionalArticleRequest(url) {\n  const relativePath = scopeRelativePath(url);\n  return relativePath !== null\n    && OPTIONAL_ARTICLE_PATH.test(relativePath)\n    && url.search === ARTICLE_REVISION_SEARCH;\n}\n\nfunction isRuntimeCacheableRequest(url) {\n  return OPTIONAL_BY_URL.has(url.href)\n    || isOptionalLocaleRequest(url)\n    || isOptionalArticleRequest(url);\n}\n''',
        )

    s = s.replace(
        'if (!OPTIONAL_BY_URL.has(url.href) && !isOptionalLocaleRequest(url)) continue;',
        'if (!isRuntimeCacheableRequest(url)) continue;',
    )
    s = s.replace(
        'const currentOptional = OPTIONAL_BY_URL.has(url.href) || isOptionalLocaleRequest(url);',
        'const currentOptional = isRuntimeCacheableRequest(url);',
    )

    locale_fetch = '''  if (isOptionalLocaleRequest(url)) {\n    event.respondWith(runtimeResponse(event.request, url, url.pathname));\n    return;\n  }\n'''
    require(locale_fetch in s, "sw.js locale fetch branch changed")
    if "isOptionalArticleRequest(url)" not in s[s.index(locale_fetch) + len(locale_fetch):]:
        s = s.replace(
            locale_fetch,
            locale_fetch + '''\n  if (isOptionalArticleRequest(url)) {\n    event.respondWith(runtimeResponse(event.request, url, url.pathname));\n    return;\n  }\n''',
        )
    write(path, s)

def patch_pwa_test() -> None:
    path = ROOT / "test/pwa-i18n.test.js"
    s = read(path)
    s = re.sub(r'"\./about/about\.js\?v=[^"]+"', f'"./about/about.js?v={REV}"', s)
    s = re.sub(r'"\./about/content/registry\.js\?v=[^"]+"', f'"./about/content/registry.js?v={REV}"', s)
    s = re.sub(r'"\./about/content/he\.html\?v=[^"]+"', f'"./about/content/he.html?v={REV}"', s)
    s = re.sub(
        r'assert\.match\(source, /const VERSION = "pastafari-static-pwa-hardening-[^"]+";/\);',
        'assert.match(source, /const VERSION = "pastafari-static-pwa-hardening-24-about-retranslation";/);',
        s,
        count=1,
    )
    if "OPTIONAL_ARTICLE_PATH" not in s:
        needle = 'assert.match(source, /const OPTIONAL_LOCALE_PATH = \/\\^\\\\\/i18n\\\\\/locales/);'
        # If the exact source-literal shape changes, the final CI will catch it; add a simple semantic assertion nearby.
        idx = s.find('assert.match(source, /url\\.search === LOCALE_REVISION_SEARCH/);')
        require(idx >= 0, "pwa test locale revision assertion missing")
        s = s[:idx] + 'assert.match(source, /const OPTIONAL_ARTICLE_PATH/);\n  assert.match(source, /url\\.search === ARTICLE_REVISION_SEARCH/);\n  ' + s[idx:]
    if 'isOptionalArticleRequest\\(url\\)' not in s:
        idx = s.find('assert.match(source, /if \\(isOptionalLocaleRequest\\(url\\)\\)/);')
        if idx >= 0:
            end = s.find("\n", idx)
            s = s[:end+1] + '  assert.match(source, /if \\(isOptionalArticleRequest\\(url\\)\\)/);\n' + s[end+1:]
    write(path, s)

def main() -> int:
    manifest = json.loads(read(MANIFEST))
    locales = manifest["locales"]
    require(len(locales) == 72, f"Expected 72 non-Hebrew locales, got {len(locales)}")
    require(len({row["code"] for row in locales}) == 72, "Locale codes are not unique")
    verify_all(locales)
    install_pages(locales)
    write(ROOT / "docs/about/content/registry.js", registry_source(locales))
    patch_about_runtime()
    patch_service_worker()
    patch_pwa_test()
    print("Installed 72 translated About pages and 72 translated Monster pages behind a 73-locale registry.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
