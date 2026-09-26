# 简体中文 QA —— 全站中间状态

## 范围

本检查覆盖 `zh-CN` 的整个网站，而不仅是 `/about/`：主界面、日期搜索、作业日、比较、年份视图、反向搜索、错误与状态、使用指南、footer、metadata、manifest 以及 ARIA/无障碍文本。

## 修复

补齐了四个缺失的 message key：
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

补回了 `search.intro`、`settings.intro`、`guide.1.body`、`guide.4.body`、`guide.5.body`、`guide.6.body` 中缺失的语义：当前 Pastafari 日作为默认输入、有效观察者位置、`ASTRONOMICAL-DAY.md` 所述的金星日边界、同时重置搜索与作业日，以及手动选择的作业日在后续搜索中继续使用。

Queried day 统一为“被查询日”，queried date 统一为“被查询日期”。

## 占位符语义错误

虽然 placeholder 集合本身完整，但以下文本把名称和日序的含义对调了：
- `date.aria`
- `date.cutletLine`
- `date.monthLine`

现已修正为肉排名/月名在名称位置，`{dayInCutlet}` / `{dayInMonth}` 在日序位置。

## `/about/`

清理了残留英文技术混用，包括 `engine commit`、普通 `all-day` 表述、Seer 段中的混合英文，以及 queried-day 语义中的“目标日”。

真实 API literal 和产品名在需要时保留为 code 或专名。

主要 commits：
- `7462538bbcdcc55d901df73cd59982831fbcf612`
- `e33db73a96f052036963389f55f6830233f79a55`

## 最终验证

- 258/258 message keys。
- 无缺失或多余 key。
- 所有 `{placeholder}` 集合与英文 contract 完全一致。
- 无可疑 semantic truncation。
- 与日文、韩文 locale 的精确长文本重合很少，没有广泛 fallback。
- `/about/` 恰有 29 个 stable ID，顺序与 semantic master 一致，无重复。
- 两张 semantic table 分别有 19 和 9 行。
- 所有必需 formula/hash/literal 均保留。
- 定向 English technical prose 扫描干净。
- 全量 Latin-residue 扫描只剩专名 `Pastafarian Calendar Seer`。

## 仍开放的 gates

本文件**不能证明**整站已经在一个对话完全使用简体中文的独立 LLM session 中完成审阅。因此强制的 `linguistic QA` gate 仍未完成。

真实 desktop 与 390 px mobile render QA、accessibility、PWA/offline、language switching 也仍未完成。

## 状态

文本、UI 与 semantic contract 已可进入下一 gate。当前正确状态是 **semantic QA**，不是 `linguistic QA`。
