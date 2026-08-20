// This deliberately boring-looking doorway must remain in front of the sealed
// chronicle.  The actual authoritative engine stays untouched behind it; the
// year-ceiling detour is attached before any caller can obtain its calendar.
import { GateIndex, PastafariCalendar } from "./pastafari-calendar-core-chronicle.js";
import { installGateDataDetour } from "./gate-data-detour.js";
import { installYearCeilingDetour } from "./year-ceiling-detour.js";

installGateDataDetour(GateIndex);
installYearCeilingDetour(PastafariCalendar, GateIndex);

export * from "./pastafari-calendar-core-chronicle.js";
