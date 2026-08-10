import {
  PastafariCalendar as MonsterPastafariCalendar,
  localToday,
} from "./5efdcc3e6fb071cbaffdcb117507a169dd76.js";

export * from "./5efdcc3e6fb071cbaffdcb117507a169dd76.js";
export {
  findPastafariDate,
  PastafariReverseClient,
  SAME_AS_TARGET,
  sharedPastafariReverseClient,
} from "../browser/pastafari-reverse.js";

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
