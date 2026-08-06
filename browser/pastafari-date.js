import {
  GregorianDate,
  PastafariCalendar,
  validateGregorian,
} from "./pastafari-calendar-core.js";

const OUTPUT_FIELDS = Object.freeze([
  "year",
  "cutletName",
  "dayInCutlet",
  "monthName",
  "dayInMonth",
]);

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
  const negative = year < 0n;
  const digits = (negative ? -year : year).toString().padStart(4, "0");
  return `${negative ? "-" : ""}${digits}`;
}

function toIsoDate(date) {
  return `${padYear(date.year)}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function normalizeInput(value, fieldName) {
  return value == null || value === "" ? localToday() : parseIsoDate(value, fieldName);
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
          color: var(--pastafari-color, #1f2937);
          max-width: var(--pastafari-max-width, 44rem);
        }
        :host([headless]) { display: none !important; }
        *, *::before, *::after { box-sizing: border-box; }
        .card {
          border: 1px solid var(--pastafari-border, #d1d5db);
          border-radius: var(--pastafari-radius, 14px);
          background: var(--pastafari-background, #fff);
          padding: var(--pastafari-padding, 1rem);
          box-shadow: var(--pastafari-shadow, 0 6px 24px rgb(0 0 0 / 7%));
        }
        .sentence {
          margin: 0;
          line-height: 1.65;
          font-size: var(--pastafari-font-size, 1.1rem);
          font-weight: 700;
        }
        dl {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: .5rem;
          margin: 1rem 0 0;
        }
        dl > div {
          min-width: 0;
          padding: .65rem;
          border-radius: .6rem;
          background: var(--pastafari-field-background, #f3f4f6);
        }
        dt { font-size: .76rem; color: var(--pastafari-muted, #4b5563); }
        dd { margin: .2rem 0 0; font-weight: 700; overflow-wrap: anywhere; }
        .edit {
          margin-top: 1rem;
          border: 1px solid var(--pastafari-button-border, #374151);
          border-radius: .55rem;
          background: var(--pastafari-button-background, #fff);
          color: var(--pastafari-button-color, #111827);
          padding: .55rem .85rem;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }
        dialog {
          width: min(30rem, calc(100vw - 2rem));
          border: 0;
          border-radius: .8rem;
          padding: 0;
          box-shadow: 0 18px 60px rgb(0 0 0 / 25%);
        }
        dialog::backdrop { background: rgb(0 0 0 / 40%); }
        form { display: grid; gap: .9rem; padding: 1.1rem; }
        h2 { margin: 0; font-size: 1.1rem; }
        label { display: grid; gap: .35rem; font-weight: 700; }
        input {
          width: 100%;
          min-height: 2.5rem;
          border: 1px solid #9ca3af;
          border-radius: .5rem;
          padding: .4rem .6rem;
          font: inherit;
          direction: ltr;
        }
        .actions { display: flex; gap: .6rem; justify-content: flex-start; }
        .actions button {
          border: 1px solid #374151;
          border-radius: .5rem;
          padding: .5rem .8rem;
          font: inherit;
          cursor: pointer;
        }
        .apply { background: #111827; color: #fff; }
        .error { margin: .75rem 0 0; color: #991b1b; white-space: pre-wrap; }
        [hidden] { display: none !important; }
        @media (max-width: 640px) {
          dl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      </style>
      <article class="card" part="card">
        <p class="sentence" part="sentence" aria-live="polite"></p>
        <dl part="fields">
          <div part="field year"><dt>שנה</dt><dd data-field="year"></dd></div>
          <div part="field cutlet"><dt>קציצה</dt><dd data-field="cutletName"></dd></div>
          <div part="field cutlet-day"><dt>יום בקציצה</dt><dd data-field="dayInCutlet"></dd></div>
          <div part="field month"><dt>חודש</dt><dd data-field="monthName"></dd></div>
          <div part="field month-day"><dt>יום בחודש</dt><dd data-field="dayInMonth"></dd></div>
        </dl>
        <button class="edit" part="edit-button" type="button">הזנת תאריך אחר</button>
        <p class="error" part="error" role="alert" hidden></p>
      </article>
      <dialog part="dialog">
        <form method="dialog">
          <h2>בחירת התאריך ויום המעשה</h2>
          <label>
            התאריך שיש להציג
            <input class="target-input" type="date" required>
          </label>
          <label>
            יום המעשה
            <input class="calculation-input" type="date" required>
          </label>
          <div class="actions">
            <button class="apply" type="button">הצג</button>
            <button value="cancel">ביטול</button>
          </div>
        </form>
      </dialog>
    `;

    this._sentence = this.shadowRoot.querySelector(".sentence");
    this._error = this.shadowRoot.querySelector(".error");
    this._editButton = this.shadowRoot.querySelector(".edit");
    this._dialog = this.shadowRoot.querySelector("dialog");
    this._targetInput = this.shadowRoot.querySelector(".target-input");
    this._calculationInput = this.shadowRoot.querySelector(".calculation-input");
    this._applyButton = this.shadowRoot.querySelector(".apply");

    this._editButton.addEventListener("click", () => this.openEditor());
    this._applyButton.addEventListener("click", () => {
      this.date = this._targetInput.value;
      this.calculationDate = this._calculationInput.value;
      const value = this.refresh();
      if (value) this._dialog.close();
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
    if (!this.hasAttribute("headless") || this._connected) {
      queueMicrotask(() => this.refresh());
    }
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
      const value = getPastafariDate(targetDate, calculationDate);
      this._value = value;

      for (const field of OUTPUT_FIELDS) {
        const node = this.shadowRoot.querySelector(`[data-field="${field}"]`);
        if (node) node.textContent = String(value[field]);
      }

      this._sentence.textContent =
        `שנה ${value.year}, היום ה-${value.dayInCutlet} בקציצה „${value.cutletName}”, ` +
        `שהוא היום ה-${value.dayInMonth} בחודש „${value.monthName}”.`;

      this.dispatchEvent(new CustomEvent("pastafari-change", {
        detail: value,
        bubbles: true,
        composed: true,
      }));
      return value;
    } catch (error) {
      this._value = null;
      this._error.textContent = error instanceof Error ? error.message : String(error);
      this._error.hidden = false;
      this.dispatchEvent(new CustomEvent("pastafari-error", {
        detail: { error },
        bubbles: true,
        composed: true,
      }));
      return null;
    }
  }

  _syncEditorVisibility() {
    if (this._editButton) this._editButton.hidden = this.hasAttribute("no-editor");
  }
}

if (globalThis.customElements && !customElements.get("pastafari-date")) {
  customElements.define("pastafari-date", PastafariDateElement);
}
