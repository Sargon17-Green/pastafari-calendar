"use strict";

import { calendarLabel, getLocale, translate, validateLocaleResources } from "./i18n/registry.js";
import {
  applyDocumentLocale,
  persistLanguage,
  populateLanguageSelector,
  resolveBrowserLocale,
  urlWithLanguage,
} from "./i18n/runtime.js";

validateLocaleResources();

const worker = new Worker(new URL("./engine/pastafari-fast-worker.js?v=6-i18n-en-he", import.meta.url), {
  type: "module",
  name: "pastafari-fast",
});
const pending = new Map();
let requestId = 0;
let activeLocale = resolveBrowserLocale().locale;
let numberFormatter = null;
let dateFormatter = null;
let lastVisibleErrorKey = null;
let state = {
  targetJdn: null,
  calculationJdn: null,
  selectedJdn: null,
  followsToday: true,
  localDate: null,
  view: null,
};

const elements = Object.fromEntries(
  [...document.querySelectorAll("[id]")].map((element) => [element.id, element]),
);

function rebuildFormatters() {
  numberFormatter = new Intl.NumberFormat(activeLocale.intlLocale, { useGrouping: true });
  dateFormatter = new Intl.DateTimeFormat(activeLocale.intlLocale, {
    calendar: "gregory",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function t(key, values = {}) {
  return translate(activeLocale, key, values);
}

function localizedError(key, cause = null) {
  const error = new Error(key);
  error.translationKey = key;
  error.cause = cause;
  return error;
}

function workerRequest(operation, payload, timeoutMs = 120_000) {
  const id = ++requestId;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(localizedError("error.timeout"));
    }, timeoutMs);
    pending.set(id, { resolve, reject, timer });
    worker.postMessage({ id, operation, payload });
  });
}

worker.addEventListener("message", (event) => {
  const message = event.data;
  if (!Number.isSafeInteger(message?.id)) return;
  const entry = pending.get(message.id);
  if (!entry) return;
  pending.delete(message.id);
  clearTimeout(entry.timer);
  if (message.ok) entry.resolve(message.result);
  else entry.reject(localizedError("error.engineFailed", message.error));
});

worker.addEventListener("error", (event) => {
  showError(localizedError("error.engineLoadFailed", event.message));
});

function floorDiv(a, b) {
  let quotient = a / b;
  const remainder = a % b;
  if (remainder !== 0n && ((remainder > 0n) !== (b > 0n))) quotient -= 1n;
  return quotient;
}

function gregorianToJdn({ year, month, day }) {
  const a = floorDiv(14n - BigInt(month), 12n);
  const y = BigInt(year) + 4800n - a;
  const m = BigInt(month) + 12n * a - 3n;
  return BigInt(day)
    + floorDiv(153n * m + 2n, 5n)
    + 365n * y
    + floorDiv(y, 4n)
    - floorDiv(y, 100n)
    + floorDiv(y, 400n)
    - 32045n;
}

function localToday() {
  const now = new Date();
  return Object.freeze({
    year: BigInt(now.getFullYear()),
    month: now.getMonth() + 1,
    day: now.getDate(),
  });
}

function formatLocalDate(date) {
  return dateFormatter.format(new Date(Number(date.year), date.month - 1, date.day, 12));
}

function formatInteger(value) {
  return numberFormatter.format(BigInt(value));
}

function readBigIntParameter(params, name) {
  const value = params.get(name);
  return value !== null && /^[+-]?\d+$/.test(value) ? BigInt(value) : null;
}

function historyUrl() {
  const url = new URL(location.href);
  for (const name of ["t", "c", "s", "today"]) url.searchParams.delete(name);
  url.searchParams.set("t", state.targetJdn.toString());
  url.searchParams.set("c", state.calculationJdn.toString());
  url.searchParams.set("s", state.selectedJdn.toString());
  if (state.followsToday) url.searchParams.set("today", "1");
  return url;
}

function writeHistory({ replace = false } = {}) {
  history[replace ? "replaceState" : "pushState"]({ pastafari: true }, "", historyUrl());
}

