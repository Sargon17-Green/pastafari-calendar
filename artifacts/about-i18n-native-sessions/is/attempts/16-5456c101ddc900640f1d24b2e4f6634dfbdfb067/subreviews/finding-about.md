Okay, hér er rýndur matur á `ABOUT`-partinn, með áherslu á að vera nákvæmur, strangur og að gefa nákvæma staðsetningu og alvarlegheit fyrir hvert fund.

```
FINDINGS_ONLY
SOURCE_PART=ABOUT

===== docs/about/content/is.html — FULL TARGET ABOUT ARTICLE =====
<!-- Íslenska útgáfan er skrifuð beint út frá hebreska frumtextanum sem er merkingarlegur grunnur; ekkert millimál er notað. -->
<!-- Auðkenni kaflanna eru hluti af stöðugum opinberum samningi um djúptengla og eru ekki leidd af þýddum fyrirsögnum. -->
<div class="about-section about-lead" id="about-calendar">
  <p>Pastafari-dagatalið er dagatalið þar sem tíminn varð til. Reiknilög þess eru nákvæmlega skilgreindar.</p>
  <p>Dagatalið úthlutar ekki hverjum degi fastri, óbreytanlegri Pastafari-framsetningu. Til að reikna dagsetningu þarf að tilgreina tvo daga: <strong>aðgerðardaginn</strong>, sem útreikningurinn hefst frá, og <strong>fyrirspurnardaginn</strong>, sem þú vilt fá dagsetningu fyrir.</p>
  <p>Ef við táknum aðgerðardaginn með <code>c</code> og fyrirspurnardaginn með <code>t</code>, er dagsetningin</p>
  <pre class="math-block" dir="ltr" tabindex="0"><code>F(c,t)</code></pre>
  <p>en ekki <code>F(t)</code>. Sami fyrirspurnardagur getur því fengið aðra Pastafari-dagsetningu þegar aðgerðardagurinn breytist.</p>
  <p>Þetta er ekki villa. Dagatalið er skilgreint einmitt svona.</p><hr>
</div>

<section class="about-section" id="date-parts" data-toc-section data-toc-level="2">
  <h2>Úr hverju samanstendur Pastafari-dagsetning?</h2>
  <p>Hún hefur <strong>nákvæmlega fimm hluta</strong>: árnúmer, nafn kótelettu, dag innan kótelettu, nafn mánaðar og dag innan mánaðar.</p>
  <p>Almennt dæmi: <strong>ár 5000, kóteletta A, dagur 417 í kótelettunni, mánuður B, dagur 83 í mánuðinum.</strong></p>
  <p>Aðgerðardagurinn, staðsetning athugandans, auðkenni dagsins á tímalínunni eða aðrar tæknilegar upplýsingar mega birtast við hlið dagsetningarinnar, en þær eru ekki sjötta dagsetningarreiturinn.</p><hr>
</section>

<section class="about-section" id="working-day" data-toc-level="2">
  <h2>Af hverju þarf aðgerðardag?</h2>
  <p>Í venjulegum dagatölum er eðlilegt að hugsa sér að dagsetningin „tilheyri“ sjálfum deginum. Í Pastafari-dagatalinu ræðst dagsetningin af sambandi tveggja daga.</p>
