#include <inttypes.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * Unity test translation unit: reuse one calculation state per calculation day
 * so the specification-derived canonical suite does not pay six cold starts.
 */
#include "../pastafari_core.c"

typedef struct Vector {
    const char *id;
    int64_t calculation_jdn;
    int64_t target_jdn;
    const char *expected;
} Vector;

typedef struct BatchState {
    bool active;
    int64_t calculation_jdn;
    GateEngine engine;
    CalculationState calculation;
    Year year;
    YearStructure structure;
} BatchState;

static void batch_destroy(BatchState *batch) {
    if (!batch->active) return;
    year_structure_destroy(&batch->structure);
    gate_engine_destroy(&batch->engine);
    memset(batch, 0, sizeof(*batch));
}

static void batch_start(BatchState *batch, int64_t calculation_jdn, int64_t target_jdn) {
    batch_destroy(batch);
    gate_engine_init(&batch->engine);
    calculation_state_init(&batch->calculation, &batch->engine, calculation_jdn);
    batch->year = calculation_find_year(&batch->calculation, target_jdn);
    build_year_structure(&batch->calculation, &batch->year, &batch->structure);
    batch->calculation_jdn = calculation_jdn;
    batch->active = true;
}

static void batch_convert(
    BatchState *batch,
    int64_t calculation_jdn,
    int64_t target_jdn,
    PastafariOutput *output
) {
    if (!batch->active || batch->calculation_jdn != calculation_jdn) {
        batch_start(batch, calculation_jdn, target_jdn);
    }
    while (target_jdn < batch->year.start_jdn) {
        year_structure_destroy(&batch->structure);
        batch->year = calculation_previous_year(&batch->calculation, &batch->year);
        build_year_structure(&batch->calculation, &batch->year, &batch->structure);
    }
    while (target_jdn > batch->year.end_jdn) {
        year_structure_destroy(&batch->structure);
        batch->year = calculation_next_year(&batch->calculation, &batch->year);
        build_year_structure(&batch->calculation, &batch->year, &batch->structure);
    }
    materialize(&batch->year, &batch->structure, target_jdn, output);
}

static void json_output(const PastafariOutput *value, char *buffer, size_t capacity) {
    const int written = snprintf(
        buffer,
        capacity,
        "{\"year\":\"%" PRId64 "\",\"cutletName\":\"%s\","
        "\"dayInCutlet\":%d,\"monthName\":\"%s\",\"dayInMonth\":%d}",
        value->year,
        value->cutlet_name,
        value->day_in_cutlet,
        value->month_name,
        value->day_in_month
    );
    if (written < 0 || (size_t)written >= capacity) {
        fputs("canonical JSON buffer overflow\n", stderr);
        exit(2);
    }
}

int main(void) {
    /* Sorted by calculation day and then target day for efficient state reuse. */
    static const Vector vectors[] = {
        {"binding_5778_same", -14269936, -14269936, "{\"year\":\"5000\",\"cutletName\":\"מחשבה\",\"dayInCutlet\":1,\"monthName\":\"ארידו\",\"dayInMonth\":93}"},
        {"foundation_previous", -13334246, -13334247, "{\"year\":\"5000\",\"cutletName\":\"עקרב\",\"dayInCutlet\":502,\"monthName\":\"הדלת הסגורה\",\"dayInMonth\":21}"},
        {"foundation_same", -13334246, -13334246, "{\"year\":\"5000\",\"cutletName\":\"עקרב\",\"dayInCutlet\":503,\"monthName\":\"באר\",\"dayInMonth\":56}"},
        {"foundation_next", -13334246, -13334245, "{\"year\":\"5000\",\"cutletName\":\"צחוק\",\"dayInCutlet\":1,\"monthName\":\"צפרדע\",\"dayInMonth\":38}"},
        {"present_same", 2461259, 2461259, "{\"year\":\"5000\",\"cutletName\":\"כליה\",\"dayInCutlet\":306,\"monthName\":\"לשון\",\"dayInMonth\":23}"},
        {"present_forward", 2461259, 2461265, "{\"year\":\"5000\",\"cutletName\":\"כליה\",\"dayInCutlet\":312,\"monthName\":\"סערה\",\"dayInMonth\":33}"},
    };

    BatchState batch = {0};
    size_t passed = 0;
    for (size_t index = 0; index < sizeof(vectors) / sizeof(vectors[0]); ++index) {
        PastafariOutput output;
        char actual[1024];
        batch_convert(
            &batch,
            vectors[index].calculation_jdn,
            vectors[index].target_jdn,
            &output
        );
        json_output(&output, actual, sizeof(actual));
        if (strcmp(actual, vectors[index].expected) != 0) {
            fprintf(
                stderr,
                "%s canonical mismatch\nexpected: %s\nactual:   %s\n",
                vectors[index].id,
                vectors[index].expected,
                actual
            );
            batch_destroy(&batch);
            return 1;
        }
        ++passed;
    }
    batch_destroy(&batch);
    printf("C17 canonical conformance: %zu/%zu vectors passed\n", passed, passed);
    return 0;
}
