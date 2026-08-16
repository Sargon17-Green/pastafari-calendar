#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: UTF-8

require 'json'
require_relative 'pastafari_calendar'

root = File.expand_path('..', __dir__)
vectors = JSON.parse(File.read(File.join(root, 'tests', 'conformance-vectors.json'), encoding: 'UTF-8')).fetch('vectors')
calendar = Pastafari::Calendar.new
failures = []
vectors.each do |vector|
  actual = calendar.convert_iso(vector.fetch('target'), vector.fetch('calculation')).to_h
  failures << [vector.fetch('id'), vector.fetch('expected'), actual] unless actual == vector.fetch('expected')
end
if failures.empty?
  puts "known vectors: #{vectors.length}/#{vectors.length} passed"
else
  failures.each { |id, expected, actual| warn "#{id}: expected=#{expected.inspect} actual=#{actual.inspect}" }
  exit 1
end
