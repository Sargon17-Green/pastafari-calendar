/**
 * Clear, spec-derived Pastafari reference oracle.
 *
 * Normative source: "לוח סוד הרוטב ושמות הימים"
 * SHA-256: d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96
 *
 * This module intentionally imports no project implementation, generated blob,
 * checkpoint table, fixture, or canonical-vector corpus.  It is deliberately
 * straightforward and uses only ECMAScript BigInt arithmetic.
 */

export const SPEC = Object.freeze({
  title: "לוח סוד הרוטב ושמות הימים",
  sha256: "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96",
  canonicalId: "PASTAFARI-SCROLL-2026-08-16-D36B0C94",
});

// Scroll, tablet 5: 127 doublings of one, then subtract one.
export const GREAT_NUMBER = (1n << 127n) - 1n;

// Scroll, tablet 1, coordinate conversion note:
// continuous Gregorian index has 0001-01-01 = 1 and Foundation = -15,055,671.
// Astronomical integer JDN used by the project has 0001-01-01 = 1,721,426,
// therefore Foundation JDN = -15,055,671 + 1,721,425 = -13,334,246.
export const FOUNDATION_JDN = -13_334_246n;

// Scroll, tablet 17 and the binding correction in footnote 13.
export const MIN_YEAR_DAYS = 252n;
export const MAX_YEAR_DAYS = 5_778n;
export const MIN_YEAR_GAPS = 6;

export const CUTLET_NAMES = Object.freeze([
  "ארד", "שועל", "כליה", "לגש", "מחשבה", "ארבעה חלקים מתשעה",
  "פַּלְגּוּרַשׁ", "גומא", "אשכול", "עקרב", "אפר", "חיטה", "נהר",
  "צחוק", "אכד", "קרן", "הכד הריק",
]);

export const MONTH_NAMES = Object.freeze([
  "טין", "רימון", "מרפק", "קנאה", "ארידו", "משחת־שיניים",
  "שלושה חלקים מחמישה", "כַּרְשׁוּמַב", "נמר", "בדיל", "ערפל", "לבונה",
  "כישור", "צלע", "חרוב", "אורוק", "בושה", "גמל", "נחושת", "באר",
  "חלמון", "כוכב", "דבש", "טחול", "אבן־גיר", "שמחה", "תאנה", "נינוה",
  "צפרדע", "זפת", "נר", "הדלת הסגורה", "שומשום", "עורף", "כסף", "שושן",
  "סערה", "חמור", "קמח", "חרטה", "בבל", "לשון", "פשתן", "מלח", "אגס",
  "קשת", "חול",
]);

const STONE_NAMES = Object.freeze(["wheat", "barley", "salt", "bitter", "red"]);
const INITIAL_STONES = Object.freeze([17n, 29n, 43n, 71n, 101n]);
const BOWL_PRIMES = Object.freeze([17n, 19n, 23n, 29n, 31n, 37n]);
const PLACE_STONES = Object.freeze([0, 1, 2, 3, 4, 0]);
const DIRECT_STONES = Object.freeze([0, 1, 2]);
const DIRECT_MULTIPLIERS = Object.freeze([3n, 5n, 7n]);
const HIDDEN_GRIND_STONES = Object.freeze([0, 1, 2, 3, 4, 0, 1]);
const VISIBLE_GRINDS = Object.freeze([
  Object.freeze([3n, 5n, 7n, 11n, 0]),
  Object.freeze([5n, 7n, 11n, 13n, 1]),
  Object.freeze([7n, 11n, 13n, 17n, 2]),
  Object.freeze([11n, 13n, 17n, 19n, 3]),
  Object.freeze([13n, 17n, 19n, 23n, 4]),
  Object.freeze([17n, 19n, 23n, 29n, 0]),
  Object.freeze([19n, 23n, 29n, 31n, 1]),
  Object.freeze([23n, 29n, 31n, 37n, 2]),
  Object.freeze([29n, 31n, 37n, 41n, 3]),
  Object.freeze([31n, 37n, 41n, 43n, 4]),
  Object.freeze([37n, 41n, 43n, 47n, 0]),
]);
const HIDDEN_COEFFICIENTS = Object.freeze([
  Object.freeze([3n, 4n, 6n, 8n]),
  Object.freeze([5n, 7n, 10n, 12n]),
  Object.freeze([7n, 10n, 14n, 16n]),
  Object.freeze([9n, 13n, 18n, 20n]),
  Object.freeze([11n, 16n, 22n, 24n]),
  Object.freeze([13n, 19n, 26n, 28n]),
  Object.freeze([15n, 22n, 30n, 32n]),
]);

export class ReferenceNotImplementedError extends Error {
  constructor(stage) {
    super(`Reference stage not implemented: ${stage}`);
    this.name = "ReferenceNotImplementedError";
    this.code = "ERR_REFERENCE_NOT_IMPLEMENTED";
    this.stage = stage;
  }
}

function requireBigInt(value, name) {
  if (typeof value === "bigint") return value;
  if (typeof value === "string" && /^[+-]?\d+$/.test(value)) return BigInt(value);
  if (typeof value === "number" && Number.isSafeInteger(value)) return BigInt(value);
  throw new TypeError(`${name} must be a bigint, safe integer, or decimal integer string.`);
}

export function positiveMod(value, modulus) {
  const v = requireBigInt(value, "value");
  const m = requireBigInt(modulus, "modulus");
  if (m <= 0n) throw new RangeError("modulus must be positive");
  const r = v % m;
  return r < 0n ? r + m : r;
}

// Scroll, tablet 6: kept remainder is in 1..M, with exact multiples mapped to M.
export function keep(value) {
  return positiveMod(requireBigInt(value, "value") - 1n, GREAT_NUMBER) + 1n;
}

// Scroll, tablet 1: Foundation=1, earlier days even, later days odd.
export function dayNumber(jdn) {
  const d = requireBigInt(jdn, "jdn");
  if (d === FOUNDATION_JDN) return 1n;
  if (d > FOUNDATION_JDN) return 2n * (d - FOUNDATION_JDN) + 1n;
  return 2n * (FOUNDATION_JDN - d);
}

// Scroll, tablet 2.  Distance is counted on the linear-day axis, inclusively.
export function canonicalCounters(calculationJdn, targetJdn) {
  const c = requireBigInt(calculationJdn, "calculationJdn");
  const t = requireBigInt(targetJdn, "targetJdn");
  const calculation = dayNumber(c);
  const target = dayNumber(t);
  const distance = (c >= t ? c - t : t - c) + 1n;
  const sum = calculation + target;
  const direction = t < c ? 1n : t === c ? 2n : 3n;
  return Object.freeze({ calculation, target, distance, sum, direction });
}

function cloneBigints(values) {
  return values.map((value) => BigInt(value));
}

