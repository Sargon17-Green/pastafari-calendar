#include "calendar_core.h"
#include "wideint.h"

#include <inttypes.h>
#include <limits.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

enum {
    FOUNDATION_JDN = -13334246,
    MIN_GATE_DISTANCE = 42,
    MAX_GATE_DISTANCE = 963,
    MIN_YEAR_DAYS = 252,
    MAX_YEAR_DAYS = 5778,
    MIN_YEAR_GAPS = 6,
    CUTLET_NAME_COUNT = 17,
    MONTH_NAME_COUNT = 47,
};

static const char *const CUTLET_NAMES[CUTLET_NAME_COUNT] = {
    "ארד", "שועל", "כליה", "לגש", "מחשבה", "ארבעה חלקים מתשעה",
    "פַּלְגּוּרַשׁ", "גומא", "אשכול", "עקרב", "אפר", "חיטה", "נהר",
    "צחוק", "אכד", "קרן", "הכד הריק",
};

static const char *const MONTH_NAMES[MONTH_NAME_COUNT] = {
    "טין", "רימון", "מרפק", "קנאה", "ארידו", "משחת־שיניים",
    "שלושה חלקים מחמישה", "כַּרְשׁוּמַב", "נמר", "בדיל", "ערפל", "לבונה",
    "כישור", "צלע", "חרוב", "אורוק", "בושה", "גמל", "נחושת", "באר",
    "חלמון", "כוכב", "דבש", "טחול", "אבן־גיר", "שמחה", "תאנה", "נינוה",
    "צפרדע", "זפת", "נר", "הדלת הסגורה", "שומשום", "עורף", "כסף", "שושן",
    "סערה", "חמור", "קמח", "חרטה", "בבל", "לשון", "פשתן", "מלח", "אגס",
    "קשת", "חול",
};

static void calendar_fail(const char *message) {
    fputs(message, stderr);
    fputc('\n', stderr);
    abort();
}

static void add_scaled(
    WideInt *accumulator,
    const WideInt *value,
    uint32_t multiplier,
    WideInt *temporary
) {
    wi_mul_u32(temporary, value, multiplier);
    wi_add(accumulator, accumulator, temporary);
}

static void add_product(
    WideInt *accumulator,
    const WideInt *left,
    const WideInt *right,
    WideInt *temporary
) {
    wi_mul(temporary, left, right);
    wi_add(accumulator, accumulator, temporary);
}

static void square_into(WideInt *result, const WideInt *value) {
    wi_mul(result, value, value);
}

typedef struct StoneTable {
    WideInt rows[46][5];
} StoneTable;

static void stone_table_init(StoneTable *table) {
    for (size_t row = 0; row < 46; ++row) {
        for (size_t column = 0; column < 5; ++column) {
            wi_init(&table->rows[row][column]);
        }
    }
    static const uint32_t first[5] = {17, 29, 43, 71, 101};
    for (size_t column = 0; column < 5; ++column) {
        wi_set_u64(&table->rows[0][column], first[column]);
    }

    static const uint32_t coefficients[5] = {3, 5, 7, 11, 13};
    static const int next_column[5] = {1, 2, 3, 4, 0};
    static const int final_column[5] = {-1, 0, 1, 2, 3};
    WideInt expression;
    WideInt temporary;
    wi_init(&expression);
    wi_init(&temporary);

    for (size_t row = 1; row < 46; ++row) {
        const uint32_t drop_number = (uint32_t)row + 1;
        for (size_t column = 0; column < 5; ++column) {
            square_into(&expression, &table->rows[row - 1][column]);
            add_scaled(
                &expression,
                &table->rows[row - 1][(size_t)next_column[column]],
                coefficients[column],
                &temporary
            );
            if (final_column[column] >= 0) {
                wi_add(
                    &expression,
                    &expression,
                    &table->rows[row - 1][(size_t)final_column[column]]
                );
            } else {
                wi_add_u32(&expression, &expression, drop_number);
            }
            wi_keep(&table->rows[row][column], &expression);
        }
    }
    wi_destroy(&expression);
    wi_destroy(&temporary);
}

static void stone_table_destroy(StoneTable *table) {
    for (size_t row = 0; row < 46; ++row) {
        for (size_t column = 0; column < 5; ++column) {
            wi_destroy(&table->rows[row][column]);
        }
    }
}

typedef struct SauceResult {
    WideInt bowls[6];
    uint8_t last_drop_permutation[6];
} SauceResult;

static void sauce_result_init(SauceResult *result) {
    for (size_t index = 0; index < 6; ++index) {
        wi_init(&result->bowls[index]);
        result->last_drop_permutation[index] = 0;
    }
}

static void sauce_result_destroy(SauceResult *result) {
    for (size_t index = 0; index < 6; ++index) {
        wi_destroy(&result->bowls[index]);
    }
}

static void day_number(WideInt *result, int64_t jdn) {
    const __int128 delta = (__int128)jdn - FOUNDATION_JDN;
    if (delta == 0) {
        wi_set_u64(result, 1);
        return;
    }
    const unsigned __int128 magnitude = delta > 0
        ? (unsigned __int128)delta
        : (unsigned __int128)(-delta);
    if (magnitude > UINT64_MAX / 2) {
        calendar_fail("calendar: JDN magnitude is outside the Assembly port's range");
    }
    const uint64_t doubled = (uint64_t)magnitude * 2;
    wi_set_u64(result, delta > 0 ? doubled + 1 : doubled);
}

static void bowl_permutation(uint16_t one_based_rank, uint8_t result[6]) {
    if (one_based_rank < 1 || one_based_rank > 720) {
        calendar_fail("calendar: bowl permutation rank is invalid");
    }
    static const uint16_t factorial[7] = {1, 1, 2, 6, 24, 120, 720};
    uint16_t rank = (uint16_t)(one_based_rank - 1);
    uint8_t available[6] = {0, 1, 2, 3, 4, 5};
    size_t available_count = 6;
    for (size_t position = 0; position < 6; ++position) {
        const uint16_t block = factorial[5 - position];
        const size_t selected = rank / block;
        rank = (uint16_t)(rank % block);
        result[position] = available[selected];
        memmove(
            &available[selected],
            &available[selected + 1],
            (available_count - selected - 1) * sizeof(*available)
        );
        --available_count;
    }
}

static uint64_t absolute_distance_plus_one(int64_t left, int64_t right) {
    const __int128 difference = (__int128)left - right;
    const unsigned __int128 magnitude = difference < 0
        ? (unsigned __int128)(-difference)
        : (unsigned __int128)difference;
    if (magnitude >= UINT64_MAX) {
        calendar_fail("calendar: ordered day distance is too large");
    }
    return (uint64_t)magnitude + 1;
}

