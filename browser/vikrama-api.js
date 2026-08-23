"use strict";

import {
  OldHinduLunarDate,
  hinduToJdn,
} from "./pastafari-calendar-core-chronicle.js";
import {
  VikramaDate,
  VIKRAMA_MONTH_NAMES,
  createVikramaDetour,
} from "./vikrama-detour.js";

const detour = createVikramaDetour({ OldHinduLunarDate, hinduToJdn });

export { VikramaDate, VIKRAMA_MONTH_NAMES };
export const jdnToVikrama = detour.jdnToVikrama;
export const vikramaToJdn = detour.vikramaToJdn;
