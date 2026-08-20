#include "pastafari/calendar.hpp"

#include <algorithm>
#include <array>
#include <chrono>
#include <cstddef>
#include <ctime>
#include <iomanip>
#include <list>
#include <memory>
#include <map>
#include <mutex>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <tuple>
#include <unordered_map>
#include <utility>
#include <vector>

namespace pastafari {
namespace {

constexpr int kMinimumYearDays = 252;
constexpr int kMaximumYearDays = 5'778;
constexpr int kMinimumYearGaps = 6;

const BigInt& great() {
    static const BigInt value = BigInt::power_of_two_minus_one(127);
    return value;
}

const BigInt& foundation_jdn() {
    static const BigInt value(-13'334'246);
    return value;
}

BigInt keep(BigInt value) {
    value -= 1;
    value %= great();
    value += 1;
    return value;
}

BigInt binomial(int n, int k) {
    if (n < 0 || k < 0 || k > n) {
        return BigInt(0);
    }
    return BigInt::binomial(static_cast<unsigned>(n), static_cast<unsigned>(k));
}

BigInt permutation_count(int n, int k) {
    if (k < 0 || k > n) {
        return BigInt(0);
    }
    BigInt result(1);
    for (int value = n - k + 1; value <= n; ++value) {
        result *= value;
    }
    return result;
}

template <typename Value>
class StringLruCache {
public:
    explicit StringLruCache(std::size_t limit) : limit_(limit) {
        if (limit == 0) {
            throw std::invalid_argument("LRU limit must be positive");
        }
    }

    Value* get(const std::string& key) {
        const auto found = index_.find(key);
        if (found == index_.end()) {
            return nullptr;
        }
        items_.splice(items_.begin(), items_, found->second);
        return &found->second->second;
    }

    const Value* get(const std::string& key) const = delete;

    template <typename Candidate>
    Value& put(std::string key, Candidate&& value) {
        const auto found = index_.find(key);
        if (found != index_.end()) {
            items_.erase(found->second);
            index_.erase(found);
        }
        items_.emplace_front(std::move(key), std::forward<Candidate>(value));
        index_[items_.front().first] = items_.begin();
        if (items_.size() > limit_) {
            index_.erase(items_.back().first);
            items_.pop_back();
        }
        return items_.front().second;
    }

    void clear() {
        index_.clear();
        items_.clear();
    }

private:
    using Item = std::pair<std::string, Value>;
    using Iterator = typename std::list<Item>::iterator;