// Scroll, tablet 7.
export function generateStones(count = 46) {
  if (!Number.isSafeInteger(count) || count < 1) throw new RangeError("count must be a positive safe integer");
  const rows = new Array(count);
  rows[0] = cloneBigints(INITIAL_STONES);
  for (let index = 1; index < count; index += 1) {
    const old = rows[index - 1];
    const dropNumber = BigInt(index + 1);
    rows[index] = [
      keep(old[0] * old[0] + 3n * old[1] + dropNumber),
      keep(old[1] * old[1] + 5n * old[2] + old[0]),
      keep(old[2] * old[2] + 7n * old[3] + old[1]),
      keep(old[3] * old[3] + 11n * old[4] + old[2]),
      keep(old[4] * old[4] + 13n * old[0] + old[3]),
    ];
  }
  return rows;
}

// Pure reference optimization: the 46 stone rows depend on no input. Cache one
// deeply frozen copy so large independent gate traversals do not allocate the
// same immutable table tens of thousands of times. This changes no semantics.
const SAUCE_STONES = Object.freeze(generateStones(46).map((row) => Object.freeze([...row])));

// 1-based lexicographic rank among permutations of [1,2,3,4,5,6].
// Scroll, tablet 11.
export function bowlPermutation(rank) {
  let r = requireBigInt(rank, "rank");
  if (r < 1n || r > 720n) throw new RangeError("rank must be in 1..720");
  r -= 1n;
  const available = [1, 2, 3, 4, 5, 6];
  const result = [];
  const factorials = [1n, 1n, 2n, 6n, 24n, 120n, 720n];
  for (let remaining = 6; remaining >= 1; remaining -= 1) {
    const block = factorials[remaining - 1];
    const choice = Number(r / block);
    r %= block;
    result.push(available.splice(choice, 1)[0]);
  }
  return result;
}

function makeHiddenDrops(counters, stones, detail) {
  const hiddenByDistance = new Array(8); // slots 1..7
  const trace = [];
  for (let hidden = 1; hidden <= 7; hidden += 1) {
    const [a, b, c, d] = HIDDEN_COEFFICIENTS[hidden - 1];
    const s = stones[hidden - 1];
    let value = keep(
      counters.calculation
      + a * counters.target
      + b * counters.distance
      + c * counters.sum
      + d * counters.direction
      + s.reduce((total, stone) => total + stone, 0n),
    );
    const initial = value;
    const grinds = detail === "full" ? [] : null;
    for (let grind = 1; grind <= 7; grind += 1) {
      const old = value;
      const stoneIndex = HIDDEN_GRIND_STONES[grind - 1];
      value = keep(old * old + 3n * old + s[stoneIndex] + BigInt(grind));
      if (grinds) {
        grinds.push(Object.freeze({
          index: grind,
          stone: STONE_NAMES[stoneIndex],
          input: old,
          output: value,
        }));
      }
    }
    hiddenByDistance[hidden] = value;
    trace.push(Object.freeze({
      hidden,
      initial,
      grinds,
      value,
    }));
  }
  return { hiddenByDistance, trace };
}

function initialBowls(counters) {
  const bowls = new Array(6);
  for (let i = 0; i < 6; i += 1) {
    const bowlNumber = BigInt(i + 1);
    const x = counters.calculation
      + counters.target * bowlNumber
      + counters.distance
      + counters.sum
      + counters.direction
      + BOWL_PRIMES[i] * BOWL_PRIMES[i];
    bowls[i] = keep(x * x + bowlNumber);
  }
  return bowls;
}

function sequenceValue(sequence, hiddenByDistance, visibleIndex) {
  if (visibleIndex >= 1) return sequence[visibleIndex];
  const hiddenDistance = 1 - visibleIndex;
  return hiddenByDistance[hiddenDistance];
}

function computeVisibleDropsAndBowls(counters, stones, hiddenByDistance, detail) {
  const sequence = new Array(47); // visible values in slots 1..46
  let bowls = initialBowls(counters);
  const initial = cloneBigints(bowls);
  const dropsTrace = detail === "summary" ? null : [];
  let lastDropPermutation = null;

  for (let drop = 1; drop <= 46; drop += 1) {
    const ib = BigInt(drop);
    const s = stones[drop - 1];
    const previous = sequenceValue(sequence, hiddenByDistance, drop - 1);
    const thirdPrevious = sequenceValue(sequence, hiddenByDistance, drop - 3);
    const seventhPrevious = sequenceValue(sequence, hiddenByDistance, drop - 7);

    let value = keep(
      s[0] * counters.calculation
      + s[1] * counters.target
      + s[2] * counters.distance
      + s[3] * counters.sum
      + s[4] * counters.direction
      + previous
      + 3n * thirdPrevious
      + 5n * seventhPrevious
      + ib,
    );
    const paste = value;
    const grindTrace = detail === "full" ? [] : null;
    for (let grind = 0; grind < VISIBLE_GRINDS.length; grind += 1) {
      const [a, b, c, d, stoneIndex] = VISIBLE_GRINDS[grind];
      const old = value;
      value = keep(
        old * old
        + a * old
        + b * previous
        + c * thirdPrevious
        + d * seventhPrevious
        + s[stoneIndex],
      );
      if (grindTrace) {
        grindTrace.push(Object.freeze({
          index: grind + 1,
          coefficients: Object.freeze([a, b, c, d]),
          stone: STONE_NAMES[stoneIndex],
          input: old,
          output: value,
        }));
      }
    }
    sequence[drop] = value;

    const permutationRank = positiveMod(value - 1n, 720n) + 1n;
    const permutation = bowlPermutation(permutationRank);
    lastDropPermutation = permutation;
    const oldBowls = cloneBigints(bowls);
    const directByBowl = new Array(6).fill(0n);
    const directTrace = [];
    for (let place = 0; place < 3; place += 1) {
      const bowlNumber = permutation[place];
      const bowlIndex = bowlNumber - 1;
      const stoneIndex = DIRECT_STONES[place];
      const direct = keep(
        value * value
        + s[stoneIndex] * oldBowls[bowlIndex]
        + DIRECT_MULTIPLIERS[place] * ib,
      );
      directByBowl[bowlIndex] = direct;
      if (detail !== "summary") {
        directTrace.push(Object.freeze({
          place: place + 1,
          bowl: bowlNumber,
          stone: STONE_NAMES[stoneIndex],
          value: direct,
        }));
      }
    }

    const nextBowls = new Array(6);
    const stirs = detail === "summary" ? null : [];
    for (let place = 0; place < 6; place += 1) {
      const bowlNumber = permutation[place];
      const bowlIndex = bowlNumber - 1;
      const previousBowlNumber = permutation[(place + 5) % 6];
      const nextBowlNumber = permutation[(place + 1) % 6];
      const previousIndex = previousBowlNumber - 1;
      const nextIndex = nextBowlNumber - 1;
      const stoneIndex = PLACE_STONES[place];
      const u = oldBowls[bowlIndex]
        + 2n * oldBowls[previousIndex]
        + 3n * oldBowls[nextIndex]
        + directByBowl[bowlIndex]
        + value
        + s[stoneIndex];
      const output = keep(
        u * u
        + 5n * oldBowls[previousIndex] * oldBowls[nextIndex]
        + ib * BigInt(place + 1),
      );
      nextBowls[bowlIndex] = output;
      if (stirs) {
        stirs.push(Object.freeze({
          place: place + 1,
          bowl: bowlNumber,
          previousBowl: previousBowlNumber,
          nextBowl: nextBowlNumber,
          stone: STONE_NAMES[stoneIndex],
          u,
          output,
        }));
      }
    }
    bowls = nextBowls;

    if (dropsTrace) {
      dropsTrace.push(Object.freeze({
        index: drop,
        paste,
        grinds: grindTrace,
        value,
        permutationRank,
        permutation: Object.freeze([...permutation]),
        bowlsBefore: Object.freeze(oldBowls),
        directPours: Object.freeze(directTrace),
        stirs: stirs ? Object.freeze(stirs) : null,
        bowlsAfter: Object.freeze(cloneBigints(bowls)),
      }));
    }
  }

  return {
    sequence,
    initialBowls: initial,
    bowls,
    dropsTrace,
    lastDropPermutation,
  };
}

