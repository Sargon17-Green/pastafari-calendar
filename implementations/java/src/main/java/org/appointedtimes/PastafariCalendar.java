package org.appointedtimes;

import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.Objects;
import java.util.TreeMap;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * Independent Java 17 implementation of The Scroll of the Appointed Times.
 *
 * <p>The calendar consumes an ordered pair of civil days: the calculation day
 * and the queried day. All unbounded values use {@link BigInteger}. Machine
 * integers are used only for quantities proved by the algorithm to fit within
 * a year (at most 5,778 days), a fixed table, or an array index.</p>
 *
 * <p>This source has no native bridge, subprocess, shared library or other
 * language implementation at runtime. Historical differential data is retained
 * only as non-normative regression evidence.</p>
 */
public final class PastafariCalendar {
    public static final String ALGORITHM_ID =
        "PASTAFARI-SCROLL-2026-08-16-D36B0C94";
    public static final String NORMATIVE_SOURCE_SHA256 =
        "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96";

    private static final BigInteger ZERO = BigInteger.ZERO;
    private static final BigInteger ONE = BigInteger.ONE;
    private static final BigInteger TWO = BigInteger.TWO;
    private static final BigInteger GREAT = ONE.shiftLeft(127).subtract(ONE);
    private static final BigInteger FOUNDATION_JDN = bi(-13_334_246L);

    private static final int MIN_YEAR_DAYS = 252;
    private static final int MAX_YEAR_DAYS = 5_778;
    private static final int MIN_YEAR_GAPS = 6;

    private static final String[] CUTLET_NAMES = {
        "ארד", "שועל", "כליה", "לגש", "מחשבה", "ארבעה חלקים מתשעה",
        "פַּלְגּוּרַשׁ", "גומא", "אשכול", "עקרב", "אפר", "חיטה", "נהר",
        "צחוק", "אכד", "קרן", "הכד הריק"
    };

    private static final String[] MONTH_NAMES = {
        "טין", "רימון", "מרפק", "קנאה", "ארידו", "משחת־שיניים",
        "שלושה חלקים מחמישה", "כַּרְשׁוּמַב", "נמר", "בדיל", "ערפל", "לבונה",
        "כישור", "צלע", "חרוב", "אורוק", "בושה", "גמל", "נחושת", "באר",
        "חלמון", "כוכב", "דבש", "טחול", "אבן־גיר", "שמחה", "תאנה", "נינוה",
        "צפרדע", "זפת", "נר", "הדלת הסגורה", "שומשום", "עורף", "כסף", "שושן",
        "סערה", "חמור", "קמח", "חרטה", "בבל", "לשון", "פשתן", "מלח", "אגס",
        "קשת", "חול"
    };

    private static final int[][] GRIND_ROWS = {
        {3, 5, 7, 11, 0},
        {5, 7, 11, 13, 1},
        {7, 11, 13, 17, 2},
        {11, 13, 17, 19, 3},
        {13, 17, 19, 23, 4},
        {17, 19, 23, 29, 0},
        {19, 23, 29, 31, 1},
        {23, 29, 31, 37, 2},
        {29, 31, 37, 41, 3},
        {31, 37, 41, 43, 4},
        {37, 41, 43, 47, 0}
    };

    private static final int[][] HIDDEN_COEFFICIENTS = {
        {3, 4, 6, 8},
        {5, 7, 10, 12},
        {7, 10, 14, 16},
        {9, 13, 18, 20},
        {11, 16, 22, 24},
        {13, 19, 26, 28},
        {15, 22, 30, 32}
    };

    private static final int[] HIDDEN_STONE_ORDER = {0, 1, 2, 3, 4, 0, 1};
    private static final int[] BOWL_PRIMES = {17, 19, 23, 29, 31, 37};
    private static final int[] DIRECT_MULTIPLIERS = {3, 5, 7};
    private static final int[] DIRECT_STONES = {0, 1, 2};
    private static final int[] DROP_MIX_STONES = {0, 1, 2, 3, 4, 0};

    private static final BigInteger[][] STONE_TABLE = buildStones();

    private static final long[][] CHECKPOINT_DATA = {
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
        {31744, 2600784}, {32768, 3111357}
    };

    private static final List<Checkpoint> CHECKPOINTS = buildCheckpoints();
    private static final LruCache<BigInteger, Integer> GATE_DISTANCE_CACHE =
        new LruCache<>(4096);
    private static final GatePositionCache GATE_POSITION_CACHE =
        new GatePositionCache(4096);

    static {
        for (Checkpoint checkpoint : CHECKPOINTS) {
            GATE_POSITION_CACHE.set(checkpoint.index(), checkpoint.position());
        }
    }

    private final LruCache<BigInteger, CalculationState> states =
        new LruCache<>(4);
    private final LruCache<ConversionKey, PastafariDate> results =
        new LruCache<>(1024);

    /** Parse and convert the normative ordered pair: calculation day, queried day. */
    public synchronized PastafariDate convertIso(
        String calculationDate,
        String targetDate
    ) {
        GregorianDate calculation = GregorianDate.parse(calculationDate);
        GregorianDate target = GregorianDate.parse(targetDate);
        return convertJdn(calculation.toJdn(), target.toJdn());
    }

    /** Convert the normative ordered pair of arbitrary-precision JDNs. */
    public synchronized PastafariDate convertJdn(
        BigInteger calculationJdn,
        BigInteger targetJdn
    ) {
        Objects.requireNonNull(calculationJdn, "calculationJdn");
        Objects.requireNonNull(targetJdn, "targetJdn");
        ConversionKey key = new ConversionKey(calculationJdn, targetJdn);
        PastafariDate cached = results.get(key);
        if (cached != null) {
            return cached;
        }
        CalculationState state = states.get(calculationJdn);
        if (state == null) {
            state = new CalculationState(calculationJdn);
            states.set(calculationJdn, state);
        }
        PastafariDate value = state.convert(targetJdn);
        results.set(key, value);
        return value;
    }

    /** Remove all instance-local caches without changing observable results. */
    public synchronized void clear() {
        states.clear();
        results.clear();
    }

    public record GregorianDate(BigInteger year, int month, int day) {
        public GregorianDate {
            Objects.requireNonNull(year, "year");
            if (month < 1 || month > 12) {
                throw new IllegalArgumentException("Gregorian month must be in 1..12");
            }
            int maximum = gregorianMonthLength(year, month);
            if (day < 1 || day > maximum) {
                throw new IllegalArgumentException(
                    "Gregorian day must be in 1.." + maximum + " for this month"
                );
            }
        }

        public static GregorianDate parse(String source) {
            String text = Objects.requireNonNull(source, "date").strip();
            int lastDash = text.lastIndexOf('-');
            int middleDash = lastDash < 0 ? -1 : text.lastIndexOf('-', lastDash - 1);
            if (middleDash <= 0 || lastDash <= middleDash + 1) {
                throw new IllegalArgumentException("Date must use [+-]YYYY-MM-DD");
            }
            String yearText = text.substring(0, middleDash);
            String monthText = text.substring(middleDash + 1, lastDash);
            String dayText = text.substring(lastDash + 1);
            if (
                !yearText.matches("[+-]?\\d+")
                || !monthText.matches("\\d{2}")
                || !dayText.matches("\\d{2}")
            ) {
                throw new IllegalArgumentException("Date must use [+-]YYYY-MM-DD");
            }
            return new GregorianDate(
                new BigInteger(yearText),
                Integer.parseInt(monthText),
                Integer.parseInt(dayText)
            );
        }


