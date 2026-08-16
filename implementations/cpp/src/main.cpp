#include "pastafari/calendar.hpp"

#include <exception>
#include <iostream>
#include <string>
#include <string_view>

namespace {

void print_usage(std::ostream& output, std::string_view executable) {
    output
        << "Usage:\n"
        << "  " << executable << " CALCULATION TARGET\n"
        << "  " << executable << " --jdn CALCULATION_JDN TARGET_JDN\n\n"
        << "The positional order is normative: calculation/action day first, "
           "queried/target day second.\n"
        << "Gregorian dates use signed proleptic [+-]YYYY-MM-DD notation.\n"
        << "There is no implicit civil-today fallback; the Venus-day adapter is separate.\n";
}

}  // namespace

int main(int argc, char** argv) {
    try {
        if (argc == 2 && (std::string_view(argv[1]) == "--help" || std::string_view(argv[1]) == "-h")) {
            print_usage(std::cout, argv[0]);
            return 0;
        }
        pastafari::PastafariCalendar calendar;
        if (argc == 4 && std::string_view(argv[1]) == "--jdn") {
            const auto value = calendar.convert_jdn(
                pastafari::BigInt(argv[2]), pastafari::BigInt(argv[3])
            );
            std::cout << value.json() << '\n';
            return 0;
        }
        if (argc == 3) {
            const auto value = calendar.convert(
                pastafari::GregorianDate::parse(argv[1]),
                pastafari::GregorianDate::parse(argv[2])
            );
            std::cout << value.json() << '\n';
            return 0;
        }
        print_usage(std::cerr, argv[0]);
        return 2;
    } catch (const std::exception& error) {
        std::cerr << "pastafari-calendar: " << error.what() << '\n';
        return 1;
    }
}
