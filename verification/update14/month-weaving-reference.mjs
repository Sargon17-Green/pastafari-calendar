// Deliberately small and slow Update 14 oracle.  It does not import production
// code, counters, fixtures, or combinatorial helpers.  It literally enumerates
// the multiset, filters the two appearance-order rules, and sorts the surviving
// day-by-day sequences lexicographically.

function compareLexicographically(left, right) {
  const limit = Math.min(left.length, right.length);
  for (let index = 0; index < limit; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return left.length - right.length;
}

function obeysAppearanceOrders(weaving, monthCount) {
  const first = new Array(monthCount).fill(Infinity);
  const last = new Array(monthCount).fill(-1);
  for (let position = 0; position < weaving.length; position += 1) {
    const month = weaving[position] - 1;
    if (first[month] === Infinity) first[month] = position;
    last[month] = position;
  }
  for (let month = 1; month < monthCount; month += 1) {
    if (!(first[month - 1] < first[month])) return false;
    if (!(last[month - 1] < last[month])) return false;
  }
  return true;
}

export function enumerateMonthWeavings(lengths) {
  if (!Array.isArray(lengths) || lengths.length === 0
      || lengths.some((length) => !Number.isInteger(length) || length <= 0)) {
    throw new RangeError("reference lengths must be positive integers");
  }

  const total = lengths.reduce((sum, length) => sum + length, 0);
  const remaining = [...lengths];
  const candidate = [];
  const result = [];

  function visit() {
    if (candidate.length === total) {
      if (obeysAppearanceOrders(candidate, lengths.length)) {
        result.push([...candidate]);
      }
      return;
    }

    for (let month = 0; month < lengths.length; month += 1) {
      if (remaining[month] === 0) continue;
      remaining[month] -= 1;
      candidate.push(month + 1);
      visit();
      candidate.pop();
      remaining[month] += 1;
    }
  }

  visit();
  result.sort(compareLexicographically);
  return result;
}

export function referenceCount(lengths) {
  return BigInt(enumerateMonthWeavings(lengths).length);
}

export function referenceRank(lengths, weaving) {
  const sequence = enumerateMonthWeavings(lengths);
  const key = JSON.stringify(weaving);
  const index = sequence.findIndex((item) => JSON.stringify(item) === key);
  if (index < 0) throw new RangeError("weaving is not in the reference domain");
  return BigInt(index);
}

export function referenceUnrank(lengths, rank) {
  const sequence = enumerateMonthWeavings(lengths);
  const index = Number(BigInt(rank));
  if (!Number.isSafeInteger(index) || index < 0 || index >= sequence.length) {
    throw new RangeError("reference rank outside range");
  }
  return [...sequence[index]];
}
