# QA en galego — todo o sitio

## Encargo desta revisión

Traballar só en galego. Ler todo o texto visible do sitio do Calendario Pastafari para o locale `gl-ES`, non só o artigo `/about/`. Buscar expresamente:
- restos de portugués, castelán, inglés ou doutras linguas que non sexan intencionados;
- frases comprensibles pero pouco naturais, con aspecto de tradución literal;
- terminoloxía incoherente entre a interface principal, o día de acción, a comparación, a estrutura anual, a guía, a busca inversa e `/about/`;
- erros de gramática, concordancia, rexencia, ortografía, puntuación ou rexistro;
- claves de mensaxe ausentes ou `{placeholder}` modificados;
- ID estables, fórmulas, hashes, nomes de API ou nomes canónicos que se alterasen por erro.

Un texto non se aproba só por ser comprensible. Debe lerse como unha versión galega autónoma e natural. Os nomes algorítmicos reais, nomes de produto, identificadores de API/CLI e literais de código poden conservar a forma técnica; a prosa técnica ordinaria debe estar en galego.

## Achado principal: a interface non estaba realmente en galego

A maior parte da interface visible de `gl-ES` procedía en realidade do portugués, ás veces mesturado con palabras galegas. Había exemplos claros como:
- `Um calendario pastafári com busca...`;
- `Encontre um día...`;
- `Que día você gostaria de encontrar?`;
- `Alterar o día de trabalho`;
- `almôndega`;
- `Não foi possível...`;
- `Voltar à busca e ao calendario`.

A revisión atopou 162 valores exactamente iguais aos do locale portugués antes da reparación. Non se trataba dun problema local do artigo, senón dun defecto de idioma de todo o locale.

A interface principal, a configuración do día de acción, a comparación, as entradas de calendarios, as mensaxes de erro, a vista anual, a guía e o footer reescribíronse en galego.

## Terminoloxía unificada

A interface tiña tres termos competidores para os mesmos conceptos: `día de trabalho`, `día de traballo` e `día de acción`; e tamén `almôndega`, `costeleta` e `croqueta`.

A versión revisada usa de forma coherente:
- `día de acción` para o day of working/action day;
- `día consultado` para o queried/target day;
- `croqueta`;
- `mes`;
- `busca inversa`;
- `comparación`;
- `cálculo`.

A parte avanzada da busca inversa xa estaba maioritariamente en galego e conservouse, facendo só as normalizacións necesarias para esta terminoloxía.

## Claves que faltaban

Antes da revisión faltaban catro claves do contrato inglés de mensaxes:
- `app.brand`;
- `reverse.error.limitPositive`;
- `reverse.error.limitSafeInteger`;
- `reverse.error.absoluteDateField`.

Engadíronse as catro en galego.

## Nomes canónicos de presentación

Os nomes traducibles de croquetas e meses estaban tamén en portugués. Reescribíronse en galego sen tocar os identificadores canónicos internos. Exemplos:
- `Escorpião` → `Escorpión`;
- `O jarro vazio` → `O tarro baleiro`;
- `Romã` → `Granada`;
- `Cotovelo` → `Cóbado`;
- `Creme dental` → `Pasta de dentes`;
- `Estanho` → `Estaño`;
- `Névoa` → `Néboa`;
- `Poço` → `Pozo`;
- `Gema` → `Xema`;
- `A porta fechada` → `A porta pechada`;
- `Farinha` → `Fariña`;
- `Língua` → `Lingua`;
- `Linho` → `Liño`.

Os nomes propios e identificadores internacionais, como `Lagash`, `Akkad`, `Eridu`, `Uruk`, `Nineveh/Nínive`, `Karshumav`, `Palgurash`, etc., só se adaptaron cando a lingua ten unha forma normal de uso; non se inventaron nomes canónicos novos.

## Revisión lingüística de /about/

O artigo era semanticamente completo, pero conservaba unha gran cantidade de prosa técnica en inglés. Reescribiuse en galego, entre outros:
- `canonical` → `canónico`;
- `specification` → `especificación`;
- `implementation` → `implementación`;
- `deterministic` → `determinista`;
- `selection space` → `espazo de selección`;
- `rejection sampling` → `mostraxe por rexeitamento`;
- `modulo bias` → `nesgo de módulo`;
- `computational sample` → `mostra computacional`;
- `mathematical independence` → `independencia matemática`;
- `probability theorem` → `teorema de probabilidade`;
- `recurrence coordinates` → `coordenadas de recorrencia`;
- `physical moment` → `instante físico`;
- `generic injectivity` → `inxectividade xenérica`;
- `generic invertibility` → `invertibilidade xenérica`;
- `side information` → `información auxiliar`;
- `affine periodicity` → `periodicidade afín`;
- `asymptotic structure` → `estrutura asintótica`.

O uso de `nesgo` está documentado en prosa académica galega para o concepto estatístico/psicométrico de bias, polo que se preferiu fronte a un castelanismo.

Para o límite astronómico do día non se inventou unha suposta denominación normativa sen base. Empregouse unha descrición precisa: `tránsito meridiano inferior topocéntrico do centro de Venus polo meridiano local`.

## Termos técnicos que se conservan deliberadamente

Mantéñense como nomes reais ou identificadores:
- `Short Choice`;
- `Wide Choice`;
- `SAVE`;
- `day-id`;
- `RRULE:FREQ=YEARLY`;
- `Pastafarian Calendar Seer`;
- Node API, CLI, HTTP v1, OpenAPI 3.1 e SIMD;
- nomes de endpoint como `date`, `now`, `range`, `batch`, `year`, `reverse`, `metadata`, `locales` e `status`;
- `cold wake`, como termo operativo específico do ensaio descrito.

Non se consideran “fugas de inglés” cando funcionan como nomes técnicos reais. O texto explicativo que os rodea si está en galego.

## Comprobacións finais

- O contrato inglés contén 258 claves de mensaxe; todas están presentes directamente en `gl-ES`.
- Ningún conxunto de `{placeholder}` difire do contrato.
- A busca dirixida de portugués na interface non devolve restos non intencionados.
- `/about/` contén exactamente os mesmos 29 ID estables, na mesma orde, que o semantic master hebreo; non hai ID duplicados.
- As dúas táboas semánticas teñen 19 e 9 filas.
- Mantéñense todas as fórmulas, números fixos, hash e literais de código esixidos.
- Non hai texto hebreo non intencionado no artigo galego.
- A busca final de prosa técnica inglesa non deixa restos non intencionados; os identificadores técnicos reais permanecen como tales.

## Estado

A revisión semántica e lingüística textual de todo o locale está rematada. A revisión visual/renderizada e o estado final `PASS` seguen sendo unha fase posterior separada.
