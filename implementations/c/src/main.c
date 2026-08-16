#include "calendar_core.h"

#include <inttypes.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

static void usage(FILE *stream, const char *program) {
    fprintf(
        stream,
        "Usage: %s TARGET [--calculation-date CALCULATION]\n"
        "Dates use signed proleptic Gregorian [+-]YYYY-MM-DD notation.\n",
        program
    );
}

static bool local_today(char buffer[32]) {
    const time_t now = time(NULL);
    if (now == (time_t)-1) return false;
    struct tm local;
#if defined(_WIN32)
    if (localtime_s(&local, &now) != 0) return false;
#else
    if (localtime_r(&now, &local) == NULL) return false;
#endif
    const int written = snprintf(
        buffer,
        32,
        "%04d-%02d-%02d",
        local.tm_year + 1900,
        local.tm_mon + 1,
        local.tm_mday
    );
    return written > 0 && written < 32;
}

int main(int argc, char **argv) {
    const char *target_text = NULL;
    const char *calculation_text = NULL;
    for (int index = 1; index < argc; ++index) {
        if (
            strcmp(argv[index], "-h") == 0
            || strcmp(argv[index], "--help") == 0
        ) {
            usage(stdout, argv[0]);
            return 0;
        }
        if (
            strcmp(argv[index], "-c") == 0
            || strcmp(argv[index], "--calculation-date") == 0
        ) {
            if (++index >= argc || calculation_text != NULL) {
                usage(stderr, argv[0]);
                return 2;
            }
            calculation_text = argv[index];
            continue;
        }
        if (target_text == NULL) {
            target_text = argv[index];
            continue;
        }
        usage(stderr, argv[0]);
        return 2;
    }
    if (target_text == NULL) {
        usage(stderr, argv[0]);
        return 2;
    }

    char today[32];
    if (calculation_text == NULL) {
        if (!local_today(today)) {
            fputs("pastafari-calendar: cannot read the local civil day\n", stderr);
            return 1;
        }
        calculation_text = today;
    }

    int64_t target_jdn;
    int64_t calculation_jdn;
    if (!pc_iso_to_jdn(target_text, &target_jdn)) {
        fprintf(stderr, "pastafari-calendar: invalid target date: %s\n", target_text);
        return 2;
    }
    if (!pc_iso_to_jdn(calculation_text, &calculation_jdn)) {
        fprintf(
            stderr,
            "pastafari-calendar: invalid calculation date: %s\n",
            calculation_text
        );
        return 2;
    }

    PastafariOutput result;
    const char *error = NULL;
    if (!pc_convert_jdn(target_jdn, calculation_jdn, &result, &error)) {
        fprintf(
            stderr,
            "pastafari-calendar: %s\n",
            error == NULL ? "conversion failed" : error
        );
        return 1;
    }
    printf(
        "{\"year\":\"%" PRId64 "\",\"cutletName\":\"%s\","
        "\"dayInCutlet\":%d,\"monthName\":\"%s\",\"dayInMonth\":%d}\n",
        result.year,
        result.cutlet_name,
        result.day_in_cutlet,
        result.month_name,
        result.day_in_month
    );
    return 0;
}
