# Authoritative Engine Architecture — Exact Execution Specification

> **Status:** implementation specification reconciled to the completed 20-update remediation series and release `1.4.0`.  
> **Repository:** `Sargon17-Green/pastafari-calendar`  
> **Verified current `main` head:** `8465a7e83c1f540de75c84cc8efca2660f460ecd` (`Update 20`, GitHub commit timestamp `2026-08-26T05:55:24Z`).  
> **Uploaded-tree basis:** `pastafari-calendar-main(2).zip`; the archive has no `.git`, so the Git commit binding above is verified separately against current GitHub `main`.  
> **Normative Scroll:** `sources/מגילת העיתים.md`, SHA-256 `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`.  
> **Independent normative reference:** `verification/reference-oracle/reference.mjs`, SHA-256 `40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379`.  
> **Purpose:** describe the authoritative implementation **as it executes in 1.4.0**, including its deliberately tangled compensating detours. The normative source of truth is the Scroll, not the authoritative engine itself.

> **Superseded baseline:** the previous edition described `main` at `78cc29a12b8d16bf91fd54284851a0e6740aae36` (`2026-08-20T17:07:32Z`), after the final-stir `bowlSum` correction but before the later remediation/hardening work. The 20-update series is now complete, so this edition incorporates those changes rather than retaining the temporary frozen-baseline disclaimer.

## 0. Reading contract: what “complete” means here

This document is a no-skip architectural execution specification. It covers the sealed carrier reconstruction, generated programs, source-compilation detours, shared mutable state, randomness/witness machinery, all nine decoded semantic modules, the 91-carrier sealed namespace, the supported browser and Node authoritative doorways, the compensating gate/year/cache/month-weaving detours, deterministic external-calendar side routes, the package-level 108-name public surface, adjacent reverse/constraint clients, and the authoritative Worker.

The following compression rules are used **without omitting semantic operations**:

1. A loop with identical body semantics is specified once with exact bounds/body instead of repeating every iteration.
2. Very large static payloads are bound by exact size/encoding/hash and by the exact algorithm that consumes them. Listing 1,171,456 packed words or long astronomical coefficient tables verbatim would duplicate source data rather than add an execution step.
3. Fixed coefficients are listed where they determine branches/formulas. Larger source-locked tables may instead be bound to a module hash and a precisely described consumption algorithm.
4. “Semantically cancels” or “decorative” never means “does not execute”. Random draws, temporary writes, historical restores, dead-end calendar calls, and obsolete data construction are recorded when they execute.
5. The decoded Dynamic 00/Dynamic 01 statement inventory and ENTER identifiers remain the forensic baseline of the sealed payload. Current 1.4.0 may wrap or transactionally repair those decoded operations at Function-construction time; the document says explicitly when it is describing decoded source versus compiled execution.
6. Four distinct truths are kept separate:
   - **decoded hidden-core behavior** — what the encrypted/generated payload says before current source transforms;
   - **compiled hidden-core behavior** — decoded code after the current deterministic Function-source transforms (notably `bowlSum`, failure transactionality, and Update-15 arena guarding);
   - **public authoritative behavior** — compiled hidden core plus the supported doorway detours and public calendar-routing layer;
   - **normative semantics** — defined by `sources/מגילת העיתים.md` and independently implemented by `verification/reference-oracle/reference.mjs` for conformance work.
7. A historical defect may remain physically present as a fossil if a compensating spaghetti detour prevents it from deciding supported public semantics. Such fossils are described as fossils, not as current public deviations.

## 1. Current repository bindings

The uploaded 1.4.0 tree and current `main` bind the authoritative path to the following files. Hashes below were recomputed from the uploaded archive.

| file | role | SHA-256 |
|---|---|---|
| `browser/pastafari-calendar-core-1.js` | sealed fragment carrier 1 | `90c700220253b86322130402f0fe5a5d3ba6c527a726cefef1f7c914514c695b` |
| `browser/pastafari-calendar-core-2.js` | sealed fragment carrier 2 | `11f68ded7bd366b17cf9d3d0769fbdc21bcf06e67ab10a85e52002a388fd2682` |
| `browser/pastafari-calendar-core-chronicle.js` | browser packed chronicle + current Function-source transforms | `2b217c6a06a6e91184adca46d15ab91cfb6b39481ffbc405470ec0307941d4fa` |
| `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` | Node packed authoritative copy + same generated-runtime transforms | `b46fc5247a2fa4062da6d0a05a1b931888bba801e5322f3b52b284f1fad45eff` |
| `browser/pastafari-calendar-core.js` | supported browser doorway | `e9ae270d05a6f0328ea9b814a48af2f0434e3e9a8f4c340f1ac6de1e1f5fced2` |
| `src/public-api.js` | package-level Node public doorway | `ba1f123a85b7453cb1ad7d77f61a894880a588b60c1a2dd5863015dd29ef08ac` |
| `browser/gate-data-detour.js` | canonical regenerated positive-gate shadow | `f9dc9e8157a805b5015c57872657333d7e650af8d71cb9860e5e190b9fa6116f` |
| `browser/generated/pastafari-gate-shadow.js` | source-derived encoded positive-gate dataset | `801be60be5bea43ed14ffbd9eac5c5ebb96f60b48ce6a71d722233b2514d002f` |
| `browser/generated/pastafari-gate-shadow.manifest.json` | gate-shadow provenance/seals | `7d3883c8b5dcc6dd88e53d5e8e89665c68ce6d4c0dc96bf9ca0490484b85e3d2` |
| `browser/year-ceiling-detour.js` | historical 5,778 ceiling poison detour, now supervised | `0000d57e6d84c2cca64bafe221c9bd94fd23daa422a6c74ae3f1b9c0916391c1` |
| `browser/year-ceiling-detour-detour.js` | anchor-matrix ceiling repair | `a13e9c378ec08df41a45aa01952aad88f4e63582fe7790b8dc6ad4144c54f344` |
| `browser/year-ceiling-detour-detour-detour.js` | cached-year poison supervision | `1100b9ff18a6240bf3186ac99634ec3926f21479feb15d01bf8b7b6cb18561e2` |
| `browser/runtime-patch-ledger.js` | reentrant/late-patch ownership supervisor | `05c4f1c78d80c95147ef8504d8281d0d8e551babc11f5a8f69c0a3454c7ee02b` |
| `browser/cache-epoch-detour.js` | semantic cache fossil mask + transactions | `f3537f00723f69de31af2ac96b21b644ff64ca4e8703274cec6bd79c16e8e710` |
| `browser/month-weaving-domain-detour.js` | public singleton-domain count/rank/unrank repair | `942e0fc1deab593f255e4cdd889c73ffb1280ec2420f98a4a40085378ef86873` |
| `browser/proleptic-negative-year-detour.js` | deterministic nonpositive-year public routes | `e403e0ced523b4b128b7c096e3cee23aa831a836418ded30d71014d132c6768f` |
| `browser/intl-calendar-semantic-firewall.js` | browser normative/host-Intl separation | `638739b8c56720d2ccf3496dc3fa8e50c9e5da37f6a5dc75cf82aac1e02c7d65` |
| `src/chinese-calendrica-detour.js` | deterministic source-locked Chinese engine | `df4ffa0697c3d2cc979cb0062f7201b1cd0b1fd8c52664562fcc0e890f3f7937` |
| `browser/vikrama-detour.js` | deterministic source-locked Vikrama correction path | `744e2f7dd605f3af17ca0d5417eba2ac27067e0fd53caa7ac9a8f5772d1a23a7` |
| `browser/vikrama-api.js` | browser Vikrama API wrapper | `3bc8d95a1dde3eeb5f1b5f906652295f52b1b227486c568914dd88fcd053075c` |
| `browser/koki-imperial-detour.js` | signed proleptic Kōki detour | `1359874a88415f626f7f62249171f582561acd389a28897393372cfdd007eadb` |
| `browser/koki-api.js` | browser Kōki API wrapper | `15a197b6963df567b98e47e031858b048224a96e9196810af953d082d38604b5` |
| `browser/pastafari-calendar-fast.js` | adjacent fast implementation, not oracle | `03de7a8125c1c4c63a9946b531b754c4828adc9f998ddd8b7a5ef4b5adcc4473` |
| `browser/pastafari-authoritative-worker.js` | browser authoritative Worker transport | `02d7222dab128cc23b355f6048f4965368e1a74db4b2944a34e2401bdd434656` |
| `docs/calendar-converters.js` | deterministic arithmetic/proleptic side-door converter | `0d25e6ddfd04ba0e8e691825ff7110fb463280114d2d5aaa381a20c9dc02b168` |
| `verification/reference-oracle/reference.mjs` | independent Scroll-derived conformance reference; never a production runtime dependency | `40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379` |

The current package version is `1.4.0`. Update 20 is a release-closure/version-bump step: its manifest explicitly forbids a new semantic production change at that stage. The semantic corrections described here therefore come from the preceding remediation updates and are merely carried into 1.4.0.

The uploaded source archive contains Update 20's **pre-CI** manifest (`releaseStatusBeforeCI: "RELEASE_BLOCKED"`) but not the generated Actions artifact `artifacts/final-release/FINAL-RELEASE-CLOSURE.json`. This specification therefore binds the merged 1.4.0 code/semantics and does **not** infer a `RELEASE_READY` CI artifact from the ZIP alone.

The sealed dynamic namespace still contains **91 carrier slots** in the exact order in §7. The final Node package surface contains **108 exports**: the 91 sealed names (with selected bindings overridden by public detours), seven adjacent reverse/constraint exports, and ten added normative representation/API exports for Chinese structured dates, Vikrama, and Kōki.

## 2. End-to-end call graph

The supported 1.4.0 authoritative path is layered; “authoritative engine” no longer means “call the chronicle directly”.

```text
Node package public API
  -> src/public-api.js
      -> packed authoritative copy (91 sealed carriers)
      -> install gate-data shadow on GateIndex
      -> install ceiling detour #2
      -> install ceiling detour #3
      -> install historical ceiling detour
      -> install cache-epoch fossil mask on PastafariCalendar
      -> install MonthWeaving singleton-domain detour
      -> bind nonpositive-year deterministic calendar detours
      -> bind deterministic Kōki / Chinese structured+related / Vikrama routes
      -> rebind friendly PastafariCalendar subclass (default localToday injection)
      -> add reverse/constraint adjacent APIs

Browser authoritative core
  -> browser/pastafari-calendar-core.js
      -> core-chronicle (91 sealed carriers)
      -> same gate / ceiling / cache / MonthWeaving installations
      -> nonpositive-year detours
      -> Intl semantic firewall; normative Chinese uses deterministic source-locked engine
      -> explicit detoured converter exports + remaining chronicle exports

core-chronicle / packed copy
  -> import/reconstruct 193 carrier fragments
  -> decrypt decoded Dynamic 00
  -> transform Dynamic 00 before compilation
      -> Update-8 transactionality repairs
      -> Update-15 outer arena guard
  -> temporarily intercept Function and Function.prototype.constructor
  -> execute compiled Dynamic 00
      -> all decorative/random/witness bootstrap work
      -> construct Dynamic 01 through the same source transformer
          -> inner generated-arena exception rollback injection
      -> compile nine modules
          -> M6 also receives the bowlSum final-stir source correction
      -> return 91-carrier namespace
  -> public PastafariCalendar.convert / convertJdn
      -> cache-epoch transaction begins
      -> ceiling detour stack installs nested GateIndex.gate costumes under runtime-patch ledger
      -> hidden year/gate/structure code executes
          -> first public gate read primes canonical regenerated positive gate shadow
          -> hidden 5781 candidate machinery observes detour-adjusted gates and therefore enforces 5778
      -> success commits semantic cache shadow; failure rolls it back
      -> runtime-patch supervisor performs historical restore steps and repairs exact entry descriptors
      -> output passes outer/inner generated Proxy machinery
  -> optional Worker canonicalization
```

The independent normative reference is **not** on this runtime call graph. Update 16 explicitly forbids production from importing it. It is a conformance authority used by regeneration/audit/test infrastructure, not a self-correcting runtime oracle.

## 3. Static chronicle: 193 fragment reconstruction

### 3.1 Fragment census and fixed state

The chronicle consumes exactly **193** imported fragments: 97 from `core-1` and 96 from `core-2`. It combines them into one ordered fragment array. Each fragment carries eight 32-bit words plus encoded material used by the reconstruction pipeline.

The eight fixed 32-bit constants are:

```text
3424380960
580176430
1378151104
3301754935
2328180054
2290893233
1233051510
4175454247
```

The 64-symbol base alphabet is:

```text
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_
```

### 3.2 32-bit mixer, PRNG, and rotate helper

The mixer operates with unsigned 32-bit truncation:

```js
x = (x ^ 0xa3c59ac3) >>> 0;
x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
return (x ^ (x >>> 16)) >>> 0;
```

The xorshift helper first replaces a zero seed with `0x6d2b79f5`, then executes, in order:

```js
x ^= x << 13;
x ^= x >>> 17;
x ^= x << 5;
return x >>> 0;
```

A separate helper performs 32-bit rotate-left.

### 3.3 Per-fragment layout selection — exact four layouts

Before the state-machine reconstruction begins, the chronicle allocates:

```js
new Array(193)       // storage for the four-word groups
new Array(193)       // storage for the three-word groups
new Uint32Array(257) // auxiliary 32-bit noise/state table
[]                   // additional empty Array
new Map()            // additional empty Map
```

It also materializes this 17-word constant Array:

```text
1042806007, 2009487773, 2870273939, 1532951176,
2244852287, 380091656, 3828175363, 82434434,
2383905645, 2072598475, 3293239985, 3918228950,
1405916711, 4154538494, 1101941167, 458294242,
3086815935
```

For `i=0..16`, it mutates the auxiliary `Uint32Array` at an index restricted to `0..255` even though the typed array has 257 elements:

```js
aux[(seed17[i] ^ fixedConstants[i & 7]) & 255]
  ^= (seed17[i] + i) >>> 0;
```

The state-machine tag starts at `4064025815 >>> 0`. Three additional 32-bit accumulators/counters start at zero.

For every imported fragment, `fragment[0] & 3` selects **exactly** one of these four permutations of the remaining seven words:

| selector | four-word group | three-word group |
|---:|---|---|
| 0 | `[1,2,3,4]` | `[5,6,7]` |
| 1 | `[4,7,2,6]` | `[3,1,5]` |
| 2 | `[5,3,6,1]` | `[7,4,2]` |
| 3 | `[7,2,5,3]` | `[1,6,4]` |

The numbers in the table are indices into the eight-word fragment. The four-word group feeds global-state derivation. The three-word group contains the encoded share strings used later. The selector branch executes independently for all 193 fragments.

### 3.4 Chronicle state machine — exact order through share reconstruction

The outer reconstruction is an explicit `for(;;) { switch(stateTag) { ... } }` machine. Unknown nonzero state tags throw `E1`; zero exits. Its effective path is:

1. **State `4064025815`.** Loop over all 193 fragments, execute the four-layout splitter from §3.3, and store both groups in the two 193-element Arrays. Set state to `2677158591`.
2. **State `2677158591`.** Derive the eight-word global state and three derived words as specified below. Branch on `globalState[0] & 1`:
   - true → state `1431475123`;
   - false → state `252219241`.
3. **State `1431475123`.** Execute:

   ```js
   accumulatorA = (
     accumulatorA
     + aux[(counter * 17) & 255]
     + Math.imul(counter + 3, fixedConstants[counter & 7])
   ) >>> 0;
   counter++;
   ```

   Then go to `4228495781`.
4. **State `252219241`.** Execute:

   ```js
   accumulatorA = (
     accumulatorA
     ^ aux[(counter * 29 + 11) & 255]
     ^ globalState[counter & 7]
   ) >>> 0;
   counter += 3;
   ```

   Then go to `4228495781`.
5. **State `4228495781`.** Execute:

   ```js
   accumulatorB = (
     accumulatorB
     + Math.imul(
         accumulatorA ^ globalState[(counter + 5) & 7],
         0x85ebca6b
       )
   ) >>> 0;
   ```

   Then go to `4180675923`.
6. **State `4180675923`.** Build three independent permutations of the 193 fragment positions. Allocate three new 193-element Arrays to receive decoded shares. Go to `1108110157`.
7. **State `1108110157`.** For each source fragment and each of its three encoded share strings:
   - compute a local permutation of `[0,1,2]`;
   - map encoded-share position to semantic share index;
   - use the semantic-share-specific global 193-position permutation to select a destination position;
   - derive a custom-alphabet seed from fragment word 0, the semantic share, destination position, global state and fixed constants;
   - decode the string to a `Uint8Array` using the shuffled 64-symbol alphabet;
   - store the byte array in `decodedShares[semanticShare][destination]`.
   After all `193 × 3` decodes, go to `2653682873`.
8. **State `2653682873`.** Read `shareLength=decodedShares[0][0].length`; compute `totalLength=shareLength*193`; allocate `new Uint8Array(totalLength)`. For each destination fragment and every byte position, XOR the three semantic shares into the output. The source contains two branch-selected operand orders:

   ```js
   (aByte ^ cByte) ^ bByte
   // or
   (bByte ^ aByte) ^ cByte
   ```

   selected by `(globalState[3] ^ fragmentIndex) & 1`. Both produce the same byte but the branch executes. Then go to `3641287537`.

The general Fisher–Yates helper used above allocates:

```js
Array.from({ length: n }, (_, i) => i)
```

then runs `i=n-1..1`, advances xorshift32, computes `j=state%(i+1)`, and swaps with destructuring assignment.

The three 193-position permutation seeds are:

```js
mixer(
  globalState[share]
  ^ fixedConstants[(share + 1) & 7]
  ^ Math.imul(share + 7, 0x9e3779b1)
)
```

for semantic share indices `0,1,2`.

The per-fragment `[0,1,2]` share permutation starts from:

```js
mixer(
  fragment[0]
  ^ globalState[5]
  ^ Math.imul(fragmentIndex + 1, fixedConstants[3] | 1)
)
```

and performs Fisher–Yates over three elements.

The per-share alphabet-decoder seed is:

```js
mixer(
  fragment[0]
  ^ globalState[(share + 2) & 7]
  ^ Math.imul(destination + 1, fixedConstants[(share + 4) & 7] | 1)
  ^ Math.imul(share + 11, 0x27d4eb2d)
)
```

### 3.5 Eight-word global state and three derived words

State derivation starts from a copy of the eight fixed constants and a global input counter `c=0`. For each fragment form:

```text
fragment[0], followed by that fragment's selected four-word group
```

For each of those five words:

1. `lane = c & 7`;
2. replace `state[lane]` with:

   ```js
   mixer(
     state[lane]
     ^ word
     ^ Math.imul(c + 1, 0x9e3779b1)
   )
   ```
3. update the lane three positions ahead:

   ```js
   state[(lane + 3) & 7] = (
     state[(lane + 3) & 7]
     + rotl(state[lane], (c % 29) + 1)
   ) >>> 0;
   ```
4. increment `c`.

After all 193 fragments, perform exactly 19 rounds. For round `r=0..18` and lane `i=0..7`:

```js
state[i] = mixer((
  state[i]
  + state[(i + 1) & 7]
  + Math.imul(r + 1, fixedConstants[(i + r) & 7] | 1)
) >>> 0);
```

Then derive three additional words:

```js
derived[0] = mixer(state[1] ^ fixedConstants[5] ^ fragmentCount);
derived[1] = mixer(state[4] ^ fixedConstants[2] ^ c);
derived[2] = mixer(
  state[7]
  ^ fixedConstants[0]
  ^ Math.imul(fragmentCount, 0x45d9f3b)
);
```

For the fixed carrier, `fragmentCount=193` and `c=193*5=965` after this derivation loop.

### 3.6 Custom 64-symbol decoder — exact allocations and byte packing

Alphabet shuffle starts with `baseAlphabet.split("")`, performs seeded Fisher–Yates over 64 characters, and rejoins the result.

For each encoded share string the decoder then:

1. allocates `new Int16Array(128)`;
2. fills all 128 entries with `-1`;
3. for shuffled alphabet positions `0..63`, writes the six-bit value into the entry indexed by that character's ASCII code;
4. allocates:

   ```js
   new Uint8Array((encoded.length >>> 2) * 3)
   ```
5. loops over the text in four-character groups;
6. combines the four mapped six-bit values into one 24-bit integer:

   ```js
   (v0 << 18) | (v1 << 12) | (v2 << 6) | v3
   ```
7. emits the high, middle and low bytes in that order.

No standard Base64 decoder is called here.

### 3.7 ARX transform — exact initial words, rotations, rounds, blocks

State `3641287537` first applies the ARX stream transform in place to the XOR-reconstructed byte buffer.

The four leading state words are:

```js
mixer(fixedConstants[0] ^ globalState[6])
mixer(fixedConstants[3] ^ derived[1])
mixer(fixedConstants[5] ^ globalState[2])
mixer(fixedConstants[7] ^ derived[0])
```

The four rotation amounts are:

```js
[
  5 + (fixedConstants[0] % 22),
  5 + (fixedConstants[2] % 22),
  5 + (fixedConstants[4] % 22),
  5 + (fixedConstants[6] % 22)
]
```

The number of ARX rounds is:

```js
7 + (fixedConstants[6] % 5)
```

The block counter starts at `1`. For each 64-byte block, build the 16-word original state:

```text
4 leading words
8 global-state words
block counter
3 derived words
```

with every word coerced through `>>>0`. Copy this 16-word Array to a working Array. Every ARX round applies the quarter-round to these eight tuples, in this order:

```text
(0,4,8,12)
(1,5,9,13)
(2,6,10,14)
(3,7,11,15)
(0,5,10,15)
(1,6,11,12)
(2,7,8,13)
(3,4,9,14)
```

The quarter-round itself is:

```js
a += b; d = rotl(d ^ a, r[0]);
c += d; b = rotl(b ^ c, r[1]);
a += b; d = rotl(d ^ a, r[2]);
c += d; b = rotl(b ^ c, r[3]);
```

with `>>>0` after additions as in source. After all rounds, add each original state word back into the corresponding working word. XOR each payload byte with the selected byte of `working[byteIndex>>>2]`, using little-endian shifts `((byteIndex & 3)*8)`. Increment the block counter modulo 2^32 and continue.

### 3.8 Header, checksum, Dynamic 00 construction, wiping, and terminal state-machine states

After ARX, state `3641287537` allocates a `DataView` over the transformed byte buffer and reads:

```text
payloadLength    = getUint32(0, true)
expectedChecksum = getUint32(4, true)
```

If `payloadLength > byteBuffer.length - 8`, throw `E2`. Continue to state `1495113189`.

State `1495113189` sets `payload=byteBuffer.subarray(8,8+payloadLength)` and computes the 32-bit FNV-1a checksum **once**, storing the result, then advances to state `2907934069`.

State `2907934069` computes the same FNV-1a checksum **a second time** over the same payload and overwrites that checksum binding. If it differs from `expectedChecksum`, throw `E3`.

The FNV loop starts from `0x811c9dc5`; for every byte:

```js
h ^= byte;
h = Math.imul(h, 0x01000193);
```

and returns `h>>>0`.

State `147887833` then:

1. executes `new TextDecoder().decode(payload)` to create the Dynamic 00 source string;
2. creates a Proxy around an object containing `Symbol.toPrimitive`;
3. on coercion, the `Symbol.toPrimitive` method:
   - saves the current source string locally;
   - replaces the source binding by `String(accumulatorB ^ accumulatorA)`;
   - returns the saved source;
4. the Proxy's `get` trap simply delegates through `Reflect.get`;
5. obtains the Function constructor as `(()=>{}).constructor`.

State `2133686351` executes:

```js
accumulatorB = (
  accumulatorB
  ^ aux[(accumulatorA ^ counter) & 255]
) >>> 0;
```

State `2523803761` constructs Dynamic 00 through:

```js
Reflect.construct(FunctionConstructor, [sourceCarrier])
```

which coerces the carrier and therefore consumes the original source exactly once. It then:

1. sets the source-carrier binding to `null`;
2. fills the entire reconstructed byte buffer with `accumulatorB & 255`;
3. loops across **all three × 193 decoded share byte arrays** and fills every one with `(accumulatorB >>> 8) & 255`.

State `2078735007` executes:

```js
accumulatorA = (
  accumulatorA + aux[(accumulatorB >>> 24) & 255]
) >>> 0;
```

State `3820053445` performs no additional computation beyond selecting terminal execution state `759670241`.

At current `main`, state `759670241` does **not** directly `Reflect.apply` Dynamic 00. Instead it executes:

