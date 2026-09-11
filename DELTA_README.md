# Canonical saved-sum CI-closure follow-up delta

Base / observed HEAD: `385f5ef445269b0fef2cbffd0bc07c98f6971c32`.

This follow-up does **not** change the canonical saved-sum algorithm again. It closes CI fallout discovered after the first correction: stale expected tuples/hashes/cache-version assertions, the COBOL local checksum manifest, officially rebuilt standalone artifacts, and Update 18's memory/closure harness.

Update 18 Node evidence now has 150/150 passing records, zero real mismatches, zero errors, and zero timeouts. The committed Node-stage report intentionally remains `INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE` until the CI browser-smoke job regenerates current browser/Worker/standalone evidence and promotes it to `INTEGRATION_PASS`. The old browser evidence from the pre-saved-sum world is explicitly marked stale rather than reused.

The previous visual-regression failure (0.0983%, 1,313 pixels) is not papered over here: the supplied CI images show no content/layout change and the changed region is a small background/rasterization patch. A fresh CI visual rerun is still required.

Upload these files over the repository at the paths stored in this archive. No deletions are required.