static void sauce(
    const StoneTable *stones,
    int64_t calculation_jdn,
    int64_t target_jdn,
    SauceResult *result
) {
    static const uint32_t hidden_coefficients[7][4] = {
        {3, 4, 6, 8}, {5, 7, 10, 12}, {7, 10, 14, 16},
        {9, 13, 18, 20}, {11, 16, 22, 24}, {13, 19, 26, 28},
        {15, 22, 30, 32},
    };
    static const uint8_t hidden_stone_order[7] = {0, 1, 2, 3, 4, 0, 1};
    static const uint32_t bowl_primes[6] = {17, 19, 23, 29, 31, 37};
    static const uint32_t grind_rows[11][5] = {
        {3, 5, 7, 11, 0}, {5, 7, 11, 13, 1}, {7, 11, 13, 17, 2},
        {11, 13, 17, 19, 3}, {13, 17, 19, 23, 4},
        {17, 19, 23, 29, 0}, {19, 23, 29, 31, 1},
        {23, 29, 31, 37, 2}, {29, 31, 37, 41, 3},
        {31, 37, 41, 43, 4}, {37, 41, 43, 47, 0},
    };
    static const uint32_t direct_multipliers[3] = {3, 5, 7};
    static const uint8_t direct_stones[3] = {0, 1, 2};
    static const uint8_t drop_mix_stones[6] = {0, 1, 2, 3, 4, 0};

    WideInt calculation;
    WideInt target;
    WideInt distance;
    WideInt addition;
    WideInt hidden[7];
    WideInt drops[46];
    WideInt old_bowls[6];
    WideInt direct[6];
    WideInt value;
    WideInt expression;
    WideInt temporary;
    WideInt second_temporary;
    wi_init(&calculation);
    wi_init(&target);
    wi_init(&distance);
    wi_init(&addition);
    wi_init(&value);
    wi_init(&expression);
    wi_init(&temporary);
    wi_init(&second_temporary);
    for (size_t index = 0; index < 7; ++index) wi_init(&hidden[index]);
    for (size_t index = 0; index < 46; ++index) wi_init(&drops[index]);
    for (size_t index = 0; index < 6; ++index) {
        wi_init(&old_bowls[index]);
        wi_init(&direct[index]);
    }

    day_number(&calculation, calculation_jdn);
    day_number(&target, target_jdn);
    wi_set_u64(&distance, absolute_distance_plus_one(target_jdn, calculation_jdn));
    wi_add(&addition, &calculation, &target);
    const uint32_t direction = target_jdn < calculation_jdn ? 1U
        : target_jdn == calculation_jdn ? 2U : 3U;

    for (size_t index = 0; index < 7; ++index) {
        wi_copy(&expression, &calculation);
        add_scaled(&expression, &target, hidden_coefficients[index][0], &temporary);
        add_scaled(&expression, &distance, hidden_coefficients[index][1], &temporary);
        add_scaled(&expression, &addition, hidden_coefficients[index][2], &temporary);
        wi_add_u32(
            &expression,
            &expression,
            hidden_coefficients[index][3] * direction
        );
        for (size_t stone = 0; stone < 5; ++stone) {
            wi_add(&expression, &expression, &stones->rows[index][stone]);
        }
        wi_keep(&value, &expression);
        for (uint32_t round = 1; round <= 7; ++round) {
            square_into(&expression, &value);
            add_scaled(&expression, &value, 3, &temporary);
            wi_add(
                &expression,
                &expression,
                &stones->rows[index][hidden_stone_order[round - 1]]
            );
            wi_add_u32(&expression, &expression, round);
            wi_keep(&value, &expression);
        }
        wi_copy(&hidden[index], &value);
    }

    for (size_t index = 0; index < 6; ++index) {
        wi_copy(&expression, &calculation);
        add_scaled(&expression, &target, (uint32_t)index + 1, &temporary);
        wi_add(&expression, &expression, &distance);
        wi_add(&expression, &expression, &addition);
        wi_add_u32(
            &expression,
            &expression,
            direction + bowl_primes[index] * bowl_primes[index]
        );
        square_into(&temporary, &expression);
        wi_add_u32(&temporary, &temporary, (uint32_t)index + 1);
        wi_keep(&result->bowls[index], &temporary);
    }

    for (size_t drop_index = 0; drop_index < 46; ++drop_index) {
        const uint32_t drop_number = (uint32_t)drop_index + 1;
        const WideInt *previous = drop_number > 1
            ? &drops[drop_number - 2]
            : &hidden[0];
        const WideInt *third = drop_number > 3
            ? &drops[drop_number - 4]
            : &hidden[3 - drop_number];
        const WideInt *seventh = drop_number > 7
            ? &drops[drop_number - 8]
            : &hidden[7 - drop_number];

        wi_set_zero(&expression);
        add_product(&expression, &stones->rows[drop_index][0], &calculation, &temporary);
        add_product(&expression, &stones->rows[drop_index][1], &target, &temporary);
        add_product(&expression, &stones->rows[drop_index][2], &distance, &temporary);
        add_product(&expression, &stones->rows[drop_index][3], &addition, &temporary);
        add_scaled(
            &expression,
            &stones->rows[drop_index][4],
            direction,
            &temporary
        );
        wi_add(&expression, &expression, previous);
        add_scaled(&expression, third, 3, &temporary);
        add_scaled(&expression, seventh, 5, &temporary);
        wi_add_u32(&expression, &expression, drop_number);
        wi_keep(&value, &expression);

        for (size_t row = 0; row < 11; ++row) {
            square_into(&expression, &value);
            add_scaled(&expression, &value, grind_rows[row][0], &temporary);
            add_scaled(&expression, previous, grind_rows[row][1], &temporary);
            add_scaled(&expression, third, grind_rows[row][2], &temporary);
            add_scaled(&expression, seventh, grind_rows[row][3], &temporary);
            wi_add(
                &expression,
                &expression,
                &stones->rows[drop_index][grind_rows[row][4]]
            );
            wi_keep(&value, &expression);
        }
        wi_copy(&drops[drop_index], &value);

        uint8_t order[6];
        bowl_permutation((uint16_t)(wi_mod_u32(&value, 720) == 0
            ? 720 : wi_mod_u32(&value, 720)), order);
        if (drop_number == 46) {
            memcpy(result->last_drop_permutation, order, sizeof(order));
        }

        for (size_t bowl = 0; bowl < 6; ++bowl) {
            wi_set_zero(&direct[bowl]);
            wi_copy(&old_bowls[bowl], &result->bowls[bowl]);
        }
        for (size_t place = 0; place < 3; ++place) {
            const size_t bowl = order[place];
            square_into(&expression, &value);
            add_product(
                &expression,
                &stones->rows[drop_index][direct_stones[place]],
                &old_bowls[bowl],
                &temporary
            );
            wi_add_u32(
                &expression,
                &expression,
                direct_multipliers[place] * drop_number
            );
            wi_keep(&direct[bowl], &expression);
        }

        for (size_t place = 0; place < 6; ++place) {
            const size_t bowl = order[place];
            const size_t previous_bowl = order[(place + 5) % 6];
            const size_t next_bowl = order[(place + 1) % 6];
            wi_copy(&expression, &old_bowls[bowl]);
            add_scaled(&expression, &old_bowls[previous_bowl], 2, &temporary);
            add_scaled(&expression, &old_bowls[next_bowl], 3, &temporary);
            wi_add(&expression, &expression, &direct[bowl]);
            wi_add(&expression, &expression, &value);
            wi_add(
                &expression,
                &expression,
                &stones->rows[drop_index][drop_mix_stones[place]]
            );
            square_into(&second_temporary, &expression);
            wi_mul(&expression, &old_bowls[previous_bowl], &old_bowls[next_bowl]);
            add_scaled(&second_temporary, &expression, 5, &temporary);
            wi_add_u32(
                &second_temporary,
                &second_temporary,
                drop_number * ((uint32_t)place + 1)
            );
            wi_keep(&result->bowls[bowl], &second_temporary);
        }
    }

    for (uint32_t round = 1; round <= 12; ++round) {
        wi_set_zero(&expression);
        for (size_t bowl = 0; bowl < 6; ++bowl) {
            wi_add(&expression, &expression, &result->bowls[bowl]);
        }
        wi_add_u32(&expression, &expression, 149 * round);
        wi_keep(&value, &expression);
        uint8_t order[6];
        bowl_permutation((uint16_t)(wi_mod_u32(&value, 720) == 0
            ? 720 : wi_mod_u32(&value, 720)), order);
        for (size_t bowl = 0; bowl < 6; ++bowl) {
            wi_copy(&old_bowls[bowl], &result->bowls[bowl]);
        }
        for (size_t place = 0; place < 6; ++place) {
            const size_t bowl = order[place];
            const size_t previous_bowl = order[(place + 5) % 6];
            const size_t next_bowl = order[(place + 1) % 6];
            wi_copy(&expression, &old_bowls[bowl]);
            add_scaled(&expression, &old_bowls[previous_bowl], 3, &temporary);
            add_scaled(&expression, &old_bowls[next_bowl], 5, &temporary);
            wi_add(&expression, &expression, &value);
            wi_add_u32(
                &expression,
                &expression,
                round + ((uint32_t)place + 1) * ((uint32_t)place + 1)
            );
            square_into(&second_temporary, &expression);
            wi_mul(&expression, &old_bowls[previous_bowl], &old_bowls[next_bowl]);
            add_scaled(&second_temporary, &expression, 7, &temporary);
            wi_keep(&result->bowls[bowl], &second_temporary);
        }
    }

    wi_destroy(&calculation);
    wi_destroy(&target);
    wi_destroy(&distance);
    wi_destroy(&addition);
    wi_destroy(&value);
    wi_destroy(&expression);
    wi_destroy(&temporary);
    wi_destroy(&second_temporary);
    for (size_t index = 0; index < 7; ++index) wi_destroy(&hidden[index]);
    for (size_t index = 0; index < 46; ++index) wi_destroy(&drops[index]);
    for (size_t index = 0; index < 6; ++index) {
        wi_destroy(&old_bowls[index]);
        wi_destroy(&direct[index]);
    }
}

#ifdef PASTAFARI_TESTING
void pc_test_sauce(
    int64_t calculation_jdn,
    int64_t target_jdn,
    char *decimal_bowls[6],
    uint8_t permutation[6]
) {
    StoneTable stones;
    SauceResult result;
    stone_table_init(&stones);
    sauce_result_init(&result);
    sauce(&stones, calculation_jdn, target_jdn, &result);
    for (size_t index = 0; index < 6; ++index) {
        decimal_bowls[index] = wi_to_decimal(&result.bowls[index]);
    }
    memcpy(permutation, result.last_drop_permutation, 6);
    sauce_result_destroy(&result);
    stone_table_destroy(&stones);
}
#endif

typedef struct ResponseDescriptor {
    WideInt first;
    int step;
} ResponseDescriptor;

static void response_descriptor_init(ResponseDescriptor *descriptor) {
    wi_init(&descriptor->first);
    descriptor->step = 1;
}

static void response_descriptor_destroy(ResponseDescriptor *descriptor) {
    wi_destroy(&descriptor->first);
}

