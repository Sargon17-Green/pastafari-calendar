#include "calendar_core.h"

#include <inttypes.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static void usage(FILE *stream, const char *program) {
    fprintf(
        stream,
        "Usage:\n"
        "  %s CALCULATION TARGET\n"
        "  %s --jdn CALCULATION_JDN TARGET_JDN\n"
        "The positional order is normative: calculation/action day first, queried/target day second.\n"
        "Gregorian dates use signed proleptic [+-]YYYY-MM-DD notation.\n"
        "There is no implicit civil-today fallback; the Venus-day adapter is separate.\n",
        program,
        program
    );
}

static bool parse_i64(const char *text, int64_t *result) {
    char *end = NULL;
    const intmax_t value = strtoimax(text, &end, 10);
    if (end == text || *end != '\0' || value < INT64_MIN || value > INT64_MAX) {
        return false;
    }
    *result = (int64_t)value;
    return true;
}

int main(int argc, char **argv) {
    if (argc == 2 && (strcmp(argv[1], "-h") == 0 || strcmp(argv[1], "--help") == 0)) {
        usage(stdout, argv[0]);
        return 0;
    }

    int64_t calculation_jdn;
    int64_t target_jdn;
    if (argc == 4 && strcmp(argv[1], "--jdn") == 0) {
        if (!parse_i64(argv[2], &calculation_jdn) || !parse_i64(argv[3], &target_jdn)) {
            fputs("pastafari-calendar: invalid signed integer JDN\n", stderr);
            return 2;
        }
    } else if (argc == 3) {
        if (!pc_iso_to_jdn(argv[1], &calculation_jdn)) {
            fprintf(stderr, "pastafari-calendar: invalid calculation date: %s\n", argv[1]);
            return 2;
        }
        if (!pc_iso_to_jdn(argv[2], &target_jdn)) {
            fprintf(stderr, "pastafari-calendar: invalid target date: %s\n", argv[2]);
            return 2;
        }
    } else {
        usage(stderr, argv[0]);
        return 2;
    }

    PastafariOutput result;
    const char *error = NULL;
    if (!pc_convert_jdn(calculation_jdn, target_jdn, &result, &error)) {
        fprintf(stderr, "pastafari-calendar: %s\n", error == NULL ? "conversion failed" : error);
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