        public BigInteger toJdn() {
            BigInteger a = floorDiv(bi(14L - month), bi(12));
            BigInteger y = year.add(bi(4_800)).subtract(a);
            BigInteger m = bi(month).add(a.multiply(bi(12))).subtract(bi(3));
            return bi(day)
                .add(floorDiv(m.multiply(bi(153)).add(TWO), bi(5)))
                .add(y.multiply(bi(365)))
                .add(floorDiv(y, bi(4)))
                .subtract(floorDiv(y, bi(100)))
                .add(floorDiv(y, bi(400)))
                .subtract(bi(32_045));
        }
    }

    public record PastafariDate(
        BigInteger year,
        String cutletName,
        int dayInCutlet,
        String monthName,
        int dayInMonth
    ) {
        public String json() {
            return "{\"year\":\"" + year + "\",\"cutletName\":\""
                + jsonEscape(cutletName) + "\",\"dayInCutlet\":" + dayInCutlet
                + ",\"monthName\":\"" + jsonEscape(monthName)
                + "\",\"dayInMonth\":" + dayInMonth + "}";
        }
    }

    private record SauceResult(BigInteger[] bowls, int[] lastDropPermutation) {}
    private record ResponseDescriptor(BigInteger first, int step) {}
    private record Checkpoint(BigInteger index, BigInteger position) {}
    private record IndexedPosition(BigInteger index, BigInteger position) {}
    private record Year5000Candidate(
        BigInteger openIndex,
        BigInteger closeIndex,
        int length
    ) {}
    private record YearCandidate(BigInteger index, int length) {}
    private record Year(
        BigInteger number,
        BigInteger openIndex,
        BigInteger closeIndex,
        BigInteger startJdn,
        BigInteger endJdn,
        int length,
        int gaps
    ) {}
    private record ConversionKey(BigInteger calculationJdn, BigInteger targetJdn) {}
    private record YearKey(BigInteger openIndex, BigInteger closeIndex) {}
    private record CanonicalVector(
        String id,
        String calculationJdn,
        String targetJdn,
        String expected
    ) {}
    private record CorpusRow(
        BigInteger target,
        BigInteger calculation,
        String expected
    ) {}

    private static final class YearStructure {
        private final int cutletCount;
        private final int[] cutletGaps;
        private final String[] cutletNames;
        private final int[] cutletStartOffsets;
        private final int[] cutletEndOffsets;
        private final int monthCount;
        private final int[] monthLengths;
        private final String[] monthNames;
        private final int[] monthWeave;
        private final int[] dayInMonth;

        YearStructure(
            int cutletCount,
            int[] cutletGaps,
            String[] cutletNames,
            int[] cutletStartOffsets,
            int[] cutletEndOffsets,
            int monthCount,
            int[] monthLengths,
            String[] monthNames,
            int[] monthWeave,
            int[] dayInMonth
        ) {
            this.cutletCount = cutletCount;
            this.cutletGaps = cutletGaps;
            this.cutletNames = cutletNames;
            this.cutletStartOffsets = cutletStartOffsets;
            this.cutletEndOffsets = cutletEndOffsets;
            this.monthCount = monthCount;
            this.monthLengths = monthLengths;
            this.monthNames = monthNames;
            this.monthWeave = monthWeave;
            this.dayInMonth = dayInMonth;
        }
    }

    private static final class LruCache<K, V> {
        private final int limit;
        private final LinkedHashMap<K, V> values;

        LruCache(int limit) {
            if (limit < 1) {
                throw new IllegalArgumentException("LRU limit must be positive");
            }
            this.limit = limit;
            this.values = new LinkedHashMap<>(16, 0.75f, true);
        }

        synchronized V get(K key) {
            return values.get(key);
        }

        synchronized void set(K key, V value) {
            values.put(key, value);
            if (values.size() > limit) {
                Iterator<K> iterator = values.keySet().iterator();
                iterator.next();
                iterator.remove();
            }
        }

        synchronized void clear() {
            values.clear();
        }
    }

    private static final class GatePositionCache {
        private final int limit;
        private final LinkedHashMap<BigInteger, BigInteger> values;
        private final NavigableMap<BigInteger, BigInteger> sorted;

        GatePositionCache(int limit) {
            this.limit = limit;
            this.values = new LinkedHashMap<>(16, 0.75f, true);
            this.sorted = new TreeMap<>();
        }

        synchronized BigInteger get(BigInteger index) {
            return values.get(index);
        }

        synchronized void set(BigInteger index, BigInteger position) {
            values.put(index, position);
            sorted.put(index, position);
            if (values.size() > limit) {
                Iterator<Map.Entry<BigInteger, BigInteger>> iterator =
                    values.entrySet().iterator();
                BigInteger evicted = iterator.next().getKey();
                iterator.remove();
                sorted.remove(evicted);
            }
        }

        synchronized IndexedPosition nearest(BigInteger index) {
            Map.Entry<BigInteger, BigInteger> left = sorted.floorEntry(index);
            Map.Entry<BigInteger, BigInteger> right = sorted.ceilingEntry(index);
            if (left == null && right == null) {
                throw new IllegalStateException("Gate-position cache is empty");
            }
            Map.Entry<BigInteger, BigInteger> selected;
            if (left == null) {
                selected = right;
            } else if (right == null) {
                selected = left;
            } else {
                BigInteger leftDistance = index.subtract(left.getKey());
                BigInteger rightDistance = right.getKey().subtract(index);
                selected = leftDistance.compareTo(rightDistance) <= 0 ? left : right;
            }
            BigInteger position = values.get(selected.getKey());
            if (position == null) {
                throw new IllegalStateException("Gate cache indexes diverged");
            }
            return new IndexedPosition(selected.getKey(), position);
        }

        synchronized void clear() {
            values.clear();
            sorted.clear();
        }
    }

    private static BigInteger bi(long value) {
        return BigInteger.valueOf(value);
    }

    private static BigInteger floorDiv(BigInteger numerator, BigInteger denominator) {
        if (denominator.signum() <= 0) {
            throw new IllegalArgumentException("floorDiv requires a positive denominator");
        }
        BigInteger[] result = numerator.divideAndRemainder(denominator);
        if (result[1].signum() < 0) {
            return result[0].subtract(ONE);
        }
        return result[0];
    }

    private static BigInteger keep(BigInteger value) {
        return value.subtract(ONE).mod(GREAT).add(ONE);
    }

    private static BigInteger square(BigInteger value) {
        return value.multiply(value);
    }

    private static BigInteger times(BigInteger value, long factor) {
        return value.multiply(bi(factor));
    }

    private static boolean isGregorianLeapYear(BigInteger year) {
        return year.mod(bi(4)).signum() == 0
            && (year.mod(bi(100)).signum() != 0 || year.mod(bi(400)).signum() == 0);
    }

    private static int gregorianMonthLength(BigInteger year, int month) {
        if (month == 2) {
            return isGregorianLeapYear(year) ? 29 : 28;
        }
        return month == 4 || month == 6 || month == 9 || month == 11 ? 30 : 31;
    }

    public static GregorianDate jdnToGregorian(BigInteger jdn) {
        BigInteger a = jdn.add(bi(32_044));
        BigInteger b = floorDiv(times(a, 4).add(bi(3)), bi(146_097));
        BigInteger c = a.subtract(floorDiv(times(b, 146_097), bi(4)));
        BigInteger d = floorDiv(times(c, 4).add(bi(3)), bi(1_461));
        BigInteger e = c.subtract(floorDiv(times(d, 1_461), bi(4)));
        BigInteger m = floorDiv(times(e, 5).add(TWO), bi(153));
        int day = e.subtract(floorDiv(times(m, 153).add(TWO), bi(5)))
            .add(ONE).intValueExact();
        int month = m.add(bi(3)).subtract(times(floorDiv(m, bi(10)), 12))
            .intValueExact();
        BigInteger year = times(b, 100).add(d).subtract(bi(4_800))
            .add(floorDiv(m, bi(10)));
        return new GregorianDate(year, month, day);
    }

