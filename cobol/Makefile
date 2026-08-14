SHELL := /bin/sh

COBC ?= cobc
CC ?= cc
CFLAGS ?= -O2 -std=c11 -Wall -Wextra -Werror
COBFLAGS ?= -free -Wall -Icopybook
BUILD := build
RUNTIME_OBJ := $(BUILD)/pastafari_bigint.o
ENGINE_MODULE := $(BUILD)/pastafari-engine.so
VECTOR_EXE := $(BUILD)/pastafari-vectors

.PHONY: all clean runtime module vectors test c-test

all: module vectors

$(BUILD):
	mkdir -p $(BUILD)

$(RUNTIME_OBJ): runtime/pastafari_bigint.c runtime/pastafari_bigint.h | $(BUILD)
	$(CC) $(CFLAGS) -fPIC -Iruntime -c runtime/pastafari_bigint.c -o $@

runtime: $(RUNTIME_OBJ)

$(ENGINE_MODULE): src/pastafari-engine.cob copybook/pastafari-engine.cpy $(RUNTIME_OBJ) | $(BUILD)
	$(COBC) $(COBFLAGS) -m -o $@ src/pastafari-engine.cob $(RUNTIME_OBJ) -lgmp

module: $(ENGINE_MODULE)

$(VECTOR_EXE): test/pastafari-vectors.cob src/pastafari-engine.cob copybook/pastafari-engine.cpy $(RUNTIME_OBJ) | $(BUILD)
	$(COBC) $(COBFLAGS) -x -o $@ test/pastafari-vectors.cob src/pastafari-engine.cob $(RUNTIME_OBJ) -lgmp

vectors: $(VECTOR_EXE)

$(BUILD)/test-bigint: test/test-bigint.c runtime/pastafari_bigint.c runtime/pastafari_bigint.h | $(BUILD)
	$(CC) $(CFLAGS) -Iruntime test/test-bigint.c runtime/pastafari_bigint.c -lgmp -o $@

c-test: $(BUILD)/test-bigint
	$(BUILD)/test-bigint

test: c-test vectors
	node test/compare-with-js.mjs

clean:
	rm -rf $(BUILD)
