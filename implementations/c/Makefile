CC ?= cc
BUILD_DIR ?= build
CFLAGS ?= -O3 -DNDEBUG -std=gnu17 -Wall -Wextra -Wconversion -Wshadow
CPPFLAGS ?= -Iinclude
LDFLAGS ?=
CORPUS ?= ../tests/oracle-differential-10000.tsv

CORE_SOURCES := pastafari_core.c
CORE_DEPENDENCIES := src/wideint.c src/calendar_core.c src/gate_checkpoints.h \
                     include/wideint.h include/calendar_core.h
LIBRARY := $(BUILD_DIR)/libpastafari_core.so
PROGRAM := $(BUILD_DIR)/pastafari-calendar

.PHONY: all test test-canonical test-regression clean

all: $(LIBRARY) $(PROGRAM)

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(LIBRARY): $(CORE_SOURCES) $(CORE_DEPENDENCIES) | $(BUILD_DIR)
	$(CC) $(CPPFLAGS) $(CFLAGS) -fPIC -shared $(CORE_SOURCES) $(LDFLAGS) -o $@

$(PROGRAM): $(CORE_SOURCES) $(CORE_DEPENDENCIES) src/main.c | $(BUILD_DIR)
	$(CC) $(CPPFLAGS) $(CFLAGS) $(CORE_SOURCES) src/main.c $(LDFLAGS) -o $@

$(BUILD_DIR)/pastafari-canonical: tests/canonical.c | $(BUILD_DIR)
	$(CC) $(CPPFLAGS) $(CFLAGS) $< $(LDFLAGS) -o $@

$(BUILD_DIR)/pastafari-differential: tests/differential.c | $(BUILD_DIR)
	$(CC) $(CPPFLAGS) $(CFLAGS) $< $(LDFLAGS) -o $@

test-canonical: all $(BUILD_DIR)/pastafari-canonical
	$(BUILD_DIR)/pastafari-canonical

test-regression: $(BUILD_DIR)/pastafari-differential
	$(BUILD_DIR)/pastafari-differential $(CORPUS)

test: test-canonical test-regression

clean:
	rm -rf $(BUILD_DIR)
