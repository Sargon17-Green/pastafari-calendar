# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `5bd2ed47-be4f-474e-9af8-9f1fd7601f7d`  
> - **Started:** 9/26/2026, 5:47:43 PM  
> - **Duration:** 1m 8s  
> - **Exported:** 9/26/2026, 5:48:52 PM  

---

<sub>1s</sub>

### User

# Samskiptareglur fyrir málfræðilegt QA á allri vefsíðunni á móðurmálinu

Þú ert óháður mál- og notendaviðmótsrýnir fyrir staðfærsluna `is-IS` (staðfærslukóði gagnageymslunnar `is`) í Pastafari Calendar.

Öll náttúruleg málleg samskipti í þessari rýnarlotu skulu vera á markmálinu `is-IS`. Ekki svara á ensku, nema þegar þú þarft að vitna í nákvæman texta á röngu tungumáli sem þú finnur sem galla, endurtaka véllesanlegu niðurstöðulínurnar tvær hér að neðan eða nefna bókstafleg tæknileg auðkenni sem ekki má þýða.

Þetta er eingöngu rýni. Ekki breyta, búa til, endurnefna eða eyða skrám í gagnageymslunni. Notaðu aðeins skeljaverkfæri til skoðunar sem breytir engu.

Rýndu ALLA vefsíðuna sem birtist á þessari staðfærslu, ekki aðeins `/about/`. Skoðaðu að minnsta kosti:
- `docs/i18n/locales/is.js` í heild;
- `docs/about/content/is.html` í heild;
- `docs/index.html` og `docs/about/index.html`;
- `docs/manifest.webmanifest`;
- viðeigandi texta-, aðgengis- og varaleiðir í `docs/app.js`, `docs/reverse-ui.js`, `docs/i18n/registry.js`, `docs/i18n/runtime.js` og `docs/about/about.js`;
- aðalviðmótið, dagsetningarleit, stýringar fyrir vinnudag/aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöður, notendaleiðbeiningar, fót síðunnar, lýsigögn/heiti, manifest, ARIA-/aðgengistexta, noscript-/varaleiðir og tungumálaskipti.

Leitaðu sérstaklega að:
1. texta á öðru tungumáli eða óviljandi enskri varastaðfærslu;
2. þýðingarkenndu orðalagi og setningum sem skiljast en eru ekki eðlilegar á markmálinu;
3. vandamálum í málfræði, setningagerð, beygingum, málstigi, greinarmerkjasetningu, stafsetningu og leturfræði;
4. ósamræmdri hugtakanotkun milli `/about/` og notendaviðmótsins;
5. röngum eða vafasömum þýðingum á tæknilegum hugtökum;
6. staðgenglum sem eru notaðir í röngu málfræðilegu eða merkingarlegu hlutverki;
7. röngum lýsigögnum, heitum, ARIA-texta, manifest-, noscript-, varaleiðar- eða aðgengistexta;
8. röngu ritkerfi, textastefnu, BiDi-hegðun eða grunsamlegum texta með blönduðum ritkerfum;
9. líklegri hættu á línuskiptingu, yfirflæði eða þröngum stýringum vegna staðfærðs texta. Þetta er textamiðað áhættumat en kemur ekki í staðinn fyrir sjónrænt QA með birtri vefsíðu.

Kanónískar ófrávíkjanlegar reglur eru bindandi. Ekki leggja til að formúlum, kjötkássum, kóðabókstöfum, API-auðkennum, stöðugum kaflaauðkennum eða raunverulegum kanónískum heitum sé breytt eingöngu til að þýða þau.

Sérregla fyrir manifest: Núverandi staðall fyrir Web App Manifest styður tungumálakort með `*_localized`. Ekki tilkynna sjálfgefna enska `name`, `short_name`, `description`, `lang` eða `dir` sem galla í markmálinu aðeins vegna þess að þau eru varagildi manifestsins. Staðfestu þess í stað að markmálið hafi fullkomnar og réttar færslur fyrir `name_localized`, `short_name_localized` og `description_localized`, með réttu tungumáli og textastefnu, og tilkynntu um færslu markmálsins ef hún vantar, er röng eða ósamræmd.

FYRSTA lína svars þíns VERÐUR að vera nákvæmlega ein af þessum:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þessa einu véllesanlegu línu skaltu aðeins skrifa Markdown-skýrslu á markmálinu. Láttu eftirfarandi koma fram:
- heildarniðurstöðu PASS/FAIL fyrir strangt málfræðilegt QA á allri vefsíðunni;
- allar niðurstöður með alvarleikamerkingunni (critical/high/medium/low), nákvæmri skrá og eins nákvæmri staðsetningu og unnt er, núverandi texta, skýringu og ráðlagðri leiðréttingu;
- sérstakan kafla fyrir texta á röngu tungumáli/varastaðfærslu;
- sérstakan kafla um samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
- sérstakan kafla um lýsigögn/ARIA/manifest/noscript/varaleiðir;
- sérstakan kafla um líklega textadrifna hættu á línuskiptingu;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð og flæði voru skoðuð.

Ekki lýsa þessari lotu sem sjónrænu QA með birtri vefsíðu. Þetta er strangt, óháð og markmálsmiðað málfræðilegt QA á allri vefsíðunni.



---

<sub>3s</sub>

### Copilot

Ég framkvæmi nú óbreytandi yfirferð á öllum tilgreindum staðfærslu-, viðmóts-, aðgengis- og lýsigagnaskrám og ber saman hugtakanotkun milli yfirborða.

---

<sub>3s</sub>

### `glob`

**docs/{i18n/locales/is.js,about/content/is.html,index.html,about/index.html,manifest.webmanifest,app.js,reverse-ui.js,i18n/registry.js,i18n/runtime.js,about/about.js}**

"docs/{i18n/locales/is.js,about/content/is.html,index.html,about/index.html,manifest.webmanifest,app.js,reverse-ui.js,i18n/registry.js,i18n/runtime.js,about/about.js}"

<details>
<summary>10 matches</summary>

```
./docs/about/content/is.html
./docs/about/about.js
./docs/about/index.html
./docs/app.js
./docs/index.html
./docs/manifest.webmanifest
./docs/reverse-ui.js
./docs/i18n/locales/is.js
./docs/i18n/runtime.js
./docs/i18n/registry.js
```

</details>


---

<sub>3s</sub>

### `bash` — Failed

**Check repository state and documentation files**

$ git status --short && printf '\n--- tracked text files ---\n' && find docs -maxdepth 3 -type f | sort | sed -n '1,160p'

```
Permission denied and could not request permission from user
```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