const MONTH_BASE_PALETTE = Object.freeze([
  Object.freeze({ background: "#FFD400", ink: "#000000" }),
  Object.freeze({ background: "#001B7A", ink: "#FFFFFF" }),
  Object.freeze({ background: "#00E5FF", ink: "#000000" }),
  Object.freeze({ background: "#650000", ink: "#FFFFFF" }),
  Object.freeze({ background: "#7CFF00", ink: "#000000" }),
  Object.freeze({ background: "#4B007D", ink: "#FFFFFF" }),
  Object.freeze({ background: "#FF8A00", ink: "#000000" }),
  Object.freeze({ background: "#004F3A", ink: "#FFFFFF" }),
  Object.freeze({ background: "#FF72D2", ink: "#000000" }),
  Object.freeze({ background: "#5A2600", ink: "#FFFFFF" }),
  Object.freeze({ background: "#7AD7FF", ink: "#000000" }),
  Object.freeze({ background: "#003F5C", ink: "#FFFFFF" }),
]);

const MONTH_PATTERNS = Object.freeze([
  Object.freeze({
    image: "repeating-linear-gradient(45deg, var(--month-pattern) 0 11px, transparent 11px 24px)",
    size: "auto",
  }),
  Object.freeze({
    image: "repeating-linear-gradient(-45deg, var(--month-pattern) 0 11px, transparent 11px 24px)",
    size: "auto",
  }),
  Object.freeze({
    image: "repeating-linear-gradient(0deg, var(--month-pattern) 0 8px, transparent 8px 23px)",
    size: "auto",
  }),
  Object.freeze({
    image: "repeating-linear-gradient(90deg, var(--month-pattern) 0 8px, transparent 8px 23px)",
    size: "auto",
  }),
  Object.freeze({
    image: "radial-gradient(circle, var(--month-pattern) 0 7px, transparent 7.5px)",
    size: "28px 28px",
  }),
  Object.freeze({
    image: "conic-gradient(from 90deg, var(--month-pattern) 25%, transparent 0 50%, var(--month-pattern) 0 75%, transparent 0)",
    size: "30px 30px",
  }),
  Object.freeze({
    image: "linear-gradient(var(--month-pattern) 6px, transparent 6px), linear-gradient(90deg, var(--month-pattern) 6px, transparent 6px)",
    size: "30px 30px",
  }),
]);

