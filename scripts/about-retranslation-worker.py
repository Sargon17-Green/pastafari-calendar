#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, os, re, subprocess, textwrap
from html.parser import HTMLParser
from pathlib import Path

START_A='<<<ABOUT_HTML>>>'; END_A='<<<END_ABOUT_HTML>>>'
START_M='<<<MONSTER_HTML>>>'; END_M='<<<END_MONSTER_HTML>>>'
READ_TOOLS='shell(cat:*),shell(grep:*),shell(rg:*),shell(sed:*),shell(head:*),shell(tail:*),shell(wc:*),shell(find:*),shell(ls:*),shell(pwd:*)'
BASE='artifacts/about-retranslation-2026-10-04/staging'

class Shape(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False); self.tags=[]; self.ids=[]; self.details=0
    def handle_starttag(self,tag,attrs):
        d=dict(attrs); self.tags.append(('s',tag));
        if 'id' in d:self.ids.append(d['id'])
        if tag=='details': self.details+=1
    def handle_startendtag(self,tag,attrs): self.handle_starttag(tag,attrs); self.tags.append(('e',tag))
    def handle_endtag(self,tag): self.tags.append(('e',tag))

def copilot(prompt: str, cwd: Path, out: Path, share: Path|None=None, timeout=1800):
    cmd=['copilot','--no-custom-instructions','--no-ask-user','--no-color','-s','--allow-tool',READ_TOOLS]
    if share: cmd.append(f'--share={share}')
    p=subprocess.run(cmd,input=prompt,text=True,cwd=cwd,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=timeout,env=os.environ.copy())
    out.write_text(p.stdout,encoding='utf-8'); out.with_suffix(out.suffix+'.stderr.log').write_text(p.stderr,encoding='utf-8')
    return p.returncode

def pair(raw:str):
    def grab(a,b):
        i=raw.find(a); j=raw.find(b)
        if i<0 or j<0 or j<=i: raise ValueError(f'missing {a}/{b}')
        x=raw[i+len(a):j].strip()
        if x.startswith('```html'): x=x[7:]
        elif x.startswith('```'): x=x[3:]
        if x.endswith('```'): x=x[:-3]
        return x.strip()+'\n'
    return grab(START_A,END_A),grab(START_M,END_M)

def normalize(a,m,code,tag,direction):
    a=a.replace('href="./monster/"',f'href="./monster/{code}.html"').replace("href='./monster/'",f"href='./monster/{code}.html'")
    m=re.sub(r'<html\b[^>]*>',f'<html lang="{tag}" dir="{direction}">',m,count=1,flags=re.I)
    m=m.replace('href="../"',f'href="../?lang={code}"',1).replace("href='../'",f"href='../?lang={code}'",1)
    return a,m

def shape(s):
    p=Shape(); p.feed(s); p.close(); return p

def validate(repo,a,m,code,tag,direction):
    ha=(repo/'docs/about/content/he.html').read_text(encoding='utf-8'); hm=(repo/'docs/about/monster/index.html').read_text(encoding='utf-8')
    sa,ta=shape(ha),shape(a); sm,tm=shape(hm),shape(m); errs=[]
    if sa.tags!=ta.tags: errs.append('about tag sequence changed')
    if sa.ids!=ta.ids: errs.append('about id sequence changed')
    if ta.details!=64: errs.append(f'about details={ta.details}, expected 64')
    if sm.tags!=tm.tags: errs.append('monster tag sequence changed')
    if sm.ids!=tm.ids: errs.append('monster id sequence changed')
    if not re.search(rf'<html\s+lang="{re.escape(tag)}"\s+dir="{direction}">',m,re.I): errs.append('monster lang/dir wrong')
    if f'./monster/{code}.html' not in a: errs.append('localized monster link missing')
    if f'../?lang={code}' not in m: errs.append('localized back link missing')
    return errs

def write_pair(d,a,m):
    (d/'about.html').write_text(a,encoding='utf-8'); (d/'monster.html').write_text(m,encoding='utf-8')

def verdict(p,token):
    if not p.exists(): return None
    hits=[x.strip() for x in p.read_text(encoding='utf-8',errors='replace').splitlines() if x.strip() in {f'{token}: PASS',f'{token}: FAIL'}]
    return hits[0].split(':',1)[1].strip() if len(hits)==1 else None

