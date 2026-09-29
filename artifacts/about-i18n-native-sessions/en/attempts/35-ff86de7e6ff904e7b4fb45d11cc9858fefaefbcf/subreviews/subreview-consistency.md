# SUBREVIEW_SESSION
surface: consistency
reviewer_model: Qwen3 8B Q4_K_M
attempts: 3

===== ORIGINAL_USER =====
/no_think

You are an independent, strict language and user-interface reviewer for the English version of the Pastafari Calendar (locale `en-US`, repository code `en`).

ALL of your natural-language communication in this review session must be in English. You may quote text in another language when reporting it as a defect, and you may reproduce literal technical identifiers, API names, formulas, hashes, file paths, and other strings that must not be translated.

This is a fresh, independent LLM review. Do not trust previous QA conclusions and do not assume that earlier wording is good. The task is review, not wholesale retranslation or rewriting.

Review the ENTIRE displayed and accessibility-facing experience when the site language is English, not only `/about/`. Scope includes the main UI, date search, day-of-working controls, comparison, year view, reverse search, errors and states, user guide, footer, metadata/title, manifest, ARIA/a11y, noscript/fallback, language switching, and `/about/`.

Actively look for:
1. text in the wrong language or unintended fallback;
2. translationese-like, awkward, or otherwise unnatural modern English, even when understandable;
3. grammar, syntax, agreement, register, punctuation, spelling, typography, and capitalization problems;
4. terminology inconsistency between `/about/` and the UI;
5. wrong or doubtful wording of technical concepts;
6. placeholders used in the wrong grammatical or semantic role;
7. incorrect or unnatural metadata, title, ARIA, manifest, fallback, or accessibility text;
8. suspicious mixed-script text or locale-direction problems;
9. likely wrapping, overflow, or cramped-control risks caused by wording length. This is a textual risk assessment, not a substitute for later rendered visual QA.

Canonical invariants are mandatory. Do not propose changing formulas, hashes, code literals, API identifiers, stable section IDs, or true canonical names merely to make them read more naturally.

Rules that prevent false positives:

- The Web App Manifest supports `*_localized` language maps. Do not report fallback `name`, `short_name`, `description`, `lang`, or `dir` merely because localized entries also exist. Verify instead that English has complete and correct localized manifest entries where the project contract expects them.
- Static HTML can contain bootstrap source strings on elements carrying `data-i18n` or `data-i18n-attr`. The localization runtime replaces them after locale initialization. Do not report a source default merely because it exists in HTML; report it only if code inspection shows it can remain exposed after English locale initialization or on a real error/fallback path.
- Locale resolution on this static site is itself performed by JavaScript. The `noscript` fallback is intentionally language-neutral and consists only of the proper name `JavaScript` plus a warning symbol. Do not report that as a language defect. Do report additional natural-language fallback or accessibility defects that are independent of locale resolution.
- Reviewer instructions themselves, `MODE`/`SOURCE_PART` control lines, file headers, and summaries from other reviewers are **not website text**. Never use text from these instructions as `current_text`, never locate a finding in a prompt/artifact file, and never report instruction text as a localization defect.
- A “wrong-language text” finding is valid only if you can quote real natural-language text from the supplied website source and identify that website source file. Do not call normal English text “another language”.

You will receive `MODE` and `SOURCE_PART` below these instructions.

If `MODE=FINDINGS_ONLY`:
- review only the supplied `SOURCE_PART`;
- decide clearly: `CLEAN` if there is no fix-worthy problem, otherwise `FINDINGS`;
- the runner requires a short structured response: one English summary and at most six local findings; do not restate the whole input;
- each real finding must have severity (`critical`, `high`, `medium`, or `low`), the most precise file/location supported by the evidence, a very short current-text quote when applicable, a clear issue, and an actionable correction;
- merge findings that are really the same problem; do not invent broad or unlocated findings;
- if no real defect is found, briefly explain in English what was reviewed and why it is clean;
- DO NOT copy SOURCE_PART, source code, or long source passages back unless a tiny exact excerpt is required to locate a finding;
- DO NOT write `SUBREVIEW_RESULT` or `NATIVE_QA_RESULT`; the runner creates those mechanical lines.

