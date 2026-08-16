#include "pastafari_bigint.h"

#include <gmp.h>
#include <limits.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    mpz_t z;
} pf_big;

static pf_big *B(void *p) { return (pf_big *)p; }
static const pf_big *CB(const void *p) { return (const pf_big *)p; }

void *pfbi_new(void) {
    pf_big *p = (pf_big *)calloc(1, sizeof(*p));
    if (!p) return NULL;
    mpz_init(p->z);
    return p;
}

void pfbi_free(void *p) {
    if (!p) return;
    mpz_clear(B(p)->z);
    free(p);
}

void pfbi_set_si(void *dst, int64_t value) {
    mpz_import(B(dst)->z, 1, 1, sizeof(value), 0, 0, &value);
    if (value < 0) {
        uint64_t magnitude = (uint64_t)(-(value + 1)) + 1u;
        mpz_import(B(dst)->z, 1, 1, sizeof(magnitude), 0, 0, &magnitude);
        mpz_neg(B(dst)->z, B(dst)->z);
    }
}

void pfbi_set_ui(void *dst, uint64_t value) {
    mpz_import(B(dst)->z, 1, 1, sizeof(value), 0, 0, &value);
}

int pfbi_set_dec(void *dst, const char *value) {
    return mpz_set_str(B(dst)->z, value, 10) == 0 ? 0 : -1;
}

void pfbi_copy(void *dst, const void *src) { mpz_set(B(dst)->z, CB(src)->z); }
int pfbi_cmp(const void *a, const void *b) { return mpz_cmp(CB(a)->z, CB(b)->z); }

int pfbi_cmp_si(const void *a, int64_t b) {
    pf_big t;
    mpz_init(t.z);
    pfbi_set_si(&t, b);
    int r = mpz_cmp(CB(a)->z, t.z);
    mpz_clear(t.z);
    return r;
}

int pfbi_sgn(const void *a) { return mpz_sgn(CB(a)->z); }

int pfbi_fits_i64(const void *a) {
    static int initialized = 0;
    static mpz_t minv, maxv;
    if (!initialized) {
        mpz_init_set_str(minv, "-9223372036854775808", 10);
        mpz_init_set_str(maxv, "9223372036854775807", 10);
        initialized = 1;
    }
    return mpz_cmp(CB(a)->z, minv) >= 0 && mpz_cmp(CB(a)->z, maxv) <= 0;
}

int64_t pfbi_get_i64(const void *a) {
    uint64_t magnitude = 0;
    mpz_t temp;
    mpz_init(temp);
    mpz_abs(temp, CB(a)->z);
    size_t count = 0;
    mpz_export(&magnitude, &count, 1, sizeof(magnitude), 0, 0, temp);
    mpz_clear(temp);
    if (mpz_sgn(CB(a)->z) < 0) {
        if (magnitude == UINT64_C(9223372036854775808)) return INT64_MIN;
        return -(int64_t)magnitude;
    }
    return (int64_t)magnitude;
}

uint64_t pfbi_get_u64(const void *a) {
    uint64_t value = 0;
    size_t count = 0;
    mpz_export(&value, &count, 1, sizeof(value), 0, 0, CB(a)->z);
    return value;
}

void pfbi_add(void *dst, const void *a, const void *b) { mpz_add(B(dst)->z, CB(a)->z, CB(b)->z); }
void pfbi_sub(void *dst, const void *a, const void *b) { mpz_sub(B(dst)->z, CB(a)->z, CB(b)->z); }
void pfbi_mul(void *dst, const void *a, const void *b) { mpz_mul(B(dst)->z, CB(a)->z, CB(b)->z); }

void pfbi_add_si(void *dst, const void *a, int64_t b) {
    pf_big t;
    mpz_init(t.z);
    pfbi_set_si(&t, b);
    mpz_add(B(dst)->z, CB(a)->z, t.z);
    mpz_clear(t.z);
}

void pfbi_mul_si(void *dst, const void *a, int64_t b) {
    pf_big t;
    mpz_init(t.z);
    pfbi_set_si(&t, b);
    mpz_mul(B(dst)->z, CB(a)->z, t.z);
    mpz_clear(t.z);
}