function hexToRgb(hex) {
  return [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
}

function relativeLuminance([red, green, blue]) {
  const linear = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(luminanceA, luminanceB) {
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

function monthColors(index) {
  const palette = MONTH_BASE_PALETTE[index % MONTH_BASE_PALETTE.length];
  const pattern = MONTH_PATTERNS[index % MONTH_PATTERNS.length];
  const inkLuminance = palette.ink === "#000000" ? 0 : 1;
  const baseContrast = contrastRatio(relativeLuminance(hexToRgb(palette.background)), inkLuminance);
  if (baseContrast < 7) throw new Error("Month palette contrast invariant failed.");

  return {
    background: palette.background,
    edge: palette.ink,
    ink: palette.ink,
    patternColor: palette.ink === "#000000" ? "#FFFFFF" : "#000000",
    patternImage: pattern.image,
    patternSize: pattern.size,
  };
}

function localizedCutlet(index) {
  return calendarLabel(activeLocale, "cutlet", index);
}

function localizedMonth(index) {
  return calendarLabel(activeLocale, "month", index);
}

function appendRichTemplate(element, key, values, emphasizedKeys) {
  const template = activeLocale.messages[key];
  if (typeof template !== "string") throw new RangeError(`Missing translation key: ${key}`);
  const emphasized = new Set(emphasizedKeys);
  const nodes = [];
  let cursor = 0;
  const pattern = /\{([A-Za-z0-9_.-]+)\}/g;
  let match;
  while ((match = pattern.exec(template)) !== null) {
    if (match.index > cursor) nodes.push(document.createTextNode(template.slice(cursor, match.index)));
    const name = match[1];
    if (!(name in values)) throw new RangeError(`Missing interpolation value ${name} for ${key}`);
    const value = String(values[name]);
    if (emphasized.has(name)) {
      const strong = document.createElement("strong");
      strong.textContent = value;
      nodes.push(strong);
    } else {
      nodes.push(document.createTextNode(value));
    }
    cursor = pattern.lastIndex;
  }
  if (cursor < template.length) nodes.push(document.createTextNode(template.slice(cursor)));
  element.replaceChildren(...nodes);
}

function renderSelection() {
  const selected = state.view?.days.find((day) => day.jdn === state.selectedJdn);
  if (!selected) {
    elements["selection-summary"].hidden = true;
    return;
  }
  const cutletName = localizedCutlet(selected.cutletIndex);
  const monthName = localizedMonth(selected.monthIndex);
  elements["selection-summary"].hidden = false;
  const label = document.createElement("span");
  label.textContent = t("selection.label");
  const primary = document.createElement("strong");
  primary.textContent = t("selection.primary", {
    cutletName,
    year: formatInteger(selected.year),
  });
  const measures = document.createElement("span");
  measures.textContent = t("selection.measures", {
    dayInCutlet: formatInteger(selected.dayInCutlet),
    dayInMonth: formatInteger(selected.dayInMonth),
  });
  const meta = document.createElement("small");
  meta.textContent = monthName;
  elements["selection-summary"].replaceChildren(label, primary, measures, meta);
}

function selectDay(jdn, { updateHistory = true } = {}) {
  state.selectedJdn = BigInt(jdn);
  for (const card of elements["calendar-grid"].querySelectorAll(".day-card")) {
    const selected = card.dataset.jdn === state.selectedJdn.toString();
    card.dataset.selected = String(selected);
    card.setAttribute("aria-pressed", String(selected));
    card.tabIndex = selected ? 0 : -1;
    if (selected) card.setAttribute("aria-current", "date");
    else card.removeAttribute("aria-current");
  }
  renderSelection();
  if (updateHistory) writeHistory();
}

function renderView(view, { scrollToSelection = true } = {}) {
  state.view = view;
  const viewCutletName = localizedCutlet(view.cutletIndex);
  elements["cutlet-meta"].textContent = t("calendar.currentCutlet", { year: formatInteger(view.year) });
  elements["cutlet-heading"].textContent = viewCutletName;
  elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
    count: formatInteger(view.days.length),
    localDate: formatLocalDate(state.localDate),
  });
  elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));

  const monthDisplayOrder = new Map();
  const fragment = document.createDocumentFragment();
  for (const day of view.days) {
    if (!monthDisplayOrder.has(day.monthIndex)) monthDisplayOrder.set(day.monthIndex, monthDisplayOrder.size);
    const colors = monthColors(monthDisplayOrder.get(day.monthIndex));
    const cutletName = localizedCutlet(day.cutletIndex);
    const monthName = localizedMonth(day.monthIndex);
    const selected = day.jdn === state.selectedJdn;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-card";
    button.dataset.jdn = day.jdn.toString();
    button.dataset.selected = String(selected);
    button.tabIndex = selected ? 0 : -1;
    button.style.setProperty("--month-bg", colors.background);
    button.style.setProperty("--month-edge", colors.edge);
    button.style.setProperty("--month-ink", colors.ink);
    button.style.setProperty("--month-pattern", colors.patternColor);
    button.style.setProperty("--month-pattern-image", colors.patternImage);
    button.style.setProperty("--month-pattern-size", colors.patternSize);
    button.setAttribute("aria-pressed", String(selected));
    button.setAttribute("aria-label", t("date.aria", {
      year: formatInteger(day.year),
      dayInCutlet: formatInteger(day.dayInCutlet),
      cutletName,
      dayInMonth: formatInteger(day.dayInMonth),
      monthName,
    }));
    if (selected) button.setAttribute("aria-current", "date");

    const yearLine = document.createElement("span");
    yearLine.className = "day-line";
    appendRichTemplate(yearLine, "date.yearLine", {
      year: formatInteger(day.year),
    }, ["year"]);

    const cutletLine = document.createElement("span");
    cutletLine.className = "day-line";
    appendRichTemplate(cutletLine, "date.cutletLine", {
      dayInCutlet: formatInteger(day.dayInCutlet),
      cutletName,
    }, ["dayInCutlet", "cutletName"]);

    const monthLine = document.createElement("span");
    monthLine.className = "day-line";
    appendRichTemplate(monthLine, "date.monthLine", {
      dayInMonth: formatInteger(day.dayInMonth),
      monthName,
    }, ["dayInMonth", "monthName"]);

    button.append(yearLine, cutletLine, monthLine);
    fragment.append(button);
  }
  elements["calendar-grid"].replaceChildren(fragment);
  renderSelection();
  elements["loading-panel"].hidden = true;
  elements["error-panel"].hidden = true;
  elements["calendar-workspace"].hidden = false;
  elements["previous-cutlet"].disabled = false;
  elements["next-cutlet"].disabled = false;
  lastVisibleErrorKey = null;

  if (scrollToSelection) {
    requestAnimationFrame(() => {
      elements["calendar-grid"].querySelector('[aria-current="date"]')?.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    });
  }
}