static void make_response_descriptor(
    const SauceResult *sauce_result,
    size_t bowl,
    uint32_t seal,
    ResponseDescriptor *descriptor
) {
    size_t place = 0;
    while (place < 6 && sauce_result->last_drop_permutation[place] != bowl) {
        ++place;
    }
    if (place == 6) {
        calendar_fail("calendar: selected bowl is absent from the last permutation");
    }
    const size_t next = sauce_result->last_drop_permutation[(place + 1) % 6];
    WideInt base;
    WideInt expression;
    WideInt temporary;
    wi_init(&base);
    wi_init(&expression);
    wi_init(&temporary);

    wi_add_u32(&base, &sauce_result->bowls[bowl], seal + 181);
    square_into(&expression, &base);
    add_scaled(&expression, &sauce_result->bowls[next], 179, &temporary);
    wi_add_u32(&expression, &expression, seal);
    wi_keep(&descriptor->first, &expression);

    wi_add_u32(&base, &descriptor->first, seal + 194);
    square_into(&expression, &base);
    add_scaled(&expression, &descriptor->first, 193, &temporary);
    add_scaled(&expression, &sauce_result->bowls[5], 197, &temporary);
    wi_keep(&base, &expression);
    descriptor->step = wi_mod_u32(&base, 2) == 1 ? 1 : -1;

    wi_destroy(&base);
    wi_destroy(&expression);
    wi_destroy(&temporary);
}

static uint32_t choose_small(
    const SauceResult *sauce_result,
    size_t bowl,
    uint32_t seal,
    uint32_t count
) {
    if (count == 0) {
        calendar_fail("calendar: empty deterministic choice");
    }
    ResponseDescriptor descriptor;
    response_descriptor_init(&descriptor);
    make_response_descriptor(sauce_result, bowl, seal, &descriptor);

    WideInt great;
    WideInt limit;
    wi_init(&great);
    wi_init(&limit);
    wi_set_great(&great);
    const uint32_t rejected_tail = wi_mod_u32(&great, count);
    WideInt tail;
    wi_init(&tail);
    wi_set_u64(&tail, rejected_tail);
    wi_sub(&limit, &great, &tail);

    uint32_t choice;
    if (wi_compare(&descriptor.first, &limit) > 0) {
        choice = descriptor.step > 0 ? 1 : count;
    } else {
        const uint32_t remainder = wi_mod_u32(&descriptor.first, count);
        choice = remainder == 0 ? count : remainder;
    }

    wi_destroy(&great);
    wi_destroy(&limit);
    wi_destroy(&tail);
    response_descriptor_destroy(&descriptor);
    return choice;
}

static void response_at(
    WideInt *result,
    const ResponseDescriptor *descriptor,
    uint32_t offset
) {
    WideInt great;
    WideInt amount;
    wi_init(&great);
    wi_init(&amount);
    wi_set_great(&great);
    wi_set_u64(&amount, offset);
    if (descriptor->step > 0) {
        wi_add(result, &descriptor->first, &amount);
        if (wi_compare(result, &great) > 0) {
            wi_sub(result, result, &great);
        }
    } else if (wi_compare(&descriptor->first, &amount) > 0) {
        wi_sub(result, &descriptor->first, &amount);
    } else {
        wi_sub(&amount, &amount, &descriptor->first);
        wi_sub(result, &great, &amount);
    }
    wi_destroy(&great);
    wi_destroy(&amount);
}

static void choose_wide(
    WideInt *result,
    const SauceResult *sauce_result,
    size_t bowl,
    uint32_t seal,
    const WideInt *count
) {
    if (wi_is_zero(count)) {
        calendar_fail("calendar: empty deterministic wide choice");
    }
    ResponseDescriptor descriptor;
    response_descriptor_init(&descriptor);
    make_response_descriptor(sauce_result, bowl, seal, &descriptor);

    WideInt great;
    WideInt space;
    WideInt value;
    WideInt weight;
    WideInt digit;
    WideInt product;
    WideInt remainder;
    WideInt limit;
    WideInt accepted;
    WideInt one;
    wi_init(&great);
    wi_init(&space);
    wi_init(&value);
    wi_init(&weight);
    wi_init(&digit);
    wi_init(&product);
    wi_init(&remainder);
    wi_init(&limit);
    wi_init(&accepted);
    wi_init(&one);
    wi_set_great(&great);
    wi_set_u64(&one, 1);

    uint32_t width = 1;
    wi_copy(&space, &great);
    while (wi_compare(&space, count) < 0) {
        wi_mul(&space, &space, &great);
        ++width;
    }

    if (width == 1) {
        wi_copy(&value, &descriptor.first);
    } else {
        wi_set_u64(&value, 1);
        wi_set_u64(&weight, 1);
        for (uint32_t offset = 0; offset < width; ++offset) {
            response_at(&digit, &descriptor, offset);
            wi_sub(&digit, &digit, &one);
            wi_mul(&product, &digit, &weight);
            wi_add(&value, &value, &product);
            wi_mul(&weight, &weight, &great);
        }
    }

    wi_mod(&remainder, &space, count);
    wi_sub(&limit, &space, &remainder);
    if (wi_compare(&value, &limit) > 0) {
        if (descriptor.step > 0) {
            wi_set_u64(&accepted, 1);
        } else {
            wi_copy(&accepted, &limit);
        }
    } else {
        wi_copy(&accepted, &value);
    }
    wi_sub(&accepted, &accepted, &one);
    wi_mod(result, &accepted, count);
    wi_add_u32(result, result, 1);

    wi_destroy(&great);
    wi_destroy(&space);
    wi_destroy(&value);
    wi_destroy(&weight);
    wi_destroy(&digit);
    wi_destroy(&product);
    wi_destroy(&remainder);
    wi_destroy(&limit);
    wi_destroy(&accepted);
    wi_destroy(&one);
    response_descriptor_destroy(&descriptor);
}

typedef struct GateEntry {
    int64_t index;
    int64_t position;
} GateEntry;

typedef struct GateDistanceEntry {
    int64_t index;
    uint16_t distance;
} GateDistanceEntry;

#include "gate_checkpoints.h"

typedef struct GateEngine {
    StoneTable stones;
    GateEntry *positions;
    size_t position_count;
    size_t position_capacity;
    GateDistanceEntry *distances;
    size_t distance_count;
    size_t distance_capacity;
} GateEngine;

static void *calendar_reallocate(void *pointer, size_t bytes) {
    void *replacement = realloc(pointer, bytes);
    if (replacement == NULL && bytes != 0) {
        calendar_fail("calendar: allocation failed");
    }
    return replacement;
}

static size_t gate_position_lower_bound(const GateEngine *engine, int64_t index) {
    size_t low = 0;
    size_t high = engine->position_count;
    while (low < high) {
        const size_t middle = low + (high - low) / 2;
        if (engine->positions[middle].index < index) {
            low = middle + 1;
        } else {
            high = middle;
        }
    }
    return low;
}

static size_t gate_distance_lower_bound(const GateEngine *engine, int64_t index) {
    size_t low = 0;
    size_t high = engine->distance_count;
    while (low < high) {
        const size_t middle = low + (high - low) / 2;
        if (engine->distances[middle].index < index) {
            low = middle + 1;
        } else {
            high = middle;
        }
    }
    return low;
}

static void gate_position_store(GateEngine *engine, int64_t index, int64_t position) {
    const size_t insertion = gate_position_lower_bound(engine, index);
    if (
        insertion < engine->position_count
        && engine->positions[insertion].index == index
    ) {
        engine->positions[insertion].position = position;
        return;
    }
    if (engine->position_count == engine->position_capacity) {
        const size_t grown = engine->position_capacity == 0
            ? 128 : engine->position_capacity * 2;
        engine->positions = calendar_reallocate(
            engine->positions,
            grown * sizeof(*engine->positions)
        );
        engine->position_capacity = grown;
    }
    memmove(
        &engine->positions[insertion + 1],
        &engine->positions[insertion],
        (engine->position_count - insertion) * sizeof(*engine->positions)
    );
    engine->positions[insertion] = (GateEntry){index, position};
    ++engine->position_count;
}

static void gate_engine_init(GateEngine *engine) {
    memset(engine, 0, sizeof(*engine));
    stone_table_init(&engine->stones);
    const size_t checkpoint_count =
        sizeof(STATIC_GATE_CHECKPOINTS) / sizeof(STATIC_GATE_CHECKPOINTS[0]);
    engine->position_capacity = checkpoint_count * 2;
    engine->positions = calendar_reallocate(
        NULL,
        engine->position_capacity * sizeof(*engine->positions)
    );
    memcpy(
        engine->positions,
        STATIC_GATE_CHECKPOINTS,
        checkpoint_count * sizeof(*engine->positions)
    );
    engine->position_count = checkpoint_count;
}

static void gate_engine_destroy(GateEngine *engine) {
    stone_table_destroy(&engine->stones);
    free(engine->positions);
    free(engine->distances);
    memset(engine, 0, sizeof(*engine));
}

