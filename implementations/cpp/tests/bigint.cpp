#include "pastafari/bigint.hpp"

#include <array>
#include <iostream>
#include <stdexcept>

namespace {

using pastafari::BigInt;

struct DivisionCase {
    int numerator;
    int denominator;
    int quotient;
    int remainder;
};

}  // namespace

int main() {
    constexpr std::array cases{
        DivisionCase{7, 3, 2, 1},
        DivisionCase{-7, 3, -3, 2},
        DivisionCase{7, -3, -3, -2},
        DivisionCase{-7, -3, 2, -1},
        DivisionCase{6, -3, -2, 0},
    };
    for (const DivisionCase& value : cases) {
        const BigInt numerator(value.numerator);
        const BigInt denominator(value.denominator);
        if (numerator / denominator != value.quotient
            || numerator % denominator != value.remainder) {
            throw std::runtime_error("floor division/modulo regression");
        }
    }

    const BigInt large("1234567890123456789012345678901234567890");
    if (BigInt::exact_divide(large * 97, BigInt(97)) != large) {
        throw std::runtime_error("large exact division regression");
    }
    if (BigInt::binomial(100, 50).str()
        != "100891344545564193334812497256") {
        throw std::runtime_error("binomial regression");
    }
    std::cout << "C++ bigint semantics: passed\n";
}
