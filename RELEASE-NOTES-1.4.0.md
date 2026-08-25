# Pastafari Calendar 1.4.0

גרסה 1.4.0 סוגרת את סדרת תיקוני הנורמה והקונפורמיות שנבדקה מחדש ב־Updates 1–19. זוהי העלאת minor: נשמרה תאימות ה־API הציבורי שנבדקה ב־Update 19, ובמקביל נוספו יכולות נורמטיביות backward-compatible ותוקנו פלטים נורמטיביים שגויים.

## תיקונים נורמטיביים

- יישור מנגנון הרוטב והבחישות הסופיות לנוסח המגילה, כולל ההבחנה בין `bowlSum` לבין `orderNumber`.
- אכיפה מלאה של תקרת שנת 5,778 הימים לפני חישוב cardinality ובחירת המועמד, בשני כיווני הניווט.
- התאמת gate data, checkpoints ונתוני precomputed לחישוב הנורמטיבי הנוכחי.
- השלמת התנהגות שלילית/פרולפטית במסלולים שבהם המגילה מגדירה ייצוג נורמטיבי.

## ייצוגים נורמטיביים שנוספו או הושלמו

- Chinese structured representation דטרמיניסטי שאינו תלוי ב־`Intl`/ICU לצורך הסמנטיקה הנורמטיבית.
- Vikrama נורמטיבי.
- Kōki פרולפטי נורמטיבי.
- חיזוק ההפרדה בין לוחות נורמטיביים לבין ייצוגים host-provided שאינם oracle.

## state / runtime correctness

- תיקוני reentrancy, ownership/restoration של runtime patches ו־late monkey patches.
- סגירת תלות סמנטית ב־cache/import order/instance age ובהיסטוריית failures.
- תיקון תחום `MonthWeavingCounter` כך שהתחום הציבורי המקובל תואם ל־`count/rank/unrank`.
- אימות שה־random/witness/noise/allocation machinery נשאר סמנטית אינרטי.

## קונפורמיות וראיות

- מקור האמת נקבע כ־Scroll → clear independent reference → conformance corpus; המנועים וה־generated artifacts הם אובייקטים לבדיקה ולא oracle.
- canonical corpus של Update 17 נוצר מן ה־reference העצמאי ונבדק נגד authoritative/fast.
- Update 18 ביצע differential integration רחב.
- Update 19 הסתיים ב־`FINAL_AUDIT_PASS` על tree SHA `ea72ef27b786a41ad9683b4c30bbde8c3ea6078e`, עם 27/27 דרישות נורמטיביות ו־18/18 updates קודמים ב־PASS.

## תאימות

לא נמצאה ב־Update 19 שבירת public API מוכרת: exports, package exports, arities שנבדקו, browser/Worker/standalone contracts וה־package surface נשארו תואמים. פלט היסטורי שגוי אינו נשמר בשם backward compatibility.

אין כאן טענה שאין שום bug אפשרי; הטענה היא שכל הדרישות שמופו בסדרת ה־audit עברו את הראיות וה־gates שהוגדרו להן.