    std::size_t limit_;
    std::list<Item> items_;
    std::unordered_map<std::string, Iterator> index_;
};

const std::array<std::string, 17>& cutlet_names() {
    static const std::array<std::string, 17> names = {
        "ארד", "שועל", "כליה", "לגש", "מחשבה", "ארבעה חלקים מתשעה",
        "פַּלְגּוּרַשׁ", "גומא", "אשכול", "עקרב", "אפר", "חיטה", "נהר",
        "צחוק", "אכד", "קרן", "הכד הריק",
    };
    return names;
}

const std::array<std::string, 47>& month_names() {
    static const std::array<std::string, 47> names = {
        "טין", "רימון", "מרפק", "קנאה", "ארידו", "משחת־שיניים",
        "שלושה חלקים מחמישה", "כַּרְשׁוּמַב", "נמר", "בדיל", "ערפל", "לבונה",
        "כישור", "צלע", "חרוב", "אורוק", "בושה", "גמל", "נחושת", "באר",
        "חלמון", "כוכב", "דבש", "טחול", "אבן־גיר", "שמחה", "תאנה", "נינוה",
        "צפרדע", "זפת", "נר", "הדלת הסגורה", "שומשום", "עורף", "כסף", "שושן",
        "סערה", "חמור", "קמח", "חרטה", "בבל", "לשון", "פשתן", "מלח", "אגס",
        "קשת", "חול",
    };
    return names;
}

using Stones = std::array<BigInt, 5>;

const std::array<Stones, 46>& stone_table() {
    static const std::array<Stones, 46> table = [] {
        std::array<Stones, 46> rows{};
        rows[0] = {BigInt(17), BigInt(29), BigInt(43), BigInt(71), BigInt(101)};
        for (int index = 1; index < 46; ++index) {
            const Stones& old = rows[index - 1];
            const int drop_number = index + 1;
            rows[index] = {
                keep(square(old[0]) + 3 * old[1] + drop_number),
                keep(square(old[1]) + 5 * old[2] + old[0]),
                keep(square(old[2]) + 7 * old[3] + old[1]),
                keep(square(old[3]) + 11 * old[4] + old[2]),
                keep(square(old[4]) + 13 * old[0] + old[3]),
            };
        }
        return rows;
    }();
    return table;
}

BigInt day_number(const BigInt& jdn) {
    const BigInt delta = jdn - foundation_jdn();
    if (delta == 0) {
        return BigInt(1);
    }
    return delta > 0 ? 2 * delta + 1 : -2 * delta;
}

using BowlOrder = std::array<int, 6>;

BowlOrder bowl_permutation(int rank_one_based) {
    if (rank_one_based < 1 || rank_one_based > 720) {
        throw std::invalid_argument("bowl rank must be in 1..720");
    }
    int rank = rank_one_based - 1;
    std::vector<int> available = {0, 1, 2, 3, 4, 5};
    BowlOrder result{};
    constexpr std::array<int, 7> factorial = {1, 1, 2, 6, 24, 120, 720};
    for (int position = 0; position < 6; ++position) {
        const int block = factorial[5 - position];
        const int index = rank / block;
        rank %= block;
        result[position] = available[static_cast<std::size_t>(index)];
        available.erase(available.begin() + index);
    }
    return result;
}

struct SauceResult {
    std::array<BigInt, 6> bowls;
    BowlOrder last_drop_order;
};

SauceResult sauce(const BigInt& calculation_jdn, const BigInt& target_jdn) {
    static constexpr std::array<std::array<int, 4>, 7> hidden_coefficients = {{
        {{3, 4, 6, 8}}, {{5, 7, 10, 12}}, {{7, 10, 14, 16}},
        {{9, 13, 18, 20}}, {{11, 16, 22, 24}}, {{13, 19, 26, 28}},
        {{15, 22, 30, 32}},
    }};
    static constexpr std::array<int, 7> hidden_stones = {0, 1, 2, 3, 4, 0, 1};
    static constexpr std::array<std::array<int, 5>, 11> grind_rows = {{
        {{3, 5, 7, 11, 0}}, {{5, 7, 11, 13, 1}}, {{7, 11, 13, 17, 2}},
        {{11, 13, 17, 19, 3}}, {{13, 17, 19, 23, 4}},
        {{17, 19, 23, 29, 0}}, {{19, 23, 29, 31, 1}},
        {{23, 29, 31, 37, 2}}, {{29, 31, 37, 41, 3}},
        {{31, 37, 41, 43, 4}}, {{37, 41, 43, 47, 0}},
    }};
    static constexpr std::array<int, 6> bowl_primes = {17, 19, 23, 29, 31, 37};
    static constexpr std::array<int, 3> direct_stones = {0, 1, 2};
    static constexpr std::array<int, 3> direct_multipliers = {3, 5, 7};
    static constexpr std::array<int, 6> drop_mix_stones = {0, 1, 2, 3, 4, 0};

    const BigInt calculation = day_number(calculation_jdn);
    const BigInt target = day_number(target_jdn);
    const BigInt distance = abs(target_jdn - calculation_jdn) + 1;
    const BigInt addition = calculation + target;
    const int direction = target_jdn < calculation_jdn ? 1
        : target_jdn == calculation_jdn ? 2 : 3;

    std::array<BigInt, 7> hidden{};
    for (int index = 0; index < 7; ++index) {
        const auto& coefficients = hidden_coefficients[index];
        const Stones& stones = stone_table()[index];
        BigInt value = calculation
            + coefficients[0] * target
            + coefficients[1] * distance
            + coefficients[2] * addition
            + coefficients[3] * direction;
        for (const BigInt& stone : stones) {
            value += stone;
        }
        value = keep(std::move(value));
        for (int round = 0; round < 7; ++round) {
            value = keep(square(value) + 3 * value + stones[hidden_stones[round]] + round + 1);
        }
        hidden[index] = std::move(value);
    }

    std::array<BigInt, 46> drops{};
    const auto prior = [&](int drop_number, int back) -> const BigInt& {
        const int wanted = drop_number - back;
        return wanted >= 1 ? drops[wanted - 1] : hidden[back - drop_number];
    };

    std::array<BigInt, 6> bowls{};
    for (int index = 0; index < 6; ++index) {
        const int bowl_number = index + 1;
        BigInt value = calculation
            + bowl_number * target
            + distance
            + addition
            + direction
            + bowl_primes[index] * bowl_primes[index];
        bowls[index] = keep(square(value) + bowl_number);
    }

    BowlOrder last_drop_order{};
    for (int drop_index = 0; drop_index < 46; ++drop_index) {
        const int drop_number = drop_index + 1;
        const Stones& stones = stone_table()[drop_index];
        const BigInt& previous = prior(drop_number, 1);
        const BigInt& third = prior(drop_number, 3);
        const BigInt& seventh = prior(drop_number, 7);
        BigInt value = keep(
            stones[0] * calculation
            + stones[1] * target
            + stones[2] * distance
            + stones[3] * addition
            + stones[4] * direction
            + previous
            + 3 * third
            + 5 * seventh
            + drop_number
        );
        for (const auto& row : grind_rows) {
            value = keep(
                square(value)
                + row[0] * value
                + row[1] * previous
                + row[2] * third
                + row[3] * seventh
                + stones[row[4]]
            );
        }
        drops[drop_index] = value;

        const BigInt zero_based_order = value - 1;
        const int order_rank = 1 + (zero_based_order % BigInt(720)).to_int();
        const BowlOrder order = bowl_permutation(order_rank);
        if (drop_number == 46) {
            last_drop_order = order;
        }

        std::array<BigInt, 6> direct{};
        for (int place = 0; place < 3; ++place) {
            const int bowl_id = order[place];
            direct[bowl_id] = keep(
                square(value)
                + stones[direct_stones[place]] * bowls[bowl_id]
                + direct_multipliers[place] * drop_number
            );
        }

        const std::array<BigInt, 6> old = bowls;
        std::array<BigInt, 6> next{};
        for (int place = 0; place < 6; ++place) {
            const int bowl_id = order[place];
            const int previous_id = order[(place + 5) % 6];
            const int next_id = order[(place + 1) % 6];
            const BigInt mixed = old[bowl_id]
                + 2 * old[previous_id]
                + 3 * old[next_id]
                + direct[bowl_id]
                + value
                + stones[drop_mix_stones[place]];
            next[bowl_id] = keep(
                square(mixed)
                + 5 * old[previous_id] * old[next_id]
                + drop_number * (place + 1)
            );
        }
        bowls = std::move(next);
    }

    for (int round = 1; round <= 12; ++round) {
        BigInt bowl_sum(0);
        for (const BigInt& value : bowls) {
            bowl_sum += value;
        }
        const BigInt order_number = keep(bowl_sum + 149 * round);
        const BigInt zero_based_order = order_number - 1;
        const int order_rank = 1 + (zero_based_order % BigInt(720)).to_int();
        const BowlOrder order = bowl_permutation(order_rank);
        const std::array<BigInt, 6> old = bowls;
        std::array<BigInt, 6> next{};
        for (int place = 0; place < 6; ++place) {
            const int bowl_id = order[place];
            const int previous_id = order[(place + 5) % 6];
            const int next_id = order[(place + 1) % 6];
            const BigInt mixed = old[bowl_id]
                + 3 * old[previous_id]
                + 5 * old[next_id]
                + bowl_sum
                + round
                + (place + 1) * (place + 1);
            next[bowl_id] = keep(
                square(mixed) + 7 * old[previous_id] * old[next_id]
            );
        }
        bowls = std::move(next);
    }

    return SauceResult{std::move(bowls), last_drop_order};
}

struct ResponseDescriptor {
    BigInt first;
    int step;
};

ResponseDescriptor response_descriptor(
    const SauceResult& result,
    int bowl_id,
    int seal
) {
    const auto found = std::find(
        result.last_drop_order.begin(), result.last_drop_order.end(), bowl_id
    );
    if (found == result.last_drop_order.end()) {
        throw std::logic_error("bowl is absent from the last drop order");
    }
    const int place = static_cast<int>(found - result.last_drop_order.begin());
    const int next_bowl_id = result.last_drop_order[(place + 1) % 6];
    const BigInt first_base = result.bowls[bowl_id] + seal + 181;
    const BigInt first = keep(
        square(first_base) + 179 * result.bowls[next_bowl_id] + seal
    );
    const BigInt direction_base = first + seal + 1 + 193;
    const BigInt direction_number = keep(
        square(direction_base) + 193 * first + 197 * result.bowls[5]
    );
    return ResponseDescriptor{first, direction_number.odd() ? 1 : -1};
}

BigInt response_at(const ResponseDescriptor& descriptor, int offset) {
    BigInt value = descriptor.first - 1 + descriptor.step * offset;
    value %= great();
    return value + 1;
}

BigInt choose_uniform(
    const SauceResult& result,
    int bowl_id,
    int seal,
    const BigInt& count
) {
    if (count < 1) {
        throw std::invalid_argument("choice count must be positive");
    }
    const ResponseDescriptor descriptor = response_descriptor(result, bowl_id, seal);
    if (count <= great()) {
        const BigInt limit = great() - great() % count;
        BigInt accepted = descriptor.first;
        if (accepted > limit) {
            accepted = descriptor.step > 0 ? BigInt(1) : limit;
        }
        return (accepted - 1) % count + 1;
    }

    int width = 1;
    BigInt space = great();
    while (space < count) {
        space *= great();
        ++width;
    }
    BigInt value(1);
    BigInt weight(1);
    for (int offset = 0; offset < width; ++offset) {
        value += (response_at(descriptor, offset) - 1) * weight;
        weight *= great();
    }
    const BigInt limit = space - space % count;
    BigInt accepted = value;
    if (accepted > limit) {
        accepted = descriptor.step > 0 ? BigInt(1) : limit;
    }
    return (accepted - 1) % count + 1;
}

BigInt choose_uniform(
    const SauceResult& result,
    int bowl_id,
    int seal,
    int count
) {
    return choose_uniform(result, bowl_id, seal, BigInt(count));
}

constexpr std::array<std::pair<int, std::int64_t>, 75> kGateCheckpoints = {{
    {-32768, -29780582}, {-31744, -29275011}, {-30720, -28759536},
    {-29696, -28231334}, {-28672, -27724269}, {-27648, -27204151},
    {-26624, -26696050}, {-25600, -26184520}, {-24576, -25649224},
    {-23552, -25126420}, {-22528, -24592746}, {-21504, -24077763},
    {-20480, -23568941}, {-19456, -23056607}, {-18432, -22547059},
    {-17408, -22028964}, {-16384, -21524216}, {-15360, -21021341},
    {-14336, -20503094}, {-13312, -19986054}, {-12288, -19477387},
    {-11264, -18959976}, {-10240, -18453214}, {-9216, -17930941},
    {-8192, -17421559}, {-7168, -16901500}, {-6144, -16391773},
    {-5120, -15892677}, {-4096, -15374389}, {-3072, -14869256},
    {-2048, -14360710}, {-1856, -14269240}, {-1024, -13845543},
    {0, -13334246},
    {1024, -12809003}, {2048, -12289556}, {3072, -11790578},
    {4096, -11286642}, {5120, -10764244}, {6144, -10233818},
    {7168, -9727528}, {8192, -9214186}, {9216, -8692730},
    {10240, -8173976}, {11264, -7657486}, {12288, -7145425},
    {13312, -6630698}, {14336, -6127086}, {15360, -5610968},
    {16384, -5103400}, {17408, -4587432}, {18432, -4069417},
    {19456, -3557452}, {20480, -3038147}, {21504, -2527530},
    {22528, -2008636}, {23552, -1489691}, {24576, -975725},
    {25600, -476208}, {26624, 32147}, {27648, 532296},
    {28672, 1047264}, {29696, 1552344}, {29952, 1682615},
    {30208, 1812845}, {30464, 1938704}, {30720, 2076748},
    {30976, 2207399}, {31232, 2341220}, {31456, 2450464},
    {31472, 2458435}, {31488, 2467368}, {31504, 2474392},
    {31744, 2600784}, {32768, 3111357},
}};

class GatePositionCache {
public:
    explicit GatePositionCache(std::size_t limit) : limit_(limit) {}

