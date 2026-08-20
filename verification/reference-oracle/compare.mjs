export const STATUS = Object.freeze({
  MATCH: "match",
  MISMATCH: "mismatch",
  MISSING_AUTHORITATIVE: "missing-on-authoritative",
  MISSING_REFERENCE: "missing-on-reference",
  NOT_IMPLEMENTED_REFERENCE: "not-implemented-in-reference",
});

function sameScalar(a, b) {
  if (typeof a === "bigint" || typeof b === "bigint") {
    try { return BigInt(a) === BigInt(b); } catch { return false; }
  }
  return Object.is(a, b);
}

function normalizeComparable(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(normalizeComparable);
  if (value && typeof value === "object") {
    const result = {};
    for (const [key, entry] of Object.entries(value)) result[key] = normalizeComparable(entry);
    return result;
  }
  return value;
}

export function compareOrderedStages(stages) {
  const fields = [];
  let firstMismatch = null;
  for (const stage of stages) {
    const { stage: stageName, field, authoritative, reference, context = null } = stage;
    let status;
    if (reference && reference.__notImplemented) {
      status = STATUS.NOT_IMPLEMENTED_REFERENCE;
    } else if (authoritative === undefined) {
      status = STATUS.MISSING_AUTHORITATIVE;
    } else if (reference === undefined) {
      status = STATUS.MISSING_REFERENCE;
    } else {
      const a = normalizeComparable(authoritative);
      const r = normalizeComparable(reference);
      status = JSON.stringify(a) === JSON.stringify(r) ? STATUS.MATCH : STATUS.MISMATCH;
    }
    const row = { stage: stageName, field, status, authoritative, reference, context };
    fields.push(row);
    if (!firstMismatch && status === STATUS.MISMATCH) {
      firstMismatch = {
        stage: stageName,
        field,
        authoritative,
        reference,
        context,
      };
    }
  }
  return { fields, firstMismatch };
}

export function firstArrayDifference(stage, field, authoritative, reference, context = null) {
  if (!Array.isArray(authoritative) || !Array.isArray(reference)) {
    throw new TypeError("firstArrayDifference requires arrays");
  }
  const limit = Math.max(authoritative.length, reference.length);
  for (let index = 0; index < limit; index += 1) {
    if (index >= authoritative.length) {
      return { stage, field: `${field}[${index}]`, authoritative: undefined, reference: reference[index], context: { ...context, index } };
    }
    if (index >= reference.length) {
      return { stage, field: `${field}[${index}]`, authoritative: authoritative[index], reference: undefined, context: { ...context, index } };
    }
    if (!sameScalar(authoritative[index], reference[index])) {
      return { stage, field: `${field}[${index}]`, authoritative: authoritative[index], reference: reference[index], context: { ...context, index } };
    }
  }
  return null;
}