MODE=FINDINGS_ONLY
SOURCE_PART=CONSISTENCY
SURFACE_CONTRACT:
SCOPE_UI_ABOUT_TERMINOLOGY_ONLY=TRUE
IGNORE_CALENDAR_MATHEMATICS_AND_CODE_QUALITY=TRUE
LOCALE_FINDING_LOCATION_REQUIRES_TRANSLATION_KEY_FRAGMENT=TRUE
CURRENT_TEXT_MUST_EQUAL_EXACT_LOCALE_VALUE=TRUE
ACTIONABLE_CHANGE_REQUIRED=TRUE

===== docs/i18n/locales/en.js — FULL TARGET UI TERMINOLOGY =====
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


===== docs/about/content/en.html — HEADINGS + LEAD PARAGRAPHS =====
14:   <h2>What makes up a Pastafari date?</h2>
15:   <p>Every Pastafari date has <strong>exactly five parts</strong>:</p>
23:   <p>A generic example would be: <strong>year 5000, cutlet A, day 417 in the cutlet, month B, day 83 in the month.</strong></p>
29:   <h2>Why is a day of working needed?</h2>
30:   <p>In an ordinary calendar we tend to think that a date simply “belongs” to a day. Here it belongs to a relationship between two days.</p>
31:   <p>Changing <code>t</code> means asking about a different day. Changing <code>c</code> goes deeper: it can alter the calendar structure in which the question is asked—year boundaries, cutlets, months, their names, and the way the months are woven together.</p>
37:   <h2>Same day, different date</h2>
38:   <p>Two ideas need to be kept separate. <strong>Day identity</strong> is a day's stable position on the timeline. Its <strong>Pastafari representation</strong> is the five-field result obtained when that same day is viewed under a particular day of working.</p>
39:   <p>In the product and API, the first can be thought of as a <code>day-id</code>: a chronological identity that does not change when the display context changes. By contrast,</p>
51:   <h2>Year 5000</h2>
52:   <p>Whenever the day of working and the queried day are the same,</p>
54:   <p>the year is always</p>
67:   <h2>Years and gates</h2>
68:   <p>A Pastafari year can contain anywhere from</p>
70:   <p>days. These are canonical limits of the system, not averages observed in an experiment.</p>
77:   <h2>Cutlets</h2>
78:   <p>Every year is divided into <strong>6 to 17 cutlets</strong>. A cutlet is one continuous chronological segment.</p>
79:   <p>If today is day 250 of a cutlet, tomorrow is day 251 of that cutlet—unless today is its final day.</p>
88:   <h2>Months and weaving</h2>
89:   <p>A year contains</p>
91:   <p>structural months, and each month has</p>
102:   <h2>The months are woven through one another</h2>
103:   <p>It helps to picture the months as threads woven along the year. Every day belongs to exactly one month, but tomorrow may belong to another; later the first month can return and continue with its next number.</p>
104:   <p>The weave is not ruleless. In particular, there are constraints on the orders in which months first and last appear. There is nevertheless no requirement that one month finish before another begins.</p>
115:   <h2>The next day in a month is not necessarily tomorrow</h2>
116:   <p>If today is day 17 of some month, day 18 of that month is <strong>that month's next occurrence</strong>. It might be tomorrow; it might be much later.</p>
117:   <p>So <strong>tomorrow</strong> means the next chronological day, while <strong>the next day in the month</strong> means the next time that month appears.</p>
123:   <h2>There are no weeks</h2>
124:   <p>The current canonical specification <strong>does not define a week system</strong>. There is no canonical seven-day super-unit, no Pastafari weekday names, and no rule making one day the “same weekday” as another.</p>
125:   <p>A civil week system can of course be overlaid from outside. It simply is not part of the Pastafari date.</p>
130:   <h2>Names</h2>
131:   <p>The calendar has 17 canonical cutlet names and 47 canonical month names. Within a year, each name occurs at most once within its own family.</p>
132:   <p>A name's identity is canonical and semantic; it is not decided by a vote among spellings, translations, or implementations. The Hebrew Scroll is the highest authority for the names' meanings. Translation and transliteration are display layers.</p>
138:   <h2>A small fact about months</h2>
139:   <p>There are 47 month names, and a month can reach at most day 123. That gives</p>
141:   <p>syntactically possible pairs of the form:</p>
152:   <h2>How is the calendar calculated?</h2>
153:   <p>The internal calculation is called <strong>the sauce</strong>. At its center is</p>
155:   <p>which is prime.</p>
167:   <h2>Short Choice and Wide Choice</h2>
168:   <p><strong>Short Choice</strong> is used when the system must select from a relatively small option space. It uses rejection sampling to avoid the bias of a simple modulo operation.</p>
169:   <p>Very large choice spaces use <strong>Wide Choice</strong>. It is important not to give Wide Choice properties that the specification does not give it.</p>
176:   <h2>The Structural Atlas</h2>
177:   <p>The rules above are rules of the calendar. The numbers in this box are something else: <strong>empirical findings</strong> from a large computational sample.</p>
178:   <p>The atlas was built with engine commit <code>8e155fa4198ea7bcfeb16138ac5d6662706f4d93</code>. It contains:</p>
225:   <h2>Birthdays and anniversaries</h2>
226:   <p>“The same day every year” needs a more careful definition in a Pastafari calendar. At least two natural structural coordinates can be held fixed: a <strong>month anniversary</strong>, meaning the same month name and day in month, or a <strong>cutlet anniversary</strong>, meaning the same cutlet name and day in cutlet. Combined conditions are possible too.</p>
227:   <p>A Pastafari birthday is therefore not simply equivalent to <code>RRULE:FREQ=YEARLY</code>. One must search for the next year in which the chosen recurrence condition is satisfied. The original event itself is not automatically counted as its own “next occurrence”.</p>
239:   <h2>How do you arrange a meeting?</h2>
240:   <p>If two people want to set the meeting day using a Pastafari date, they must agree at least on the five-field Pastafari tuple and the day of working used to calculate it. Together, these specify the Pastafari day, not necessarily an exact moment within it. Preferably, that day of working should itself be stored as a stable day identity rather than as the word “today”; otherwise the two people may calculate different calendars.</p>
241:   <p>Ordinary phrases also need precision:</p>
254:   <h2>Travel and all-day events</h2>
255:   <p>An event is not the same thing as the local label displayed for it. A scheduled event should be anchored to a stable chronological instant. Travel does not move the event in time, but it can change the local Pastafari date shown at that instant, because the definition of the “local day” depends on location.</p>
256:   <p>The difference is even more important for an <strong>all-day</strong> event. A civil all-day event normally runs from one civil midnight to the next. A Pastafari all-day event should run from one local Pastafari day boundary to the next. Those are generally not the same instants.</p>
262:   <h2>When does the day change?</h2>
263:   <p>The local Pastafari day does not change at midnight. Its boundary is defined by the <strong>topocentric lower meridian transit of the center of Venus across the local meridian</strong>.</p>
264:   <p>In other words, the transition from one Pastafari day to the next is a local astronomical event and depends on location. Accordingly, the change of day:</p>
277:   <h2>Printed calendars and hand calculation</h2>
278:   <p>You can print a Pastafari calendar. Just state which day of working it is for. A calendar prepared under one day of working shows the structure of time from that day's point of view; when the day of working changes, a new calendar may be needed. The printer thus remains relevant.</p>
279:   <p>Everything can also be calculated by hand. The specification is deterministic and complete. Calculate the input counters, perform 7 hidden drops and 46 visible ones, update six bowls, carry out 12 final stirs, produce the answers, build gates, choose years and cutlets, perform the combinatorial choices, select names, and weave the months.</p>
285:   <h2>What is Seer?</h2>
286:   <p>Alongside the canonical implementation there is a fast engine called <strong>Pastafarian Calendar Seer</strong>. Seer is not a source of authority: the Scroll sets the rules, and the canonical calculation derives the date from them. Seer is meant to return the same answer. If Seer disagrees with a correct canonical calculation, Seer is wrong.</p>
287:   <p>Its purpose is to answer the same questions quickly and in a form that is easy to integrate into products.</p>
307:   <h2>Origin, Foundation Day, and Tablets Day</h2>
308:   <p>The calendar's fixed computational anchors are distinct from its origin and history of re-delivery.</p>
311:     <h3>The anchors</h3>
312:     <p>The system has a fixed reference day called <strong>Foundation Day</strong>. In the proleptic Gregorian calendar it is <strong>22 December 41,222 BCE</strong>.</p>
313:     <p>Foundation Day is not “the beginning of time”. It is a computational anchor.</p>
323:     <h3>The calendar's origin and re-delivery</h3>
324:     <p>The Pastafari Calendar is part of creation. Humanity used it without fully realizing it was doing so until its modern re-delivery.</p>
325:     <p>The Scroll does not set out every detail of this history; anything it does not state explicitly is not part of the Scroll's text.</p>
332:   <h2>Advanced: reverse conversion</h2>
333:   <p>When the day of working <code>c</code> is known, reverse conversion is very strong. Inside a known Pastafari year,</p>
335:   <p>identifies at most one day. So does</p>
360:     <h3>Structure far out in time</h3>
361:     <p>Derived mathematical work has also established an exact asymptotic structure. For a <strong>fixed day of working</strong> <code>c</code>, sufficiently far down the past tail there is affine periodicity.</p>
362:     <p>If</p>
375:   <h2>Advanced: how much history does the sauce retain?</h2>
376:   <p>The sauce looks like a very aggressive mixer, but algebraic research found that it preserves considerably more information than its outward appearance suggests. This is research derived from the specification, not an additional calendar rule.</p>
377:   <p>On visible stages 3 through 46, generic injectivity has been established on the relevant asymptotic branch: generically, the state retains enough information to recover the relevant history of the inputs and bowl orders.</p>
387:   <h2>So what is the Pastafari Calendar, really?</h2>
388:   <p>It is a deterministic calendar in which a date is not a function of a queried day alone, but of the <strong>day of working and the queried day together</strong>.</p>
389:   <p>A date has exactly five fields. The self-present is always in year 5000, although year 5000 itself changes with the day of working. Years can be extremely long; cutlets are continuous; months need not be continuous at all; and there is no canonical week system.</p>
===== ATTEMPT 1 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "Found several terminology inconsistencies between the `/about/` page and the UI, including mismatched terms for 'day of working', 'query number', and 'working number'. Some terms in the `/about/` content are not reflected in the UI terminology, and vice versa.",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "day of working",
      "issue": "The term 'day of working' is used in the `/about/` content but is not present in the UI terminology. The UI uses 'day of working' in the settings and comparison sections, but the terminology object does not include it.",
      "correction": "Add 'day of working' to the terminology object in `docs/i18n/locales/en.js`."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "query number",
      "issue": "The term 'query number' is used in the `/about/` content but is not present in the UI terminology. The UI does not use this term, and it is not listed in the terminology object.",
      "correction": "Add 'query number' to the terminology object in `docs/i18n/locales/en.js`."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "working number",
      "issue": "The term 'working number' is used in the `/about/` content but is not present in the UI terminology. The UI does not use this term, and it is not listed in the terminology object.",
      "correction": "Add 'working number' to the terminology object in `docs/i18n/locales/en.js`."
    },
    {
      "severity": "medium",
      "location": "docs/i18n/locales/en.js",
      "current_text": "queryNumber",
      "issue": "The term 'queryNumber' is used in the UI terminology but is not reflected in the `/about/` content. The `/about/` content uses 'query number' as a term, but the UI uses 'queryNumber' as a key in the terminology object.",
      "correction": "Update the `/about/` content to use 'queryNumber' or ensure that 'query number' is consistently used across all UI and content."
    }
  ]
}
===== ATTEMPT 1 VALIDATION =====
INVALID: current_text is not present at claimed location: 'docs/about/content/en.html'

