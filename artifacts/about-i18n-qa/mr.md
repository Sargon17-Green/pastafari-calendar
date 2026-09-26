# मराठी QA — संपूर्ण संकेतस्थळाची मधली स्थिती

## व्याप्ती

ही तपासणी `mr-IN` locale साठी संपूर्ण संकेतस्थळावर केली आहे, फक्त `/about/` वर नाही: मुख्य UI, तारीख शोध, कृतीचा दिवस, तुलना, वर्ष-दृश्य, उलटा शोध, त्रुटी व स्थिती संदेश, वापरकर्ता मार्गदर्शक, footer, metadata, manifest आणि ARIA/प्रवेशयोग्यता मजकूर.

`/about/` पूर्ण वाचून अनावश्यक इंग्रजी/हिंदी गळती, भाषांतरासारखी भाषा, विसंगत संज्ञा आणि प्रामाणिक तांत्रिक घटकांतील बदल शोधले.

## आढळलेले मुद्दे

इंग्रजी message contract मधील चार keys नव्हते:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` इंग्रजीत होता.

`search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` आणि `guide.6.body` मध्ये अर्थपूर्ण मजकूरही गहाळ होता: सध्याची Pastafari तारीख मूळ मूल्य असणे, सक्रिय निरीक्षक-स्थान, `ASTRONOMICAL-DAY.md` मधील शुक्राधारित दिवससीमा, “आजवर परत” चे रीसेट वर्तन आणि हाताने निवडलेल्या कृतीच्या दिवसाचे पुढील शोधांत टिकून राहणे.

## placeholder अर्थदोष

placeholder संच तांत्रिकदृष्ट्या जुळत असूनही अर्थ उलट ठेवलेला होता:
- `year.targetPosition` मध्ये `{day}` आणि `{length}`;
- `date.aria`, `date.cutletLine`, `date.monthLine` मध्ये कटलेट/महिन्याचे नाव व दिवस क्रमांक.

हे सर्व दुरुस्त केले.

## संज्ञा

`कार्यदिवस`, `कृतीचा दिवस`, `लक्ष्य दिवस` आणि `विचारलेला दिवस` यांचे मिश्रण होते. आता मुख्य संज्ञा:
- day of working — `कृतीचा दिवस`;
- queried day — `विचारलेला दिवस`.

## `/about/` भाषा स्वच्छता

लेखात मोठ्या प्रमाणात इंग्रजी तांत्रिक तुकडे होते: `canonical`, `selection space`, `rejection sampling`, `engine commit`, `all-day`, `physical moment`, Seer विभागातील इंग्रजी मिश्रण, `reverse conversion`, `generic injectivity`, `side information`, `finite exact arithmetic check` इत्यादी.

69 मोठ्या मजकूर-स्थळी पुनर्लेखन केले गेले; नंतर उरलेले `answer ring` आणि `computational sample` हे दोन तुकडेही काढले.

मुख्य commits:
- `72925f8a31e6446bee7de205787a3ecefb3ae73c`
- `d8518ecfdde53f36293337ab55508e7ed312cc49`
- `7259a8acc1b62f2c17635dd3eb1af7739dc1a566`

## अंतिम यांत्रिक/अर्थ तपासणी

- 258/258 message keys.
- अतिरिक्त किंवा गहाळ message key नाही.
- सर्व `{placeholder}` संच इंग्रजी contract शी जुळतात.
- `/about/` मध्ये semantic master प्रमाणे 29 stable ID त्याच क्रमाने आहेत; duplicate नाही.
- दोन तक्त्यांत 19 आणि 9 ओळी आहेत.
- सर्व आवश्यक सूत्रे/hash/literal जतन आहेत: `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.
- सामान्य इंग्रजी तांत्रिक गद्याचा लक्ष्यित scan स्वच्छ आहे.
- हिंदी locale शी उरलेली तंतोतंत जुळणी मुख्यतः proper names, आंतरराष्ट्रीय संज्ञा, स्वरूप किंवा दोन्ही भाषांत समान असणाऱ्या देवनागरी रूपांपुरती आहे; व्यापक हिंदी fallback दिसत नाही.

## अजून खुले gates

हा दस्तऐवज **पुरावा नाही** की स्वतंत्र LLM सत्राने संपूर्ण साइट तपासली आणि त्या सत्रातील संवाद स्वतः पूर्णपणे मराठीत झाला. तो अनिवार्य `linguistic QA` gate अद्याप खुला आहे.

तसेच desktop व 390 px mobile render QA, accessibility, PWA/offline आणि language switching पूर्ण झालेले नाहीत.

## स्थिती

मजकूर, UI आणि semantic contract पुढील gate साठी तयार आहेत. सद्य योग्य स्थिती **semantic QA** आहे, `linguistic QA` नाही.
