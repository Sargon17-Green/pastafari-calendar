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
import { CUTLETS, MONTHS } from "./i18n/calendar-identifiers.js?v=8-year-structure";
import { calendarLabel, translate } from "./i18n/registry.js?v=17-unified-i18n";
import {
  ReverseSearchController,
  advancedReverseProblem,
  classifyConstraintResult,
  sameTargetReverseProblem,
  simpleReverseProblem,
} from "./reverse-search-controller.js";

let editorSequence = 0;

function node(tag, className = "", text = null) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== null) element.textContent = text;
  return element;
}

function option(value, text) {
  const element = document.createElement("option");
  element.value = value;
  element.textContent = text;
  return element;
}

function requiredIntegerInput({ min = null, max = null, required = true } = {}) {
  const input = document.createElement("input");
  input.type = "number";
  input.step = "1";
  input.inputMode = "numeric";
  input.required = required;
  if (min !== null) input.min = String(min);
  if (max !== null) input.max = String(max);
  return input;
}

function integerTextInput({ required = true } = {}) {
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[+-]?\\d+";
  input.required = required;
  return input;
}

function localizedUiError(key, values = {}) {
  const error = new RangeError(key);
  error.translationKey = key;
  error.translationValues = Object.freeze({ ...values });
  return error;
}

function positiveLimit(value, fieldName, { number = false } = {}) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (!/^\d+$/.test(text) || BigInt(text) < 1n) throw localizedUiError("reverse.error.limitPositive", { field: fieldName });
  if (!number) return BigInt(text);
  const parsed = Number(text);
  if (!Number.isSafeInteger(parsed)) throw localizedUiError("reverse.error.limitSafeInteger", { field: fieldName });
  return parsed;
}

function gregorianDefaults(jdn) {
  const date = jdnToGregorian(jdn);
  return { year: date.year.toString(), month: String(date.month), day: String(date.day) };
}

class AbsoluteDateEditor {
  constructor(host, services, { initialJdn = null, labelKey = "reverse.calendar.label" } = {}) {
    this.services = services;
    this.host = host;
    this.labelKey = labelKey;
    this.id = `reverse-absolute-${++editorSequence}`;
    this.root = node("div", "reverse-absolute-editor");
    this.calendarLabel = node("label", "calendar-picker");
    this.calendarLabelText = node("span");
    this.calendar = document.createElement("select");
    this.calendar.id = `${this.id}-calendar`;
    this.calendarLabel.htmlFor = this.calendar.id;
    this.calendarLabel.append(this.calendarLabelText, this.calendar);
    this.fields = node("div", "date-fields reverse-date-fields");
    this.help = node("p", "field-help");
    this.error = node("p", "form-error");
    this.error.hidden = true;
    this.root.append(this.calendarLabel, this.fields, this.help, this.error);
    host.append(this.root);
    this.populateCalendars("gregorian");
    this.renderFields({ values: initialJdn === null ? {} : gregorianDefaults(initialJdn) });
    this.calendar.addEventListener("change", () => this.renderFields({ values: {} }));
    this.refreshLocale();
  }

  populateCalendars(selected = this.calendar.value || "gregorian") {
    this.calendar.replaceChildren(...CALENDAR_DEFINITIONS.map((definition) => (
      option(definition.id, this.services.siteT(definition.labelKey))
    )));
    this.calendar.value = CALENDAR_DEFINITIONS.some(({ id }) => id === selected) ? selected : "gregorian";
  }

  capture() {
    const values = {};
    for (const input of this.fields.querySelectorAll("input,select")) {
      values[input.name] = input.type === "checkbox" ? input.checked : input.value;
    }
    return values;
  }

  renderFields({ values = this.capture() } = {}) {
    const definition = getCalendarDefinition(this.calendar.value);
    const fragment = document.createDocumentFragment();
    for (const field of definition.fields) {
      const label = node("label", field.kind === "checkbox" ? "checkbox-field" : "date-field");
      const text = node("span", "", this.services.siteT(field.labelKey));
      let input;
      const monthChoices = calendarMonthChoices(definition.id, field, this.services.getLocale().intlLocale);
      if (field.kind === "select" || monthChoices) {
        input = document.createElement("select");
        for (const choice of monthChoices || field.options) {
          input.append(option(choice.value, choice.labelKey ? this.services.siteT(choice.labelKey) : choice.label));
        }
      } else {
        input = document.createElement("input");
        const textual = field.kind === "integer" && usesTextualCalendarNumeral(definition.id, field.name);
        input.type = field.kind === "checkbox" ? "checkbox" : textual ? "text" : "number";
        if (field.kind === "integer") {
          input.step = "1";
          input.inputMode = textual ? "text" : "numeric";
          input.required = true;
          if (textual) input.dir = "auto";
          if (field.min !== undefined) input.min = String(field.min);
          if (field.max !== undefined) input.max = String(field.max);
        }
      }
      input.name = field.name;
      input.id = `${this.id}-${field.name}`;
      const stored = values[field.name] ?? field.defaultValue ?? "";
      if (field.kind === "checkbox") input.checked = stored === true || stored === "true" || stored === "on";
      else input.value = String(stored);
      if (field.kind === "checkbox") label.append(input, text);
      else label.append(text, input);
      fragment.append(label);
    }
    this.fields.replaceChildren(fragment);
    this.help.hidden = !definition.helpKey;
    this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
    this.error.hidden = true;
  }

  read() {
    this.error.hidden = true;
    const values = this.capture();
    try {
      for (const required of this.fields.querySelectorAll("[required]")) {
        if (!required.checkValidity()) throw localizedUiError("reverse.error.absoluteDateField");
      }
      const normalized = normalizeCalendarInputValues(this.calendar.value, values);
      return calendarDateToJdn(this.calendar.value, normalized);
    } catch (error) {
      this.error.textContent = this.services.rt("reverse.error.input");
      this.error.hidden = false;
      throw error;
    }
  }

