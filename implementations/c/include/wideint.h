#ifndef PASTAFARI_WIDEINT_H
#define PASTAFARI_WIDEINT_H

/*
 * Project-owned exact unsigned integer arithmetic.
 *
 * The implementation uses little-endian base-2^32 limbs.  It deliberately
 * exposes a narrow C ABI: the optimized x86-64 Assembly build is generated
 * from this audited source and does not link GMP, MPIR or another bignum
 * package.  Capacity grows on demand; zero is represented by size == 0.
 */

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

typedef struct WideInt {
    uint32_t *limbs;
    size_t size;
    size_t capacity;
} WideInt;

void wi_init(WideInt *value);
void wi_destroy(WideInt *value);
void wi_swap(WideInt *left, WideInt *right);
void wi_set_zero(WideInt *value);
void wi_set_u64(WideInt *value, uint64_t source);
void wi_copy(WideInt *destination, const WideInt *source);

bool wi_is_zero(const WideInt *value);
size_t wi_bit_length(const WideInt *value);
int wi_compare(const WideInt *left, const WideInt *right);
int wi_compare_u64(const WideInt *left, uint64_t right);

void wi_add(WideInt *result, const WideInt *left, const WideInt *right);
void wi_add_u32(WideInt *result, const WideInt *left, uint32_t right);
void wi_sub(WideInt *result, const WideInt *left, const WideInt *right);
void wi_mul(WideInt *result, const WideInt *left, const WideInt *right);
void wi_mul_u32(WideInt *result, const WideInt *left, uint32_t right);

uint32_t wi_div_u32(WideInt *quotient, const WideInt *dividend, uint32_t divisor);
void wi_divmod(
    WideInt *quotient,
    WideInt *remainder,
    const WideInt *dividend,
    const WideInt *divisor
);
void wi_div_exact(WideInt *quotient, const WideInt *dividend, const WideInt *divisor);
void wi_mod(WideInt *remainder, const WideInt *dividend, const WideInt *divisor);
uint32_t wi_mod_u32(const WideInt *dividend, uint32_t divisor);

void wi_shift_right(WideInt *result, const WideInt *source, size_t bits);
void wi_binomial(WideInt *result, uint32_t n, uint32_t k);
void wi_permutation(WideInt *result, uint32_t n, uint32_t k);

/* The Scroll's Mersenne constant and saved-remainder operation. */
void wi_set_great(WideInt *result);
void wi_keep(WideInt *result, const WideInt *positive_value);

/* Debug/test conversion.  The caller owns the returned allocation. */
char *wi_to_decimal(const WideInt *value);
bool wi_from_decimal(WideInt *value, const char *text);

#endif
