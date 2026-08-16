#ifndef PASTAFARI_CALENDAR_CORE_H
#define PASTAFARI_CALENDAR_CORE_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

typedef struct PastafariOutput {
    int64_t year;
    const char *cutlet_name;
    int day_in_cutlet;
    const char *month_name;
    int day_in_month;
} PastafariOutput;

/*
 * The C17 engine uses int64_t for JDNs/gate indexes and arbitrary-precision
 * WideInt for sauce values, ranks and combinatorial counts. Conversion rejects
 * any JDN whose distance from the Foundation Day cannot be doubled exactly
 * inside uint64_t; it never silently wraps.
 */
bool pc_iso_to_jdn(const char *text, int64_t *result);
bool pc_convert_jdn(
    int64_t calculation_jdn,
    int64_t target_jdn,
    PastafariOutput *result,
    const char **error_message
);

/* Stable UTF-8 C ABI. The normative positional order is calculation, target. */
const char *pc_algorithm_id(void);
bool pc_convert_iso_json(
    const char *calculation_iso,
    const char *target_iso,
    char *output,
    size_t output_capacity,
    const char **error_message
);

#endif
