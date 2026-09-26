# Deutsches QA — Zwischenstand für die gesamte Website

## Umfang

Die Prüfung deckt `de-DE` auf der gesamten Website ab, nicht nur `/about/`: Haupt-UI, Datumssuche, Tag der Ausführung, Vergleich, Jahresansicht, Rückwärtssuche, Fehler und Zustände, Benutzerhandbuch, Footer, Metadaten, Manifest sowie ARIA-/Barrierefreiheitstexte.

## Korrekturen

- Vier fehlende Contract-Keys wurden ergänzt.
- Die vollständige aktuelle Bedeutung wurde in `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` und `guide.6.body` wiederhergestellt.
- Queried day/date wurde als `abgefragter Tag / abgefragtes Datum` vereinheitlicht.
- Verbleibende englische Mischungen in `/about/` wurden entfernt, darunter `Rejection Sampling`, gewöhnlicher `all-day`-Text, gemischte Seer-Terminologie sowie Deployment-/Endpoint-Formulierungen.

## Verifikation

- 258/258 message keys.
- Keine fehlenden oder zusätzlichen Contract-Keys.
- Alle `{placeholder}`-Mengen stimmen exakt mit dem englischen Vertrag überein.
- Keine verdächtigen semantischen Kürzungen.
- `/about/` enthält genau 29 stable IDs in derselben Reihenfolge wie der semantic master, ohne Duplikate.
- Die beiden Tabellen enthalten 19 bzw. 9 Zeilen.
- Kein unbeabsichtigter hebräischer Text.
- Der gezielte Scan auf englische technische Prosa ist sauber.
- Die exakten Überschneidungen mit Niederländisch und Schwedisch sind begrenzt und zeigen keinen breiten Fallback.
- Pflichtformeln, Hashes und Literale sind erhalten, darunter `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` und `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Offene Gates

Diese Datei **beweist nicht**, dass die gesamte Website in einer separaten LLM-Session geprüft wurde, deren Gespräch selbst vollständig auf Deutsch geführt wurde. Das obligatorische `linguistic QA`-Gate bleibt daher offen.

Echte Render-QA auf Desktop und 390 px Mobile, Accessibility, PWA/Offline und Language Switching sind ebenfalls noch offen.

## Status

Text, UI und Semantic Contract sind für das nächste Gate bereit. Der korrekte aktuelle Status ist **semantic QA**, nicht `linguistic QA`.
