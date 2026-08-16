#include "wideint.h"

#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

enum { LIMB_BITS = 32 };
static const uint64_t LIMB_BASE = UINT64_C(1) << LIMB_BITS;

static void wi_fail(const char *message) {
    fputs(message, stderr);
    fputc('\n', stderr);
    abort();
}

static void *wi_reallocate(void *old, size_t bytes) {
    void *replacement = realloc(old, bytes);
    if (replacement == NULL && bytes != 0) {
        wi_fail("wideint: allocation failed");
    }
    return replacement;
}

static void wi_reserve(WideInt *value, size_t capacity) {
    if (capacity <= value->capacity) {
        return;
    }
    size_t grown = value->capacity == 0 ? 4 : value->capacity;
    while (grown < capacity) {
        if (grown > SIZE_MAX / 2) {
            wi_fail("wideint: capacity overflow");
        }
        grown *= 2;
    }
    if (grown > SIZE_MAX / sizeof(*value->limbs)) {
        wi_fail("wideint: allocation size overflow");
    }
    value->limbs = wi_reallocate(value->limbs, grown * sizeof(*value->limbs));
    value->capacity = grown;
}

static void wi_normalize(WideInt *value) {
    while (value->size != 0 && value->limbs[value->size - 1] == 0) {
        --value->size;
    }
}

void wi_init(WideInt *value) {
    value->limbs = NULL;
    value->size = 0;
    value->capacity = 0;
}

void wi_destroy(WideInt *value) {
    free(value->limbs);
    wi_init(value);
}

void wi_swap(WideInt *left, WideInt *right) {
    const WideInt temporary = *left;
    *left = *right;
    *right = temporary;
}

void wi_set_zero(WideInt *value) {
    value->size = 0;
}

void wi_set_u64(WideInt *value, uint64_t source) {
    if (source == 0) {
        value->size = 0;
        return;
    }
    wi_reserve(value, 2);
    value->limbs[0] = (uint32_t)source;
    value->limbs[1] = (uint32_t)(source >> LIMB_BITS);
    value->size = value->limbs[1] == 0 ? 1 : 2;
}

void wi_copy(WideInt *destination, const WideInt *source) {
    if (destination == source) {
        return;
    }
    wi_reserve(destination, source->size);
    if (source->size != 0) {
        memcpy(destination->limbs, source->limbs, source->size * sizeof(*source->limbs));
    }
    destination->size = source->size;
}

bool wi_is_zero(const WideInt *value) {
    return value->size == 0;
}

size_t wi_bit_length(const WideInt *value) {
    if (value->size == 0) {
        return 0;
    }
    const uint32_t high = value->limbs[value->size - 1];
    return (value->size - 1) * LIMB_BITS + (LIMB_BITS - (size_t)__builtin_clz(high));
}

int wi_compare(const WideInt *left, const WideInt *right) {
    if (left->size != right->size) {
        return left->size < right->size ? -1 : 1;
    }
    for (size_t index = left->size; index-- != 0;) {
        if (left->limbs[index] != right->limbs[index]) {
            return left->limbs[index] < right->limbs[index] ? -1 : 1;
        }
    }
    return 0;
}

int wi_compare_u64(const WideInt *left, uint64_t right) {
    WideInt temporary;
    wi_init(&temporary);
    wi_set_u64(&temporary, right);
    const int answer = wi_compare(left, &temporary);
    wi_destroy(&temporary);
    return answer;
}

void wi_add(WideInt *result, const WideInt *left, const WideInt *right) {
    const size_t left_size = left->size;
    const size_t right_size = right->size;
    const size_t maximum = left_size > right_size ? left_size : right_size;
    wi_reserve(result, maximum + 1);

    uint64_t carry = 0;
    for (size_t index = 0; index < maximum; ++index) {
        const uint64_t a = index < left_size ? left->limbs[index] : 0;
        const uint64_t b = index < right_size ? right->limbs[index] : 0;
        const uint64_t sum = a + b + carry;
        result->limbs[index] = (uint32_t)sum;
        carry = sum >> LIMB_BITS;
    }
    result->limbs[maximum] = (uint32_t)carry;
    result->size = maximum + (carry != 0 ? 1 : 0);
}

void wi_add_u32(WideInt *result, const WideInt *left, uint32_t right) {
    WideInt temporary;
    wi_init(&temporary);
    wi_set_u64(&temporary, right);
    wi_add(result, left, &temporary);
    wi_destroy(&temporary);
}

