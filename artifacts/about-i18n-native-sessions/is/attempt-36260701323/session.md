# Copilot CLI Session

> [!NOTE]
> - **Session ID:** `f0dfbaf2-dda3-469d-a961-27c562241ee0`  
> - **Started:** 9/26/2026, 5:55:54 PM  
> - **Duration:** 2m 50s  
> - **Exported:** 9/26/2026, 5:58:44 PM  

---

<sub>1s</sub>

### User

# Heildstæð málfræðileg QA-skoðun á allri vefsíðunni á móðurmáli

Þú ert óháður mál- og notendaviðmótsrýnir fyrir staðfærsluna `is-IS` (staðfærslukóði geymslunnar `is`) í Pastafari Calendar.

Öll samskipti á náttúrulegu máli í þessari rýnislotu verða að vera á markmáli `is-IS`. Ekki svara á ensku nema þú þurfir að vitna í nákvæman texta á röngu tungumáli sem fundinn er sem galli, endurtaka tvær nauðsynlegar véllesanlegar niðurstöðulínur hér að neðan eða nefna bókstafleg tæknileg auðkenni sem ekki má þýða.

Þetta er eingöngu rýni. EKKI breyta, búa til, endurnefna eða eyða skrám í geymslunni. Notaðu skeljaverkfæri eingöngu til skoðunar sem breytir engu.

Skoðaðu ALLA sýnilega vefsíðuna á þessari staðfærslu, ekki aðeins `/about/`. Skoðaðu að minnsta kosti:
- `docs/i18n/locales/is.js` í heild;
- `docs/about/content/is.html` í heild;
- `docs/index.html` og `docs/about/index.html`;
- `docs/manifest.webmanifest`;
- viðeigandi texta-, aðgengis- og varaleiðir í `docs/app.js`, `docs/reverse-ui.js`, `docs/i18n/registry.js`, `docs/i18n/runtime.js` og `docs/about/about.js`;
- aðalnotendaviðmótið, dagsetningarleit, stýringar fyrir vinnudag/aðgerðardag, samanburð, ársýn, öfuga leit, villur og stöður, notendaleiðbeiningar, síðufót, lýsigögn/heiti, manifest, ARIA/aftgengi, noscript/varaleiðir og tungumálaskipti.

Leitaðu sérstaklega að:
1. texta á öðru tungumáli eða óviljandi varatexta á ensku;
2. þýðingareinkennum og setningum sem skiljast en eru ekki eðlilegar á markmálinu;
3. vandamálum í málfræði, setningagerð, beygingum, málsniði, greinarmerkjasetningu, stafsetningu og leturfræði;
4. ósamræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
5. röngum eða vafasömum þýðingum á tæknilegum hugtökum;
6. staðgenglum sem notaðir eru í röngu málfræðilegu eða merkingarlegu hlutverki;
7. röngum texta í lýsigögnum, heitum, ARIA, manifest, noscript, varaleiðum eða aðgengistexta;
8. röngu leturkerfi, textastefnu, BiDi-hegðun eða grunsamlegum blönduðum leturgerðum;
9. líklegri hættu á línuskiptingu, yfirflæði eða þröngum stýringum vegna staðfærðs texta. Þetta er textabundið áhættumat en kemur ekki í stað sjónrænnar prófunar á birtri vefsíðu.

Kanónískar óbreytilegar reglur eru bindandi. Ekki leggja til að formúlum, kjötkássum, kóðabókstöfum, API-auðkennum, stöðugum kaflaauðkennum eða raunverulegum kanónískum nöfnum sé breytt eingöngu til að þýða þau.

Sérregla fyrir manifest: Núverandi Web App Manifest-staðall styður tungumálakortin `*_localized`. Ekki tilkynna enska sjálfgefna gildið `name`, `short_name`, `description`, `lang` eða `dir` sem galla í markmáli aðeins vegna þess að það er varagildi manifestsins. Gakktu þess í stað úr skugga um að markmálið hafi fullkomnar og réttar færslur fyrir `name_localized`, `short_name_localized` og `description_localized`, með réttu tungumáli og textastefnu, og tilkynntu allar færslur markmálsins sem vantar, eru rangar eða ósamræmdar.

Regla um sýnilegt yfirborð: Gerðu greinarmun á sjálfgefnum texta í frumkóða geymslunnar og texta sem birtist í raun eftir að staðfærsla hefur verið frumstillt. Kyrrstætt HTML inniheldur enska frumræsitexta á einingum með `data-i18n` / `data-i18n-attr`; keyrsluumhverfi staðfærslunnar skiptir þessum texta út fyrir virka staðfærslu. Ekki tilkynna þessa sjálfgefnu frumtexta aðeins vegna þess að þeir eru á ensku. Tilkynntu þá aðeins þegar skoðun á kóðanum sýnir að þeir geti verið áfram sýnilegir eftir frumstillingu markmálsins eða í raunverulegri notendasýnilegri villu- eða varaleið.

Regla um JavaScript-leysi: Tungumálaákvörðun á þessari kyrrstæðu vefsíðu fer sjálf fram með JavaScript. `noscript`-varaleiðin er viljandi tungumálahlutlaus og inniheldur aðeins sérnafnið `JavaScript` auk viðvörunartákns. Líttu á þetta sem tungumálahlutlausa varaleið, ekki sem leka frá ensku. Tilkynntu samt viðbótartexta á öðru tungumáli eða áþreifanlegan aðgengisgalla sem er óháður ákvörðun tungumáls.

FYRSTA línan í svari þínu VERÐUR að vera nákvæmlega annaðhvort:
NATIVE_QA_RESULT: PASS
NATIVE_QA_RESULT: FAIL

Eftir þessa einu véllesanlegu línu skaltu eingöngu skrifa Markdown-skýrslu á markmálinu. Hún skal innihalda:
- heildarniðurstöðu PASS/FAIL fyrir stranga, heildstæða málfræðilega QA-skoðun á allri vefsíðunni;
- allar niðurstöður með alvarleikastigi (critical/high/medium/low), nákvæmri skrá og eins nákvæmri staðsetningu og unnt er, núverandi texta, skýringu og ráðlagðri leiðréttingu;
- sérstakan kafla um texta á röngu tungumáli/varaleiðir;
- sérstakan kafla um samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins;
- sérstakan kafla um lýsigögn/ARIA/manifest/noscript/varaleiðir;
- sérstakan kafla um líklega textabundna hættu á línuskiptingu í notendaviðmóti;
- ef enginn galli finnst skaltu taka það skýrt fram og tilgreina hvaða yfirborð voru skoðuð.

Ekki lýsa þessari lotu sem sjónrænni QA-skoðun á birtri vefsíðu. Þetta er ströng, óháð, markmálsmiðuð málfræðileg QA-skoðun á allri vefsíðunni.



---

<sub>4s</sub>

### `glob`

**docs/**/***

"docs/**/*"

<details>
<summary>197 matches</summary>

```
[glob: 189 path(s) under ./docs; grouped by directory]

./docs/about/ (75 path(s))
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

./docs/i18n/ (75 path(s))
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

./docs/ (29 path(s))
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

./docs/engine/ (6 path(s))
  pastafari-calendar-fast.js
  pastafari-constraints-client.js
  pastafari-constraints.js
  pastafari-diagnostics.js
  pastafari-fast-worker.js
  pastafari-reverse-worker.js

./docs/icons/ (3 path(s))
  icon-192.png
  icon-512.png
  icon.svg

./docs/authority/ (1 path(s))
  ORACLE-AUTHORITY.md

[extensions: .js=92, .html=74, .md=16, .png=2, [no extension]=1, .webmanifest=1, .css=1, .txt=1]
```

</details>


---

<sub>4s</sub>

### `bash`

**Skoða stöðu vinnusvæðis án breytinga**

$ git status --short

```
?? artifacts/about-i18n-native-sessions/is/attempt-36260701323/
<shellId: 0 completed with exit code 0>
```


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/is.js