// Scroll, tablet 14.  Important provenance point: the sum of six old bowls is
// retained as bowlSum for the stir.  orderNumber is separately keep(bowlSum +
// 149*round).  The two quantities are not interchangeable (lines 562-579 and
// the repeated clarification at lines 582-596 of the repository copy).
function postStirs(startBowls, detail) {
  let bowls = cloneBigints(startBowls);
  const rounds = detail === "summary" ? null : [];
  for (let round = 1; round <= 12; round += 1) {
    const roundBig = BigInt(round);
    const oldBowls = cloneBigints(bowls);
    const bowlSum = oldBowls.reduce((total, value) => total + value, 0n);
    const orderNumber = keep(bowlSum + 149n * roundBig);
    const permutationRank = positiveMod(orderNumber - 1n, 720n) + 1n;
    const permutation = bowlPermutation(permutationRank);
    const nextBowls = new Array(6);
    const stirs = detail === "summary" ? null : [];

    for (let place = 0; place < 6; place += 1) {
      const bowlNumber = permutation[place];
      const bowlIndex = bowlNumber - 1;
      const previousBowlNumber = permutation[(place + 5) % 6];
      const nextBowlNumber = permutation[(place + 1) % 6];
      const previousIndex = previousBowlNumber - 1;
      const nextIndex = nextBowlNumber - 1;
      const u = oldBowls[bowlIndex]
        + 3n * oldBowls[previousIndex]
        + 5n * oldBowls[nextIndex]
        + bowlSum
        + roundBig
        + BigInt((place + 1) ** 2);
      const output = keep(
        u * u + 7n * oldBowls[previousIndex] * oldBowls[nextIndex],
      );
      nextBowls[bowlIndex] = output;
      if (stirs) {
        stirs.push(Object.freeze({
          place: place + 1,
          bowl: bowlNumber,
          previousBowl: previousBowlNumber,
          nextBowl: nextBowlNumber,
          u,
          output,
        }));
      }
    }
    bowls = nextBowls;
    if (rounds) {
      rounds.push(Object.freeze({
        round,
        bowlSum,
        orderNumber,
        permutationRank,
        permutation: Object.freeze([...permutation]),
        bowlsBefore: Object.freeze(oldBowls),
        stirs: Object.freeze(stirs),
        bowlsAfter: Object.freeze(cloneBigints(bowls)),
      }));
    }
  }
  return { bowls, rounds };
}

export function sauce(calculationJdn, targetJdn, options = {}) {
  const detail = options.detail ?? "summary";
  if (!["summary", "sauce", "full"].includes(detail)) {
    throw new RangeError("detail must be summary, sauce, or full");
  }
  const c = requireBigInt(calculationJdn, "calculationJdn");
  const t = requireBigInt(targetJdn, "targetJdn");
  const counters = canonicalCounters(c, t);
  const stones = SAUCE_STONES;
  const hidden = makeHiddenDrops(counters, stones, detail);
  const visible = computeVisibleDropsAndBowls(counters, stones, hidden.hiddenByDistance, detail);
  const after = postStirs(visible.bowls, detail);

  return Object.freeze({
    stage: "sauce",
    input: Object.freeze({ calculationJdn: c, targetJdn: t }),
    counters,
    initialBowls: Object.freeze(visible.initialBowls),
    hiddenDrops: detail === "summary" ? null : Object.freeze(hidden.trace),
    drops: visible.dropsTrace ? Object.freeze(visible.dropsTrace) : null,
    postStirs: after.rounds ? Object.freeze(after.rounds) : null,
    final: Object.freeze({
      bowls: Object.freeze(cloneBigints(after.bowls)),
      lastDropPermutation: Object.freeze([...visible.lastDropPermutation]),
    }),
  });
}

// Scroll, tablets 15-16.
export function responseDescriptor(sauceResult, bowlNumber, seal) {
  if (!Number.isSafeInteger(bowlNumber) || bowlNumber < 1 || bowlNumber > 6) {
    throw new RangeError("bowlNumber must be in 1..6");
  }
  const sealBig = requireBigInt(seal, "seal");
  const order = sauceResult.final.lastDropPermutation;
  const place = order.indexOf(bowlNumber);
  if (place < 0) throw new TypeError("sauce result has no valid last-drop permutation");
  const nextBowlNumber = order[(place + 1) % 6];
  const bowl = sauceResult.final.bowls[bowlNumber - 1];
  const next = sauceResult.final.bowls[nextBowlNumber - 1];
  const bowlSix = sauceResult.final.bowls[5];
  const firstBase = bowl + sealBig + 181n;
  const first = keep(firstBase * firstBase + 179n * next + sealBig);
  const directionBase = first + sealBig + 1n + 193n;
  const directionNumber = keep(
    directionBase * directionBase + 193n * first + 197n * bowlSix,
  );
  return Object.freeze({
    bowlNumber,
    nextBowlNumber,
    seal: sealBig,
    first,
    directionNumber,
    direction: directionNumber % 2n === 1n ? "forward" : "backward",
  });
}

export function responseAt(descriptor, offset) {
  if (!Number.isSafeInteger(offset) || offset < 0) throw new RangeError("offset must be a non-negative safe integer");
  const delta = BigInt(offset);
  if (descriptor.direction === "forward") {
    return positiveMod(descriptor.first - 1n + delta, GREAT_NUMBER) + 1n;
  }
  return positiveMod(descriptor.first - 1n - delta, GREAT_NUMBER) + 1n;
}