def translation_prompt(code,tag,direction):
    return f'''Create a NEW from-scratch translation into natural publication-quality {tag} of BOTH Hebrew public pages below. The Hebrew files are the sole semantic source:
- docs/about/content/he.html
- docs/about/monster/index.html

Read both files completely. Translate directly from Hebrew; never use English or another language as a semantic pivot. Do NOT search for, read, imitate, patch, or repair older About translations. You MAY read docs/i18n/locales/{code}.js only for already-established target-language UI terminology and canonical localized forms of the 17 cutlet names and 47 month names; those established name forms control.

Preserve the exact HTML tag structure, order, ids, classes, data-* attributes, code literals, formulas, and all numerical values. Translate every reader-facing phrase, including headings, all 64 expandable name explanations, research caveats, button labels, the full Monster page and its complete penguin appendix. Preserve dry humor, deliberate over-explanation, the enthusiastic sales-pitch treatment of disadvantages/common calendar properties, invented syllable-sequence status, numeric-name tolerances, and the deliberately arbitrary Spleen extension without rationalizing them.

For the About fragment keep href="./monster/" unchanged. For the Monster document keep its current html lang/dir structure and href="../" unchanged; the pipeline adjusts only those machine fields later.

Return ONLY:
{START_A}
[complete translated About HTML fragment]
{END_A}
{START_M}
[complete translated Monster HTML document]
{END_M}
'''

NATIVE_EN='''You are an independent native-language linguistic reviewer for locale {{TAG}}. Conduct the entire review and final report only in the natural language of {{TAG}}. Another language may appear only when quoting unintended leakage or immutable names, identifiers, paths, formulas, or code literals.

Review BOTH complete candidates:
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/monster.html
You may inspect docs/i18n/locales/{{CODE}}.js solely for established terminology and canonical localized calendar names. Do not use an older About translation as authority and do not modify files.

Actively find translationese; grammar, syntax, agreement, morphology, spelling, punctuation or typography errors; unnatural collocations; wrong register; Hebrew/English leakage; incorrect treatment of proper names; awkward literal calques; broken dry humor; ambiguity introduced by translation; gratuitously long or poorly wrapping wording. Pay special attention to all 64 expandable calendar-name explanations, the deliberately absurd numeric and Spleen notes, the sales-pitch section, and the complete penguin appendix.

Report every real finding with file, section/name, reason, and an exact replacement in {{TAG}} when practical. If any substantive linguistic problem remains, fail. End with exactly one machine-readable line:
NATIVE_QA_RESULT: PASS
or
NATIVE_QA_RESULT: FAIL
'''

SEM_HE='''אתה מבקר סמנטי עצמאי. השווה ישירות, סעיף מול סעיף, בין שני מקורות העברית:
- docs/about/content/he.html
- docs/about/monster/index.html
לבין שני התרגומים המועמדים:
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/about.html
- artifacts/about-retranslation-2026-10-04/staging/{{CODE}}/monster.html

אל תשתמש באנגלית או בתרגום ישן כמקור ביניים. מותר לעיין ב-docs/i18n/locales/{{CODE}}.js רק כדי לבדוק את הצורות המקומיות שכבר נקבעו לשמות ולמינוח הממשק. אל תשנה קבצים.

בדוק שלא נשמט דבר ולא נוסף תוכן מהותי, ושאין שינוי במשמעות, במספרים, בנוסחאות, ביחסי c/t, בשנת 5000, במבנה השנים/קציצות/חודשים, בגבול היום, בסייגי המחקר, במעמד Seer והקאנון, או בנספח הפינגווינים. בדוק במיוחד את כל 64 השמות וההסברים: זהות השם בשפת היעד, רצפי ההברות המומצאים, סטיית 4/9 עד e/103 כולל הקצוות, סטיית 3/5 עד 1/367 כולל הקצוות, וכל תנאי ההרחבה השרירותית של ״טחול״. ודא שהחסרונות בסעיף ״מעלות״ נשארו חסרונות שמשווקים בהתלהבות ולא קיבלו הצדקה רצינית חדשה, ושההסברים המיותרים בכוונה נשארו מפורטים ומיותרים.

ציין כל פער מהותי עם קובץ, סעיף, תיאור מדויק והצעת תיקון. אם נשאר אפילו פער סמנטי מהותי אחד, הכשל את הבדיקה. סיים בדיוק בשורה אחת:
SEMANTIC_QA_RESULT: PASS
או
SEMANTIC_QA_RESULT: FAIL
'''

def make_native(repo,d,code,tag):
    src=NATIVE_EN.replace('{{TAG}}',tag).replace('{{CODE}}',code)
    req=f'''Translate the reviewer protocol below into natural {tag}. This translated text will be the ONLY user prompt in a fresh reviewer session, so all ordinary instruction prose must be in {tag}. Preserve paths, placeholders, immutable technical tokens, and exactly the lines NATIVE_QA_RESULT: PASS and NATIVE_QA_RESULT: FAIL. Output only the translated reviewer prompt.

{src}'''
    raw=d/'native-prompt-translation.txt'
    if copilot(req,repo,raw,d/'native-prompt-translator-session.md',900)!=0: return False
    text=raw.read_text(encoding='utf-8')
    ok='NATIVE_QA_RESULT: PASS' in text and 'NATIVE_QA_RESULT: FAIL' in text
    if ok:(d/'native-review-prompt.txt').write_text(text,encoding='utf-8')
    return ok

