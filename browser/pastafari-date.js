import {
  GregorianDate,
  PastafariCalendar as FastPastafariCalendar,
  gregorianToJdn,
  validateGregorian,
} from "./pastafari-calendar-fast.js";

const OUTPUT_FIELDS = Object.freeze([
  "year",
  "cutletName",
  "dayInCutlet",
  "monthName",
  "dayInMonth",
]);

const MAX_CUTLET_DAYS = 10000;

function localToday() {
  const now = new Date();
  return new GregorianDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function parseIsoDate(value, fieldName) {
  if (value instanceof GregorianDate) return value;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new RangeError(`${fieldName} אינו תאריך תקין.`);
    }
    return new GregorianDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
  }

  const match = /^(?<year>-?\d{1,18})-(?<month>\d{2})-(?<day>\d{2})$/.exec(
    String(value ?? "").trim(),
  );

  if (!match) {
    throw new RangeError(`${fieldName} חייב להיות בפורמט YYYY-MM-DD.`);
  }

  const date = new GregorianDate(
    BigInt(match.groups.year),
    Number(match.groups.month),
    Number(match.groups.day),
  );
  validateGregorian(date);
  return date;
}

function padYear(year) {
  const normalized = BigInt(year);
  const negative = normalized < 0n;
  const digits = (negative ? -normalized : normalized).toString().padStart(4, "0");
  return `${negative ? "-" : ""}${digits}`;
}