void wi_sub(WideInt *result, const WideInt *left, const WideInt *right) {
    if (wi_compare(left, right) < 0) {
        wi_fail("wideint: negative unsigned subtraction");
    }
    const size_t left_size = left->size;
    const size_t right_size = right->size;
    wi_reserve(result, left_size);

    uint64_t borrow = 0;
    for (size_t index = 0; index < left_size; ++index) {
        const uint64_t a = left->limbs[index];
        const uint64_t b = (index < right_size ? right->limbs[index] : 0) + borrow;
        result->limbs[index] = (uint32_t)(a - b);
        borrow = a < b ? 1 : 0;
    }
    if (borrow != 0) {
        wi_fail("wideint: subtraction borrow invariant failed");
    }
    result->size = left_size;
    wi_normalize(result);
}

void wi_mul(WideInt *result, const WideInt *left, const WideInt *right) {
    if (left->size == 0 || right->size == 0) {
        wi_set_zero(result);
        return;
    }

    WideInt temporary;
    wi_init(&temporary);
    const size_t size = left->size + right->size;
    wi_reserve(&temporary, size);
    memset(temporary.limbs, 0, size * sizeof(*temporary.limbs));
    temporary.size = size;

    for (size_t i = 0; i < left->size; ++i) {
        uint64_t carry = 0;
        for (size_t j = 0; j < right->size; ++j) {
            const size_t position = i + j;
            const uint64_t product =
                (uint64_t)left->limbs[i] * right->limbs[j]
                + temporary.limbs[position]
                + carry;
            temporary.limbs[position] = (uint32_t)product;
            carry = product >> LIMB_BITS;
        }
        size_t position = i + right->size;
        while (carry != 0) {
            const uint64_t sum = (uint64_t)temporary.limbs[position] + carry;
            temporary.limbs[position] = (uint32_t)sum;
            carry = sum >> LIMB_BITS;
            ++position;
        }
    }
    wi_normalize(&temporary);
    wi_swap(result, &temporary);
    wi_destroy(&temporary);
}

void wi_mul_u32(WideInt *result, const WideInt *left, uint32_t right) {
    if (left->size == 0 || right == 0) {
        wi_set_zero(result);
        return;
    }
    const size_t size = left->size;
    wi_reserve(result, size + 1);
    uint64_t carry = 0;
    for (size_t index = 0; index < size; ++index) {
        const uint64_t product = (uint64_t)left->limbs[index] * right + carry;
        result->limbs[index] = (uint32_t)product;
        carry = product >> LIMB_BITS;
    }
    result->limbs[size] = (uint32_t)carry;
    result->size = size + (carry != 0 ? 1 : 0);
}

uint32_t wi_div_u32(WideInt *quotient, const WideInt *dividend, uint32_t divisor) {
    if (divisor == 0) {
        wi_fail("wideint: division by zero");
    }
    const size_t size = dividend->size;
    wi_reserve(quotient, size);
    uint64_t remainder = 0;
    for (size_t index = size; index-- != 0;) {
        const uint64_t current = (remainder << LIMB_BITS) | dividend->limbs[index];
        quotient->limbs[index] = (uint32_t)(current / divisor);
        remainder = current % divisor;
    }
    quotient->size = size;
    wi_normalize(quotient);
    return (uint32_t)remainder;
}