  refreshLocale() {
    const selected = this.calendar.value;
    const values = this.capture();
    this.calendarLabelText.textContent = this.services.rt(this.labelKey);
    this.populateCalendars(selected);
    this.renderFields({ values });
  }
}

class PastafariEditor {
  constructor(host, services, values = {}) {
    this.services = services;
    this.root = node("div", "reverse-pastafari-fields");
    this.inputs = {};
    const configs = [
      ["year", "reverse.field.year", () => integerTextInput()],
      ["cutletId", "reverse.field.cutlet", () => document.createElement("select")],
      ["dayInCutlet", "reverse.field.dayInCutlet", () => requiredIntegerInput({ min: 1 })],
      ["monthId", "reverse.field.month", () => document.createElement("select")],
      ["dayInMonth", "reverse.field.dayInMonth", () => requiredIntegerInput({ min: 1 })],
    ];
    for (const [name, key, factory] of configs) {
      const label = node("label", "date-field reverse-pastafari-field");
      const text = node("span");
      text.dataset.reverseKey = key;
      const input = factory();
      input.name = name;
      input.required = true;
      this.inputs[name] = input;
      label.append(text, input);
      this.root.append(label);
    }
    this.inputs.year.value = String(values.year ?? "");
    this.inputs.dayInCutlet.value = String(values.dayInCutlet ?? "");
    this.inputs.dayInMonth.value = String(values.dayInMonth ?? "");
    host.append(this.root);
    this.refreshLocale(values);
  }

  populateNames(type, selected = "") {
    const entries = type === "cutlet" ? CUTLETS : MONTHS;
    const select = this.inputs[type === "cutlet" ? "cutletId" : "monthId"];
    select.replaceChildren(...entries.map((entry) => option(
      entry.id,
      calendarLabel(this.services.getLocale(), type, entry.index),
    )));
    if (entries.some(({ id }) => id === selected)) select.value = selected;
  }

  read() {
    for (const input of Object.values(this.inputs)) {
      if (!input.checkValidity()) throw new RangeError(this.services.rt("reverse.error.pastafari"));
    }
    return {
      year: this.inputs.year.value,
      cutletId: this.inputs.cutletId.value,
      dayInCutlet: this.inputs.dayInCutlet.value,
      monthId: this.inputs.monthId.value,
      dayInMonth: this.inputs.dayInMonth.value,
    };
  }

  snapshot() {
    return {
      year: this.inputs.year.value,
      cutletId: this.inputs.cutletId.value,
      dayInCutlet: this.inputs.dayInCutlet.value,
      monthId: this.inputs.monthId.value,
      dayInMonth: this.inputs.dayInMonth.value,
    };
  }

  refreshLocale(preferred = this.snapshot()) {
    for (const element of this.root.querySelectorAll("[data-reverse-key]")) {
      element.textContent = this.services.rt(element.dataset.reverseKey);
    }
    this.populateNames("cutlet", preferred.cutletId);
    this.populateNames("month", preferred.monthId);
  }
}

class VariableCard {
  constructor(owner, id, index) {
    this.owner = owner;
    this.services = owner.services;
    this.id = id;
    this.root = node("article", "reverse-builder-card reverse-variable-card");
    this.root.dataset.variableId = id;
    const header = node("div", "reverse-card-heading");
    const title = node("strong", "reverse-card-title", id);
    this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
    this.removeButton.type = "button";
    header.append(title, this.removeButton);
    this.labelField = node("label", "date-field");
    this.labelText = node("span", "", this.services.rt("reverse.variable.label"));
    this.label = document.createElement("input");
    this.label.type = "text";
    this.label.value = this.services.rt("reverse.variable.defaultName", { index });
    this.labelField.append(this.labelText, this.label);
    this.domainField = node("label", "date-field");
    this.domainText = node("span", "", this.services.rt("reverse.variable.domain"));
    this.domain = document.createElement("select");
    this.domain.dataset.reverseRole = "domain";
    this.domainField.append(this.domainText, this.domain);
    this.domainBody = node("div", "reverse-domain-body");
    this.root.append(header, this.labelField, this.domainField, this.domainBody);
    owner.variablesHost.append(this.root);
    this.populateDomainOptions("unknown");
    this.renderDomain();
    this.domain.addEventListener("change", () => this.renderDomain());
    this.label.addEventListener("input", () => owner.refreshConstraintVariableChoices());
    this.removeButton.addEventListener("click", () => owner.removeVariable(this));
  }

  populateDomainOptions(selected = this.domain.value || "unknown") {
    this.domain.replaceChildren(
      option("unknown", this.services.rt("reverse.variable.domain.unknown")),
      option("exact", this.services.rt("reverse.variable.domain.exact")),
      option("range", this.services.rt("reverse.variable.domain.range")),
    );
    this.domain.value = selected;
  }

  renderDomain() {
    this.domainBody.replaceChildren();
    this.exactEditor = null;
    this.rangeStartEditor = null;
    this.rangeEndEditor = null;
    if (this.domain.value === "exact") {
      this.exactEditor = new AbsoluteDateEditor(this.domainBody, this.services, { initialJdn: this.services.getActiveCalculationJdn() });
    } else if (this.domain.value === "range") {
      const grid = node("div", "reverse-range-grid");
      const start = node("div", "reverse-range-part");
      start.append(node("h5", "", this.services.rt("reverse.basic.rangeStart")));
      const end = node("div", "reverse-range-part");
      end.append(node("h5", "", this.services.rt("reverse.basic.rangeEnd")));
      grid.append(start, end);
      this.domainBody.append(grid);
      this.rangeStartEditor = new AbsoluteDateEditor(start, this.services, { initialJdn: this.services.getActiveCalculationJdn() });
      this.rangeEndEditor = new AbsoluteDateEditor(end, this.services, { initialJdn: this.services.getActiveCalculationJdn() });
    }
  }