```text
Function-source-transform wrapper
  -> Reflect.apply(Dynamic00, undefined, [])
```

where the wrapper is specified in §3.9. The returned value must satisfy both:

```js
Array.isArray(result)
result.length === 91
```

or the chronicle throws `E5`. The state becomes zero, the outer loop exits, and the chronicle binds result slots `0..90` to its 91 named exports.

There is no `E4` emission in the current chronicle. The loader/state-machine errors remain `E1`, `E2`, `E3`, and `E5`. Current source transformation can additionally throw `E6`, `E7`, `E8`, `E9`, `EA`, `EB`, `EC`, `U15D`, or `U15E` when an expected unique generated-source landmark is absent/duplicated. Those transform failures occur at Function-construction boundaries rather than as decoded state-machine cases.

### 3.9 Current 1.4.0 Function-source transform pipeline

The current chronicle no longer performs only the final-stir substitution. It contains one deterministic source-transform function applied at every relevant `Function` construction boundary. The transform is itself part of the authoritative execution path.

There are two delivery points:

1. when the reconstructed Dynamic 00 source is coerced from its one-use source carrier, the source is passed through the transform **before Dynamic 00 is first compiled**;
2. while Dynamic 00 executes, the chronicle temporarily replaces both `globalThis.Function` and `OriginalFunction.prototype.constructor` by one Proxy. Its `apply` and `construct` traps map every Function-constructor argument through the same transform. This catches Dynamic 01 and the decoded module bodies. Restoration of both global bindings occurs in `finally` after Dynamic 00 returns.

The transform first applies exact-signature compensating patches to generated runtime source and finally invokes the M6-specific final-stir transform.

#### 3.9.1 Update-8 identity transaction patch (`E8`, `E9`, `EA`)

When the Dynamic 00 source contains the expected WeakMap/identity-counter and outer-Proxy-constructor signatures, the transform requires each target fragment to occur exactly once. Failure to locate an expected unique fragment throws the corresponding `E8`, `E9`, or `EA` error rather than silently compiling an unknown shape.

The injected execution semantics are:

- beside the existing persistent identity `WeakMap` and uint32 counter, allocate an identity-transaction stack, an identity journal, and capture `WeakMap.prototype.delete`;
- whenever the limited scorer assigns an identity that was previously absent, append that object/function to the journal **if an identity transaction is active** before storing the WeakMap entry;
- at entry to the outer public Proxy `construct` trap, push a frame containing the counter value and current journal length;
- execute argument transfer and `Reflect.construct` inside `try`;
- on success, preserve the generated object's ordinary semantics and keep committed WeakMap identities; when the successful transaction is outermost, truncate only the journal bookkeeping back to the frame start;
- on failure, walk newly journaled keys backwards and delete them from the WeakMap, truncate the journal, restore the exact entry counter value, then rethrow the **same** exception object;
- pop the transaction frame in `finally` so nested constructor ownership is preserved rather than globally reset.

This is compensating transactionality. The WeakMap/counter machinery still exists and still executes on successful calls; failed construction is prevented from publishing state.

#### 3.9.2 Update-15 outer-`apply` arena guard (`U15D`, `U15E`)

For the outer generated Proxy `apply` path, the transform injects an additional invocation-entry `sharedArray.length` capture **before** the decorative push/random/full-transfer work. The pre-existing inner `try/catch/finally` is retained. A new outer `catch` restores the shared Array to that invocation-entry length if any host/random/witness exception occurs before or around the older cleanup path, then rethrows the original exception.

Thus the historical pre-`try` leak window described by the decoded source still exists textually inside the payload, but not in current compiled execution.

#### 3.9.3 Update-8 generated inner-arena rollback (`EB`, `EC`)

When Dynamic 01 is constructed, the same transformer recognizes the inner executor's frame-reservation/normal-return pattern. It wraps the frame body in `try` and adds a `catch` that restores `array.length` to the invocation-entry base captured by the generated executor, then rethrows the same error.

Consequently an exception from opcode 2 (`Reflect.apply` / `Reflect.construct`) no longer leaves the historical twelve-cell frame in current compiled execution. The original normal-success truncation remains in place and still executes.

#### 3.9.4 M6 final-stir correction (`E6`, `E7`)

After the generic generated-runtime patches above, every candidate source is passed through the M6 transform. It returns source unchanged unless both decoded M6 signatures are present:

```text
", 4483, [..."
", 4492, "
```

For M6 it:

1. finds the unique site-4483 line and injects an uninstrumented raw six-bowl reduction `bowlSum = oldBowls.reduce((a,b)=>a+b,0n)` immediately after it; missing placement throws `E6`;
2. finds exactly one old site-4492 two-line term whose operand is `orderNumber` followed by `BigInt(round)`; zero or multiple matches throw `E7`;
3. substitutes only that operand with the injected raw `bowlSum`.

The original ritualized summation remains. Therefore each final-stir round computes the six-bowl sum twice: raw `bowlSum` enters `u`, while `orderNumber = store(sum + 149*round)` selects the permutation.

#### 3.9.5 Source identity discipline

The large recovered source hashes in this document bind **decoded pre-transform payloads**. They are not hashes of the current compiled generated programs. In 1.4.0:

- Dynamic 00's decoded source is transformed before its initial compilation by the Update-8 and Update-15 generated-runtime patches;
- Dynamic 01's decoded source is transformed at its Function-constructor boundary by the generated inner-arena rollback patch;
- M6's decoded module body is transformed by the final-stir patch;
- module bodies not matching any transform signature pass through byte-for-byte.

The temporary Function Proxy is a real bootstrap-time global mutation. Ordinary calls after bootstrap do not traverse it.

## 4. Dynamic 00 — first generated program, statement-complete

The recovered **decoded** Dynamic 00 payload remains **7,420,147 bytes**, SHA-256 `de4ef2f1a6be8e002a2d304e933df67a64dc013344437775baa5babe22b259fc`. Current 1.4.0 does **not** compile those bytes verbatim: the one-use source carrier passes them through the §3.9 transformer before initial compilation, injecting Update-8 identity/arena transactionality and the Update-15 outer-`apply` guard. The statement map below describes the decoded program's original semantic skeleton; §§3.9 and 4.12 state the compensating operations that surround it in current compiled execution.

Top-level statements are continuous from 0 through 503. There is no uncovered statement range:

| statements | role |
|---|---|
| 0 | strict-mode directive |
| 1–137 | build and freeze 137 payload objects |
| 138–277 | allocate shared Array, derive frame width 12, push the 137 objects |
| 278 | erased five-body RK4 ceremony |
| 279–284 | hash/tag scan and reconstruction of Dynamic 01 source |
| 285–294 | rejection sampler and the 450-route `1+1` ceremony |
| 295–306 | random pool, two scorers, full transfer, short transfer, one-shot ceremony |
| 307 | frozen numeric vault and its Proxy |
| 308–309 | gate flag and shared-Array Proxy |
| 310 | outer function/class Proxy factory |
| 311–320 | one-use Dynamic 01 source carrier, Function hand-off, execute Dynamic 01, enable gate |
| 321–502 | 91 resolve/wrap/push pairs |
| 503 | return fresh 91-reference carrier Array |

### 4.1 Statements 1–140 — payload objects and the deliberately derived Number 12

Statements 1–137 execute 137 separate `Object.freeze(objectLiteral)` calls. The large string/numeric fields are not parsed at this point; the 137 object identities exist at runtime.

Statement 138 executes `[]`. This exact Array identity subsequently serves as source carrier, random/witness substrate, packed table, registry, transient stack, and long-lived shared state.

Statement 139 derives Number `12` rather than writing it directly. It:

1. computes `10n ** 84n`;
2. executes 43 alternating BigInt terms `(4n * 10n**84n) / (2n*i + 1n)`;
3. subtracts the accumulated series from a fixed 85-digit BigInt representation of π and adds the correction back in the following expression;
4. converts the result to String and executes `padStart(85,"0")`;
5. reads characters at indices 13 and 4;
6. converts each character to BigInt;
7. adds them (`7n + 5n`);
8. converts the result to Number.

Statement 140 calls that function; the runtime value is exactly `12`. Statements 141–277 perform 137 individual `array.push` calls, leaving the shared Array length at 137.

### 4.2 Statement 278 — erased five-body astronomy ceremony

The IIFE records `base = array.length`, hence `base=137`, and performs real floating-point work whose astronomical result is erased.

Its random-word helper allocates `new Uint32Array(1)` on every call. If `globalThis.crypto.getRandomValues` exists it fills that one-word typed array; otherwise it evaluates `Math.random()`, multiplies by `2**32`, applies `Math.floor`, and then `>>>0`.

The first random word sets:

```js
steps = 16384 + (seedWord & 2047);
```

so `steps` is 16,384..18,431 inclusive.

The IIFE allocates and reads:

```text
masses = [1, 0.0009543, 0.0002857, 0.00004365, 0.00005149]
radii  = [0, 5.203, 9.537, 19.191, 30.069]
phases = [0, 0.62, 2.11, 4.27, 5.54]
new Float64Array(30)
```

Bodies 1–4 receive circular planar positions/velocities. The six components of body 0 are then set to the negative barycentric sums.

The derivative helper allocates `new Float64Array(state.length)` per call. It selects body iteration order `[0,1,2,3,4]` or `[4,3,2,1,0]`, copies velocities into positional derivatives, and evaluates pairwise 3-D gravity with `G=4*Math.PI*Math.PI` and denominator `distanceSquared ** 1.5`.

Every integration step is a genuine RK4 step. It allocates/obtains `k1`, a temporary state, `k2`, updates the temporary state, obtains `k3`, updates again, obtains `k4`, then allocates a new final `Float64Array` and combines all four derivatives. Four low random bits are supplied independently to the four derivative evaluations and alter summation order.

The total integration interval is:

```js
(-13334246 - 2451545) / 365.25
```

and `h` is that interval divided by `steps`. Every step replaces `state` and writes one scalar to `array[137 + (i % 48)]`.

After the loop the program:

1. creates and freezes `{x:state[0], y:state[1], z:state[2]}`;
2. has 49 temporary cells at indices 137..185;
3. overwrites each of those 49 cells with `(nextSeedWord() ^ index) >>> 0`;
4. fills the final `Float64Array` with `Number.NaN`;
5. executes `array.length = 137`.

Thus no astronomical scalar or object survives in the shared Array, but all CPU work, typed-array allocations, random consumption, and transient writes occurred. In the deterministic measurement where the first word was zero, this ceremony made exactly 16,434 one-word crypto calls: one seed, 16,384 step words, and 49 erasure words.

### 4.3 Statements 279–284 — hash/tag scan and exact Dynamic 01 source assembly

An accumulator starts at `2166136261 >>> 0`. For each of the 137 frozen objects, the code calls `Reflect.ownKeys`; every property value is converted with `String`, and every UTF-16 code unit is folded with XOR and `Math.imul(...,16777619)>>>0`. The accumulator is then XORed with `4251401692`; the measured seed is `1511505647`.

The current Array length is saved. For each `tag=0..136`, the code scans payload objects in width-12 logic and inspects own numeric fields until it finds a value satisfying exactly:

```js
((value ^ 0x5a5a ^ ((tag * 31337) & 0xffff)) >>> 0) === tag
```

The scan deliberately does not break merely because a candidate was found; a later matching object could overwrite the binding. If no object is found it throws the Polish missing-card Error preserved in the decoded source.

For the selected object, every own-property value that is a string and does **not** begin with `"Wedlug tomu"` is pushed. The measured result is 137 source strings at indices 137..273. `array.slice(137).join("")` is the Dynamic 01 source: 7,083,974 bytes in the frozen capture, SHA-256 `3ae100735a87cff040c5b88140bd366ca0ad15d70a2ad036bc497e809ffaf612`.

### 4.4 Statements 285–294 — rejection sampling and all 450 `1+1` paths

The generic random-below helper first requires a positive safe-integer `bound`. It defines:

```js
range = 0x1_0000_0000;
limit = range - (range % bound);
```

allocates one `Uint32Array(1)` per invocation, and loops until a uint32 is `< limit`, returning `word % bound`. With `bound > 2**32`, e.g. `4294967297`, validation succeeds but `limit===0`, so no uint32 can be accepted; an isolated test stayed alive for 2,000 ms and was terminated.

Statements 286–290 build the five callback tables whose cardinalities are `5×5×3×3×2=450`. They provide five left-operand ways to obtain 1, five right-operand ways to obtain 1, three addition implementations, three neutral transformations, and two final transformations. Statements 291–292 consume exactly five random draws with bounds `[5,5,3,3,2]`, compute the nested zero-based route index and then route number 1..450, invoke the five chosen callbacks, and require the result to be exactly Number `2`; otherwise a route-specific Polish arithmetic Error is thrown.

The result object records the route number, `totalPossibleRoutes:450`, probability text, all five choices/descriptions, calculation text, and result. Statement 293 executes the ceremony once. Statement 294 pushes five cells: route number, 450, 2, the descriptions array, and the choices object, taking the Array from 274 to 279 cells.

### 4.5 Statements 295–298 — 1,024-word pool and the noise word

The code allocates `new Uint32Array(1024)` and initializes the cursor to 1024 so that the first read forces a refill. A crypto refill fills all 1,024 words in one `getRandomValues` call; the fallback performs 1,024 `Math.random`/multiply/floor/`>>>0` operations.

The noise-word helper loops exactly `routeResult` times; the route result is 2. Each iteration consumes one pool word, keeps only its low 16 bits, and shifts/ORs the two halfwords into a uint32. Before return it XORs the value with `routeNumber` twice. Those XOR operations cancel algebraically but both execute. Hence a pool refill supplies 512 ordinary noise words.

### 4.6 Statement 299 — the **full scorer**

The full scorer used by the full transfer has the following branch behavior:

| value kind | operations/result |
|---|---|
| `null` | `2654435769 >>> 0` |
| Number `NaN` | `2143289344 >>> 0` |
| other Number | allocate `ArrayBuffer(8)` + `DataView`; `setFloat64(...,false)`; XOR the two big-endian `getUint32` words; `Math.imul(...,16777619)>>>0` |
| BigInt | XOR value with `BigInt(value.toString().length)`, `BigInt.asUintN(32,...)`, convert to Number |
| string | full FNV-style fold over the string iterator, seed 2166136261 and multiplier 16777619 |
| boolean | `0xffffffff` for true, `0` for false |
| `undefined` | `0xdeadbeef` |
| all other values | `Math.imul((Object.prototype.toString.call(value).length ^ (typeof value).length)>>>0,2246822519)>>>0` |

This scorer is distinct from the limited scorer below. Conflating them changes both allocations and object/string scoring behavior.

### 4.7 Statements 300–302 — **limited scorer**, `WeakMap`, and persistent identities

The code allocates a `WeakMap` and initializes an identity counter to zero. Its primitive branches are:

| value kind | limited-score behavior |
|---|---|
| `null` | `2654435769 >>> 0` |
| Number `NaN` | `2143289344 >>> 0` |
| other Number | the same `ArrayBuffer(8)` / `DataView` / big-endian Float64 path as the full scorer |
| BigInt | `BigInt.asUintN(32,value)` followed by Number conversion; **no** decimal-string-length XOR |
| string | mix only length, first, middle and last UTF-16 code units with multiplier `16777619` |
| boolean | `0xffffffff` for true, `0` for false |
| `undefined` | `0xdeadbeef` |
| symbol | mix `description` length with constant `324508639` |
| object/function | persistent WeakMap identity path described below |

For objects/functions, the WeakMap assigns a monotonic identity when the object is first observed:

```js
identityCounter = (identityCounter + 1) >>> 0;
identityMap.set(value, identityCounter);
```

The returned score is equivalent to:

```js
Math.imul(
  (identityCounter ^ (typeof value).length) >>> 0,
  2246822519
) >>> 0
```

for a newly assigned identity, with the stored identity substituted on later calls. The counter increment and WeakMap entry survive all later restoration.

### 4.8 Statement 303 — **full transfer**, four distinct cells, type-specific reconstruction

This is the transfer primitive used by the outer public function/class Proxy. It is **not** the two-cell/four-layout short transfer.

If `array.length < 11`, it returns the input immediately without random consumption. Otherwise it:

1. records the current length;
2. consumes a noise word, scores data, and chooses a first index;
3. consumes additional noise/scoring information to choose three more indices;
4. executes three `while` loops that advance indices modulo the Array length until all four are distinct;
5. saves the four original cell values;
6. consumes another noise word after entering `try`;
7. follows a type-specific reconstruction route;
8. returns a value equal to the input;
9. in `finally`, restores **all four** saved cells.

The type-specific routes are:

- **Number:** allocate two `ArrayBuffer(8)` objects and two `DataView`s. Split the Float64 into two big-endian uint32 words, XOR those words with two masks through four Array cells, reverse the XORs into the second buffer, and return `getFloat64`. Measurements preserved `-0` and NaN behavior.
- **BigInt:** build a 64-bit mask from two noise words; call `Math.random()` once to choose sign; store `value+mask` and `mask` in two cells and return a subtraction that reconstructs the exact BigInt.
- **string:** call `slice` twice, arrange the two pieces in two cells according to a bit, then concatenate them in the corresponding inverse order. UTF-16 code units are preserved.
- **other kinds:** allocate an Array containing the four indices; use two bits to select one location for the original input; write full scores into the other three locations; return the cell containing the original object/value. Object/function identity is therefore preserved.

Measured pool consumption was 10 pool words for Number and BigInt, 8 for string and other types; BigInt additionally consumed one `Math.random()`.

### 4.9 Statements 304–305 — **short transfer**, two cells, persistent counter, four exact layouts

This separate primitive is the mechanism previously over-generalized as `witnessTransfer`. Let the raw shared Array be `A`, let `L=A.length` at entry, and let `marker` default as in the decoded source.

If `L < 7`, return the input immediately. That path performs no counter increment, no random draw and no Array write.

Otherwise execute, in order:

1. increment the persistent uint32 counter:

   ```js
   counter = (counter + 1) >>> 0;
   ```
2. consume one noise word and compute:

   ```js
   seal = (
     random32()
     ^ limitedMeasure(value)
     ^ limitedMeasure(marker)
     ^ counter
   ) >>> 0;
   ```
3. choose the first position:

   ```js
   first = seal % L;
   ```
4. read the neighboring cell and score it:

   ```js
   neighborMeasure = limitedMeasure(A[(first + 1) % L]);
   ```
5. consume a second noise word and calculate:

   ```js
   second = (
     (random32() ^ neighborMeasure ^ (seal >>> 1)) >>> 0
   ) % L;
   ```
6. if `second === first`, replace it with `(second + 1) % L`; because `L>=7`, the resulting positions are distinct;
7. save `A[first]` and `A[second]` in local bindings;
8. consume a third noise word and select:

   ```js
   route = random32() % 4;
   ```
9. recompute the transfer check:

   ```js
   seal2 = (
     limitedMeasure(value)
     ^ seal
     ^ limitedMeasure(marker)
   ) >>> 0;
   ```
10. execute exactly one of four layouts:

   **route 0**

   ```js
   A[first] = value;
   A[second] = seal2;
   return A[first];
   ```

   **route 1**

   ```js
   A[second] = value;
   A[first] = seal2;
   return A[second];
   ```

   **route 2** — allocate a two-element Array:

   ```js
   const box = [value, seal2];
   A[first] = box[0];
   A[second] = box[1];
   return box[0];
   ```

   **route 3**

   ```js
   A[first] = seal2;
   A[second] = value;
   return Reflect.get(A, String(second));
   ```
11. in `finally`, restore **first and then second**:

   ```js
   A[first] = savedFirst;
   A[second] = savedSecond;
   ```

Every ordinary route returns the original input value while the Array cells are restored. The persistent counter, pool cursor, any new WeakMap identities, `box` allocation on route 2, and all random/scoring work survive as side effects.

Statement 306 performs a separate one-shot ceremony. It consumes three noise words, appends four scratch values, then truncates those scratch values. After that ceremony the persistent short-transfer counter is 1.

### 4.10 Statement 307 — frozen numeric vault Proxy

The runtime constructs a frozen target centered on Number `2718281828`. The target contains five representations, including the Number, hex string `"a205b064"`, BigInt form, a frozen XOR-derived object, and a frozen Array. It is wrapped in a Proxy.

The `set`, `defineProperty`, `deleteProperty`, and `setPrototypeOf` traps throw distinct TypeErrors. `preventExtensions` returns `true`. This vault does not feed the calendar tuple, but its construction and Proxy are real initialization work and belong in the proxy census.

### 4.11 Statements 308–309 — shared-Array Proxy

Statement 308 sets a gate flag false. Statement 309 wraps the **same** shared Array identity.

`get` executes `Reflect.get` first. A property is treated as numeric only when it is a string matching `/^(0|[1-9]\d*)$/`. With gate false or a nonnumeric property, there is no additional random call. With gate true and numeric property, exactly one `Math.random()` is evaluated; only `<0` triggers a short transfer, impossible for conforming `Math.random()` but observable under monkey patching.

`set` always consumes one `Math.random()`. If gate true and property numeric it consumes a second one; only `<0` invokes short transfer before `Reflect.set`. Measured counts are therefore numeric get 1, numeric set 2, nonnumeric get 0, nonnumeric set 1. Under a temporary `Math.random=()=>-1`, both short-transfer branches fire yet the read/written semantic values remain unchanged.

### 4.12 Statement 310 — outer function/class Proxy factory, current compiled execution

The decoded factory still returns non-functions unchanged and creates one Proxy for each function/class; 72 outer public Proxies are created during carrier resolution. The decoded `apply` and `construct` mechanics remain deliberately tangled, but current compilation adds the transaction guards in §3.9.

#### `apply` trap

On entry, current compiled code first records a **very outer** `arenaEntryLength = rawArray.length` and enters the Update-15 `try` guard. Inside that guard the historical decoded path executes:

1. save its own `base = rawArray.length`;
2. Proxy-push target/noise/this/argument-count scratch cells;
3. full-transfer the target and mapped arguments;
4. enter the older inner `try`;
5. choose one of the three equivalent call forms by decorative noise and invoke the underlying target;
6. full-transfer/write/read the successful result, or store/retransfer/rethrow the same error;
7. in the older inner `finally`, truncate `rawArray.length = base`.

If an exception occurs anywhere that escapes that historical body — including a monkey-patched `Math.random`, crypto/witness fault, or failure before the older inner `try` is reached — the Update-15 outer `catch` attempts `rawArray.length = arenaEntryLength` and rethrows the same exception. Therefore the old measurable “one scratch cell left when the third random call throws” is a **pre-fix forensic fact**, not current 1.4.0 behavior.

The ordinary successful route still performs the same random calls, transfers, allocations and call-form selection as the decoded source. The guard repairs persistent state; it does not remove the spaghetti work.

#### `construct` trap

Current compiled construction begins by pushing an Update-8 identity transaction frame `{ counter, journalStart }`. While that transaction is active, newly assigned limited-scorer WeakMap identities are journaled. Argument mapping and `Reflect.construct` then execute through the old outer constructor path.

If construction succeeds, the object is returned unchanged, the transaction is popped, and committed WeakMap identities remain. If it throws, all identities first published by that failed transaction are deleted, the identity counter is restored to its invocation-entry value, bookkeeping is truncated, and the same error is rethrown. Nested successful/failing constructions preserve ownership boundaries instead of resetting global state.

The generated inner executor invoked underneath `Reflect.construct` is independently protected by §5.4's twelve-cell arena rollback, so the historical `+12` failed-constructor accumulation no longer survives current compiled execution.

### 4.13 Statements 311–320 — Dynamic 01 Function hand-off under the current global Function interceptor

Statement 311 creates a frozen one-use source carrier with `Symbol.toPrimitive`. At first coercion it captures the current Dynamic 01 source locally, overwrites the source binding with a Polish comment/string containing `Math.random()`, and returns the captured source.

Statement 312 saves Array length 279. Statement 313 pushes `(function named(){}).constructor` through the Array Proxy; with gate still false the push nevertheless consumes two `Math.random()` calls via set traps. Because current §3.9 temporarily replaces `Function.prototype.constructor`, the constructor obtained here is the **chronicle Function Proxy**, not the untouched native Function.

Statement 314 retrieves that constructor through **short transfer**. Statement 315 replaces its cell with the limited score, consuming a Proxy-set `Math.random`. Statement 316 executes `Reflect.construct` with three parameter names plus the one-use source carrier. Source coercion consumes another `Math.random`; the chronicle Function Proxy maps all constructor arguments through the current source transformer. Dynamic 01 does not match the M6 signatures and is therefore compiled unchanged.