===== ATTEMPT 2 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "The English version of the Pastafari Calendar's about page contains several inconsistencies with the terminology and wording used in the UI, particularly in the 'about' section. These issues include mismatched terminology, awkward phrasing, and incorrect references to technical j",

  "findings": [
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "the year is always",
      "issue": "The phrase 'the year is always' is not present in the UI terminology and is inconsistent with the terminology used in the UI, which refers to 'Year 5000' as a fixed reference point.",
      "correction": "Replace 'the year is always' with 'the year is always Year 5000' to align with the terminology used in the UI."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "days. These are canonical limits of the system, not averages observed in an experiment.",
      "issue": "The phrase 'days' is not specific enough and does not match the terminology used in the UI, which refers to 'cutlets' and 'months' as the structural components of the calendar.",
      "correction": "Replace 'days' with 'cutlets' to align with the terminology used in the UI."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "the next day in the month is not necessarily tomorrow",
      "issue": "The phrase 'the next day in the month' is not present in the UI terminology and is inconsistent with the terminology used in the UI, which refers to 'day of working' and 'queried day' as the key concepts.",
      "correction": "Replace 'the next day in the month' with 'the next day in the month' to align with the terminology used in the UI."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "the same day every year",
      "issue": "The phrase 'the same day every year' is not present in the UI terminology and is inconsistent with the terminology used in the UI, which refers to 'month anniversary' and 'cutlet anniversary' as the key concepts.",
      "correction": "Replace 'the same day every year' with 'the same month every year' to align with the terminology used in the UI."
    }
  ]
}
===== ATTEMPT 2 VALIDATION =====
INVALID: current_text is not present at claimed location: 'docs/about/content/en.html'