void pfbi_square(void *dst, const void *a) { mpz_mul(B(dst)->z, CB(a)->z, CB(a)->z); }
void pfbi_mod(void *dst, const void *a, const void *m) { mpz_mod(B(dst)->z, CB(a)->z, CB(m)->z); }
uint64_t pfbi_mod_ui(const void *a, uint64_t m) { return mpz_fdiv_ui(CB(a)->z, (unsigned long)m); }
void pfbi_divexact(void *dst, const void *a, const void *b) { mpz_divexact(B(dst)->z, CB(a)->z, CB(b)->z); }
void pfbi_divexact_ui(void *dst, const void *a, uint64_t b) { mpz_divexact_ui(B(dst)->z, CB(a)->z, (unsigned long)b); }

uint64_t pfbi_div_qr_smallq(void *remainder, const void *a, const void *b) {
    mpz_t q;
    mpz_init(q);
    mpz_fdiv_qr(q, B(remainder)->z, CB(a)->z, CB(b)->z);
    uint64_t result = 0;
    size_t count = 0;
    mpz_export(&result, &count, 1, sizeof(result), 0, 0, q);
    mpz_clear(q);
    return result;
}

void pfbi_binomial(void *dst, uint64_t n, uint64_t k) {
    if (k > n) { mpz_set_ui(B(dst)->z, 0); return; }
    mpz_bin_uiui(B(dst)->z, (unsigned long)n, (unsigned long)k);
}

void pfbi_permutations(void *dst, uint64_t n, uint64_t k) {
    mpz_set_ui(B(dst)->z, 1);
    if (k > n) { mpz_set_ui(B(dst)->z, 0); return; }
    for (uint64_t i = 0; i < k; ++i) mpz_mul_ui(B(dst)->z, B(dst)->z, (unsigned long)(n - i));
}

void pfbi_pow_ui(void *dst, const void *base, uint64_t exponent) {
    mpz_pow_ui(B(dst)->z, CB(base)->z, (unsigned long)exponent);
}

void pfbi_keep(void *dst, const void *value, const void *great) {
    mpz_sub_ui(B(dst)->z, CB(value)->z, 1);
    mpz_mod(B(dst)->z, B(dst)->z, CB(great)->z);
    mpz_add_ui(B(dst)->z, B(dst)->z, 1);
}

int pfbi_to_dec(const void *value, char *buffer, size_t buffer_size) {
    size_t need = mpz_sizeinbase(CB(value)->z, 10) + 3;
    if (need > buffer_size) return -1;
    mpz_get_str(buffer, 10, CB(value)->z);
    return 0;
}

/* ----- generic constrained-interleaving counter ----- */

typedef struct {
    mpz_t **row;
    int32_t *row_len;
    int32_t m;
    const int32_t *lengths;
} ci_cache;

static void ci_clear_rows(ci_cache *c) {
    if (!c || !c->row) return;
    for (int32_t i = 0; i < c->m; ++i) {
        if (!c->row[i]) continue;
        for (int32_t q = 0; q < c->row_len[i]; ++q) mpz_clear(c->row[i][q]);
        free(c->row[i]);
        c->row[i] = NULL;
        c->row_len[i] = 0;
    }
}

static void ci_free(ci_cache *c) {
    if (!c || !c->row) return;
    ci_clear_rows(c);
    free(c->row);
    free(c->row_len);
    c->row = NULL;
    c->row_len = NULL;
}

static void ci_free_row(mpz_t *row, int32_t len) {
    if (!row) return;
    for (int32_t q = 0; q < len; ++q) mpz_clear(row[q]);
    free(row);
}

