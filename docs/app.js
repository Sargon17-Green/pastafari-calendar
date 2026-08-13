"use strict";

const worker = new Worker(new URL("./engine/pastafari-fast-worker.js", import.meta.url), {
  type: "module",
  name: "pastafari-fast",
});
const pending = new Map();
const numberFormatter = new Intl.NumberFormat("he-IL", { useGrouping: true });
let requestId = 0;
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

function workerRequest(operation, payload, timeoutMs = 120_000) {
  const id = ++requestId;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("החישוב נמשך זמן רב מדי."));
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
  else entry.reject(new Error(message.error?.message || "מנוע החישוב נכשל."));
});

worker.addEventListener("error", (event) => {
  showError(new Error(event.message || "טעינת מנוע החישוב נכשלה."));
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
  return `${String(date.day).padStart(2, "0")}.${String(date.month).padStart(2, "0")}.${date.year}`;
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

function hslToRgb(hue, saturation, lightness) {
  const h = ((hue % 360) + 360) % 360 / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  if (s === 0) {
    const gray = Math.round(l * 255);
    return [gray, gray, gray];
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (offset) => {
    let t = h + offset;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  return [channel(1 / 3), channel(0), channel(-1 / 3)].map((value) => Math.round(value * 255));
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
  // Golden-angle hue spacing keeps neighboring month colors far apart in hue.
  // Alternating very light / very dark backgrounds adds a second, much stronger
  // luminance distinction. Lightness is pushed until normal text reaches WCAG AAA
  // contrast (>= 7:1) against either black or white.
  const hue = Math.round((index * 137.508 + 338) % 360);
  const saturation = 100;
  const wantsLightBackground = index % 2 === 0;

  let lightness = wantsLightBackground ? 52 : 38;
  let ink = wantsLightBackground ? "#000000" : "#ffffff";

  while (lightness >= 0 && lightness <= 100) {
    const luminance = relativeLuminance(hslToRgb(hue, saturation, lightness));
    const inkLuminance = ink === "#000000" ? 0 : 1;
    if (contrastRatio(luminance, inkLuminance) >= 7) break;
    lightness += wantsLightBackground ? 1 : -1;
  }

  return {
    background: `hsl(${hue} ${saturation}% ${lightness}%)`,
    edge: ink,
    ink,
  };
}

function renderSelection() {
  const selected = state.view.days.find((day) => day.jdn === state.selectedJdn);
  if (!selected) {
    elements["selection-summary"].hidden = true;
    return;
  }
  elements["selection-summary"].hidden = false;
  const label = document.createElement("span");
  label.textContent = "היום הנבחר";
  const primary = document.createElement("strong");
  primary.textContent = `${selected.cutletName} · שנה ${formatInteger(selected.year)}`;
  const measures = document.createElement("span");
  measures.textContent = `${formatInteger(selected.dayInCutlet)} בקציצה · ${formatInteger(selected.dayInMonth)} בחודש`;
  const meta = document.createElement("small");
  meta.textContent = selected.monthName;
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

function renderView(view) {
  state.view = view;
  elements["cutlet-meta"].textContent = `קציצה נוכחית · שנה ${formatInteger(view.year)}`;
  elements["cutlet-heading"].textContent = view.cutletName;
  elements["cutlet-description"].textContent = `${formatInteger(view.days.length)} ימים · החישוב מבוסס על התאריך המקומי: ${formatLocalDate(state.localDate)}`;
  elements["calendar-grid"].setAttribute("aria-label", `ימי הקציצה ${view.cutletName}`);

  const monthIndices = new Map();
  const fragment = document.createDocumentFragment();
  for (const day of view.days) {
    if (!monthIndices.has(day.monthName)) monthIndices.set(day.monthName, monthIndices.size);
    const colors = monthColors(monthIndices.get(day.monthName));
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
    button.setAttribute("aria-pressed", String(selected));
    button.setAttribute("aria-label", `שנת ${formatInteger(day.year)} לבריאת העולם, יום ${formatInteger(day.dayInCutlet)} לקציצה ${day.cutletName}, ${formatInteger(day.dayInMonth)} בחודש ${day.monthName}`);
    if (selected) button.setAttribute("aria-current", "date");

    const emphasize = (value) => {
      const strong = document.createElement("strong");
      strong.textContent = value;
      return strong;
    };
    const yearLine = document.createElement("span");
    yearLine.className = "day-line";
    yearLine.append("שנת ", emphasize(formatInteger(day.year)), " לבריאת העולם");
    const cutletLine = document.createElement("span");
    cutletLine.className = "day-line";
    cutletLine.append(
      "יום ",
      emphasize(formatInteger(day.dayInCutlet)),
      " לקציצה ",
      emphasize(day.cutletName),
    );
    const monthLine = document.createElement("span");
    monthLine.className = "day-line";
    monthLine.append(
      emphasize(formatInteger(day.dayInMonth)),
      " בחודש ",
      emphasize(day.monthName),
    );
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

  requestAnimationFrame(() => {
    elements["calendar-grid"].querySelector('[aria-current="date"]')?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  });
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
  elements["loading-panel"].hidden = true;
  elements["calendar-workspace"].hidden = true;
  elements["error-panel"].hidden = false;
  elements["error-message"].textContent = error?.message || String(error);
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
window.addEventListener("popstate", () => loadFromUrl());

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
