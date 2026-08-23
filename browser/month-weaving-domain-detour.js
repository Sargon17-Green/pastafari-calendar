// Update 14: keep the sealed month-weaving machinery, but stop singleton
// months from leaking its historical ghost ranks through public entry points.
// A singleton month is a hard separator: by the first-occurrence rule no later
// month can precede it, and by the last-occurrence rule no earlier month can
// survive past it.  We therefore let the old counter work unchanged on each
// non-singleton run and stitch those old rank spaces together outside it.

const installedPrototypes = new WeakSet();
const poisonedLedgers = new WeakMap();

function serializableLengths(value) {
  return Array.isArray(value)
    && value.length > 0
    && value.every((item) => Number.isInteger(item) && item > 0);
}

function hasConstructorShape(instance) {
  if (!serializableLengths(instance?.lengths)) return false;
  if (instance.monthCount !== instance.lengths.length) return false;
  const total = instance.lengths.reduce((sum, value) => sum + value, 0);
  if (instance.totalLength !== total) return false;
  if (!Array.isArray(instance.prefix) || instance.prefix.length !== instance.lengths.length + 1) return false;
  let running = 0;
  if (instance.prefix[0] !== 0) return false;
  for (let index = 0; index < instance.lengths.length; index += 1) {
    running += instance.lengths[index];
    if (instance.prefix[index + 1] !== running) return false;
  }
  return true;
}

function makeOutOfRangeError(rank, count) {
  return new RangeError(`דירוג מחוץ לטווח: ${rank}; מספר השזירות הוא ${count}`);
}

function completionCount(counter, comb, remaining, highOpened, finishedCount) {
  let activeTotal = 0;
  let ways = 1n;

  if (finishedCount < highOpened) {
    activeTotal = remaining[finishedCount + 1];
    for (let i = finishedCount + 2; i <= highOpened; i += 1) {
      const n = remaining[i];
      ways *= comb(n + activeTotal - 1, activeTotal);
      activeTotal += n;
    }
  }

  if (highOpened < counter.monthCount) {
    const row = counter.h?.[highOpened + 1];
    const cell = row?.[activeTotal + 1];
    if (typeof cell !== "bigint") {
      throw new Error("טבלת שזירת החודשים אינה זמינה לדירוג");
    }
    ways *= cell;
  }

  return ways;
}

function rankLegacySpace(counter, comb, weaving) {
  if (!Array.isArray(weaving)) {
    throw new TypeError("השזירה חייבת להיות מערך");
  }
  if (weaving.length !== counter.totalLength) {
    throw new RangeError("אורך השזירה אינו מתאים לאורכי החודשים");
  }

  const remaining = [0, ...counter.lengths];
  let highOpened = 0;
  let finishedCount = 0;
  let rank = 0n;

  for (let position = 0; position < weaving.length; position += 1) {
    const actual = weaving[position];
    if (!Number.isInteger(actual)) {
      throw new TypeError("מספרי החודשים בשזירה חייבים להיות מספרים שלמים");
    }

    const candidates = [];
    for (let month = finishedCount + 1; month <= highOpened; month += 1) {
      if (remaining[month] > 1 || month === finishedCount + 1) {
        candidates.push(month);
      }
    }
    if (highOpened < counter.monthCount) {
      candidates.push(highOpened + 1);
    }

    let selected = false;
    for (const candidate of candidates) {
      const trialRemaining = [...remaining];
      let trialHigh = highOpened;
      let trialFinished = finishedCount;

      if (candidate === highOpened + 1) {
        trialHigh += 1;
      }
      trialRemaining[candidate] -= 1;
      if (trialRemaining[candidate] < 0) {
        continue;
      }
      if (trialRemaining[candidate] === 0) {
        if (candidate !== finishedCount + 1) {
          continue;
        }
        trialFinished += 1;
      }

      const block = completionCount(counter, comb, trialRemaining, trialHigh, trialFinished);
      if (candidate < actual) {
        rank += block;
        continue;
      }
      if (candidate !== actual) {
        break;
      }

      for (let i = 0; i < trialRemaining.length; i += 1) {
        remaining[i] = trialRemaining[i];
      }
      highOpened = trialHigh;
      finishedCount = trialFinished;
      selected = true;
      break;
    }

    if (!selected) {
      throw new RangeError(`שזירת חודשים לא חוקית במיקום ${position}`);
    }
  }

  if (highOpened !== counter.monthCount
      || finishedCount !== counter.monthCount
      || remaining.some((value) => value !== 0)) {
    throw new RangeError("שזירת חודשים לא חוקית");
  }

  return rank;
}

function buildPoisonedLedger(instance, Counter, legacyCountGetter) {
  const lengths = [...instance.lengths];
  const pieces = [];
  const segments = [];
  let runStart = 0;

  const addRun = (start, end) => {
    const runLengths = lengths.slice(start, end);
    if (runLengths.length === 0) {
      const segment = {
        kind: "segment",
        startLabel: start + 1,
        totalLength: 0,
        counter: null,
        count: 1n,
      };
      pieces.push(segment);
      segments.push(segment);
      return;
    }

    const counter = new Counter(runLengths);
    // Call the captured getter, not the public wrapper, so the old counter is
    // quite literally the census authority inside every non-poisoned island.
    const count = legacyCountGetter.call(counter);
    const segment = {
      kind: "segment",
      startLabel: start + 1,
      totalLength: runLengths.reduce((sum, value) => sum + value, 0),
      counter,
      count,
    };
    pieces.push(segment);
    segments.push(segment);
  };

  for (let index = 0; index < lengths.length; index += 1) {
    if (lengths[index] !== 1) continue;
    addRun(runStart, index);
    pieces.push({ kind: "singleton", label: index + 1 });
    runStart = index + 1;
  }
  addRun(runStart, lengths.length);

  let correctedCount = 1n;
  for (const segment of segments) correctedCount *= segment.count;

  let suffix = 1n;
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    segments[index].suffixCount = suffix;
    suffix *= segments[index].count;
  }

  return {
    lengths: Object.freeze(lengths),
    pieces,
    segments,
    correctedCount,
  };
}

