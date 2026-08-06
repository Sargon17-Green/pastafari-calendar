import { sharedPastafariRouter } from "./pastafari-calendar-router.js";

const OUTPUT_FIELDS = Object.freeze([
  "year",
  "cutletName",
  "dayInCutlet",
  "monthName",
  "dayInMonth",
]);

const MONTH_ACCENTS = Object.freeze([
  "#8a7132", "#3f7b68", "#8b5c4d", "#5d6f9b", "#8b6b8d",
  "#6e7d3c", "#9a6b2f", "#467487", "#7a5f47", "#6b6896",
]);

function floorDiv(a, b) {
  let quotient = a / b;
  const remainder = a % b;
  if (remainder !== 0n && ((remainder > 0n) !== (b > 0n))) quotient -= 1n;
  return quotient;
}

function isGregorianLeapYear(year) {
  const y = BigInt(year);
  return y % 4n === 0n && (y % 100n !== 0n || y % 400n === 0n);
}

function daysInGregorianMonth(year, month) {
  if (month === 2) return isGregorianLeapYear(year) ? 29 : 28;
  return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1] ?? 0;
}

function validateGregorian(date, fieldName) {
  if (!date || typeof date !== "object") {
    throw new TypeError(`${fieldName} אינו תאריך תקין.`);
  }
  if (!Number.isInteger(date.month) || date.month < 1 || date.month > 12) {
    throw new RangeError(`${fieldName}: החודש חייב להיות בין 1 ל־12.`);
  }
  const maxDay = daysInGregorianMonth(date.year, date.month);
  if (!Number.isInteger(date.day) || date.day < 1 || date.day > maxDay) {
    throw new RangeError(`${fieldName}: היום אינו קיים בחודש שנבחר.`);
  }
  return date;
}

function localToday() {
  const now = new Date();
  return Object.freeze({
    year: BigInt(now.getFullYear()),
    month: now.getMonth() + 1,
    day: now.getDate(),
  });
}

function parseIsoDate(value, fieldName) {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) throw new RangeError(`${fieldName} אינו תאריך תקין.`);
    return Object.freeze({
      year: BigInt(value.getFullYear()),
      month: value.getMonth() + 1,
      day: value.getDate(),
    });
  }

  if (value && typeof value === "object" && "year" in value && "month" in value && "day" in value) {
    return Object.freeze(validateGregorian({
      year: BigInt(value.year),
      month: Number(value.month),
      day: Number(value.day),
    }, fieldName));
  }

  const match = /^(?<year>[+-]?\d{1,18})-(?<month>\d{2})-(?<day>\d{2})$/.exec(
    String(value ?? "").trim(),
  );
  if (!match) throw new RangeError(`${fieldName} חייב להיות בפורמט YYYY-MM-DD.`);

  return Object.freeze(validateGregorian({
    year: BigInt(match.groups.year),
    month: Number(match.groups.month),
    day: Number(match.groups.day),
  }, fieldName));
}

function normalizeInput(value, fieldName) {
  return value == null || value === "" ? localToday() : parseIsoDate(value, fieldName);
}

