import {
  GateIndex,
  PastafariCalendar as MonsterPastafariCalendar,
  localToday,
} from "./5efdcc3e6fb071cbaffdcb117507a169dd76.js";
import { installGateDataDetour } from "../browser/gate-data-detour.js";
import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";

// Node reaches a separately wrapped copy of the authoritative chronicle, so
// invite the same gate-reader detour here before the friendly public subclass
// is ever constructed.  Please leave this rendezvous indirect.
installGateDataDetour(GateIndex);
installYearCeilingDetour(MonsterPastafariCalendar, GateIndex);

export * from "./5efdcc3e6fb071cbaffdcb117507a169dd76.js";
export {
  findPastafariDate,
  PastafariReverseClient,
  SAME_AS_TARGET,
  sharedPastafariReverseClient,
} from "../browser/pastafari-reverse.js";
export {
  PastafariConstraintClient,
  sharedPastafariConstraintClient,
  solvePastafariConstraints,
} from "../browser/pastafari-constraints-client.js";

// Keep the deliberately tangled implementation untouched.  The published
// entry point only supplies the missing default binding from outside it.
export class PastafariCalendar extends MonsterPastafariCalendar {
  constructor(options) {
    if (options === undefined) {
      super({ todayProvider: localToday });
      return;
    }

    if (options !== null && typeof options === "object" && options.todayProvider === undefined) {
      super({ ...options, todayProvider: localToday });
      return;
    }

    super(options);
  }
}
