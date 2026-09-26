# తెలుగు QA — మొత్తం సైట్ మధ్యంతర స్థితి

## పరిధి

ఈ సమీక్ష `te-IN` కోసం మొత్తం సైట్‌ను కవర్ చేస్తుంది; `/about/` మాత్రమే కాదు: ప్రధాన UI, తేదీ శోధన, చర్య దినం, పోలిక, సంవత్సరం వీక్షణ, విలోమ శోధన, లోపాలు మరియు స్థితులు, వినియోగదారు మార్గదర్శిని, footer, metadata, manifest మరియు ARIA/ప్రాప్యత పాఠాలు.

## సరిచేసిన అంశాలు

నాలుగు message keys లేవు:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` ఆంగ్లంలో ఉంది.

`search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body` లో కోల్పోయిన అర్థం తిరిగి చేర్చబడింది: ప్రస్తుత Pastafari రోజు సాధారణ ఇన్‌పుట్‌గా ఉండటం, క్రియాశీల పరిశీలకుడి స్థానం, `ASTRONOMICAL-DAY.md` లోని శుక్రుడి ఆధారిత రోజు సరిహద్దు, శోధన మరియు చర్య దినం రెండింటినీ రీసెట్ చేయడం, చేతితో ఎంచుకున్న చర్య దినాన్ని తరువాతి శోధనల్లో కొనసాగించడం.

Queried day ను `ప్రశ్నించిన రోజు`, queried date ను `ప్రశ్నించిన తేదీ`గా ఏకరీకరించాం. Reverse-search లో `కార్యదినం` కూడా `చర్య దినం`గా ఏకరీకరించబడింది.

## placeholder అర్థ దోషాలు

Placeholder setలు సాంకేతికంగా సరిపోయినా అర్థం తారుమారై ఉంది:
- `year.targetPosition` లో `{day}` మరియు `{length}`;
- `date.aria`, `date.cutletLine`, `date.monthLine` లో కట్లెట్/నెల పేరు మరియు రోజు సంఖ్య.

ఇవి అన్నీ సరిచేయబడ్డాయి.

## `/about/`

వ్యాసంలో విస్తృతంగా ఉన్న ఆంగ్ల సాంకేతిక మిశ్రమం తొలగించబడింది: `canonical`, `specification`, `implementation`, `rejection sampling`, `modulo bias`, `engine commit`, `all-day`, Seer విభాగం, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility`, `side information`, `finite exact arithmetic check` మొదలైనవి.

మొదటి శుభ్రపరిచిన తర్వాత విస్తృత Latin-residue scan నడిపాం; tables, Atlas, `median/minimum/maximum`, chronological anchors, editorial story మరియు summary లోని రెండో స్థాయి మిగులు కూడా సరిచేయబడ్డాయి.

నిజమైన API identifiers, code literals మరియు `Pastafarian Calendar Seer` ఉత్పత్తి పేరు యథాతథంగా ఉంచబడ్డాయి.

ప్రధాన commits:
- `431b69a493871a3b24104775df56ff5201ec5a0b`
- `7ccac820419ca13437401b8efd0e7f44a5c38dc4`
- `ea5999f67b004ffed6e9122adcf00118057a0ecb`

## తుది ధృవీకరణ

- 258/258 message keys.
- Missing/extra keys లేవు.
- అన్ని `{placeholder}` సమితులు English contract కు ఖచ్చితంగా సరిపోతాయి.
- అనుమానాస్పద semantic truncation లేదు.
- Tamil తో 5, Hindi తో 4 దీర్ఘ exact matches మాత్రమే ఉన్నాయి; విస్తృత fallback లేదు.
- `/about/` లో semantic master మాదిరిగానే 29 stable IDలు, అదే క్రమంలో, duplicate లేకుండా ఉన్నాయి.
- రెండు semantic tables లో 19 మరియు 9 వరుసలు ఉన్నాయి.
- అనుకోని హీబ్రూ పాఠం లేదు.
- లక్ష్యిత English technical prose scan శుభ్రంగా ఉంది.
- విస్తృత Latin-residue scan లో `Pastafarian Calendar Seer` పేరు మాత్రమే మిగిలింది.
- తప్పనిసరి formula/hash/literal అన్నీ సురక్షితంగా ఉన్నాయి: `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## ఇంకా తెరిచి ఉన్న gates

ఈ ఫైల్ మొత్తం సైట్‌ను వేరే LLM session లో, ఆ సంభాషణ పూర్తిగా తెలుగులోనే జరిగిన పరిస్థితిలో సమీక్షించారని **నిరూపించదు**. అందువల్ల తప్పనిసరి `linguistic QA` gate ఇంకా తెరిచే ఉంది.

Desktop మరియు 390 px mobile నిజమైన render QA, accessibility, PWA/offline మరియు language switching కూడా ఇంకా పూర్తి కాలేదు.

## స్థితి

పాఠం, UI మరియు semantic contract తదుపరి gate కు సిద్ధంగా ఉన్నాయి. ప్రస్తుత సరైన స్థితి **semantic QA**, `linguistic QA` కాదు.
