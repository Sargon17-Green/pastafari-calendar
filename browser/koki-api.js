"use strict";

// Update 12 public browser side-door.  Kōki stays separate from the sealed
// imperial-era machinery, but every conversion still walks through its fake
// imperial doorway before the shadow arithmetic is allowed to answer.

import { calendarDateToJdn as legacyCalendarDateToJdn } from "./pastafari-calendar-core-chronicle.js";
import {
  KOKI_GREGORIAN_YEAR_OFFSET,
  KOKI_SYSTEM_ID,
  KokiDate,
  createKokiImperialDetour,
  isKokiDateLike,
} from "./koki-imperial-detour.js";

const detour = createKokiImperialDetour({ calendarDateToJdn: legacyCalendarDateToJdn });

export {
  KOKI_GREGORIAN_YEAR_OFFSET,
  KOKI_SYSTEM_ID,
  KokiDate,
  isKokiDateLike,
};
export const kokiToJdn = detour.kokiToJdn;
export const jdnToKoki = detour.jdnToKoki;