```
File too large to read at once (22.7 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html

```
File too large to read at once (33.7 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>8s</sub>

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

<sub>8s</sub>

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

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest

```
File too large to read at once (24.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>8s</sub>

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

<sub>8s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js

```
File too large to read at once (29.6 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>8s</sub>

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

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js

```
File too large to read at once (47.9 KB). Consider using the grep tool to search within the file, or view with view_range to read specific sections.
```


---

<sub>12s</sub>

### `bash`

**Telja línur í helstu staðfærslugögnum**

$ wc -l docs/i18n/locales/is.js docs/about/content/is.html docs/index.html docs/about/index.html docs/manifest.webmanifest docs/app.js docs/reverse-ui.js docs/i18n/registry.js docs/i18n/runtime.js docs/about/about.js

<details>
<summary>12 lines</summary>

```
351 docs/i18n/locales/is.js
   331 docs/about/content/is.html
   203 docs/index.html
    81 docs/about/index.html
  1113 docs/manifest.webmanifest
  1185 docs/app.js
  1144 docs/reverse-ui.js
   578 docs/i18n/registry.js
    71 docs/i18n/runtime.js
   195 docs/about/about.js
  5252 total
<shellId: 1 completed with exit code 0>
```

</details>


---

<sub>12s</sub>

### `rg`

**[A-Za-z]{3,}|[\u0590-\u08FF\u0900-\u0DFF\u3040-\u30FF\u4E00-\u9FFF]**

"[A-Za-z]{3,}|[\u0590-\u08FF\u0900-\u0DFF\u3040-\u30FF\u4E00-\u9FFF]" (docs/i18n/locales/is.js, docs/about/content/is.html)

<details>
<summary>53 matches</summary>

```
[grep content: 589 matches across 2 file(s) under docs]

about/content/is.html (289 match(es)):
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
  ... 265 more match(es) omitted in this file
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

i18n/locales/is.js (300 match(es)):
   "use strict";
   export default Object.freeze({
     "code": "is",
     "displayName": "Íslenska",
     "dir": "ltr",
     "intlLocale": "is-IS",
     "messages": {
       "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
       "manifest.shortName": "Pastafari",
       "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
       "app.title": "Pastafari-dagatal",
       "nav.skip": "Fara í dagsetningarleit",
  ... 276 more match(es) omitted in this file
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
```

</details>


---

<sub>12s</sub>

### `rg`

**data-i18n|data-i18n-attr|textContent\s*=|innerHTML|aria-label|placeholder|title\s*=|setAttribute\("aria|document\.title|\.title\s*=|alert\(|console\.(warn|error)**

"data-i18n|data-i18n-attr|textContent\s*=|innerHTML|aria-label|placeholder|title\s*=|setAttribute\("aria|document\.title|\.title\s*=|alert\(|console\.(warn|error)" (docs/app.js, docs/reverse-ui.js, docs/i18n/registry.js, docs/i18n/runtime.js, docs/about/about.js)

<details>
<summary>107 matches</summary>

```
[grep content: 102 matches across 5 file(s) under docs]

app.js (51 match(es)):
         strong.textContent = value;
     elements["target-marker"].textContent = t(markerKey);
       line.textContent = t("target.notInView");
     elements["cutlet-meta"].textContent = t("calendar.currentCutlet", { year: formatInteger(view.year) });
     elements["cutlet-heading"].textContent = viewCutletName;
     elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
     elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
       card.setAttribute("aria-label", dateAria(day));
         card.setAttribute("aria-current", "date");
         badge.textContent = t(state.targetFollowsCurrentDay ? "target.today" : "target.searched");
     locationButton.textContent = t("location.useDevice");
         console.error(error);
     elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
     elements["year-overview-context"].textContent = t("year.context", {
     heading.textContent = title;
     details.textContent = meta;
     elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
     elements["year-overview-context"].textContent = t("year.context", {
     elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
     elements["year-cutlet-count"].textContent = formatInteger(structure.cutletCount);
     elements["year-month-count"].textContent = formatInteger(structure.monthCount);
     elements["year-range"].textContent = t("year.rangeValue", {
     elements["year-cutlet-position"].textContent = displayedCutlet
       elements["year-target-position"].textContent = t("year.targetPosition", {
     elements["year-cutlets-summary"].textContent = t("year.cutletsSummary", {
     elements["year-months-summary"].textContent = t("year.monthsSummary", {
     elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
     elements["year-overview-context"].textContent = t("year.context", {
     elements["year-overview-error"].textContent = t("year.error");
     console.error(error);
     cell.setAttribute("aria-label", dateAria(day));
     elements["comparison-primary-heading"].textContent = t("comparison.actionHeading", {
     elements["comparison-secondary-heading"].textContent = t("comparison.actionHeading", {
     elements["comparison-summary"].textContent = t("comparison.summary", {
         row.setAttribute("aria-current", "date");
       civil.textContent = formatJdnAsGregorian(primary.jdn);
       sequence.textContent = t("reverse.result.jdn", { jdn: primary.jdn.toString() });
     console.error(error);
     elements["error-message"].textContent = t(key);
       option.textContent = t(definition.labelKey);
       labelText.textContent = t(field.labelKey);
           option.textContent = choice.labelKey ? t(choice.labelKey) : choice.label;
     configuration.help.textContent = definition.helpKey ? t(definition.helpKey) : "";
     console.error(error);
     configuration.error.textContent = t(configuration.errorKey);
       elements["error-message"].textContent = t(lastVisibleErrorKey);
         console.error(error);
       alert(t("day.staleWarning", {
       updateObserverLocation(nextObserver).catch((error) => console.error(error));
     }).catch((error) => console.error(error));
     console.error(error);

i18n/runtime.js (5 match(es)):
       option.textContent = locale.displayName;
     for (const element of root.querySelectorAll("[data-i18n]")) {
       element.textContent = translate(locale, element.dataset.i18n);
     for (const element of root.querySelectorAll("[data-i18n-attr]")) {
         if (separator <= 0) throw new SyntaxError(`Invalid data-i18n-attr binding: ${binding}`);

about/about.js (9 match(es)):
     elements["article-content"].innerHTML = html;
     elements["article-content"].setAttribute("aria-busy", "true");
         console.warn(`Falling back from article locale ${articleLocale.code} to ${ARTICLE_FALLBACK_LOCALE}.`, selectedError);
       console.error(error);
       elements["about-load-error"].textContent = t("about.loadError");
       elements["article-content"].setAttribute("aria-busy", "false");
       link.textContent = heading.textContent.trim();
         console.error(error);
       .catch((error) => console.error(error));
i18n/registry.js:         `Locale ${localeCode} has placeholder mismatch for ${key}: expected {${expected.join(", ")}}, received {${actual.join(", ")}}.`,

reverse-ui.js (36 match(es)):
     if (text !== null) element.textContent = text;
     element.textContent = text;
       this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
         this.error.textContent = this.services.rt("reverse.error.input");
       this.calendarLabelText.textContent = this.services.rt(this.labelKey);
         element.textContent = this.services.rt(element.dataset.reverseKey);
       const title = node("strong", "reverse-card-title", id);
       this.labelText.textContent = this.services.rt("reverse.variable.label");
       this.domainText.textContent = this.services.rt("reverse.variable.domain");
       this.removeButton.textContent = this.services.rt("reverse.action.remove");
       this.title = node("strong", "reverse-card-title", id);
       this.removeButton.textContent = this.services.rt("reverse.action.remove");
       this.typeText.textContent = this.services.rt("reverse.constraint.type");
         element.textContent = this.services.rt(element.dataset.reverseKey);
       this.status.textContent = this.rt("reverse.status.running");
       this.progress.textContent = "";
       this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
       this.status.textContent = this.rt(key, { count: this.services.formatInteger(classification.solutionCount) });
       this.error.textContent = this.rt(this.visibleErrorMessage.key, this.visibleErrorMessage.values);
       console.error(error);
       this.status.textContent = "";
       console.error(error);
         this.status.textContent = this.rt("reverse.status.cancelled");
       this.status.textContent = "";
       this.progress.textContent = "";
       this.root.setAttribute("aria-busy", String(running));
       this.basicTab.setAttribute("aria-pressed", String(basic));
       this.advancedTab.setAttribute("aria-pressed", String(!basic));
         this.basicActiveValue.textContent = this.rt("reverse.basic.activeValue", {
         this.status.textContent = this.rt("reverse.status.stale");
         element.textContent = this.rt(element.dataset.reverseKey);
       this.addVariableButton.textContent = this.rt("reverse.action.addVariable");
       this.addConstraintButton.textContent = this.rt("reverse.action.addConstraint");
       this.basicSolve.textContent = this.advancedSolve.textContent = this.rt("reverse.action.solve");
       this.basicCancel.textContent = this.advancedCancel.textContent = this.rt("reverse.action.cancel");
       this.clearButton.textContent = this.rt("reverse.action.clear");
```

</details>


---

<sub>16s</sub>

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
    "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
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

<sub>16s</sub>

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

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 1-170)

<details>
<summary>155 lines</summary>

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
  <p>Wide Choice jafngildir ekki því að mynda óháða og jafnt dreifða tölustafi í <code>Q</code>-grunni þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
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
```

</details>


---

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/is.html (lines 171-331)

<details>
<summary>146 lines</summary>

```
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
  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt dagabil, endurræsing, ræsing eftir dvala (<code>cold wake</code>) og hegðun undir álagi.</p>
  <p>Verkefnisskjölin greina þó enn á milli opinberrar beta-/matsútsetningar og varanlegrar hýstrar framleiðsluþjónustu með SLA. Þess vegna ætti hugtaksskýringarsíða ekki að festa netfang netþjóns, hýsingaraðila eða útgáfunúmer eins og það væri hluti af dagatalinu sjálfu.</p>
  <p>Seer má nota forútreikning, sérstaka framsetningu, SIMD, algebru og aðrar styttingar. Hann þarf ekki að líkja eftir allri reiknisögu kanónísku útfærslunnar skref fyrir skref svo lengi sem hann framkvæmir sömu merkingarlegu aðgerð og skilar sama svari.</p>
  <p>Hagræðing veitir ekki sjálfstætt merkingarvald.</p><hr>
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

<sub>16s</sub>

### `rg`

**"(name|short_name|description|lang|dir)_localized"|"is(-IS)?"|"dir"**

""(name|short_name|description|lang|dir)_localized"|"is(-IS)?"|"dir"" (docs/manifest.webmanifest)

<details>
<summary>228 matches</summary>

```
[grep content: 226 matches across 1 file(s) under docs]

manifest.webmanifest (226 match(es)):
     "name_localized": {
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
       "is": {
         "lang": "is",
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
     "short_name_localized": {
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
       "is": {
         "lang": "is",
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
     "description_localized": {
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
       "is": {
         "lang": "is",
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "rtl"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
         "dir": "ltr"
     "dir": "ltr",
```

</details>


---

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 1-170)

<details>
<summary>157 lines</summary>

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
```

</details>


---

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js (lines 1-180)

<details>
<summary>164 lines</summary>

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
```

</details>


---

<sub>16s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js (lines 1-210)

<details>
<summary>194 lines</summary>

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
```

</details>


---

<sub>31s</sub>

### `bash`

**Skoða íslenskar manifest-færslur**

$ nl -ba docs/manifest.webmanifest | sed -n '295,390p'

<details>
<summary>97 lines</summary>

```
295	    "sr": {
   296	      "value": "Pastafarijanski kalendar",
   297	      "lang": "sr",
   298	      "dir": "ltr"
   299	    },
   300	    "sv": {
   301	      "value": "Pastafarisk kalender",
   302	      "lang": "sv",
   303	      "dir": "ltr"
   304	    },
   305	    "sw": {
   306	      "value": "Kalenda ya Pastafari",
   307	      "lang": "sw",
   308	      "dir": "ltr"
   309	    },
   310	    "ta": {
   311	      "value": "பாஸ்தாபாரி நாட்காட்டி",
   312	      "lang": "ta",
   313	      "dir": "ltr"
   314	    },
   315	    "te": {
   316	      "value": "పాస్తాఫారి క్యాలెండర్",
   317	      "lang": "te",
   318	      "dir": "ltr"
   319	    },
   320	    "th": {
   321	      "value": "ปฏิทินพาสตาฟารี",
   322	      "lang": "th",
   323	      "dir": "ltr"
   324	    },
   325	    "tr": {
   326	      "value": "Pastafari Takvimi",
   327	      "lang": "tr",
   328	      "dir": "ltr"
   329	    },
   330	    "uk": {
   331	      "value": "Пастафаріанський календар",
   332	      "lang": "uk",
   333	      "dir": "ltr"
   334	    },
   335	    "ur": {
   336	      "value": "پاستافاری کیلنڈر",
   337	      "lang": "ur",
   338	      "dir": "rtl"
   339	    },
   340	    "uz": {
   341	      "value": "Pastafari taqvimi",
   342	      "lang": "uz",
   343	      "dir": "ltr"
   344	    },
   345	    "vi": {
   346	      "value": "Lịch Pastafari",
   347	      "lang": "vi",
   348	      "dir": "ltr"
   349	    },
   350	    "yo": {
   351	      "value": "Kalẹ́ńdà Pastafari",
   352	      "lang": "yo",
   353	      "dir": "ltr"
   354	    },
   355	    "zh": {
   356	      "value": "意面教日历",
   357	      "lang": "zh",
   358	      "dir": "ltr"
   359	    },
   360	    "zu": {
   361	      "value": "Ikhalenda le-Pastafari",
   362	      "lang": "zu",
   363	      "dir": "ltr"
   364	    }
   365	  },
   366	  "short_name": "Pastafari",
   367	  "short_name_localized": {
   368	    "he": {
   369	      "value": "פסטפרי",
   370	      "lang": "he",
   371	      "dir": "rtl"
   372	    },
   373	    "en": {
   374	      "value": "Pastafari",
   375	      "lang": "en",
   376	      "dir": "ltr"
   377	    },
   378	    "af": {
   379	      "value": "Pastafari",
   380	      "lang": "af",
   381	      "dir": "ltr"
   382	    },
   383	    "ar": {
   384	      "value": "Pastafari",
   385	      "lang": "ar",
   386	      "dir": "rtl"
   387	    },
   388	    "az": {
   389	      "value": "Pastafari",
   390	      "lang": "az",
<shellId: 2 completed with exit code 0>
```

</details>


---

<sub>31s</sub>

### `bash`

**Skoða íslensk skilaboð með línunúmerum**

$ nl -ba docs/i18n/locales/is.js | sed -n '1,190p'

<details>
<summary>191 lines</summary>

```
1	"use strict";
     2	
     3	export default Object.freeze({
     4	  "code": "is",
     5	  "displayName": "Íslenska",
     6	  "dir": "ltr",
     7	  "intlLocale": "is-IS",
     8	  "messages": {
     9	    "meta.description": "Pastafari-dagatal með dagsetningarleit og samanburði.",
    10	    "manifest.shortName": "Pastafari",
    11	    "manifest.defaultDescription": "Pastafari-dagatal sem reiknar á tækinu og skilar sömu niðurstöðu fyrir sama inntak.",
    12	    "app.title": "Pastafari-dagatal",
    13	    "nav.skip": "Fara í dagsetningarleit",
    14	    "app.intro": "Finndu dagsetningu í einu dagatalanna sem vefurinn styður. Þá sérðu fulla Pastafari-dagsetningu þess dags og kótelettuna sem hann tilheyrir.",
    15	    "guide.open": "Hvernig nota ég þennan vef?",
    16	    "guide.openShort": "Hvernig á að nota vefinn",
    17	    "reverse.error.absoluteDateField": "Dagsetningin inniheldur ógilt gildi.",
    18	    "reverse.error.limitSafeInteger": "{field} er utan öruggs heiltölusviðs.",
    19	    "reverse.error.limitPositive": "{field} verður að vera jákvætt.",
    20	    "app.brand": "PASTAFARI",
    21	    "about.open": "Um Pastafari-dagatalið",
    22	    "about.openShort": "Um dagatalið",
    23	    "about.title": "Um Pastafari-dagatalið",
    24	    "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
    25	    "about.intro": "Hvernig dagatalið sýnir daga, ár, kótelettur, fléttaða mánuði og aðgerðardaginn.",
    26	    "about.skip": "Fara í skýringu dagatalsins",
    27	    "about.back": "Til baka í dagatalið",
    28	    "about.tocKicker": "Á þessari síðu",
    29	    "about.toc": "Efnisyfirlit",
    30	    "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
    31	    "about.loadError": "Ekki tókst að hlaða skýringu dagatalsins.",
    32	    "language.label": "Tungumál",
    33	    "day.staleWarning": "Núverandi dagur breyttist úr {previousDate} í {currentDate}. Þar sem aðgerðardagurinn fylgdi deginum í dag eru dagsetningarnar sem birtast ekki lengur uppfærðar. Þær verða reiknaðar aftur eftir að þú lokar þessum skilaboðum.",
    34	    "location.assumption": "(Ef engar upplýsingar benda til annars er gert ráð fyrir að tækið sé í Kisurra.)",
    35	    "location.useDevice": "Nota staðsetningu tækisins",
    36	    "search.kicker": "Dagsetningarleit",
    37	    "search.heading": "Hvaða dag viltu finna?",
    38	    "search.intro": "Veldu dagatal, sláðu inn dagsetningu og veldu „Sýna dagsetningu“. Núverandi Pastafari-dagur er sjálfgefinn í reitunum.",
    39	    "search.calendarLabel": "Dagatal fyrir innslátt",
    40	    "search.submit": "Sýna dagsetningu",
    41	    "search.invalid": "Ekki tókst að þekkja þessa dagsetningu. Gakktu úr skugga um að allir reitir séu útfylltir og að dagsetningin sé til í valda dagatalinu.",
    42	    "settings.summary": "Valkostir fyrir útreikning og samanburð",
    43	    "settings.heading": "Breyta aðgerðardegi",
    44	    "settings.intro": "Aðgerðardagurinn er upphafspunktur útreikningsins. Sjálfgefið notar vefurinn núverandi Pastafari-dag sem ákvarðaður er fyrir virka staðsetningu athugandans.",
    45	    "settings.actionCalendarLabel": "Dagatal til að slá inn aðgerðardag",
    46	    "settings.apply": "Nota aðgerðardag",
    47	    "settings.reset": "Endurstilla á núverandi Pastafari-dag",
    48	    "settings.invalid": "Aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
    49	    "comparison.toggle": "Bera tvo útreikninga saman hlið við hlið",
    50	    "comparison.toggleHelp": "Tiltækt á breiðum skjá. Hver lína sýnir sama fyrirspurnardag með tveimur mismunandi aðgerðardögum.",
    51	    "comparison.secondActionLabel": "Dagatal til að slá inn seinni aðgerðardaginn",
    52	    "comparison.apply": "Uppfæra samanburð",
    53	    "comparison.kicker": "Samanburður samstilltur eftir degi",
    54	    "comparison.heading": "Sömu dagar, tveir aðgerðardagar",
    55	    "comparison.intro": "Hver lína inniheldur nákvæmlega sama fyrirspurnardag. Aðeins aðgerðardagurinn er ólíkur í dálkunum tveimur.",
    56	    "comparison.sameDay": "Sami fyrirspurnardagur í báðum útreikningum",
    57	    "comparison.actionHeading": "Aðgerðardagur: {date}",
    58	    "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem fyrri útreikningurinn opnaði.",
    59	    "comparison.scrollAria": "Samanburðartafla sömu daga undir tveimur útreikningum",
    60	    "comparison.desktopOnly": "Öll samanburðartaflan er tiltæk á breiðum skjá.",
    61	    "comparison.invalid": "Seinni aðgerðardagurinn er ógildur. Athugaðu dagsetninguna og reyndu aftur.",
    62	    "field.year": "Ár",
    63	    "field.month": "Mánuður",
    64	    "field.day": "Dagur",
    65	    "field.relatedYear": "Samsvarandi gregorískt ár",
    66	    "field.leapMonth": "Innskotsmánuður",
    67	    "field.era": "Tímabil",
    68	    "field.eraYear": "Ár innan tímabils",
    69	    "field.ayyamiHa": "Ayyám-i-Há",
    70	    "field.baktun": "Baktun",
    71	    "field.katun": "Katun",
    72	    "field.tun": "Tun",
    73	    "field.uinal": "Uinal",
    74	    "field.kin": "Kin",
    75	    "field.correlation": "Fylgnitala",
    76	    "era.meiji": "Meiji",
    77	    "era.taisho": "Taishō",
    78	    "era.showa": "Shōwa",
    79	    "era.heisei": "Heisei",
    80	    "era.reiwa": "Reiwa",
    81	    "calendarInput.gregorian": "Gregorískt",
    82	    "calendarInput.julian": "Júlíanskt",
    83	    "calendarInput.hebrew": "Hebreskt",
    84	    "calendarInput.islamicCivil": "Borgaralegt íslamskt",
    85	    "calendarInput.islamicUmmAlQura": "Umm al-Qura",
    86	    "calendarInput.solarHijriOfficial": "Sól-Hijri — opinbert",
    87	    "calendarInput.solarHijriArithmetic": "Sól-Hijri — reiknað 2.820",
    88	    "calendarInput.chinese": "Kínverskt",
    89	    "calendarInput.hinduOldSolar": "Fornt hindúdagatal — sólarform",
    90	    "calendarInput.hinduOldLunar": "Fornt hindúdagatal — tunglform",
    91	    "calendarInput.saka": "Saka",
    92	    "calendarInput.thaiBuddhist": "Taílenskt búddískt",
    93	    "calendarInput.ethiopic": "Eþíópískt",
    94	    "calendarInput.coptic": "Koptískt",
    95	    "calendarInput.japaneseImperial": "Japanskt keisaradagatal",
    96	    "calendarInput.minguo": "Minguo",
    97	    "calendarInput.bahaiTehran": "Bahá’í — jafndægur í Teheran",
    98	    "calendarInput.bahaiWestern": "Bahá’í — vestrænt reiknað",
    99	    "calendarInput.mayaLongCount": "Langtal Maya",
   100	    "calendarHelp.hebrew": "Mánuðir eru valdir eftir nafni. Ár og dag má slá inn með tugatölustöfum eða hebreskum talnastöfum, til dæmis תשפ״ו eða י״ד; ár ritað með stöfum án þúsundamerkis er túlkað með 5.000 bætt við.",
   101	    "calendarHelp.intl": "Þessi umbreyting notar dagatalsstuðning sem er innbyggður í vafrann. Ef vafrinn getur ekki sýnt dagsetninguna segir vefurinn það skýrt.",
   102	    "calendarHelp.chinese": "Sláðu inn gregoríska árið sem samsvarar kínverska árinu og merktu „Innskotsmánuður“ aðeins fyrir endurtekna mánuðinn.",
   103	    "calendarHelp.hindu": "Sláðu inn ár og dag samkvæmt forna hindúatalinu og veldu mánuðinn eftir nafni. Í tunglforminu má einnig merkja innskotsmánuð.",
   104	    "calendarHelp.japanese": "Ár 1 hefst á fyrsta degi tímabilsins; fyrir fyrsta árið má einnig slá inn 元 eða 元年. Dagsetningu fyrir upphaf eða eftir lok tímabilsins er hafnað.",
   105	    "calendarHelp.bahai": "Veldu mánuð eftir nafni eða Ayyám-i-Há. Formið sem byggir á jafndægri í Teheran styður venjulegt gregorískt bil 1844–3000.",
   106	    "calendarHelp.maya": "Sjálfgefna fylgnitalan er GMT 584.283. Þú getur breytt henni ef þú notar aðra fylgni.",
   107	    "loading.kicker": "Reiknað staðbundið",
   108	    "loading.title": "Leitað að kótelettu og dagsetningu…",
   109	    "error.kicker": "Ekki er hægt að sýna dagatalið",
   110	    "error.title": "Útreikningsvélin hlaðaðist ekki",
   111	    "error.reload": "Hlaða aftur",
   112	    "error.timeout": "Útreikningurinn tekur of langan tíma.",
   113	    "error.engineFailed": "Útreikningsvélin bilaði.",
   114	    "error.engineLoadFailed": "Ekki tókst að hlaða útreikningsvélinni.",
   115	    "calendar.toolbarAria": "Flakk milli kótelettna",
   116	    "calendar.previous": "Fyrri kóteletta",
   117	    "calendar.today": "Til baka í dag",
   118	    "calendar.next": "Næsta kóteletta",
   119	    "calendar.daysAria": "Dagar í kótelettunni {cutletName}",
   120	    "calendar.currentCutlet": "Ár {year} · kóteletta",
   121	    "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
   122	    "calendar.targetOutside": "Leitaða dagsetningin er ekki í kótelettunni sem nú er sýnd. Þú getur haldið áfram að fletta eða leitað að annarri dagsetningu.",
   123	    "year.kicker": "Árið í hnotskurn",
   124	    "year.heading": "Uppbygging árs {year}",
   125	    "year.context": "Þessi uppbygging er reiknuð fyrir aðgerðardaginn {actionDate}. Ef aðgerðardeginum er breytt getur þurft að byggja ársmörk, kótelettur og mánuði upp að nýju.",
   126	    "year.loading": "Byggir upp alla ársuppbygginguna…",
   127	    "year.error": "Ekki tókst að byggja upp alla ársuppbygginguna. Kótelettusýnin er áfram tiltæk.",
   128	    "year.lengthLabel": "Lengd ársins",
   129	    "year.cutletCountLabel": "Kótelettur",
   130	    "year.monthCountLabel": "Mánuðir",
   131	    "year.rangeLabel": "Gregorískt bil",
   132	    "year.daysValue": "{count} dagar",
   133	    "year.rangeValue": "{startDate}–{endDate}",
   134	    "year.displayedCutletPosition": "Sýnda kótelettan nær yfir daga {start}–{end} ársins.",
   135	    "year.targetPosition": "Leitaða dagsetningin er dagur {day} af {length} í þessu ári.",
   136	    "year.monthExplainer": "Mánuðir fléttast óháð kótelettum í gegnum árið: mánuður er ekki undirdeild kótelettu og dagar hans geta birst í mörgum aðskildum runum. Lengd mánaðar er því heildarfjöldi daga sem honum er úthlutað, ekki endilega eitt samfellt tímabil.",
   137	    "year.cutletsSummary": "Kótelettur á þessu ári ({count})",
   138	    "year.monthsSummary": "Mánuðir á þessu ári ({count})",
   139	    "year.numberedName": "{number}. {name}",
   140	    "year.cutletMeta": "Lengd: {length} dagar · staða í árinu: dagar {start}–{end}",
   141	    "year.monthMeta": "Dagar: {length} · samfelldar runur: {runs} · fyrsta birting: dagur {first} · síðasta: dagur {last}",
   142	    "target.today": "Þetta er í dag",
   143	    "target.searched": "Þetta er dagsetningin sem þú leitaðir að",
   144	    "target.context": "Dagsetning fyrirspurnardags: {targetDate} · aðgerðardagur: {actionDate}",
   145	    "target.notInView": "Dagsetningin sem þú leitaðir að er enn varðveitt; kótelettan sem nú er sýnd er önnur.",
   146	    "date.aria": "Ár {year} frá sköpun heimsins, dagur {dayInCutlet} í kótelettunni {cutletName}, dagur {dayInMonth} í mánuðinum {monthName}",
   147	    "date.yearLine": "Ár {year} frá sköpun heimsins",
   148	    "date.cutletLine": "Dagur {dayInCutlet} í kótelettunni {cutletName}",
   149	    "date.monthLine": "Dagur {dayInMonth} í mánuðinum {monthName}",
   150	    "guide.eyebrow": "Notkunarleiðbeiningar",
   151	    "guide.heading": "Hvað er hægt að gera hér og hvernig?",
   152	    "guide.intro": "Vefurinn sýnir fulla Pastafari-dagsetningu fyrir hvaða dag sem er, tekur við leit í mörgum dagatölum og getur á breiðum skjá borið saman áhrif aðgerðardagsins.",
   153	    "guide.1.heading": "Opnaðu vefinn og sjáðu dagsetningu dagsins",
   154	    "guide.1.body": "Um leið og tengillinn opnast ákvarðar vefurinn núverandi Pastafari-dag fyrir virka staðsetningu athugandans og sýnir kótelettuna sem hann tilheyrir. Dagamörkin eru staðsetningarháði tímapunkturinn þegar miðja Venusar fer um neðri hluta staðbundna hádegisbaugsins, eins og lýst er í ASTRONOMICAL-DAY.md; þau eru ekki borgaralegt miðnætti. Engin skráning eða innskráning er nauðsynleg og engin dagsetning er send á reikniþjón.",
   155	    "guide.2.heading": "Leitaðu í hvaða studdu dagatali sem er",
   156	    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
   157	    "guide.3.heading": "Lestu dagsetninguna",
   158	    "guide.3.body": "Hver reitur hefur þrjár fastar línur: ár frá sköpun heimsins; númer dags í kótelettunni og nafn hennar; síðan dag í mánuðinum og nafn mánaðarins. Engin ein tala táknar alla dagsetninguna. Nafn mánaðarins ræður lit reitsins.",
   159	    "guide.4.heading": "Flettu án þess að velja fyrir mistök",
   160	    "guide.4.body": "„Fyrri kóteletta“ og „Næsta kóteletta“ fara í nágrannakótelettur. Aðrir dagareitir eru ekki hnappar því smellur á þá gerir ekkert. „Til baka í dag“ endurstillir bæði leitina og aðgerðardaginn á núverandi Pastafari-dag.",
   161	    "guide.5.heading": "Breyttu aðgerðardeginum",
   162	    "guide.5.body": "Opnaðu „Valkostir fyrir útreikning og samanburð“ undir leitinni. Þar geturðu valið dagatal og slegið inn annan aðgerðardag. Næstu leitir nota hann þar til þú endurstillir á núverandi Pastafari-dag. Þessi háþróaði valkostur er tiltækur án þess að þyngja venjulegu sýnina.",
   163	    "guide.6.heading": "Berðu sömu daga saman tvisvar",
   164	    "guide.6.body": "Á breiðum skjá virkjarðu samanburðinn á sama stað. Hver lína inniheldur nákvæmlega sama fyrirspurnardag; fyrri dálkurinn notar fyrri aðgerðardaginn og sá seinni hinn. Sjálfgefið er að bera í dag saman við morgundaginn, svo auðvelt er að sjá hvaða Pastafari-dagsetningar breytast.",
   165	    "guide.7.heading": "Skoðaðu allt árið",
   166	    "guide.7.body": "Undir kótelettusýninni sýnir vefurinn uppbyggingu sýnda ársins: lengd og bil, hverja kótelettu og lengd hennar, og hvern mánuð. Fyrir mánuði sýnir hann einnig fjölda samfelldra runa og fyrstu og síðustu birtingu, svo fléttunin í gegnum árið verður sýnileg.",
   167	    "guide.note": "Raðir og dálkar reitanetsins eru aðeins sjónræn uppröðun, ekki vikur. Í samanburðartöflunni hefur röðunin hins vegar merkingu: hver lína er sami fyrirspurnardagurinn.",
   168	    "guide.back": "Til baka í leit og dagatal",
   169	    "footer.local": "Útreikningurinn fer fram á tækinu þínu; vefurinn hefur engan notandareikning og engan rakningarkóða.",
   170	    "footer.open": "Tengillinn er opinber og opnast beint, einnig í einkavafraglugga.",
   171	    "reverse.kicker": "Öfug leit",
   172	    "reverse.heading": "Finna dag út frá Pastafari-dagsetningu hans",
   173	    "reverse.intro": "Sláðu inn fulla Pastafari-dagsetningu og skilgreindu aðgerðardag hennar. Leitin fer fram staðbundið á þessu tæki.",
   174	    "reverse.mode.basic": "Ein dagsetning",
   175	    "reverse.mode.advanced": "Skorðukerfi",
   176	    "reverse.basic.heading": "Öfug leit að einni dagsetningu",
   177	    "reverse.basic.dateHeading": "Pastafari-dagsetning sem á að finna",
   178	    "reverse.field.year": "Ár",
   179	    "reverse.field.cutlet": "Kóteletta",
   180	    "reverse.field.dayInCutlet": "Dagur í kótelettu",
   181	    "reverse.field.month": "Mánuður",
   182	    "reverse.field.dayInMonth": "Dagur í mánuði",
   183	    "reverse.basic.calculationHeading": "Aðgerðardagur",
   184	    "reverse.basic.calculationMode": "Hvernig er aðgerðardagurinn skilgreindur?",
   185	    "reverse.basic.calculation.active": "Nota virkan aðgerðardag vefsins",
   186	    "reverse.basic.calculation.absolute": "Nota aðra þekkta dagsetningu",
   187	    "reverse.basic.calculation.same": "Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)",
   188	    "reverse.basic.calculation.pastafari": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
   189	    "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
   190	    "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
<shellId: 3 completed with exit code 0>
```

</details>


---

<sub>31s</sub>

### `bash`

**Skoða öfuga leit og árstexta með línunúmerum**

$ nl -ba docs/i18n/locales/is.js | sed -n '190,290p'

<details>
<summary>102 lines</summary>

```
190	    "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
   191	    "reverse.basic.sameHeading": "Endanlegt leitarsvið fyrir c = t",
   192	    "reverse.basic.rangeStart": "Upphaf sviðs",
   193	    "reverse.basic.rangeEnd": "Lok sviðs",
   194	    "reverse.basic.toAdvanced": "Halda áfram í ritli skorðukerfisins",
   195	    "reverse.basic.toAdvancedHelp": "Endurkvæmir Pastafari-aðgerðardagar eru settir fram sem breytur og skorður svo hægt sé að lengja keðjuna án tilbúinna dýptarmarka.",
   196	    "reverse.action.solve": "Leita",
   197	    "reverse.action.cancel": "Hætta við leit",
   198	    "reverse.action.open": "Opna í dagatali",
   199	    "reverse.action.addVariable": "Bæta við dagsetningarbreytu",
   200	    "reverse.action.addConstraint": "Bæta við skorðu",
   201	    "reverse.action.remove": "Fjarlægja",
   202	    "reverse.action.clear": "Hreinsa niðurstöður",
   203	    "reverse.progress.reverse": "Úrlausn Pastafari-tengsla",
   204	    "reverse.progress.verify": "Staðfesting mögulegra lausna",
   205	    "reverse.progress.done": "Leit lokið",
   206	    "reverse.progress.scanned": "Loknar vinnueiningar: {count}",
   207	    "reverse.status.running": "Leitað á tækinu…",
   208	    "reverse.status.cancelled": "Leit hætt við.",
   209	    "reverse.status.superseded": "Nýrri leit kom í stað þessarar leitar.",
   210	    "reverse.status.completeEmpty": "Engin lausn er til á svæðinu sem var leitað að fullu.",
   211	    "reverse.status.completeSolutions": "Leit lokið. Allar {count} lausnir á svæðinu eru sýndar.",
   212	    "reverse.status.partialEmpty": "Leitin stöðvaðist áður en henni lauk. Engin lausn hefur fundist enn.",
   213	    "reverse.status.partialSolutions": "{count} staðfestar lausnir eru sýndar, en leitin stöðvaðist áður en henni lauk og fleiri gætu verið til.",
   214	    "reverse.status.stale": "Þessar niðurstöður notuðu fyrri virkan aðgerðardag. Keyrðu leitina aftur til að nota þann núverandi.",
   215	    "reverse.status.rangeRequired": "Ekki er hægt að leita þetta vandamál til fulls fyrr en endanlegu sviði eða fastri dagsetningu hefur verið bætt við.",
   216	    "reverse.status.timeout": "Leitin náði tímamörkum áður en henni lauk.",
   217	    "reverse.status.failed": "Vél öfugrar leitar brást.",
   218	    "reverse.result.heading": "Lausnir",
   219	    "reverse.result.solution": "Lausn {index}",
   220	    "reverse.result.target": "Fyrirspurnardagur",
   221	    "reverse.result.calculation": "Aðgerðardagur",
   222	    "reverse.result.jdn": "JDN {jdn}",
   223	    "reverse.result.complete": "Full leit",
   224	    "reverse.result.partial": "Leit að hluta",
   225	    "reverse.advanced.heading": "Lausnaraðferð fyrir skorðukerfi",
   226	    "reverse.advanced.intro": "Skilgreindu dagsetningarbreytur og tengsl þeirra. Hringir eru leyfðir þegar kerfið er þrengt að endanlegum sviðum.",
   227	    "reverse.variables.heading": "Dagsetningarbreytur",
   228	    "reverse.variable.label": "Birtingarnafn",
   229	    "reverse.variable.defaultName": "Dagsetning {index}",
   230	    "reverse.variable.domain": "Svið",
   231	    "reverse.variable.domain.unknown": "Óþekkt (verður að takmarkast af öðrum skorðum)",
   232	    "reverse.variable.domain.exact": "Nákvæm þekkt dagsetning",
   233	    "reverse.variable.domain.range": "Endanlegt dagsetningarsvið",
   234	    "reverse.constraint.heading": "Skorður",
   235	    "reverse.constraint.type": "Tegund skorðu",
   236	    "reverse.constraint.pastafari": "Pastafari-dagsetning",
   237	    "reverse.constraint.equal": "Sami dagur á tímalínunni",
   238	    "reverse.constraint.order": "Tímaröð",
   239	    "reverse.constraint.difference": "Mismunur í dögum",
   240	    "reverse.constraint.left": "Vinstri dagsetning",
   241	    "reverse.constraint.right": "Hægri dagsetning",
   242	    "reverse.constraint.target": "Fyrirspurnardagsbreyta",
   243	    "reverse.constraint.calculationMode": "Uppruni aðgerðardags",
   244	    "reverse.constraint.calculation.variable": "Önnur dagsetningarbreyta",
   245	    "reverse.constraint.calculation.absolute": "Þekkt dagsetning",
   246	    "reverse.constraint.calculation.same": "Sama og fyrirspurnardagur (c = t)",
   247	    "reverse.constraint.calculationVariable": "Aðgerðardagsbreyta",
   248	    "reverse.constraint.orderOp": "Tengsl",
   249	    "reverse.constraint.differenceMode": "Mismunarregla",
   250	    "reverse.constraint.differenceExact": "Nákvæmur mismunur",
   251	    "reverse.constraint.differenceRange": "Mismunarsvið",
   252	    "reverse.constraint.equals": "Nákvæmir dagar (vinstri − hægri)",
   253	    "reverse.constraint.min": "Lágmarksdagar (vinstri − hægri)",
   254	    "reverse.constraint.max": "Hámarksdagar (vinstri − hægri)",
   255	    "reverse.options.heading": "Leitarmörk",
   256	    "reverse.options.intro": "Skildu mörkin auð ef þú vilt engin mörk nota. Mörk eru aldrei sett í laumi.",
   257	    "reverse.options.maxSolutions": "Stöðva eftir þennan fjölda staðfestra lausna",
   258	    "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnueininga",
   259	    "reverse.options.timeout": "Tímamörk í millisekúndum",
   260	    "reverse.advanced.emptyVariables": "Bættu við að minnsta kosti einni dagsetningarbreytu.",
   261	    "reverse.advanced.emptyConstraints": "Kerfi má vera án skorða, en sérhver breyta sem eftir er verður samt að hafa endanlegt svið.",
   262	    "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
   263	    "reverse.error.range": "Lok sviðs mega ekki vera á undan upphafi þess.",
   264	    "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
   265	    "reverse.error.pastafari": "Sláðu inn alla fimm reiti Pastafari-dagsetningarinnar.",
   266	    "reverse.calendar.label": "Dagatal fyrir þekkta dagsetningu",
   267	
   268	  },
   269	  "calendar": {
   270	    "cutlets": {
   271	      "bronze": "Brons",
   272	      "fox": "Refur",
   273	      "kidney": "Nýra",
   274	      "lagash": "Lagash",
   275	      "thought": "Hugsun",
   276	      "fourPartsOfNine": "Fjórir hlutar af níu",
   277	      "palgurash": "Palgurash",
   278	      "papyrusSedge": "Papýrusstör",
   279	      "cluster": "Klasi",
   280	      "scorpion": "Sporðdreki",
   281	      "ash": "Aska",
   282	      "wheat": "Hveiti",
   283	      "river": "Á",
   284	      "laughter": "Hlátur",
   285	      "akkad": "Akkad",
   286	      "horn": "Horn",
   287	      "theEmptyJar": "Tóma krukkan"
   288	    },
   289	    "months": {
   290	      "clay": "Leir",
<shellId: 4 completed with exit code 0>
```

</details>


---

<sub>31s</sub>

### `bash`

**Finna viðkvæma málnotkun í /about**

$ nl -ba docs/about/content/is.html | sed -n '1,331p' | grep -nE 'cold wake|Short Choice|Wide Choice|determin|milljón|Pastafari-merki|day-id|ARIA|Seer|móðgast|hlið|tengsla|tímalínu|aðgerðardag|samfelld'

<details>
<summary>55 lines</summary>

```
5:     5	  <p>Dagatalið festir ekki einn óbreytanlegan Pastafari-„miða“ á hvern dag. Til að fá dagsetningu þarf tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, þann dag sem spurt er um Pastafari-dagsetningu fyrir.</p>
6:     6	  <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
8:     8	  <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
16:    16	  <p>Aðgerðardagurinn, staðsetning athugandans, auðkenni dagsins á tímalínunni eða aðrar tæknilegar upplýsingar mega birtast við hlið dagsetningarinnar, en þær eru ekki sjötta dagsetningarreiturinn.</p><hr>
20:    20	  <h2>Af hverju þarf aðgerðardag?</h2>
26:    26	<section class="about-section" id="day-identity" data-toc-section data-toc-level="2">
28:    28	  <p>Greina þarf á milli <strong>auðkennis dagsins</strong> og <strong>Pastafari-framsetningar hans</strong>. Hið fyrra er fastur staður tiltekins dags á tímalínunni; hið síðara eru þau fimm gildi sem fást þegar dagurinn er sýndur undir tilteknum aðgerðardegi.</p>
29:    29	  <p>Í vörunni og API má líta á hið fyrra sem <code>day-id</code>: fast auðkenni dags á tímalínunni sem breytist ekki þótt framsetningin breytist. Hins vegar þurfa</p>
34:    34	  <p>Því getur handvirk breyting á aðgerðardegi breytt Pastafari-dagsetningunni sem sýnd er fyrir sama dag, án þess að dagurinn sjálfur færist nokkuð á tímalínunni.</p>
35:    35	  <p>Sama regla gildir um atburði. Fundur, fæðing eða sögulegur atburður ætti að vera tengdur föstu auðkenni á tímalínunni; Pastafari-dagsetningu hans má endurreikna eftir birtingarsamhengi.</p>
41:    41	  <p>Þegar aðgerðardagurinn og fyrirspurnardagurinn eru sami dagur,</p>
45:    45	  <p>Með öðrum orðum: núið er, séð frá sjálfu sér, alltaf innan árs 5000. En ár 5000 er ekki fast sögulegt tímabil; það er valið upp á nýtt í hvert sinn miðað við aðgerðardaginn.</p>
55:    55	  <h2>Ár og hlið</h2>
59:    59	  <p>Ár getur því verið styttra en sólarár eða lengra en fimmtán sólarár. Ársmörkin eru byggð úr kerfi <strong>hliða</strong>; mörk kótelettna koma úr sama kerfi.</p>
66:    66	  <p>Ef dagur 250 í kótelettu er í dag, verður dagur 251 í sömu kótelettu á morgun, nema í dag sé síðasti dagur hennar. Mörk kótelettna eru hlið og kóteletta varir að minnsta kosti</p>
82:    82	  <p>„Dagur í mánuði“ segir því ekki hversu margir dagar á tímalínunni hafa liðið frá fyrstu birtingu mánaðarins. Þetta er raðnúmer meðal þeirra daga sem úthlutað er mánuðinum á árinu. Dagur 48 merkir 48. daginn sem tilheyrir mánuðinum, ekki 47 dögum eftir fyrstu birtingu hans.</p><hr>
90:    90	    <li>Kótelettan mælir staðsetningu innan samfellds tímabils.</li>
99:    99	  <p><strong>Á morgun</strong> er næsti dagur á tímalínunni; <strong>næsti dagur mánaðarins</strong> er næsta birting sama mánaðar.</p>
131:   131	  <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
132:   132	  <p>Lokauppfærslurnar eru <strong>samhliða</strong>: í hverri blöndu eru öll sex nýju gildin reiknuð úr sama gamla ástandinu og aðeins síðan eru allar sex skálarnar uppfærðar í einu.</p>
141:   141	  <h2>Short Choice og Wide Choice</h2>
142:   142	  <p>Fyrir tiltölulega lítil valrúm er <strong>Short Choice</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
143:   143	  <p>Fyrir mjög stór valrúm er <strong>Wide Choice</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
144:   144	  <p>Wide Choice jafngildir ekki því að mynda óháða og jafnt dreifða tölustafi í <code>Q</code>-grunni þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
145:   145	  <p>Dagatalið sjálft er áfram fullkomlega determinískt. „Choice“ er heiti reikniritsþrep, ekki slembiútdráttur við notkun.</p><hr>
151:   151	  <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem tilgreind er í commit-inu <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljón samfellda mánaðarkafla; og meira en 364 milljón færslur frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
171:   171	        <tr><td>Meðalfjöldi samfelldra kafla í mánuði</td><td>100,897</td></tr>
181:   181	  <p>Ástæðan er einföld: ár 5000 verður að innihalda aðgerðardaginn. Lengra ár hefur fleiri daga þar sem það getur verið árið sem inniheldur aðgerðardaginn.</p>
183:   183	  <p>Auk þess eru 86.016 ársbyggingarnar ekki 86.016 fullkomlega óháð úrtök: milli upphafs- og endahliðs eru aðeins 24.786 mismunandi bil. Aðgerðardagar sem liggja nálægt geta valið sama ársbil og samt myndað ólíka innri uppbyggingu.</p>
202:   202	  <p>Ef tveir vilja semja um fund með Pastafari-dagsetningu einni saman verða þeir að minnsta kosti að vera sammála um fimm dagsetningarreiti og aðgerðardaginn sem notaður var í útreikningnum. Betra er að vista aðgerðardaginn sem fast dagauðkenni en sem orðið „í dag“; annars geta tveir reiknað tvö mismunandi dagatöl.</p>
204:   204	    <li>„á morgun“ er næsti dagur á tímalínunni;</li>
207:   207	    <li>„allur mánuðurinn“ getur þýtt mengi daga sem tilheyra mánuðinum eða allt samfellt tímabil á tímalínunni frá fyrstu til síðustu birtingar;</li>
210:   210	  <p>Fyrir sérstaklega mikilvægan fund má einnig vista fastan dag á tímalínunni eða nákvæman tímapunkt. Dagatalið móðgast ekki.</p><hr>
229:   229	  <p>Það má prenta Pastafari-dagatalið; aðeins þarf að taka fram fyrir hvaða aðgerðardag það var reiknað. Slíkt dagatal sýnir byggingu tímans frá sjónarhorni þess dags; ef aðgerðardagurinn breytist getur þurft nýtt dagatal. Prentarinn hefur því enn starf.</p>
230:   230	  <p>Þar sem forskriftin er fullkomin og kerfið determinískt má einnig reikna allt með höndunum: reiknið inntaksteljarana, farið í gegnum 7 falda og 46 sýnilega dropa, uppfærið skálarnar sex, framkvæmið 12 lokablöndurnar, myndið svörin, byggið hliðin, veljið ár og kótelettur, framkvæmið samsetningarval, veljið nöfnin og fléttið síðan mánuðina.</p>
235:   235	  <h2>Hvað er Seer þá?</h2>
236:   236	  <p>Við hlið kanónísku útfærslunnar er hröð reiknivél sem heitir <strong>Pastafarian Calendar Seer</strong>. Seer er ekki uppspretta valds: rétta dagsetningin ræðst af Megillah og kanóníska útreikningnum. Ef Seer er ósammála þeim er villan í Seer.</p>
238:   238	  <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
239:   239	  <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
240:   240	  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt dagabil, endurræsing, ræsing eftir dvala (<code>cold wake</code>) og hegðun undir álagi.</p>
242:   242	  <p>Seer má nota forútreikning, sérstaka framsetningu, SIMD, algebru og aðrar styttingar. Hann þarf ekki að líkja eftir allri reiknisögu kanónísku útfærslunnar skref fyrir skref svo lengi sem hann framkvæmir sömu merkingarlegu aðgerð og skilar sama svari.</p>
254:   254	    <p>Tölusetning daga kringum hann notar jákvæðar oddatölur og sléttar tölur: Stofndagur=1; síðari dagar=3, 5, …; aftur í fortíðina er fyrri dagurinn=2, síðan 4, 6, … . Þannig eru báðar hliðar festipunktsins kóðaðar í þessum teljara án neikvæðra dagnúmera.</p>
259:   259	    <p>Þetta eru fastir festipunktar á tímalínunni, en Pastafari-dagsetningin sem þeim er sýnd ræðst samt af aðgerðardeginum sem spurt er frá.</p>
272:   272	  <p>Ef aðgerðardagurinn <code>c</code> er þekktur er öfug umbreyting mjög stranglega takmörkuð. Innan þekkts Pastafari-árs auðkennir</p>
295:   295	  <p>Ef aðgerðardagurinn er óþekktur er staðan önnur. Sömu fimm gildi geta birst undir mismunandi aðgerðardögum og til eru nákvæm dæmi þar sem sama fulla dagsetning kemur fram í mismunandi fjarlægð frá <code>c</code>.</p>
296:   296	  <p>Í ári 5000 er jafnvel formerki þessarar fjarlægðar ekki alltaf ákvarðað af fimm gildunum: sama fulla dagsetning getur í einu samhengi verið fyrir aðgerðardaginn en í öðru eftir hann.</p>
297:   297	  <p>Full Pastafari-dagsetning er því ekki algilt vistfang á tímalínunni ef ekki er vitað undir hvaða <code>c</code> hún var reiknuð.</p>
301:   301	    <p>Stærðfræðirannsóknir sem byggja á forskriftinni hafa einnig leitt í ljós nákvæma asymptótíska uppbyggingu. Fyrir <strong>fastan aðgerðardag</strong> <code>c</code> birtist affín lotubundni nógu langt út í hala fortíðarinnar.</p>
304:   304	    <p>þá eru til fyrir sama <code>c</code> hliðrun <code>H_c</code>, ársbreytingu <code>p_c</code> og nægilega fjarlægt þröskuld, eftir sem</p>
309:   309	    <p>Spurningin hvort endanlegar asymptótískar hallatölur séu raunverulega ólíkar milli mismunandi aðgerðardaga er enn opin.</p><hr>
326:   326	  <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
327:   327	  <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
328:   328	  <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
329:   329	  <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>
<shellId: 5 completed with exit code 0>
```

</details>


---

<sub>31s</sub>

### `bash`

** staðfesta íslenskt tungumál og textastefnu manifests**

$ rg -n 'lang|dir|localized|"is"|name_localized|short_name_localized|description_localized' docs/manifest.webmanifest

```
/bin/bash: line 1: rg: command not found
<shellId: 6 completed with exit code 127>
```


---

<sub>47s</sub>

### `rg`

**"is": \{|"name_localized"|"short_name_localized"|"description_localized"**

""is": \{|"name_localized"|"short_name_localized"|"description_localized"" (docs/manifest.webmanifest)

<details>
<summary>6 matches</summary>

```
docs/manifest.webmanifest:  "name_localized": {
docs/manifest.webmanifest:    "is": {
docs/manifest.webmanifest:  "short_name_localized": {
docs/manifest.webmanifest:    "is": {
docs/manifest.webmanifest:  "description_localized": {
docs/manifest.webmanifest:    "is": {
```

</details>


---

<sub>47s</sub>

### `rg`

**ARTICLE_FALLBACK_LOCALE|resolveArticleLocale|"he"|fallback**

"ARTICLE_FALLBACK_LOCALE|resolveArticleLocale|"he"|fallback" (docs/about/content/registry.js)

```
docs/about/content/registry.js:export const ARTICLE_FALLBACK_LOCALE = "he";
docs/about/content/registry.js:  "he": Object.freeze({
docs/about/content/registry.js:    code: "he",
docs/about/content/registry.js:export function resolveArticleLocale(code) {
docs/about/content/registry.js:  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
```


---

<sub>47s</sub>

### `rg`

**initialize|applyDocumentLocale|loadLocale\(|loadArticleForLocale|reverseUi|createReverseSearchUi|textContent\s*=|setAttribute\("aria-label"|data-i18n**

"initialize|applyDocumentLocale|loadLocale\(|loadArticleForLocale|reverseUi|createReverseSearchUi|textContent\s*=|setAttribute\("aria-label"|data-i18n" (docs/app.js, docs/about/about.js, docs/reverse-ui.js)

<details>
<summary>125 matches</summary>

```
[grep content: 121 matches across 3 file(s) under docs]

reverse-ui.js (30 match(es)):
     if (text !== null) element.textContent = text;
     element.textContent = text;
       this.help.textContent = definition.helpKey ? this.services.siteT(definition.helpKey) : "";
         this.error.textContent = this.services.rt("reverse.error.input");
       this.calendarLabelText.textContent = this.services.rt(this.labelKey);
         element.textContent = this.services.rt(element.dataset.reverseKey);
       this.labelText.textContent = this.services.rt("reverse.variable.label");
       this.domainText.textContent = this.services.rt("reverse.variable.domain");
       this.removeButton.textContent = this.services.rt("reverse.action.remove");
       this.removeButton.textContent = this.services.rt("reverse.action.remove");
       this.typeText.textContent = this.services.rt("reverse.constraint.type");
         element.textContent = this.services.rt(element.dataset.reverseKey);
       this.status.textContent = this.rt("reverse.status.running");
       this.progress.textContent = "";
       this.progress.textContent = `${this.rt(phaseKey)} · ${this.rt("reverse.progress.scanned", { count: this.services.formatInteger(value.scanned) })}`;
       this.status.textContent = this.rt(key, { count: this.services.formatInteger(classification.solutionCount) });
       this.error.textContent = this.rt(this.visibleErrorMessage.key, this.visibleErrorMessage.values);
       this.status.textContent = "";
         this.status.textContent = this.rt("reverse.status.cancelled");
       this.status.textContent = "";
       this.progress.textContent = "";
         this.basicActiveValue.textContent = this.rt("reverse.basic.activeValue", {
         this.status.textContent = this.rt("reverse.status.stale");
         element.textContent = this.rt(element.dataset.reverseKey);
       this.addVariableButton.textContent = this.rt("reverse.action.addVariable");
       this.addConstraintButton.textContent = this.rt("reverse.action.addConstraint");
       this.basicSolve.textContent = this.advancedSolve.textContent = this.rt("reverse.action.solve");
       this.basicCancel.textContent = this.advancedCancel.textContent = this.rt("reverse.action.cancel");
       this.clearButton.textContent = this.rt("reverse.action.clear");
   export function createReverseSearchUi(root, services) {

about/about.js (13 match(es)):
     applyDocumentLocale,
   let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
     applyDocumentLocale(activeLocale);
   async function loadArticleForLocale(localeCode) {
       elements["about-load-error"].textContent = t("about.loadError");
       link.textContent = heading.textContent.trim();
   function initializeResponsiveDisclosures() {
     const locale = await loadLocale(code);
     await loadArticleForLocale(locale.code);
   initializeResponsiveDisclosures();
   await loadArticleForLocale(activeLocale.code);
     loadLocale(resolved.locale.code)
         await loadArticleForLocale(locale.code);

app.js (78 match(es)):
   import { createReverseSearchUi } from "./reverse-ui.js?v=21-about-i18n";
     applyDocumentLocale,
   let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
   let reverseUi = null;
         strong.textContent = value;
     elements["target-marker"].textContent = t(markerKey);
       line.textContent = t("target.notInView");
     elements["cutlet-meta"].textContent = t("calendar.currentCutlet", { year: formatInteger(view.year) });
     elements["cutlet-heading"].textContent = viewCutletName;
     elements["cutlet-description"].textContent = t("calendar.cutletDescription", {
     elements["calendar-grid"].setAttribute("aria-label", t("calendar.daysAria", { cutletName: viewCutletName }));
       card.setAttribute("aria-label", dateAria(day));
         badge.textContent = t(state.targetFollowsCurrentDay ? "target.today" : "target.searched");
     locationButton.textContent = t("location.useDevice");
     elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
     elements["year-overview-context"].textContent = t("year.context", {
     heading.textContent = title;
     details.textContent = meta;
     elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(structure.year) });
     elements["year-overview-context"].textContent = t("year.context", {
     elements["year-length"].textContent = t("year.daysValue", { count: formatInteger(structure.length) });
     elements["year-cutlet-count"].textContent = formatInteger(structure.cutletCount);
     elements["year-month-count"].textContent = formatInteger(structure.monthCount);
     elements["year-range"].textContent = t("year.rangeValue", {
     elements["year-cutlet-position"].textContent = displayedCutlet
       elements["year-target-position"].textContent = t("year.targetPosition", {
     elements["year-cutlets-summary"].textContent = t("year.cutletsSummary", {
     elements["year-months-summary"].textContent = t("year.monthsSummary", {
     elements["year-overview-heading"].textContent = t("year.heading", { year: formatInteger(view.year) });
     elements["year-overview-context"].textContent = t("year.context", {
     elements["year-overview-error"].textContent = t("year.error");
     cell.setAttribute("aria-label", dateAria(day));
     elements["comparison-primary-heading"].textContent = t("comparison.actionHeading", {
     elements["comparison-secondary-heading"].textContent = t("comparison.actionHeading", {
     elements["comparison-summary"].textContent = t("comparison.summary", {
       civil.textContent = formatJdnAsGregorian(primary.jdn);
       sequence.textContent = t("reverse.result.jdn", { jdn: primary.jdn.toString() });
     elements["error-message"].textContent = t(key);
       option.textContent = t(definition.labelKey);
       labelText.textContent = t(field.labelKey);
           option.textContent = choice.labelKey ? t(choice.labelKey) : choice.label;
     configuration.help.textContent = definition.helpKey ? t(definition.helpKey) : "";
   function initializeDateForm(kind, jdn) {
     configuration.error.textContent = t(configuration.errorKey);
   function initializeToday({ replaceHistory = false } = {}) {
     initializeDateForm("target", jdn);
     initializeDateForm("action", jdn);
     initializeDateForm("comparison", jdn + 1n);
     reverseUi?.notifyActiveCalculationChanged();
     initializeDateForm("target", jdn);
     if (targetJdn === null || calculationJdn === null) return initializeToday({ replaceHistory: true });
     initializeDateForm("target", targetJdn);
     initializeDateForm("action", calculationJdn);
     initializeDateForm("comparison", state.comparisonJdn);
     reverseUi?.notifyActiveCalculationChanged();
     applyDocumentLocale(activeLocale);
       elements["error-message"].textContent = t(lastVisibleErrorKey);
     reverseUi?.refreshLocale();
     activeLocale = await loadLocale(resolved.locale.code);
     const locale = metadata.code === activeLocale.code ? activeLocale : await loadLocale(metadata.code);
       initializeDateForm("comparison", state.comparisonJdn);
     initializeDateForm("target", target);
     initializeDateForm("action", calculation);
     reverseUi?.notifyActiveCalculationChanged({ markStale: false });
   function initializeReverseSearch() {
     if (reverseUi || state.calculationJdn === null) return;
     reverseUi = createReverseSearchUi(elements["reverse-app"], {
       if (calculationChanged) reverseUi?.notifyActiveCalculationChanged();
         initializeDateForm("comparison", state.comparisonJdn);
     if (calculationChanged) reverseUi?.notifyActiveCalculationChanged();
       initializeDateForm("comparison", state.comparisonJdn);
     initializeDateForm("action", state.currentDayJdn);
       initializeDateForm("target", todayJdn);
       reverseUi?.notifyActiveCalculationChanged();
       initializeDateForm("action", todayJdn);
         initializeDateForm("comparison", state.comparisonJdn);
     initializeReverseSearch();
     initializeReverseSearch();
```

</details>


---

<sub>47s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 170-400)

<details>
<summary>197 lines</summary>

```
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
```

</details>


---

<sub>47s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/app.js (lines 180-420)

<details>
<summary>224 lines</summary>

```
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
```

</details>


---

<sub>47s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/reverse-ui.js (lines 210-520)

<details>
<summary>291 lines</summary>

```
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
```

</details>


---

<sub>57s</sub>

### `bash` — Failed

**Finna enskar varafærslur í íslenskri staðfærslu**

$ node --input-type=module -e 'const en=(await import("./docs/i18n/locales/en.js")).default; const is=(await import("./docs/i18n/locales/is.js")).default; const flat=(o,p="",r={})=>{for(const [k,v] of Object.entries(o)){const q=p?`${p}.${k}`:k;if(v&&typeof v==="object"&&!Array.isArray(v))flat(v,q,r);else r[q]=v;}return r;}; for(const group of ["messages","terminology","calendar"]){const a=flat(en[group]||{},group),b=flat(is[group]||{},group);const missing=Object.keys(a).filter(k=>!(k in b)); console.log(JSON.stringify({group,base:Object.keys(a).length,localized:Object.keys(b).length,missing:missing.map(k=>({key:k,value:a[k]}))}));}'

```
Permission denied and could not request permission from user
```


---

<sub>57s</sub>

### `bash`

**Finna staðsetningu íslenskra manifest-færslna**

$ grep -n '"is": {' docs/manifest.webmanifest

```
165:    "is": {
528:    "is": {
891:    "is": {
<shellId: 8 completed with exit code 0>
```


---

<sub>57s</sub>

### `rg`

**cold wake|English|English fallback|fallback|unavailable|default version|JavaScript**

"cold wake|English|English fallback|fallback|unavailable|default version|JavaScript" (docs/about/content/is.html, docs/i18n/locales/is.js, docs/index.html, docs/about/index.html)

```
docs/about/index.html:33:      <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>
docs/about/index.html:77:        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
docs/index.html:199:        <p><strong>JavaScript</strong> <span aria-hidden="true">⚠</span></p>
docs/i18n/locales/is.js:30:    "about.fallbackNotice": "Skýringin er ekki tiltæk á völdu tungumáli; hebreska útgáfan er sýnd í staðinn.",
docs/about/content/is.html:240:  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt dagabil, endurræsing, ræsing eftir dvala (<code>cold wake</code>) og hegðun undir álagi.</p>
```


---

<sub>57s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/runtime.js (lines 1-71)

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

<sub>57s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/about/content/registry.js (lines 1-100)

<details>
<summary>97 lines</summary>

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
```

</details>


---

<sub>57s</sub>

### `bash`

**Skoða frumstillingu og villuvaraleiðir**

$ nl -ba docs/app.js | sed -n '1080,1190p'; nl -ba docs/about/about.js | sed -n '1,100p'

<details>
<summary>207 lines</summary>

```
1080	    && left.longitude === right.longitude
  1081	    && left.elevationM === right.elevationM);
  1082	}
  1083	
  1084	function refreshCurrentDay() {
  1085	  if (document.visibilityState === "hidden") return;
  1086	  const snapshot = currentDaySnapshot();
  1087	  const todayJdn = snapshot.jdn;
  1088	  if (todayJdn === state.currentDayJdn) {
  1089	    state.currentDayDate = snapshot.date;
  1090	    if (state.view) renderTargetBeacon();
  1091	    return;
  1092	  }
  1093	
  1094	  const calculationWasCurrentDay = state.calculationFollowsCurrentDay;
  1095	  if (calculationWasCurrentDay && state.currentDayJdn !== null) {
  1096	    alert(t("day.staleWarning", {
  1097	      previousDate: formatJdnAsGregorian(state.currentDayJdn),
  1098	      currentDate: formatJdnAsGregorian(todayJdn),
  1099	    }));
  1100	  }
  1101	
  1102	  state.currentDayDate = snapshot.date;
  1103	  state.currentDayJdn = todayJdn;
  1104	  if (state.targetFollowsCurrentDay) {
  1105	    state.targetJdn = todayJdn;
  1106	    state.viewAnchorJdn = todayJdn;
  1107	    initializeDateForm("target", todayJdn);
  1108	  }
  1109	  if (calculationWasCurrentDay) {
  1110	    state.calculationJdn = todayJdn;
  1111	    reverseUi?.notifyActiveCalculationChanged();
  1112	    initializeDateForm("action", todayJdn);
  1113	    if (state.comparisonFollowsNextAction) {
  1114	      state.comparisonJdn = todayJdn + 1n;
  1115	      initializeDateForm("comparison", state.comparisonJdn);
  1116	    }
  1117	  }
  1118	  if (state.targetFollowsCurrentDay || calculationWasCurrentDay) loadCutlet({ replaceHistory: true });
  1119	  else if (state.view) renderTargetBeacon();
  1120	}
  1121	
  1122	let currentDayRefreshTimer = null;
  1123	
  1124	function clearCurrentDayRefreshTimer() {
  1125	  if (currentDayRefreshTimer !== null) {
  1126	    clearTimeout(currentDayRefreshTimer);
  1127	    currentDayRefreshTimer = null;
  1128	  }
  1129	}
  1130	
  1131	function scheduleCurrentDayRefresh() {
  1132	  clearCurrentDayRefreshTimer();
  1133	  if (document.visibilityState === "hidden") return;
  1134	  const snapshot = currentDaySnapshot();
  1135	  const delay = Math.max(0, snapshot.nextBoundary.instant.getTime() - Date.now() + 250);
  1136	  currentDayRefreshTimer = setTimeout(() => {
  1137	    currentDayRefreshTimer = null;
  1138	    refreshCurrentDay();
  1139	    scheduleCurrentDayRefresh();
  1140	  }, delay);
  1141	}
  1142	
  1143	async function updateObserverLocation(nextObserver) {
  1144	  if (sameObserver(observerLocation, nextObserver)) return;
  1145	  observerLocation = nextObserver;
  1146	  refreshCurrentDay();
  1147	  scheduleCurrentDayRefresh();
  1148	}
  1149	
  1150	document.addEventListener("visibilitychange", () => {
  1151	  if (document.visibilityState === "hidden") {
  1152	    clearCurrentDayRefreshTimer();
  1153	    return;
  1154	  }
  1155	  refreshCurrentDay();
  1156	  scheduleCurrentDayRefresh();
  1157	});
  1158	window.addEventListener("pageshow", () => {
  1159	  refreshCurrentDay();
  1160	  scheduleCurrentDayRefresh();
  1161	});
  1162	
  1163	if ("serviceWorker" in navigator) {
  1164	  const registerServiceWorker = () => navigator.serviceWorker.register("./sw.js").catch(() => {});
  1165	  if (document.readyState === "complete") registerServiceWorker();
  1166	  else addEventListener("load", registerServiceWorker, { once: true });
  1167	}
  1168	
  1169	async function startApplication() {
  1170	  observerLocation = await resolveObserverLocation({ timeoutMs: 2_000 });
  1171	  await loadFromUrl();
  1172	  initializeReverseSearch();
  1173	  scheduleCurrentDayRefresh();
  1174	  watchObserverPermission((nextObserver) => {
  1175	    updateObserverLocation(nextObserver).catch((error) => console.error(error));
  1176	  }).catch((error) => console.error(error));
  1177	}
  1178	
  1179	startApplication().catch(async (error) => {
  1180	  console.error(error);
  1181	  observerLocation = KISURRA_OBSERVER;
  1182	  await loadFromUrl();
  1183	  initializeReverseSearch();
  1184	  scheduleCurrentDayRefresh();
  1185	});
     1	"use strict";
     2	
     3	import {
     4	  loadLocale,
     5	  translate,
     6	} from "../i18n/registry.js?v=20-about-i18n";
     7	import {
     8	  applyDocumentLocale,
     9	  persistLanguage,
    10	  populateLanguageSelector,
    11	  resolveBrowserLocale,
    12	  urlWithLanguage,
    13	} from "../i18n/runtime.js?v=20-about-i18n";
    14	import {
    15	  ARTICLE_FALLBACK_LOCALE,
    16	  resolveArticleLocale,
    17	} from "./content/registry.js?v=5-about-i18n-polish";
    18	
    19	const elements = Object.fromEntries(
    20	  [...document.querySelectorAll("[id]")].map((element) => [element.id, element]),
    21	);
    22	
    23	let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
    24	let activeArticleCode = null;
    25	
    26	function t(key, values = {}) {
    27	  return translate(activeLocale, key, values);
    28	}
    29	
    30	function syncCalendarLinks() {
    31	  for (const link of document.querySelectorAll("[data-back-to-calendar]")) {
    32	    link.href = urlWithLanguage(new URL("../", location.href), activeLocale.code);
    33	  }
    34	}
    35	
    36	function applyActiveLocale() {
    37	  applyDocumentLocale(activeLocale);
    38	  populateLanguageSelector(elements["language-selector"], activeLocale.code);
    39	  syncCalendarLinks();
    40	}
    41	
    42	async function fetchArticle(articleLocale) {
    43	  const url = new URL(articleLocale.asset, import.meta.url);
    44	  const response = await fetch(url);
    45	  if (!response.ok) throw new Error(`HTTP ${response.status} while loading ${articleLocale.code}`);
    46	  return response.text();
    47	}
    48	
    49	function renderArticle(articleLocale, html) {
    50	  elements["article-content"].innerHTML = html;
    51	  elements["article-content"].lang = articleLocale.lang;
    52	  elements["article-content"].dir = articleLocale.dir;
    53	  activeArticleCode = articleLocale.code;
    54	  updateLanguageNotice(articleLocale.code);
    55	  buildTableOfContents();
    56	  focusHashTarget();
    57	}
    58	
    59	async function loadArticleForLocale(localeCode) {
    60	  const requestedArticle = resolveArticleLocale(localeCode);
    61	  if (requestedArticle.code === activeArticleCode && elements["article-content"].childElementCount > 0) {
    62	    updateLanguageNotice(requestedArticle.code);
    63	    buildTableOfContents();
    64	    focusHashTarget();
    65	    return;
    66	  }
    67	
    68	  elements["article-content"].setAttribute("aria-busy", "true");
    69	  elements["about-load-error"].hidden = true;
    70	
    71	  try {
    72	    let articleLocale = requestedArticle;
    73	    let html;
    74	    try {
    75	      html = await fetchArticle(articleLocale);
    76	    } catch (selectedError) {
    77	      if (articleLocale.code === ARTICLE_FALLBACK_LOCALE) throw selectedError;
    78	      console.warn(`Falling back from article locale ${articleLocale.code} to ${ARTICLE_FALLBACK_LOCALE}.`, selectedError);
    79	      articleLocale = resolveArticleLocale(ARTICLE_FALLBACK_LOCALE);
    80	      html = await fetchArticle(articleLocale);
    81	    }
    82	    renderArticle(articleLocale, html);
    83	  } catch (error) {
    84	    console.error(error);
    85	    elements["article-content"].replaceChildren();
    86	    activeArticleCode = null;
    87	    elements["about-language-notice"].hidden = true;
    88	    elements["about-load-error"].hidden = false;
    89	    elements["about-load-error"].textContent = t("about.loadError");
    90	    elements["about-toc-list"].replaceChildren();
    91	  } finally {
    92	    elements["article-content"].setAttribute("aria-busy", "false");
    93	  }
    94	}
    95	
    96	function updateLanguageNotice(articleCode) {
    97	  elements["about-language-notice"].hidden = articleCode === activeLocale.code;
    98	}
    99	
   100	function sectionHeading(section) {
<shellId: 9 completed with exit code 0>
```

</details>


---

<sub>1m 6s</sub>

### `bash` — Failed

**Bera saman ensk og íslensk skilaboð**

$ python -c 'import re,pathlib; files=[pathlib.Path("docs/i18n/locales/en.js"),pathlib.Path("docs/i18n/locales/is.js")]; maps=[]; exec("for p in files:\n s=p.read_text()\n sec=s.split(\x27\"messages\": {\x27,1)[1].split(\x27\\n  },\\n  \"calendar\": {\x27,1)[0]\n maps.append(dict(re.findall(r\x27^    \"([^\"]+)\": \"(.*)\",?$\x27,sec,re.M)))"); en,is_=maps; print("English message count:",len(en),"Icelandic:",len(is_)); [print(k,"=",v) for k,v in en.items() if k not in is_]'

```
Permission denied and could not request permission from user
```


---

<sub>1m 6s</sub>

### `bash` — Failed

**Staðfesta íslenska manifest-texta og stefnu**

$ python -c 'import json,pathlib; d=json.loads(pathlib.Path("docs/manifest.webmanifest").read_text()); [print(k, json.dumps(d[k]["is"],ensure_ascii=False)) for k in ("name_localized","short_name_localized","description_localized")]; print("lang",d["lang"],"dir",d["dir"])'

```
Permission denied and could not request permission from user
```


---

<sub>1m 6s</sub>

### `bash`

**Skoða staðsetningar líklegra málfarsfrávika**

$ nl -ba docs/i18n/locales/is.js | sed -n '170,270p'; nl -ba docs/about/content/is.html | sed -n '130,185p'; nl -ba docs/about/content/is.html | sed -n '235,245p'; nl -ba docs/about/content/is.html | sed -n '320,331p'

<details>
<summary>181 lines</summary>

```
170	    "footer.open": "Tengillinn er opinber og opnast beint, einnig í einkavafraglugga.",
   171	    "reverse.kicker": "Öfug leit",
   172	    "reverse.heading": "Finna dag út frá Pastafari-dagsetningu hans",
   173	    "reverse.intro": "Sláðu inn fulla Pastafari-dagsetningu og skilgreindu aðgerðardag hennar. Leitin fer fram staðbundið á þessu tæki.",
   174	    "reverse.mode.basic": "Ein dagsetning",
   175	    "reverse.mode.advanced": "Skorðukerfi",
   176	    "reverse.basic.heading": "Öfug leit að einni dagsetningu",
   177	    "reverse.basic.dateHeading": "Pastafari-dagsetning sem á að finna",
   178	    "reverse.field.year": "Ár",
   179	    "reverse.field.cutlet": "Kóteletta",
   180	    "reverse.field.dayInCutlet": "Dagur í kótelettu",
   181	    "reverse.field.month": "Mánuður",
   182	    "reverse.field.dayInMonth": "Dagur í mánuði",
   183	    "reverse.basic.calculationHeading": "Aðgerðardagur",
   184	    "reverse.basic.calculationMode": "Hvernig er aðgerðardagurinn skilgreindur?",
   185	    "reverse.basic.calculation.active": "Nota virkan aðgerðardag vefsins",
   186	    "reverse.basic.calculation.absolute": "Nota aðra þekkta dagsetningu",
   187	    "reverse.basic.calculation.same": "Aðgerðardagurinn er sami dagur og fyrirspurnardagurinn (c = t)",
   188	    "reverse.basic.calculation.pastafari": "Aðgerðardagurinn er einnig Pastafari-dagur eða háður öðrum dagsetningum",
   189	    "reverse.basic.activeValue": "Virkur aðgerðardagur: {date}",
   190	    "reverse.basic.absoluteHeading": "Þekktur aðgerðardagur",
   191	    "reverse.basic.sameHeading": "Endanlegt leitarsvið fyrir c = t",
   192	    "reverse.basic.rangeStart": "Upphaf sviðs",
   193	    "reverse.basic.rangeEnd": "Lok sviðs",
   194	    "reverse.basic.toAdvanced": "Halda áfram í ritli skorðukerfisins",
   195	    "reverse.basic.toAdvancedHelp": "Endurkvæmir Pastafari-aðgerðardagar eru settir fram sem breytur og skorður svo hægt sé að lengja keðjuna án tilbúinna dýptarmarka.",
   196	    "reverse.action.solve": "Leita",
   197	    "reverse.action.cancel": "Hætta við leit",
   198	    "reverse.action.open": "Opna í dagatali",
   199	    "reverse.action.addVariable": "Bæta við dagsetningarbreytu",
   200	    "reverse.action.addConstraint": "Bæta við skorðu",
   201	    "reverse.action.remove": "Fjarlægja",
   202	    "reverse.action.clear": "Hreinsa niðurstöður",
   203	    "reverse.progress.reverse": "Úrlausn Pastafari-tengsla",
   204	    "reverse.progress.verify": "Staðfesting mögulegra lausna",
   205	    "reverse.progress.done": "Leit lokið",
   206	    "reverse.progress.scanned": "Loknar vinnueiningar: {count}",
   207	    "reverse.status.running": "Leitað á tækinu…",
   208	    "reverse.status.cancelled": "Leit hætt við.",
   209	    "reverse.status.superseded": "Nýrri leit kom í stað þessarar leitar.",
   210	    "reverse.status.completeEmpty": "Engin lausn er til á svæðinu sem var leitað að fullu.",
   211	    "reverse.status.completeSolutions": "Leit lokið. Allar {count} lausnir á svæðinu eru sýndar.",
   212	    "reverse.status.partialEmpty": "Leitin stöðvaðist áður en henni lauk. Engin lausn hefur fundist enn.",
   213	    "reverse.status.partialSolutions": "{count} staðfestar lausnir eru sýndar, en leitin stöðvaðist áður en henni lauk og fleiri gætu verið til.",
   214	    "reverse.status.stale": "Þessar niðurstöður notuðu fyrri virkan aðgerðardag. Keyrðu leitina aftur til að nota þann núverandi.",
   215	    "reverse.status.rangeRequired": "Ekki er hægt að leita þetta vandamál til fulls fyrr en endanlegu sviði eða fastri dagsetningu hefur verið bætt við.",
   216	    "reverse.status.timeout": "Leitin náði tímamörkum áður en henni lauk.",
   217	    "reverse.status.failed": "Vél öfugrar leitar brást.",
   218	    "reverse.result.heading": "Lausnir",
   219	    "reverse.result.solution": "Lausn {index}",
   220	    "reverse.result.target": "Fyrirspurnardagur",
   221	    "reverse.result.calculation": "Aðgerðardagur",
   222	    "reverse.result.jdn": "JDN {jdn}",
   223	    "reverse.result.complete": "Full leit",
   224	    "reverse.result.partial": "Leit að hluta",
   225	    "reverse.advanced.heading": "Lausnaraðferð fyrir skorðukerfi",
   226	    "reverse.advanced.intro": "Skilgreindu dagsetningarbreytur og tengsl þeirra. Hringir eru leyfðir þegar kerfið er þrengt að endanlegum sviðum.",
   227	    "reverse.variables.heading": "Dagsetningarbreytur",
   228	    "reverse.variable.label": "Birtingarnafn",
   229	    "reverse.variable.defaultName": "Dagsetning {index}",
   230	    "reverse.variable.domain": "Svið",
   231	    "reverse.variable.domain.unknown": "Óþekkt (verður að takmarkast af öðrum skorðum)",
   232	    "reverse.variable.domain.exact": "Nákvæm þekkt dagsetning",
   233	    "reverse.variable.domain.range": "Endanlegt dagsetningarsvið",
   234	    "reverse.constraint.heading": "Skorður",
   235	    "reverse.constraint.type": "Tegund skorðu",
   236	    "reverse.constraint.pastafari": "Pastafari-dagsetning",
   237	    "reverse.constraint.equal": "Sami dagur á tímalínunni",
   238	    "reverse.constraint.order": "Tímaröð",
   239	    "reverse.constraint.difference": "Mismunur í dögum",
   240	    "reverse.constraint.left": "Vinstri dagsetning",
   241	    "reverse.constraint.right": "Hægri dagsetning",
   242	    "reverse.constraint.target": "Fyrirspurnardagsbreyta",
   243	    "reverse.constraint.calculationMode": "Uppruni aðgerðardags",
   244	    "reverse.constraint.calculation.variable": "Önnur dagsetningarbreyta",
   245	    "reverse.constraint.calculation.absolute": "Þekkt dagsetning",
   246	    "reverse.constraint.calculation.same": "Sama og fyrirspurnardagur (c = t)",
   247	    "reverse.constraint.calculationVariable": "Aðgerðardagsbreyta",
   248	    "reverse.constraint.orderOp": "Tengsl",
   249	    "reverse.constraint.differenceMode": "Mismunarregla",
   250	    "reverse.constraint.differenceExact": "Nákvæmur mismunur",
   251	    "reverse.constraint.differenceRange": "Mismunarsvið",
   252	    "reverse.constraint.equals": "Nákvæmir dagar (vinstri − hægri)",
   253	    "reverse.constraint.min": "Lágmarksdagar (vinstri − hægri)",
   254	    "reverse.constraint.max": "Hámarksdagar (vinstri − hægri)",
   255	    "reverse.options.heading": "Leitarmörk",
   256	    "reverse.options.intro": "Skildu mörkin auð ef þú vilt engin mörk nota. Mörk eru aldrei sett í laumi.",
   257	    "reverse.options.maxSolutions": "Stöðva eftir þennan fjölda staðfestra lausna",
   258	    "reverse.options.maxScanned": "Stöðva eftir þennan fjölda vinnueininga",
   259	    "reverse.options.timeout": "Tímamörk í millisekúndum",
   260	    "reverse.advanced.emptyVariables": "Bættu við að minnsta kosti einni dagsetningarbreytu.",
   261	    "reverse.advanced.emptyConstraints": "Kerfi má vera án skorða, en sérhver breyta sem eftir er verður samt að hafa endanlegt svið.",
   262	    "reverse.error.input": "Nokkra reiti öfugrar leitar vantar eða þeir eru ógildir.",
   263	    "reverse.error.range": "Lok sviðs mega ekki vera á undan upphafi þess.",
   264	    "reverse.error.variable": "Sérhver skorða verður að vísa í dagsetningarbreytu sem er til.",
   265	    "reverse.error.pastafari": "Sláðu inn alla fimm reiti Pastafari-dagsetningarinnar.",
   266	    "reverse.calendar.label": "Dagatal fyrir þekkta dagsetningu",
   267	
   268	  },
   269	  "calendar": {
   270	    "cutlets": {
   130	  <pre class="math-block" dir="ltr" tabindex="0"><code>Q=2^{127}-1</code></pre>
   131	  <p>Ferlið felur í sér fimm inntaksteljara, 7 falda dropa, 46 sýnilega dropa, 6 skálar, breytilega röð skálanna, 12 lokablöndur, innsigli fyrir mismunandi svör, samsetningarval, smíði hliða, val ára, skiptingu kótelettna, val nafna, smíði mánaða og fléttun mánaðardaga.</p>
   132	  <p>Lokauppfærslurnar eru <strong>samhliða</strong>: í hverri blöndu eru öll sex nýju gildin reiknuð úr sama gamla ástandinu og aðeins síðan eru allar sex skálarnar uppfærðar í einu.</p>
   133	  <p>Í 12 lokablöndunum er eitt sérstaklega mikilvægt kanónískt atriði. Ef <code>S</code> er summa sex gömlu skálanna og <code>r</code> er númer blöndunnar, reiknar kerfið</p>
   134	  <pre class="math-block" dir="ltr" tabindex="0"><code>R=\operatorname{SAVE}(S+149r)</code></pre>
   135	  <p><code>R</code> er <strong>vistaða summan</strong>. Bæði val á skálaröð og innri uppfærsla blöndunnar nota <code>R</code>, ekki hráu summuna <code>S</code>.</p>
   136	  <p>Eldri útgáfur sem sendu hráu summuna inn í þessa uppfærslu lýsa ekki lengur núverandi kanónískri merkingarfræði. Dæmi sem byggja á gömlu reglunni ætti að telja úrelt þar til þau hafa verið staðfest aftur.</p>
   137	  <p>Eftir blöndurnar heldur svarahringurinn einnig áfram röðinni sem var læst við 46. sýnilega dropann; henni á ekki sjálfkrafa að skipta út fyrir röð síðustu blöndunnar.</p><hr>
   138	</section>
   139	
   140	<section class="about-section" id="short-and-wide-choice" data-toc-section data-toc-level="2">
   141	  <h2>Short Choice og Wide Choice</h2>
   142	  <p>Fyrir tiltölulega lítil valrúm er <strong>Short Choice</strong> notað. Það notar úrtak með höfnun til að forðast skekkju sem einföld módúlóaðgerð gæti annars valdið.</p>
   143	  <p>Fyrir mjög stór valrúm er <strong>Wide Choice</strong> notað. Ekki má eigna því eiginleika sem forskriftin tryggir ekki.</p>
   144	  <p>Wide Choice jafngildir ekki því að mynda óháða og jafnt dreifða tölustafi í <code>Q</code>-grunni þar til vísi fæst. Því leiðir ekki af þessu að hvert gilt val verði endilega að hafa sömu jákvæðu líkur. Í nógu stórum valrýmum geta verið gild val sem þetta kerfi nær aldrei til.</p>
   145	  <p>Dagatalið sjálft er áfram fullkomlega determinískt. „Choice“ er heiti reikniritsþrep, ekki slembiútdráttur við notkun.</p><hr>
   146	</section>
   147	
   148	<section class="about-section" id="structural-atlas" data-toc-section data-toc-level="2">
   149	  <h2>Byggingaratlas</h2>
   150	  <p>Hingað til höfum við talað um reglur dagatalsins. Næstu tölur eru annars konar upplýsingar: <strong>reynsluniðurstöður</strong> úr stórri reikniúrtaki.</p>
   151	  <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem tilgreind er í commit-inu <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljón samfellda mánaðarkafla; og meira en 364 milljón færslur frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
   152	  <p>Þessar tölur lýsa þessu gagnasafni, ekki kanónískum reglum.</p>
   153	  <div class="about-table-scroll" role="region" tabindex="0" aria-label="Mæld gögn úr byggingaratlasnum">
   154	    <table class="about-table">
   155	      <thead><tr><th scope="col">Mæld stærð</th><th scope="col">Niðurstaða í úrtaki</th></tr></thead>
   156	      <tbody>
   157	        <tr><td>Meðallengd árs</td><td>4.275,182 dagar</td></tr>
   158	        <tr><td>Miðgildi árslengdar</td><td>4.343</td></tr>
   159	        <tr><td>Mælt lágmark / hámark</td><td>716 / 5.778</td></tr>
   160	        <tr><td>Meðalfjöldi kótelettna á ári</td><td>7,271</td></tr>
   161	        <tr><td>Ár með nákvæmlega 6 kótelettur</td><td>42,00 %</td></tr>
   162	        <tr><td>Ár með 6–8 kótelettur</td><td>81,29 %</td></tr>
   163	        <tr><td>Meðallengd kótelettu</td><td>587,963 dagar</td></tr>
   164	        <tr><td>Miðgildi kótelettulengdar</td><td>560</td></tr>
   165	        <tr><td>Meðalfjöldi mánaða á ári</td><td>41,102</td></tr>
   166	        <tr><td>Miðgildi fjölda mánaða</td><td>43</td></tr>
   167	        <tr><td>Ár með 47 mánuði</td><td>15,63 %</td></tr>
   168	        <tr><td>Ár með að minnsta kosti 45 mánuði</td><td>36,81 %</td></tr>
   169	        <tr><td>Meðallengd byggingarmánaðar</td><td>104,014 dagar</td></tr>
   170	        <tr><td>Miðgildi mánaðarlengdar</td><td>115</td></tr>
   171	        <tr><td>Meðalfjöldi samfelldra kafla í mánuði</td><td>100,897</td></tr>
   172	        <tr><td>Hlutfall mánaðarkafla sem vara einn dag</td><td>97,482 %</td></tr>
   173	        <tr><td>Líkur á að tveir aðliggjandi dagar séu í sama mánuði</td><td>2,9976 %</td></tr>
   174	        <tr><td>Meðalfjöldi daga úr öðrum mánuðum milli <code>n</code> og <code>n+1</code> í sama mánuði</td><td>40,408</td></tr>
   175	        <tr><td>Meðalbil milli fyrstu og síðustu birtingar mánaðar</td><td>4.266,653 dagar</td></tr>
   176	      </tbody>
   177	    </table>
   178	  </div>
   179	  <p>Í reynd getur mánuður með um hundrað dögum verið dreifður yfir nær heilt Pastafari-ár.</p>
   180	  <p>Sami atlas sýndi einnig eðlilega lengdarhneigð í kringum ár 5000. Í úrtakinu var „venjulegt“ ár að meðaltali um 4.262 daga. Ef ár eru vegin eftir fjölda daga í þeim hækkar meðaltalið í um 4.466 daga; ár 5000 sjálft var að meðaltali um 4.499 dagar.</p>
   181	  <p>Ástæðan er einföld: ár 5000 verður að innihalda aðgerðardaginn. Lengra ár hefur fleiri daga þar sem það getur verið árið sem inniheldur aðgerðardaginn.</p>
   182	  <p>Samband milli nafns einingar og lengdar hennar var einnig mjög veikt í úrtakinu. Þetta sannar ekki fullkomið stærðfræðilegt óhæði, en atlasinn gefur enga hagnýta vísbendingu um að nöfnin hafi verið hönnuð til að kóða lengd.</p>
   183	  <p>Auk þess eru 86.016 ársbyggingarnar ekki 86.016 fullkomlega óháð úrtök: milli upphafs- og endahliðs eru aðeins 24.786 mismunandi bil. Aðgerðardagar sem liggja nálægt geta valið sama ársbil og samt myndað ólíka innri uppbyggingu.</p>
   184	  <p>Atlasinn lýsir því mældri hegðun útfærslunnar vel, en ekki má breyta honum í líkindasetningu um allar mögulegar dagatalsgerðir.</p><hr>
   185	</section>
   235	  <h2>Hvað er Seer þá?</h2>
   236	  <p>Við hlið kanónísku útfærslunnar er hröð reiknivél sem heitir <strong>Pastafarian Calendar Seer</strong>. Seer er ekki uppspretta valds: rétta dagsetningin ræðst af Megillah og kanóníska útreikningnum. Ef Seer er ósammála þeim er villan í Seer.</p>
   237	  <p>Hlutverk hans er að keyra sömu fyrirspurnir hratt og skila niðurstöðu á formi sem auðvelt er að samþætta við vörur.</p>
   238	  <p>Í beinni sannprófun við ritun þessarar síðu náði Seer meðal annars yfir <code>date</code>- og <code>now</code>-fyrirspurnir, <code>batch</code>, dagabil, öfuga umbreytingu frá Pastafari-dagsetningu til fyrirspurnardags, öflun ársuppbyggingar, ákvörðun virks aðgerðardags, Node API, vafra-/HTTP-biðlara, CLI, HTTP v1-þjónustu, OpenAPI 3.1-samning, innfæddar útfærslur og dreifingarpakka, auk staðfestrar gámaútsetningar.</p>
   239	  <p>Gamla fullyrðingin um að Seer hafi ekkert opinbert API er ekki lengur rétt. Nú er til skýr og stöðugur HTTP v1-samningur með endapunktum fyrir <code>date</code>, <code>range</code>, <code>batch</code>, <code>year</code>, <code>reverse</code>, aðgerðardag, <code>metadata</code>, <code>locales</code> og <code>status</code>.</p>
   240	  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt dagabil, endurræsing, ræsing eftir dvala (<code>cold wake</code>) og hegðun undir álagi.</p>
   241	  <p>Verkefnisskjölin greina þó enn á milli opinberrar beta-/matsútsetningar og varanlegrar hýstrar framleiðsluþjónustu með SLA. Þess vegna ætti hugtaksskýringarsíða ekki að festa netfang netþjóns, hýsingaraðila eða útgáfunúmer eins og það væri hluti af dagatalinu sjálfu.</p>
   242	  <p>Seer má nota forútreikning, sérstaka framsetningu, SIMD, algebru og aðrar styttingar. Hann þarf ekki að líkja eftir allri reiknisögu kanónísku útfærslunnar skref fyrir skref svo lengi sem hann framkvæmir sömu merkingarlegu aðgerð og skilar sama svari.</p>
   243	  <p>Hagræðing veitir ekki sjálfstætt merkingarvald.</p><hr>
   244	</section>
   245	
   320	  <p>Rúm sem virtust í fyrstu krefjast leitar yfir gífurlegan fjölda leiða voru minnkuð niður í miklu minni endanlegar gerðir, þar á meðal sjálfvirk kerfi með 180 og 9 ástandum og samhverfur sex skálanna.</p>
   321	  <p>Undir blönduninni liggur ströng algebruleg uppbygging. Það þarf ekki að þekkja hana til að vita dagsetningu dagsins í dag.</p><hr>
   322	</section>
   323	
   324	<section class="about-section" id="summary" data-toc-section data-toc-level="2">
   325	  <h2>Hvað er Pastafari-dagatalið þá í raun?</h2>
   326	  <p>Það er determinískt dagatal þar sem dagsetningin er ekki bara fall af fyrirspurnardegi heldur <strong>sameiginlegt fall aðgerðardagsins og fyrirspurnardagsins</strong>.</p>
   327	  <p>Hver dagsetning hefur nákvæmlega fimm reiti. Núið er frá sínu eigin sjónarhorni alltaf í ári 5000, en ár 5000 sjálft færist með aðgerðardeginum. Ár geta verið mjög löng, kótelettur eru samfelldar, mánuðir ekki endilega, og ekkert kanónískt vikukerfi er til.</p>
   328	  <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
   329	  <p>En ef aðgerðardagurinn og fyrirspurnardagurinn eru þekktir er engin tvíræðni: rétt svar er aðeins eitt.</p>
   330	  <p>Þegar allt kemur til alls þarf dagatal ekki að gera meira en þetta.</p>
   331	</section>
<shellId: 12 completed with exit code 0>
```

</details>


---

<sub>1m 6s</sub>

### `rg`

**\b(English|Loading|Search|Show|Back|Previous|Next|Cancel|Update|Reload|Open|Clear|Year|Month|Day|Calendar|Working day|Query day|Cutlet|Error|Unavailable|Failed|No solution|Solutions)\b**

"\b(English|Loading|Search|Show|Back|Previous|Next|Cancel|Update|Reload|Open|Clear|Year|Month|Day|Calendar|Working day|Query day|Cutlet|Error|Unavailable|Failed|No solution|Solutions)\b" (docs/i18n/locales/is.js, docs/about/content/is.html)

```
docs/about/content/is.html:236:  <p>Við hlið kanónísku útfærslunnar er hröð reiknivél sem heitir <strong>Pastafarian Calendar Seer</strong>. Seer er ekki uppspretta valds: rétta dagsetningin ræðst af Megillah og kanóníska útreikningnum. Ef Seer er ósammála þeim er villan í Seer.</p>
```


---

<sub>1m 6s</sub>

### `rg`

**data-i18n(-attr)?="[^"]+"|<h[1-6]|<button|<label|<summary|<p[^>]*role=|aria-label=**

"data-i18n(-attr)?="[^"]+"|<h[1-6]|<button|<label|<summary|<p[^>]*role=|aria-label=" (docs/index.html, docs/about/index.html)

```
[grep content: 88 matches across 2 file(s) under docs]

about/index.html (29 match(es)):
  7:     <meta name="description" content="An explanation of the Pastafari Calendar." data-i18n-attr="content:about.metaDescription">
  10:     <title data-i18n="about.title">About the Pastafari Calendar</title>
  18:     <a class="skip-link" href="#article-content" data-i18n="about.skip">Skip to the calendar explanation</a>
  22:           <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
  23:           <h1 data-i18n="about.title">About the Pastafari Calendar</h1>
  24:           <p class="intro" data-i18n="about.intro">How the calendar represents days, years, cutlets, woven months, and the day of working.</p>
  25:           <a class="guide-link" href="../" data-back-to-calendar data-i18n="about.back">Back to the calendar</a>
  28:           <label for="language-selector" data-i18n="language.label">Language</label>
  33:       <p class="about-language-notice" id="about-language-notice" hidden data-i18n="about.fallbackNotice">The explanation is unavailable in the selected language right now, so the default version is shown.</p>
  36:         <summary>
  37:           <span class="eyebrow" data-i18n="about.tocKicker">On this page</span>
  38:           <span class="about-toc-title" data-i18n="about.toc">Contents</span>
  40:         <nav data-i18n-attr="aria-label:about.toc">
  47:         <p class="about-load-error" id="about-load-error" role="alert" hidden data-i18n="about.loadError">The calendar explanation could not be loaded.</p>
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

index.html (59 match(es)):
  7:     <meta name="description" content="A local, deterministic Pastafari calendar." data-i18n-attr="content:meta.description">
  10:     <title data-i18n="app.title">Pastafari Calendar</title>
  18:     <a class="skip-link" href="#search-heading" data-i18n="nav.skip">Skip to date search</a>
  22:           <p class="eyebrow" data-i18n="app.brand">PASTAFARI</p>
  23:           <h1 data-i18n="app.title">Pastafari Calendar</h1>
  24:           <p class="intro" data-i18n="app.intro">Find a day in any available calendar, then see its complete Pastafari date.</p>
  25:           <a class="guide-link" href="./about/" data-about-link data-i18n="about.open">About the calendar</a>
  28:           <label for="language-selector" data-i18n="language.label">Language</label>
  33:       <a class="floating-guide-link" href="./about/" data-about-link data-i18n="about.openShort">About the calendar</a>
  38:           <p class="status-kicker" data-i18n="search.kicker">Date search</p>
  39:           <h2 id="search-heading" tabindex="-1" data-i18n="search.heading">Which day would you like to find?</h2>
  40:           <p data-i18n="search.intro">Choose a calendar, enter a date, and select “Show date.”</p>
  43:           <label class="calendar-picker">
  44:             <span data-i18n="search.calendarLabel">Calendar used for input</span>
  49:           <p class="form-error" id="target-form-error" role="alert" hidden></p>
  50:           <button class="search-submit" type="submit" data-i18n="search.submit">Show date</button>
  54:           <summary data-i18n="settings.summary">Calculation and comparison options</summary>
  57:               <h3 data-i18n="settings.heading">Change the day of working</h3>
  58:               <p data-i18n="settings.intro">The day of working is the calculation's point of departure.</p>
  61:               <label class="calendar-picker">
  62:                 <span data-i18n="settings.actionCalendarLabel">Calendar used to enter the day of working</span>
  67:               <p class="form-error" id="action-form-error" role="alert" hidden></p>
  69:                 <button class="search-submit" type="submit" data-i18n="settings.apply">Apply day of working</button>
  70:                 <button class="secondary-action" type="button" id="reset-action-day" data-i18n="settings.reset">Reset to current Pastafari day</button>
  75:               <label class="toggle-control">
  77:                 <span><strong data-i18n="comparison.toggle">Compare two calculations side by side</strong><small data-i18n="comparison.toggleHelp">Available on desktop.</small></span>
  80:                 <label class="calendar-picker">
  81:                   <span data-i18n="comparison.secondActionLabel">Calendar used to enter the second day of working</span>
  86:                 <p class="form-error" id="comparison-form-error" role="alert" hidden></p>
  87:                 <button class="search-submit" type="submit" data-i18n="comparison.apply">Update comparison</button>
  101:           <p class="status-kicker" data-i18n="loading.kicker">Calculated locally</p>
  102:           <h2 id="loading-heading" data-i18n="loading.title">Finding the cutlet and date…</h2>
  107:         <p class="status-kicker" data-i18n="error.kicker">Unable to display the calendar</p>
  108:         <h2 id="error-heading" data-i18n="error.title">The calculation engine did not load</h2>
  110:         <button type="button" id="reload-button" data-i18n="error.reload">Reload</button>
  123:             <h2 id="cutlet-heading">Calendar</h2>
  126:           <div class="toolbar-actions" role="group" data-i18n-attr="aria-label:calendar.toolbarAria">
  127:             <button type="button" id="previous-cutlet" data-i18n="calendar.previous">Previous cutlet</button>
  128:             <button type="button" class="primary-action" id="today-button" data-i18n="calendar.today">Back to today</button>
  129:             <button type="button" id="next-cutlet" data-i18n="calendar.next">Next cutlet</button>
  133:         <p class="browse-note" id="browse-note" hidden data-i18n="calendar.targetOutside">The searched date is not in the cutlet currently on screen.</p>
  138:             <p class="status-kicker" data-i18n="year.kicker">Year at a glance</p>
  139:             <h2 id="year-overview-heading">Year structure</h2>
  142:           <p class="year-overview-loading" id="year-overview-loading" data-i18n="year.loading">Building the full year structure…</p>
  146:               <div><dt data-i18n="year.lengthLabel">Year length</dt><dd id="year-length"></dd></div>
  147:               <div><dt data-i18n="year.cutletCountLabel">Cutlets</dt><dd id="year-cutlet-count"></dd></div>
  148:               <div><dt data-i18n="year.monthCountLabel">Months</dt><dd id="year-month-count"></dd></div>
  149:               <div><dt data-i18n="year.rangeLabel">Gregorian span</dt><dd id="year-range"></dd></div>
  153:             <p class="year-explainer" data-i18n="year.monthExplainer">Months are woven independently of cutlets, so a month can appear in many separate runs during the year.</p>
  156:                 <summary id="year-cutlets-summary">Cutlets</summary>
  160:                 <summary id="year-months-summary">Months</summary>
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

<sub>1m 15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js (lines 1-180)

<details>
<summary>169 lines</summary>

```
"use strict";

export default Object.freeze({
  code: "en",
  displayName: "English",
  dir: "ltr",
  intlLocale: "en-US",
  messages: Object.freeze({
    "meta.description": "A Pastafari calendar with date search and comparison.",
    "manifest.shortName": "Pastafari",
    "manifest.defaultDescription": "A local, deterministic Pastafari calendar.",
    "app.title": "Pastafari Calendar",
    "app.brand": "PASTAFARI",
    "nav.skip": "Skip to date search",
    "app.intro": "Find a day in any available calendar, then see its complete Pastafari date and the cutlet that contains it.",
    "guide.open": "How do I use this site?",
    "guide.openShort": "How to use this site",
    "about.open": "About the calendar",
    "about.openShort": "About the calendar",
    "about.title": "About the Pastafari Calendar",
    "about.metaDescription": "An explanation of the Pastafari Calendar: its two-day calculation, years, cutlets, woven months, day boundary, and advanced mechanics.",
    "about.intro": "How the calendar represents days, years, cutlets, woven months, and the day of working.",
    "about.skip": "Skip to the calendar explanation",
    "about.back": "Back to the calendar",
    "about.tocKicker": "On this page",
    "about.toc": "Contents",
    "about.fallbackNotice": "The explanation is not available in the selected language right now, so the default version is shown.",
    "about.loadError": "The calendar explanation could not be loaded.",
    "language.label": "Language",
    "day.staleWarning": "The current day changed from {previousDate} to {currentDate}. Because the day of working was the current day, the displayed dates are no longer up to date. They will be recalculated after you dismiss this message.",
    "location.assumption": "(In the absence of contrary information, the device is assumed to be in Kisurra.)",
    "location.useDevice": "Use device location",

    "search.kicker": "Date search",
    "search.heading": "Which day would you like to find?",
    "search.intro": "Choose a calendar, enter a date, and select “Show date.” The current Pastafari day is filled in by default.",
    "search.calendarLabel": "Calendar used for input",
    "search.submit": "Show date",
    "search.invalid": "That date could not be recognized. Check that every field is complete and that the date exists in the selected calendar.",

    "settings.summary": "Calculation and comparison options",
    "settings.heading": "Change the day of working",
    "settings.intro": "The day of working is the calculation's point of departure. By default, the site uses the current Pastafari day determined for the active observer location.",
    "settings.actionCalendarLabel": "Calendar used to enter the day of working",
    "settings.apply": "Apply day of working",
    "settings.reset": "Reset to current Pastafari day",
    "settings.invalid": "The day of working is invalid. Check the date and try again.",

    "comparison.toggle": "Compare two calculations side by side",
    "comparison.toggleHelp": "Available on desktop. Each row will be the same queried day under two days of working.",
    "comparison.secondActionLabel": "Calendar used to enter the second day of working",
    "comparison.apply": "Update comparison",
    "comparison.kicker": "Comparison aligned by day",
    "comparison.heading": "The same days, two days of working",
    "comparison.intro": "Every row contains the same queried day. Only the day of working changes between the first and second columns.",
    "comparison.sameDay": "Day shared by both calculations",
    "comparison.actionHeading": "Day of working: {date}",
    "comparison.summary": "Showing {count} days — from the first through the last day of the cutlet opened by the first calculation.",
    "comparison.scrollAria": "Comparison table of the same days under two calculations",
    "comparison.desktopOnly": "The full comparison table is available on a wide desktop screen.",
    "comparison.invalid": "The second day of working is invalid. Check the date and try again.",

    "field.year": "Year",
    "field.month": "Month",
    "field.day": "Day",
    "field.relatedYear": "Related Gregorian year",
    "field.leapMonth": "Leap month",
    "field.era": "Era",
    "field.eraYear": "Year in era",
    "field.ayyamiHa": "Ayyám-i-Há",
    "field.baktun": "Baktun",
    "field.katun": "Katun",
    "field.tun": "Tun",
    "field.uinal": "Uinal",
    "field.kin": "Kin",
    "field.correlation": "Correlation number",
    "era.meiji": "Meiji",
    "era.taisho": "Taishō",
    "era.showa": "Shōwa",
    "era.heisei": "Heisei",
    "era.reiwa": "Reiwa",

    "calendarInput.gregorian": "Gregorian",
    "calendarInput.julian": "Julian",
    "calendarInput.hebrew": "Hebrew",
    "calendarInput.islamicCivil": "Islamic civil",
    "calendarInput.islamicUmmAlQura": "Umm al-Qura",
    "calendarInput.solarHijriOfficial": "Solar Hijri — official",
    "calendarInput.solarHijriArithmetic": "Solar Hijri — arithmetic 2,820",
    "calendarInput.chinese": "Chinese",
    "calendarInput.hinduOldSolar": "Old Hindu — solar",
    "calendarInput.hinduOldLunar": "Old Hindu — lunar",
    "calendarInput.saka": "Saka",
    "calendarInput.thaiBuddhist": "Thai Buddhist",
    "calendarInput.ethiopic": "Ethiopic",
    "calendarInput.coptic": "Coptic",
    "calendarInput.japaneseImperial": "Japanese imperial",
    "calendarInput.minguo": "Minguo",
    "calendarInput.bahaiTehran": "Bahá’í — Tehran equinox",
    "calendarInput.bahaiWestern": "Bahá’í — western arithmetic",
    "calendarInput.mayaLongCount": "Maya Long Count",
    "calendarHelp.hebrew": "Months are selected by name. Year and day accept decimal digits or Hebrew numeral letters, for example תשפ״ו or י״ד; a letter-form year with no thousands mark is interpreted with 5,000 added.",
    "calendarHelp.intl": "This conversion uses calendar support built into your browser. If the browser cannot represent the date, the site reports that explicitly.",
    "calendarHelp.chinese": "Enter the Gregorian year associated with the Chinese year, and mark “Leap month” only for the repeated month.",
    "calendarHelp.hindu": "Enter the year and day in the old Hindu count and choose the month by name. The lunar form can also mark a leap month.",
    "calendarHelp.japanese": "Year 1 begins on the first day of the era; you may also enter 元 or 元年 for the first year. A date before its beginning or after its end is rejected.",
    "calendarHelp.bahai": "Choose the month by name or Ayyám-i-Há. The Tehran-equinox form supports the conventional Gregorian range 1844–3000.",
    "calendarHelp.maya": "The default correlation is GMT 584,283. You can change it if you use a different correlation.",

    "loading.kicker": "Calculated locally",
    "loading.title": "Finding the cutlet and date…",
    "error.kicker": "Unable to display the calendar",
    "error.title": "The calculation engine did not load",
    "error.reload": "Reload",
    "error.timeout": "The calculation is taking too long.",
    "error.engineFailed": "The calculation engine failed.",
    "error.engineLoadFailed": "The calculation engine could not be loaded.",

    "calendar.toolbarAria": "Cutlet navigation",
    "calendar.previous": "Previous cutlet",
    "calendar.today": "Back to today",
    "calendar.next": "Next cutlet",
    "calendar.daysAria": "Days in the cutlet {cutletName}",
    "calendar.currentCutlet": "Year {year} · cutlet",
    "calendar.cutletDescription": "{count} days · day of working: {actionDate}",
    "calendar.targetOutside": "The date you searched for is not in the cutlet currently on screen. You can keep browsing or search for another date.",

    "year.kicker": "Year at a glance",
    "year.heading": "Structure of year {year}",
    "year.context": "This structure is calculated for the day of working {actionDate}. Changing the day of working can rebuild the year's boundaries, cutlets, and months.",
    "year.loading": "Building the full year structure…",
    "year.error": "The full year structure could not be built. The cutlet view is still available.",
    "year.lengthLabel": "Year length",
    "year.cutletCountLabel": "Cutlets",
    "year.monthCountLabel": "Months",
    "year.rangeLabel": "Gregorian span",
    "year.daysValue": "{count} days",
    "year.rangeValue": "{startDate} to {endDate}",
    "year.displayedCutletPosition": "The displayed cutlet occupies days {start}–{end} of the year.",
    "year.targetPosition": "The date you searched for is day {day} of {length} in this year.",
    "year.monthExplainer": "Months are woven independently of cutlets: a month is not a subdivision of a cutlet, and its days can appear in many separate runs across the year. A month's length is therefore its total number of assigned days, not necessarily one continuous span.",
    "year.cutletsSummary": "Cutlets in this year ({count})",
    "year.monthsSummary": "Months in this year ({count})",
    "year.numberedName": "{number}. {name}",
    "year.cutletMeta": "Length: {length} days · position in year: days {start}–{end}",
    "year.monthMeta": "Days: {length} · continuous runs: {runs} · first occurrence: day {first} · last: day {last}",

    "target.today": "This is today",
    "target.searched": "This is the date you searched for",
    "target.context": "Queried date: {targetDate} · day of working: {actionDate}",
    "target.notInView": "Your searched date remains saved; the cutlet currently displayed is different.",
    "date.aria": "Year {year} from the Creation of the World, day {dayInCutlet} in the cutlet {cutletName}, day {dayInMonth} in the month {monthName}",
    "date.yearLine": "Year {year} from the Creation of the World",
    "date.cutletLine": "Day {dayInCutlet} in the cutlet {cutletName}",
    "date.monthLine": "Day {dayInMonth} in the month {monthName}",

    "guide.eyebrow": "User guide",
    "guide.heading": "What can you do here, and how?",
    "guide.intro": "The site shows a complete Pastafari date for any day, accepts searches in many calendars, and can compare the effect of the day of working on desktop.",
    "guide.1.heading": "Open the site and get today",
    "guide.1.body": "As soon as the link opens, the site determines the current Pastafari day for the active observer location and displays the cutlet containing it. The day boundary is the location-dependent lower meridian transit of Venus described in ASTRONOMICAL-DAY.md; it is not civil midnight. There is no registration, sign-in, or date sent to a calculation server.",
    "guide.2.heading": "Search in any available calendar",
    "guide.2.body": "In “Which day would you like to find?”, choose a calendar, fill its fields, and select “Show date.” The choices include Gregorian, Hebrew, Julian, Islamic, Persian, Chinese, Hindu, Saka, Thai, Ethiopic, Coptic, Japanese, Minguo, Bahá’í, and the Maya Long Count.",
    "guide.3.heading": "Read the date",
    "guide.3.body": "Every tile has three fixed lines: year from the Creation of the World; the day number in the cutlet and its name; then the day in the month and its name. No single number represents the whole date. The month name determines the tile's color.",
    "guide.4.heading": "Browse without selecting by accident",
    "guide.4.body": "“Previous cutlet” and “Next cutlet” move to neighboring cutlets. Other day tiles are not buttons because clicking them has no action. “Back to today” resets both the search and the day of working to the current Pastafari day.",
    "guide.5.heading": "Change the day of working",
    "guide.5.body": "Open “Calculation and comparison options” below the search. There you can choose a calendar and enter another day of working. Further searches use it until you reset to the current Pastafari day. This advanced control remains available without crowding the normal view.",
    "guide.6.heading": "Compare the same days twice",
    "guide.6.body": "On desktop, enable comparison in the same area. Each row contains exactly the same queried day; the first column uses the first day of working and the second uses the second. Today versus tomorrow is the default, making every changed Pastafari date easy to identify.",
    "guide.7.heading": "Inspect the whole year",
    "guide.7.body": "Below the cutlet view, the site shows the structure of the displayed year: its length and span, every cutlet and its length, and every month. Months also show their number of continuous runs and their first and last occurrence, making the year-wide weaving visible.",
    "guide.note": "Rows and columns in the tile grid are only visual arrangement, not weeks. In the comparison table, however, alignment is meaningful: each row is the same queried day.",
    "guide.back": "Back to search and calendar",
    "footer.local": "Calculation happens on your device; this site has no user account and no tracking code.",
    "footer.open": "The link is public and loads directly, including in a private-browsing window.",
    "reverse.kicker": "Reverse search",
    "reverse.heading": "Find a day from its Pastafari date",
    "reverse.intro": "Enter a complete Pastafari date and define its day of working. The search runs locally on this device.",
```

</details>


---

<sub>1m 15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/locales/en.js (lines 181-360)

<details>
<summary>129 lines</summary>

```
    "reverse.mode.basic": "Single date",
    "reverse.mode.advanced": "Constraint system",
    "reverse.basic.heading": "Single-date reverse search",
    "reverse.basic.dateHeading": "Pastafari date to find",
    "reverse.field.year": "Year",
    "reverse.field.cutlet": "Cutlet",
    "reverse.field.dayInCutlet": "Day in cutlet",
    "reverse.field.month": "Month",
    "reverse.field.dayInMonth": "Day in month",
    "reverse.basic.calculationHeading": "Day of working",
    "reverse.basic.calculationMode": "How is the day of working defined?",
    "reverse.basic.calculation.active": "Use the site's active day of working",
    "reverse.basic.calculation.absolute": "Use another known date",
    "reverse.basic.calculation.same": "The day of working is the queried day (c = t)",
    "reverse.basic.calculation.pastafari": "The day of working is itself Pastafari / depends on other dates",
    "reverse.basic.activeValue": "Active day of working: {date}",
    "reverse.basic.absoluteHeading": "Known day of working",
    "reverse.basic.sameHeading": "Finite search range for c = t",
    "reverse.basic.rangeStart": "Range start",
    "reverse.basic.rangeEnd": "Range end",
    "reverse.basic.toAdvanced": "Continue in the constraint-system editor",
    "reverse.basic.toAdvancedHelp": "Recursive Pastafari calculation days are represented as variables and constraints so the chain can be extended without an artificial depth limit.",
    "reverse.action.solve": "Search",
    "reverse.action.cancel": "Cancel search",
    "reverse.action.open": "Open in calendar",
    "reverse.action.addVariable": "Add date variable",
    "reverse.action.addConstraint": "Add constraint",
    "reverse.action.remove": "Remove",
    "reverse.action.clear": "Clear results",
    "reverse.progress.reverse": "Resolving Pastafari relations",
    "reverse.progress.verify": "Verifying candidate solutions",
    "reverse.progress.done": "Search finished",
    "reverse.progress.scanned": "Work units completed: {count}",
    "reverse.status.running": "Searching locally…",
    "reverse.status.cancelled": "Search cancelled.",
    "reverse.status.superseded": "A newer search replaced this search.",
    "reverse.status.completeEmpty": "No solution exists in the completely searched domain.",
    "reverse.status.completeSolutions": "Search complete. All {count} solutions in the domain are shown.",
    "reverse.status.partialEmpty": "The search stopped before completion. No solution has been found yet.",
    "reverse.status.partialSolutions": "{count} verified solutions are shown, but the search stopped before completion and more may exist.",
    "reverse.status.stale": "These results used a previous active day of working. Run the search again to use the current one.",
    "reverse.status.rangeRequired": "This problem cannot be searched exhaustively until a finite range or fixed date is added.",
    "reverse.status.timeout": "The search reached its time limit before completion.",
    "reverse.status.failed": "The reverse-search engine failed.",
    "reverse.result.heading": "Solutions",
    "reverse.result.solution": "Solution {index}",
    "reverse.result.target": "Queried day",
    "reverse.result.calculation": "Day of working",
    "reverse.result.jdn": "JDN {jdn}",
    "reverse.result.complete": "Complete search",
    "reverse.result.partial": "Partial search",
    "reverse.advanced.heading": "Constraint-system solver",
    "reverse.advanced.intro": "Define date variables and relationships between them. Cycles are allowed when the system is reduced to finite domains.",
    "reverse.variables.heading": "Date variables",
    "reverse.variable.label": "Display name",
    "reverse.variable.defaultName": "Date {index}",
    "reverse.variable.domain": "Domain",
    "reverse.variable.domain.unknown": "Unknown (must be bounded by other constraints)",
    "reverse.variable.domain.exact": "Exact known date",
    "reverse.variable.domain.range": "Finite date range",
    "reverse.constraint.heading": "Constraints",
    "reverse.constraint.type": "Constraint type",
    "reverse.constraint.pastafari": "Pastafari date",
    "reverse.constraint.equal": "Same absolute day",
    "reverse.constraint.order": "Chronological order",
    "reverse.constraint.difference": "Difference in days",
    "reverse.constraint.left": "Left date",
    "reverse.constraint.right": "Right date",
    "reverse.constraint.target": "Queried date variable",
    "reverse.constraint.calculationMode": "Day-of-working source",
    "reverse.constraint.calculation.variable": "Another date variable",
    "reverse.constraint.calculation.absolute": "Known absolute date",
    "reverse.constraint.calculation.same": "Same as queried date (c = t)",
    "reverse.constraint.calculationVariable": "Day-of-working variable",
    "reverse.constraint.orderOp": "Relation",
    "reverse.constraint.differenceMode": "Difference rule",
    "reverse.constraint.differenceExact": "Exact difference",
    "reverse.constraint.differenceRange": "Difference range",
    "reverse.constraint.equals": "Exact days (left − right)",
    "reverse.constraint.min": "Minimum days (left − right)",
    "reverse.constraint.max": "Maximum days (left − right)",
    "reverse.options.heading": "Search limits",
    "reverse.options.intro": "Leave a limit blank for no limit. A limit is never applied silently.",
    "reverse.options.maxSolutions": "Stop after this many verified solutions",
    "reverse.options.maxScanned": "Stop after this many work units",
    "reverse.options.timeout": "Time limit in milliseconds",
    "reverse.advanced.emptyVariables": "Add at least one date variable.",
    "reverse.advanced.emptyConstraints": "A system may contain no constraints, but every remaining variable must still have a finite domain.",
    "reverse.error.input": "Some reverse-search fields are missing or invalid.",
    "reverse.error.limitPositive": "{field} must be positive.",
    "reverse.error.limitSafeInteger": "{field} is outside the safe integer range.",
    "reverse.error.absoluteDateField": "Invalid absolute date field.",
    "reverse.error.range": "The range end must not precede the range start.",
    "reverse.error.variable": "Each constraint must refer to an existing date variable.",
    "reverse.error.pastafari": "Enter all five Pastafari date fields.",
    "reverse.calendar.label": "Calendar used for this absolute date",

  }),
  calendar: Object.freeze({
    cutlets: Object.freeze({
      bronze: "Bronze", fox: "Fox", kidney: "Kidney", lagash: "Lagash", thought: "Thought",
      fourPartsOfNine: "Four Parts of Nine", palgurash: "Palgurash", papyrusSedge: "Papyrus Sedge",
      cluster: "Cluster", scorpion: "Scorpion", ash: "Ash", wheat: "Wheat", river: "River",
      laughter: "Laughter", akkad: "Akkad", horn: "Horn", theEmptyJar: "The Empty Jar",
    }),
    months: Object.freeze({
      clay: "Clay", pomegranate: "Pomegranate", elbow: "Elbow", envy: "Envy", eridu: "Eridu",
      toothpaste: "Toothpaste", threePartsOfFive: "Three Parts of Five", karshumav: "Karshumav",
      leopard: "Leopard", tin: "Tin", mist: "Mist", frankincense: "Frankincense", spindle: "Spindle",
      rib: "Rib", carob: "Carob", uruk: "Uruk", shame: "Shame", camel: "Camel", copper: "Copper",
      well: "Well", yolk: "Yolk", star: "Star", honey: "Honey", spleen: "Spleen", limestone: "Limestone",
      joy: "Joy", fig: "Fig", nineveh: "Nineveh", frog: "Frog", pitch: "Pitch", lamp: "Lamp",
      theClosedDoor: "The Closed Door", sesame: "Sesame", nape: "Nape", silver: "Silver", susa: "Susa",
      storm: "Storm", donkey: "Donkey", flour: "Flour", regret: "Regret", babylon: "Babylon", tongue: "Tongue",
      flax: "Flax", salt: "Salt", pear: "Pear", bow: "Bow", sand: "Sand",
    }),
  }),
  terminology: Object.freeze({
    foundationDay: "Foundation Day",
    workingNumber: "Working Number",
    queryNumber: "Query Number",
    distanceNumber: "Distance Number",
    sumNumber: "Sum Number",
    directionNumber: "Direction Number",
    bowl: "Bowl",
    drop: "Drop",
    gate: "Gate",
    yearFiveThousand: "Year Five Thousand from the Creation of the World",
  }),
});
```

</details>


---

<sub>1m 15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 155-178)

<details>
<summary>24 lines</summary>

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
```

</details>


---

<sub>1m 15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 518-540)

<details>
<summary>23 lines</summary>

```
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
```

</details>


---

<sub>1m 15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/manifest.webmanifest (lines 880-905)

<details>
<summary>26 lines</summary>

```
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
```

</details>


---

<sub>1m 15s</sub>

### `rg`

**\.language-control|\.date-entry-form|\.form-actions|\.toggle-control|\.reverse|\.calendar-toolbar|\.comparison|overflow|white-space|width:|grid-template-columns**

"\.language-control|\.date-entry-form|\.form-actions|\.toggle-control|\.reverse|\.calendar-toolbar|\.comparison|overflow|white-space|width:|grid-template-columns" (docs/styles.css)

<details>
<summary>252 matches</summary>

```
[grep content: 250 matches across 1 file(s) under docs]

styles.css (250 match(es)):
  22:   min-width: 280px;
  61:   width: min(100% - 2rem, 94rem);
  68:   grid-template-columns: minmax(0, 1fr) auto;
  88:   max-width: 14ch;
  90:   overflow-wrap: anywhere;
  99:   max-width: 58ch;
  105: .language-control {
  107:   min-width: min(14rem, 100%);
  111: .language-control label,
  119: .language-control select,
  124:   width: 100%;
  125:   min-width: 0;
  133: .language-control select,
  176: .comparison-workspace,
  189:   max-width: 22ch;
  191:   overflow-wrap: anywhere;
  200:   max-width: 68ch;
  206: .date-entry-form {
  208:   grid-template-columns: minmax(13rem, 1.5fr) minmax(0, 4fr) auto;
  217:   min-width: 0;
  223:   grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  224:   min-width: 0;
  242: .toggle-control input {
  243:   width: 1.25rem;
  292:   width: fit-content;
  307: .settings-intro { max-width: 65ch; }
  310: .compact-form { grid-template-columns: minmax(13rem, 1.5fr) minmax(8rem, 4fr) minmax(12rem, auto); }
  311: .form-actions { display: flex; min-width: 0; flex-wrap: wrap; gap: 0.5rem; align-items: stretch; }
  312: .form-actions > * { flex: 1 1 auto; }
  321: .toggle-control {
  323:   width: fit-content;
  324:   max-width: 60rem;
  334: .toggle-control span { display: grid; gap: 0.15rem; }
  335: .toggle-control small { color: var(--muted); }
  353:   width: 2.25rem;
  378:   overflow: hidden;
  387:   width: fit-content;
  399:   grid-template-columns: repeat(3, minmax(0, 1fr));
  405:   min-width: 0;
  407:   overflow-wrap: anywhere;
  424: .calendar-toolbar {
  433:   overflow-wrap: anywhere;
  456: .reverse-mode-tab {
  457:   min-width: 0;
  458:   overflow-wrap: anywhere;
  472:   grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  481:   min-width: 0;
  487:   overflow: hidden;
  510:   width: fit-content;
  511:   max-width: 100%;
  514:   overflow-wrap: anywhere;
  527:   min-width: 0;
  530:   overflow-wrap: anywhere;
  563:   max-width: 76rem;
  582:   grid-template-columns: repeat(4, minmax(0, 1fr));
  588:   min-width: 0;
  603:   overflow-wrap: anywhere;
  626:   grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  633:   min-width: 0;
  637:   overflow: hidden;
  652:   overflow: auto;
  665: .structure-item strong { overflow-wrap: anywhere; font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif; }
  668: .comparison-workspace { padding-inline: clamp(1rem, 2.5vw, 2rem); }
  669: .comparison-summary { margin-top: 1.2rem; padding: 0.8rem 1rem; background: #f3eee4; color: var(--muted); font-weight: 700; }
  670: .comparison-scroll { display: none; max-height: 75vh; margin-top: 1rem; overflow: auto; border: 2px solid var(--ink); border-radius: 0.75rem; background: white; }
  671: .comparison-table { width: 100%; min-width: 72rem; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
  672: .comparison-table th, .comparison-table td { min-width: 0; padding: 0.7rem; vertical-align: top; border-inline-end: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  673: .comparison-table thead th { position: sticky; inset-block-start: 0; z-index: 5; background: var(--ink); color: white; text-align: start; }
  674: .comparison-table thead th:first-child { width: 14rem; }
  675: .comparison-table thead th:nth-child(2), .comparison-table thead th:nth-child(3) { width: calc((100% - 14rem) / 2); }
  676: .comparison-shared-day { background: #f3eee4; text-align: start; }
  677: .comparison-shared-day strong, .comparison-shared-day small { display: block; overflow-wrap: anywhere; }
  678: .comparison-shared-day small { margin-top: 0.25rem; color: var(--muted); font-weight: 500; }
  679: .comparison-date-cell { background: #fffdf8; }
  680: .comparison-date-line {
  682:   min-width: 0;
  684:   overflow-wrap: anywhere;
  691: .comparison-date-line + .comparison-date-line { margin-top: 0.4rem; }
  692: .comparison-date-line strong { font-family: Georgia, "Times New Roman", serif; font-variant-numeric: tabular-nums; }
  693: .comparison-target-row > * { border-block: 4px solid var(--accent) !important; }
  694: .comparison-target-row > :first-child { border-inline-start: 4px solid var(--accent) !important; }
  695: .comparison-target-row > :last-child { border-inline-end: 4px solid var(--accent) !important; }
  700:   grid-template-columns: repeat(3, minmax(0, 1fr));
  706:   min-width: 0;
  709:   overflow-wrap: anywhere;
  733: @media (min-width: 1000px) {
  735:   .comparison-scroll { display: block; }
  739: @media (max-width: 999px) {
  740:   .compact-form { grid-template-columns: 1fr; }
  743: @media (max-width: 900px) {
  744:   .year-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  745:   .year-structure-columns { grid-template-columns: 1fr; }
  746:   .date-entry-form { grid-template-columns: 1fr; }
  747:   .search-submit { width: 100%; }
  750: @media (max-width: 760px) {
  751:   .masthead { grid-template-columns: 1fr; }
  752:   .language-control { min-width: 0; max-width: 22rem; }
  753:   .calendar-toolbar, .site-footer { align-items: stretch; flex-direction: column; }
  754:   .toolbar-actions { display: grid; grid-template-columns: 1fr 1fr 1fr; }
  756:   .beacon-date { grid-template-columns: 1fr; }
  757:   .guide-grid { grid-template-columns: 1fr; }
  761: @media (max-width: 520px) {
  762:   .year-facts { grid-template-columns: 1fr; }
  764:   .date-fields { grid-template-columns: 1fr; }
  767: @media (max-width: 420px) {
  768:   .app-shell { width: min(100% - 1rem, 94rem); }
  769:   .calendar-grid { grid-template-columns: 1fr; }
  783:   .day-card, .target-beacon, .comparison-table td, .comparison-table th {
  788:   .day-line, .beacon-line, .comparison-date-line {
  800:   .app-shell { width: 100%; padding: 0; }
  801:   .masthead { grid-template-columns: 1fr; padding-block: 0 1rem; }
  802:   .toolbar-actions, .guide-link, .floating-guide-link, .back-to-calendar, .site-footer, .language-control, .advanced-settings, .search-panel { display: none; }
  803:   .public-guide, .comparison-workspace, .year-overview { box-shadow: none; }
  804:   .structure-list { max-height: none; overflow: visible; }
  807:   .calendar-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.2rem; }
  811:   .comparison-scroll { display: block; max-height: none; overflow: visible; }
  812:   .comparison-table { min-width: 0; }
  813:   .comparison-table thead th { position: static; }
  817: .reverse-panel {
  824: .reverse-mode-tabs {
  834: .reverse-mode-tab {
  844: .reverse-mode-tab[data-active="true"] {
  850: .reverse-mode-panel { margin-top: 0.75rem; }
  851: .reverse-mode-panel > h3 { margin-block: 0 1rem; font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif; }
  853: .reverse-block,
  854: .reverse-builder-section,
  855: .reverse-limits,
  856: .reverse-output {
  864: .reverse-block > h4,
  865: .reverse-builder-section > h4,
  866: .reverse-pastafari-block > h5,
  867: .reverse-range-part > h5 {
  872: .reverse-pastafari-fields {
  874:   grid-template-columns: repeat(5, minmax(0, 1fr));
  878: .reverse-pastafari-field { min-width: 0; }
  879: .reverse-pastafari-field select,
  880: .reverse-pastafari-field input { width: 100%; min-width: 0; }
  882: .reverse-calculation-body,
  883: .reverse-domain-body,
  884: .reverse-constraint-body,
  885: .reverse-difference-body { margin-top: 0.8rem; }
  887: .reverse-absolute-editor {
  889:   grid-template-columns: minmax(13rem, 0.7fr) minmax(0, 1.3fr);
  898: .reverse-absolute-editor > .field-help,
  899: .reverse-absolute-editor > .form-error { grid-column: 1 / -1; margin: 0; }
  901: .reverse-date-fields { margin: 0; }
  903: .reverse-range-grid {
  905:   grid-template-columns: repeat(2, minmax(0, 1fr));
  909: .reverse-range-part { min-width: 0; }
  911: .reverse-builder-list {
  917: .reverse-builder-card {
  918:   min-width: 0;
  926: .reverse-card-heading,
  927: .reverse-output-heading,
  928: .reverse-relation-row {
  935: .reverse-card-heading { margin-bottom: 0.8rem; }
  936: .reverse-card-title { font-family: Georgia, "Times New Roman", serif; }
  937: .reverse-remove { padding-block: 0.35rem; }
  939: .reverse-constraint-body {
  941:   grid-template-columns: repeat(2, minmax(0, 1fr));
  945: .reverse-constraint-body > .reverse-calculation-body,
  946: .reverse-constraint-body > .reverse-pastafari-block,
  947: .reverse-constraint-body > .reverse-difference-body { grid-column: 1 / -1; }
  949: .reverse-limit-grid {
  951:   grid-template-columns: repeat(3, minmax(0, 1fr));
  955: .reverse-limits > summary { cursor: pointer; font-weight: 850; }
  956: .reverse-actions { margin-top: 1rem; }
  958: .reverse-output { border-width: 2px; }
  959: .reverse-output-heading { border-bottom: 1px solid var(--line); padding-bottom: 0.75rem; }
  960: .reverse-output-heading h3 { margin: 0; }
  961: .reverse-status { margin-top: 0.8rem; padding: 0.75rem 0.85rem; background: #f3eee4; font-weight: 800; }
  962: .reverse-status[data-complete="false"] { border-inline-start: 5px solid #9f6e08; background: #fff4d4; }
  963: .reverse-status[data-stale="true"] { border-inline-start: 5px solid #9f6e08; }
  964: .reverse-progress { color: var(--muted); font-variant-numeric: tabular-nums; }
  966: .reverse-solutions {
  968:   grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
  973: .reverse-solution-card {
  974:   min-width: 0;
  981: .reverse-solution-card h4 { margin: 0 0 0.75rem; font-family: Georgia, "Times New Roman", serif; }
  982: .reverse-solution-facts { display: grid; gap: 0.6rem; margin: 0 0 0.9rem; }
  983: .reverse-solution-fact { min-width: 0; padding: 0.6rem; background: white; border: 1px solid #ded3c2; }
  984: .reverse-solution-fact dt { color: var(--muted); font-size: 0.8rem; font-weight: 800; }
  985: .reverse-solution-fact dd { margin: 0.25rem 0 0; overflow-wrap: anywhere; }
  986: .reverse-solution-fact strong,
  987: .reverse-solution-fact small { display: block; }
  988: .reverse-solution-fact small { margin-top: 0.2rem; color: var(--muted); }
  990: .reverse-solution-relations { display: grid; gap: 0.5rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--line); }
  991: .reverse-relation-row { align-items: flex-start; }
  992: .reverse-relation-row span { min-width: 0; overflow-wrap: anywhere; }
  994: @media (max-width: 900px) {
  995:   .reverse-pastafari-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  996:   .reverse-absolute-editor { grid-template-columns: 1fr; }
  997:   .reverse-constraint-body { grid-template-columns: 1fr; }
  998:   .reverse-constraint-body > .reverse-calculation-body,
  999:   .reverse-constraint-body > .reverse-pastafari-block,
  1000:   .reverse-constraint-body > .reverse-difference-body { grid-column: auto; }
  1001:   .reverse-limit-grid { grid-template-columns: 1fr; }
  1004: @media (max-width: 620px) {
  1005:   .reverse-mode-tabs { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
  1006:   .reverse-range-grid { grid-template-columns: 1fr; }
  1007:   .reverse-pastafari-fields { grid-template-columns: 1fr; }
  1008:   .reverse-card-heading, .reverse-relation-row { align-items: stretch; flex-direction: column; }
  1012:   .reverse-panel, .reverse-builder-card, .reverse-solution-card, .reverse-absolute-editor {
  1020:   .reverse-panel { display: none; }
  1027:   width: min(100% - 2rem, 78rem);
  1032:   width: min(100%, 72ch);
  1038:   max-width: none;
  1041: .about-masthead .language-control {
  1042:   width: min(100%, 14rem);
  1043:   min-width: 0;
  1044:   max-width: none;
  1050:   width: min(100%, 72ch);
  1063:   width: min(100%, 60rem);
  1093:   grid-template-columns: repeat(2, minmax(0, 1fr));
  1100:   min-width: 0;
  1115:   width: min(100%, 74rem);
  1135:   width: min(100%, 72ch);
  1155:   width: min(100%, 72ch);
  1202:   max-width: 68ch;
  1231:   width: fit-content;
  1232:   min-width: min(12rem, 100%);
  1233:   max-width: min(100%, 72ch);
  1236:   overflow-x: auto;
  1260:   width: min(100%, 72ch);
  1263:   overflow-x: auto;
  1272:   width: min(100%, 64rem);
  1274:   overflow-x: auto;
  1282:   width: 100%;
  1283:   min-width: 46rem;
  1305:   width: min(100%, 54rem);
  1306:   overflow: visible;
  1310:   min-width: 0;
  1316:   width: 64%;
  1324:   width: 36%;
  1334:   white-space: normal;
  1378:   grid-template-columns: repeat(2, minmax(0, 1fr));
  1416:   width: min(100%, 72ch);
  1427: @media (max-width: 860px) {
  1429:     width: min(100%, 42rem);
  1433:     grid-template-columns: 1fr;
  1441: @media (max-width: 760px) {
  1468:     grid-template-columns: 1fr;
  1476: @media (max-width: 620px) {
  1478:     overflow: visible;
  1483:     width: 100%;
  1488:     width: 1px;
  1490:     overflow: hidden;
  1493:     white-space: nowrap;
  1500:     width: 100%;
  1535: @media (max-width: 420px) {
```

</details>


---

<sub>1m 15s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/i18n/registry.js (lines 400-578)

<details>
<summary>166 lines</summary>

```
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

<sub>1m 47s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css (lines 200-340)

<details>
<summary>123 lines</summary>

```
  max-width: 68ch;
  margin-bottom: 0;
  color: var(--muted);
  font-size: 1.08rem;
}

.date-entry-form {
  display: grid;
  grid-template-columns: minmax(13rem, 1.5fr) minmax(0, 4fr) auto;
  gap: 0.9rem;
  margin-top: 1.5rem;
  align-items: end;
}

.calendar-picker,
.date-field {
  display: grid;
  min-width: 0;
  gap: 0.35rem;
}

.date-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  min-width: 0;
  gap: 0.75rem;
  align-items: end;
}

.checkbox-field {
  display: flex;
  min-height: 46px;
  padding: 0.55rem 0.75rem;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid #8e8272;
  border-radius: 0.7rem;
  background: var(--panel);
  font-weight: 750;
}

.checkbox-field input,
.toggle-control input {
  width: 1.25rem;
  height: 1.25rem;
  flex: 0 0 auto;
  accent-color: var(--accent-dark);
}

.search-submit,
.secondary-action,
.error-panel button,
.toolbar-actions button {
  min-height: 46px;
  padding: 0.65rem 1rem;
  border: 1px solid #8e8272;
  border-radius: 0.7rem;
  background: #fffdf8;
  color: var(--ink);
  font-weight: 800;
  cursor: pointer;
}

.search-submit {
  border-color: var(--accent-dark);
  background: var(--accent-dark);
  color: white;
}

.search-submit:hover,
.toolbar-actions .primary-action:hover { background: #49160e; }
.secondary-action:hover,
.toolbar-actions button:hover { background: #fff4ee; }

.field-help,
.form-error {
  grid-column: 1 / -1;
  margin: 0;
  padding: 0.75rem 0.9rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
}

.field-help { background: #f3eee4; color: var(--muted); }
.form-error { border: 1px solid #a52b1b; background: #fff0ed; color: #76180e; font-weight: 750; }

.advanced-settings {
  margin-top: 1.25rem;
  border-top: 1px solid var(--line);
}

.advanced-settings > summary {
  width: fit-content;
  min-height: 44px;
  padding: 0.75rem 0;
  color: var(--accent-dark);
  cursor: pointer;
  font-weight: 800;
}

.settings-content {
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 0.9rem;
  background: #f8f3e9;
}

.settings-intro { max-width: 65ch; }
.settings-intro h3 { margin-bottom: 0.35rem; font-size: 1.25rem; }
.settings-intro p { margin-bottom: 0; color: var(--muted); }
.compact-form { grid-template-columns: minmax(13rem, 1.5fr) minmax(8rem, 4fr) minmax(12rem, auto); }
.form-actions { display: flex; min-width: 0; flex-wrap: wrap; gap: 0.5rem; align-items: stretch; }
.form-actions > * { flex: 1 1 auto; }

.desktop-comparison-settings {
  display: none;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
}

.toggle-control {
  display: flex;
  width: fit-content;
  max-width: 60rem;
  padding: 0.85rem;
  align-items: flex-start;
  gap: 0.75rem;
  border: 1px solid #9b8f7e;
  border-radius: 0.75rem;
  background: var(--panel);
  cursor: pointer;
}

.toggle-control span { display: grid; gap: 0.15rem; }
.toggle-control small { color: var(--muted); }

.status-panel {
  display: flex;
  min-height: 18rem;
  margin-block: 2rem;
```

</details>


---

<sub>1m 47s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css (lines 420-540)

<details>
<summary>106 lines</summary>

```
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
  font-size: clamp(0.8rem, 1.25vw, 0.96rem);
  font-weight: 600;
  line-height: 1.35;
}
```

</details>


---

<sub>1m 47s</sub>

### `view`

**view the file at /home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css.**

/home/runner/work/pastafari-calendar/pastafari-calendar/docs/styles.css (lines 860-1015)

<details>
<summary>131 lines</summary>

```
  border-radius: 0.75rem;
  background: white;
}

.reverse-block > h4,
.reverse-builder-section > h4,
.reverse-pastafari-block > h5,
.reverse-range-part > h5 {
  margin: 0 0 0.8rem;
  font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif;
}

.reverse-pastafari-fields {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
}

.reverse-pastafari-field { min-width: 0; }
.reverse-pastafari-field select,
.reverse-pastafari-field input { width: 100%; min-width: 0; }

.reverse-calculation-body,
.reverse-domain-body,
.reverse-constraint-body,
.reverse-difference-body { margin-top: 0.8rem; }

.reverse-absolute-editor {
  display: grid;
  grid-template-columns: minmax(13rem, 0.7fr) minmax(0, 1.3fr);
  gap: 0.75rem 1rem;
  align-items: end;
  padding: 0.85rem;
  border: 1px dashed #b9ad9b;
  border-radius: 0.6rem;
  background: #fffaf2;
}

.reverse-absolute-editor > .field-help,
.reverse-absolute-editor > .form-error { grid-column: 1 / -1; margin: 0; }

.reverse-date-fields { margin: 0; }

.reverse-range-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.reverse-range-part { min-width: 0; }

.reverse-builder-list {
  display: grid;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.reverse-builder-card {
  min-width: 0;
  padding: 0.9rem;
  border: 1px solid #cfc3b2;
  border-inline-start: 5px solid var(--accent);
  border-radius: 0.65rem;
  background: #fffdf8;
}

.reverse-card-heading,
.reverse-output-heading,
.reverse-relation-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.reverse-card-heading { margin-bottom: 0.8rem; }
.reverse-card-title { font-family: Georgia, "Times New Roman", serif; }
.reverse-remove { padding-block: 0.35rem; }

.reverse-constraint-body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.reverse-constraint-body > .reverse-calculation-body,
.reverse-constraint-body > .reverse-pastafari-block,
.reverse-constraint-body > .reverse-difference-body { grid-column: 1 / -1; }

.reverse-limit-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.reverse-limits > summary { cursor: pointer; font-weight: 850; }
.reverse-actions { margin-top: 1rem; }

.reverse-output { border-width: 2px; }
.reverse-output-heading { border-bottom: 1px solid var(--line); padding-bottom: 0.75rem; }
.reverse-output-heading h3 { margin: 0; }
.reverse-status { margin-top: 0.8rem; padding: 0.75rem 0.85rem; background: #f3eee4; font-weight: 800; }
.reverse-status[data-complete="false"] { border-inline-start: 5px solid #9f6e08; background: #fff4d4; }
.reverse-status[data-stale="true"] { border-inline-start: 5px solid #9f6e08; }
.reverse-progress { color: var(--muted); font-variant-numeric: tabular-nums; }

.reverse-solutions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
  gap: 0.9rem;
  margin-top: 0.9rem;
}

.reverse-solution-card {
  min-width: 0;
  padding: 0.9rem;
  border: 1px solid #b9ad9b;
  border-radius: 0.65rem;
  background: #fffaf2;
}

.reverse-solution-card h4 { margin: 0 0 0.75rem; font-family: Georgia, "Times New Roman", serif; }
.reverse-solution-facts { display: grid; gap: 0.6rem; margin: 0 0 0.9rem; }
.reverse-solution-fact { min-width: 0; padding: 0.6rem; background: white; border: 1px solid #ded3c2; }
.reverse-solution-fact dt { color: var(--muted); font-size: 0.8rem; font-weight: 800; }
.reverse-solution-fact dd { margin: 0.25rem 0 0; overflow-wrap: anywhere; }
.reverse-solution-fact strong,
.reverse-solution-fact small { display: block; }
.reverse-solution-fact small { margin-top: 0.2rem; color: var(--muted); }

.reverse-solution-relations { display: grid; gap: 0.5rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--line); }
.reverse-relation-row { align-items: flex-start; }
.reverse-relation-row span { min-width: 0; overflow-wrap: anywhere; }

@media (max-width: 900px) {
  .reverse-pastafari-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .reverse-absolute-editor { grid-template-columns: 1fr; }
  .reverse-constraint-body { grid-template-columns: 1fr; }
  .reverse-constraint-body > .reverse-calculation-body,
  .reverse-constraint-body > .reverse-pastafari-block,
  .reverse-constraint-body > .reverse-difference-body { grid-column: auto; }
  .reverse-limit-grid { grid-template-columns: 1fr; }
}

@media (max-width: 620px) {
  .reverse-mode-tabs { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
  .reverse-range-grid { grid-template-columns: 1fr; }
  .reverse-pastafari-fields { grid-template-columns: 1fr; }
  .reverse-card-heading, .reverse-relation-row { align-items: stretch; flex-direction: column; }
}

@media (forced-colors: active) {
  .reverse-panel, .reverse-builder-card, .reverse-solution-card, .reverse-absolute-editor {
    border: 2px solid CanvasText;
    background: Canvas;
    color: CanvasText;
```

</details>


---

<sub>1m 47s</sub>

### `rg`

**"name_localized"|"short_name_localized"|"description_localized"**

""name_localized"|"short_name_localized"|"description_localized"" (docs/manifest.webmanifest)

```
docs/manifest.webmanifest:4:  "name_localized": {
docs/manifest.webmanifest:367:  "short_name_localized": {
docs/manifest.webmanifest:730:  "description_localized": {
```


---

<sub>1m 47s</sub>

### `rg`

**"target.context"|"calendarInput.solarHijriArithmetic"|"comparison.kicker"|"reverse.status.rangeRequired"|"reverse.constraint.target"|"guide.2.body"|"year.daysValue"|"year.cutletMeta"|"comparison.summary"|"calendar.cutletDescription"**

""target.context"|"calendarInput.solarHijriArithmetic"|"comparison.kicker"|"reverse.status.rangeRequired"|"reverse.constraint.target"|"guide.2.body"|"year.daysValue"|"year.cutletMeta"|"comparison.summary"|"calendar.cutletDescription"" (docs/i18n/locales/is.js)

<details>
<summary>10 matches</summary>

```
docs/i18n/locales/is.js:53:    "comparison.kicker": "Samanburður samstilltur eftir degi",
docs/i18n/locales/is.js:58:    "comparison.summary": "Sýndir eru {count} dagar, frá fyrsta til síðasta dags kótelettunnar sem fyrri útreikningurinn opnaði.",
docs/i18n/locales/is.js:87:    "calendarInput.solarHijriArithmetic": "Sól-Hijri — reiknað 2.820",
docs/i18n/locales/is.js:121:    "calendar.cutletDescription": "{count} dagar · aðgerðardagur: {actionDate}",
docs/i18n/locales/is.js:132:    "year.daysValue": "{count} dagar",
docs/i18n/locales/is.js:140:    "year.cutletMeta": "Lengd: {length} dagar · staða í árinu: dagar {start}–{end}",
docs/i18n/locales/is.js:144:    "target.context": "Dagsetning fyrirspurnardags: {targetDate} · aðgerðardagur: {actionDate}",
docs/i18n/locales/is.js:156:    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
docs/i18n/locales/is.js:215:    "reverse.status.rangeRequired": "Ekki er hægt að leita þetta vandamál til fulls fyrr en endanlegu sviði eða fastri dagsetningu hefur verið bætt við.",
docs/i18n/locales/is.js:242:    "reverse.constraint.target": "Fyrirspurnardagsbreyta",
```

</details>


---

<sub>2m 20s</sub>

### `rg`

**let activeLocale = await loadLocale|applyDocumentLocale\(activeLocale\)|await loadArticleForLocale\(activeLocale\.code\)|ARTICLE_FALLBACK_LOCALE|code: "is"|lang: "is-IS"**

"let activeLocale = await loadLocale|applyDocumentLocale\(activeLocale\)|await loadArticleForLocale\(activeLocale\.code\)|ARTICLE_FALLBACK_LOCALE|code: "is"|lang: "is-IS"" (docs/app.js, docs/about/about.js, docs/about/content/registry.js)

<details>
<summary>13 matches</summary>

```
docs/about/content/registry.js:3:export const ARTICLE_FALLBACK_LOCALE = "he";
docs/about/content/registry.js:203:    code: "is",
docs/about/content/registry.js:204:    lang: "is-IS",
docs/about/content/registry.js:445:  return ARTICLE_LOCALES[code] ?? ARTICLE_LOCALES[ARTICLE_FALLBACK_LOCALE];
docs/about/about.js:15:  ARTICLE_FALLBACK_LOCALE,
docs/about/about.js:23:let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
docs/about/about.js:37:  applyDocumentLocale(activeLocale);
docs/about/about.js:77:      if (articleLocale.code === ARTICLE_FALLBACK_LOCALE) throw selectedError;
docs/about/about.js:78:      console.warn(`Falling back from article locale ${articleLocale.code} to ${ARTICLE_FALLBACK_LOCALE}.`, selectedError);
docs/about/about.js:79:      articleLocale = resolveArticleLocale(ARTICLE_FALLBACK_LOCALE);
docs/about/about.js:159:await loadArticleForLocale(activeLocale.code);
docs/app.js:46:let activeLocale = await loadLocale(resolveBrowserLocale().locale.code);
docs/app.js:883:  applyDocumentLocale(activeLocale);
```

</details>


---

<sub>2m 20s</sub>

### `rg`

**"(about.metaDescription|reverse.status.rangeRequired|target.context|calendarInput.solarHijriArithmetic|guide.2.body|comparison.kicker|reverse.constraint.target)"**

""(about.metaDescription|reverse.status.rangeRequired|target.context|calendarInput.solarHijriArithmetic|guide.2.body|comparison.kicker|reverse.constraint.target)"" (docs/i18n/locales/is.js)

<details>
<summary>7 matches</summary>

```
docs/i18n/locales/is.js:24:    "about.metaDescription": "Skýring á Pastafari-dagatalinu: aðgerðardagur og fyrirspurnardagur, ár, kótelettur, fléttaðir mánuðir, dagamörk og háþróuð kerfi.",
docs/i18n/locales/is.js:53:    "comparison.kicker": "Samanburður samstilltur eftir degi",
docs/i18n/locales/is.js:87:    "calendarInput.solarHijriArithmetic": "Sól-Hijri — reiknað 2.820",
docs/i18n/locales/is.js:144:    "target.context": "Dagsetning fyrirspurnardags: {targetDate} · aðgerðardagur: {actionDate}",
docs/i18n/locales/is.js:156:    "guide.2.body": "Undir „Hvaða dag viltu finna?“ velurðu dagatal, fyllir út reitina og velur „Sýna dagsetningu“. Valkostirnir fela í sér gregorískt, hebreskt, júlíanskt, íslamskt, persneskt, kínverskt, hindú, saka, taílenskt, eþíópískt, koptískt, japanskt, minguo og bahá’í dagatal, auk langtals Maya.",
docs/i18n/locales/is.js:215:    "reverse.status.rangeRequired": "Ekki er hægt að leita þetta vandamál til fulls fyrr en endanlegu sviði eða fastri dagsetningu hefur verið bætt við.",
docs/i18n/locales/is.js:242:    "reverse.constraint.target": "Fyrirspurnardagsbreyta",
```

</details>


---

<sub>2m 20s</sub>

### `rg`

**reikniúrtaki|milljón samfellda|milljón færslur|cold wake|óbreytanlegan Pastafari|Pastafari-merki|Choice" er heiti**

"reikniúrtaki|milljón samfellda|milljón færslur|cold wake|óbreytanlegan Pastafari|Pastafari-merki|Choice" er heiti" (docs/about/content/is.html)

```
docs/about/content/is.html:5:  <p>Dagatalið festir ekki einn óbreytanlegan Pastafari-„miða“ á hvern dag. Til að fá dagsetningu þarf tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, þann dag sem spurt er um Pastafari-dagsetningu fyrir.</p>
docs/about/content/is.html:150:  <p>Hingað til höfum við talað um reglur dagatalsins. Næstu tölur eru annars konar upplýsingar: <strong>reynsluniðurstöður</strong> úr stórri reikniúrtaki.</p>
docs/about/content/is.html:151:  <p>Atlasinn var reiknaður út með þeirri útgáfu vélarinnar sem tilgreind er í commit-inu <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code> og innihélt 4.096 aðgerðardaga; árin 4990–5010 fyrir hvern þeirra; 86.016 ársbyggingar; 625.437 kótelettur; 3.535.422 byggingarmánuði; meira en 356 milljón samfellda mánaðarkafla; og meira en 364 milljón færslur frá degi <code>n</code> í dag <code>n+1</code> í sama mánuði.</p>
docs/about/content/is.html:240:  <p>21. september 2026 var opinber HTTPS-útsetning á Render prófuð í raun: á virku þjónustunni voru staðfestar nákvæmar fyrirspurnir, stórt dagabil, endurræsing, ræsing eftir dvala (<code>cold wake</code>) og hegðun undir álagi.</p>
docs/about/content/is.html:328:  <p>Dagur <code>n+1</code> í mánuði þarf ekki að vera á morgun. Sami dagur á tímalínunni getur fengið annað Pastafari-merki á morgun. Sama raunverulega augnablik getur á tveimur stöðum tilheyrt tveimur mismunandi staðbundnum Pastafari-dögum. Heilsdagsatburður þarf ekki að standa frá miðnætti til miðnættis. Og árlegur afmælisdagur er fyrst leitarvandamál og síðan dagatalsvandamál.</p>
```


---

<sub>2m 20s</sub>

### `rg`

**\.reverse-pastafari-fields|\.reverse-pastafari-field|\.reverse-constraint-body|\.reverse-mode-tab|overflow-wrap: anywhere**

"\.reverse-pastafari-fields|\.reverse-pastafari-field|\.reverse-constraint-body|\.reverse-mode-tab|overflow-wrap: anywhere" (docs/styles.css)

<details>
<summary>36 matches</summary>

```
[grep content: 34 matches across 1 file(s) under docs]

styles.css (34 match(es)):
  90:   overflow-wrap: anywhere;
  191:   overflow-wrap: anywhere;
  407:   overflow-wrap: anywhere;
  433:   overflow-wrap: anywhere;
  456: .reverse-mode-tab {
  458:   overflow-wrap: anywhere;
  514:   overflow-wrap: anywhere;
  530:   overflow-wrap: anywhere;
  603:   overflow-wrap: anywhere;
  665: .structure-item strong { overflow-wrap: anywhere; font-family: Georgia, "Times New Roman", "Noto Serif Hebrew", serif; }
  677: .comparison-shared-day strong, .comparison-shared-day small { display: block; overflow-wrap: anywhere; }
  684:   overflow-wrap: anywhere;
  709:   overflow-wrap: anywhere;
  824: .reverse-mode-tabs {
  834: .reverse-mode-tab {
  844: .reverse-mode-tab[data-active="true"] {
  872: .reverse-pastafari-fields {
  878: .reverse-pastafari-field { min-width: 0; }
  879: .reverse-pastafari-field select,
  880: .reverse-pastafari-field input { width: 100%; min-width: 0; }
  884: .reverse-constraint-body,
  939: .reverse-constraint-body {
  945: .reverse-constraint-body > .reverse-calculation-body,
  946: .reverse-constraint-body > .reverse-pastafari-block,
  947: .reverse-constraint-body > .reverse-difference-body { grid-column: 1 / -1; }
  985: .reverse-solution-fact dd { margin: 0.25rem 0 0; overflow-wrap: anywhere; }
  992: .reverse-relation-row span { min-width: 0; overflow-wrap: anywhere; }
  995:   .reverse-pastafari-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  997:   .reverse-constraint-body { grid-template-columns: 1fr; }
  998:   .reverse-constraint-body > .reverse-calculation-body,
  999:   .reverse-constraint-body > .reverse-pastafari-block,
  1000:   .reverse-constraint-body > .reverse-difference-body { grid-column: auto; }
  1005:   .reverse-mode-tabs { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
  1007:   .reverse-pastafari-fields { grid-template-columns: 1fr; }
```

</details>


---

<sub>2m 20s</sub>

### `rg`

**name_localized|short_name_localized|description_localized**

"name_localized|short_name_localized|description_localized" (docs/manifest.webmanifest)

```
docs/manifest.webmanifest:4:  "name_localized": {
docs/manifest.webmanifest:367:  "short_name_localized": {
docs/manifest.webmanifest:730:  "description_localized": {
```


---

<sub>2m 50s</sub>

### Copilot

NATIVE_QA_RESULT: FAIL

**Heildarniðurstaða: FAIL.** Fannst nokkur málfars- og hugtakanotkunaratriði í íslenskum texta, auk raunverulegrar frumstillingarbilunar sem getur skilið enskan frumtexta eftir sýnilegan. Enginn texti á öðru máli fannst við venjulega íslenska frumstillingu að frátöldum tæknilegum heitum og auðkennum.

## Niðurstöður

| Alvarleiki | Skrá og staðsetning | Núverandi texti | Skýring og ráðlögð leiðrétting |
|---|---|---|---|
| Miðlungs | `docs/app.js:46, 883`; `docs/about/about.js:23, 37` | `let activeLocale = await loadLocale(...)`; síðan er `applyDocumentLocale(activeLocale)` keyrt síðar | Ef íslenska staðfærslueiningin næst ekki hleðst hún ekki og kóðinn nær ekki að keyra staðfærsluna á HTML-frumtextann. Enski textinn getur því staðið eftir án íslenskra villuskilaboða. Bæta við skýrri og notendasýnilegri frumstillingarvaraleið fyrir mistókna tungumálahleðslu, þannig að enski frumtextinn verði ekki þögul niðurstaða. |
| Miðlungs | `docs/about/content/is.html:150` | „úr **stórri** reikniúrtaki“ | Samræmist ekki hvorugkynsorðinu „úrtak“. Leiðrétta í „úr **stóru** reikniúrtaki“. |
| Miðlungs | `docs/about/content/is.html:151` | „356 milljón samfellda mánaðarkafla“; „364 milljón færslur“ | Talnaorðið „milljón“ og fall orðanna á eftir eru ekki rétt samræmd. Mælt er með „356 milljónir samfelldra mánaðarkafla“ og „364 milljónir færslna“. |
| Miðlungs | `docs/i18n/locales/is.js:215`, `reverse.status.rangeRequired` | „Ekki er hægt að **leita þetta vandamál** til fulls…“ | Sögnin „leita“ krefst hér forsetningarinnar „að“; núverandi orðalag er stirð þýðing. T.d. „Ekki er hægt að ljúka tæmandi leit að þessu viðfangsefni fyrr en endanlegu sviði eða fastri dagsetningu hefur verið bætt við.“ |
| Miðlungs | `docs/i18n/locales/is.js:144`, `target.context` | „Dagsetning fyrirspurnardags: {targetDate}“ | Vantar greini í eignarfallinu og heitið víkur frá „fyrirspurnardagur“ sem annars er notað. Styttra og samræmdara væri „Fyrirspurnardagur: {targetDate}“. |
| Miðlungs | `docs/about/content/is.html:240` | „ræsing eftir dvala (**cold wake**)“ | Óþarfa enskur tæknitexti er sýnilegur í íslenskri málsgrein. Nota íslenska orðalagið „vöknun eftir dvala“ án enska svigans. |
| Miðlungs | `docs/about/content/is.html:328` | „annað Pastafari-**merki**“ | „Merki“ er ekki samræmt hugtakinu „Pastafari-dagsetning“ sem notað er annars staðar og getur gefið aðra merkingu. Nota „aðra Pastafari-dagsetningu“. |
| Lágt | `docs/i18n/locales/is.js:156`, `guide.2.body` | „… kínverskt, **hindú**, saka, taílenskt…“ | Listinn notar lýsingarorð en „hindú“ er ekki í samsvarandi lýsingarorðsformi; „saka“ sker sig einnig úr sem ómerkt heiti. Samræma upptalninguna, t.d. með „hindúískt“ og „Saka-dagatal“. |
| Lágt | `docs/i18n/locales/is.js:87`, `calendarInput.solarHijriArithmetic` | „Sól-Hijri — reiknað 2.820“ | Óljóst hvað talan táknar og „reiknað“ vantar skýrt viðfang. Ef átt er við 2.820 ára reiknireglu, skýra það í heitinu, t.d. „Sól-Hijri — 2.820 ára reikniregla“. |
| Lágt | `docs/i18n/locales/is.js:53`, `comparison.kicker` | „Samanburður samstilltur eftir degi“ | Skiljanlegt en stirðlegt orðalag. Mælt er með skýrara heiti, t.d. „Samanburður eftir sama degi“ eða „Samanburður þar sem dagarnir eru samstilltir“. |

## Texti á röngu tungumáli og varaleiðir

Við venjulega íslenska frumstillingu eru viðmótsstrengirnir þýddir. Enski textinn í kyrrstæða HTML-inu er frumræsitexti sem keyrslan skiptir út og er því ekki sjálfstæður galli. Ef upphafleg hleðsla staðfærslueiningarinnar bregst getur þessi enski texti þó setið eftir; það er raunveruleg undantekning og kemur fram í niðurstöðutöflunni.

Á `/about/` er varaleið greinarinnar skýr: ef íslenska greinin hleðst ekki birtist hebreska útgáfan ásamt íslenskri tilkynningu, og greinin fær `lang="he-IL"` og `dir="rtl"`. Sú hegðun er gegnsæ og ekki óviljandi tungumálaleki. `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, `API`, `CLI`, `SIMD`, `JDN` og kóðabrot voru ekki talin þýðingargallar þar sem þau eru heiti, tæknileg auðkenni eða kóðatákn. `noscript`-textinn er aðeins `JavaScript` og viðvörunartákn, eins og tilgreint er.

## Samræmi í hugtakanotkun milli `/about/` og notendaviðmótsins

Kjarnahugtökin „aðgerðardagur“, „fyrirspurnardagur“, „kóteletta“ og „dagamörk“ eru almennt samræmd. Ósamræmið „Pastafari-merki“ á móti „Pastafari-dagsetning“ er tilgreint hér að ofan. Í upphafi greinarinnar (`docs/about/content/is.html:5`) er „Pastafari-„miði““ notað um dagsetningu; „miði“ er óljóst og passar illa við hugtakanotkun viðmótsins. Skýrara væri „föst Pastafari-dagsetning“ eða „Pastafari-dagsetning sem breytist ekki“.

## Lýsigögn, ARIA, manifest, noscript og varaleiðir

Í `docs/manifest.webmanifest` eru íslenskar færslur fyrir `name_localized`, `short_name_localized` og `description_localized`. Gildin eru „Pastafari-dagatal“, „Pastafari“ og „Pastafari-dagatal með dagsetningarleit og samanburði.“; öll eru merkt `lang: "is"` og `dir: "ltr"`. Þær færslur eru í lagi. Keyrslan setur tungumál og textastefnu skjalsins; íslenska greinin er skráð sem `is-IS` og `ltr`. ARIA-merkingar sem tengjast `data-i18n-attr` eru staðfærðar. Enginn viðbótargalli fannst í þessum flötum.

## Líkleg textabundin hætta á línuskiptingu

**Lítil, en ekki útilokuð, áhætta** er í ítarlegri öfugri leit. Samsetta orðið „Fyrirspurnardagsbreyta“ (`docs/i18n/locales/is.js:242`) getur orðið erfitt að brjóta í þröngu stýrirými. Fimm dálka reitir öfugrar leitar eru þröngir á breiðum skjám en skipta niður í færri dálka við minni breidd; aðrir stýrihnappar og textafletir eru almennt með sveigjanlegri uppsetningu. Þetta er textabundið áhættumat, ekki sjónræn prófun á birtri síðu.

Skoðaðir voru íslenska staðfærsluskráin í heild, öll íslenska `/about/`-greinin, aðalsíða og `/about/`-skel, manifest, staðfærsluskrá og keyrsla, forritskóði aðalviðmóts og öfugrar leitar, villu- og varaleiðir, leiðbeiningar, dagsetningarleit, aðgerðardagur, samanburður, ársýn, aðgengismerkingar, tungumálaskipti og CSS-tengd áhætta á textaþrengslum.

---

<sub>Generated by [GitHub Copilot CLI](https://github.com/features/copilot/cli)</sub>
