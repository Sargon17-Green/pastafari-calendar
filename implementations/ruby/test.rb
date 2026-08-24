#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: UTF-8

require 'json'
require_relative 'pastafari_calendar'

root = File.expand_path('..', __dir__)
fixture = JSON.parse(File.read(File.join(root, 'tests', 'conformance-vectors.json'), encoding: 'UTF-8'))
raise 'not a legacy regression fixture' unless fixture['fixtureType'] == 'legacy-canonical-format-regression'
raise 'wrong canonical id' unless fixture['canonicalId'] == Pastafari::ALGORITHM_ID
raise 'wrong normative source hash' unless fixture['normativeSourceSha256'] == Pastafari::NORMATIVE_SOURCE_SHA256
raise 'wrong input order' unless fixture['inputOrder'] == %w[calculationJdn targetJdn]
authority = fixture.fetch('authority')
raise 'legacy regression fixture must not be normative authority' unless authority['normativeAuthority'] == false
raise 'wrong legacy regression role' unless authority['role'] == 'legacy-compact-regression-vectors'

calendar = Pastafari::Calendar.new
failures = []
fixture.fetch('vectors').each do |vector|
  actual = calendar.convert_jdn(
    Integer(vector.fetch('calculationJdn'), 10),
    Integer(vector.fetch('targetJdn'), 10)
  ).to_h
  failures << [vector.fetch('id'), vector.fetch('expected'), actual] unless actual == vector.fetch('expected')
end
if failures.empty?
  count = fixture.fetch('vectors').length
  puts "legacy regression vectors: #{count}/#{count} passed"
else
  failures.each { |id, expected, actual| warn "#{id}: expected=#{expected.inspect} actual=#{actual.inspect}" }
  exit 1
end