    private static BigInteger[][] buildStones() {
        BigInteger[][] rows = new BigInteger[46][5];
        rows[0] = new BigInteger[]{bi(17), bi(29), bi(43), bi(71), bi(101)};
        for (int dropNumber = 2; dropNumber <= 46; ++dropNumber) {
            BigInteger[] old = rows[dropNumber - 2];
            rows[dropNumber - 1] = new BigInteger[]{
                keep(square(old[0]).add(times(old[1], 3)).add(bi(dropNumber))),
                keep(square(old[1]).add(times(old[2], 5)).add(old[0])),
                keep(square(old[2]).add(times(old[3], 7)).add(old[1])),
                keep(square(old[3]).add(times(old[4], 11)).add(old[2])),
                keep(square(old[4]).add(times(old[0], 13)).add(old[3]))
            };
        }
        return rows;
    }

    private static List<Checkpoint> buildCheckpoints() {
        List<Checkpoint> result = new ArrayList<>(CHECKPOINT_DATA.length);
        for (long[] row : CHECKPOINT_DATA) {
            result.add(new Checkpoint(bi(row[0]), bi(row[1])));
        }
        return List.copyOf(result);
    }

    private static BigInteger dayNumber(BigInteger jdn) {
        BigInteger delta = jdn.subtract(FOUNDATION_JDN);
        if (delta.signum() == 0) {
            return ONE;
        }
        return delta.signum() > 0
            ? times(delta, 2).add(ONE)
            : times(delta.negate(), 2);
    }

    private static int[] bowlPermutation(int rankOneBased) {
        if (rankOneBased < 1 || rankOneBased > 720) {
            throw new IllegalArgumentException("Bowl permutation rank must be in 1..720");
        }
        int rank = rankOneBased - 1;
        List<Integer> available = new ArrayList<>(List.of(0, 1, 2, 3, 4, 5));
        int[] result = new int[6];
        int[] factorial = {1, 1, 2, 6, 24, 120, 720};
        for (int position = 0; position < 6; ++position) {
            int block = factorial[5 - position];
            int index = rank / block;
            rank %= block;
            result[position] = available.remove(index);
        }
        return result;
    }

    private static SauceResult sauce(
        BigInteger calculationJdn,
        BigInteger targetJdn
    ) {
        BigInteger calculation = dayNumber(calculationJdn);
        BigInteger target = dayNumber(targetJdn);
        BigInteger distance = targetJdn.subtract(calculationJdn).abs().add(ONE);
        BigInteger addition = calculation.add(target);
        int direction = targetJdn.compareTo(calculationJdn) < 0
            ? 1
            : targetJdn.equals(calculationJdn) ? 2 : 3;

        BigInteger[] hidden = new BigInteger[7];
        for (int index = 0; index < HIDDEN_COEFFICIENTS.length; ++index) {
            int[] coefficients = HIDDEN_COEFFICIENTS[index];
            BigInteger[] stones = STONE_TABLE[index];
            BigInteger value = calculation
                .add(times(target, coefficients[0]))
                .add(times(distance, coefficients[1]))
                .add(times(addition, coefficients[2]))
                .add(bi((long) coefficients[3] * direction));
            for (BigInteger stone : stones) {
                value = value.add(stone);
            }
            value = keep(value);
            for (int round = 0; round < HIDDEN_STONE_ORDER.length; ++round) {
                value = keep(
                    square(value)
                        .add(times(value, 3))
                        .add(stones[HIDDEN_STONE_ORDER[round]])
                        .add(bi(round + 1L))
                );
            }
            hidden[index] = value;
        }

        BigInteger[] drops = new BigInteger[46];
        BigInteger[] bowls = new BigInteger[6];
        for (int index = 0; index < BOWL_PRIMES.length; ++index) {
            int bowlNumber = index + 1;
            int prime = BOWL_PRIMES[index];
            BigInteger value = calculation
                .add(times(target, bowlNumber))
                .add(distance)
                .add(addition)
                .add(bi(direction + (long) prime * prime));
            bowls[index] = keep(square(value).add(bi(bowlNumber)));
        }

        int[] lastDropPermutation = null;
        for (int dropIndex = 0; dropIndex < 46; ++dropIndex) {
            int dropNumber = dropIndex + 1;
            BigInteger[] stones = STONE_TABLE[dropIndex];
            BigInteger previous = prior(drops, hidden, dropNumber, 1);
            BigInteger third = prior(drops, hidden, dropNumber, 3);
            BigInteger seventh = prior(drops, hidden, dropNumber, 7);
            BigInteger value = stones[0].multiply(calculation)
                .add(stones[1].multiply(target))
                .add(stones[2].multiply(distance))
                .add(stones[3].multiply(addition))
                .add(times(stones[4], direction))
                .add(previous)
                .add(times(third, 3))
                .add(times(seventh, 5))
                .add(bi(dropNumber));
            value = keep(value);

            for (int[] row : GRIND_ROWS) {
                value = keep(
                    square(value)
                        .add(times(value, row[0]))
                        .add(times(previous, row[1]))
                        .add(times(third, row[2]))
                        .add(times(seventh, row[3]))
                        .add(stones[row[4]])
                );
            }
            drops[dropIndex] = value;

            int rank = value.subtract(ONE).mod(bi(720)).intValueExact() + 1;
            int[] order = bowlPermutation(rank);
            if (dropNumber == 46) {
                lastDropPermutation = order.clone();
            }

            BigInteger[] direct = new BigInteger[6];
            Arrays.fill(direct, ZERO);
            for (int place = 0; place < 3; ++place) {
                int bowlId = order[place];
                direct[bowlId] = keep(
                    square(value)
                        .add(stones[DIRECT_STONES[place]].multiply(bowls[bowlId]))
                        .add(bi((long) DIRECT_MULTIPLIERS[place] * dropNumber))
                );
            }

            BigInteger[] old = bowls;
            bowls = new BigInteger[6];
            for (int place = 0; place < 6; ++place) {
                int bowlId = order[place];
                int previousId = order[(place + 5) % 6];
                int nextId = order[(place + 1) % 6];
                BigInteger mixed = old[bowlId]
                    .add(times(old[previousId], 2))
                    .add(times(old[nextId], 3))
                    .add(direct[bowlId])
                    .add(value)
                    .add(stones[DROP_MIX_STONES[place]]);
                bowls[bowlId] = keep(
                    square(mixed)
                        .add(times(old[previousId].multiply(old[nextId]), 5))
                        .add(bi((long) dropNumber * (place + 1)))
                );
            }
        }

        if (lastDropPermutation == null) {
            throw new IllegalStateException("The 46th drop did not define a bowl order");
        }

        for (int roundNumber = 1; roundNumber <= 12; ++roundNumber) {
            BigInteger bowlSum = ZERO;
            for (BigInteger bowl : bowls) {
                bowlSum = bowlSum.add(bowl);
            }
            BigInteger orderNumber = keep(bowlSum.add(bi(149L * roundNumber)));
            int rank = orderNumber.subtract(ONE).mod(bi(720)).intValueExact() + 1;
            int[] order = bowlPermutation(rank);
            BigInteger[] old = bowls;
            bowls = new BigInteger[6];
            for (int place = 0; place < 6; ++place) {
                int bowlId = order[place];
                int previousId = order[(place + 5) % 6];
                int nextId = order[(place + 1) % 6];
                BigInteger mixed = old[bowlId]
                    .add(times(old[previousId], 3))
                    .add(times(old[nextId], 5))
                    .add(bowlSum)
                    .add(bi(roundNumber))
                    .add(bi((long) (place + 1) * (place + 1)));
                bowls[bowlId] = keep(
                    square(mixed)
                        .add(times(old[previousId].multiply(old[nextId]), 7))
                );
            }
        }
        return new SauceResult(bowls, lastDropPermutation);
    }

