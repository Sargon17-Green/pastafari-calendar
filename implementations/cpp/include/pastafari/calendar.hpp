#pragma once

#include "pastafari/bigint.hpp"

#include <memory>
#include <string>
#include <string_view>

namespace pastafari {

inline constexpr std::string_view algorithm_id =
    "PASTAFARI-SCROLL-2026-08-16-D36B0C94";
inline constexpr int max_year_days = 5'778;

struct GregorianDate {
    BigInt year;
    int month;
    int day;

    GregorianDate(BigInt year_value, int month_value, int day_value);

    [[nodiscard]] static GregorianDate parse(std::string_view iso_date);
    [[nodiscard]] std::string isoformat() const;
};

struct PastafariDate {
    BigInt year;
    std::string cutlet_name;
    int day_in_cutlet;
    std::string month_name;
    int day_in_month;

    [[nodiscard]] std::string json() const;
};

[[nodiscard]] BigInt gregorian_to_jdn(const GregorianDate& date);
[[nodiscard]] GregorianDate jdn_to_gregorian(const BigInt& jdn);

class PastafariCalendar {
public:
    PastafariCalendar();
    ~PastafariCalendar();

    PastafariCalendar(PastafariCalendar&&) noexcept;
    PastafariCalendar& operator=(PastafariCalendar&&) noexcept;

    PastafariCalendar(const PastafariCalendar&) = delete;
    PastafariCalendar& operator=(const PastafariCalendar&) = delete;

    [[nodiscard]] PastafariDate convert_jdn(
        const BigInt& calculation_jdn,
        const BigInt& target_jdn
    );

    [[nodiscard]] PastafariDate convert(
        const GregorianDate& calculation_date,
        const GregorianDate& target_date
    );

    void clear();

private:
    class Impl;
    std::unique_ptr<Impl> impl_;
};

}  // namespace pastafari
