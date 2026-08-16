CXX ?= c++
CPPFLAGS ?=
CXXFLAGS ?= -O3 -DNDEBUG -std=c++20 -Wall -Wextra -Wpedantic -Wconversion
LDFLAGS ?=
OPENSSL_CFLAGS ?= $(shell pkg-config --cflags openssl 2>/dev/null)
OPENSSL_LIBS ?= $(shell pkg-config --libs openssl 2>/dev/null || printf '%s' '-lcrypto')

BUILD_DIR := build
INCLUDES := -Iinclude $(OPENSSL_CFLAGS)
CORE := src/calendar.cpp

.PHONY: all test benchmark clean

CORPUS ?= ../tests/oracle-differential-10000.tsv

all: $(BUILD_DIR)/pastafari-calendar

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUILD_DIR)/pastafari-calendar: $(CORE) src/main.cpp | $(BUILD_DIR)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) $(INCLUDES) $^ $(LDFLAGS) $(OPENSSL_LIBS) -o $@

$(BUILD_DIR)/pastafari-conformance: $(CORE) tests/conformance.cpp | $(BUILD_DIR)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) $(INCLUDES) $^ $(LDFLAGS) $(OPENSSL_LIBS) -o $@

$(BUILD_DIR)/pastafari-bigint-test: tests/bigint.cpp | $(BUILD_DIR)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) $(INCLUDES) $^ $(LDFLAGS) $(OPENSSL_LIBS) -o $@

$(BUILD_DIR)/pastafari-differential: $(CORE) tests/differential.cpp | $(BUILD_DIR)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -pthread $(INCLUDES) $^ $(LDFLAGS) $(OPENSSL_LIBS) -o $@

$(BUILD_DIR)/pastafari-benchmark: $(CORE) tests/benchmark.cpp | $(BUILD_DIR)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) $(INCLUDES) $^ $(LDFLAGS) $(OPENSSL_LIBS) -o $@

test: $(BUILD_DIR)/pastafari-bigint-test $(BUILD_DIR)/pastafari-conformance $(BUILD_DIR)/pastafari-differential
	$(BUILD_DIR)/pastafari-bigint-test
	$(BUILD_DIR)/pastafari-conformance
	$(BUILD_DIR)/pastafari-differential $(CORPUS)

benchmark: $(BUILD_DIR)/pastafari-benchmark
	$(BUILD_DIR)/pastafari-benchmark

clean:
	rm -rf $(BUILD_DIR)
