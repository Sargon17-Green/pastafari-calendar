# தமிழ் QA — முழு தளத்தின் இடைக்கால நிலை

## பரப்பு

இந்த ஆய்வு `ta-IN` மொழிக்கான முழு தளத்தையும் உள்ளடக்குகிறது; `/about/` மட்டும் அல்ல: முக்கிய UI, தேதி தேடல், செயல் நாள், ஒப்பீடு, ஆண்டு காட்சி, தலைகீழ் தேடல், பிழைகள் மற்றும் நிலைகள், பயனர் வழிகாட்டி, footer, metadata, manifest மற்றும் ARIA/அணுகல்தன்மை உரைகள்.

## திருத்தங்கள்

நான்கு message keys இல்லை:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` ஆங்கிலத்தில் இருந்தது.

`search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body` ஆகியவற்றில் இழந்த பொருள் மீட்டெடுக்கப்பட்டது: தற்போதைய Pastafari நாள் இயல்புநிலை உள்ளீடாக இருப்பது, செயலில் உள்ள பார்வையாளர் இருப்பிடம், `ASTRONOMICAL-DAY.md` விவரிக்கும் வெள்ளி அடிப்படையிலான நாள் எல்லை, தேடலும் செயல் நாளும் மீட்டமைக்கப்படுவது, கையால் தேர்ந்தெடுக்கப்பட்ட செயல் நாள் அடுத்த தேடல்களிலும் தொடர்வது.

Queried day என்பது `கேட்கப்பட்ட நாள்`, queried date என்பது `கேட்கப்பட்ட தேதி` என ஒருமைப்படுத்தப்பட்டது.

## placeholder பொருள் பிழைகள்

Placeholder தொகுப்புகள் தொழில்நுட்ப ரீதியாக சரியாக இருந்தாலும் பொருள் மாற்றப்பட்டிருந்தது:
- `year.targetPosition` இல் `{day}` மற்றும் `{length}`;
- `date.aria`, `date.cutletLine`, `date.monthLine` இல் கட்லெட்/மாதப் பெயர் மற்றும் நாள் எண்.

இவை அனைத்தும் சரிசெய்யப்பட்டன.

## `/about/`

கட்டுரையில் பரவலாக இருந்த ஆங்கில தொழில்நுட்ப கலப்பு நீக்கப்பட்டது: `canonical`, `specification`, `implementation`, `rejection sampling`, `modulo bias`, `engine commit`, `all-day`, Seer பகுதி, `reverse conversion`, `affine periodicity`, `generic injectivity`, `generic invertibility`, `side information`, `finite exact arithmetic check` மற்றும் பல.

முதல் சுத்தப்படுத்தலுக்குப் பின் முழு Latin-residue scan செய்யப்பட்டது; அதில் அட்டவணைகள், atlas பகுதி, கால அச்சுகள், `median/minimum/maximum`, `reference day`, `anchor`, `editorial story` போன்ற இரண்டாம் அடுக்கு மீதிகளும் கண்டறிந்து சரிசெய்யப்பட்டன. ஒரு பகுதி மாற்றத்தால் உருவான `தயாரிப்புion` என்ற சேதமும் கண்டறிந்து திருத்தப்பட்டது.

உண்மையான API identifiers, code literals மற்றும் தயாரிப்பு பெயர் `Pastafarian Calendar Seer` பாதுகாக்கப்பட்டன.

முக்கிய commits:
- `bd968c1734eeef62e1e1fcb48da39698ab0df102`
- `a8ac1eb6dcb36b004a1270f468380e7ad717c068`
- `b03b777d44e0effca870e2fa46f23240dbc93d95`

## இறுதி சரிபார்ப்பு

- 258/258 message keys.
- Missing/extra key இல்லை.
- எல்லா `{placeholder}` தொகுப்புகளும் ஆங்கில contract-உடன் துல்லியமாகப் பொருந்துகின்றன.
- சந்தேகமான semantic truncation இல்லை.
- Telugu மற்றும் Hindi locale-களுடன் நீளமான exact matches தலா 4 மட்டுமே; பரவலான fallback இல்லை.
- `/about/` இல் semantic master போலவே 29 stable ID, அதே வரிசையில், duplicate இல்லாமல் உள்ளன.
- இரண்டு semantic table-களில் 19 மற்றும் 9 வரிசைகள் உள்ளன.
- தவறுதலான ஹீப்ரு உரை இல்லை.
- இலக்குவைத்த English technical prose scan சுத்தமாக உள்ளது.
- விரிவான Latin-residue scan-இல் பெயரான `Pastafarian Calendar Seer` மட்டுமே மீதம்.
- கட்டாய formula/hash/literal அனைத்தும் பாதுகாப்பாக உள்ளன: `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## இன்னும் திறந்த gates

இந்தக் கோப்பு முழு தளமும் தனி LLM session-இல், அந்த உரையாடல் முழுவதும் தமிழிலேயே நடந்த நிலையில் ஆய்வு செய்யப்பட்டதைக் **நிரூபிக்காது**. ஆகவே கட்டாய `linguistic QA` gate இன்னும் திறந்தே உள்ளது.

Desktop மற்றும் 390 px mobile உண்மையான render QA, accessibility, PWA/offline மற்றும் language switching ஆகியவையும் இன்னும் நிறைவுபெறவில்லை.

## நிலை

உரை, UI மற்றும் semantic contract அடுத்த gate-க்கு தயாராக உள்ளன. தற்போதைய சரியான நிலை **semantic QA**, `linguistic QA` அல்ல.