  read() {
    const label = this.label.value.trim() || this.id;
    if (this.domain.value === "exact") return { id: this.id, label, spec: { jdn: this.exactEditor.read() } };
    if (this.domain.value === "range") {
      const start = this.rangeStartEditor.read();
      const end = this.rangeEndEditor.read();
      if (end < start) throw new RangeError(this.services.rt("reverse.error.range"));
      return { id: this.id, label, spec: { range: [start, end] } };
    }
    return { id: this.id, label, spec: {} };
  }

  refreshLocale() {
    this.labelText.textContent = this.services.rt("reverse.variable.label");
    this.domainText.textContent = this.services.rt("reverse.variable.domain");
    this.removeButton.textContent = this.services.rt("reverse.action.remove");
    const selected = this.domain.value;
    this.populateDomainOptions(selected);
    this.exactEditor?.refreshLocale();
    this.rangeStartEditor?.refreshLocale();
    this.rangeEndEditor?.refreshLocale();
  }
}

class ConstraintCard {
  constructor(owner, id, preset = null) {
    this.owner = owner;
    this.services = owner.services;
    this.id = id;
    this.preset = preset;
    this.root = node("article", "reverse-builder-card reverse-constraint-card");
    this.root.dataset.constraintId = id;
    const header = node("div", "reverse-card-heading");
    this.title = node("strong", "reverse-card-title", id);
    this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
    this.removeButton.type = "button";
    header.append(this.title, this.removeButton);
    this.typeField = node("label", "date-field");
    this.typeText = node("span", "", this.services.rt("reverse.constraint.type"));
    this.type = document.createElement("select");
    this.type.dataset.reverseRole = "constraint-type";
    this.typeField.append(this.typeText, this.type);
    this.body = node("div", "reverse-constraint-body");
    this.root.append(header, this.typeField, this.body);
    owner.constraintsHost.append(this.root);
    this.populateTypeOptions(preset?.type || "pastafari");
    this.renderBody(preset);
    this.type.addEventListener("change", () => this.renderBody());
    this.removeButton.addEventListener("click", () => owner.removeConstraint(this));
  }

  populateTypeOptions(selected = this.type.value || "pastafari") {
    this.type.replaceChildren(
      option("pastafari", this.services.rt("reverse.constraint.pastafari")),
      option("equal", this.services.rt("reverse.constraint.equal")),
      option("order", this.services.rt("reverse.constraint.order")),
      option("difference", this.services.rt("reverse.constraint.difference")),
    );
    this.type.value = selected;
  }

  variableSelect(selected = "") {
    const select = document.createElement("select");
    this.owner.populateVariableSelect(select, selected);
    return select;
  }

  field(labelKey, control) {
    const label = node("label", "date-field");
    const text = node("span", "", this.services.rt(labelKey));
    text.dataset.reverseKey = labelKey;
    label.append(text, control);
    return label;
  }

  renderBody(preset = null) {
    this.body.replaceChildren();
    this.absoluteEditor = null;
    this.pastafariEditor = null;
    if (this.type.value === "pastafari") this.renderPastafari(preset);
    else if (this.type.value === "equal") this.renderEqual(preset);
    else if (this.type.value === "order") this.renderOrder(preset);
    else this.renderDifference(preset);
  }

  renderPastafari(preset) {
    this.target = this.variableSelect(preset?.target || "");
    this.target.dataset.reverseRole = "pastafari-target";
    this.body.append(this.field("reverse.constraint.target", this.target));
    this.calculationMode = document.createElement("select");
    this.calculationMode.dataset.reverseRole = "calculation-mode";
    this.calculationMode.append(
      option("variable", this.services.rt("reverse.constraint.calculation.variable")),
      option("absolute", this.services.rt("reverse.constraint.calculation.absolute")),
      option("same", this.services.rt("reverse.constraint.calculation.same")),
    );
    this.calculationMode.value = preset?.calculationMode || "variable";
    this.body.append(this.field("reverse.constraint.calculationMode", this.calculationMode));
    this.calculationBody = node("div", "reverse-calculation-body");
    this.body.append(this.calculationBody);
    const updateCalculation = () => {
      this.calculationBody.replaceChildren();
      this.absoluteEditor = null;
      if (this.calculationMode.value === "variable") {
        this.calculationVariable = this.variableSelect(preset?.calculation || "");
        this.calculationVariable.dataset.reverseRole = "calculation-variable";
        this.calculationBody.append(this.field("reverse.constraint.calculationVariable", this.calculationVariable));
      } else if (this.calculationMode.value === "absolute") {
        this.absoluteEditor = new AbsoluteDateEditor(this.calculationBody, this.services, {
          initialJdn: preset?.calculationJdn ?? this.services.getActiveCalculationJdn(),
        });
      }
    };
    this.calculationMode.addEventListener("change", () => {
      preset = null;
      updateCalculation();
    });
    updateCalculation();
    const pfWrap = node("div", "reverse-pastafari-block");
    pfWrap.append(node("h5", "", this.services.rt("reverse.basic.dateHeading")));
    this.body.append(pfWrap);
    this.pastafariEditor = new PastafariEditor(pfWrap, this.services, preset?.date || {});
  }

  renderEqual(preset) {
    this.left = this.variableSelect(preset?.left || "");
    this.right = this.variableSelect(preset?.right || "");
    this.body.append(this.field("reverse.constraint.left", this.left), this.field("reverse.constraint.right", this.right));
  }