```
File too large to read at once (22.7 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

```
File too large to read at once (33.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

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
        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>5s</sub>

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
        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
      </div>
    </noscript>
  </body>
</html>

```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

```
File too large to read at once (24.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

```
File too large to read at once (29.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>5s</sub>

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

<sub>8s</sub>

### `bash`

**Count review file lines**

$ wc -l docs/i18n/locales/is.js docs/about/content/is.html docs/app.js docs/reverse-ui.js docs/about/about.js docs/index.html docs/about/index.html

<details>
<summary>9 lines</summary>

```
351 docs/i18n/locales/is.js
   331 docs/about/content/is.html
  1185 docs/app.js
  1144 docs/reverse-ui.js
   195 docs/about/about.js
   203 docs/index.html
    81 docs/about/index.html
  3490 total
<shellId: 1 completed with exit code 0>
```

</details>


---

<sub>8s</sub>

### `rg`

**[A-Za-z]{3,}**

"[A-Za-z]{3,}" (docs/i18n/locales/is.js, docs/about/content/is.html)

<details>
<summary>53 matches</summary>

```
[grep content: 632 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/content/is.html (289 match(es)):
  1: <!-- Íslenska útgáfan er skrifuð beint út frá hebreska semantic master; ekkert millimál er notað. -->
  2: <!-- Section-ID eru hluti af stöðugum opinberum deep-link contract og eru ekki leidd af þýddum fyrirsögnum. -->
  3: <div class="about-section about-lead" id="about-calendar">
  4:   <p>Í frásögn þessa vefs er Pastafari-dagatalið sett fram sem dagatalið þar sem tíminn sjálfur varð til. Hvernig það virkar er þó skilgreint með ströngum og nákvæmum reglum.</p>
  5:   <p>Dagatalið festir ekki einn óbreytanlegan Pastafari-„miða“ á hvern dag. Til að fá dagsetningu þarf tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, þann dag sem spurt er um Pastafari-dagsetningu fyrir.</p>
  6:   <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  7:   <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)</code></pre>
  8:   <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  9:   <p>Þetta er ekki villa. Dagatalið er skilgreint einmitt svona.</p><hr>
  10: </div>
  12: <section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  13:   <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  ... 265 more match(es) omitted in this file
  319:   <p>Sumar niðurstöður voru sannaðar táknrænt, aðrar lokaðar með endanlegum nákvæmum reikniprófunum. Táknræn styrking minnkaði reiknikjarnann sem þarf að treysta verulega, en eyddi honum ekki alveg.</p>
  320:   <p>Rúm sem virtust í fyrstu krefjast leitar yfir gífurlegan fjölda leiða voru minnkuð niður í miklu minni endanlegar gerðir, þar á meðal sjálfvirk kerfi með 180 og 9 ástandum og samhverfur sex skálanna.</p>
  321:   <p>Undir blönduninni liggur ströng algebruleg uppbygging. Það þarf ekki að þekkja hana til að vita dagsetningu dagsins í dag.</p><hr>
  322: </section>
  324: <section class="about-section" id="summary" data-toc-section data-toc-level="2">
  325:   <h2>Hvað er Pastafari-dagatalið þá í raun?</h2>
  326:   <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
  327:   <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
  328:   <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
  329:   <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>
  330:   <p>Þegar allt kemur til alls þarf dagatal ekki að gera meira en þetta.</p>
  331: </section>

i18n/locales/is.js (343 match(es)):
  1: "use strict";
  3: export default Object.freeze({
  4:   "code": "is",
  5:   "displayName": "Íslenska",
  6:   "dir": "ltr",
  7:   "intlLocale": "is-IS",
  8:   "messages": {
  9:     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.",
  12:     "app.title": "Pastafari-dagatal",
  13:     "nav.skip": "Fara í dagsetningarleit",
  ... 319 more match(es) omitted in this file
  336:       "sand": "Sandur"
  339:   "terminology": {
  340:     "foundationDay": "Stofndagur",
  341:     "workingNumber": "Aðgerðartala",
  342:     "queryNumber": "Fyrirspurnartala",
  343:     "distanceNumber": "Fjarlægðartala",
  344:     "sumNumber": "Summatala",
  345:     "directionNumber": "Stefnutala",
  346:     "bowl": "Skál",
  347:     "drop": "Dropi",
  348:     "gate": "Hlið",
  349:     "yearFiveThousand": "Ár fimm þúsund frá sköpun heimsins"
```

</details>


---

<sub>8s</sub>

### `rg`

**data-i18n|aria-|placeholder|title=|alt=|noscript|lang=|dir=**

"data-i18n|aria-|placeholder|title=|alt=|noscript|lang=|dir=" (docs/app.js, docs/reverse-ui.js, docs/about/about.js)

<details>
<summary>11 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:68:  elements["article-content"].setAttribute("aria-busy", "true");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/about.js:92:    elements["article-content"].setAttribute("aria-busy", "false");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:1090:    this.root.setAttribute("aria-busy", String(running));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:1099:    this.basicTab.setAttribute("aria-pressed", String(basic));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js:1100:    this.advancedTab.setAttribute("aria-pressed", String(!basic));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:363:  elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:377:    card.setAttribute("aria-label", dateAria(day));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:386:      card.setAttribute("aria-current", "date");
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:406:      elements["calendar-grid"].querySelector('[aria-current="date"]')?.scrollIntoView({
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:567:  cell.setAttribute("aria-label", dateAria(day));
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js:602:      row.setAttribute("aria-current", "date");
```

</details>


---

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 1-180)

<details>
<summary>179 lines</summary>

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
    "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
    "guide.open": "Hvernig nota ég þennan vef?",
    "guide.openShort": "Hvernig á að nota vefinn",
    "reverse.error.absoluteDateField": "Dagsetningin inniheldur ógilt gildi.",
    "reverse.error.limitSafeInteger": "{field} er utan öruggs heiltölusviðs.",
    "reverse.error.limitPositive": "{field} verður að vera jákvætt.",
    "app.brand": "PASTAFARI",
    "about.open": "Um Pastafari-dagatalið",
    "about.openShort": "Um dagatalið",
    "about.title": "Um Pastafari-dagatalið",
    "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
    "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
    "about.skip": "Fara í skýringu dagatalsins",
    "about.back": "Til baka í dagatalið",
    "about.tocKicker": "Á þessari síðu",
    "about.toc": "Efnisyfirlit",
    "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
    "about.loadError": "Ekki tókst að hlaða skýringu dagatalsins.",
    "language.label": "Tungumál",
    "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar. Þær verða reiknaðar aftur eftir að þú lokar þessum skilaboðum.",
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
    "comparison.toggleHelp": "Tiltækt á breiðum skjá. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
    "comparison.secondActionLabel": "Dagatal til að slá inn seinni aðgerðardaginn",
    "comparison.apply": "Uppfæra samanburð",
    "comparison.kicker": "Samanburður samstilltur eftir degi",
    "comparison.heading": "Sömu dagar, tveir aðgerðardagar",
    "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn er ólíkur í dálkunum tveimur.",
    "comparison.sameDay": "Sami fyrirspurnardagur í báðum útreikningum",
    "comparison.actionHeading": "Aðgerðardagur: {date}",
    "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem fyrri útreikningurinn opnaði.",
    "comparison.scrollAria": "Samanburðartafla sömu daga undir tveimur útreikningum",
    "comparison.desktopOnly": "Öll samanburðartaflan er tiltæk á breiðum skjá.",
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
    "target.context": "Dagsetning fyrirspurnardags: {targetDate} · aðgerðardagur: {actionDate}",
    "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
    "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
    "date.yearLine": "Ár {year} frá sköpun heimsins",
    "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
    "date.monthLine": "Dagur {dayInMonth} í mánuðinum {monthName}",
    "guide.eyebrow": "Notkunarleiðbeiningar",
    "guide.heading": "Hvað er hægt að gera hér og hvernig?",
    "guide.intro": "Vefurinn sýnir fulla Pastafari-dagsetningu fyrir hvaða dag sem er, tekur við leit í mörgum dagatölum og getur á breiðum skjá borið saman áhrif aðgerðardagsins.",
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
    "guide.6.body": "Á breiðum skjá virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
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
```

</details>


---

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js (lines 181-351)

<details>
<summary>170 lines</summary>

```
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
    "reverse.constraint.calculation.absolute": "Þekkt dagsetning",
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
    "reverse.calendar.label": "Dagatal fyrir þekkta dagsetningu",

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

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-120)

<details>
<summary>108 lines</summary>

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
```

</details>


---

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 121-240)

<details>
<summary>111 lines</summary>

```
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
  <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem tilgreind er í commit-inu <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljón samfellda mánaðarkafla; og meira en 364 milljón færslur frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
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
  <p>Þetta er staðbundinn stjarnfræðilegur atburður sem ræðst af staðsetningu. Þessi atburður á sér ekki endilega stað kl. 00:00. Borgaralegt tímabelti ákvarðar hann ekki, hann færist ekki einfaldlega vegna þess að sumartími byrjar eða endar og Venus þarf ekki að vera sýnileg berum augum.</p>
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
  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt bil, endurræsing, ræsing eftir hvíld (<code>cold wake</code>) og hegðun undir álagi.</p>
```

</details>


---

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 241-331)

<details>
<summary>82 lines</summary>

```
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

<sub>11s</sub>

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

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js (lines 1-220)

<details>
<summary>203 lines</summary>

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
```

</details>


---

<sub>11s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js (lines 220-520)

<details>
<summary>282 lines</summary>

```
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
```

</details>


---

<sub>15s</sub>

### `rg` — Failed

**["'][^"']*(\b(the|and|or|calendar|date|day|year|month|cutlet|search|language|about|Contents|Skip|JavaScript|Short Choice|Wide Choice|Pastafarian Calendar Seer|cold wake|commit|deep-link contract|semantic master)[^"']*)["']**

"["'][^"']*(\b(the|and|or|calendar|date|day|year|month|cutlet|search|language|about|Contents|Skip|JavaScript|Short Choice|Wide Choice|Pastafarian Calendar Seer|cold wake|commit|deep-link contract|semantic master)[^"']*)["']" in *.{js,html,json,webmanifest} (~/work/pastafari-calendar/docs)

```
Permission denied and could not request permission from user
```


---

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

```
File too large to read at once (24.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>15s</sub>

### `rg`

**siteT\(|services\.rt\(|translate\(|textContent|placeholder|setAttribute\("(aria-label|title|alt)"**

"siteT\(|services\.rt\(|translate\(|textContent|placeholder|setAttribute\("(aria-label|title|alt)"" (docs/app.js, docs/reverse-ui.js)

<details>
<summary>107 matches</summary>

```
[grep content: 104 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

reverse-ui.js (63 match(es)):
  29:   if (text !== null) element.textContent = text;
  36:   element.textContent = text;
  109:       option(definition.id, this.services.siteT(definition.labelKey))
  127:       const text = node("span", "", this.services.siteT(field.labelKey));
  133:           input.append(option(choice.value, choice.labelKey ? this.services.siteT(choice.labelKey) : choice.label));
  159:     this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
  173:       this.error.textContent = this.services.rt("reverse.error.input");
  182:     this.calendarLabelText.textContent = this.services.rt(this.labelKey);
  230:       if (!input.checkValidity()) throw new RangeError(this.services.rt("reverse.error.pastafari"));
  253:       element.textContent = this.services.rt(element.dataset.reverseKey);
  269:     this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
  273:     this.labelText = node("span", "", this.services.rt("reverse.variable.label"));
  276:     this.label.value = this.services.rt("reverse.variable.defaultName", { index });
  279:     this.domainText = node("span", "", this.services.rt("reverse.variable.domain"));
  295:       option("unknown", this.services.rt("reverse.variable.domain.unknown")),
  296:       option("exact", this.services.rt("reverse.variable.domain.exact")),
  297:       option("range", this.services.rt("reverse.variable.domain.range")),
  312:       start.append(node("h5", "", this.services.rt("reverse.basic.rangeStart")));
  314:       end.append(node("h5", "", this.services.rt("reverse.basic.rangeEnd")));
  328:       if (end < start) throw new RangeError(this.services.rt("reverse.error.range"));
  335:     this.labelText.textContent = this.services.rt("reverse.variable.label");
  336:     this.domainText.textContent = this.services.rt("reverse.variable.domain");
  337:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  356:     this.removeButton = node("button", "secondary-action reverse-remove", this.services.rt("reverse.action.remove"));
  360:     this.typeText = node("span", "", this.services.rt("reverse.constraint.type"));
  375:       option("pastafari", this.services.rt("reverse.constraint.pastafari")),
  376:       option("equal", this.services.rt("reverse.constraint.equal")),
  377:       option("order", this.services.rt("reverse.constraint.order")),
  378:       option("difference", this.services.rt("reverse.constraint.difference")),
  391:     const text = node("span", "", this.services.rt(labelKey));
  414:       option("variable", this.services.rt("reverse.constraint.calculation.variable")),
  415:       option("absolute", this.services.rt("reverse.constraint.calculation.absolute")),
  416:       option("same", this.services.rt("reverse.constraint.calculation.same")),
  441:     pfWrap.append(node("h5", "", this.services.rt("reverse.basic.dateHeading")));
  470:       option("exact", this.services.rt("reverse.constraint.differenceExact")),
  471:       option("range", this.services.rt("reverse.constraint.differenceRange")),
  533:     this.removeButton.textContent = this.services.rt("reverse.action.remove");
  534:     this.typeText.textContent = this.services.rt("reverse.constraint.type");
  536:       element.textContent = this.services.rt(element.dataset.reverseKey);
  543:         option("variable", this.services.rt("reverse.constraint.calculation.variable")),
  544:         option("absolute", this.services.rt("reverse.constraint.calculation.absolute")),
  545:         option("same", this.services.rt("reverse.constraint.calculation.same")),
  552:         option("exact", this.services.rt("reverse.constraint.differenceExact")),
  553:         option("range", this.services.rt("reverse.constraint.differenceRange")),
  593:       rt: (key, values = {}) => translate(services.getLocale(), key, values),
  605:   rt(key, values = {}) { return this.services.rt(key, values); }
  937:     this.status.textContent = this.rt("reverse.status.running");
  938:     this.progress.textContent = "";
  956:     this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
  968:     this.status.textContent = this.rt(key, { count: this.services.formatInteger(classification.solutionCount) });
  1036:     this.error.textContent = this.rt(this.visibleErrorMessage.key, this.visibleErrorMessage.values);
  1048:     this.status.textContent = "";
  1070:       this.status.textContent = this.rt("reverse.status.cancelled");
  1078:     this.status.textContent = "";
  1079:     this.progress.textContent = "";
  1105:       this.basicActiveValue.textContent = this.rt("reverse.basic.activeValue", {
  1110:       this.status.textContent = this.rt("reverse.status.stale");
  1117:       element.textContent = this.rt(element.dataset.reverseKey);
  1125:     this.addVariableButton.textContent = this.rt("reverse.action.addVariable");
  1126:     this.addConstraintButton.textContent = this.rt("reverse.action.addConstraint");
  1127:     this.basicSolve.textContent = this.advancedSolve.textContent = this.rt("reverse.action.solve");
  1128:     this.basicCancel.textContent = this.advancedCancel.textContent = this.rt("reverse.action.cancel");
  1129:     this.clearButton.textContent = this.rt("reverse.action.clear");

app.js (41 match(es)):
  114:   return translate(activeLocale, key, values);
  286:       strong.textContent = value;
  331:   elements["target-marker"].textContent = t(markerKey);
  337:     line.textContent = t("target.notInView");
  357:   elements["cutlet-meta"].textContent = t("calendar.currentCutlet", { year: formatInteger(view.year) });
  358:   elements["cutlet-heading"].textContent = viewCutletName;
  359:   elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
  363:   elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
  377:     card.setAttribute("aria-label", dateAria(day));
  389:       badge.textContent = t(state.targetFollowsCurrentDay ? "target.today" : "target.searched");
  418:   locationButton.textContent = t("location.useDevice");
  434:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  435:   elements["year-overview-context"].textContent = t("year.context", {
  448:   heading.textContent = title;
  450:   details.textContent = meta;
  458:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
  459:   elements["year-overview-context"].textContent = t("year.context", {
  462:   elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
  463:   elements["year-cutlet-count"].textContent = formatInteger(structure.cutletCount);
  464:   elements["year-month-count"].textContent = formatInteger(structure.monthCount);
  465:   elements["year-range"].textContent = t("year.rangeValue", {
  471:   elements["year-cutlet-position"].textContent = displayedCutlet
  481:     elements["year-target-position"].textContent = t("year.targetPosition", {
  487:   elements["year-cutlets-summary"].textContent = t("year.cutletsSummary", {
  505:   elements["year-months-summary"].textContent = t("year.monthsSummary", {
  529:   elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
  530:   elements["year-overview-context"].textContent = t("year.context", {
  536:   elements["year-overview-error"].textContent = t("year.error");
  567:   cell.setAttribute("aria-label", dateAria(day));
  579:   elements["comparison-primary-heading"].textContent = t("comparison.actionHeading", {
  582:   elements["comparison-secondary-heading"].textContent = t("comparison.actionHeading", {
  585:   elements["comparison-summary"].textContent = t("comparison.summary", {
  608:     civil.textContent = formatJdnAsGregorian(primary.jdn);
  610:     sequence.textContent = t("reverse.result.jdn", { jdn: primary.jdn.toString() });
  694:   elements["error-message"].textContent = t(key);
  703:     option.textContent = t(definition.labelKey);
  733:     labelText.textContent = t(field.labelKey);
  745:         option.textContent = choice.labelKey ? t(choice.labelKey) : choice.label;
  773:   configuration.help.textContent = definition.helpKey ? t(definition.helpKey) : "";
  799:   configuration.error.textContent = t(configuration.errorKey);
  899:     elements["error-message"].textContent = t(lastVisibleErrorKey);
```

</details>


---

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js (lines 1-220)

<details>
<summary>200 lines</summary>

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
```

</details>


---

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js (lines 220-700)

<details>
<summary>449 lines</summary>

```
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
```

</details>


---

<sub>15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js (lines 700-1185)

<details>
<summary>448 lines</summary>

```
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

<sub>20s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 1-120)

<details>
<summary>120 lines</summary>

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
```

</details>


---

<sub>20s</sub>

### `rg`

**is|name_localized|short_name_localized|description_localized|lang|dir**

"is|name_localized|short_name_localized|description_localized|lang|dir" (docs/manifest.webmanifest)

<details>
<summary>102 matches</summary>

```
[grep content: 100 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

manifest.webmanifest (100 match(es)):
  4:   "name_localized": {
  7:       "lang": "he",
  8:       "dir": "rtl"
  12:       "lang": "en",
  13:       "dir": "ltr"
  17:       "lang": "af",
  18:       "dir": "ltr"
  22:       "lang": "ar",
  23:       "dir": "rtl"
  27:       "lang": "az",
  28:       "dir": "ltr"
  32:       "lang": "be",
  33:       "dir": "ltr"
  37:       "lang": "bg",
  38:       "dir": "ltr"
  42:       "lang": "bn",
  43:       "dir": "ltr"
  47:       "lang": "bs",
  48:       "dir": "ltr"
  52:       "lang": "ca",
  53:       "dir": "ltr"
  57:       "lang": "cs",
  58:       "dir": "ltr"
  61:       "value": "Pastafarisk kalender",
  62:       "lang": "da",
  63:       "dir": "ltr"
  66:       "value": "Pastafarischer Kalender",
  67:       "lang": "de",
  68:       "dir": "ltr"
  72:       "lang": "el",
  73:       "dir": "ltr"
  77:       "lang": "eo",
  78:       "dir": "ltr"
  82:       "lang": "es",
  83:       "dir": "ltr"
  87:       "lang": "et",
  88:       "dir": "ltr"
  92:       "lang": "fa",
  93:       "dir": "rtl"
  97:       "lang": "fi",
  98:       "dir": "ltr"
  102:       "lang": "fil",
  103:       "dir": "ltr"
  107:       "lang": "fo",
  108:       "dir": "ltr"
  112:       "lang": "fr",
  113:       "dir": "ltr"
  117:       "lang": "fy",
  118:       "dir": "ltr"
  122:       "lang": "gl",
  123:       "dir": "ltr"
  127:       "lang": "gu",
  128:       "dir": "ltr"
  132:       "lang": "ha",
  133:       "dir": "ltr"
  137:       "lang": "hi",
  138:       "dir": "ltr"
  142:       "lang": "hr",
  143:       "dir": "ltr"
  147:       "lang": "ht",
  148:       "dir": "ltr"
  152:       "lang": "hu",
  153:       "dir": "ltr"
  157:       "lang": "hy",
  158:       "dir": "ltr"
  162:       "lang": "id",
  163:       "dir": "ltr"
  165:     "is": {
  167:       "lang": "is",
  168:       "dir": "ltr"
  172:       "lang": "it",
  173:       "dir": "ltr"
  177:       "lang": "ja",
  178:       "dir": "ltr"
  182:       "lang": "jv",
  183:       "dir": "ltr"
  187:       "lang": "ka",
  188:       "dir": "ltr"
  192:       "lang": "kk",
  193:       "dir": "ltr"
  197:       "lang": "ko",
  198:       "dir": "ltr"
  201:       "value": "Pastafarischer Kalenner",
  202:       "lang": "lb",
  203:       "dir": "ltr"
  207:       "lang": "lt",
  208:       "dir": "ltr"
  212:       "lang": "lv",
  213:       "dir": "ltr"
  217:       "lang": "mk",
  218:       "dir": "ltr"
  222:       "lang": "mr",
  223:       "dir": "ltr"
  227:       "lang": "ms",
  228:       "dir": "ltr"
  231:       "value": "Pastafarisk kalender",
  232:       "lang": "nb",
  233:       "dir": "ltr"
  237:       "lang": "ne",
  238:       "dir": "ltr"
```

</details>


---

<sub>20s</sub>

### `rg`

**[A-Z][a-z]+\s+[A-Z][a-z]+|\b(Short|Wide|Choice|Pastafarian|Calendar|Seer|API|HTTP|OpenAPI|Render|Node|CLI|JavaScript|English|Hebrew|Gregorian|Maya)\b**

"[A-Z][a-z]+\s+[A-Z][a-z]+|\b(Short|Wide|Choice|Pastafarian|Calendar|Seer|API|HTTP|OpenAPI|Render|Node|CLI|JavaScript|English|Hebrew|Gregorian|Maya)\b" (docs/about/content/is.html)

<details>
<summary>14 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:29:  <p>Í vörunni og API má líta á hið fyrra sem <code>day-id</code>: fast auðkenni dags á tímalínunni sem breytist ekki þótt framsetningin breytist. Hins vegar þurfa</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:79:  <p>En Pastafari-mánuður <strong>þarf ekki að vera samfellt tímabil</strong>. Tímaröðin gæti til dæmis verið:</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:141:  <h2>Short Choice og Wide Choice</h2>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:142:  <p>Fyrir tiltölulega lítil valrúm er <strong>Short Choice</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:143:  <p>Fyrir mjög stór valrúm er <strong>Wide Choice</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:144:  <p>Wide Choice jafngildir ekki því að mynda óháða og jafnt dreifða grunn-<code>Q</code> tölustafi þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:145:  <p>Dagatalið sjálft er áfram fullkomlega determinískt. „Choice“ er heiti reikniritsþrep, ekki slembiútdráttur við notkun.</p><hr>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:235:  <h2>Hvað er Seer þá?</h2>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:236:  <p>Við hlið kanónísku útfærslunnar er hröð reiknivél sem heitir <strong>Pastafarian Calendar Seer</strong>. Seer er ekki uppspretta valds: rétta dagsetningin ræðst af Megillah og kanóníska útreikningnum. Ef Seer er ósammála þeim er villan í Seer.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:238:  <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:239:  <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:240:  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt bil, endurræsing, ræsing eftir hvíld (<code>cold wake</code>) og hegðun undir álagi.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:242:  <p>Seer má nota forútreikning, sérstaka framsetningu, SIMD, algebru og aðrar styttingar. Hann þarf ekki að líkja eftir allri reiknisögu kanónísku útfærslunnar skref fyrir skref svo lengi sem hann framkvæmir sömu merkingarlegu aðgerð og skilar sama svari.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:297:  <p>Full Pastafari-dagsetning er því ekki algilt vistfang á tímalínunni ef ekki er vitað undir hvaða <code>c</code> hún var reiknuð.</p>
```

</details>


---

<sub>20s</sub>

### `rg`

**\b(English|Hebrew|calendar|date|day|year|month|search|about|contents|JavaScript|Skip|Show|Reload|Previous|Next|Back|Language)\b**

"\b(English|Hebrew|calendar|date|day|year|month|search|about|contents|JavaScript|Skip|Show|Reload|Previous|Next|Back|Language)\b" (docs/index.html, docs/about/index.html)

```
[grep content: 104 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/index.html (32 match(es)):
  7:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
  10:     <title data-i18n="about.title">About the Pastafari Calendar</title>
  14:     <link rel="stylesheet" href="../styles.css?v=16-about-polish">
  15:     <script type="module" src="./about.js?v=5-about-i18n-polish"></script>
  17:   <body class="about-page">
  18:     <a class="skip-link" href="#article-content" data-i18n="about.skip">Skip to the calendar explanation</a>
  19:     <div class="app-shell about-shell">
  20:       <header class="masthead about-masthead">
  23:           <h1 data-i18n="about.title">About the Pastafari Calendar</h1>
  24:           <p class="intro" data-i18n="about.intro">How the calendar represents days, years, cutlets, woven months, and the day of working.</p>
  25:           <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
  28:           <label for="language-selector" data-i18n="language.label">Language</label>
  33:       <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>
  35:       <details class="about-toc" id="about-toc" open>
  37:           <span class="eyebrow" data-i18n="about.tocKicker">On this page</span>
  38:           <span class="about-toc-title" data-i18n="about.toc">Contents</span>
  40:         <nav data-i18n-attr="aria-label:about.toc">
  41:           <ol id="about-toc-list"></ol>
  46:         <article id="article-content" class="about-article" aria-busy="true" tabindex="-1"></article>
  47:         <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>
  49:         <section class="about-site-usage" id="site-usage" aria-labelledby="guide-heading" data-toc-section data-toc-level="2">
  52:           <p class="guide-intro" data-i18n="guide.intro">Search, read, browse, change the day of working, and compare calculations.</p>
  53:           <details class="about-site-usage-details" id="site-usage-details">
  56:               <article><span class="guide-number">01</span><h3 data-i18n="guide.1.heading">Open the site and get today</h3><p data-i18n="guide.1.body">The site immediately determines the current Pastafari day for the active observer location.</p></article>
  57:               <article><span class="guide-number">02</span><h3 data-i18n="guide.2.heading">Search in any available calendar</h3><p data-i18n="guide.2.body">Choose a calendar, fill its fields, and show the date.</p></article>
  58:               <article><span class="guide-number">03</span><h3 data-i18n="guide.3.heading">Read the date</h3><p data-i18n="guide.3.body">Each tile shows the year, cutlet, and month in three lines.</p></article>
  60:               <article><span class="guide-number">05</span><h3 data-i18n="guide.5.heading">Change the day of working</h3><p data-i18n="guide.5.body">Open the calculation options to change it.</p></article>
  61:               <article><span class="guide-number">06</span><h3 data-i18n="guide.6.heading">Compare the same days twice</h3><p data-i18n="guide.6.body">On desktop, align each target day under two calculations.</p></article>
  62:               <article><span class="guide-number">07</span><h3 data-i18n="guide.7.heading">Explore the whole year</h3><p data-i18n="guide.7.body">Below the cutlet, inspect the year's length, cutlets, and woven months.</p></article>
  64:             <p class="guide-note" data-i18n="guide.note">Grid rows are visual only; comparison-table rows deliberately align the same day.</p>
  66:           <a class="back-to-calendar" href="../" data-back-to-calendar data-i18n="guide.back">Back to search and calendar</a>
  77:         <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>

index.html (72 match(es)):
  7:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
  14:     <link rel="stylesheet" href="./styles.css?v=16-about-polish">
  15:     <script type="module" src="./app.js?v=24-about-i18n"></script>
  18:     <a class="skip-link" href="#search-heading" data-i18n="nav.skip">Skip to date search</a>
  24:           <p class="intro" data-i18n="app.intro">Find a day in any available calendar, then see its complete Pastafari date.</p>
  25:           <a class="guide-link" href="./about/" data-about-link data-i18n="about.open">About the calendar</a>
  28:           <label for="language-selector" data-i18n="language.label">Language</label>
  33:       <a class="floating-guide-link" href="./about/" data-about-link data-i18n="about.openShort">About the calendar</a>
  36:       <section class="search-panel" id="search-panel" aria-labelledby="search-heading">
  38:           <p class="status-kicker" data-i18n="search.kicker">Date search</p>
  39:           <h2 id="search-heading" tabindex="-1" data-i18n="search.heading">Which day would you like to find?</h2>
  40:           <p data-i18n="search.intro">Choose a calendar, enter a date, and select “Show date.”</p>
  42:         <form id="target-search-form" class="date-entry-form" novalidate>
  43:           <label class="calendar-picker">
  44:             <span data-i18n="search.calendarLabel">Calendar used for input</span>
  45:             <select id="target-calendar" name="calendar"></select>
  47:           <div class="date-fields" id="target-date-fields"></div>
  48:           <p class="field-help" id="target-date-help" hidden></p>
  50:           <button class="search-submit" type="submit" data-i18n="search.submit">Show date</button>
  57:               <h3 data-i18n="settings.heading">Change the day of working</h3>
  58:               <p data-i18n="settings.intro">The day of working is the calculation's point of departure.</p>
  60:             <form id="action-date-form" class="date-entry-form compact-form" novalidate>
  61:               <label class="calendar-picker">
  62:                 <span data-i18n="settings.actionCalendarLabel">Calendar used to enter the day of working</span>
  63:                 <select id="action-calendar" name="calendar"></select>
  65:               <div class="date-fields" id="action-date-fields"></div>
  66:               <p class="field-help" id="action-date-help" hidden></p>
  69:                 <button class="search-submit" type="submit" data-i18n="settings.apply">Apply day of working</button>
  70:                 <button class="secondary-action" type="button" id="reset-action-day" data-i18n="settings.reset">Reset to current Pastafari day</button>
  79:               <form id="comparison-date-form" class="date-entry-form compact-form" novalidate hidden>
  80:                 <label class="calendar-picker">
  81:                   <span data-i18n="comparison.secondActionLabel">Calendar used to enter the second day of working</span>
  82:                   <select id="comparison-calendar" name="calendar"></select>
  84:                 <div class="date-fields" id="comparison-date-fields"></div>
  85:                 <p class="field-help" id="comparison-date-help" hidden></p>
  87:                 <button class="search-submit" type="submit" data-i18n="comparison.apply">Update comparison</button>
  102:           <h2 id="loading-heading" data-i18n="loading.title">Finding the cutlet and date…</h2>
  107:         <p class="status-kicker" data-i18n="error.kicker">Unable to display the calendar</p>
  110:         <button type="button" id="reload-button" data-i18n="error.reload">Reload</button>
  113:       <section class="calendar-workspace" id="calendar-workspace" aria-labelledby="cutlet-heading" hidden>
  116:           <div class="beacon-date" id="target-date-lines"></div>
  120:         <div class="calendar-toolbar">
  126:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
  127:             <button type="button" id="previous-cutlet" data-i18n="calendar.previous">Previous cutlet</button>
  128:             <button type="button" class="primary-action" id="today-button" data-i18n="calendar.today">Back to today</button>
  129:             <button type="button" id="next-cutlet" data-i18n="calendar.next">Next cutlet</button>
  133:         <p class="browse-note" id="browse-note" hidden data-i18n="calendar.targetOutside">The searched date is not in the cutlet currently on screen.</p>
  134:         <div class="calendar-grid" id="calendar-grid" role="group"></div>
  136:         <section class="year-overview" id="year-overview" aria-labelledby="year-overview-heading">
  137:           <div class="year-overview-heading">
  138:             <p class="status-kicker" data-i18n="year.kicker">Year at a glance</p>
  139:             <h2 id="year-overview-heading">Year structure</h2>
  140:             <p id="year-overview-context"></p>
  142:           <p class="year-overview-loading" id="year-overview-loading" data-i18n="year.loading">Building the full year structure…</p>
  143:           <p class="year-overview-error" id="year-overview-error" hidden></p>
  144:           <div id="year-overview-content" hidden>
  145:             <dl class="year-facts">
  146:               <div><dt data-i18n="year.lengthLabel">Year length</dt><dd id="year-length"></dd></div>
  147:               <div><dt data-i18n="year.cutletCountLabel">Cutlets</dt><dd id="year-cutlet-count"></dd></div>
  148:               <div><dt data-i18n="year.monthCountLabel">Months</dt><dd id="year-month-count"></dd></div>
  149:               <div><dt data-i18n="year.rangeLabel">Gregorian span</dt><dd id="year-range"></dd></div>
  151:             <p class="year-position" id="year-cutlet-position"></p>
  152:             <p class="year-position" id="year-target-position" hidden></p>
  153:             <p class="year-explainer" data-i18n="year.monthExplainer">Months are woven independently of cutlets, so a month can appear in many separate runs during the year.</p>
  154:             <div class="year-structure-columns">
  156:                 <summary id="year-cutlets-summary">Cutlets</summary>
  157:                 <ol class="structure-list" id="year-cutlet-list" tabindex="0" aria-labelledby="year-cutlets-summary"></ol>
  160:                 <summary id="year-months-summary">Months</summary>
  161:                 <ol class="structure-list month-structure-list" id="year-month-list" tabindex="0" aria-labelledby="year-months-summary"></ol>
  170:           <p class="status-kicker" data-i18n="comparison.kicker">Comparison aligned by day</p>
  172:           <p data-i18n="comparison.intro">Every row contains the same queried day.</p>
  199:         <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
```


---

<sub>20s</sub>

### `rg`

**"[^"]+"**

""[^"]+"" (docs/i18n/locales/is.js)

<details>
<summary>27 matches</summary>

```
[grep content: 342 matches across 1 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales]

is.js (342 match(es)):
  1: "use strict";
  4:   "code": "is",
  5:   "displayName": "Íslenska",
  6:   "dir": "ltr",
  7:   "intlLocale": "is-IS",
  8:   "messages": {
  9:     "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
  10:     "manifest.shortName": "Pastafari",
  11:     "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.",
  12:     "app.title": "Pastafari-dagatal",
  13:     "nav.skip": "Fara í dagsetningarleit",
  14:     "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
  ... 318 more match(es) omitted in this file
  336:       "sand": "Sandur"
  339:   "terminology": {
  340:     "foundationDay": "Stofndagur",
  341:     "workingNumber": "Aðgerðartala",
  342:     "queryNumber": "Fyrirspurnartala",
  343:     "distanceNumber": "Fjarlægðartala",
  344:     "sumNumber": "Summatala",
  345:     "directionNumber": "Stefnutala",
  346:     "bowl": "Skál",
  347:     "drop": "Dropi",
  348:     "gate": "Hlið",
  349:     "yearFiveThousand": "Ár fimm þúsund frá sköpun heimsins"
```

</details>


---

<sub>21s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 155-180)

<details>
<summary>26 lines</summary>

```
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
```

</details>


---

<sub>23s</sub>

### `rg`

**"is"|Pastafari-dagatal|Pastafari Calendar**

""is"|Pastafari-dagatal|Pastafari Calendar" (docs/manifest.webmanifest)

<details>
<summary>10 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:3:  "name": "Pastafari Calendar",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:11:      "value": "Pastafari Calendar",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:165:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:166:      "value": "Pastafari-dagatal",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:167:      "lang": "is",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:528:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:530:      "lang": "is",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:891:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:892:      "value": "Pastafari-dagatal með dagsetningarleit og samanburði.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:893:      "lang": "is",
```

</details>


---

<sub>23s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 450-490)

<details>
<summary>41 lines</summary>

```
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
```

</details>


---

<sub>23s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 890-930)

<details>
<summary>41 lines</summary>

```
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
```

</details>


---

<sub>24s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 520-536)

<details>
<summary>17 lines</summary>

```
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
```

</details>


---

<sub>24s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 1-16)

<details>
<summary>16 lines</summary>

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
```

</details>


---

<sub>24s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 230-260)

<details>
<summary>28 lines</summary>

```
  <p>Þar sem forskriftin er fullkomin og kerfið determinískt má einnig reikna allt með höndunum: reiknið inntaksteljarana, farið í gegnum 7 falda og 46 sýnilega dropa, uppfærið skálarnar sex, framkvæmið 12 lokablöndurnar, myndið svörin, byggið hliðin, veljið ár og kótelettur, framkvæmið samsetningarval, veljið nöfnin og fléttið síðan mánuðina.</p>
  <p>Í staðinn þarf enginn að muna hvenær febrúar hefur 28 daga og hvenær 29.</p><hr>
</section>

<section class="about-section" id="seer" data-toc-section data-toc-level="2">
  <h2>Hvað er Seer þá?</h2>
  <p>Við hlið kanónísku útfærslunnar er hröð reiknivél sem heitir <strong>Pastafarian Calendar Seer</strong>. Seer er ekki uppspretta valds: rétta dagsetningin ræðst af Megillah og kanóníska útreikningnum. Ef Seer er ósammála þeim er villan í Seer.</p>
  <p>Hlutverk hans er að keyra sömu fyrirspurnir hratt og skila niðurstöðu á formi sem auðvelt er að samþætta við vörur.</p>
  <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
  <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt bil, endurræsing, ræsing eftir hvíld (<code>cold wake</code>) og hegðun undir álagi.</p>
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
```

</details>


---

<sub>33s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 1-240)

<details>
<summary>214 lines</summary>

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
```

</details>


---

<sub>33s</sub>

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

<sub>33s</sub>

### `rg`

**TODO|FIXME|Hebrew|fallback|locale|is**

"TODO|FIXME|Hebrew|fallback|locale|is" (docs/i18n/registry.js, docs/about/content/registry.js)

<details>
<summary>53 matches</summary>

```
[grep content: 276 matches across 2 file(s) under /home/runner/work/pastafari-calendar/pastafari-calendar/docs]

about/content/registry.js (76 match(es)):
  6: // Flip to true only when all registered locales have passed the article-coverage invariant.
  14:     asset: "./content/he.html?v=5-about-i18n-polish",
  20:     asset: "./content/en.html?v=5-about-i18n-polish",
  26:     asset: "./content/af.html?v=5-about-i18n-polish",
  32:     asset: "./content/ar.html?v=5-about-i18n-polish",
  38:     asset: "./content/az.html?v=5-about-i18n-polish",
  44:     asset: "./content/be.html?v=5-about-i18n-polish",
  50:     asset: "./content/bg.html?v=5-about-i18n-polish",
  56:     asset: "./content/bn.html?v=5-about-i18n-polish",
  62:     asset: "./content/bs.html?v=5-about-i18n-polish",
  68:     asset: "./content/ca.html?v=5-about-i18n-polish",
  74:     asset: "./content/cs.html?v=5-about-i18n-polish",
  ... 52 more match(es) omitted in this file
  374:     asset: "./content/sw.html?v=5-about-i18n-polish",
  380:     asset: "./content/ta.html?v=5-about-i18n-polish",
  386:     asset: "./content/te.html?v=5-about-i18n-polish",
  392:     asset: "./content/th.html?v=5-about-i18n-polish",
  398:     asset: "./content/tr.html?v=5-about-i18n-polish",
  404:     asset: "./content/uk.html?v=5-about-i18n-polish",
  410:     asset: "./content/ur.html?v=5-about-i18n-polish",
  416:     asset: "./content/uz.html?v=5-about-i18n-polish",
  422:     asset: "./content/vi.html?v=5-about-i18n-polish",
  428:     asset: "./content/yo.html?v=5-about-i18n-polish",
  434:     asset: "./content/zh.html?v=5-about-i18n-polish",
  440:     asset: "./content/zu.html?v=5-about-i18n-polish",

i18n/registry.js (200 match(es)):
  10: function defineLocale(code, displayName, dir, intlLocale, support, loader, aliases = []) {
  11:   const asset = `./locales/${code}.js?v=${LOCALE_ASSET_REVISION}`;
  14:     displayName,
  26: // support is declared only here; locale source modules must not declare it.
  28:   defineLocale("he", "עברית", "rtl", "he-IL", "complete", () => import("./locales/he.js?v=19-about-i18n")),
  29:   defineLocale("en", "English", "ltr", "en-US", "complete", () => import("./locales/en.js?v=19-about-i18n")),
  30:   defineLocale("af", "Afrikaans", "ltr", "af-ZA", "partial", () => import("./locales/af.js?v=19-about-i18n")),
  31:   defineLocale("ar", "العربية", "rtl", "ar", "partial", () => import("./locales/ar.js?v=19-about-i18n")),
  32:   defineLocale("az", "Azərbaycanca", "ltr", "az-AZ", "partial", () => import("./locales/az.js?v=19-about-i18n")),
  33:   defineLocale("be", "Беларуская", "ltr", "be-BY", "partial", () => import("./locales/be.js?v=19-about-i18n")),
  34:   defineLocale("bg", "Български", "ltr", "bg-BG", "partial", () => import("./locales/bg.js?v=19-about-i18n")),
  35:   defineLocale("bn", "বাংলা", "ltr", "bn-BD", "partial", () => import("./locales/bn.js?v=19-about-i18n")),
  ... 176 more match(es) omitted in this file
  482:   if (!Array.isArray(locales) || locales.length === 0) throw new TypeError("Explicitly loaded locale resources are required for audit.");
  483:   const sourceByCode = new Map(locales.map((locale) => {
  484:     const source = locale?.[LOCAL_SOURCE] ?? locale;
  487:   const english = sourceByCode.get(DEFAULT_LOCALE);
  488:   if (!english) throw new RangeError("English baseline locale is required for audit.");
  489:   const englishGroups = localGroups(english);
  494:     if (!source) throw new RangeError(`Registered locale ${metadata.code} was not supplied for audit.`);
  497:       messages: analyzeGroup(groups.messages, englishGroups.messages, "messages", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
  498:       terminology: analyzeGroup(groups.terminology, englishGroups.terminology, "terminology", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
  499:       cutlets: analyzeGroup(groups.cutlets, englishGroups.cutlets, "cutlets", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
  500:       months: analyzeGroup(groups.months, englishGroups.months, "months", { checkEnglishLeakage: metadata.code !== DEFAULT_LOCALE }),
  506:     const fallbackKeys = groupValues.reduce((sum, group) => sum + group.fallback, 0);
```

</details>


---

<sub>33s</sub>

### `rg`

**\b(þetta|þessi|þeim|því|sem|og|eða|ekki|er|að|á|í|frá|til)\b**

"\b(þetta|þessi|þeim|því|sem|og|eða|ekki|er|að|á|í|frá|til)\b" (docs/i18n/locales/is.js)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:109
```


---

<sub>47s</sub>

### `rg`

**sömu niðurstöðu|cold wake|Short Choice|grunn-|Hagræðing|stórt bil|kótelettuna sem**

"sömu niðurstöðu|cold wake|Short Choice|grunn-|Hagræðing|stórt bil|kótelettuna sem" (docs/i18n/locales/is.js, docs/about/content/is.html)

<details>
<summary>8 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:141:  <h2>Short Choice og Wide Choice</h2>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:142:  <p>Fyrir tiltölulega lítil valrúm er <strong>Short Choice</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:144:  <p>Wide Choice jafngildir ekki því að mynda óháða og jafnt dreifða grunn-<code>Q</code> tölustafi þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:240:  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt bil, endurræsing, ræsing eftir hvíld (<code>cold wake</code>) og hegðun undir álagi.</p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html:243:  <p>Hagræðing er ekki annað vald.</p><hr>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:11:    "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:14:    "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:154:    "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
```

</details>


---

<sub>47s</sub>

### `rg`

**fallbackNotice|guide\.1\.body|comparison\.toggleHelp|year\.monthExplainer|reverse\.basic\.toAdvancedHelp|reverse\.status\.partialSolutions**

"fallbackNotice|guide\.1\.body|comparison\.toggleHelp|year\.monthExplainer|reverse\.basic\.toAdvancedHelp|reverse\.status\.partialSolutions" (docs/i18n/locales/is.js)

<details>
<summary>6 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:30:    "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:50:    "comparison.toggleHelp": "Tiltækt á breiðum skjá. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:136:    "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:154:    "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:195:    "reverse.basic.toAdvancedHelp": "Endurkvæmir Pastafari-aðgerðardagar eru settir fram sem breytur og skorður svo hægt sé að lengja keðjuna án tilbúinna dýptarmarka.",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js:213:    "reverse.status.partialSolutions": "{count} staðfestar lausnir eru sýndar, en leitin stöðvaðist áður en henni lauk og fleiri gætu verið til.",
```

</details>


---

<sub>47s</sub>

### `rg`

**<noscript>|JavaScript**

"<noscript>|JavaScript" (docs/index.html, docs/about/index.html)

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:75:    <noscript>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/index.html:77:        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:197:    <noscript>
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/index.html:199:        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
```


---

<sub>47s</sub>

### `rg`

**"is"**

""is"" (docs/manifest.webmanifest)

<details>
<summary>6 matches</summary>

```
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:165:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:167:      "lang": "is",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:528:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:530:      "lang": "is",
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:891:    "is": {
/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest:893:      "lang": "is",
```

</details>


---

<sub>1m 8s</sub>

### Copilot

NATIVE_QA_RESULT: FAIL

## Heildarniðurstaða

Staðfærslan er að mestu leyti á íslensku og `is-IS`-flæðið er til staðar fyrir aðalviðmót, öfuga leit, samanburð, ársýn, notendaleiðbeiningar og `/about/`. Hins vegar fannst nokkur málfræðileg og stílfræðileg óvissa, auk enskra frumtexta í JavaScript-lausri varaleið og óþýdds tækniorðalags sem birtist notendum. Því stenst hún ekki strangt málfræðilegt QA án leiðréttinga.

## Niðurstöður

| Alvarleiki | Skrá og staðsetning | Núverandi texti | Skýring | Ráðlögð leiðrétting |
|---|---|---|---|---|
| **medium** | `docs/i18n/locales/is.js:11` (`manifest.defaultDescription`) | „Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sömu inntök.“ | „Inntök“ er óeðlilegt hér og setningin hljómar eins og bein þýðing. Þegar átt er við sama input er eðlilegra að nota eintölu. | „Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.“ Einnig mætti nota „sömu niðurstöðu fyrir sömu inntaksbreytur“ ef átt er við fleiri breytur. |
| **medium** | `docs/about/content/is.html:144` | „... óháða og jafnt dreifða grunn-`Q` tölustafi ...“ | „Grunn-Q tölustafir“ er ekki eðlilegt íslenskt tækniorðalag og getur ruglað saman grunni, tölustöfum og `Q`. | „... óháða og jafnt dreifða tölustafi í `Q`-grunni þar til vísi fæst.“ |
| **medium** | `docs/about/content/is.html:240` | „... nákvæmar fyrirspurnir, stórt bil, endurræsing, ræsing eftir hvíld (`cold wake`) ...“ | „Stórt bil“ er of óljóst í þessu samhengi og enska lýsingin `cold wake` er óþýdd þótt hún sé ekki fast API-auðkenni. | „... nákvæmar fyrirspurnir, stórt dagabil, endurræsing, ræsing eftir dvala ...“ Hægt er að halda `cold wake` innan sviga aðeins ef enska hugtakið er nauðsynlegt sem tæknileg tilvísun. |
| **low** | `docs/about/content/is.html:243` | „Hagræðing er ekki annað vald.“ | Setningin er skiljanleg en óeðlileg og merkingin óljós á íslensku. | „Hagræðing veitir ekki annað vald.“ eða „Hagræðing breytir ekki merkingarvaldinu.“ |
| **medium** | `docs/index.html:7,18–24,197–200` og `docs/about/index.html:7,18–24,75–78` | Frumtexti í HTML er á ensku, meðal annars „Pastafari Calendar“, „Skip to date search“ og `<strong>JavaScript</strong>`. | Þegar JavaScript hleðst ekki, eða áður en staðfærsla er virkjuð, birtist enskt yfirborð þrátt fyrir valið íslenskt tungumál. Þetta á einnig við um noscript-varaleiðina, sem gefur aðeins enska tæknilega merkingu og enga íslenska leiðbeiningu. | Bæta íslenskum varatexta í HTML eða tryggja að varaleiðin hafi íslenskan texta, til dæmis „JavaScript þarf að vera virkt til að nota dagatalið.“ Einnig ætti að samræma upphaflegt `lang`/frumtexta við fyrirhugaða varaleið ef íslenska á að vera fullgild án JavaScript. |

## Texti á röngu tungumáli og varastaðfærslur

- Í `docs/about/about.js` er rétt skilgreint að íslenski greinartextinn sé sóttur úr `docs/about/content/is.html`, og `docs/about/content/registry.js:174–179` gefur honum `lang: "is-IS"` og `dir: "ltr"`.
- Í `docs/i18n/locales/is.js:30` er varatilkynningin sjálf íslensk: „Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.“ Þetta er rétt miðað við að `ARTICLE_FALLBACK_LOCALE` sé `he`.
- Eftirfarandi heiti eru réttilega óþýdd vegna kanónískrar eða tæknilegrar stöðu þeirra: `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, `API`, `HTTP`, `OpenAPI`, `CLI`, `Node`, `Render`, `SIMD`, `ASTRONOMICAL-DAY.md`, `date`, `now`, `batch`, `range`, `year`, `reverse`, `metadata`, `locales`, `status` og `cold wake` þegar það er notað sem nákvæmt tæknilegt hugtak. Þau ætti ekki að telja sem galla eingöngu vegna þess að þau eru á ensku.
- Enski HTML-frumtextinn og noscript-blokkin eru þó raunveruleg varaleiðargalli, þar sem þau eru sýnileg án þess að íslensk staðfærsla hafi keyrt.

## Samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins

- **Aðgerðardagur** er notaður samræmt í `is.js`, aðalviðmótinu og `/about/`.
- **Fyrirspurnardagur** er einnig samræmdur í leit, samanburði, dagsetningarlínum og fræðslutexta.
- **Kóteletta** og **mánuður** eru notuð samræmt í ársýn, dagaspjöldum, samanburði og greinartexta.
- **Fléttun** og **fléttaðir mánuðir** vísa að mestu að sama hugtaki, en „fléttaðir mánuðir“ í `about.intro` og „mánuðir fléttast“ í greininni mætti samræma betur, til dæmis með „fléttun mánaða“ sem fræðilegu hugtaki.
- **Öfug leit** er samræmd milli `reverse.*`-lykla og kaflans um öfuga umbreytingu.
- Engin alvarleg hugtakamisræmi fundust milli `/about/` og virka notendaviðmótsins.

## Lýsigögn, ARIA, manifest, noscript og varaleiðir

- `docs/i18n/registry.js` skilgreinir `is` rétt með `intlLocale: "is-IS"` og `dir: "ltr"`.
- `docs/about/content/registry.js` skilgreinir íslenska grein með `lang: "is-IS"` og `dir: "ltr"`.
- `docs/manifest.webmanifest` hefur allar þrjár nauðsynlegar íslenskar færslur:
  - `name_localized.is` á línum 165–168: „Pastafari-dagatal“
  - `short_name_localized.is` á línum 528–531: „Pastafari“
  - `description_localized.is` á línum 891–894: „Pastafari-dagatal með dagsetningarleit og samanburði.“
- Manifest-færslurnar eru á réttu tungumáli og með rétta textastefnu. Sjálfgefnu ensku `name`, `short_name`, `description`, `lang` eða `dir` er ekki talið sem villa samkvæmt sérreglunni um manifest.
- ARIA-texti sem er búinn til í `app.js` og `reverse-ui.js` kemur úr íslenskum þýðingarlyklum, meðal annars dagaspjöld, dagatalshópur, verkfærastika, samanburðartafla og villuboð.
- Helsti aðgengis- og varaleiðargallinn er noscript-framsetningin í báðum HTML-skrám: hún sýnir aðeins „JavaScript“ og viðvörunarmerki og gefur enga íslenska skýringu eða nothæfa leið áfram.

## Líkleg textadrifin hætta á línuskiptingu

Eftirfarandi textar eru langir og líklegir til að vefjast í þröngum reitum eða litlum skjám:

- `docs/i18n/locales/is.js:50`, `comparison.toggleHelp`
- `docs/i18n/locales/is.js:136`, `year.monthExplainer`
- `docs/i18n/locales/is.js:154`, `guide.1.body`
- `docs/i18n/locales/is.js:195`, `reverse.basic.toAdvancedHelp`
- `docs/i18n/locales/is.js:213`, `reverse.status.partialSolutions`
- `docs/i18n/locales/is.js:30`, `about.fallbackNotice`

Sérstaklega geta `comparison.toggleHelp` og `reverse.basic.toAdvancedHelp` orðið háir í þröngum stillingareitum, en `guide.1.body` og `year.monthExplainer` geta lengt kafla og samantektir verulega. Þetta er textabundið áhættumat, ekki sjónrænt QA með birtri vefsíðu.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