    BigInt* get(const BigInt& index) {
        const auto found = entries_.find(index);
        if (found == entries_.end()) {
            return nullptr;
        }
        order_.splice(order_.begin(), order_, found->second.order);
        return &found->second.position;
    }

    void put(const BigInt& index, const BigInt& position) {
        const auto found = entries_.find(index);
        if (found != entries_.end()) {
            found->second.position = position;
            order_.splice(order_.begin(), order_, found->second.order);
            return;
        }
        order_.push_front(index);
        entries_.emplace(index, Entry{position, order_.begin()});
        if (entries_.size() > limit_) {
            const BigInt evicted = order_.back();
            order_.pop_back();
            entries_.erase(evicted);
        }
    }

    std::pair<BigInt, BigInt> nearest(const BigInt& index) {
        if (entries_.empty()) {
            throw std::logic_error("gate-position cache is empty");
        }
        auto right = entries_.lower_bound(index);
        BigInt selected;
        if (right == entries_.begin()) {
            selected = right->first;
        } else if (right == entries_.end()) {
            selected = std::prev(right)->first;
        } else if (right->first == index) {
            selected = right->first;
        } else {
            const auto left = std::prev(right);
            selected = index - left->first <= right->first - index
                ? left->first : right->first;
        }
        BigInt* value = get(selected);
        if (value == nullptr) {
            throw std::logic_error("gate-position cache lost its selected key");
        }
        return {selected, *value};
    }

    void clear() {
        entries_.clear();
        order_.clear();
    }

private:
    struct Entry {
        BigInt position;
        std::list<BigInt>::iterator order;
    };

    std::size_t limit_;
    std::list<BigInt> order_;
    std::map<BigInt, Entry> entries_;
};

class GateEngine {
public:
    GateEngine() : distances_(4096), positions_(4096) {
        seed_positions();
    }

    int distance(const BigInt& index) {
        if (index == 0) {
            throw std::invalid_argument("gate-distance index may not be zero");
        }
        const std::string key = index.str();
        if (int* cached = distances_.get(key)) {
            return *cached;
        }
        const SauceResult result = sauce(foundation_jdn(), foundation_jdn() + index);
        const int value = choose_uniform(result, 0, 1, 922).to_int() + 41;
        distances_.put(key, value);
        return value;
    }

    BigInt position(const BigInt& index) {
        if (BigInt* cached = positions_.get(index)) {
            return *cached;
        }
        auto [current_index, current_position] = positions_.nearest(index);
        if (current_index < index) {
            while (current_index < index) {
                const BigInt distance_index = current_index < 0
                    ? current_index : current_index + 1;
                current_position += distance(distance_index);
                ++current_index;
                positions_.put(current_index, current_position);
            }
        } else {
            while (current_index > index) {
                const BigInt distance_index = current_index > 0
                    ? current_index : current_index - 1;
                current_position -= distance(distance_index);
                --current_index;
                positions_.put(current_index, current_position);
            }
        }
        return current_position;
    }