static void wi_knuth_divmod(
    WideInt *quotient,
    WideInt *remainder,
    const WideInt *dividend,
    const WideInt *divisor
) {
    const size_t n = divisor->size;
    const size_t m = dividend->size;
    const unsigned shift = (unsigned)__builtin_clz(divisor->limbs[n - 1]);

    uint32_t *normalized_divisor = calloc(n, sizeof(*normalized_divisor));
    uint32_t *normalized_dividend = calloc(m + 1, sizeof(*normalized_dividend));
    if (normalized_divisor == NULL || normalized_dividend == NULL) {
        free(normalized_divisor);
        free(normalized_dividend);
        wi_fail("wideint: division workspace allocation failed");
    }

    if (shift == 0) {
        memcpy(normalized_divisor, divisor->limbs, n * sizeof(*normalized_divisor));
        memcpy(normalized_dividend, dividend->limbs, m * sizeof(*normalized_dividend));
    } else {
        uint64_t carry = 0;
        for (size_t index = 0; index < n; ++index) {
            const uint64_t current = ((uint64_t)divisor->limbs[index] << shift) | carry;
            normalized_divisor[index] = (uint32_t)current;
            carry = current >> LIMB_BITS;
        }
        carry = 0;
        for (size_t index = 0; index < m; ++index) {
            const uint64_t current = ((uint64_t)dividend->limbs[index] << shift) | carry;
            normalized_dividend[index] = (uint32_t)current;
            carry = current >> LIMB_BITS;
        }
        normalized_dividend[m] = (uint32_t)carry;
    }

    const size_t quotient_size = m - n + 1;
    wi_reserve(quotient, quotient_size);
    memset(quotient->limbs, 0, quotient_size * sizeof(*quotient->limbs));

    for (size_t cursor = quotient_size; cursor-- != 0;) {
        const size_t j = cursor;
        const uint64_t numerator =
            ((uint64_t)normalized_dividend[j + n] << LIMB_BITS)
            | normalized_dividend[j + n - 1];
        uint64_t estimate = numerator / normalized_divisor[n - 1];
        uint64_t estimate_remainder = numerator % normalized_divisor[n - 1];

        if (estimate >= LIMB_BASE) {
            estimate = LIMB_BASE - 1;
            estimate_remainder += normalized_divisor[n - 1];
        }
        if (n > 1) {
            while (
                estimate_remainder < LIMB_BASE
                && estimate * normalized_divisor[n - 2]
                    > estimate_remainder * LIMB_BASE + normalized_dividend[j + n - 2]
            ) {
                --estimate;
                estimate_remainder += normalized_divisor[n - 1];
            }
        }

        uint64_t carry = 0;
        for (size_t index = 0; index < n; ++index) {
            const uint64_t product = estimate * normalized_divisor[index] + carry;
            carry = product >> LIMB_BITS;
            const uint32_t low = (uint32_t)product;
            const uint32_t original = normalized_dividend[j + index];
            normalized_dividend[j + index] = original - low;
            if (original < low) {
                ++carry;
            }
        }

        const bool negative = normalized_dividend[j + n] < carry;
        normalized_dividend[j + n] -= (uint32_t)carry;
        if (negative) {
            --estimate;
            uint64_t add_carry = 0;
            for (size_t index = 0; index < n; ++index) {
                const uint64_t sum =
                    (uint64_t)normalized_dividend[j + index]
                    + normalized_divisor[index]
                    + add_carry;
                normalized_dividend[j + index] = (uint32_t)sum;
                add_carry = sum >> LIMB_BITS;
            }
            normalized_dividend[j + n] += (uint32_t)add_carry;
        }
        quotient->limbs[j] = (uint32_t)estimate;
    }
    quotient->size = quotient_size;
    wi_normalize(quotient);

    wi_reserve(remainder, n);
    if (shift == 0) {
        memcpy(remainder->limbs, normalized_dividend, n * sizeof(*remainder->limbs));
    } else {
        for (size_t index = 0; index < n; ++index) {
            remainder->limbs[index] =
                (normalized_dividend[index] >> shift)
                | (normalized_dividend[index + 1] << (LIMB_BITS - shift));
        }
    }
    remainder->size = n;
    wi_normalize(remainder);

    free(normalized_divisor);
    free(normalized_dividend);
}

void wi_divmod(
    WideInt *quotient,
    WideInt *remainder,
    const WideInt *dividend,
    const WideInt *divisor
) {
    if (divisor->size == 0) {
        wi_fail("wideint: division by zero");
    }

    WideInt q;
    WideInt r;
    wi_init(&q);
    wi_init(&r);

    const int comparison = wi_compare(dividend, divisor);
    if (comparison < 0) {
        wi_copy(&r, dividend);
    } else if (comparison == 0) {
        wi_set_u64(&q, 1);
    } else if (divisor->size == 1) {
        const uint32_t rest = wi_div_u32(&q, dividend, divisor->limbs[0]);
        wi_set_u64(&r, rest);
    } else {
        wi_knuth_divmod(&q, &r, dividend, divisor);
    }

    wi_swap(quotient, &q);
    wi_swap(remainder, &r);
    wi_destroy(&q);
    wi_destroy(&r);
}

void wi_div_exact(WideInt *quotient, const WideInt *dividend, const WideInt *divisor) {
    WideInt remainder;
    wi_init(&remainder);
    wi_divmod(quotient, &remainder, dividend, divisor);
    if (!wi_is_zero(&remainder)) {
        wi_destroy(&remainder);
        wi_fail("wideint: exact division had a remainder");
    }
    wi_destroy(&remainder);
}

void wi_mod(WideInt *remainder, const WideInt *dividend, const WideInt *divisor) {
    WideInt quotient;
    wi_init(&quotient);
    wi_divmod(&quotient, remainder, dividend, divisor);
    wi_destroy(&quotient);
}

uint32_t wi_mod_u32(const WideInt *dividend, uint32_t divisor) {
    if (divisor == 0) {
        wi_fail("wideint: modulo by zero");
    }
    uint64_t remainder = 0;
    for (size_t index = dividend->size; index-- != 0;) {
        remainder = ((remainder << LIMB_BITS) | dividend->limbs[index]) % divisor;
    }
    return (uint32_t)remainder;
}