export function chooseUniform(sauceResult, bowlNumber, seal, count) {
  const n = requireBigInt(count, "count");
  if (n < 1n) throw new RangeError("count must be positive");
  const descriptor = responseDescriptor(sauceResult, bowlNumber, seal);

  if (n <= GREAT_NUMBER) {
    const acceptanceLimit = (GREAT_NUMBER / n) * n;
    let offset = 0;
    while (true) {
      const candidate = responseAt(descriptor, offset);
      if (candidate <= acceptanceLimit) {
        const choice = positiveMod(candidate - 1n, n) + 1n;
        return Object.freeze({
          mode: "short",
          descriptor,
          acceptanceLimit,
          acceptedResponse: candidate,
          discarded: offset,
          choice,
        });
      }
      offset += 1;
    }
  }

  // Scroll, tablet 16 wide choice.  The response digits are interpreted in
  // little-endian base GREAT_NUMBER after subtracting one from each 1..M
  // response.  Rejection then advances by one in the same wide circular space;
  // it does not consume a fresh unrelated response tuple.
  let width = 1;
  let space = GREAT_NUMBER;
  while (space < n) {
    space *= GREAT_NUMBER;
    width += 1;
  }
  let wideFirst = 1n;
  let weight = 1n;
  const digits = [];
  for (let offset = 0; offset < width; offset += 1) {
    const response = responseAt(descriptor, offset);
    digits.push(response);
    wideFirst += (response - 1n) * weight;
    weight *= GREAT_NUMBER;
  }
  const acceptanceLimit = (space / n) * n;
  let accepted = wideFirst;
  let discarded = 0n;
  if (accepted > acceptanceLimit) {
    discarded = descriptor.direction === "forward"
      ? space - accepted + 1n
      : accepted - acceptanceLimit;
    accepted = descriptor.direction === "forward" ? 1n : acceptanceLimit;
  }
  const choice = positiveMod(accepted - 1n, n) + 1n;
  return Object.freeze({
    mode: "wide",
    descriptor,
    width,
    space,
    digits: Object.freeze(digits),
    wideFirst,
    acceptanceLimit,
    acceptedResponse: accepted,
    discarded,
    choice,
  });
}

// Scroll, tablet 17. Gate gaps are derived directly from fresh sauce calls;
// no precomputed gaps/checkpoints are consulted.
export function gateGap(index, options = {}) {
  if (!Number.isSafeInteger(index) || index === 0) {
    throw new RangeError("gate index must be a non-zero safe integer");
  }
  const targetJdn = FOUNDATION_JDN + BigInt(index);
  const s = sauce(FOUNDATION_JDN, targetJdn, { detail: options.detail ?? "summary" });
  const choice = chooseUniform(s, 1, 1n, 922n);
  const gap = choice.choice + 41n;
  return Object.freeze({
    index,
    targetJdn,
    gap,
    choice,
    sauce: options.includeSauce ? s : undefined,
  });
}

// Direct, uncached reference traversal.  It deliberately does not read project
// gate blobs/checkpoints.  Suitable for small diagnostic indices in Update 1.
export function gatePosition(index) {
  if (!Number.isSafeInteger(index)) throw new RangeError("gate index must be a safe integer");
  if (index === 0) return FOUNDATION_JDN;
  let position = FOUNDATION_JDN;
  if (index > 0) {
    for (let i = 1; i <= index; i += 1) position += gateGap(i).gap;
  } else {
    for (let i = -1; i >= index; i -= 1) position -= gateGap(i).gap;
  }
  return position;
}

/**
 * Deterministic reference-side gate cache.  Every cached entry is derived only
 * by gateGap() above.  No production checkpoint/blob/vector is read.
 */
export class ReferenceGateTable {
  constructor() {
    this.positions = new Map([[0, FOUNDATION_JDN]]);
    this.minimum = 0;
    this.maximum = 0;
  }

  ensure(index) {
    requireGateIndex(index, "gate index");
    while (this.maximum < index) {
      const next = this.maximum + 1;
      this.positions.set(next, this.positions.get(this.maximum) + gateGap(next).gap);
      this.maximum = next;
    }
    while (this.minimum > index) {
      const next = this.minimum - 1;
      this.positions.set(next, this.positions.get(this.minimum) - gateGap(next).gap);
      this.minimum = next;
    }
  }

  position(index) {
    this.ensure(index);
    return this.positions.get(index);
  }

  containingInterval(jdn) {
    const day = requireBigInt(jdn, "jdn");
    if (day > FOUNDATION_JDN) {
      let index = 0;
      while (this.position(index + 1) < day) index += 1;
      while (this.position(index) >= day) index -= 1;
      return index;
    }
    let index = -1;
    while (this.position(index) >= day) index -= 1;
    while (this.position(index + 1) < day) index += 1;
    return index;
  }
}

function requireGateIndex(value, name) {
  if (!Number.isSafeInteger(value)) throw new TypeError(`${name} must be a safe integer`);
  return value;
}

function requireGateReader(gateAt) {
  if (gateAt === undefined) return (index) => gatePosition(index);
  if (typeof gateAt !== "function") throw new TypeError("gateAt must be a function");
  return (index) => requireBigInt(gateAt(requireGateIndex(index, "gate index")), `gateAt(${index})`);
}

function yearCandidate(openGateIndex, closeGateIndex, gateAt) {
  const openingGate = gateAt(openGateIndex);
  const closingGate = gateAt(closeGateIndex);
  return Object.freeze({
    openGateIndex,
    closeGateIndex,
    openingGate,
    closingGate,
    yearLength: closingGate - openingGate,
    gapCount: closeGateIndex - openGateIndex,
  });
}

function sortYearCandidates(candidates) {
  return [...candidates].sort((a, b) => {
    if (a.yearLength !== b.yearLength) return a.yearLength < b.yearLength ? -1 : 1;
    return a.openGateIndex - b.openGateIndex;
  });
}

function isNormativeYearCandidate(candidate) {
  return candidate.gapCount >= MIN_YEAR_GAPS
    && candidate.yearLength >= MIN_YEAR_DAYS
    && candidate.yearLength <= MAX_YEAR_DAYS;
}

/**
 * Clear year-candidate discovery from Scroll tablet 17.
 *
 * mode="anchor": pass calculationJdn and containingGateIndex k satisfying
 * G_k < calculationJdn <= G_(k+1).  All opening/closing pairs from the
 * normative endpoint windows are materialized in `beforeFiltering`, then the
 * 252..5778 + six-gap rule is applied before sorting/selection.
 *
 * mode="next": pass fixedGateIndex equal to the previous year's closing gate.
 * mode="previous": pass fixedGateIndex equal to the current year's opening gate.
 *
 * `gateAt` is an optional dependency injection point for diagnostics.  The
 * reference module never imports production gate data.  When omitted, direct
 * source-derived gatePosition() is used (intentionally slow for large indices).
 */