static int ci_build_from(ci_cache *c, int32_t start, int32_t q_start) {
    int32_t m = c->m;
    int32_t *needed = (int32_t *)calloc((size_t)m, sizeof(*needed));
    if (!needed) return -1;
    needed[start] = q_start;
    for (int32_t i = start; i < m - 1; ++i) needed[i + 1] = needed[i] + c->lengths[i + 1] - 1;

    /* Mirror the JavaScript implementation's bounded look-ahead cache. */
    ci_clear_rows(c);
    mpz_t *next = NULL;
    int32_t next_len = 0;
    int next_retained = 0;
    for (int32_t i = m - 1; i >= start; --i) {
        int32_t qmax = needed[i];
        mpz_t *cur = (mpz_t *)malloc((size_t)(qmax + 1) * sizeof(mpz_t));
        if (!cur) {
            if (next && !next_retained) ci_free_row(next, next_len);
            free(needed);
            return -1;
        }
        for (int32_t q = 0; q <= qmax; ++q) mpz_init(cur[q]);
        if (i == m - 1) {
            for (int32_t q = 0; q <= qmax; ++q) mpz_set_ui(cur[q], 1);
        } else {
            mpz_set_ui(cur[0], 0);
            int32_t n = c->lengths[i + 1];
            mpz_t cumulative, weight, term;
            mpz_inits(cumulative, weight, term, NULL);
            mpz_set_ui(cumulative, 0);
            mpz_set_ui(weight, 1);
            for (int32_t q = 1; q <= qmax; ++q) {
                int32_t r = q - 1;
                if (n + r >= next_len) {
                    mpz_clears(cumulative, weight, term, NULL);
                    ci_free_row(cur, qmax + 1);
                    if (next && !next_retained) ci_free_row(next, next_len);
                    free(needed);
                    return -2;
                }
                mpz_mul(term, weight, next[n + r]);
                mpz_add(cumulative, cumulative, term);
                mpz_set(cur[q], cumulative);
                mpz_mul_ui(weight, weight, (unsigned long)(n + r - 1));
                mpz_divexact_ui(weight, weight, (unsigned long)(r + 1));
            }
            mpz_clears(cumulative, weight, term, NULL);
        }

        if (next && !next_retained) ci_free_row(next, next_len);
        int retain = i <= start + 7;
        if (retain) {
            c->row[i] = cur;
            c->row_len[i] = qmax + 1;
        }
        next = cur;
        next_len = qmax + 1;
        next_retained = retain;
    }
    /* start is always retained, so next is owned by the cache here. */
    free(needed);
    return 0;
}

static int ci_get(ci_cache *c, int32_t last_seen, int32_t q, mpz_t out) {
    if (last_seen >= c->m - 1) { mpz_set_ui(out, 1); return 0; }
    if (!c->row[last_seen] || c->row_len[last_seen] <= q) {
        int rc = ci_build_from(c, last_seen, q);
        if (rc) return rc;
    }
    mpz_set(out, c->row[last_seen][q]);
    return 0;
}

static int ci_init(ci_cache *c, const int32_t *lengths, int32_t m) {
    memset(c, 0, sizeof(*c));
    if (!lengths || m < 1) return -1;
    c->m = m;
    c->lengths = lengths;
    c->row = (mpz_t **)calloc((size_t)m, sizeof(*c->row));
    c->row_len = (int32_t *)calloc((size_t)m, sizeof(*c->row_len));
    if (!c->row || !c->row_len) { ci_free(c); return -1; }
    return 0;
}

int pfci_count(const int32_t *lengths, int32_t m, void *out_count) {
    if (!lengths || !out_count || m < 1 || lengths[0] < 1) return -1;
    for (int32_t i = 0; i < m; ++i) if (lengths[i] < 1) return -1;
    ci_cache c;
    if (ci_init(&c, lengths, m)) return -1;
    int rc = ci_get(&c, 0, lengths[0], B(out_count)->z);
    ci_free(&c);
    return rc;
}