static uint16_t gate_distance(GateEngine *engine, int64_t index) {
    if (index == 0) {
        calendar_fail("calendar: gate-distance index may not be zero");
    }
    const size_t found = gate_distance_lower_bound(engine, index);
    if (
        found < engine->distance_count
        && engine->distances[found].index == index
    ) {
        return engine->distances[found].distance;
    }
    int64_t target_jdn;
    if (__builtin_add_overflow((int64_t)FOUNDATION_JDN, index, &target_jdn)) {
        calendar_fail("calendar: gate-distance JDN overflow");
    }
    SauceResult sauce_result;
    sauce_result_init(&sauce_result);
    sauce(&engine->stones, FOUNDATION_JDN, target_jdn, &sauce_result);
    const uint16_t distance = (uint16_t)(
        choose_small(&sauce_result, 0, 1, 922) + 41
    );
    sauce_result_destroy(&sauce_result);

    if (engine->distance_count == engine->distance_capacity) {
        const size_t grown = engine->distance_capacity == 0
            ? 128 : engine->distance_capacity * 2;
        engine->distances = calendar_reallocate(
            engine->distances,
            grown * sizeof(*engine->distances)
        );
        engine->distance_capacity = grown;
    }
    memmove(
        &engine->distances[found + 1],
        &engine->distances[found],
        (engine->distance_count - found) * sizeof(*engine->distances)
    );
    engine->distances[found] = (GateDistanceEntry){index, distance};
    ++engine->distance_count;
    return distance;
}

static int64_t gate_position(GateEngine *engine, int64_t index) {
    size_t found = gate_position_lower_bound(engine, index);
    if (
        found < engine->position_count
        && engine->positions[found].index == index
    ) {
        return engine->positions[found].position;
    }

    size_t nearest;
    if (found == 0) {
        nearest = 0;
    } else if (found == engine->position_count) {
        nearest = engine->position_count - 1;
    } else {
        const uint64_t left_distance = (uint64_t)(
            (__int128)index - engine->positions[found - 1].index
        );
        const uint64_t right_distance = (uint64_t)(
            (__int128)engine->positions[found].index - index
        );
        nearest = left_distance <= right_distance ? found - 1 : found;
    }

    int64_t current_index = engine->positions[nearest].index;
    int64_t position = engine->positions[nearest].position;
    if (current_index < index) {
        while (current_index < index) {
            int64_t distance_index;
            if (current_index < 0) {
                distance_index = current_index;
            } else if (__builtin_add_overflow(current_index, INT64_C(1), &distance_index)) {
                calendar_fail("calendar: gate index overflow");
            }
            int64_t next_position;
            if (__builtin_add_overflow(
                position,
                (int64_t)gate_distance(engine, distance_index),
                &next_position
            )) {
                calendar_fail("calendar: gate position overflow");
            }
            position = next_position;
            ++current_index;
            gate_position_store(engine, current_index, position);
        }
    } else {
        while (current_index > index) {
            int64_t distance_index;
            if (current_index > 0) {
                distance_index = current_index;
            } else if (__builtin_sub_overflow(current_index, INT64_C(1), &distance_index)) {
                calendar_fail("calendar: gate index underflow");
            }
            int64_t previous_position;
            if (__builtin_sub_overflow(
                position,
                (int64_t)gate_distance(engine, distance_index),
                &previous_position
            )) {
                calendar_fail("calendar: gate position underflow");
            }
            position = previous_position;
            --current_index;
            gate_position_store(engine, current_index, position);
        }
    }
    return position;
}

static int64_t containing_gate_interval(GateEngine *engine, int64_t jdn) {
    const size_t checkpoint_count =
        sizeof(STATIC_GATE_CHECKPOINTS) / sizeof(STATIC_GATE_CHECKPOINTS[0]);
    size_t low = 0;
    size_t high = checkpoint_count;
    while (low < high) {
        const size_t middle = low + (high - low) / 2;
        if (STATIC_GATE_CHECKPOINTS[middle].position < jdn) {
            low = middle + 1;
        } else {
            high = middle;
        }
    }
    int64_t index;
    if (low == 0) {
        index = STATIC_GATE_CHECKPOINTS[0].index;
    } else if (low == checkpoint_count) {
        index = STATIC_GATE_CHECKPOINTS[checkpoint_count - 1].index;
    } else {
        index = STATIC_GATE_CHECKPOINTS[low - 1].index;
    }

    int64_t position = gate_position(engine, index);
    if (position >= jdn) {
        while (position >= jdn) {
            --index;
            position = gate_position(engine, index);
        }
        return index;
    }
    while (gate_position(engine, index + 1) < jdn) {
        ++index;
    }
    return index;
}

typedef struct Year {
    int64_t number;
    int64_t open_index;
    int64_t close_index;
    int64_t start_jdn;
    int64_t end_jdn;
    int length;
    int gaps;
} Year;

static Year make_year(
    GateEngine *engine,
    int64_t number,
    int64_t open_index,
    int64_t close_index
) {
    const int64_t opening = gate_position(engine, open_index);
    const int64_t closing = gate_position(engine, close_index);
    const int64_t length = closing - opening;
    const int64_t gaps = close_index - open_index;
    if (
        length < INT_MIN || length > INT_MAX
        || gaps < INT_MIN || gaps > INT_MAX
    ) {
        calendar_fail("calendar: year dimension overflow");
    }
    return (Year){
        number,
        open_index,
        close_index,
        opening + 1,
        closing,
        (int)length,
        (int)gaps,
    };
}

typedef struct YearCandidate {
    int64_t open_index;
    int64_t close_index;
    int length;
} YearCandidate;

typedef struct AdjacentYearCandidate {
    int64_t index;
    int length;
} AdjacentYearCandidate;

static int compare_year_candidates(const void *left_pointer, const void *right_pointer) {
    const YearCandidate *left = left_pointer;
    const YearCandidate *right = right_pointer;
    if (left->length != right->length) {
        return left->length < right->length ? -1 : 1;
    }
    if (left->open_index == right->open_index) return 0;
    return left->open_index < right->open_index ? -1 : 1;
}

static int compare_adjacent_candidates(const void *left_pointer, const void *right_pointer) {
    const AdjacentYearCandidate *left = left_pointer;
    const AdjacentYearCandidate *right = right_pointer;
    if (left->length != right->length) {
        return left->length < right->length ? -1 : 1;
    }
    if (left->index == right->index) return 0;
    return left->index < right->index ? -1 : 1;
}

static YearCandidate *enumerate_year_5000_candidates(
    GateEngine *engine,
    int64_t calculation_jdn,
    size_t *candidate_count
) {
    const int64_t interval = containing_gate_interval(engine, calculation_jdn);
    GateEntry openings[160];
    GateEntry closings[160];
    size_t opening_count = 0;
    size_t closing_count = 0;

    for (int64_t index = interval;; --index) {
        const int64_t position = gate_position(engine, index);
        if (calculation_jdn - position > MAX_YEAR_DAYS) break;
        if (opening_count == sizeof(openings) / sizeof(openings[0])) {
            calendar_fail("calendar: too many opening gates");
        }
        openings[opening_count++] = (GateEntry){index, position};
    }
    for (int64_t index = interval + 1;; ++index) {
        const int64_t position = gate_position(engine, index);
        if (position - calculation_jdn > MAX_YEAR_DAYS) break;
        if (closing_count == sizeof(closings) / sizeof(closings[0])) {
            calendar_fail("calendar: too many closing gates");
        }
        closings[closing_count++] = (GateEntry){index, position};
    }

    const size_t capacity = opening_count * closing_count;
    YearCandidate *candidates = calendar_reallocate(
        NULL,
        capacity * sizeof(*candidates)
    );
    size_t count = 0;
    for (size_t opening = 0; opening < opening_count; ++opening) {
        for (size_t closing = 0; closing < closing_count; ++closing) {
            const int64_t gaps = closings[closing].index - openings[opening].index;
            const int64_t length =
                closings[closing].position - openings[opening].position;
            if (
                gaps >= MIN_YEAR_GAPS
                && length >= MIN_YEAR_DAYS
                && length <= MAX_YEAR_DAYS
            ) {
                candidates[count++] = (YearCandidate){
                    openings[opening].index,
                    closings[closing].index,
                    (int)length,
                };
            }
        }
    }
    qsort(candidates, count, sizeof(*candidates), compare_year_candidates);
    *candidate_count = count;
    return candidates;
}

static AdjacentYearCandidate *enumerate_next_years(
    GateEngine *engine,
    int64_t open_index,
    size_t *candidate_count
) {
    const int64_t opening = gate_position(engine, open_index);
    AdjacentYearCandidate *candidates = calendar_reallocate(
        NULL,
        160 * sizeof(*candidates)
    );
    size_t count = 0;
    for (int64_t close_index = open_index + MIN_YEAR_GAPS;; ++close_index) {
        const int64_t length = gate_position(engine, close_index) - opening;
        if (length > MAX_YEAR_DAYS) break;
        if (length >= MIN_YEAR_DAYS) {
            candidates[count++] = (AdjacentYearCandidate){close_index, (int)length};
        }
    }
    qsort(candidates, count, sizeof(*candidates), compare_adjacent_candidates);
    *candidate_count = count;
    return candidates;
}

