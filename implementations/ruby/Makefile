RUBY ?= ruby
CORPUS ?= ../tests/oracle-differential-10000.tsv

.PHONY: test test-known test-differential

test: test-known test-differential

test-known:
	$(RUBY) test.rb

test-differential:
	$(RUBY) differential.rb $(CORPUS)