Statement 317 writes the new Dynamic 01 function through the Array Proxy. Statement 318 calls it with the raw Array, seed `1511505647`, and frame width `12`. Dynamic 01 immediately executes `array.length=0`, so the preceding 280 cells cease to be its persistent registry/table base.

After Dynamic 01 returns, statement 319 writes the limited score of its returned object at index 279 of the newly built table; statement 320 enables the Array-Proxy gate. The legacy measurement records six fixed `Math.random` calls in statements 313–319.

### 4.14 Statements 321–503 — 91 carriers

There are exactly 91 statement pairs: resolve one property from Dynamic 01's returned object, call the outer wrapper factory, then push the resulting value to the raw shared Array. Seventy-two values are functions/classes and therefore create 72 outer Proxies and consume 72 creation-time `Math.random` calls; 19 values are non-functions and remain unwrapped. The measured pre-transform table grew from 1,175,637 to 1,175,728 cells. Statement 503 allocates and returns a **new** Array literal containing the 91 references.

## 5. Dynamic 01 — packed table, decoder, registry, shared runtime, statement-complete

The recovered **decoded** Dynamic 01 payload remains 7,083,974 bytes, SHA-256 `3ae100735a87cff040c5b88140bd366ca0ad15d70a2ad036bc497e809ffaf612`. Its decoded top-level statements are continuous 0..1266. Current compilation passes the source through the §3.9 transformer; the principal change here is the injected exception rollback around the inner twelve-cell executor frame. Thus the decoded statement inventory remains a forensic map, while §5.4 below gives the current compiled failure semantics.

### 5.1 Statements 0–5 — validation, internal seed, destructive reset

1. execute strict mode;
2. require the second argument to equal exactly `1511505647`, otherwise throw the preserved Polish genealogy Error;
3. allocate an Array of four fixed strings;
4. initialize an accumulator to `2166136261>>>0`; for each string, `for...of` iterates characters, calls `character.charCodeAt(0)`, XORs, then `Math.imul(...,16777619)>>>0`; the measured internal seed is `976664901`;
5. execute `inputArray.length = 0` on the Array supplied by Dynamic 00. The Array identity is retained.

### 5.2 Statements 6–1155 — build, permute, and compact the packed table

Statements 6–1149 are exactly 1,144 `push` calls with 1,024 integer literals each: **1,171,456 JavaScript Numbers**, all 0..65,535. Statement 1150 pushes 51 additional Numbers, producing input length 1,171,507.

Statement 1151 defines:

```text
modulus    = 1,175,617
multiplier = 65,537
start      = (7919 + (internalSeed % 97) - (internalSeed % 97)) % modulus
           = 7,919
```

Both `%97` operations and the subtraction execute even though they cancel.

Statement 1152 appends exactly 1,175,617 uint32 values:

```js
(Math.imul(i + 1, 1103515245) + 12345 + internalSeed) >>> 0
```

The peak shared-Array length is therefore **2,347,124**.

Statement 1153 iterates every one of the 1,171,507 input values and computes:

```js
permuted = (start + ((i * 65537) % 1175617)) % 1175617;
```

then writes the input value into the corresponding tail position. Statement 1154 copies all 1,175,617 tail values back to indices 0..1,175,616. Statement 1155 truncates to length 1,175,617.

### 5.3 Statements 1156–1163 — reader, string decoder, resolver

The decoder cursor starts at zero, mutation flag false, and `registryBase=1,175,617`. The persistent low-table width is computed as `65537 + frameSize - frameSize`; both cancelling arithmetic operations execute.

The internal value scorer returns: finite Number `value|0`; non-finite Number 0; BigInt low 16 bits; String length; Array `length + frameSize - frameSize`; other object `Reflect.ownKeys(value).length`; and otherwise `String(value).length`.

For source index `i`, the exact 16-bit mask is:

```js
x = (Math.imul((i + 1) >>> 0, 40503) + 7919) >>> 0;
x ^= Math.imul(((i % 31) + 1) >>> 0, 31337) >>> 0;
x ^= ((frameSize << (i % 7)) |
      (frameSize >>> (32 - (i % 7)))) >>> 0;
return x & 65535;
```

`next16` advances the cursor, maps the source index through the same permutation used above, and returns `(array[permuted] ^ mask(index)) & 65535`. `next32` invokes `next16` exactly twice and combines `low | (high << 16)`, with unsigned coercion where the caller needs an unsigned body length.

The string decoder starts from `""`. For each chunk of at most 8,192 code units it saves `base=array.length`, pushes repeated `next16()` values into the same shared Array, allocates `array.slice(base,base+chunk)`, calls `String.fromCharCode(...slice)`, appends that string, then restores `array.length=base`.

The resolver has a special fixed ID that returns the shared runtime directly. For all other IDs it linearly scans the registry beginning at `registryBase` in steps of two (`id, exportsObject`). Unknown IDs throw exactly:

```text
Error("Niedzwiedz pomylil ksiege z dynastia: " + id)
```

### 5.4 Statement 1164 — inner function/class Proxy executor, current compiled execution

The decoded executor still appends exactly twelve frame cells with the same layout and executes its four opcode passes:

| offset | initial role |
|---:|---|
| 0 | target |
| 1 | `thisArg` or `newTarget` |
| 2 | args Array |
| 3 | construct boolean |
| 4 | program counter, starts 0 |
| 5 | accumulator/seed |
| 6 | `undefined`, later target/result |
| 7 | numeric tag/result scratch |
| 8..11 | four encoded opcodes derived from `seed^0..3` |

The seed, frame-width assertion, opcode order and single real call are unchanged from the decoded body: opcode 0 copies the target, opcode 1 folds argument-count/tag data, opcode 2 performs the only `Reflect.apply` or `Reflect.construct`, and opcode 3 folds the result score. On normal success the historical `array.length = base` truncation executes and the result is returned.

Current 1.4.0 compilation additionally wraps the reservation/body/normal-return region in a compensating `try/catch` injected by markers `EB`/`EC`. If any operation after the frame base is established throws — in particular the underlying opcode-2 call — the injected catch attempts to restore `array.length` to that invocation-entry base and rethrows the **same** error object.

Therefore the decoded source's lack of `try/finally` remains a historical textual property, but the old persistent twelve-cell exceptional frame is not part of current compiled behavior. This distinction is critical when reading old failure measurements or the decoded payload in isolation.

### 5.5 Statements 1165–1167 — module wrapper and five-operation shared runtime

Statement 1165 returns non-functions unchanged and wraps functions/classes in an inner Proxy whose `apply`/`construct` invoke the executor above.

Statement 1166 registers a module result by:

1. allocating `Object.create(null)`;
2. calling `Reflect.ownKeys(result)`;
3. incrementing an ordinal for every key and calculating tag exactly as:

   ```js
   (((moduleId.length + 1) * 65537)
      + (++ordinal * 31337)
      + key.length * 97) >>> 0
   ```
4. inner-wrapping function values; copying non-functions by identity;
5. freezing the clone;
6. pushing `[moduleId, frozenClone]` onto the shared Array.

Statement 1167 freezes the five-operation shared runtime, in own-key order: frame-open, frame-record, frame-result, frame-error, frame-close.

#### frame-open

Save current Array length as `base`; derive seed from `array[(site*193 + 29)%65537]`; append twelve cells:

```text
site, recordCounter=0, context, argumentsArray,
rollingSeed, checksum=0, base, undefined,
12, internalSeed=976664901, decoderCursor, registryBase
```

For every argument append `[value,index,(seed^index^site)&65535]`, and update checksum using the internal score and the third cell. Return `base`.

#### frame-record

Save scratch base. Read witness from `array[(recordSite + openSite + counter*17)%65537]`. Append:

```text
[value, recordSite, witness,
 (recordSite ^ witness ^ checksum) & 65535]
```

Increment counter. Update rolling state with `Math.imul((old ^ recordSite ^ witness)>>>0,16777619)>>>0`; update checksum with the fourth cell and score(value); return the original value at scratch base.

#### frame-result

Append `[value, rollingState, checksum]`, store that scratch base in frame[7], return `value`.

#### frame-error

Execute `frame[4] ^= 0xdeadbeef`, store the same error object in frame[7], return it.

#### frame-close

If the supplied base is not an integer, is `<registryBase`, or is `>=array.length`, return `undefined` without truncation. Otherwise compute `seal = frame[4] ^ frame[5] ^ frame[0]`. Once the mutation flag is true, execute the persistent low-table mutation:

```js
index = (seal >>> 0) % 65537;
array[index] = (array[index] ^ seal ^ frame[1]) >>> 0;
```

Then execute `array.length = base`. Nested frames were measured to preserve an outer frame while closing the inner one.

### 5.6 Statements 1168–1173 — module stream, Function interception, registration, scrub

Two `next16()` values must equal `0x5750` and `0x4f48`; mismatch throws exactly:

```text
Error("Las nie rozpoznaje wlasnej sprzecznej genealogii")
``` A third `next16()` gives module count, measured as 9; the code itself imposes no independent upper bound.

The shared runtime is also cloned/wrapped/frozen/registered as a registry pair, although the resolver's special branch returns the **original** shared-runtime object rather than that registered clone.

For each of exactly nine modules, the loader reads ID length (16 bits), body length (two 16-bit reads), ID string, and body string. It then constructs a function equivalent to `new Function(resolverParameterName, body)`, invokes it with the resolver, and clone/wrap/freeze/registers the returned export object.

Under current `main`, these Function constructions are intercepted by §3.9. Modules M0–M5, M7 and M8 pass through unchanged. M6 matches both source signatures; the Function arguments are rewritten so the compiled M6 body contains the injected raw `bowlSum` and uses it at the final-stir `u` site.

At the end of the nine-module stream the decoder cursor is 1,171,507. The code then loops across all 1,175,617 low cells and executes:

```js
array[i] = ((array[i] ^ Math.imul(i + 1, 2654435761))
          + (i % 31) + frameSize - frameSize) >>> 0;
```

The `+frameSize-frameSize` operations execute. Then `mutationFlag=true`. Twenty registry cells remain above the low-table base, so length is 1,175,637.

Statements 1174–1265 resolve 91 named properties through a helper equivalent to `resolver(moduleId)[propertyKey]`. Statement 1266 creates a 91-property object literal, freezes it, and returns it.

### 5.7 Dynamic-body identity under the current source transformer

The historical capture records exact **decoded pre-transform** module bodies. Those hashes remain useful as payload identities, not as universal compiled-body hashes:

| module | dynamic | decoded bytes | decoded-body SHA-256 | current compilation |
|---:|---:|---:|---|---|
| M0 | 02 | 21,731 | `21947a1e744ca182bf150f1ad660c22eda3a4b49569fc98826148fb09a0bc2d2` | unchanged |
| M1 | 03 | 32,525 | `34285e83a1e9d237f53b740e63532aecdb08db6f4bcb79171d693667bbd5d115` | unchanged |
| M2 | 04 | 32,254 | `d2409d00cf6d2316eda80301465cad803eb1c9f78c433645f499ee5abc8c8f2f` | unchanged |
| M3 | 05 | 86,642 | `11a6e75113562be761dd1c1e443130a8565571027d5e21120cc25015b4aceaa1` | unchanged |
| M4 | 06 | 374,323 | `174932102939afe58386177ba61102ceefb3814c5f4784f7b6d4ca8786f6ee83` | unchanged |
| M5 | 07 | 161,102 | `49a09b10fff798ba7965eb3f40180c719e737293d07695a388b4c257a9a7d073` | unchanged as module body; public MonthWeaving prototype is later detoured |
| M6 | 08 | 152,995 | `3ae2870ea230fe21e207dc390ccbdd2b8c9c8f8d1b03c8a9a276d779e1205be0` | transformed: raw `bowlSum` enters final `u` |
| M7 | 09 | 130,888 | `a9d1cc8c102402c64441cab567177bf117aaaa6c89fef5c2a4fbae61f3bc67b0` | unchanged fossil payload; public positive gates are shadowed |
| M8 | 10 | 181,770 | `ae17868eefa4eee20e526b307c1e0ed143b99de7536f00cd462a6a434ac09fb2` | unchanged hidden body; public year/gate/cache behavior is externally detoured |

Separately, Dynamic 00 and Dynamic 01 are themselves transformed generated programs as explained in §§3.9, 4 and 5. Their decoded-source hashes therefore must not be called current compiled-source hashes.

## 6. Proxy/transfer topology, transactionality, and carrier wrapping

The proxy architecture remains intentionally layered:

1. the frozen numeric-vault Proxy (§4.10);
2. the shared-Array Proxy (§4.11);
3. the bootstrap-only Function-constructor Proxy (§3.9);
4. inner function/class Proxies created by Dynamic 01 (§5.4–5.5);
5. outer public function/class Proxies created by Dynamic 00 (§4.12);
6. outside the sealed payload, the Update-13 Chinese firewall also contains a small Proxy-backed shadow desk, and the runtime-patch ledger supervises temporary prototype “costumes” used by the year-ceiling detours.

The two generated transfer primitives remain distinct:

- **full transfer:** four scratch cells, full scorer and type-specific reconstruction, used by ordinary outer public `apply`/`construct` paths;
- **short transfer:** two cells, limited scorer/WeakMap identity mechanism, persistent counter and four routes, used by the Function hand-off and impossible-normal Array-Proxy branches.

The sealed carrier census remains 72 functions/classes and 19 non-functions, hence 72 outer carrier Proxies. The historical instrumentation count of 84 inner module function/class Proxies remains a decoded/bootstrap measurement; the temporary Function Proxy is an additional bootstrap object.

What changed in the remediation series is failure ownership, not the existence of the machinery:

- Update 8 makes failed generated construction transactional for the shared arena and newly published WeakMap identities/counter;
- Update 15 adds a very-outer `apply` arena guard for host/random failures that occur before the older inner cleanup can run;
- the public year-ceiling prototype patches are separately owned by `runtime-patch-ledger.js`, which preserves nested/reentrant patch stacks and late external monkey patches.

A normal post-bootstrap call still conceptually traverses:

```text
public doorway detours / cache transaction (where applicable)
  -> outer generated Proxy
      -> full transfer / decorative randomness
      -> inner module Proxy
          -> four-pass executor with exceptional arena rollback
              -> decoded module body
                  -> ENTER / ASSIGN / RETURN / THROW / LEAVE runtime
```

The source-compilation Proxy is absent from ordinary calls after bootstrap. The spaghetti mechanisms are retained; state that used to leak from failed calls is now rolled back by compensating wrappers.

## 7. Public carrier map — all 91 slots

The following slot ordering is exact. M0 and M7 have no direct carriers.

| slot | export | module |
|---:|---|---|
| 0 | `M` | M6 |
| 1 | `FOUNDATION_JDN` | M6 |
| 2 | `DELIVERY_GREGORIAN_YEAR` | M6 |
| 3 | `DELIVERY_GREGORIAN_MONTH` | M6 |
| 4 | `DELIVERY_GREGORIAN_DAY` | M6 |
| 5 | `DELIVERY_JDN` | M6 |
| 6 | `DELIVERY_DISTANCE` | M6 |
| 7 | `Stones` | M6 |
| 8 | `ResponseCycle` | M6 |
| 9 | `SauceResult` | M6 |
| 10 | `STONES` | M6 |
| 11 | `store` | M6 |
| 12 | `dayNumber` | M6 |
| 13 | `makeSauce` | M6 |
| 14 | `makeSauceUncached` | M6 |
| 15 | `GREGORIAN_EPOCH_JDN` | M2 |
| 16 | `isGregorianLeapYear` | M2 |
| 17 | `daysInGregorianMonth` | M2 |
| 18 | `validateGregorian` | M2 |
| 19 | `gregorianToJdn` | M2 |
| 20 | `coerceGregorian` | M2 |
| 21 | `localToday` | M2 |
| 22 | `factorial` | M5 |
| 23 | `comb` | M5 |
| 24 | `fallingFactorial` | M5 |
| 25 | `unrankLexicographicPermutation` | M5 |
| 26 | `unrankPartialPermutation` | M5 |
| 27 | `boundedCompositionCount` | M5 |
| 28 | `unrankBoundedComposition` | M5 |
| 29 | `unrankPositiveCompositionWithRequiredBoundary` | M5 |
| 30 | `MonthWeavingCounter` | M5 |
| 31 | `GregorianDate` | M1 |
| 32 | `PastafariDate` | M1 |
| 33 | `YearBounds` | M1 |
| 34 | `YearStructure` | M1 |
| 35 | `CUTLET_NAMES` | M8 |
| 36 | `MONTH_NAMES` | M8 |
| 37 | `GateIndex` | M8 |
| 38 | `PastafariCalendar` | M8 |
| 39 | `JulianDate` | M3 |
| 40 | `HebrewDate` | M3 |
| 41 | `IslamicDate` | M3 |
| 42 | `IslamicCivilDate` | M3 |
| 43 | `IslamicUmmAlQuraDate` | M3 |
| 44 | `SolarHijriDate` | M3 |
| 45 | `ChineseDate` | M3 |
| 46 | `HinduDate` | M3 |
| 47 | `OldHinduSolarDate` | M3 |
| 48 | `OldHinduLunarDate` | M3 |
| 49 | `SakaDate` | M3 |
| 50 | `ThaiBuddhistDate` | M3 |
| 51 | `EthiopicDate` | M3 |
| 52 | `CopticDate` | M3 |
| 53 | `JapaneseImperialDate` | M3 |
| 54 | `MinguoDate` | M3 |
| 55 | `BahaiDate` | M3 |
| 56 | `MayaLongCountDate` | M3 |
| 57 | `JULIAN_EPOCH_JDN` | M4 |
| 58 | `HEBREW_EPOCH_JDN` | M4 |
| 59 | `ISLAMIC_EPOCH_JDN` | M4 |
| 60 | `PERSIAN_EPOCH_JDN` | M4 |
| 61 | `COPTIC_EPOCH_JDN` | M4 |
| 62 | `ETHIOPIC_EPOCH_JDN` | M4 |
| 63 | `UNIX_EPOCH_JDN` | M4 |
| 64 | `MAYA_GMT_CORRELATION` | M4 |
| 65 | `parseHebrewGregorianDate` | M4 |
| 66 | `isJulianLeapYear` | M4 |
| 67 | `daysInJulianMonth` | M4 |
| 68 | `julianToJdn` | M4 |
| 69 | `isHebrewLeapYear` | M4 |
| 70 | `daysInHebrewYear` | M4 |
| 71 | `daysInHebrewMonth` | M4 |
| 72 | `hebrewToJdn` | M4 |
| 73 | `isIslamicCivilLeapYear` | M4 |
| 74 | `daysInIslamicCivilMonth` | M4 |
| 75 | `islamicCivilToJdn` | M4 |
| 76 | `islamicToJdn` | M4 |
| 77 | `solarHijriArithmeticToJdn` | M4 |
| 78 | `solarHijriToJdn` | M4 |
| 79 | `chineseToJdn` | M4 |
| 80 | `hinduToJdn` | M4 |
| 81 | `sakaToJdn` | M4 |
| 82 | `thaiBuddhistToJdn` | M4 |
| 83 | `ethiopicToJdn` | M4 |
| 84 | `copticToJdn` | M4 |
| 85 | `japaneseImperialToJdn` | M4 |
| 86 | `minguoToJdn` | M4 |
| 87 | `bahaiToJdn` | M4 |
| 88 | `mayaLongCountToJdn` | M4 |
| 89 | `calendarObjectToDate` | M4 |
| 90 | `calendarDateToJdn` | M4 |


## 8. M0 — exact BigInt primitives

M0 is decoded body `Dynamic 02`, SHA-256 `21947a1e744ca182bf150f1ad660c22eda3a4b49569fc98826148fb09a0bc2d2`. It has no decoded-module dependencies and no mutable import-time state beyond function definitions. Its six-function export object is frozen.

### 8.1 `asBigInt(value,label="הערך")` — ENTER 1009

The branch order is literal:

1. if `typeof value === "bigint"`, return the same primitive;
2. else if `typeof value === "number" && Number.isSafeInteger(value)`, return `BigInt(value)`;
3. otherwise throw `TypeError` stating that the labelled value must be a bigint or safe integer.

There is no string coercion, no preliminary `Number(value)`, and no acceptance of unsafe integer Numbers. The function uses ritual ENTER/RETURN/THROW/LEAVE but no ritual ASSIGN on the successful returned value.

### 8.2 `floorDiv(dividend,divisor)` — ENTER 1010

Require `divisor>0n`; otherwise throw `RangeError`.

Site 4001 computes JavaScript BigInt truncating quotient:

```js
q = dividend / divisor
```

Site 4002 computes:

```js
r = dividend % divisor
```

If `r<0n`, site 4003 executes the correction through ritual assignment:

```js
q -= ASSIGN(frame, 4003, 1n)
```

Return `q`. Thus negative dividends obtain mathematical floor division even though native BigInt division truncates toward zero.

### 8.3 `modulo(value,modulus)` — ENTER 1011

Require `modulus>0n`; otherwise throw `RangeError`. Site 4004 computes `r=value%modulus`. Return `r` when nonnegative, otherwise `r+modulus`.

### 8.4 `absBigInt(value)` — ENTER 1012

There is no coercion inside this helper. Execute exactly:

```js
value < 0n ? -value : value
```

### 8.5 BigInt comparator — ENTER 1013

There is no coercion. Execute exactly:

```js
a < b ? -1 : a > b ? 1 : 0
```

### 8.6 Exact safe-Number conversion — ENTER 1014

Site 4005 executes `numberValue=Number(value)`. Accept only when both:

```js
Number.isSafeInteger(numberValue)
BigInt(numberValue) === value
```

hold. Otherwise throw `RangeError` with the supplied label. The round-trip condition rejects integral-looking conversions that lost BigInt precision.

## 9. M1 — frozen core records

M1 is decoded body `Dynamic 03`, SHA-256 `34285e83a1e9d237f53b740e63532aecdb08db6f4bcb79171d693667bbd5d115`. It depends on M0 and exposes four direct public carrier values.

### 9.1 `GregorianDate` — ENTER 1015

Site 4006 stores `year=asBigInt(year,"השנה הגריגוריאנית")`. Month and day must each satisfy `Number.isInteger`; sites 4007/4008 store them. The constructor does **not** check month 1..12, legal day within month, or leap-day validity. It then `Object.freeze(this)`. Calendar validity is deferred to M2.

### 9.2 `PastafariDate` — ENTER 1016; methods ENTER 1017/1018

Site 4009 normalizes `year=asBigInt(year,"מספר השנה הפסטפרית")`. Sites 4010..4013 store `cutletName`, `dayInCutlet`, `monthName`, `dayInMonth` verbatim without type/range validation. Then freeze the instance.

`asTuple()` (ENTER 1017) allocates and returns a **new, non-frozen** five-element Array:

```js
[
  this.year,
  this.cutletName,
  this.dayInCutlet,
  this.monthName,
  this.dayInMonth
]
```

`toJSON()` (ENTER 1018) allocates a new plain object; `year` is converted with `.toString()`, the other four stored values are copied unchanged.

### 9.3 `YearBounds` — ENTER 1019; getters ENTER 1020..1023

Sites 4014..4016 normalize year number, opening gate, and closing gate with M0 BigInt normalization. Site 4017 spread-clones the supplied gate-index Array, freezes the clone, and the constructor freezes the instance.

It does not itself verify opening<closing, monotonicity, agreement of first/last indices with gate positions, or minimum index count.

The four separately ritualized getters compute on every access:

```js
firstDay = openingGate + 1n       // ENTER 1020
lastDay  = closingGate            // ENTER 1021
length   = Number(closingGate - openingGate) // ENTER 1022
gapCount = gateIndices.length - 1 // ENTER 1023
```

`length` uses direct `Number(...)`, not M0's exact safe-Number conversion.

### 9.4 `YearStructure` — ENTER 1024

The `year` object is stored by reference (site 4018). Sites 4019..4023 independently spread-clone and freeze:

```text
cutletGapCounts
cutletNames
monthLengths
monthWeaving
monthNames
```

Then the instance is frozen. The constructor does not cross-check cutlet-name count, month-length sum, weaving multiplicities, or month-ID range; M8 is responsible for supplying consistent values.

## 10. M2 — Gregorian conversion layer

M2 is decoded body `Dynamic 04`, SHA-256 `d2409d00cf6d2316eda80301465cad803eb1c9f78c433645f499ee5abc8c8f2f`. It depends on M0 and M1 and exposes seven direct public values.