    BigInt containing_interval(const BigInt& jdn) {
        std::size_t low = 0;
        std::size_t high = kGateCheckpoints.size();
        while (low < high) {
            const std::size_t middle = (low + high) / 2;
            if (BigInt(kGateCheckpoints[middle].second) < jdn) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        BigInt index = low == 0
            ? BigInt(kGateCheckpoints.front().first)
            : low == kGateCheckpoints.size()
                ? BigInt(kGateCheckpoints.back().first)
                : BigInt(kGateCheckpoints[low - 1].first);
        BigInt gate = position(index);
        if (gate >= jdn) {
            while (gate >= jdn) {
                --index;
                gate = position(index);
            }
            return index;
        }
        while (position(index + 1) < jdn) {
            ++index;
        }
        return index;
    }

    void clear() {
        distances_.clear();
        positions_.clear();
        seed_positions();
    }

private:
    void seed_positions() {
        for (const auto& [index, position] : kGateCheckpoints) {
            positions_.put(BigInt(index), BigInt(position));
        }
    }

    StringLruCache<int> distances_;
    GatePositionCache positions_;
};

struct Year {
    BigInt number;
    BigInt open_index;
    BigInt close_index;
    BigInt start_jdn;
    BigInt end_jdn;
    int length;
    int gaps;
};

Year make_year(
    GateEngine& gates,
    const BigInt& number,
    const BigInt& open_index,
    const BigInt& close_index
) {
    const BigInt opening = gates.position(open_index);
    const BigInt closing = gates.position(close_index);
    return Year{
        number,
        open_index,
        close_index,
        opening + 1,
        closing,
        (closing - opening).to_int(),
        (close_index - open_index).to_int(),
    };
}

struct Year5000Candidate {
    BigInt open_index;
    BigInt close_index;
    int length;
};

std::vector<Year5000Candidate> enumerate_year_5000_candidates(
    GateEngine& gates,
    const BigInt& calculation_jdn
) {
    const BigInt interval = gates.containing_interval(calculation_jdn);
    std::vector<std::pair<BigInt, BigInt>> openings;
    for (BigInt index = interval;; --index) {
        const BigInt position = gates.position(index);
        if (calculation_jdn - position > kMaximumYearDays) {
            break;
        }
        openings.emplace_back(index, position);
    }

    std::vector<std::pair<BigInt, BigInt>> closings;
    for (BigInt index = interval + 1;; ++index) {
        const BigInt position = gates.position(index);
        if (position - calculation_jdn > kMaximumYearDays) {
            break;
        }
        closings.emplace_back(index, position);
    }

    std::vector<Year5000Candidate> candidates;
    for (const auto& [open_index, opening] : openings) {
        for (const auto& [close_index, closing] : closings) {
            const int gaps = (close_index - open_index).to_int();
            const int length = (closing - opening).to_int();
            if (gaps >= kMinimumYearGaps
                && length >= kMinimumYearDays
                && length <= kMaximumYearDays) {
                candidates.push_back({open_index, close_index, length});
            }
        }
    }
    std::sort(candidates.begin(), candidates.end(), [](const auto& lhs, const auto& rhs) {
        return lhs.length != rhs.length
            ? lhs.length < rhs.length
            : lhs.open_index < rhs.open_index;
    });
    return candidates;
}

struct AdjacentYearCandidate {
    BigInt index;
    int length;
};

std::vector<AdjacentYearCandidate> enumerate_next_years(
    GateEngine& gates,
    const BigInt& open_index
) {
    const BigInt opening = gates.position(open_index);
    std::vector<AdjacentYearCandidate> candidates;
    for (BigInt close_index = open_index + kMinimumYearGaps;; ++close_index) {
        const BigInt difference = gates.position(close_index) - opening;
        if (difference > kMaximumYearDays) {
            break;
        }
        const int length = difference.to_int();
        if (length >= kMinimumYearDays) {
            candidates.push_back({close_index, length});
        }
    }
    std::sort(candidates.begin(), candidates.end(), [](const auto& lhs, const auto& rhs) {
        return lhs.length != rhs.length ? lhs.length < rhs.length : lhs.index < rhs.index;
    });
    return candidates;
}

std::vector<AdjacentYearCandidate> enumerate_previous_years(
    GateEngine& gates,
    const BigInt& close_index
) {
    const BigInt closing = gates.position(close_index);
    std::vector<AdjacentYearCandidate> candidates;
    for (BigInt open_index = close_index - kMinimumYearGaps;; --open_index) {
        const BigInt difference = closing - gates.position(open_index);
        if (difference > kMaximumYearDays) {
            break;
        }
        const int length = difference.to_int();
        if (length >= kMinimumYearDays) {
            candidates.push_back({open_index, length});
        }
    }
    std::sort(candidates.begin(), candidates.end(), [](const auto& lhs, const auto& rhs) {
        return lhs.length != rhs.length ? lhs.length < rhs.length : lhs.index < rhs.index;
    });
    return candidates;
}

template <std::size_t NameCount>
std::vector<std::string> unrank_names(
    const std::array<std::string, NameCount>& names,
    int count,
    BigInt rank_one_based
) {
    std::vector<std::string> available(names.begin(), names.end());
    std::vector<std::string> result;
    result.reserve(static_cast<std::size_t>(count));
    BigInt rank = rank_one_based - 1;
    for (int position = 0; position < count; ++position) {
        const BigInt block = permutation_count(
            static_cast<int>(available.size()) - 1,
            count - position - 1
        );
        std::size_t index = 0;
        if (block != 0) {
            index = (rank / block).to_size();
            rank %= block;
        } else {
            rank = BigInt(0);
        }
        result.push_back(available.at(index));
        available.erase(available.begin() + static_cast<std::ptrdiff_t>(index));
    }
    return result;
}

BigInt composition_suffix_count(
    int remaining,
    int parts,
    const std::optional<int>& mandatory_offset
) {
    if (parts == 0) {
        return BigInt(remaining == 0
            && (!mandatory_offset.has_value() || *mandatory_offset == 0) ? 1 : 0);
    }
    if (remaining < parts) {
        return BigInt(0);
    }
    if (!mandatory_offset.has_value() || *mandatory_offset == 0) {
        return binomial(remaining - 1, parts - 1);
    }
    if (*mandatory_offset <= 0 || *mandatory_offset >= remaining || parts < 2) {
        return BigInt(0);
    }
    return binomial(remaining - 2, parts - 2);
}

std::vector<int> unrank_composition(
    int total,
    int parts,
    const std::optional<int>& mandatory_cut,
    BigInt rank
) {
    std::vector<int> result;
    result.reserve(static_cast<std::size_t>(parts));
    int remaining = total;
    int cumulative = 0;
    bool hit = !mandatory_cut.has_value();
    for (int position = 0; position < parts; ++position) {
        const int left = parts - position - 1;
        bool selected = false;
        const int maximum = remaining - left;
        for (int value = 1; value <= maximum; ++value) {
            const int after = remaining - value;
            const int next_cumulative = cumulative + value;
            const bool next_hit = hit
                || (mandatory_cut.has_value() && next_cumulative == *mandatory_cut);
            std::optional<int> mandatory_offset;
            if (!next_hit) {
                if (!mandatory_cut.has_value() || *mandatory_cut < next_cumulative) {
                    continue;
                }
                mandatory_offset = *mandatory_cut - next_cumulative;
            }
            const BigInt block = composition_suffix_count(
                after,
                left,
                next_hit ? std::optional<int>{} : mandatory_offset
            );
            if (rank > block) {
                rank -= block;
                continue;
            }
            result.push_back(value);
            remaining = after;
            cumulative = next_cumulative;
            hit = next_hit;
            selected = true;
            break;
        }
        if (!selected) {
            throw std::logic_error("composition unranking exhausted its branches");
        }
    }
    return result;
}

BigInt bounded_month_length_count(int total, int parts) {
    const int shifted = total - 4 * parts;
    if (shifted < 0 || shifted > 119 * parts) {
        return BigInt(0);
    }
    BigInt answer(0);
    const int maximum_excluded = std::min(parts, shifted / 120);
    for (int excluded = 0; excluded <= maximum_excluded; ++excluded) {
        const BigInt ways = binomial(parts, excluded)
            * binomial(shifted - 120 * excluded + parts - 1, parts - 1);
        if ((excluded & 1) == 0) {
            answer += ways;
        } else {
            answer -= ways;
        }
    }
    return answer;
}

std::vector<int> unrank_month_lengths(
    int total,
    int parts,
    BigInt rank
) {
    std::vector<int> result;
    result.reserve(static_cast<std::size_t>(parts));
    int remaining = total;
    std::unordered_map<std::string, BigInt> memo;
    const auto count = [&](int sum, int count_parts) -> BigInt {
        const std::string key = std::to_string(sum) + ":" + std::to_string(count_parts);
        const auto found = memo.find(key);
        if (found != memo.end()) {
            return found->second;
        }
        const BigInt value = bounded_month_length_count(sum, count_parts);
        memo.emplace(key, value);
        return value;
    };

    for (int position = 0; position < parts; ++position) {
        const int left = parts - position - 1;
        const int maximum = std::min(123, remaining - 4 * left);
        bool selected = false;
        for (int value = 4; value <= maximum; ++value) {
            const int after = remaining - value;
            const BigInt block = left == 0
                ? BigInt(after == 0 ? 1 : 0)
                : count(after, left);
            if (rank > block) {
                rank -= block;
                continue;
            }
            result.push_back(value);
            remaining = after;
            selected = true;
            break;
        }
        if (!selected) {
            throw std::logic_error("month-length unranking exhausted its branches");
        }
    }
    return result;
}

class InterleavingCounter {
public:
    explicit InterleavingCounter(std::vector<int> lengths)
        : lengths_(std::move(lengths)) {}

