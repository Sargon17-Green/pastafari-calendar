# 한국어 QA — 사이트 전체 중간 상태

## 검토 범위

이 검토는 `ko-KR`의 `/about/`뿐 아니라 사이트 전체를 대상으로 한다. 메인 UI, 날짜 검색, 작업일, 비교 보기, 연도 보기, 역검색, 오류와 상태 메시지, 사용자 안내, footer, metadata, manifest, ARIA/접근성 텍스트를 포함한다.

`/about/`도 전체를 읽어 불필요한 영어 잔여물, 번역투, 용어 불일치, 문법·표기 문제와 함께 stable ID, 수식, hash, 코드 literal 같은 기술 요소가 바뀌지 않았는지 확인했다.

## 발견한 문제

한국어 locale은 영어 message contract에 비해 다음 네 key가 없었다.

- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

또한 `manifest.defaultDescription`이 영어 그대로였다.

단순 key 수로는 보이지 않는 의미 누락도 있었다.

- `search.intro`에는 현재 파스타파리 날짜가 기본 입력값이라는 설명이 없었다.
- `settings.intro`에는 활성 관측 위치에서 정한 현재 파스타파리 날짜를 기본 작업일로 쓴다는 설명이 없었다.
- `guide.1.body`에는 링크를 열 때 현재 파스타파리 날짜를 자동 결정한다는 내용, `ASTRONOMICAL-DAY.md`에 정의된 금성 기반 하루 경계, 계산 서버로 날짜를 보내지 않는다는 설명이 빠져 있었다.
- `guide.4.body`에는 “오늘로 돌아가기”가 검색과 작업일을 둘 다 현재 파스타파리 날짜로 되돌린다는 설명이 없었다.
- `guide.5.body`에는 선택한 작업일이 현재 날짜로 되돌릴 때까지 이후 검색에서도 유지된다는 설명이 없었다.

## placeholder의 의미 배치 오류

placeholder 집합 자체는 영어와 같았지만 문장 안에서 의미가 뒤바뀐 경우가 있었다.

- `year.targetPosition`에서 `{day}`와 `{length}`의 의미가 반대로 배치되어 있었다.
- `date.aria`, `date.cutletLine`, `date.monthLine`에서 커틀릿/월 이름과 그 안의 날짜 번호가 반대로 쓰였다.

이 오류들은 모두 수정했다.

## 용어 정리

UI에서 `파스타파리안`, `파스타파리`, `대상 날짜`, `조회일`, `목표일`이 섞여 있었다. 일반적인 사이트 용어는 `파스타파리`와 `조회일`로 통일했다.

## `/about/` 언어 정리

기사 본문에는 `rejection sampling`, `modulo bias`, `engine commit`, 일반 문장 속 `all-day`, Seer 설명의 `native`/`container`/`hosted production`, 그리고 `generic injectivity` 같은 불필요한 영어 기술 표현이 남아 있었다.

이 표현들은 자연스러운 한국어로 바꾸되 실제 API identifier, 코드 literal, `Short Choice`, `Wide Choice`, `Pastafarian Calendar Seer`, API/HTTP/OpenAPI/CLI/SIMD/SLA, `cold wake`처럼 이름 또는 기술 literal로 유지해야 하는 것은 그대로 두었다.

주요 수정 commit:

- `a7878e3783389a3b950c1084fc3ea4f8d58bd882`
- `0c3d5b08cf5fce7b36527034f6634d3fbaeb82c0`

## 수정 후 확인

- 영어 message contract는 258 key이고 한국어 locale에도 258 key가 모두 있다.
- 누락 또는 추가 message key가 없다.
- 모든 `{placeholder}` 집합이 영어 contract와 정확히 일치한다.
- 긴 문자열 길이 비교에서 의미 누락을 의심할 만한 항목이 남지 않았다.
- `파스타파리안`, `대상 날짜`, `목표일` 같은 이전 용어가 관련 UI에 남아 있지 않다.
- `/about/`에는 semantic master와 같은 순서의 stable ID 29개가 있으며 중복은 없다.
- 두 의미 표의 행 수는 19개와 9개다.
- 의도하지 않은 히브리어 본문이 없다.
- 일반 영어 기술 프레이즈를 대상으로 한 마지막 검색은 깨끗하다.
- `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, `8e155fa4198ea7bcfeb16138ac5d6662706f4d93` 등 필수 수식·hash·literal은 그대로다.

## 아직 열려 있는 gate

이 문서는 “한국어로만 진행되는 별도의 LLM 대화/세션이 사이트 전체를 검토했다”는 최종 요구사항의 증거가 **아니다**. 현재 대화는 그런 별도 한국어 세션이 아니므로 linguistic QA gate는 아직 열려 있다.

또한 desktop 및 390 px mobile 실제 render QA, accessibility, PWA/offline, language switching도 아직 완료되지 않았다.

## 상태

텍스트, UI, 의미 contract는 다음 gate로 갈 준비가 되었다. 따라서 현재 상태는 **semantic QA**이며, 별도 한국어 LLM 세션이 끝나기 전에는 `linguistic QA`로 올리지 않는다. `rendered`와 `PASS`도 해당 실제 검사가 끝난 뒤에만 부여한다.