The epoch literal is:

```js
GREGORIAN_EPOCH_JDN = 1721426n
```

### 10.1 `isGregorianLeapYear` — ENTER 1025

Site 4024 normalizes `year=asBigInt(input,"השנה")`. Return:

```js
year % 4n === 0n &&
(
  year % 100n !== 0n ||
  year % 400n === 0n
)
```

There is no positive-year restriction.

### 10.2 `daysInGregorianMonth` — ENTER 1026

Month must be a Number integer in 1..12. For month 2, call the leap-year helper and return 29 or 28. For every non-February call the implementation allocates a fresh literal `[4,6,9,11]`, calls `.includes(month)`, and returns 30 when true or 31 otherwise.

### 10.3 `validateGregorian` — ENTER 1027

Require `date instanceof GregorianDate`; duck-typed objects are rejected. Site 4025 calls `daysInGregorianMonth(date.year,date.month)`. Require `1<=date.day<=monthLength`; invalid fields throw `RangeError`. Successful completion has no meaningful explicit return value.

### 10.4 Days before year — ENTER 1028

Site 4026 computes `y1=year-1n`. Return:

```js
365n*y1
+ floorDiv(y1, 4n)
- floorDiv(y1, 100n)
+ floorDiv(y1, 400n)
```

The custom floor division is therefore used for negative/proleptic years.

### 10.5 Days before month — ENTER 1029

Every call allocates at site 4027:

```js
[0,31,59,90,120,151,181,212,243,273,304,334]
```

Site 4028 reads `days=offsets[month-1]`. If `month>2 && isGregorianLeapYear(year)`, site 4029 increments through ritual assignment `days += ASSIGN(frame,4029,1)`. Return `BigInt(days)`.

### 10.6 `gregorianToJdn` — ENTER 1030

Site 4030 executes `date=coerceGregorian(input)`, then calls `validateGregorian(date)`. Return exactly:

```js
GREGORIAN_EPOCH_JDN
+ daysBeforeYear(date.year)
+ daysBeforeMonth(date.year, date.month)
+ BigInt(date.day - 1)
```

### 10.7 `coerceGregorian` — ENTER 1031

If input is already `GregorianDate`, return the same object.

If input is native `Date`:

1. call `getTime()`;
2. reject `NaN` with `RangeError`;
3. allocate a new `GregorianDate` from **local-time** accessors `getFullYear()`, `getMonth()+1`, `getDate()`.

No UTC accessors are used. Every other input type throws `TypeError`.

### 10.8 `localToday` — ENTER 1032

Site 4031 allocates `new Date()`. It then allocates a new `GregorianDate` using the same local-time accessors. There is no explicit midnight normalization or separate timezone conversion.


## 11. M3 — all 18 auxiliary date-record classes

M3 body identity: **86,642 bytes**, SHA-256 `11a6e75113562be761dd1c1e443130a8565571027d5e21120cc25015b4aceaa1`. It depends on M0 and the shared ritual runtime. The module exposes exactly 18 classes in carrier slots 39..56.

M3 intentionally separates **container construction** from **calendar validity**. Except where stated below, constructors normalize representation and freeze the instance but do not prove that the represented date actually exists. The corresponding M4 converter performs the later range/calendar checks.

### 11.1 Internal integer validator — ENTER 1033

For each Number field the helper executes:

1. `Number.isInteger(value)`.
2. If false, throw `TypeError` whose Hebrew message identifies the supplied label and says it must be an integer.
3. Return the same Number primitive; there is no coercion and no range check.

### 11.2 Internal finalizer — ENTER 1034

The shared finalizer executes, in order:

1. at site 4032, `instance.calendar = calendarLiteral`;
2. `Object.freeze(instance)`;
3. return the same instance through normal ritual return/leave handling.

The finalizer does not deep-freeze any nested mutable value, although M3 fields are primitives in normal construction.

### 11.3 `JulianDate` — ENTER 1035

Execution order:

1. site 4033: `year = asBigInt(year, ...)`;
2. site 4034: integer-validate `month`;
3. site 4035: integer-validate `day`;
4. store those three fields;
5. finalize with calendar tag `"julian"`.

No month/day range is checked here.

### 11.4 `HebrewDate` — ENTER 1036

Sites 4036..4038 perform the same year/month/day operations as `JulianDate`; the final tag is `"hebrew"`. No calendar-specific range is checked in the constructor.

### 11.5 `IslamicDate` — ENTER 1037

Signature behavior is equivalent to an options object `{ variant } = {}`; there is no implicit variant default.

1. sites 4039..4041 normalize year and integer-validate month/day;
2. site 4042 requires `variant` to be exactly `"civil"` or `"umalqura"`; otherwise `RangeError`;
3. store the variant;
4. finalize with tag `"islamic"`.

### 11.6 `IslamicCivilDate` — ENTER 1038

Calls the `IslamicDate` constructor with the supplied year/month/day and forced options `{ variant: "civil" }`. The base constructor performs all field writes and freezing.

### 11.7 `IslamicUmmAlQuraDate` — ENTER 1039

Calls the `IslamicDate` constructor with forced `{ variant: "umalqura" }`.

### 11.8 `SolarHijriDate` — ENTER 1040

Options behave as `{ variant = "official" } = {}`.

1. sites 4043..4045 normalize year and integer-validate month/day;
2. site 4046 requires the exact string `"official"` or `"arithmetic-2820"`; otherwise `RangeError`;
3. store variant;
4. finalize with tag `"solar-hijri"`.

### 11.9 `ChineseDate` — ENTER 1041

Options behave as `{ leapMonth = false } = {}`.

1. site 4047: `relatedYear = asBigInt(relatedYear, ...)`;
2. sites 4048..4049: integer-validate month/day;
3. site 4050: `leapMonth = Boolean(leapMonth)`;
4. finalize with tag `"chinese"`.

No 1..12 / 1..30 range check occurs here.

### 11.10 `HinduDate` — ENTER 1042

Options behave as `{ scheme, leapMonth = false } = {}`; `scheme` has no default.

1. normalize year to BigInt;
2. integer-validate month/day;
3. require `scheme` to be exactly `"old-solar"` or `"old-lunar"`;
4. convert `leapMonth` with `Boolean(...)`;
5. sites 4051..4055 store these values through ritual assignment;
6. finalize with tag `"hindu"`.

### 11.11 `OldHinduSolarDate` — ENTER 1043

Delegates to `HinduDate` with forced `scheme: "old-solar"`. Any caller leap-month argument is not part of the solar scheme's public meaning; the base record still contains the normalized boolean field supplied by the delegating construction path.

### 11.12 `OldHinduLunarDate` — ENTER 1044

Delegates to `HinduDate` with forced `scheme: "old-lunar"` and the supplied leap-month flag.

### 11.13 `SakaDate` — ENTER 1045

Sites 4056..4058 normalize BigInt year and integer month/day, then finalize with tag `"saka"`. Range checking is deferred to M4.

### 11.14 `ThaiBuddhistDate` — ENTER 1046

Sites 4059..4061 normalize BigInt year and integer month/day, then finalize with tag `"thai-buddhist"`.

### 11.15 `EthiopicDate` — ENTER 1047

Sites 4062..4064 normalize BigInt year and integer month/day, then finalize with tag `"ethiopic"`.

### 11.16 `CopticDate` — ENTER 1048

Sites 4065..4067 normalize BigInt year and integer month/day, then finalize with tag `"coptic"`.

### 11.17 `JapaneseImperialDate` — ENTER 1049

The era field is the only M3 text field with dedicated constructor validation:

1. require `typeof era === "string"`;
2. require `era.trim() !== ""`;
3. site 4068 stores `era.trim()` **without lowercasing it**;
4. site 4069 BigInt-normalizes era year;
5. sites 4070..4071 integer-validate month/day;
6. finalize with tag `"japanese-imperial"`.

Era recognition and exact start/end-date validation occur later in M4.

### 11.18 `MinguoDate` — ENTER 1050

Sites 4072..4074 normalize BigInt year and integer month/day, then finalize with tag `"minguo"`. The constructor does not require a positive year.

### 11.19 `BahaiDate` — ENTER 1051

Options behave as `{ variant = "tehran-equinox" } = {}`. Accepted variants are exactly:

```text
tehran-equinox
western-arithmetic
```

Execution:

1. site 4075: BigInt-normalize year;
2. site 4076:
   - if `typeof month === "string"`, store `month.trim().toLowerCase()`;
   - otherwise invoke the integer validator and store the Number;
3. site 4077: integer-validate day;
4. site 4078: validate/store the variant;
5. finalize with tag `"bahai"`.

An empty month string remains possible after trimming; the constructor does not reject it. M4 rejects unsupported string month spellings during conversion.

### 11.20 `MayaLongCountDate` — ENTER 1052

Options behave as `{ correlation = 584283 } = {}`. The default is a Number literal and is subsequently BigInt-normalized.

Sites 4079..4084 perform, in order:

```text
baktun      -> BigInt
katun       -> integer Number
tun         -> integer Number
uinal       -> integer Number
kin         -> integer Number
correlation -> BigInt
```

The lower-place mixed-radix ranges are not checked here. The record is finalized with tag `"maya-long-count"`.

## 12. M4 — complete auxiliary calendar conversion subsystem

M4 body identity: **374,323 bytes**, SHA-256 `174932102939afe58386177ba61102ceefb3814c5f4784f7b6d4ca8786f6ee83`. It depends on M0, M2, M1, and M3 and exports exactly **34 values**: eight constants and 26 functions in carrier slots 57..90.

This section follows the decoded body rather than a readable/fast converter. Where another implementation uses a cleaner or astronomically more conventional expression, the behavior below remains the authoritative decoded behavior.

### 12.1 Public epoch/correlation constants

The exact exported BigInt literals are:

```js
JULIAN_EPOCH_JDN     = 1721424n
HEBREW_EPOCH_JDN     = 347996n
ISLAMIC_EPOCH_JDN    = 1948439n
PERSIAN_EPOCH_JDN    = 1948321n
COPTIC_EPOCH_JDN     = 1825030n
ETHIOPIC_EPOCH_JDN   = 1724221n
UNIX_EPOCH_JDN       = 2440588n
MAYA_GMT_CORRELATION = 584283n
```

### 12.2 Import-time private state

Before public conversion calls, M4 evaluates module-scope setup code.

It allocates two private Maps and passes each Map object to `Object.freeze`:

- a Gregorian-month-name Map containing the twelve Hebrew month names `ינואר`, `פברואר`, `מרץ`, `אפריל`, `מאי`, `יוני`, `יולי`, `אוגוסט`, `ספטמבר`, `אוקטובר`, `נובמבר`, `דצמבר`, mapped to 1..12;
- a digit Map mapping Arabic-Indic `٠١٢٣٤٥٦٧٨٩` and Persian `۰۱۲۳۴۵۶۷۸۹` digit characters to ASCII `0123456789`.

`Object.freeze(new Map(...))` does not disable `Map.prototype.set/delete/clear`, but these references remain private to M4.

M4 also allocates the private Japanese era Maps described in 12.20 and the three 24-element Bahá'í coefficient Arrays described in 12.22. It builds a private rational-arithmetic layer for Old Hindu conversion. During module evaluation it actually executes:

```js
julianToJdn(new JulianDate(-3101, 2, 18))
```

and combines that result with the Gregorian epoch to derive the private Old-Hindu epoch offset `-1132959n`. This is executed module-initialization work, not a prewritten constant substitution.

### 12.3 Digit normalization — ENTER 1053, callback ENTER 1054

For any parser input string the helper executes exactly:

```js
[...input]
  .map(character => digitMap.get(character) ?? character)
  .join("")
```

Consequences that are part of execution:

1. string spread allocates one Array of Unicode code points;
2. `.map()` allocates a second Array;
3. every callback invocation opens the shared ritual frame ENTER 1054 with `arguments = null`;
4. `.join("")` allocates the result string.

This sequence executes even when no character is translated.

### 12.4 Shared positive-integer range validators — ENTER 1055 and ENTER 1056

There are two distinct helper functions with the same essential predicate. Each executes:

```text
Number.isInteger(value)
and
1 <= value <= max
```

Failure throws a `RangeError` containing the label, maximum and received value. Keeping the helpers distinct matters for ritual ENTER/site execution even though their ordinary mathematical predicate is equivalent.

### 12.5 BigInt-to-safe-Number bridge — ENTER 1057

The helper executes the nested conversion:

```js
bigintToSafeNumber(
  asBigInt(value, label),
  label
)
```

Thus a non-BigInt safe integer can first be converted to BigInt by M0 and is then converted back to Number only after safe-range and exact-round-trip validation. Intl-backed paths use this bridge for years/JDN distances.

### 12.6 `parseHebrewGregorianDate` — ENTER 1058, carrier slot 65

The complete parser path is:

1. require `typeof input === "string"`; otherwise `TypeError`;
2. site 4085:
   - call the digit-normalization helper;
   - replace Hebrew maqaf, en dash and em dash variants with ASCII `-`;
   - collapse whitespace with `.replace(/\s+/gu," ")`;
   - `.trim()`;
3. site 4086 apply one anchored regex accepting:
   - one- or two-digit day;
   - whitespace;
   - optional Hebrew preposition `ב` plus a Hebrew-letter month token that may contain geresh/gershayim or ASCII quote characters;
   - a signed decimal year;
   - optional era suffix matching the implementation's BCE/CE Hebrew forms (`לפנה...ס`, `לסה...נ`, or `לספירה` punctuation variants);
4. if no match, throw `RangeError` with an example equivalent to `5 באוגוסט 2026`;
5. site 4087: `day = Number(match[1])`;
6. site 4088: `monthText = match[2].replace(/[״"׳']/gu,"")`;
7. site 4089: if `monthText` begins with `ב` **and** the suffix after that character is a key in the private month Map, remove only that leading character;
8. site 4090: lookup the resulting month text; unknown month throws;
9. site 4091: `parsedYear = BigInt(match[3])`;
10. site 4092: `eraSuffix = match[4] ?? ""`;
11. site 4093:

```js
year = eraSuffix.startsWith("לפנה")
  ? 1n - parsedYear
  : parsedYear
```

so 1 BCE becomes astronomical year 0 and 44 BCE becomes -43;
12. site 4094: allocate `new GregorianDate(year,month,day)`;
13. call `gregorianToJdn(theNewGregorianDate)` solely for validation and discard the returned JDN;
14. return the newly allocated `GregorianDate`.

The validation conversion therefore performs its entire Gregorian computation even though only the record is returned.

### 12.7 Julian family — ENTER 1059..1061, slots 66..68

`isJulianLeapYear` (ENTER 1059) executes:

```js
modulo(asBigInt(year, ...), 4n) === 0n
```

`daysInJulianMonth` (ENTER 1060):

1. validates month in 1..12;
2. for February calls the leap function;
3. for every other month allocates fresh `[4,6,9,11]`;
4. `.includes(month)` selects 30 or 31.

`julianToJdn` (ENTER 1061):

1. require `instanceof JulianDate`;
2. site 4095 compute selected month length and validate day;
3. site 4096: `y1 = year - 1n`;
4. site 4097 allocate `[0,31,59,90,120,151,181,212,243,273,304,334]`;
5. site 4098 compute:

```text
JULIAN_EPOCH_JDN
+ 365n*y1
+ floorDiv(y1,4n)
+ BigInt(offset[month-1] + day - 1)
```

6. if `month>2 && isJulianLeapYear(year)`, site 4099 performs a ritual assignment adding `1n`;
7. return the JDN.

### 12.8 Hebrew family — ENTER 1062..1068, slots 69..72

`isHebrewLeapYear` (1062):

```js
modulo(7n*year + 1n, 19n) < 7n
```

after year normalization.

The private elapsed-month helper (ENTER 1063) computes:

```text
a = floorDiv(235*y - 234, 19)
b = 12084 + 13753*a
c = 29*a + floorDiv(b,25920)
if modulo(3*(c+1),7) < 3:
    c = c + 1
return c
```

The private postponement/adjustment helper (ENTER 1064) calls the elapsed helper three times, for `year-1`, `year`, and `year+1`, and returns:

```text
2 if next-current == 356
1 if current-previous == 382
0 otherwise
```

The private Hebrew-year-start helper (ENTER 1065) adds:

```text
HEBREW_EPOCH_JDN + elapsed(year) + adjustment(year) + 2
```

`daysInHebrewYear` (ENTER 1066) recomputes year starts for `year+1` and `year`, subtracts, and applies plain `Number(...)` to the BigInt difference without an additional safe-range check.

`daysInHebrewMonth` (ENTER 1067):

1. normalize year and determine whether it is leap;
2. permit months 1..13 in a leap year, otherwise 1..12;
3. allocate fresh `[2,4,6,10,13]`; any included month has 29 days;
4. non-leap month 12 is 29;
5. recompute full Hebrew year length;
6. month 8 is 29 unless `yearLength % 10 === 5`;
7. month 9 is 29 when `yearLength % 10 === 3`;
8. all remaining legal months are 30.

`hebrewToJdn` (ENTER 1068):

1. require `HebrewDate`;
2. require year >= 1;
3. validate month and day through the helpers above;
4. initialize result to `hebrewYearStart(year) + BigInt(day-1)`;
5. if target month < 7:
   - loop from month 7 through the last month of the year, calling `daysInHebrewMonth` on **every** iteration and adding its result;
   - then loop months 1 through targetMonth-1 the same way;
6. otherwise loop months 7 through targetMonth-1;
7. return the accumulated JDN.

The repeated helper calls mean year-length and leap arithmetic are recomputed inside the loops rather than precomputed once.

### 12.9 Islamic civil family — ENTER 1069..1071, slots 73..75

`isIslamicCivilLeapYear` (1069):

```js
modulo(11n*year + 14n, 30n) < 11n
```

`daysInIslamicCivilMonth` (ENTER 1070): month must be 1..12; month 12 is 30 on leap years and 29 otherwise; other odd months are 30 and even months 29.

`islamicCivilToJdn` (ENTER 1071):

1. require `IslamicDate` whose variant is `"civil"`;
2. require year >= 1;
3. validate month/day;
4. site 4122 evaluate `Math.ceil(29.5*(month-1))` as Number and only then convert that result to BigInt;
5. return the decoded expression:

```js
ISLAMIC_EPOCH_JDN
+ BigInt(day)
+ BigInt(Math.ceil(29.5*(month-1)))
+ 354n*(year-1n)
+ floorDiv(3n + 11n*year, 30n)
```

The apparent epoch/day convention above is recorded exactly as decoded; this document does not silently rewrite it to a cleaner formula.

### 12.10 Host-Intl candidate formatting — ENTER 1072 and callback ENTER 1073

For one candidate JDN the private helper:

1. subtracts `UNIX_EPOCH_JDN`;
2. bridges the day distance to a safe Number;
3. creates a native timestamp at **noon** for that Gregorian-relative day;
4. allocates `new Date(timestamp)`;
5. allocates a **new** `Intl.DateTimeFormat` for the requested calendar/timeZone with numeric year/month/day fields;
6. calls `.resolvedOptions().calendar` and checks that the requested calendar was actually selected;
7. calls `.formatToParts(date)`;
8. calls `.map(...)`; every callback is ENTER 1073 and allocates a fresh `[type,value]` pair;
9. calls `Object.fromEntries(...)` and returns the resulting plain object.

There is **no formatter cache** in the authoritative decoded body. This is deliberately different from later readable helpers that cache formatters.

### 12.11 Generic inclusive Intl day search — ENTER 1074

Inputs are first/last JDN, requested year/month/day, calendar identifier, time zone, and optional leap-month flag.

1. bridge requested year to safe Number;
2. validate month 1..13 and day 1..31;
3. loop every candidate JDN from first through last **inclusive**, one day at a time;
4. for each candidate call ENTER 1072, thereby allocating Date/DateTimeFormat/parts/pair arrays/object as above;
5. derive `formattedYear = Number(parts.relatedYear ?? parts.year)`;
6. `monthText = parts.month ?? ""`;
7. `formattedMonth = Number.parseInt(monthText,10)`;
8. `formattedLeap = /bis/i.test(monthText)`;
9. `formattedDay = Number(parts.day)`;
10. compare year, month, day and requested leap flag; on exact match return candidate JDN;
11. if loop ends without match, throw `RangeError`.

This helper makes the relevant authoritative paths dependent on the host's `Intl`/ICU calendar data and supported proleptic range.

### 12.12 Umm al-Qura — ENTER 1075 and `islamicToJdn` ENTER 1076, slot 76

The Umm al-Qura helper:

1. site 4137 bridges Islamic year to safe Number;
2. site 4138 computes:

```js
approxGregorianYear = Math.floor(
  621.5774 + (yearNumber-1)*0.970224
)
```

3. sites 4139 and 4140 allocate/convert Gregorian bounds:

```text
1 January of approxGregorianYear - 2
31 December of approxGregorianYear + 3
```

4. call the inclusive Intl search with calendar `"islamic-umalqura"` and time zone `"Asia/Riyadh"`.

`islamicToJdn` requires `IslamicDate`; exact variant `"civil"` calls the arithmetic converter; the other constructor-valid variant (`"umalqura"`) calls the helper above.

### 12.13 Solar Hijri arithmetic — ENTER 1077 with leap callback ENTER 1078, slot 77

Require `SolarHijriDate`; validate month 1..12. On **every conversion call**, site 4143 allocates a new arrow function for leap calculation; invoking it opens ENTER 1078.

Inside the arrow:

```js
epBase = year - (year >= 0n ? 474n : 473n)
epYear = 474n + modulo(epBase,2820n)
leap = modulo((epYear+38n)*682n,2816n) < 682n
```

Month length is 31 for months 1..6, 30 for 7..11, and for month 12 is 30 if leap else 29. Validate day.

The main function then recomputes values already used in the arrow:

```text
site 4145 epBase
site 4146 epYear
```

Site 4147 computes month offset in Number arithmetic first:

```js
month <= 7
  ? BigInt((month-1)*31)
  : BigInt((month-1)*30 + 6)
```

Return:

```js
BigInt(day)
+ monthOffset
+ floorDiv(epYear*682n - 110n,2816n)
+ (epYear-1n)*365n
+ floorDiv(epBase,2820n)*1029983n
+ PERSIAN_EPOCH_JDN
- 1n
```

The decoded branch has the known negative-year edge described in Section 26; it is not normalized here.

### 12.14 Official Persian — ENTER 1079 and `solarHijriToJdn` ENTER 1080, slot 78

Official helper:

1. site 4148 bridge Persian year to safe Number;
2. sites 4149/4150 allocate and convert Gregorian bounds:

```text
1 January of yearNumber + 620
31 December of yearNumber + 623
```

3. call generic Intl search with calendar `"persian"`, time zone `"Asia/Tehran"`.

`solarHijriToJdn` requires a `SolarHijriDate`; exact variant `"arithmetic-2820"` selects ENTER 1077, while the other constructor-valid variant `"official"` selects ENTER 1079.

### 12.15 Chinese — ENTER 1081, slot 79

1. require `ChineseDate`;
2. site 4151 bridge `relatedYear` to safe Number;
3. validate month 1..12, day 1..30;
4. site 4152 allocate/convert Gregorian `relatedYear-01-01`;
5. site 4153 allocate/convert Gregorian `(relatedYear+1)-03-31`;
6. call inclusive Intl search with calendar `"chinese"`, time zone `"Asia/Shanghai"`, and the requested leap-month boolean;
7. leap month is recognized solely through `/bis/i` on Intl's formatted month text.

This directly delegates deep proleptic Chinese behavior to the host ICU implementation.

### 12.16 Old-Hindu private rational subsystem — ENTER 1082..1090

The authoritative body implements rational arithmetic itself rather than using floating-point approximations.

**GCD — ENTER 1082.** Sites 4154/4155 take absolute values. While `second !== 0n`, allocate a new two-element Array `[second, first % second]`, pass it through ASSIGN site 4156, destructuring-assign back to `first,second`, and continue. Return `first`.

**Reducer — ENTER 1083.** Default denominator is `1n`. Denominator 0 throws `RangeError` (`מכנה אפס`). If denominator is negative, normalize signs. Compute GCD and return a new mutable plain object `{ n: numerator/g, d: denominator/g }`.

**ENTER 1084..1090** implement, respectively:

```text
1084 rational addition
ENTER 1085 rational subtraction
ENTER 1086 rational multiplication
ENTER 1087 rational multiplied by BigInt
ENTER 1088 rational division
ENTER 1089 floor = floorDiv(n,d)
ENTER 1090 ceil  = -floorDiv(-n,d)
```

