#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: UTF-8

require 'json'
require_relative 'pastafari_calendar'

corpus = ARGV[0] || File.expand_path('../tests/oracle-differential-10000.tsv', __dir__)
start_index = Integer(ENV.fetch('PASTAFARI_START', '0'), 10)
limit = ENV.key?('PASTAFARI_LIMIT') ? Integer(ENV.fetch('PASTAFARI_LIMIT'), 10) : nil
rows = File.foreach(corpus, encoding: 'UTF-8').reject { |line| line.strip.empty? || line.start_with?('#') }
selected = limit ? rows.drop(start_index).first(limit) : rows.drop(start_index)
calendar = Pastafari::Calendar.new
passed = 0
selected.each_with_index do |line, local_index|
  target_text, calculation_text, expected_json = line.chomp.split("\t", 3)
  raise "bad corpus row #{start_index + local_index + 1}" unless target_text && calculation_text && expected_json
  target_jdn = Integer(target_text, 10)
  calculation_jdn = Integer(calculation_text, 10)
  expected = JSON.parse(expected_json)
  actual = calendar.convert_jdn(target_jdn, calculation_jdn).to_h
  unless actual == expected
    warn "mismatch corpus index #{start_index + local_index}: calculation_jdn=#{calculation_jdn} target_jdn=#{target_jdn}"
    warn "expected=#{JSON.generate(expected)}"
    warn "actual=#{JSON.generate(actual)}"
    exit 1
  end
  passed += 1
  puts "progress #{passed}/#{selected.length}" if (passed % 250).zero?
end
puts "differential: #{passed}/#{selected.length} passed (start=#{start_index})"
