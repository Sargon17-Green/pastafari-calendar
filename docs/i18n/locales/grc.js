"use strict";

import base from "./el.js?v=10-i18n-90";

export default Object.freeze({
  code: "grc",
  displayName: "Ἑλληνικὴ ἀρχαία (experimental)",
  dir: "ltr",
  intlLocale: "grc",
  experimental: true,
  fallbackLocale: "el",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "Πασταφαριανὸν ἡμερολόγιον",
    "language.label": "Γλῶσσα",
    "field.year": "Ἔτος",
    "field.month": "Μήν",
    "field.day": "Ἡμέρα",
    "calendarHelp.hebrew": "Οἱ μῆνες κατ’ ὄνομα αἱροῦνται. Τὸ ἔτος καὶ ἡ ἡμέρα δέχονται ἀριθμοὺς δεκαδικοὺς ἢ Ἑβραϊκὰ γράμματα ἀριθμητικά, οἷον תשפ״ו ἢ י״ד· ἔτος γράμμασι γεγραμμένον ἄνευ σημείου χιλιάδων μετὰ προσθήκης 5.000 ἑρμηνεύεται.",
    "calendarHelp.hindu": "Τὸ ἔτος καὶ τὴν ἡμέραν κατὰ τὴν παλαιὰν Ἰνδικὴν ἀρίθμησιν εἴσαγε, τὸν δὲ μῆνα κατ’ ὄνομα αἱροῦ. Ἡ σεληνιακὴ μορφὴ καὶ ἐμβόλιμον μῆνα σημᾶναι δύναται.",
    "calendarHelp.japanese": "Τὸ ἔτος 1 ἀπὸ τῆς πρώτης ἡμέρας τῆς ἐποχῆς ἄρχεται· τὸ πρῶτον ἔτος καὶ 元 ἢ 元年 γράφειν ἔξεστιν. Ἡμερομηνία πρὸ τῆς ἀρχῆς ἢ μετὰ τὸ τέλος ἀποδοκιμάζεται.",
    "calendarHelp.bahai": "Τὸν μῆνα κατ’ ὄνομα ἢ Ayyám-i-Há αἱροῦ. Ἡ μορφὴ τῆς ἐν Τεχεράνῃ ἰσημερίας τὸ συμβατικὸν Γρηγοριανὸν διάστημα 1844–3000 ὑποστηρίζει.",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
