# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `70b68ad6-107f-4ffc-9078-304953becc43`  
> - **Started:** 9/26/2026, 5:18:19 PM  
> - **Duration:** 2m 26s  
> - **Exported:** 9/26/2026, 5:20:45 PM  

---

<sub>1s</sub>

### User

Þú ert sjálfstæður málfars- og notendaviðmótsrýnir fyrir íslensku útgáfu Pastafari-dagatalsins.

ÖLL samskipti þín í þessari lotu eiga að vera á íslensku. Ekki svara á ensku, nema þegar þú vitnar nákvæmlega í enskan texta sem þú fannst sem villu eða nefnir bókstafleg tækniauðkenni sem ekki má þýða.

Verkefnið er eingöngu rýni. Þú mátt EKKI breyta, búa til eða eyða skrám. Notaðu aðeins lesaðgerðir í skel til að skoða geymsluna.

Rýndu ALLA vefupplifunina þegar tungumálið er íslenska, ekki aðeins /about/. Skoðaðu að minnsta kosti:
- docs/i18n/locales/is.js í heild;
- docs/about/content/is.html í heild;
- docs/index.html og docs/about/index.html;
- docs/manifest.webmanifest;
- texta- og aðgengisflæði sem tengjast docs/app.js, docs/reverse-ui.js, docs/i18n/registry.js, docs/i18n/runtime.js og docs/about/about.js eftir þörfum;
- aðalviðmót, dagsetningarleit, aðgerðardag, samanburð, ársyfirlit, öfuga leit, villur og stöður, leiðbeiningar, fót, lýsigögn, manifest, ARIA/a11y, fallback og tungumálaskipti.

Leitaðu virkt að:
1. texta á röngu tungumáli eða óviljandi ensku fallbacki;
2. þýðingarmáli, óeðlilegum setningum, röngum beygingum, málfræði, setningagerð, stíl, skráningu, stafsetningu og greinarmerkjum;
3. ósamræmi í hugtökum milli /about/ og aðalviðmótsins;
4. texta sem er skiljanlegur en ekki eðlileg íslenska;
5. röngum eða vafasömum þýðingum tæknilegra hugtaka;
6. placeholders sem virðast í röngum málfræðilegum eða merkingarlegum hlutverkum;
7. metadata, title, ARIA, manifest, fallback og accessibility-texta sem er rangur eða óeðlilegur;
8. líklegum vandamálum með línuskipti, mjög langan texta eða UI-pláss vegna íslensku orðalags. Þetta er textaleg áhættugreining, ekki fullkomin sjónræn render-prófun.

Virðing fyrir kanónískum föstum gildum er skylda. Ekki leggja til að breyta formúlum, hash-gildum, code-literals, API-auðkennum eða kanónískum heitum eingöngu til að þýða þau.

Fyrsta línan í svarinu VERÐUR að vera nákvæmlega annaðhvort:
NATIVE_QA_RESULT: PASS
eða
NATIVE_QA_RESULT: FAIL

Að þeirri einu véllesanlegu línu undanskilinni skaltu skila EINUNGIS íslensku Markdown-skýrslu með:
- heildarniðurstöðu: PASS eða FAIL fyrir strangt íslenskt málfars-QA;
- öllum findings, hverju með alvarleika (critical/high/medium/low), nákvæmri skrá og eins nákvæmri staðsetningu og hægt er, núverandi texta og ráðlagðri leiðréttingu;
- sérstökum kafla um texta úr öðru tungumáli/fallback;
- sérstökum kafla um samræmi /about/ við UI;
- sérstökum kafla um metadata/ARIA/manifest/fallback;
- sérstökum kafla um líklega textatengda UI/wrapping-áhættu;
- ef engin villa finnst, segðu það skýrt og útskýrðu hvaða yfirborð voru skoðuð.

Ekki lýsa þessari lotu sem sjónrænni render-prófun. Hún er strangt, sjálfstætt, íslenskt whole-site linguistic QA.


---

<sub>4s</sub>

### `glob`

**docs/**/***

"docs/**/*"

<details>
<summary>197 matches</summary>

```
[glob: 189 path(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs; grouped by directory]

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/ (75 path(s))
  about.js
  content/af.html
  content/ar.html
  content/az.html
  content/be.html
  content/bg.html
  content/bn.html
  content/bs.html
  content/ca.html
  content/cs.html
  content/da.html
  content/de.html
  content/el.html
  content/en.html
  content/eo.html
  content/es.html
  content/et.html
  content/fa.html
  content/fi.html
  content/fil.html
  content/fo.html
  content/fr.html
  content/fy.html
  content/gl.html
  content/gu.html
  content/ha.html
  content/he.html
  content/hi.html
  content/hr.html
  content/ht.html
  content/hu.html
  content/hy.html
  content/id.html
  content/is.html
  content/it.html
  content/ja.html
  content/jv.html
  content/ka.html
  content/kk.html
  content/ko.html
  content/lb.html
  content/lt.html
  content/lv.html
  content/mk.html
  content/mr.html
  content/ms.html
  content/nb.html
  content/ne.html
  content/nl.html
  content/nn.html
  content/pa.html
  content/pl.html
  content/pt.html
  content/registry.js
  content/ro.html
  content/ru.html
  content/sk.html
  content/sl.html
  content/so.html
  content/sq.html
  content/sr.html
  content/sv.html
  content/sw.html
  content/ta.html
  content/te.html
  content/th.html
  content/tr.html
  content/uk.html
  content/ur.html
  content/uz.html
  content/vi.html
  content/yo.html
  content/zh.html
  content/zu.html
  index.html

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/ (75 path(s))
  calendar-identifiers.js
  locales/af.js
  locales/ar.js
  locales/az.js
  locales/be.js
  locales/bg.js
  locales/bn.js
  locales/bs.js
  locales/ca.js
  locales/cs.js
  locales/da.js
  locales/de.js
  locales/el.js
  locales/en.js
  locales/eo.js
  locales/es.js
  locales/et.js
  locales/fa.js
  locales/fi.js
  locales/fil.js
  locales/fo.js
  locales/fr.js
  locales/fy.js
  locales/gl.js
  locales/gu.js
  locales/ha.js
  locales/he.js
  locales/hi.js
  locales/hr.js
  locales/ht.js
  locales/hu.js
  locales/hy.js
  locales/id.js
  locales/is.js
  locales/it.js
  locales/ja.js
  locales/jv.js
  locales/ka.js
  locales/kk.js
  locales/ko.js
  locales/lb.js
  locales/lt.js
  locales/lv.js
  locales/mk.js
  locales/mr.js
  locales/ms.js
  locales/nb.js
  locales/ne.js
  locales/nl.js
  locales/nn.js
  locales/pa.js
  locales/pl.js
  locales/pt.js
  locales/ro.js
  locales/ru.js
  locales/sk.js
  locales/sl.js
  locales/so.js
  locales/sq.js
  locales/sr.js
  locales/sv.js
  locales/sw.js
  locales/ta.js
  locales/te.js
  locales/th.js
  locales/tr.js
  locales/uk.js
  locales/ur.js
  locales/uz.js
  locales/vi.js
  locales/yo.js
  locales/zh.js
  locales/zu.js
  registry.js
  runtime.js

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/ (29 path(s))
  ACCESSIBILITY-TESTING.md
  ASTRONOMICAL-DAY.md
  AUTHORITATIVE-ENGINE-ARCHITECTURE.md
  DIAGNOSTICS.md
  DOCUMENTATION-CONSISTENCY.md
  EXTREME-PERFORMANCE-ANALYSIS.md
  FAST-ENGINE-SOAK-VALIDATION-2026-08-15.md
  I18N-SUPPORT-LEVELS.md
  I18N.md
  INTL-ICU-SEMANTIC-BOUNDARY.md
  LICENSE
  MEMORY-TESTING.md
  README.md
  REVERSE-CONSTRAINTS.md
  SHA256SUMS.txt
  SUPPLY-CHAIN-SECURITY.md
  UPLOAD-TO-GITHUB.md
  app.js
  calendar-converters.js
  calendar-input-conventions.js
  chinese-calendrica-detour.js
  index.html
  manifest.webmanifest
  observer-location.js
  reverse-search-controller.js
  reverse-ui.js
  styles.css
  sw.js
  venus-day-boundary.js

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/engine/ (6 path(s))
  pastafari-calendar-fast.js
  pastafari-constraints-client.js
  pastafari-constraints.js
  pastafari-diagnostics.js
  pastafari-fast-worker.js
  pastafari-reverse-worker.js

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/icons/ (3 path(s))
  icon-192.png
  icon-512.png
  icon.svg

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/authority/ (1 path(s))
  ORACLE-AUTHORITY.md

[extensions: .js=92, .html=74, .md=16, .png=2, [no extension]=1, .webmanifest=1, .css=1, .txt=1]
```

</details>


---

<sub>4s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

```
File too large to read at once (22.7 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>4s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

```
File too large to read at once (33.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>4s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#672013">
    <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
    <meta name="color-scheme" content="light">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
    <title data-i18n="app.title">Pastafari Calendar</title>
    <link rel="manifest" href="./manifest.webmanifest?v=9-canonical-names">
    <link rel="icon" href="./icons/icon.svg?v=9-canonical-names" type="image/svg+xml">
    <link rel="apple-touch-icon" href="./icons/icon-192.png">
    <link rel="stylesheet" href="./styles.css?v=16-about-polish">
    <script type="module" src="./app.js?v=24-about-i18n"></script>
  </head>
  <body>
    <a class="skip-link" href="#search-heading" data-i18n="nav.skip">Skip to date search</a>
    <div class="app-shell">
      <header class="masthead">
        <div class="masthead-copy">
          <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
          <h1 data-i18n="app.title">Pastafari Calendar</h1>
          <p class="intro" data-i18n="app.intro">Find a day in any available calendar, then see its complete Pastafari date.</p>
          <a class="guide-link" href="./about/" data-about-link data-i18n="about.open">About the calendar</a>
        </div>
        <div class="language-control">
          <label for="language-selector" data-i18n="language.label">Language</label>
          <select id="language-selector" autocomplete="off"></select>
        </div>
      </header>

      <a class="floating-guide-link" href="./about/" data-about-link data-i18n="about.openShort">About the calendar</a>

      <main>
      <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
        <div class="section-heading">
          <p class="status-kicker" data-i18n="search.kicker">Date search</p>
          <h2 id="search-heading" tabindex="-1" data-i18n="search.heading">Which day would you like to find?</h2>
          <p data-i18n="search.intro">Choose a calendar, enter a date, and select “Show date.”</p>
        </div>
        <form id="target-search-form" class="date-entry-form" novalidate>
          <label class="calendar-picker">
            <span data-i18n="search.calendarLabel">Calendar used for input</span>
            <select id="target-calendar" name="calendar"></select>
          </label>
          <div class="date-fields" id="target-date-fields"></div>
          <p class="field-help" id="target-date-help" hidden></p>
          <p class="form-error" id="target-form-error" role="alert" hidden></p>
          <button class="search-submit" type="submit" data-i18n="search.submit">Show date</button>
        </form>

        <details class="advanced-settings" id="calculation-settings">
          <summary data-i18n="settings.summary">Calculation and comparison options</summary>
          <div class="settings-content">
            <div class="settings-intro">
              <h3 data-i18n="settings.heading">Change the day of working</h3>
              <p data-i18n="settings.intro">The day of working is the calculation's point of departure.</p>
            </div>
            <form id="action-date-form" class="date-entry-form compact-form" novalidate>
              <label class="calendar-picker">
                <span data-i18n="settings.actionCalendarLabel">Calendar used to enter the day of working</span>
                <select id="action-calendar" name="calendar"></select>
              </label>
              <div class="date-fields" id="action-date-fields"></div>
              <p class="field-help" id="action-date-help" hidden></p>
              <p class="form-error" id="action-form-error" role="alert" hidden></p>
              <div class="form-actions">
                <button class="search-submit" type="submit" data-i18n="settings.apply">Apply day of working</button>
                <button class="secondary-action" type="button" id="reset-action-day" data-i18n="settings.reset">Reset to current Pastafari day</button>
              </div>
            </form>

            <div class="desktop-comparison-settings" id="comparison-settings">
              <label class="toggle-control">
                <input type="checkbox" id="comparison-toggle">
                <span><strong data-i18n="comparison.toggle">Compare two calculations side by side</strong><small data-i18n="comparison.toggleHelp">Available on desktop.</small></span>
              </label>
              <form id="comparison-date-form" class="date-entry-form compact-form" novalidate hidden>
                <label class="calendar-picker">
                  <span data-i18n="comparison.secondActionLabel">Calendar used to enter the second day of working</span>
                  <select id="comparison-calendar" name="calendar"></select>
                </label>
                <div class="date-fields" id="comparison-date-fields"></div>
                <p class="field-help" id="comparison-date-help" hidden></p>
                <p class="form-error" id="comparison-form-error" role="alert" hidden></p>
                <button class="search-submit" type="submit" data-i18n="comparison.apply">Update comparison</button>
              </form>
            </div>
          </div>
        </details>
      </section>

      <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
        <div id="reverse-app"></div>
      </section>

      <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
        <span class="loader" aria-hidden="true"></span>
        <div>
          <p class="status-kicker" data-i18n="loading.kicker">Calculated locally</p>
          <h2 id="loading-heading" data-i18n="loading.title">Finding the cutlet and date…</h2>
        </div>
      </section>

      <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
        <p class="status-kicker" data-i18n="error.kicker">Unable to display the calendar</p>
        <h2 id="error-heading" data-i18n="error.title">The calculation engine did not load</h2>
        <p id="error-message"></p>
        <button type="button" id="reload-button" data-i18n="error.reload">Reload</button>
      </section>

      <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
        <article class="target-beacon" id="target-beacon" aria-live="polite">
          <div class="beacon-label" id="target-marker"></div>
          <div class="beacon-date" id="target-date-lines"></div>
          <p class="beacon-context" id="target-context"></p>
        </article>

        <div class="calendar-toolbar">
          <div class="cutlet-identity">
            <p class="status-kicker" id="cutlet-meta"></p>
            <h2 id="cutlet-heading">Calendar</h2>
            <p id="cutlet-description"></p>
          </div>
          <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
            <button type="button" id="previous-cutlet" data-i18n="calendar.previous">Previous cutlet</button>
            <button type="button" class="primary-action" id="today-button" data-i18n="calendar.today">Back to today</button>
            <button type="button" id="next-cutlet" data-i18n="calendar.next">Next cutlet</button>
          </div>
        </div>

        <p class="browse-note" id="browse-note" hidden data-i18n="calendar.targetOutside">The searched date is not in the cutlet currently on screen.</p>
        <div class="calendar-grid" id="calendar-grid" role="group"></div>

        <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
          <div class="year-overview-heading">
            <p class="status-kicker" data-i18n="year.kicker">Year at a glance</p>
            <h2 id="year-overview-heading">Year structure</h2>
            <p id="year-overview-context"></p>
          </div>
          <p class="year-overview-loading" id="year-overview-loading" data-i18n="year.loading">Building the full year structure…</p>
          <p class="year-overview-error" id="year-overview-error" hidden></p>
          <div id="year-overview-content" hidden>
            <dl class="year-facts">
              <div><dt data-i18n="year.lengthLabel">Year length</dt><dd id="year-length"></dd></div>
              <div><dt data-i18n="year.cutletCountLabel">Cutlets</dt><dd id="year-cutlet-count"></dd></div>
              <div><dt data-i18n="year.monthCountLabel">Months</dt><dd id="year-month-count"></dd></div>
              <div><dt data-i18n="year.rangeLabel">Gregorian span</dt><dd id="year-range"></dd></div>
            </dl>
            <p class="year-position" id="year-cutlet-position"></p>
            <p class="year-position" id="year-target-position" hidden></p>
            <p class="year-explainer" data-i18n="year.monthExplainer">Months are woven independently of cutlets, so a month can appear in many separate runs during the year.</p>
            <div class="year-structure-columns">
              <details class="structure-details" open>
                <summary id="year-cutlets-summary">Cutlets</summary>
                <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
              </details>
              <details class="structure-details" open>
                <summary id="year-months-summary">Months</summary>
                <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
              </details>
            </div>
          </div>
        </section>
      </section>

      <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
        <div class="section-heading">
          <p class="status-kicker" data-i18n="comparison.kicker">Comparison aligned by day</p>
          <h2 id="comparison-heading" data-i18n="comparison.heading">The same days, two days of working</h2>
          <p data-i18n="comparison.intro">Every row contains the same queried day.</p>
        </div>
        <div class="comparison-summary" id="comparison-summary"></div>
        <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
          <table class="comparison-table">
            <thead>
              <tr>
                <th scope="col" data-i18n="comparison.sameDay">Day shared by both calculations</th>
                <th scope="col" id="comparison-primary-heading">First calculation</th>
                <th scope="col" id="comparison-secondary-heading">Second calculation</th>
              </tr>
            </thead>
            <tbody id="comparison-body"></tbody>
          </table>
        </div>
        <p class="mobile-comparison-note" data-i18n="comparison.desktopOnly">The full comparison table is available on a wide desktop screen.</p>
      </section>

      </main>

      <footer class="site-footer">
        <p data-i18n="footer.local">Calculation happens on your device; there is no user account or tracking code.</p>
        <p data-i18n="footer.open">The link is public and loads directly, including in private browsing.</p>
      </footer>
    </div>
    <noscript>
      <div class="noscript">
        <p lang="en" dir="ltr">JavaScript is required to calculate the calendar locally.</p>
        <p lang="he" dir="rtl">נדרש JavaScript מקומי כדי לבצע את החישוב.</p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>4s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#672013">
    <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
    <meta name="color-scheme" content="light">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; manifest-src 'self'">
    <title data-i18n="about.title">About the Pastafari Calendar</title>
    <link rel="manifest" href="../manifest.webmanifest?v=9-canonical-names">
    <link rel="icon" href="../icons/icon.svg?v=9-canonical-names" type="image/svg+xml">
    <link rel="apple-touch-icon" href="../icons/icon-192.png">
    <link rel="stylesheet" href="../styles.css?v=16-about-polish">
    <script type="module" src="./about.js?v=5-about-i18n-polish"></script>
  </head>
  <body class="about-page">
    <a class="skip-link" href="#article-content" data-i18n="about.skip">Skip to the calendar explanation</a>
    <div class="app-shell about-shell">
      <header class="masthead about-masthead">
        <div class="masthead-copy">
          <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
          <h1 data-i18n="about.title">About the Pastafari Calendar</h1>
          <p class="intro" data-i18n="about.intro">How the calendar represents days, years, cutlets, woven months, and the day of working.</p>
          <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
        </div>
        <div class="language-control">
          <label for="language-selector" data-i18n="language.label">Language</label>
          <select id="language-selector" autocomplete="off"></select>
        </div>
      </header>

      <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>

      <details class="about-toc" id="about-toc" open>
        <summary>
          <span class="eyebrow" data-i18n="about.tocKicker">On this page</span>
          <span class="about-toc-title" data-i18n="about.toc">Contents</span>
        </summary>
        <nav data-i18n-attr="aria-label:about.toc">
          <ol id="about-toc-list"></ol>
        </nav>
      </details>

      <main>
        <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
        <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>

        <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
          <p class="eyebrow" data-i18n="guide.eyebrow">User guide</p>
          <h2 id="guide-heading" data-i18n="guide.heading">What can you do here, and how?</h2>
          <p class="guide-intro" data-i18n="guide.intro">Search, read, browse, change the day of working, and compare calculations.</p>
          <details class="about-site-usage-details" id="site-usage-details">
            <summary data-i18n="guide.open">How do I use this site?</summary>
            <div class="guide-grid">
              <article><span class="guide-number">01</span><h3 data-i18n="guide.1.heading">Open the site and get today</h3><p data-i18n="guide.1.body">The site immediately determines the current Pastafari day for the active observer location.</p></article>
              <article><span class="guide-number">02</span><h3 data-i18n="guide.2.heading">Search in any available calendar</h3><p data-i18n="guide.2.body">Choose a calendar, fill its fields, and show the date.</p></article>
              <article><span class="guide-number">03</span><h3 data-i18n="guide.3.heading">Read the date</h3><p data-i18n="guide.3.body">Each tile shows the year, cutlet, and month in three lines.</p></article>
              <article><span class="guide-number">04</span><h3 data-i18n="guide.4.heading">Browse without selecting by accident</h3><p data-i18n="guide.4.body">Use the cutlet navigation buttons.</p></article>
              <article><span class="guide-number">05</span><h3 data-i18n="guide.5.heading">Change the day of working</h3><p data-i18n="guide.5.body">Open the calculation options to change it.</p></article>
              <article><span class="guide-number">06</span><h3 data-i18n="guide.6.heading">Compare the same days twice</h3><p data-i18n="guide.6.body">On desktop, align each target day under two calculations.</p></article>
              <article><span class="guide-number">07</span><h3 data-i18n="guide.7.heading">Explore the whole year</h3><p data-i18n="guide.7.body">Below the cutlet, inspect the year's length, cutlets, and woven months.</p></article>
            </div>
            <p class="guide-note" data-i18n="guide.note">Grid rows are visual only; comparison-table rows deliberately align the same day.</p>
          </details>
          <a class="back-to-calendar" href="../" data-back-to-calendar data-i18n="guide.back">Back to search and calendar</a>
        </section>
      </main>

      <footer class="site-footer">
        <p data-i18n="footer.local">Calculation happens on your device; this site has no user account and no tracking code.</p>
        <p data-i18n="footer.open">The link is public and loads directly, including in a private-browsing window.</p>
      </footer>
    </div>
    <noscript>
      <div class="noscript">
        <p lang="en" dir="ltr">JavaScript is required to load the explanation and select its language.</p>
        <p lang="he" dir="rtl">נדרש JavaScript כדי לטעון את ההסבר ולבחור את שפתו.</p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>4s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

```
File too large to read at once (24.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

<details>
<summary>349 lines</summary>

```
"use strict";

export default Object.freeze({
  "code": "is",
  "displayName": "Íslenska",
  "dir": "ltr",
  "intlLocale": "is-IS",
  "messages": {
    "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
    "manifest.shortName": "Pastafari",
    "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.",
    "app.title": "Pastafari-dagatal",
    "nav.skip": "Fara í dagsetningarleit",
    "app.intro": "Finndu dag í hvaða studdu dagatali sem er, skoðaðu síðan fulla Pastafari-dagsetningu hans og sjáðu hvaða kótelettu hann tilheyrir.",
    "guide.open": "Hvernig nota ég þennan vef?",
    "guide.openShort": "Hvernig á að nota vefinn",
    "reverse.error.absoluteDateField": "Algilda dagsetningin inniheldur ógildan reit.",
    "reverse.error.limitSafeInteger": "{field} er utan öruggs heiltölusviðs.",
    "reverse.error.limitPositive": "{field} verður að vera jákvætt.",
    "app.brand": "PASTAFARI",
    "about.open": "Um Pastafari-dagatalið",
    "about.openShort": "Um dagatalið",
    "about.title": "Um Pastafari-dagatalið",
    "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
    "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, samtvinnaða mánuði og aðgerðardaginn.",
    "about.skip": "Fara í skýringu dagatalsins",
    "about.back": "Til baka í dagatalið",
    "about.tocKicker": "Á þessari síðu",
    "about.toc": "Efnisyfirlit",
    "about.fallbackNotice": "Skýringin er ekki enn tiltæk á valda tungumálinu; því er sjálfgefna útgáfan sýnd.",
    "about.loadError": "Ekki tókst að hlaða skýringu dagatalsins.",
    "language.label": "Tungumál",
    "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn var núverandi dagur eru sýndar dagsetningar ekki lengur uppfærðar. Þær verða reiknaðar aftur eftir að þú lokar þessum skilaboðum.",
    "location.assumption": "(Ef engar upplýsingar benda til annars er gert ráð fyrir að tækið sé í Kisurra.)",
    "location.useDevice": "Nota staðsetningu tækisins",
    "search.kicker": "Dagsetningarleit",
    "search.heading": "Hvaða dag viltu finna?",
    "search.intro": "Veldu dagatal, sláðu inn dagsetningu og veldu „Sýna dagsetningu“. Núverandi Pastafari-dagur er sjálfgefinn í reitunum.",
    "search.calendarLabel": "Dagatal fyrir innslátt",
    "search.submit": "Sýna dagsetningu",
    "search.invalid": "Ekki tókst að þekkja þessa dagsetningu. Gakktu úr skugga um að allir reitir séu útfylltir og að dagsetningin sé til í valda dagatalinu.",
    "settings.summary": "Valkostir fyrir útreikning og samanburð",
    "settings.heading": "Breyta aðgerðardegi",
    "settings.intro": "Aðgerðardagurinn er upphafspunktur útreikningsins. Sjálfgefið notar vefurinn núverandi Pastafari-dag sem ákvarðaður er fyrir virka staðsetningu athugandans.",
    "settings.actionCalendarLabel": "Dagatal til að slá inn aðgerðardag",
    "settings.apply": "Nota aðgerðardag",
    "settings.reset": "Endurstilla á núverandi Pastafari-dag",
    "settings.invalid": "Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
    "comparison.toggle": "Bera tvo útreikninga saman hlið við hlið",
    "comparison.toggleHelp": "Tiltækt á tölvu. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
    "comparison.secondActionLabel": "Dagatal til að slá inn seinni aðgerðardaginn",
    "comparison.apply": "Uppfæra samanburð",
    "comparison.kicker": "Samanburður samstilltur eftir degi",
    "comparison.heading": "Sömu dagar, tveir aðgerðardagar",
    "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn breytist milli fyrri og seinni dálks.",
    "comparison.sameDay": "Sami fyrirspurnardagur í báðum útreikningum",
    "comparison.actionHeading": "Aðgerðardagur: {date}",
    "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem fyrri útreikningurinn opnaði.",
    "comparison.scrollAria": "Samanburðartafla sömu daga undir tveimur útreikningum",
    "comparison.desktopOnly": "Öll samanburðartaflan er tiltæk á breiðum tölvuskjá.",
    "comparison.invalid": "Seinni aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
    "field.year": "Ár",
    "field.month": "Mánuður",
    "field.day": "Dagur",
    "field.relatedYear": "Samsvarandi gregorískt ár",
    "field.leapMonth": "Innskotsmánuður",
    "field.era": "Tímabil",
    "field.eraYear": "Ár innan tímabils",
    "field.ayyamiHa": "Ayyám-i-Há",
    "field.baktun": "Baktun",
    "field.katun": "Katun",
    "field.tun": "Tun",
    "field.uinal": "Uinal",
    "field.kin": "Kin",
    "field.correlation": "Fylgnitala",
    "era.meiji": "Meiji",
    "era.taisho": "Taishō",
    "era.showa": "Shōwa",
    "era.heisei": "Heisei",
    "era.reiwa": "Reiwa",
    "calendarInput.gregorian": "Gregorískt",
    "calendarInput.julian": "Júlíanskt",
    "calendarInput.hebrew": "Hebreskt",
    "calendarInput.islamicCivil": "Borgaralegt íslamskt",
    "calendarInput.islamicUmmAlQura": "Umm al-Qura",
    "calendarInput.solarHijriOfficial": "Sól-Hijri — opinbert",
    "calendarInput.solarHijriArithmetic": "Sól-Hijri — reiknað 2.820",
    "calendarInput.chinese": "Kínverskt",
    "calendarInput.hinduOldSolar": "Fornt hindúdagatal — sólarform",
    "calendarInput.hinduOldLunar": "Fornt hindúdagatal — tunglform",
    "calendarInput.saka": "Saka",
    "calendarInput.thaiBuddhist": "Taílenskt búddískt",
    "calendarInput.ethiopic": "Eþíópískt",
    "calendarInput.coptic": "Koptískt",
    "calendarInput.japaneseImperial": "Japanskt keisaradagatal",
    "calendarInput.minguo": "Minguo",
    "calendarInput.bahaiTehran": "Bahá’í — jafndægur í Teheran",
    "calendarInput.bahaiWestern": "Bahá’í — vestrænt reiknað",
    "calendarInput.mayaLongCount": "Langtal Maya",
    "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis תשפ״ו eða י״ד; ár ritað með stöfum án þúsundamerkis er túlkað með 5.000 bætt við.",
    "calendarHelp.intl": "Þessi umbreyting notar dagatalsstuðning sem er innbyggður í vafrann. Ef vafrinn getur ekki sýnt dagsetninguna segir vefurinn það skýrt.",
    "calendarHelp.chinese": "Sláðu inn gregoríska árið sem samsvarar kínverska árinu og merktu „Innskotsmánuður“ aðeins fyrir endurtekna mánuðinn.",
    "calendarHelp.hindu": "Sláðu inn ár og dag samkvæmt forna hindúatalinu og veldu mánuðinn eftir nafni. Í tunglforminu má einnig merkja innskotsmánuð.",
    "calendarHelp.japanese": "Ár 1 hefst á fyrsta degi tímabilsins; fyrir fyrsta árið má einnig slá inn 元 eða 元年. Dagsetningu fyrir upphaf eða eftir lok tímabilsins er hafnað.",
    "calendarHelp.bahai": "Veldu mánuð eftir nafni eða Ayyám-i-Há. Formið sem byggir á jafndægri í Teheran styður venjulegt gregorískt bil 1844–3000.",
    "calendarHelp.maya": "Sjálfgefna fylgnitalan er GMT 584.283. Þú getur breytt henni ef þú notar aðra fylgni.",
    "loading.kicker": "Reiknað staðbundið",
    "loading.title": "Leitað að kótelettu og dagsetningu…",
    "error.kicker": "Ekki er hægt að sýna dagatalið",
    "error.title": "Útreikningsvélin hlaðaðist ekki",
    "error.reload": "Hlaða aftur",
    "error.timeout": "Útreikningurinn tekur of langan tíma.",
    "error.engineFailed": "Útreikningsvélin bilaði.",
    "error.engineLoadFailed": "Ekki tókst að hlaða útreikningsvélinni.",
    "calendar.toolbarAria": "Flakk milli kótelettna",
    "calendar.previous": "Fyrri kóteletta",
    "calendar.today": "Til baka í dag",
    "calendar.next": "Næsta kóteletta",
    "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
    "calendar.currentCutlet": "Ár {year} · kóteletta",
    "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
    "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
    "year.kicker": "Árið í hnotskurn",
    "year.heading": "Uppbygging árs {year}",
    "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
    "year.loading": "Byggir upp alla ársuppbygginguna…",
    "year.error": "Ekki tókst að byggja upp alla ársuppbygginguna. Kótelettusýnin er áfram tiltæk.",
    "year.lengthLabel": "Lengd ársins",
    "year.cutletCountLabel": "Kótelettur",
    "year.monthCountLabel": "Mánuðir",
    "year.rangeLabel": "Gregorískt bil",
    "year.daysValue": "{count} dagar",
    "year.rangeValue": "{startDate}–{endDate}",
    "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
    "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
    "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
    "year.cutletsSummary": "Kótelettur á þessu ári ({count})",
    "year.monthsSummary": "Mánuðir á þessu ári ({count})",
    "year.numberedName": "{number}. {name}",
    "year.cutletMeta": "Lengd: {length} dagar · staða í árinu: dagar {start}–{end}",
    "year.monthMeta": "Dagar: {length} · samfelldar runur: {runs} · fyrsta birting: dagur {first} · síðasta: dagur {last}",
    "target.today": "Þetta er í dag",
    "target.searched": "Þetta er dagsetningin sem þú leitaðir að",
    "target.context": "Fyrirspurnardagsetning: {targetDate} · aðgerðardagur: {actionDate}",
    "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
    "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
    "date.yearLine": "Ár {year} frá sköpun heimsins",
    "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
    "date.monthLine": "Dagur {dayInMonth} í mánuðinum {monthName}",
    "guide.eyebrow": "Notkunarleiðbeiningar",
    "guide.heading": "Hvað er hægt að gera hér og hvernig?",
    "guide.intro": "Vefurinn sýnir fulla Pastafari-dagsetningu fyrir hvaða dag sem er, tekur við leit í mörgum dagatölum og getur á tölvu borið saman áhrif aðgerðardagsins.",
    "guide.1.heading": "Opnaðu vefinn og sjáðu dagsetningu dagsins",
    "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
    "guide.2.heading": "Leitaðu í hvaða studdu dagatali sem er",
    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
    "guide.3.heading": "Lestu dagsetninguna",
    "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
    "guide.4.heading": "Flettu án þess að velja fyrir mistök",
    "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar því smellur á þá gerir ekkert. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
    "guide.5.heading": "Breyttu aðgerðardeginum",
    "guide.5.body": "Opnaðu „Valkostir fyrir útreikning og samanburð“ undir leitinni. Þar geturðu valið dagatal og slegið inn annan aðgerðardag. Næstu leitir nota hann þar til þú endurstillir á núverandi Pastafari-dag. Þessi háþróaði valkostur er tiltækur án þess að þyngja venjulegu sýnina.",
    "guide.6.heading": "Berðu sömu daga saman tvisvar",
    "guide.6.body": "Á tölvu virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
    "guide.7.heading": "Skoðaðu allt árið",
    "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
    "guide.note": "Raðir og dálkar reitanetsins eru aðeins sjónræn uppröðun, ekki vikur. Í samanburðartöflunni hefur röðunin hins vegar merkingu: hver lína er sami fyrirspurnardagurinn.",
    "guide.back": "Til baka í leit og dagatal",
    "footer.local": "Útreikningurinn fer fram á tækinu þínu; vefurinn hefur engan notandareikning og engan rakningarkóða.",
    "footer.open": "Tengillinn er opinber og opnast beint, einnig í einkavafraglugga.",
    "reverse.kicker": "Öfug leit",
    "reverse.heading": "Finna dag út frá Pastafari-dagsetningu hans",
    "reverse.intro": "Sláðu inn fulla Pastafari-dagsetningu og skilgreindu aðgerðardag hennar. Leitin fer fram staðbundið á þessu tæki.",
    "reverse.mode.basic": "Ein dagsetning",
    "reverse.mode.advanced": "Skorðukerfi",
    "reverse.basic.heading": "Öfug leit að einni dagsetningu",
    "reverse.basic.dateHeading": "Pastafari-dagsetning sem á að finna",
    "reverse.field.year": "Ár",
    "reverse.field.cutlet": "Kóteletta",
    "reverse.field.dayInCutlet": "Dagur í kótelettu",
    "reverse.field.month": "Mánuður",
    "reverse.field.dayInMonth": "Dagur í mánuði",
    "reverse.basic.calculationHeading": "Aðgerðardagur",
    "reverse.basic.calculationMode": "Hvernig er aðgerðardagurinn skilgreindur?",
    "reverse.basic.calculation.active": "Nota virkan aðgerðardag vefsins",
    "reverse.basic.calculation.absolute": "Nota aðra þekkta dagsetningu",
    "reverse.basic.calculation.same": "Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)",
    "reverse.basic.calculation.pastafari": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
    "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
    "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
    "reverse.basic.sameHeading": "Endanlegt leitarsvið fyrir c = t",
    "reverse.basic.rangeStart": "Upphaf sviðs",
    "reverse.basic.rangeEnd": "Lok sviðs",
    "reverse.basic.toAdvanced": "Halda áfram í ritli skorðukerfisins",
    "reverse.basic.toAdvancedHelp": "Endurkvæmir Pastafari-aðgerðardagar eru settir fram sem breytur og skorður svo hægt sé að lengja keðjuna án tilbúinna dýptarmarka.",
    "reverse.action.solve": "Leita",
    "reverse.action.cancel": "Hætta við leit",
    "reverse.action.open": "Opna í dagatali",
    "reverse.action.addVariable": "Bæta við dagsetningarbreytu",
    "reverse.action.addConstraint": "Bæta við skorðu",
    "reverse.action.remove": "Fjarlægja",
    "reverse.action.clear": "Hreinsa niðurstöður",
    "reverse.progress.reverse": "Úrlausn Pastafari-tengsla",
    "reverse.progress.verify": "Staðfesting mögulegra lausna",
    "reverse.progress.done": "Leit lokið",
    "reverse.progress.scanned": "Loknar vinnueiningar: {count}",
    "reverse.status.running": "Leitað á tækinu…",
    "reverse.status.cancelled": "Leit hætt við.",
    "reverse.status.superseded": "Nýrri leit kom í stað þessarar leitar.",
    "reverse.status.completeEmpty": "Engin lausn er til á svæðinu sem var leitað að fullu.",
    "reverse.status.completeSolutions": "Leit lokið. Allar {count} lausnir á svæðinu eru sýndar.",
    "reverse.status.partialEmpty": "Leitin stöðvaðist áður en henni lauk. Engin lausn hefur fundist enn.",
    "reverse.status.partialSolutions": "{count} staðfestar lausnir eru sýndar, en leitin stöðvaðist áður en henni lauk og fleiri gætu verið til.",
    "reverse.status.stale": "Þessar niðurstöður notuðu fyrri virkan aðgerðardag. Keyrðu leitina aftur til að nota þann núverandi.",
    "reverse.status.rangeRequired": "Ekki er hægt að leita þetta vandamál til fulls fyrr en endanlegu sviði eða fastri dagsetningu hefur verið bætt við.",
    "reverse.status.timeout": "Leitin náði tímamörkum áður en henni lauk.",
    "reverse.status.failed": "Vél öfugrar leitar brást.",
    "reverse.result.heading": "Lausnir",
    "reverse.result.solution": "Lausn {index}",
    "reverse.result.target": "Fyrirspurnardagur",
    "reverse.result.calculation": "Aðgerðardagur",
    "reverse.result.jdn": "JDN {jdn}",
    "reverse.result.complete": "Full leit",
    "reverse.result.partial": "Leit að hluta",
    "reverse.advanced.heading": "Lausnaraðferð fyrir skorðukerfi",
    "reverse.advanced.intro": "Skilgreindu dagsetningarbreytur og tengsl þeirra. Hringir eru leyfðir þegar kerfið er þrengt að endanlegum sviðum.",
    "reverse.variables.heading": "Dagsetningarbreytur",
    "reverse.variable.label": "Birtingarnafn",
    "reverse.variable.defaultName": "Dagsetning {index}",
    "reverse.variable.domain": "Svið",
    "reverse.variable.domain.unknown": "Óþekkt (verður að takmarkast af öðrum skorðum)",
    "reverse.variable.domain.exact": "Nákvæm þekkt dagsetning",
    "reverse.variable.domain.range": "Endanlegt dagsetningarsvið",
    "reverse.constraint.heading": "Skorður",
    "reverse.constraint.type": "Tegund skorðu",
    "reverse.constraint.pastafari": "Pastafari-dagsetning",
    "reverse.constraint.equal": "Sami dagur á tímalínunni",
    "reverse.constraint.order": "Tímaröð",
    "reverse.constraint.difference": "Mismunur í dögum",
    "reverse.constraint.left": "Vinstri dagsetning",
    "reverse.constraint.right": "Hægri dagsetning",
    "reverse.constraint.target": "Fyrirspurnardagsbreyta",
    "reverse.constraint.calculationMode": "Uppruni aðgerðardags",
    "reverse.constraint.calculation.variable": "Önnur dagsetningarbreyta",
    "reverse.constraint.calculation.absolute": "Þekkt algild dagsetning",
    "reverse.constraint.calculation.same": "Sama og fyrirspurnardagur (c = t)",
    "reverse.constraint.calculationVariable": "Aðgerðardagsbreyta",
    "reverse.constraint.orderOp": "Tengsl",
    "reverse.constraint.differenceMode": "Mismunarregla",
    "reverse.constraint.differenceExact": "Nákvæmur mismunur",
    "reverse.constraint.differenceRange": "Mismunarsvið",
    "reverse.constraint.equals": "Nákvæmir dagar (vinstri − hægri)",
    "reverse.constraint.min": "Lágmarksdagar (vinstri − hægri)",
    "reverse.constraint.max": "Hámarksdagar (vinstri − hægri)",
    "reverse.options.heading": "Leitarmörk",
    "reverse.options.intro": "Skildu mörkin auð ef þú vilt engin mörk nota. Mörk eru aldrei sett í laumi.",
    "reverse.options.maxSolutions": "Stöðva eftir þennan fjölda staðfestra lausna",
    "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnueininga",
    "reverse.options.timeout": "Tímamörk í millisekúndum",
    "reverse.advanced.emptyVariables": "Bættu við að minnsta kosti einni dagsetningarbreytu.",
    "reverse.advanced.emptyConstraints": "Kerfi má vera án skorða, en sérhver breyta sem eftir er verður samt að hafa endanlegt svið.",
    "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
    "reverse.error.range": "Lok sviðs mega ekki vera á undan upphafi þess.",
    "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
    "reverse.error.pastafari": "Sláðu inn alla fimm reiti Pastafari-dagsetningarinnar.",
    "reverse.calendar.label": "Dagatal sem notað er fyrir þessa algildu dagsetningu",

  },
  "calendar": {
    "cutlets": {
      "bronze": "Brons",
      "fox": "Refur",
      "kidney": "Nýra",
      "lagash": "Lagash",
      "thought": "Hugsun",
      "fourPartsOfNine": "Fjórir hlutar af níu",
      "palgurash": "Palgurash",
      "papyrusSedge": "Papýrusstör",
      "cluster": "Klasi",
      "scorpion": "Sporðdreki",
      "ash": "Aska",
      "wheat": "Hveiti",
      "river": "Á",
      "laughter": "Hlátur",
      "akkad": "Akkad",
      "horn": "Horn",
      "theEmptyJar": "Tóma krukkan"
    },
    "months": {
      "clay": "Leir",
      "pomegranate": "Granatepli",
      "elbow": "Olnbogi",
      "envy": "Öfund",
      "eridu": "Eridu",
      "toothpaste": "Tannkrem",
      "threePartsOfFive": "Þrír hlutar af fimm",
      "karshumav": "Karshumav",
      "leopard": "Hlébarði",
      "tin": "Tin",
      "mist": "Þoka",
      "frankincense": "Reykelsi",
      "spindle": "Snælda",
      "rib": "Rifbein",
      "carob": "Karób",
      "uruk": "Uruk",
      "shame": "Skömm",
      "camel": "Úlfaldi",
      "copper": "Kopar",
      "well": "Brunnur",
      "yolk": "Eggjarauða",
      "star": "Stjarna",
      "honey": "Hunang",
      "spleen": "Milta",
      "limestone": "Kalksteinn",
      "joy": "Gleði",
      "fig": "Fíkja",
      "nineveh": "Níníve",
      "frog": "Froskur",
      "pitch": "Bik",
      "lamp": "Lampi",
      "theClosedDoor": "Lokuðu dyrnar",
      "sesame": "Sesam",
      "nape": "Hnakki",
      "silver": "Silfur",
      "susa": "Susa",
      "storm": "Stormur",
      "donkey": "Asni",
      "flour": "Mjöl",
      "regret": "Eftirsjá",
      "babylon": "Babýlon",
      "tongue": "Tunga",
      "flax": "Hör",
      "salt": "Salt",
      "pear": "Pera",
      "bow": "Bogi",
      "sand": "Sandur"
    }
  },
  "terminology": {
    "foundationDay": "Stofndagur",
    "workingNumber": "Aðgerðartala",
    "queryNumber": "Fyrirspurnartala",
    "distanceNumber": "Fjarlægðartala",
    "sumNumber": "Summatala",
    "directionNumber": "Stefnutala",
    "bowl": "Skál",
    "drop": "Dropi",
    "gate": "Hlið",
    "yearFiveThousand": "Ár fimm þúsund frá sköpun heimsins"
  }
});
```

</details>


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

<details>
<summary>301 lines</summary>

```
<!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
<!-- Section-ID eru hluti af stöðugum opinberum deep-link contract og eru ekki leidd af þýddum fyrirsögnum. -->
<div class="about-section about-lead" id="about-calendar">
  <p>Í frásögn þessa vefs er Pastafari-dagatalið sett fram sem dagatalið þar sem tíminn sjálfur varð til. Hvernig það virkar er þó skilgreint með ströngum og nákvæmum reglum.</p>
  <p>Dagatalið festir ekki einn óbreytanlegan Pastafari-„miða“ á hvern dag. Til að fá dagsetningu þarf tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, þann dag sem spurt er um Pastafari-dagsetningu fyrir.</p>
  <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)</code></pre>
  <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  <p>Þetta er ekki villa. Dagatalið er skilgreint einmitt svona.</p><hr>
