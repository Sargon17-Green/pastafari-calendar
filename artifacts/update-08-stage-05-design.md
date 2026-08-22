# Update 8 — Stage 5 design note

## Baseline

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Current `main` SHA at Stage-5 start: `2bc2d97bd5638b498014ed8c1c925fb735819a6b`
- Stage-4 production baseline parent: `768efa46edda7f2320cf75e4f7fffee5d47fb983`
- The only change between those SHAs is addition of Stage-4 synthesis artifacts; relevant production code is equivalent.
- Package: `1.3.0`
- Node: `v22.16.0`
- npm: `10.9.2`
- Uploaded snapshot has no `.git` metadata; production baseline cleanliness is established by the Stage-4 production hashes and current-main comparison.

## Current mutation lifecycle and failure windows

### Shared invocation arena

Dynamic01's common invocation executor records the entry length, reserves the existing 12-cell frame in the module-shared raw array, executes the existing generated lifecycle, and truncates back to the entry length only on normal return. A throw after reservation skips that truncation. Nested execution therefore leaves the frame owned by the throwing ancestor/descendant whose normal-return cleanup was skipped.

### Identity WeakMap / counter

Dynamic00's limited-measure helper assigns a new monotonic uint32 identity to object/function values by mutating a module-shared `WeakMap` and counter. The public generated construct proxy maps/measures constructor arguments before `Reflect.construct` has committed successfully. There is no failure ownership record, so a failed new key remains mapped and consumes the next identity number.

## Chosen rollback boundaries

### Arena

Patch the existing Dynamic01 common executor, not individual constructor bodies. The executor's already-saved entry length is the ownership boundary. Start a guarded failure region immediately before reservation. Keep the existing success cleanup and success path unchanged. On throw, best-effort truncate to that invocation's saved entry length and rethrow the original exception object. This is entry-relative and nesting-safe: an inner failure restores its own entry length, while a later outer failure restores the outer entry length.

### Identity

Patch Dynamic00 at its identity writer and generated public `construct` trap. Add a stack of per-construction identity transaction frames. Each frame stores the counter at invocation entry and a list of keys first allocated while that frame is active. A successful nested construction transfers its owned keys to its parent frame; a top-level success commits them permanently. A failed frame deletes only its owned new keys using a captured `WeakMap.prototype.delete` intrinsic and restores its entry counter. Existing mappings are never journaled, so preexisting IDs survive unchanged. The original exception is always rethrown; a cleanup failure is not allowed to replace it, and the counter is reset only if key deletion completes, avoiding ID collision in that abnormal fallback.

## Source of truth / generated variants

The encrypted/generated authoritative payload has no repository generator that rewrites these decoded sources. The existing production architecture already applies a narrowly-scoped source transform during generated `Function` compilation. Stage 5 therefore extends that same detour: Dynamic00 is transformed at its initial compilation; Dynamic01 is transformed when it is compiled under the existing temporary `Function` proxy. Equivalent authoritative loader logic exists in Node (`src/5efdcc3e6fb071cbaffdcb117507a169dd76.js`) and browser (`browser/pastafari-calendar-core-chronicle.js`), so both loader copies must carry the same detour. The standalone bundle is then regenerated canonically with `npm run build:standalone` rather than hand-edited.

## Non-goals / preservation

No reservation, generated ritual, shared arena, public wrapper, cache system, runtime patch ledger, export, signature, output shape, or exception contract is removed or redesigned. Test-only observation/fault hooks remain test-only.
