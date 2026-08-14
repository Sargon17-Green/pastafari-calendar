"use strict";

import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn,
  getCalendarDefinition,
  gregorianToJdn,
  jdnToGregorian,
} from "./calendar-converters.js?v=8-year-structure";
import {
  calendarMonthChoices,
  normalizeCalendarInputValues,
  usesTextualCalendarNumeral,
} from "./calendar-input-conventions.js?v=9-calendar-input-conventions";
import { calendarLabel, getLocale, translate, validateLocaleResources } from "./i18n/registry.js?v=8-year-structure";
import {
  applyDocumentLocale,
  persistLanguage,
  populateLanguageSelector,
  resolveBrowserLocale,
  urlWithLanguage,
} from "./i18n/runtime.js?v=8-year-structure";

validateLocaleResources();

const ASSET_REVISION = "8-year-structure";
const DESKTOP_COMPARISON_QUERY = "(min-width: 1000px)";
const worker = new Worker(
  new URL(`./engine/pastafari-fast-worker.js?v=${ASSET_REVISION}`, import.meta.url),
  { type: "module", name: "pastafari-fast" },
);
const pending = new Map();
let requestId = 0;
let activeLocale = resolveBrowserLocale().locale;
let numberFormatter = null;
let dateFormatter = null;
let lastVisibleErrorKey = null;
let loadSequence = 0;
let state = {
  targetJdn: null,
  viewAnchorJdn: null,
  calculationJdn: null,
  comparisonJdn: null,
  comparisonFollowsNextAction: true,
  comparisonEnabled: false,
  targetIsLocalToday: true,
  calculationIsLocalToday: true,
  localDate: null,
  localTodayJdn: null,
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

function localToday() {
  const now = new Date();
  return Object.freeze({
    year: BigInt(now.getFullYear()),
    month: now.getMonth() + 1,
    day: now.getDate(),
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
  if (state.targetIsLocalToday) url.searchParams.set("today", "1");
  if (state.calculationIsLocalToday) url.searchParams.set("ctoday", "1");
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
  const markerKey = state.targetIsLocalToday ? "target.today" : "target.searched";
  elements["target-marker"].textContent = t(markerKey);
  elements["target-date-lines"].replaceChildren();
  if (target) {
    elements["target-date-lines"].append(...makeDateLines(target, "beacon-line"));
  } else {
    const line = document.createElement("strong");
    line.textContent = t("target.notInView");
    elements["target-date-lines"].append(line);
  }
  elements["target-context"].textContent = t("target.context", {
    targetDate: formatJdnAsGregorian(state.targetJdn),
    actionDate: formatJdnAsGregorian(state.calculationJdn),
  });
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
      badge.textContent = t(state.targetIsLocalToday ? "target.today" : "target.searched");
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
    if (sequence !== loadSequence || state.view !== view) return;
    renderYearStructure(structure);
  } catch (error) {
    if (sequence === loadSequence && state.view === view) showYearStructureError(error);
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
  if (!shouldShow) return;
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
    sequence.textContent = `JDN ${primary.jdn.toString()}`;
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

async function loadComparison(sequence) {
  state.comparisonDays = null;
  if (!state.comparisonEnabled || !comparisonIsDesktop() || !state.view) {
    renderComparison();
    return;
  }
  const range = await workerRequest("getRangeView", {
    startJdn: state.view.startJdn,
    endJdn: state.view.endJdn,
    calculationJdn: state.comparisonJdn,
  });
  if (sequence !== loadSequence) return;
  state.comparisonDays = range.days;
  renderComparison();
}

async function loadCutlet({ replaceHistory = false, scrollToTarget = true } = {}) {
  const sequence = ++loadSequence;
  elements["previous-cutlet"].disabled = true;
  elements["next-cutlet"].disabled = true;
  try {
    const view = await workerRequest("getCutletView", {
      targetJdn: state.viewAnchorJdn,
      calculationJdn: state.calculationJdn,
    });
    if (sequence !== loadSequence) return;
    renderView(view, { scrollToTarget });
    void loadYearStructure(sequence, view);
    await loadComparison(sequence);
    if (sequence !== loadSequence) return;
    writeHistory({ replace: replaceHistory });
  } catch (error) {
    if (sequence === loadSequence) showError(error);
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

function goToday({ replaceHistory = false } = {}) {
  const date = localToday();
  const jdn = gregorianToJdn(date);
  state = {
    ...state,
    targetJdn: jdn,
    viewAnchorJdn: jdn,
    calculationJdn: jdn,
    comparisonJdn: jdn + 1n,
    comparisonFollowsNextAction: true,
    targetIsLocalToday: true,
    calculationIsLocalToday: true,
    localDate: date,
    localTodayJdn: jdn,
  };
  initializeDateForm("target", jdn);
  initializeDateForm("action", jdn);
  initializeDateForm("comparison", jdn + 1n);
  return loadCutlet({ replaceHistory });
}

function loadFromUrl() {
  const params = new URL(location.href).searchParams;
  const today = localToday();
  const todayJdn = gregorianToJdn(today);
  const targetJdn = readBigIntParameter(params, "t");
  const calculationJdn = readBigIntParameter(params, "c");
  if (targetJdn === null || calculationJdn === null) return goToday({ replaceHistory: true });
  const comparisonParameter = readBigIntParameter(params, "c2");
  state = {
    ...state,
    targetJdn,
    viewAnchorJdn: readBigIntParameter(params, "v") ?? targetJdn,
    calculationJdn,
    comparisonJdn: comparisonParameter ?? calculationJdn + 1n,
    comparisonFollowsNextAction: comparisonParameter === null,
    comparisonEnabled: params.get("compare") === "1",
    targetIsLocalToday: params.get("today") === "1" && targetJdn === todayJdn,
    calculationIsLocalToday: params.get("ctoday") === "1" && calculationJdn === todayJdn,
    localDate: today,
    localTodayJdn: todayJdn,
  };
  initializeDateForm("target", targetJdn);
  initializeDateForm("action", calculationJdn);
  initializeDateForm("comparison", state.comparisonJdn);
  elements["comparison-toggle"].checked = state.comparisonEnabled;
  elements["comparison-date-form"].hidden = !state.comparisonEnabled;
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

function installGuideNavigation() {
  for (const link of document.querySelectorAll("[data-guide-link]")) {
    link.addEventListener("click", () => {
      requestAnimationFrame(() => elements["guide-heading"].focus({ preventScroll: true }));
    });
  }
}

applyActiveLocale({ rerender: false });
installGuideNavigation();

elements["language-selector"].addEventListener("change", (event) => chooseLanguage(event.currentTarget.value));
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
    state.targetIsLocalToday = jdn === state.localTodayJdn;
    loadCutlet();
  } catch (error) {
    showFormError("target", error);
  }
});

formConfigurations.action.form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const jdn = readDateForm("action");
    state.calculationJdn = jdn;
    state.calculationIsLocalToday = jdn === state.localTodayJdn;
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
  state.calculationJdn = state.localTodayJdn;
  state.calculationIsLocalToday = true;
  if (state.comparisonFollowsNextAction) {
    state.comparisonJdn = state.localTodayJdn + 1n;
    initializeDateForm("comparison", state.comparisonJdn);
  }
  initializeDateForm("action", state.localTodayJdn);
  state.viewAnchorJdn = state.targetJdn;
  loadCutlet();
});

elements["comparison-toggle"].addEventListener("change", (event) => {
  state.comparisonEnabled = event.currentTarget.checked;
  elements["comparison-date-form"].hidden = !state.comparisonEnabled;
  state.comparisonDays = null;
  loadComparison(++loadSequence)
    .then(() => writeHistory())
    .catch((error) => showError(error));
});

formConfigurations.comparison.form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    state.comparisonJdn = readDateForm("comparison");
    state.comparisonFollowsNextAction = false;
    state.comparisonDays = null;
    loadComparison(++loadSequence)
      .then(() => writeHistory())
      .catch((error) => showError(error));
  } catch (error) {
    showFormError("comparison", error);
  }
});

matchMedia(DESKTOP_COMPARISON_QUERY).addEventListener("change", () => {
  if (!state.comparisonEnabled || !state.view) return;
  state.comparisonDays = null;
  loadComparison(++loadSequence).catch((error) => showError(error));
});

window.addEventListener("popstate", () => {
  syncLocaleFromEnvironment();
  loadFromUrl();
});

function refreshLocalDay() {
  if (document.visibilityState === "hidden") return;
  const today = localToday();
  const todayJdn = gregorianToJdn(today);
  if (todayJdn === state.localTodayJdn) return;
  state.localDate = today;
  state.localTodayJdn = todayJdn;
  if (state.targetIsLocalToday) {
    state.targetJdn = todayJdn;
    state.viewAnchorJdn = todayJdn;
    initializeDateForm("target", todayJdn);
  }
  if (state.calculationIsLocalToday) {
    state.calculationJdn = todayJdn;
    initializeDateForm("action", todayJdn);
    if (state.comparisonFollowsNextAction) {
      state.comparisonJdn = todayJdn + 1n;
      initializeDateForm("comparison", state.comparisonJdn);
    }
  }
  if (state.targetIsLocalToday || state.calculationIsLocalToday) loadCutlet({ replaceHistory: true });
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
