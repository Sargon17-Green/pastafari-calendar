#pragma once

// A narrow RAII wrapper around OpenSSL's BIGNUM. The calendar uses exact
// integers only. Keeping the wrapper here makes ownership, checked conversions,
// and mathematical floor-division semantics explicit for negative dates.

#include <openssl/bn.h>

#include <algorithm>
#include <cstdint>
#include <limits>
#include <memory>
#include <stdexcept>
#include <string>
#include <string_view>
#include <utility>

namespace pastafari {

namespace detail {

struct BigNumberDeleter {
    void operator()(BIGNUM* value) const noexcept { BN_free(value); }
};

struct BigNumberContextDeleter {
    void operator()(BN_CTX* value) const noexcept { BN_CTX_free(value); }
};

[[nodiscard]] inline std::unique_ptr<BN_CTX, BigNumberContextDeleter>
make_context() {
    std::unique_ptr<BN_CTX, BigNumberContextDeleter> context(BN_CTX_new());
    if (!context) throw std::bad_alloc();
    return context;
}

[[noreturn]] inline void throw_bn_error(std::string_view operation) {
    throw std::runtime_error(
        "OpenSSL BIGNUM operation failed: " + std::string(operation)
    );
}

}  // namespace detail

class BigInt {
public:
    BigInt() : value_(BN_new()) {
        if (!value_) throw std::bad_alloc();
        BN_zero(value_.get());
    }

    BigInt(std::int64_t value) : BigInt(std::to_string(value)) {}

    BigInt(int value) : BigInt(static_cast<std::int64_t>(value)) {}

    explicit BigInt(std::string_view decimal) : BigInt() {
        const std::string original(decimal);
        if (original.empty()) {
            throw std::invalid_argument("invalid decimal integer: " + original);
        }
        const std::string normalized = original.front() == '+'
            ? original.substr(1)
            : original;
        if (normalized.empty()) {
            throw std::invalid_argument("invalid decimal integer: " + original);
        }
        BIGNUM* parsed = nullptr;
        const int consumed = BN_dec2bn(&parsed, normalized.c_str());
        std::unique_ptr<BIGNUM, detail::BigNumberDeleter> candidate(parsed);
        if (!candidate || consumed != static_cast<int>(normalized.size())) {
            throw std::invalid_argument("invalid decimal integer: " + original);
        }
        value_.swap(candidate);
    }

    BigInt(const BigInt& other) : value_(BN_dup(other.value_.get())) {
        if (!value_) throw std::bad_alloc();
    }

    BigInt(BigInt&&) noexcept = default;
    ~BigInt() = default;

    BigInt& operator=(BigInt other) noexcept {
        swap(other);
        return *this;
    }

    void swap(BigInt& other) noexcept { value_.swap(other.value_); }

    [[nodiscard]] const BIGNUM* raw() const noexcept { return value_.get(); }
    [[nodiscard]] BIGNUM* raw() noexcept { return value_.get(); }

    [[nodiscard]] std::string str() const {
        char* text = BN_bn2dec(value_.get());
        if (text == nullptr) throw std::bad_alloc();
        std::string result(text);
        OPENSSL_free(text);
        return result;
    }

    [[nodiscard]] int sign() const noexcept {
        if (BN_is_zero(value_.get())) return 0;
        return BN_is_negative(value_.get()) ? -1 : 1;
    }

    [[nodiscard]] bool odd() const noexcept {
        return BN_is_odd(value_.get()) != 0;
    }

    [[nodiscard]] std::int64_t to_int64() const {
        const std::string decimal = str();
        std::size_t used = 0;
        const long long result = std::stoll(decimal, &used, 10);
        if (used != decimal.size()) {
            throw std::overflow_error("integer does not fit int64");
        }
        return static_cast<std::int64_t>(result);
    }

    [[nodiscard]] int to_int() const {
        const std::int64_t result = to_int64();
        if (result < std::numeric_limits<int>::min()
            || result > std::numeric_limits<int>::max()) {
            throw std::overflow_error("integer does not fit int");
        }
        return static_cast<int>(result);
    }