async function loadCutlet({ replaceHistory = false } = {}) {
  elements["previous-cutlet"].disabled = true;
  elements["next-cutlet"].disabled = true;
  try {
    const view = await workerRequest("getCutletView", {
      targetJdn: state.targetJdn,
      calculationJdn: state.calculationJdn,
    });
    renderView(view);
    writeHistory({ replace: replaceHistory });
  } catch (error) {
    showError(error);
  }
}

function showError(error) {
  console.error(error);
  const key = error?.translationKey || "error.engineFailed";
  lastVisibleErrorKey = key;
  elements["loading-panel"].hidden = true;
  elements["calendar-workspace"].hidden = true;
  elements["error-panel"].hidden = false;
  elements["error-message"].textContent = t(key);
}

function goToday({ replaceHistory = false } = {}) {
  const date = localToday();
  const jdn = gregorianToJdn(date);
  state = {
    ...state,
    targetJdn: jdn,
    calculationJdn: jdn,
    selectedJdn: jdn,
    followsToday: true,
    localDate: date,
  };
  return loadCutlet({ replaceHistory });
}

function loadFromUrl() {
  const params = new URL(location.href).searchParams;
  const targetJdn = readBigIntParameter(params, "t");
  const calculationJdn = readBigIntParameter(params, "c");
  if (targetJdn === null || calculationJdn === null) return goToday({ replaceHistory: true });
  state = {
    ...state,
    targetJdn,
    calculationJdn,
    selectedJdn: readBigIntParameter(params, "s") ?? targetJdn,
    followsToday: params.get("today") === "1",
    localDate: localToday(),
  };
  return loadCutlet({ replaceHistory: true });
}

function applyActiveLocale({ rerender = true } = {}) {
  rebuildFormatters();
  applyDocumentLocale(activeLocale);
  populateLanguageSelector(elements["language-selector"], activeLocale.code);
  if (rerender && state.view) renderView(state.view, { scrollToSelection: false });
  if (lastVisibleErrorKey && !elements["error-panel"].hidden) {
    elements["error-message"].textContent = t(lastVisibleErrorKey);
  }
}

function syncLocaleFromEnvironment({ rerender = true } = {}) {
  const resolved = resolveBrowserLocale();
  if (resolved.locale.code === activeLocale.code) return;
  activeLocale = resolved.locale;
  applyActiveLocale({ rerender });
}

function chooseLanguage(code) {
  const locale = getLocale(code);
  persistLanguage(locale.code);
  const url = urlWithLanguage(location.href, locale.code);
  history.pushState({ pastafari: true }, "", url);
  if (locale.code !== activeLocale.code) {
    activeLocale = locale;
    applyActiveLocale();
  }
}

applyActiveLocale({ rerender: false });

elements["language-selector"].addEventListener("change", (event) => chooseLanguage(event.currentTarget.value));
elements["reload-button"].addEventListener("click", () => location.reload());
elements["today-button"].addEventListener("click", () => goToday());
elements["previous-cutlet"].addEventListener("click", () => {
  state.targetJdn = state.view.previousCutletJdn;
  state.selectedJdn = state.view.previousCutletJdn;
  state.followsToday = false;
  loadCutlet();
});
elements["next-cutlet"].addEventListener("click", () => {
  state.targetJdn = state.view.nextCutletJdn;
  state.selectedJdn = state.view.nextCutletJdn;
  state.followsToday = false;
  loadCutlet();
});
elements["calendar-grid"].addEventListener("click", (event) => {
  const card = event.target.closest(".day-card");
  if (card) selectDay(card.dataset.jdn);
});
window.addEventListener("popstate", () => {
  syncLocaleFromEnvironment();
  loadFromUrl();
});

function refreshLocalDay() {
  if (document.visibilityState === "hidden" || !state.followsToday) return;
  const today = localToday();
  const todayJdn = gregorianToJdn(today);
  if (todayJdn !== state.targetJdn || todayJdn !== state.calculationJdn) {
    goToday({ replaceHistory: true });
  }
}

document.addEventListener("visibilitychange", refreshLocalDay);
window.addEventListener("pageshow", refreshLocalDay);
const midnight = new Date();
midnight.setHours(24, 0, 0, 30);
setTimeout(() => {
  refreshLocalDay();
  location.reload();
}, midnight.getTime() - Date.now());

if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}), { once: true });
}

loadFromUrl();