export function discoverYearCandidates(options = {}) {
  const mode = options.mode ?? "anchor";
  const gateAt = requireGateReader(options.gateAt);
  const beforeFiltering = [];

  if (mode === "anchor") {
    const calculationJdn = requireBigInt(options.calculationJdn, "calculationJdn");
    const interval = requireGateIndex(options.containingGateIndex, "containingGateIndex");
    const intervalGate = gateAt(interval);
    const nextIntervalGate = gateAt(interval + 1);
    if (!(intervalGate < calculationJdn && calculationJdn <= nextIntervalGate)) {
      throw new RangeError("containingGateIndex must satisfy G_k < calculationJdn <= G_(k+1)");
    }

    const openings = [];
    for (let index = interval; ; index -= 1) {
      const position = gateAt(index);
      if (calculationJdn - position > MAX_YEAR_DAYS) break;
      openings.push(Object.freeze({ index, position }));
    }
    const closings = [];
    for (let index = interval + 1; ; index += 1) {
      const position = gateAt(index);
      if (position - calculationJdn > MAX_YEAR_DAYS) break;
      closings.push(Object.freeze({ index, position }));
    }

    for (const opening of openings) {
      for (const closing of closings) {
        beforeFiltering.push(Object.freeze({
          openGateIndex: opening.index,
          closeGateIndex: closing.index,
          openingGate: opening.position,
          closingGate: closing.position,
          yearLength: closing.position - opening.position,
          gapCount: closing.index - opening.index,
        }));
      }
    }
  } else if (mode === "next") {
    const openGateIndex = requireGateIndex(options.fixedGateIndex, "fixedGateIndex");
    const openingGate = gateAt(openGateIndex);
    for (let closeGateIndex = openGateIndex + MIN_YEAR_GAPS; ; closeGateIndex += 1) {
      const candidate = yearCandidate(openGateIndex, closeGateIndex, gateAt);
      beforeFiltering.push(candidate);
      if (candidate.yearLength > MAX_YEAR_DAYS) break;
      if (candidate.closingGate <= openingGate) throw new RangeError("gate positions must increase with gate index");
    }
  } else if (mode === "previous") {
    const closeGateIndex = requireGateIndex(options.fixedGateIndex, "fixedGateIndex");
    const closingGate = gateAt(closeGateIndex);
    for (let openGateIndex = closeGateIndex - MIN_YEAR_GAPS; ; openGateIndex -= 1) {
      const candidate = yearCandidate(openGateIndex, closeGateIndex, gateAt);
      beforeFiltering.push(candidate);
      if (candidate.yearLength > MAX_YEAR_DAYS) break;
      if (candidate.openingGate >= closingGate) throw new RangeError("gate positions must increase with gate index");
    }
  } else {
    throw new RangeError('mode must be "anchor", "next", or "previous"');
  }

  const afterFiltering = sortYearCandidates(beforeFiltering.filter(isNormativeYearCandidate));
  return Object.freeze({
    mode,
    maxYearDays: MAX_YEAR_DAYS,
    minYearDays: MIN_YEAR_DAYS,
    minYearGaps: MIN_YEAR_GAPS,
    beforeFiltering: Object.freeze(beforeFiltering),
    afterFiltering: Object.freeze(afterFiltering),
    cardinality: afterFiltering.length,
  });
}

export function selectYearCandidate(options = {}) {
  const calculationJdn = requireBigInt(options.calculationJdn, "calculationJdn");
  const discovery = options.discovery;
  if (!discovery || !Array.isArray(discovery.afterFiltering)) {
    throw new TypeError("discovery must be a discoverYearCandidates() result");
  }
  if (discovery.afterFiltering.length < 1) throw new RangeError("no legal year candidates");

  const mode = discovery.mode;
  const seal = mode === "anchor" ? 10n : mode === "next" ? 11n : mode === "previous" ? 12n : null;
  if (seal === null) throw new RangeError("unknown discovery mode");
  const targetJdn = mode === "anchor"
    ? calculationJdn
    : requireBigInt(options.selectionTargetJdn, "selectionTargetJdn");
  const sauceResult = sauce(calculationJdn, targetJdn, { detail: options.detail ?? "summary" });
  const choice = chooseUniform(sauceResult, 1, seal, BigInt(discovery.afterFiltering.length));
  const selectedIndex = Number(choice.choice - 1n);
  const selectedCandidate = discovery.afterFiltering[selectedIndex];
  return Object.freeze({
    mode,
    bowlNumber: 1,
    seal,
    selectionTargetJdn: targetJdn,
    cardinality: discovery.afterFiltering.length,
    selectedIndex,
    selectedOneBased: selectedIndex + 1,
    selectedCandidate,
    choiceTrace: choice,
  });
}

// Scroll tablets 20-21: exact combinatorial counters/unrankers.  These helpers
// intentionally spell out the ordering rules instead of importing production
// counters or the legacy canonical generator.
export function binomialCount(nValue, kValue) {
  const n = Number(nValue);
  let k = Number(kValue);
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(k) || n < 0 || k < 0 || k > n) return 0n;
  k = Math.min(k, n - k);
  let result = 1n;
  for (let value = 1; value <= k; value += 1) {
    result = (result * BigInt(n - k + value)) / BigInt(value);
  }
  return result;
}

export function permutationCount(nValue, kValue) {
  const n = Number(nValue);
  const k = Number(kValue);
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(k) || k < 0 || k > n) return 0n;
  let result = 1n;
  for (let value = n - k + 1; value <= n; value += 1) result *= BigInt(value);
  return result;
}

export function unrankOrderedNames(names, countValue, rankValue) {
  const count = Number(countValue);
  let rank = requireBigInt(rankValue, "rank");
  if (!Array.isArray(names) || !Number.isSafeInteger(count) || count < 0 || count > names.length) {
    throw new RangeError("invalid ordered-name domain");
  }
  const total = permutationCount(names.length, count);
  if (rank < 1n || rank > total) throw new RangeError("name rank outside valid range");
  rank -= 1n;
  const available = [...names];
  const result = [];
  for (let position = 0; position < count; position += 1) {
    const block = permutationCount(available.length - 1, count - position - 1);
    const index = Number(rank / block);
    rank %= block;
    result.push(available.splice(index, 1)[0]);
  }
  return result;
}

function compositionSuffixCount(remaining, parts, mandatoryOffset) {
  if (parts === 0) return remaining === 0 && (mandatoryOffset === null || mandatoryOffset === 0) ? 1n : 0n;
  if (remaining < parts) return 0n;
  if (mandatoryOffset === null || mandatoryOffset === 0) return binomialCount(remaining - 1, parts - 1);
  if (mandatoryOffset <= 0 || mandatoryOffset >= remaining || parts < 2) return 0n;
  return binomialCount(remaining - 2, parts - 2);
}

