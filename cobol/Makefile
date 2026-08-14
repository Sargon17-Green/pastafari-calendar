SHELL := /bin/sh

COBC ?= cobc
CC ?= cc
CFLAGS ?= -O2 -std=c11 -Wall -Wextra -Werror
COBFLAGS ?= -free -Wall -Icopybook
BUILD := build

UNAME_S := $(shell uname -s 2>/dev/null || echo unknown)
ifneq (,$(findstring MINGW,$(UNAME_S)))
EXEEXT := .exe
SHLIBEXT := .dll
PICFLAGS :=
else
EXEEXT :=
SHLIBEXT := .so
PICFLAGS := -fPIC
endif

RUNTIME_OBJ := $(BUILD)/pastafari_bigint.o
ENGINE_MODULE := $(BUILD)/pastafari-engine$(SHLIBEXT)
VECTOR_EXE := $(BUILD)/pastafari-vectors$(EXEEXT)
BATCH_EXE := $(BUILD)/pastafari-batch$(EXEEXT)

.PHONY: all clean runtime module vectors batch test c-test hash-check validation soak

all: module vectors batch

$(BUILD):
	mkdir -p $(BUILD)

$(RUNTIME_OBJ): runtime/pastafari_bigint.c runtime/pastafari_bigint.h | $(BUILD)
	$(CC) $(CFLAGS) $(PICFLAGS) -Iruntime -c runtime/pastafari_bigint.c -o $@

runtime: $(RUNTIME_OBJ)

$(ENGINE_MODULE): src/pastafari-engine.cob copybook/pastafari-engine.cpy $(RUNTIME_OBJ) | $(BUILD)
	$(COBC) $(COBFLAGS) -m -o $@ src/pastafari-engine.cob $(RUNTIME_OBJ) -lgmp

module: $(ENGINE_MODULE)

$(VECTOR_EXE): test/pastafari-vectors.cob src/pastafari-engine.cob copybook/pastafari-engine.cpy $(RUNTIME_OBJ) | $(BUILD)
	$(COBC) $(COBFLAGS) -x -o $@ test/pastafari-vectors.cob src/pastafari-engine.cob $(RUNTIME_OBJ) -lgmp

vectors: $(VECTOR_EXE)

$(BATCH_EXE): test/pastafari-batch.cob src/pastafari-engine.cob copybook/pastafari-engine.cpy $(RUNTIME_OBJ) | $(BUILD)
	$(COBC) $(COBFLAGS) -x -o $@ test/pastafari-batch.cob src/pastafari-engine.cob $(RUNTIME_OBJ) -lgmp

batch: $(BATCH_EXE)

$(BUILD)/test-bigint$(EXEEXT): test/test-bigint.c runtime/pastafari_bigint.c runtime/pastafari_bigint.h | $(BUILD)
	$(CC) $(CFLAGS) -Iruntime test/test-bigint.c runtime/pastafari_bigint.c -lgmp -o $@

c-test: $(BUILD)/test-bigint$(EXEEXT)
	$(BUILD)/test-bigint$(EXEEXT)

hash-check:
	sha256sum -c SHA256SUMS.txt

test: hash-check c-test vectors
	node test/compare-with-js.mjs

# Standard pre-merge cross-engine validation. Counts can be overridden with
# PASTAFARI_COBOL_* environment variables documented in README.md.
validation: c-test batch
	node test/soak-compatibility.mjs

# Heavier local qualification run. This intentionally is not part of the
# default GitHub Actions job because runtime depends strongly on the host.
soak: c-test batch
	PASTAFARI_COBOL_CASES=$${PASTAFARI_COBOL_CASES:-100000} \
	PASTAFARI_COBOL_REVERSE_CASES=$${PASTAFARI_COBOL_REVERSE_CASES:-10000} \
	PASTAFARI_COBOL_INVALID_REVERSE_CASES=$${PASTAFARI_COBOL_INVALID_REVERSE_CASES:-1000} \
	PASTAFARI_COBOL_JS_REVERSE_CASES=$${PASTAFARI_COBOL_JS_REVERSE_CASES:-2000} \
	PASTAFARI_COBOL_SELF_CASES=$${PASTAFARI_COBOL_SELF_CASES:-500} \
	PASTAFARI_COBOL_SELF_RANGE_CASES=$${PASTAFARI_COBOL_SELF_RANGE_CASES:-50} \
	node test/soak-compatibility.mjs

clean:
	rm -rf $(BUILD)