int pfci_unrank(const int32_t *lengths, int32_t m, const void *rank_ptr,
                int32_t *out, int32_t capacity) {
    if (!lengths || !rank_ptr || !out || m < 1) return -1;
    int32_t total = 0;
    for (int32_t i = 0; i < m; ++i) { if (lengths[i] < 1) return -1; total += lengths[i]; }
    if (capacity < total) return -2;

    ci_cache c;
    if (ci_init(&c, lengths, m)) return -3;
    int32_t *rem = (int32_t *)malloc((size_t)m * sizeof(*rem));
    int32_t *prefix = (int32_t *)malloc((size_t)m * sizeof(*prefix));
    mpz_t *suffix_p = (mpz_t *)malloc((size_t)(m + 1) * sizeof(mpz_t));
    mpz_t *suffix_pm1 = (mpz_t *)malloc((size_t)(m + 1) * sizeof(mpz_t));
    if (!rem || !prefix || !suffix_p || !suffix_pm1) {
        free(rem); free(prefix); free(suffix_p); free(suffix_pm1); ci_free(&c); return -3;
    }
    memcpy(rem, lengths, (size_t)m * sizeof(*rem));
    for (int32_t i = 0; i <= m; ++i) { mpz_init(suffix_p[i]); mpz_init(suffix_pm1[i]); }

    mpz_t rank, expected, base_count, future, numerator, denominator, next_base, block, tmp;
    mpz_inits(rank, expected, base_count, future, numerator, denominator, next_base, block, tmp, NULL);
    mpz_set(rank, CB(rank_ptr)->z);
    if (mpz_sgn(rank) <= 0) { ci_free(&c); goto invalid; }

    out[0] = 0;
    rem[0] -= 1;
    int32_t low = 0, high = 0, active_total = rem[0];
    mpz_set_ui(base_count, 1);
    if (ci_get(&c, 0, active_total + 1, expected) || mpz_cmp(rank, expected) > 0) {
        ci_free(&c); goto invalid;
    }

    for (int32_t pos = 1; pos < total; ++pos) {
        int32_t running = 0;
        int32_t span = high - low + 1;
        for (int32_t i = low; i <= high; ++i) { running += rem[i]; prefix[i - low] = running; }
        mpz_set_ui(suffix_p[span], 1);
        mpz_set_ui(suffix_pm1[span], 1);
        for (int32_t off = span - 1; off >= 0; --off) {
            mpz_mul_ui(suffix_p[off], suffix_p[off + 1], (unsigned long)prefix[off]);
            mpz_mul_ui(suffix_pm1[off], suffix_pm1[off + 1], (unsigned long)(prefix[off] - 1));
        }
        if (high < m - 1) {
            if (ci_get(&c, high, active_total, future)) { ci_free(&c); goto invalid; }
        } else mpz_set_ui(future, 1);

        int selected = 0;
        for (int32_t k = low; k <= high; ++k) {
            int32_t remaining = rem[k];
            if (remaining == 1 && k != low) continue;
            int32_t off = k - low;
            if (remaining > 1) {
                mpz_mul_ui(numerator, suffix_p[off], (unsigned long)(remaining - 1));
                mpz_mul_ui(denominator, suffix_pm1[off], (unsigned long)active_total);
            } else {
                mpz_set(numerator, suffix_p[off + 1]);
                mpz_mul_ui(denominator, suffix_pm1[off + 1], (unsigned long)active_total);
            }
            mpz_mul(tmp, base_count, numerator);
            mpz_divexact(next_base, tmp, denominator);
            mpz_mul(block, next_base, future);
            if (mpz_cmp(rank, block) > 0) { mpz_sub(rank, rank, block); continue; }
            out[pos] = k;
            rem[k] -= 1;
            active_total -= 1;
            mpz_set(base_count, next_base);
            if (rem[k] == 0) low += 1;
            selected = 1;
            break;
        }
        if (selected) continue;

        if (high + 1 >= m) { ci_free(&c); goto invalid; }
        int32_t k = high + 1;
        int32_t new_remaining = lengths[k] - 1;
        /* C(active_total + new_remaining - 1, new_remaining - 1) */
        mpz_bin_uiui(tmp, (unsigned long)(active_total + new_remaining - 1),
                     (unsigned long)(new_remaining - 1));
        mpz_mul(next_base, base_count, tmp);
        int32_t next_active = active_total + new_remaining;
        if (k < m - 1) {
            if (ci_get(&c, k, next_active + 1, future)) { ci_free(&c); goto invalid; }
        } else mpz_set_ui(future, 1);
        mpz_mul(block, next_base, future);
        if (mpz_cmp(rank, block) > 0) { ci_free(&c); goto invalid; }
        out[pos] = k;
        high = k;
        rem[k] -= 1;
        if (low > k - 1) low = k;
        active_total = next_active;
        mpz_set(base_count, next_base);
    }

    ci_free(&c);
    mpz_clears(rank, expected, base_count, future, numerator, denominator, next_base, block, tmp, NULL);
    for (int32_t i = 0; i <= m; ++i) { mpz_clear(suffix_p[i]); mpz_clear(suffix_pm1[i]); }
    free(rem); free(prefix); free(suffix_p); free(suffix_pm1);
    return 0;

invalid:
    mpz_clears(rank, expected, base_count, future, numerator, denominator, next_base, block, tmp, NULL);
    for (int32_t i = 0; i <= m; ++i) { mpz_clear(suffix_p[i]); mpz_clear(suffix_pm1[i]); }
    free(rem); free(prefix); free(suffix_p); free(suffix_pm1);
    return -4;
}