    private static BigInteger prior(
        BigInteger[] drops,
        BigInteger[] hidden,
        int dropNumber,
        int back
    ) {
        int wanted = dropNumber - back;
        return wanted >= 1 ? drops[wanted - 1] : hidden[back - dropNumber];
    }

    private static ResponseDescriptor responseDescriptor(
        SauceResult result,
        int bowlId,
        int seal
    ) {
        int place = -1;
        for (int index = 0; index < result.lastDropPermutation().length; ++index) {
            if (result.lastDropPermutation()[index] == bowlId) {
                place = index;
                break;
            }
        }
        if (place < 0) {
            throw new IllegalStateException("Bowl is absent from its permutation");
        }
        int nextBowlId = result.lastDropPermutation()[(place + 1) % 6];
        BigInteger firstBase = result.bowls()[bowlId].add(bi(seal + 181L));
        BigInteger first = keep(
            square(firstBase)
                .add(times(result.bowls()[nextBowlId], 179))
                .add(bi(seal))
        );
        BigInteger directionBase = first.add(bi(seal + 194L));
        BigInteger directionNumber = keep(
            square(directionBase)
                .add(times(first, 193))
                .add(times(result.bowls()[5], 197))
        );
        return new ResponseDescriptor(first, directionNumber.testBit(0) ? 1 : -1);
    }

    private static BigInteger responseAt(ResponseDescriptor descriptor, int offset) {
        return descriptor.first().subtract(ONE)
            .add(bi((long) descriptor.step() * offset))
            .mod(GREAT)
            .add(ONE);
    }

    private static BigInteger chooseUniform(
        SauceResult result,
        int bowlId,
        int seal,
        BigInteger count
    ) {
        if (count.signum() < 1) {
            throw new IllegalArgumentException("Choice count must be positive");
        }
        ResponseDescriptor descriptor = responseDescriptor(result, bowlId, seal);
        if (count.compareTo(GREAT) <= 0) {
            BigInteger limit = GREAT.subtract(GREAT.mod(count));
            BigInteger accepted = descriptor.first();
            if (accepted.compareTo(limit) > 0) {
                accepted = descriptor.step() > 0 ? ONE : limit;
            }
            return accepted.subtract(ONE).mod(count).add(ONE);
        }

        int width = 1;
        BigInteger space = GREAT;
        while (space.compareTo(count) < 0) {
            space = space.multiply(GREAT);
            ++width;
        }
        BigInteger value = ONE;
        BigInteger weight = ONE;
        for (int offset = 0; offset < width; ++offset) {
            value = value.add(responseAt(descriptor, offset).subtract(ONE).multiply(weight));
            weight = weight.multiply(GREAT);
        }
        BigInteger limit = space.subtract(space.mod(count));
        BigInteger accepted = value;
        if (accepted.compareTo(limit) > 0) {
            accepted = descriptor.step() > 0 ? ONE : limit;
        }
        return accepted.subtract(ONE).mod(count).add(ONE);
    }

    private static BigInteger chooseUniform(
        SauceResult result,
        int bowlId,
        int seal,
        int count
    ) {
        return chooseUniform(result, bowlId, seal, bi(count));
    }

    private static int gateDistance(BigInteger index) {
        if (index.signum() == 0) {
            throw new IllegalArgumentException("Gate-distance index may not be zero");
        }
        Integer cached = GATE_DISTANCE_CACHE.get(index);
        if (cached != null) {
            return cached;
        }
        SauceResult result = sauce(FOUNDATION_JDN, FOUNDATION_JDN.add(index));
        int distance = chooseUniform(result, 0, 1, 922).intValueExact() + 41;
        GATE_DISTANCE_CACHE.set(index, distance);
        return distance;
    }

    private static BigInteger gatePosition(BigInteger index) {
        BigInteger cached = GATE_POSITION_CACHE.get(index);
        if (cached != null) {
            return cached;
        }
        IndexedPosition nearest = GATE_POSITION_CACHE.nearest(index);
        BigInteger currentIndex = nearest.index();
        BigInteger position = nearest.position();
        if (currentIndex.compareTo(index) < 0) {
            while (currentIndex.compareTo(index) < 0) {
                BigInteger distanceIndex = currentIndex.signum() < 0
                    ? currentIndex
                    : currentIndex.add(ONE);
                position = position.add(bi(gateDistance(distanceIndex)));
                currentIndex = currentIndex.add(ONE);
                GATE_POSITION_CACHE.set(currentIndex, position);
            }
        } else {
            while (currentIndex.compareTo(index) > 0) {
                BigInteger distanceIndex = currentIndex.signum() > 0
                    ? currentIndex
                    : currentIndex.subtract(ONE);
                position = position.subtract(bi(gateDistance(distanceIndex)));
                currentIndex = currentIndex.subtract(ONE);
                GATE_POSITION_CACHE.set(currentIndex, position);
            }
        }
        return position;
    }