===== ATTEMPT 3 RAW JSON =====
{
  "result": "FINDINGS",
  "summary": "The English version of the Pastafari Calendar's about page contains several inconsistencies with the terminology and wording used in the UI, particularly in the 'about' section. These include mismatched terms, incorrect references, and missing translations that affect the user's ",
  "findings": [
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "the year is always",
      "issue": "The term 'year' is used in a context that should reference the 'working number' or 'query number' from the terminology section, which are more precise terms for the day of working and queried day respectively.",
      "correction": "Replace 'year' with 'working number' or 'query number' as appropriate to align with the terminology used in the UI."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "days. These are canonical limits of the system, not averages observed in an experiment.",
      "issue": "The term 'days' is used without specifying the 'cutlet' or 'year' context, which is inconsistent with the terminology used in the UI that includes 'cutlet' and 'year' as specific terms.",
      "correction": "Replace 'days' with 'cutlet days' or 'year days' to align with the terminology used in the UI."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "the next day in the month is not necessarily tomorrow",
      "issue": "The term 'day' is used without specifying the 'cutlet' or 'month' context, which is inconsistent with the terminology used in the UI that includes 'cutlet' and 'month' as specific terms.",
      "correction": "Replace 'day' with 'cutlet day' or 'month day' to align with the terminology used in the UI."
    },
    {
      "severity": "medium",
      "location": "docs/about/content/en.html",
      "current_text": "the same day every year",
      "issue": "The term 'day' is used without specifying the 'cutlet' or 'month' context, which is inconsistent with the terminology used in the UI that includes 'cutlet' and 'month' as specific terms.",
      "correction": "Replace 'day' with 'cutlet day' or 'month day' to align with the terminology used in the UI."
    }
  ]
}
===== ATTEMPT 3 VALIDATION =====
INVALID: current_text is not present at claimed location: 'docs/about/content/en.html'

===== NORMALIZED_REVIEW =====
SUBREVIEW_RESULT: INVALID

The surface reviewer output could not be accepted as structured evidence after 3 attempts.

reason: current_text is not present at claimed location: 'docs/about/content/en.html'

All raw attempts and validator reasons are preserved in this artifact.