</div>

<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  <p>Aðgerðardagurinn, staðsetning athugandans, auðkenni dagsins á tímalínunni eða aðrar tæknilegar upplýsingar mega birtast við hlið dagsetningarinnar, en þær eru ekki sjötta dagsetningarreiturinn.</p><hr>
</section>

<section class="about-section" id="working-day" data-toc-section data-toc-level="2">
  <h2>Af hverju þarf aðgerðardag?</h2>
  <p>Í venjulegum dagatölum er eðlilegt að hugsa sér að dagsetningin „tilheyri“ sjálfum deginum. Í Pastafari-dagatalinu ræðst dagsetningin af sambandi tveggja daga.</p>
  <p>Að breyta <code>t</code> þýðir að spyrja um annan dag. Að breyta <code>c</code> getur haft miklu dýpri áhrif: mörk ára, kótelettur, mánuðir, nöfn þeirra og það hvernig mánuðirnir fléttast saman geta allt breyst.</p>
  <p>Almanak sem reiknað er í dag þarf því ekki að vera rétt á morgun. Þetta forðar líka þeirri óþægilegu stöðu að prentað dagatal haldist gagnlegt heilt ár.</p><hr>
</section>

<section class="about-section" id="day-identity" data-toc-section data-toc-level="2">
  <h2>Sami dagur, önnur dagsetning</h2>
  <p>Greina þarf á milli <strong>auðkennis dagsins</strong> og <strong>Pastafari-framsetningar hans</strong>. Hið fyrra er fastur staður tiltekins dags á tímalínunni; hið síðara eru þau fimm gildi sem fást þegar dagurinn er sýndur undir tilteknum aðgerðardegi.</p>
  <p>Í vörunni og API má líta á hið fyrra sem <code>day-id</code>: fast auðkenni dags á tímalínunni sem breytist ekki þótt framsetningin breytist. Hins vegar þurfa</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>F(c_1,t)</code></pre>
  <p>og</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>F(c_2,t)</code></pre>
  <p>ekki að vera jöfn.</p>
  <p>Því getur handvirk breyting á aðgerðardegi breytt Pastafari-dagsetningunni sem sýnd er fyrir sama dag, án þess að dagurinn sjálfur færist nokkuð á tímalínunni.</p>
  <p>Sama regla gildir um atburði. Fundur, fæðing eða sögulegur atburður ætti að vera tengdur föstu auðkenni á tímalínunni; Pastafari-dagsetningu hans má endurreikna eftir birtingarsamhengi.</p>
  <p>Merkingin getur breyst. Atburðurinn ekki.</p><hr>
</section>

<section class="about-section" id="year-5000" data-toc-section data-toc-level="2">
  <h2>Ár 5000</h2>
  <p>Þegar aðgerðardagurinn og fyrirspurnardagurinn eru sami dagur,</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>c=t</code></pre>
  <p>er árnúmerið alltaf</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>5000</code></pre>
  <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
  <p>Aðgerðardagurinn sjálfur er einnig innan árs 5000, eins og aðrir dagar sama valda árs. Því <strong>sannar það eitt að dagur sé í ári 5000 ekki að <code>t=c</code>.</strong></p>
  <p>Árnúmerið sýnir þó stefnuna:</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>Y&gt;5000 \Rightarrow t&gt;c</code></pre>
  <p>og</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>Y&lt;5000 \Rightarrow t&lt;c</code></pre>
  <p>Það er líka til <strong>ár 0</strong>; lengra aftur í fortíðinni koma ár með neikvæðum númerum.</p><hr>
</section>

<section class="about-section" id="years-and-gates" data-toc-section data-toc-level="2">
  <h2>Ár og hlið</h2>
  <p>Pastafari-ár getur haft</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>252\text{ til }5778</code></pre>
  <p>daga. Þetta eru kanónísk mörk kerfisins, ekki reynslumeðaltöl.</p>
  <p>Ár getur því verið styttra en sólarár eða lengra en fimmtán sólarár. Ársmörkin eru byggð úr kerfi <strong>hliða</strong>; mörk kótelettna koma úr sama kerfi.</p>
  <p>Árslok þurfa ekki að falla saman við árstíð, eina umferð Jarðar um Sól, tunglhring eða praktíska ósk um að árið fari nú loksins að klárast.</p><hr>
</section>

<section class="about-section" id="cutlets" data-toc-section data-toc-level="2">
  <h2>Kótelettur</h2>
  <p>Hvert ár skiptist í <strong>6 til 17 kótelettur</strong>. Kóteletta er samfellt tímabil í tímaröð.</p>
  <p>Ef dagur 250 í kótelettu er í dag, verður dagur 251 í sömu kótelettu á morgun, nema í dag sé síðasti dagur hennar. Mörk kótelettna eru hlið og kóteletta varir að minnsta kosti</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>42</code></pre>
  <p>daga.</p>
  <p>Kerfið hefur 17 kanónísk kótelettunöfn og sama nafn endurtekur sig ekki innan sama árs. Nafnið ákvarðar hvorki lengd né staðsetningu kótelettunnar.</p><hr>
</section>

<section class="about-section" id="months-and-weaving" data-toc-section data-toc-level="2">
  <h2>Mánuðir og fléttun</h2>
  <p>Hvert ár hefur</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>3\text{ til }47</code></pre>
  <p>byggingarmánuði og hverjum mánuði er úthlutað</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>4\text{ til }123</code></pre>
  <p>dögum.</p>
  <p>En Pastafari-mánuður <strong>þarf ekki að vera samfellt tímabil</strong>. Tímaröðin gæti til dæmis verið:</p>
  <blockquote><p>Mánuður A — dagur 14<br>Mánuður B — dagur 9<br>Mánuður A — dagur 15</p></blockquote>
  <p>Þetta er fullkomlega gilt. Dagur 15 í mánuði A er næsti dagur <strong>þess mánaðar</strong>, jafnvel þótt dagur úr öðrum mánuði sé á milli.</p>
  <p>„Dagur í mánuði“ segir því ekki hversu margir dagar á tímalínunni hafa liðið frá fyrstu birtingu mánaðarins. Þetta er raðnúmer meðal þeirra daga sem úthlutað er mánuðinum á árinu. Dagur 48 merkir 48. daginn sem tilheyrir mánuðinum, ekki 47 dögum eftir fyrstu birtingu hans.</p><hr>
</section>

<section class="about-section" id="month-interleaving" data-toc-section data-toc-level="2">
  <h2>Mánuðir fléttast saman</h2>
  <p>Hugsa má mánuðina sem þræði sem liggja í gegnum árið. Hver dagur tilheyrir nákvæmlega einum mánuði; morgundagurinn getur tilheyrt öðrum mánuði, og síðar getur fyrri mánuðurinn komið aftur og haldið áfram með næsta númeri.</p>
  <p>Fléttunin hefur reglur, þar á meðal takmarkanir á röð fyrstu og síðustu birtinga mánaða. En engin krafa er um að einn mánuður ljúki áður en annar byrjar.</p>
  <ul>
    <li>Kótelettan mælir staðsetningu innan samfellds tímabils.</li>
    <li>Mánuðurinn segir til um aðild að byggingarþræði sem getur horfið og síðar birst aftur.</li>
  </ul>
  <p>Einn mánuður getur farið í gegnum margar kótelettur, og innan einnar kótelettu geta margir mánuðir birst. Upphaf og endir kerfanna tveggja þurfa ekki að falla saman.</p><hr>
</section>

<section class="about-section" id="next-day-in-month" data-toc-section data-toc-level="2">
  <h2>Næsti dagur mánaðarins er ekki endilega á morgun</h2>
  <p>Ef í dag er dagur 17 í tilteknum mánuði, þá er dagur 18 í sama mánuði <strong>næsta birting þess mánaðar</strong>. Hún getur verið á morgun eða miklu síðar.</p>
  <p><strong>Á morgun</strong> er næsti dagur á tímalínunni; <strong>næsti dagur mánaðarins</strong> er næsta birting sama mánaðar.</p>
  <p>Sömuleiðis þýðir „lok mánaðar“ ekki að lokin séu nálægt í tíma. Mánuður með 120 daga getur verið á degi 119 í dag og dagur 120 komið miklu síðar innan sama árs.</p><hr>
</section>

<section class="about-section" id="no-weeks" data-toc-section data-toc-level="2">
  <h2>Engar vikur eru</h2>
  <p>Núverandi kanóníska forskrift <strong>skilgreinir ekkert vikukerfi</strong>. Engin kanónísk sjö daga eining er til, engin Pastafari-nöfn á vikudögum og engin regla sem gerir tvo daga að „sama vikudegi“.</p>
  <p>Auðvitað má leggja borgaralegt vikukerfi utan á; það er einfaldlega ekki hluti af Pastafari-dagsetningunni.</p><hr>
</section>

<section class="about-section" id="canonical-names" data-toc-section data-toc-level="2">
  <h2>Nöfn</h2>
  <p>Það eru 17 kanónísk kótelettunöfn og 47 kanónísk mánaðarnöfn. Innan eins árs birtist hvert nafn í sínum flokki í mesta lagi einu sinni.</p>
  <p>Auðkenni nafnsins er kanónískt og merkingarbært; það er ekki niðurstaða atkvæðagreiðslu milli mismunandi stafsetninga, þýðinga eða útfærslna. Um merkingu nafnanna hefur hebreska Megillah hæsta vald; þýðingar og umritanir eru aðeins birtingarlög.</p>
  <p>Nafnið er heldur ekki falinn lengdarkóði. Nafn tiltekinnar kótelettu eða mánaðar gerir eininguna ekki sjálfkrafa lengri eða styttri.</p><hr>
</section>

<section class="about-section" id="month-day-pairs" data-toc-section data-toc-level="2">
  <h2>Lítil staðreynd um mánuði</h2>
  <p>Það eru 47 mánaðarnöfn og mánuður getur mest náð degi 123. Fjöldi setningafræðilega mögulegra para af gerðinni „mánaðarnafn + dagnúmer í mánuði“ er því</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>47\times123=5781</code></pre>
  <p>Hver dagur ársins gerir nákvæmlega eitt slíkt par raunverulegt. Ef lengd ársins er <code>L</code>, birtast nákvæmlega <code>L</code> pör. Þar sem</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>L\le5778</code></pre>
  <p>verður hvert ár að skilja eftir að minnsta kosti</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>5781-5778=3</code></pre>
  <p>möguleg pör ónotuð. Jafnvel lengsta árið hefur ekki nógu marga daga til að nota þau öll.</p><hr>
</section>

<section class="about-section" id="calculation" data-toc-section data-toc-level="2">
  <h2>Hvernig er dagatalið reiknað?</h2>
  <p>Innri útreikninginn köllum við hér <strong>sósuna</strong>. Í miðju hans er frumtalan</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>Q=2^{127}-1</code></pre>
  <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
  <p>Lokauppfærslurnar eru <strong>samhliða</strong>: í hverri blöndu eru öll sex nýju gildin reiknuð úr sama gamla ástandinu og aðeins síðan eru allar sex skálarnar uppfærðar í einu.</p>
  <p>Í 12 lokablöndunum er eitt sérstaklega mikilvægt kanónískt atriði. Ef <code>S</code> er summa sex gömlu skálanna og <code>r</code> er númer blöndunnar, reiknar kerfið</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>R=\operatorname{SAVE}(S+149r)</code></pre>
  <p><code>R</code> er <strong>vistaða summan</strong>. Bæði val á skálaröð og innri uppfærsla blöndunnar nota <code>R</code>, ekki hráu summuna <code>S</code>.</p>
  <p>Eldri útgáfur sem sendu hráu summuna inn í þessa uppfærslu lýsa ekki lengur núverandi kanónískri merkingarfræði. Dæmi sem byggja á gömlu reglunni ætti að telja úrelt þar til þau hafa verið staðfest aftur.</p>
  <p>Eftir blöndurnar heldur svarahringurinn einnig áfram röðinni sem var læst við 46. sýnilega dropann; henni á ekki sjálfkrafa að skipta út fyrir röð síðustu blöndunnar.</p><hr>
