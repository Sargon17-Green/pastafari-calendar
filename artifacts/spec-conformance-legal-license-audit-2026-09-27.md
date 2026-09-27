# Specification/conformance versus legal restriction — repository license audit
Date: 2026-09-27
Status: editorial/legal-context research for future public wording; not a substitute for legal advice

## Question

When project documentation says an implementation “must” or “must not” do something to conform to the Pastafarian Calendar specification, does that mean modifying the software/calendar is legally forbidden?

## Finding

No. The current repositories examined make the distinction unusually clear.

### Main public toolkit/site

Repository:
`Sargon17-Green/pastafari-calendar`

Current `LICENSE` is an MIT-style permissive grant. It expressly permits, subject to retaining the copyright/permission notice in copies or substantial portions:
- use;
- copying;
- modification;
- merging;
- publication;
- distribution;
- sublicensing;
- sale.

Its humorous actor wording extends the grant to a “person, carbohydrate, or other sentient entity”.

### Multi-implementation repository

Repository:
`Sargon17-Green/Pastafarian-Calendar`

The inspected `JavaScript+Interlingue` branch has the same essential MIT-style grant:
- use/copy/modify/merge/publish/distribute/sublicense/sell;
- notice retention condition;
- standard AS-IS/no-warranty language.

It similarly uses humorous “person, carbohydrate, or other intelligent entity” wording.

### Seer repository

Repository:
`Sargon-17-Green/Pastafarian-Calendar-Seer`

Current `main` uses the ordinary MIT License, with the same broad software permissions subject to preservation of the copyright/permission notice.

### Mobile App

Repository:
`Sargon-17-Green/Pastafarian-Calendar-App`

A root `LICENSE` file was **not found** in the current-main location checked during this audit.

Therefore do not generalize the public-repository license finding to the private App without a separate legal/licensing source.

## Consequence for specification wording

The distinction can be stated precisely:

- **Conformance rule:** if specification S says behavior X is required, an implementation that deliberately substitutes Y is not conforming to S on that point.
- **Legal permission:** the current permissive software licenses in the public repositories expressly permit modification and derivative software subject to their license conditions.
- **Naming/representation claim:** a modified system may accurately describe itself as a variant/fork/nonconforming derivative; it should not represent changed behavior as conforming to an unchanged rule.
- **Other law:** copyright/license compliance, trademarks, contracts and other applicable law remain separate questions.

Thus “forbidden by the specification” and “prohibited by law” are not synonyms.

## Actor-neutrality

The legal/license text in the main toolkit and multi-implementation repository already uses deliberately broad actor classes.

This is consistent with the earlier editorial intent that the conformance rule does not depend on whether the modifier is:
- a human;
- a software system;
- an AI/agent;
- an organization;
- a carbohydrate;
- another intelligent/sentient entity.

The actor may modify under the applicable legal permission; the semantic consequence of modifying a normative rule is simply loss of conformance to that rule.

## Public-wording recommendation

The staged `/about/` candidate should remain concise and should not reproduce the license.

A suitable factual distinction is:

> במפרט, “חייב” ו“אסור” הם תנאי התאמה. אפשר ליצור גרסה שונה או מימוש שאינו תואם; השינוי פשוט אינו יכול להיחשב באותו מקום למימוש תואם של הכלל ששונה. זה אינו כשלעצמו איסור משפטי. שאלות של רישיון, זכויות יוצרים, סימני מסחר, חוזים או דין אחר הן שאלות נפרדות.

This wording is compatible with the current public-repository licenses and remains correct even if a different repository has a different license, because it does not promise universal legal permission.

## Alignment gate

Before publication:
1. re-check the live repository licenses;
2. ensure the canonical corpus's use of normative words matches the conformance interpretation;
3. ensure no public sentence accidentally claims a broader legal permission than the actual applicable license provides.
