# Ελληνικό QA — ενδιάμεση κατάσταση ολόκληρου του ιστότοπου

## Πεδίο

Ο έλεγχος καλύπτει το `el-GR` σε ολόκληρο τον ιστότοπο, όχι μόνο το `/about/`: κύριο UI, αναζήτηση ημερομηνίας, ημέρα πράξης, σύγκριση, προβολή έτους, αντίστροφη αναζήτηση, σφάλματα και καταστάσεις, οδηγό χρήσης, footer, metadata, manifest και κείμενα ARIA/προσβασιμότητας.

## Διορθώσεις

- Προστέθηκαν τα τέσσερα ελλείποντα contract keys.
- Αποκαταστάθηκε η πλήρης τρέχουσα σημασία στα `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body`.
- Το queried day/date ενοποιήθηκε ως `ζητούμενη ημέρα/ημερομηνία`.
- Αφαιρέθηκε η υπόλοιπη αγγλική τεχνική ανάμειξη στο `/about/`: rejection sampling/modulo bias, all-day, μικτό Seer block, deployment/endpoints, corpus, generic injectivity/invertibility κ.ά.

## Τελική επαλήθευση

- 258/258 message keys.
- Κανένα missing/extra key.
- Όλα τα `{placeholder}` sets ταιριάζουν ακριβώς με το αγγλικό contract.
- Δεν υπάρχουν ύποπτες semantic truncations.
- `/about/` έχει ακριβώς 29 stable IDs στην ίδια σειρά με το semantic master, χωρίς duplicates.
- Οι δύο πίνακες έχουν 19 και 9 γραμμές.
- Δεν υπάρχει ακούσιο εβραϊκό κείμενο.
- Το στοχευμένο English technical prose scan είναι καθαρό.
- Η ευρεία Latin-residue σάρωση αφήνει μόνο το όνομα προϊόντος `Pastafarian Calendar Seer`.
- Οι υποχρεωτικοί τύποι, hashes και literals έχουν διατηρηθεί, μεταξύ άλλων `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` και `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Ανοιχτές πύλες

Αυτό το αρχείο **δεν αποδεικνύει** ότι ολόκληρος ο ιστότοπος ελέγχθηκε σε ξεχωριστό LLM session του οποίου η ίδια η συνομιλία διεξήχθη εξ ολοκλήρου στα ελληνικά. Επομένως η υποχρεωτική πύλη `linguistic QA` παραμένει ανοιχτή.

Επίσης εκκρεμούν πραγματικό render QA σε desktop και 390 px mobile, accessibility, PWA/offline και language switching.

## Κατάσταση

Το κείμενο, το UI και το semantic contract είναι έτοιμα για την επόμενη πύλη. Η σωστή τρέχουσα κατάσταση είναι **semantic QA**, όχι `linguistic QA`.