    BigInt get(int last_seen, int q) {
        const int last = static_cast<int>(lengths_.size()) - 1;
        if (last_seen >= last) {
            return BigInt(1);
        }
        const auto found = cache_.find(last_seen);
        if (found != cache_.end() && static_cast<int>(found->second.size()) > q) {
            return found->second[static_cast<std::size_t>(q)];
        }
        rebuild(last_seen, q);
        return cache_.at(last_seen).at(static_cast<std::size_t>(q));
    }

private:
    void rebuild(int start, int q_start) {
        const int month_count = static_cast<int>(lengths_.size());
        std::vector<int> needed(static_cast<std::size_t>(month_count), 0);
        needed[start] = q_start;
        for (int index = start; index < month_count - 1; ++index) {
            needed[index + 1] = needed[index] + lengths_[index + 1] - 1;
        }

        std::vector<BigInt> following;
        cache_.clear();
        for (int index = month_count - 1; index >= start; --index) {
            const int q_max = needed[index];
            std::vector<BigInt> current(static_cast<std::size_t>(q_max + 1));
            if (index == month_count - 1) {
                std::fill(current.begin(), current.end(), BigInt(1));
            } else {
                const int month_length = lengths_[index + 1];
                BigInt cumulative(0);
                BigInt weight(1);
                for (int q = 1; q <= q_max; ++q) {
                    const int r = q - 1;
                    cumulative += weight * following.at(
                        static_cast<std::size_t>(month_length + r)
                    );
                    current[static_cast<std::size_t>(q)] = cumulative;
                    weight *= month_length + r - 1;
                    weight = BigInt::exact_divide(weight, BigInt(r + 1));
                }
            }
            following = current;
            if (index <= start + 7) {
                cache_[index] = std::move(current);
            }
        }
    }

