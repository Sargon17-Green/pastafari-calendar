# हिंदी QA — पूरे साइट की मध्यवर्ती स्थिति

## दायरा

यह समीक्षा `hi-IN` के लिए पूरे साइट को कवर करती है, केवल `/about/` को नहीं: मुख्य UI, तारीख़ खोज, कार्य-दिन, तुलना, वर्ष दृश्य, उलटी खोज, त्रुटियाँ और अवस्थाएँ, उपयोगकर्ता मार्गदर्शिका, footer, metadata, manifest और ARIA/accessibility पाठ।

## सुधार

- चार गायब contract keys जोड़ी गईं।
- `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body` की पूरी वर्तमान semantics पुनर्स्थापित की गई।
- `year.targetPosition`, `date.aria`, `date.cutletLine`, `date.monthLine` में placeholder अर्थ उलटने की त्रुटियाँ ठीक की गईं।
- queried day/date को `पूछा गया दिन` / `पूछी गई तारीख़` पर एकरूप किया गया।
- `/about/` में व्यापक English technical mixture हटाई गई; HTML, stable IDs और `code` literals को नहीं बदला गया।
- दूसरी Latin-residue जाँच के बाद शेष मिश्रित शब्द और एक दोहराव भी साफ़ किए गए।

## अंतिम सत्यापन

- 258/258 message keys.
- कोई missing key नहीं।
- सभी `{placeholder}` सेट English contract से ठीक मेल खाते हैं।
- `/about/` में semantic master के समान क्रम में ठीक 29 stable IDs हैं, duplicate नहीं।
- दोनों semantic tables में 19 और 9 पंक्तियाँ हैं।
- Latin-residue scan में केवल product name `Pastafarian Calendar Seer` बचा है।
- अनिवार्य formulas/hashes/literals सुरक्षित हैं: `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`।

## अभी खुले gates

यह फ़ाइल यह **सिद्ध नहीं करती** कि पूरा साइट अलग LLM session में समीक्षा किया गया जिसकी बातचीत स्वयं पूरी तरह हिंदी में चली। इसलिए अनिवार्य `linguistic QA` gate अभी खुला है।

वास्तविक desktop और 390 px mobile render QA, accessibility, PWA/offline और language switching भी शेष हैं।

## स्थिति

पाठ, UI और semantic contract अगले gate के लिए तैयार हैं। सही वर्तमान स्थिति **semantic QA** है, `linguistic QA` नहीं।