    private static BigInteger containingGateInterval(BigInteger jdn) {
        int low = 0;
        int high = CHECKPOINTS.size();
        while (low < high) {
            int middle = (low + high) >>> 1;
            if (CHECKPOINTS.get(middle).position().compareTo(jdn) < 0) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        BigInteger index;
        if (low == 0) {
            index = CHECKPOINTS.get(0).index();
        } else if (low == CHECKPOINTS.size()) {
            index = CHECKPOINTS.get(CHECKPOINTS.size() - 1).index();
        } else {
            index = CHECKPOINTS.get(low - 1).index();
        }

        BigInteger gate = gatePosition(index);
        if (gate.compareTo(jdn) >= 0) {
            while (gate.compareTo(jdn) >= 0) {
                index = index.subtract(ONE);
                gate = gatePosition(index);
            }
            return index;
        }
        while (gatePosition(index.add(ONE)).compareTo(jdn) < 0) {
            index = index.add(ONE);
        }
        return index;
    }

    private static Year makeYear(
        BigInteger number,
        BigInteger openIndex,
        BigInteger closeIndex
    ) {
        BigInteger opening = gatePosition(openIndex);
        BigInteger closing = gatePosition(closeIndex);
        return new Year(
            number,
            openIndex,
            closeIndex,
            opening.add(ONE),
            closing,
            closing.subtract(opening).intValueExact(),
            closeIndex.subtract(openIndex).intValueExact()
        );
    }

    private static List<Year5000Candidate> enumerateYear5000Candidates(
        BigInteger calculationJdn
    ) {
        BigInteger interval = containingGateInterval(calculationJdn);
        List<IndexedPosition> openings = new ArrayList<>();
        BigInteger index = interval;
        while (true) {
            BigInteger position = gatePosition(index);
            if (calculationJdn.subtract(position).compareTo(bi(MAX_YEAR_DAYS)) > 0) {
                break;
            }
            openings.add(new IndexedPosition(index, position));
            index = index.subtract(ONE);
        }

        List<IndexedPosition> closings = new ArrayList<>();
        index = interval.add(ONE);
        while (true) {
            BigInteger position = gatePosition(index);
            if (position.subtract(calculationJdn).compareTo(bi(MAX_YEAR_DAYS)) > 0) {
                break;
            }
            closings.add(new IndexedPosition(index, position));
            index = index.add(ONE);
        }

        List<Year5000Candidate> candidates = new ArrayList<>();
        for (IndexedPosition opening : openings) {
            for (IndexedPosition closing : closings) {
                int gaps = closing.index().subtract(opening.index()).intValueExact();
                int length = closing.position().subtract(opening.position()).intValueExact();
                if (
                    gaps >= MIN_YEAR_GAPS
                    && length >= MIN_YEAR_DAYS
                    && length <= MAX_YEAR_DAYS
                ) {
                    candidates.add(new Year5000Candidate(
                        opening.index(), closing.index(), length
                    ));
                }
            }
        }
        candidates.sort(
            Comparator.comparingInt(Year5000Candidate::length)
                .thenComparing(Year5000Candidate::openIndex)
        );
        return candidates;
    }

    private static List<YearCandidate> enumerateNextYears(BigInteger openIndex) {
        BigInteger opening = gatePosition(openIndex);
        List<YearCandidate> candidates = new ArrayList<>();
        BigInteger closeIndex = openIndex.add(bi(MIN_YEAR_GAPS));
        while (true) {
            int length = gatePosition(closeIndex).subtract(opening).intValueExact();
            if (length > MAX_YEAR_DAYS) {
                break;
            }
            if (length >= MIN_YEAR_DAYS) {
                candidates.add(new YearCandidate(closeIndex, length));
            }
            closeIndex = closeIndex.add(ONE);
        }
        candidates.sort(
            Comparator.comparingInt(YearCandidate::length)
                .thenComparing(YearCandidate::index)
        );
        return candidates;
    }

    private static List<YearCandidate> enumeratePreviousYears(BigInteger closeIndex) {
        BigInteger closing = gatePosition(closeIndex);
        List<YearCandidate> candidates = new ArrayList<>();
        BigInteger openIndex = closeIndex.subtract(bi(MIN_YEAR_GAPS));
        while (true) {
            int length = closing.subtract(gatePosition(openIndex)).intValueExact();
            if (length > MAX_YEAR_DAYS) {
                break;
            }
            if (length >= MIN_YEAR_DAYS) {
                candidates.add(new YearCandidate(openIndex, length));
            }
            openIndex = openIndex.subtract(ONE);
        }
        candidates.sort(
            Comparator.comparingInt(YearCandidate::length)
                .thenComparing(YearCandidate::index)
        );
        return candidates;
    }

    private static BigInteger binomial(int n, int k) {
        if (n < 0 || k < 0 || k > n) {
            return ZERO;
        }
        int selected = Math.min(k, n - k);
        BigInteger result = ONE;
        for (int value = 1; value <= selected; ++value) {
            result = result.multiply(bi(n - selected + (long) value)).divide(bi(value));
        }
        return result;
    }

    private static BigInteger permutationCount(int n, int k) {
        if (k < 0 || k > n) {
            return ZERO;
        }
        BigInteger result = ONE;
        for (int value = n - k + 1; value <= n; ++value) {
            result = result.multiply(bi(value));
        }
        return result;
    }

    private static String[] unrankPermutationNames(
        String[] names,
        int count,
        BigInteger rankOneBased
    ) {
        List<String> available = new ArrayList<>(Arrays.asList(names));
        String[] result = new String[count];
        BigInteger rank = rankOneBased.subtract(ONE);
        for (int position = 0; position < count; ++position) {
            BigInteger block = permutationCount(
                available.size() - 1, count - position - 1
            );
            BigInteger[] quotient = block.signum() == 0
                ? new BigInteger[]{ZERO, ZERO}
                : rank.divideAndRemainder(block);
            int index = quotient[0].intValueExact();
            rank = quotient[1];
            result[position] = available.remove(index);
        }
        return result;
    }

    private static BigInteger compositionSuffixCount(
        int remaining,
        int parts,
        Integer mandatoryOffset
    ) {
        if (parts == 0) {
            return remaining == 0 && (mandatoryOffset == null || mandatoryOffset == 0)
                ? ONE : ZERO;
        }
        if (remaining < parts) {
            return ZERO;
        }
        if (mandatoryOffset == null || mandatoryOffset == 0) {
            return binomial(remaining - 1, parts - 1);
        }
        if (mandatoryOffset <= 0 || mandatoryOffset >= remaining || parts < 2) {
            return ZERO;
        }
        return binomial(remaining - 2, parts - 2);
    }

    private static int[] unrankComposition(
        int total,
        int parts,
        Integer mandatoryCut,
        BigInteger rankOneBased
    ) {
        int[] result = new int[parts];
        int remaining = total;
        int cumulative = 0;
        BigInteger rank = rankOneBased;
        boolean hit = mandatoryCut == null;
        for (int position = 0; position < parts; ++position) {
            int left = parts - position - 1;
            boolean selected = false;
            for (int value = 1; value <= remaining - left; ++value) {
                int after = remaining - value;
                int newCumulative = cumulative + value;
                boolean newHit = hit || (mandatoryCut != null && newCumulative == mandatoryCut);
                Integer mandatoryOffset = null;
                if (!newHit) {
                    if (mandatoryCut == null || mandatoryCut < newCumulative) {
                        continue;
                    }
                    mandatoryOffset = mandatoryCut - newCumulative;
                }
                BigInteger block = compositionSuffixCount(
                    after, left, newHit ? null : mandatoryOffset
                );
                if (rank.compareTo(block) > 0) {
                    rank = rank.subtract(block);
                    continue;
                }
                result[position] = value;
                remaining = after;
                cumulative = newCumulative;
                hit = newHit;
                selected = true;
                break;
            }
            if (!selected) {
                throw new IllegalStateException("Composition unranking exhausted its branches");
            }
        }
        return result;
    }

    private static BigInteger boundedMonthLengthCount(int total, int parts) {
        int shifted = total - 4 * parts;
        if (shifted < 0 || shifted > 119 * parts) {
            return ZERO;
        }
        BigInteger answer = ZERO;
        int maximumExcluded = Math.min(parts, shifted / 120);
        for (int excluded = 0; excluded <= maximumExcluded; ++excluded) {
            BigInteger ways = binomial(parts, excluded).multiply(
                binomial(shifted - 120 * excluded + parts - 1, parts - 1)
            );
            answer = (excluded & 1) == 0 ? answer.add(ways) : answer.subtract(ways);
        }
        return answer;
    }

    private static int[] unrankMonthLengths(
        int total,
        int parts,
        BigInteger rankOneBased
    ) {
        int[] result = new int[parts];
        int remaining = total;
        BigInteger rank = rankOneBased;
        Map<Long, BigInteger> memo = new HashMap<>();
        for (int position = 0; position < parts; ++position) {
            int left = parts - position - 1;
            boolean selected = false;
            int maximum = Math.min(123, remaining - 4 * left);
            for (int value = 4; value <= maximum; ++value) {
                int after = remaining - value;
                BigInteger block;
                if (left == 0) {
                    block = after == 0 ? ONE : ZERO;
                } else {
                    long key = ((long) after << 32) ^ (left & 0xffffffffL);
                    block = memo.computeIfAbsent(
                        key, ignored -> boundedMonthLengthCount(after, left)
                    );
                }
                if (rank.compareTo(block) > 0) {
                    rank = rank.subtract(block);
                    continue;
                }
                result[position] = value;
                remaining = after;
                selected = true;
                break;
            }
            if (!selected) {
                throw new IllegalStateException("Month-length unranking exhausted branches");
            }
        }
        return result;
    }

    private static final class InterleavingCounter {
        private final int[] lengths;
        private final Map<Integer, BigInteger[]> cache = new HashMap<>();

        InterleavingCounter(int[] lengths) {
            this.lengths = lengths.clone();
        }

        BigInteger get(int lastSeen, int q) {
            int last = lengths.length - 1;
            if (lastSeen >= last) {
                return ONE;
            }
            BigInteger[] cached = cache.get(lastSeen);
            if (cached != null && cached.length > q) {
                return cached[q];
            }
            rebuild(lastSeen, q);
            return cache.get(lastSeen)[q];
        }

        private void rebuild(int start, int qStart) {
            int monthCount = lengths.length;
            int[] needed = new int[monthCount];
            needed[start] = qStart;
            for (int index = start; index < monthCount - 1; ++index) {
                needed[index + 1] = needed[index] + lengths[index + 1] - 1;
            }

            BigInteger[] following = null;
            cache.clear();
            for (int index = monthCount - 1; index >= start; --index) {
                int qMaximum = needed[index];
                BigInteger[] current = new BigInteger[qMaximum + 1];
                if (index == monthCount - 1) {
                    Arrays.fill(current, ONE);
                } else {
                    if (following == null) {
                        throw new IllegalStateException("Missing DP suffix");
                    }
                    Arrays.fill(current, ZERO);
                    int monthLength = lengths[index + 1];
                    BigInteger cumulative = ZERO;
                    BigInteger weight = ONE;
                    for (int q = 1; q <= qMaximum; ++q) {
                        int r = q - 1;
                        cumulative = cumulative.add(
                            weight.multiply(following[monthLength + r])
                        );
                        current[q] = cumulative;
                        weight = weight.multiply(bi(monthLength + r - 1L)).divide(bi(r + 1L));
                    }
                }
                following = current;
                if (index <= start + 7) {
                    cache.put(index, current);
                }
            }
        }
    }

    private static BigInteger interleavingCount(int[] lengths) {
        return new InterleavingCounter(lengths).get(0, lengths[0]);
    }

    private static int[] unrankMonthInterleaving(
        int[] lengths,
        BigInteger rankOneBased
    ) {
        int monthCount = lengths.length;
        int totalLength = Arrays.stream(lengths).sum();
        InterleavingCounter counter = new InterleavingCounter(lengths);
        int[] weave = new int[totalLength];
        int[] remaining = lengths.clone();
        --remaining[0];
        int low = 0;
        int high = 0;
        int activeTotal = remaining[0];
        BigInteger baseCount = ONE;
        BigInteger rank = rankOneBased;

        BigInteger expectedTotal = counter.get(0, activeTotal + 1);
        if (rank.compareTo(ONE) < 0 || rank.compareTo(expectedTotal) > 0) {
            throw new IllegalArgumentException("Interleaving rank is outside its range");
        }

        for (int position = 1; position < totalLength; ++position) {
            int span = high - low + 1;
            int[] prefix = new int[span];
            int running = 0;
            for (int index = low; index <= high; ++index) {
                running += remaining[index];
                prefix[index - low] = running;
            }

            BigInteger[] suffixP = new BigInteger[span + 1];
            BigInteger[] suffixPm1 = new BigInteger[span + 1];
            Arrays.fill(suffixP, ONE);
            Arrays.fill(suffixPm1, ONE);
            for (int offset = span - 1; offset >= 0; --offset) {
                suffixP[offset] = suffixP[offset + 1].multiply(bi(prefix[offset]));
                suffixPm1[offset] = suffixPm1[offset + 1]
                    .multiply(bi(prefix[offset] - 1L));
            }

            BigInteger futureSame = high < monthCount - 1
                ? counter.get(high, activeTotal)
                : ONE;
            boolean selected = false;
            for (int month = low; month <= high; ++month) {
                int remainingForMonth = remaining[month];
                if (remainingForMonth == 1 && month != low) {
                    continue;
                }
                int offset = month - low;
                BigInteger numerator;
                BigInteger denominator;
                if (remainingForMonth > 1) {
                    numerator = bi(remainingForMonth - 1L).multiply(suffixP[offset]);
                    denominator = bi(activeTotal).multiply(suffixPm1[offset]);
                } else {
                    numerator = suffixP[offset + 1];
                    denominator = bi(activeTotal).multiply(suffixPm1[offset + 1]);
                }
                BigInteger nextBaseCount = baseCount.multiply(numerator).divide(denominator);
                BigInteger block = nextBaseCount.multiply(futureSame);
                if (rank.compareTo(block) > 0) {
                    rank = rank.subtract(block);
                    continue;
                }
                weave[position] = month;
                --remaining[month];
                --activeTotal;
                baseCount = nextBaseCount;
                if (remaining[month] == 0) {
                    ++low;
                }
                selected = true;
                break;
            }
            if (selected) {
                continue;
            }

            if (high + 1 >= monthCount) {
                throw new IllegalStateException("Interleaving exhausted valid branches");
            }
            int month = high + 1;
            int newRemaining = lengths[month] - 1;
            BigInteger nextBaseCount = baseCount.multiply(
                binomial(activeTotal + newRemaining - 1, newRemaining - 1)
            );
            int nextActiveTotal = activeTotal + newRemaining;
            BigInteger future = month < monthCount - 1
                ? counter.get(month, nextActiveTotal + 1)
                : ONE;
            BigInteger block = nextBaseCount.multiply(future);
            if (rank.compareTo(block) > 0) {
                throw new IllegalStateException("Rank exceeded final lexicographic branch");
            }
            weave[position] = month;
            high = month;
            --remaining[month];
            if (low > month - 1) {
                low = month;
            }
            activeTotal = nextActiveTotal;
            baseCount = nextBaseCount;
        }
        return weave;
    }

    private static YearStructure buildYearStructure(CalculationState state, Year year) {
        SauceResult result = state.getSauce(year.startJdn());
        int maximumCutlets = Math.min(17, year.gaps());
        int cutletCount = 6 + chooseUniform(
            result, 1, 20, maximumCutlets - 5
        ).intValueExact() - 1;

        Integer mandatoryCut = null;
        if (
            year.startJdn().compareTo(state.calculationJdn) <= 0
            && state.calculationJdn.compareTo(year.endJdn()) <= 0
        ) {
            for (
                BigInteger gateIndex = year.openIndex().add(ONE);
                gateIndex.compareTo(year.closeIndex()) < 0;
                gateIndex = gateIndex.add(ONE)
            ) {
                if (gatePosition(gateIndex).equals(state.calculationJdn)) {
                    mandatoryCut = gateIndex.subtract(year.openIndex()).intValueExact();
                    break;
                }
            }
        }

        BigInteger partitionCount = mandatoryCut == null
            ? binomial(year.gaps() - 1, cutletCount - 1)
            : binomial(year.gaps() - 2, cutletCount - 2);
        int[] cutletGaps = unrankComposition(
            year.gaps(),
            cutletCount,
            mandatoryCut,
            chooseUniform(result, 1, 21, partitionCount)
        );

        BigInteger cutletNameWays = permutationCount(CUTLET_NAMES.length, cutletCount);
        String[] cutletNames = unrankPermutationNames(
            CUTLET_NAMES,
            cutletCount,
            chooseUniform(result, 4, 22, cutletNameWays)
        );

        int minimumMonths = (year.length() + 122) / 123;
        int maximumMonths = Math.min(47, year.length() / 4);
        int monthCount = minimumMonths + chooseUniform(
            result, 2, 30, maximumMonths - minimumMonths + 1
        ).intValueExact() - 1;

        BigInteger monthLengthWays = boundedMonthLengthCount(year.length(), monthCount);
        int[] monthLengths = unrankMonthLengths(
            year.length(),
            monthCount,
            chooseUniform(result, 2, 31, monthLengthWays)
        );

        BigInteger weaveWays = interleavingCount(monthLengths);
        int[] monthWeave = unrankMonthInterleaving(
            monthLengths, chooseUniform(result, 3, 32, weaveWays)
        );

        BigInteger monthNameWays = permutationCount(MONTH_NAMES.length, monthCount);
        String[] monthNames = unrankPermutationNames(
            MONTH_NAMES,
            monthCount,
            chooseUniform(result, 4, 33, monthNameWays)
        );

        int[] seen = new int[monthCount];
        int[] dayInMonth = new int[monthWeave.length];
        for (int index = 0; index < monthWeave.length; ++index) {
            int month = monthWeave[index];
            dayInMonth[index] = ++seen[month];
        }

        int[] cutletStarts = new int[cutletCount];
        int[] cutletEnds = new int[cutletCount];
        int gapOffset = 0;
        int dayOffset = 0;
        for (int index = 0; index < cutletCount; ++index) {
            cutletStarts[index] = dayOffset;
            gapOffset += cutletGaps[index];
            BigInteger endJdn = gatePosition(year.openIndex().add(bi(gapOffset)));
            dayOffset = endJdn.subtract(year.startJdn()).intValueExact() + 1;
            cutletEnds[index] = dayOffset - 1;
        }

        return new YearStructure(
            cutletCount,
            cutletGaps,
            cutletNames,
            cutletStarts,
            cutletEnds,
            monthCount,
            monthLengths,
            monthNames,
            monthWeave,
            dayInMonth
        );
    }

    private static int findCutlet(YearStructure structure, int offset) {
        int low = 0;
        int high = structure.cutletCount - 1;
        while (low <= high) {
            int middle = (low + high) >>> 1;
            if (offset < structure.cutletStartOffsets[middle]) {
                high = middle - 1;
            } else if (offset > structure.cutletEndOffsets[middle]) {
                low = middle + 1;
            } else {
                return middle;
            }
        }
        throw new IllegalStateException("Day offset is not contained in a cutlet");
    }

    private static PastafariDate materialize(
        Year year,
        YearStructure structure,
        BigInteger targetJdn
    ) {
        int offset = targetJdn.subtract(year.startJdn()).intValueExact();
        int cutlet = findCutlet(structure, offset);
        int month = structure.monthWeave[offset];
        return new PastafariDate(
            year.number(),
            structure.cutletNames[cutlet],
            offset - structure.cutletStartOffsets[cutlet] + 1,
            structure.monthNames[month],
            structure.dayInMonth[offset]
        );
    }

    private static final class CalculationState {
        private final BigInteger calculationJdn;
        private final LruCache<BigInteger, SauceResult> sauces = new LruCache<>(64);
        private final LruCache<YearKey, YearStructure> structures = new LruCache<>(8);
        private final Map<BigInteger, Year> years = new HashMap<>();
        private Year year5000;

        CalculationState(BigInteger calculationJdn) {
            this.calculationJdn = calculationJdn;
        }

        SauceResult getSauce(BigInteger targetJdn) {
            SauceResult cached = sauces.get(targetJdn);
            if (cached != null) {
                return cached;
            }
            SauceResult value = sauce(calculationJdn, targetJdn);
            sauces.set(targetJdn, value);
            return value;
        }

        Year getYear5000() {
            if (year5000 != null) {
                return year5000;
            }
            List<Year5000Candidate> candidates =
                enumerateYear5000Candidates(calculationJdn);
            if (candidates.isEmpty()) {
                throw new IllegalStateException("No valid year-5000 candidate exists");
            }
            int choice = chooseUniform(
                getSauce(calculationJdn), 0, 10, candidates.size()
            ).intValueExact();
            Year5000Candidate selected = candidates.get(choice - 1);
            year5000 = makeYear(bi(5_000), selected.openIndex(), selected.closeIndex());
            years.put(bi(5_000), year5000);
            return year5000;
        }

        Year nextYear(Year year) {
            BigInteger number = year.number().add(ONE);
            Year cached = years.get(number);
            if (cached != null) {
                return cached;
            }
            List<YearCandidate> candidates = enumerateNextYears(year.closeIndex());
            SauceResult result = getSauce(gatePosition(year.closeIndex()));
            int choice = chooseUniform(result, 0, 11, candidates.size()).intValueExact();
            YearCandidate candidate = candidates.get(choice - 1);
            Year selected = makeYear(number, year.closeIndex(), candidate.index());
            years.put(number, selected);
            return selected;
        }

        Year previousYear(Year year) {
            BigInteger number = year.number().subtract(ONE);
            Year cached = years.get(number);
            if (cached != null) {
                return cached;
            }
            List<YearCandidate> candidates = enumeratePreviousYears(year.openIndex());
            SauceResult result = getSauce(gatePosition(year.openIndex()));
            int choice = chooseUniform(result, 0, 12, candidates.size()).intValueExact();
            YearCandidate candidate = candidates.get(choice - 1);
            Year selected = makeYear(number, candidate.index(), year.openIndex());
            years.put(number, selected);
            return selected;
        }

        Year findYear(BigInteger targetJdn) {
            Year year = getYear5000();
            if (targetJdn.compareTo(year.startJdn()) < 0) {
                while (targetJdn.compareTo(year.startJdn()) < 0) {
                    year = previousYear(year);
                }
            } else {
                while (targetJdn.compareTo(year.endJdn()) > 0) {
                    year = nextYear(year);
                }
            }
            return year;
        }

        YearStructure getStructure(Year year) {
            YearKey key = new YearKey(year.openIndex(), year.closeIndex());
            YearStructure cached = structures.get(key);
            if (cached != null) {
                return cached;
            }
            YearStructure value = buildYearStructure(this, year);
            structures.set(key, value);
            return value;
        }

        PastafariDate convert(BigInteger targetJdn) {
            Year year = findYear(targetJdn);
            return materialize(year, getStructure(year), targetJdn);
        }
    }

    private static String jsonEscape(String value) {
        StringBuilder result = new StringBuilder(value.length() + 8);
        for (int index = 0; index < value.length(); ++index) {
            char character = value.charAt(index);
            switch (character) {
                case '\\' -> result.append("\\\\");
                case '"' -> result.append("\\\"");
                case '\n' -> result.append("\\n");
                case '\r' -> result.append("\\r");
                case '\t' -> result.append("\\t");
                default -> result.append(character);
            }
        }
        return result.toString();
    }

    private static final CanonicalVector[] CANONICAL_VECTORS = {
        new CanonicalVector("foundation_same", "-13334246", "-13334246", "{\"year\":\"5000\",\"cutletName\":\"עקרב\",\"dayInCutlet\":503,\"monthName\":\"באר\",\"dayInMonth\":56}"),
        new CanonicalVector("foundation_next", "-13334246", "-13334245", "{\"year\":\"5000\",\"cutletName\":\"צחוק\",\"dayInCutlet\":1,\"monthName\":\"צפרדע\",\"dayInMonth\":38}"),
        new CanonicalVector("foundation_previous", "-13334246", "-13334247", "{\"year\":\"5000\",\"cutletName\":\"עקרב\",\"dayInCutlet\":502,\"monthName\":\"הדלת הסגורה\",\"dayInMonth\":21}"),
        new CanonicalVector("present_same", "2461259", "2461259", "{\"year\":\"5000\",\"cutletName\":\"כליה\",\"dayInCutlet\":306,\"monthName\":\"לשון\",\"dayInMonth\":23}"),
        new CanonicalVector("present_forward", "2461259", "2461265", "{\"year\":\"5000\",\"cutletName\":\"כליה\",\"dayInCutlet\":312,\"monthName\":\"סערה\",\"dayInMonth\":33}"),
        new CanonicalVector("binding_5778_same", "-14269936", "-14269936", "{\"year\":\"5000\",\"cutletName\":\"מחשבה\",\"dayInCutlet\":1,\"monthName\":\"ארידו\",\"dayInMonth\":93}")
    };

    private static void runCanonicalVectors() {
        PastafariCalendar calendar = new PastafariCalendar();
        int checked = 0;
        for (CanonicalVector vector : CANONICAL_VECTORS) {
            String actual = calendar.convertJdn(
                new BigInteger(vector.calculationJdn()),
                new BigInteger(vector.targetJdn())
            ).json();
            if (!actual.equals(vector.expected())) {
                throw new AssertionError(
                    "Java canonical mismatch for " + vector.id()
                    + "\nexpected: " + vector.expected()
                    + "\nactual:   " + actual
                );
            }
            ++checked;
        }
        System.out.println("Java canonical: " + checked + "/" + checked + " vectors passed");
    }

    private static void require(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError(message);
        }
    }