  renderOrder(preset) {
    this.left = this.variableSelect(preset?.left || "");
    this.op = document.createElement("select");
    this.op.append(option("<", "<"), option("<=", "≤"), option(">", ">"), option(">=", "≥"));
    this.op.value = preset?.op || "<";
    this.right = this.variableSelect(preset?.right || "");
    this.body.append(
      this.field("reverse.constraint.left", this.left),
      this.field("reverse.constraint.orderOp", this.op),
      this.field("reverse.constraint.right", this.right),
    );
  }

  renderDifference(preset) {
    this.left = this.variableSelect(preset?.left || "");
    this.right = this.variableSelect(preset?.right || "");
    this.differenceMode = document.createElement("select");
    this.differenceMode.append(
      option("exact", this.services.rt("reverse.constraint.differenceExact")),
      option("range", this.services.rt("reverse.constraint.differenceRange")),
    );
    this.differenceMode.value = preset?.differenceMode || "exact";
    this.body.append(
      this.field("reverse.constraint.left", this.left),
      this.field("reverse.constraint.right", this.right),
      this.field("reverse.constraint.differenceMode", this.differenceMode),
    );
    this.differenceBody = node("div", "reverse-difference-body");
    this.body.append(this.differenceBody);
    const updateDifference = () => {
      this.differenceBody.replaceChildren();
      if (this.differenceMode.value === "exact") {
        this.equals = integerTextInput();
        this.equals.value = preset?.equals ?? "";
        this.differenceBody.append(this.field("reverse.constraint.equals", this.equals));
      } else {
        this.min = integerTextInput({ required: false });
        this.max = integerTextInput({ required: false });
        this.min.value = preset?.min ?? "";
        this.max.value = preset?.max ?? "";
        this.differenceBody.append(
          this.field("reverse.constraint.min", this.min),
          this.field("reverse.constraint.max", this.max),
        );
      }
    };
    this.differenceMode.addEventListener("change", () => {
      preset = null;
      updateDifference();
    });
    updateDifference();
  }

  refreshVariableChoices() {
    const controls = [this.target, this.calculationVariable, this.left, this.right].filter(Boolean);
    for (const select of controls) {
      const selected = select.value;
      this.owner.populateVariableSelect(select, selected);
    }
  }

  read() {
    if (this.type.value === "pastafari") {
      const source = { type: "pastafari", target: this.target.value, date: this.pastafariEditor.read() };
      if (this.calculationMode.value === "variable") source.calculation = this.calculationVariable.value;
      else if (this.calculationMode.value === "same") source.calculation = "same-as-target";
      else source.calculationJdn = this.absoluteEditor.read();
      return source;
    }
    if (this.type.value === "equal") return { type: "equal", left: this.left.value, right: this.right.value };
    if (this.type.value === "order") return { type: "order", left: this.left.value, op: this.op.value, right: this.right.value };
    const source = { type: "difference", left: this.left.value, right: this.right.value };
    if (this.differenceMode.value === "exact") source.equals = this.equals.value;
    else {
      source.min = this.min.value;
      source.max = this.max.value;
    }
    return source;
  }

  refreshLocale() {
    this.removeButton.textContent = this.services.rt("reverse.action.remove");
    this.typeText.textContent = this.services.rt("reverse.constraint.type");
    for (const element of this.root.querySelectorAll("[data-reverse-key]")) {
      element.textContent = this.services.rt(element.dataset.reverseKey);
    }
    const type = this.type.value;
    this.populateTypeOptions(type);
    if (this.calculationMode) {
      const selected = this.calculationMode.value;
      this.calculationMode.replaceChildren(
        option("variable", this.services.rt("reverse.constraint.calculation.variable")),
        option("absolute", this.services.rt("reverse.constraint.calculation.absolute")),
        option("same", this.services.rt("reverse.constraint.calculation.same")),
      );
      this.calculationMode.value = selected;
    }
    if (this.differenceMode) {
      const selected = this.differenceMode.value;
      this.differenceMode.replaceChildren(
        option("exact", this.services.rt("reverse.constraint.differenceExact")),
        option("range", this.services.rt("reverse.constraint.differenceRange")),
      );
      this.differenceMode.value = selected;
    }
    this.absoluteEditor?.refreshLocale();
    this.pastafariEditor?.refreshLocale();
    this.refreshVariableChoices();
  }

  safeSnapshot() {
    try {
      const source = { type: this.type.value };
      if (this.type.value === "pastafari") {
        source.target = this.target?.value;
        source.calculationMode = this.calculationMode?.value;
        source.calculation = this.calculationVariable?.value;
        source.calculationJdn = this.absoluteEditor ? this.absoluteEditor.read() : undefined;
        source.date = this.pastafariEditor?.snapshot();
      } else if (this.type.value === "equal") {
        source.left = this.left?.value; source.right = this.right?.value;
      } else if (this.type.value === "order") {
        source.left = this.left?.value; source.right = this.right?.value; source.op = this.op?.value;
      } else {
        source.left = this.left?.value; source.right = this.right?.value;
        source.differenceMode = this.differenceMode?.value;
        if (source.differenceMode === "exact") source.equals = this.equals?.value;
        else { source.min = this.min?.value; source.max = this.max?.value; }
      }
      return source;
    } catch {
      return { type: this.type.value };
    }
  }
}

class ReverseSearchUi {
  constructor(root, services) {
    this.root = root;
    this.services = {
      ...services,
      rt: (key, values = {}) => translate(services.getLocale(), key, values),
    };
    this.controller = new ReverseSearchController();
    this.variableSequence = 0;
    this.constraintSequence = 0;
    this.variables = [];
    this.constraints = [];
    this.lastRun = null;
    this.visibleErrorMessage = null;
    this.build();
  }

  rt(key, values = {}) { return this.services.rt(key, values); }

  keyed(tag, className, key) {
    const element = node(tag, className, this.rt(key));
    element.dataset.reverseKey = key;
    return element;
  }

