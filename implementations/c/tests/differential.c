#include <errno.h>
#include <inttypes.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * The differential runner is intentionally a unity test translation unit.
 * That gives it access to the C implementation's reusable calculation state;
 * it does not call or embed any other language implementation at runtime.
 */
#include "../pastafari_core.c"

typedef struct BatchState {
    bool active;
    int64_t calculation_jdn;
    GateEngine engine;
    CalculationState calculation;
    Year years[64];
    size_t year_count;
    size_t year_index;
    Year year;
    YearStructure structure;
} BatchState;

static void batch_destroy(BatchState *batch) {
    if (!batch->active) return;
    year_structure_destroy(&batch->structure);
    gate_engine_destroy(&batch->engine);
    memset(batch, 0, sizeof(*batch));
}

static void batch_start(
    BatchState *batch,
    int64_t calculation_jdn,
    int64_t first_target_jdn
) {
    batch_destroy(batch);
    gate_engine_init(&batch->engine);
    calculation_state_init(
        &batch->calculation, &batch->engine, calculation_jdn
    );
    Year reverse[64];
    size_t reverse_count = 1;
    reverse[0] = calculation_year_5000(&batch->calculation);
    while (first_target_jdn < reverse[reverse_count - 1].start_jdn) {
        if (reverse_count == sizeof(reverse) / sizeof(reverse[0])) {
            fputs("differential corpus exceeded the batch year cache\n", stderr);
            exit(2);
        }
        reverse[reverse_count] = calculation_previous_year(
            &batch->calculation, &reverse[reverse_count - 1]
        );
        ++reverse_count;
    }
    batch->year_count = reverse_count;
    for (size_t index = 0; index < reverse_count; ++index) {
        batch->years[index] = reverse[reverse_count - index - 1];
    }
    batch->year_index = 0;
    batch->year = batch->years[0];
    build_year_structure(
        &batch->calculation, &batch->year, &batch->structure
    );
    batch->calculation_jdn = calculation_jdn;
    batch->active = true;
}

static void batch_convert(
    BatchState *batch,
    int64_t target_jdn,
    int64_t calculation_jdn,
    PastafariOutput *output
) {
    if (!batch->active || batch->calculation_jdn != calculation_jdn) {
        batch_start(batch, calculation_jdn, target_jdn);
    }
    if (target_jdn < batch->year.start_jdn) {
        fputs("corpus target order regressed inside a calculation group\n", stderr);
        exit(2);
    }
    while (target_jdn > batch->year.end_jdn) {
        year_structure_destroy(&batch->structure);
        if (batch->year_index + 1 < batch->year_count) {
            ++batch->year_index;
            batch->year = batch->years[batch->year_index];
        } else {
            if (batch->year_count == sizeof(batch->years) / sizeof(batch->years[0])) {
                fputs("differential corpus exceeded the batch year cache\n", stderr);
                exit(2);
            }
            batch->year = calculation_next_year(
                &batch->calculation, &batch->year
            );
            batch->years[batch->year_count++] = batch->year;
            batch->year_index = batch->year_count - 1;
        }
        build_year_structure(
            &batch->calculation, &batch->year, &batch->structure
        );
    }
    materialize(&batch->year, &batch->structure, target_jdn, output);
}

static bool parse_i64(const char *text, int64_t *output) {
    errno = 0;
    char *end = NULL;
    const intmax_t value = strtoimax(text, &end, 10);
    if (
        errno != 0 || end == text || *end != '\0'
        || value < INT64_MIN || value > INT64_MAX
    ) {
        return false;
    }
    *output = (int64_t)value;
    return true;
}

int main(int argc, char **argv) {
    if (argc != 2) {
        fputs("usage: c-differential CORPUS.tsv\n", stderr);
        return 2;
    }
    FILE *input = fopen(argv[1], "rb");
    if (input == NULL) {
        perror(argv[1]);
        return 2;
    }

    BatchState batch = {0};
    char line[4096];
    size_t row = 0;
    while (fgets(line, sizeof(line), input) != NULL) {
        if (line[0] == '#' || line[0] == '\n' || line[0] == '\0') continue;
        char *first_tab = strchr(line, '\t');
        char *second_tab = first_tab == NULL ? NULL : strchr(first_tab + 1, '\t');
        if (first_tab == NULL || second_tab == NULL) {
            fprintf(stderr, "malformed corpus row %zu\n", row + 1);
            batch_destroy(&batch);
            fclose(input);
            return 2;
        }
        *first_tab = '\0';
        *second_tab = '\0';
        char *expected = second_tab + 1;
        expected[strcspn(expected, "\r\n")] = '\0';

        int64_t target_jdn;
        int64_t calculation_jdn;
        if (
            !parse_i64(line, &target_jdn)
            || !parse_i64(first_tab + 1, &calculation_jdn)
        ) {
            fprintf(stderr, "invalid JDN at corpus row %zu\n", row + 1);
            batch_destroy(&batch);
            fclose(input);
            return 2;
        }

        PastafariOutput value;
        batch_convert(&batch, target_jdn, calculation_jdn, &value);
        char actual[1024];
        const int written = snprintf(
            actual,
            sizeof(actual),
            "{\"year\":\"%" PRId64 "\",\"cutletName\":\"%s\","
            "\"dayInCutlet\":%d,\"monthName\":\"%s\",\"dayInMonth\":%d}",
            value.year,
            value.cutlet_name,
            value.day_in_cutlet,
            value.month_name,
            value.day_in_month
        );
        if (
            written < 0 || (size_t)written >= sizeof(actual)
            || strcmp(actual, expected) != 0
        ) {
            fprintf(
                stderr,
                "C differential mismatch at data row %zu\n"
                "expected: %s\nactual:   %s\n",
                row + 1,
                expected,
                written < 0 ? "<formatting failed>" : actual
            );
            batch_destroy(&batch);
            fclose(input);
            return 1;
        }
        ++row;
    }

    batch_destroy(&batch);
    if (ferror(input)) {
        perror("reading differential corpus");
        fclose(input);
        return 2;
    }
    fclose(input);
    if (row != 10000) {
        fprintf(stderr, "expected 10000 corpus rows, read %zu\n", row);
        return 1;
    }
    printf("C differential: %zu/%zu vectors passed\n", row, row);
    return 0;
}
