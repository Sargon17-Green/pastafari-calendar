JAVA ?= java
MAVEN ?= mvn
SOURCE := src/main/java/org/appointedtimes/PastafariCalendar.java
CORPUS ?= ../tests/oracle-differential-10000.tsv

.PHONY: test test-canonical test-regression test-differential package clean

test: test-canonical test-regression

test-canonical:
	$(JAVA) $(SOURCE) --self-test

test-regression test-differential:
	$(JAVA) $(SOURCE) --differential $(CORPUS)

package:
	$(MAVEN) --batch-mode --no-transfer-progress package

clean:
	$(MAVEN) --batch-mode --no-transfer-progress clean