  build() {
    this.root.replaceChildren();
    const heading = node("div", "section-heading");
    const headingTitle = this.keyed("h2", "", "reverse.heading");
    headingTitle.id = "reverse-heading";
    heading.append(
      this.keyed("p", "status-kicker", "reverse.kicker"),
      headingTitle,
      this.keyed("p", "", "reverse.intro"),
    );
    this.tabs = node("div", "reverse-mode-tabs");
    this.basicTab = node("button", "reverse-mode-tab", this.rt("reverse.mode.basic"));
    this.basicTab.id = "reverse-basic-tab";
    this.advancedTab = node("button", "reverse-mode-tab", this.rt("reverse.mode.advanced"));
    this.advancedTab.id = "reverse-advanced-tab";
    this.basicTab.type = this.advancedTab.type = "button";
    this.tabs.append(this.basicTab, this.advancedTab);
    this.basicPanel = node("div", "reverse-mode-panel");
    this.advancedPanel = node("div", "reverse-mode-panel");
    this.root.append(heading, this.tabs, this.basicPanel, this.advancedPanel);
    this.buildBasic();
    this.buildAdvanced();
    this.buildOutput();
    this.showMode("basic");
    this.basicTab.addEventListener("click", () => this.showMode("basic"));
    this.advancedTab.addEventListener("click", () => this.showMode("advanced"));
  }

  buildBasic() {
    this.basicPanel.append(this.keyed("h3", "", "reverse.basic.heading"));
    const dateBlock = node("div", "reverse-block");
    dateBlock.append(this.keyed("h4", "", "reverse.basic.dateHeading"));
    this.basicPastafari = new PastafariEditor(dateBlock, this.services);
    this.basicPastafari.root.dataset.reverseEditor = "basic-pastafari";
    const calculationBlock = node("div", "reverse-block");
    calculationBlock.append(this.keyed("h4", "", "reverse.basic.calculationHeading"));
    const modeLabel = node("label", "date-field");
    modeLabel.append(this.keyed("span", "", "reverse.basic.calculationMode"));
    this.basicCalculationMode = document.createElement("select");
    this.basicCalculationMode.id = "reverse-basic-calculation-mode";
    modeLabel.append(this.basicCalculationMode);
    calculationBlock.append(modeLabel);
    this.basicCalculationBody = node("div", "reverse-calculation-body");
    calculationBlock.append(this.basicCalculationBody);
    this.basicPanel.append(dateBlock, calculationBlock);
    this.populateBasicCalculationModes("active");
    this.renderBasicCalculationMode();
    this.basicCalculationMode.addEventListener("change", () => this.renderBasicCalculationMode());
    this.basicLimits = this.buildLimits(this.basicPanel);
    const actions = node("div", "form-actions reverse-actions");
    this.basicSolve = node("button", "search-submit", this.rt("reverse.action.solve"));
    this.basicSolve.id = "reverse-basic-solve";
    this.basicSolve.type = "button";
    this.basicCancel = node("button", "secondary-action", this.rt("reverse.action.cancel"));
    this.basicCancel.type = "button";
    this.basicCancel.hidden = true;
    actions.append(this.basicSolve, this.basicCancel);
    this.basicPanel.append(actions);
    this.basicSolve.addEventListener("click", () => void this.solveBasic());
    this.basicCancel.addEventListener("click", () => this.cancel());
  }

  populateBasicCalculationModes(selected = this.basicCalculationMode.value || "active") {
    this.basicCalculationMode.replaceChildren(
      option("active", this.rt("reverse.basic.calculation.active")),
      option("absolute", this.rt("reverse.basic.calculation.absolute")),
      option("same", this.rt("reverse.basic.calculation.same")),
      option("pastafari", this.rt("reverse.basic.calculation.pastafari")),
    );
    this.basicCalculationMode.value = selected;
  }

  renderBasicCalculationMode() {
    this.basicCalculationBody.replaceChildren();
    this.basicAbsoluteEditor = null;
    this.basicRangeStart = null;
    this.basicRangeEnd = null;
    this.basicAdvancedButton = null;
    const mode = this.basicCalculationMode.value;
    if (mode === "active") {
      this.basicActiveValue = node("p", "field-help", this.rt("reverse.basic.activeValue", {
        date: this.services.formatJdn(this.services.getActiveCalculationJdn()),
      }));
      this.basicCalculationBody.append(this.basicActiveValue);
    } else if (mode === "absolute") {
      this.basicAbsoluteEditor = new AbsoluteDateEditor(this.basicCalculationBody, this.services, {
        initialJdn: this.services.getActiveCalculationJdn(),
      });
    } else if (mode === "same") {
      const grid = node("div", "reverse-range-grid");
      const start = node("div", "reverse-range-part");
      start.append(this.keyed("h5", "", "reverse.basic.rangeStart"));
      const end = node("div", "reverse-range-part");
      end.append(this.keyed("h5", "", "reverse.basic.rangeEnd"));
      grid.append(start, end);
      this.basicCalculationBody.append(grid);
      this.basicRangeStart = new AbsoluteDateEditor(start, this.services, { initialJdn: this.services.getActiveCalculationJdn() });
      this.basicRangeEnd = new AbsoluteDateEditor(end, this.services, { initialJdn: this.services.getActiveCalculationJdn() });
    } else {
      this.basicCalculationBody.append(
        this.keyed("p", "field-help", "reverse.basic.toAdvancedHelp"),
      );
      this.basicAdvancedButton = node("button", "secondary-action", this.rt("reverse.basic.toAdvanced"));
      this.basicAdvancedButton.type = "button";
      this.basicCalculationBody.append(this.basicAdvancedButton);
      this.basicAdvancedButton.addEventListener("click", () => this.prefillRecursiveFromBasic());
    }
  }

