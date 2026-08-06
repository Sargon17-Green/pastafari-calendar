<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>רכיב תאריך פסטפרי</title>
  <script type="module" src="./pastafari-date.js"></script>
  <style>
    body { margin: 2rem; font-family: Arial, sans-serif; background: #f8fafc; }
  </style>
</head>
<body>
  <pastafari-date id="calendar"></pastafari-date>

  <script type="module">
    const calendar = document.querySelector("#calendar");
    const initialValue = await calendar.ready;
    console.log("חמשת רכיבי הפלט:", initialValue);

    calendar.addEventListener("pastafari-change", ({ detail }) => {
      console.log("התאריך השתנה:", detail);
    });
  </script>
</body>
</html>