export function unrankCutletComposition(totalValue, partsValue, mandatoryCutValue, rankValue) {
  const total = Number(totalValue);
  const parts = Number(partsValue);
  const mandatoryCut = mandatoryCutValue === null || mandatoryCutValue === undefined ? null : Number(mandatoryCutValue);
  let rank = requireBigInt(rankValue, "rank");
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(parts) || total < 1 || parts < 1 || parts > total) {
    throw new RangeError("invalid composition domain");
  }
  const totalWays = mandatoryCut === null
    ? binomialCount(total - 1, parts - 1)
    : binomialCount(total - 2, parts - 2);
  if (rank < 1n || rank > totalWays) throw new RangeError("composition rank outside valid range");

  let remaining = total;
  let cumulative = 0;
  let hit = mandatoryCut === null;
  const result = [];
  for (let position = 0; position < parts; position += 1) {
    const left = parts - position - 1;
    let selected = false;
    for (let value = 1; value <= remaining - left; value += 1) {
      const after = remaining - value;
      const newCumulative = cumulative + value;
      const newHit = hit || (mandatoryCut !== null && newCumulative === mandatoryCut);
      let mandatoryOffset = null;
      if (!newHit) {
        if (mandatoryCut === null || mandatoryCut < newCumulative) continue;
        mandatoryOffset = mandatoryCut - newCumulative;
      }
      const block = compositionSuffixCount(after, left, newHit ? null : mandatoryOffset);
      if (rank > block) {
        rank -= block;
        continue;
      }
      result.push(value);
      remaining = after;
      cumulative = newCumulative;
      hit = newHit;
      selected = true;
      break;
    }
    if (!selected) throw new Error("composition rank exhausted");
  }
  return result;
}

const monthLengthCountCache = new Map();
export function boundedMonthLengthCount(totalValue, partsValue) {
  const total = Number(totalValue);
  const parts = Number(partsValue);
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(parts) || parts < 0) return 0n;
  const key = `${total}:${parts}`;
  const cached = monthLengthCountCache.get(key);
  if (cached !== undefined) return cached;
  const shifted = total - 4 * parts;
  if (shifted < 0 || shifted > 119 * parts) {
    monthLengthCountCache.set(key, 0n);
    return 0n;
  }
  let answer = 0n;
  const maximumExcluded = Math.min(parts, Math.floor(shifted / 120));
  for (let excluded = 0; excluded <= maximumExcluded; excluded += 1) {
    const ways = binomialCount(parts, excluded)
      * binomialCount(shifted - 120 * excluded + parts - 1, parts - 1);
    answer += excluded % 2 === 0 ? ways : -ways;
  }
  monthLengthCountCache.set(key, answer);
  return answer;
}

export function unrankMonthLengths(totalValue, partsValue, rankValue) {
  const total = Number(totalValue);
  const parts = Number(partsValue);
  let rank = requireBigInt(rankValue, "rank");
  const totalWays = boundedMonthLengthCount(total, parts);
  if (rank < 1n || rank > totalWays) throw new RangeError("month-length rank outside valid range");
  let remaining = total;
  const result = [];
  for (let position = 0; position < parts; position += 1) {
    const left = parts - position - 1;
    const maximum = Math.min(123, remaining - 4 * left);
    let selected = false;
    for (let value = 4; value <= maximum; value += 1) {
      const after = remaining - value;
      const block = left === 0 ? (after === 0 ? 1n : 0n) : boundedMonthLengthCount(after, left);
      if (rank > block) {
        rank -= block;
        continue;
      }
      result.push(value);
      remaining = after;
      selected = true;
      break;
    }
    if (!selected) throw new Error("month-length rank exhausted");
  }
  return result;
}

class ReferenceInterleavingCounter {
  constructor(lengths) {
    this.lengths = [...lengths];
    this.cache = new Map();
  }

  get(lastSeen, q) {
    const last = this.lengths.length - 1;
    if (lastSeen >= last) return 1n;
    const cached = this.cache.get(lastSeen);
    if (cached !== undefined && cached.length > q) return cached[q];
    this.rebuild(lastSeen, q);
    return this.cache.get(lastSeen)[q];
  }

  rebuild(start, qStart) {
    const m = this.lengths.length;
    const needed = new Array(m).fill(0);
    needed[start] = qStart;
    for (let i = start; i < m - 1; i += 1) needed[i + 1] = needed[i] + this.lengths[i + 1] - 1;
    let following = null;
    this.cache.clear();
    for (let i = m - 1; i >= start; i -= 1) {
      const qMaximum = needed[i];
      let current;
      if (i === m - 1) {
        current = new Array(qMaximum + 1).fill(1n);
      } else {
        current = new Array(qMaximum + 1).fill(0n);
        const monthLength = this.lengths[i + 1];
        let cumulative = 0n;
        let weight = 1n;
        for (let q = 1; q <= qMaximum; q += 1) {
          const r = q - 1;
          cumulative += weight * following[monthLength + r];
          current[q] = cumulative;
          weight = (weight * BigInt(monthLength + r - 1)) / BigInt(r + 1);
        }
      }
      following = current;
      if (i <= start + 7) this.cache.set(i, current);
    }
  }
}

export function monthInterleavingCount(lengthsValue) {
  const lengths = [...lengthsValue].map(Number);
  if (lengths.length < 1 || lengths.some((value) => !Number.isSafeInteger(value) || value < 1)) {
    throw new RangeError("month lengths must be positive safe integers");
  }
  return new ReferenceInterleavingCounter(lengths).get(0, lengths[0]);
}

export function unrankMonthInterleaving(lengthsValue, rankValue) {
  const lengths = [...lengthsValue].map(Number);
  const m = lengths.length;
  const totalLength = lengths.reduce((sum, value) => sum + value, 0);
  const counter = new ReferenceInterleavingCounter(lengths);
  const weave = new Array(totalLength).fill(0);
  const remaining = [...lengths];
  weave[0] = 0;
  remaining[0] -= 1;
  let low = 0;
  let high = 0;
  let activeTotal = remaining[0];
  let baseCount = 1n;
  let rank = requireBigInt(rankValue, "rank");
  const expectedTotal = counter.get(0, activeTotal + 1);
  if (rank < 1n || rank > expectedTotal) throw new RangeError("interleaving rank outside valid range");

  for (let position = 1; position < totalLength; position += 1) {
    const prefix = [];
    let running = 0;
    for (let i = low; i <= high; i += 1) {
      running += remaining[i];
      prefix.push(running);
    }
    const span = prefix.length;
    const suffixP = new Array(span + 1).fill(1n);
    const suffixPm1 = new Array(span + 1).fill(1n);
    for (let off = span - 1; off >= 0; off -= 1) {
      suffixP[off] = suffixP[off + 1] * BigInt(prefix[off]);
      suffixPm1[off] = suffixPm1[off + 1] * BigInt(prefix[off] - 1);
    }
    const futureSame = high < m - 1 ? counter.get(high, activeTotal) : 1n;
    let selected = false;
    for (let month = low; month <= high; month += 1) {
      const remainingForMonth = remaining[month];
      if (remainingForMonth === 1 && month !== low) continue;
      const off = month - low;
      let numerator;
      let denominator;
      if (remainingForMonth > 1) {
        numerator = BigInt(remainingForMonth - 1) * suffixP[off];
        denominator = BigInt(activeTotal) * suffixPm1[off];
      } else {
        numerator = suffixP[off + 1];
        denominator = BigInt(activeTotal) * suffixPm1[off + 1];
      }
      const nextBase = (baseCount * numerator) / denominator;
      const block = nextBase * futureSame;
      if (rank > block) {
        rank -= block;
        continue;
      }
      weave[position] = month;
      remaining[month] -= 1;
      activeTotal -= 1;
      baseCount = nextBase;
      if (remaining[month] === 0) low += 1;
      selected = true;
      break;
    }
    if (selected) continue;
    if (high + 1 >= m) throw new Error("interleaving rank exhausted");
    const month = high + 1;
    const newRemaining = lengths[month] - 1;
    const nextBase = baseCount * binomialCount(activeTotal + newRemaining - 1, newRemaining - 1);
    const nextActive = activeTotal + newRemaining;
    const future = month < m - 1 ? counter.get(month, nextActive + 1) : 1n;
    const block = nextBase * future;
    if (rank > block) throw new Error("interleaving final branch exhausted");
    weave[position] = month;
    high = month;
    remaining[month] -= 1;
    if (low > month - 1) low = month;
    activeTotal = nextActive;
    baseCount = nextBase;
  }
  return weave;
}

