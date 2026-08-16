#include "pastafari/calendar.hpp"

#include <exception>
#include <iostream>
#include <optional>
#include <string>
#include <string_view>

namespace {

void print_usage(std::ostream& output, std::string_view executable) {
    output
        << "Usage: " << executable
        << " TARGET [--calculation-date DATE]\n\n"
        << "TARGET and DATE use the proleptic Gregorian [+-]YYYY-MM-DD form.\n"
        << "If DATE is omitted, the local civil day at invocation time is used.\n";
}

}  // namespace

int main(int argc, char** argv) {
    try {
        if (argc < 2) {
            print_usage(std::cerr, argv[0]);
            return 2;
        }
        std::optional<std::string> target;
        std::optional<std::string> calculation;
        for (int index = 1; index < argc; ++index) {
            const std::string argument(argv[index]);
            if (argument == "--help" || argument == "-h") {
                print_usage(std::cout, argv[0]);
                return 0;
            }
            if (argument == "--calculation-date" || argument == "-c") {
                if (index + 1 >= argc) {
                    throw std::invalid_argument(argument + " requires a date");
                }
                calculation = argv[++index];
                continue;
            }
            if (target.has_value()) {
                throw std::invalid_argument("unexpected argument: " + argument);
            }
            target = argument;
        }
        if (!target.has_value()) {
            throw std::invalid_argument("the queried target day is required");
        }

        const pastafari::GregorianDate target_date =
            pastafari::GregorianDate::parse(*target);
        pastafari::PastafariCalendar calendar;
        const pastafari::PastafariDate value = calculation.has_value()
            ? calendar.convert(
                target_date, pastafari::GregorianDate::parse(*calculation)
            )
            : calendar.convert(target_date);
        std::cout << value.json() << '\n';
        return 0;
    } catch (const std::exception& error) {
        std::cerr << "pastafari-calendar: " << error.what() << '\n';
        return 1;
    }
}
