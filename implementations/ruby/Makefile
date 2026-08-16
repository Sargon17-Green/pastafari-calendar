RUBY ?= ruby
CORPUS ?= ../tests/oracle-differential-10000.tsv

.PHONY: test test-canonical test-regression test-differential

test: test-canonical test-regression

test-canonical:
	$(RUBY) test.rb

test-regression test-differential:
	$(RUBY) differential.rb $(CORPUS)