function makeReferenceYear(numberValue, openGateIndex, closeGateIndex, gateTable) {
  const number = requireBigInt(numberValue, "year number");
  const openingGate = gateTable.position(openGateIndex);
  const closingGate = gateTable.position(closeGateIndex);
  return Object.freeze({
    number,
    openGateIndex,
    closeGateIndex,
    openingGate,
    closingGate,
    startJdn: openingGate + 1n,
    endJdn: closingGate,
    length: closingGate - openingGate,
    gapCount: closeGateIndex - openGateIndex,
  });
}

export function referenceYear5000(calculationJdn, options = {}) {
  const c = requireBigInt(calculationJdn, "calculationJdn");
  const gateTable = options.gateTable ?? new ReferenceGateTable();
  const containingGateIndex = gateTable.containingInterval(c);
  const discovery = discoverYearCandidates({
    mode: "anchor",
    calculationJdn: c,
    containingGateIndex,
    gateAt: (index) => gateTable.position(index),
  });
  const selection = selectYearCandidate({ calculationJdn: c, discovery, detail: options.detail ?? "summary" });
  const selected = selection.selectedCandidate;
  return Object.freeze({
    year: makeReferenceYear(5000n, selected.openGateIndex, selected.closeGateIndex, gateTable),
    discovery,
    selection,
    containingGateIndex,
    gateTable,
  });
}

function referenceAdjacentYear(calculationJdn, year, direction, gateTable, detail = "summary") {
  const mode = direction === "next" ? "next" : direction === "previous" ? "previous" : null;
  if (mode === null) throw new RangeError("direction must be next or previous");
  const fixedGateIndex = mode === "next" ? year.closeGateIndex : year.openGateIndex;
  const discovery = discoverYearCandidates({
    mode,
    fixedGateIndex,
    gateAt: (index) => gateTable.position(index),
  });
  const selectionTargetJdn = gateTable.position(fixedGateIndex);
  const selection = selectYearCandidate({
    calculationJdn,
    discovery,
    selectionTargetJdn,
    detail,
  });
  const selected = selection.selectedCandidate;
  const number = mode === "next" ? year.number + 1n : year.number - 1n;
  return Object.freeze({
    year: makeReferenceYear(number, selected.openGateIndex, selected.closeGateIndex, gateTable),
    discovery,
    selection,
  });
}

export function buildReferenceYearStructure(calculationJdn, year, options = {}) {
  const c = requireBigInt(calculationJdn, "calculationJdn");
  const gateTable = options.gateTable ?? new ReferenceGateTable();
  const yearLength = Number(year.length);
  const gapCount = Number(year.gapCount);
  if (!Number.isSafeInteger(yearLength) || yearLength < 1 || !Number.isSafeInteger(gapCount) || gapCount < MIN_YEAR_GAPS) {
    throw new RangeError("invalid reference year");
  }
  const s = sauce(c, year.startJdn, { detail: options.detail ?? "summary" });

  const cutletCountMaximum = Math.min(17, gapCount);
  const cutletCountOptions = cutletCountMaximum - 5;
  const cutletCountChoice = chooseUniform(s, 2, 20n, BigInt(cutletCountOptions));
  const cutletCount = 5 + Number(cutletCountChoice.choice);

  let mandatoryCut = null;
  if (c >= year.startJdn && c <= year.endJdn) {
    for (let gateIndex = year.openGateIndex + 1; gateIndex < year.closeGateIndex; gateIndex += 1) {
      if (gateTable.position(gateIndex) === c) {
        mandatoryCut = gateIndex - year.openGateIndex;
        break;
      }
    }
  }
  const partitionCount = mandatoryCut === null
    ? binomialCount(gapCount - 1, cutletCount - 1)
    : binomialCount(gapCount - 2, cutletCount - 2);
  const partitionChoice = chooseUniform(s, 2, 21n, partitionCount);
  const cutletGaps = unrankCutletComposition(gapCount, cutletCount, mandatoryCut, partitionChoice.choice);

  const cutletNameCount = permutationCount(CUTLET_NAMES.length, cutletCount);
  const cutletNameChoice = chooseUniform(s, 5, 22n, cutletNameCount);
  const cutletNames = unrankOrderedNames(CUTLET_NAMES, cutletCount, cutletNameChoice.choice);

  const minimumMonths = Math.ceil(yearLength / 123);
  const maximumMonths = Math.min(47, Math.floor(yearLength / 4));
  const monthCountChoice = chooseUniform(s, 3, 30n, BigInt(maximumMonths - minimumMonths + 1));
  const monthCount = minimumMonths + Number(monthCountChoice.choice) - 1;

  const monthLengthWays = boundedMonthLengthCount(yearLength, monthCount);
  const monthLengthChoice = chooseUniform(s, 3, 31n, monthLengthWays);
  const monthLengths = unrankMonthLengths(yearLength, monthCount, monthLengthChoice.choice);

  const weaveWays = monthInterleavingCount(monthLengths);
  const weaveChoice = chooseUniform(s, 4, 32n, weaveWays);
  const monthWeave = unrankMonthInterleaving(monthLengths, weaveChoice.choice);

  const monthNameWays = permutationCount(MONTH_NAMES.length, monthCount);
  const monthNameChoice = chooseUniform(s, 5, 33n, monthNameWays);
  const monthNames = unrankOrderedNames(MONTH_NAMES, monthCount, monthNameChoice.choice);

  const seen = new Array(monthCount).fill(0);
  const dayInMonth = new Array(yearLength);
  for (let offset = 0; offset < monthWeave.length; offset += 1) {
    const month = monthWeave[offset];
    seen[month] += 1;
    dayInMonth[offset] = seen[month];
  }

  const cutletStartOffsets = [];
  const cutletEndOffsets = [];
  let gapOffset = 0;
  let dayOffset = 0;
  for (const gaps of cutletGaps) {
    cutletStartOffsets.push(dayOffset);
    gapOffset += gaps;
    const endJdn = gateTable.position(year.openGateIndex + gapOffset);
    dayOffset = Number(endJdn - year.startJdn + 1n);
    cutletEndOffsets.push(dayOffset - 1);
  }

  return Object.freeze({
    cutletCount,
    mandatoryCut,
    partitionCount,
    cutletCountChoice,
    partitionChoice,
    cutletNameChoice,
    cutletGaps: Object.freeze(cutletGaps),
    cutletNames: Object.freeze(cutletNames),
    cutletStartOffsets: Object.freeze(cutletStartOffsets),
    cutletEndOffsets: Object.freeze(cutletEndOffsets),
    monthCount,
    monthCountChoice,
    monthLengthWays,
    monthLengthChoice,
    monthLengths: Object.freeze(monthLengths),
    weaveWays,
    weaveChoice,
    monthWeave: Object.freeze(monthWeave),
    monthNameWays,
    monthNameChoice,
    monthNames: Object.freeze(monthNames),
    dayInMonth: Object.freeze(dayInMonth),
  });
}

