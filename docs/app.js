"use strict";

import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn,
  getCalendarDefinition,
  jdnToGregorian,
} from "./calendar-converters.js?v=8-year-structure";
import {
  calendarMonthChoices,
  normalizeCalendarInputValues,
  usesTextualCalendarNumeral,
} from "./calendar-input-conventions.js?v=9-calendar-input-conventions";
import {
  calendarLabel,
  getLocale,
  loadLocale,
  messageTemplate,
  translate,
} from "./i18n/registry.js?v=17-unified-i18n";
import {
  KISURRA_OBSERVER,
  requestObserverLocation,
  resolveObserverLocation,
  watchObserverPermission,
} from "./observer-location.js?v=10-venus-day-boundary";
import { currentDayAt } from "./venus-day-boundary.js?v=10-venus-day-boundary";
import { createReverseSearchUi } from "./reverse-ui.js?v=18-unified-i18n";
import {
  applyDocumentLocale,
  persistLanguage,
  populateLanguageSelector,
  resolveBrowserLocale,
  urlWithLanguage,
} from "./i18n/runtime.js?v=17-unified-i18n";


const ASSET_REVISION = "9-worker-api-sync";
const DESKTOP_COMPARISON_QUERY = "(min-width: 1000px)";
const worker = new Worker(
  new URL(`./engine/pastafari-fast-worker.js?v=${ASSET_REVISION}`, import.meta.url),
  { type: "module", name: "pastafari-fast" },
);
const pending = new Map();
let requestId = 0;
let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
let numberFormatter = null;
let dateFormatter = null;
let lastVisibleErrorKey = null;
let viewLoadSequence = 0;
let committedViewLoadSequence = 0;
let comparisonLoadSequence = 0;
let observerLocation = KISURRA_OBSERVER;
let reverseUi = null;
let state = {
  targetJdn: null,
  viewAnchorJdn: null,
  calculationJdn: null,
  comparisonJdn: null,
  comparisonFollowsNextAction: true,
  comparisonEnabled: false,
  targetFollowsCurrentDay: true,
  calculationFollowsCurrentDay: true,
  currentDayDate: null,
  currentDayJdn: null,
  view: null,
  comparisonDays: null,
  yearStructure: null,
  yearStructureFailed: false,
};

const elements = Object.fromEntries(
  [...document.querySelectorAll("[id]")].map((element) => [element.id, element]),
);

const formConfigurations = Object.freeze({
  target: Object.freeze({
    form: elements["target-search-form"],
    select: elements["target-calendar"],
    fields: elements["target-date-fields"],
    help: elements["target-date-help"],
    error: elements["target-form-error"],
    errorKey: "search.invalid",
  }),
  action: Object.freeze({
    form: elements["action-date-form"],
    select: elements["action-calendar"],
    fields: elements["action-date-fields"],
    help: elements["action-date-help"],
    error: elements["action-form-error"],
    errorKey: "settings.invalid",
  }),
  comparison: Object.freeze({
    form: elements["comparison-date-form"],
    select: elements["comparison-calendar"],
    fields: elements["comparison-date-fields"],
    help: elements["comparison-date-help"],
    error: elements["comparison-form-error"],
    errorKey: "comparison.invalid",
  }),
});

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

function currentDaySnapshot(now = new Date()) {
  const snapshot = currentDayAt(now, observerLocation);
  return Object.freeze({
    ...snapshot,
    date: jdnToGregorian(snapshot.jdn),
  });
}

