#include "pastafari/calendar.hpp"

#include <array>
#include <iostream>
#include <string_view>

namespace {

struct Vector {
    std::string_view id;
    std::string_view calculation_jdn;
    std::string_view target_jdn;
    std::string_view expected_json;
};

// Mirrors implementations/tests/conformance-vectors.json; regenerated from the clear normative reference.
constexpr std::array<Vector, 6> vectors = {{
    {"foundation_same", "-13334246", "-13334246", R"({"year":"5000","cutletName":"לגש","dayInCutlet":762,"monthName":"לבונה","dayInMonth":105})"},
    {"foundation_next", "-13334246", "-13334245", R"({"year":"5000","cutletName":"כליה","dayInCutlet":1,"monthName":"אבן־גיר","dayInMonth":91})"},
    {"foundation_previous", "-13334246", "-13334247", R"({"year":"5000","cutletName":"לגש","dayInCutlet":761,"monthName":"הדלת הסגורה","dayInMonth":114})"},
    {"present_same", "2461259", "2461259", R"({"year":"5000","cutletName":"מחשבה","dayInCutlet":13,"monthName":"חרטה","dayInMonth":16})"},
    {"present_forward", "2461259", "2461265", R"({"year":"5000","cutletName":"מחשבה","dayInCutlet":19,"monthName":"ערפל","dayInMonth":10})"},
    {"binding_5778_same", "-14269936", "-14269936", R"({"year":"5000","cutletName":"הכד הריק","dayInCutlet":191,"monthName":"שמחה","dayInMonth":72})"},
}};

}  // namespace

int main() {
    pastafari::PastafariCalendar calendar;
    int failures = 0;
    for (const Vector& vector : vectors) {
        const auto actual = calendar.convert_jdn(
            pastafari::BigInt(vector.calculation_jdn),
            pastafari::BigInt(vector.target_jdn)
        ).json();
        if (actual != vector.expected_json) {
            ++failures;
            std::cerr << vector.id << "\nexpected: " << vector.expected_json
                      << "\nactual:   " << actual << "\n";
        }
    }

    const auto foundation = pastafari::GregorianDate::parse("-41221-12-22");
    if (pastafari::gregorian_to_jdn(foundation) != pastafari::BigInt(-13'334'246)) {
        ++failures;
        std::cerr << "foundation JDN mismatch\n";
    }
    if (pastafari::max_year_days != 5'778) {
        ++failures;
        std::cerr << "binding maximum year length mismatch\n";
    }

    for (const std::string_view text : {
             "-100000-03-01", "-41221-12-22", "-0001-12-31",
             "0000-02-29", "0001-01-01", "1600-02-29", "1900-03-01",
             "2000-02-29", "2100-03-01", "+100000-12-31",
         }) {
        const auto input = pastafari::GregorianDate::parse(text);
        const auto round_trip = pastafari::jdn_to_gregorian(pastafari::gregorian_to_jdn(input));
        if (round_trip.isoformat() != input.isoformat()) {
            ++failures;
            std::cerr << "Gregorian round trip failed for " << text << '\n';
        }
    }

    if (failures != 0) return 1;
    std::cout << "C++ canonical conformance: 6/6 vectors passed\n";
    return 0;
}