    std::vector<int> lengths_;
    std::unordered_map<int, std::vector<BigInt>> cache_;
};

BigInt interleaving_count(const std::vector<int>& lengths) {
    InterleavingCounter counter(lengths);
    return counter.get(0, lengths.front());
}

std::vector<int> unrank_month_interleaving(
    const std::vector<int>& lengths,
    BigInt rank
) {
    const int month_count = static_cast<int>(lengths.size());
    int total_length = 0;
    for (const int length : lengths) {
        total_length += length;
    }
    InterleavingCounter counter(lengths);
    std::vector<int> weave(static_cast<std::size_t>(total_length), 0);
    std::vector<int> remaining = lengths;
    --remaining[0];
    int low = 0;
    int high = 0;
    int active_total = remaining[0];
    BigInt base_count(1);

    const BigInt expected_total = counter.get(0, active_total + 1);
    if (rank < 1 || rank > expected_total) {
        throw std::invalid_argument("interleaving rank is outside its valid range");
    }

    for (int position = 1; position < total_length; ++position) {
        std::vector<int> prefix;
        prefix.reserve(static_cast<std::size_t>(high - low + 1));
        int running = 0;
        for (int month = low; month <= high; ++month) {
            running += remaining[month];
            prefix.push_back(running);
        }

        const int span = static_cast<int>(prefix.size());
        std::vector<BigInt> suffix_p(static_cast<std::size_t>(span + 1), BigInt(1));
        std::vector<BigInt> suffix_pm1(static_cast<std::size_t>(span + 1), BigInt(1));
        for (int offset = span - 1; offset >= 0; --offset) {
            suffix_p[offset] = suffix_p[offset + 1] * prefix[offset];
            suffix_pm1[offset] = suffix_pm1[offset + 1] * (prefix[offset] - 1);
        }

        const BigInt future_same = high < month_count - 1
            ? counter.get(high, active_total)
            : BigInt(1);
        bool selected = false;
        for (int month = low; month <= high; ++month) {
            const int remaining_for_month = remaining[month];
            if (remaining_for_month == 1 && month != low) {
                continue;
            }
            const int offset = month - low;
            BigInt numerator;
            BigInt denominator;
            if (remaining_for_month > 1) {
                numerator = (remaining_for_month - 1) * suffix_p[offset];
                denominator = active_total * suffix_pm1[offset];
            } else {
                numerator = suffix_p[offset + 1];
                denominator = active_total * suffix_pm1[offset + 1];
            }
            const BigInt next_base_count = BigInt::exact_divide(
                base_count * numerator, denominator
            );
            const BigInt block = next_base_count * future_same;
            if (rank > block) {
                rank -= block;
                continue;
            }
            weave[position] = month;
            --remaining[month];
            --active_total;
            base_count = next_base_count;
            if (remaining[month] == 0) {
                ++low;
            }
            selected = true;
            break;
        }
        if (selected) {
            continue;
        }

        if (high + 1 >= month_count) {
            throw std::logic_error("interleaving exhausted all valid branches");
        }
        const int month = high + 1;
        const int new_remaining = lengths[month] - 1;
        const BigInt next_base_count = base_count * binomial(
            active_total + new_remaining - 1,
            new_remaining - 1
        );
        const int next_active_total = active_total + new_remaining;
        const BigInt future = month < month_count - 1
            ? counter.get(month, next_active_total + 1)
            : BigInt(1);
        const BigInt block = next_base_count * future;
        if (rank > block) {
            throw std::logic_error("rank exceeded the final interleaving branch");
        }
        weave[position] = month;
        high = month;
        --remaining[month];
        if (low > month - 1) {
            low = month;
        }
        active_total = next_active_total;
        base_count = next_base_count;
    }
    return weave;
}

struct YearStructure {
    int cutlet_count;
    std::vector<int> cutlet_gaps;
    std::vector<std::string> cutlet_names;
    std::vector<int> cutlet_start_offsets;
    std::vector<int> cutlet_end_offsets;
    int month_count;
    std::vector<int> month_lengths;
    std::vector<std::string> month_names;
    std::vector<int> month_weave;
    std::vector<int> day_in_month;
};

class CalculationState;

std::shared_ptr<YearStructure> build_year_structure(
    CalculationState& state,
    const Year& year
);

class CalculationState {
public:
    CalculationState(GateEngine& gates, BigInt calculation_jdn)
        : gates_(gates),
          calculation_jdn_(std::move(calculation_jdn)),
          sauces_(64),
          structures_(8) {}

    const BigInt& calculation_jdn() const noexcept { return calculation_jdn_; }
    GateEngine& gates() noexcept { return gates_; }

    SauceResult& get_sauce(const BigInt& target_jdn) {
        const std::string key = target_jdn.str();
        if (SauceResult* cached = sauces_.get(key)) {
            return *cached;
        }
        return sauces_.put(key, sauce(calculation_jdn_, target_jdn));
    }