function gregorianToJdn(dateValue) {
  const date = validateGregorian(dateValue, "התאריך");
  const month = BigInt(date.month);
  const day = BigInt(date.day);
  const a = floorDiv(14n - month, 12n);
  const year = BigInt(date.year) + 4800n - a;
  const shiftedMonth = month + 12n * a - 3n;
  return day
    + floorDiv(153n * shiftedMonth + 2n, 5n)
    + 365n * year
    + floorDiv(year, 4n)
    - floorDiv(year, 100n)
    + floorDiv(year, 400n)
    - 32045n;
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
  return Object.freeze({ year, month: Number(month), day: Number(day) });
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

function canonicalResult(value) {
  const result = {};
  for (const field of OUTPUT_FIELDS) result[field] = value[field];
  return Object.freeze(result);
}

function sameMonthRun(previous, current) {
  return previous?.monthName === current.monthName
    && current.dayInMonth === previous.dayInMonth + 1;
}

function monthAccent(name, palette) {
  if (!palette.has(name)) {
    palette.set(name, MONTH_ACCENTS[palette.size % MONTH_ACCENTS.length]);
  }
  return palette.get(name);
}

/**
 * Public, verified, non-blocking conversion API.
 * Both names are asynchronous; the older name is retained as a compatibility alias.
 */
export async function getPastafariDateAsync(targetDate = null, calculationDate = null) {
  const target = normalizeInput(targetDate, "תאריך היעד");
  const calculation = normalizeInput(calculationDate, "יום המעשה");
  return canonicalResult(await sharedPastafariRouter.convert(
    gregorianToJdn(target),
    gregorianToJdn(calculation),
  ));
}

export const getPastafariDate = getPastafariDateAsync;

const HTMLElementBase = globalThis.HTMLElement ?? class {};

export class PastafariDateElement extends HTMLElementBase {
  static get observedAttributes() {
    return ["date", "calculation-date", "headless", "no-editor"];
  }

  constructor() {
    super();
    this._connected = false;
    this._refreshQueued = false;
    this._generation = 0;
    this._value = null;
    this._targetJdn = null;
    this._calculationJdn = null;
    this._cutlets = new Map();
    this._orderedStarts = [];
    this._loadingBefore = false;
    this._loadingAfter = false;
    this._activeStartJdn = null;
    this._readySettled = false;
    this.ready = new Promise((resolve, reject) => {
      this._resolveReady = resolve;
      this._rejectReady = reject;
    });

    if (typeof this.attachShadow !== "function") return;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          direction: rtl;
          max-width: var(--pastafari-max-width, 64rem);
          color: var(--pastafari-color, #28301f);
          font-family: Arial, "Noto Sans Hebrew", sans-serif;
        }
        :host([headless]) { display: none !important; }
        *, *::before, *::after { box-sizing: border-box; }
        button, input { font: inherit; }

        .calendar {
          position: relative;
          min-height: 19rem;
          overflow: hidden;
          border: 1px solid var(--pastafari-border, #c9c1a8);
          border-radius: var(--pastafari-radius, 16px);
          background: var(--pastafari-background, #fffdf5);
          box-shadow: var(--pastafari-shadow, 0 10px 32px rgb(66 55 24 / 10%));
        }
        .toolbar {
          display: grid;
          grid-template-columns: 2.85rem minmax(0, 1fr) 2.85rem;
          align-items: center;
          gap: .65rem;
          padding: .85rem 1rem;
          border-bottom: 1px solid var(--pastafari-border, #c9c1a8);
          background: var(--pastafari-header-background, #f4eed8);
        }
        .toolbar-copy { min-width: 0; text-align: center; }
        .eyebrow { margin: 0 0 .2rem; color: #6c6551; font-size: .8rem; }
        .selected-summary {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          line-height: 1.45;
        }
        .name { font-weight: 850; }
        .nav-button {
          width: 2.65rem;
          height: 2.65rem;
          border: 1px solid transparent;
          border-radius: 50%;
          background: transparent;
          color: inherit;
          font-size: 1.6rem;
          cursor: pointer;
        }
        .nav-button:hover,
        .nav-button:focus-visible {
          border-color: var(--pastafari-border, #c9c1a8);
          background: #ece3c4;
          outline: none;
        }

        .viewport {
          position: relative;
          max-height: var(--pastafari-calendar-height, 34rem);
          overflow: auto;
          padding: .75rem;
          overscroll-behavior: contain;
          scrollbar-gutter: stable;
          background: var(--pastafari-grid-background, #fffdf8);
        }
        .edge-loader {
          min-height: 1.8rem;
          display: grid;
          place-items: center;
          color: #746d58;
          font-size: .78rem;
        }
        .cutlet {
          margin: 0 0 1.15rem;
          scroll-margin-block: .75rem;
        }
        .cutlet:last-of-type { margin-bottom: 0; }
        .cutlet-heading {
          position: sticky;
          top: -.75rem;
          z-index: 5;
          margin: 0 0 .65rem;
          padding: .72rem .85rem;
          border: 1px solid var(--pastafari-border, #c9c1a8);
          border-radius: .8rem;
          background: color-mix(in srgb, var(--pastafari-header-background, #f4eed8) 92%, white);
          box-shadow: 0 3px 10px rgb(66 55 24 / 8%);
          text-align: center;
          font-size: 1.05rem;
          font-weight: 500;
        }
        .month-run {
          margin: 0 0 .75rem;
          overflow: clip;
          border: 1px solid #ded6bd;
          border-inline-start: .38rem solid var(--month-accent);
          border-radius: .78rem;
          background: #fff;
        }
        .month-run:last-child { margin-bottom: 0; }
        .month-heading {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: .7rem;
          padding: .48rem .7rem;
          border-bottom: 1px solid #e5dec9;
          background: color-mix(in srgb, var(--month-accent) 10%, white);
        }
        .month-heading strong { font-size: .95rem; }
        .month-range { color: #706955; font-size: .75rem; white-space: nowrap; }
        .days {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: .4rem;
          padding: .55rem;
        }
        .day {
          position: relative;
          min-height: 4.2rem;
          display: grid;
          align-content: center;
          justify-items: center;
          gap: .15rem;
          border: 1px solid #ded8c5;
          border-radius: .62rem;
          background: #fffefa;
          color: inherit;
          cursor: pointer;
        }
        .day:hover,
        .day:focus-visible {
          border-color: var(--month-accent);
          background: color-mix(in srgb, var(--month-accent) 7%, white);
          outline: none;
        }
        .day[aria-current="date"] {
          border: 2px solid var(--pastafari-accent, #675817);
          background: #f6ecc5;
          box-shadow: 0 0 0 2px rgb(103 88 23 / 12%);
        }
        .day-in-month { font-size: 1.15rem; font-weight: 850; }
        .day-in-cutlet { color: #756e5b; font-size: .7rem; }

        .footer {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 2.8rem;
          padding: .55rem .85rem;
          border-top: 1px solid var(--pastafari-border, #c9c1a8);
          background: #fbf7e8;
        }
        .editor-link {
          border: 0;
          border-bottom: 1px dotted currentColor;
          padding: .15rem .05rem;
          background: transparent;
          color: #5f5948;
          font-size: .82rem;
          cursor: pointer;
        }
        :host([no-editor]) .editor-link { display: none; }

        .overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: grid;
          place-content: center;
          justify-items: center;
          gap: .75rem;
          min-height: 19rem;
          padding: 2rem;
          text-align: center;
          background: var(--pastafari-background, #fffdf5);
        }
        .overlay[hidden] { display: none; }
        .spinner {
          width: 3.1rem;
          height: 3.1rem;
          border: .32rem solid #ddd5bc;
          border-top-color: var(--pastafari-accent, #675817);
          border-radius: 50%;
          animation: spin .9s linear infinite;
        }
        .loading-title { margin: 0; font-weight: 850; }
        .loading-note, .error-message { margin: 0; color: #69624f; font-size: .84rem; }
        .retry-button {
          border: 1px solid #a99d78;
          border-radius: .65rem;
          padding: .55rem .9rem;
          background: #f4edd5;
          color: inherit;
          cursor: pointer;
        }
        @keyframes spin { to { transform: rotate(1turn); } }
        @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 3s; } }
        @media (max-width: 38rem) {
          .days { gap: .28rem; padding: .42rem; }
          .day { min-height: 3.55rem; }
          .day-in-month { font-size: 1rem; }
          .day-in-cutlet { font-size: .64rem; }
        }

        dialog {
          width: min(28rem, calc(100vw - 2rem));
          border: 1px solid #bbb092;
          border-radius: 1rem;
          padding: 0;
          color: inherit;
          background: #fffdf7;
          box-shadow: 0 24px 70px rgb(0 0 0 / 28%);
        }
        dialog::backdrop { background: rgb(27 24 16 / 40%); }
        .dialog-form { display: grid; gap: 1rem; padding: 1.1rem; }
        .dialog-form h2 { margin: 0; font-size: 1.2rem; }
        .field { display: grid; gap: .35rem; }
        .field span { font-size: .86rem; font-weight: 750; }
        .field input {
          width: 100%;
          direction: ltr;
          border: 1px solid #c9c0a6;
          border-radius: .55rem;
          padding: .58rem .68rem;
          background: white;
        }
        details {
          border-top: 1px solid #e0d8c0;
          padding-top: .75rem;
        }
        summary { color: #625c4a; font-size: .82rem; cursor: pointer; }
        details .field { margin-top: .75rem; }
        .dialog-error { min-height: 1.1rem; margin: 0; color: #922; font-size: .8rem; }
        .dialog-actions { display: flex; justify-content: flex-start; gap: .55rem; }
        .dialog-actions button {
          border: 1px solid #b9ae8d;
          border-radius: .58rem;
          padding: .55rem .85rem;
          background: #f4edd5;
          cursor: pointer;
        }
        .dialog-actions .primary { background: #675817; color: white; border-color: #675817; }
      </style>

      <section class="calendar" part="calendar" aria-busy="true">
        <header class="toolbar" part="toolbar">
          <button class="nav-button previous" type="button" aria-label="מעבר לקציצה הקודמת">›</button>
          <div class="toolbar-copy">
            <p class="eyebrow">לוח השנה הפסטפרי</p>
            <p class="selected-summary" aria-live="polite">טוען את התאריך…</p>
          </div>
          <button class="nav-button next" type="button" aria-label="מעבר לקציצה הבאה">‹</button>
        </header>

        <div class="viewport" part="viewport" tabindex="0">
          <div class="edge-loader before" aria-hidden="true"></div>
          <div class="cutlet-list"></div>
          <div class="edge-loader after" aria-hidden="true"></div>
        </div>

        <footer class="footer" part="footer">
          <button class="editor-link" type="button">מעבר לתאריך…</button>
        </footer>

        <div class="overlay loading" part="loading">
          <div class="spinner" aria-hidden="true"></div>
          <p class="loading-title">הלוח נטען</p>
          <p class="loading-note">החישוב נעשה ברקע ואינו מעכב את שאר הדף.</p>
        </div>

        <div class="overlay error" part="error" hidden>
          <p class="loading-title">לא ניתן להציג את הלוח</p>
          <p class="error-message"></p>
          <button class="retry-button" type="button">ניסיון חוזר</button>
        </div>
      </section>

      <dialog>
        <form class="dialog-form" method="dialog" novalidate>
          <h2>מעבר לתאריך</h2>
          <label class="field">
            <span>תאריך לבדיקה</span>
            <input name="target" inputmode="numeric" autocomplete="off" placeholder="YYYY-MM-DD" required>
          </label>
          <details>
            <summary>אפשרויות חישוב</summary>
            <label class="field">
              <span>יום המעשה</span>
              <input name="calculation" inputmode="numeric" autocomplete="off" placeholder="YYYY-MM-DD">
            </label>
          </details>
          <p class="dialog-error" role="alert"></p>
          <div class="dialog-actions">
            <button class="primary" value="apply" type="submit">הצגה</button>
            <button value="cancel" type="button">ביטול</button>
          </div>
        </form>
      </dialog>
    `;

    this._els = {
      calendar: this.shadowRoot.querySelector(".calendar"),
      summary: this.shadowRoot.querySelector(".selected-summary"),
      viewport: this.shadowRoot.querySelector(".viewport"),
      list: this.shadowRoot.querySelector(".cutlet-list"),
      beforeLoader: this.shadowRoot.querySelector(".edge-loader.before"),
      afterLoader: this.shadowRoot.querySelector(".edge-loader.after"),
      loading: this.shadowRoot.querySelector(".overlay.loading"),
      error: this.shadowRoot.querySelector(".overlay.error"),
      errorMessage: this.shadowRoot.querySelector(".error-message"),
      dialog: this.shadowRoot.querySelector("dialog"),
      form: this.shadowRoot.querySelector("form"),
      targetInput: this.shadowRoot.querySelector('input[name="target"]'),
      calculationInput: this.shadowRoot.querySelector('input[name="calculation"]'),
      dialogError: this.shadowRoot.querySelector(".dialog-error"),
    };

    this.shadowRoot.querySelector(".previous").addEventListener("click", () => this._scrollAdjacent(-1));
    this.shadowRoot.querySelector(".next").addEventListener("click", () => this._scrollAdjacent(1));
    this.shadowRoot.querySelector(".editor-link").addEventListener("click", () => this._openDialog());
    this.shadowRoot.querySelector(".retry-button").addEventListener("click", () => this._retry());
    this.shadowRoot.querySelector('.dialog-actions button[value="cancel"]').addEventListener("click", () => this._els.dialog.close());
    this._els.form.addEventListener("submit", (event) => this._applyDialog(event));
    this._els.viewport.addEventListener("scroll", () => this._onScroll(), { passive: true });
    this._els.list.addEventListener("click", (event) => this._selectDay(event));
  }

  connectedCallback() {
    this._connected = true;
    this._queueRefresh();
  }

  disconnectedCallback() {
    this._connected = false;
    this._generation += 1;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this._connected) return;
    if (name === "headless" || name === "no-editor") return;
    this._queueRefresh();
  }

  get value() {
    return this._value;
  }

  async refresh() {
    const generation = ++this._generation;
    const targetDate = normalizeInput(this.getAttribute("date"), "תאריך היעד");
    const calculationDate = normalizeInput(this.getAttribute("calculation-date"), "יום המעשה");
    const targetJdn = gregorianToJdn(targetDate);
    const calculationJdn = gregorianToJdn(calculationDate);

    this._targetJdn = targetJdn;
    this._calculationJdn = calculationJdn;
    this._cutlets.clear();
    this._orderedStarts = [];
    this._activeStartJdn = null;
    this._showLoading();

    try {
      const [value, currentView] = await Promise.all([
        sharedPastafariRouter.convert(targetJdn, calculationJdn),
        sharedPastafariRouter.getCutletView(targetJdn, calculationJdn),
      ]);
      if (generation !== this._generation) return null;

      this._value = canonicalResult(value);
      this._storeCutlet(currentView);
      this._activeStartJdn = currentView.startJdn;
      this._renderSummary();
      this._renderCutlets();
      this._hideOverlays();
      this._els.calendar.setAttribute("aria-busy", "false");
      queueMicrotask(() => this._scrollSelectedIntoView());

      if (!this._readySettled) {
        this._readySettled = true;
        this._resolveReady(this._value);
      }
      this.dispatchEvent(new CustomEvent("pastafari-change", {
        bubbles: true,
        composed: true,
        detail: this._value,
      }));

      void this._primeAdjacent(currentView, generation);
      return this._value;
    } catch (error) {
      if (generation !== this._generation) return null;
      this._showError(error);
      if (!this._readySettled) {
        this._readySettled = true;
        this._rejectReady(error);
      }
      throw error;
    }
  }

  _queueRefresh() {
    if (this._refreshQueued) return;
    this._refreshQueued = true;
    queueMicrotask(() => {
      this._refreshQueued = false;
      if (this._connected) void this.refresh().catch(() => {});
    });
  }

  _storeCutlet(view) {
    const start = BigInt(view.startJdn);
    if (this._cutlets.has(start)) return false;
    this._cutlets.set(start, view);
    this._orderedStarts = [...this._cutlets.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return true;
  }

  async _primeAdjacent(currentView, generation) {
    const tasks = [
      this._loadCutletAt(currentView.previousCutletJdn, "before", generation),
      this._loadCutletAt(currentView.nextCutletJdn, "after", generation),
    ];
    await Promise.allSettled(tasks);
  }

  async _loadCutletAt(targetJdn, direction, generation = this._generation) {
    const flag = direction === "before" ? "_loadingBefore" : "_loadingAfter";
    if (this[flag]) return null;
    this[flag] = true;
    this._updateEdgeLoaders();
    const viewport = this._els.viewport;
    const oldHeight = viewport.scrollHeight;
    const oldTop = viewport.scrollTop;

    try {
      const view = await sharedPastafariRouter.getCutletView(BigInt(targetJdn), this._calculationJdn);
      if (generation !== this._generation) return null;
      if (!this._storeCutlet(view)) return view;
      this._renderCutlets();
      if (direction === "before") {
        viewport.scrollTop = oldTop + (viewport.scrollHeight - oldHeight);
      }
      return view;
    } finally {
      this[flag] = false;
      this._updateEdgeLoaders();
    }
  }

  _renderSummary() {
    const value = this._value;
    this._els.summary.innerHTML = `היום ה־<span class="name">${value.dayInCutlet}</span> בקציצה · <span class="name">${value.dayInMonth}</span> בחודש <span class="name"></span>`;
    this._els.summary.querySelector(".name:last-child").textContent = value.monthName;
  }

  _renderCutlets() {
    const fragment = document.createDocumentFragment();
    for (const startJdn of this._orderedStarts) fragment.append(this._renderCutlet(this._cutlets.get(startJdn)));
    this._els.list.replaceChildren(fragment);
  }

  _renderCutlet(view) {
    const section = document.createElement("section");
    section.className = "cutlet";
    section.dataset.startJdn = String(view.startJdn);
    section.dataset.endJdn = String(view.endJdn);
    section.setAttribute("aria-label", `קציצה ${view.cutletName}, שנה ${view.year}`);

    const heading = document.createElement("h2");
    heading.className = "cutlet-heading";
    heading.append("שנה ");
    const year = document.createElement("span");
    year.className = "name";
    year.textContent = view.year;
    heading.append(year, " · קציצה ");
    const name = document.createElement("span");
    name.className = "name";
    name.textContent = view.cutletName;
    heading.append(name);
    section.append(heading);

    const palette = new Map();
    let run = [];
    for (const day of view.days) {
      if (run.length > 0 && !sameMonthRun(run.at(-1), day)) {
        section.append(this._renderMonthRun(run, palette));
        run = [];
      }
      run.push(day);
    }
    if (run.length > 0) section.append(this._renderMonthRun(run, palette));
    return section;
  }

  _renderMonthRun(days, palette) {
    const first = days[0];
    const last = days.at(-1);
    const group = document.createElement("section");
    group.className = "month-run";
    group.style.setProperty("--month-accent", monthAccent(first.monthName, palette));

    const heading = document.createElement("header");
    heading.className = "month-heading";
    const title = document.createElement("strong");
    title.textContent = first.monthName;
    const range = document.createElement("span");
    range.className = "month-range";
    range.textContent = first.dayInMonth === last.dayInMonth
      ? `יום ${first.dayInMonth}`
      : `ימים ${first.dayInMonth}־${last.dayInMonth}`;
    heading.append(title, range);

    const grid = document.createElement("div");
    grid.className = "days";
    for (const day of days) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "day";
      button.dataset.jdn = String(day.jdn);
      button.style.setProperty("--month-accent", monthAccent(day.monthName, palette));
      button.setAttribute("aria-label", `יום ${day.dayInMonth} בחודש ${day.monthName}, היום ה־${day.dayInCutlet} בקציצה ${day.cutletName}`);
      if (BigInt(day.jdn) === this._targetJdn) button.setAttribute("aria-current", "date");

      const monthDay = document.createElement("span");
      monthDay.className = "day-in-month";
      monthDay.textContent = String(day.dayInMonth);
      const cutletDay = document.createElement("span");
      cutletDay.className = "day-in-cutlet";
      cutletDay.textContent = `בקציצה ${day.dayInCutlet}`;
      button.append(monthDay, cutletDay);
      grid.append(button);
    }

    group.append(heading, grid);
    return group;
  }

  _selectDay(event) {
    const button = event.target.closest("button.day[data-jdn]");
    if (!button) return;
    const date = jdnToGregorian(BigInt(button.dataset.jdn));
    this.setAttribute("date", toIsoDate(date));
  }

  _scrollSelectedIntoView() {
    const selected = this._els.list.querySelector('[aria-current="date"]');
    selected?.scrollIntoView({ block: "center", inline: "nearest" });
    const section = selected?.closest(".cutlet");
    if (section) this._activeStartJdn = BigInt(section.dataset.startJdn);
  }

  _scrollAdjacent(direction) {
    if (this._orderedStarts.length === 0) return;
    const currentIndex = this._activeStartJdn == null
      ? this._orderedStarts.findIndex((start) => this._targetJdn >= start && this._targetJdn <= BigInt(this._cutlets.get(start).endJdn))
      : this._orderedStarts.findIndex((start) => start === this._activeStartJdn);
    const nextIndex = Math.max(0, Math.min(this._orderedStarts.length - 1, currentIndex + direction));
    const start = this._orderedStarts[nextIndex];
    const section = this._els.list.querySelector(`[data-start-jdn="${CSS.escape(String(start))}"]`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    this._activeStartJdn = start;

    if (direction < 0 && nextIndex === 0) {
      const first = this._cutlets.get(start);
      void this._loadCutletAt(first.previousCutletJdn, "before");
    } else if (direction > 0 && nextIndex === this._orderedStarts.length - 1) {
      const last = this._cutlets.get(start);
      void this._loadCutletAt(last.nextCutletJdn, "after");
    }
  }

  _onScroll() {
    const viewport = this._els.viewport;
    const sections = [...this._els.list.querySelectorAll(".cutlet")];
    if (sections.length > 0) {
      const top = viewport.getBoundingClientRect().top + 18;
      let active = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= top) active = section;
        else break;
      }
      this._activeStartJdn = BigInt(active.dataset.startJdn);
    }

    if (viewport.scrollTop < 180 && this._orderedStarts.length > 0) {
      const first = this._cutlets.get(this._orderedStarts[0]);
      void this._loadCutletAt(first.previousCutletJdn, "before");
    }
    if (viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 180 && this._orderedStarts.length > 0) {
      const last = this._cutlets.get(this._orderedStarts.at(-1));
      void this._loadCutletAt(last.nextCutletJdn, "after");
    }
  }

  _updateEdgeLoaders() {
    this._els.beforeLoader.textContent = this._loadingBefore ? "טוען קציצה קודמת…" : "";
    this._els.afterLoader.textContent = this._loadingAfter ? "טוען קציצה נוספת…" : "";
  }

  _openDialog() {
    this._els.dialogError.textContent = "";
    this._els.targetInput.value = toIsoDate(jdnToGregorian(this._targetJdn ?? gregorianToJdn(localToday())));
    this._els.calculationInput.value = this.hasAttribute("calculation-date")
      ? this.getAttribute("calculation-date")
      : toIsoDate(localToday());
    if (typeof this._els.dialog.showModal === "function") this._els.dialog.showModal();
    else this._els.dialog.setAttribute("open", "");
  }

  _applyDialog(event) {
    event.preventDefault();
    try {
      const target = parseIsoDate(this._els.targetInput.value, "תאריך היעד");
      const calculationText = this._els.calculationInput.value.trim();
      const calculation = calculationText === ""
        ? localToday()
        : parseIsoDate(calculationText, "יום המעשה");
      this._els.dialogError.textContent = "";
      this.setAttribute("date", toIsoDate(target));
      const todayIso = toIsoDate(localToday());
      const calculationIso = toIsoDate(calculation);
      if (calculationIso === todayIso) this.removeAttribute("calculation-date");
      else this.setAttribute("calculation-date", calculationIso);
      this._els.dialog.close();
    } catch (error) {
      this._els.dialogError.textContent = error.message;
    }
  }

  async _retry() {
    try {
      await sharedPastafariRouter.retry(this._calculationJdn);
    } finally {
      void this.refresh().catch(() => {});
    }
  }

  _showLoading() {
    this._els.calendar?.setAttribute("aria-busy", "true");
    if (this._els.loading) this._els.loading.hidden = false;
    if (this._els.error) this._els.error.hidden = true;
  }

  _hideOverlays() {
    if (this._els.loading) this._els.loading.hidden = true;
    if (this._els.error) this._els.error.hidden = true;
  }

  _showError(error) {
    this._els.calendar?.setAttribute("aria-busy", "false");
    if (this._els.loading) this._els.loading.hidden = true;
    if (this._els.error) this._els.error.hidden = false;
    if (this._els.errorMessage) this._els.errorMessage.textContent = error?.message || "אירעה שגיאה לא ידועה.";
  }
}

if (globalThis.customElements && !customElements.get("pastafari-date")) {
  customElements.define("pastafari-date", PastafariDateElement);
}
