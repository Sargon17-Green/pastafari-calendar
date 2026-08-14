Second multilingual layout remediation.

Replace:
  docs\styles.css
  docs\sw.js

Then run:
  node scripts\run-i18n-browser-audit.mjs

Expected fixes:
- long localized h1 titles wrap instead of widening the document;
- long localized section headings wrap on mobile;
- compact-form date fields cannot shrink below 8rem;
- form action buttons may wrap when their localized labels are long.

Do not update SHA256SUMS files until the full 90-locale audit is clean.