    [[nodiscard]] std::size_t to_size() const {
        const std::string decimal = str();
        if (!decimal.empty() && decimal.front() == '-') {
            throw std::overflow_error("negative integer does not fit size_t");
        }
        std::size_t used = 0;
        const unsigned long long result = std::stoull(decimal, &used, 10);
        if (used != decimal.size()
            || result > std::numeric_limits<std::size_t>::max()) {
            throw std::overflow_error("integer does not fit size_t");
        }
        return static_cast<std::size_t>(result);
    }

    BigInt& operator+=(const BigInt& rhs) {
        if (BN_add(value_.get(), value_.get(), rhs.value_.get()) != 1) {
            detail::throw_bn_error("addition");
        }
        return *this;
    }

    BigInt& operator-=(const BigInt& rhs) {
        if (BN_sub(value_.get(), value_.get(), rhs.value_.get()) != 1) {
            detail::throw_bn_error("subtraction");
        }
        return *this;
    }

    BigInt& operator*=(const BigInt& rhs) {
        auto context = detail::make_context();
        if (BN_mul(
                value_.get(), value_.get(), rhs.value_.get(), context.get()
            ) != 1) {
            detail::throw_bn_error("multiplication");
        }
        return *this;
    }

    BigInt& operator/=(const BigInt& rhs) {
        *this = floor_divmod(*this, rhs).first;
        return *this;
    }

    BigInt& operator%=(const BigInt& rhs) {
        *this = floor_divmod(*this, rhs).second;
        return *this;
    }

    BigInt& operator+=(std::int64_t rhs) { return *this += BigInt(rhs); }
    BigInt& operator-=(std::int64_t rhs) { return *this -= BigInt(rhs); }
    BigInt& operator*=(std::int64_t rhs) { return *this *= BigInt(rhs); }

    BigInt& operator++() { return *this += 1; }
    BigInt& operator--() { return *this -= 1; }

    [[nodiscard]] static BigInt power_of_two_minus_one(unsigned exponent) {
        BigInt result(1);
        if (BN_lshift(
                result.value_.get(),
                result.value_.get(),
                static_cast<int>(exponent)
            ) != 1) {
            detail::throw_bn_error("left shift");
        }
        return result - 1;
    }

    [[nodiscard]] static BigInt binomial(unsigned n, unsigned k) {
        if (k > n) return BigInt(0);
        k = std::min(k, n - k);
        BigInt result(1);
        for (unsigned index = 1; index <= k; ++index) {
            result *= static_cast<std::int64_t>(n - k + index);
            result = exact_divide(
                result, BigInt(static_cast<std::int64_t>(index))
            );
        }
        return result;
    }

    [[nodiscard]] static BigInt exact_divide(
        const BigInt& numerator,
        const BigInt& denominator
    ) {
        if (denominator.sign() == 0) {
            throw std::domain_error("division by zero");
        }
        auto [quotient, remainder] = truncating_divmod(
            numerator, denominator
        );
        if (remainder.sign() != 0) {
            throw std::domain_error("non-exact integer division");
        }
        return quotient;
    }

    friend bool operator==(const BigInt& lhs, const BigInt& rhs) noexcept {
        return BN_cmp(lhs.value_.get(), rhs.value_.get()) == 0;
    }
    friend bool operator!=(const BigInt& lhs, const BigInt& rhs) noexcept {
        return !(lhs == rhs);
    }
    friend bool operator<(const BigInt& lhs, const BigInt& rhs) noexcept {
        return BN_cmp(lhs.value_.get(), rhs.value_.get()) < 0;
    }
    friend bool operator>(const BigInt& lhs, const BigInt& rhs) noexcept {
        return rhs < lhs;
    }
    friend bool operator<=(const BigInt& lhs, const BigInt& rhs) noexcept {
        return !(rhs < lhs);
    }
    friend bool operator>=(const BigInt& lhs, const BigInt& rhs) noexcept {
        return !(lhs < rhs);
    }

