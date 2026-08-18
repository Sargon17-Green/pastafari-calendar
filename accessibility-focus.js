"use strict";

// The locale selector is temporarily disabled while a lazy locale module loads.
// Native browsers move focus away from a control when it becomes disabled. Keep
// the user's keyboard context by restoring focus only when the selector itself
// initiated the change and only after it has been enabled again.
const languageSelector = document.querySelector("#language-selector");

if (languageSelector) {
  languageSelector.addEventListener("change", () => {
    if (document.activeElement !== languageSelector) return;

    let sawDisabledState = languageSelector.disabled;
    const observer = new MutationObserver((records) => {
      if (records.some((record) => record.attributeName === "disabled" && record.oldValue === null)) {
        sawDisabledState = true;
      }
      if (!sawDisabledState || languageSelector.disabled) return;
      observer.disconnect();
      languageSelector.focus({ preventScroll: true });
    });

    observer.observe(languageSelector, {
      attributes: true,
      attributeFilter: ["disabled"],
      attributeOldValue: true,
    });

    // The application disables the selector synchronously in its change handler.
    // This covers the case where a future implementation changes that detail or
    // enables it again before MutationObserver delivery.
    queueMicrotask(() => {
      sawDisabledState ||= languageSelector.disabled;
      if (sawDisabledState && !languageSelector.disabled) {
        observer.disconnect();
        languageSelector.focus({ preventScroll: true });
      } else if (!sawDisabledState) {
        observer.disconnect();
      }
    });
  }, { capture: true });
}
