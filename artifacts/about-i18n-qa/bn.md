# বাংলা QA — পুরো সাইটের অন্তর্বর্তী অবস্থা

## পরিধি

এই পর্যালোচনা `bn-BD`-এর পুরো সাইটকে অন্তর্ভুক্ত করে; শুধু `/about/` নয়: প্রধান UI, তারিখ অনুসন্ধান, কর্মদিবস, তুলনা, বছর-দৃশ্য, বিপরীত অনুসন্ধান, ত্রুটি ও অবস্থা, ব্যবহারকারী নির্দেশিকা, footer, metadata, manifest এবং ARIA/অ্যাক্সেসিবিলিটি লেখা।

## সংশোধন

- চারটি অনুপস্থিত contract key যোগ করা হয়েছে।
- `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body`-এ বর্তমান অর্থ পুনঃস্থাপন করা হয়েছে।
- queried day-কে `জিজ্ঞাসিত দিন` হিসেবে একীভূত করা হয়েছে।
- `year.targetPosition`-এ `{day}` ও `{length}`-এর অর্থগত অবস্থান সংশোধন করা হয়েছে।
- `date.aria`, `date.cutletLine`, `date.monthLine`-এ নাম ও দিন-সংখ্যার placeholder বিন্যাস সংশোধন করা হয়েছে।
- `/about/`-এর বিস্তৃত English scaffolding সরানো হয়েছে; canonical, specification, implementation, selection space, atlas metrics, Seer, reverse conversion, asymptotic/algebraic অংশ, anchor/time-zone ইত্যাদি স্বাভাবিক বাংলায় লেখা হয়েছে।
- দ্বিতীয় Latin-residue scan-এ ধরা `median`, `recurrence condition`, `day identity`, `reference day`, `field`, `anchor`, `time zone`, `lock` ইত্যাদিও পরিষ্কার করা হয়েছে।

## যাচাই

- 258/258 message keys.
- কোনো missing/extra contract key নেই।
- সব `{placeholder}` set ইংরেজি contract-এর সঙ্গে মিলে।
- Hindi/Urdu locale-র সঙ্গে exact match খুব কম; বিস্তৃত fallback-এর লক্ষণ নেই।
- `/about/`-এ semantic master-এর মতো ঠিক 29টি stable ID একই ক্রমে আছে, duplicate নেই।
- দুইটি semantic table-এ 19 ও 9টি row আছে।
- অনিচ্ছাকৃত Hebrew text নেই।
- সাধারণ English technical prose-এর targeted scan পরিষ্কার।
- পূর্ণ Latin-residue scan-এ শুধু পণ্যের নাম `Pastafarian Calendar Seer` থাকে।
- বাধ্যতামূলক formula/hash/literal অক্ষত আছে, যেমন `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`।

## এখনও খোলা gate

এই ফাইলটি **প্রমাণ করে না** যে পুরো সাইট এমন একটি আলাদা LLM session-এ পর্যালোচনা করা হয়েছে যার কথোপকথন নিজেই সম্পূর্ণ বাংলায় চলেছে। তাই বাধ্যতামূলক `linguistic QA` gate এখনও খোলা।

বাস্তব desktop ও 390 px mobile render QA, accessibility, PWA/offline এবং language switching-ও এখনও বাকি।

## অবস্থা

লেখা, UI এবং semantic contract পরবর্তী gate-এর জন্য প্রস্তুত। সঠিক বর্তমান অবস্থা **semantic QA**, `linguistic QA` নয়।
