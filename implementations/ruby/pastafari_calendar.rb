# frozen_string_literal: true
# encoding: UTF-8

# Independent Ruby implementation of the Pastafari Calendar algorithm.
# No FFI, native extension, subprocess, shared library, network, or JavaScript
# engine is used. Ruby Integer provides arbitrary-precision exact arithmetic.

module Pastafari
  GREAT = (1 << 127) - 1
  FOUNDATION_JDN = -13_334_246
  ALGORITHM_ID = 'PASTAFARI-SCROLL-2026-08-16-D36B0C94'
  NORMATIVE_SOURCE_SHA256 = 'd36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96'

  MIN_GATE_DISTANCE = 42
  MAX_GATE_DISTANCE = 963
  MIN_YEAR_DAYS = 252
  MAX_YEAR_DAYS = 5_778
  MIN_YEAR_GAPS = 6

  CUTLET_NAMES = [
    'ארד', 'שועל', 'כליה', 'לגש', 'מחשבה', 'ארבעה חלקים מתשעה',
    'פַּלְגּוּרַשׁ', 'גומא', 'אשכול', 'עקרב', 'אפר', 'חיטה', 'נהר',
    'צחוק', 'אכד', 'קרן', 'הכד הריק'
  ].freeze

  MONTH_NAMES = [
    'טין', 'רימון', 'מרפק', 'קנאה', 'ארידו', 'משחת־שיניים',
    'שלושה חלקים מחמישה', 'כַּרְשׁוּמַב', 'נמר', 'בדיל', 'ערפל', 'לבונה',
    'כישור', 'צלע', 'חרוב', 'אורוק', 'בושה', 'גמל', 'נחושת', 'באר',
    'חלמון', 'כוכב', 'דבש', 'טחול', 'אבן־גיר', 'שמחה', 'תאנה', 'נינוה',
    'צפרדע', 'זפת', 'נר', 'הדלת הסגורה', 'שומשום', 'עורף', 'כסף', 'שושן',
    'סערה', 'חמור', 'קמח', 'חרטה', 'בבל', 'לשון', 'פשתן', 'מלח', 'אגס',
    'קשת', 'חול'
  ].freeze

  GRIND_ROWS = [
    [3, 5, 7, 11, 0], [5, 7, 11, 13, 1], [7, 11, 13, 17, 2],
    [11, 13, 17, 19, 3], [13, 17, 19, 23, 4], [17, 19, 23, 29, 0],
    [19, 23, 29, 31, 1], [23, 29, 31, 37, 2], [29, 31, 37, 41, 3],
    [31, 37, 41, 43, 4], [37, 41, 43, 47, 0]
  ].freeze

  HIDDEN_COEFFICIENTS = [
    [3, 4, 6, 8], [5, 7, 10, 12], [7, 10, 14, 16], [9, 13, 18, 20],
    [11, 16, 22, 24], [13, 19, 26, 28], [15, 22, 30, 32]
  ].freeze
  HIDDEN_STONE_ORDER = [0, 1, 2, 3, 4, 0, 1].freeze
  BOWL_PRIMES = [17, 19, 23, 29, 31, 37].freeze
  DIRECT_MULTIPLIERS = [3, 5, 7].freeze
  DIRECT_STONES = [0, 1, 2].freeze
  DROP_MIX_STONES = [0, 1, 2, 3, 4, 0].freeze

  class Error < StandardError; end
  class InvalidInputError < Error; end
  class InternalInvariantError < Error; end

  def self.lower_bound(array, value)
    low = 0
    high = array.length
    while low < high
      middle = (low + high) / 2
      if array[middle] < value
        low = middle + 1
      else
        high = middle
      end
    end
    low
  end

  class LruCache
    def initialize(limit)
      raise ArgumentError, 'LRU limit must be positive' if limit < 1
      @limit = limit
      @items = {}
    end

    def get(key)
      return nil unless @items.key?(key)
      value = @items.delete(key)
      @items[key] = value
      value
    end

    def set(key, value)
      @items.delete(key)
      @items[key] = value
      @items.shift while @items.length > @limit
      value
    end

    def clear
      @items.clear
    end
  end

  class GatePositionCache
    def initialize(limit)
      @limit = limit
      @items = {}
      @keys = []
    end

    def get(index)
      return nil unless @items.key?(index)
      value = @items.delete(index)
      @items[index] = value
      value
    end

    def set(index, value)
      unless @items.key?(index)
        pos = Pastafari.lower_bound(@keys, index)
        @keys.insert(pos, index)
      end
      @items.delete(index)
      @items[index] = value
      while @items.length > @limit
        evicted, = @items.shift
        pos = Pastafari.lower_bound(@keys, evicted)
        @keys.delete_at(pos) if pos < @keys.length && @keys[pos] == evicted
      end
      value
    end

    def nearest(index)
      raise InternalInvariantError, 'Gate-position cache is empty' if @keys.empty?
      pos = Pastafari.lower_bound(@keys, index)
      selected = if pos.zero?
                   @keys[0]
                 elsif pos == @keys.length
                   @keys[-1]
                 else
                   right = @keys[pos]
                   left = @keys[pos - 1]
                   index - left <= right - index ? left : right
                 end
      value = get(selected)
      raise InternalInvariantError, 'Sorted gate key is absent from LRU storage' if value.nil?
      [selected, value]
    end

    def clear
      @items.clear
      @keys.clear
    end
  end

  def self.keep(value)
    ((value - 1) % GREAT) + 1
  end

  def self.binomial(n, k)
    return 0 if n < 0 || k < 0 || k > n
    k = [k, n - k].min
    answer = 1
    1.upto(k) { |i| answer = (answer * (n - k + i)) / i }
    answer
  end

  def self.permutation_count(n, k)
    return 0 if k < 0 || k > n
    answer = 1
    (n - k + 1).upto(n) { |value| answer *= value } if k.positive?
    answer
  end

  GregorianDate = Struct.new(:year, :month, :day, keyword_init: true) do
    def initialize(year:, month:, day:)
      super
      raise InvalidInputError, 'Gregorian month must be in 1..12' unless (1..12).cover?(month)
      maximum = Pastafari.gregorian_month_length(year, month)
      raise InvalidInputError, "Gregorian day must be in 1..#{maximum} for this month" unless (1..maximum).cover?(day)
      freeze
    end

    def self.parse(value)
      text = value.to_s.strip
      match = /\A([+-]?\d+)-(\d{2})-(\d{2})\z/.match(text)
      raise InvalidInputError, 'Date must use [+-]YYYY-MM-DD' unless match
      new(year: Integer(match[1], 10), month: Integer(match[2], 10), day: Integer(match[3], 10))
    end


    def isoformat
      sign = year.negative? ? '-' : ''
      digits = year.abs.to_s.rjust(4, '0')
      format('%s%s-%02d-%02d', sign, digits, month, day)
    end
  end

  def self.is_gregorian_leap_year(year)
    (year % 4).zero? && (!(year % 100).zero? || (year % 400).zero?)
  end

  def self.gregorian_month_length(year, month)
    return is_gregorian_leap_year(year) ? 29 : 28 if month == 2
    [4, 6, 9, 11].include?(month) ? 30 : 31
  end

  def self.gregorian_to_jdn(value)
    a = (14 - value.month) / 12
    y = value.year + 4_800 - a
    m = value.month + 12 * a - 3
    value.day + (153 * m + 2) / 5 + 365 * y + y / 4 - y / 100 + y / 400 - 32_045
  end

  def self.jdn_to_gregorian(jdn)
    a = jdn + 32_044
    b = (4 * a + 3) / 146_097
    c = a - (146_097 * b) / 4
    d = (4 * c + 3) / 1_461
    e = c - (1_461 * d) / 4
    m = (5 * e + 2) / 153
    day = e - (153 * m + 2) / 5 + 1
    month = m + 3 - 12 * (m / 10)
    year = 100 * b + d - 4_800 + m / 10
    GregorianDate.new(year: year, month: month, day: day)
  end

  PastafariDate = Struct.new(:year, :cutlet_name, :day_in_cutlet, :month_name, :day_in_month, keyword_init: true) do
    def to_h
      {
        'year' => year.to_s,
        'cutletName' => cutlet_name,
        'dayInCutlet' => day_in_cutlet,
        'monthName' => month_name,
        'dayInMonth' => day_in_month
      }
    end
  end

  def self.build_stones
    rows = [[17, 29, 43, 71, 101]]
    2.upto(46) do |drop_number|
      old = rows[-1]
      rows << [
        keep(old[0] * old[0] + 3 * old[1] + drop_number),
        keep(old[1] * old[1] + 5 * old[2] + old[0]),
        keep(old[2] * old[2] + 7 * old[3] + old[1]),
        keep(old[3] * old[3] + 11 * old[4] + old[2]),
        keep(old[4] * old[4] + 13 * old[0] + old[3])
      ]
    end
    rows.freeze
  end

  STONE_TABLE = build_stones

  def self.day_number(jdn)
    delta = jdn - FOUNDATION_JDN
    return 1 if delta.zero?
    delta.positive? ? 2 * delta + 1 : -2 * delta
  end

  def self.bowl_permutation(rank_one_based)
    raise InvalidInputError, 'Bowl permutation rank must be in 1..720' unless (1..720).cover?(rank_one_based)
    rank = rank_one_based - 1
    available = [0, 1, 2, 3, 4, 5]
    result = []
    factorial = [1, 1, 2, 6, 24, 120, 720]
    0.upto(5) do |position|
      block = factorial[5 - position]
      index, rank = rank.divmod(block)
      result << available.delete_at(index)
    end
    result.freeze
  end

  SauceResult = Struct.new(:bowls, :last_drop_permutation, keyword_init: true)

  def self.sauce(calculation_jdn, target_jdn)
    calculation = day_number(calculation_jdn)
    target = day_number(target_jdn)
    distance = (target_jdn - calculation_jdn).abs + 1
    addition = calculation + target
    direction = target_jdn < calculation_jdn ? 1 : (target_jdn == calculation_jdn ? 2 : 3)

    hidden = Array.new(7, 0)
    HIDDEN_COEFFICIENTS.each_with_index do |coefficients, index|
      stones = STONE_TABLE[index]
      value = keep(
        calculation + coefficients[0] * target + coefficients[1] * distance +
        coefficients[2] * addition + coefficients[3] * direction + stones.sum
      )
      HIDDEN_STONE_ORDER.each_with_index do |stone_index, round_index|
        value = keep(value * value + 3 * value + stones[stone_index] + round_index + 1)
      end
      hidden[index] = value
    end

    drops = Array.new(46, 0)
    prior = lambda do |drop_number, back|
      wanted = drop_number - back
      wanted >= 1 ? drops[wanted - 1] : hidden[back - drop_number]
    end

    bowls = []
    BOWL_PRIMES.each_with_index do |prime, zero_index|
      index = zero_index + 1
      value = calculation + target * index + distance + addition + direction + prime * prime
      bowls << keep(value * value + index)
    end

    last_drop_permutation = nil
    0.upto(45) do |drop_index|
      drop_number = drop_index + 1
      stones = STONE_TABLE[drop_index]
      previous = prior.call(drop_number, 1)
      third = prior.call(drop_number, 3)
      seventh = prior.call(drop_number, 7)
      value = keep(
        stones[0] * calculation + stones[1] * target + stones[2] * distance +
        stones[3] * addition + stones[4] * direction + previous + 3 * third +
        5 * seventh + drop_number
      )
      GRIND_ROWS.each do |first, second, third_factor, fourth, stone_index|
        value = keep(
          value * value + first * value + second * previous + third_factor * third +
          fourth * seventh + stones[stone_index]
        )
      end
      drops[drop_index] = value

      order = bowl_permutation(1 + (value - 1) % 720)
      last_drop_permutation = order if drop_number == 46

      direct = Array.new(6, 0)
      0.upto(2) do |place|
        bowl_id = order[place]
        direct[bowl_id] = keep(
          value * value + stones[DIRECT_STONES[place]] * bowls[bowl_id] +
          DIRECT_MULTIPLIERS[place] * drop_number
        )
      end

      old = bowls
      bowls = Array.new(6, 0)
      order.each_with_index do |bowl_id, place|
        previous_id = order[(place - 1) % 6]
        next_id = order[(place + 1) % 6]
        mixed = old[bowl_id] + 2 * old[previous_id] + 3 * old[next_id] +
                direct[bowl_id] + value + stones[DROP_MIX_STONES[place]]
        bowls[bowl_id] = keep(
          mixed * mixed + 5 * old[previous_id] * old[next_id] + drop_number * (place + 1)
        )
      end
    end

    raise InternalInvariantError, 'The 46th drop did not define a bowl order' if last_drop_permutation.nil?

    1.upto(12) do |round_number|
      bowl_sum = bowls.sum
      order_number = keep(bowl_sum + 149 * round_number)
      order = bowl_permutation(1 + (order_number - 1) % 720)
      old = bowls
      bowls = Array.new(6, 0)
      order.each_with_index do |bowl_id, place|
        previous_id = order[(place - 1) % 6]
        next_id = order[(place + 1) % 6]
        mixed = old[bowl_id] + 3 * old[previous_id] + 5 * old[next_id] +
                bowl_sum + round_number + (place + 1)**2
        bowls[bowl_id] = keep(mixed * mixed + 7 * old[previous_id] * old[next_id])
      end
    end

    SauceResult.new(bowls: bowls.freeze, last_drop_permutation: last_drop_permutation)
  end

  ResponseDescriptor = Struct.new(:first, :step, keyword_init: true)

  def self.response_descriptor(result, bowl_id, seal)
    place = result.last_drop_permutation.index(bowl_id)
    next_bowl_id = result.last_drop_permutation[(place + 1) % 6]
    first_base = result.bowls[bowl_id] + seal + 181
    first = keep(first_base * first_base + 179 * result.bowls[next_bowl_id] + seal)
    direction_base = first + seal + 1 + 193
    direction_number = keep(direction_base * direction_base + 193 * first + 197 * result.bowls[5])
    ResponseDescriptor.new(first: first, step: direction_number.odd? ? 1 : -1)
  end

  def self.response_at(descriptor, offset)
    (descriptor.first - 1 + descriptor.step * offset) % GREAT + 1
  end

  def self.choose_uniform(result, bowl_id, seal, count)
    raise InvalidInputError, 'Choice count must be positive' if count < 1
    descriptor = response_descriptor(result, bowl_id, seal)

    if count <= GREAT
      limit = GREAT - GREAT % count
      accepted = descriptor.first
      accepted = descriptor.step.positive? ? 1 : limit if accepted > limit
      return (accepted - 1) % count + 1
    end

    width = 1
    space = GREAT
    while space < count
      space *= GREAT
      width += 1
    end
    value = 1
    weight = 1
    0.upto(width - 1) do |offset|
      value += (response_at(descriptor, offset) - 1) * weight
      weight *= GREAT
    end
    limit = space - space % count
    accepted = value
    accepted = descriptor.step.positive? ? 1 : limit if accepted > limit
    (accepted - 1) % count + 1
  end

  GATE_CHECKPOINTS = [
    [-32768, -29780582], [-31744, -29275011], [-30720, -28759536],
    [-29696, -28231334], [-28672, -27724269], [-27648, -27204151],
    [-26624, -26696050], [-25600, -26184520], [-24576, -25649224],
    [-23552, -25126420], [-22528, -24592746], [-21504, -24077763],
    [-20480, -23568941], [-19456, -23056607], [-18432, -22547059],
    [-17408, -22028964], [-16384, -21524216], [-15360, -21021341],
    [-14336, -20503094], [-13312, -19986054], [-12288, -19477387],
    [-11264, -18959976], [-10240, -18453214], [-9216, -17930941],
    [-8192, -17421559], [-7168, -16901500], [-6144, -16391773],
    [-5120, -15892677], [-4096, -15374389], [-3072, -14869256],
    [-2048, -14360710], [-1856, -14269240], [-1024, -13845543],
    [0, FOUNDATION_JDN], [1024, -12809003], [2048, -12289556],
    [3072, -11790578], [4096, -11286642], [5120, -10764244],
    [6144, -10233818], [7168, -9727528], [8192, -9214186],
    [9216, -8692730], [10240, -8173976], [11264, -7657486],
    [12288, -7145425], [13312, -6630698], [14336, -6127086],
    [15360, -5610968], [16384, -5103400], [17408, -4587432],
    [18432, -4069417], [19456, -3557452], [20480, -3038147],
    [21504, -2527530], [22528, -2008636], [23552, -1489691],
    [24576, -975725], [25600, -476208], [26624, 32147], [27648, 532296],
    [28672, 1047264], [29696, 1552344], [29952, 1682615],
    [30208, 1812845], [30464, 1938704], [30720, 2076748],
    [30976, 2207399], [31232, 2341220], [31456, 2450464],
    [31472, 2458435], [31488, 2467368], [31504, 2474392],
    [31744, 2600784], [32768, 3111357]
  ].freeze

  CHECKPOINT_POSITIONS = GATE_CHECKPOINTS.map { |item| item[1] }.freeze
  GATE_DISTANCE_CACHE = LruCache.new(4096)
  GATE_POSITION_CACHE = GatePositionCache.new(4096)
  GATE_CHECKPOINTS.each { |index, position| GATE_POSITION_CACHE.set(index, position) }

  def self.gate_distance(index)
    raise InvalidInputError, 'Gate-distance index may not be zero' if index.zero?
    cached = GATE_DISTANCE_CACHE.get(index)
    return cached unless cached.nil?
    result = sauce(FOUNDATION_JDN, FOUNDATION_JDN + index)
    distance = choose_uniform(result, 0, 1, 922) + 41
    GATE_DISTANCE_CACHE.set(index, distance)
    distance
  end

  def self.gate_position(index)
    cached = GATE_POSITION_CACHE.get(index)
    return cached unless cached.nil?
    current_index, position = GATE_POSITION_CACHE.nearest(index)
    if current_index < index
      while current_index < index
        distance_index = current_index < 0 ? current_index : current_index + 1
        position += gate_distance(distance_index)
        current_index += 1
        GATE_POSITION_CACHE.set(current_index, position)
      end
    else
      while current_index > index
        distance_index = current_index > 0 ? current_index : current_index - 1
        position -= gate_distance(distance_index)
        current_index -= 1
        GATE_POSITION_CACHE.set(current_index, position)
      end
    end
    position
  end

  def self.containing_gate_interval(jdn)
    position = lower_bound(CHECKPOINT_POSITIONS, jdn)
    index = if position.zero?
              GATE_CHECKPOINTS[0][0]
            elsif position == GATE_CHECKPOINTS.length
              GATE_CHECKPOINTS[-1][0]
            else
              GATE_CHECKPOINTS[position - 1][0]
            end
    gate = gate_position(index)
    if gate >= jdn
      while gate >= jdn
        index -= 1
        gate = gate_position(index)
      end
      return index
    end
    index += 1 while gate_position(index + 1) < jdn
    index
  end

  Year = Struct.new(:number, :open_index, :close_index, :start_jdn, :end_jdn, :length, :gaps, keyword_init: true)

  def self.make_year(number, open_index, close_index)
    opening = gate_position(open_index)
    closing = gate_position(close_index)
    Year.new(
      number: number, open_index: open_index, close_index: close_index,
      start_jdn: opening + 1, end_jdn: closing, length: closing - opening,
      gaps: close_index - open_index
    )
  end

  def self.enumerate_year_5000_candidates(calculation_jdn)
    interval = containing_gate_interval(calculation_jdn)
    openings = []
    index = interval
    loop do
      position = gate_position(index)
      break if calculation_jdn - position > MAX_YEAR_DAYS
      openings << [index, position]
      index -= 1
    end
    closings = []
    index = interval + 1
    loop do
      position = gate_position(index)
      break if position - calculation_jdn > MAX_YEAR_DAYS
      closings << [index, position]
      index += 1
    end
    candidates = []
    openings.each do |open_index, opening|
      closings.each do |close_index, closing|
        gaps = close_index - open_index
        length = closing - opening
        candidates << [open_index, close_index, length] if gaps >= MIN_YEAR_GAPS && length.between?(MIN_YEAR_DAYS, MAX_YEAR_DAYS)
      end
    end
    candidates.sort_by { |item| [item[2], item[0]] }
  end

  def self.enumerate_next_years(open_index)
    opening = gate_position(open_index)
    candidates = []
    close_index = open_index + MIN_YEAR_GAPS
    loop do
      length = gate_position(close_index) - opening
      break if length > MAX_YEAR_DAYS
      candidates << [close_index, length] if length >= MIN_YEAR_DAYS
      close_index += 1
    end
    candidates.sort_by { |item| [item[1], item[0]] }
  end

  def self.enumerate_previous_years(close_index)
    closing = gate_position(close_index)
    candidates = []
    open_index = close_index - MIN_YEAR_GAPS
    loop do
      length = closing - gate_position(open_index)
      break if length > MAX_YEAR_DAYS
      candidates << [open_index, length] if length >= MIN_YEAR_DAYS
      open_index -= 1
    end
    candidates.sort_by { |item| [item[1], item[0]] }
  end

  def self.unrank_permutation_names(names, count, rank_one_based)
    available = names.dup
    result = []
    rank = rank_one_based - 1
    0.upto(count - 1) do |position|
      block = permutation_count(available.length - 1, count - position - 1)
      index, rank = block.zero? ? [0, 0] : rank.divmod(block)
      result << available.delete_at(index)
    end
    result
  end

  def self.composition_suffix_count(remaining, parts, mandatory_offset)
    return (remaining.zero? && (mandatory_offset.nil? || mandatory_offset.zero?)) ? 1 : 0 if parts.zero?
    return 0 if remaining < parts
    return binomial(remaining - 1, parts - 1) if mandatory_offset.nil? || mandatory_offset.zero?
    return 0 if mandatory_offset <= 0 || mandatory_offset >= remaining || parts < 2
    binomial(remaining - 2, parts - 2)
  end

  def self.unrank_composition(total, parts, mandatory_cut, rank_one_based)
    result = []
    remaining = total
    cumulative = 0
    rank = rank_one_based
    hit = mandatory_cut.nil?
    0.upto(parts - 1) do |position|
      left = parts - position - 1
      selected = false
      1.upto(remaining - left) do |value|
        after = remaining - value
        new_cumulative = cumulative + value
        new_hit = hit || new_cumulative == mandatory_cut
        mandatory_offset = nil
        unless new_hit
          next if mandatory_cut.nil? || mandatory_cut < new_cumulative
          mandatory_offset = mandatory_cut - new_cumulative
        end
        block = composition_suffix_count(after, left, new_hit ? nil : mandatory_offset)
        if rank > block
          rank -= block
          next
        end
        result << value
        remaining = after
        cumulative = new_cumulative
        hit = new_hit
        selected = true
        break
      end
      raise InternalInvariantError, 'Composition unranking exhausted its branches' unless selected
    end
    result
  end

  def self.bounded_month_length_count(total, parts)
    shifted = total - 4 * parts
    return 0 if shifted < 0 || shifted > 119 * parts
    answer = 0
    upper = [parts, shifted / 120].min
    0.upto(upper) do |excluded|
      ways = binomial(parts, excluded) * binomial(shifted - 120 * excluded + parts - 1, parts - 1)
      answer += excluded.even? ? ways : -ways
    end
    answer
  end

  def self.unrank_month_lengths(total, parts, rank_one_based)
    result = []
    remaining = total
    rank = rank_one_based
    memo = {}
    0.upto(parts - 1) do |position|
      left = parts - position - 1
      selected = false
      maximum = [123, remaining - 4 * left].min
      4.upto(maximum) do |value|
        after = remaining - value
        block = if left.zero?
                  after.zero? ? 1 : 0
                else
                  memo[[after, left]] ||= bounded_month_length_count(after, left)
                end
        if rank > block
          rank -= block
          next
        end
        result << value
        remaining = after
        selected = true
        break
      end
      raise InternalInvariantError, 'Month-length unranking exhausted its branches' unless selected
    end
    result
  end

  class InterleavingCounter
    def initialize(lengths)
      @lengths = lengths.dup.freeze
      @cache = {}
    end

    def get(last_seen, q)
      last = @lengths.length - 1
      return 1 if last_seen >= last
      cached = @cache[last_seen]
      return cached[q] if cached && cached.length > q
      rebuild(last_seen, q)
      @cache.fetch(last_seen).fetch(q)
    end

    def rebuild(start, q_start)
      month_count = @lengths.length
      needed = Array.new(month_count, 0)
      needed[start] = q_start
      start.upto(month_count - 2) do |index|
        needed[index + 1] = needed[index] + @lengths[index + 1] - 1
      end
      following = nil
      @cache.clear
      (month_count - 1).downto(start) do |index|
        q_max = needed[index]
        current = if index == month_count - 1
                    Array.new(q_max + 1, 1)
                  else
                    raise InternalInvariantError, 'Missing DP suffix' if following.nil?
                    values = Array.new(q_max + 1, 0)
                    month_length = @lengths[index + 1]
                    cumulative = 0
                    weight = 1
                    1.upto(q_max) do |q|
                      r = q - 1
                      cumulative += weight * following[month_length + r]
                      values[q] = cumulative
                      weight = weight * (month_length + r - 1) / (r + 1)
                    end
                    values
                  end
        following = current
        @cache[index] = current if index <= start + 7
      end
    end
  end

  def self.interleaving_count(lengths)
    InterleavingCounter.new(lengths).get(0, lengths[0])
  end

  def self.unrank_month_interleaving(lengths, rank_one_based)
    month_count = lengths.length
    total_length = lengths.sum
    counter = InterleavingCounter.new(lengths)
    weave = Array.new(total_length, 0)
    remaining = lengths.dup
    remaining[0] -= 1
    low = 0
    high = 0
    active_total = remaining[0]
    base_count = 1
    rank = rank_one_based

    expected_total = counter.get(0, active_total + 1)
    raise InvalidInputError, 'Interleaving rank is outside its valid range' unless rank.between?(1, expected_total)

    1.upto(total_length - 1) do |position|
      prefix = []
      running = 0
      low.upto(high) do |index|
        running += remaining[index]
        prefix << running
      end
      span = prefix.length
      suffix_p = Array.new(span + 1, 1)
      suffix_pm1 = Array.new(span + 1, 1)
      (span - 1).downto(0) do |offset|
        suffix_p[offset] = suffix_p[offset + 1] * prefix[offset]
        suffix_pm1[offset] = suffix_pm1[offset + 1] * (prefix[offset] - 1)
      end

      future_same = high < month_count - 1 ? counter.get(high, active_total) : 1
      selected = false
      low.upto(high) do |month|
        remaining_for_month = remaining[month]
        next if remaining_for_month == 1 && month != low
        offset = month - low
        if remaining_for_month > 1
          numerator = (remaining_for_month - 1) * suffix_p[offset]
          denominator = active_total * suffix_pm1[offset]
        else
          numerator = suffix_p[offset + 1]
          denominator = active_total * suffix_pm1[offset + 1]
        end
        next_base_count = base_count * numerator / denominator
        block = next_base_count * future_same
        if rank > block
          rank -= block
          next
        end
        weave[position] = month
        remaining[month] -= 1
        active_total -= 1
        base_count = next_base_count
        low += 1 if remaining[month].zero?
        selected = true
        break
      end
      next if selected

      raise InternalInvariantError, 'Interleaving exhausted all valid branches' if high + 1 >= month_count
      month = high + 1
      new_remaining = lengths[month] - 1
      next_base_count = base_count * binomial(active_total + new_remaining - 1, new_remaining - 1)
      next_active_total = active_total + new_remaining
      future = month < month_count - 1 ? counter.get(month, next_active_total + 1) : 1
      block = next_base_count * future
      raise InternalInvariantError, 'Rank exceeded the final lexicographic branch' if rank > block
      weave[position] = month
      high = month
      remaining[month] -= 1
      low = month if low > month - 1
      active_total = next_active_total
      base_count = next_base_count
    end
    weave
  end

  YearStructure = Struct.new(
    :cutlet_count, :cutlet_gaps, :cutlet_names, :cutlet_start_offsets,
    :cutlet_end_offsets, :month_count, :month_lengths, :month_names,
    :month_weave, :day_in_month, keyword_init: true
  )

  def self.build_year_structure(state, year)
    result = state.get_sauce(year.start_jdn)
    cutlet_counts = (6..[17, year.gaps].min).to_a
    cutlet_count = cutlet_counts[choose_uniform(result, 1, 20, cutlet_counts.length) - 1]

    mandatory_cut = nil
    if state.calculation_jdn.between?(year.start_jdn, year.end_jdn)
      (year.open_index + 1).upto(year.close_index - 1) do |gate_index|
        if gate_position(gate_index) == state.calculation_jdn
          mandatory_cut = gate_index - year.open_index
          break
        end
      end
    end

    partition_count = if mandatory_cut.nil?
                        binomial(year.gaps - 1, cutlet_count - 1)
                      else
                        binomial(year.gaps - 2, cutlet_count - 2)
                      end
    cutlet_gaps = unrank_composition(
      year.gaps, cutlet_count, mandatory_cut,
      choose_uniform(result, 1, 21, partition_count)
    )

    cutlet_name_ways = permutation_count(CUTLET_NAMES.length, cutlet_count)
    cutlet_names = unrank_permutation_names(
      CUTLET_NAMES, cutlet_count, choose_uniform(result, 4, 22, cutlet_name_ways)
    )

    minimum_months = (year.length + 122) / 123
    maximum_months = [47, year.length / 4].min
    month_count = minimum_months + choose_uniform(
      result, 2, 30, maximum_months - minimum_months + 1
    ) - 1

    month_length_ways = bounded_month_length_count(year.length, month_count)
    month_lengths = unrank_month_lengths(
      year.length, month_count, choose_uniform(result, 2, 31, month_length_ways)
    )

    weave_ways = interleaving_count(month_lengths)
    month_weave = unrank_month_interleaving(
      month_lengths, choose_uniform(result, 3, 32, weave_ways)
    )

    month_name_ways = permutation_count(MONTH_NAMES.length, month_count)
    month_names = unrank_permutation_names(
      MONTH_NAMES, month_count, choose_uniform(result, 4, 33, month_name_ways)
    )

    seen = Array.new(month_count, 0)
    day_in_month = []
    month_weave.each do |month|
      seen[month] += 1
      day_in_month << seen[month]
    end

    cutlet_starts = []
    cutlet_ends = []
    gap_offset = 0
    day_offset = 0
    cutlet_gaps.each do |cutlet_gap_count|
      cutlet_starts << day_offset
      gap_offset += cutlet_gap_count
      end_jdn = gate_position(year.open_index + gap_offset)
      day_offset = end_jdn - year.start_jdn + 1
      cutlet_ends << day_offset - 1
    end

    YearStructure.new(
      cutlet_count: cutlet_count, cutlet_gaps: cutlet_gaps.freeze,
      cutlet_names: cutlet_names.freeze, cutlet_start_offsets: cutlet_starts.freeze,
      cutlet_end_offsets: cutlet_ends.freeze, month_count: month_count,
      month_lengths: month_lengths.freeze, month_names: month_names.freeze,
      month_weave: month_weave.freeze, day_in_month: day_in_month.freeze
    )
  end

  def self.find_cutlet(structure, offset)
    low = 0
    high = structure.cutlet_count - 1
    while low <= high
      middle = (low + high) / 2
      if offset < structure.cutlet_start_offsets[middle]
        high = middle - 1
      elsif offset > structure.cutlet_end_offsets[middle]
        low = middle + 1
      else
        return middle
      end
    end
    raise InternalInvariantError, 'Day offset is not contained in a cutlet'
  end

  def self.materialize(year, structure, target_jdn)
    offset = target_jdn - year.start_jdn
    cutlet = find_cutlet(structure, offset)
    month = structure.month_weave[offset]
    PastafariDate.new(
      year: year.number, cutlet_name: structure.cutlet_names[cutlet],
      day_in_cutlet: offset - structure.cutlet_start_offsets[cutlet] + 1,
      month_name: structure.month_names[month], day_in_month: structure.day_in_month[offset]
    )
  end

  class CalculationState
    attr_reader :calculation_jdn

    def initialize(calculation_jdn)
      @calculation_jdn = calculation_jdn
      @sauces = LruCache.new(64)
      @structures = LruCache.new(8)
      @years = {}
      @year_5000 = nil
    end

    def get_sauce(target_jdn)
      cached = @sauces.get(target_jdn)
      return cached unless cached.nil?
      result = Pastafari.sauce(@calculation_jdn, target_jdn)
      @sauces.set(target_jdn, result)
      result
    end

    def get_year_5000
      return @year_5000 unless @year_5000.nil?
      candidates = Pastafari.enumerate_year_5000_candidates(@calculation_jdn)
      raise InternalInvariantError, 'No valid year-5000 candidate exists' if candidates.empty?
      choice = Pastafari.choose_uniform(get_sauce(@calculation_jdn), 0, 10, candidates.length)
      open_index, close_index, = candidates[choice - 1]
      result = Pastafari.make_year(5_000, open_index, close_index)
      @year_5000 = result
      @years[5_000] = result
      result
    end

    def next_year(year)
      number = year.number + 1
      return @years[number] if @years.key?(number)
      candidates = Pastafari.enumerate_next_years(year.close_index)
      result = get_sauce(Pastafari.gate_position(year.close_index))
      choice = Pastafari.choose_uniform(result, 0, 11, candidates.length)
      close_index, = candidates[choice - 1]
      selected = Pastafari.make_year(number, year.close_index, close_index)
      @years[number] = selected
      selected
    end

    def previous_year(year)
      number = year.number - 1
      return @years[number] if @years.key?(number)
      candidates = Pastafari.enumerate_previous_years(year.open_index)
      result = get_sauce(Pastafari.gate_position(year.open_index))
      choice = Pastafari.choose_uniform(result, 0, 12, candidates.length)
      open_index, = candidates[choice - 1]
      selected = Pastafari.make_year(number, open_index, year.open_index)
      @years[number] = selected
      selected
    end

    def find_year(target_jdn)
      year = get_year_5000
      if target_jdn < year.start_jdn
        year = previous_year(year) while target_jdn < year.start_jdn
      else
        year = next_year(year) while target_jdn > year.end_jdn
      end
      year
    end

    def get_structure(year)
      key = [year.open_index, year.close_index]
      cached = @structures.get(key)
      return cached unless cached.nil?
      result = Pastafari.build_year_structure(self, year)
      @structures.set(key, result)
      result
    end

    def convert(target_jdn)
      year = find_year(target_jdn)
      Pastafari.materialize(year, get_structure(year), target_jdn)
    end
  end

  class Calendar
    def initialize
      @states = LruCache.new(4)
      @results = LruCache.new(1024)
    end

    def convert_jdn(calculation_jdn, target_jdn)
      raise InvalidInputError, 'calculation JDN is required' if calculation_jdn.nil?
      raise InvalidInputError, 'target JDN is required' if target_jdn.nil?
      key = [calculation_jdn, target_jdn]
      cached = @results.get(key)
      return cached unless cached.nil?
      state = @states.get(calculation_jdn)
      if state.nil?
        state = CalculationState.new(calculation_jdn)
        @states.set(calculation_jdn, state)
      end
      result = state.convert(target_jdn)
      @results.set(key, result)
      result
    end

    def convert(calculation_date, target_date)
      convert_jdn(
        Pastafari.gregorian_to_jdn(calculation_date),
        Pastafari.gregorian_to_jdn(target_date)
      )
    end

    def convert_iso(calculation_date, target_date)
      convert(
        GregorianDate.parse(calculation_date),
        GregorianDate.parse(target_date)
      )
    end

    def clear
      @states.clear
      @results.clear
    end
  end

  def self.clear_global_gate_caches
    GATE_DISTANCE_CACHE.clear
    GATE_POSITION_CACHE.clear
    GATE_CHECKPOINTS.each { |index, position| GATE_POSITION_CACHE.set(index, position) }
  end
end
