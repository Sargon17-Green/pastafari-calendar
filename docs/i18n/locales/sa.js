"use strict";

import base from "./hi.js?v=10-i18n-90";

export default Object.freeze({
  code: "sa",
  displayName: "संस्कृतम् (experimental)",
  dir: "ltr",
  intlLocale: "sa",
  experimental: true,
  fallbackLocale: "hi",
  messages: Object.freeze({
    ...base.messages,
    "app.title": "पास्टाफ़ारी-पञ्चाङ्गम्",
    "language.label": "भाषा",
    "field.year": "वर्षम्",
    "field.month": "मासः",
    "field.day": "दिनम्",
    "calendarHelp.hebrew": "मासाः नाम्ना चयन्यन्ते। वर्षं दिनं च दशमलवाङ्कैः अथवा हिब्रू-संख्याक्षरैः, यथा תשפ״ו अथवा י״ד, लिखितुं शक्यते; सहस्रचिह्नं विना अक्षरैः लिखितं वर्षं 5,000 योजयित्वा व्याख्यायते।",
    "calendarHelp.hindu": "प्राचीनहिन्दुगणनानुसारं वर्षं दिनं च प्रविश्य मासं नाम्ना चिनुत। चान्द्ररूपे अधिकमासोऽपि चिह्नितुं शक्यते।",
    "calendarHelp.japanese": "वर्षम् 1 युगस्य प्रथमदिने आरभते; प्रथमवर्षार्थं 元 अथवा 元年 अपि प्रविष्टुं शक्यते। युगारम्भात् पूर्वं वा समाप्तेः परं वा तिथिः न स्वीक्रियते।",
    "calendarHelp.bahai": "मासं नाम्ना अथवा Ayyám-i-Há चिनुत। तेहरान-विषुवरूपं प्रचलितं ग्रेगोरियन 1844–3000 परिमाणं समर्थयति।",
  }),
  calendar: base.calendar,
  terminology: base.terminology,
});
