# QA Soomaali — xaaladda ku-meel-gaarka ah ee goobta oo dhan

## Baaxadda

Dib-u-eegistu waxay daboolaysaa `so-SO` dhammaan bogga, ma aha oo keliya `/about/`: UI-ga ugu weyn, raadinta taariikhda, maalinta hawsha, isbarbardhigga, muuqaalka sannadka, raadinta gadaal, khaladaadka iyo xaaladaha, hagaha isticmaalaha, footer, metadata, manifest iyo qoraallada ARIA/helitaanka.

## Waxyaabihii la saxay

Afar message key ayaa maqnaa:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` wuxuu ahaa Ingiriisi.

Macnaha ka maqnaa `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` iyo `guide.6.body` waa la soo celiyey: maalinta Pastafari ee hadda jirta oo ah gelinta caadiga ah, goobta firfircoon ee kormeeraha, xadka maalinta ee ku salaysan Venus ee `ASTRONOMICAL-DAY.md`, dib-u-dejinta raadinta iyo maalinta hawsha iyo sii-isticmaalka maalin hawleed gacanta lagu doortay.

Queried day waxaa loo mideeyey `maalinta la weydiinayo`, queried date-na `taariikhda la weydiinayo`.

## `/about/`

Waxaa la nadiifiyey isku-darka Ingiriisiga ee farsamo: `canonical`, `rejection sampling`, `modulo bias`, `deterministic`, `all-day`, qaybta Seer, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility` iyo erayo kale.

API identifiers-ka dhabta ah iyo code literals-ka sida `date`, `range`, `batch`, `year`, `reverse`, `metadata`, `locales`, `status`, `cold wake`, `Short Choice`, `Wide Choice` iyo `Pastafarian Calendar Seer` waa la ilaaliyey halka ay yihiin magacyo ama contract literals.

Commits muhiim ah:
- `737b3f44fd635ea83937743ad791407db88449d7`
- `e185818f7c5f8d5c46f0536a7f6d182525992059`

## Hubinta ugu dambaysa

- 258/258 message keys.
- Ma jiro key maqan ama dheeraad ah.
- Dhammaan `{placeholder}` sets waxay si sax ah ula mid yihiin contract-ka Ingiriisiga.
- Ma jiraan semantic truncations shaki leh.
- Isku ekaanshaha Arabic iyo Swahili waa kooban yahay oo inta badan magacyo/qaabab wadaag ah; ma jiro fallback ballaaran.
- `/about/` wuxuu leeyahay sax ahaan 29 stable ID isla kala-horreynta semantic master-ka, duplicate ma leh.
- Labada semantic table waxay leeyihiin 19 iyo 9 saf.
- Ma jiro qoraal Cibraani ah oo aan ula kac ahayn.
- Scan-ka la beegsaday ee English technical prose waa nadiif.
- Formula, hash iyo literals-ka waajibka ah waa badbaadsan yihiin, oo ay ku jiraan `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` iyo `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Gates weli furan

Faylkani **ma caddaynayo** in bogga oo dhan lagu eegay kulan LLM gooni ah oo wada hadalkiisu gebi ahaanba Soomaali ahaa. Sidaas darteed `linguistic QA` weli waa furan yahay.

Sidoo kale wali lama dhammaystirin render QA dhab ah oo desktop iyo 390 px mobile ah, accessibility, PWA/offline iyo language switching.

## Xaalad

Qoraalka, UI-ga iyo semantic contract-ku waxay diyaar u yihiin gate-ka xiga. Xaaladda saxda ah hadda waa **semantic QA**, ma aha `linguistic QA`.
