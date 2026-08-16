cmake_minimum_required(VERSION 3.20)
project(pastafari_calendar VERSION 2.0.0 LANGUAGES CXX)

option(PASTAFARI_BUILD_CLI "Build the command-line converter" ON)
option(PASTAFARI_BUILD_TESTS "Build the conformance test executable" ON)
option(PASTAFARI_BUILD_BENCHMARK "Build the microbenchmark executable" OFF)
set(
    PASTAFARI_DIFFERENTIAL_CORPUS
    "${CMAKE_CURRENT_SOURCE_DIR}/../tests/oracle-differential-10000.tsv"
    CACHE FILEPATH
    "Authoritative differential corpus"
)

find_package(OpenSSL 3 REQUIRED COMPONENTS Crypto)
find_package(Threads REQUIRED)

add_library(pastafari_calendar src/calendar.cpp)
add_library(pastafari::calendar ALIAS pastafari_calendar)

target_compile_features(pastafari_calendar PUBLIC cxx_std_20)
target_include_directories(
    pastafari_calendar
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
        $<INSTALL_INTERFACE:include>
)
target_link_libraries(pastafari_calendar PUBLIC OpenSSL::Crypto)

if(MSVC)
    target_compile_options(pastafari_calendar PRIVATE /W4 /permissive-)
else()
    target_compile_options(
        pastafari_calendar PRIVATE -Wall -Wextra -Wpedantic -Wconversion
    )
endif()

if(PASTAFARI_BUILD_BENCHMARK)
    add_executable(pastafari-benchmark tests/benchmark.cpp)
    target_compile_features(pastafari-benchmark PRIVATE cxx_std_20)
    target_link_libraries(pastafari-benchmark PRIVATE pastafari::calendar)
endif()

if(PASTAFARI_BUILD_CLI)
    add_executable(pastafari-calendar src/main.cpp)
    target_compile_features(pastafari-calendar PRIVATE cxx_std_20)
    target_link_libraries(pastafari-calendar PRIVATE pastafari::calendar)
endif()

if(PASTAFARI_BUILD_TESTS)
    enable_testing()
    add_executable(pastafari-bigint-test tests/bigint.cpp)
    target_compile_features(pastafari-bigint-test PRIVATE cxx_std_20)
    target_link_libraries(pastafari-bigint-test PRIVATE pastafari::calendar)
    add_test(NAME pastafari-bigint-semantics COMMAND pastafari-bigint-test)
    add_executable(pastafari-differential tests/differential.cpp)
    target_compile_features(pastafari-differential PRIVATE cxx_std_20)
    target_link_libraries(
        pastafari-differential PRIVATE pastafari::calendar Threads::Threads
    )
    add_test(
        NAME pastafari-differential
        COMMAND pastafari-differential ${PASTAFARI_DIFFERENTIAL_CORPUS}
    )
    add_executable(pastafari-conformance tests/conformance.cpp)
    target_compile_features(pastafari-conformance PRIVATE cxx_std_20)
    target_link_libraries(pastafari-conformance PRIVATE pastafari::calendar)
    add_test(NAME pastafari-conformance COMMAND pastafari-conformance)
endif()