</section>

<section class="about-section" id="short-and-wide-choice" data-toc-section data-toc-level="2">
  <h2>Short Choice og Wide Choice</h2>
  <p>Fyrir tiltölulega lítil valrúm er <strong>Short Choice</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
  <p>Fyrir mjög stór valrúm er <strong>Wide Choice</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
  <p>Wide Choice jafngildir ekki því að mynda óháða og jafnt dreifða grunn-<code>Q</code> tölustafi þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
  <p>Dagatalið sjálft er áfram fullkomlega determinískt. „Choice“ er heiti reikniritsþrep, ekki slembiútdráttur við notkun.</p><hr>
</section>

<section class="about-section" id="structural-atlas" data-toc-section data-toc-level="2">
  <h2>Byggingaratlas</h2>
  <p>Hingað til höfum við talað um reglur dagatalsins. Næstu tölur eru annars konar upplýsingar: <strong>reynsluniðurstöður</strong> úr stórri reikniúrtaki.</p>
  <p>Atlasinn var byggður með commit-i vélarinnar <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljón samfellda mánaðarkafla; og meira en 364 milljón færslur frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
  <p>Þessar tölur lýsa þessu gagnasafni, ekki kanónískum reglum.</p>
  <div class="about-table-scroll" role="region" tabindex="0" aria-label="Mæld gögn úr byggingaratlasnum">
    <table class="about-table">
      <thead><tr><th scope="col">Mæld stærð</th><th scope="col">Niðurstaða í úrtaki</th></tr></thead>
      <tbody>
        <tr><td>Meðallengd árs</td><td>4.275,182 dagar</td></tr>
        <tr><td>Miðgildi árslengdar</td><td>4.343</td></tr>
        <tr><td>Mælt lágmark / hámark</td><td>716 / 5.778</td></tr>
        <tr><td>Meðalfjöldi kótelettna á ári</td><td>7,271</td></tr>
        <tr><td>Ár með nákvæmlega 6 kótelettur</td><td>42,00 %</td></tr>
        <tr><td>Ár með 6–8 kótelettur</td><td>81,29 %</td></tr>
        <tr><td>Meðallengd kótelettu</td><td>587,963 dagar</td></tr>
        <tr><td>Miðgildi kótelettulengdar</td><td>560</td></tr>
        <tr><td>Meðalfjöldi mánaða á ári</td><td>41,102</td></tr>
        <tr><td>Miðgildi fjölda mánaða</td><td>43</td></tr>
        <tr><td>Ár með 47 mánuði</td><td>15,63 %</td></tr>
        <tr><td>Ár með að minnsta kosti 45 mánuði</td><td>36,81 %</td></tr>
        <tr><td>Meðallengd byggingarmánaðar</td><td>104,014 dagar</td></tr>
        <tr><td>Miðgildi mánaðarlengdar</td><td>115</td></tr>
        <tr><td>Meðalfjöldi samfelldra kafla í mánuði</td><td>100,897</td></tr>
        <tr><td>Hlutfall mánaðarkafla sem vara einn dag</td><td>97,482 %</td></tr>
        <tr><td>Líkur á að tveir aðliggjandi dagar séu í sama mánuði</td><td>2,9976 %</td></tr>
        <tr><td>Meðalfjöldi daga úr öðrum mánuðum milli <code>n</code> og <code>n+1</code> í sama mánuði</td><td>40,408</td></tr>
        <tr><td>Meðalbil milli fyrstu og síðustu birtingar mánaðar</td><td>4.266,653 dagar</td></tr>
      </tbody>
    </table>
  </div>
  <p>Í reynd getur mánuður með um hundrað dögum verið dreifður yfir nær heilt Pastafari-ár.</p>
  <p>Sami atlas sýndi einnig eðlilega lengdarhneigð í kringum ár 5000. Í úrtakinu var „venjulegt“ ár að meðaltali um 4.262 daga. Ef ár eru vegin eftir fjölda daga í þeim hækkar meðaltalið í um 4.466 daga; ár 5000 sjálft var að meðaltali um 4.499 dagar.</p>
  <p>Ástæðan er einföld: ár 5000 verður að innihalda aðgerðardaginn. Lengra ár hefur fleiri daga þar sem það getur verið árið sem inniheldur aðgerðardaginn.</p>
  <p>Samband milli nafns einingar og lengdar hennar var einnig mjög veikt í úrtakinu. Þetta sannar ekki fullkomið stærðfræðilegt óhæði, en atlasinn gefur enga hagnýta vísbendingu um að nöfnin hafi verið hönnuð til að kóða lengd.</p>
  <p>Auk þess eru 86.016 ársbyggingarnar ekki 86.016 fullkomlega óháð úrtök: milli upphafs- og endahliðs eru aðeins 24.786 mismunandi bil. Aðgerðardagar sem liggja nálægt geta valið sama ársbil og samt myndað ólíka innri uppbyggingu.</p>
  <p>Atlasinn lýsir því mældri hegðun útfærslunnar vel, en ekki má breyta honum í líkindasetningu um allar mögulegar dagatalsgerðir.</p><hr>
</section>

<section class="about-section" id="anniversaries" data-toc-section data-toc-level="2">
  <h2>Afmæli og árstíðarbundnar endurkomur</h2>
  <p>Hér þarf fyrst að skilgreina hvað „sami dagur á hverju ári“ merkir. Eðlilegar endurkomuhnit eru <code>(mánaðarnafn, dagur í mánuði)</code> og <code>(kótelettunafn, dagur í kótelettu)</code>; skilyrði má einnig sameina.</p>
  <p>Pastafari-afmæli er því ekki einfaldlega <code>RRULE:FREQ=YEARLY</code>. Finna þarf næsta ár sem uppfyllir valda endurkomuskilyrði, og upprunalegi atburðurinn telst ekki sjálfkrafa vera eigin „næsta birting“.</p>
  <p>Að breyta aðgerðardeginum aðeins fyrir birtingu ætti ekki að breyta auðkenni manns, fæðingarstund eða aldri.</p>
  <p>Í nákvæmri yfirferð af 4.096 sjálftilvísandi dagsetningum var hvert næsta Pastafari-ár prófað allt að 250.000 ár í hvora átt:</p>
  <ul>
    <li>Fyrir <code>(mánaðarnafn, dagur í mánuði)</code> var miðgildi fyrstu endurkomu 1 Pastafari-ár; 77,56 % komu aftur í næsta ári, 93,77 % innan tveggja ára, 99,44 % innan fimm; lengsta mælda biðin var 21 ár.</li>
    <li>Fyrir <code>(kótelettunafn, dagur í kótelettu)</code> var miðgildið 3 ár; 88,89 % fundust innan 10 ára, en dreifingin hefur mjög þungan hala og lengsta mælda biðin var 51.954 Pastafari-ár.</li>
  </ul>
  <p>Þetta eru <strong>reynsluniðurstöður úr prófuðu gagnasafni</strong>; þær sanna ekki að sérhver möguleg endurkoma hljóti að gerast og gefa ekki tryggingu fyrir hámarksbiðtíma.</p><hr>
</section>

<section class="about-section" id="appointments" data-toc-section data-toc-level="2">
  <h2>Hvernig er fundur ákveðinn?</h2>
  <p>Ef tveir vilja semja um fund með Pastafari-dagsetningu einni saman verða þeir að minnsta kosti að vera sammála um fimm dagsetningarreiti og aðgerðardaginn sem notaður var í útreikningnum. Betra er að vista aðgerðardaginn sem fast dagauðkenni en sem orðið „í dag“; annars geta tveir reiknað tvö mismunandi dagatöl.</p>
  <ul>
    <li>„á morgun“ er næsti dagur á tímalínunni;</li>
    <li>„næsti dagur mánaðarins“ er næsta birting þess mánaðar;</li>
    <li>„lok mánaðarins“ eru síðasta birting þess mánaðar;</li>
    <li>„allur mánuðurinn“ getur þýtt mengi daga sem tilheyra mánuðinum eða allt samfellt tímabil á tímalínunni frá fyrstu til síðustu birtingar;</li>
    <li>„næsta ár“ er næsta árið í dagatalinu sem byggt er undir valda aðgerðardeginum.</li>
  </ul>
  <p>Fyrir sérstaklega mikilvægan fund má einnig vista fastan dag á tímalínunni eða nákvæman tímapunkt. Dagatalið móðgast ekki.</p><hr>
</section>

<section class="about-section" id="travel-and-all-day" data-toc-section data-toc-level="2">
  <h2>Ferðalög og heilsdagsatburðir</h2>
  <p>Atburðurinn og staðbundna merkið sem honum er sýnt eru ekki sami hluturinn. Atburður með ákveðinni klukkustund ætti að vera bundinn við fastan tímapunkt. Ferðalag færir hann ekki í tíma, en staðbundin Pastafari-dagsetning sama raunverulega augnabliks getur breyst, því skilgreiningin á „staðbundnum degi“ ræðst af staðsetningu.</p>
  <p>Við <strong>heilsdagsatburð</strong> er munurinn enn meiri. Borgaralegur heilsdagsatburður gengur venjulega frá miðnætti til næsta miðnættis; Pastafari-heilsdagsatburður ætti að ganga frá staðbundnum mörkum Pastafari-dags til næstu marka. Yfirleitt eru þetta ekki sömu augnablik.</p>
  <p>Því getur það breytt merkingu Pastafari-atburðar að flytja hann blint út sem borgaralegan heilsdagsatburð. Til að varðveita merkinguna rétt þarf að vista fast tímatengt auðkenni og viðeigandi samhengi staðsetningar og dagamarka, ekki aðeins <code>all-day</code>-merkinguna.</p><hr>
</section>

<section class="about-section" id="day-boundary" data-toc-section data-toc-level="2">
  <h2>Hvar liggja dagamörkin?</h2>
  <p>Staðbundni Pastafari-dagurinn skiptir ekki um á miðnætti. Mörk hans ráðast af <strong>tímapunktinum þegar miðja Venusar, séð frá stað athugandans, fer um neðri hluta staðbundna hádegisbaugsins</strong>.</p>
  <p>Þetta er staðbundinn stjarnfræðilegur atburður sem ræðst af staðsetningu. Þessi yfirferð þarf ekki að gerast kl. 00:00, borgaralegt tímabelti ákvarðar það ekki, það færist ekki bara vegna þess að sumartími byrjar eða endar, og Venus þarf ekki að vera sýnileg berum augum.</p>
  <p>Sama raunverulega augnablik getur á tveimur stöðum verið sitthvorum megin við staðbundin dagamörk. Ef kerfið hefur enga nothæfa staðsetningu notanda er sjálfgefna varastaðsetning vörunnar <strong>Kisurra</strong>.</p><hr>
</section>

<section class="about-section" id="printed-calendar" data-toc-section data-toc-level="2">
  <h2>Prentað dagatal og handútreikningur</h2>
  <p>Það má prenta Pastafari-dagatalið; aðeins þarf að taka fram fyrir hvaða aðgerðardag það var reiknað. Slíkt dagatal sýnir byggingu tímans frá sjónarhorni þess dags; ef aðgerðardagurinn breytist getur þurft nýtt dagatal. Prentarinn hefur því enn starf.</p>
  <p>Þar sem forskriftin er fullkomin og kerfið determinískt má einnig reikna allt með höndunum: reiknið inntaksteljarana, farið í gegnum 7 falda og 46 sýnilega dropa, uppfærið skálarnar sex, framkvæmið 12 lokablöndurnar, myndið svörin, byggið hliðin, veljið ár og kótelettur, framkvæmið samsetningarval, veljið nöfnin og fléttið síðan mánuðina.</p>
  <p>Í staðinn þarf enginn að muna hvenær febrúar hefur 28 daga og hvenær 29.</p><hr>
</section>

<section class="about-section" id="seer" data-toc-section data-toc-level="2">
  <h2>Hvað er Seer þá?</h2>
  <p>Við hlið kanónísku útfærslunnar er hröð reiknivél sem heitir <strong>Pastafarian Calendar Seer</strong>. Seer er ekki uppspretta valds: rétta dagsetningin ræðst af Megillah og kanóníska útreikningnum. Ef Seer er ósammála þeim er villan í Seer.</p>
  <p>Hlutverk hans er að keyra sömu fyrirspurnir hratt og skila niðurstöðu á formi sem auðvelt er að samþætta við vörur.</p>
  <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
  <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt bil, endurræsing, <code>cold wake</code> og hegðun undir álagi.</p>
  <p>Verkefnisskjölin greina þó enn á milli opinberrar beta-/matsútsetningar og varanlegrar hýstrar framleiðsluþjónustu með SLA. Þess vegna ætti hugtaksskýringarsíða ekki að festa netfang netþjóns, hýsingaraðila eða útgáfunúmer eins og það væri hluti af dagatalinu sjálfu.</p>
  <p>Seer má nota forútreikning, sérstaka framsetningu, SIMD, algebru og aðrar styttingar. Hann þarf ekki að líkja eftir allri reiknisögu kanónísku útfærslunnar skref fyrir skref svo lengi sem hann framkvæmir sömu merkingarlegu aðgerð og skilar sama svari.</p>
  <p>Hagræðing er ekki annað vald.</p><hr>
</section>

<section class="about-section" id="foundation-and-tablets" data-toc-section data-toc-level="2">
  <h2>Uppruni, Stofndagur og Dagur taflnanna</h2>
  <p>Hér er sérstaklega mikilvægt að aðgreina kanónískar tímafestur skýrt frá frásögn vefsins.</p>

  <section class="about-subsection" id="anchors" data-toc-section data-toc-level="3">
    <h3>Festipunktar</h3>
    <p>Kerfið hefur einn fastan viðmiðunardag sem kallast <strong>Stofndagur</strong>. Í proleptíska gregoríska dagatalinu er hann <strong>22. desember 41.222 f.Kr.</strong>.</p>
    <p>Stofndagur er ekki „upphaf tímans“; hann er reiknifestipunktur.</p>
    <p>Tölusetning daga kringum hann notar jákvæðar oddatölur og sléttar tölur: Stofndagur=1; síðari dagar=3, 5, …; aftur í fortíðina er fyrri dagurinn=2, síðan 4, 6, … . Þannig eru báðar hliðar festipunktsins kóðaðar í þessum teljara án neikvæðra dagnúmera.</p>
    <p>Seinni festipunkturinn er <strong>Dagur taflnanna</strong>: <strong>15. júní 763 f.Kr. í proleptíska júlíanska dagatalinu</strong>, það er <strong>7. júní 763 f.Kr. í proleptíska gregoríska dagatalinu</strong>.</p>
    <p>Nákvæm fjarlægð frá Stofndegi að Degi taflnanna er</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>14{,}777{,}149</code></pre>
    <p>dagar.</p>
    <p>Þetta eru fastir festipunktar á tímalínunni, en Pastafari-dagsetningin sem þeim er sýnd ræðst samt af aðgerðardeginum sem spurt er frá.</p>
  </section>

  <section class="about-subsection" id="site-story" data-toc-section data-toc-level="3">
    <h3>Frásögn vefsins</h3>
    <p>Í ritstjórnarfrásögn vefsins er dagatalinu lýst sem hluta sköpunarinnar og sem kerfi sem mannkynið notaði án þess að skilja það að fullu, þar til því var komið aftur á framfæri á nútímaöld.</p>
    <p>Þetta er frásögn vefsins; ekki ætti að setja hvert smáatriði frásagnarinnar fram eins og það væri bein tæknileg fullyrðing úr Megillah.</p>
    <p>Atburðurinn þegar kerfið var afhent aftur er sjálfur fastur sögulegur atburður. Betra er að sýna <strong>Pastafari-dagsetningu</strong> hans kviklega undir núverandi aðgerðardegi en festa hana að eilífu sem eina dagsetningu.</p><hr>
  </section>
</section>

<section class="about-section" id="reverse-conversion" data-toc-section data-toc-level="2">
  <h2>Fyrir lengra komna: öfug umbreyting</h2>
  <p>Ef aðgerðardagurinn <code>c</code> er þekktur er öfug umbreyting mjög stranglega takmörkuð. Innan þekkts Pastafari-árs auðkennir</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{kótelettunafn},\text{dagur í kótelettu})</code></pre>
  <p>í mesta lagi einn dag. Sama gildir um</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>(\text{mánaðarnafn},\text{dagur í mánuði})</code></pre>
  <p>Full dagsetning með þekktum aðgerðardegi auðkennir því fyrirspurnardag ótvírætt.</p>

  <div class="about-table-scroll" role="region" tabindex="0" aria-label="Efri mörk á fjölda mögulegra daga í öfugri umbreytingu">
    <table class="about-table">
      <thead><tr><th scope="col">Aðrar þekktar upplýsingar</th><th scope="col">Hámarksfjöldi mögulegra daga</th></tr></thead>
      <tbody>
        <tr><td>Enginn reitur þekktur nema árið</td><td>5.778</td></tr>
        <tr><td>Aðeins kótelettunafnið</td><td>5.568</td></tr>
        <tr><td>Aðeins dagur í kótelettu</td><td>17</td></tr>
        <tr><td>Aðeins mánaðarnafnið</td><td>123</td></tr>
        <tr><td>Aðeins dagur í mánuði</td><td>47</td></tr>
        <tr><td>Kótelettunafn + dagur í kótelettu</td><td>1</td></tr>
        <tr><td>Mánaðarnafn + dagur í mánuði</td><td>1</td></tr>
        <tr><td>Hvaða þrír reitir sem er nema árið</td><td>1</td></tr>
        <tr><td>Allir fjórir reitir nema árið</td><td>1</td></tr>
      </tbody>
    </table>
  </div>

  <p>Ef aðgerðardagurinn er óþekktur er staðan önnur. Sömu fimm gildi geta birst undir mismunandi aðgerðardögum og til eru nákvæm dæmi þar sem sama fulla dagsetning kemur fram í mismunandi fjarlægð frá <code>c</code>.</p>
  <p>Í ári 5000 er jafnvel formerki þessarar fjarlægðar ekki alltaf ákvarðað af fimm gildunum: sama fulla dagsetning getur í einu samhengi verið fyrir aðgerðardaginn en í öðru eftir hann.</p>
  <p>Full Pastafari-dagsetning er því ekki algilt vistfang á tímalínunni ef ekki er vitað undir hvaða <code>c</code> hún var reiknuð.</p>

  <section class="about-subsection" id="far-time-structure" data-toc-section data-toc-level="3">
    <h3>Bygging mjög fjarlægs tíma</h3>
    <p>Stærðfræðirannsóknir sem byggja á forskriftinni hafa einnig leitt í ljós nákvæma asymptótíska uppbyggingu. Fyrir <strong>fastan aðgerðardag</strong> <code>c</code> birtist affín lotubundni nógu langt út í hala fortíðarinnar.</p>
    <p>Ef</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)=(Y,K,d_K,M,d_M)</code></pre>
    <p>þá eru til fyrir sama <code>c</code> hliðrun <code>H_c</code>, ársbreytingu <code>p_c</code> og nægilega fjarlægt þröskuld, eftir sem</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t-H_c)= (Y-p_c,\ K,\ d_K,\ M,\ d_M)</code></pre>
    <p>hinir fjórir reitirnir endurtaka sig en árnúmerið breytist um fasta stærð.</p>
    <p>Þetta er niðurstaða fyrir fast <code>c</code>; af henni leiðir ekki alþjóðlega sambandið</p>
    <pre class="math-block" dir="ltr" tabindex="0"><code>F(c+T,t+T)=F(c,t)</code></pre>
    <p>Spurningin hvort endanlegar asymptótískar hallatölur séu raunverulega ólíkar milli mismunandi aðgerðardaga er enn opin.</p><hr>
  </section>
</section>

<section class="about-section" id="sauce-history" data-toc-section data-toc-level="2">
  <h2>Fyrir lengra komna: hversu mikla sögu varðveitir sósan?</h2>
  <p>Sósan lítur út eins og mjög árásargjarnt blöndunarkerfi, en algebruleg rannsókn sýnir að hún varðveitir miklu meiri upplýsingar en útlitið gefur til kynna. Þetta er rannsóknarniðurstaða sem dregin er af forskriftinni, ekki ný dagatalsregla.</p>
  <p>Í sýnilegu þrepunum 3–46, á viðeigandi asymptótískri grein, hefur almenn eintækni verið staðfest: í almennu tilviki varðveitir ástandið nægar upplýsingar til að endurgera viðeigandi inntakssögu og skálaröðina.</p>
  <p>Upplýsingarnar hverfa heldur ekki samstundis í 12 lokablöndunum. Fyrir fyrstu fimm blöndurnar eftir 46. sýnilega dropann hefur almennur andhverfanleiki verið staðfestur á viðeigandi kanónísku sammengi án viðbótarupplýsinga; fyrir blöndurnar sem eftir eru þekkjast sterk uppbyggileg efri mörk á því magni viðbótarupplýsinga sem nægir fyrir endurbyggingu.</p>
  <p>Spurningin hvort <strong>aðeins síðustu sex skálarnar</strong> séu alltaf nægjanlegar í almennum skilningi er enn opin.</p>
  <p>Sumar niðurstöður voru sannaðar táknrænt, aðrar lokaðar með endanlegum nákvæmum reikniprófunum. Táknræn styrking minnkaði reiknikjarnann sem þarf að treysta verulega, en eyddi honum ekki alveg.</p>
  <p>Rúm sem virtust í fyrstu krefjast leitar yfir gífurlegan fjölda leiða voru minnkuð niður í miklu minni endanlegar gerðir, þar á meðal sjálfvirk kerfi með 180 og 9 ástandum og samhverfur sex skálanna.</p>
  <p>Undir blönduninni liggur ströng algebruleg uppbygging. Það þarf ekki að þekkja hana til að vita dagsetningu dagsins í dag.</p><hr>
</section>

<section class="about-section" id="summary" data-toc-section data-toc-level="2">
  <h2>Hvað er Pastafari-dagatalið þá í raun?</h2>
  <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
  <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
  <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
  <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>
  <p>Þegar allt kemur til alls þarf dagatal ekki að gera meira en þetta.</p>
