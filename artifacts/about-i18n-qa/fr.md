# QA français — état intermédiaire du site entier

## Portée

Cette vérification couvre `fr-FR` sur l’ensemble du site, et pas seulement `/about/` : interface principale, recherche de date, jour de travail, comparaison, vue annuelle, recherche inverse, erreurs et états, guide utilisateur, footer, metadata, manifest et textes ARIA/accessibilité.

## Corrections

- Ajout des quatre clés manquantes du contrat : `app.brand`, `reverse.error.limitPositive`, `reverse.error.limitSafeInteger`, `reverse.error.absoluteDateField`.
- Restauration de la sémantique complète dans `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` et `guide.6.body`.
- Harmonisation de queried day/date vers `jour interrogé` / `date interrogée`.
- Nettoyage des derniers résidus anglais ordinaires dans `/about/`, notamment `all-day` et la prose de l’API Seer.

## Vérification

- 258/258 message keys.
- Aucune clé manquante.
- Tous les ensembles `{placeholder}` correspondent exactement au contrat anglais.
- `/about/` conserve exactement 29 stable IDs dans le même ordre que le semantic master.
- Les deux tableaux ont 19 et 9 lignes.
- Le scan ciblé de prose anglaise résiduelle est propre.
- Les formules, hashes et littéraux obligatoires sont intacts, notamment `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` et `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Étapes encore ouvertes

Ce fichier **ne prouve pas** que le site entier a été relu dans une session LLM distincte dont la conversation elle-même s’est déroulée intégralement en français. Le gate obligatoire `linguistic QA` reste donc ouvert.

Restent également le render QA réel sur desktop et mobile 390 px, l’accessibilité, PWA/offline et le changement de langue.

## Statut

Le texte, l’interface et le contrat sémantique sont prêts pour l’étape suivante. Le statut correct est désormais **semantic QA**, pas `linguistic QA`.
