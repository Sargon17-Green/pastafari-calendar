# 日本語 QA — サイト全体の中間状態

## 対象範囲

このレビューは `ja-JP` の `/about/` だけでなく、サイト全体を対象とする。確認範囲には、メイン画面、日付検索、作業日の設定、比較表示、年表示、逆引き検索、エラーと状態表示、利用ガイド、フッター、metadata、manifest、ARIA／アクセシビリティ用テキストを含む。

`/about/` は全文を読み、英語や他言語の不要な混入、直訳調の日本語、文法・語法・表記、用語の不統一、固定ID、式、hash、コードリテラル、正規の技術名の破損を確認した。

## 発見した問題

当初の日本語 locale には、英語の message contract に存在する次の4キーが欠けていた。

- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

また、`manifest.defaultDescription` は英語のままだった。

キー数だけでは検出できない意味上の欠落もあった。

- `search.intro` には現在のパスタファリ日が既定で入力されることが書かれていなかった。
- `settings.intro` には、有効な観測地点から決定した現在のパスタファリ日を既定の作業日として使うことが欠けていた。
- `guide.1.body` は、リンクを開いた時点で現在日を決定すること、`ASTRONOMICAL-DAY.md` に定義された金星の通過による日境界、計算サーバーへ日付を送らないこと、という重要な内容を失っていた。
- `guide.4.body` は文そのものが途中で切れており、「今日に戻る」が検索と作業日の両方を現在日に戻す説明も失われていた。
- `guide.5.body` には、選んだ作業日がリセットされるまで後続の検索でも使われることが書かれていなかった。

さらに、placeholder の集合自体は一致していたにもかかわらず、意味上の重大な配置ミスがあった。

- `year.targetPosition` では `{day}` と `{length}` の意味が逆になっていた。
- `date.aria`、`date.cutletLine`、`date.monthLine` では、カツレツ名／月名と日番号の placeholder が文中で逆に使われていた。

これらはすべて修正した。

## 用語と自然さ

逆引き検索では `作用日` と `作業日`、`パスタファリアン` と `パスタファリ`、`対象日` と `照会日` が混在していた。サイト全体で、通常の概念名は `作業日`、`パスタファリ`、`照会日` に統一した。

`/about/` には `modulo bias`、`engine commit`、中国語由来の `跨度`、通常文中の `all-day`、`hosted production`、`beta/evaluation`、`native`、`container`、`restart` など、不要な英語や不自然な混在が残っていた。また「逆変換は非常に強い」「絶対住所」「側情報」「算術検査によって閉じられた」「自己日付」「ジェネリック単射性／可逆性」など、日本語として不自然な技術表現も見直した。

実際のAPI endpoint名、`Short Choice`、`Wide Choice`、`Pastafarian Calendar Seer`、API/HTTP/OpenAPI/CLI/SIMD/SLA、`cold wake` など、名称・識別子・技術リテラルとして保持すべきものは保持している。

主な修正 commit は次のとおり。

- `53cce1d488f41d25f075457ee588dfb20859f45e`
- `3ef485e83e1717b373cff1b5d2874c4bad4de8fa`
- `467e7cb41bfd8df06297ae2f5bbb23a7a78c6274`

## 修正後の機械的・意味的確認

- 英語の message contract は258キーで、日本語 locale に258キーすべてが明示的に存在する。
- 欠落キー、余分な message key、`{placeholder}` 集合の不一致はない。
- 途中で切れたと疑われる message 文字列は残っていない。
- `/about/` は semantic master と同じ29個の stable ID を同じ順序で保持し、重複はない。
- 2つの意味上の表は19行と9行である。
- `Q=2^{127}-1`、`R=\\operatorname{SAVE}(S+149r)`、`47\\times123=5781`、`5781-5778=3`、`RRULE:FREQ=YEARLY`、`F(c+T,t+T)=F(c,t)`、`14{,}777{,}149`、`8e155fa4198ea7bcfeb16138ac5d6662706f4d93` などの必須リテラルは保持されている。
- 日本語記事に意図しないヘブライ語本文はない。
- `作用日`、`パスタファリアン`、`対象日`、`自己日付`、`跨度`、通常文中の `modulo bias`、`engine commit`、`hosted production` などを対象にした最終スキャンはクリーンである。
- 残る `all-day` は公開契約である stable ID `travel-and-all-day` の一部であり、翻訳してはならない。

## まだ満たしていないゲート

このファイルは、最終要件である「日本語だけで進行する別個の LLM 会話／セッションで、サイト全体をレビューした」ことの証明ではない。現在の会話はその独立した日本語セッションではないため、この要件を満たしたとは扱わない。

また、desktop と 390 px mobile の実レンダリング確認、アクセシビリティ、PWA／offline、言語切替などの最終ゲートも未完了である。

## 状態

本文・UI・意味契約の QA は次のゲートへ進める状態にある。したがって現時点の状態は **semantic QA** とし、別個の日本語 LLM セッションが完了するまでは `linguistic QA` に進めない。`rendered` と `PASS` も、それぞれの実検証が終わるまで付与しない。