static AdjacentYearCandidate *enumerate_previous_years(
    GateEngine *engine,
    int64_t close_index,
    size_t *candidate_count
) {
    const int64_t closing = gate_position(engine, close_index);
    AdjacentYearCandidate *candidates = calendar_reallocate(
        NULL,
        160 * sizeof(*candidates)
    );
    size_t count = 0;
    for (int64_t open_index = close_index - MIN_YEAR_GAPS;; --open_index) {
        const int64_t length = closing - gate_position(engine, open_index);
        if (length > MAX_YEAR_DAYS) break;
        if (length >= MIN_YEAR_DAYS) {
            candidates[count++] = (AdjacentYearCandidate){open_index, (int)length};
        }
    }
    qsort(candidates, count, sizeof(*candidates), compare_adjacent_candidates);
    *candidate_count = count;
    return candidates;
}

typedef struct CalculationState {
    GateEngine *engine;
    int64_t calculation_jdn;
    bool has_year_5000;
    Year year_5000;
} CalculationState;

static void calculation_state_init(
    CalculationState *state,
    GateEngine *engine,
    int64_t calculation_jdn
) {
    state->engine = engine;
    state->calculation_jdn = calculation_jdn;
    state->has_year_5000 = false;
    memset(&state->year_5000, 0, sizeof(state->year_5000));
}

static Year calculation_year_5000(CalculationState *state) {
    if (state->has_year_5000) return state->year_5000;
    size_t count = 0;
    YearCandidate *candidates = enumerate_year_5000_candidates(
        state->engine,
        state->calculation_jdn,
        &count
    );
    if (count == 0 || count > UINT32_MAX) {
        free(candidates);
        calendar_fail("calendar: no valid year-5000 candidate");
    }
    SauceResult sauce_result;
    sauce_result_init(&sauce_result);
    sauce(
        &state->engine->stones,
        state->calculation_jdn,
        state->calculation_jdn,
        &sauce_result
    );
    const size_t selected = choose_small(
        &sauce_result,
        0,
        10,
        (uint32_t)count
    ) - 1;
    sauce_result_destroy(&sauce_result);
    state->year_5000 = make_year(
        state->engine,
        5000,
        candidates[selected].open_index,
        candidates[selected].close_index
    );
    state->has_year_5000 = true;
    free(candidates);
    return state->year_5000;
}

static Year calculation_next_year(CalculationState *state, const Year *year) {
    size_t count = 0;
    AdjacentYearCandidate *candidates = enumerate_next_years(
        state->engine,
        year->close_index,
        &count
    );
    if (count == 0 || count > UINT32_MAX) {
        free(candidates);
        calendar_fail("calendar: no valid next-year candidate");
    }
    const int64_t boundary = gate_position(state->engine, year->close_index);
    SauceResult sauce_result;
    sauce_result_init(&sauce_result);
    sauce(&state->engine->stones, state->calculation_jdn, boundary, &sauce_result);
    const size_t selected = choose_small(
        &sauce_result,
        0,
        11,
        (uint32_t)count
    ) - 1;
    sauce_result_destroy(&sauce_result);
    const Year result = make_year(
        state->engine,
        year->number + 1,
        year->close_index,
        candidates[selected].index
    );
    free(candidates);
    return result;
}

static Year calculation_previous_year(CalculationState *state, const Year *year) {
    size_t count = 0;
    AdjacentYearCandidate *candidates = enumerate_previous_years(
        state->engine,
        year->open_index,
        &count
    );
    if (count == 0 || count > UINT32_MAX) {
        free(candidates);
        calendar_fail("calendar: no valid previous-year candidate");
    }
    const int64_t boundary = gate_position(state->engine, year->open_index);
    SauceResult sauce_result;
    sauce_result_init(&sauce_result);
    sauce(&state->engine->stones, state->calculation_jdn, boundary, &sauce_result);
    const size_t selected = choose_small(
        &sauce_result,
        0,
        12,
        (uint32_t)count
    ) - 1;
    sauce_result_destroy(&sauce_result);
    const Year result = make_year(
        state->engine,
        year->number - 1,
        candidates[selected].index,
        year->open_index
    );
    free(candidates);
    return result;
}

static Year calculation_find_year(CalculationState *state, int64_t target_jdn) {
    Year year = calculation_year_5000(state);
    if (target_jdn < year.start_jdn) {
        while (target_jdn < year.start_jdn) {
            year = calculation_previous_year(state, &year);
        }
    } else {
        while (target_jdn > year.end_jdn) {
            year = calculation_next_year(state, &year);
        }
    }
    return year;
}

#ifdef PASTAFARI_TESTING
int64_t pc_test_gate_position(int64_t index) {
    GateEngine engine;
    gate_engine_init(&engine);
    const int64_t answer = gate_position(&engine, index);
    gate_engine_destroy(&engine);
    return answer;
}

void pc_test_year_5000(
    int64_t calculation_jdn,
    int64_t *open_index,
    int64_t *close_index,
    int64_t *start_jdn,
    int64_t *end_jdn
) {
    GateEngine engine;
    CalculationState state;
    gate_engine_init(&engine);
    calculation_state_init(&state, &engine, calculation_jdn);
    const Year year = calculation_year_5000(&state);
    *open_index = year.open_index;
    *close_index = year.close_index;
    *start_jdn = year.start_jdn;
    *end_jdn = year.end_jdn;
    gate_engine_destroy(&engine);
}
#endif

static void unrank_name_indices(
    uint32_t available_count,
    uint32_t selected_count,
    const WideInt *one_based_rank,
    uint8_t *result
) {
    uint8_t available[MONTH_NAME_COUNT];
    for (uint32_t index = 0; index < available_count; ++index) {
        available[index] = (uint8_t)index;
    }
    uint32_t remaining_available = available_count;
    WideInt rank;
    WideInt block;
    wi_init(&rank);
    wi_init(&block);
    wi_copy(&rank, one_based_rank);

    for (uint32_t position = 0; position < selected_count; ++position) {
        wi_permutation(
            &block,
            remaining_available - 1,
            selected_count - position - 1
        );
        uint32_t selected = 0;
        if (!wi_is_zero(&block)) {
            while (wi_compare(&rank, &block) > 0) {
                wi_sub(&rank, &rank, &block);
                ++selected;
            }
        }
        if (selected >= remaining_available) {
            calendar_fail("calendar: name permutation rank overflow");
        }
        result[position] = available[selected];
        memmove(
            &available[selected],
            &available[selected + 1],
            (remaining_available - selected - 1) * sizeof(*available)
        );
        --remaining_available;
    }
    wi_destroy(&rank);
    wi_destroy(&block);
}

static void composition_suffix_count(
    WideInt *result,
    int remaining,
    int parts,
    int mandatory_offset
) {
    if (parts == 0) {
        wi_set_u64(
            result,
            remaining == 0 && (mandatory_offset < 0 || mandatory_offset == 0)
                ? 1U : 0U
        );
        return;
    }
    if (remaining < parts) {
        wi_set_zero(result);
        return;
    }
    if (mandatory_offset < 0 || mandatory_offset == 0) {
        wi_binomial(result, (uint32_t)(remaining - 1), (uint32_t)(parts - 1));
        return;
    }
    if (mandatory_offset <= 0 || mandatory_offset >= remaining || parts < 2) {
        wi_set_zero(result);
        return;
    }
    wi_binomial(result, (uint32_t)(remaining - 2), (uint32_t)(parts - 2));
}

static void unrank_composition(
    int total,
    int parts,
    int mandatory_cut,
    const WideInt *one_based_rank,
    int *result
) {
    int remaining = total;
    int cumulative = 0;
    bool hit = mandatory_cut < 0;
    WideInt rank;
    WideInt block;
    wi_init(&rank);
    wi_init(&block);
    wi_copy(&rank, one_based_rank);

    for (int position = 0; position < parts; ++position) {
        const int left = parts - position - 1;
        bool selected = false;
        for (int value = 1; value <= remaining - left; ++value) {
            const int after = remaining - value;
            const int new_cumulative = cumulative + value;
            const bool new_hit = hit || new_cumulative == mandatory_cut;
            int mandatory_offset = -1;
            if (!new_hit) {
                if (mandatory_cut < 0 || mandatory_cut < new_cumulative) continue;
                mandatory_offset = mandatory_cut - new_cumulative;
            }
            composition_suffix_count(&block, after, left, mandatory_offset);
            if (wi_compare(&rank, &block) > 0) {
                wi_sub(&rank, &rank, &block);
                continue;
            }
            result[position] = value;
            remaining = after;
            cumulative = new_cumulative;
            hit = new_hit;
            selected = true;
            break;
        }
        if (!selected) {
            calendar_fail("calendar: composition unranking exhausted its branches");
        }
    }
    wi_destroy(&rank);
    wi_destroy(&block);
}