Each arithmetic operation creates a freshly reduced rational object rather than mutating an operand.

At import time the module creates/reduces constants equivalent to:

```text
solarYear  = 1577917500 / 4320000
solarMonth = solarYear / 12
lunarMonth = 1577917500 / 53433336
lunarDay   = lunarMonth / 30
```

and performs the Julian conversion described in 12.2 to obtain the epoch offset.

### 12.17 Old Hindu Solar — ENTER 1091

1. validate month 1..12 and day 1..31;
2. construct/reduce the rational expression in this order through the rational helpers:

```text
epochOffset
+ solarYear * year
+ solarMonth * (month-1)
+ rational(day)
- 5/4
```

3. apply rational ceil;
4. add `GREGORIAN_EPOCH_JDN - 1n`;
5. return BigInt JDN.

The expression uses `day`, not `day-1`, before subtracting `5/4`.

### 12.18 Old Hindu Lunar — ENTER 1092

1. validate month 1..12 and day 1..30;
2. compute rational:

```text
A = solarMonth * (12*year - 1)
B = lunarMonth * (floor(A/lunarMonth) + 1)
C = ceil((B-A)/(solarMonth-lunarMonth))
```

3. choose:

```js
adjustedMonth = leapMonth || C > BigInt(month)
  ? month - 1
  : month
```

4. construct/reduce:

```text
epochOffset
+ B
+ lunarMonth * adjustedMonth
+ lunarDay * (day-1)
- 1/4
```

5. ceil the rational;
6. add `GREGORIAN_EPOCH_JDN - 1n`;
7. return JDN.

### 12.19 `hinduToJdn` — ENTER 1093, slot 80

Require `HinduDate`. Exact `scheme === "old-solar"` calls ENTER 1091; exact `"old-lunar"` calls ENTER 1092. M3 guarantees no third constructor-valid scheme.

### 12.20 Saka — ENTER 1094, reduce callback ENTER 1095, slot 81

1. require `SakaDate`;
2. require year >= 1 and month 1..12;
3. compute Gregorian year `year + 78n`;
4. call Gregorian leap-year helper;
5. allocate a fresh 12-element month-length Array:

```js
[
  leap ? 31 : 30,
  31,31,31,31,31,
  30,30,30,30,30,30
]
```

6. validate day against the selected element;
7. allocate `GregorianDate(gregorianYear,3, leap ? 21 : 22)` and convert it to JDN;
8. execute `monthLengths.slice(0,month-1)`, allocating a new Array;
9. `.reduce(...)` that Array with initial 0; every callback opens ENTER 1095 with `arguments = null`;
10. add `day-1` in Number arithmetic;
11. convert offset to BigInt and add to start JDN.

### 12.21 Thai Buddhist; Ethiopic/Coptic — ENTER 1096..1099, slots 82..84

`thaiBuddhistToJdn` (1096) requires the record, allocates:

```js
new GregorianDate(year - 543n, month, day)
```

and passes it to `gregorianToJdn`. No separate positive-year restriction exists.

The shared Ethiopic/Coptic helper (ENTER 1097):

1. require year > 0;
2. validate month 1..13;
3. site 4181: `leap = modulo(year,4n) === 3n`;
4. site 4182 choose month length: month 13 is 6 if leap else 5; all other months are 30;
5. validate day;
6. return:

```js
epoch
+ 365n*(year-1n)
+ floorDiv(year,4n)
+ BigInt(30*(month-1) + day - 1)
```

The month/day arithmetic inside `BigInt(...)` is Number arithmetic first.

`ethiopicToJdn` (ENTER 1098) requires `EthiopicDate` then invokes the helper with `ETHIOPIC_EPOCH_JDN`. `copticToJdn` (ENTER 1099) does the same with `COPTIC_EPOCH_JDN`.

### 12.22 Japanese Imperial — ENTER 1100, slot 85

At module import two Maps are constructed and `Object.freeze` is applied to the Map objects. The era alias Map recognizes:

```text
meiji            明治
taisho  taishō    大正
showa   shōwa     昭和
heisei           平成
reiwa            令和
```

Records encode:

```text
Meiji   start 1868-10-23  Gregorian-year offset 1867
Taisho  start 1912-07-30  offset 1911
Showa   start 1926-12-25  offset 1925
Heisei  start 1989-01-08  offset 1988
Reiwa   start 2019-05-01  offset 2018
```

A second Map stores inclusive end-date arrays for ended eras keyed by offset. The nested records/date Arrays are not recursively frozen, but are module-private.

Conversion:

1. require `JapaneseImperialDate` and era year >= 1;
2. site 4183 lowercase the era string;
3. site 4184 lookup lowercase key and, if needed, fall back to the raw stored era key;
4. unknown era throws;
5. site 4185 `gregorianYear = offset + eraYear`;
6. site 4186 allocate requested GregorianDate and convert to JDN;
7. site 4187 spread the era start-date Array into a **new** GregorianDate and convert;
8. site 4188 read optional inclusive end-date Array; when present, allocate/convert another GregorianDate;
9. require candidate JDN to lie at/after start and, for ended eras, at/before inclusive end; otherwise `RangeError`;
10. return candidate JDN.

### 12.23 Minguo — ENTER 1101, slot 86

Require `MinguoDate`, allocate `new GregorianDate(year+1911n,month,day)`, then return `gregorianToJdn` of that object. There is no separate positive-year restriction.

### 12.24 Bahá'í support tables and trigonometric helper — ENTER 1102

M4 allocates three frozen coefficient Arrays of length 24. Read row-wise, the exact triples `(A,B,C)` are:

```text
 1  485  324.96  1934.136
 2  203  337.23  32964.467
 3  199  342.08  20.186
 4  182  27.85   445267.112
 5  156  73.14   45036.886
 6  136  171.52  22518.443
 7   77  222.54  65928.934
 8   74  296.72  3034.906
 9   70  243.58  9037.513
10   58  119.81  33718.147
11   52  297.17  150.678
12   50  21.02   2281.226
13   45  247.54  29929.562
14   44  325.15  31555.956
15   29  60.93   4443.417
16   18  155.12  67555.328
17   17  288.79  4562.452
18   16  198.04  62894.029
19   14  199.76  31436.921
20   12  95.39   14577.848
21   12  287.11  31931.756
22   12  320.81  34777.259
23    9  227.73  1222.114
24    8  15.45   16859.074
```

ENTER 1102 computes cosine in degrees exactly as:

```js
Math.cos(value * Math.PI / 180)
```

### 12.25 Delta-T helper — ENTER 1103

The decoded piecewise Number polynomial is:

```text
y < 1800:
  t=(y-1820)/100
  -20 + 32*t^2

1800 <= y < 1860:
  t=y-1800
  13.72 -0.332447*t +0.0068612*t^2 +0.0041116*t^3
  -0.00037436*t^4 +0.0000121272*t^5 -0.0000001699*t^6
  +0.000000000875*t^7

1860 <= y < 1900:
  t=y-1860
  7.62 +0.5737*t -0.251754*t^2 +0.01680668*t^3
  -0.0004473624*t^4 + t^5/233174

1900 <= y < 1920:
  t=y-1900
  -2.79 +1.494119*t -0.0598939*t^2 +0.0061966*t^3 -0.000197*t^4

1920 <= y < 1941:
  t=y-1920
  21.20 +0.84493*t -0.0761*t^2 +0.0020936*t^3

1941 <= y < 1961:
  t=y-1950
  29.07 +0.407*t -t^2/233 +t^3/2547

1961 <= y < 1986:
  t=y-1975
  45.45 +1.067*t -t^2/260 -t^3/718

1986 <= y < 2005:
  t=y-2000
  63.86 +0.3345*t -0.060374*t^2 +0.0017275*t^3
  +0.000651814*t^4 +0.00002373599*t^5

2005 <= y < 2050:
  t=y-2000
  62.92 +0.32217*t +0.005589*t^2

2050 <= y < 2150:
  -20 +32*((y-1820)/100)^2 -0.5628*(2150-y)

y >= 2150:
  -20 +32*((y-1820)/100)^2
```

All powers and coefficients above are JavaScript Number arithmetic.

### 12.26 Equinox helper — ENTER 1104

The implementation first chooses `t` and base equinox `JDE0` from the Gregorian year.

For `year < 1000`:

```js
t = year / 1000
JDE0 = 1721139.29189
     + 365242.13740*t
     + 0.06134*t*t
     + 0.00111*t*t*t
     - 0.00071*t*t*t*t
```

For `year >= 1000`:

```js
t = (year - 2000) / 1000
JDE0 = 2451623.80984
     + 365242.37404*t
     + 0.05169*t*t
     - 0.00411*t*t*t
     - 0.00057*t*t*t*t
```

Then, critically, the **same `t` selected above** is reused for the periodic correction; the authoritative body does not replace it with a JDE-derived century variable:

```js
W = 35999.373*t - 2.47
deltaL = 1 + 0.0334*cosDeg(W) + 0.0007*cosDeg(2*W)
sum = 0
for i=0..23:
  sum += A[i] * cosDeg(B[i] + C[i]*t)
equinox = JDE0 + 0.00001*sum/deltaL
return equinox - deltaT(year)/86400
```

This reuse of `t` is an observed authoritative detail. A cleaner helper elsewhere in the project uses a different JDE-derived century value; that implementation is not substituted here.

### 12.27 Gregorian day-of-year helper — ENTER 1105

For the supplied Gregorian year/month/day, allocate a fresh month-offset literal:

```text
[0,31,59,90,120,151,181,212,243,273,304,334]
```

Select the offset, add day, and add one when month>2 in a Gregorian leap year. Return the Number day-of-year.

### 12.28 Angle normalization — ENTER 1106

```js
r = value % 360
return r < 0 ? r + 360 : r
```

### 12.29 Tehran sunset helper — ENTER 1107

Fixed values:

```text
latitude  = 35.6892 degrees
longitude = 51.3890 degrees
zenith    = 90.833 degrees
```

Execution:

1. call Gregorian day-of-year helper;
2. `longitudeHour = longitude/15`;
3. `t = dayNumber + (18-longitudeHour)/24`;
4. `M = 0.9856*t - 3.289`;
5. compute true longitude:

```js
L = normalizeAngle(
  M
  + 1.916*Math.sin(M*Math.PI/180)
  + 0.020*Math.sin(2*M*Math.PI/180)
  + 282.634
)
```

6. compute right ascension:

```js
RA = normalizeAngle(
  Math.atan(0.91764*Math.tan(L*Math.PI/180))*180/Math.PI
)
RA += Math.floor(L/90)*90 - Math.floor(RA/90)*90
RA /= 15
```

7. `sinDec = 0.39782*Math.sin(L*Math.PI/180)`;
8. `cosDec = Math.cos(Math.asin(sinDec))`;
9. compute:

```js
cosHA = (
  Math.cos(zenith*Math.PI/180)
  - sinDec*Math.sin(latitude*Math.PI/180)
) / (
  cosDec*Math.cos(latitude*Math.PI/180)
)
```

10. if `cosHA < -1 || cosHA > 1`, throw `RangeError`;
11. `hourAngle = Math.acos(cosHA)*180/Math.PI/15`;
12. `localMeanTime = hourAngle + RA - 0.06571*t - 6.622`;
13. `UT = (localMeanTime - longitudeHour) % 24`;
14. return `UT < 0 ? UT + 24 : UT`.

### 12.30 Bahá'í New Year helper — ENTER 1108

1. site 4228: `gregorianYear = bigintToSafeNumber(bahaiYear+1843n,...)` through the helper chain;
2. if variant is exactly `"western-arithmetic"`, allocate `new GregorianDate(gregorianYear,3,21)`, convert and return that JDN;
3. otherwise the Tehran variant requires Gregorian year in inclusive range 1844..3000;
4. site 4229 compute `equinox = equinoxHelper(gregorianYear)`;
5. site 4230:

```js
candidateJdn = BigInt(Math.floor(equinox + 3.5/24 + 0.5))
```

6. sites 4231..4233 initialize month=3, day=19, found=false;
7. sites 4234/4235 loop Gregorian March 19,20,21,22:
   - allocate a new GregorianDate for that day;
   - call Gregorian conversion;
   - compare to `candidateJdn`;
8. on equality, site 4236 stores matched day, site 4237 stores `found=true`, and break;
9. if no day matches, throw Error;
10. site 4238:

```js
sunsetMoment = Number(candidateJdn)
             - 0.5
             + sunsetHours(gregorianYear,3,matchedDay)/24
```

11. return:

```js
equinox <= sunsetMoment
  ? candidateJdn
  : candidateJdn + 1n
```

### 12.31 `bahaiToJdn` — ENTER 1109, slot 87

1. require `BahaiDate`;
2. require year > 0;
3. site 4239 perform the complete New-Year computation for `year`;
4. site 4240 perform it **again** for `year+1`;
5. site 4241:

```js
intercalaryCount = Number(nextStart - start - 361n)
```

and require the result to be exactly 4 or 5;
6. if month is a string, allocate the fresh literal:

```js
["ayyami-ha","ayyám-i-há","ayyam-i-ha","איאם-הא"]
```

and call `.includes(month)`; unsupported string throws; validate day 1..intercalaryCount; site 4242 computes `offset = 18*19 + day - 1`;
7. otherwise validate numeric month 1..19 and day 1..19; site 4243 computes:

```js
offset = month <= 18
  ? (month-1)*19 + day - 1
  : 18*19 + intercalaryCount + day - 1
```

8. return `start + BigInt(offset)`.

### 12.32 Maya Long Count — ENTER 1110, slot 88

Require `MayaLongCountDate`. Enforce:

```text
katun 0..19
tun   0..19
uinal 0..17
kin   0..19
```

No converter-level range restriction is imposed on `baktun`. Return:

```js
correlation
+ baktun*144000n
+ BigInt(
    katun*7200
    + tun*360
    + uinal*20
    + kin
  )
```

The four smaller-unit multiplications/additions execute as Number arithmetic before the single BigInt conversion.

### 12.33 Calendar-name normalizer — ENTER 1111

The exact chain is:

```js
String(value)
  .trim()
  .toLowerCase()
  .replace(/[ _]/gu,"-")
```

Only spaces and underscores are replaced by hyphens. Other punctuation remains.

### 12.34 `calendarObjectToDate` — ENTER 1112, slot 89

Require a non-null object. Site 4244 normalizes `input.calendar` using ENTER 1111, then a switch allocates a **new** typed record.

Exact normalized labels/aliases:

```text
gregorian
julian
hebrew
islamic | hijri
islamic-civil | hijri-civil
islamic-umalqura | umm-al-qura
solar-hijri | persian
chinese
hindu
old-hindu-solar | hindu-solar
old-hindu-lunar | hindu-lunar
saka | indian
thai-buddhist | buddhist
ethiopic | ethiopian
coptic
japanese | japanese-imperial
minguo | roc
bahai | badi
maya | mayan | maya-long-count
```

Special argument rules:

- generic `islamic|hijri` passes `input.variant` verbatim; it does not invent a router-level default;
- civil/umalqura aliases construct the dedicated subclasses and therefore force those variants;
- `solar-hijri|persian` uses `input.variant ?? "official"`;
- Chinese uses `input.relatedYear ?? input.year`;
- old-Hindu aliases force the corresponding scheme;
- Maya uses `input.correlation ?? MAYA_GMT_CORRELATION`;
- unsupported normalized label throws `RangeError` whose message includes the original label value.

### 12.35 `calendarDateToJdn` — ENTER 1113, slot 90

Dispatch order is exact and therefore observable when an object satisfies multiple tests:

1. `typeof input === "string"` -> `parseHebrewGregorianDate` -> Gregorian converter;
2. native `Date` or `GregorianDate` -> Gregorian converter/coercion path;
3. `JulianDate`;
4. `HebrewDate`;
5. `IslamicDate` (including its subclasses);
6. `SolarHijriDate`;
7. `ChineseDate`;
8. `HinduDate` (including old-Hindu subclasses);
9. `SakaDate`;
10. `ThaiBuddhistDate`;
11. `EthiopicDate`;
12. `CopticDate`;
13. `JapaneseImperialDate`;
14. `MinguoDate`;
15. `BahaiDate`;
16. `MayaLongCountDate`;
17. if input is a non-null object and `"calendar" in input`, call `calendarObjectToDate(input)` and recursively invoke `calendarDateToJdn` once on the newly allocated typed record;
18. otherwise throw `TypeError` for unsupported date input.

No fast/reference converter is consulted anywhere in this dispatcher.


## 13. M5 — combinatorics and `MonthWeavingCounter`

Decoded body identity: Dynamic 07, 161,102 bytes, SHA-256 `49a09b10fff798ba7965eb3f40180c719e737293d07695a388b4c257a9a7d073`. M5 has no decoded-module dependency other than the shared ritual runtime. It exports exactly nine public values:

```text
factorial
comb
fallingFactorial
unrankLexicographicPermutation
unrankPartialPermutation
boundedCompositionCount
unrankBoundedComposition
unrankPositiveCompositionWithRequiredBoundary
MonthWeavingCounter
```

A module-scope `Map` for binomial coefficients is allocated once during module evaluation. It has no size bound or eviction.

### 13.1 `factorial` — ENTER 1114

The input must be a nonnegative JavaScript Number integer. At site 4245 `result=1n`. The loop starts at site 4246 with `i=2` and runs while `i<=n`. The increment is itself ritualized:

```js
i += ASSIGN(frame, 4247, 1)
```

Every multiplication executes:

```js
result *= ASSIGN(frame, 4248, BigInt(i))
```

There is no factorial cache.

### 13.2 `comb` — ENTER 1115

Both inputs must be Number integers. If `k<0 || k>n`, return `0n` before touching the cache. At site 4249:

```js
kSym = Math.min(k, n-k)
```

At site 4250 allocate/compute the Number cache key:

```js
key = (n*(n+1))/2 + kSym
```

`Number.isSafeInteger(key)` is required; otherwise throw `RangeError`. A hit executes `.has(key)` and `.get(key)` separately. A miss sets `result=1n` at site 4251 and loops `i=1..kSym` through sites 4252/4253. Site 4254 performs exact BigInt multiplicative binomial arithmetic:

```js
result = (result * BigInt(n-kSym+i)) / BigInt(i)
```

The final result is inserted into the module-scope Map and returned.

### 13.3 `fallingFactorial` — ENTER 1116

Both arguments must be Number integers. If `k<0 || k>n`, return `0n`. Site 4255 initializes `result=1n`. The loop begins at `i=n-k+1`, continues through `n`, and multiplies using ritual `ASSIGN(frame,4258,BigInt(i))`; its loop/increment sites are 4256/4257. There is no cache.

### 13.4 Full lexicographic permutation unranking — ENTER 1117

1. Site 4259 converts the rank with `BigInt(inputRank)`.
2. Site 4260 allocates `available=[...items]`.
3. Site 4261 calls `factorial(available.length)` and range-checks the rank in `[0,total-1]`.
4. Site 4262 allocates `result=[]`.
5. While `available.length>0`, site 4263 recomputes `factorial(available.length-1)`; site 4264 computes `index=Number(rank/block)`; site 4265 updates `rank%=block` through ritual assignment.
6. `available.splice(index,1)` allocates its normal one-element splice-result Array; `[0]` of that returned Array is pushed into `result`.

The input Array is not mutated because the working pool is the spread clone. No uniqueness check is performed on item values.

### 13.5 Partial permutation unranking — ENTER 1118

Requested length must be an integer in `0..items.length`.

1. Site 4266 converts rank with `BigInt`.
2. Site 4267 calls `fallingFactorial(items.length,requestedLength)` for total count and validates rank.
3. Sites 4268/4269 allocate `available=[...items]` and `result=[]`.
4. The position loop uses sites 4270/4271.
5. Site 4272 computes `remainingSlots=requestedLength-position-1`.
6. Site 4273 recomputes `fallingFactorial(available.length-1,remainingSlots)` for every position.
7. Site 4274 computes the Number pool index from `rank/block`; site 4275 performs `rank%=block`.
8. `available.splice(index,1)[0]` is appended.

M8 already computes the total falling factorial before selecting the rank; this unranker deliberately recomputes that total and every block size.

### 13.6 `boundedCompositionCount` — ENTER 1119

The function first allocates the literal Array `[total,parts,min,max]` and calls `.every(Number.isInteger)` on it. Invalid integer representation throws `TypeError`.

Special cases execute in this order:

```text
parts < 0 or min > max -> 0n
parts === 0            -> total === 0 ? 1n : 0n
```

Then:

```text
site 4276: shifted = total - parts*min
if shifted < 0 -> 0n
site 4277: width = max-min
if shifted > parts*width -> 0n
site 4278: result = 0n
site 4279: step = width+1
```

The inclusion/exclusion loop is `j=0..floor(shifted/step)` through sites 4280/4281. For each iteration:

```js
remaining = shifted - j*step                 // site 4282
term = comb(parts,j) *
       comb(remaining+parts-1, parts-1)       // site 4283
```

Site 4284 adds the term when `j` is even and subtracts it when `j` is odd. Both `comb` calls open their own ritual frames and interact with the module-scope binomial cache.

### 13.7 `unrankBoundedComposition` — ENTER 1120

1. Site 4285 converts rank to BigInt.
2. Site 4286 calls `boundedCompositionCount(total,parts,min,max)` again and validates the rank.
3. Sites 4287–4289 allocate/init `result=[]`, `remainingTotal=total`, `remainingParts=parts`.
4. While parts remain, site 4290 computes `low=max(min,remainingTotal-max*(remainingParts-1))`; site 4291 computes `high=min(max,remainingTotal-min*(remainingParts-1))`; site 4292 sets `selected=false`.
5. Candidate values are tried in increasing order `low..high` through sites 4293/4294.
6. For **every** candidate, site 4295 runs a fresh full `boundedCompositionCount` for the suffix.
7. When that block is skipped, rank is reduced through `ASSIGN(frame,4296,block)`.
8. On selection, append candidate; sites 4297/4298 subtract candidate/decrement remaining parts; site 4299 sets `selected=true`.
9. If no candidate is selected, throw the internal Hebrew error.

Thus M8 counts the space once before `chooseIndex`; the unranker counts the whole space again; and then it repeatedly reruns counting for candidate suffixes.

### 13.8 `unrankPositiveCompositionWithRequiredBoundary` — ENTER 1121

Validation requires integer Number `total` and `parts`, `total>=parts`, and `parts>0`. A non-null required boundary must be an integer in `1..total-1`.

Site 4300 allocates a fresh local `Map` for this call. Site 4312 constructs and ritual-assigns a recursive arrow `count(used,partsLeft,hitBoundary)`; every recursive invocation opens ENTER 1122.

The recursive counter does:

```text
site 4301: key = `${used}|${partsLeft}|${hitBoundary ? 1 : 0}`
           memo hit performs has then get
site 4302: remaining = total-used
site 4303: if no parts remain, return 1n only if remaining==0 and boundary requirement is satisfied
site 4304: if remaining<partsLeft -> 0n
site 4305: if boundary exists, is not hit, and used>boundary -> 0n
site 4306: count=0n
site 4307: maxPart=remaining-(partsLeft-1)
```

The candidate loop is `part=1..maxPart` through sites 4308/4309. Site 4310 computes `nextUsed=used+part`. Before the boundary has been hit, `nextUsed>boundary` **breaks** the loop rather than continuing. Site 4311 adds:

```js
count(
  nextUsed,
  partsLeft-1,
  hitBoundary || boundary===null || nextUsed===boundary
)
```

Every computed state, including zero/base results, is stored in the local Map.

Unranking then:

```text
4313 rank = BigInt(inputRank)
4314 totalCount = count(0,parts,boundary===null)
4315 result=[]
4316 used=0
4317 partsLeft=parts
4318 hitBoundary=(boundary===null)
```

For each output part sites 4319–4321 compute remaining/maxPart and set `selected=false`; sites 4322/4323 test parts from 1 upward; site 4324 computes `nextUsed`; candidates crossing an unmet boundary break; site 4325 computes next hit flag; site 4326 obtains the suffix block from the memoized recursive counter; site 4327 subtracts skipped blocks; sites 4328–4331 push the selected part and update all state. The vector order is lexicographic by part values.

### 13.9 `MonthWeavingCounter` constructor — ENTER 1123

The constructor requires a non-empty Array. It calls `lengths.some(callback)`; each callback invocation opens ENTER 1124 and rejects a non-integer or `<=0` length.

On success:

```js
this.lengths = Object.freeze([...lengths])     // site 4332
this.monthCount = lengths.length               // 4333
this.totalLength = lengths.reduce(...)         // 4334; callback ENTER 1125
this.prefix = [0]                              // 4335
```

A literal `for (const length of lengths)` loop pushes `this.prefix.at(-1)+length`; this loop body does not use ritual `ASSIGN`. Site 4336 stores `this.h=this.#buildH()`.

The counter object itself is not frozen. Its own properties `lengths`, `monthCount`, `totalLength`, `prefix`, and `h` are writable/configurable/enumerable; only the cloned `lengths` Array is frozen. `prefix`, outer `h`, and all nested rows remain mutable.

### 13.10 Jagged DP table construction — ENTER 1126

```js
h = new Array(monthCount+2).fill(null)                    // 4337
h[monthCount+1] = new Array(totalLength+2).fill(1n)       // 4338
```

The descending month loop starts at `i=monthCount` at site 4339 and decrements through `i -= ASSIGN(frame,4340,1)`.

For each month `i`:

```text
4341 n = lengths[i-1]
4342 qMax = prefix[i-1]+1
4343 row = new Array(qMax+1).fill(0n)
4344 next = h[i+1]
4345 coefficient = 1n
```

The q loop is `q=1..qMax` through sites 4346/4347. Site 4348 computes `combined=n+q-1`. When `q>1 && n>1`, sites 4349–4351 advance the coefficient without calling `comb`:

```js
numerator = combined-2
k = n-2
coefficient = (coefficient*BigInt(numerator)) /
              BigInt(numerator-k)
```

Site 4352 writes:

```js
row[q] = row[q-1] + coefficient*next[combined]
```

Site 4353 stores `h[i]=row`. The table is intentionally jagged: the base row is `totalLength+2` cells while earlier rows are only `qMax+1` cells.

### 13.11 Completion counter — ENTER 1127

Inputs are the mutable `remaining` vector, `highOpened`, and `finishedCount`.

If `finishedCount<highOpened`, site 4354 sets `activeTotal=remaining[finishedCount+1]` and site 4355 sets `ways=1n`. Sites 4356/4357 iterate each additional open month; site 4358 reads `n=remaining[i]`; site 4359 multiplies through ritual assignment:

```js
ways *= comb(n+activeTotal-1, activeTotal)
```

and site 4360 adds `n` to `activeTotal` through ritual assignment.

If there are no unfinished open months, sites 4361/4362 set `activeTotal=0` and `ways=1n`.

If `highOpened<monthCount`, site 4363 further multiplies:

```js
ways *= h[highOpened+1][activeTotal+1]
```

Then return `ways`.

### 13.12 `count` getter — ENTER 1128

Every access allocates a **new** `[0,...this.lengths]` and calls the completion counter with `highOpened=0, finishedCount=0`. The result is not cached on the instance.

### 13.13 `unrank` — ENTER 1129

1. Site 4364 converts rank to BigInt.
2. Site 4365 evaluates `this.count`, causing a new count-vector allocation and recount; rank is range-checked.
3. Site 4366 allocates another mutable `[0,...this.lengths]`.
4. Sites 4367–4369 initialize `highOpened=0`, `finishedCount=0`, `output=[]`.
5. For every output position site 4370 allocates `candidates=[]`.
6. Sites 4371/4372 iterate labels `finishedCount+1..highOpened` and append label `i` when `remaining[i]>1 || i===finishedCount+1`.
7. If `highOpened<monthCount`, append the next unopened label `highOpened+1`.
8. Site 4373 sets `selected=false`.
9. For every candidate, site 4374 allocates a full clone `trialRemaining=[...remaining]`; sites 4375/4376 copy trial high/finished counters.
10. If the candidate is the next unopened month, site 4377 increments `trialHigh`.
11. Site 4378 decrements that candidate's remaining count.
12. If it reaches zero and candidate is **not** exactly `finishedCount+1`, throw `Error: ניסיון לסיים חודש שלא לפי סדר ההופעות האחרונות` **before** suffix counting; otherwise site 4379 increments `trialFinished`.
13. Site 4380 invokes the completion counter on the complete cloned trial state.
14. A skipped block subtracts rank through site 4381.
15. The selected branch assigns the entire cloned vector and counters through sites 4382–4384, pushes the candidate, and site 4385 sets `selected=true`.
16. Failure to select throws an internal Hebrew error.

Candidates are tested in increasing numeric-label order. On the successful domain the resulting weave is lexicographic and satisfies both first-occurrence and last-occurrence order by month number.

The sealed chronicle constructor still accepts month length 1 although the normal calendar path supplies only 4..123. At the raw chronicle level this exposes the historical inconsistency: `[2,1]` counts two internal ranks although only `[1,1,2]` satisfies both appearance-order rules. Update 14 deliberately leaves that old DP intact. The Node and browser public doorways install `month-weaving-domain-detour.js`: singleton months become hard separators, public `count` is the product of the untouched legacy counters for the non-singleton runs, public `unrank` translates the contiguous mixed-radix rank into those old rank spaces, and public `rank` performs the inverse translation. Domains without a singleton continue through the original count/unrank machinery. The standalone Worker deliberately strips this public-only detour during canonical bundling because it does not expose `MonthWeavingCounter` and the calendar path supplies only 4..123. Mutating `h` can still affect raw-chronicle behavior; Update 14 does not turn the counter into an immutable object.

## 14. M6 — Sauce

M6 pre-transform decoded body is `Dynamic 08`, historical decoded-body SHA-256 `3ae2870ea230fe21e207dc390ccbdd2b8c9c8f8d1b03c8a9a276d779e1205be0`; current `main` transforms this body before compilation as described in §3.9. It depends on M0 and exposes 15 direct public carrier values. The descriptions below preserve the ritual ENTER/ASSIGN boundaries and allocation behavior rather than replacing them by an algebraically shorter implementation.

### 14.1 Constants and import-time materialization

The module evaluates:

```js
M = (2n ** 127n) - 1n
```

so:

```text
M = 170141183460469231731687303715884105727
```

Delivery constants are:

```js
DELIVERY_GREGORIAN_YEAR   = -762n
DELIVERY_GREGORIAN_MONTH  = 6
DELIVERY_GREGORIAN_DAY    = 7
DELIVERY_JDN              = 1442903n
DELIVERY_DISTANCE         = 14777149n
FOUNDATION_JDN            = DELIVERY_JDN - DELIVERY_DISTANCE
```

The subtraction is executed at module evaluation and yields `-13334246n`.

A module-scope `Map` for cached Sauce results is also allocated. Its hard maximum is 1,024 entries; the exact hit/miss behavior is described in §14.13.

### 14.2 `Stones` — ENTER 1130; `asArray()` — ENTER 1131

The `Stones` constructor accepts five inputs. Sites 4386..4390 separately execute `BigInt(...)` and assign:

```text
wheat
barley
salt
bitter
red
```

The constructed object is frozen.

Every `asArray()` call allocates and returns a fresh, non-frozen Array:

```js
[wheat, barley, salt, bitter, red]
```

### 14.3 Import-time 46-stone table — ENTER 1141

The table-builder helper is ENTER 1141. At site 4419 the module allocates the first row:

```js
[
  new Stones(17n, 29n, 43n, 71n, 101n)
]
```

A Number loop starts at site 4420 with `i=2`, continues through `i=46`, and increments through site 4421. At site 4422 it reads `previous = stones.at(-1)`. The pushed row is constructed from the **same old row**:

```text
wheat'  = store(previous.wheat^2  + 3*previous.barley + BigInt(i))
barley' = store(previous.barley^2 + 5*previous.salt   + previous.wheat)
salt'   = store(previous.salt^2   + 7*previous.bitter + previous.barley)
bitter' = store(previous.bitter^2 + 11*previous.red   + previous.salt)
red'    = store(previous.red^2    + 13*previous.wheat + previous.bitter)
```

Each row is frozen by its constructor. After 46 rows exist, the outer Array is frozen.

### 14.4 Import-time 720 permutation table — ENTER 1142 and ENTER 1143

The recursive full-permutation generator is ENTER 1142. For an empty input it allocates and returns `[[]]`. Otherwise:

1. site 4423 allocates `result=[]`;
2. sites 4424/4425 visit every input index;
3. site 4426 reads the selected element;
4. site 4427 allocates the remainder using **two** `slice()` calls and spreads them into a new Array;
5. recurse for every suffix;
6. for every returned suffix allocate `[selected,...suffix]` and push it.

The module invokes this machinery for `[0,1,2,3,4,5]`, producing exactly 720 Arrays. Each permutation Array is frozen through `.map(Object.freeze)`, then the 720-element outer Array is frozen.

Rank lookup is ENTER 1143. It does not recompute/unrank factoradically; it returns:

```js
allPermutations[
  Number(modulo(rank - 1n, 720n))
]
```

### 14.5 `store` — ENTER 1139; `dayNumber` — ENTER 1140

At site 4417 `store` first normalizes its input through M0 `asBigInt`, then returns:

```js
1n + modulo(value - 1n, M)
```

Its codomain is therefore the inclusive range `1..M`.

At site 4418 `dayNumber` BigInt-normalizes the input JDN. The three literal branches are:

```text
day == FOUNDATION -> 1

day > FOUNDATION  -> 2*(day-FOUNDATION)+1

day < FOUNDATION  -> 2*(FOUNDATION-day)
```

All branches return through the shared ritual runtime. Days after Foundation are odd, days before are even, and Foundation is uniquely 1.

### 14.6 `ResponseCycle` — ENTER 1132..1135

Constructor ENTER 1132 executes at sites 4391/4392:

```js
this.first = BigInt(firstInput)
this.step  = directionInput > 0 ? 1n : -1n
```

and freezes the instance.

`value(index)` is ENTER 1133. Site 4393 normalizes the index through `asBigInt`; negative indices throw. The return is exactly:

```js
1n + modulo(first - 1n + step * index, M)
```

`chooseIndex(count)` is ENTER 1134. Site 4394 normalizes count; `count<=0n` throws.

For `count<=M`, site 4395 computes:

```js
limit = count * (M / count)
```

The private clamp is ENTER 1135 and is called at site 4396. It returns `first` when `first<=limit`; otherwise it returns `1n` for positive step or `limit` for negative step. There is **no retry/rejection loop**. The selected index is:

```js
modulo(accepted - 1n, count)
```

For `count>M`, sites 4397/4398 initialize Number `width=1` and BigInt `capacity=M`. While `capacity<count`, sites 4399/4400 increment width and multiply capacity by `M`. Sites 4401/4402 initialize `aggregate=1n` and `factor=1n`. A ritualized loop at sites 4403/4404 runs `i=0..width-1`; site 4405 adds `(this.value(i)-1n)*factor`, and site 4406 multiplies `factor*=M`. Site 4407 computes `limit=count*(capacity/count)`, site 4408 invokes the same clamp, and the return is again modulo `count`.

### 14.7 `SauceResult` — ENTER 1136..1138

Constructor ENTER 1136 clones and freezes both Arrays:

```js
this.bowls = Object.freeze([...inputBowls])       // site 4409
this.finalDropOrder = Object.freeze([...inputOrder]) // site 4410
```

then freezes the `SauceResult` object.

`responseCycle(bowlNumber,seal)` is ENTER 1137. Bowl number must be an integer 1..6. Site 4411 normalizes seal. Sites 4412..4414 compute the fixed bowl index, its position in `finalDropOrder`, and the next fixed bowl in that circular order. Site 4415 computes:

```js
first = store(
  (bowls[bowlIndex] + seal + 181n) ** 2n
  + 179n * bowls[nextBowl]
  + seal
)
```

Site 4416 computes:

```js
directionNumber = store(
  (first + seal + 1n + 193n) ** 2n
  + 193n * first
  + 197n * bowls[5]
)
```

The source contains separate `+1n` and `+193n` additions rather than a precombined 194. The method returns `new ResponseCycle(first, odd ? 1 : -1)`; that Number ±1 is converted again by the constructor to BigInt step.

ENTER 1138 `chooseIndex(bowl,seal,count)` literally chains `this.responseCycle(bowl,seal).chooseIndex(count)` and returns through the ritual runtime.

### 14.8 `makeSauceUncached` — ENTER 1144: normalization and counters

Sites 4428/4429 normalize calculation and target JDNs. Sites 4430..4434 compute exactly:

```js
A = dayNumber(calculation)
T = dayNumber(target)
D = absBigInt(target - calculation) + 1n
S = A + T
R = target < calculation ? 1n : target === calculation ? 2n : 3n
```

At site 4435 a **new `Map`** is allocated. Hidden and visible drops share that same Map.

### 14.9 Seven hidden drops — sites 4436..4446; reduce callback ENTER 1145

The outer loop is exactly `i=1..7` (sites 4436/4437). Site 4438 reads `STONES[i-1]`. Site 4439 chooses one row from the literal seven-row coefficient table:

```text
[ 3,  4,  6,  8]
[ 5,  7, 10, 12]
[ 7, 10, 14, 16]
[ 9, 13, 18, 20]
[11, 16, 22, 24]
[13, 19, 26, 28]
[15, 22, 30, 32]
```

Site 4440 calls `stones.asArray()`, allocating a five-element Array. Site 4441 computes:

```js
x = store(
  A
  + c0*T
  + c1*D
  + c2*S
  + c3*R
  + stonesArray.reduce(ritualizedAddition, 0n)
)
```

Every reduce callback invocation opens ENTER 1145.

Site 4442 allocates another Array:

```js
[wheat, barley, salt, bitter, red, wheat, barley]
```

The inner loop is `j=1..7` (sites 4443/4444). Site 4445 stores `old=x`. Site 4446 performs:

```js
x = store(
  old ** 2n
  + 3n * old
  + hiddenStone[j - 1]
  + BigInt(j)
)
```

After seven inner rounds, the Map write is:

```js
dropMap.set(1 - i, x)
```

so the seven hidden keys are exactly `0,-1,-2,-3,-4,-5,-6`.

### 14.10 Forty-six visible drops and eleven grinds — sites 4447..4455

The outer loop is `i=1..46` (sites 4447/4448). Site 4449 selects `STONES[i-1]`; site 4450 allocates `stonesArray=stones.asArray()`. Sites 4451..4453 read:

```js
p1 = dropMap.get(i - 1)
p3 = dropMap.get(i - 3)
p7 = dropMap.get(i - 7)
```

Site 4454 computes:

```js
x = store(
  wheat*A
  + barley*T
  + salt*D
  + bitter*S
  + red*R
  + p1
  + 3n*p3
  + 5n*p7
  + BigInt(i)
)
```

Then the implementation visits all eleven literal grind rows:

```text
[ 3,  5,  7, 11, 0]
[ 5,  7, 11, 13, 1]
[ 7, 11, 13, 17, 2]
[11, 13, 17, 19, 3]
[13, 17, 19, 23, 4]
[17, 19, 23, 29, 0]
[19, 23, 29, 31, 1]
[23, 29, 31, 37, 2]
[29, 31, 37, 41, 3]
[31, 37, 41, 43, 4]
[37, 41, 43, 47, 0]
```

For row `[a,b,c,d,z]`, site 4455 executes:

```js
x = store(
  x ** 2n
  + a*x
  + b*p1
  + c*p3
  + d*p7
  + stonesArray[z]
)
```

After all 11 grinds, `dropMap.set(i,x)` stores the visible drop.

### 14.11 Six initial bowls and forty-six pour/mixing rounds

Site 4456 allocates `bowls=[]`. The bowl loop is 1..6 (sites 4457/4458). The frozen prime literal is `[17n,19n,23n,29n,31n,37n]`; site 4459 selects the prime. Site 4460 computes:

```js
x = A + T*BigInt(bowlNumber) + D + S + R + prime**2n
```

and pushes:

```js
store(x**2n + BigInt(bowlNumber))
```

Site 4461 initializes `finalDropOrder=null`. The pour loop is `i=1..46` (sites 4462/4463):

1. site 4464 `x=dropMap.get(i)`;
2. site 4465 select current Stone;
3. site 4466 select precomputed permutation from `x`;
4. site 4467 allocate `oldBowls=[...bowls]`;
5. site 4468 allocate a three-element direct-pouring Array:

   ```js
   [
     store(x**2n + wheat  * oldBowls[order[0]] + 3n*BigInt(i)),
     store(x**2n + barley * oldBowls[order[1]] + 5n*BigInt(i)),
     store(x**2n + salt   * oldBowls[order[2]] + 7n*BigInt(i))
   ]
   ```

6. site 4469 allocate `newBowls=new Array(6).fill(0n)`;
7. site 4470 allocate `stonesArray=stones.asArray()`;
8. inner loop `place=0..5` uses sites 4471/4472;
9. sites 4473..4475 select `q`, circular `prev`, circular `next` from the permutation;
10. site 4476 selects `direct = place<3 ? directArray[place] : 0n`;
11. site 4477 computes:

   ```js
   u = oldBowls[q]
       + 2n*oldBowls[prev]
       + 3n*oldBowls[next]
       + direct
       + x
       + stonesArray[[0,1,2,3,4,0][place]]
   ```

   The selector `[0,1,2,3,4,0]` is a module-scope frozen Array in the decoded source.

12. site 4478 writes:

   ```js
   newBowls[q] = store(
     u**2n
     + 5n*oldBowls[prev]*oldBowls[next]
     + BigInt(i*(place+1))
   )
   ```

13. site 4479 replaces `bowls=newBowls`;
14. on `i===46`, site 4480 clones `finalDropOrder=[...order]`.

After the loop, an explicit guard throws `לא נקבע סדר הטיפה האחרונה` if `finalDropOrder` is still null, even though the fixed loop bounds normally execute the assignment.

### 14.12 Twelve final mixing rounds — current-head transformed execution

The **decoded pre-transform body** still contains sites 4481..4494 exactly as captured, but current `main` compiles M6 only after applying the chronicle source transform in §3.9. Therefore execution has one extra raw reduction and one substituted operand.

For every `round=1..12`:

1. sites 4481/4482 control the outer loop;
2. site 4483 allocates `oldBowls=[...bowls]`;
3. **current chronicle injection, immediately after the site-4483 source line:** execute a second, uninstrumented binding:

   ```js
   bowlSum = oldBowls.reduce((a,b) => a+b, 0n)
   ```

   This allocates/executes the native reduce callback six-bowl summation without going through ENTER 1146;
4. site 4484 still executes the original ritualized reduction to derive `orderNumber`:

   ```js
   orderNumber = store(
     oldBowls.reduce(ritualizedAddition, 0n)
     + 149n * BigInt(round)
   )
   ```

   Every callback of this **second summation of the same six bowls** opens ENTER 1146. Thus current authoritative execution computes the six-bowl sum twice per final-stir round: once by the injected raw callback and once by the original ritualized callback;
5. site 4485 selects the precomputed permutation from `orderNumber`;
6. site 4486 allocates `newBowls=new Array(6).fill(0n)`;
7. sites 4487/4488 run `place=0..5`;
8. sites 4489..4491 select `q`, circular `prev`, and circular `next` from the chosen permutation;
9. site 4492 executes the **transformed** expression:

   ```js
   u = oldBowls[q]
       + 3n*oldBowls[prev]
       + 5n*oldBowls[next]
       + bowlSum
       + BigInt(round)
       + BigInt((place+1)**2)
   ```

   The final position square is Number exponentiation first and only then `BigInt(...)`;
10. site 4493 writes:

   ```js
   newBowls[q] = store(
     u**2n
     + 7n*oldBowls[prev]*oldBowls[next]
   )
   ```

11. site 4494 replaces `bowls=newBowls`.

After round 12, `makeSauceUncached` constructs a new `SauceResult`; its constructor clones/freezes `bowls` and the earlier `finalDropOrder`, then freezes the object.

**Current semantic rule:** `orderNumber = store(bowlSum + 149*round)` selects the permutation; **raw `bowlSum`**, not `orderNumber`, enters `u`. The prior direct decoded body used `orderNumber` in `u`; current `main` changes that behavior at Function-compilation time rather than regenerating the encrypted payload.

### 14.13 Cached `makeSauce` — ENTER 1147

Sites 4495/4496 normalize calculation and target. Site 4497 allocates the key template string:

```js
`${calculation}:${target}`
```

On a hit, site 4498 gets the cached object; the implementation then deletes the key and sets the same key/value again before returning, promoting recency in insertion order.

On a miss, site 4499 calls `makeSauceUncached(calculation,target)`, stores it, and if `cache.size>1024` deletes `cache.keys().next().value`. `makeSauceUncached` never consults this Map.

## 15. M7 — embedded historical positive gate-gap data and its public fossil status

M7 is decoded body `Dynamic 09`, SHA-256 `a9d1cc8c102402c64441cab567177bf117aaaa6c89fef5c2a4fbae61f3bc67b0`. It has no direct carrier and its decoded body is unchanged in 1.4.0.

### 15.1 Raw decoder — ENTER 1148

The hidden source still contains its large Base64 blob. If `Buffer` exists it decodes with `Buffer.from(encoded,"base64")` and returns a `Uint8Array` view; otherwise it uses `atob`, allocates a `Uint8Array`, and copies every character code. If neither decoder exists it throws the preserved missing-decoder error.

### 15.2 Raw `loadForwardGaps` — ENTER 1149

The hidden loader still decodes exactly 80,000 bytes as 40,000 little-endian uint16 values through a `DataView`. That raw payload is the **pre-final-stir historical sequence** described by the old specification; its decoded byte SHA-256 is `2321775cd22a1156751fe506320d4afc47b27f391092645921df4b54d9ab49bb` and values lie in 42..963.

After the `bowlSum` correction, the historical 40,000 values disagreed with freshly recomputed normative positive gaps at 39,956 ordinals. That mismatch remains a fact about the sealed fossil payload; 1.4.0 does **not** regenerate or rewrite M7.

### 15.3 Supported public gate shadow

The remediation series instead added `browser/generated/pastafari-gate-shadow.js` and `browser/gate-data-detour.js`. The shadow manifest binds the current values to:

```text
canonicalId               PASTAFARI-SCROLL-2026-08-16-D36B0C94
format                    pastafari-gate-shadow-xor10-v1
normative Scroll SHA-256  d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96
reference SHA-256         40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379
positiveEntryCount        40001
positiveGapCount          40000
foundationJdn             -13334246
first positive gate       -13333869
gate 40000                6842507
gapDataset SHA-256        3d78c120dffd62aac0ededd72ee6ae412a3e9ee21700dcd25f475c48263b93b3
encoded payload bytes     50000
encoded payload SHA-256   412519fb98f17ffa4a7e45231df5b0b147baaa2b6e079685ea2906d1dc3c33f7
decoded FNV32             4211294204
fastCheckpointCount        65
extendedCheckpointCount    75
historicalGateDataUsedForValues  false
```

The public shadow is packed as ten-bit words. For 1-based gap index `i`, decoding XORs the stored ten-bit value with

```js
((Math.imul(i, 613) + 149) ^ Math.imul(i >>> 3, 179)) & 1023
```

and then adds 42. Every gap is range-checked in 42..963; an FNV-1a-style two-byte-per-gap checksum is verified; absolute positions are accumulated from Foundation and both first/last boundary seals are checked.

The same regeneration manifest also binds 65 fast checkpoints and 75 extended checkpoints. Those checkpoint counts belong to adjacent fast/conformance surfaces; they do not create additional sealed carrier slots or an alternate `GateIndex` rule.

The decoded canonical position Array is cached once at module scope and frozen. Each `GateIndex` instance retains the hidden constructor's obsolete positive Array initially. On the first supported call to `gate`, `indexAtOrBefore`, `indexAtOrAfter`, or `indicesBetween`, the detour replaces `instance.positive` with `canonicalPositive().slice()`, marks the instance in a WeakSet, and executes the intentionally pointless `historical[0] = historical[0]` on the detached fossil Array. Thus obsolete data still exists and executes, but cannot decide supported public positive-gate semantics.

## 16. M8 — names, `GateIndex`, and calendar orchestration

### 16.1 Frozen cutlet names

1. ארד
2. שועל
3. כליה
4. לגש
5. מחשבה
6. ארבעה חלקים מתשעה
7. פַּלְגּוּרַשׁ
8. גומא
9. אשכול
10. עקרב
11. אפר
12. חיטה
13. נהר
14. צחוק
15. אכד
16. קרן
17. הכד הריק

### 16.2 Frozen month names

