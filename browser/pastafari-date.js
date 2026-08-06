import {
  GregorianDate,
  PastafariCalendar,
  gregorianToJdn,
  validateGregorian,
} from "./pastafari-calendar-core.js";

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

/**
 * מחזיר את חמשת רכיבי התאריך הפסטפרי.
 * שני התאריכים הם ימים מוחלטים בפורמט ISO; ברירת המחדל של שניהם היא היום המקומי.
 */
export function getPastafariDate(targetDate = null, calculationDate = null) {
  const target = normalizeInput(targetDate, "תאריך היעד");
  const action = normalizeInput(calculationDate, "יום המעשה");
  const calendar = new PastafariCalendar({ todayProvider: localToday });
  return fiveFields(calendar.convert(target, { calculationDate: action }));
}

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
    this._calendar = null;
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
          overflow: hidden;
          border: 1px solid var(--pastafari-border, #c8c2aa);
          border-radius: var(--pastafari-radius, 16px);
          background: var(--pastafari-background, #fffdf4);
          box-shadow: var(--pastafari-shadow, 0 10px 32px rgb(66 55 24 / 10%));
        }

        .calendar-header {
          padding: 1rem 1.1rem .9rem;
          border-bottom: 1px solid var(--pastafari-border, #c8c2aa);
          background: var(--pastafari-header-background, #f4eed7);
        }
        .eyebrow {
          margin: 0 0 .2rem;
          color: var(--pastafari-muted, #67604d);
          font-size: .82rem;
        }
        .title {
          margin: 0;
          font-size: clamp(1.35rem, 3vw, 2rem);
          line-height: 1.25;
          font-weight: 500;
        }
        .name { font-weight: 850; }
        .selected-summary {
          margin: .45rem 0 0;
          line-height: 1.55;
          color: var(--pastafari-muted, #514b3d);
        }

        .cutlet-nav {
          display: grid;
          grid-template-columns: 2.75rem minmax(0, 1fr) 2.75rem;
          align-items: center;
          gap: .5rem;
          padding: .7rem .85rem;
          border-bottom: 1px solid var(--pastafari-border, #c8c2aa);
          background: var(--pastafari-nav-background, #faf6e8);
        }
        .nav-button {
          width: 2.6rem;
          height: 2.6rem;
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
        .cutlet-caption {
          min-width: 0;
          text-align: center;
        }
        .cutlet-caption strong {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1.02rem;
        }
        .cutlet-caption span {
          color: var(--pastafari-muted, #67604d);
          font-size: .78rem;
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
          padding: .7rem .9rem;
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
          color: var(--pastafari-link, #514813);
          padding: .25rem 0;
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
          .days-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .day { min-height: 3.8rem; }
        }
      </style>

      <article class="calendar" part="calendar card">
        <header class="calendar-header" part="header">
          <p class="eyebrow">שנה <span data-field="year"></span></p>
          <h2 class="title">קציצת <strong class="name" data-field="cutletName"></strong></h2>
          <p class="selected-summary" part="sentence" aria-live="polite">
            היום ה־<span data-field="dayInCutlet"></span> בקציצה,
            היום ה־<span data-field="dayInMonth"></span> בחודש
            <strong class="name" data-field="monthName"></strong>
          </p>
        </header>

        <nav class="cutlet-nav" aria-label="ניווט בין קציצות" part="navigation">
          <button class="nav-button next-cutlet" type="button" aria-label="הקציצה הבאה" title="הקציצה הבאה">‹</button>
          <div class="cutlet-caption">
            <strong>קציצה <span class="nav-cutlet-name"></span></strong>
            <span class="cutlet-length"></span>
          </div>
          <button class="nav-button previous-cutlet" type="button" aria-label="הקציצה הקודמת" title="הקציצה הקודמת">›</button>
        </nav>

        <div class="calendar-viewport" part="days" aria-label="ימי הקציצה"></div>

        <footer class="calendar-footer" part="footer">
          <div class="footer-actions tools">
            <button class="text-button today-button" type="button">היום</button>
            <button class="text-button convert-button" type="button">המרת תאריך</button>
          </div>
          <span class="status"></span>
        </footer>

        <p class="error" part="error" role="alert" hidden></p>
      </article>

      <dialog part="dialog">
        <form class="converter-form" method="dialog">
          <h2 class="dialog-title">המרת תאריך ללוח הפסטפרי</h2>
          <p class="dialog-note">התאריך האזרחי משמש רק לזיהוי היום שיוצג בלוח.</p>

          <label>
            התאריך להמרה
            <input class="target-input" type="date" required>
          </label>

          <details class="advanced">
            <summary>הגדרות מתקדמות</summary>
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
            <button class="apply" type="button">הצג בלוח</button>
            <button class="cancel" value="cancel">ביטול</button>
          </div>
        </form>
      </dialog>
    `;

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
    this._navCutletName = this.shadowRoot.querySelector(".nav-cutlet-name");
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
    queueMicrotask(() => {
      const value = this.refresh();
      this._readyResolve?.(value);
      this._readyResolve = null;
    });
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

  refresh(targetDate = this.date, calculationDate = this.calculationDate) {
    if (!this.shadowRoot) return null;
    this._error.hidden = true;

    try {
      const target = normalizeInput(targetDate, "תאריך היעד");
      const action = normalizeInput(calculationDate, "יום המעשה");
      const targetJdn = gregorianToJdn(target);
      const calculationJdn = gregorianToJdn(action);
      const calendar = new PastafariCalendar({ todayProvider: localToday });
      const value = fiveFields(calendar.convertJdn(targetJdn, { calculationJdn }));

      this._calendar = calendar;
      this._targetJdn = targetJdn;
      this._calculationJdn = calculationJdn;
      this._value = value;

      this._renderHeader(value);
      if (!this.hasAttribute("headless")) this._renderCutlet(value);

      this.dispatchEvent(new CustomEvent("pastafari-change", {
        detail: value,
        bubbles: true,
        composed: true,
      }));

      return value;
    } catch (error) {
      this._value = null;
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
      this.refresh();
    });
  }

  _renderHeader(value) {
    for (const field of OUTPUT_FIELDS) {
      for (const node of this.shadowRoot.querySelectorAll(`[data-field="${field}"]`)) {
        node.textContent = String(value[field]);
      }
    }
  }

  _renderCutlet(selectedValue) {
    const startJdn = this._targetJdn - BigInt(selectedValue.dayInCutlet - 1);
    const days = [];

    for (let offset = 0; offset < MAX_CUTLET_DAYS; offset += 1) {
      const jdn = startJdn + BigInt(offset);
      const value = fiveFields(this._calendar.convertJdn(jdn, {
        calculationJdn: this._calculationJdn,
      }));

      if (offset > 0 && value.dayInCutlet === 1) break;
      days.push({ jdn, value });
    }

    if (days.length === MAX_CUTLET_DAYS) {
      throw new RangeError(`אורך הקציצה חורג מן הגבול המותר: ${MAX_CUTLET_DAYS} ימים.`);
    }

    this._cutletStartJdn = startJdn;
    this._cutletEndJdn = startJdn + BigInt(days.length - 1);
    this._navCutletName.textContent = selectedValue.cutletName;
    this._cutletLength.textContent = `${days.length} ימים`;
    this._status.textContent = `יום ${selectedValue.dayInCutlet} מתוך ${days.length}`;

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
    for (const group of groups) {
      const section = document.createElement("section");
      section.className = "month-group";
      section.setAttribute("part", "month");

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
        cutletDay.textContent = `בקציצה: ${day.value.dayInCutlet}`;

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