export function materializeReferenceTuple(year, structure, targetJdn) {
  const target = requireBigInt(targetJdn, "targetJdn");
  const offsetBig = target - year.startJdn;
  if (offsetBig < 0n || offsetBig >= year.length) throw new RangeError("target outside reference year");
  const offset = Number(offsetBig);
  let cutlet = -1;
  for (let index = 0; index < structure.cutletCount; index += 1) {
    if (offset >= structure.cutletStartOffsets[index] && offset <= structure.cutletEndOffsets[index]) {
      cutlet = index;
      break;
    }
  }
  if (cutlet < 0) throw new Error("reference cutlet partition lost target day");
  const month = structure.monthWeave[offset];
  return Object.freeze({
    year: year.number,
    cutletName: structure.cutletNames[cutlet],
    dayInCutlet: offset - structure.cutletStartOffsets[cutlet] + 1,
    monthName: structure.monthNames[month],
    dayInMonth: structure.dayInMonth[offset],
  });
}

export class ReferenceCalendar {
  constructor(calculationJdn, options = {}) {
    this.calculationJdn = requireBigInt(calculationJdn, "calculationJdn");
    this.gateTable = options.gateTable ?? new ReferenceGateTable();
    this.detail = options.detail ?? "summary";
    const anchor = referenceYear5000(this.calculationJdn, { gateTable: this.gateTable, detail: this.detail });
    this.anchorEvidence = anchor;
    this.years = new Map([["5000", anchor.year]]);
    this.structures = new Map();
  }

  nextYear(year) {
    const number = year.number + 1n;
    const key = number.toString();
    if (this.years.has(key)) return this.years.get(key);
    const result = referenceAdjacentYear(this.calculationJdn, year, "next", this.gateTable, this.detail).year;
    this.years.set(key, result);
    return result;
  }

  previousYear(year) {
    const number = year.number - 1n;
    const key = number.toString();
    if (this.years.has(key)) return this.years.get(key);
    const result = referenceAdjacentYear(this.calculationJdn, year, "previous", this.gateTable, this.detail).year;
    this.years.set(key, result);
    return result;
  }

  findYear(targetJdn) {
    const target = requireBigInt(targetJdn, "targetJdn");
    let year = this.years.get("5000");
    while (target < year.startJdn) year = this.previousYear(year);
    while (target > year.endJdn) year = this.nextYear(year);
    return year;
  }

  structure(year) {
    const key = `${year.openGateIndex}:${year.closeGateIndex}`;
    if (!this.structures.has(key)) {
      this.structures.set(key, buildReferenceYearStructure(this.calculationJdn, year, { gateTable: this.gateTable, detail: this.detail }));
    }
    return this.structures.get(key);
  }

  convertJdn(targetJdn) {
    const target = requireBigInt(targetJdn, "targetJdn");
    const year = this.findYear(target);
    const structure = this.structure(year);
    return materializeReferenceTuple(year, structure, target);
  }
}

export function finalPastafarianTuple(calculationJdn, targetJdn, options = {}) {
  const calendar = new ReferenceCalendar(calculationJdn, options);
  return calendar.convertJdn(targetJdn);
}


// Stable architecture for later updates.  These methods never fall back to any
// production engine; incomplete stages fail loudly and explicitly.
export class ReferenceOracle {
  canonicalCounters(calculationJdn, targetJdn) {
    return canonicalCounters(calculationJdn, targetJdn);
  }

  sauce(calculationJdn, targetJdn, options) {
    return sauce(calculationJdn, targetJdn, options);
  }

  response(sauceResult, options = {}) {
    const bowl = options.bowl ?? 1;
    const seal = options.seal ?? 1n;
    const chooseCount = options.chooseCount ?? null;
    const descriptor = responseDescriptor(sauceResult, bowl, seal);
    const result = {
      bowl,
      seal: requireBigInt(seal, "seal"),
      first: descriptor.first,
      step: descriptor.direction === "forward" ? 1n : -1n,
      descriptor,
    };
    if (chooseCount !== null) {
      const choice = chooseUniform(sauceResult, bowl, seal, chooseCount);
      result.choice = choice.choice;
      result.choiceTrace = choice;
    }
    return Object.freeze(result);
  }

  gateGap(index, options) {
    return gateGap(index, options);
  }

  gatePosition(index) {
    return gatePosition(index);
  }

  discoverYearCandidates(options) {
    return discoverYearCandidates(options);
  }

  selectYear(options) {
    return selectYearCandidate(options);
  }

  buildCutletStructure(calculationJdn, year, options) {
    const structure = buildReferenceYearStructure(calculationJdn, year, options);
    return Object.freeze({
      cutletCount: structure.cutletCount,
      mandatoryCut: structure.mandatoryCut,
      partitionCount: structure.partitionCount,
      cutletGaps: structure.cutletGaps,
      cutletNames: structure.cutletNames,
      cutletStartOffsets: structure.cutletStartOffsets,
      cutletEndOffsets: structure.cutletEndOffsets,
    });
  }

  buildMonthStructure(calculationJdn, year, options) {
    const structure = buildReferenceYearStructure(calculationJdn, year, options);
    return Object.freeze({
      monthCount: structure.monthCount,
      monthLengthWays: structure.monthLengthWays,
      monthLengths: structure.monthLengths,
      weaveWays: structure.weaveWays,
      monthWeave: structure.monthWeave,
      monthNameWays: structure.monthNameWays,
      monthNames: structure.monthNames,
      dayInMonth: structure.dayInMonth,
    });
  }

  finalPastafarianTuple(calculationJdn, targetJdn, options) {
    return finalPastafarianTuple(calculationJdn, targetJdn, options);
  }
}

export function serializeBigInts(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(serializeBigInts);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry !== undefined) out[key] = serializeBigInts(entry);
    }
    return out;
  }
  return value;
}
