import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// Targeted semantic regression for the Georgian About text. This is not a
// substitute for independent, whole-locale translation approval.
const html = readFileSync('docs/about/content/ka.html', 'utf8');
function section(id) {
  const blocks = [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"[^>]*>[\s\S]*?<\/section>/g)];
  const found = blocks.filter(m => m[1] === id);
  assert.equal(found.length, 1, 'expected exactly one section: ' + id);
  return found[0][0];
}
const names = section('canonical-names');
const printed = section('printed-calendar');

test('ka: canonical names, entity identity and no vote among variants', () => {
  assert.match(names, /17/);
  assert.match(names, /47/);
  assert.match(names, /სახელის იდენტობა კანონიკური და სემანტიკურია/);
  assert.match(names, /კენჭისყრით/);
  assert.match(names, /თარგმანი ან ტრანსლიტერაცია ერთეულის იდენტობას არ ცვლის/);
});

test('ka: a printed calendar is scoped to a working day', () => {
  assert.match(printed, /მოქმედების დღისთვის/);
  assert.match(printed, /მოქმედების დღის შეცვლისას შესაძლოა ახალი კალენდარი გახდეს საჭირო/);
});

test('ka: discrete deterministic algorithm is distinct from noncanonical astronomical profile', () => {
  assert.match(printed, /დისკრეტული ალგორითმი დეტერმინისტულია და მკაფიოდ არის განსაზღვრული/);
  assert.match(printed, /ფიზიკური მომენტის პასტაფარიანულ დღედ გარდაქმნისას/);
  assert.match(printed, /განხორციელების ასტრონომიული მოდელი/);
  assert.match(printed, /ასტრონომიული რიცხვითი პროფილი ჯერ კანონიკური არ არის/);
  assert.doesNotMatch(printed, /რადგან სპეციფიკაცია სრული და დეტერმინისტულია/);
});

test('ka: preserve mandatory hand calculation counts', () => {
  assert.match(printed, /7 დამალული და 46 ხილული წვეთი/);
  assert.match(printed, /ექვსი ჯამი/);
  assert.match(printed, /12 საბოლოო შერევა/);
});
