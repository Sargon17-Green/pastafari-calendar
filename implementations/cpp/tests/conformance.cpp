#include "pastafari/calendar.hpp"

#include <array>
#include <iostream>
#include <string_view>

namespace {

struct Vector {
    std::string_view id;
    std::string_view target;
    std::string_view calculation;
    std::string_view expected_json;
};

constexpr std::array<Vector, 16> vectors = {{
    {"present_same", "2026-08-06", "2026-08-06", R"({"year":"5000","cutletName":"כליה","dayInCutlet":306,"monthName":"לשון","dayInMonth":23})"},
    {"present_next", "2026-08-07", "2026-08-06", R"({"year":"5000","cutletName":"כליה","dayInCutlet":307,"monthName":"שלושה חלקים מחמישה","dayInMonth":36})"},
    {"present_previous", "2026-08-05", "2026-08-06", R"({"year":"5000","cutletName":"כליה","dayInCutlet":305,"monthName":"שושן","dayInMonth":27})"},
    {"present_to_2000", "2000-01-01", "2026-08-06", R"({"year":"4998","cutletName":"צחוק","dayInCutlet":428,"monthName":"משחת־שיניים","dayInMonth":9})"},
    {"present_to_2050", "2050-02-28", "2026-08-06", R"({"year":"5002","cutletName":"צחוק","dayInCutlet":707,"monthName":"נחושת","dayInMonth":36})"},
    {"millennium_same", "2000-01-01", "2000-01-01", R"({"year":"5000","cutletName":"עקרב","dayInCutlet":428,"monthName":"מלח","dayInMonth":48})"},
    {"millennium_previous", "1999-12-31", "2000-01-01", R"({"year":"5000","cutletName":"עקרב","dayInCutlet":427,"monthName":"שלושה חלקים מחמישה","dayInMonth":51})"},
    {"millennium_leap", "2000-02-29", "2000-01-01", R"({"year":"5000","cutletName":"עקרב","dayInCutlet":487,"monthName":"זפת","dayInMonth":51})"},
    {"millennium_to_present", "2026-08-12", "2000-01-01", R"({"year":"5002","cutletName":"קרן","dayInCutlet":312,"monthName":"טחול","dayInMonth":54})"},
    {"foundation_same", "-41221-12-22", "-41221-12-22", R"({"year":"5000","cutletName":"עקרב","dayInCutlet":503,"monthName":"באר","dayInMonth":56})"},
    {"foundation_next", "-41221-12-23", "-41221-12-22", R"({"year":"5000","cutletName":"צחוק","dayInCutlet":1,"monthName":"צפרדע","dayInMonth":38})"},
    {"foundation_previous", "-41221-12-21", "-41221-12-22", R"({"year":"5000","cutletName":"עקרב","dayInCutlet":502,"monthName":"הדלת הסגורה","dayInMonth":21})"},
    {"5778_boundary_same", "-43782-02-21", "-43782-02-21", R"({"year":"5000","cutletName":"מחשבה","dayInCutlet":1,"monthName":"ארידו","dayInMonth":93})"},
    {"5778_boundary_next", "-43782-02-22", "-43782-02-21", R"({"year":"5000","cutletName":"מחשבה","dayInCutlet":2,"monthName":"טחול","dayInMonth":89})"},
    {"5778_boundary_previous", "-43782-02-20", "-43782-02-21", R"({"year":"5000","cutletName":"כליה","dayInCutlet":507,"monthName":"בבל","dayInMonth":44})"},
    {"year_zero_leap", "0000-02-29", "0000-02-29", R"({"year":"5000","cutletName":"צחוק","dayInCutlet":281,"monthName":"נינוה","dayInMonth":7})"},
}};

}  // namespace

int main() {
    pastafari::PastafariCalendar calendar;
    int failures = 0;
    for (const Vector& vector : vectors) {
        const auto actual = calendar.convert(
            pastafari::GregorianDate::parse(vector.target),
            pastafari::GregorianDate::parse(vector.calculation)
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

    for (const std::string_view text : {
             "-43782-02-21", "-41221-12-22", "-0762-06-07",
             "0000-02-29", "0001-01-01", "2000-02-29", "2026-08-12",
         }) {
        const auto input = pastafari::GregorianDate::parse(text);
        const auto round_trip = pastafari::jdn_to_gregorian(
            pastafari::gregorian_to_jdn(input)
        );
        if (round_trip.isoformat() != input.isoformat()) {
            ++failures;
            std::cerr << "Gregorian round trip failed for " << text << '\n';
        }
    }

    if (failures != 0) {
        return 1;
    }
    std::cout << "C++ conformance: 16/16 vectors passed\n";
    return 0;
}
