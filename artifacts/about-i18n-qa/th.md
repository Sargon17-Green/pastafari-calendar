# QA ภาษาไทย — สถานะระหว่างทางของทั้งเว็บไซต์

## ขอบเขต

การตรวจนี้ครอบคลุม `th-TH` ทั้งเว็บไซต์ ไม่ใช่เฉพาะ `/about/`: UI หลัก การค้นหาวันที่ วันดำเนินการ การเปรียบเทียบ มุมมองปี การค้นหาแบบย้อนกลับ ข้อผิดพลาดและสถานะ คู่มือผู้ใช้ footer, metadata, manifest และข้อความ ARIA/การเข้าถึง

## การแก้ไข

เดิมขาด message keys 4 รายการ:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` เป็นภาษาอังกฤษ

คืนความหมายที่หายไปใน `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` และ `guide.6.body`: วัน Pastafari ปัจจุบันเป็นค่าเริ่มต้น ตำแหน่งผู้สังเกตการณ์ที่ใช้งานอยู่ ขอบเขตวันที่อิงดาวศุกร์ตาม `ASTRONOMICAL-DAY.md` การรีเซ็ตทั้งการค้นหาและวันดำเนินการ และการใช้วันดำเนินการที่เลือกเองต่อไปในการค้นหาครั้งถัดไป

คำว่า `วันทำงาน` และ `วันคำนวณ` ซึ่งอาจทำให้เข้าใจผิด ถูกทำให้เป็นคำเดียวกันคือ `วันดำเนินการ` ส่วน queried day ใช้รูปที่หมายถึง “วันที่ที่สอบถาม” แทน “วันเป้าหมาย”

## `/about/`

ลบเศษภาษาอังกฤษเชิงเทคนิคออก ได้แก่ `rejection sampling`, `modulo bias`, `engine commit`, `all-day`, ถ้อยคำผสมในส่วน Seer, `generic injectivity` และ `generic invertibility`

ชื่อ API และ code literals จริงยังคงอยู่ใน `code` ตามความเหมาะสม

การตรวจแบบกว้างหลังแก้พบคำ `corpus` และ `affine` ที่เหลืออยู่ จึงแปล/ถอดเสียงให้เป็นไทยด้วย

commit หลัก:
- `398c0643c6511ffc6fa45bb366fad48449421b67`
- `9cb563ab91b23240629b97b02423e04502330049`
- `5a2782baf362617e0330211ce098d9e40a82dedc`

## การตรวจสอบขั้นสุดท้าย

- 258/258 message keys
- ไม่มี key ที่ขาดหรือเกิน
- ชุด `{placeholder}` ทั้งหมดตรงกับสัญญาภาษาอังกฤษ
- ไม่พบข้อความยาวที่สั้นผิดปกติ
- ไม่มี fallback จากลาวหรือเขมร
- `/about/` มี stable ID 29 รายการ ตรงกับ semantic master ทั้งจำนวนและลำดับ ไม่มี duplicate
- ตารางเชิงความหมายมี 19 และ 9 แถว
- ไม่มีข้อความฮีบรูที่หลุดมา
- การสแกน English technical prose เป็นศูนย์
- Latin residue เหลือเพียงชื่อผลิตภัณฑ์ `Pastafarian Calendar Seer`
- สูตร hash และ literal ที่บังคับทั้งหมดคงเดิม รวมถึง `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` และ `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`

หมายเหตุ: heuristic ที่นับจุดจบประโยคแบบภาษาอังกฤษให้ false positive กับภาษาไทย เพราะภาษาไทยปกติไม่ใช้จุดเต็มเพื่อแบ่งประโยค จึงใช้การตรวจความยาวและอ่านความหมายแทน

## Gates ที่ยังเปิดอยู่

ไฟล์นี้ **ไม่ได้พิสูจน์** ว่าทั้งเว็บไซต์ผ่านการตรวจใน LLM session แยกต่างหากที่บทสนทนาเป็นภาษาไทยทั้งหมด ดังนั้น gate บังคับ `linguistic QA` ยังเปิดอยู่

render QA จริงบน desktop และ 390 px mobile, accessibility, PWA/offline และ language switching ก็ยังไม่เสร็จ

## สถานะ

ข้อความ UI และ semantic contract พร้อมสำหรับ gate ถัดไป สถานะที่ถูกต้องในตอนนี้คือ **semantic QA** ไม่ใช่ `linguistic QA`
