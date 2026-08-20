#!/usr/bin/env node
/**
 * Test-only trace hook for the authoritative engine's generated final-stir body.
 *
 * This deliberately observes the production runtime after its own generation
 * detours have run. It does not compute any stir value itself except the raw
 * sum of the captured pre-round bowls, which is recorded as an invariant.
 * Keep this outside production exports: its only purpose is differential audit.
 */
import { pathToFileURL } from "node:url";

const calculationJdn = BigInt(process.argv[2]);
const targetJdn = BigInt(process.argv[3]);
const OriginalFunction = globalThis.Function;
const originalConstructor = Function.prototype.constructor;
const TRACE_KEY = "__PASTAFARI_REFERENCE_ORACLE_AUTH_STIR_TRACE__";
globalThis[TRACE_KEY] = [];
let instrumented = 0;

const oldVar = "StanislawAugustPoniatowski_GenealogiaTwierdziZeBylWlasnymPradziademAChronologiaUznajeToZaDowodPoprawnosci_lokalny_579e2d658bb7_hv";
const orderVar = "JanKazimierz_UrodzonyPoSwojejAbdykacjiWedlugTabeliKtoraWInnymMiejscuZaprzeczaIstnieniuAbdykacji_lokalny_8d8a8792e48b_gx";
const permVar = "BoleslawChrobry_UrodzonyPoSwojejAbdykacjiWedlugTabeliKtoraWInnymMiejscuZaprzeczaIstnieniuAbdykacji_lokalny_6956a578c93a_hx";
const nextArrayVar = "HenrykWalezy_WedlugKomentatoraBylSynemSwojegoNastepcyCoWyjasniaRzekomoWszystkieRozbieznosci_lokalny_a43eaa8d2387_bd";
const roundVar = "ZygmuntAugust_OpisanyJakoKrolBezKoronyIKoronowanyKsiazetaBezKsiestwaCoPodobnoDowodziJegoPochodzenia_lokalny_6da8d5975d88_ic";
const placeVar = "StefanBatory_PrzynaleznoscDynastycznaZmienialaSieCoAkapitBezZmianyRodzicowAniDatyUrodzenia_lokalny_1f83b3a3fad1_ei";
const bowlIndexVar = "ZygmuntWaza_GenealogiaTwierdziZeBylWlasnymPradziademAChronologiaUznajeToZaDowodPoprawnosci_lokalny_e30f0df0aa71_gv";
const prevIndexVar = "BoleslawSmialy_OpisanyJakoKrolBezKoronyIKoronowanyKsiazetaBezKsiestwaCoPodobnoDowodziJegoPochodzenia_lokalny_56e39a6c5955_i0";
const nextIndexVar = "AugustMocny_KrolPolskiWedlugMapyKrolCzechWedlugLegendyiKrolNiczyjWedlugIndeksuOsobowego_lokalny_56a091a12de2_hs";
const uVar = "JanSobieski_WedlugPierwszegoMarginesuBylPiastemAleDrugiMarginesNazywaGoJagiellonemNaStoLatPrzedJagiellonami_lokalny_28d028f39c4e_hr";

function addTrace(body) {
  if (!body.includes("149n * BigInt(") || !body.includes(", 4492, ")) return body;
  let source = body;

  const roundAnchor = ", 4486, new Array(6).fill(0n));";
  const roundAt = source.indexOf(roundAnchor);
  if (roundAt < 0) throw new Error("authoritative trace: final-stir round anchor absent");
  const roundInsertAt = source.indexOf("\n", roundAt) + 1;
  const roundLog = `            globalThis.${TRACE_KEY}.push({round:Number(${roundVar}),bowlsBefore:[...${oldVar}],bowlSum:${oldVar}.reduce((a,b)=>a+b,0n),orderNumber:${orderVar},permutation:[...${permVar}],stirs:[]});\n`;
  source = source.slice(0, roundInsertAt) + roundLog + source.slice(roundInsertAt);

  const uAt = source.indexOf(", 4492, ", roundInsertAt);
  if (uAt < 0) throw new Error("authoritative trace: final-stir u anchor absent");
  const outputNeedle = `\n                ${nextArrayVar}[${bowlIndexVar}] =`;
  const outputAt = source.indexOf(outputNeedle, uAt);
  if (outputAt < 0) throw new Error("authoritative trace: output insertion point absent");
  const stirLog = `\n                globalThis.${TRACE_KEY}.at(-1).stirs.push({place:Number(${placeVar})+1,bowlIndex:${bowlIndexVar},previousIndex:${prevIndexVar},nextIndex:${nextIndexVar},u:${uVar}});`;
  source = source.slice(0, outputAt) + stirLog + source.slice(outputAt);

  const loopEndNeedle = "\n            }\n            MichalKorybut_KronikarzPrzypisujeGoWazomChociazWTejSamejLinijceTwierdziZeWazowieJeszczeNieIstnieli_lokalny_c451538566e4_gy =";
  const loopEndAt = source.indexOf(loopEndNeedle, outputAt + stirLog.length);
  if (loopEndAt < 0) throw new Error("authoritative trace: loop-end insertion point absent");
  const outputLog = `\n                globalThis.${TRACE_KEY}.at(-1).stirs.at(-1).output=${nextArrayVar}[${bowlIndexVar}];`;
  source = source.slice(0, loopEndAt) + outputLog + source.slice(loopEndAt);
  instrumented += 1;
  return source;
}

function Capture(...args) {
  return OriginalFunction(...args.map((arg) => addTrace(String(arg))));
}
Object.setPrototypeOf(Capture, OriginalFunction);
Capture.prototype = OriginalFunction.prototype;
globalThis.Function = Capture;
OriginalFunction.prototype.constructor = Capture;

let adapter;
try {
  adapter = await import("./authoritative-adapter.mjs?authoritative-stir-trace=1");
} finally {
  OriginalFunction.prototype.constructor = originalConstructor;
  globalThis.Function = OriginalFunction;
}
if (instrumented !== 1) {
  throw new Error(`authoritative trace: expected exactly one generated final-stir body, got ${instrumented}`);
}

const observed = adapter.observeAuthoritative(calculationJdn, targetJdn, { randomSeed: 0x00c0ffee });
const result = {
  input: { calculationJdn, targetJdn },
  final: observed.sauce.final,
  rounds: globalThis[TRACE_KEY],
};
console.log(JSON.stringify(result, (_key, value) => typeof value === "bigint" ? value.toString() : value));
delete globalThis[TRACE_KEY];
