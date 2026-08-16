#include "pastafari/calendar.hpp"

#include <algorithm>
#include <future>
#include <fstream>
#include <iostream>
#include <stdexcept>
#include <string>
#include <string_view>
#include <thread>
#include <vector>

namespace {

std::string_view next_field(std::string_view& line) {
    const std::size_t separator = line.find('\t');
    if (separator == std::string_view::npos) {
        throw std::runtime_error("malformed differential corpus row");
    }
    const std::string_view result = line.substr(0, separator);
    line.remove_prefix(separator + 1);
    return result;
}

}  // namespace

struct CorpusRow {
    std::string target;
    std::string calculation;
    std::string expected;
};

using CorpusGroup = std::vector<CorpusRow>;

int main(int argc, char** argv) {
    if (argc != 2) {
        std::cerr << "usage: pastafari-differential CORPUS.tsv\n";
        return 2;
    }
    std::ifstream input(argv[1]);
    if (!input) {
        std::cerr << "cannot open corpus: " << argv[1] << '\n';
        return 2;
    }

    std::vector<CorpusGroup> groups;
    std::string storage;
    std::size_t row = 0;
    while (std::getline(input, storage)) {
        if (storage.empty() || storage.front() == '#') continue;
        ++row;
        std::string_view line(storage);
        CorpusRow value{
            std::string(next_field(line)),
            std::string(next_field(line)),
            std::string(line),
        };
        if (
            groups.empty()
            || groups.back().back().calculation != value.calculation
        ) {
            groups.emplace_back();
        }
        groups.back().push_back(std::move(value));
    }
    if (row != 10'000) {
        std::cerr << "expected 10000 corpus rows, read " << row << '\n';
        return 1;
    }
    if (groups.size() != 40) {
        std::cerr << "expected 40 calculation groups, read "
                  << groups.size() << '\n';
        return 1;
    }

    const std::size_t worker_count = std::min<std::size_t>(
        8,
        std::max(1U, std::thread::hardware_concurrency())
    );
    std::vector<std::future<std::size_t>> workers;
    workers.reserve(worker_count);
    for (std::size_t shard = 0; shard < worker_count; ++shard) {
        workers.push_back(std::async(
            std::launch::async,
            [&groups, shard, worker_count]() {
                pastafari::PastafariCalendar calendar;
                std::size_t checked = 0;
                for (
                    std::size_t group_index = shard;
                    group_index < groups.size();
                    group_index += worker_count
                ) {
                    for (const CorpusRow& value : groups[group_index]) {
                        const std::string actual = calendar.convert_jdn(
                            pastafari::BigInt(value.calculation),
                            pastafari::BigInt(value.target)
                        ).json();
                        if (actual != value.expected) {
                            throw std::runtime_error(
                                "differential mismatch for target "
                                + value.target + " and calculation "
                                + value.calculation + "\nexpected: "
                                + value.expected + "\nactual:   " + actual
                            );
                        }
                        ++checked;
                    }
                }
                return checked;
            }
        ));
    }
    std::size_t checked = 0;
    try {
        for (auto& worker : workers) checked += worker.get();
    } catch (const std::exception& error) {
        std::cerr << error.what() << '\n';
        return 1;
    }
    if (checked != row) {
        std::cerr << "parallel differential runner checked " << checked
                  << " of " << row << " rows\n";
        return 1;
    }
    std::cout << "C++ differential: " << checked << '/' << row
              << " vectors passed\n";
}
