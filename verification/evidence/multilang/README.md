# Multilanguage verification evidence

This directory stores raw evidence that is useful to preserve in addition to the
reproducible tests under `implementations/`.

`ruby-differential-20260814-125717.log` is the complete console log supplied from
a Windows run using Ruby 4.0.6. It records 16/16 known-vector passes and all
10,000/10,000 deterministic differential cases passing.

For C++20, Python 3, C17 and Java, the executable results are summarized in
`implementations/docs/TEST_MATRIX.md`; the runnable test sources and shared corpus
are included in the same upload.

`bundle-validation-2026-08-16.md` records the package-level smoke validation and
states explicitly which suites were re-run during packaging and which accepted
results are retained from the earlier remediation audit.
