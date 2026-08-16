#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: UTF-8

require 'json'
require_relative 'pastafari_calendar'

begin
  if ARGV.length == 3 && %w[-c --calculation-date].include?(ARGV[1])
    target = ARGV[0]
    calculation = ARGV[2]
  elsif ARGV.length == 3 && ARGV[0] == '--jdn'
    calculation_jdn = Integer(ARGV[1], 10)
    target_jdn = Integer(ARGV[2], 10)
    puts JSON.generate(Pastafari::Calendar.new.convert_jdn(target_jdn, calculation_jdn).to_h)
    exit 0
  else
    warn 'usage: ruby cli.rb TARGET -c CALCULATION'
    warn '   or: ruby cli.rb --jdn CALCULATION_JDN TARGET_JDN'
    exit 2
  end

  puts JSON.generate(Pastafari::Calendar.new.convert_iso(target, calculation).to_h)
rescue StandardError => e
  warn "#{e.class}: #{e.message}"
  exit 1
end
