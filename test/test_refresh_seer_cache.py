"""Safety regression tests for scheduled Seer snapshot publishing."""
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest import mock

SOURCE = Path(__file__).resolve().parents[1] / "scripts/refresh-seer-date-cache.py"
spec = importlib.util.spec_from_file_location("seer_refresh_tested", SOURCE)
seer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(seer)


def data(jdn=2461359, stamp="2026-11-14T08:00:00Z"):
    return {
        "calculationAt": stamp,
        "calculationDay": {"jdn": str(jdn)},
        "targetDay": {"jdn": str(jdn)},
        "pastafarianDate": {
            "year": "5000",
            "cutlet": {"canonicalIndex": 17, "day": 406},
            "month": {"canonicalIndex": 18, "day": 115},
        },
        "cacheMeta": {"mode": "automated-seer-snapshot"},
    }


def write(path, contents):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(contents, encoding="utf-8")


def manifest(root, names):
    return "".join(f"{hashlib.sha256((root / name).read_bytes()).hexdigest()}  ./{name}\n"
                   for name in sorted(names, key=lambda s: s.encode("utf-8")))


class SeerIntegrity(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix="seer-hash-test-")
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.file = self.root / "docs/api/seer-now.json"
        self.docs = self.root / "docs/SHA256SUMS.txt"
        self.root_sha = self.root / "SHA256SUMS.txt"
        write(self.file, json.dumps(data(), indent=2) + "\n")
        write(self.root / "docs/other.txt", "original docs\n")
        write(self.root / "notes.txt", "original notes\n")
        write(self.docs, manifest(self.root / "docs",
                                  ["api/seer-now.json", "other.txt"]))
        write(self.root_sha, manifest(self.root, [
            "docs/SHA256SUMS.txt", "docs/api/seer-now.json",
            "docs/other.txt", "notes.txt",
        ]))
        subprocess.run(["git", "init", "-q", str(self.root)], check=True)
        subprocess.run(["git", "-C", str(self.root), "add", "-A"], check=True)

    def change_date(self):
        write(self.file, json.dumps(data(2461360, "2026-11-15T08:00:00Z"),
                                    indent=2) + "\n")

    def test_changed_date_updates_exactly_three_checksums(self):
        old_docs = dict(seer.read_manifest(self.docs))
        old_root = dict(seer.read_manifest(self.root_sha))
        self.change_date()
        self.assertTrue(seer.reconcile_seer_manifest_chain(self.root))
        new_docs = dict(seer.read_manifest(self.docs))
        new_root = dict(seer.read_manifest(self.root_sha))
        for rel, sha in old_docs.items():
            if rel != "api/seer-now.json":
                self.assertEqual(new_docs[rel], sha)
        for rel, sha in old_root.items():
            if rel not in ("docs/api/seer-now.json", "docs/SHA256SUMS.txt"):
                self.assertEqual(new_root[rel], sha)
        self.assertEqual(new_docs["api/seer-now.json"], seer.file_digest(self.file))
        self.assertEqual(new_root["docs/api/seer-now.json"], seer.file_digest(self.file))
        self.assertEqual(new_root["docs/SHA256SUMS.txt"], seer.file_digest(self.docs))
        self.assertFalse(seer.reconcile_seer_manifest_chain(self.root))

    def test_unrelated_corruption_blocks_without_manifest_rewrite(self):
        self.change_date()
        write(self.root / "docs/other.txt", "tampered\n")
        original_docs = self.docs.read_bytes()
        original_root = self.root_sha.read_bytes()
        with self.assertRaisesRegex(ValueError, "Unrelated docs checksum drift"):
            seer.reconcile_seer_manifest_chain(self.root)
        self.assertEqual(original_docs, self.docs.read_bytes())
        self.assertEqual(original_root, self.root_sha.read_bytes())

    def test_manifest_duplicate_entry_is_rejected(self):
        with self.docs.open("a", encoding="utf-8") as target:
            target.write(self.docs.read_text().splitlines(keepends=True)[0])
        with self.assertRaisesRegex(ValueError, "Duplicate manifest path"):
            seer.reconcile_seer_manifest_chain(self.root)

    def test_manifest_missing_required_entry_is_rejected(self):
        rows = [row for row in self.root_sha.read_text().splitlines(keepends=True)
                if not row.endswith("./docs/api/seer-now.json\n")]
        write(self.root_sha, "".join(rows))
        with self.assertRaisesRegex(ValueError, "Missing required"):
            seer.reconcile_seer_manifest_chain(self.root)

    def test_unlisted_git_tracked_file_is_rejected(self):
        write(self.root / "unlisted.txt", "new\n")
        subprocess.run(["git", "-C", str(self.root), "add", "unlisted.txt"], check=True)
        with self.assertRaisesRegex(ValueError, "coverage mismatch"):
            seer.reconcile_seer_manifest_chain(self.root)

    def test_same_date_is_unchanged_even_with_newer_refresh_time(self):
        original = self.file.read_bytes()
        with mock.patch.object(seer, "OUTPUT", self.file), \
             mock.patch.object(seer, "fetch_seer", return_value=data(stamp="2026-11-14T08:04:00Z")), \
             mock.patch.object(seer, "reconcile_seer_manifest_chain") as reconcile:
            seer.main()
            reconcile.assert_not_called()
        self.assertEqual(original, self.file.read_bytes())

    def test_older_timestamp_cannot_replace_newer_snapshot(self):
        original = self.file.read_bytes()
        with mock.patch.object(seer, "OUTPUT", self.file), \
             mock.patch.object(seer, "fetch_seer",
                               return_value=data(2461360, "2026-11-14T07:59:00Z")), \
             mock.patch.object(seer, "reconcile_seer_manifest_chain") as reconcile:
            with self.assertRaisesRegex(RuntimeError, "Refusing to replace newer"):
                seer.main()
            reconcile.assert_not_called()
        self.assertEqual(original, self.file.read_bytes())

    def test_git_push_rejects_stale_writer_without_force(self):
        with tempfile.TemporaryDirectory(prefix="seer-race-") as directory:
            root = Path(directory)
            remote = root / "origin.git"
            a = root / "a"
            b = root / "b"
            subprocess.run(["git", "init", "-q", "--bare", str(remote)], check=True)
            subprocess.run(["git", "init", "-q", str(a)], check=True)
            for name in ("a", "b"):
                if name == "a":
                    work = a
                else:
                    subprocess.run(["git", "clone", "-q", "--branch", "main",
                                    str(remote), str(b)], check=True)
                    work = b
                subprocess.run(["git", "-C", str(work), "config", "user.email",
                                "test@example.invalid"], check=True)
                subprocess.run(["git", "-C", str(work), "config", "user.name",
                                "Test"], check=True)
                if name == "a":
                    write(a / "date.txt", "old\n")
                    subprocess.run(["git", "-C", str(a), "add", "-A"], check=True)
                    subprocess.run(["git", "-C", str(a), "commit", "-qm", "initial"], check=True)
                    subprocess.run(["git", "-C", str(a), "remote", "add",
                                    "origin", str(remote)], check=True)
                    subprocess.run(["git", "-C", str(a), "push", "-q", "origin",
                                    "HEAD:main"], check=True)
            write(a / "date.txt", "newer\n")
            subprocess.run(["git", "-C", str(a), "commit", "-qam", "newer"], check=True)
            subprocess.run(["git", "-C", str(a), "push", "-q", "origin",
                            "HEAD:main"], check=True)
            write(b / "date.txt", "stale\n")
            subprocess.run(["git", "-C", str(b), "commit", "-qam", "stale"], check=True)
            race = subprocess.run(["git", "-C", str(b), "push", "origin", "HEAD:main"],
                                  capture_output=True, text=True)
            self.assertNotEqual(race.returncode, 0)
            self.assertEqual(subprocess.check_output(["git", "--git-dir", str(remote),
                            "show", "main:date.txt"], text=True), "newer\n")


if __name__ == "__main__":
    unittest.main()