/* ----- generic lexicographic combinatorial helpers ----- */

static void pfcu_permutations_mpz(mpz_t out, int32_t n, int32_t k) {
    if (n < 0 || k < 0 || k > n) { mpz_set_ui(out, 0); return; }
    mpz_set_ui(out, 1);
    for (int32_t i = 0; i < k; ++i) mpz_mul_ui(out, out, (unsigned long)(n - i));
}

int pfcu_unrank_permutation(int32_t n, int32_t k, const void *rank_ptr,
                            int32_t *out, int32_t capacity) {
    if (!rank_ptr || !out || n < 0 || k < 0 || k > n || capacity < k) return -1;
    int32_t *available = (int32_t *)malloc((size_t)n * sizeof(*available));
    if (!available) return -2;
    for (int32_t i = 0; i < n; ++i) available[i] = i;
    int32_t avail = n;
    mpz_t rank, block, q, r, total;
    mpz_inits(rank, block, q, r, total, NULL);
    mpz_set(rank, CB(rank_ptr)->z);
    pfcu_permutations_mpz(total, n, k);
    if (mpz_sgn(rank) <= 0 || mpz_cmp(rank, total) > 0) {
        free(available); mpz_clears(rank, block, q, r, total, NULL); return -3;
    }
    mpz_sub_ui(rank, rank, 1);
    for (int32_t pos = 0; pos < k; ++pos) {
        pfcu_permutations_mpz(block, avail - 1, k - pos - 1);
        int32_t pick = 0;
        if (mpz_sgn(block) != 0) {
            mpz_fdiv_qr(q, r, rank, block);
            if (!mpz_fits_slong_p(q)) {
                free(available); mpz_clears(rank, block, q, r, total, NULL); return -4;
            }
            long qv = mpz_get_si(q);
            if (qv < 0 || qv >= avail) {
                free(available); mpz_clears(rank, block, q, r, total, NULL); return -4;
            }
            pick = (int32_t)qv;
            mpz_set(rank, r);
        }
        out[pos] = available[pick];
        memmove(&available[pick], &available[pick + 1],
                (size_t)(avail - pick - 1) * sizeof(*available));
        --avail;
    }
    free(available);
    mpz_clears(rank, block, q, r, total, NULL);
    return 0;
}

static void pfcu_composition_suffix_count(mpz_t out, int32_t remaining,
                                          int32_t parts, int32_t mandatory_offset) {
    if (parts == 0) {
        mpz_set_ui(out, remaining == 0 && (mandatory_offset < 0 || mandatory_offset == 0));
        return;
    }
    if (remaining < parts) { mpz_set_ui(out, 0); return; }
    if (mandatory_offset < 0 || mandatory_offset == 0) {
        mpz_bin_uiui(out, (unsigned long)(remaining - 1), (unsigned long)(parts - 1));
        return;
    }
    if (mandatory_offset <= 0 || mandatory_offset >= remaining || parts < 2) {
        mpz_set_ui(out, 0); return;
    }
    mpz_bin_uiui(out, (unsigned long)(remaining - 2), (unsigned long)(parts - 2));
}

int pfcu_unrank_composition(int32_t total, int32_t parts, int32_t mandatory_cut,
                            const void *rank_ptr, int32_t *out, int32_t capacity) {
    if (!rank_ptr || !out || total < 0 || parts < 1 || total < parts || capacity < parts) return -1;
    if (mandatory_cut >= total || mandatory_cut == 0) return -1;
    mpz_t rank, block, total_count;
    mpz_inits(rank, block, total_count, NULL);
    mpz_set(rank, CB(rank_ptr)->z);
    if (mandatory_cut < 0) mpz_bin_uiui(total_count, (unsigned long)(total - 1), (unsigned long)(parts - 1));
    else {
        if (parts < 2 || total < 2) mpz_set_ui(total_count, 0);
        else mpz_bin_uiui(total_count, (unsigned long)(total - 2), (unsigned long)(parts - 2));
    }
    if (mpz_sgn(rank) <= 0 || mpz_cmp(rank, total_count) > 0) {
        mpz_clears(rank, block, total_count, NULL); return -2;
    }
    int32_t remaining = total, cumulative = 0;
    int hit = mandatory_cut < 0;
    for (int32_t pos = 0; pos < parts; ++pos) {
        int32_t left = parts - pos - 1;
        int32_t max_value = remaining - left;
        int selected = 0;
        for (int32_t value = 1; value <= max_value; ++value) {
            int32_t after = remaining - value;
            int32_t new_cumulative = cumulative + value;
            int new_hit = hit || new_cumulative == mandatory_cut;
            int32_t mandatory_offset = -1;
            if (!new_hit) {
                if (mandatory_cut < new_cumulative) continue;
                mandatory_offset = mandatory_cut - new_cumulative;
            }
            pfcu_composition_suffix_count(block, after, left, new_hit ? -1 : mandatory_offset);
            if (mpz_cmp(rank, block) > 0) { mpz_sub(rank, rank, block); continue; }
            out[pos] = value;
            remaining = after;
            cumulative = new_cumulative;
            hit = new_hit;
            selected = 1;
            break;
        }
        if (!selected) { mpz_clears(rank, block, total_count, NULL); return -3; }
    }
    mpz_clears(rank, block, total_count, NULL);
    return remaining == 0 && hit ? 0 : -4;
}

