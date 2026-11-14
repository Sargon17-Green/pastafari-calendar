"use strict";

import { CUTLETS, MONTHS } from "../i18n/calendar-identifiers.js?v=9-canonical-names";

const NAME_FAMILIES = Object.freeze([
  Object.freeze({ type: "cutlet", entries: CUTLETS, key: "cutlets" }),
  Object.freeze({ type: "month", entries: MONTHS, key: "months" }),
]);

// The catalog's stable IDs and ordering are authoritative for display.
// Localized names are presentation data; never sort by translated text.
export function canonicalNameGroups(locale) {
  if (!locale || typeof locale.code !== "string" || !["ltr", "rtl"].includes(locale.dir)) {
    throw new TypeError("A resolved locale with a valid direction is required.");
  }

  return NAME_FAMILIES.map(({ type, entries, key }) => {
    const table = locale.calendar?.[key];
    if (!table || typeof table !== "object") {
      throw new RangeError(`Missing ${type} translation catalog for ${locale.code}.`);
    }

    return Object.freeze({
      type,
      names: Object.freeze(entries.map(({ id, index }) => {
        const label = table[id];
        if (typeof label !== "string" || label.trim() === "") {
          throw new RangeError(`Missing ${type} name ${id} for ${locale.code}.`);
        }
        return Object.freeze({ id, index, label });
      })),
    });
  });
}

export function synchronizeCanonicalNameSummaries(article, locale) {
  const section = article?.querySelector("#canonical-names");
  if (!section) throw new RangeError("The About article is missing the canonical-names section.");

  const lists = [...section.querySelectorAll("ul.about-name-disclosure-list")];
  const groups = canonicalNameGroups(locale);
  if (lists.length !== groups.length) {
    throw new RangeError("The About article has an unexpected number of name catalogs.");
  }

  // Validate the entire structure before mutating any of its labels.
  const changes = groups.flatMap(({ type, names }, groupIndex) => {
    const summaries = [...lists[groupIndex].querySelectorAll(":scope > li > details > summary")];
    if (summaries.length !== names.length) {
      throw new RangeError(`The ${type} catalog has ${summaries.length} descriptions instead of ${names.length}.`);
    }
    return names.map(({ id, label }, i) => ({ summary: summaries[i], id, label }));
  });

  for (const { summary, id, label } of changes) {
    summary.textContent = label;
    summary.dataset.canonicalNameId = id;
    summary.lang = locale.code;
    summary.dir = locale.dir;
  }
  return changes.length;
}