def review(repo,d,cycle,kind,code,tag):
    if kind=='native': prompt=(d/'native-review-prompt.txt').read_text(encoding='utf-8'); tok='NATIVE_QA_RESULT'
    else: prompt=SEM_HE.replace('{{CODE}}',code).replace('{{TAG}}',tag); tok='SEMANTIC_QA_RESULT'
    out=d/f'{kind}-review-{cycle}.md'; copilot(prompt,repo,out,d/f'{kind}-review-{cycle}-session.md',1200)
    return verdict(out,tok)

def repair(repo,d,cycle,code,tag,direction,native,semantic):
    reports=[]
    for p in (native,semantic):
        if p and p.exists(): reports.append(p.as_posix()+"\n"+p.read_text(encoding='utf-8',errors='replace'))
    prompt=f'''Repair the current staged {tag} translations using the QA findings below. Hebrew source files are the sole semantic authority. Do not use older About translations or another pivot language. You may inspect docs/i18n/locales/{code}.js only for established terminology and canonical localized names. Preserve exact HTML structure, ids, classes, data attributes, formulas, code literals, and numbers. Return only the complete corrected pair using the four required delimiters.

'''+ '\n\n'.join(reports)+f'''
{START_A}
[complete corrected About HTML]
{END_A}
{START_M}
[complete corrected Monster HTML]
{END_M}
'''
    raw=d/f'repair-{cycle}.raw.txt'
    if copilot(prompt,repo,raw,d/f'repair-{cycle}-session.md',1800)!=0:return False
    try:a,m=pair(raw.read_text(encoding='utf-8')); a,m=normalize(a,m,code,tag,direction)
    except Exception as e:(d/f'repair-{cycle}-parse-error.txt').write_text(str(e),encoding='utf-8');return False
    errs=validate(repo,a,m,code,tag,direction)
    if errs:(d/f'repair-{cycle}-structure-errors.txt').write_text('\n'.join(errs)+'\n',encoding='utf-8');return False
    write_pair(d,a,m); return True

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--code',required=True); ap.add_argument('--tag',required=True); ap.add_argument('--dir',required=True,choices=['ltr','rtl']); ap.add_argument('--max-cycles',type=int,default=3); args=ap.parse_args()
    repo=Path.cwd().resolve(); d=repo/BASE/args.code; d.mkdir(parents=True,exist_ok=True)
    status={'code':args.code,'tag':args.tag,'dir':args.dir,'translation':'FAIL','native_qa':'NOT_RUN','semantic_qa':'NOT_RUN','final':'FAIL','cycles':0}
    (d/'locale.json').write_text(json.dumps({'code':args.code,'tag':args.tag,'dir':args.dir},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (d/'source-head.txt').write_text(subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()+'\n',encoding='utf-8')
    raw=d/'translation.raw.txt'
    if copilot(translation_prompt(args.code,args.tag,args.dir),repo,raw,d/'translation-session.md')!=0: status['error']='translator process failed'; (d/'status.json').write_text(json.dumps(status,indent=2)+'\n'); return 0
    try:a,m=pair(raw.read_text(encoding='utf-8')); a,m=normalize(a,m,args.code,args.tag,args.dir)
    except Exception as e: status['error']=f'translation parse: {e}'; (d/'status.json').write_text(json.dumps(status,indent=2)+'\n'); return 0
    errs=validate(repo,a,m,args.code,args.tag,args.dir)
    if errs: status['error']='initial structure: '+'; '.join(errs); (d/'status.json').write_text(json.dumps(status,indent=2)+'\n'); return 0
    write_pair(d,a,m); status['translation']='PASS'
    if not make_native(repo,d,args.code,args.tag): status['error']='could not create target-language QA prompt'; (d/'status.json').write_text(json.dumps(status,indent=2)+'\n'); return 0
    for cycle in range(1,args.max_cycles+1):
        status['cycles']=cycle
        nv=review(repo,d,cycle,'native',args.code,args.tag); status['native_qa']=nv or 'INVALID_OUTPUT'
        if nv!='PASS':
            if cycle==args.max_cycles or not repair(repo,d,cycle,args.code,args.tag,args.dir,d/f'native-review-{cycle}.md',None): break
            continue
        sv=review(repo,d,cycle,'semantic',args.code,args.tag); status['semantic_qa']=sv or 'INVALID_OUTPUT'
        if sv=='PASS':
            errs=validate(repo,(d/'about.html').read_text(encoding='utf-8'),(d/'monster.html').read_text(encoding='utf-8'),args.code,args.tag,args.dir)
            if not errs: status['final']='PASS'
            else: status['error']='final structure: '+'; '.join(errs)
            break
        if cycle==args.max_cycles or not repair(repo,d,cycle,args.code,args.tag,args.dir,None,d/f'semantic-review-{cycle}.md'): break
        # semantic repair must go through native QA again in the next cycle
    (d/'status.json').write_text(json.dumps(status,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return 0
if __name__=='__main__': raise SystemExit(main())
