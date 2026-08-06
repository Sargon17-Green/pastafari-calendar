# רכיב תאריך פסטפרי לדפדפן

כל הקבצים בתיקייה זו קטנים מ־25 MiB ולכן ניתן להעלות אותם דרך ממשק האינטרנט של GitHub.

## הטמעה

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/bwtbdyqtmsprytgydym-cpu/pastafari-calendar@v1.1.0/browser/pastafari-date.js"></script>
<pastafari-date></pastafari-date>
```

## ללא תצוגת ברירת המחדל

```html
<pastafari-date id="pc" headless></pastafari-date>
<script type="module">
  const value = await document.querySelector("#pc").ready;
  console.log(value.year, value.cutletName, value.dayInCutlet,
              value.monthName, value.dayInMonth);
</script>
```

הקבצים `pastafari-calendar-core-1.js` ו־`pastafari-calendar-core-2.js` הם חלקי הליבה. אין לשנות את שמותיהם או להפרידם מתיקיית `browser`.
