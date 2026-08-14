#include "pastafari_bigint.h"

#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

static unsigned long long as_u64(void *p) {
    char buffer[128];
    assert(pfbi_to_dec(p, buffer, sizeof buffer) == 0);
    unsigned long long value = 0;
    assert(sscanf(buffer, "%llu", &value) == 1);
    return value;
}

static void set_rank(void *p, uint64_t value) {
    pfbi_set_ui(p, value);
}

int main(void) {
    void *count = pfbi_new();
    void *rank = pfbi_new();
    assert(count && rank);

    /* P(4,3) is lexicographically unranked over original indices. */
    static const int32_t expected_perm[6][3] = {
        {0,1,2}, {0,1,3}, {0,2,1}, {0,2,3}, {0,3,1}, {0,3,2}
    };
    for (uint64_t r = 1; r <= 6; ++r) {
        int32_t out[3] = {0};
        set_rank(rank, r);
        assert(pfcu_unrank_permutation(4, 3, rank, out, 3) == 0);
        assert(memcmp(out, expected_perm[r - 1], sizeof out) == 0);
    }

    /* Positive compositions of 6 into 3 parts, first/last ranks. */
    int32_t comp[3] = {0};
    set_rank(rank, 1);
    assert(pfcu_unrank_composition(6, 3, -1, rank, comp, 3) == 0);
    assert(comp[0] == 1 && comp[1] == 1 && comp[2] == 4);
    set_rank(rank, 10);
    assert(pfcu_unrank_composition(6, 3, -1, rank, comp, 3) == 0);
    assert(comp[0] == 4 && comp[1] == 1 && comp[2] == 1);

    /* Bounded compositions: x_i in [2,5], sum 10, three parts. */
    assert(pfcu_bounded_count(10, 3, 2, 5, count) == 0);
    assert(as_u64(count) == 12);
    int32_t bounded[3] = {0};
    set_rank(rank, 1);
    assert(pfcu_unrank_bounded(10, 3, 2, 5, rank, bounded, 3) == 0);
    assert(bounded[0] == 2 && bounded[1] == 3 && bounded[2] == 5);

    /* Real month lengths are >=4; these small >=2 examples exhaustively
       exercise the same constrained-interleaving recurrence. */
    const int32_t lengths[] = {2,2,2};
    assert(pfci_count(lengths, 3, count) == 0);
    assert(as_u64(count) == 5);
    static const int32_t expected_weaves[5][6] = {
        {0,0,1,1,2,2},
        {0,0,1,2,1,2},
        {0,1,0,1,2,2},
        {0,1,0,2,1,2},
        {0,1,2,0,1,2},
    };
    for (uint64_t r = 1; r <= 5; ++r) {
        int32_t out[6] = {0};
        set_rank(rank, r);
        assert(pfci_unrank(lengths, 3, rank, out, 6) == 0);
        assert(memcmp(out, expected_weaves[r - 1], sizeof out) == 0);
    }

    pfbi_free(rank);
    pfbi_free(count);
    puts("pastafari_bigint tests: OK");
    return 0;
}