  buildAdvanced() {
    this.advancedPanel.append(
      this.keyed("h3", "", "reverse.advanced.heading"),
      this.keyed("p", "field-help", "reverse.advanced.intro"),
    );
    const variablesSection = node("section", "reverse-builder-section");
    variablesSection.append(this.keyed("h4", "", "reverse.variables.heading"));
    this.variablesHost = node("div", "reverse-builder-list");
    this.addVariableButton = node("button", "secondary-action", this.rt("reverse.action.addVariable"));
    this.addVariableButton.id = "reverse-add-variable";
    this.addVariableButton.type = "button";
    variablesSection.append(this.variablesHost, this.addVariableButton);
    const constraintsSection = node("section", "reverse-builder-section");
    constraintsSection.append(this.keyed("h4", "", "reverse.constraint.heading"));
    this.constraintsHost = node("div", "reverse-builder-list");
    this.addConstraintButton = node("button", "secondary-action", this.rt("reverse.action.addConstraint"));
    this.addConstraintButton.id = "reverse-add-constraint";
    this.addConstraintButton.type = "button";
    constraintsSection.append(this.constraintsHost, this.addConstraintButton);
    this.advancedPanel.append(variablesSection, constraintsSection);
    this.advancedLimits = this.buildLimits(this.advancedPanel);
    const actions = node("div", "form-actions reverse-actions");
    this.advancedSolve = node("button", "search-submit", this.rt("reverse.action.solve"));
    this.advancedSolve.id = "reverse-advanced-solve";
    this.advancedSolve.type = "button";
    this.advancedCancel = node("button", "secondary-action", this.rt("reverse.action.cancel"));
    this.advancedCancel.type = "button";
    this.advancedCancel.hidden = true;
    actions.append(this.advancedSolve, this.advancedCancel);
    this.advancedPanel.append(actions);
    this.addVariableButton.addEventListener("click", () => this.addVariable());
    this.addConstraintButton.addEventListener("click", () => this.addConstraint());
    this.advancedSolve.addEventListener("click", () => void this.solveAdvanced());
    this.advancedCancel.addEventListener("click", () => this.cancel());
    this.addVariable();
    this.addVariable();
    this.addConstraint();
  }

  buildLimits(host) {
    const details = node("details", "reverse-limits");
    const summary = node("summary", "", this.rt("reverse.options.heading"));
    const intro = node("p", "field-help", this.rt("reverse.options.intro"));
    const grid = node("div", "reverse-limit-grid");
    const make = (key) => {
      const label = node("label", "date-field");
      const span = node("span", "", this.rt(key));
      span.dataset.reverseKey = key;
      const input = key === "reverse.options.maxScanned"
        ? integerTextInput({ required: false })
        : document.createElement("input");
      if (key !== "reverse.options.maxScanned") {
        input.type = "number";
        input.min = "1";
        input.step = "1";
        input.inputMode = "numeric";
      }
      label.append(span, input);
      grid.append(label);
      return input;
    };
    const limits = {
      details,
      maxSolutions: make("reverse.options.maxSolutions"),
      maxScanned: make("reverse.options.maxScanned"),
      timeoutMs: make("reverse.options.timeout"),
    };
    summary.dataset.reverseKey = "reverse.options.heading";
    intro.dataset.reverseKey = "reverse.options.intro";
    details.append(summary, intro, grid);
    host.append(details);
    return limits;
  }

  buildOutput() {
    this.output = node("section", "reverse-output");
    this.output.hidden = true;
    this.status = node("div", "reverse-status");
    this.status.id = "reverse-status";
    this.progress = node("p", "reverse-progress");
    this.progress.id = "reverse-progress";
    this.error = node("p", "form-error");
    this.error.hidden = true;
    const header = node("div", "reverse-output-heading");
    header.append(this.keyed("h3", "", "reverse.result.heading"));
    this.clearButton = node("button", "secondary-action", this.rt("reverse.action.clear"));
    this.clearButton.type = "button";
    header.append(this.clearButton);
    this.solutions = node("div", "reverse-solutions");
    this.solutions.id = "reverse-solutions";
    this.output.append(header, this.status, this.progress, this.error, this.solutions);
    this.root.append(this.output);
    this.clearButton.addEventListener("click", () => this.clearResults());
  }

  parseLimits(limits) {
    const result = {};
    const maxSolutions = positiveLimit(limits.maxSolutions.value, "maxSolutions", { number: true });
    const maxScanned = positiveLimit(limits.maxScanned.value, "maxScanned");
    const timeoutMs = positiveLimit(limits.timeoutMs.value, "timeoutMs", { number: true });
    if (maxSolutions !== null) result.maxSolutions = maxSolutions;
    if (maxScanned !== null) result.maxScanned = maxScanned;
    if (timeoutMs !== null) result.timeoutMs = timeoutMs;
    return result;
  }

  async solveBasic() {
    if (this.basicCalculationMode.value === "pastafari") {
      this.prefillRecursiveFromBasic();
      return;
    }
    try {
      const date = this.basicPastafari.read();
      const mode = this.basicCalculationMode.value;
      let problem;
      let calculationFor = null;
      let dependsOnActive = false;
      if (mode === "active") {
        const calculationJdn = this.services.getActiveCalculationJdn();
        problem = simpleReverseProblem(date, calculationJdn);
        calculationFor = () => calculationJdn;
        dependsOnActive = true;
      } else if (mode === "absolute") {
        const calculationJdn = this.basicAbsoluteEditor.read();
        problem = simpleReverseProblem(date, calculationJdn);
        calculationFor = () => calculationJdn;
      } else {
        const start = this.basicRangeStart.read();
        const end = this.basicRangeEnd.read();
        if (end < start) throw new RangeError(this.rt("reverse.error.range"));
        problem = sameTargetReverseProblem(date, [start, end]);
        calculationFor = (solution) => solution.target.jdn;
      }
      await this.run(problem, this.parseLimits(this.basicLimits), {
        kind: "basic",
        calculationFor,
        dependsOnActive,
      });
    } catch (error) {
      this.showInputError(error);
    }
  }

