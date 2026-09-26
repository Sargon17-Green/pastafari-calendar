# नेपाली QA — सम्पूर्ण साइटको अन्तरिम अवस्था

## दायरा

यो समीक्षा `ne-NP` locale का लागि सम्पूर्ण साइटमा गरिएको हो, केवल `/about/` मा होइन: मुख्य UI, मिति खोज, कार्य-दिन, तुलना, वर्ष-दृश्य, उल्टो खोज, त्रुटि र स्थिति सन्देश, प्रयोगकर्ता मार्गदर्शिका, footer, metadata, manifest र ARIA/पहुँचयोग्यता पाठ।

`/about/` पनि पूर्ण रूपमा पढेर अनावश्यक अंग्रेजी वा हिन्दी चुहावट, अनुवाद-जस्तो गद्य, असंगत शब्दावली र प्रामाणिक प्राविधिक तत्त्वमा अनपेक्षित परिवर्तन खोजियो।

## UI contract

नेपाली locale मा अंग्रेजी contract का सबै 258 message key पहिल्यै थिए। कुनै key हराएको वा थपिएको थिएन, र सबै `{placeholder}` सेट मिल्थे।

विशेष रूपमा `year.targetPosition`, `date.aria`, `date.cutletLine` र `date.monthLine` पनि अर्थगत रूपमा जाँचिए: `{day}`/`{length}` र कटलेट/महिनाको नाम बनाम दिन सङ्ख्याको क्रम सही छ।

हिन्दी locale सँग 42 ठ्याक्कै मिल्ने मान छन्। ती मुख्यतः देवनागरीमा समान देखिने अन्तर्राष्ट्रिय नाम, पात्रो/युग नाम, छोटा प्राविधिक पद वा दुवै भाषामा वैध रूपमा उस्तै हुने रूप हुन्। व्यापक हिन्दी fallback को प्रमाण भेटिएन।

## `/about/` भाषा सफाइ

लेखमा धेरै अंग्रेजी प्राविधिक टुक्रा मिसिएका थिए: `canonical`, `specification`, `implementation`, `selection space`, `rejection sampling`, `engine commit`, `all-day`, Seer खण्डको मिश्रित अंग्रेजी, `reverse conversion`, `affine periodicity`, `generic injectivity`, `side information`, `finite exact arithmetic check` आदि।

यी अंशहरू नेपालीमा रूपान्तरण गरिए। API identifier, code literal, `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, API/HTTP/OpenAPI/CLI/SIMD/SLA र `cold wake` जस्ता वास्तविक नाम वा contract literal भने जोगाइए।

एक सफाइ चरण अत्यधिक व्यापक भएर HTML tag/attribute र stable ID समेत छोएको पाइयो। त्यसपछि:
- सबै बिग्रिएका HTML token पुनःस्थापित गरिए;
- 29 stable ID semantic master सँग ठीक उही क्रम र हिज्जेमा फिर्ता ल्याइए;
- `tabindex`, `aria-label`, `math-block`, `blockquote` आदि संरचनात्मक contract पुनःस्थापित गरिए;
- त्यसपछि पुनः पूर्ण structural validation चलाइयो।

सम्बन्धित मुख्य commits:
- `02c3587bbb76edd6c496ebecb4b6ac31b131caa7`
- `93568ffe71e8ffa682f14a16f5e4cb5297a6a869`
- `9592dcd62406a4828a8850b888897e7b395d00c4`

## अन्तिम verification

- 258/258 message keys.
- कुनै missing/extra message key छैन.
- सबै `{placeholder}` सेट अंग्रेजी contract सँग ठ्याक्कै मिल्छन्.
- लामो सन्देशमा शंकास्पद semantic truncation छैन.
- `/about/` मा ठ्याक्कै 29 stable ID छन्, semantic master कै क्रममा, duplicate छैन.
- दुई semantic table मा 19 र 9 पङ्क्ति छन्.
- अनपेक्षित हिब्रू पाठ छैन.
- लक्षित सामान्य अंग्रेजी प्राविधिक गद्य scan सफा छ.
- malformed HTML tag/attribute को candidate छैन.
- अनिवार्य formula/hash/literal सुरक्षित छन्: `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## अझै खुला gate

यो फाइलले **प्रमाणित गर्दैन** कि सम्पूर्ण साइट छुट्टै LLM सत्रमा समीक्षा गरिएको थियो र त्यो सत्रको संवाद आफैँ पूर्ण रूपमा नेपालीमा चलेको थियो। त्यसैले अनिवार्य `linguistic QA` gate अझै खुला छ।

त्यसैगरी वास्तविक desktop र 390 px mobile render QA, accessibility, PWA/offline र language switching पनि पूरा भएका छैनन्।

## स्थिति

पाठ, UI र semantic contract अर्को gate का लागि तयार छन्। अहिलेको सही स्थिति **semantic QA** हो, `linguistic QA` होइन।
