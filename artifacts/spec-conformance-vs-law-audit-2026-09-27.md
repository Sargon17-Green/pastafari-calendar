# Specification/conformance versus legal prohibition — audit
Date: 2026-09-27
Status: pre-canon editorial/legal-layer audit; not legal advice and not canonical text

## Question being preserved

Earlier explanation work required an explicit distinction between:

1. **normative specification/conformance** — what a conforming implementation or representation must/must not do;
2. **project/repository governance** — what contributors are allowed to change in a particular branch/workflow;
3. **liturgical/theological authorization** — what the Monster approves within the project-world framing;
4. **law / copyright / software licensing** — what a person is legally permitted to copy, modify, distribute, etc.

These are not interchangeable.

## Current public `/about/` article

Target inspected:
`feature/about-i18n-72-locales:docs/about/content/he.html`

Current Hebrew blob:
`954f82559e618a091bb338c65a61be9e50d48331`

The article repeatedly describes:
- what the canonical specification defines;
- what follows from the specification;
- what must be preserved semantically;
- what empirical research does or does not prove.

It does **not** currently contain an explicit paragraph explaining that normative conformance language is not a legal prohibition.

It also does not currently make a direct legal claim that violating the specification is unlawful.

### Conclusion

The missing clarification is an **omission**, not a correction of an existing false legal statement in the article.

## Existing project precedent: Seer NOTICE already makes the distinction correctly

Repository:
`Sargon-17-Green/Pastafarian-Calendar-Seer`

File:
`NOTICE.md`

The notice explicitly separates:
- lack of liturgical authorization by the Flying Spaghetti Monster;
- legal permission under the MIT License.

It says, in substance, that the software license governs legal use/modification/distribution and does not constitute liturgical authorization.

This is exactly the conceptual distinction the public explanation needs, although `/about/` should phrase it in a more general specification/conformance form rather than copying Seer's special “unauthorized shortcut” framing.

## Current repository licenses

### `Sargon17-Green/pastafari-calendar`

Current `LICENSE` uses the substantive MIT permission text and expressly permits recipients of the Software to:
- use;
- copy;
- modify;
- merge;
- publish;
- distribute;
- sublicense;
- sell copies,

subject to retaining the copyright/permission notice in copies or substantial portions.

The grant is phrased for “this software and associated documentation files”.

### `Sargon17-Green/Pastafarian-Calendar`

Its `LICENSE` contains the same substantive MIT permission grant, with Pastafarian wording.

### `Sargon-17-Green/Pastafarian-Calendar-Seer`

Its `LICENSE` is explicitly titled MIT License and contains the standard permission grant.

## What may safely be said later

A public explanation can safely preserve the following conceptual rule, subject to final corpus/licensing review:

> When the calendar specification says that a conforming implementation must or must not do something, that statement defines **conformance to the calendar**. It does not by itself make a different calendar, variant or non-conforming implementation unlawful.

A second sentence can state that:
- legal permission to copy/modify/distribute particular code or text is governed separately by the applicable license and law;
- repository contribution/governance rules are also separate.

This formulation avoids pretending that a technical specification creates civil/criminal law.

## Important scope limit

Do **not** overstate the license conclusion.

The fact that repository code is under MIT-style permission does not automatically answer every copyright question about:
- third-party quotations;
- externally sourced Pastafarian material;
- images;
- text copied from books/sites;
- material with a different stated license.

Therefore the eventual public explanation should distinguish the concepts without trying to serve as a complete legal-rights guide.

## Terms that need classification rather than global replacement

### “must”, “must not”, “required”, “forbidden”
May mean:
- conformance requirement;
- test invariant;
- project workflow rule;
- security requirement;
- liturgical/theological rule;
- law.

Context decides.

### “not permitted by the Monster”
In Seer documentation this is intentionally **liturgical/theological**, not legal.

### “illicit”
Seer's `RELATION_TO_THE_MONSTER.md` uses “illicit” rhetorically for an unapproved liturgical shortcut.

In isolation this English word can sound legal.

Future documentation alignment should retain the joke only if nearby wording keeps the layer unmistakable.

### “immutable”
Can mean:
- a file/project-governance rule (“do not edit the historical original”);
- cryptographic/content identity;
- canonical semantic fact.

It does not itself mean legally unmodifiable.

## Repository governance is a third layer

Examples from current project work:
- historical Megillah originals may be declared byte-immutable within a workstream;
- independent implementation branches must not be merged to `main`;
- handoff files may be prohibited from commits.

These are project-management constraints.

They are not statements that operating-system access, copyright law or criminal law physically/legally prevents a person from making a copy or fork.

## Future corpus question

When the corpus is pinned, extract the exact language it uses for:
- binding rules;
- variants;
- conformance claims;
- source immutability;
- authority.

Then the public explanation should use terminology consistent with that corpus while preserving the layer distinction above.

## Recommended placement in `/about/`

Do not create a large legal section.

The best later placement is a short explanatory box or paragraph adjacent to:
- the first strong discussion of “the specification”; or
- the authority/source section.

It should answer one question only:

**What does “required/forbidden by the specification” mean?**

It should not interrupt the technical flow with licensing detail.

## Staging status

- distinction recovered: **yes**
- existing public clarification: **missing**
- existing false legal prohibition in `/about/`: **not found**
- project precedent proving the distinction is intentional: **yes — Seer NOTICE**
- final wording: **deferred until corpus snapshot and final license/content scope review**
