      *> UTF-8, free-format copybook for PASTAFARI-ENGINE.
      *> OP = F: forward; K: reverse with known calculation JDN;
      *>      S: bounded same-as-target reverse page.
       01 PF-REQUEST.
          05 PF-OP                         PIC X.
          05 PF-CALCULATION-JDN            PIC S9(18) COMP-5.
          05 PF-TARGET-JDN                 PIC S9(18) COMP-5.
          05 PF-WANTED.
             10 PF-WANTED-YEAR             PIC S9(18) COMP-5.
             10 PF-WANTED-CUTLET-NAME      PIC X(64).
             10 PF-WANTED-DAY-IN-CUTLET    PIC 9(9) COMP-5.
             10 PF-WANTED-MONTH-NAME       PIC X(64).
             10 PF-WANTED-DAY-IN-MONTH     PIC 9(9) COMP-5.
          05 PF-SEARCH-START-JDN           PIC S9(18) COMP-5.
          05 PF-SEARCH-END-JDN             PIC S9(18) COMP-5.
          05 PF-RESULT-LIMIT               PIC 9(4) COMP-5.

       01 PF-RESPONSE.
          05 PF-API-VERSION                PIC 9(4) COMP-5.
          05 PF-IMPLEMENTATION             PIC X(16).
          05 PF-ALGORITHM-ID               PIC X(64).
          05 PF-STATUS                     PIC S9(9) COMP-5.
          05 PF-STATUS-CODE                PIC X(32).
          05 PF-STATUS-MESSAGE             PIC X(160).
          05 PF-DATE.
             10 PF-YEAR                    PIC S9(18) COMP-5.
             10 PF-CUTLET-INDEX            PIC 9(4) COMP-5.
             10 PF-CUTLET-NAME             PIC X(64).
             10 PF-DAY-IN-CUTLET           PIC 9(9) COMP-5.
             10 PF-MONTH-INDEX             PIC 9(4) COMP-5.
             10 PF-MONTH-NAME              PIC X(64).
             10 PF-DAY-IN-MONTH            PIC 9(9) COMP-5.
          05 PF-FOUND                      PIC X.
          05 PF-FOUND-TARGET-JDN           PIC S9(18) COMP-5.
          05 PF-RESULT-COUNT               PIC 9(4) COMP-5.
          05 PF-HAS-MORE                   PIC X.
          05 PF-NEXT-START-JDN             PIC S9(18) COMP-5.
          05 PF-RESULT-JDN OCCURS 256      PIC S9(18) COMP-5.