static void pfcu_bounded_count_mpz(mpz_t answer, int32_t total, int32_t parts,
                                   int32_t minimum, int32_t maximum) {
    mpz_set_ui(answer, 0);
    if (parts < 0 || minimum < 0 || maximum < minimum) return;
    if (parts == 0) { mpz_set_ui(answer, total == 0); return; }
    int64_t shifted = (int64_t)total - (int64_t)minimum * parts;
    int32_t width = maximum - minimum + 1;
    if (shifted < 0 || shifted > (int64_t)(width - 1) * parts) return;
    int32_t maxj = (int32_t)(shifted / width);
    if (maxj > parts) maxj = parts;
    mpz_t a, b, term;
    mpz_inits(a, b, term, NULL);
    for (int32_t j = 0; j <= maxj; ++j) {
        int64_t top = shifted - (int64_t)width * j + parts - 1;
        if (top < parts - 1) continue;
        mpz_bin_uiui(a, (unsigned long)parts, (unsigned long)j);
        mpz_bin_uiui(b, (unsigned long)top, (unsigned long)(parts - 1));
        mpz_mul(term, a, b);
        if ((j & 1) == 0) mpz_add(answer, answer, term);
        else mpz_sub(answer, answer, term);
    }
    mpz_clears(a, b, term, NULL);
}

int pfcu_bounded_count(int32_t total, int32_t parts, int32_t minimum,
                       int32_t maximum, void *out_count) {
    if (!out_count || parts < 0 || minimum < 0 || maximum < minimum) return -1;
    pfcu_bounded_count_mpz(B(out_count)->z, total, parts, minimum, maximum);
    return 0;
}

int pfcu_unrank_bounded(int32_t total, int32_t parts, int32_t minimum,
                        int32_t maximum, const void *rank_ptr,
                        int32_t *out, int32_t capacity) {
    if (!rank_ptr || !out || parts < 1 || capacity < parts || minimum < 0 || maximum < minimum) return -1;
    mpz_t rank, block, total_count;
    mpz_inits(rank, block, total_count, NULL);
    mpz_set(rank, CB(rank_ptr)->z);
    pfcu_bounded_count_mpz(total_count, total, parts, minimum, maximum);
    if (mpz_sgn(rank) <= 0 || mpz_cmp(rank, total_count) > 0) {
        mpz_clears(rank, block, total_count, NULL); return -2;
    }
    int32_t remaining = total;
    for (int32_t pos = 0; pos < parts; ++pos) {
        int32_t left = parts - pos - 1;
        int32_t high = maximum;
        int32_t forced_high = remaining - minimum * left;
        if (forced_high < high) high = forced_high;
        int selected = 0;
        for (int32_t value = minimum; value <= high; ++value) {
            int32_t after = remaining - value;
            if (left == 0) mpz_set_ui(block, after == 0);
            else pfcu_bounded_count_mpz(block, after, left, minimum, maximum);
            if (mpz_cmp(rank, block) > 0) { mpz_sub(rank, rank, block); continue; }
            out[pos] = value;
            remaining = after;
            selected = 1;
            break;
        }
        if (!selected) { mpz_clears(rank, block, total_count, NULL); return -3; }
    }
    mpz_clears(rank, block, total_count, NULL);
    return remaining == 0 ? 0 : -4;
}