  prefillRecursiveFromBasic() {
    let date;
    try { date = this.basicPastafari.read(); }
    catch (error) { this.showInputError(error); return; }
    this.showMode("advanced");
    while (this.variables.length < 2) this.addVariable();
    this.variables[0].label.value = this.rt("reverse.result.target");
    this.variables[1].label.value = this.rt("reverse.result.calculation");
    this.constraints.forEach((constraint) => constraint.root.remove());
    this.constraints = [];
    this.addConstraint({ type: "pastafari", target: this.variables[0].id, calculationMode: "variable", calculation: this.variables[1].id, date });
    this.addConstraint({ type: "pastafari", target: this.variables[1].id, calculationMode: "absolute", calculationJdn: this.services.getActiveCalculationJdn(), date: {} });
    this.advancedPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  addVariable() {
    const card = new VariableCard(this, `D${++this.variableSequence}`, this.variableSequence);
    this.variables.push(card);
    this.refreshConstraintVariableChoices();
    return card;
  }

  removeVariable(card) {
    if (this.variables.length <= 1) return;
    this.variables = this.variables.filter((entry) => entry !== card);
    card.root.remove();
    this.refreshConstraintVariableChoices();
  }

  addConstraint(preset = null) {
    const card = new ConstraintCard(this, `C${++this.constraintSequence}`, preset);
    this.constraints.push(card);
    return card;
  }

  removeConstraint(card) {
    this.constraints = this.constraints.filter((entry) => entry !== card);
    card.root.remove();
  }

  populateVariableSelect(select, selected = "") {
    const entries = this.variables.map((card) => ({ id: card.id, label: card.label.value.trim() || card.id }));
    select.replaceChildren(...entries.map((entry) => option(entry.id, `${entry.label} (${entry.id})`)));
    if (entries.some(({ id }) => id === selected)) select.value = selected;
  }

  refreshConstraintVariableChoices() {
    for (const constraint of this.constraints) constraint.refreshVariableChoices();
  }

  async solveAdvanced() {
    try {
      const variableEntries = this.variables.map((card) => card.read());
      const variables = Object.fromEntries(variableEntries.map(({ id, spec }) => [id, spec]));
      const constraints = this.constraints.map((card) => card.read());
      const problem = advancedReverseProblem({ variables, constraints });
      const labels = Object.fromEntries(variableEntries.map(({ id, label }) => [id, label]));
      await this.run(problem, this.parseLimits(this.advancedLimits), {
        kind: "advanced",
        labels,
        sourceConstraints: constraints,
      });
    } catch (error) {
      this.showInputError(error);
    }
  }

  async run(problem, options, context) {
    this.output.hidden = false;
    this.error.hidden = true;
    this.visibleErrorMessage = null;
    this.solutions.replaceChildren();
    this.status.textContent = this.rt("reverse.status.running");
    this.progress.textContent = "";
    this.setRunning(true);
    try {
      const { result } = await this.controller.solve(problem, {
        ...options,
        onProgress: (value) => this.renderProgress(value),
      });
      this.lastRun = { problem, result, context };
      this.renderResult(result, context);
    } catch (error) {
      this.handleSearchError(error);
    } finally {
      this.setRunning(false);
    }
  }

  renderProgress(value) {
    const phaseKey = value.phase === "verify" ? "reverse.progress.verify" : value.phase === "done" ? "reverse.progress.done" : "reverse.progress.reverse";
    this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
  }

  renderResult(result, context) {
    const classification = classifyConstraintResult(result);
    const key = classification.state === "complete-empty"
      ? "reverse.status.completeEmpty"
      : classification.state === "complete-solutions"
        ? "reverse.status.completeSolutions"
        : classification.state === "partial-empty"
          ? "reverse.status.partialEmpty"
          : "reverse.status.partialSolutions";
    this.status.textContent = this.rt(key, { count: this.services.formatInteger(classification.solutionCount) });
    this.status.dataset.complete = String(classification.complete);
    this.solutions.replaceChildren();
    result.solutions.forEach((solution, index) => {
      this.solutions.append(context.kind === "basic"
        ? this.renderBasicSolution(solution, index, context)
        : this.renderAdvancedSolution(solution, index, context));
    });
  }

  renderBasicSolution(solution, index, context) {
    const card = node("article", "reverse-solution-card");
    card.dataset.solutionIndex = String(index);
    card.append(node("h4", "", this.rt("reverse.result.solution", { index: index + 1 })));
    const targetJdn = solution.target.jdn;
    const calculationJdn = context.calculationFor(solution);
    const facts = node("dl", "reverse-solution-facts");
    this.appendFact(facts, this.rt("reverse.result.target"), targetJdn);
    this.appendFact(facts, this.rt("reverse.result.calculation"), calculationJdn);
    const open = node("button", "primary-action", this.rt("reverse.action.open"));
    open.type = "button";
    open.addEventListener("click", () => this.services.openPair(targetJdn, calculationJdn));
    card.append(facts, open);
    return card;
  }

  appendFact(dl, label, jdn) {
    const wrap = node("div", "reverse-solution-fact");
    const dt = node("dt", "", label);
    const dd = node("dd");
    dd.append(
      node("strong", "", this.services.formatJdn(jdn)),
      node("small", "", this.rt("reverse.result.jdn", { jdn: jdn.toString() })),
    );
    wrap.append(dt, dd);
    dl.append(wrap);
  }

  renderAdvancedSolution(solution, index, context) {
    const card = node("article", "reverse-solution-card reverse-advanced-solution");
    card.dataset.solutionIndex = String(index);
    card.append(node("h4", "", this.rt("reverse.result.solution", { index: index + 1 })));
    const facts = node("dl", "reverse-solution-facts");
    for (const [id, value] of Object.entries(solution)) this.appendFact(facts, context.labels[id] || id, value.jdn);
    card.append(facts);
    const relations = node("div", "reverse-solution-relations");
    for (const source of context.sourceConstraints.filter(({ type }) => type === "pastafari")) {
      const targetJdn = solution[source.target]?.jdn;
      const calculationJdn = source.calculationJdn !== undefined
        ? BigInt(source.calculationJdn)
        : source.calculation === "same-as-target"
          ? targetJdn
          : solution[source.calculation]?.jdn;
      if (targetJdn === undefined || calculationJdn === undefined) continue;
      const row = node("div", "reverse-relation-row");
      const text = node("span", "", `${context.labels[source.target] || source.target}: ${this.services.formatJdn(targetJdn)} · ${this.rt("reverse.result.calculation")}: ${this.services.formatJdn(calculationJdn)}`);
      const open = node("button", "secondary-action", this.rt("reverse.action.open"));
      open.type = "button";
      open.addEventListener("click", () => this.services.openPair(targetJdn, calculationJdn));
      row.append(text, open);
      relations.append(row);
    }
    if (relations.childElementCount) card.append(relations);
    return card;
  }

  renderVisibleErrorMessage() {
    if (!this.visibleErrorMessage || this.error.hidden) return;
    this.error.textContent = this.rt(this.visibleErrorMessage.key, this.visibleErrorMessage.values);
  }

  showInputError(error) {
    console.error(error);
    this.output.hidden = false;
    this.error.hidden = false;
    this.visibleErrorMessage = {
      key: error?.translationKey || "reverse.error.input",
      values: error?.translationValues || {},
    };
    this.renderVisibleErrorMessage();
    this.status.textContent = "";
  }

  handleSearchError(error) {
    console.error(error);
    this.output.hidden = false;
    this.error.hidden = false;
    const key = error?.code === "ERR_CONSTRAINT_RANGE_REQUIRED" || error?.code === "ERR_SELF_RANGE_REQUIRED"
      ? "reverse.status.rangeRequired"
      : error?.code === "ERR_REVERSE_TIMEOUT"
        ? "reverse.status.timeout"
        : error?.code === "ERR_REVERSE_SUPERSEDED"
          ? "reverse.status.superseded"
          : error?.name === "AbortError" || error?.code === "ERR_REVERSE_ABORTED"
            ? "reverse.status.cancelled"
            : "reverse.status.failed";
    this.visibleErrorMessage = { key, values: {} };
    this.renderVisibleErrorMessage();
  }

  cancel() {
    if (this.controller.cancel()) {
      this.status.textContent = this.rt("reverse.status.cancelled");
      this.setRunning(false);
    }
  }

  clearResults() {
    this.lastRun = null;
    this.output.hidden = true;
    this.status.textContent = "";
    this.progress.textContent = "";
    this.error.hidden = true;
    this.visibleErrorMessage = null;
    this.solutions.replaceChildren();
  }

  setRunning(running) {
    this.basicSolve.disabled = running;
    this.advancedSolve.disabled = running;
    this.basicCancel.hidden = !running;
    this.advancedCancel.hidden = !running;
    this.root.setAttribute("aria-busy", String(running));
  }

  showMode(mode) {
    const basic = mode === "basic";
    this.basicPanel.hidden = !basic;
    this.advancedPanel.hidden = basic;
    this.basicTab.dataset.active = String(basic);
    this.advancedTab.dataset.active = String(!basic);
    this.basicTab.setAttribute("aria-pressed", String(basic));
    this.advancedTab.setAttribute("aria-pressed", String(!basic));
  }

  notifyActiveCalculationChanged({ markStale = true } = {}) {
    if (this.basicCalculationMode.value === "active" && this.basicActiveValue) {
      this.basicActiveValue.textContent = this.rt("reverse.basic.activeValue", {
        date: this.services.formatJdn(this.services.getActiveCalculationJdn()),
      });
    }
    if (markStale && this.lastRun?.context?.dependsOnActive) {
      this.status.textContent = this.rt("reverse.status.stale");
      this.status.dataset.stale = "true";
    }
  }

  refreshLocale() {
    for (const element of this.root.querySelectorAll("[data-reverse-key]")) {
      element.textContent = this.rt(element.dataset.reverseKey);
    }
    const mode = this.basicCalculationMode.value;
    this.populateBasicCalculationModes(mode);
    this.basicPastafari.refreshLocale();
    this.basicAbsoluteEditor?.refreshLocale();
    this.basicRangeStart?.refreshLocale();
    this.basicRangeEnd?.refreshLocale();
    this.addVariableButton.textContent = this.rt("reverse.action.addVariable");
    this.addConstraintButton.textContent = this.rt("reverse.action.addConstraint");
    this.basicSolve.textContent = this.advancedSolve.textContent = this.rt("reverse.action.solve");
    this.basicCancel.textContent = this.advancedCancel.textContent = this.rt("reverse.action.cancel");
    this.clearButton.textContent = this.rt("reverse.action.clear");
    for (const variable of this.variables) variable.refreshLocale();
    for (const constraint of this.constraints) constraint.refreshLocale();
    this.refreshConstraintVariableChoices();
    if (this.lastRun) this.renderResult(this.lastRun.result, this.lastRun.context);
    this.notifyActiveCalculationChanged({ markStale: false });
    this.renderVisibleErrorMessage();
  }

  dispose() { this.controller.dispose(); }
}

export function createReverseSearchUi(root, services) {
  if (!(root instanceof Element)) throw new TypeError("Reverse-search root element is required.");
  return new ReverseSearchUi(root, services);
}