    private static void runSemanticsTests() {
        int checked = 0;
        require(floorDiv(bi(-7), bi(3)).equals(bi(-3)), "floorDiv(-7,3)");
        ++checked;
        require(floorDiv(bi(-6), bi(3)).equals(bi(-2)), "floorDiv(-6,3)");
        ++checked;
        require(floorDiv(bi(7), bi(3)).equals(bi(2)), "floorDiv(7,3)");
        ++checked;
        require(keep(ZERO).equals(GREAT), "saved remainder maps zero to GREAT");
        ++checked;
        require(keep(GREAT.add(ONE)).equals(ONE), "saved remainder wraps to one");
        ++checked;
        require(GREAT.bitLength() == 127, "great number bit length");
        ++checked;

        String[] roundTrips = {
            "-100000-03-01", "-43782-02-21", "-41221-12-22",
            "-0001-12-31", "0000-02-29", "2000-02-29", "100000-12-31"
        };
        for (String text : roundTrips) {
            GregorianDate value = GregorianDate.parse(text);
            require(
                jdnToGregorian(value.toJdn()).equals(value),
                "Gregorian/JDN round trip for " + text
            );
            ++checked;
        }

        BigInteger largeBinomial = binomial(5_778, 46);
        require(largeBinomial.signum() > 0, "large binomial must be positive");
        ++checked;
        require(
            largeBinomial.equals(binomial(5_778, 5_732)),
            "binomial symmetry must be exact"
        );
        ++checked;
        for (String name : CUTLET_NAMES) {
            require(Normalizer.isNormalized(name, Normalizer.Form.NFC), "cutlet NFC");
        }
        ++checked;
        for (String name : MONTH_NAMES) {
            require(Normalizer.isNormalized(name, Normalizer.Form.NFC), "month NFC");
        }
        ++checked;
        System.out.println("Java semantics: " + checked + "/" + checked + " checks passed");
    }