void wi_shift_right(WideInt *result, const WideInt *source, size_t bits) {
    const size_t whole = bits / LIMB_BITS;
    const unsigned partial = (unsigned)(bits % LIMB_BITS);
    if (whole >= source->size) {
        wi_set_zero(result);
        return;
    }
    const size_t output_size = source->size - whole;
    WideInt temporary;
    wi_init(&temporary);
    wi_reserve(&temporary, output_size);
    for (size_t index = 0; index < output_size; ++index) {
        const size_t input = index + whole;
        uint64_t value = source->limbs[input];
        if (partial != 0 && input + 1 < source->size) {
            value |= (uint64_t)source->limbs[input + 1] << LIMB_BITS;
        }
        temporary.limbs[index] = partial == 0 ? (uint32_t)value : (uint32_t)(value >> partial);
    }
    temporary.size = output_size;
    wi_normalize(&temporary);
    wi_swap(result, &temporary);
    wi_destroy(&temporary);
}

void wi_binomial(WideInt *result, uint32_t n, uint32_t k) {
    if (k > n) {
        wi_set_zero(result);
        return;
    }
    if (k > n - k) {
        k = n - k;
    }
    wi_set_u64(result, 1);
    for (uint32_t index = 1; index <= k; ++index) {
        wi_mul_u32(result, result, n - k + index);
        if (wi_div_u32(result, result, index) != 0) {
            wi_fail("wideint: binomial division invariant failed");
        }
    }
}

void wi_permutation(WideInt *result, uint32_t n, uint32_t k) {
    if (k > n) {
        wi_set_zero(result);
        return;
    }
    wi_set_u64(result, 1);
    for (uint32_t value = n - k + 1; value <= n && k != 0; ++value) {
        wi_mul_u32(result, result, value);
    }
}

void wi_set_great(WideInt *result) {
    wi_reserve(result, 4);
    result->limbs[0] = UINT32_MAX;
    result->limbs[1] = UINT32_MAX;
    result->limbs[2] = UINT32_MAX;
    result->limbs[3] = UINT32_C(0x7fffffff);
    result->size = 4;
}

static void wi_low_127(WideInt *result, const WideInt *source) {
    const size_t size = source->size < 4 ? source->size : 4;
    wi_reserve(result, 4);
    for (size_t index = 0; index < size; ++index) {
        result->limbs[index] = source->limbs[index];
    }
    result->size = size;
    if (result->size == 4) {
        result->limbs[3] &= UINT32_C(0x7fffffff);
    }
    wi_normalize(result);
}

void wi_keep(WideInt *result, const WideInt *positive_value) {
    if (wi_is_zero(positive_value)) {
        wi_fail("wideint: keep expects a positive value");
    }

    WideInt current;
    WideInt low;
    WideInt high;
    WideInt folded;
    WideInt great;
    wi_init(&current);
    wi_init(&low);
    wi_init(&high);
    wi_init(&folded);
    wi_init(&great);
    wi_copy(&current, positive_value);
    wi_set_great(&great);

    while (wi_bit_length(&current) > 127) {
        wi_low_127(&low, &current);
        wi_shift_right(&high, &current, 127);
        wi_add(&folded, &low, &high);
        wi_swap(&current, &folded);
    }
    while (wi_compare(&current, &great) >= 0) {
        wi_sub(&current, &current, &great);
    }
    if (wi_is_zero(&current)) {
        wi_copy(&current, &great);
    }
    wi_swap(result, &current);

    wi_destroy(&current);
    wi_destroy(&low);
    wi_destroy(&high);
    wi_destroy(&folded);
    wi_destroy(&great);
}

char *wi_to_decimal(const WideInt *value) {
    if (wi_is_zero(value)) {
        char *zero = malloc(2);
        if (zero == NULL) {
            wi_fail("wideint: decimal allocation failed");
        }
        memcpy(zero, "0", 2);
        return zero;
    }

    WideInt work;
    wi_init(&work);
    wi_copy(&work, value);
    const size_t maximum = wi_bit_length(value) * 30103 / 100000 + 2;
    char *text = malloc(maximum + 1);
    if (text == NULL) {
        wi_destroy(&work);
        wi_fail("wideint: decimal allocation failed");
    }
    size_t length = 0;
    while (!wi_is_zero(&work)) {
        const uint32_t digit = wi_div_u32(&work, &work, 10);
        text[length++] = (char)('0' + digit);
    }
    for (size_t left = 0, right = length - 1; left < right; ++left, --right) {
        const char temporary = text[left];
        text[left] = text[right];
        text[right] = temporary;
    }
    text[length] = '\0';
    wi_destroy(&work);
    return text;
}

bool wi_from_decimal(WideInt *value, const char *text) {
    if (text == NULL || *text == '\0') {
        return false;
    }
    wi_set_zero(value);
    for (const unsigned char *cursor = (const unsigned char *)text; *cursor != '\0'; ++cursor) {
        if (*cursor < '0' || *cursor > '9') {
            wi_set_zero(value);
            return false;
        }
        wi_mul_u32(value, value, 10);
        wi_add_u32(value, value, (uint32_t)(*cursor - '0'));
    }
    return true;
}