1. טין
2. רימון
3. מרפק
4. קנאה
5. ארידו
6. משחת־שיניים
7. שלושה חלקים מחמישה
8. כַּרְשׁוּמַב
9. נמר
10. בדיל
11. ערפל
12. לבונה
13. כישור
14. צלע
15. חרוב
16. אורוק
17. בושה
18. גמל
19. נחושת
20. באר
21. חלמון
22. כוכב
23. דבש
24. טחול
25. אבן־גיר
26. שמחה
27. תאנה
28. נינוה
29. צפרדע
30. זפת
31. נר
32. הדלת הסגורה
33. שומשום
34. עורף
35. כסף
36. שושן
37. סערה
38. חמור
39. קמח
40. חרטה
41. בבל
42. לשון
43. פשתן
44. מלח
45. אגס
46. קשת
47. חול


Both Arrays are allocated at module initialization and frozen.

### 16.3 Binary-search helpers — ENTER 1150 and 1151

Before `GateIndex` itself, M8 defines two ritualized binary searches. ENTER 1150 is lower-bound: first index whose Array value is `>= target`. Sites 4512/4513 initialize low/high; site 4514 calculates `Math.floor((low+high)/2)`; site 4515 moves low on `array[mid] < target`, otherwise site 4516 moves high.

ENTER 1151 is upper-bound: first index whose value is `> target`. Sites 4517..4521 are analogous but use `array[mid] <= target` to advance low.

### 16.4 `GateIndex` construction — ENTER 1152, followed by public priming

The hidden M8 constructor itself is unchanged: it creates `this.positive=[FOUNDATION_JDN]`, decodes M7's 40,000 historical gaps, cumulatively pushes 40,000 more positions, and creates `this.negative=[FOUNDATION_JDN]`. The two module-scope dynamic gap Maps likewise still exist.

That is **decoded hidden-core construction**, not the final supported positive sequence. In every supported browser/Node doorway, `installGateDataDetour(GateIndex)` has already wrapped the four public gate/boundary methods. The first such method call invokes `prime(this)` before the captured M8 method. Priming detaches `this.positive` from the historical 40,001-entry Array and replaces it with a fresh mutable slice of the separately decoded canonical gate shadow described in §15.3.

Consequences:

- construction still pays the cost of unpacking the historical table;
- no source cleanup removes that table;
- a debugger can still observe the detached Array if it captured it earlier;
- supported positive gate positions 0..40000 are nevertheless the regenerated Scroll/reference-derived sequence, with gate 40000 at `6842507`, not the historical stale endpoint.

### 16.5 Dynamic forward/backward gaps — ENTER 1153 and 1154

The hidden static methods are unchanged. Both require a positive integer ordinal `p` and share unbounded module-scope Maps.

On a forward miss:

```js
sauce = makeSauceUncached(FOUNDATION_JDN, FOUNDATION_JDN + BigInt(p));
gap = 42 + Number(sauce.chooseIndex(1, 1n, 922n));
```

The backward route uses `FOUNDATION_JDN - BigInt(p)` with the same selector. Because current compiled M6 uses raw `bowlSum` in the final stir, these are current dynamic Sauce semantics.

For supported positive ordinals `1..40000`, ordinary instance traversal normally reads the canonical primed Array rather than needing `forwardGap`. Explicit `GateIndex.forwardGap(p)` remains available and computes dynamically. Update 17/18/19 evidence checks bind regenerated gate artifacts and dynamic/reference semantics so the old M7 split is no longer a public mismatch. The negative side has no embedded table and remains dynamically extended from Foundation.

### 16.6 `gate(index)` — ENTER 1155 under the gate shadow

The hidden method still requires a safe-integer gate index and extends `positive` or `negative` arrays exactly as decoded. In supported entry points its wrapper first primes the instance (§16.4).

For nonnegative indices:

- indices `0..40000` are already present in the canonical shadow slice;
- if a larger index is requested, the hidden while-loop begins from that canonical gate-40000 endpoint and appends `GateIndex.forwardGap(p)` for each new ordinal;
- therefore later dynamic extension no longer inherits the historical `-109,553`-day offset from the old M7 endpoint.

For negative indices the hidden algorithm is unchanged: `negative[0]=FOUNDATION_JDN`; for successive absolute ordinal `p`, append `previous - BigInt(GateIndex.backwardGap(p))` and return `negative[-index]`.

The gate-data detour does not replace `forwardGap`/`backwardGap`; it repairs only the preloaded positive history while preserving the original dynamic extension machinery.

### 16.7 `indexAtOrBefore` — ENTER 1156; map callback ENTER 1157

Site 4531 BigInt-normalizes the day. At/after Foundation, extend positive gates until the last position is at least the day, then return `upperBound(positive,day)-1`.

Before Foundation, extend `negative` while its last position is greater than the day. Site 4532 then allocates a **new complete Array on every call** using `this.negative.map(...)`; every callback opens ENTER 1157 and returns the negated BigInt position. Return:

```js
-lowerBound(negatedArray, -day)
```

### 16.8 `indexAtOrAfter` — ENTER 1158; map callback ENTER 1159

At/after Foundation, after the analogous positive-extension loop, return `lowerBound(positive,day)`.

Before Foundation, perform the same negative extension. Site 4534 allocates another complete negated copy of `this.negative`, with every callback opening ENTER 1159. Return:

```js
-(upperBound(negatedArray, -day) - 1)
```

Thus each negative-side boundary lookup allocates and fills a BigInt Array proportional to the negative gates already materialized.

### 16.9 `indicesBetween` — ENTER 1160; Array.from callback ENTER 1161

Sites 4535/4536 normalize first and last days. `firstDay>lastDay` throws `טווח ימים הפוך`. Sites 4537/4538 calculate `indexAtOrAfter(firstDay)` and `indexAtOrBefore(lastDay)`. If first index exceeds last index, return a newly allocated empty Array. Otherwise return `Array.from({length:lastIndex-firstIndex+1}, callback)`; every callback opens ENTER 1161 and returns `firstIndex+offset`.

## 17. Hidden `PastafariCalendar` constructor and high-level conversion

### 17.1 Constructor — ENTER 1162

The decoded signature is structurally:

```js
constructor({ todayProvider = localToday } = {})
```

Inside decoded M8, the identifier `localToday` is not bound under that name. Therefore reaching the default-expression path can throw native `ReferenceError` before the constructor body has completed. With an explicit provider, it must be a function.

On a successful construction, sites 4539..4543 execute in order:

```js
this.todayProvider  = provider
this.gates          = new GateIndex()
this.anchorCache    = new Map()
this.yearCache      = new Map()
this.structureCache = new Map()
```

The `PastafariCalendar` instance is not frozen. The three Maps and `gates` are publicly writable properties and have no internal eviction policy.

The current public wrappers avoid the unbound-default path: the package-level subclass injects imported `localToday`; the authoritative Worker injects a fixed Gregorian `2000-01-01` provider because every Worker operation supplies `calculationJdn` explicitly.

### 17.2 `convert(input,{calculationDate=null})` — ENTER 1163

Site 4544 converts the target input through `calendarDateToJdn(input)`.

Site 4545 chooses:

```js
calculationInput =
  calculationDate === null
    ? this.todayProvider()
    : calculationDate
```

Site 4546 converts that chosen value through `calendarDateToJdn`. The method then allocates the options object `{calculationJdn}` and calls `this.convertJdn(targetJdn,{calculationJdn})`.

## 18. `convertJdn` entry and output materialization — ENTER 1164

The decoded function performs its output-side work around the private year/structure routines described in §§19–20.

1. site 4547 normalizes target with `asBigInt(target,"היום הנשאל")`;
2. if the destructured `calculationJdn` is exactly `undefined`, throw `יש למסור calculationJdn במפורש לממשק הליבה`;
3. site 4548 normalizes calculation JDN;
4. site 4549 calls the private containing-year routine (ENTER 1173);
5. site 4550 calls the private structure routine (ENTER 1174);
6. site 4551 computes `offset = targetJdn - year.firstDay`;
7. require `0n <= offset < BigInt(year.length)`; an out-of-year target is rejected;
8. site 4552 converts offset with direct `Number(offset)`;
9. sites 4553..4555 initialize:

   ```text
   cumulativeGapCount = 0
   selectedCutlet     = -1
   previousBoundary   = year.openingGate
   ```

10. cutlet loop sites 4556/4557 visits cutlets in order;
11. site 4558 adds the current `cutletGapCounts[i]` to the cumulative count;
12. site 4559 calls:

   ```js
   boundary = this.gates.gate(
     year.gateIndices[cumulativeGapCount]
   )
   ```

13. if `targetJdn <= boundary`, site 4560 stores the selected cutlet and breaks; otherwise site 4561 replaces `previousBoundary=boundary`;
14. if no cutlet is selected, throw `לא נמצאה קציצה ליום הנשאל`;
15. site 4562 computes `dayInCutlet = Number(targetJdn - previousBoundary)`;
16. site 4563 reads the **1-based** `rawMonthId = structure.monthWeaving[offsetNumber]`;
17. site 4564 initializes `dayInMonth=0`;
18. loop sites 4565/4566 runs `i=0..offsetNumber` inclusive; every time `monthWeaving[i]===rawMonthId`, site 4567 increments `dayInMonth`;
19. construct:

   ```js
   new PastafariDate(
     year.number,
     structure.cutletNames[selectedCutlet],
     dayInCutlet,
     structure.monthNames[rawMonthId - 1],
     dayInMonth
   )
   ```

20. return through ritual RETURN, then through the inner function Proxy and outer witness Proxy layers already documented.

There is no prefix count for day-in-month: every conversion rescans the weaving prefix through the target offset.

## 19. Hidden-core year discovery

### 19.1 Anchor Year 5000 — ENTER 1165; sort callback ENTER 1166

Site 4568 allocates the anchor cache key:

```js
calculationJdn.toString()
```

A cache hit returns the cached `YearBounds`.

On miss, site 4569 calls:

```js
indices = this.gates.indicesBetween(
  calculationJdn - 5781n,
  calculationJdn + 5781n
)
```

Site 4570 allocates `candidates=[]`.

For every possible opening index in the materialized index list:

1. site 4571 reads `openingGate=this.gates.gate(openingIndex)`;
2. if `openingGate>=calculationJdn`, break the **outer** opening loop;
3. site 4572 starts `closingIndex=openingIndex+6`;
4. the inner loop increments closing index through site 4573;
5. site 4574 reads `closingGate=this.gates.gate(closingIndex)`;
6. site 4575 computes `length=Number(closingGate-openingGate)`;
7. if `length>5781`, break the inner loop;
8. if `closingGate<calculationJdn` or `length<252`, skip this candidate;
9. otherwise allocate and push `{length,openingIndex,closingIndex}`.

If the Array remains empty, the routine throws the specific Year-5000 candidate error.

`candidates.sort` uses ENTER 1166. It first compares `a.length-b.length`. On equal lengths, it **calls `gates.gate` again** for both opening indices and passes the resulting BigInts to M0's comparator; it does not tie-break by numeric gate index.

Site 4576 computes:

```js
choiceIndex = Number(
  makeSauce(calculationJdn, calculationJdn)
    .chooseIndex(1, 10n, BigInt(candidates.length))
)
```

Site 4577 reads the selected object. Site 4578 calls the private YearBounds builder. The result is inserted in both `anchorCache[key]` and `yearCache[`${calculationJdn}|5000`]` and returned.

The hidden-core upper candidate limit here is literal **5781**, not the public effective 5778.

### 19.2 Private YearBounds builder — ENTER 1167; Array.from callback ENTER 1168

The builder constructs:

```js
new YearBounds(
  yearNumber,
  this.gates.gate(openingIndex),
  this.gates.gate(closingIndex),
  Array.from(
    { length: closingIndex - openingIndex + 1 },
    callback
  )
)
```

The opening and closing gates are therefore read again. Every Array.from callback opens ENTER 1168 and returns `openingIndex+offset`. `YearBounds` then clones and freezes that newly allocated index Array again in its own M1 constructor.

### 19.3 Next year — ENTER 1169; sort callback ENTER 1170

Site 4579 computes `nextNumber=current.number+1n`; site 4580 allocates key `` `${calculationJdn}|${nextNumber}` ``. A year-cache hit returns immediately.

On miss:

1. site 4581 reads `openingIndex=current.gateIndices.at(-1)`;
2. site 4582 reuses `openingGate=current.closingGate` without rereading the boundary gate;
3. site 4583 allocates `candidates=[]`;
4. site 4584 sets `closingIndex=openingIndex+6`;
5. infinite loop site 4585 reads closing gate; site 4586 computes Number length;
6. break when `length>5781`;
7. when `length>=252`, push `{length,closingIndex}`;
8. site 4587 increments closing index.

Sort callback ENTER 1170 compares **length only** with `a.length-b.length`; no explicit tie-break is performed.

Site 4588 selects with:

```js
makeSauce(calculationJdn, openingGate)
  .chooseIndex(1, 11n, BigInt(candidates.length))
```

Sites 4589/4590 read the chosen candidate and build the next YearBounds. Store in `yearCache`, return.

### 19.4 Previous year — ENTER 1171; sort callback ENTER 1172

Site 4591 computes `previousNumber=current.number-1n`; site 4592 allocates its year-cache key. Site 4593 reads `closingIndex=current.gateIndices[0]`; site 4594 reuses `closingGate=current.openingGate` directly. Site 4595 allocates candidates; site 4596 starts `openingIndex=closingIndex-6`.

The loop reads `openingGate` at site 4597 and computes Number length at site 4598. Break above 5781; push candidates with length at least 252; site 4599 decrements opening index. Sort callback ENTER 1172 compares lengths only.

Site 4600 selects with:

```js
makeSauce(calculationJdn, closingGate)
  .chooseIndex(1, 12n, BigInt(candidates.length))
```

Sites 4601/4602 read/build the chosen previous year, cache, return.

### 19.5 Locate containing year — ENTER 1173

Site 4603 starts with `year=anchorYear(calculationJdn)`.

Through site 4604, while `targetJdn>year.closingGate`, replace year with `nextYear(...)`.

Through site 4605, while `targetJdn<=year.openingGate`, replace year with `previousYear(...)`.

The actual hidden-core membership interval is therefore:

```text
openingGate < targetDay <= closingGate
```

The first day is `openingGate+1`; the closing gate itself is the last day of that year.

## 20. Building and caching a `YearStructure` — ENTER 1174

### 20.1 Cache key and Sauce state

Site 4606 allocates key:

```js
`${calculationJdn}|${year.openingGate}|${year.closingGate}`
```

A structure-cache hit returns immediately.

Site 4607 obtains `state=makeSauce(calculationJdn,year.firstDay)`. Site 4608 reads `gapCount=year.gapCount`.

### 20.2 Number of cutlets — Array.from callback ENTER 1175

Site 4609 allocates the entire option Array:

```js
Array.from(
  { length: Math.min(17, gapCount) - 5 },
  callback
)
```

Every callback opens ENTER 1175 and returns `index+6`, materializing exactly `6,7,...,min(17,gapCount)`.

Site 4610 selects:

```js
cutletCount = options[
  Number(
    state.chooseIndex(2, 20n, BigInt(options.length))
  )
]
```

### 20.3 Required internal boundary at the calculation day

Site 4611 initializes `requiredBoundary=null`. Loop sites 4612/4613 visits only interior positions `1..year.gateIndices.length-2`. For each position it calls `this.gates.gate(year.gateIndices[position])`. Exact equality with `calculationJdn` causes site 4614 to store that interior gap position and break.

### 20.4 Cutlet-gap composition

Site 4615 calculates the count:

```js
requiredBoundary === null
  ? comb(gapCount - 1, cutletCount - 1)
  : comb(gapCount - 2, cutletCount - 2)
```

Site 4616 chooses rank through bowl 2 / seal 21. Site 4617 calls `unrankPositiveCompositionWithRequiredBoundary`; as documented in M5, that routine recursively recomputes its own total/memoized suffix counts rather than reusing the closed-form count calculated here. Result is `cutletGapCounts`.

### 20.5 Cutlet names

Site 4618 computes `fallingFactorial(17,cutletCount)`. Site 4619 chooses rank with bowl 5 / seal 22. Site 4620 calls `unrankPartialPermutation(CUTLET_NAMES,cutletCount,nameRank)`; the unranker itself recomputes falling-factorial totals/block sizes and allocates/splices its own working copy.

### 20.6 Number of months — Array.from callback ENTER 1176

Site 4621 reads `yearLength=year.length`.

Sites 4622/4623 compute:

```js
minMonths = Math.ceil(yearLength / 123)
maxMonths = Math.min(47, Math.floor(yearLength / 4))
```

Site 4624 allocates every integer in the inclusive range using `Array.from`; each callback opens ENTER 1176. Site 4625 chooses an element with bowl 3 / seal 30.

### 20.7 Month lengths

Site 4626 calls:

```js
boundedCompositionCount(
  yearLength,
  monthCount,
  4,
  123
)
```

Site 4627 chooses rank with bowl 3 / seal 31. Site 4628 calls `unrankBoundedComposition` with those same bounds. The unranker immediately recalculates the total and then repeatedly recalculates bounded suffix counts for candidate values, as specified in M5.

### 20.8 Month weaving

Site 4629 constructs `new MonthWeavingCounter(monthLengths)`, building its full jagged `h` DP table.

Site 4630 evaluates `counter.count` and uses bowl 4 / seal 32 to choose a rank. The `count` getter itself allocates a new `[0,...lengths]` vector and computes the completion count.

Site 4631 calls `counter.unrank(weavingRank)`. The first operation of that method accesses `this.count` again, causing another count-vector allocation/recount before candidate search. The returned month identifiers are 1-based and the Array length equals year length on a valid calendar structure.

### 20.9 Month names

Site 4632 computes `fallingFactorial(47,monthCount)`. Site 4633 chooses rank with bowl 5 / seal 33. Site 4634 partial-unranks `MONTH_NAMES`; the unranker again recomputes its own falling-factorial totals/block sizes and uses a mutable working Array with `splice`.

### 20.10 Structure object and cache

Site 4635 constructs:

```js
new YearStructure({
  year,
  cutletGapCounts,
  cutletNames,
  monthLengths,
  monthWeaving,
  monthNames
})
```

The M1 constructor stores `year` by reference, clones each of the five Arrays, freezes each clone, then freezes the instance. M8 stores the completed object in `structureCache` and returns it.


## 21. Public authoritative doorways and the 108-name Node namespace

The sealed 91-carrier object is no longer by itself the supported public authoritative semantics. Version 1.4.0 deliberately keeps the monster core and layers compensating detours outside it.

### 21.1 Browser doorway installation order

`browser/pastafari-calendar-core.js` imports the raw chronicle values, then executes these installations in source order:

```js
installGateDataDetour(GateIndex);
installYearCeilingDetourDetour(PastafariCalendar, GateIndex);
installYearCeilingDetourDetourDetour(PastafariCalendar, GateIndex);
installYearCeilingDetour(PastafariCalendar, GateIndex);
installAuthoritativeCacheEpochDetour(PastafariCalendar);
installMonthWeavingGhostDetour(MonthWeavingCounter, comb);
```

Because each `PastafariCalendar.convertJdn` installer captures the then-current method and replaces it, actual call nesting is the reverse of installation at the outer edge:

```text
cache-epoch wrapper
  -> historical year-ceiling wrapper
      -> third-level ceiling supervisor
          -> second-level anchor-matrix ceiling repair
              -> hidden M8 convertJdn
```

The gate shadow is a `GateIndex` prototype wrapper installed before those `convertJdn` layers. The MonthWeaving detour modifies the public M5 prototype separately.

The browser doorway then creates deterministic nonpositive-year converter wrappers and an Intl semantic firewall. It explicitly exports the detoured `bahaiToJdn`, `calendarDateToJdn`, `chineseToJdn`, `copticToJdn`, `ethiopicToJdn`, `hebrewToJdn`, `islamicCivilToJdn`, `islamicToJdn`, and `sakaToJdn`; `export *` supplies the remaining chronicle bindings. Explicit exports win over same-named star exports.

### 21.2 Node/package doorway and 108 exports

`src/public-api.js` performs the same gate/ceiling/cache/MonthWeaving installations on its separately packed authoritative copy, constructs the same nonpositive-year detours, and then adds deterministic Kōki, Chinese, and Vikrama routes before star-re-exporting the 91 core names.

The Update-19 API audit measured:

```text
sealed authoritative exports  91
fast exports                  13
public package exports       108
```

The 108 public names consist of:

- the 91 sealed carrier names, with same-named public converter bindings overriding selected raw exports;
- the seven adjacent reverse/constraint names already documented by the earlier edition: `PastafariReverseClient`, `findPastafariDate`, `SAME_AS_TARGET`, `sharedPastafariReverseClient`, `PastafariConstraintClient`, `sharedPastafariConstraintClient`, `solvePastafariConstraints`;
- ten added normative API names: `ChineseStructuredDate`, `chineseStructuredDateToJdn`, `jdnToChinese`, `KokiDate`, `kokiToJdn`, `jdnToKoki`, `VikramaDate`, `VIKRAMA_MONTH_NAMES`, `vikramaToJdn`, `jdnToVikrama`.

The package still rebinds `PastafariCalendar` to a friendly subclass of the monster class. Its constructor behavior is unchanged from the earlier edition: omitted options or an object lacking `todayProvider` cause a fresh options object with imported `localToday` to be passed to `super`; explicit `todayProvider`, `null`, or other values go directly to the hidden constructor path.

### 21.3 Nonpositive-year deterministic detour

`createProlepticNegativeYearDetours` preserves positive-year/raw behavior and diverts only supported nonpositive-year class instances for the normative arithmetic representations. The affected public routes are actual nonpositive-year instances of `HebrewDate`, `IslamicCivilDate`, `SakaDate`, `EthiopicDate`, `CopticDate`, and `BahaiDate` with variant `"western-arithmetic"`. A generic `IslamicDate` merely carrying `variant:"civil"` is **not** recognized by this side-door unless it is an `IslamicCivilDate` instance; unrecognized shapes fall through to the captured raw converter. The detour calls the deterministic converter layer in `docs/calendar-converters.js`; unsupported variants and positive years fall through to the raw converter.

This fixes public proleptic coverage without rewriting M4's historical positivity checks. Official/host-backed variants are not silently reclassified as normative.

### 21.4 Deterministic Chinese public route

`src/chinese-calendrica-detour.js` is a source-locked JavaScript port/derivative of CALENDRICA 4.0 plus the project's deep-antiquity Delta-T rule `PASTAFARI_CHINESE_DEEP_DELTA_T_V1`. It contains **no `Intl`/ICU dependency**. Large astronomical coefficient tables are bound here by the module SHA-256 in §1 rather than recopied.

Core fixed-coordinate constants are:

```text
RD_JDN_OFFSET                 1721425
J2000                         730120.5
mean tropical year            365.242189
mean synodic month            29.530588861
winter longitude              270 degrees
deep Delta-T threshold year   -1999
deep Delta-T multiplier       26/25
Chinese epoch                 fixedFromGregorian(-2636, 2, 15)
```

For years below `-1999`, the ordinary long-range ephemeris-correction polynomial is multiplied by `26/25`. Other year ranges follow the source-locked piecewise CALENDRICA correction functions implemented in the module.

`ChineseStructuredDate(cycle, yearInCycle, month, day, options)` stores `calendar="chinese"`, safe-integer cycle/year/month/day, normalizes `leap`/`leapMonth` by exact `=== true`, derives sexagesimal stem/branch names and indices from `yearInCycle`, aliases `leapMonth` to the same boolean, then freezes the instance.

`fixedFromChinese` requires year-in-cycle 1..60, month 1..12 and day 1..30. It estimates the mid-year from the epoch, finds Chinese New Year on/before it, advances to the candidate new moon for the requested month, checks leap-month identity through the reverse conversion, and returns candidate new-moon fixed day + `day-1`.

`chineseFromFixed` computes solstices/new moons/major solar terms, determines leap-year/month status, derives cycle/year-in-cycle/month/day and sexagesimal names, then locates that Chinese year's non-leap month-1 day-1 to derive `relatedYear` from its Gregorian year. Returned records are frozen.

Public conversions are:

```text
chineseStructuredDateToJdn(value) = fixedFromChinese(value) + 1721425
jdnToChinese(jdn)                  = chineseFromFixed(jdn - 1721425)
```

For the legacy public `ChineseDate(relatedYear,month,day,{leapMonth})` representation, `chineseRelatedDateToFixed` scans a bounded Gregorian neighborhood to locate the matching Chinese New Year, converts the requested month/day within the discovered cycle/year, reverse-checks `relatedYear/month/day/leap`, and rejects nonexistent representations. Node `chineseToJdn` routes structured shapes first, related-year shapes second, and only unknown/non-normative shapes to the sealed host-backed converter.