static void bounded_month_length_count(WideInt *result, int total, int parts) {
    const int shifted = total - 4 * parts;
    if (shifted < 0 || shifted > 119 * parts) {
        wi_set_zero(result);
        return;
    }
    WideInt positive;
    WideInt negative;
    WideInt first;
    WideInt second;
    WideInt ways;
    wi_init(&positive);
    wi_init(&negative);
    wi_init(&first);
    wi_init(&second);
    wi_init(&ways);
    const int maximum_excluded = parts < shifted / 120 ? parts : shifted / 120;
    for (int excluded = 0; excluded <= maximum_excluded; ++excluded) {
        wi_binomial(&first, (uint32_t)parts, (uint32_t)excluded);
        wi_binomial(
            &second,
            (uint32_t)(shifted - 120 * excluded + parts - 1),
            (uint32_t)(parts - 1)
        );
        wi_mul(&ways, &first, &second);
        if ((excluded & 1) == 0) {
            wi_add(&positive, &positive, &ways);
        } else {
            wi_add(&negative, &negative, &ways);
        }
    }
    if (wi_compare(&positive, &negative) < 0) {
        calendar_fail("calendar: bounded composition count became negative");
    }
    wi_sub(result, &positive, &negative);
    wi_destroy(&positive);
    wi_destroy(&negative);
    wi_destroy(&first);
    wi_destroy(&second);
    wi_destroy(&ways);
}

typedef struct MonthCountEntry {
    int total;
    int parts;
    WideInt count;
} MonthCountEntry;

typedef struct MonthCountCache {
    MonthCountEntry *entries;
    size_t count;
    size_t capacity;
} MonthCountCache;

static void month_count_cache_init(MonthCountCache *cache) {
    memset(cache, 0, sizeof(*cache));
}

static void month_count_cache_destroy(MonthCountCache *cache) {
    for (size_t index = 0; index < cache->count; ++index) {
        wi_destroy(&cache->entries[index].count);
    }
    free(cache->entries);
    memset(cache, 0, sizeof(*cache));
}

static const WideInt *month_count_cache_get(
    MonthCountCache *cache,
    int total,
    int parts
) {
    for (size_t index = 0; index < cache->count; ++index) {
        if (
            cache->entries[index].total == total
            && cache->entries[index].parts == parts
        ) {
            return &cache->entries[index].count;
        }
    }
    if (cache->count == cache->capacity) {
        const size_t grown = cache->capacity == 0 ? 128 : cache->capacity * 2;
        cache->entries = calendar_reallocate(
            cache->entries,
            grown * sizeof(*cache->entries)
        );
        cache->capacity = grown;
    }
    MonthCountEntry *entry = &cache->entries[cache->count++];
    entry->total = total;
    entry->parts = parts;
    wi_init(&entry->count);
    bounded_month_length_count(&entry->count, total, parts);
    return &entry->count;
}

static void unrank_month_lengths(
    int total,
    int parts,
    const WideInt *one_based_rank,
    int *result
) {
    int remaining = total;
    WideInt rank;
    wi_init(&rank);
    wi_copy(&rank, one_based_rank);
    MonthCountCache cache;
    month_count_cache_init(&cache);

    for (int position = 0; position < parts; ++position) {
        const int left = parts - position - 1;
        bool selected = false;
        int maximum = remaining - 4 * left;
        if (maximum > 123) maximum = 123;
        for (int value = 4; value <= maximum; ++value) {
            const int after = remaining - value;
            WideInt singleton;
            wi_init(&singleton);
            const WideInt *block;
            if (left == 0) {
                wi_set_u64(&singleton, after == 0 ? 1U : 0U);
                block = &singleton;
            } else {
                block = month_count_cache_get(&cache, after, left);
            }
            if (wi_compare(&rank, block) > 0) {
                wi_sub(&rank, &rank, block);
                wi_destroy(&singleton);
                continue;
            }
            result[position] = value;
            remaining = after;
            selected = true;
            wi_destroy(&singleton);
            break;
        }
        if (!selected) {
            month_count_cache_destroy(&cache);
            wi_destroy(&rank);
            calendar_fail("calendar: month-length unranking exhausted its branches");
        }
    }
    month_count_cache_destroy(&cache);
    wi_destroy(&rank);
}

typedef struct WideArray {
    WideInt *values;
    size_t count;
} WideArray;

static void wide_array_init(WideArray *array, size_t count) {
    array->values = calendar_reallocate(NULL, count * sizeof(*array->values));
    array->count = count;
    for (size_t index = 0; index < count; ++index) {
        wi_init(&array->values[index]);
    }
}

static void wide_array_destroy(WideArray *array) {
    for (size_t index = 0; index < array->count; ++index) {
        wi_destroy(&array->values[index]);
    }
    free(array->values);
    array->values = NULL;
    array->count = 0;
}

typedef struct InterleavingCounter {
    const int *lengths;
    int month_count;
    WideArray cache[MONTH_NAME_COUNT];
} InterleavingCounter;

static void interleaving_counter_init(
    InterleavingCounter *counter,
    const int *lengths,
    int month_count
) {
    counter->lengths = lengths;
    counter->month_count = month_count;
    for (size_t index = 0; index < MONTH_NAME_COUNT; ++index) {
        counter->cache[index] = (WideArray){NULL, 0};
    }
}

static void interleaving_counter_clear(InterleavingCounter *counter) {
    for (int index = 0; index < counter->month_count; ++index) {
        wide_array_destroy(&counter->cache[index]);
    }
}

static void interleaving_counter_rebuild(
    InterleavingCounter *counter,
    int start,
    int q_start
) {
    interleaving_counter_clear(counter);
    int needed[MONTH_NAME_COUNT] = {0};
    needed[start] = q_start;
    for (int index = start; index < counter->month_count - 1; ++index) {
        needed[index + 1] = needed[index] + counter->lengths[index + 1] - 1;
    }

    WideArray transient = {NULL, 0};
    for (int index = counter->month_count - 1; index >= start; --index) {
        const int q_max = needed[index];
        WideArray current;
        wide_array_init(&current, (size_t)q_max + 1);
        if (index == counter->month_count - 1) {
            for (int q = 0; q <= q_max; ++q) {
                wi_set_u64(&current.values[q], 1);
            }
        } else {
            const WideArray *following = counter->cache[index + 1].values != NULL
                ? &counter->cache[index + 1] : &transient;
            WideInt cumulative;
            WideInt weight;
            WideInt term;
            wi_init(&cumulative);
            wi_init(&weight);
            wi_init(&term);
            wi_set_u64(&weight, 1);
            const int month_length = counter->lengths[index + 1];
            for (int q = 1; q <= q_max; ++q) {
                const int r = q - 1;
                const size_t following_index = (size_t)(month_length + r);
                if (following_index >= following->count) {
                    calendar_fail("calendar: interleaving DP suffix underflow");
                }
                wi_mul(&term, &weight, &following->values[following_index]);
                wi_add(&cumulative, &cumulative, &term);
                wi_copy(&current.values[q], &cumulative);
                wi_mul_u32(
                    &weight,
                    &weight,
                    (uint32_t)(month_length + r - 1)
                );
                if (wi_div_u32(&weight, &weight, (uint32_t)(r + 1)) != 0) {
                    calendar_fail("calendar: interleaving weight division was not exact");
                }
            }
            wi_destroy(&cumulative);
            wi_destroy(&weight);
            wi_destroy(&term);
        }

        if (index <= start + 7) {
            if (transient.values != NULL) wide_array_destroy(&transient);
            counter->cache[index] = current;
        } else {
            if (transient.values != NULL) wide_array_destroy(&transient);
            transient = current;
        }
    }
    if (transient.values != NULL) wide_array_destroy(&transient);
}

static const WideInt *interleaving_counter_get(
    InterleavingCounter *counter,
    int last_seen,
    int q
) {
    if (last_seen >= counter->month_count - 1) {
        static const uint32_t one_limb = 1;
        static const WideInt one = {(uint32_t *)&one_limb, 1, 1};
        return &one;
    }
    if (
        counter->cache[last_seen].values == NULL
        || (size_t)q >= counter->cache[last_seen].count
    ) {
        interleaving_counter_rebuild(counter, last_seen, q);
    }
    return &counter->cache[last_seen].values[q];
}

static void interleaving_count(
    WideInt *result,
    const int *lengths,
    int month_count
) {
    InterleavingCounter counter;
    interleaving_counter_init(&counter, lengths, month_count);
    wi_copy(result, interleaving_counter_get(&counter, 0, lengths[0]));
    interleaving_counter_clear(&counter);
}

