# QA Kiswahili — hali ya kati ya tovuti nzima

## Wigo

Ukaguzi huu unahusu `sw-TZ` katika tovuti nzima, si `/about/` pekee: UI kuu, utafutaji wa tarehe, siku ya utendaji, ulinganishaji, mwonekano wa mwaka, utafutaji wa kinyume, makosa na hali, mwongozo wa mtumiaji, footer, metadata, manifest na maandishi ya ARIA/ufikivu.

## Marekebisho

Message keys nne zilikuwa hazipo:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` ilikuwa kwa Kiingereza.

Maana iliyokosekana katika `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` na `guide.6.body` ilirejeshwa: siku ya sasa ya Pastafari kama thamani ya kawaida, eneo hai la mwangalizi, mpaka wa siku unaotegemea Zuhura kutoka `ASTRONOMICAL-DAY.md`, kuweka upya utafutaji na siku ya utendaji na kuendelea kutumia siku ya utendaji iliyochaguliwa kwa mkono.

Queried day imeunganishwa kama `siku iliyoulizwa`, queried date kama `tarehe iliyoulizwa`.

## `/about/`

Mabaki ya Kiingereza cha kiufundi yameondolewa:
- `rejection sampling` na `modulo bias`;
- `engine commit`;
- maandishi ya kawaida ya `all-day`;
- mchanganyiko wa Kiingereza katika sehemu ya Seer;
- `generic injectivity` na `generic invertibility`.

API identifiers halisi na code literals zimehifadhiwa ndani ya `code` inapofaa.

Commit kuu:
- `014ef2eaa54921300e180a5468b6f0f6f221eb16`
- `1eefe02ef7e64a6c9a258577ede7e820f5d9d323`

## Uthibitishaji

- 258/258 message keys.
- Hakuna key inayokosekana au ya ziada.
- Seti zote za `{placeholder}` zinafanana kikamilifu na mkataba wa Kiingereza.
- Hakuna semantic truncation yenye shaka.
- Ulinganifu wa moja kwa moja na Somali ni mdogo na unaendana na majina, fomati na maneno yanayoweza kufanana kihalali; hakuna ishara ya fallback pana.
- `/about/` ina stable ID 29 hasa, katika mpangilio uleule wa semantic master, bila duplicate.
- Jedwali mbili zina safu 19 na 9.
- Hakuna maandishi ya Kiebrania yasiyokusudiwa.
- Scan maalumu ya English technical prose ni safi.
- Formula, hash na literals za lazima zimehifadhiwa, ikiwemo `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` na `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Gates ambazo bado ziko wazi

Faili hii **haithibitishi** kwamba tovuti nzima ilipitiwa katika session tofauti ya LLM ambayo mazungumzo yake yalifanyika kikamilifu kwa Kiswahili. Kwa hiyo gate ya lazima ya `linguistic QA` bado iko wazi.

Pia render QA halisi ya desktop na 390 px mobile, accessibility, PWA/offline na language switching bado hazijakamilika.

## Hali

Maandishi, UI na semantic contract ziko tayari kwa gate inayofuata. Hali sahihi sasa ni **semantic QA**, si `linguistic QA`.
