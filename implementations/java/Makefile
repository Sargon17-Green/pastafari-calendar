JAVA ?= java
MAVEN ?= mvn
SOURCE := src/main/java/org/appointedtimes/PastafariCalendar.java
CORPUS ?= ../tests/oracle-differential-10000.tsv

.PHONY: test test-known test-differential package clean

test: test-known test-differential

test-known:
	$(JAVA) $(SOURCE) --self-test

test-differential:
	$(JAVA) $(SOURCE) --differential $(CORPUS)

package:
	$(MAVEN) --batch-mode --no-transfer-progress package

clean:
	$(MAVEN) --batch-mode --no-transfer-progress clean