    private static int runCorpusGroup(List<CorpusRow> rows) {
        PastafariCalendar calendar = new PastafariCalendar();
        int checked = 0;
        for (CorpusRow row : rows) {
            String actual = calendar.convertJdn(row.calculation(), row.target()).json();
            if (!actual.equals(row.expected())) {
                throw new AssertionError(
                    "Java differential mismatch for target " + row.target()
                    + " and calculation " + row.calculation()
                    + "\nexpected: " + row.expected()
                    + "\nactual:   " + actual
                );
            }
            ++checked;
        }
        return checked;
    }

    private static void runDifferential(Path corpus) throws IOException, InterruptedException {
        List<List<CorpusRow>> groups = new ArrayList<>();
        List<CorpusRow> current = null;
        BigInteger currentCalculation = null;
        try (BufferedReader input = Files.newBufferedReader(corpus, StandardCharsets.UTF_8)) {
            String line;
            while ((line = input.readLine()) != null) {
                if (line.isBlank() || line.startsWith("#")) {
                    continue;
                }
                String[] fields = line.split("\\t", 3);
                if (fields.length != 3) {
                    throw new IllegalArgumentException("Malformed differential corpus row");
                }
                BigInteger target = new BigInteger(fields[0]);
                BigInteger calculation = new BigInteger(fields[1]);
                if (!calculation.equals(currentCalculation)) {
                    current = new ArrayList<>();
                    groups.add(current);
                    currentCalculation = calculation;
                }
                current.add(new CorpusRow(target, calculation, fields[2]));
            }
        }
        if (groups.size() != 40) {
            throw new IllegalStateException(
                "Expected 40 calculation groups, read " + groups.size()
            );
        }

        int workerCount = Math.min(
            8,
            Math.min(Runtime.getRuntime().availableProcessors(), groups.size())
        );
        ExecutorService executor = Executors.newFixedThreadPool(Math.max(1, workerCount));
        try {
            List<Callable<Integer>> tasks = new ArrayList<>();
            for (List<CorpusRow> group : groups) {
                tasks.add(() -> runCorpusGroup(group));
            }
            int checked = 0;
            for (Future<Integer> future : executor.invokeAll(tasks)) {
                try {
                    checked += future.get();
                } catch (ExecutionException error) {
                    Throwable cause = error.getCause();
                    if (cause instanceof RuntimeException runtime) {
                        throw runtime;
                    }
                    if (cause instanceof Error fatal) {
                        throw fatal;
                    }
                    throw new IllegalStateException("Differential worker failed", cause);
                }
            }
            if (checked != 10_000) {
                throw new IllegalStateException(
                    "Expected 10000 corpus rows, checked " + checked
                );
            }
            System.out.println(
                "Java differential: " + checked + "/" + checked + " vectors passed"
            );
        } finally {
            executor.shutdownNow();
        }
    }

