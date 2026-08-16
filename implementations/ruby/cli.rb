#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: UTF-8

require 'json'
require_relative 'pastafari_calendar'

begin
  calendar = Pastafari::Calendar.new
  if ARGV.length == 3 && ARGV[0] == '--jdn'
    calculation_jdn = Integer(ARGV[1], 10)
    target_jdn = Integer(ARGV[2], 10)
    puts JSON.generate(calendar.convert_jdn(calculation_jdn, target_jdn).to_h)
  elsif ARGV.length == 2
    puts JSON.generate(calendar.convert_iso(ARGV[0], ARGV[1]).to_h)
  else
    warn 'usage: ruby cli.rb CALCULATION TARGET'
    warn '   or: ruby cli.rb --jdn CALCULATION_JDN TARGET_JDN'
    exit 2
  end
rescue StandardError => e
  warn "#{e.class}: #{e.message}"
  exit 1
end