function poisonedLedger(instance, Counter, legacyCountGetter) {
  let ledger = poisonedLedgers.get(instance);
  if (ledger) return ledger;
  ledger = buildPoisonedLedger(instance, Counter, legacyCountGetter);
  poisonedLedgers.set(instance, ledger);
  return ledger;
}

function unrankPoisoned(ledger, legacyUnrank, rankInput) {
  let rank = BigInt(rankInput);
  if (rank < 0n || rank >= ledger.correctedCount) {
    throw makeOutOfRangeError(rank, ledger.correctedCount);
  }

  const segmentRanks = new Map();
  for (const segment of ledger.segments) {
    const localRank = rank / segment.suffixCount;
    rank %= segment.suffixCount;
    segmentRanks.set(segment, localRank);
  }

  const result = [];
  for (const piece of ledger.pieces) {
    if (piece.kind === "singleton") {
      result.push(piece.label);
      continue;
    }
    if (piece.counter === null) continue;
    const local = legacyUnrank.call(piece.counter, segmentRanks.get(piece));
    const offset = piece.startLabel - 1;
    for (const label of local) result.push(label + offset);
  }
  return result;
}

function rankPoisoned(ledger, comb, weaving) {
  if (!Array.isArray(weaving)) {
    throw new TypeError("השזירה חייבת להיות מערך");
  }
  const expectedLength = ledger.lengths.reduce((sum, value) => sum + value, 0);
  if (weaving.length !== expectedLength) {
    throw new RangeError("אורך השזירה אינו מתאים לאורכי החודשים");
  }

  let cursor = 0;
  let rank = 0n;
  for (const piece of ledger.pieces) {
    if (piece.kind === "singleton") {
      if (weaving[cursor] !== piece.label) {
        throw new RangeError(`שזירת חודשים לא חוקית במיקום ${cursor}`);
      }
      cursor += 1;
      continue;
    }

    const localSlice = weaving.slice(cursor, cursor + piece.totalLength);
    cursor += piece.totalLength;
    let localRank = 0n;
    if (piece.counter !== null) {
      const offset = piece.startLabel - 1;
      const local = localSlice.map((label) => {
        if (!Number.isInteger(label)) {
          throw new TypeError("מספרי החודשים בשזירה חייבים להיות מספרים שלמים");
        }
        return label - offset;
      });
      localRank = rankLegacySpace(piece.counter, comb, local);
    }
    rank = rank * piece.count + localRank;
  }

  if (cursor !== weaving.length) {
    throw new RangeError("שזירת חודשים לא חוקית");
  }
  return rank;
}

export function installMonthWeavingGhostDetour(Counter, comb) {
  if (typeof Counter !== "function" || typeof comb !== "function") {
    throw new TypeError("Month weaving detour requires the counter and comb functions");
  }

  const prototype = Counter.prototype;
  if (!prototype || installedPrototypes.has(prototype)) return Counter;

  const countDescriptor = Object.getOwnPropertyDescriptor(prototype, "count");
  const unrankDescriptor = Object.getOwnPropertyDescriptor(prototype, "unrank");
  const legacyCountGetter = countDescriptor?.get;
  const legacyUnrank = unrankDescriptor?.value;
  if (typeof legacyCountGetter !== "function" || typeof legacyUnrank !== "function") {
    throw new TypeError("Month weaving detour could not find the legacy count/unrank machinery");
  }

  Object.defineProperty(prototype, "count", {
    ...countDescriptor,
    get() {
      const legacyCount = legacyCountGetter.call(this);
      if (!hasConstructorShape(this) || !this.lengths.includes(1)) {
        return legacyCount;
      }
      return poisonedLedger(this, Counter, legacyCountGetter).correctedCount;
    },
  });

  Object.defineProperty(prototype, "unrank", {
    ...unrankDescriptor,
    value(rank) {
      if (!hasConstructorShape(this) || !this.lengths.includes(1)) {
        return legacyUnrank.call(this, rank);
      }
      // Preserve the old census side effect before translating the public rank
      // into the product of its non-singleton legacy islands.
      legacyCountGetter.call(this);
      const ledger = poisonedLedger(this, Counter, legacyCountGetter);
      return unrankPoisoned(ledger, legacyUnrank, rank);
    },
  });

  if (!Object.prototype.hasOwnProperty.call(prototype, "rank")) {
    Object.defineProperty(prototype, "rank", {
      configurable: true,
      enumerable: false,
      writable: true,
      value(weaving) {
        if (!hasConstructorShape(this)) {
          throw new RangeError("מצב מונה שזירת החודשים אינו תואם למבנה שנבנה");
        }
        if (this.lengths.includes(1)) {
          legacyCountGetter.call(this);
          return rankPoisoned(poisonedLedger(this, Counter, legacyCountGetter), comb, weaving);
        }
        return rankLegacySpace(this, comb, weaving);
      },
    });
  }

  installedPrototypes.add(prototype);
  return Counter;
}
