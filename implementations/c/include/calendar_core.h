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
 * The Assembly port accepts signed proleptic-Gregorian years whose resulting
 * JDN fits int64_t.  This spans roughly +/-25 quadrillion civil years and keeps
 * gate indices native while all binding ranks remain exact WideInt values.
 */
bool pc_iso_to_jdn(const char *text, int64_t *result);
bool pc_convert_jdn(
    int64_t target_jdn,
    int64_t calculation_jdn,
    PastafariOutput *result,
    const char **error_message
);

/* Stable UTF-8 C ABI used by the additional in-process language bindings. */
const char *pc_algorithm_id(void);
bool pc_convert_iso_json(
    const char *target_iso,
    const char *calculation_iso,
    char *output,
    size_t output_capacity,
    const char **error_message
);

#endif