    private static void usage() {
        System.err.println(
            "usage:\n"
            + "  java PastafariCalendar.java CALCULATION TARGET\n"
            + "  java PastafariCalendar.java --jdn CALCULATION_JDN TARGET_JDN\n"
            + "  java PastafariCalendar.java --self-test\n"
            + "  java PastafariCalendar.java --differential CORPUS.tsv"
        );
    }

    /** Source-launchable CLI and dependency-free test entry point. */
    public static void main(String[] arguments) {
        System.setOut(new java.io.PrintStream(System.out, true, StandardCharsets.UTF_8));
        try {
            if (arguments.length == 1 && arguments[0].equals("--self-test")) {
                runSemanticsTests();
                runCanonicalVectors();
                return;
            }
            if (arguments.length == 2 && arguments[0].equals("--differential")) {
                runDifferential(Path.of(arguments[1]));
                return;
            }
            PastafariCalendar calendar = new PastafariCalendar();
            if (arguments.length == 3 && arguments[0].equals("--jdn")) {
                System.out.println(calendar.convertJdn(
                    new BigInteger(arguments[1]), new BigInteger(arguments[2])
                ).json());
                return;
            }
            if (arguments.length == 2) {
                System.out.println(calendar.convertIso(arguments[0], arguments[1]).json());
                return;
            }
            usage();
            System.exit(2);
        } catch (IllegalArgumentException | IllegalStateException error) {
            System.err.println("pastafari-calendar: " + error.getMessage());
            System.exit(2);
        } catch (IOException error) {
            System.err.println("pastafari-calendar: I/O error: " + error.getMessage());
            System.exit(2);
        } catch (InterruptedException error) {
            Thread.currentThread().interrupt();
            System.err.println("pastafari-calendar: interrupted");
            System.exit(130);
        }
    }

    public PastafariCalendar() {}
}