function toIsoDate(date) {
  return `${padYear(date.year)}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function normalizeInput(value, fieldName) {
  return value == null || value === "" ? localToday() : parseIsoDate(value, fieldName);
}

function floorDiv(a, b) {
  let quotient = a / b;
  const remainder = a % b;
  if (remainder !== 0n && ((remainder > 0n) !== (b > 0n))) quotient -= 1n;
  return quotient;
}

function jdnToGregorian(jdnValue) {
  const jdn = BigInt(jdnValue);
  const a = jdn + 32044n;
  const b = floorDiv(4n * a + 3n, 146097n);
  const c = a - floorDiv(146097n * b, 4n);
  const d = floorDiv(4n * c + 3n, 1461n);
  const e = c - floorDiv(1461n * d, 4n);
  const m = floorDiv(5n * e + 2n, 153n);
  const day = e - floorDiv(153n * m + 2n, 5n) + 1n;
  const month = m + 3n - 12n * floorDiv(m, 10n);
  const year = 100n * b + d - 4800n + floorDiv(m, 10n);

  return new GregorianDate(year, Number(month), Number(day));
}

function fiveFields(value) {
  const json = value.toJSON();
  return Object.freeze({
    year: json.year,
    cutletName: json.cutletName,
    dayInCutlet: json.dayInCutlet,
    monthName: json.monthName,
    dayInMonth: json.dayInMonth,
  });
}

function sameMonthRun(previous, current) {
  return previous.monthName === current.monthName && current.dayInMonth > previous.dayInMonth;
}


const FAST_MODULE_URL = new URL("./pastafari-calendar-fast.js", import.meta.url).href;
const AUTHORITATIVE_MODULE_URL = new URL("./pastafari-calendar-core.js", import.meta.url).href;

function sameFiveFields(left, right) {
  return OUTPUT_FIELDS.every((field) => left[field] === right[field]);
}

function sameCutletViews(left, right) {
  if (
    left.selectedJdn !== right.selectedJdn
    || left.selectedIndex !== right.selectedIndex
    || left.startJdn !== right.startJdn
    || left.endJdn !== right.endJdn
    || left.previousCutletJdn !== right.previousCutletJdn
    || left.nextCutletJdn !== right.nextCutletJdn
    || left.year !== right.year
    || left.cutletName !== right.cutletName
    || left.days.length !== right.days.length
  ) return false;

  for (let i = 0; i < left.days.length; i += 1) {
    if (left.days[i].jdn !== right.days[i].jdn || !sameFiveFields(left.days[i], right.days[i])) {
      return false;
    }
  }
  return true;
}

function normalizeWorkerView(view) {
  return Object.freeze({
    selectedJdn: BigInt(view.selectedJdn),
    selectedIndex: view.selectedIndex,
    startJdn: BigInt(view.startJdn),
    endJdn: BigInt(view.endJdn),
    previousCutletJdn: BigInt(view.previousCutletJdn),
    nextCutletJdn: BigInt(view.nextCutletJdn),
    year: view.year,
    cutletName: view.cutletName,
    days: Object.freeze(view.days.map((day) => Object.freeze({
      jdn: BigInt(day.jdn),
      year: day.year,
      cutletName: day.cutletName,
      dayInCutlet: day.dayInCutlet,
      monthName: day.monthName,
      dayInMonth: day.dayInMonth,
    }))),
  });
}

function createWorkerSource(moduleUrl) {
  return `
    const MODULE_URL = ${JSON.stringify(moduleUrl)};
    const MAX_CUTLET_DAYS = ${MAX_CUTLET_DAYS};
    let moduleNamespace;
    let calendar;

    function canonical(value) {
      const json = typeof value?.toJSON === "function" ? value.toJSON() : value;
      return {
        year: String(json.year),
        cutletName: json.cutletName,
        dayInCutlet: json.dayInCutlet,
        monthName: json.monthName,
        dayInMonth: json.dayInMonth,
      };
    }

    function serializableView(view) {
      return {
        selectedJdn: String(view.selectedJdn),
        selectedIndex: view.selectedIndex,
        startJdn: String(view.startJdn),
        endJdn: String(view.endJdn),
        previousCutletJdn: String(view.previousCutletJdn),
        nextCutletJdn: String(view.nextCutletJdn),
        year: String(view.year),
        cutletName: view.cutletName,
        days: view.days.map((day) => ({
          jdn: String(day.jdn),
          year: String(day.year),
          cutletName: day.cutletName,
          dayInCutlet: day.dayInCutlet,
          monthName: day.monthName,
          dayInMonth: day.dayInMonth,
        })),
      };
    }

    function deriveCutletView(targetJdn, calculationJdn) {
      const selected = canonical(calendar.convertJdn(targetJdn, { calculationJdn }));
      const startJdn = targetJdn - BigInt(selected.dayInCutlet - 1);
      const days = [];
      for (let offset = 0; offset < MAX_CUTLET_DAYS; offset += 1) {
        const jdn = startJdn + BigInt(offset);
        const value = canonical(calendar.convertJdn(jdn, { calculationJdn }));
        if (offset > 0 && value.dayInCutlet === 1) break;
        days.push({ jdn, ...value });
      }
      if (days.length === MAX_CUTLET_DAYS) {
        throw new RangeError("Cutlet length exceeded the safety limit.");
      }
      const endJdn = startJdn + BigInt(days.length - 1);
      return {
        selectedJdn: targetJdn,
        selectedIndex: Number(targetJdn - startJdn),
        startJdn,
        endJdn,
        previousCutletJdn: startJdn - 1n,
        nextCutletJdn: endJdn + 1n,
        year: selected.year,
        cutletName: selected.cutletName,
        days,
      };
    }

    try {
      moduleNamespace = await import(MODULE_URL);
      const fixedToday = () => new moduleNamespace.GregorianDate(2000n, 1, 1);
      calendar = new moduleNamespace.PastafariCalendar({ todayProvider: fixedToday });
      self.postMessage({ type: "ready" });
    } catch (error) {
      self.postMessage({ type: "fatal", error: { name: error?.name, message: error?.message, stack: error?.stack } });
    }

    self.onmessage = ({ data }) => {
      const { id, operation } = data;
      try {
        const targetJdn = BigInt(data.targetJdn);
        const calculationJdn = BigInt(data.calculationJdn);
        let value;
        if (operation === "convert") {
          value = canonical(calendar.convertJdn(targetJdn, { calculationJdn }));
        } else if (operation === "cutletView") {
          const raw = typeof moduleNamespace.getCutletView === "function"
            ? moduleNamespace.getCutletView(targetJdn, { calculationJdn })
            : deriveCutletView(targetJdn, calculationJdn);
          value = serializableView(raw);
        } else {
          throw new TypeError("Unknown worker operation: " + operation);
        }
        self.postMessage({ id, ok: true, value });
      } catch (error) {
        self.postMessage({ id, ok: false, error: { name: error?.name, message: error?.message, stack: error?.stack } });
      }
    };
  `;
}

class CalendarWorkerClient {
  constructor(moduleUrl, name) {
    if (typeof Worker !== "function") {
      throw new Error("Web Workers אינם זמינים בסביבה זו.");
    }
    const blob = new Blob([createWorkerSource(moduleUrl)], { type: "text/javascript" });
    this._blobUrl = URL.createObjectURL(blob);
    this._worker = new Worker(this._blobUrl, { type: "module", name });
    this._nextId = 1;
    this._pending = new Map();
    this._ready = new Promise((resolve, reject) => {
      this._resolveReady = resolve;
      this._rejectReady = reject;
    });
    this._worker.addEventListener("message", ({ data }) => this._onMessage(data));
    this._worker.addEventListener("error", (event) => {
      const error = new Error(event.message || `טעינת ${name} נכשלה.`);
      this._rejectAll(error);
    });
  }

  _onMessage(data) {
    if (data?.type === "ready") {
      this._resolveReady();
      return;
    }
    if (data?.type === "fatal") {
      const error = new Error(data.error?.message || "טעינת מנוע הלוח נכשלה.");
      this._rejectAll(error);
      return;
    }
    const pending = this._pending.get(data?.id);
    if (!pending) return;
    this._pending.delete(data.id);
    if (data.ok) pending.resolve(data.value);
    else pending.reject(new Error(data.error?.message || "חישוב התאריך נכשל."));
  }

  _rejectAll(error) {
    this._rejectReady?.(error);
    for (const pending of this._pending.values()) pending.reject(error);
    this._pending.clear();
  }

  async request(operation, targetJdn, calculationJdn) {
    await this._ready;
    return new Promise((resolve, reject) => {
      const id = this._nextId++;
      this._pending.set(id, { resolve, reject });
      this._worker.postMessage({
        id,
        operation,
        targetJdn: String(targetJdn),
        calculationJdn: String(calculationJdn),
      });
    });
  }

  convert(targetJdn, calculationJdn) {
    return this.request("convert", targetJdn, calculationJdn);
  }

  async cutletView(targetJdn, calculationJdn) {
    return normalizeWorkerView(await this.request("cutletView", targetJdn, calculationJdn));
  }

  terminate() {
    this._worker?.terminate();
    if (this._blobUrl) URL.revokeObjectURL(this._blobUrl);
    this._worker = null;
    this._blobUrl = null;
  }
}

class VerifiedCalendarRouter {
  constructor() {
    this.status = "unverified";
    this._verification = null;
    this._fast = null;
    this._authoritative = null;
  }

  _ensureWorkers() {
    this._fast ??= new CalendarWorkerClient(FAST_MODULE_URL, "pastafari-fast");
    this._authoritative ??= new CalendarWorkerClient(AUTHORITATIVE_MODULE_URL, "pastafari-authoritative");
  }

  async verify(targetJdn, calculationJdn) {
    if (this.status === "verified" || this.status === "rejected") return;
    if (this._verification) return this._verification;
    this._ensureWorkers();
    this.status = "verifying";
    this._verification = (async () => {
      const [authoritativeResult, fastResult] = await Promise.allSettled([
        this._authoritative.convert(targetJdn, calculationJdn),
        this._fast.convert(targetJdn, calculationJdn),
      ]);
      if (authoritativeResult.status === "rejected") throw authoritativeResult.reason;
      const authoritativeValue = authoritativeResult.value;
      let verified = fastResult.status === "fulfilled" && sameFiveFields(authoritativeValue, fastResult.value);
      let verificationDetails = null;

      if (verified) {
        const [authoritativeCurrent, fastCurrent] = await Promise.all([
          this._authoritative.cutletView(targetJdn, calculationJdn),
          this._fast.cutletView(targetJdn, calculationJdn),
        ]);
        verified = sameCutletViews(authoritativeCurrent, fastCurrent);
        verificationDetails = { authoritativeCurrent, fastCurrent };

        if (verified) {
          for (const anchor of [fastCurrent.previousCutletJdn, fastCurrent.nextCutletJdn]) {
            const [authoritativeAdjacent, fastAdjacent] = await Promise.all([
              this._authoritative.cutletView(anchor, calculationJdn),
              this._fast.cutletView(anchor, calculationJdn),
            ]);
            if (!sameCutletViews(authoritativeAdjacent, fastAdjacent)) {
              verified = false;
              verificationDetails = { authoritativeAdjacent, fastAdjacent };
              break;
            }
          }
        }
      }

      if (verified) {
        this.status = "verified";
        this._authoritative.terminate();
        this._authoritative = null;
      } else {
        this.status = "rejected";
        this._fast?.terminate();
        this._fast = null;
        console.error("המימוש המהיר לא עבר אימות; השימוש נשאר במימוש הראשי.", {
          authoritativeValue,
          fastValue: fastResult.status === "fulfilled" ? fastResult.value : null,
          fastError: fastResult.status === "rejected" ? fastResult.reason : null,
          verificationDetails,
        });
      }
      return authoritativeValue;
    })();
    try {
      return await this._verification;
    } catch (error) {
      this.status = "unverified";
      this._verification = null;
      throw error;
    }
  }

  async convert(targetJdn, calculationJdn) {
    if (this.status === "verified") return this._fast.convert(targetJdn, calculationJdn);
    if (this.status === "rejected") return this._authoritative.convert(targetJdn, calculationJdn);
    return this.verify(targetJdn, calculationJdn);
  }

  async cutletView(targetJdn, calculationJdn) {
    if (this.status === "unverified" || this.status === "verifying") {
      await this.verify(targetJdn, calculationJdn);
    }
    const client = this.status === "verified" ? this._fast : this._authoritative;
    return client.cutletView(targetJdn, calculationJdn);
  }
}

const sharedRouter = new VerifiedCalendarRouter();

/**
 * ממשק סינכרוני תואם־לאחור. הוא משתמש ישירות במימוש המהיר.
 * רכיב ברירת־המחדל משתמש בנתיב המאומת והלא־חוסם של Web Workers.
 */
export function getPastafariDate(targetDate = null, calculationDate = null) {
  const target = normalizeInput(targetDate, "תאריך היעד");
  const action = normalizeInput(calculationDate, "יום המעשה");
  const calendar = new FastPastafariCalendar({ todayProvider: localToday });
  return fiveFields(calendar.convert(target, { calculationDate: action }));
}

/** ממשק אסינכרוני מאומת שאינו חוסם את שרשור התצוגה. */
export async function getPastafariDateAsync(targetDate = null, calculationDate = null) {
  const target = normalizeInput(targetDate, "תאריך היעד");
  const action = normalizeInput(calculationDate, "יום המעשה");
  return Object.freeze(await sharedRouter.convert(gregorianToJdn(target), gregorianToJdn(action)));
}

const MONTH_ACCENTS = Object.freeze([
  "#8a7132", "#3f7b68", "#8b5c4d", "#5d6f9b", "#8b6b8d",
  "#6e7d3c", "#9a6b2f", "#467487", "#7a5f47", "#6b6896",
]);

const HTMLElementBase = globalThis.HTMLElement ?? class {};

export class PastafariDateElement extends HTMLElementBase {
  static get observedAttributes() {
    return ["date", "calculation-date", "headless", "no-editor"];
  }

  constructor() {
    super();
    this._value = null;
    this._connected = false;
    this._refreshQueued = false;
    this._refreshSequence = 0;
    this._targetJdn = null;
    this._calculationJdn = null;
    this._cutletStartJdn = null;
    this._cutletEndJdn = null;
    this._readyResolve = null;
    this.ready = new Promise((resolve) => {
      this._readyResolve = resolve;
    });

    if (typeof this.attachShadow !== "function") return;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          direction: rtl;
          font-family: Arial, "Noto Sans Hebrew", sans-serif;
          color: var(--pastafari-color, #24301f);
          max-width: var(--pastafari-max-width, 62rem);
        }
        :host([headless]) { display: none !important; }
        *, *::before, *::after { box-sizing: border-box; }
        button, input { font: inherit; }

        .calendar {
          position: relative;
          min-height: 18rem;
          overflow: hidden;
          border: 1px solid var(--pastafari-border, #c8c2aa);
          border-radius: var(--pastafari-radius, 16px);
          background: var(--pastafari-background, #fffdf4);
          box-shadow: var(--pastafari-shadow, 0 10px 32px rgb(66 55 24 / 10%));
        }

        .calendar.loading > :not(.loading-panel):not(.error) { visibility: hidden; }
        .loading-panel {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: grid;
          place-content: center;
          justify-items: center;
          gap: .85rem;
          min-height: 18rem;
          padding: 2rem;
          text-align: center;
          background: var(--pastafari-background, #fffdf4);
        }
        .loading-panel[hidden] { display: none; }
        .loading-spinner {
          width: 3.25rem;
          height: 3.25rem;
          border: .32rem solid var(--pastafari-month-border, #ddd5bc);
          border-top-color: var(--pastafari-accent, #665718);
          border-radius: 50%;
          animation: pastafari-spin .9s linear infinite;
        }
        .loading-title { margin: 0; font-size: 1.05rem; font-weight: 800; }
        .loading-note { margin: 0; color: var(--pastafari-muted, #67604d); font-size: .82rem; }
        .loading-track {
          width: min(18rem, 75vw);
          height: .38rem;
          overflow: hidden;
          border-radius: 999px;
          background: var(--pastafari-month-border, #ddd5bc);
        }
        .loading-track::after {
          content: "";
          display: block;
          width: 38%;
          height: 100%;
          border-radius: inherit;
          background: var(--pastafari-accent, #665718);
          animation: pastafari-progress 1.35s ease-in-out infinite;
        }
        @keyframes pastafari-spin { to { transform: rotate(1turn); } }
        @keyframes pastafari-progress {
          from { transform: translateX(165%); }
          to { transform: translateX(-265%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-spinner, .loading-track::after { animation-duration: 3s; }
        }

        .calendar-header {
          display: grid;
          grid-template-columns: 2.85rem minmax(0, 1fr) 2.85rem;
          align-items: center;
          gap: .65rem;
          padding: .9rem 1rem;
          border-bottom: 1px solid var(--pastafari-border, #c8c2aa);
          background: var(--pastafari-header-background, #f4eed7);
        }
        .heading-copy {
          min-width: 0;
          text-align: center;
        }
        .eyebrow {
          margin: 0 0 .18rem;
          color: var(--pastafari-muted, #67604d);
          font-size: .8rem;
        }
        .title {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: clamp(1.3rem, 3vw, 1.9rem);
          line-height: 1.25;
          font-weight: 500;
        }
        .name { font-weight: 850; }
        .selected-summary {
          margin: .38rem 0 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.4;
          color: var(--pastafari-muted, #514b3d);
          font-size: .88rem;
        }
        .nav-button {
          width: 2.65rem;
          height: 2.65rem;
          border: 1px solid transparent;
          border-radius: 50%;
          background: transparent;
          color: inherit;
          font-size: 1.65rem;
          line-height: 1;
          cursor: pointer;
        }
        .nav-button:hover,
        .nav-button:focus-visible {
          border-color: var(--pastafari-border, #c8c2aa);
          background: var(--pastafari-hover, #eee5c7);
          outline: none;
        }

        .calendar-viewport {
          max-height: var(--pastafari-calendar-height, 32rem);
          overflow: auto;
          padding: .8rem;
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          scrollbar-gutter: stable;
          background: var(--pastafari-grid-background, #fffdf8);
        }
        .month-group {
          margin: 0 0 1rem;
          border: 1px solid var(--pastafari-month-border, #ddd5bc);
          border-inline-start: .38rem solid var(--month-accent, #8d7c38);
          border-radius: .85rem;
          overflow: clip;
          background: var(--pastafari-month-background, #fff);
        }
        .month-group:last-child { margin-bottom: 0; }
        .month-heading {
          position: sticky;
          top: -.8rem;
          z-index: 2;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: .75rem;
          margin: 0;
          padding: .6rem .75rem;
          border-bottom: 1px solid var(--pastafari-month-border, #ddd5bc);
          background: var(--pastafari-month-heading, #eee6ca);
          font-size: .95rem;
          font-weight: 500;
        }
        .month-range {
          color: var(--pastafari-muted, #67604d);
          font-size: .72rem;
          font-weight: 400;
          white-space: nowrap;
        }
        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: .35rem;
          padding: .55rem;
        }
        .day {
          position: relative;
          min-width: 0;
          min-height: 4.2rem;
          border: 1px solid var(--pastafari-day-border, #e2ddcb);
          border-radius: .65rem;
          background: var(--pastafari-day-background, #fffefa);
          color: inherit;
          padding: .48rem .42rem;
          text-align: right;
          cursor: pointer;
        }
        .day:hover,
        .day:focus-visible {
          border-color: var(--pastafari-accent, #7a6b2d);
          background: var(--pastafari-day-hover, #f7f0d5);
          outline: none;
        }
        .day[aria-current="date"] {
          border: 2px solid var(--pastafari-accent, #665718);
          background: var(--pastafari-selected, #efe2a8);
          box-shadow: inset 0 0 0 1px rgb(255 255 255 / 65%);
        }
        .month-day {
          display: block;
          font-size: 1.12rem;
          font-weight: 800;
          line-height: 1.1;
        }
        .cutlet-day {
          display: block;
          margin-top: .45rem;
          color: var(--pastafari-muted, #67604d);
          font-size: .68rem;
          line-height: 1.15;
        }

        .calendar-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: .75rem;
          padding: .62rem .9rem;
          border-top: 1px solid var(--pastafari-border, #c8c2aa);
          background: var(--pastafari-footer-background, #faf6e8);
        }
        .footer-actions {
          display: flex;
          align-items: center;
          gap: .8rem;
        }
        .text-button {
          border: 0;
          background: transparent;
          color: var(--pastafari-link, #625b43);
          padding: .2rem 0;
          font-size: .8rem;
          text-decoration: underline;
          text-decoration-thickness: .06em;
          text-underline-offset: .16em;
          cursor: pointer;
        }
        .text-button:hover,
        .text-button:focus-visible {
          color: var(--pastafari-link-hover, #211d08);
          outline: 2px solid transparent;
        }
        .status {
          min-width: 0;
          color: var(--pastafari-muted, #67604d);
          font-size: .72rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        dialog {
          width: min(31rem, calc(100vw - 2rem));
          border: 0;
          border-radius: .9rem;
          padding: 0;
          color: #252418;
          background: #fffdf7;
          box-shadow: 0 20px 70px rgb(0 0 0 / 28%);
        }
        dialog::backdrop { background: rgb(0 0 0 / 42%); }
        .converter-form {
          display: grid;
          gap: 1rem;
          padding: 1.15rem;
        }
        .dialog-title { margin: 0; font-size: 1.15rem; }
        .dialog-note {
          margin: -.55rem 0 0;
          color: #666052;
          font-size: .82rem;
          line-height: 1.45;
        }
        label {
          display: grid;
          gap: .35rem;
          font-weight: 700;
        }
        input[type="date"] {
          width: 100%;
          min-height: 2.65rem;
          border: 1px solid #aaa28d;
          border-radius: .55rem;
          background: white;
          padding: .4rem .6rem;
          direction: ltr;
        }
        .advanced {
          border-top: 1px solid #ded8c7;
          padding-top: .8rem;
        }
        .advanced summary {
          width: max-content;
          color: #665f50;
          font-size: .82rem;
          cursor: pointer;
        }
        .advanced-body {
          display: grid;
          gap: .55rem;
          margin-top: .7rem;
          padding: .75rem;
          border-radius: .6rem;
          background: #f4f0e4;
        }
        .advanced-body label { font-size: .85rem; }
        .advanced-help { margin: 0; color: #6c6659; font-size: .74rem; line-height: 1.4; }
        .dialog-actions {
          display: flex;
          gap: .6rem;
          justify-content: flex-start;
        }
        .dialog-actions button {
          border: 1px solid #665f50;
          border-radius: .55rem;
          padding: .52rem .85rem;
          cursor: pointer;
        }
        .apply { background: #373015; color: #fff; }
        .cancel { background: #fff; color: #252418; }
        .error {
          margin: 0;
          padding: .75rem .9rem;
          color: #8b1d1d;
          background: #fff1f1;
          border-top: 1px solid #e6bcbc;
          white-space: pre-wrap;
        }
        [hidden] { display: none !important; }

        @media (max-width: 680px) {
          .days-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .calendar-viewport { max-height: var(--pastafari-calendar-height-mobile, 29rem); }
          .calendar-footer { align-items: flex-start; flex-direction: column; }
        }
        @media (max-width: 420px) {
          .calendar-header { grid-template-columns: 2.55rem minmax(0, 1fr) 2.55rem; padding-inline: .55rem; }
          .nav-button { width: 2.4rem; height: 2.4rem; }
          .selected-summary { white-space: normal; }
          .days-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .day { min-height: 3.8rem; }
        }
      </style>

      <article class="calendar loading" part="calendar card" aria-busy="true">
        <div class="loading-panel" role="status" aria-live="polite">
          <span class="loading-spinner" aria-hidden="true"></span>
          <p class="loading-title">הלוח הפסטפרי נטען</p>
          <p class="loading-note">המימוש הראשי נטען ברקע; שאר הדף נשאר זמין.</p>
          <span class="loading-track" aria-hidden="true"></span>
          <span class="loading-elapsed">מתחיל בחישוב…</span>
        </div>
        <header class="calendar-header" part="header navigation">
          <button class="nav-button next-cutlet" type="button" aria-label="הקציצה הבאה" title="הקציצה הבאה">‹</button>
          <div class="heading-copy">
            <p class="eyebrow">שנה <span data-field="year"></span> · <span class="cutlet-length"></span></p>
            <h2 class="title">קציצת <strong class="name" data-field="cutletName"></strong></h2>
            <p class="selected-summary" part="sentence" aria-live="polite">
              היום ה־<strong data-field="dayInCutlet"></strong> בקציצה ·
              חודש <strong class="name" data-field="monthName"></strong>, היום ה־<strong data-field="dayInMonth"></strong>
            </p>
          </div>
          <button class="nav-button previous-cutlet" type="button" aria-label="הקציצה הקודמת" title="הקציצה הקודמת">›</button>
        </header>

        <div class="calendar-viewport" part="days" aria-label="ימי הקציצה"></div>

        <footer class="calendar-footer" part="footer">
          <div class="footer-actions tools">
            <button class="text-button today-button" type="button">חזרה להיום</button>
            <button class="text-button convert-button" type="button">מעבר לתאריך…</button>
          </div>
          <span class="status"></span>
        </footer>

        <p class="error" part="error" role="alert" hidden></p>
      </article>

      <dialog part="dialog">
        <form class="converter-form" method="dialog">
          <h2 class="dialog-title">מעבר ליום אחר</h2>
          <p class="dialog-note">בחר תאריך אזרחי כדי לעבור אל היום המתאים בלוח.</p>

          <label>
            יום להצגה
            <input class="target-input" type="date" required>
          </label>

          <details class="advanced">
            <summary>אפשרויות חישוב</summary>
            <div class="advanced-body">
              <label>
                יום המעשה
                <input class="calculation-input" type="date" required>
              </label>
              <p class="advanced-help">שינוי יום המעשה עשוי לשנות את מבנה הלוח ואת שמותיו.</p>
              <button class="text-button reset-calculation" type="button">החזר את יום המעשה להיום</button>
            </div>
          </details>

          <div class="dialog-actions">
            <button class="apply" type="button">עבור ליום</button>
            <button class="cancel" value="cancel">ביטול</button>
          </div>
        </form>
      </dialog>
    `;

    this._calendarElement = this.shadowRoot.querySelector(".calendar");
    this._loadingPanel = this.shadowRoot.querySelector(".loading-panel");
    this._loadingElapsed = this.shadowRoot.querySelector(".loading-elapsed");
    this._loadingTimer = null;
    this._error = this.shadowRoot.querySelector(".error");
    this._dialog = this.shadowRoot.querySelector("dialog");
    this._targetInput = this.shadowRoot.querySelector(".target-input");
    this._calculationInput = this.shadowRoot.querySelector(".calculation-input");
    this._applyButton = this.shadowRoot.querySelector(".apply");
    this._convertButton = this.shadowRoot.querySelector(".convert-button");
    this._todayButton = this.shadowRoot.querySelector(".today-button");
    this._resetCalculationButton = this.shadowRoot.querySelector(".reset-calculation");
    this._previousButton = this.shadowRoot.querySelector(".previous-cutlet");
    this._nextButton = this.shadowRoot.querySelector(".next-cutlet");
    this._viewport = this.shadowRoot.querySelector(".calendar-viewport");
    this._status = this.shadowRoot.querySelector(".status");
    this._cutletLength = this.shadowRoot.querySelector(".cutlet-length");
    this._tools = this.shadowRoot.querySelector(".tools");

    this._convertButton.addEventListener("click", () => this.openEditor());
    this._todayButton.addEventListener("click", () => {
      this.date = toIsoDate(localToday());
    });
    this._resetCalculationButton.addEventListener("click", () => {
      this._calculationInput.value = toIsoDate(localToday());
    });
    this._previousButton.addEventListener("click", () => {
      if (this._cutletStartJdn != null) this._selectJdn(this._cutletStartJdn - 1n);
    });
    this._nextButton.addEventListener("click", () => {
      if (this._cutletEndJdn != null) this._selectJdn(this._cutletEndJdn + 1n);
    });
    this._applyButton.addEventListener("click", () => {
      try {
        parseIsoDate(this._targetInput.value, "התאריך להמרה");
        parseIsoDate(this._calculationInput.value, "יום המעשה");
        this.date = this._targetInput.value;
        this.calculationDate = this._calculationInput.value;
        this._dialog.close();
      } catch (error) {
        this._showError(error);
      }
    });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;
    this._connected = true;
    this._syncEditorVisibility();
    this._startLoadingClock();
    queueMicrotask(async () => {
      const value = await this.refresh();
      this._readyResolve?.(value);
      this._readyResolve = null;
    });
  }

  disconnectedCallback() {
    this._stopLoadingClock();
  }

  attributeChangedCallback() {
    if (!this._connected) return;
    this._syncEditorVisibility();
    this._scheduleRefresh();
  }

  get date() {
    return this.getAttribute("date") || toIsoDate(localToday());
  }

  set date(value) {
    if (value == null || value === "") this.removeAttribute("date");
    else this.setAttribute("date", String(value));
  }

  get calculationDate() {
    return this.getAttribute("calculation-date") || toIsoDate(localToday());
  }

  set calculationDate(value) {
    if (value == null || value === "") this.removeAttribute("calculation-date");
    else this.setAttribute("calculation-date", String(value));
  }

  get value() {
    return this._value;
  }

  openEditor() {
    this._targetInput.value = this.date;
    this._calculationInput.value = this.calculationDate;
    if (typeof this._dialog.showModal === "function") this._dialog.showModal();
    else this._dialog.setAttribute("open", "");
  }

  async refresh(targetDate = this.date, calculationDate = this.calculationDate) {
    if (!this.shadowRoot) return null;
    const sequence = ++this._refreshSequence;
    this._error.hidden = true;

    try {
      const target = normalizeInput(targetDate, "תאריך היעד");
      const action = normalizeInput(calculationDate, "יום המעשה");
      const targetJdn = gregorianToJdn(target);
      const calculationJdn = gregorianToJdn(action);
      const value = Object.freeze(await sharedRouter.convert(targetJdn, calculationJdn));
      if (sequence !== this._refreshSequence) return null;

      this._targetJdn = targetJdn;
      this._calculationJdn = calculationJdn;
      this._value = value;

      this._renderHeader(value);
      if (!this.hasAttribute("headless")) {
        const view = await sharedRouter.cutletView(targetJdn, calculationJdn);
        if (sequence !== this._refreshSequence) return null;
        this._renderCutletView(view);
      }

      this._finishInitialLoading();
      this.dispatchEvent(new CustomEvent("pastafari-change", {
        detail: value,
        bubbles: true,
        composed: true,
      }));

      return value;
    } catch (error) {
      this._value = null;
      this._finishInitialLoading();
      this._showError(error);
      this.dispatchEvent(new CustomEvent("pastafari-error", {
        detail: { error },
        bubbles: true,
        composed: true,
      }));
      return null;
    }
  }

  _scheduleRefresh() {
    if (this._refreshQueued) return;
    this._refreshQueued = true;
    queueMicrotask(() => {
      this._refreshQueued = false;
      void this.refresh();
    });
  }

  _renderHeader(value) {
    for (const field of OUTPUT_FIELDS) {
      for (const node of this.shadowRoot.querySelectorAll(`[data-field="${field}"]`)) {
        node.textContent = String(value[field]);
      }
    }
  }

  _renderCutletView(view) {
    const days = view.days.map((day) => ({
      jdn: day.jdn,
      value: Object.freeze({
        year: day.year,
        cutletName: day.cutletName,
        dayInCutlet: day.dayInCutlet,
        monthName: day.monthName,
        dayInMonth: day.dayInMonth,
      }),
    }));
    const selectedValue = days[view.selectedIndex]?.value ?? this._value;

    this._cutletStartJdn = view.startJdn;
    this._cutletEndJdn = view.endJdn;
    this._cutletLength.textContent = `${days.length} ימים`;
    this._status.textContent = `היום ה־${selectedValue.dayInCutlet} מתוך ${days.length}`;

    const groups = [];
    for (const day of days) {
      const previousGroup = groups.at(-1);
      const previousDay = previousGroup?.days.at(-1)?.value;
      if (!previousGroup || !sameMonthRun(previousDay, day.value)) {
        groups.push({ name: day.value.monthName, days: [day] });
      } else {
        previousGroup.days.push(day);
      }
    }

    const fragment = document.createDocumentFragment();
    const monthAccents = new Map();
    let nextAccent = 0;
    for (const group of groups) {
      if (!monthAccents.has(group.name)) {
        monthAccents.set(group.name, MONTH_ACCENTS[nextAccent % MONTH_ACCENTS.length]);
        nextAccent += 1;
      }
      const section = document.createElement("section");
      section.className = "month-group";
      section.setAttribute("part", "month");
      section.style.setProperty("--month-accent", monthAccents.get(group.name));

      const heading = document.createElement("h3");
      heading.className = "month-heading";
      const first = group.days[0].value;
      const last = group.days.at(-1).value;
      heading.innerHTML = `<span>חודש <strong class="name"></strong></span><span class="month-range"></span>`;
      heading.querySelector("strong").textContent = group.name;
      heading.querySelector(".month-range").textContent =
        first.dayInMonth === last.dayInMonth
          ? `יום ${first.dayInMonth}`
          : `ימים ${first.dayInMonth}־${last.dayInMonth}`;

      const grid = document.createElement("div");
      grid.className = "days-grid";

      for (const day of group.days) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "day";
        button.setAttribute("part", "day");
        button.dataset.jdn = day.jdn.toString();
        button.setAttribute(
          "aria-label",
          `היום ה־${day.value.dayInMonth} בחודש ${day.value.monthName}, היום ה־${day.value.dayInCutlet} בקציצה ${day.value.cutletName}`,
        );
        if (day.jdn === this._targetJdn) button.setAttribute("aria-current", "date");

        const monthDay = document.createElement("span");
        monthDay.className = "month-day";
        monthDay.textContent = String(day.value.dayInMonth);

        const cutletDay = document.createElement("span");
        cutletDay.className = "cutlet-day";
        cutletDay.textContent = `יום ה־${day.value.dayInCutlet} בקציצה`;

        button.append(monthDay, cutletDay);
        button.addEventListener("click", () => this._selectJdn(day.jdn));
        grid.append(button);
      }

      section.append(heading, grid);
      fragment.append(section);
    }

    this._viewport.replaceChildren(fragment);

    requestAnimationFrame(() => {
      const selected = this._viewport.querySelector('[aria-current="date"]');
      if (!selected) return;
      const desiredTop = selected.offsetTop - this._viewport.clientHeight / 2 + selected.clientHeight / 2;
      this._viewport.scrollTop = Math.max(0, desiredTop);
    });
  }

  _selectJdn(jdn) {
    const gregorian = jdnToGregorian(jdn);
    this.date = toIsoDate(gregorian);
  }

  _startLoadingClock() {
    if (!this._loadingElapsed || this._loadingTimer) return;
    const started = performance.now();
    const update = () => {
      const seconds = Math.max(0, Math.floor((performance.now() - started) / 1000));
      this._loadingElapsed.textContent = seconds < 1
        ? "מתחיל בחישוב…"
        : `החישוב נמשך ${seconds} שניות…`;
    };
    update();
    this._loadingTimer = setInterval(update, 1000);
  }

  _stopLoadingClock() {
    if (this._loadingTimer) clearInterval(this._loadingTimer);
    this._loadingTimer = null;
  }

  _finishInitialLoading() {
    this._stopLoadingClock();
    this._loadingPanel.hidden = true;
    this._calendarElement.classList.remove("loading");
    this._calendarElement.setAttribute("aria-busy", "false");
  }

  _showError(error) {
    this._error.textContent = error instanceof Error ? error.message : String(error);
    this._error.hidden = false;
  }

  _syncEditorVisibility() {
    if (this._tools) this._tools.hidden = this.hasAttribute("no-editor");
  }
}

if (globalThis.customElements && !customElements.get("pastafari-date")) {
  customElements.define("pastafari-date", PastafariDateElement);
}