</section>
```

</details>


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

<details>
<summary>1113 lines</summary>

```
{
  "id": "./",
  "name": "Pastafari Calendar",
  "name_localized": {
    "he": {
      "value": "לוח השנה הפסטפרי",
      "lang": "he",
      "dir": "rtl"
    },
    "en": {
      "value": "Pastafari Calendar",
      "lang": "en",
      "dir": "ltr"
    },
    "af": {
      "value": "Pastafariese kalender",
      "lang": "af",
      "dir": "ltr"
    },
    "ar": {
      "value": "التقويم الباستافاري",
      "lang": "ar",
      "dir": "rtl"
    },
    "az": {
      "value": "Pastafari Təqvimi",
      "lang": "az",
      "dir": "ltr"
    },
    "be": {
      "value": "Пастафарыянскі каляндар",
      "lang": "be",
      "dir": "ltr"
    },
    "bg": {
      "value": "Пастафариански календар",
      "lang": "bg",
      "dir": "ltr"
    },
    "bn": {
      "value": "পাস্তাফারি ক্যালেন্ডার",
      "lang": "bn",
      "dir": "ltr"
    },
    "bs": {
      "value": "Pastafarijanski kalendar",
      "lang": "bs",
      "dir": "ltr"
    },
    "ca": {
      "value": "Calendari pastafari",
      "lang": "ca",
      "dir": "ltr"
    },
    "cs": {
      "value": "Pastafariánský kalendář",
      "lang": "cs",
      "dir": "ltr"
    },
    "da": {
      "value": "Pastafarisk kalender",
      "lang": "da",
      "dir": "ltr"
    },
    "de": {
      "value": "Pastafarischer Kalender",
      "lang": "de",
      "dir": "ltr"
    },
    "el": {
      "value": "Πασταφαριανό ημερολόγιο",
      "lang": "el",
      "dir": "ltr"
    },
    "eo": {
      "value": "Pastafaria kalendaro",
      "lang": "eo",
      "dir": "ltr"
    },
    "es": {
      "value": "Calendario pastafari",
      "lang": "es",
      "dir": "ltr"
    },
    "et": {
      "value": "Pastafarinen kalender",
      "lang": "et",
      "dir": "ltr"
    },
    "fa": {
      "value": "تقویم پاستافاری",
      "lang": "fa",
      "dir": "rtl"
    },
    "fi": {
      "value": "Pastafarinen kalenteri",
      "lang": "fi",
      "dir": "ltr"
    },
    "fil": {
      "value": "Kalendaryong Pastafari",
      "lang": "fil",
      "dir": "ltr"
    },
    "fo": {
      "value": "Pastafarískt daguratal",
      "lang": "fo",
      "dir": "ltr"
    },
    "fr": {
      "value": "Calendrier pastafari",
      "lang": "fr",
      "dir": "ltr"
    },
    "fy": {
      "value": "Pastafaryske kalinder",
      "lang": "fy",
      "dir": "ltr"
    },
    "gl": {
      "value": "Calendario pastafári",
      "lang": "gl",
      "dir": "ltr"
    },
    "gu": {
      "value": "પાસ્તાફારી કેલેન્ડર",
      "lang": "gu",
      "dir": "ltr"
    },
    "ha": {
      "value": "Kalandar Pastafari",
      "lang": "ha",
      "dir": "ltr"
    },
    "hi": {
      "value": "पास्ताफ़ारी कैलेंडर",
      "lang": "hi",
      "dir": "ltr"
    },
    "hr": {
      "value": "Pastafarijanski kalendar",
      "lang": "hr",
      "dir": "ltr"
    },
    "ht": {
      "value": "Kalandriye pastafari",
      "lang": "ht",
      "dir": "ltr"
    },
    "hu": {
      "value": "Pastafari naptár",
      "lang": "hu",
      "dir": "ltr"
    },
    "hy": {
      "value": "Պաստաֆարիական օրացույց",
      "lang": "hy",
      "dir": "ltr"
    },
    "id": {
      "value": "Kalender Pastafari",
      "lang": "id",
      "dir": "ltr"
    },
    "is": {
      "value": "Pastafari-dagatal",
      "lang": "is",
      "dir": "ltr"
    },
    "it": {
      "value": "Calendario pastafariano",
      "lang": "it",
      "dir": "ltr"
    },
    "ja": {
      "value": "パスタファリ暦",
      "lang": "ja",
      "dir": "ltr"
    },
    "jv": {
      "value": "Tanggalan Pastafari",
      "lang": "jv",
      "dir": "ltr"
    },
    "ka": {
      "value": "პასტაფარიანული კალენდარი",
      "lang": "ka",
      "dir": "ltr"
    },
    "kk": {
      "value": "Пастафари күнтізбесі",
      "lang": "kk",
      "dir": "ltr"
    },
    "ko": {
      "value": "파스타파리 달력",
      "lang": "ko",
      "dir": "ltr"
    },
    "lb": {
      "value": "Pastafarischer Kalenner",
      "lang": "lb",
      "dir": "ltr"
    },
    "lt": {
      "value": "Pastafari kalendorius",
      "lang": "lt",
      "dir": "ltr"
    },
    "lv": {
      "value": "Pastafari kalendārs",
      "lang": "lv",
      "dir": "ltr"
    },
    "mk": {
      "value": "Пастафариански календар",
      "lang": "mk",
      "dir": "ltr"
    },
    "mr": {
      "value": "पास्ताफारी दिनदर्शक",
      "lang": "mr",
      "dir": "ltr"
    },
    "ms": {
      "value": "Kalender Pastafari",
      "lang": "ms",
      "dir": "ltr"
    },
    "nb": {
      "value": "Pastafarisk kalender",
      "lang": "nb",
      "dir": "ltr"
    },
    "ne": {
      "value": "पास्ताफारी पात्रो",
      "lang": "ne",
      "dir": "ltr"
    },
    "nl": {
      "value": "Pastafarische kalender",
      "lang": "nl",
      "dir": "ltr"
    },
    "nn": {
      "value": "Pastafarisk kalender",
      "lang": "nn",
      "dir": "ltr"
    },
    "pa": {
      "value": "ਪਾਸਤਾਫਾਰੀ ਕੈਲੰਡਰ",
      "lang": "pa",
      "dir": "ltr"
    },
    "pl": {
      "value": "Kalendarz pastafariański",
      "lang": "pl",
      "dir": "ltr"
    },
    "pt": {
      "value": "Calendário pastafári",
      "lang": "pt",
      "dir": "ltr"
    },
    "ro": {
      "value": "Calendar pastafarian",
      "lang": "ro",
      "dir": "ltr"
    },
    "ru": {
      "value": "Пастафарианский календарь",
      "lang": "ru",
      "dir": "ltr"
    },
    "sk": {
      "value": "Pastafariánsky kalendár",
      "lang": "sk",
      "dir": "ltr"
    },
    "sl": {
      "value": "Pastafarijanski koledar",
      "lang": "sl",
      "dir": "ltr"
    },
    "so": {
      "value": "Kalandarka Pastafari",
      "lang": "so",
      "dir": "ltr"
    },
    "sq": {
      "value": "Kalendari Pastafarian",
      "lang": "sq",
      "dir": "ltr"
    },
    "sr": {
      "value": "Pastafarijanski kalendar",
      "lang": "sr",
      "dir": "ltr"
    },
    "sv": {
      "value": "Pastafarisk kalender",
      "lang": "sv",
      "dir": "ltr"
    },
    "sw": {
      "value": "Kalenda ya Pastafari",
      "lang": "sw",
      "dir": "ltr"
    },
    "ta": {
      "value": "பாஸ்தாபாரி நாட்காட்டி",
      "lang": "ta",
      "dir": "ltr"
    },
    "te": {
      "value": "పాస్తాఫారి క్యాలెండర్",
      "lang": "te",
      "dir": "ltr"
    },
    "th": {
      "value": "ปฏิทินพาสตาฟารี",
      "lang": "th",
      "dir": "ltr"
    },
    "tr": {
      "value": "Pastafari Takvimi",
      "lang": "tr",
      "dir": "ltr"
    },
    "uk": {
      "value": "Пастафаріанський календар",
      "lang": "uk",
      "dir": "ltr"
    },
    "ur": {
      "value": "پاستافاری کیلنڈر",
      "lang": "ur",
      "dir": "rtl"
    },
    "uz": {
      "value": "Pastafari taqvimi",
      "lang": "uz",
      "dir": "ltr"
    },
    "vi": {
      "value": "Lịch Pastafari",
      "lang": "vi",
      "dir": "ltr"
    },
    "yo": {
      "value": "Kalẹ́ńdà Pastafari",
      "lang": "yo",
      "dir": "ltr"
    },
    "zh": {
      "value": "意面教日历",
      "lang": "zh",
      "dir": "ltr"
    },
    "zu": {
      "value": "Ikhalenda le-Pastafari",
      "lang": "zu",
      "dir": "ltr"
    }
  },
  "short_name": "Pastafari",
  "short_name_localized": {
    "he": {
      "value": "פסטפרי",
      "lang": "he",
      "dir": "rtl"
    },
    "en": {
      "value": "Pastafari",
      "lang": "en",
      "dir": "ltr"
    },
    "af": {
      "value": "Pastafari",
      "lang": "af",
      "dir": "ltr"
    },
    "ar": {
      "value": "Pastafari",
      "lang": "ar",
      "dir": "rtl"
    },
    "az": {
      "value": "Pastafari",
      "lang": "az",
      "dir": "ltr"
    },
    "be": {
      "value": "Pastafari",
      "lang": "be",
      "dir": "ltr"
    },
    "bg": {
      "value": "Pastafari",
      "lang": "bg",
      "dir": "ltr"
    },
    "bn": {
      "value": "Pastafari",
      "lang": "bn",
      "dir": "ltr"
    },
    "bs": {
      "value": "Pastafari",
      "lang": "bs",
      "dir": "ltr"
    },
    "ca": {
      "value": "Pastafari",
      "lang": "ca",
      "dir": "ltr"
    },
    "cs": {
      "value": "Pastafari",
      "lang": "cs",
      "dir": "ltr"
    },
    "da": {
      "value": "Pastafari",
      "lang": "da",
      "dir": "ltr"
    },
    "de": {
      "value": "Pastafari",
      "lang": "de",
      "dir": "ltr"
    },
    "el": {
      "value": "Pastafari",
      "lang": "el",
      "dir": "ltr"
    },
    "eo": {
      "value": "Pastafari",
      "lang": "eo",
      "dir": "ltr"
    },
    "es": {
      "value": "Pastafari",
      "lang": "es",
      "dir": "ltr"
    },
    "et": {
      "value": "Pastafari",
      "lang": "et",
      "dir": "ltr"
    },
    "fa": {
      "value": "Pastafari",
      "lang": "fa",
      "dir": "rtl"
    },
    "fi": {
      "value": "Pastafari",
      "lang": "fi",
      "dir": "ltr"
    },
    "fil": {
      "value": "Pastafari",
      "lang": "fil",
      "dir": "ltr"
    },
    "fo": {
      "value": "Pastafari",
      "lang": "fo",
      "dir": "ltr"
    },
    "fr": {
      "value": "Pastafari",
      "lang": "fr",
      "dir": "ltr"
    },
    "fy": {
      "value": "Pastafari",
      "lang": "fy",
      "dir": "ltr"
    },
    "gl": {
      "value": "Pastafari",
      "lang": "gl",
      "dir": "ltr"
    },
    "gu": {
      "value": "Pastafari",
      "lang": "gu",
      "dir": "ltr"
    },
    "ha": {
      "value": "Pastafari",
      "lang": "ha",
      "dir": "ltr"
    },
    "hi": {
      "value": "Pastafari",
      "lang": "hi",
      "dir": "ltr"
    },
    "hr": {
      "value": "Pastafari",
      "lang": "hr",
      "dir": "ltr"
    },
    "ht": {
      "value": "Pastafari",
      "lang": "ht",
      "dir": "ltr"
    },
    "hu": {
      "value": "Pastafari",
      "lang": "hu",
      "dir": "ltr"
    },
    "hy": {
      "value": "Pastafari",
      "lang": "hy",
      "dir": "ltr"
    },
    "id": {
      "value": "Pastafari",
      "lang": "id",
      "dir": "ltr"
    },
    "is": {
      "value": "Pastafari",
      "lang": "is",
      "dir": "ltr"
    },
    "it": {
      "value": "Pastafari",
      "lang": "it",
      "dir": "ltr"
    },
    "ja": {
      "value": "Pastafari",
      "lang": "ja",
      "dir": "ltr"
    },
    "jv": {
      "value": "Pastafari",
      "lang": "jv",
      "dir": "ltr"
    },
    "ka": {
      "value": "Pastafari",
      "lang": "ka",
      "dir": "ltr"
    },
    "kk": {
      "value": "Pastafari",
      "lang": "kk",
      "dir": "ltr"
    },
    "ko": {
      "value": "Pastafari",
      "lang": "ko",
      "dir": "ltr"
    },
    "lb": {
      "value": "Pastafari",
      "lang": "lb",
      "dir": "ltr"
    },
    "lt": {
      "value": "Pastafari",
      "lang": "lt",
      "dir": "ltr"
    },
    "lv": {
      "value": "Pastafari",
      "lang": "lv",
      "dir": "ltr"
    },
    "mk": {
      "value": "Pastafari",
      "lang": "mk",
      "dir": "ltr"
    },
    "mr": {
      "value": "Pastafari",
      "lang": "mr",
      "dir": "ltr"
    },
    "ms": {
      "value": "Pastafari",
      "lang": "ms",
      "dir": "ltr"
    },
    "nb": {
      "value": "Pastafari",
      "lang": "nb",
      "dir": "ltr"
    },
    "ne": {
      "value": "Pastafari",
      "lang": "ne",
      "dir": "ltr"
    },
    "nl": {
      "value": "Pastafari",
      "lang": "nl",
      "dir": "ltr"
    },
    "nn": {
      "value": "Pastafari",
      "lang": "nn",
      "dir": "ltr"
    },
    "pa": {
      "value": "Pastafari",
      "lang": "pa",
      "dir": "ltr"
    },
    "pl": {
      "value": "Pastafari",
      "lang": "pl",
      "dir": "ltr"
    },
    "pt": {
      "value": "Pastafari",
      "lang": "pt",
      "dir": "ltr"
    },
    "ro": {
      "value": "Pastafari",
      "lang": "ro",
      "dir": "ltr"
    },
    "ru": {
      "value": "Pastafari",
      "lang": "ru",
      "dir": "ltr"
    },
    "sk": {
      "value": "Pastafari",
      "lang": "sk",
      "dir": "ltr"
    },
    "sl": {
      "value": "Pastafari",
      "lang": "sl",
      "dir": "ltr"
    },
    "so": {
      "value": "Pastafari",
      "lang": "so",
      "dir": "ltr"
    },
    "sq": {
      "value": "Pastafari",
      "lang": "sq",
      "dir": "ltr"
    },
    "sr": {
      "value": "Pastafari",
      "lang": "sr",
      "dir": "ltr"
    },
    "sv": {
      "value": "Pastafari",
      "lang": "sv",
      "dir": "ltr"
    },
    "sw": {
      "value": "Pastafari",
      "lang": "sw",
      "dir": "ltr"
    },
    "ta": {
      "value": "Pastafari",
      "lang": "ta",
      "dir": "ltr"
    },
    "te": {
      "value": "Pastafari",
      "lang": "te",
      "dir": "ltr"
    },
    "th": {
      "value": "Pastafari",
      "lang": "th",
      "dir": "ltr"
    },
    "tr": {
      "value": "Pastafari",
      "lang": "tr",
      "dir": "ltr"
    },
    "uk": {
      "value": "Pastafari",
      "lang": "uk",
      "dir": "ltr"
    },
    "ur": {
      "value": "Pastafari",
      "lang": "ur",
      "dir": "rtl"
    },
    "uz": {
      "value": "Pastafari",
      "lang": "uz",
      "dir": "ltr"
    },
    "vi": {
      "value": "Pastafari",
      "lang": "vi",
      "dir": "ltr"
    },
    "yo": {
      "value": "Pastafari",
      "lang": "yo",
      "dir": "ltr"
    },
    "zh": {
      "value": "Pastafari",
      "lang": "zh",
      "dir": "ltr"
    },
    "zu": {
      "value": "Pastafari",
      "lang": "zu",
      "dir": "ltr"
    }
  },
  "description": "A local, deterministic Pastafari calendar.",
  "description_localized": {
    "he": {
      "value": "לוח־שנה פסטפרי לחיפוש ולהשוואת תאריכים",
      "lang": "he",
      "dir": "rtl"
    },
    "en": {
      "value": "A Pastafari calendar with date search and comparison.",
      "lang": "en",
      "dir": "ltr"
    },
    "af": {
      "value": "Een pastafariese kalender met datumsoek en vergelyk.",
      "lang": "af",
      "dir": "ltr"
    },
    "ar": {
      "value": "تقويم باستافاري مع البحث عن التواريخ ومقارنتها.",
      "lang": "ar",
      "dir": "rtl"
    },
    "az": {
      "value": "Tarix arama ve müqayisə özellikli bir Pastafari təqvimi.",
      "lang": "az",
      "dir": "ltr"
    },
    "be": {
      "value": "Пастафарыянскі каляндар із пошуком і параўнаннем дат.",
      "lang": "be",
      "dir": "ltr"
    },
    "bg": {
      "value": "Пастафариански календар с търсенеом и сравнением дат.",
      "lang": "bg",
      "dir": "ltr"
    },
    "bn": {
      "value": "তারিখ খোঁজা ও তুলনাসহ একটি পাস্তাফারি ক্যালেন্ডার।",
      "lang": "bn",
      "dir": "ltr"
    },
    "bs": {
      "value": "Pastafarijanski kalendar s pretraživanjem datuma i usporedbom.",
      "lang": "bs",
      "dir": "ltr"
    },
    "ca": {
      "value": "Un calendari pastafari con cerca y comparació de datas.",
      "lang": "ca",
      "dir": "ltr"
    },
    "cs": {
      "value": "Pastafariánský kalendář s vyhledáváním a porovnáváním dat.",
      "lang": "cs",
      "dir": "ltr"
    },
    "da": {
      "value": "En pastafarisk kalender med datosøgning og sammenligning.",
      "lang": "da",
      "dir": "ltr"
    },
    "de": {
      "value": "Ein pastafarischer Kalender mit Datumssuche und Vergleich.",
      "lang": "de",
      "dir": "ltr"
    },
    "el": {
      "value": "Πασταφαριανό ημερολόγιο με αναζήτηση και σύγκριση ημερομηνιών.",
      "lang": "el",
      "dir": "ltr"
    },
    "eo": {
      "value": "Pastafaria kalendaro kun dato-serĉo kaj komparo.",
      "lang": "eo",
      "dir": "ltr"
    },
    "es": {
      "value": "Un calendario pastafari con búsqueda y comparación de fechas.",
      "lang": "es",
      "dir": "ltr"
    },
    "et": {
      "value": "Pastafarinen kalender kuupäevotsinga ja võrdlusa varten.",
      "lang": "et",
      "dir": "ltr"
    },
    "fa": {
      "value": "تقویم پاستافاری با جست‌وجو و مقایسهٔ تاریخ.",
      "lang": "fa",
      "dir": "rtl"
    },
    "fi": {
      "value": "Pastafarinen kalenteri päivämäärähakua ja vertailua varten.",
      "lang": "fi",
      "dir": "ltr"
    },
    "fil": {
      "value": "Kalendaryong Pastafari na may paghahanap at paghahambing ng petsa.",
      "lang": "fil",
      "dir": "ltr"
    },
    "fo": {
      "value": "En pastafarisk daguratal med dagursetningsøgning og samanbering.",
      "lang": "fo",
      "dir": "ltr"
    },
    "fr": {
      "value": "Un calendrier pastafari avec recherche et comparaison de dates.",
      "lang": "fr",
      "dir": "ltr"
    },
    "fy": {
      "value": "Een pastafaryske kalinder met datumsykje en ferlykje.",
      "lang": "fy",
      "dir": "ltr"
    },
    "gl": {
      "value": "Um calendario pastafári com busca e comparación de datas.",
      "lang": "gl",
      "dir": "ltr"
    },
    "gu": {
      "value": "તારીખ શોધ અને તુલના સાથેનું પાસ્તાફારી કેલેન્ડર.",
      "lang": "gu",
      "dir": "ltr"
    },
    "ha": {
      "value": "Kalandar Pastafari mai neman kwanan wata da kwatantawa.",
      "lang": "ha",
      "dir": "ltr"
    },
    "hi": {
      "value": "तारीख खोज और तुलना वाला पास्ताफ़ारी कैलेंडर।",
      "lang": "hi",
      "dir": "ltr"
    },
    "hr": {
      "value": "Pastafarijanski kalendar s pretraživanjem datuma i usporedbom.",
      "lang": "hr",
      "dir": "ltr"
    },
    "ht": {
      "value": "Un kalandriye pastafari avec rechèch et konparezon de dats.",
      "lang": "ht",
      "dir": "ltr"
    },
    "hu": {
      "value": "Pastafari naptár dátumkereséssel és összehasonlítással.",
      "lang": "hu",
      "dir": "ltr"
    },
    "hy": {
      "value": "Պաստաֆարիական օրացույց՝ ամսաթվի որոնմամբ և համեմատությամբ։",
      "lang": "hy",
      "dir": "ltr"
    },
    "id": {
      "value": "Kalender Pastafari dengan pencarian dan perbandingan tanggal.",
      "lang": "id",
      "dir": "ltr"
    },
    "is": {
      "value": "Pastafari-dagatal með dagsetningarleit og samanburði.",
      "lang": "is",
      "dir": "ltr"
    },
    "it": {
      "value": "Un calendario pastafariano con ricerca e confronto delle date.",
      "lang": "it",
      "dir": "ltr"
    },
    "ja": {
      "value": "日付検索と比較ができるパスタファリ暦です。",
      "lang": "ja",
      "dir": "ltr"
    },
    "jv": {
      "value": "Tanggalan Pastafari dengan panelusuran dan bandhingan tanggal.",
      "lang": "jv",
      "dir": "ltr"
    },
    "ka": {
      "value": "პასტაფარიანული კალენდარი თარიღის ძებნითა და შედარებით.",
      "lang": "ka",
      "dir": "ltr"
    },
    "kk": {
      "value": "Күнді іздеу және салыстыру мүмкіндігі бар Пастафари күнтізбесі.",
      "lang": "kk",
      "dir": "ltr"
    },
    "ko": {
      "value": "날짜 검색과 비교 기능이 있는 파스타파리 달력입니다.",
      "lang": "ko",
      "dir": "ltr"
    },
    "lb": {
      "value": "Ein pastafarischer Kalenner mit Datumssich und Verglach.",
      "lang": "lb",
      "dir": "ltr"
    },
    "lt": {
      "value": "Pastafari kalendorius su datų paieška ir palyginimu.",
      "lang": "lt",
      "dir": "ltr"
    },
    "lv": {
      "value": "Pastafari kalendārs ar datumu meklēšanu un salīdzināšanu.",
      "lang": "lv",
      "dir": "ltr"
    },
    "mk": {
      "value": "Пастафариански календар с пребарувањеом и сравнением дат.",
      "lang": "mk",
      "dir": "ltr"
    },
    "mr": {
      "value": "तारीख शोध आणि तुलना असलेले पास्ताफारी दिनदर्शक.",
      "lang": "mr",
      "dir": "ltr"
    },
    "ms": {
      "value": "Kalender Pastafari dengan carian dan perbandingan tarikh.",
      "lang": "ms",
      "dir": "ltr"
    },
    "nb": {
      "value": "En pastafarisk kalender med datosøk og sammenligning.",
      "lang": "nb",
      "dir": "ltr"
    },
    "ne": {
      "value": "मिति खोज र तुलना भएको पास्ताफारी पात्रो।",
      "lang": "ne",
      "dir": "ltr"
    },
    "nl": {
      "value": "Een pastafarische kalender met datumzoeken en vergelijken.",
      "lang": "nl",
      "dir": "ltr"
    },
    "nn": {
      "value": "En pastafarisk kalender med datosøk og samanlikning.",
      "lang": "nn",
      "dir": "ltr"
    },
    "pa": {
      "value": "ਤਾਰੀਖ ਖੋਜ ਅਤੇ ਤੁਲਨਾ ਵਾਲਾ ਪਾਸਤਾਫਾਰੀ ਕੈਲੰਡਰ।",
      "lang": "pa",
      "dir": "ltr"
    },
    "pl": {
      "value": "Kalendarz pastafariański z wyszukiwaniem i porównywaniem dat.",
      "lang": "pl",
      "dir": "ltr"
    },
    "pt": {
      "value": "Um calendário pastafári com busca e comparação de datas.",
      "lang": "pt",
      "dir": "ltr"
    },
    "ro": {
      "value": "Un calendar pastafarian cu căutare și comparare de date.",
      "lang": "ro",
      "dir": "ltr"
    },
    "ru": {
      "value": "Пастафарианский календарь с поиском и сравнением дат.",
      "lang": "ru",
      "dir": "ltr"
    },
    "sk": {
      "value": "Pastafariánsky kalendár s vyhľadávaním a porovnávaním dátumov.",
      "lang": "sk",
      "dir": "ltr"
    },
    "sl": {
      "value": "Pastafarijanski koledar s iskanjem datuma i usporedbom.",
      "lang": "sl",
      "dir": "ltr"
    },
    "so": {
      "value": "Kalandarka Pastafari oo leh raadinta iyo isbarbardhigga taariikhaha.",
      "lang": "so",
      "dir": "ltr"
    },
    "sq": {
      "value": "Kalendar pastafarian me kërkim dhe krahasim datash.",
      "lang": "sq",
      "dir": "ltr"
    },
    "sr": {
      "value": "Pastafarijanski kalendar s pretraživanjem datuma i usporedbom.",
      "lang": "sr",
      "dir": "ltr"
    },
    "sv": {
      "value": "En pastafarisk kalender med datumsökning och jämförelse.",
      "lang": "sv",
      "dir": "ltr"
    },
    "sw": {
      "value": "Kalenda ya Pastafari yenye utafutaji na ulinganishaji wa tarehe.",
      "lang": "sw",
      "dir": "ltr"
    },
    "ta": {
      "value": "தேதி தேடலும் ஒப்பீடும் கொண்ட பாஸ்தாபாரி நாட்காட்டி.",
      "lang": "ta",
      "dir": "ltr"
    },
    "te": {
      "value": "తేదీ శోధన, పోలికతో కూడిన పాస్తాఫారి క్యాలెండర్.",
      "lang": "te",
      "dir": "ltr"
    },
    "th": {
      "value": "ปฏิทินพาสตาฟารีพร้อมการค้นหาและเปรียบเทียบวันที่",
      "lang": "th",
      "dir": "ltr"
    },
    "tr": {
      "value": "Tarih arama ve karşılaştırma özellikli bir Pastafari takvimi.",
      "lang": "tr",
      "dir": "ltr"
    },
    "uk": {
      "value": "Пастафаріанський календар із пошуком і порівнянням дат.",
      "lang": "uk",
      "dir": "ltr"
    },
    "ur": {
      "value": "تاریخ کی تلاش اور موازنے کے ساتھ پاستافاری کیلنڈر۔",
      "lang": "ur",
      "dir": "rtl"
    },
    "uz": {
      "value": "Sana qidirish va taqqoslash imkoniyatiga ega Pastafari taqvimi.",
      "lang": "uz",
      "dir": "ltr"
    },
    "vi": {
      "value": "Lịch Pastafari có chức năng tìm kiếm và so sánh ngày.",
      "lang": "vi",
      "dir": "ltr"
    },
    "yo": {
      "value": "Kalẹ́ńdà Pastafari pẹ̀lú ìwádìí àti ìfiwé ọjọ́.",
      "lang": "yo",
      "dir": "ltr"
    },
    "zh": {
      "value": "带日期搜索和比较功能的意面教日历。",
      "lang": "zh",
      "dir": "ltr"
    },
    "zu": {
      "value": "Ikhalenda le-Pastafari elinokusesha nokuqhathanisa izinsuku.",
      "lang": "zu",
      "dir": "ltr"
    }
  },
  "lang": "en",
  "dir": "ltr",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#f4f0e7",
  "theme_color": "#672013",
  "icons": [
    {
      "src": "./icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "./icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

</details>


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

```
File too large to read at once (29.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js

<details>
<summary>62 lines</summary>

```
"use strict";

import { LOCALES, getLocale, resolveLocale, translate } from "./registry.js?v=20-about-i18n";

export const LANGUAGE_STORAGE_KEY = "pastafari.language";

function safeReadStorage(storage, key) {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}

function safeWriteStorage(storage, key, value) {
  try { storage?.setItem(key, value); return true; } catch { return false; }
}

export function resolveBrowserLocale({ url = location.href, storage = localStorage, navigatorObject = navigator } = {}) {
  const language = new URL(url).searchParams.get("lang");
  const browserLanguages = Array.isArray(navigatorObject?.languages) && navigatorObject.languages.length
    ? [...navigatorObject.languages]
    : navigatorObject?.language ? [navigatorObject.language] : [];
  return resolveLocale({
    urlLanguage: language,
    savedLanguage: safeReadStorage(storage, LANGUAGE_STORAGE_KEY),
    browserLanguages,
  });
}

export function persistLanguage(code, storage = localStorage) {
  const locale = getLocale(code);
  return safeWriteStorage(storage, LANGUAGE_STORAGE_KEY, locale.code);
}

export function urlWithLanguage(url, code) {
  const locale = getLocale(code);
  const next = new URL(url);
  next.searchParams.set("lang", locale.code);
  return next;
}

export function populateLanguageSelector(select, activeCode) {
  const fragment = document.createDocumentFragment();
  for (const locale of LOCALES) {
    const option = document.createElement("option");
    option.value = locale.code;
    option.textContent = locale.displayName;
    option.lang = locale.code;
    option.dir = locale.dir;
    fragment.append(option);
  }
  select.replaceChildren(fragment);
  select.value = getLocale(activeCode).code;
}

export function applyDocumentLocale(locale, root = document) {
  const documentElement = root.documentElement ?? root.ownerDocument?.documentElement;
  if (!documentElement) throw new TypeError("A document-like root with documentElement is required.");
  documentElement.lang = locale.code;
  documentElement.dir = locale.dir;
  for (const element of root.querySelectorAll("[data-i18n]")) {
    element.textContent = translate(locale, element.dataset.i18n);
  }
  for (const element of root.querySelectorAll("[data-i18n-attr]")) {
    const bindings = element.dataset.i18nAttr.split(";").map((part) => part.trim()).filter(Boolean);
    for (const binding of bindings) {
      const separator = binding.indexOf(":");
      if (separator <= 0) throw new SyntaxError(`Invalid data-i18n-attr binding: ${binding}`);
      const attribute = binding.slice(0, separator).trim();
      const key = binding.slice(separator + 1).trim();
      element.setAttribute(attribute, translate(locale, key));
    }
  }
}
```

</details>


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js

<details>
<summary>170 lines</summary>

```
"use strict";

import {
  loadLocale,
  translate,
} from "../i18n/registry.js?v=20-about-i18n";
import {
  applyDocumentLocale,
  persistLanguage,
  populateLanguageSelector,
  resolveBrowserLocale,
  urlWithLanguage,
} from "../i18n/runtime.js?v=20-about-i18n";
import {
  ARTICLE_FALLBACK_LOCALE,
  resolveArticleLocale,
} from "./content/registry.js?v=5-about-i18n-polish";

const elements = Object.fromEntries(
  [...document.querySelectorAll("[id]")].map((element) => [element.id, element]),
);

let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
let activeArticleCode = null;

function t(key, values = {}) {
  return translate(activeLocale, key, values);
}

function syncCalendarLinks() {
  for (const link of document.querySelectorAll("[data-back-to-calendar]")) {
    link.href = urlWithLanguage(new URL("../", location.href), activeLocale.code);
  }
}

function applyActiveLocale() {
  applyDocumentLocale(activeLocale);
  populateLanguageSelector(elements["language-selector"], activeLocale.code);
  syncCalendarLinks();
}

async function fetchArticle(articleLocale) {
  const url = new URL(articleLocale.asset, import.meta.url);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} while loading ${articleLocale.code}`);
  return response.text();
}

function renderArticle(articleLocale, html) {
  elements["article-content"].innerHTML = html;
  elements["article-content"].lang = articleLocale.lang;
  elements["article-content"].dir = articleLocale.dir;
  activeArticleCode = articleLocale.code;
  updateLanguageNotice(articleLocale.code);
  buildTableOfContents();
  focusHashTarget();
}

async function loadArticleForLocale(localeCode) {
  const requestedArticle = resolveArticleLocale(localeCode);
  if (requestedArticle.code === activeArticleCode && elements["article-content"].childElementCount > 0) {
    updateLanguageNotice(requestedArticle.code);
    buildTableOfContents();
    focusHashTarget();
    return;
  }

  elements["article-content"].setAttribute("aria-busy", "true");
  elements["about-load-error"].hidden = true;

  try {
    let articleLocale = requestedArticle;
    let html;
    try {
      html = await fetchArticle(articleLocale);
    } catch (selectedError) {
      if (articleLocale.code === ARTICLE_FALLBACK_LOCALE) throw selectedError;
      console.warn(`Falling back from article locale ${articleLocale.code} to ${ARTICLE_FALLBACK_LOCALE}.`, selectedError);
      articleLocale = resolveArticleLocale(ARTICLE_FALLBACK_LOCALE);
      html = await fetchArticle(articleLocale);
    }
    renderArticle(articleLocale, html);
  } catch (error) {
    console.error(error);
    elements["article-content"].replaceChildren();
    activeArticleCode = null;
    elements["about-language-notice"].hidden = true;
    elements["about-load-error"].hidden = false;
    elements["about-load-error"].textContent = t("about.loadError");
    elements["about-toc-list"].replaceChildren();
  } finally {
    elements["article-content"].setAttribute("aria-busy", "false");
  }
}

function updateLanguageNotice(articleCode) {
  elements["about-language-notice"].hidden = articleCode === activeLocale.code;
}

function sectionHeading(section) {
  return section.querySelector(":scope > h2, :scope > h3");
}

function buildTableOfContents() {
  const list = elements["about-toc-list"];
  list.replaceChildren();

  const sections = [
    ...elements["article-content"].querySelectorAll("[data-toc-section][id]"),
    elements["site-usage"],
  ];

  for (const section of sections) {
    const heading = sectionHeading(section);
    if (!heading) continue;
    const item = document.createElement("li");
    item.className = `about-toc-level-${section.dataset.tocLevel === "3" ? "3" : "2"}`;
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = heading.textContent.trim();
    if (elements["article-content"].contains(section)) {
      link.lang = elements["article-content"].lang;
      link.dir = elements["article-content"].dir;
    }
    item.append(link);
    list.append(item);
  }
}

function focusHashTarget() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  if (id === "site-usage") elements["site-usage-details"].open = true;
  const containingDetails = target.closest("details");
  if (containingDetails) containingDetails.open = true;
  target.scrollIntoView({ block: "start" });
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

function initializeResponsiveDisclosures() {
  if (matchMedia("(max-width: 860px)").matches) elements["about-toc"].open = false;
}

async function chooseLanguage(code) {
  const locale = await loadLocale(code);
  persistLanguage(locale.code);
  const url = urlWithLanguage(location.href, locale.code);
  history.pushState({ pastafariAbout: true }, "", url);
  activeLocale = locale;
  applyActiveLocale();
  await loadArticleForLocale(locale.code);
}

initializeResponsiveDisclosures();
applyActiveLocale();
await loadArticleForLocale(activeLocale.code);

elements["language-selector"].addEventListener("change", (event) => {
  const select = event.currentTarget;
  const requested = select.value;
  select.disabled = true;
  chooseLanguage(requested)
    .catch((error) => {
      console.error(error);
      populateLanguageSelector(select, activeLocale.code);
    })
    .finally(() => { select.disabled = false; });
});

addEventListener("popstate", () => {
  const resolved = resolveBrowserLocale();
  if (resolved.locale.code === activeLocale.code) {
    focusHashTarget();
    return;
  }
  loadLocale(resolved.locale.code)
    .then(async (locale) => {
      activeLocale = locale;
      applyActiveLocale();
      await loadArticleForLocale(locale.code);
    })
    .catch((error) => console.error(error));
});

addEventListener("hashchange", focusHashTarget);

if ("serviceWorker" in navigator) {
  const registerServiceWorker = () => navigator.serviceWorker.register("../sw.js").catch(() => {});
  if (document.readyState === "complete") registerServiceWorker();
  else addEventListener("load", registerServiceWorker, { once: true });
}
```

</details>


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js

<details>
<summary>1069 lines</summary>

```
"use strict";

import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn,
  getCalendarDefinition,
  jdnToGregorian,
} from "./calendar-converters.js?v=9-canonical-names";
import {
  calendarMonthChoices,
  normalizeCalendarInputValues,
  usesTextualCalendarNumeral,
} from "./calendar-input-conventions.js?v=9-calendar-input-conventions";
import { CUTLETS, MONTHS } from "./i18n/calendar-identifiers.js?v=9-canonical-names";
import { calendarLabel, translate } from "./i18n/registry.js?v=20-about-i18n";
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
```

</details>


---

<sub>9s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js

<details>
<summary>1095 lines</summary>

```
"use strict";

import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn,
  getCalendarDefinition,
  jdnToGregorian,
} from "./calendar-converters.js?v=9-canonical-names";
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
} from "./i18n/registry.js?v=20-about-i18n";
import {
  KISURRA_OBSERVER,
  requestObserverLocation,
  resolveObserverLocation,
  watchObserverPermission,
} from "./observer-location.js?v=10-venus-day-boundary";
import { currentDayAt } from "./venus-day-boundary.js?v=10-venus-day-boundary";
import { createReverseSearchUi } from "./reverse-ui.js?v=21-about-i18n";
import {
  applyDocumentLocale,
  persistLanguage,
  populateLanguageSelector,
  resolveBrowserLocale,
  urlWithLanguage,
} from "./i18n/runtime.js?v=20-about-i18n";


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

function syncAboutLinks() {
  for (const link of document.querySelectorAll("[data-about-link]")) {
    link.href = urlWithLanguage(new URL("./about/", location.href), activeLocale.code);
  }
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
  syncAboutLinks();
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

applyActiveLocale({ rerender: false });

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
```

</details>


---

<sub>30s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

<details>
<summary>518 lines</summary>

```
"use strict";

import { CUTLETS, MONTHS } from "./calendar-identifiers.js?v=9-canonical-names";

export const DEFAULT_LOCALE = "en";
export const SUPPORT_LEVELS = Object.freeze(["complete", "partial", "experimental"]);

const LOCALE_ASSET_REVISION = "19-about-i18n";

function defineLocale(code, displayName, dir, intlLocale, support, loader, aliases = []) {
  const asset = `./locales/${code}.js?v=${LOCALE_ASSET_REVISION}`;
  return Object.freeze({
    code,
    displayName,
    dir,
    intlLocale,
    support,
    aliases: Object.freeze([...aliases]),
    ...(support === "experimental" ? { experimental: true } : {}),
    asset,
    loader,
  });
}

// Lightweight metadata only. Locale resources are loaded on demand by loadLocale().
// support is declared only here; locale source modules must not declare it.
export const LOCALES = Object.freeze([
  defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
  defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
  defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
  defineLocale("ar", "العربية", "rtl", "ar", "partial", () => import("./locales/ar.js?v=19-about-i18n")),
  defineLocale("az", "Azərbaycanca", "ltr", "az-AZ", "partial", () => import("./locales/az.js?v=19-about-i18n")),
  defineLocale("be", "Беларуская", "ltr", "be-BY", "partial", () => import("./locales/be.js?v=19-about-i18n")),
  defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=19-about-i18n")),
  defineLocale("bn", "বাংলা", "ltr", "bn-BD", "partial", () => import("./locales/bn.js?v=19-about-i18n")),
  defineLocale("bs", "Bosanski", "ltr", "bs-BA", "partial", () => import("./locales/bs.js?v=19-about-i18n")),
  defineLocale("ca", "Català", "ltr", "ca-ES", "partial", () => import("./locales/ca.js?v=19-about-i18n")),
  defineLocale("cs", "Čeština", "ltr", "cs-CZ", "partial", () => import("./locales/cs.js?v=19-about-i18n")),
  defineLocale("da", "Dansk", "ltr", "da-DK", "partial", () => import("./locales/da.js?v=19-about-i18n")),
  defineLocale("de", "Deutsch", "ltr", "de-DE", "partial", () => import("./locales/de.js?v=19-about-i18n")),
  defineLocale("el", "Ελληνικά", "ltr", "el-GR", "partial", () => import("./locales/el.js?v=19-about-i18n")),
  defineLocale("eo", "Esperanto", "ltr", "eo", "partial", () => import("./locales/eo.js?v=19-about-i18n")),
  defineLocale("es", "Español", "ltr", "es-ES", "partial", () => import("./locales/es.js?v=19-about-i18n")),
  defineLocale("et", "Eesti", "ltr", "et-EE", "partial", () => import("./locales/et.js?v=19-about-i18n")),
  defineLocale("fa", "فارسی", "rtl", "fa-IR", "partial", () => import("./locales/fa.js?v=19-about-i18n")),
  defineLocale("fi", "Suomi", "ltr", "fi-FI", "partial", () => import("./locales/fi.js?v=19-about-i18n")),
  defineLocale("fil", "Filipino", "ltr", "fil-PH", "partial", () => import("./locales/fil.js?v=19-about-i18n")),
  defineLocale("fo", "Føroyskt", "ltr", "fo-FO", "partial", () => import("./locales/fo.js?v=19-about-i18n")),
  defineLocale("fr", "Français", "ltr", "fr-FR", "partial", () => import("./locales/fr.js?v=19-about-i18n")),
  defineLocale("fy", "Frysk", "ltr", "fy-NL", "partial", () => import("./locales/fy.js?v=19-about-i18n")),
  defineLocale("gl", "Galego", "ltr", "gl-ES", "partial", () => import("./locales/gl.js?v=19-about-i18n")),
  defineLocale("gu", "ગુજરાતી", "ltr", "gu-IN", "partial", () => import("./locales/gu.js?v=19-about-i18n")),
  defineLocale("ha", "Hausa", "ltr", "ha-NG", "partial", () => import("./locales/ha.js?v=19-about-i18n")),
  defineLocale("hi", "हिन्दी", "ltr", "hi-IN", "partial", () => import("./locales/hi.js?v=19-about-i18n")),
  defineLocale("hr", "Hrvatski", "ltr", "hr-HR", "partial", () => import("./locales/hr.js?v=19-about-i18n")),
  defineLocale("ht", "Kreyòl ayisyen", "ltr", "ht-HT", "partial", () => import("./locales/ht.js?v=19-about-i18n")),
  defineLocale("hu", "Magyar", "ltr", "hu-HU", "partial", () => import("./locales/hu.js?v=19-about-i18n")),
  defineLocale("hy", "Հայերեն", "ltr", "hy-AM", "partial", () => import("./locales/hy.js?v=19-about-i18n")),
  defineLocale("id", "Bahasa Indonesia", "ltr", "id-ID", "partial", () => import("./locales/id.js?v=19-about-i18n")),
  defineLocale("is", "Íslenska", "ltr", "is-IS", "partial", () => import("./locales/is.js?v=19-about-i18n")),
  defineLocale("it", "Italiano", "ltr", "it-IT", "partial", () => import("./locales/it.js?v=19-about-i18n")),
  defineLocale("ja", "日本語", "ltr", "ja-JP", "partial", () => import("./locales/ja.js?v=19-about-i18n")),
  defineLocale("jv", "Basa Jawa", "ltr", "jv-ID", "partial", () => import("./locales/jv.js?v=19-about-i18n")),
  defineLocale("ka", "ქართული", "ltr", "ka-GE", "partial", () => import("./locales/ka.js?v=19-about-i18n")),
  defineLocale("kk", "Қазақша", "ltr", "kk-KZ", "partial", () => import("./locales/kk.js?v=19-about-i18n")),
  defineLocale("ko", "한국어", "ltr", "ko-KR", "partial", () => import("./locales/ko.js?v=19-about-i18n")),
  defineLocale("lb", "Lëtzebuergesch", "ltr", "lb-LU", "partial", () => import("./locales/lb.js?v=19-about-i18n")),
  defineLocale("lt", "Lietuvių", "ltr", "lt-LT", "partial", () => import("./locales/lt.js?v=19-about-i18n")),
  defineLocale("lv", "Latviešu", "ltr", "lv-LV", "partial", () => import("./locales/lv.js?v=19-about-i18n")),
  defineLocale("mk", "Македонски", "ltr", "mk-MK", "partial", () => import("./locales/mk.js?v=19-about-i18n")),
  defineLocale("mr", "मराठी", "ltr", "mr-IN", "partial", () => import("./locales/mr.js?v=19-about-i18n")),
  defineLocale("ms", "Bahasa Melayu", "ltr", "ms-MY", "partial", () => import("./locales/ms.js?v=19-about-i18n")),
  defineLocale("nb", "Norsk bokmål", "ltr", "nb-NO", "partial", () => import("./locales/nb.js?v=19-about-i18n")),
  defineLocale("ne", "नेपाली", "ltr", "ne-NP", "partial", () => import("./locales/ne.js?v=19-about-i18n")),
  defineLocale("nl", "Nederlands", "ltr", "nl-NL", "partial", () => import("./locales/nl.js?v=19-about-i18n")),
  defineLocale("nn", "Norsk nynorsk", "ltr", "nn-NO", "partial", () => import("./locales/nn.js?v=19-about-i18n")),
  defineLocale("pa", "ਪੰਜਾਬੀ", "ltr", "pa-IN", "partial", () => import("./locales/pa.js?v=19-about-i18n")),
  defineLocale("pl", "Polski", "ltr", "pl-PL", "partial", () => import("./locales/pl.js?v=19-about-i18n")),
  defineLocale("pt", "Português", "ltr", "pt-BR", "partial", () => import("./locales/pt.js?v=19-about-i18n")),
  defineLocale("ro", "Română", "ltr", "ro-RO", "partial", () => import("./locales/ro.js?v=19-about-i18n")),
  defineLocale("ru", "Русский", "ltr", "ru-RU", "partial", () => import("./locales/ru.js?v=19-about-i18n")),
  defineLocale("sk", "Slovenčina", "ltr", "sk-SK", "partial", () => import("./locales/sk.js?v=19-about-i18n")),
  defineLocale("sl", "Slovenščina", "ltr", "sl-SI", "partial", () => import("./locales/sl.js?v=19-about-i18n")),
  defineLocale("so", "Soomaali", "ltr", "so-SO", "partial", () => import("./locales/so.js?v=19-about-i18n")),
  defineLocale("sq", "Shqip", "ltr", "sq-AL", "partial", () => import("./locales/sq.js?v=19-about-i18n")),
  defineLocale("sr", "Srpski", "ltr", "sr-Latn-RS", "partial", () => import("./locales/sr.js?v=19-about-i18n")),
  defineLocale("sv", "Svenska", "ltr", "sv-SE", "partial", () => import("./locales/sv.js?v=19-about-i18n")),
  defineLocale("sw", "Kiswahili", "ltr", "sw-TZ", "partial", () => import("./locales/sw.js?v=19-about-i18n")),
  defineLocale("ta", "தமிழ்", "ltr", "ta-IN", "partial", () => import("./locales/ta.js?v=19-about-i18n")),
  defineLocale("te", "తెలుగు", "ltr", "te-IN", "partial", () => import("./locales/te.js?v=19-about-i18n")),
  defineLocale("th", "ไทย", "ltr", "th-TH", "partial", () => import("./locales/th.js?v=19-about-i18n")),
  defineLocale("tr", "Türkçe", "ltr", "tr-TR", "partial", () => import("./locales/tr.js?v=19-about-i18n")),
  defineLocale("uk", "Українська", "ltr", "uk-UA", "partial", () => import("./locales/uk.js?v=19-about-i18n")),
  defineLocale("ur", "اردو", "rtl", "ur-PK", "partial", () => import("./locales/ur.js?v=19-about-i18n")),
  defineLocale("uz", "O‘zbekcha", "ltr", "uz-UZ", "partial", () => import("./locales/uz.js?v=19-about-i18n")),
  defineLocale("vi", "Tiếng Việt", "ltr", "vi-VN", "partial", () => import("./locales/vi.js?v=19-about-i18n")),
  defineLocale("yo", "Yorùbá", "ltr", "yo-NG", "partial", () => import("./locales/yo.js?v=19-about-i18n")),
  defineLocale("zh", "简体中文", "ltr", "zh-CN", "partial", () => import("./locales/zh.js?v=19-about-i18n")),
  defineLocale("zu", "isiZulu", "ltr", "zu-ZA", "partial", () => import("./locales/zu.js?v=19-about-i18n")),
]);

function canonicalTag(tag) {
  if (typeof tag !== "string" || tag.trim() === "") return null;
  try {
    return Intl.getCanonicalLocales(tag.trim())[0] ?? null;
  } catch {
    return null;
  }
}

function fallbackTags(tag) {
  const canonical = canonicalTag(tag);
  if (!canonical) return [];
  const withoutExtensions = canonical.split("-u-")[0].split("-x-")[0];
  const parts = withoutExtensions.split("-");
  const candidates = [];
  for (let length = parts.length; length >= 1; length -= 1) {
    candidates.push(parts.slice(0, length).join("-"));
  }
  return [...new Set(candidates.map(canonicalTag).filter(Boolean))];
}

export function validateRegistryMetadata(locales = LOCALES) {
  if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("Locale metadata list must be non-empty.");
  const codes = new Map();
  const aliases = new Map();
  const assets = new Set();

  for (const locale of locales) {
    if (!locale || typeof locale !== "object") throw new TypeError("Locale metadata must be an object.");
    const canonicalCode = canonicalTag(locale.code);
    if (!canonicalCode || canonicalCode !== locale.code) throw new RangeError(`Locale ${String(locale.code)} has a non-canonical code.`);
    if (codes.has(canonicalCode)) throw new RangeError(`Duplicate locale code: ${canonicalCode}.`);
    if (typeof locale.displayName !== "string" || locale.displayName.trim() === "") throw new RangeError(`Locale ${canonicalCode} has no display name.`);
    if (!["ltr", "rtl"].includes(locale.dir)) throw new RangeError(`Locale ${canonicalCode} has invalid direction.`);
    if (!canonicalTag(locale.intlLocale)) throw new RangeError(`Locale ${canonicalCode} has invalid Intl locale.`);
    if (!SUPPORT_LEVELS.includes(locale.support)) throw new RangeError(`Locale ${canonicalCode} has invalid support status ${String(locale.support)}.`);
    if ((locale.experimental === true) !== (locale.support === "experimental")) throw new RangeError(`Locale ${canonicalCode} has inconsistent experimental projection.`);
    if (typeof locale.asset !== "string" || locale.asset === "") throw new RangeError(`Locale ${canonicalCode} has no asset path.`);
    if (assets.has(locale.asset)) throw new RangeError(`Duplicate locale asset: ${locale.asset}.`);
    if (typeof locale.loader !== "function") throw new RangeError(`Locale ${canonicalCode} has no loader.`);
    if (!Array.isArray(locale.aliases)) throw new RangeError(`Locale ${canonicalCode} aliases must be an array.`);
    codes.set(canonicalCode, locale);
    assets.add(locale.asset);
  }

  for (const locale of locales) {
    for (const alias of locale.aliases) {
      const canonicalAlias = canonicalTag(alias);
      if (!canonicalAlias) throw new RangeError(`Locale ${locale.code} has invalid alias ${String(alias)}.`);
      if (codes.has(canonicalAlias)) throw new RangeError(`Alias ${alias} duplicates registered locale code ${canonicalAlias}.`);
      const existing = aliases.get(canonicalAlias);
      if (existing) throw new RangeError(`Alias ${alias} is duplicated by ${existing.code} and ${locale.code}.`);
      aliases.set(canonicalAlias, locale);
    }
  }
  return true;
}

validateRegistryMetadata();

const byCode = new Map(LOCALES.map((locale) => [canonicalTag(locale.code), locale]));
const byAlias = new Map();
for (const locale of LOCALES) {
  for (const alias of locale.aliases) byAlias.set(canonicalTag(alias), locale);
}

const loadedSources = new Map();
const loadedLocales = new Map();
const LOCAL_SOURCE = Symbol("pastafari.i18n.localSource");

export function matchSupportedLocale(tag) {
  for (const candidate of fallbackTags(tag)) {
    const locale = byCode.get(candidate) ?? byAlias.get(candidate);
    if (locale) return locale;
  }
  return null;
}

export function resolveLocale({ urlLanguage = null, savedLanguage = null, browserLanguages = [] } = {}) {
  const urlLocale = matchSupportedLocale(urlLanguage);
  if (urlLocale) return Object.freeze({ locale: urlLocale, source: "url" });

  const savedLocale = matchSupportedLocale(savedLanguage);
  if (savedLocale) return Object.freeze({ locale: savedLocale, source: "saved" });

  for (const language of Array.isArray(browserLanguages) ? browserLanguages : []) {
    const browserLocale = matchSupportedLocale(language);
    if (browserLocale) return Object.freeze({ locale: browserLocale, source: "browser" });
  }

  return Object.freeze({ locale: byCode.get(canonicalTag(DEFAULT_LOCALE)), source: "fallback" });
}

export function getLocale(code) {
  return matchSupportedLocale(code) ?? byCode.get(canonicalTag(DEFAULT_LOCALE));
}

function assertLoadedLocaleMatchesMetadata(resource, metadata) {
  if (!resource || typeof resource !== "object") throw new TypeError(`Locale ${metadata.code} default export must be an object.`);
  if (resource.code !== metadata.code) throw new RangeError(`Locale module ${metadata.code} exports code ${String(resource.code)}.`);
  for (const key of ["displayName", "dir", "intlLocale"]) {
    if (resource[key] !== metadata[key]) throw new RangeError(`Locale ${metadata.code} metadata mismatch for ${key}.`);
  }
  if (Object.prototype.hasOwnProperty.call(resource, "support")) {
    throw new RangeError(`Locale ${metadata.code} must not declare support; the registry is the single source of truth.`);
  }
  if (Object.prototype.hasOwnProperty.call(resource, "experimental") && (resource.experimental === true) !== (metadata.support === "experimental")) {
    throw new RangeError(`Locale ${metadata.code} has stale experimental metadata.`);
  }
  return resource;
}

export function isLocaleLoaded(code) {
  return loadedLocales.has(getLocale(code).code);
}

export async function loadLocaleSource(code) {
  const metadata = getLocale(code);
  const existing = loadedSources.get(metadata.code);
  if (existing) return existing;

  const loading = metadata.loader().then((module) => assertLoadedLocaleMatchesMetadata(module.default, metadata));
  loadedSources.set(metadata.code, loading);
  try {
    return await loading;
  } catch (error) {
    if (loadedSources.get(metadata.code) === loading) loadedSources.delete(metadata.code);
    throw error;
  }
}

export async function loadAllLocaleSources() {
  return Promise.all(LOCALES.map((locale) => loadLocaleSource(locale.code)));
}

function getPath(object, path) {
  return path.split(".").reduce((value, part) => value?.[part], object);
}

function ownRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function assertOptionalRecord(owner, key, localeCode, label) {
  if (!owner || !Object.prototype.hasOwnProperty.call(owner, key)) return;
  const value = owner[key];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new RangeError(`Locale ${localeCode} has invalid ${label} resource group.`);
  }
}

function validateLocaleResourceShape(resource, localeCode) {
  assertOptionalRecord(resource, "messages", localeCode, "messages");
  assertOptionalRecord(resource, "terminology", localeCode, "terminology");
  assertOptionalRecord(resource, "calendar", localeCode, "calendar");
  if (resource?.calendar && typeof resource.calendar === "object" && !Array.isArray(resource.calendar)) {
    assertOptionalRecord(resource.calendar, "cutlets", localeCode, "calendar.cutlets");
    assertOptionalRecord(resource.calendar, "months", localeCode, "calendar.months");
  }
}

function localGroups(resource) {
  return {
    messages: ownRecord(resource?.messages),
    terminology: ownRecord(resource?.terminology),
    cutlets: ownRecord(resource?.calendar?.cutlets),
    months: ownRecord(resource?.calendar?.months),
  };
}

function baselineGroups(resource) {
  const groups = localGroups(resource);
  return {
    messages: Object.keys(groups.messages).sort(),
    terminology: Object.keys(groups.terminology).sort(),
    cutlets: CUTLETS.map(({ id }) => id).sort(),
    months: MONTHS.map(({ id }) => id).sort(),
  };
}

function assertKnownNonEmptyStringValues(localeCode, groupName, values, expectedKeys) {
  const expected = new Set(expectedKeys);
  for (const [key, value] of Object.entries(values)) {
    if (!expected.has(key)) throw new RangeError(`Locale ${localeCode} contains unknown ${groupName} key ${key}.`);
    if (typeof value !== "string" || value.trim() === "") {
      throw new RangeError(`Locale ${localeCode} contains an empty or invalid ${groupName} value for ${key}.`);
    }
  }
}

function missingKeys(values, expectedKeys) {
  return expectedKeys.filter((key) => !Object.prototype.hasOwnProperty.call(values, key));
}

const MESSAGE_PLACEHOLDER_PATTERN = /\{([A-Za-z0-9_.-]+)\}/g;

function messagePlaceholders(template) {
  return [...new Set([...String(template).matchAll(MESSAGE_PLACEHOLDER_PATTERN)].map((match) => match[1]))].sort();
}

function sameStringSet(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function validateMessagePlaceholders(localeCode, messages, englishMessages) {
  for (const [key, value] of Object.entries(messages)) {
    const baseline = englishMessages[key];
    if (typeof baseline !== "string") continue;
    const expected = messagePlaceholders(baseline);
    const actual = messagePlaceholders(value);
    if (!sameStringSet(actual, expected)) {
      throw new RangeError(
        `Locale ${localeCode} has placeholder mismatch for ${key}: expected {${expected.join(", ")}}, received {${actual.join(", ")}}.`,
      );
    }
  }
}

const ALWAYS_LOCAL_MESSAGE_KEYS = Object.freeze([
  "app.title",
  "meta.description",
  "manifest.shortName",
  "manifest.defaultDescription",
]);

export function validateLocaleSourceContract(resource, metadata, englishBaseline) {
  assertLoadedLocaleMatchesMetadata(resource, metadata);
  validateLocaleResourceShape(resource, metadata.code);
  validateLocaleResourceShape(englishBaseline, DEFAULT_LOCALE);
  if (!SUPPORT_LEVELS.includes(metadata.support)) throw new RangeError(`Locale ${metadata.code} has invalid support status.`);
  if (!["ltr", "rtl"].includes(metadata.dir)) throw new RangeError(`Locale ${metadata.code} has invalid direction.`);
  if (!canonicalTag(metadata.intlLocale)) throw new RangeError(`Locale ${metadata.code} has invalid Intl locale.`);

  const expected = baselineGroups(englishBaseline);
  const groups = localGroups(resource);
  for (const groupName of Object.keys(groups)) {
    assertKnownNonEmptyStringValues(metadata.code, groupName, groups[groupName], expected[groupName]);
  }

  validateMessagePlaceholders(metadata.code, groups.messages, localGroups(englishBaseline).messages);

  const requiredManifestMessages = ALWAYS_LOCAL_MESSAGE_KEYS.filter((key) => expected.messages.includes(key));
  const missingManifestMessages = missingKeys(groups.messages, requiredManifestMessages);
  if (missingManifestMessages.length) {
    throw new RangeError(`Locale ${metadata.code} must define manifest-bound messages locally: ${missingManifestMessages.join(", ")}.`);
  }

  if (metadata.support === "complete") {
    for (const groupName of Object.keys(groups)) {
      const missing = missingKeys(groups[groupName], expected[groupName]);
      if (missing.length) throw new RangeError(`Complete locale ${metadata.code} is missing ${groupName}: ${missing.join(", ")}.`);
    }
  }
  return true;
}

function mergeGroup(fallback, local) {
  return Object.freeze({ ...ownRecord(fallback), ...ownRecord(local) });
}

export function materializeLocaleResources(resource, metadata, englishBaseline) {
  validateLocaleSourceContract(resource, metadata, englishBaseline);
  const local = localGroups(resource);
  const fallback = localGroups(englishBaseline);
  const result = {
    ...resource,
    messages: mergeGroup(fallback.messages, local.messages),
    terminology: mergeGroup(fallback.terminology, local.terminology),
    calendar: Object.freeze({
      ...ownRecord(englishBaseline?.calendar),
      ...ownRecord(resource?.calendar),
      cutlets: mergeGroup(fallback.cutlets, local.cutlets),
      months: mergeGroup(fallback.months, local.months),
    }),
  };
  Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
  return Object.freeze(result);
}

function wrapCompleteLocaleSource(resource) {
  const result = { ...resource };
  Object.defineProperty(result, LOCAL_SOURCE, { value: resource, enumerable: false });
  return Object.freeze(result);
}

export async function loadLocale(code) {
  const metadata = getLocale(code);
  const existing = loadedLocales.get(metadata.code);
  if (existing) return existing;

  const loading = (async () => {
    const resource = await loadLocaleSource(metadata.code);
    if (metadata.support === "complete") return wrapCompleteLocaleSource(resource);
    const english = await loadLocaleSource(DEFAULT_LOCALE);
    return materializeLocaleResources(resource, metadata, english);
  })();
  loadedLocales.set(metadata.code, loading);
  try {
    return await loading;
  } catch (error) {
    if (loadedLocales.get(metadata.code) === loading) loadedLocales.delete(metadata.code);
    throw error;
  }
}

export async function loadAllLocales() {
  return Promise.all(LOCALES.map((locale) => loadLocale(locale.code)));
}

export function messageTemplate(locale, key) {
  const template = locale?.messages?.[key];
  if (typeof template !== "string") throw new RangeError(`Missing translation key: ${key}`);
  return template;
}

export function translate(locale, key, values = {}) {
  return messageTemplate(locale, key).replace(MESSAGE_PLACEHOLDER_PATTERN, (match, name) => {
    if (!(name in values)) throw new RangeError(`Missing interpolation value ${name} for ${key}`);
    return String(values[name]);
  });
}

export function calendarLabel(locale, type, index) {
  const identifiers = type === "cutlet" ? CUTLETS : type === "month" ? MONTHS : null;
  if (!identifiers || !Number.isInteger(index) || index < 0 || index >= identifiers.length) {
    throw new RangeError(`Invalid ${type} index.`);
  }
  const table = getPath(locale, `calendar.${type === "cutlet" ? "cutlets" : "months"}`);
  const label = table?.[identifiers[index].id];
  if (typeof label !== "string" || label === "") throw new RangeError(`Missing ${type} label at index ${index}.`);
  return label;
}

const ENGLISH_EQUALITY_ALLOWLIST = Object.freeze(new Set([
  "messages.app.brand",
  "messages.manifest.shortName",
  "messages.manifest.defaultDescription",
  "messages.reverse.error.limitPositive",
  "messages.reverse.error.limitSafeInteger",
  "messages.reverse.error.absoluteDateField",
  "cutlets.lagash",
  "cutlets.palgurash",
  "cutlets.akkad",
  "months.eridu",
  "months.karshumav",
  "months.uruk",
  "months.susa",
  "months.babylon",
]));

function analyzeGroup(local, english, prefix, { checkEnglishLeakage = true } = {}) {
  const expectedKeys = Object.keys(english).sort();
  const localKeys = Object.keys(local).filter((key) => expectedKeys.includes(key)).sort();
  const missing = expectedKeys.filter((key) => !Object.prototype.hasOwnProperty.call(local, key));
  const empty = localKeys.filter((key) => typeof local[key] !== "string" || local[key].trim() === "");
  const unknown = Object.keys(local).filter((key) => !expectedKeys.includes(key)).sort();
  const identicalToEnglish = localKeys.filter((key) => typeof local[key] === "string" && local[key] === english[key]);
  const allowedEnglish = checkEnglishLeakage
    ? identicalToEnglish.filter((key) => ENGLISH_EQUALITY_ALLOWLIST.has(`${prefix}.${key}`))
    : [];
  const suspiciousEnglish = checkEnglishLeakage
    ? identicalToEnglish
      .filter((key) => /[A-Za-z]{3,}/.test(String(local[key])))
      .filter((key) => !ENGLISH_EQUALITY_ALLOWLIST.has(`${prefix}.${key}`))
    : [];
  return {
    total: expectedKeys.length,
    local: localKeys.length,
    fallback: missing.length,
    coverage: expectedKeys.length ? Number(((localKeys.length / expectedKeys.length) * 100).toFixed(2)) : 100,
    missingKeys: missing,
    emptyKeys: empty,
    unknownKeys: unknown,
    identicalToEnglish,
    allowedEnglish,
    suspiciousEnglish,
  };
}

export function auditLocaleResources(locales) {
  if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("Explicitly loaded locale resources are required for audit.");
  const sourceByCode = new Map(locales.map((locale) => {
    const source = locale?.[LOCAL_SOURCE] ?? locale;
    return [source?.code, source];
  }));
  const english = sourceByCode.get(DEFAULT_LOCALE);
  if (!english) throw new RangeError("English baseline locale is required for audit.");
  const englishGroups = localGroups(english);
  const report = [];

  for (const metadata of LOCALES) {
    const source = sourceByCode.get(metadata.code);
    if (!source) throw new RangeError(`Registered locale ${metadata.code} was not supplied for audit.`);
    const groups = localGroups(source);
    const resourceGroups = {
      messages: analyzeGroup(groups.messages, englishGroups.messages, "messages", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      terminology: analyzeGroup(groups.terminology, englishGroups.terminology, "terminology", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      cutlets: analyzeGroup(groups.cutlets, englishGroups.cutlets, "cutlets", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
      months: analyzeGroup(groups.months, englishGroups.months, "months", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
    };

    const groupValues = Object.values(resourceGroups);
    const totalKeys = groupValues.reduce((sum, group) => sum + group.total, 0);
    const localKeys = groupValues.reduce((sum, group) => sum + group.local, 0);
    const fallbackKeys = groupValues.reduce((sum, group) => sum + group.fallback, 0);
    const emptyKeys = groupValues.flatMap((group) => group.emptyKeys);
    const unknownKeys = groupValues.flatMap((group) => group.unknownKeys);
    const coreGroupsPresent = ["messages", "terminology", "cutlets", "months"].every((name) => resourceGroups[name].local > 0);
    const structurallyComplete = fallbackKeys === 0 && emptyKeys.length === 0 && unknownKeys.length === 0;
    const proposedStructuralStatus = structurallyComplete ? "complete-candidate" : coreGroupsPresent ? "partial" : "experimental";

    report.push({
      code: metadata.code,
      canonicalTag: canonicalTag(metadata.code),
      aliases: [...metadata.aliases],
      displayName: metadata.displayName,
      dir: metadata.dir,
      intlLocale: metadata.intlLocale,
      status: metadata.support,
      experimental: metadata.support === "experimental",
      legacyExperimentalDeclared: Object.prototype.hasOwnProperty.call(source, "experimental") ? source.experimental : null,
      totalKeys,
      localKeys,
      fallbackKeys,
      coverage: totalKeys ? Number(((localKeys / totalKeys) * 100).toFixed(2)) : 100,
      resourceGroups,
      proposedStructuralStatus,
    });
  }
  return report;
}

export function validateLocaleResources(locales) {
  if (!Array.isArray(locales) || locales.length === 0) {
    throw new TypeError("Explicitly loaded locale resources are required for validation.");
  }
  const sources = locales.map((locale) => locale?.[LOCAL_SOURCE] ?? locale);
  const sourceByCode = new Map();
  for (const source of sources) {
    if (!source || typeof source !== "object") throw new TypeError("Locale must be an object.");
    if (sourceByCode.has(source.code)) throw new RangeError(`Duplicate loaded locale source ${source.code}.`);
    sourceByCode.set(source.code, source);
  }
  const english = sourceByCode.get(DEFAULT_LOCALE);
  if (!english) throw new RangeError("English baseline locale is required for validation.");
  if (sources.length !== LOCALES.length) throw new RangeError(`Expected ${LOCALES.length} locale resources, received ${sources.length}.`);

  for (const metadata of LOCALES) {
    const source = sourceByCode.get(metadata.code);
    if (!source) throw new RangeError(`Locale ${metadata.code} is registered but its module was not loaded.`);
    validateLocaleSourceContract(source, metadata, english);
  }
  for (const source of sources) {
    if (!matchSupportedLocale(source.code) || !byCode.has(canonicalTag(source.code))) {
      throw new RangeError(`Locale module ${String(source.code)} has no registry entry.`);
    }
  }
  return true;
}

export function validateLocaleInventory(fileNames, locales = LOCALES) {
  if (!Array.isArray(fileNames)) throw new TypeError("Locale file inventory must be an array.");
  const expected = locales.map(({ code }) => `${code}.js`).sort();
  const actual = fileNames.filter((name) => name.endsWith(".js")).sort();
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missingModules = expected.filter((name) => !actualSet.has(name));
  const unregisteredModules = actual.filter((name) => !expectedSet.has(name));
  if (missingModules.length || unregisteredModules.length) {
    const details = [
      missingModules.length ? `missing modules: ${missingModules.join(", ")}` : null,
      unregisteredModules.length ? `unregistered modules: ${unregisteredModules.join(", ")}` : null,
    ].filter(Boolean).join("; ");
    throw new RangeError(`Locale registry/module inventory mismatch (${details}).`);
  }
  return true;
}
```

</details>


---

<sub>30s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js

<details>
<summary>442 lines</summary>

```
"use strict";

export const ARTICLE_FALLBACK_LOCALE = "he";

// Explicit rollout gate: keep false while translated article resources are being added.
// Flip to true only when all registered locales have passed the article-coverage invariant.
export const ARTICLE_ROLLOUT_COMPLETE = true;

export const ARTICLE_LOCALES = Object.freeze({
  "he": Object.freeze({
    code: "he",
    lang: "he-IL",
    dir: "rtl",
    asset: "./content/he.html?v=5-about-i18n-polish",
  }),
  "en": Object.freeze({
    code: "en",
    lang: "en-US",
    dir: "ltr",
    asset: "./content/en.html?v=5-about-i18n-polish",
  }),
  "af": Object.freeze({
    code: "af",
    lang: "af-ZA",
    dir: "ltr",
    asset: "./content/af.html?v=5-about-i18n-polish",
  }),
  "ar": Object.freeze({
    code: "ar",
    lang: "ar",
    dir: "rtl",
    asset: "./content/ar.html?v=5-about-i18n-polish",
  }),
  "az": Object.freeze({
    code: "az",
    lang: "az-AZ",
    dir: "ltr",
    asset: "./content/az.html?v=5-about-i18n-polish",
  }),
  "be": Object.freeze({
    code: "be",
    lang: "be-BY",
    dir: "ltr",
    asset: "./content/be.html?v=5-about-i18n-polish",
  }),
  "bg": Object.freeze({
    code: "bg",
    lang: "bg-BG",
    dir: "ltr",
    asset: "./content/bg.html?v=5-about-i18n-polish",
  }),
  "bn": Object.freeze({
    code: "bn",
    lang: "bn-BD",
    dir: "ltr",
    asset: "./content/bn.html?v=5-about-i18n-polish",
  }),
  "bs": Object.freeze({
    code: "bs",
    lang: "bs-BA",
    dir: "ltr",
    asset: "./content/bs.html?v=5-about-i18n-polish",
  }),
  "ca": Object.freeze({
    code: "ca",
    lang: "ca-ES",
    dir: "ltr",
    asset: "./content/ca.html?v=5-about-i18n-polish",
  }),
  "cs": Object.freeze({
    code: "cs",
    lang: "cs-CZ",
    dir: "ltr",
    asset: "./content/cs.html?v=5-about-i18n-polish",
  }),
  "da": Object.freeze({
    code: "da",
    lang: "da-DK",
    dir: "ltr",
    asset: "./content/da.html?v=5-about-i18n-polish",
  }),
  "de": Object.freeze({
    code: "de",
    lang: "de-DE",
    dir: "ltr",
    asset: "./content/de.html?v=5-about-i18n-polish",
  }),
  "el": Object.freeze({
    code: "el",
    lang: "el-GR",
    dir: "ltr",
    asset: "./content/el.html?v=5-about-i18n-polish",
  }),
  "eo": Object.freeze({
    code: "eo",
    lang: "eo",
    dir: "ltr",
    asset: "./content/eo.html?v=5-about-i18n-polish",
  }),
  "es": Object.freeze({
    code: "es",
    lang: "es-ES",
    dir: "ltr",
    asset: "./content/es.html?v=5-about-i18n-polish",
  }),
  "et": Object.freeze({
    code: "et",
    lang: "et-EE",
    dir: "ltr",
    asset: "./content/et.html?v=5-about-i18n-polish",
  }),
  "fa": Object.freeze({
    code: "fa",
    lang: "fa-IR",
    dir: "rtl",
    asset: "./content/fa.html?v=5-about-i18n-polish",
  }),
  "fi": Object.freeze({
    code: "fi",
    lang: "fi-FI",
    dir: "ltr",
    asset: "./content/fi.html?v=5-about-i18n-polish",
  }),
  "fil": Object.freeze({
    code: "fil",
    lang: "fil-PH",
    dir: "ltr",
    asset: "./content/fil.html?v=5-about-i18n-polish",
  }),
  "fo": Object.freeze({
    code: "fo",
    lang: "fo-FO",
    dir: "ltr",
    asset: "./content/fo.html?v=5-about-i18n-polish",
  }),
  "fr": Object.freeze({
    code: "fr",
    lang: "fr-FR",
    dir: "ltr",
    asset: "./content/fr.html?v=5-about-i18n-polish",
  }),
  "fy": Object.freeze({
    code: "fy",
    lang: "fy-NL",
    dir: "ltr",
    asset: "./content/fy.html?v=5-about-i18n-polish",
  }),
  "gl": Object.freeze({
    code: "gl",
    lang: "gl-ES",
    dir: "ltr",
    asset: "./content/gl.html?v=5-about-i18n-polish",
  }),
  "gu": Object.freeze({
    code: "gu",
    lang: "gu-IN",
    dir: "ltr",
    asset: "./content/gu.html?v=5-about-i18n-polish",
  }),
  "ha": Object.freeze({
    code: "ha",
    lang: "ha-NG",
    dir: "ltr",
    asset: "./content/ha.html?v=5-about-i18n-polish",
  }),
  "hi": Object.freeze({
    code: "hi",
    lang: "hi-IN",
    dir: "ltr",
    asset: "./content/hi.html?v=5-about-i18n-polish",
  }),
  "hr": Object.freeze({
    code: "hr",
    lang: "hr-HR",
    dir: "ltr",
    asset: "./content/hr.html?v=5-about-i18n-polish",
  }),
  "ht": Object.freeze({
    code: "ht",
    lang: "ht-HT",
    dir: "ltr",
    asset: "./content/ht.html?v=5-about-i18n-polish",
  }),
  "hu": Object.freeze({
    code: "hu",
    lang: "hu-HU",
    dir: "ltr",
    asset: "./content/hu.html?v=5-about-i18n-polish",
  }),
  "hy": Object.freeze({
    code: "hy",
    lang: "hy-AM",
    dir: "ltr",
    asset: "./content/hy.html?v=5-about-i18n-polish",
  }),
  "id": Object.freeze({
    code: "id",
    lang: "id-ID",
    dir: "ltr",
    asset: "./content/id.html?v=5-about-i18n-polish",
  }),
  "is": Object.freeze({
    code: "is",
    lang: "is-IS",
    dir: "ltr",
    asset: "./content/is.html?v=5-about-i18n-polish",
  }),
  "it": Object.freeze({
    code: "it",
    lang: "it-IT",
    dir: "ltr",
    asset: "./content/it.html?v=5-about-i18n-polish",
  }),
  "ja": Object.freeze({
    code: "ja",
    lang: "ja-JP",
    dir: "ltr",
    asset: "./content/ja.html?v=5-about-i18n-polish",
  }),
  "jv": Object.freeze({
    code: "jv",
    lang: "jv-ID",
    dir: "ltr",
    asset: "./content/jv.html?v=5-about-i18n-polish",
  }),
  "ka": Object.freeze({
    code: "ka",
    lang: "ka-GE",
    dir: "ltr",
    asset: "./content/ka.html?v=5-about-i18n-polish",
  }),
  "kk": Object.freeze({
    code: "kk",
    lang: "kk-KZ",
    dir: "ltr",
    asset: "./content/kk.html?v=5-about-i18n-polish",
  }),
  "ko": Object.freeze({
    code: "ko",
    lang: "ko-KR",
    dir: "ltr",
    asset: "./content/ko.html?v=5-about-i18n-polish",
  }),
  "lb": Object.freeze({
    code: "lb",
    lang: "lb-LU",
    dir: "ltr",
    asset: "./content/lb.html?v=5-about-i18n-polish",
  }),
  "lt": Object.freeze({
    code: "lt",
    lang: "lt-LT",
    dir: "ltr",
    asset: "./content/lt.html?v=5-about-i18n-polish",
  }),
  "lv": Object.freeze({
    code: "lv",
    lang: "lv-LV",
    dir: "ltr",
    asset: "./content/lv.html?v=5-about-i18n-polish",
  }),
  "mk": Object.freeze({
    code: "mk",
    lang: "mk-MK",
    dir: "ltr",
    asset: "./content/mk.html?v=5-about-i18n-polish",
  }),
  "mr": Object.freeze({
    code: "mr",
    lang: "mr-IN",
    dir: "ltr",
    asset: "./content/mr.html?v=5-about-i18n-polish",
  }),
  "ms": Object.freeze({
    code: "ms",
    lang: "ms-MY",
    dir: "ltr",
    asset: "./content/ms.html?v=5-about-i18n-polish",
  }),
  "nb": Object.freeze({
    code: "nb",
    lang: "nb-NO",
    dir: "ltr",
    asset: "./content/nb.html?v=5-about-i18n-polish",
  }),
  "ne": Object.freeze({
    code: "ne",
    lang: "ne-NP",
    dir: "ltr",
    asset: "./content/ne.html?v=5-about-i18n-polish",
  }),
  "nl": Object.freeze({
    code: "nl",
    lang: "nl-NL",
    dir: "ltr",
    asset: "./content/nl.html?v=5-about-i18n-polish",
  }),
  "nn": Object.freeze({
    code: "nn",
    lang: "nn-NO",
    dir: "ltr",
    asset: "./content/nn.html?v=5-about-i18n-polish",
  }),
  "pa": Object.freeze({
    code: "pa",
    lang: "pa-IN",
    dir: "ltr",
    asset: "./content/pa.html?v=5-about-i18n-polish",
  }),
  "pl": Object.freeze({
    code: "pl",
    lang: "pl-PL",
    dir: "ltr",
    asset: "./content/pl.html?v=5-about-i18n-polish",
  }),
  "pt": Object.freeze({
    code: "pt",
    lang: "pt-BR",
    dir: "ltr",
    asset: "./content/pt.html?v=5-about-i18n-polish",
  }),
  "ro": Object.freeze({
    code: "ro",
    lang: "ro-RO",
    dir: "ltr",
    asset: "./content/ro.html?v=5-about-i18n-polish",
  }),
  "ru": Object.freeze({
    code: "ru",
    lang: "ru-RU",
    dir: "ltr",
    asset: "./content/ru.html?v=5-about-i18n-polish",
  }),
  "sk": Object.freeze({
    code: "sk",
    lang: "sk-SK",
    dir: "ltr",
    asset: "./content/sk.html?v=5-about-i18n-polish",
  }),
  "sl": Object.freeze({
    code: "sl",
    lang: "sl-SI",
    dir: "ltr",
    asset: "./content/sl.html?v=5-about-i18n-polish",
  }),
  "so": Object.freeze({
    code: "so",
    lang: "so-SO",
    dir: "ltr",
    asset: "./content/so.html?v=5-about-i18n-polish",
  }),
  "sq": Object.freeze({
    code: "sq",
    lang: "sq-AL",
    dir: "ltr",
    asset: "./content/sq.html?v=5-about-i18n-polish",
  }),
  "sr": Object.freeze({
    code: "sr",
    lang: "sr-Latn-RS",
    dir: "ltr",
    asset: "./content/sr.html?v=5-about-i18n-polish",
  }),
  "sv": Object.freeze({
    code: "sv",
    lang: "sv-SE",
    dir: "ltr",
    asset: "./content/sv.html?v=5-about-i18n-polish",
  }),
  "sw": Object.freeze({
    code: "sw",
    lang: "sw-TZ",
    dir: "ltr",
    asset: "./content/sw.html?v=5-about-i18n-polish",
  }),
  "ta": Object.freeze({
    code: "ta",
    lang: "ta-IN",
    dir: "ltr",
    asset: "./content/ta.html?v=5-about-i18n-polish",
  }),
  "te": Object.freeze({
    code: "te",
    lang: "te-IN",
    dir: "ltr",
    asset: "./content/te.html?v=5-about-i18n-polish",
  }),
  "th": Object.freeze({
    code: "th",
    lang: "th-TH",
    dir: "ltr",
    asset: "./content/th.html?v=5-about-i18n-polish",
  }),
  "tr": Object.freeze({
    code: "tr",
    lang: "tr-TR",
    dir: "ltr",
    asset: "./content/tr.html?v=5-about-i18n-polish",
  }),
  "uk": Object.freeze({
    code: "uk",
    lang: "uk-UA",
    dir: "ltr",
    asset: "./content/uk.html?v=5-about-i18n-polish",
  }),
  "ur": Object.freeze({
    code: "ur",
    lang: "ur-PK",
    dir: "rtl",
    asset: "./content/ur.html?v=5-about-i18n-polish",
  }),
  "uz": Object.freeze({
    code: "uz",
    lang: "uz-UZ",
    dir: "ltr",
    asset: "./content/uz.html?v=5-about-i18n-polish",
  }),
  "vi": Object.freeze({
    code: "vi",
    lang: "vi-VN",
    dir: "ltr",
    asset: "./content/vi.html?v=5-about-i18n-polish",
  }),
  "yo": Object.freeze({
    code: "yo",
    lang: "yo-NG",
    dir: "ltr",
    asset: "./content/yo.html?v=5-about-i18n-polish",
  }),
  "zh": Object.freeze({
    code: "zh",
    lang: "zh-CN",
    dir: "ltr",
    asset: "./content/zh.html?v=5-about-i18n-polish",
  }),
  "zu": Object.freeze({
    code: "zu",
    lang: "zu-ZA",
    dir: "ltr",
    asset: "./content/zu.html?v=5-about-i18n-polish",
  }),
});

export function resolveArticleLocale(code) {
  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
}
```

</details>


---

<sub>30s</sub>

### `rg`

**"(about\.|reverse\.|guide\.|location\.|date\.|calendar\.|year\.|comparison\.|field\.|calendarInput\.|calendarHelp\.|error\.|loading\.|target\.|footer\.|manifest\.|meta\.)**

""(about\.|reverse\.|guide\.|location\.|date\.|calendar\.|year\.|comparison\.|field\.|calendarInput\.|calendarHelp\.|error\.|loading\.|target\.|footer\.|manifest\.|meta\.)" (docs/i18n/locales/is.js)

<details>
<summary>27 matches</summary>

```
[grep content: 234 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales]

is.js (234 match(es)):
  9:     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.",
  15:     "guide.open": "Hvernig nota ég þennan vef?",
  16:     "guide.openShort": "Hvernig á að nota vefinn",
  17:     "reverse.error.absoluteDateField": "Algilda dagsetningin inniheldur ógildan reit.",
  18:     "reverse.error.limitSafeInteger": "{field} er utan öruggs heiltölusviðs.",
  19:     "reverse.error.limitPositive": "{field} verður að vera jákvætt.",
  21:     "about.open": "Um Pastafari-dagatalið",
  22:     "about.openShort": "Um dagatalið",
  23:     "about.title": "Um Pastafari-dagatalið",
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  ... 210 more match(es) omitted in this file
  255:     "reverse.options.heading": "Leitarmörk",
  256:     "reverse.options.intro": "Skildu mörkin auð ef þú vilt engin mörk nota. Mörk eru aldrei sett í laumi.",
  257:     "reverse.options.maxSolutions": "Stöðva eftir þennan fjölda staðfestra lausna",
  258:     "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnueininga",
  259:     "reverse.options.timeout": "Tímamörk í millisekúndum",
  260:     "reverse.advanced.emptyVariables": "Bættu við að minnsta kosti einni dagsetningarbreytu.",
  261:     "reverse.advanced.emptyConstraints": "Kerfi má vera án skorða, en sérhver breyta sem eftir er verður samt að hafa endanlegt svið.",
  262:     "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
  263:     "reverse.error.range": "Lok sviðs mega ekki vera á undan upphafi þess.",
  264:     "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
  265:     "reverse.error.pastafari": "Sláðu inn alla fimm reiti Pastafari-dagsetningarinnar.",
  266:     "reverse.calendar.label": "Dagatal sem notað er fyrir þessa algildu dagsetningu",
```

</details>


---

<sub>30s</sub>

### `rg`

**"(lang|name|short_name|description|is)"|Pastafari|Calendar|"value": "**

""(lang|name|short_name|description|is)"|Pastafari|Calendar|"value": "" (docs/manifest.webmanifest)

<details>
<summary>27 matches</summary>

```
[grep content: 25 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

manifest.webmanifest (25 match(es)):
  3:   "name": "Pastafari Calendar",
  6:       "value": "לוח השנה הפסטפרי",
  7:       "lang": "he",
  11:       "value": "Pastafari Calendar",
  12:       "lang": "en",
  16:       "value": "Pastafariese kalender",
  17:       "lang": "af",
  21:       "value": "التقويم الباستافاري",
  22:       "lang": "ar",
  26:       "value": "Pastafari Təqvimi",
  27:       "lang": "az",
  31:       "value": "Пастафарыянскі каляндар",
  32:       "lang": "be",
  36:       "value": "Пастафариански календар",
  37:       "lang": "bg",
  41:       "value": "পাস্তাফারি ক্যালেন্ডার",
  42:       "lang": "bn",
  46:       "value": "Pastafarijanski kalendar",
  47:       "lang": "bs",
  51:       "value": "Calendari pastafari",
  52:       "lang": "ca",
  56:       "value": "Pastafariánský kalendář",
  57:       "lang": "cs",
  61:       "value": "Pastafarisk kalender",
  62:       "lang": "da",
```

</details>


---

<sub>30s</sub>

### `rg`

**\b(Short Choice|Wide Choice|Seer|day-id|cold wake|SIMD|Node API|CLI|OpenAPI|HTTP|API|RRULE|JDN|Ayyám-i-Há|Saka|Minguo|Meiji|Taishō|Shōwa|Heisei|Reiwa)\b|[A-Za-z]{4,}**

"\b(Short Choice|Wide Choice|Seer|day-id|cold wake|SIMD|Node API|CLI|OpenAPI|HTTP|API|RRULE|JDN|Ayyám-i-Há|Saka|Minguo|Meiji|Taishō|Shōwa|Heisei|Reiwa)\b|[A-Za-z]{4,}" (docs/i18n/locales/is.js, docs/about/content/is.html)

<details>
<summary>53 matches</summary>

```
[grep content: 240 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/content/is.html (120 match(es)):
  1: <!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
  2: <!-- Section-ID eru hluti af stöðugum opinberum deep-link contract og eru ekki leidd af þýddum fyrirsögnum. -->
  3: <div class="about-section about-lead" id="about-calendar">
  4:   <p>Í frásögn þessa vefs er Pastafari-dagatalið sett fram sem dagatalið þar sem tíminn sjálfur varð til. Hvernig það virkar er þó skilgreint með ströngum og nákvæmum reglum.</p>
  5:   <p>Dagatalið festir ekki einn óbreytanlegan Pastafari-„miða“ á hvern dag. Til að fá dagsetningu þarf tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, þann dag sem spurt er um Pastafari-dagsetningu fyrir.</p>
  6:   <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  7:   <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)</code></pre>
  8:   <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  9:   <p>Þetta er ekki villa. Dagatalið er skilgreint einmitt svona.</p><hr>
  12: <section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  13:   <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  14:   <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  ... 96 more match(es) omitted in this file
  131:   <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
  132:   <p>Lokauppfærslurnar eru <strong>samhliða</strong>: í hverri blöndu eru öll sex nýju gildin reiknuð úr sama gamla ástandinu og aðeins síðan eru allar sex skálarnar uppfærðar í einu.</p>
  133:   <p>Í 12 lokablöndunum er eitt sérstaklega mikilvægt kanónískt atriði. Ef <code>S</code> er summa sex gömlu skálanna og <code>r</code> er númer blöndunnar, reiknar kerfið</p>
  134:   <pre class="math-block" dir="ltr" tabindex="0"><code>R=\operatorname{SAVE}(S+149r)</code></pre>
  135:   <p><code>R</code> er <strong>vistaða summan</strong>. Bæði val á skálaröð og innri uppfærsla blöndunnar nota <code>R</code>, ekki hráu summuna <code>S</code>.</p>
  136:   <p>Eldri útgáfur sem sendu hráu summuna inn í þessa uppfærslu lýsa ekki lengur núverandi kanónískri merkingarfræði. Dæmi sem byggja á gömlu reglunni ætti að telja úrelt þar til þau hafa verið staðfest aftur.</p>
  137:   <p>Eftir blöndurnar heldur svarahringurinn einnig áfram röðinni sem var læst við 46. sýnilega dropann; henni á ekki sjálfkrafa að skipta út fyrir röð síðustu blöndunnar.</p><hr>
  138: </section>
  140: <section class="about-section" id="short-and-wide-choice" data-toc-section data-toc-level="2">
  141:   <h2>Short Choice og Wide Choice</h2>
  142:   <p>Fyrir tiltölulega lítil valrúm er <strong>Short Choice</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
  143:   <p>Fyrir mjög stór valrúm er <strong>Wide Choice</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>

i18n/locales/is.js (120 match(es)):
  1: "use strict";
  3: export default Object.freeze({
  4:   "code": "is",
  5:   "displayName": "Íslenska",
  7:   "intlLocale": "is-IS",
  8:   "messages": {
  9:     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.",
  12:     "app.title": "Pastafari-dagatal",
  13:     "nav.skip": "Fara í dagsetningarleit",
  14:     "app.intro": "Finndu dag í hvaða studdu dagatali sem er, skoðaðu síðan fulla Pastafari-dagsetningu hans og sjáðu hvaða kótelettu hann tilheyrir.",
  ... 96 more match(es) omitted in this file
  111:     "error.reload": "Hlaða aftur",
  112:     "error.timeout": "Útreikningurinn tekur of langan tíma.",
  113:     "error.engineFailed": "Útreikningsvélin bilaði.",
  114:     "error.engineLoadFailed": "Ekki tókst að hlaða útreikningsvélinni.",
  115:     "calendar.toolbarAria": "Flakk milli kótelettna",
  116:     "calendar.previous": "Fyrri kóteletta",
  117:     "calendar.today": "Til baka í dag",
  118:     "calendar.next": "Næsta kóteletta",
  119:     "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
  120:     "calendar.currentCutlet": "Ár {year} · kóteletta",
  121:     "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
  122:     "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
```

</details>


---

<sub>52s</sub>

### `bash` — Failed

**Ber saman íslenskar þýðingar við ensku grunnskrána**

$ python3 -c 'import pathlib,re; root=pathlib.Path("docs/i18n/locales"); pat=re.compile(r"^\s*\"([^\"]+)\":\s*\"([^\"]*)\"",re.M); en=dict(pat.findall((root/"en.js").read_text())); is_=dict(pat.findall((root/"is.js").read_text())); print("missing:", sorted(set(en)-set(is_))); print("same strings:", [(k,v) for k,v in is_.items() if k in en and v==en[k] and re.search(r"[A-Za-z]{3,}",v)])'

```
Permission denied and could not request permission from user
```


---

<sub>52s</sub>

### `rg`

**"is": \{|"lang": "en"|"name":|"description":|"short_name":**

""is": \{|"lang": "en"|"name":|"description":|"short_name":" (docs/manifest.webmanifest)

<details>
<summary>52 matches</summary>

```
[grep content: 10 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

manifest.webmanifest (10 match(es)):
  1- {
  2-   "id": "./",
  3:   "name": "Pastafari Calendar",
  4-   "name_localized": {
  5-     "he": {
  10-     "en": {
  11-       "value": "Pastafari Calendar",
  12:       "lang": "en",
  13-       "dir": "ltr"
  14-     },
  163-       "dir": "ltr"
  164-     },
  165:     "is": {
  166-       "value": "Pastafari-dagatal",
  167-       "lang": "is",
  364-     }
  365-   },
  366:   "short_name": "Pastafari",
  367-   "short_name_localized": {
  368-     "he": {
  373-     "en": {
  374-       "value": "Pastafari",
  375:       "lang": "en",
  376-       "dir": "ltr"
  377-     },
  526-       "dir": "ltr"
  527-     },
  528:     "is": {
  529-       "value": "Pastafari",
  530-       "lang": "is",
  727-     }
  728-   },
  729:   "description": "A local, deterministic Pastafari calendar.",
  730-   "description_localized": {
  731-     "he": {
  736-     "en": {
  737-       "value": "A Pastafari calendar with date search and comparison.",
  738:       "lang": "en",
  739-       "dir": "ltr"
  740-     },
  889-       "dir": "ltr"
  890-     },
  891:     "is": {
  892-       "value": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  893-       "lang": "is",
  1090-     }
  1091-   },
  1092:   "lang": "en",
  1093-   "dir": "ltr",
  1094-   "start_url": "./",
```

</details>


---

<sub>52s</sub>

### `rg`

**Algilda dagsetning|samtvinnaða mánuði|sjálfgefna útgáfan|yfirferð þarf ekki|cold wake|maxSolutions|maxScanned|timeoutMs|Flakk milli kótelettna|Fyrirspurnardag|aðgerðardag|studdu dagatali|fulla Pastafari**

"Algilda dagsetning|samtvinnaða mánuði|sjálfgefna útgáfan|yfirferð þarf ekki|cold wake|maxSolutions|maxScanned|timeoutMs|Flakk milli kótelettna|Fyrirspurnardag|aðgerðardag|studdu dagatali|fulla Pastafari" (docs/i18n/locales/is.js, docs/about/content/is.html, docs/reverse-ui.js)

<details>
<summary>69 matches</summary>

```
[grep content: 65 matches across 3 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

reverse-ui.js (11 match(es)):
  770:       const input = key === "reverse.options.maxScanned"
  773:       if (key !== "reverse.options.maxScanned") {
  785:       maxSolutions: make("reverse.options.maxSolutions"),
  786:       maxScanned: make("reverse.options.maxScanned"),
  787:       timeoutMs: make("reverse.options.timeout"),
  819:     const maxSolutions = positiveLimit(limits.maxSolutions.value, "maxSolutions", { number: true });
  820:     const maxScanned = positiveLimit(limits.maxScanned.value, "maxScanned");
  821:     const timeoutMs = positiveLimit(limits.timeoutMs.value, "timeoutMs", { number: true });
  822:     if (maxSolutions !== null) result.maxSolutions = maxSolutions;
  823:     if (maxScanned !== null) result.maxScanned = maxScanned;
  824:     if (timeoutMs !== null) result.timeoutMs = timeoutMs;

about/content/is.html (21 match(es)):
  5:   <p>Dagatalið festir ekki einn óbreytanlegan Pastafari-„miða“ á hvern dag. Til að fá dagsetningu þarf tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, þann dag sem spurt er um Pastafari-dagsetningu fyrir.</p>
  6:   <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  8:   <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  20:   <h2>Af hverju þarf aðgerðardag?</h2>
  41:   <p>Þegar aðgerðardagurinn og fyrirspurnardagurinn eru sami dagur,</p>
  45:   <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
  151:   <p>Atlasinn var byggður með commit-i vélarinnar <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljón samfellda mánaðarkafla; og meira en 364 milljón færslur frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
  181:   <p>Ástæðan er einföld: ár 5000 verður að innihalda aðgerðardaginn. Lengra ár hefur fleiri daga þar sem það getur verið árið sem inniheldur aðgerðardaginn.</p>
  202:   <p>Ef tveir vilja semja um fund með Pastafari-dagsetningu einni saman verða þeir að minnsta kosti að vera sammála um fimm dagsetningarreiti og aðgerðardaginn sem notaður var í útreikningnum. Betra er að vista aðgerðardaginn sem fast dagauðkenni en sem orðið „í dag“; annars geta tveir reiknað tvö mismunandi dagatöl.</p>
  223:   <p>Þetta er staðbundinn stjarnfræðilegur atburður sem ræðst af staðsetningu. Þessi yfirferð þarf ekki að gerast kl. 00:00, borgaralegt tímabelti ákvarðar það ekki, það færist ekki bara vegna þess að sumartími byrjar eða endar, og Venus þarf ekki að vera sýnileg berum augum.</p>
  229:   <p>Það má prenta Pastafari-dagatalið; aðeins þarf að taka fram fyrir hvaða aðgerðardag það var reiknað. Slíkt dagatal sýnir byggingu tímans frá sjónarhorni þess dags; ef aðgerðardagurinn breytist getur þurft nýtt dagatal. Prentarinn hefur því enn starf.</p>
  238:   <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
  239:   <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
  240:   <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt bil, endurræsing, <code>cold wake</code> og hegðun undir álagi.</p>
  272:   <p>Ef aðgerðardagurinn <code>c</code> er þekktur er öfug umbreyting mjög stranglega takmörkuð. Innan þekkts Pastafari-árs auðkennir</p>
  295:   <p>Ef aðgerðardagurinn er óþekktur er staðan önnur. Sömu fimm gildi geta birst undir mismunandi aðgerðardögum og til eru nákvæm dæmi þar sem sama fulla dagsetning kemur fram í mismunandi fjarlægð frá <code>c</code>.</p>
  296:   <p>Í ári 5000 er jafnvel formerki þessarar fjarlægðar ekki alltaf ákvarðað af fimm gildunum: sama fulla dagsetning getur í einu samhengi verið fyrir aðgerðardaginn en í öðru eftir hann.</p>
  301:     <p>Stærðfræðirannsóknir sem byggja á forskriftinni hafa einnig leitt í ljós nákvæma asymptótíska uppbyggingu. Fyrir <strong>fastan aðgerðardag</strong> <code>c</code> birtist affín lotubundni nógu langt út í hala fortíðarinnar.</p>
  309:     <p>Spurningin hvort endanlegar asymptótískar hallatölur séu raunverulega ólíkar milli mismunandi aðgerðardaga er enn opin.</p><hr>
  326:   <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
  329:   <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>

i18n/locales/is.js (33 match(es)):
  14:     "app.intro": "Finndu dag í hvaða studdu dagatali sem er, skoðaðu síðan fulla Pastafari-dagsetningu hans og sjáðu hvaða kótelettu hann tilheyrir.",
  17:     "reverse.error.absoluteDateField": "Algilda dagsetningin inniheldur ógildan reit.",
  24:     "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
  25:     "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, samtvinnaða mánuði og aðgerðardaginn.",
  30:     "about.fallbackNotice": "Skýringin er ekki enn tiltæk á valda tungumálinu; því er sjálfgefna útgáfan sýnd.",
  33:     "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn var núverandi dagur eru sýndar dagsetningar ekki lengur uppfærðar. Þær verða reiknaðar aftur eftir að þú lokar þessum skilaboðum.",
  45:     "settings.actionCalendarLabel": "Dagatal til að slá inn aðgerðardag",
  46:     "settings.apply": "Nota aðgerðardag",
  51:     "comparison.secondActionLabel": "Dagatal til að slá inn seinni aðgerðardaginn",
  54:     "comparison.heading": "Sömu dagar, tveir aðgerðardagar",
  55:     "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn breytist milli fyrri og seinni dálks.",
  61:     "comparison.invalid": "Seinni aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
  115:     "calendar.toolbarAria": "Flakk milli kótelettna",
  121:     "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
  125:     "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
  144:     "target.context": "Fyrirspurnardagsetning: {targetDate} · aðgerðardagur: {actionDate}",
  152:     "guide.intro": "Vefurinn sýnir fulla Pastafari-dagsetningu fyrir hvaða dag sem er, tekur við leit í mörgum dagatölum og getur á tölvu borið saman áhrif aðgerðardagsins.",
  155:     "guide.2.heading": "Leitaðu í hvaða studdu dagatali sem er",
  160:     "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar því smellur á þá gerir ekkert. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
  162:     "guide.5.body": "Opnaðu „Valkostir fyrir útreikning og samanburð“ undir leitinni. Þar geturðu valið dagatal og slegið inn annan aðgerðardag. Næstu leitir nota hann þar til þú endurstillir á núverandi Pastafari-dag. Þessi háþróaði valkostur er tiltækur án þess að þyngja venjulegu sýnina.",
  164:     "guide.6.body": "Á tölvu virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
  173:     "reverse.intro": "Sláðu inn fulla Pastafari-dagsetningu og skilgreindu aðgerðardag hennar. Leitin fer fram staðbundið á þessu tæki.",
  184:     "reverse.basic.calculationMode": "Hvernig er aðgerðardagurinn skilgreindur?",
  185:     "reverse.basic.calculation.active": "Nota virkan aðgerðardag vefsins",
  189:     "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
  190:     "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
  195:     "reverse.basic.toAdvancedHelp": "Endurkvæmir Pastafari-aðgerðardagar eru settir fram sem breytur og skorður svo hægt sé að lengja keðjuna án tilbúinna dýptarmarka.",
  214:     "reverse.status.stale": "Þessar niðurstöður notuðu fyrri virkan aðgerðardag. Keyrðu leitina aftur til að nota þann núverandi.",
  220:     "reverse.result.target": "Fyrirspurnardagur",
  242:     "reverse.constraint.target": "Fyrirspurnardagsbreyta",
  243:     "reverse.constraint.calculationMode": "Uppruni aðgerðardags",
  257:     "reverse.options.maxSolutions": "Stöðva eftir þennan fjölda staðfestra lausna",
  258:     "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnueininga",
```

</details>


---

<sub>52s</sub>

### `rg`

**\.day-card|\.calendar-toolbar|\.toolbar-actions|\.reverse-mode-tab|\.search-submit|\.about-article|\.masthead|\.guide-grid|\.date-fields|\.calendar-picker|\.site-footer|overflow-wrap|word-break|text-wrap**

"\.day-card|\.calendar-toolbar|\.toolbar-actions|\.reverse-mode-tab|\.search-submit|\.about-article|\.masthead|\.guide-grid|\.date-fields|\.calendar-picker|\.site-footer|overflow-wrap|word-break|text-wrap" (docs/styles.css)

<details>
<summary>70 matches</summary>

```
[grep content: 68 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

styles.css (68 match(es)):
  66: .masthead {
  90:   overflow-wrap: anywhere;
  112: .calendar-picker > span,
  120: .calendar-picker select,
  134: .calendar-picker select,
  191:   overflow-wrap: anywhere;
  214: .calendar-picker,
  221: .date-fields {
  249: .search-submit,
  252: .toolbar-actions button {
  263: .search-submit {
  269: .search-submit:hover,
  270: .toolbar-actions .primary-action:hover { background: #49160e; }
  272: .toolbar-actions button:hover { background: #fff4ee; }
  407:   overflow-wrap: anywhere;
  424: .calendar-toolbar {
  433:   overflow-wrap: anywhere;
  441: .toolbar-actions {
  448: .toolbar-actions .primary-action {
  455: .toolbar-actions button,
  456: .reverse-mode-tab {
  458:   overflow-wrap: anywhere;
  478: .day-card {
  498: .day-card[data-target="true"] {
  514:   overflow-wrap: anywhere;
  523: .day-card[data-target="true"] { grid-template-rows: auto auto auto auto; }
  530:   overflow-wrap: anywhere;
  603:   overflow-wrap: anywhere;
  665: .structure-item strong { overflow-wrap: anywhere; font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif; }
  677: .comparison-shared-day strong, .comparison-shared-day small { display: block; overflow-wrap: anywhere; }
  684:   overflow-wrap: anywhere;
  698: .guide-grid {
  705: .guide-grid article {
  709:   overflow-wrap: anywhere;
  715: .guide-grid h3 { margin: 1.5rem 0 0.6rem; font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif; font-size: 1.35rem; line-height: 1.1; }
  716: .guide-grid p, .guide-note { color: var(--muted); }
  719: .site-footer {
  729: .site-footer p { margin: 0; }
  747:   .search-submit { width: 100%; }
  751:   .masthead { grid-template-columns: 1fr; }
  753:   .calendar-toolbar, .site-footer { align-items: stretch; flex-direction: column; }
  754:   .toolbar-actions { display: grid; grid-template-columns: 1fr 1fr 1fr; }
  755:   .toolbar-actions button { padding-inline: 0.4rem; }
  757:   .guide-grid { grid-template-columns: 1fr; }
  758:   .guide-grid article { min-height: auto; }
  764:   .date-fields { grid-template-columns: 1fr; }
  783:   .day-card, .target-beacon, .comparison-table td, .comparison-table th {
  794:   .day-card[data-target="true"] { border: 6px solid Highlight; outline: 4px solid Highlight; }
  801:   .masthead { grid-template-columns: 1fr; padding-block: 0 1rem; }
  802:   .toolbar-actions, .guide-link, .floating-guide-link, .back-to-calendar, .site-footer, .language-control, .advanced-settings, .search-panel { display: none; }
  808:   .day-card { min-height: 0; break-inside: avoid; border: 1px solid #111; background: white; color: black; box-shadow: none; }
  809:   .day-card[data-target="true"] { border: 3px solid #111; outline: none; box-shadow: none; }
  824: .reverse-mode-tabs {
  834: .reverse-mode-tab {
  844: .reverse-mode-tab[data-active="true"] {
  985: .reverse-solution-fact dd { margin: 0.25rem 0 0; overflow-wrap: anywhere; }
  992: .reverse-relation-row span { min-width: 0; overflow-wrap: anywhere; }
  1005:   .reverse-mode-tabs { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
  1037: .about-masthead .masthead-copy {
  1114: .about-article {
  1224: .about-article bdi[dir="ltr"] {
  1337: .about-article hr {
  1377: .about-site-usage .guide-grid {
  1383: .about-site-usage .guide-grid article {
  1390: .about-site-usage .guide-grid h3 {
  1415: .about-page .site-footer {
  1467:   .about-site-usage .guide-grid {
  1578:   .about-article {
```

</details>


---

<sub>52s</sub>

### `rg`

**"(reverse\.error\.absoluteDateField|reverse\.error\.limitSafeInteger|reverse\.error\.limitPositive|reverse\.calendar\.label|about\.intro|about\.fallbackNotice|date\.aria|comparison\.toggleHelp|comparison\.intro|calendar\.currentCutlet|app\.intro)"**

""(reverse\.error\.absoluteDateField|reverse\.error\.limitSafeInteger|reverse\.error\.limitPositive|reverse\.calendar\.label|about\.intro|about\.fallbackNotice|date\.aria|comparison\.toggleHelp|comparison\.intro|calendar\.currentCutlet|app\.intro)"" (docs/i18n/locales/is.js)

<details>
<summary>11 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:14:    "app.intro": "Finndu dag í hvaða studdu dagatali sem er, skoðaðu síðan fulla Pastafari-dagsetningu hans og sjáðu hvaða kótelettu hann tilheyrir.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:17:    "reverse.error.absoluteDateField": "Algilda dagsetningin inniheldur ógildan reit.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:18:    "reverse.error.limitSafeInteger": "{field} er utan öruggs heiltölusviðs.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:19:    "reverse.error.limitPositive": "{field} verður að vera jákvætt.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:25:    "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, samtvinnaða mánuði og aðgerðardaginn.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:30:    "about.fallbackNotice": "Skýringin er ekki enn tiltæk á valda tungumálinu; því er sjálfgefna útgáfan sýnd.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:50:    "comparison.toggleHelp": "Tiltækt á tölvu. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:55:    "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn breytist milli fyrri og seinni dálks.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:120:    "calendar.currentCutlet": "Ár {year} · kóteletta",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:146:    "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:266:    "reverse.calendar.label": "Dagatal sem notað er fyrir þessa algildu dagsetningu",
```

</details>


---

<sub>52s</sub>

### `rg`

**positiveLimit\(|translationValues|new Set\(\[|aria-label|aria-pressed|data-reverse-key|lang =**

"positiveLimit\(|translationValues|new Set\(\[|aria-label|aria-pressed|data-reverse-key|lang =" (docs/reverse-ui.js, docs/app.js, docs/i18n/runtime.js, docs/about/about.js)

<details>
<summary>18 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js:45:    option.lang = locale.code;
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js:56:  documentElement.lang = locale.code;
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:363:  elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:377:    card.setAttribute("aria-label", dateAria(day));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:567:  cell.setAttribute("aria-label", dateAria(day));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:51:  elements["article-content"].lang = articleLocale.lang;
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:122:      link.lang = elements["article-content"].lang;
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:63:  error.translationValues = Object.freeze({ ...values });
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:67:function positiveLimit(value, fieldName, { number = false } = {}) {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:252:    for (const element of this.root.querySelectorAll("[data-reverse-key]")) {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:535:    for (const element of this.root.querySelectorAll("[data-reverse-key]")) {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:819:    const maxSolutions = positiveLimit(limits.maxSolutions.value, "maxSolutions", { number: true });
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:820:    const maxScanned = positiveLimit(limits.maxScanned.value, "maxScanned");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:821:    const timeoutMs = positiveLimit(limits.timeoutMs.value, "timeoutMs", { number: true });
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:1045:      values: error?.translationValues || {},
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:1099:    this.basicTab.setAttribute("aria-pressed", String(basic));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:1100:    this.advancedTab.setAttribute("aria-pressed", String(!basic));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:1116:    for (const element of this.root.querySelectorAll("[data-reverse-key]")) {
```

</details>


---

<sub>1m 28s</sub>

### `rg`

**<html lang=|<noscript>|lang="en"|lang="he"|data-i18n-attr="content:**

"<html lang=|<noscript>|lang="en"|lang="he"|data-i18n-attr="content:" (docs/index.html, docs/about/index.html)

<details>
<summary>10 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:2:<html lang="en" dir="ltr">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:7:    <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:75:    <noscript>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:77:        <p lang="en" dir="ltr">JavaScript is required to load the explanation and select its language.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:78:        <p lang="he" dir="rtl">נדרש JavaScript כדי לטעון את ההסבר ולבחור את שפתו.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:2:<html lang="en" dir="ltr">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:7:    <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:197:    <noscript>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:199:        <p lang="en" dir="ltr">JavaScript is required to calculate the calendar locally.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:200:        <p lang="he" dir="rtl">נדרש JavaScript מקומי כדי לבצע את החישוב.</p>
```

</details>


---

<sub>1m 28s</sub>

### `rg`

**ARTICLE_FALLBACK_LOCALE|about-language-notice|fallbackNotice|articleLocale.code === ARTICLE_FALLBACK_LOCALE|Falling back from article locale**

"ARTICLE_FALLBACK_LOCALE|about-language-notice|fallbackNotice|articleLocale.code === ARTICLE_FALLBACK_LOCALE|Falling back from article locale" (docs/about/about.js, docs/about/content/registry.js, docs/i18n/locales/is.js)

<details>
<summary>9 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:30:    "about.fallbackNotice": "Skýringin er ekki enn tiltæk á valda tungumálinu; því er sjálfgefna útgáfan sýnd.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js:3:export const ARTICLE_FALLBACK_LOCALE = "he";
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js:445:  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:15:  ARTICLE_FALLBACK_LOCALE,
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:77:      if (articleLocale.code === ARTICLE_FALLBACK_LOCALE) throw selectedError;
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:78:      console.warn(`Falling back from article locale ${articleLocale.code} to ${ARTICLE_FALLBACK_LOCALE}.`, selectedError);
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:79:      articleLocale = resolveArticleLocale(ARTICLE_FALLBACK_LOCALE);
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:87:    elements["about-language-notice"].hidden = true;
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:97:  elements["about-language-notice"].hidden = articleCode === activeLocale.code;
```

</details>


---

<sub>1m 28s</sub>

### `rg`

**cold wake|Short Choice|Wide Choice|commit-i|"about\.intro"|"reverse\.error\.absoluteDateField"|"reverse\.calendar\.label"|"app\.intro"|"comparison\.desktopOnly"|"comparison\.toggleHelp"|"guide\.6\.body"|"target\.context"**

"cold wake|Short Choice|Wide Choice|commit-i|"about\.intro"|"reverse\.error\.absoluteDateField"|"reverse\.calendar\.label"|"app\.intro"|"comparison\.desktopOnly"|"comparison\.toggleHelp"|"guide\.6\.body"|"target\.context"" (docs/about/content/is.html, docs/i18n/locales/is.js)

<details>
<summary>14 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:14:    "app.intro": "Finndu dag í hvaða studdu dagatali sem er, skoðaðu síðan fulla Pastafari-dagsetningu hans og sjáðu hvaða kótelettu hann tilheyrir.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:17:    "reverse.error.absoluteDateField": "Algilda dagsetningin inniheldur ógildan reit.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:25:    "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, samtvinnaða mánuði og aðgerðardaginn.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:50:    "comparison.toggleHelp": "Tiltækt á tölvu. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:60:    "comparison.desktopOnly": "Öll samanburðartaflan er tiltæk á breiðum tölvuskjá.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:144:    "target.context": "Fyrirspurnardagsetning: {targetDate} · aðgerðardagur: {actionDate}",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:164:    "guide.6.body": "Á tölvu virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:266:    "reverse.calendar.label": "Dagatal sem notað er fyrir þessa algildu dagsetningu",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:141:  <h2>Short Choice og Wide Choice</h2>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:142:  <p>Fyrir tiltölulega lítil valrúm er <strong>Short Choice</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:143:  <p>Fyrir mjög stór valrúm er <strong>Wide Choice</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:144:  <p>Wide Choice jafngildir ekki því að mynda óháða og jafnt dreifða grunn-<code>Q</code> tölustafi þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:151:  <p>Atlasinn var byggður með commit-i vélarinnar <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljón samfellda mánaðarkafla; og meira en 364 milljón færslur frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:240:  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt bil, endurræsing, <code>cold wake</code> og hegðun undir álagi.</p>
```

</details>


---

<sub>1m 28s</sub>

### `rg`

**\.toolbar-actions \{|\.toolbar-actions button,|\.day-card \{|\.day-card \.day-line|\.reverse-mode-tab \{|overflow-wrap: anywhere|about-article \{**

"\.toolbar-actions \{|\.toolbar-actions button,|\.day-card \{|\.day-card \.day-line|\.reverse-mode-tab \{|overflow-wrap: anywhere|about-article \{" (docs/styles.css)

<details>
<summary>152 matches</summary>

```
[grep content: 150 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

styles.css (150 match(es)):
  87- h1 {
  88-   max-width: 14ch;
  89-   margin-bottom: 0.8rem;
  90:   overflow-wrap: anywhere;
  91-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  92-   font-size: clamp(2.8rem, 8vw, 7rem);
  93-   font-weight: 700;
  188- .public-guide > h2 {
  189-   max-width: 22ch;
  190-   margin-bottom: 0.7rem;
  191:   overflow-wrap: anywhere;
  192-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  193-   font-size: clamp(2rem, 5vw, 4rem);
  194-   letter-spacing: -0.035em;
  404-   display: block;
  405-   min-width: 0;
  406-   padding: 0.8rem;
  407:   overflow-wrap: anywhere;
  408-   border: 1px solid #a8977d;
  409-   border-radius: 0.7rem;
  410-   background: white;
  430- 
  431- .cutlet-identity h2 {
  432-   margin-bottom: 0.15rem;
  433:   overflow-wrap: anywhere;
  434-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  435-   font-size: clamp(2.2rem, 6vw, 5.2rem);
  436-   line-height: 1;
  438- 
  439- .cutlet-identity p:last-child { margin-bottom: 0; color: var(--muted); }
  440- 
  441: .toolbar-actions {
  442-   display: flex;
  443-   flex-wrap: wrap;
  444-   gap: 0.55rem;
  452- }
  453- 
  454- /* Keep long translated control labels inside responsive grids at high text zoom. */
  455: .toolbar-actions button,
  456: .reverse-mode-tab {
  457-   min-width: 0;
  458:   overflow-wrap: anywhere;
  459- }
  460- 
  461- .browse-note {
  475-   align-items: stretch;
  476- }
  477- 
  478: .day-card {
  479-   position: relative;
  480-   display: grid;
  481-   min-width: 0;
  511-   max-width: 100%;
  512-   margin-bottom: 0.1rem;
  513-   padding: 0.28rem 0.55rem;
  514:   overflow-wrap: anywhere;
  515-   border: 2px solid currentcolor;
  516-   border-radius: 999px;
  517-   background: var(--month-text-bg, var(--month-bg));
  527-   min-width: 0;
  528-   margin: 0;
  529-   padding: 0.42rem 0.55rem;
  530:   overflow-wrap: anywhere;
  531-   border: 2px solid color-mix(in srgb, var(--month-ink) 82%, transparent);
  532-   border-radius: 0.52rem;
  533-   background-color: var(--month-text-bg, var(--month-bg));
  600- 
  601- .year-facts dd {
  602-   margin: 0.35rem 0 0;
  603:   overflow-wrap: anywhere;
  604-   font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  605-   font-size: clamp(1.05rem, 1.7vw, 1.35rem);
  606-   font-weight: 800;
  662- 
  663- .structure-item:last-child { border-bottom: 0; }
  664- .structure-item[data-current="true"] { border-inline-start: 6px solid var(--accent); background: #fff0c2; }
  665: .structure-item strong { overflow-wrap: anywhere; font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif; }
  666- .structure-item span { color: var(--muted); font-size: 0.88rem; line-height: 1.4; }
  667- 
  668- .comparison-workspace { padding-inline: clamp(1rem, 2.5vw, 2rem); }
  674- .comparison-table thead th:first-child { width: 14rem; }
  675- .comparison-table thead th:nth-child(2), .comparison-table thead th:nth-child(3) { width: calc((100% - 14rem) / 2); }
  676- .comparison-shared-day { background: #f3eee4; text-align: start; }
  677: .comparison-shared-day strong, .comparison-shared-day small { display: block; overflow-wrap: anywhere; }
  678- .comparison-shared-day small { margin-top: 0.25rem; color: var(--muted); font-weight: 500; }
  679- .comparison-date-cell { background: #fffdf8; }
  680- .comparison-date-line {
  681-   display: block;
  682-   min-width: 0;
  683-   padding: 0.45rem 0.55rem;
  684:   overflow-wrap: anywhere;
  685-   border: 1px solid #b9ad9b;
  686-   border-radius: 0.45rem;
  687-   background: white;
  706-   min-width: 0;
  707-   min-height: 16rem;
  708-   padding: 1.1rem;
  709:   overflow-wrap: anywhere;
  710-   border-top: 2px solid var(--ink);
  711-   background: #fffaf2;
  712- }
  751-   .masthead { grid-template-columns: 1fr; }
  752-   .language-control { min-width: 0; max-width: 22rem; }
  753-   .calendar-toolbar, .site-footer { align-items: stretch; flex-direction: column; }
  754:   .toolbar-actions { display: grid; grid-template-columns: 1fr 1fr 1fr; }
  755-   .toolbar-actions button { padding-inline: 0.4rem; }
  756-   .beacon-date { grid-template-columns: 1fr; }
  757-   .guide-grid { grid-template-columns: 1fr; }
  805-   h1 { font-size: 2.5rem; }
  806-   .calendar-workspace { padding: 1rem 0 0; }
  807-   .calendar-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.2rem; }
  808:   .day-card { min-height: 0; break-inside: avoid; border: 1px solid #111; background: white; color: black; box-shadow: none; }
  809-   .day-card[data-target="true"] { border: 3px solid #111; outline: none; box-shadow: none; }
  810-   .day-line { border: 1px solid #111; background: white; color: black; box-shadow: none; font-size: 0.72rem; }
  811-   .comparison-scroll { display: block; max-height: none; overflow: visible; }
  831-   background: #f3eee4;
  832- }
  833- 
  834: .reverse-mode-tab {
  835-   min-height: 2.7rem;
  836-   padding: 0.55rem 0.9rem;
  837-   border: 1px solid transparent;
  982- .reverse-solution-facts { display: grid; gap: 0.6rem; margin: 0 0 0.9rem; }
  983- .reverse-solution-fact { min-width: 0; padding: 0.6rem; background: white; border: 1px solid #ded3c2; }
  984- .reverse-solution-fact dt { color: var(--muted); font-size: 0.8rem; font-weight: 800; }
  985: .reverse-solution-fact dd { margin: 0.25rem 0 0; overflow-wrap: anywhere; }
  986- .reverse-solution-fact strong,
  987- .reverse-solution-fact small { display: block; }
  988- .reverse-solution-fact small { margin-top: 0.2rem; color: var(--muted); }
  989- 
  990- .reverse-solution-relations { display: grid; gap: 0.5rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--line); }
  991- .reverse-relation-row { align-items: flex-start; }
  992: .reverse-relation-row span { min-width: 0; overflow-wrap: anywhere; }
  993- 
  994- @media (max-width: 900px) {
  995-   .reverse-pastafari-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  1111-   color: var(--muted);
  1112- }
  1113- 
  1114: .about-article {
  1115-   width: min(100%, 74rem);
  1116-   margin-inline: auto;
  1117- }
  1575-   }
  1576- 
  1577-   .about-shell,
  1578:   .about-article {
  1579-     width: 100%;
  1580-     max-width: none;
  1581-   }
```

</details>


---

<sub>1m 28s</sub>

### `rg`

**defineLocale\("is"|export function materializeLocaleResources|messages: mergeGroup|export const DEFAULT_LOCALE|"name":|"description":|"lang": "en"|"is": \{**

"defineLocale\("is"|export function materializeLocaleResources|messages: mergeGroup|export const DEFAULT_LOCALE|"name":|"description":|"lang": "en"|"is": \{" (docs/i18n/registry.js, docs/manifest.webmanifest)

<details>
<summary>13 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:3:  "name": "Pastafari Calendar",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:12:      "lang": "en",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:165:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:375:      "lang": "en",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:528:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:729:  "description": "A local, deterministic Pastafari calendar.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:738:      "lang": "en",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:891:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:1092:  "lang": "en",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js:5:export const DEFAULT_LOCALE = "en";
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js:60:  defineLocale("is", "Íslenska", "ltr", "is-IS", "partial", () => import("./locales/is.js?v=19-about-i18n")),
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js:362:export function materializeLocaleResources(resource, metadata, englishBaseline) {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js:368:    messages: mergeGroup(fallback.messages, local.messages),
```

</details>


---

<sub>1m 28s</sub>

### `rg`

**\b(aria-label|role=|aria-live|aria-busy|data-i18n-attr|data-i18n=)**

"\b(aria-label|role=|aria-live|aria-busy|data-i18n-attr|data-i18n=)" (docs/index.html, docs/about/index.html)

```
[grep content: 92 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/index.html (30 match(es)):
  7:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
  10:     <title data-i18n="about.title">About the Pastafari Calendar</title>
  18:     <a class="skip-link" href="#article-content" data-i18n="about.skip">Skip to the calendar explanation</a>
  22:           <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
  23:           <h1 data-i18n="about.title">About the Pastafari Calendar</h1>
  24:           <p class="intro" data-i18n="about.intro">How the calendar represents days, years, cutlets, woven months, and the day of working.</p>
  25:           <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
  28:           <label for="language-selector" data-i18n="language.label">Language</label>
  33:       <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>
  37:           <span class="eyebrow" data-i18n="about.tocKicker">On this page</span>
  38:           <span class="about-toc-title" data-i18n="about.toc">Contents</span>
  40:         <nav data-i18n-attr="aria-label:about.toc">
  46:         <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
  47:         <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>
  49:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
  50:           <p class="eyebrow" data-i18n="guide.eyebrow">User guide</p>
  51:           <h2 id="guide-heading" data-i18n="guide.heading">What can you do here, and how?</h2>
  52:           <p class="guide-intro" data-i18n="guide.intro">Search, read, browse, change the day of working, and compare calculations.</p>
  54:             <summary data-i18n="guide.open">How do I use this site?</summary>
  56:               <article><span class="guide-number">01</span><h3 data-i18n="guide.1.heading">Open the site and get today</h3><p data-i18n="guide.1.body">The site immediately determines the current Pastafari day for the active observer location.</p></article>
  57:               <article><span class="guide-number">02</span><h3 data-i18n="guide.2.heading">Search in any available calendar</h3><p data-i18n="guide.2.body">Choose a calendar, fill its fields, and show the date.</p></article>
  58:               <article><span class="guide-number">03</span><h3 data-i18n="guide.3.heading">Read the date</h3><p data-i18n="guide.3.body">Each tile shows the year, cutlet, and month in three lines.</p></article>
  59:               <article><span class="guide-number">04</span><h3 data-i18n="guide.4.heading">Browse without selecting by accident</h3><p data-i18n="guide.4.body">Use the cutlet navigation buttons.</p></article>
  60:               <article><span class="guide-number">05</span><h3 data-i18n="guide.5.heading">Change the day of working</h3><p data-i18n="guide.5.body">Open the calculation options to change it.</p></article>
  61:               <article><span class="guide-number">06</span><h3 data-i18n="guide.6.heading">Compare the same days twice</h3><p data-i18n="guide.6.body">On desktop, align each target day under two calculations.</p></article>
  62:               <article><span class="guide-number">07</span><h3 data-i18n="guide.7.heading">Explore the whole year</h3><p data-i18n="guide.7.body">Below the cutlet, inspect the year's length, cutlets, and woven months.</p></article>
  64:             <p class="guide-note" data-i18n="guide.note">Grid rows are visual only; comparison-table rows deliberately align the same day.</p>
  66:           <a class="back-to-calendar" href="../" data-back-to-calendar data-i18n="guide.back">Back to search and calendar</a>
  71:         <p data-i18n="footer.local">Calculation happens on your device; this site has no user account and no tracking code.</p>
  72:         <p data-i18n="footer.open">The link is public and loads directly, including in a private-browsing window.</p>

index.html (62 match(es)):
  7:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
  10:     <title data-i18n="app.title">Pastafari Calendar</title>
  18:     <a class="skip-link" href="#search-heading" data-i18n="nav.skip">Skip to date search</a>
  22:           <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
  23:           <h1 data-i18n="app.title">Pastafari Calendar</h1>
  24:           <p class="intro" data-i18n="app.intro">Find a day in any available calendar, then see its complete Pastafari date.</p>
  25:           <a class="guide-link" href="./about/" data-about-link data-i18n="about.open">About the calendar</a>
  28:           <label for="language-selector" data-i18n="language.label">Language</label>
  33:       <a class="floating-guide-link" href="./about/" data-about-link data-i18n="about.openShort">About the calendar</a>
  36:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
  38:           <p class="status-kicker" data-i18n="search.kicker">Date search</p>
  39:           <h2 id="search-heading" tabindex="-1" data-i18n="search.heading">Which day would you like to find?</h2>
  40:           <p data-i18n="search.intro">Choose a calendar, enter a date, and select “Show date.”</p>
  44:             <span data-i18n="search.calendarLabel">Calendar used for input</span>
  49:           <p class="form-error" id="target-form-error" role="alert" hidden></p>
  50:           <button class="search-submit" type="submit" data-i18n="search.submit">Show date</button>
  54:           <summary data-i18n="settings.summary">Calculation and comparison options</summary>
  57:               <h3 data-i18n="settings.heading">Change the day of working</h3>
  58:               <p data-i18n="settings.intro">The day of working is the calculation's point of departure.</p>
  62:                 <span data-i18n="settings.actionCalendarLabel">Calendar used to enter the day of working</span>
  67:               <p class="form-error" id="action-form-error" role="alert" hidden></p>
  69:                 <button class="search-submit" type="submit" data-i18n="settings.apply">Apply day of working</button>
  70:                 <button class="secondary-action" type="button" id="reset-action-day" data-i18n="settings.reset">Reset to current Pastafari day</button>
  77:                 <span><strong data-i18n="comparison.toggle">Compare two calculations side by side</strong><small data-i18n="comparison.toggleHelp">Available on desktop.</small></span>
  81:                   <span data-i18n="comparison.secondActionLabel">Calendar used to enter the second day of working</span>
  86:                 <p class="form-error" id="comparison-form-error" role="alert" hidden></p>
  87:                 <button class="search-submit" type="submit" data-i18n="comparison.apply">Update comparison</button>
  94:       <section class="reverse-panel" id="reverse-panel" aria-labelledby="reverse-heading">
  98:       <section class="status-panel" id="loading-panel" aria-labelledby="loading-heading" aria-live="polite" aria-busy="true">
  101:           <p class="status-kicker" data-i18n="loading.kicker">Calculated locally</p>
  102:           <h2 id="loading-heading" data-i18n="loading.title">Finding the cutlet and date…</h2>
  106:       <section class="status-panel error-panel" id="error-panel" aria-labelledby="error-heading" role="alert" hidden>
  107:         <p class="status-kicker" data-i18n="error.kicker">Unable to display the calendar</p>
  108:         <h2 id="error-heading" data-i18n="error.title">The calculation engine did not load</h2>
  110:         <button type="button" id="reload-button" data-i18n="error.reload">Reload</button>
  113:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
  114:         <article class="target-beacon" id="target-beacon" aria-live="polite">
  126:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
  127:             <button type="button" id="previous-cutlet" data-i18n="calendar.previous">Previous cutlet</button>
  128:             <button type="button" class="primary-action" id="today-button" data-i18n="calendar.today">Back to today</button>
  129:             <button type="button" id="next-cutlet" data-i18n="calendar.next">Next cutlet</button>
  133:         <p class="browse-note" id="browse-note" hidden data-i18n="calendar.targetOutside">The searched date is not in the cutlet currently on screen.</p>
  134:         <div class="calendar-grid" id="calendar-grid" role="group"></div>
  136:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
  138:             <p class="status-kicker" data-i18n="year.kicker">Year at a glance</p>
  142:           <p class="year-overview-loading" id="year-overview-loading" data-i18n="year.loading">Building the full year structure…</p>
  146:               <div><dt data-i18n="year.lengthLabel">Year length</dt><dd id="year-length"></dd></div>
  147:               <div><dt data-i18n="year.cutletCountLabel">Cutlets</dt><dd id="year-cutlet-count"></dd></div>
  148:               <div><dt data-i18n="year.monthCountLabel">Months</dt><dd id="year-month-count"></dd></div>
  149:               <div><dt data-i18n="year.rangeLabel">Gregorian span</dt><dd id="year-range"></dd></div>
  153:             <p class="year-explainer" data-i18n="year.monthExplainer">Months are woven independently of cutlets, so a month can appear in many separate runs during the year.</p>
  157:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
  161:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
  168:       <section class="comparison-workspace" id="comparison-workspace" aria-labelledby="comparison-heading" hidden>
  170:           <p class="status-kicker" data-i18n="comparison.kicker">Comparison aligned by day</p>
  171:           <h2 id="comparison-heading" data-i18n="comparison.heading">The same days, two days of working</h2>
  172:           <p data-i18n="comparison.intro">Every row contains the same queried day.</p>
  175:         <div class="comparison-scroll" role="region" tabindex="0" data-i18n-attr="aria-label:comparison.scrollAria">
  179:                 <th scope="col" data-i18n="comparison.sameDay">Day shared by both calculations</th>
  187:         <p class="mobile-comparison-note" data-i18n="comparison.desktopOnly">The full comparison table is available on a wide desktop screen.</p>
  193:         <p data-i18n="footer.local">Calculation happens on your device; there is no user account or tracking code.</p>
  194:         <p data-i18n="footer.open">The link is public and loads directly, including in private browsing.</p>
```


---

<sub>1m 41s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css (lines 390-535)

<details>
<summary>129 lines</summary>

```
  background: var(--ink);
  color: white;
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: 0.035em;
}

.beacon-date {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}

.beacon-line {
  display: block;
  min-width: 0;
  padding: 0.8rem;
  overflow-wrap: anywhere;
  border: 1px solid #a8977d;
  border-radius: 0.7rem;
  background: white;
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 650;
  line-height: 1.35;
}

.beacon-line strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.08em;
  font-variant-numeric: tabular-nums;
}

.beacon-context { margin: 0; color: var(--muted); font-weight: 700; }

.calendar-toolbar {
  display: flex;
  gap: 1.5rem;
  align-items: end;
  justify-content: space-between;
}

.cutlet-identity h2 {
  margin-bottom: 0.15rem;
  overflow-wrap: anywhere;
  font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
  font-size: clamp(2.2rem, 6vw, 5.2rem);
  line-height: 1;
}

.cutlet-identity p:last-child { margin-bottom: 0; color: var(--muted); }

.toolbar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  justify-content: end;
}

.toolbar-actions .primary-action {
  border-color: var(--accent-dark);
  background: var(--accent-dark);
  color: white;
}

/* Keep long translated control labels inside responsive grids at high text zoom. */
.toolbar-actions button,
.reverse-mode-tab {
  min-width: 0;
  overflow-wrap: anywhere;
}

.browse-note {
  margin: 1.25rem 0 0;
  padding: 0.85rem 1rem;
  border-inline-start: 0.4rem solid #9b6b0b;
  background: #fff4d4;
  color: #573e0e;
  font-weight: 750;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: clamp(0.65rem, 1.2vw, 1rem);
  padding-block: 1.5rem 2rem;
  align-items: stretch;
}

.day-card {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 10.5rem;
  padding: 0.85rem;
  grid-template-rows: auto auto auto;
  align-content: stretch;
  gap: 0.48rem;
  overflow: hidden;
  border: 2px solid var(--month-edge);
  border-radius: 0.85rem;
  background-color: var(--month-bg);
  background-image: var(--month-pattern-image, none);
  background-size: var(--month-pattern-size, auto);
  background-repeat: repeat;
  color: var(--month-ink);
  box-shadow: inset 0 1px rgb(255 255 255 / 14%);
}

.day-card[data-target="true"] {
  z-index: 2;
  border: 6px solid white;
  outline: 7px solid var(--ink);
  outline-offset: -1px;
  box-shadow:
    0 0 0 5px var(--accent),
    0 12px 28px rgb(0 0 0 / 40%);
}

.target-badge {
  display: block;
  width: fit-content;
  max-width: 100%;
  margin-bottom: 0.1rem;
  padding: 0.28rem 0.55rem;
  overflow-wrap: anywhere;
  border: 2px solid currentcolor;
  border-radius: 999px;
  background: var(--month-text-bg, var(--month-bg));
  font-size: 0.74rem;
  font-weight: 950;
  line-height: 1.25;
}

.day-card[data-target="true"] { grid-template-rows: auto auto auto auto; }

.day-line {
  display: block;
  min-width: 0;
  margin: 0;
  padding: 0.42rem 0.55rem;
  overflow-wrap: anywhere;
  border: 2px solid color-mix(in srgb, var(--month-ink) 82%, transparent);
  border-radius: 0.52rem;
  background-color: var(--month-text-bg, var(--month-bg));
  color: var(--month-ink);
  box-shadow: 0 2px 7px rgb(0 0 0 / 22%);
```

</details>


---

<sub>2m 26s</sub>

### Copilot

NATIVE_QA_RESULT: FAIL

## Heildarniðurstaða: FAIL

Íslenska útgáfan nær yfir aðalviðmót, dagsetningarleit, aðgerðardag, samanburð, ársyfirlit, öfuga leit, villu- og biðstöður, leiðbeiningar, fót, um-síðu, aðgengismerki og tungumálaskipti. Nokkrar sýnilegar þýðingar eru þó óeðlilegar eða merkingarlega ónákvæmar, og enskur texti getur birst í villum, án JavaScript og í uppsetningarupplýsingum.

## Findings

- **[medium] `docs/i18n/locales/is.js:14` — inngangur að aðalviðmóti.** Núverandi texti: „Finndu dag í hvaða studdu dagatali sem er, skoðaðu síðan fulla Pastafari-dagsetningu hans og sjáðu hvaða kótelettu hann tilheyrir.“ Orðalagið „hvaða studdu dagatali sem er“ er stirðlegt og „fulla … dagsetningu hans“ óskýrt. **Tillaga:** „Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.“

- **[medium] `docs/i18n/locales/is.js:17, 266` — heiti á algildri dagsetningu.** Núverandi textar: „Algilda dagsetningin inniheldur ógildan reit.“ og „Dagatal sem notað er fyrir þessa algildu dagsetningu“. „Algild“ merkir fremur *universal* en *absolute* og „dagsetningin inniheldur … reit“ er óeðlilegt í villuboðum. **Tillaga:** „Dagsetningin inniheldur ógilt gildi.“ og „Veldu dagatal fyrir dagsetninguna.“

- **[medium] `docs/reverse-ui.js:819–821`; `docs/i18n/locales/is.js:18–19` — óþýddir staðgenglar í villum.** Þegar leitarmörk eru ógild eru `maxSolutions`, `maxScanned` eða `timeoutMs` sett beint inn í íslenska villutextann, t.d. „maxSolutions verður að vera jákvætt.“ **Tillaga:** nota þýdd heiti reitanna eða sleppa staðgenglinum, t.d. „Gildið verður að vera jákvæð heiltala.“ og „Gildið er utan öruggs heiltölusviðs.“

- **[medium] `docs/about/content/is.html:223` — ónákvæmt orðalag um stjarnfræðilegan atburð.** Núverandi texti: „Þessi yfirferð þarf ekki að gerast kl. 00:00“. „Yfirferð“ er óskýrt hér og „gerast“ hljómar óeðlilega um atburð. **Tillaga:** „Þessi atburður á sér ekki endilega stað kl. 00:00.“ Endurskoða mætti einnig framhaldið í setningunni til að forðast langa runu aukasetninga.

- **[low] `docs/i18n/locales/is.js:60, 164`; `docs/index.html:77, 187` — „tölva“ er ónákvæmt miðað við hegðun.** Samanburðurinn birtist eftir skjábreidd (`min-width: 1000px`), ekki eftir því hvort tækið er tölva. **Tillaga:** nota „á breiðum skjá“ í hjálpartexta og leiðbeiningum, fremur en „á tölvu“ eða „á breiðum tölvuskjá“.

- **[low] `docs/i18n/locales/is.js:55` — setningagerð í samanburðarlýsingu.** Núverandi texti: „Aðeins aðgerðardagurinn breytist milli fyrri og seinni dálks.“ Orðalagið er stirðlegt. **Tillaga:** „Aðeins aðgerðardagurinn er ólíkur í dálkunum tveimur.“

- **[low] `docs/i18n/locales/is.js:33` — viðvörun um úreltan dag.** „Þar sem aðgerðardagurinn var núverandi dagur eru sýndar dagsetningar ekki lengur uppfærðar“ er stirðlegt og óskýrt. **Tillaga:** „Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar.“

- **[low] `docs/about/content/is.html:151` — beyging tækniorðs.** Núverandi texti: „Atlasinn var byggður með commit-i vélarinnar …“ er óeðlilegur blendingsháttur. **Tillaga:** „Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem tilgreind er í commit-inu …“; varðveita hash-gildið óbreytt.

## Texti á öðru tungumáli og fallback

- **[medium] `docs/index.html:197–200`; `docs/about/index.html:75–78` — `noscript`-texti er ekki íslenskur.** Þegar JavaScript er óvirkt birtast ensk skilaboð og síðan hebresk, en engin íslensk útgáfa. **Tillaga:** hafa íslenskan texta í HTML-fallbackinu, eða tryggja að fallbackið sýni íslensku þegar það á við. Með JavaScript er tungumál síðunnar uppfært í keyrslu.

- **[medium] `docs/i18n/locales/is.js:30`; `docs/about/content/registry.js:3`; `docs/about/about.js:77–79` — tilkynning um fallback segir ekki hvaða útgáfa birtist.** Tilkynningin segir að „sjálfgefna útgáfan“ sé sýnd, en greinin fellur aftur á hebresku (`ARTICLE_FALLBACK_LOCALE = "he"`), ekki sjálfgefið viðmótstungumál. **Tillaga:** „Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.“

- **[low] `docs/about/content/is.html:240` — ensk tækniorðasamband.** `cold wake` birtist inni í `<code>` án íslenskrar skýringar. Þar sem það er sett fram sem tæknilegt orðalag ætti að varðveita það, en bæta við skýringu, t.d. „ræsingu eftir hvíld (`cold wake`)“.

- **Varðveita sem föst heiti:** `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, `day-id`, API-heiti og kóðaliteröl eru ekki talin þýðingarskekkjur. Ekki ætti að þýða þau eingöngu til að fjarlægja ensku.

## Samræmi /about/ við UI

- **[low] `docs/i18n/locales/is.js:25`; `docs/i18n/locales/is.js:152`; `docs/i18n/locales/is.js:153`; `docs/i18n/locales/is.js:164`; `docs/i18n/locales/is.js:153`; `docs/index.html:153` — hugtök um mánuði.** Inngangur um-síðunnar notar „samtvinnaða mánuði“, en UI og megintextinn nota „fléttaðir mánuðir“ og „fléttun“. **Tillaga:** samræma innganginn við „fléttaða mánuði“.

- **[low] `docs/i18n/locales/is.js:144, 220`; `docs/about/content/is.html:5–8` — „fyrirspurnardagur“ og „fyrirspurnardagsetning“ skiptast á.** Um-síðan og niðurstöðumerki nota „fyrirspurnardagur“, en samhengislínan notar „Fyrirspurnardagsetning“. Velja ætti samræmt heiti fyrir daginn og greina það frá dagsetningarframsetningu hans, t.d. „Dagsetning fyrirspurnardags: …“.

## Lýsigögn, ARIA, manifest og fallback

- **[medium] `docs/manifest.webmanifest:3, 729, 1092`; íslensku færslurnar eru á línum 165, 528 og 891.** Stöðluðu gildin fyrir `name`, `description` og `lang` eru á ensku, þótt íslensk gildi séu í `name_localized` og `description_localized`. Ekki er tryggt að vafrar noti þessi viðbótarsvið við uppsetningu forrits. **Tillaga:** útvega tungumálahæft manifest sem notar íslensk stöðluð gildi fyrir íslensku útgáfuna, eða sannreyna sérstaklega stuðning við staðfærðu sviðin í þeim vöfrum sem á að styðja.

- **Rétt virkni staðfest í lestri:** með JavaScript uppfærir `docs/i18n/runtime.js:56–57` `lang` og `dir` skjalsins, þýðir `data-i18n`-texta og setur þýdd `aria-label`-gildi. Greinin fær eigið `lang` og `dir` í `docs/about/about.js:51–52`. Aðgengisheiti og stöðumerki aðalviðmótsins eru tengd þýðingarlyklum eða sett úr íslenskum texta.

- **Fallback-áhætta:** íslenska er skráð sem `partial` í `docs/i18n/registry.js:60`, og `materializeLocaleResources` blandar ensku grunnskránni inn fyrir lykla sem vantar (`docs/i18n/registry.js:362–368`). Það er því áfram mögulegt að vanti íslenskan texta á yfirborði sem bætist við eða er ekki þýtt. Í yfirfarinni lykla- og kóðaflæðisrýni fannst þó ekki annar tiltekinn enskur fallback-texti á keyrandi íslensku yfirborði en sá sem er talinn upp hér.

## Líkleg textatengd UI- og línuskiptaáhætta

- **[low] `docs/i18n/locales/is.js:146`; `docs/styles.css:395–407, 455–458, 478–530`.** ARIA-dagsetningar, samhengislínur og dagareitir geta orðið langir vegna íslenskra samsetninga og langra mánaðar- eða kótelettunafna. CSS leyfir línuskipti, en `overflow-wrap: anywhere` getur skipt orðum á óeðlilegum stöðum þegar reitir verða þröngir. **Tillaga:** fylgjast sérstaklega með löngum nöfnum í þröngum reitum og forgangsraða náttúrulegum línuskilum þar sem hægt er; ekki stytta föst heiti til að komast hjá plássvanda.

Engin sjónræn render-prófun var framkvæmd; UI-áhættan hér er textalegt mat út frá lengd texta og CSS-reglum.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
