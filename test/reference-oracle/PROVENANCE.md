# Reference-oracle provenance

Normative source: **“לוח סוד הרוטב ושמות הימים”**  
Repository-source SHA-256: `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`  
Canonical source ID already used by the repository: `PASTAFARI-SCROLL-2026-08-16-D36B0C94`.

Line numbers below refer to the byte-identical repository copy under `sources/`
with the SHA-256 above. They are documentation pointers only; `reference.mjs`
does not parse the source file at runtime.

| Reference stage | Scroll lines | Implemented rule / convention |
| --- | ---: | --- |
| Foundation/day numbering | 11–77 | Foundation is continuous-Gregorian index `-15,055,671`, where Gregorian `0001-01-01 = 1`; project astronomical JDN therefore adds `1,721,425`, giving `-13,334,246`. Foundation day-number is 1; prior days are positive even numbers; later days are positive odd numbers. |
| Canonical counters | 78–111 | Calculation and target use the day-number rule; distance is inclusive (`abs(c-t)+1` on the linear JDN axis); sum is the two day-numbers; direction is 1/2/3 for target before/equal/after calculation. |
| Great number | 149–163 | Start from 1, double 127 times, subtract 1: `M = 2^127 - 1`. Exact unbounded integer arithmetic is used. |
| Kept/ordinary remainder | 166–224 | `keep(x) = ((x-1) mod M)+1`, with mathematical non-negative modulo. Ordinary remainder uses `0..n-1`. |
| Stone table | 227–283 | First row is `(17,29,43,71,101)`; each next row is computed simultaneously from the previous row, then kept. Exactly 46 rows are generated. |
| Hidden drops | 286–354 | Seven hidden drops use the explicit coefficient rows, the corresponding visible-drop stone row, then seven grinds with stone cycle wheat/barley/salt/bitter/red/wheat/barley. Hidden index means distance before visible drop 1. |
| Visible drops | 357–425 | Visible drops 1..46 use the previous, third-previous and seventh-previous values, crossing into hidden drops exactly as lines 361–367 specify. Eleven grind coefficient/stone rows are applied. |
| Initial bowls | 428–458 | Six bowl names are fixed identities 1..6. Each initial bowl uses its prime `(17,19,23,29,31,37)`, squares the full sum, adds bowl number, then keeps. |
| Drop permutation | 462–495 | 1-based lexicographic permutation rank over bowl identities 1..6. Rank is ordinary `((drop-1) mod 720)+1`. “Place” is position in the selected permutation, not bowl identity. |
| Direct pours | 498–522 | Only places 1..3 receive direct pours using wheat/barley/salt and multipliers 3/5/7. Old bowl content is used. |
| Per-drop stir | 525–553 | Circular neighbors are by selected permutation. All six new bowls are simultaneous. `u = old + 2*prev + 3*next + direct + drop + place-stone`; output adds `5*prev*next + dropIndex*place`, then keeps. |
| Twelve post-pour stirs | 556–598 | At the start of each round, raw `bowlSum = sum(old bowls)` is saved. Separately `orderNumber = keep(bowlSum + 149*round)` selects the permutation. Each bowl’s `u` adds the **saved raw bowlSum**, round and place²; output adds `7*prev*next`, then keeps. Lines 574 and 587 independently repeat that the saved sum, not the kept order number, is used in `u`. |
| Response ring | 601–666 | Seals are numeric. “Next bowl” follows the permutation from visible drop 46, not a post-stir permutation. First response and direction use the stated constants 181/179 and 193/197; odd direction means +1, even means -1 around `1..M`. |
| Uniform short choice | 669–687 | Rejection limit is largest multiple of `n` not exceeding `M`; accept response `<= limit`, then ordinary `((response-1) mod n)+1`. |
| Wide choice interface | 689–715 | Interface reserved but **not implemented in Update 1**. It fails explicitly. |
| Gate gaps | 733–770 | Calculation JDN remains Foundation. For gap index `+k`, target is Foundation + `k`; for `-k`, target is Foundation - `k`. Ask bowl 1 with seal 1, choose uniformly among 922, add 41. Gate 0 is Foundation; diagnostic traversal is direct and uncached. |
| Year candidates / selection | 773 onward | Interface present; **not implemented in Update 1**. |
| Cutlet structure | 820 onward | Interface present; **not implemented in Update 1**. |
| Month structure | 889 onward | Interface present; **not implemented in Update 1**. |
| Final Pastafarian tuple | 1027 onward | Interface present; **not implemented in Update 1**. |

## Representation decisions

- All semantic integers in `reference.mjs` are ECMAScript `BigInt` unless an
  index is necessarily small and bounded (array/permutation indexes and a
  diagnostic gate index).
- JSON output uses decimal strings for all BigInts; no floating-point semantic
  arithmetic is used.
- Arrays representing bowls are always in fixed bowl-identity order 1..6.
  Permutation arrays are 1-based bowl identities in place order.
- All simultaneous updates copy old state before calculating any new state.
- The reference has no cache whose contents can alter semantics.
- No source-code name, fixture, generated table or prior reverse-engineering
  result is used to derive a normative value.
