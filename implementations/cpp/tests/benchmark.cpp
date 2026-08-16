#include "pastafari/calendar.hpp"

#include <algorithm>
#include <chrono>
#include <iomanip>
#include <iostream>
#include <vector>

namespace {

template <typename Callable>
double seconds(Callable&& callable) {
    const auto started = std::chrono::steady_clock::now();
    callable();
    const auto finished = std::chrono::steady_clock::now();
    return std::chrono::duration<double>(finished - started).count();
}

}  // namespace

int main() {
    const auto civil = pastafari::GregorianDate::parse("2026-08-06");
    const pastafari::BigInt jdn = pastafari::gregorian_to_jdn(civil);

    std::vector<double> cold;
    for (int sample = 0; sample < 3; ++sample) {
        pastafari::PastafariCalendar calendar;
        cold.push_back(seconds([&] { (void)calendar.convert_jdn(jdn, jdn); }));
    }
    std::sort(cold.begin(), cold.end());

    pastafari::PastafariCalendar calendar;
    (void)calendar.convert_jdn(jdn, jdn);
    constexpr int warm_repetitions = 10'000;
    const double warm = seconds([&] {
        for (int index = 0; index < warm_repetitions; ++index) {
            (void)calendar.convert_jdn(jdn, jdn);
        }
    });
    constexpr int range_days = 365;
    const double sequential = seconds([&] {
        for (int offset = 0; offset < range_days; ++offset) {
            (void)calendar.convert_jdn(jdn, jdn + offset);
        }
    });

    std::cout << std::fixed << std::setprecision(6)
              << "cold median:        " << cold[1] << " s\n"
              << "cached conversion:  "
              << warm / warm_repetitions * 1'000'000.0 << " us/op\n"
              << "365-day sequence:   " << sequential << " s\n";
}
