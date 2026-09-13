# Pastafari Calendar 1.4.1

Version 1.4.1 is the corrective canonical release after the saved-sum post-stir correction.

The canonical final 12 post-stirs use:

```text
S = sum(oldBowls)
R = SAVE(S + 149*r)
permutationRank = 1 + ((R - 1) mod 720)
u = old[B] + 3*old[P] + 5*old[N] + R + r + position^2
new[B] = SAVE(u^2 + 7*old[P]*old[N])
```

All six new bowls are computed from the same old six-bowl snapshot and committed together.

Release 1.4.0 remains preserved as historical/superseded provenance because its tagged reference chain used the raw-sum mutant inside `u`. Version 1.4.1 carries the saved-sum implementation and fresh release-closure evidence.

This release does not rewrite or move the historical 1.4.0 tag.