    Year year_5000() {
        if (year_5000_.has_value()) {
            return *year_5000_;
        }
        const std::vector<Year5000Candidate> candidates =
            enumerate_year_5000_candidates(gates_, calculation_jdn_);
        if (candidates.empty()) {
            throw std::logic_error("no valid year-5000 candidate exists");
        }
        const BigInt choice = choose_uniform(
            get_sauce(calculation_jdn_), 0, 10, static_cast<int>(candidates.size())
        );
        const Year5000Candidate& selected = candidates.at(choice.to_size() - 1);
        Year result = make_year(
            gates_, BigInt(5'000), selected.open_index, selected.close_index
        );
        year_5000_ = result;
        years_[result.number.str()] = result;
        return result;
    }

    Year next_year(const Year& year) {
        const BigInt number = year.number + 1;
        const std::string key = number.str();
        const auto cached = years_.find(key);
        if (cached != years_.end()) {
            return cached->second;
        }
        const std::vector<AdjacentYearCandidate> candidates =
            enumerate_next_years(gates_, year.close_index);
        if (candidates.empty()) {
            throw std::logic_error("no valid next-year candidate exists");
        }
        const BigInt choice = choose_uniform(
            get_sauce(gates_.position(year.close_index)),
            0,
            11,
            static_cast<int>(candidates.size())
        );
        const AdjacentYearCandidate& selected = candidates.at(choice.to_size() - 1);
        Year result = make_year(
            gates_, number, year.close_index, selected.index
        );
        years_[key] = result;
        return result;
    }

    Year previous_year(const Year& year) {
        const BigInt number = year.number - 1;
        const std::string key = number.str();
        const auto cached = years_.find(key);
        if (cached != years_.end()) {
            return cached->second;
        }
        const std::vector<AdjacentYearCandidate> candidates =
            enumerate_previous_years(gates_, year.open_index);
        if (candidates.empty()) {
            throw std::logic_error("no valid previous-year candidate exists");
        }
        const BigInt choice = choose_uniform(
            get_sauce(gates_.position(year.open_index)),
            0,
            12,
            static_cast<int>(candidates.size())
        );
        const AdjacentYearCandidate& selected = candidates.at(choice.to_size() - 1);
        Year result = make_year(
            gates_, number, selected.index, year.open_index
        );
        years_[key] = result;
        return result;
    }

    Year find_year(const BigInt& target_jdn) {
        Year year = year_5000();
        if (target_jdn < year.start_jdn) {
            while (target_jdn < year.start_jdn) {
                year = previous_year(year);
            }
        } else {
            while (target_jdn > year.end_jdn) {
                year = next_year(year);
            }
        }
        return year;
    }

    std::shared_ptr<YearStructure> get_structure(const Year& year) {
        const std::string key = year.open_index.str() + ":" + year.close_index.str();
        if (std::shared_ptr<YearStructure>* cached = structures_.get(key)) {
            return *cached;
        }
        return structures_.put(key, build_year_structure(*this, year));
    }

    PastafariDate convert(const BigInt& target_jdn);

private:
    GateEngine& gates_;
    BigInt calculation_jdn_;
    StringLruCache<SauceResult> sauces_;
    StringLruCache<std::shared_ptr<YearStructure>> structures_;
    std::unordered_map<std::string, Year> years_;
    std::optional<Year> year_5000_;
};

std::shared_ptr<YearStructure> build_year_structure(
    CalculationState& state,
    const Year& year
) {
    GateEngine& gates = state.gates();
    const SauceResult& result = state.get_sauce(year.start_jdn);

    std::vector<int> cutlet_counts;
    for (int count = 6; count <= 17 && count <= year.gaps; ++count) {
        cutlet_counts.push_back(count);
    }
    const int cutlet_count = cutlet_counts.at(
        choose_uniform(result, 1, 20, static_cast<int>(cutlet_counts.size())).to_size() - 1
    );

    std::optional<int> mandatory_cut;
    if (state.calculation_jdn() >= year.start_jdn
        && state.calculation_jdn() <= year.end_jdn) {
        for (BigInt index = year.open_index + 1; index < year.close_index; ++index) {
            if (gates.position(index) == state.calculation_jdn()) {
                mandatory_cut = (index - year.open_index).to_int();
                break;
            }
        }
    }

    const BigInt partition_count = mandatory_cut.has_value()
        ? binomial(year.gaps - 2, cutlet_count - 2)
        : binomial(year.gaps - 1, cutlet_count - 1);
    std::vector<int> cutlet_gaps = unrank_composition(
        year.gaps,
        cutlet_count,
        mandatory_cut,
        choose_uniform(result, 1, 21, partition_count)
    );

    const BigInt cutlet_name_ways = permutation_count(
        static_cast<int>(cutlet_names().size()), cutlet_count
    );
    std::vector<std::string> selected_cutlet_names = unrank_names(
        cutlet_names(),
        cutlet_count,
        choose_uniform(result, 4, 22, cutlet_name_ways)
    );

    const int minimum_months = (year.length + 122) / 123;
    const int maximum_months = std::min(47, year.length / 4);
    const int month_count = minimum_months
        + choose_uniform(
            result, 2, 30, maximum_months - minimum_months + 1
        ).to_int()
        - 1;

    const BigInt month_length_ways = bounded_month_length_count(
        year.length, month_count
    );
    std::vector<int> month_lengths = unrank_month_lengths(
        year.length,
        month_count,
        choose_uniform(result, 2, 31, month_length_ways)
    );

    const BigInt weave_ways = interleaving_count(month_lengths);
    std::vector<int> month_weave = unrank_month_interleaving(
        month_lengths,
        choose_uniform(result, 3, 32, weave_ways)
    );

    const BigInt month_name_ways = permutation_count(
        static_cast<int>(month_names().size()), month_count
    );
    std::vector<std::string> selected_month_names = unrank_names(
        month_names(),
        month_count,
        choose_uniform(result, 4, 33, month_name_ways)
    );

    std::vector<int> seen(static_cast<std::size_t>(month_count), 0);
    std::vector<int> day_in_month;
    day_in_month.reserve(static_cast<std::size_t>(year.length));
    for (const int month : month_weave) {
        ++seen[month];
        day_in_month.push_back(seen[month]);
    }

    std::vector<int> cutlet_starts;
    std::vector<int> cutlet_ends;
    cutlet_starts.reserve(static_cast<std::size_t>(cutlet_count));
    cutlet_ends.reserve(static_cast<std::size_t>(cutlet_count));
    int gap_offset = 0;
    int day_offset = 0;
    for (const int gap_count : cutlet_gaps) {
        cutlet_starts.push_back(day_offset);
        gap_offset += gap_count;
        const BigInt end_jdn = gates.position(year.open_index + gap_offset);
        day_offset = (end_jdn - year.start_jdn + 1).to_int();
        cutlet_ends.push_back(day_offset - 1);
    }

    auto structure = std::make_shared<YearStructure>();
    structure->cutlet_count = cutlet_count;
    structure->cutlet_gaps = std::move(cutlet_gaps);
    structure->cutlet_names = std::move(selected_cutlet_names);
    structure->cutlet_start_offsets = std::move(cutlet_starts);
    structure->cutlet_end_offsets = std::move(cutlet_ends);
    structure->month_count = month_count;
    structure->month_lengths = std::move(month_lengths);
    structure->month_names = std::move(selected_month_names);
    structure->month_weave = std::move(month_weave);
    structure->day_in_month = std::move(day_in_month);
    return structure;
}

int find_cutlet(const YearStructure& structure, int offset) {
    int low = 0;
    int high = structure.cutlet_count - 1;
    while (low <= high) {
        const int middle = (low + high) / 2;
        if (offset < structure.cutlet_start_offsets[middle]) {
            high = middle - 1;
        } else if (offset > structure.cutlet_end_offsets[middle]) {
            low = middle + 1;
        } else {
            return middle;
        }
    }
    throw std::logic_error("day offset is absent from every cutlet");
}

PastafariDate materialize(
    const Year& year,
    const YearStructure& structure,
    const BigInt& target_jdn
) {
    const int offset = (target_jdn - year.start_jdn).to_int();
    const int cutlet = find_cutlet(structure, offset);
    const int month = structure.month_weave.at(static_cast<std::size_t>(offset));
    return PastafariDate{
        year.number,
        structure.cutlet_names.at(static_cast<std::size_t>(cutlet)),
        offset - structure.cutlet_start_offsets[cutlet] + 1,
        structure.month_names.at(static_cast<std::size_t>(month)),
        structure.day_in_month.at(static_cast<std::size_t>(offset)),
    };
}

PastafariDate CalculationState::convert(const BigInt& target_jdn) {
    const Year year = find_year(target_jdn);
    return materialize(year, *get_structure(year), target_jdn);
}

bool is_leap_year(const BigInt& year) {
    return year % BigInt(4) == 0
        && (year % BigInt(100) != 0 || year % BigInt(400) == 0);
}

int month_length(const BigInt& year, int month) {
    if (month == 2) {
        return is_leap_year(year) ? 29 : 28;
    }
    return month == 4 || month == 6 || month == 9 || month == 11 ? 30 : 31;
}

std::string json_escape(std::string_view value) {
    std::ostringstream stream;
    for (const unsigned char byte : value) {
        switch (byte) {
            case '"': stream << "\\\""; break;
            case '\\': stream << "\\\\"; break;
            case '\b': stream << "\\b"; break;
            case '\f': stream << "\\f"; break;
            case '\n': stream << "\\n"; break;
            case '\r': stream << "\\r"; break;
            case '\t': stream << "\\t"; break;
            default:
                if (byte < 0x20) {
                    stream << "\\u"
                           << std::hex << std::setw(4) << std::setfill('0')
                           << static_cast<int>(byte)
                           << std::dec << std::setfill(' ');
                } else {
                    stream << static_cast<char>(byte);
                }
        }
    }
    return stream.str();
}

}  // namespace

GregorianDate::GregorianDate(BigInt year_value, int month_value, int day_value)
    : year(std::move(year_value)), month(month_value), day(day_value) {
    if (month < 1 || month > 12) {
        throw std::invalid_argument("Gregorian month must be in 1..12");
    }
    const int maximum = month_length(year, month);
    if (day < 1 || day > maximum) {
        throw std::invalid_argument("Gregorian day is outside the selected month");
    }
}

GregorianDate GregorianDate::parse(std::string_view iso_date) {
    const std::string text(iso_date);
    const std::size_t last_dash = text.rfind('-');
    const std::size_t middle_dash = last_dash == std::string::npos
        ? std::string::npos
        : text.rfind('-', last_dash - 1);
    if (middle_dash == std::string::npos
        || last_dash == std::string::npos
        || middle_dash == 0
        || last_dash <= middle_dash + 1
        || text.size() - last_dash - 1 != 2
        || last_dash - middle_dash - 1 != 2) {
        throw std::invalid_argument("date must use [+-]YYYY-MM-DD");
    }
    const std::string year_text = text.substr(0, middle_dash);
    const std::string month_text = text.substr(middle_dash + 1, 2);
    const std::string day_text = text.substr(last_dash + 1, 2);
    const auto decimal_digits = [](std::string_view value) {
        return !value.empty() && std::all_of(value.begin(), value.end(), [](char character) {
            return character >= '0' && character <= '9';
        });
    };
    std::string_view unsigned_year(year_text);
    if (!unsigned_year.empty() && (unsigned_year.front() == '+' || unsigned_year.front() == '-')) {
        unsigned_year.remove_prefix(1);
    }
    if (!decimal_digits(unsigned_year)
        || !decimal_digits(month_text)
        || !decimal_digits(day_text)) {
        throw std::invalid_argument("date must use [+-]YYYY-MM-DD");
    }
    return GregorianDate(
        BigInt(year_text), std::stoi(month_text), std::stoi(day_text)
    );
}

std::string GregorianDate::isoformat() const {
    std::string digits = year.str();
    const bool negative = !digits.empty() && digits.front() == '-';
    std::string magnitude = negative ? digits.substr(1) : digits;
    if (magnitude.size() < 4) {
        magnitude.insert(magnitude.begin(), 4 - magnitude.size(), '0');
    }
    std::ostringstream stream;
    if (negative) {
        stream << '-';
    }
    stream << magnitude << '-' << std::setw(2) << std::setfill('0') << month
           << '-' << std::setw(2) << day;
    return stream.str();
}

BigInt gregorian_to_jdn(const GregorianDate& date) {
    const int a = (14 - date.month) / 12;
    const BigInt year = date.year + 4'800 - a;
    const int month = date.month + 12 * a - 3;
    return BigInt(date.day)
        + (153 * month + 2) / 5
        + 365 * year
        + year / BigInt(4)
        - year / BigInt(100)
        + year / BigInt(400)
        - 32'045;
}

GregorianDate jdn_to_gregorian(const BigInt& jdn) {
    const BigInt a = jdn + 32'044;
    const BigInt b = (4 * a + 3) / BigInt(146'097);
    const BigInt c = a - (146'097 * b) / BigInt(4);
    const BigInt d = (4 * c + 3) / BigInt(1'461);
    const BigInt e = c - (1'461 * d) / BigInt(4);
    const BigInt m = (5 * e + 2) / BigInt(153);
    const BigInt day = e - (153 * m + 2) / BigInt(5) + 1;
    const BigInt month = m + 3 - 12 * (m / BigInt(10));
    const BigInt year = 100 * b + d - 4'800 + m / BigInt(10);
    return GregorianDate(year, month.to_int(), day.to_int());
}

std::string PastafariDate::json() const {
    std::ostringstream stream;
    stream << "{\"year\":\"" << year.str()
           << "\",\"cutletName\":\"" << json_escape(cutlet_name)
           << "\",\"dayInCutlet\":" << day_in_cutlet
           << ",\"monthName\":\"" << json_escape(month_name)
           << "\",\"dayInMonth\":" << day_in_month << '}';
    return stream.str();
}

class PastafariCalendar::Impl {
public:
    Impl() : states_(4), results_(1024) {}

    PastafariDate convert(const BigInt& calculation_jdn, const BigInt& target_jdn) {
        std::lock_guard<std::mutex> lock(mutex_);
        const std::string result_key = calculation_jdn.str() + "|" + target_jdn.str();
        if (PastafariDate* cached = results_.get(result_key)) {
            return *cached;
        }

        const std::string state_key = calculation_jdn.str();
        std::unique_ptr<CalculationState>* state = states_.get(state_key);
        if (state == nullptr) {
            state = &states_.put(
                state_key,
                std::make_unique<CalculationState>(gates_, calculation_jdn)
            );
        }
        PastafariDate value = (*state)->convert(target_jdn);
        results_.put(result_key, value);
        return value;
    }

    void clear() {
        std::lock_guard<std::mutex> lock(mutex_);
        states_.clear();
        results_.clear();
        gates_.clear();
    }

private:
    std::mutex mutex_;
    GateEngine gates_;
    StringLruCache<std::unique_ptr<CalculationState>> states_;
    StringLruCache<PastafariDate> results_;
};

PastafariCalendar::PastafariCalendar() : impl_(std::make_unique<Impl>()) {}
PastafariCalendar::~PastafariCalendar() = default;
PastafariCalendar::PastafariCalendar(PastafariCalendar&&) noexcept = default;
PastafariCalendar& PastafariCalendar::operator=(PastafariCalendar&&) noexcept = default;

PastafariDate PastafariCalendar::convert_jdn(
    const BigInt& calculation_jdn,
    const BigInt& target_jdn
) {
    return impl_->convert(calculation_jdn, target_jdn);
}

PastafariDate PastafariCalendar::convert(
    const GregorianDate& calculation_date,
    const GregorianDate& target_date
) {
    return convert_jdn(
        gregorian_to_jdn(calculation_date), gregorian_to_jdn(target_date)
    );
}

void PastafariCalendar::clear() { impl_->clear(); }

}  // namespace pastafari
