#ifndef PASTAFARI_BIGINT_H
#define PASTAFARI_BIGINT_H

#include <stdint.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

void *pfbi_new(void);
void pfbi_free(void *p);
void pfbi_set_si(void *dst, int64_t value);
void pfbi_set_ui(void *dst, uint64_t value);
int pfbi_set_dec(void *dst, const char *value);
void pfbi_copy(void *dst, const void *src);
int pfbi_cmp(const void *a, const void *b);
int pfbi_cmp_si(const void *a, int64_t b);
int pfbi_sgn(const void *a);
int pfbi_fits_i64(const void *a);
int64_t pfbi_get_i64(const void *a);
uint64_t pfbi_get_u64(const void *a);
void pfbi_add(void *dst, const void *a, const void *b);
void pfbi_sub(void *dst, const void *a, const void *b);
void pfbi_mul(void *dst, const void *a, const void *b);
void pfbi_add_si(void *dst, const void *a, int64_t b);
void pfbi_mul_si(void *dst, const void *a, int64_t b);
void pfbi_square(void *dst, const void *a);
void pfbi_mod(void *dst, const void *a, const void *m);
uint64_t pfbi_mod_ui(const void *a, uint64_t m);
void pfbi_divexact(void *dst, const void *a, const void *b);
void pfbi_divexact_ui(void *dst, const void *a, uint64_t b);
uint64_t pfbi_div_qr_smallq(void *remainder, const void *a, const void *b);
void pfbi_binomial(void *dst, uint64_t n, uint64_t k);
void pfbi_permutations(void *dst, uint64_t n, uint64_t k);
void pfbi_pow_ui(void *dst, const void *base, uint64_t exponent);
void pfbi_keep(void *dst, const void *value, const void *great);
int pfbi_to_dec(const void *value, char *buffer, size_t buffer_size);

/* Generic constrained interleaving primitive used by the COBOL engine.
 * lengths has m entries of at least 2 (the calendar always uses 4..123). The valid words preserve each symbol's
 * internal order, begin with symbol 0, and first introduce symbols in the
 * order 0,1,...,m-1. Rank is one-based and lexicographic by symbol sequence.
 */
int pfci_count(const int32_t *lengths, int32_t m, void *out_count);
int pfci_unrank(const int32_t *lengths, int32_t m, const void *rank,
                int32_t *out_weave, int32_t out_capacity);

/* Generic lexicographic unranking helpers. These contain no Pastafari calendar
 * semantics; they are arithmetic support for the COBOL implementation.
 */
int pfcu_unrank_permutation(int32_t n, int32_t k, const void *rank,
                            int32_t *out_indices, int32_t capacity);
int pfcu_unrank_composition(int32_t total, int32_t parts, int32_t mandatory_cut,
                            const void *rank, int32_t *out_parts, int32_t capacity);
int pfcu_bounded_count(int32_t total, int32_t parts, int32_t minimum,
                       int32_t maximum, void *out_count);
int pfcu_unrank_bounded(int32_t total, int32_t parts, int32_t minimum,
                        int32_t maximum, const void *rank,
                        int32_t *out_parts, int32_t capacity);

#ifdef __cplusplus
}
#endif
#endif