The browser core's Update-13 firewall performs the equivalent semantic separation with a Proxy-backed “shadow desk”: recognized Chinese normative shapes go directly to this deterministic engine; the old host-Intl Chinese path survives only behind a tainted diagnostic receipt and cannot cross the normative path.

### 21.5 Kōki

Kōki is a separate signed proleptic representation, **not** an alias inserted into M4's historical Japanese-era table.

```text
KOKI_GREGORIAN_YEAR_OFFSET = 660
Kōki year = astronomical Gregorian year + 660
```

`KokiDate` accepts BigInt, safe-integer Number, or signed decimal integer String for the year; validates month 1..12 and day against the corresponding Gregorian year/month; stores both `calendar` and `system` as `"koki"`; then freezes the instance.

Every forward conversion deliberately visits the old imperial machinery first with synthetic `era:"koki"`; the expected rejection is swallowed. Normative output then calls the old generic calendar doorway with a Gregorian object whose year is `koki.year - 660`. Reverse conversion uses a local exact BigInt JDN-to-Gregorian decomposition, constructs the Kōki date, deliberately visits the same dead-end imperial route, and returns a frozen plain Kōki record. The decorative dead end therefore still executes without being allowed to define Kōki semantics.

### 21.6 Vikrama

The Vikrama side route is a modified source-locked CALENDRICA 4.0 traditional Hindu lunisolar/new-moon implementation. Important constants include:

```text
FIXED_TO_JDN       1721425
HINDU_EPOCH       -1132959
HINDU_LUNAR_ERA   3044
UJJAIN_LATITUDE   23 + 9/60 degrees
SEARCH_RADIUS     70 fixed days
```

`VikramaDate` stores a signed exact BigInt year, month 1..12, tithi 1..30, boolean `leapMonth` and `leapTithi`, calendar tag `"vikrama"`, then freezes. Month names are the frozen 12-name `VIKRAMA_MONTH_NAMES` Array.

The implementation intentionally retains a legacy crooked witness. Forward conversion first constructs `OldHinduLunarDate(year + 3044, month, tithi, {leapMonth})` and calls the sealed `hinduToJdn`. It then independently computes the source-locked normative fixed day, using the legacy result only as a search hint, calculates `hiddenCorrection = normativeJdn - witnessJdn`, and returns `witnessJdn + hiddenCorrection`. Reverse conversion independently derives the source-locked Vikrama record, calls the same legacy witness, and verifies that `witnessJdn + (requestedJdn-witnessJdn)` reconstructs the requested JDN before returning the frozen structured record.

Thus the old Hindu path executes but cannot override the source-locked Vikrama answer.

### 21.7 MonthWeaving public-domain repair

`installMonthWeavingGhostDetour` captures the raw M5 `count` getter and `unrank` method. It preserves the raw implementation unchanged for domains with no month length `1`. For domains containing singleton months:

1. it verifies the constructor's public shape (`lengths`, `monthCount`, `totalLength`, `prefix`);
2. treats every singleton as a hard first/last-order separator;
3. builds legacy `MonthWeavingCounter` instances for each maximal non-singleton run;
4. multiplies those independent legacy counts to form the corrected public count;
5. maps a global unrank rank through suffix products into each run, calls the legacy `unrank` locally, offsets labels, and inserts singleton labels between runs;
6. provides a public `rank` that validates the weave, ranks each non-singleton run with the same legacy completion-count machinery, and combines local ranks in mixed-radix/product order.

The corrected ledger is cached per public counter instance in a WeakMap. The public `count` getter intentionally calls the legacy getter before substituting the corrected singleton-domain count, preserving the old census side effect.

### 21.8 Reverse, constraint and diagnostics adjacent subsystems

The seven reverse/constraint exports and their shared Worker/diagnostics infrastructure remain adjacent to the forward sealed 91-carrier engine exactly as in the prior architecture edition. They do not become carrier slots and do not become a normative oracle. They remain non-oracular clients. In particular, the constraint solver's leaf-level full verification calls the supported `calendar.convertJdn(target,{calculationJdn})` and therefore traverses the public detours above. The reverse engine retains its separately documented readable/search machinery and must not be described as an alternate normative authority merely because it is package-exported.

## 22. Public 5,778-year ceiling stack and runtime-patch ownership

The hidden M8 year-search loops still contain literal upper limit **5781**. Version 1.4.0 continues to enforce the Scroll's **5778** ceiling externally, but the original single prototype monkey patch has grown two compensating supervisors and a reentrancy/late-patch ledger.

### 22.1 Historical ceiling detour retained

`year-ceiling-detour.js` still derives `5778n` on every wrapped conversion by freezing `[1n,1n,1n]`, reducing it to `3n`, and subtracting from historical `5781n`. It separately computes `5782n = 5781n + 1n`. Hence lengths 5779, 5780 and 5781 are exactly the forbidden interval.

Its temporary `GateIndex.prototype.gate` costume always calls the delegated/original gate reader first. For recognized forbidden candidates it returns an artificial gate observation producing length 5782, so the hidden `>5781` check rejects/breaks before the candidate can enter cardinality/selection. This deliberately preserves the old hidden algorithm rather than changing its literal constant.

### 22.2 Second-level anchor-matrix repair

`year-ceiling-detour-detour.js` was added because the historical pre-anchor ascending-scan state could miss a forbidden first row/turn. It tracks the ascending candidate run before a relevant year is cached and, when the first eligible `+1` scan identifies a candidate at least six gates from the opening, converts a true 5779..5781 length into the same 5782 poison observation. Once the active calculation day's year state is established it yields to the older/cached logic rather than defining a second year algorithm.

### 22.3 Third-level cached-poison supervisor

`year-ceiling-detour-detour-detour.js` supervises the historical detour after multi-year/cache traversal. It captures a canonical gate reader at installation and recognizes the historical poison pattern at a cached boundary (`boundary ± 5782`). It searches active calculation-day cached boundaries using canonical gate values. If the nearest active candidate truly has length 5779..5781 it preserves the poison; otherwise it repairs the returned gate back to the canonical day. This prevents a poison derived from an older/irrelevant cached year from changing a later legal candidate.

### 22.4 `runtime-patch-ledger.js`

All three ceiling layers use a shared runtime-patch ownership system rather than blindly assigning/restoring the prototype.

The ledger maintains:

```text
WeakMap target/property wardrobes
WeakMap installed-function -> owner frame
invocation token stack
trace-hook Set
monotonic ticket counter
```

The historical outer ceiling detour borrows a **fresh** invocation token; nested supervisor layers normally reuse the current token. Installation captures the exact property descriptor visible at that layer's entry, peels known foreign/project costumes to the appropriate delegate, creates the new wrapper, and records descriptor/owner/delegate identity.

Restoration intentionally preserves the historical mistake as an observable step: `runHistoricalRestoreThenRepair` first attempts the old `Reflect.set(target,property,historicalValue)`. It then inspects whether the installed descriptor was externally modified while active. If untouched, it restores the exact descriptor that existed on layer entry; if a caller installed a late monkey patch, that later descriptor wins and is restored instead. Nested frames are removed from their wardrobe without clobbering sibling/outer ownership.

This is why reentrant depth, multiple calendar instances, exceptions and late user monkey patches no longer make normative results depend on restoration order even though temporary prototype mutation still executes.

### 22.5 Effective candidate rule

For supported public conversions the effective invariant is now:

```text
candidate year length must satisfy 252 <= length <= 5778
filtering occurs before candidate cardinality and sauce-based selection
same rule applies while moving to next or previous years
```

The hidden 5781 code and 5782 poison mechanism remain architectural fossils/indirection. Update-18/19 differential evidence verifies the **effective** public result against the independent Scroll-derived reference rather than treating the poison mechanism itself as normative.

## 23. Cache-epoch fossil mask and conversion transactions

`browser/cache-epoch-detour.js` is installed outermost on `PastafariCalendar.convertJdn` after the ceiling stack. It exists because raw `anchorCache`, `yearCache`, and `structureCache` Maps may contain values computed under an older semantic epoch, including values created before detours were installed or before current gate/year semantics.

### 23.1 Semantic epoch

The epoch is deliberately semantic rather than package-version based:

```text
id = scroll-d36b0c94+sauce-bowlsum+gate-shadow-d36b0c94+year-ceiling-5778
Scroll SHA-256 = d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96
Sauce marker = final-stir-u-uses-bowlSum
gate marker = pastafari-gate-shadow-v1:d36b0c94
year ceiling = 5778
```

### 23.2 Dressing a cache

The original Map object is kept alive. The detour installs own `get`, `has`, `set`, `delete`, `clear`, `entries`, `keys`, `values`, `forEach`, iterator and `size` behavior on it and attaches hidden state containing:

```text
normative shadow Map
per-key provenance Map
foreign-overrides Set
nested transaction stack
semantic-read depth
fossil-entry count / previous-epoch metadata
```

During an authoritative conversion (`depth>0`), reads see **only** the semantic shadow. A raw historical entry with the same key is a masked fossil. Authoritative writes go only to the shadow and receive provenance `{algorithmMarker: epoch.id, writer:"PastafariCalendar.convertJdn"}`.

Outside an authoritative conversion, the object remains observably Map-like: external writes go to the raw Map and are marked as foreign overrides; ordinary reads/iteration merge shadow and raw state with an explicit foreign override taking precedence outside the semantic read. This preserves public mutability/compatibility without allowing external or stale values to decide an in-progress normative conversion.

### 23.3 Nested success/failure transactions

At each `convertJdn` entry all three available caches begin a transaction and increment depth. Before the first shadow mutation of a key, the transaction records whether shadow value/provenance existed and their prior values.

On success, the transaction commits; a nested commit transfers its original-before snapshots to the parent only for keys the parent has not already recorded. On failure, snapshots are replayed in reverse, restoring/deleting shadow values and provenance exactly to invocation entry. Depth is decremented in reverse cache order in `finally`.

Thus cold/warm history, failed calls, nested calls, instance age and pre-detour raw cache fossils are no longer semantic inputs, while the historical Maps physically survive.

## 24. Proleptic and host-calendar semantic boundary

The raw M4 converter inventory in §12 remains an execution specification of the sealed module, including its `Intl`/ICU calls and positive-year restrictions. Supported public semantics are narrower and differently routed.

### 24.1 Normative deterministic routes

The 1.4.0 public normative matrix treats the following calendar representations as deterministic and host-independent for their specified domain: Gregorian, Julian, Hebrew, Islamic civil, Solar-Hijri arithmetic, Saka, Thai Buddhist, Ethiopic, Coptic, Minguo, Bahá’í western arithmetic, Maya Long Count, source-locked Chinese, Vikrama, and Kōki. Nonpositive-year detours apply where the sealed converter's historical validator was narrower than the Scroll/public contract.

### 24.2 Host-backed convenience routes

The sealed/raw M4 paths for Umm al-Qura, official Persian, and legacy Chinese still use host `Intl`/ICU. The supported browser Chinese path is intercepted before that host route; Node recognizes structured/related Chinese shapes and sends them to the deterministic source-locked engine. Umm al-Qura and official Persian remain host-provided convenience representations rather than normative semantic authorities.

Update-13 fault injection exercised normal, throwing, fake-parts, wrong-value and alien-name host behavior; normative routes remained independent of those injected Intl behaviors. Keeping the host code in the sealed payload is intentional compatibility/spaghetti preservation, not permission for it to decide a normative value.

## 25. Authoritative Worker and distribution boundaries

The authoritative Worker file itself is byte-identical to the earlier edition, but its dynamic import now resolves the **multi-detour** `browser/pastafari-calendar-core.js`. Therefore the Worker's singleton `PastafariCalendar` instance inherits the canonical gate shadow, three-level ceiling supervision, cache epoch and generated-runtime fixes without the Worker reimplementing them.

Its transport behavior remains:

- one `enginePromise` singleton and remembered preload failure;
- `toBigInt` accepts bigint or signed decimal integer String, not arbitrary Number;
- `convert` and `convertJdnRange` call the supported calendar with explicit `calculationJdn`;
- `getCutletView` repeatedly performs supported authoritative conversion and validates consecutive `dayInCutlet` values;
- canonical transport converts `year` to String and day fields to Number, so `PastafariDate` object identity/prototype does not cross the Worker boundary;
- safe-integer message IDs and serialized success/error responses are unchanged.

The standalone build embeds authoritative and fast Worker sources behind the router. Update 13/18/19/20 evidence treats Node, browser, real Worker and standalone parity as separate conformance surfaces rather than assuming bundling preserves semantics.

## 26. Current state/cache inventory

| state | owner | current persistence / repair rule |
|---|---|---|
| static loader state / decoded share buffers | chronicle import | import-time; reconstructed buffers overwritten after Function construction |
| random pool + cursor | Dynamic 00 closure | persistent refill state; decorative, not normative selector |
| limited-scorer WeakMap + identity counter | Dynamic 00 closure | persistent on success; Update-8 constructor transactions roll back newly published failed-call identities/counter |
| generated shared Array | Dynamic 00/01 | persistent registry/scratch; normal frames truncate; Update-8 inner exception rollback + Update-15 outer-apply guard restore invocation-entry length on failures |
| short-transfer counter | Dynamic 00 closure | persistent decorative state |
| M5 binomial Map | M5 module | unbounded; no semantic-history dependence demonstrated in final audit |
| raw MonthWeaving DP rows | counter instance | mutable historical state; public singleton-domain correction uses external WeakMap ledger |
| corrected singleton MonthWeaving ledger | `month-weaving-domain-detour.js` | WeakMap per counter instance |
| Sauce Map | M6 module | 1,024-entry LRU as decoded |
| raw M7 40k positive gaps | hidden module / GateIndex construction | retained historical fossil; detached from supported instance on first public gate/boundary read |
| canonical positive gate Array | `gate-data-detour.js` module | decoded once/frozen; each GateIndex gets a mutable slice on first public use |
| forward/backward dynamic gap Maps | M8 module | shared/unbounded; dynamic current Sauce values |
| positive/negative GateIndex Arrays | each GateIndex | positive starts historical then public-primes to canonical 0..40000 and extends dynamically; negative extends dynamically |
| raw anchor/year/structure Maps | each PastafariCalendar | physically retained and externally observable; semantic reads mask them as fossils |
| semantic cache shadows/provenance | cache-epoch hidden state | per dressed Map, current epoch only; nested transaction commit/rollback |
| foreign cache overrides | cache-epoch hidden state + raw Map | observable outside conversion; excluded from semantic reads |
| runtime-patch wardrobes/owners | `runtime-patch-ledger.js` | WeakMap-managed nested frames; cleaned on restoration |
| runtime invocation pile | runtime-patch ledger | token stack; nested ceiling layers share token as designed; outer conversion returns token |
| reverse/constraint client pending Maps | adjacent clients | request lifecycle state, not sealed forward semantics |
| authoritative Worker calendar/promise | Worker module | singleton until Worker realm ends |

## 27. Randomness, history and determinism after remediation

Randomness/noise/witness machinery still genuinely executes. The astronomy ceremony, route ceremony, Array Proxy, transfer mechanisms, WeakMap identities and outer generated proxies still consume random/host values and can change allocations, branch forms and diagnostics. They are intentionally **not removed**.

The final 1.4.0 invariant for a legal semantic request is nevertheless:

```text
same legal (calculationJdn, targetJdn)
    -> same normative Pastafarian result
```

independent of random values/call count, witness contents, successful unrelated allocation history, failed-call history, instance age, import order, stale raw cache entries and diagnostics clocks. The mechanisms that enforce this are distributed: generated source transaction guards, gate regeneration/shadowing, ceiling patch ownership, cache epoch masking/rollback, and deterministic external-calendar routes.

Random/host **exceptions** may still make the call fail when they occur in machinery that actually executes; the remediation rule is that such a failure cannot leave semantic state that changes a later legal call, and diagnostic-only host failures are prevented from replacing a semantic result/error. Update 15 plus Update 19's fresh random/crypto profiles are the controlling evidence for that distinction.

## 28. Current deviations, fossils, and intentional hazards

The following are current architectural facts, not unresolved normative mismatches:

1. The encrypted payload is not regenerated for several fixes. Current compiled semantics depend on deterministic source transformation (`E6`–`EC`, `U15D/U15E`). A future source-shape change that defeats one of the unique textual anchors is intentionally fatal rather than silently falling back.
2. M7's embedded 40,000-gap table is still historically stale. Supported `GateIndex` instances detach from it on first public use and substitute the separately regenerated source-derived shadow. Direct raw-chronicle use without the doorway can still expose the fossil behavior and is not the supported authoritative contract.
3. Hidden M8 still says 5781 while the public contract is 5778. The three-level ceiling detour plus runtime patch ledger creates the effective rule. Direct hidden-core calls that bypass installation do not represent 1.4.0 public semantics.
4. Hidden `PastafariCalendar` still has its unbound default-provider defect; the package subclass/Worker inject a provider.
5. Raw M4 still contains host-Intl Chinese/Umm-al-Qura/official-Persian paths. Normative Chinese is intercepted; the latter host-provided representations remain convenience paths rather than Scroll-defined authority.
6. Raw M5 still contains the singleton ghost-rank behavior. Supported doorways install the product-space singleton detour and add public `rank`.
7. Cache Maps, GateIndex arrays, MonthWeaving internals and multiple public objects remain mutable by design. Current semantic isolation relies on masking/ownership/transaction detours rather than immutability cleanup.
8. Prototype mutation still occurs during year-ceiling conversion. The runtime-patch ledger makes reentrancy and late external patches ownership-safe, but the mutation remains observable while active.
9. Several decorative dead ends deliberately execute: obsolete gate arrays are built then detached; Kōki asks the legacy imperial machinery to reject synthetic era `koki`; Vikrama computes a legacy Old-Hindu witness before applying the hidden source-locked correction.
10. Some caches remain unbounded. Final audits found no normative history dependence, but memory growth is a resource characteristic, not erased by semantic correctness.

Items that appeared as “known current deviations” in the old baseline but are **no longer current public defects** include the stale positive-gate semantics, constructor +12 leak, WeakMap identity publication after failed construction, reentrant year-ceiling restoration bug, import-order/cache semantic dependence, singleton MonthWeaving count/unrank disagreement, normative Chinese ICU dependence, and the missing proleptic Kōki/Vikrama/negative-year routes.

## 29. Normative source-of-truth and conformance architecture

Update 16 established an explicit authority graph:

```text
sources/מגילת העיתים.md
  -> clear independent reference (verification/reference-oracle/reference.mjs)
      -> canonical/conformance evidence generated from the reference
          -> authoritative spaghetti engine under test
          -> fast engine under test
          -> other implementations under test
```

Forbidden edges include reference -> authoritative, reference -> fast, reference -> existing expected vectors/generators, authoritative -> reference at runtime, and fast -> reference at runtime. The reference has no production imports and no fixture fallback.

Accordingly this document's word **authoritative** is architectural/historical: it identifies the deliberately tangled production engine whose exact execution is specified here. It does **not** mean “normative oracle”. When production and the Scroll-derived reference disagree, the reference/Scroll conformance analysis is the judge; production output is not promoted to expected data merely because it is current or because fast agrees with it.

Update 17 regenerated the canonical evidence corpus from the independent reference. Update 18 performed broad differential integration with expected values always coming from that reference. Update 19 independently replayed the requirements and closed with `FINAL_AUDIT_PASS`, all 27 final requirements passing, Updates 1–18 all marked passed, no blockers, and release gate `UPDATE_20_ALLOWED`. Update 20 then merged the 1.3.0 -> 1.4.0 version/closure changes; its manifest sets `semanticProductionChangeAllowed:false`. The uploaded source ZIP contains the pre-CI closure manifest rather than the generated final Actions closure artifact, so this document does not manufacture a final CI status.

## Appendix A — current identity layers

| artifact | identity / status |
|---|---|
| decoded Dynamic 00 | 7,420,147 bytes; SHA-256 `de4ef2f1a6be8e002a2d304e933df67a64dc013344437775baa5babe22b259fc`; transformed before current compilation |
| decoded Dynamic 01 | 7,083,974 bytes; SHA-256 `3ae100735a87cff040c5b88140bd366ca0ad15d70a2ad036bc497e809ffaf612`; inner executor transformed before current compilation |
| M6 decoded body | 152,995 bytes; SHA-256 `3ae2870ea230fe21e207dc390ccbdd2b8c9c8f8d1b03c8a9a276d779e1205be0`; current final-stir compiled semantics differ |
| raw M7 decoded forward gaps | 80,000 bytes / 40,000 uint16 values; SHA-256 `2321775cd22a1156751fe506320d4afc47b27f391092645921df4b54d9ab49bb`; historical fossil |
| public regenerated positive-gap dataset | SHA-256 `3d78c120dffd62aac0ededd72ee6ae412a3e9ee21700dcd25f475c48263b93b3`; 40,000 current normative gaps |
| Scroll | `sources/מגילת העיתים.md`; SHA-256 `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96` |
| independent reference | `verification/reference-oracle/reference.mjs`; SHA-256 `40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379` |

A decoded payload hash is not automatically a compiled-source hash. A sealed-carrier hash is not automatically a supported-public-behavior hash. Those distinctions are deliberate and must survive future audits.

## Appendix B — minimum 1.4.0 implementation audit checklist

A future revision still matches this specification only if an audit explicitly checks at least:

- current binding hashes or intentional changes to them;
- 193-fragment reconstruction and 91-carrier ordering;
- decoded Dynamic 00/01 identities plus all current source-transform anchors `E6`–`EC`, `U15D`, `U15E`;
- Update-8 arena/identity rollback on failed construction and Update-15 pre-inner-try `apply` rollback;
- M6 final-stir distinction: raw `bowlSum` in `u`, kept `orderNumber` only for permutation selection;
- source-derived gate shadow identity, 40,000 gaps, Foundation/first/last seals, and first-use priming;
- dynamic positive extension from canonical gate 40000 and dynamic negative gates;
- effective 252..5778 year candidate filtering before cardinality in anchor/next/previous traversal;
- all three ceiling layers under runtime-patch-ledger ownership, including nested depth, exceptions and late external monkey patches;
- cache epoch masking and nested transaction rollback/commit under cold/warm/import-order/instance-age/failed-history scenarios;
- raw and public MonthWeaving domains, including singleton count/rank/unrank round-trip;
- deterministic nonpositive-year routes;
- Chinese structured/related deterministic route and zero normative dependence on Intl/ICU;
- Vikrama and Kōki Foundation/negative/modern round-trips;
- Node 108-export public surface and package-install smoke;
- Browser, Worker and standalone parity;
- independent reference authority with forbidden production/reference dependency edges;
- canonical evidence regeneration from the reference, not from production output;
- fresh holdouts capable of detecting shared production bugs.

## Appendix C — remediation-series evidence binding

This edition is reconciled from the final code **and** the remediation evidence rather than blindly applying old measurements. Important controlling artifacts in the uploaded tree include:

```text
artifacts/update-08-final-report.md
artifacts/update-09-final-report.md
artifacts/update-10-closure.json
artifacts/update-11-vikrama-final-audit.json
artifacts/update-12-koki-post-fix-evidence.json
artifacts/update-13-normative-representation-matrix.json
artifacts/month-weaving-domain-after.json
artifacts/update-15-random-witness-isolation-report.md
artifacts/update16/oracle-authority-audit.json
verification/update17/generated/normative-evidence-manifest.json
artifacts/update-18/final-differential-integration.json
artifacts/final-release/update19-final-evidence.zip
UPDATE20-DELTA-MANIFEST.json
RELEASE-NOTES-1.4.0.md
```

Historical “before” evidence is retained only to explain why compensating detours exist. It is not allowed to override current code or the final independent audit.

## Appendix D — completeness boundary

This specification is complete at the execution-semantics, state-transition, allocation-class, loop-family, dynamic-code-boundary, public-carrier, detour, cache/state-ownership and supported-public-routing level. It does not reproduce every AST ledger row or every astronomical coefficient literal when the exact production module is bound by hash and the consumption rule is stated.

“No-skip” therefore means no known execution layer is silently replaced by a cleaner intended formula. The historical/ugly operations are recorded when they still execute — even when a later compensating layer prevents them from deciding semantics. Conversely, a historical defect that has been shadowed/rolled back is not mislabeled as a current public defect merely because its original text still exists inside the sealed payload.

---

**End of the reconciled Pastafari Calendar 1.4.0 authoritative-engine execution specification.**