static void unrank_month_interleaving(
    const int *lengths,
    int month_count,
    const WideInt *one_based_rank,
    uint8_t *weave
) {
    int total_length = 0;
    int remaining[MONTH_NAME_COUNT] = {0};
    for (int index = 0; index < month_count; ++index) {
        total_length += lengths[index];
        remaining[index] = lengths[index];
    }
    InterleavingCounter counter;
    interleaving_counter_init(&counter, lengths, month_count);
    --remaining[0];
    int low = 0;
    int high = 0;
    int active_total = remaining[0];
    WideInt base_count;
    WideInt rank;
    wi_init(&base_count);
    wi_init(&rank);
    wi_set_u64(&base_count, 1);
    wi_copy(&rank, one_based_rank);

    const WideInt *expected = interleaving_counter_get(&counter, 0, active_total + 1);
    if (wi_is_zero(&rank) || wi_compare(&rank, expected) > 0) {
        calendar_fail("calendar: interleaving rank is outside its valid range");
    }
    weave[0] = 0;

    for (int position = 1; position < total_length; ++position) {
        int prefix[MONTH_NAME_COUNT];
        int running = 0;
        for (int month = low; month <= high; ++month) {
            running += remaining[month];
            prefix[month - low] = running;
        }
        const int span = high - low + 1;
        WideArray suffix_p;
        WideArray suffix_pm1;
        wide_array_init(&suffix_p, (size_t)span + 1);
        wide_array_init(&suffix_pm1, (size_t)span + 1);
        wi_set_u64(&suffix_p.values[span], 1);
        wi_set_u64(&suffix_pm1.values[span], 1);
        for (int offset = span - 1; offset >= 0; --offset) {
            wi_mul_u32(
                &suffix_p.values[offset],
                &suffix_p.values[offset + 1],
                (uint32_t)prefix[offset]
            );
            wi_mul_u32(
                &suffix_pm1.values[offset],
                &suffix_pm1.values[offset + 1],
                (uint32_t)(prefix[offset] - 1)
            );
        }

        const WideInt *future_same = interleaving_counter_get(
            &counter,
            high,
            active_total
        );
        bool selected = false;
        WideInt numerator;
        WideInt denominator;
        WideInt multiplied;
        WideInt next_base;
        WideInt block;
        wi_init(&numerator);
        wi_init(&denominator);
        wi_init(&multiplied);
        wi_init(&next_base);
        wi_init(&block);

        for (int month = low; month <= high; ++month) {
            const int remaining_for_month = remaining[month];
            if (remaining_for_month == 1 && month != low) continue;
            const int offset = month - low;
            if (remaining_for_month > 1) {
                wi_mul_u32(
                    &numerator,
                    &suffix_p.values[offset],
                    (uint32_t)(remaining_for_month - 1)
                );
                wi_mul_u32(
                    &denominator,
                    &suffix_pm1.values[offset],
                    (uint32_t)active_total
                );
            } else {
                wi_copy(&numerator, &suffix_p.values[offset + 1]);
                wi_mul_u32(
                    &denominator,
                    &suffix_pm1.values[offset + 1],
                    (uint32_t)active_total
                );
            }
            wi_mul(&multiplied, &base_count, &numerator);
            wi_div_exact(&next_base, &multiplied, &denominator);
            wi_mul(&block, &next_base, future_same);
            if (wi_compare(&rank, &block) > 0) {
                wi_sub(&rank, &rank, &block);
                continue;
            }
            weave[position] = (uint8_t)month;
            --remaining[month];
            --active_total;
            wi_copy(&base_count, &next_base);
            if (remaining[month] == 0) ++low;
            selected = true;
            break;
        }

        if (!selected) {
            if (high + 1 >= month_count) {
                calendar_fail("calendar: interleaving exhausted all valid branches");
            }
            const int month = high + 1;
            const int new_remaining = lengths[month] - 1;
            WideInt combination;
            wi_init(&combination);
            wi_binomial(
                &combination,
                (uint32_t)(active_total + new_remaining - 1),
                (uint32_t)(new_remaining - 1)
            );
            wi_mul(&next_base, &base_count, &combination);
            const int next_active_total = active_total + new_remaining;
            const WideInt *future = interleaving_counter_get(
                &counter,
                month,
                next_active_total + 1
            );
            wi_mul(&block, &next_base, future);
            if (wi_compare(&rank, &block) > 0) {
                calendar_fail("calendar: rank exceeded the final interleaving branch");
            }
            weave[position] = (uint8_t)month;
            high = month;
            --remaining[month];
            if (low > month - 1) low = month;
            active_total = next_active_total;
            wi_copy(&base_count, &next_base);
            wi_destroy(&combination);
        }

        wi_destroy(&numerator);
        wi_destroy(&denominator);
        wi_destroy(&multiplied);
        wi_destroy(&next_base);
        wi_destroy(&block);
        wide_array_destroy(&suffix_p);
        wide_array_destroy(&suffix_pm1);
    }

    interleaving_counter_clear(&counter);
    wi_destroy(&base_count);
    wi_destroy(&rank);
}

typedef struct YearStructure {
    int cutlet_count;
    int cutlet_gaps[CUTLET_NAME_COUNT];
    uint8_t cutlet_names[CUTLET_NAME_COUNT];
    int cutlet_start_offsets[CUTLET_NAME_COUNT];
    int cutlet_end_offsets[CUTLET_NAME_COUNT];
    int month_count;
    int month_lengths[MONTH_NAME_COUNT];
    uint8_t month_names[MONTH_NAME_COUNT];
    uint8_t *month_weave;
    uint8_t *day_in_month;
} YearStructure;

static void year_structure_init(YearStructure *structure) {
    memset(structure, 0, sizeof(*structure));
}

static void year_structure_destroy(YearStructure *structure) {
    free(structure->month_weave);
    free(structure->day_in_month);
    year_structure_init(structure);
}

static void build_year_structure(
    CalculationState *state,
    const Year *year,
    YearStructure *structure
) {
    year_structure_init(structure);
    SauceResult sauce_result;
    sauce_result_init(&sauce_result);
    sauce(
        &state->engine->stones,
        state->calculation_jdn,
        year->start_jdn,
        &sauce_result
    );

    int maximum_cutlets = year->gaps < CUTLET_NAME_COUNT
        ? year->gaps : CUTLET_NAME_COUNT;
    if (maximum_cutlets < 6) {
        calendar_fail("calendar: year cannot contain six cutlets");
    }
    structure->cutlet_count = 5 + (int)choose_small(
        &sauce_result,
        1,
        20,
        (uint32_t)(maximum_cutlets - 5)
    );

    int mandatory_cut = -1;
    if (
        year->start_jdn <= state->calculation_jdn
        && state->calculation_jdn <= year->end_jdn
    ) {
        for (
            int64_t gate_index = year->open_index + 1;
            gate_index < year->close_index;
            ++gate_index
        ) {
            if (gate_position(state->engine, gate_index) == state->calculation_jdn) {
                mandatory_cut = (int)(gate_index - year->open_index);
                break;
            }
        }
    }

    WideInt partition_count;
    WideInt rank;
    wi_init(&partition_count);
    wi_init(&rank);
    wi_binomial(
        &partition_count,
        (uint32_t)(year->gaps - (mandatory_cut < 0 ? 1 : 2)),
        (uint32_t)(structure->cutlet_count - (mandatory_cut < 0 ? 1 : 2))
    );
    choose_wide(&rank, &sauce_result, 1, 21, &partition_count);
    unrank_composition(
        year->gaps,
        structure->cutlet_count,
        mandatory_cut,
        &rank,
        structure->cutlet_gaps
    );

    WideInt name_ways;
    wi_init(&name_ways);
    wi_permutation(
        &name_ways,
        CUTLET_NAME_COUNT,
        (uint32_t)structure->cutlet_count
    );
    choose_wide(&rank, &sauce_result, 4, 22, &name_ways);
    unrank_name_indices(
        CUTLET_NAME_COUNT,
        (uint32_t)structure->cutlet_count,
        &rank,
        structure->cutlet_names
    );

    const int minimum_months = (year->length + 122) / 123;
    int maximum_months = year->length / 4;
    if (maximum_months > MONTH_NAME_COUNT) maximum_months = MONTH_NAME_COUNT;
    structure->month_count = minimum_months - 1 + (int)choose_small(
        &sauce_result,
        2,
        30,
        (uint32_t)(maximum_months - minimum_months + 1)
    );

    WideInt month_length_ways;
    wi_init(&month_length_ways);
    bounded_month_length_count(
        &month_length_ways,
        year->length,
        structure->month_count
    );
    choose_wide(&rank, &sauce_result, 2, 31, &month_length_ways);
    unrank_month_lengths(
        year->length,
        structure->month_count,
        &rank,
        structure->month_lengths
    );

    WideInt weave_ways;
    wi_init(&weave_ways);
    interleaving_count(
        &weave_ways,
        structure->month_lengths,
        structure->month_count
    );
    choose_wide(&rank, &sauce_result, 3, 32, &weave_ways);
    structure->month_weave = calendar_reallocate(
        NULL,
        (size_t)year->length * sizeof(*structure->month_weave)
    );
    unrank_month_interleaving(
        structure->month_lengths,
        structure->month_count,
        &rank,
        structure->month_weave
    );

    wi_permutation(
        &name_ways,
        MONTH_NAME_COUNT,
        (uint32_t)structure->month_count
    );
    choose_wide(&rank, &sauce_result, 4, 33, &name_ways);
    unrank_name_indices(
        MONTH_NAME_COUNT,
        (uint32_t)structure->month_count,
        &rank,
        structure->month_names
    );

    structure->day_in_month = calendar_reallocate(
        NULL,
        (size_t)year->length * sizeof(*structure->day_in_month)
    );
    uint8_t seen[MONTH_NAME_COUNT] = {0};
    for (int offset = 0; offset < year->length; ++offset) {
        const uint8_t month = structure->month_weave[offset];
        if (month >= (uint8_t)structure->month_count || seen[month] == UINT8_MAX) {
            calendar_fail("calendar: invalid month weave");
        }
        ++seen[month];
        structure->day_in_month[offset] = seen[month];
    }

    int gap_offset = 0;
    int day_offset = 0;
    for (int cutlet = 0; cutlet < structure->cutlet_count; ++cutlet) {
        structure->cutlet_start_offsets[cutlet] = day_offset;
        gap_offset += structure->cutlet_gaps[cutlet];
        const int64_t end_jdn = gate_position(
            state->engine,
            year->open_index + gap_offset
        );
        day_offset = (int)(end_jdn - year->start_jdn + 1);
        structure->cutlet_end_offsets[cutlet] = day_offset - 1;
    }

    wi_destroy(&partition_count);
    wi_destroy(&rank);
    wi_destroy(&name_ways);
    wi_destroy(&month_length_ways);
    wi_destroy(&weave_ways);
    sauce_result_destroy(&sauce_result);
}