    friend BigInt operator+(BigInt lhs, const BigInt& rhs) {
        return lhs += rhs;
    }
    friend BigInt operator-(BigInt lhs, const BigInt& rhs) {
        return lhs -= rhs;
    }
    friend BigInt operator*(BigInt lhs, const BigInt& rhs) {
        return lhs *= rhs;
    }
    friend BigInt operator/(BigInt lhs, const BigInt& rhs) {
        return lhs /= rhs;
    }
    friend BigInt operator%(BigInt lhs, const BigInt& rhs) {
        return lhs %= rhs;
    }

    friend BigInt operator+(BigInt lhs, std::int64_t rhs) {
        return lhs += rhs;
    }
    friend BigInt operator+(std::int64_t lhs, BigInt rhs) {
        return rhs += lhs;
    }
    friend BigInt operator-(BigInt lhs, std::int64_t rhs) {
        return lhs -= rhs;
    }
    friend BigInt operator-(std::int64_t lhs, const BigInt& rhs) {
        return BigInt(lhs) - rhs;
    }
    friend BigInt operator*(BigInt lhs, std::int64_t rhs) {
        return lhs *= rhs;
    }
    friend BigInt operator*(std::int64_t lhs, BigInt rhs) {
        return rhs *= lhs;
    }

    friend bool operator==(const BigInt& lhs, std::int64_t rhs) {
        return lhs == BigInt(rhs);
    }
    friend bool operator!=(const BigInt& lhs, std::int64_t rhs) {
        return !(lhs == rhs);
    }
    friend bool operator<(const BigInt& lhs, std::int64_t rhs) {
        return lhs < BigInt(rhs);
    }
    friend bool operator>(const BigInt& lhs, std::int64_t rhs) {
        return lhs > BigInt(rhs);
    }
    friend bool operator<=(const BigInt& lhs, std::int64_t rhs) {
        return lhs <= BigInt(rhs);
    }
    friend bool operator>=(const BigInt& lhs, std::int64_t rhs) {
        return lhs >= BigInt(rhs);
    }

    friend BigInt operator-(const BigInt& value) {
        BigInt result(value);
        if (!BN_is_zero(result.value_.get())) {
            BN_set_negative(
                result.value_.get(), !BN_is_negative(result.value_.get())
            );
        }
        return result;
    }

private:
    [[nodiscard]] static std::pair<BigInt, BigInt> truncating_divmod(
        const BigInt& numerator,
        const BigInt& denominator
    ) {
        if (denominator.sign() == 0) {
            throw std::domain_error("division by zero");
        }
        auto context = detail::make_context();
        BigInt quotient;
        BigInt remainder;
        if (BN_div(
                quotient.value_.get(),
                remainder.value_.get(),
                numerator.value_.get(),
                denominator.value_.get(),
                context.get()
            ) != 1) {
            detail::throw_bn_error("division");
        }
        return {std::move(quotient), std::move(remainder)};
    }

    [[nodiscard]] static std::pair<BigInt, BigInt> floor_divmod(
        const BigInt& numerator,
        const BigInt& denominator
    ) {
        auto [quotient, remainder] = truncating_divmod(
            numerator, denominator
        );
        if (remainder.sign() != 0
            && ((remainder.sign() > 0) != (denominator.sign() > 0))) {
            quotient -= 1;
            remainder += denominator;
        }
        return {std::move(quotient), std::move(remainder)};
    }

    std::unique_ptr<BIGNUM, detail::BigNumberDeleter> value_;
};

inline void swap(BigInt& lhs, BigInt& rhs) noexcept { lhs.swap(rhs); }

[[nodiscard]] inline BigInt abs(const BigInt& value) {
    return value.sign() < 0 ? -value : value;
}

[[nodiscard]] inline BigInt square(const BigInt& value) {
    return value * value;
}

}  // namespace pastafari