function formatLocalDate(date) {
  const year = Number(date.year);
  if (Number.isSafeInteger(year) && year >= 1 && year <= 9999) {
    const value = new Date(0);
    value.setHours(12, 0, 0, 0);
    value.setFullYear(year, date.month - 1, date.day);
    return dateFormatter.format(value);
  }
  return `${formatInteger(date.year)}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function formatJdnAsGregorian(jdn) {
  return formatLocalDate(jdnToGregorian(jdn));
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
  for (const name of ["t", "v", "c", "c2", "compare", "today", "ctoday"]) {
    url.searchParams.delete(name);
  }
  url.searchParams.set("t", state.targetJdn.toString());
  url.searchParams.set("v", state.viewAnchorJdn.toString());
  url.searchParams.set("c", state.calculationJdn.toString());
  if (state.targetFollowsCurrentDay) url.searchParams.set("today", "1");
  if (state.calculationFollowsCurrentDay) url.searchParams.set("ctoday", "1");
  if (state.comparisonEnabled) {
    url.searchParams.set("compare", "1");
    url.searchParams.set("c2", state.comparisonJdn.toString());
  }
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
  Object.freeze({ image: "repeating-linear-gradient(45deg, var(--month-pattern) 0 11px, transparent 11px 24px)", size: "auto" }),
  Object.freeze({ image: "repeating-linear-gradient(-45deg, var(--month-pattern) 0 11px, transparent 11px 24px)", size: "auto" }),
  Object.freeze({ image: "repeating-linear-gradient(0deg, var(--month-pattern) 0 8px, transparent 8px 23px)", size: "auto" }),
  Object.freeze({ image: "repeating-linear-gradient(90deg, var(--month-pattern) 0 8px, transparent 8px 23px)", size: "auto" }),
  Object.freeze({ image: "radial-gradient(circle, var(--month-pattern) 0 7px, transparent 7.5px)", size: "28px 28px" }),
  Object.freeze({ image: "conic-gradient(from 90deg, var(--month-pattern) 25%, transparent 0 50%, var(--month-pattern) 0 75%, transparent 0)", size: "30px 30px" }),
  Object.freeze({ image: "linear-gradient(var(--month-pattern) 6px, transparent 6px), linear-gradient(90deg, var(--month-pattern) 6px, transparent 6px)", size: "30px 30px" }),
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
  if (contrastRatio(relativeLuminance(hexToRgb(palette.background)), inkLuminance) < 7) {
    throw new Error("Month palette contrast invariant failed.");
  }
  return {
    background: palette.background,
    textBackground: palette.background,
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
  const template = messageTemplate(activeLocale, key);
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

function makeDateLines(day, className = "day-line") {
  const cutletName = localizedCutlet(day.cutletIndex);
  const monthName = localizedMonth(day.monthIndex);
  const yearLine = document.createElement("span");
  yearLine.className = className;
  appendRichTemplate(yearLine, "date.yearLine", { year: formatInteger(day.year) }, ["year"]);
  const cutletLine = document.createElement("span");
  cutletLine.className = className;
  appendRichTemplate(cutletLine, "date.cutletLine", {
    dayInCutlet: formatInteger(day.dayInCutlet),
    cutletName,
  }, ["dayInCutlet", "cutletName"]);
  const monthLine = document.createElement("span");
  monthLine.className = className;
  appendRichTemplate(monthLine, "date.monthLine", {
    dayInMonth: formatInteger(day.dayInMonth),
    monthName,
  }, ["dayInMonth", "monthName"]);
  return [yearLine, cutletLine, monthLine];
}

function dateAria(day) {
  return t("date.aria", {
    year: formatInteger(day.year),
    dayInCutlet: formatInteger(day.dayInCutlet),
    cutletName: localizedCutlet(day.cutletIndex),
    dayInMonth: formatInteger(day.dayInMonth),
    monthName: localizedMonth(day.monthIndex),
  });
}

function renderTargetBeacon() {
  const target = state.view?.days.find((day) => day.jdn === state.targetJdn);
  const markerKey = state.targetFollowsCurrentDay ? "target.today" : "target.searched";
  elements["target-marker"].textContent = t(markerKey);
  elements["target-date-lines"].replaceChildren();
  if (target) {
    elements["target-date-lines"].append(...makeDateLines(target, "beacon-line"));
  } else {
    const line = document.createElement("strong");
    line.textContent = t("target.notInView");
    elements["target-date-lines"].append(line);
  }
  const context = t("target.context", {
    targetDate: formatJdnAsGregorian(state.targetJdn),
    actionDate: formatJdnAsGregorian(state.calculationJdn),
  });
  const contextElement = elements["target-context"];
  contextElement.replaceChildren(document.createTextNode(context));
  if (observerLocation.assumed) {
    contextElement.append(
      document.createTextNode(` ${t("location.assumption")} `),
      createLocationActionButton(),
    );
  }
}

function renderView(view, { scrollToTarget = true } = {}) {
  state.view = view;
  const viewCutletName = localizedCutlet(view.cutletIndex);
  elements["cutlet-meta"].textContent = t("calendar.currentCutlet", { year: formatInteger(view.year) });
  elements["cutlet-heading"].textContent = viewCutletName;
  elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
    count: formatInteger(view.days.length),
    actionDate: formatJdnAsGregorian(state.calculationJdn),
  });
  elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
  const targetIsInView = state.targetJdn >= view.startJdn && state.targetJdn <= view.endJdn;
  elements["browse-note"].hidden = targetIsInView;

  const monthDisplayOrder = new Map();
  const fragment = document.createDocumentFragment();
  for (const day of view.days) {
    if (!monthDisplayOrder.has(day.monthIndex)) monthDisplayOrder.set(day.monthIndex, monthDisplayOrder.size);
    const colors = monthColors(monthDisplayOrder.get(day.monthIndex));
    const isTarget = day.jdn === state.targetJdn;
    const card = document.createElement("article");
    card.className = "day-card";
    card.dataset.jdn = day.jdn.toString();
    card.dataset.target = String(isTarget);
    card.setAttribute("aria-label", dateAria(day));
    card.style.setProperty("--month-bg", colors.background);
    card.style.setProperty("--month-text-bg", colors.textBackground);
    card.style.setProperty("--month-edge", colors.edge);
    card.style.setProperty("--month-ink", colors.ink);
    card.style.setProperty("--month-pattern", colors.patternColor);
    card.style.setProperty("--month-pattern-image", colors.patternImage);
    card.style.setProperty("--month-pattern-size", colors.patternSize);
    if (isTarget) {
      card.setAttribute("aria-current", "date");
      const badge = document.createElement("span");
      badge.className = "target-badge";
      badge.textContent = t(state.targetFollowsCurrentDay ? "target.today" : "target.searched");
      card.append(badge);
    }
    card.append(...makeDateLines(day));
    fragment.append(card);
  }
  elements["calendar-grid"].replaceChildren(fragment);
  renderTargetBeacon();
  elements["loading-panel"].hidden = true;
  elements["error-panel"].hidden = true;
  elements["calendar-workspace"].hidden = false;
  elements["previous-cutlet"].disabled = false;
  elements["next-cutlet"].disabled = false;
  lastVisibleErrorKey = null;

  if (scrollToTarget && targetIsInView) {
    requestAnimationFrame(() => {
      elements["calendar-grid"].querySelector('[aria-current="date"]')?.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    });
  }
}

function createLocationActionButton() {
  const locationButton = document.createElement("button");
  locationButton.type = "button";
  locationButton.className = "secondary-action";
  locationButton.textContent = t("location.useDevice");
  locationButton.addEventListener("click", async () => {
    locationButton.disabled = true;
    try {
      const nextObserver = await requestObserverLocation({ timeoutMs: 10_000 });
      await updateObserverLocation(nextObserver);
    } catch (error) {
      console.error(error);
    } finally {
      if (locationButton.isConnected) locationButton.disabled = false;
    }
  });
  return locationButton;
}

function renderYearStructureLoading(view) {
  elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  elements["year-overview-context"].textContent = t("year.context", {
    actionDate: formatJdnAsGregorian(state.calculationJdn),
  });
  elements["year-overview-loading"].hidden = false;
  elements["year-overview-error"].hidden = true;
  elements["year-overview-content"].hidden = true;
}

function appendStructureItem(list, title, meta, { current = false } = {}) {
  const item = document.createElement("li");
  item.className = "structure-item";
  if (current) item.dataset.current = "true";
  const heading = document.createElement("strong");
  heading.textContent = title;
  const details = document.createElement("span");
  details.textContent = meta;
  item.append(heading, details);
  list.append(item);
}

function renderYearStructure(structure) {
  state.yearStructure = structure;
  state.yearStructureFailed = false;
  elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
  elements["year-overview-context"].textContent = t("year.context", {
    actionDate: formatJdnAsGregorian(structure.calculationJdn),
  });
  elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
  elements["year-cutlet-count"].textContent = formatInteger(structure.cutletCount);
  elements["year-month-count"].textContent = formatInteger(structure.monthCount);
  elements["year-range"].textContent = t("year.rangeValue", {
    startDate: formatJdnAsGregorian(structure.startJdn),
    endDate: formatJdnAsGregorian(structure.endJdn),
  });

  const displayedCutlet = structure.cutlets.find((cutlet) => cutlet.startJdn === state.view?.startJdn);
  elements["year-cutlet-position"].textContent = displayedCutlet
    ? t("year.displayedCutletPosition", {
      start: formatInteger(displayedCutlet.startDayOfYear),
      end: formatInteger(displayedCutlet.endDayOfYear),
    })
    : "";

  const targetIsInYear = state.targetJdn >= structure.startJdn && state.targetJdn <= structure.endJdn;
  elements["year-target-position"].hidden = !targetIsInYear;
  if (targetIsInYear) {
    elements["year-target-position"].textContent = t("year.targetPosition", {
      day: formatInteger(state.targetJdn - structure.startJdn + 1n),
      length: formatInteger(structure.length),
    });
  }

  elements["year-cutlets-summary"].textContent = t("year.cutletsSummary", {
    count: formatInteger(structure.cutletCount),
  });
  const cutletList = elements["year-cutlet-list"];
  cutletList.replaceChildren();
  structure.cutlets.forEach((cutlet, index) => {
    appendStructureItem(
      cutletList,
      t("year.numberedName", { number: formatInteger(index + 1), name: localizedCutlet(cutlet.cutletIndex) }),
      t("year.cutletMeta", {
        length: formatInteger(cutlet.length),
        start: formatInteger(cutlet.startDayOfYear),
        end: formatInteger(cutlet.endDayOfYear),
      }),
      { current: cutlet.startJdn === state.view?.startJdn },
    );
  });

  elements["year-months-summary"].textContent = t("year.monthsSummary", {
    count: formatInteger(structure.monthCount),
  });
  const monthList = elements["year-month-list"];
  monthList.replaceChildren();
  structure.months.forEach((month, index) => {
    appendStructureItem(
      monthList,
      t("year.numberedName", { number: formatInteger(index + 1), name: localizedMonth(month.monthIndex) }),
      t("year.monthMeta", {
        length: formatInteger(month.length),
        runs: formatInteger(month.runCount),
        first: formatInteger(month.firstDayOfYear),
        last: formatInteger(month.lastDayOfYear),
      }),
    );
  });

  elements["year-overview-loading"].hidden = true;
  elements["year-overview-error"].hidden = true;
  elements["year-overview-content"].hidden = false;
}

function renderYearStructureError(view) {
  elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  elements["year-overview-context"].textContent = t("year.context", {
    actionDate: formatJdnAsGregorian(state.calculationJdn),
  });
  elements["year-overview-loading"].hidden = true;
  elements["year-overview-content"].hidden = true;
  elements["year-overview-error"].hidden = false;
  elements["year-overview-error"].textContent = t("year.error");
}

function showYearStructureError(error) {
  console.error(error);
  state.yearStructureFailed = true;
  renderYearStructureError(state.view);
}

async function loadYearStructure(sequence, view) {
  state.yearStructure = null;
  state.yearStructureFailed = false;
  renderYearStructureLoading(view);
  try {
    const structure = await workerRequest("getYearStructure", {
      targetJdn: view.selectedJdn,
      calculationJdn: state.calculationJdn,
    });
    if (sequence !== viewLoadSequence || state.view !== view) return;
    renderYearStructure(structure);
  } catch (error) {
    if (sequence === viewLoadSequence && state.view === view) showYearStructureError(error);
  }
}

function comparisonIsDesktop() {
  return matchMedia(DESKTOP_COMPARISON_QUERY).matches;
}

function appendComparisonDate(cell, day) {
  cell.className = "comparison-date-cell";
  cell.setAttribute("aria-label", dateAria(day));
  cell.append(...makeDateLines(day, "comparison-date-line"));
}

function renderComparison() {
  const shouldShow = state.comparisonEnabled && state.view;
  elements["comparison-workspace"].hidden = !shouldShow;
  if (!shouldShow) {
    elements["comparison-body"].replaceChildren();
    return;
  }
  elements["comparison-date-form"].hidden = false;
  elements["comparison-primary-heading"].textContent = t("comparison.actionHeading", {
    date: formatJdnAsGregorian(state.calculationJdn),
  });
  elements["comparison-secondary-heading"].textContent = t("comparison.actionHeading", {
    date: formatJdnAsGregorian(state.comparisonJdn),
  });
  elements["comparison-summary"].textContent = t("comparison.summary", {
    count: formatInteger(state.view.days.length),
  });
  if (!comparisonIsDesktop() || !state.comparisonDays) {
    elements["comparison-body"].replaceChildren();
    return;
  }

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < state.view.days.length; index += 1) {
    const primary = state.view.days[index];
    const secondary = state.comparisonDays[index];
    if (!secondary || secondary.jdn !== primary.jdn) throw new RangeError("Comparison rows are not aligned by JDN.");
    const row = document.createElement("tr");
    row.dataset.jdn = primary.jdn.toString();
    if (primary.jdn === state.targetJdn) {
      row.className = "comparison-target-row";
      row.setAttribute("aria-current", "date");
    }
    const shared = document.createElement("th");
    shared.scope = "row";
    shared.className = "comparison-shared-day";
    const civil = document.createElement("strong");
    civil.textContent = formatJdnAsGregorian(primary.jdn);
    const sequence = document.createElement("small");
    sequence.textContent = t("reverse.result.jdn", { jdn: primary.jdn.toString() });
    shared.append(civil, sequence);
    const primaryCell = document.createElement("td");
    appendComparisonDate(primaryCell, primary);
    const secondaryCell = document.createElement("td");
    appendComparisonDate(secondaryCell, secondary);
    row.append(shared, primaryCell, secondaryCell);
    fragment.append(row);
  }
  elements["comparison-body"].replaceChildren(fragment);
}

async function loadComparison(sequence, viewSequence = viewLoadSequence) {
  state.comparisonDays = null;
  const view = state.view;
  const comparisonJdn = state.comparisonJdn;
  if (!state.comparisonEnabled || !comparisonIsDesktop() || !view) {
    renderComparison();
    return true;
  }
  let range;
  try {
    range = await workerRequest("getRangeView", {
      startJdn: view.startJdn,
      endJdn: view.endJdn,
      calculationJdn: comparisonJdn,
    });
  } catch (error) {
    if (
      sequence !== comparisonLoadSequence
      || viewSequence !== viewLoadSequence
      || state.view !== view
      || state.comparisonJdn !== comparisonJdn
      || !state.comparisonEnabled
    ) return false;
    throw error;
  }
  if (
    sequence !== comparisonLoadSequence
    || viewSequence !== viewLoadSequence
    || state.view !== view
    || state.comparisonJdn !== comparisonJdn
    || !state.comparisonEnabled
  ) return false;
  state.comparisonDays = range.days;
  renderComparison();
  return true;
}

async function loadCutlet({ replaceHistory = false, scrollToTarget = true } = {}) {
  const sequence = ++viewLoadSequence;
  ++comparisonLoadSequence;
  const focusedNavigation = [elements["previous-cutlet"], elements["next-cutlet"]]
    .find((element) => element === document.activeElement) ?? null;
  elements["previous-cutlet"].disabled = true;
  elements["next-cutlet"].disabled = true;
  try {
    const view = await workerRequest("getCutletView", {
      targetJdn: state.viewAnchorJdn,
      calculationJdn: state.calculationJdn,
    });
    if (sequence !== viewLoadSequence) return;
    renderView(view, { scrollToTarget });
    if (focusedNavigation && (document.activeElement === document.body || document.activeElement === document.documentElement)) {
      focusedNavigation.focus({ preventScroll: true });
    }
    committedViewLoadSequence = sequence;
    void loadYearStructure(sequence, view);
    const comparisonCurrent = await loadComparison(++comparisonLoadSequence, sequence);
    if (sequence !== viewLoadSequence || !comparisonCurrent) return;
    writeHistory({ replace: replaceHistory });
  } catch (error) {
    if (sequence === viewLoadSequence) showError(error);
  }
}

function showError(error) {
  console.error(error);
  const key = error?.translationKey || "error.engineFailed";
  lastVisibleErrorKey = key;
  elements["loading-panel"].hidden = true;
  elements["calendar-workspace"].hidden = true;
  elements["comparison-workspace"].hidden = true;
  elements["error-panel"].hidden = false;
  elements["error-message"].textContent = t(key);
}

function fillSelectOptions(select) {
  const selected = select.value || "gregorian";
  const fragment = document.createDocumentFragment();
  for (const definition of CALENDAR_DEFINITIONS) {
    const option = document.createElement("option");
    option.value = definition.id;
    option.textContent = t(definition.labelKey);
    fragment.append(option);
  }
  select.replaceChildren(fragment);
  select.value = CALENDAR_DEFINITIONS.some(({ id }) => id === selected) ? selected : "gregorian";
}

function defaultValuesFor(calendarId, jdn) {
  if (calendarId === "gregorian") {
    const date = jdnToGregorian(jdn);
    return { year: date.year.toString(), month: String(date.month), day: String(date.day) };
  }
  return {};
}

function captureFormValues(configuration) {
  return Object.fromEntries(new FormData(configuration.form).entries());
}

function renderDateFields(kind, { values = null, jdn = null } = {}) {
  const configuration = formConfigurations[kind];
  const definition = getCalendarDefinition(configuration.select.value);
  const previousValues = values || captureFormValues(configuration);
  const defaults = jdn !== null ? defaultValuesFor(definition.id, jdn) : {};
  const fragment = document.createDocumentFragment();

  for (const field of definition.fields) {
    const label = document.createElement("label");
    label.className = field.kind === "checkbox" ? "checkbox-field" : "date-field";
    const labelText = document.createElement("span");
    labelText.textContent = t(field.labelKey);
    let input;
    const conventionalMonthChoices = calendarMonthChoices(
      definition.id,
      field,
      activeLocale.intlLocale,
    );
    if (field.kind === "select" || conventionalMonthChoices) {
      input = document.createElement("select");
      for (const choice of conventionalMonthChoices || field.options) {
        const option = document.createElement("option");
        option.value = choice.value;
        option.textContent = choice.labelKey ? t(choice.labelKey) : choice.label;
        input.append(option);
      }
    } else {
      input = document.createElement("input");
      const textualNumeral = field.kind === "integer"
        && usesTextualCalendarNumeral(definition.id, field.name);
      input.type = field.kind === "checkbox" ? "checkbox" : (textualNumeral ? "text" : "number");
      if (field.kind === "integer") {
        input.step = "1";
        input.inputMode = textualNumeral ? "text" : "numeric";
        if (textualNumeral) input.dir = "auto";
        if (field.min !== undefined) input.min = String(field.min);
        if (field.max !== undefined) input.max = String(field.max);
        input.required = true;
      }
    }
    input.name = field.name;
    input.id = `${kind}-${field.name}`;
    const stored = previousValues[field.name] ?? defaults[field.name] ?? field.defaultValue ?? "";
    if (field.kind === "checkbox") input.checked = stored === true || stored === "true" || stored === "on";
    else input.value = String(stored);
    if (field.kind === "checkbox") label.append(input, labelText);
    else label.append(labelText, input);
    fragment.append(label);
  }
  configuration.fields.replaceChildren(fragment);
  configuration.help.hidden = !definition.helpKey;
  configuration.help.textContent = definition.helpKey ? t(definition.helpKey) : "";
  configuration.error.hidden = true;
}

function initializeDateForm(kind, jdn) {
  const configuration = formConfigurations[kind];
  fillSelectOptions(configuration.select);
  configuration.select.value = "gregorian";
  renderDateFields(kind, { jdn });
}

function readDateForm(kind) {
  const configuration = formConfigurations[kind];
  configuration.error.hidden = true;
  if (!configuration.form.reportValidity()) throw new RangeError("Missing or invalid input fields.");
  const values = captureFormValues(configuration);
  for (const checkbox of configuration.form.querySelectorAll('input[type="checkbox"]')) {
    values[checkbox.name] = checkbox.checked;
  }
  const normalizedValues = normalizeCalendarInputValues(configuration.select.value, values);
  return calendarDateToJdn(configuration.select.value, normalizedValues);
}

function showFormError(kind, error) {
  console.error(error);
  const configuration = formConfigurations[kind];
  configuration.error.textContent = t(configuration.errorKey);
  configuration.error.hidden = false;
  configuration.error.focus?.();
}

function initializeToday({ replaceHistory = false } = {}) {
  const snapshot = currentDaySnapshot();
  const jdn = snapshot.jdn;
  state = {
    ...state,
    targetJdn: jdn,
    viewAnchorJdn: jdn,
    calculationJdn: jdn,
    comparisonJdn: jdn + 1n,
    comparisonFollowsNextAction: true,
    targetFollowsCurrentDay: true,
    calculationFollowsCurrentDay: true,
    currentDayDate: snapshot.date,
    currentDayJdn: jdn,
  };
  initializeDateForm("target", jdn);
  initializeDateForm("action", jdn);
  initializeDateForm("comparison", jdn + 1n);
  reverseUi?.notifyActiveCalculationChanged();
  return loadCutlet({ replaceHistory });
}

function goToday({ replaceHistory = false } = {}) {
  const snapshot = currentDaySnapshot();
  const jdn = snapshot.jdn;
  state.targetJdn = jdn;
  state.viewAnchorJdn = jdn;
  state.targetFollowsCurrentDay = true;
  state.currentDayDate = snapshot.date;
  state.currentDayJdn = jdn;
  initializeDateForm("target", jdn);
  // Deliberately preserve an explicitly selected day of working.
  return loadCutlet({ replaceHistory });
}

function loadFromUrl() {
  const params = new URL(location.href).searchParams;
  const snapshot = currentDaySnapshot();
  const todayJdn = snapshot.jdn;
  const targetJdn = readBigIntParameter(params, "t");
  const calculationJdn = readBigIntParameter(params, "c");
  if (targetJdn === null || calculationJdn === null) return initializeToday({ replaceHistory: true });
  const comparisonParameter = readBigIntParameter(params, "c2");
  state = {
    ...state,
    targetJdn,
    viewAnchorJdn: readBigIntParameter(params, "v") ?? targetJdn,
    calculationJdn,
    comparisonJdn: comparisonParameter ?? calculationJdn + 1n,
    comparisonFollowsNextAction: comparisonParameter === null,
    comparisonEnabled: params.get("compare") === "1",
    targetFollowsCurrentDay: params.get("today") === "1" && targetJdn === todayJdn,
    calculationFollowsCurrentDay: params.get("ctoday") === "1" && calculationJdn === todayJdn,
    currentDayDate: snapshot.date,
    currentDayJdn: todayJdn,
  };
  initializeDateForm("target", targetJdn);
  initializeDateForm("action", calculationJdn);
  initializeDateForm("comparison", state.comparisonJdn);
  elements["comparison-toggle"].checked = state.comparisonEnabled;
  elements["comparison-date-form"].hidden = !state.comparisonEnabled;
  reverseUi?.notifyActiveCalculationChanged();
  return loadCutlet({ replaceHistory: true });
}

function applyActiveLocale({ rerender = true } = {}) {
  const formSnapshots = Object.fromEntries(
    Object.entries(formConfigurations).map(([kind, configuration]) => [kind, {
      calendarId: configuration.select.value || "gregorian",
      values: captureFormValues(configuration),
    }]),
  );
  rebuildFormatters();
  applyDocumentLocale(activeLocale);
  populateLanguageSelector(elements["language-selector"], activeLocale.code);
  for (const [kind, snapshot] of Object.entries(formSnapshots)) {
    fillSelectOptions(formConfigurations[kind].select);
    formConfigurations[kind].select.value = snapshot.calendarId;
    renderDateFields(kind, { values: snapshot.values });
  }
  if (rerender && state.view) {
    renderView(state.view, { scrollToTarget: false });
    if (state.yearStructure) renderYearStructure(state.yearStructure);
    else if (state.yearStructureFailed) renderYearStructureError(state.view);
    else renderYearStructureLoading(state.view);
    renderComparison();
  }
  if (lastVisibleErrorKey && !elements["error-panel"].hidden) {
    elements["error-message"].textContent = t(lastVisibleErrorKey);
  }
  reverseUi?.refreshLocale();
}

async function syncLocaleFromEnvironment({ rerender = true } = {}) {
  const resolved = resolveBrowserLocale();
  if (resolved.locale.code === activeLocale.code) return;
  activeLocale = await loadLocale(resolved.locale.code);
  applyActiveLocale({ rerender });
}

async function chooseLanguage(code) {
  const metadata = getLocale(code);
  const locale = metadata.code === activeLocale.code ? activeLocale : await loadLocale(metadata.code);
  persistLanguage(metadata.code);
  const url = urlWithLanguage(location.href, metadata.code);
  history.pushState({ pastafari: true }, "", url);
  if (locale.code !== activeLocale.code) {
    activeLocale = locale;
    applyActiveLocale();
  } else {
    populateLanguageSelector(elements["language-selector"], activeLocale.code);
  }
}

function openReversePair(targetJdn, calculationJdn) {
  const target = BigInt(targetJdn);
  const calculation = BigInt(calculationJdn);
  state.targetJdn = target;
  state.viewAnchorJdn = target;
  state.calculationJdn = calculation;
  state.targetFollowsCurrentDay = target === state.currentDayJdn;
  state.calculationFollowsCurrentDay = calculation === state.currentDayJdn;
  if (state.comparisonFollowsNextAction) {
    state.comparisonJdn = calculation + 1n;
    initializeDateForm("comparison", state.comparisonJdn);
  }
  initializeDateForm("target", target);
  initializeDateForm("action", calculation);
  reverseUi?.notifyActiveCalculationChanged({ markStale: false });
  loadCutlet().then(() => {
    elements["calendar-workspace"].scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function initializeReverseSearch() {
  if (reverseUi || state.calculationJdn === null) return;
  reverseUi = createReverseSearchUi(elements["reverse-app"], {
    getLocale: () => activeLocale,
    siteT: t,
    getActiveCalculationJdn: () => state.calculationJdn,
    formatJdn: formatJdnAsGregorian,
    formatInteger,
    openPair: openReversePair,
  });
}

function installGuideNavigation() {
  for (const link of document.querySelectorAll("[data-guide-link]")) {
    link.addEventListener("click", () => {
      requestAnimationFrame(() => elements["guide-heading"].focus({ preventScroll: true }));
    });
  }
}

applyActiveLocale({ rerender: false });
installGuideNavigation();

elements["language-selector"].addEventListener("change", (event) => {
  const select = event.currentTarget;
  const requested = select.value;
  const restoreFocus = document.activeElement === select;
  select.disabled = true;
  chooseLanguage(requested)
    .catch((error) => {
      console.error(error);
      populateLanguageSelector(select, activeLocale.code);
    })
    .finally(() => {
      select.disabled = false;
      if (restoreFocus) select.focus({ preventScroll: true });
    });
});
elements["reload-button"].addEventListener("click", () => location.reload());
elements["today-button"].addEventListener("click", () => goToday());
elements["previous-cutlet"].addEventListener("click", () => {
  state.viewAnchorJdn = state.view.previousCutletJdn;
  loadCutlet({ scrollToTarget: false });
});
elements["next-cutlet"].addEventListener("click", () => {
  state.viewAnchorJdn = state.view.nextCutletJdn;
  loadCutlet({ scrollToTarget: false });
});

for (const [kind, configuration] of Object.entries(formConfigurations)) {
  configuration.select.addEventListener("change", () => renderDateFields(kind, { values: {} }));
}

formConfigurations.target.form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const jdn = readDateForm("target");
    state.targetJdn = jdn;
    state.viewAnchorJdn = jdn;
    state.targetFollowsCurrentDay = jdn === state.currentDayJdn;
    loadCutlet();
  } catch (error) {
    showFormError("target", error);
  }
});

formConfigurations.action.form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const jdn = readDateForm("action");
    const calculationChanged = state.calculationJdn !== jdn;
    state.calculationJdn = jdn;
    state.calculationFollowsCurrentDay = jdn === state.currentDayJdn;
    if (calculationChanged) reverseUi?.notifyActiveCalculationChanged();
    if (state.comparisonFollowsNextAction) {
      state.comparisonJdn = jdn + 1n;
      initializeDateForm("comparison", state.comparisonJdn);
    }
    state.viewAnchorJdn = state.targetJdn;
    loadCutlet();
  } catch (error) {
    showFormError("action", error);
  }
});

elements["reset-action-day"].addEventListener("click", () => {
  const calculationChanged = state.calculationJdn !== state.currentDayJdn;
  state.calculationJdn = state.currentDayJdn;
  state.calculationFollowsCurrentDay = true;
  if (calculationChanged) reverseUi?.notifyActiveCalculationChanged();
  if (state.comparisonFollowsNextAction) {
    state.comparisonJdn = state.currentDayJdn + 1n;
    initializeDateForm("comparison", state.comparisonJdn);
  }
  initializeDateForm("action", state.currentDayJdn);
  state.viewAnchorJdn = state.targetJdn;
  loadCutlet();
});

elements["comparison-toggle"].addEventListener("change", (event) => {
  state.comparisonEnabled = event.currentTarget.checked;
  elements["comparison-date-form"].hidden = !state.comparisonEnabled;
  state.comparisonDays = null;
  const viewSequence = viewLoadSequence;
  loadComparison(++comparisonLoadSequence, viewSequence)
    .then((applied) => {
      if (applied && viewSequence === committedViewLoadSequence) writeHistory();
    })
    .catch((error) => showError(error));
});

formConfigurations.comparison.form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    state.comparisonJdn = readDateForm("comparison");
    state.comparisonFollowsNextAction = false;
    state.comparisonDays = null;
    const viewSequence = viewLoadSequence;
    loadComparison(++comparisonLoadSequence, viewSequence)
      .then((applied) => {
        if (applied && viewSequence === committedViewLoadSequence) writeHistory();
      })
      .catch((error) => showError(error));
  } catch (error) {
    showFormError("comparison", error);
  }
});

matchMedia(DESKTOP_COMPARISON_QUERY).addEventListener("change", () => {
  if (!state.comparisonEnabled || !state.view) return;
  state.comparisonDays = null;
  loadComparison(++comparisonLoadSequence, viewLoadSequence).catch((error) => showError(error));
});

window.addEventListener("popstate", () => {
  syncLocaleFromEnvironment()
    .then(() => loadFromUrl())
    .catch((error) => showError(error));
});

function sameObserver(left, right) {
  return Boolean(left && right
    && left.assumed === right.assumed
    && left.latitude === right.latitude
    && left.longitude === right.longitude
    && left.elevationM === right.elevationM);
}

function refreshCurrentDay() {
  if (document.visibilityState === "hidden") return;
  const snapshot = currentDaySnapshot();
  const todayJdn = snapshot.jdn;
  if (todayJdn === state.currentDayJdn) {
    state.currentDayDate = snapshot.date;
    if (state.view) renderTargetBeacon();
    return;
  }

  const calculationWasCurrentDay = state.calculationFollowsCurrentDay;
  if (calculationWasCurrentDay && state.currentDayJdn !== null) {
    alert(t("day.staleWarning", {
      previousDate: formatJdnAsGregorian(state.currentDayJdn),
      currentDate: formatJdnAsGregorian(todayJdn),
    }));
  }

  state.currentDayDate = snapshot.date;
  state.currentDayJdn = todayJdn;
  if (state.targetFollowsCurrentDay) {
    state.targetJdn = todayJdn;
    state.viewAnchorJdn = todayJdn;
    initializeDateForm("target", todayJdn);
  }
  if (calculationWasCurrentDay) {
    state.calculationJdn = todayJdn;
    reverseUi?.notifyActiveCalculationChanged();
    initializeDateForm("action", todayJdn);
    if (state.comparisonFollowsNextAction) {
      state.comparisonJdn = todayJdn + 1n;
      initializeDateForm("comparison", state.comparisonJdn);
    }
  }
  if (state.targetFollowsCurrentDay || calculationWasCurrentDay) loadCutlet({ replaceHistory: true });
  else if (state.view) renderTargetBeacon();
}

let currentDayRefreshTimer = null;

function clearCurrentDayRefreshTimer() {
  if (currentDayRefreshTimer !== null) {
    clearTimeout(currentDayRefreshTimer);
    currentDayRefreshTimer = null;
  }
}

function scheduleCurrentDayRefresh() {
  clearCurrentDayRefreshTimer();
  if (document.visibilityState === "hidden") return;
  const snapshot = currentDaySnapshot();
  const delay = Math.max(0, snapshot.nextBoundary.instant.getTime() - Date.now() + 250);
  currentDayRefreshTimer = setTimeout(() => {
    currentDayRefreshTimer = null;
    refreshCurrentDay();
    scheduleCurrentDayRefresh();
  }, delay);
}

async function updateObserverLocation(nextObserver) {
  if (sameObserver(observerLocation, nextObserver)) return;
  observerLocation = nextObserver;
  refreshCurrentDay();
  scheduleCurrentDayRefresh();
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    clearCurrentDayRefreshTimer();
    return;
  }
  refreshCurrentDay();
  scheduleCurrentDayRefresh();
});
window.addEventListener("pageshow", () => {
  refreshCurrentDay();
  scheduleCurrentDayRefresh();
});

if ("serviceWorker" in navigator) {
  const registerServiceWorker = () => navigator.serviceWorker.register("./sw.js").catch(() => {});
  if (document.readyState === "complete") registerServiceWorker();
  else addEventListener("load", registerServiceWorker, { once: true });
}

async function startApplication() {
  observerLocation = await resolveObserverLocation({ timeoutMs: 2_000 });
  await loadFromUrl();
  initializeReverseSearch();
  scheduleCurrentDayRefresh();
  watchObserverPermission((nextObserver) => {
    updateObserverLocation(nextObserver).catch((error) => console.error(error));
  }).catch((error) => console.error(error));
}

startApplication().catch(async (error) => {
  console.error(error);
  observerLocation = KISURRA_OBSERVER;
  await loadFromUrl();
  initializeReverseSearch();
  scheduleCurrentDayRefresh();
});