static int find_cutlet(const YearStructure *structure, int offset) {
    int low = 0;
    int high = structure->cutlet_count - 1;
    while (low <= high) {
        const int middle = low + (high - low) / 2;
        if (offset < structure->cutlet_start_offsets[middle]) {
            high = middle - 1;
        } else if (offset > structure->cutlet_end_offsets[middle]) {
            low = middle + 1;
        } else {
            return middle;
        }
    }
    calendar_fail("calendar: day offset is not contained in a cutlet");
    return 0;
}

static void materialize(
    const Year *year,
    const YearStructure *structure,
    int64_t target_jdn,
    PastafariOutput *result
) {
    const int offset = (int)(target_jdn - year->start_jdn);
    if (offset < 0 || offset >= year->length) {
        calendar_fail("calendar: materialized day is outside its year");
    }
    const int cutlet = find_cutlet(structure, offset);
    const uint8_t month = structure->month_weave[offset];
    result->year = year->number;
    result->cutlet_name = CUTLET_NAMES[structure->cutlet_names[cutlet]];
    result->day_in_cutlet =
        offset - structure->cutlet_start_offsets[cutlet] + 1;
    result->month_name = MONTH_NAMES[structure->month_names[month]];
    result->day_in_month = structure->day_in_month[offset];
}

static __int128 floor_divide_i128(__int128 numerator, __int128 denominator) {
    __int128 quotient = numerator / denominator;
    const __int128 remainder = numerator % denominator;
    if (remainder < 0) --quotient;
    return quotient;
}

static bool gregorian_leap_year(int64_t year) {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}

static int gregorian_month_length(int64_t year, int month) {
    if (month == 2) return gregorian_leap_year(year) ? 29 : 28;
    return month == 4 || month == 6 || month == 9 || month == 11 ? 30 : 31;
}

static bool parse_i64_span(const char *first, const char *last, int64_t *result) {
    if (first == last) return false;
    bool negative = false;
    if (*first == '+' || *first == '-') {
        negative = *first == '-';
        ++first;
    }
    if (first == last) return false;
    unsigned __int128 magnitude = 0;
    for (const char *cursor = first; cursor != last; ++cursor) {
        if (*cursor < '0' || *cursor > '9') return false;
        magnitude = magnitude * 10 + (unsigned)(*cursor - '0');
        const unsigned __int128 maximum = negative
            ? (unsigned __int128)INT64_MAX + 1
            : (unsigned __int128)INT64_MAX;
        if (magnitude > maximum) return false;
    }
    if (negative && magnitude == (unsigned __int128)INT64_MAX + 1) {
        *result = INT64_MIN;
    } else {
        *result = negative ? -(int64_t)magnitude : (int64_t)magnitude;
    }
    return true;
}

bool pc_iso_to_jdn(const char *text, int64_t *result) {
    if (text == NULL || result == NULL) return false;
    const char *last_dash = strrchr(text, '-');
    if (last_dash == NULL || strlen(last_dash + 1) != 2) return false;
    const char *middle_dash = last_dash;
    while (middle_dash != text && *--middle_dash != '-') {
        /* Search backward for the month separator. */
    }
    if (middle_dash == text || last_dash - middle_dash != 3) return false;
    int64_t year;
    if (!parse_i64_span(text, middle_dash, &year)) return false;
    if (
        middle_dash[1] < '0' || middle_dash[1] > '9'
        || middle_dash[2] < '0' || middle_dash[2] > '9'
        || last_dash[1] < '0' || last_dash[1] > '9'
        || last_dash[2] < '0' || last_dash[2] > '9'
    ) {
        return false;
    }
    const int month = (middle_dash[1] - '0') * 10 + (middle_dash[2] - '0');
    const int day = (last_dash[1] - '0') * 10 + (last_dash[2] - '0');
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > gregorian_month_length(year, month)) return false;

    const __int128 a = floor_divide_i128(14 - month, 12);
    const __int128 y = (__int128)year + 4800 - a;
    const __int128 m = month + 12 * a - 3;
    const __int128 jdn =
        day
        + floor_divide_i128(153 * m + 2, 5)
        + 365 * y
        + floor_divide_i128(y, 4)
        - floor_divide_i128(y, 100)
        + floor_divide_i128(y, 400)
        - 32045;
    if (jdn < INT64_MIN || jdn > INT64_MAX) return false;
    *result = (int64_t)jdn;
    return true;
}

bool pc_convert_jdn(
    int64_t calculation_jdn,
    int64_t target_jdn,
    PastafariOutput *result,
    const char **error_message
) {
    if (error_message != NULL) *error_message = NULL;
    if (result == NULL) {
        if (error_message != NULL) *error_message = "output pointer is null";
        return false;
    }
    const __int128 target_delta = (__int128)target_jdn - FOUNDATION_JDN;
    const __int128 calculation_delta = (__int128)calculation_jdn - FOUNDATION_JDN;
    const unsigned __int128 target_magnitude = target_delta < 0
        ? (unsigned __int128)(-target_delta) : (unsigned __int128)target_delta;
    const unsigned __int128 calculation_magnitude = calculation_delta < 0
        ? (unsigned __int128)(-calculation_delta) : (unsigned __int128)calculation_delta;
    if (
        target_magnitude > UINT64_MAX / 2
        || calculation_magnitude > UINT64_MAX / 2
    ) {
        if (error_message != NULL) {
            *error_message = "JDN is outside the exact C17 engine range";
        }
        return false;
    }

    GateEngine engine;
    CalculationState state;
    YearStructure structure;
    gate_engine_init(&engine);
    calculation_state_init(&state, &engine, calculation_jdn);
    const Year year = calculation_find_year(&state, target_jdn);
    build_year_structure(&state, &year, &structure);
    materialize(&year, &structure, target_jdn, result);
    year_structure_destroy(&structure);
    gate_engine_destroy(&engine);
    return true;
}

const char *pc_algorithm_id(void) {
    return "PASTAFARI-SCROLL-2026-08-16-D36B0C94";
}

bool pc_convert_iso_json(
    const char *calculation_iso,
    const char *target_iso,
    char *output,
    size_t output_capacity,
    const char **error_message
) {
    if (error_message != NULL) *error_message = NULL;
    if (
        calculation_iso == NULL || target_iso == NULL
        || output == NULL || output_capacity == 0
    ) {
        if (error_message != NULL) *error_message = "null or empty ABI argument";
        return false;
    }
    int64_t calculation_jdn;
    int64_t target_jdn;
    if (!pc_iso_to_jdn(calculation_iso, &calculation_jdn)) {
        if (error_message != NULL) *error_message = "invalid calculation date";
        return false;
    }
    if (!pc_iso_to_jdn(target_iso, &target_jdn)) {
        if (error_message != NULL) *error_message = "invalid target date";
        return false;
    }
    PastafariOutput value;
    if (!pc_convert_jdn(calculation_jdn, target_jdn, &value, error_message)) {
        return false;
    }
    const int written = snprintf(
        output,
        output_capacity,
        "{\"year\":\"%" PRId64 "\",\"cutletName\":\"%s\","
        "\"dayInCutlet\":%d,\"monthName\":\"%s\",\"dayInMonth\":%d}",
        value.year,
        value.cutlet_name,
        value.day_in_cutlet,
        value.month_name,
        value.day_in_month
    );
    if (written < 0 || (size_t)written >= output_capacity) {
        if (error_message != NULL) *error_message = "output buffer is too small";
        if (output_capacity != 0) output[0] = '\0';
        return false;
    }
    return true;
}
