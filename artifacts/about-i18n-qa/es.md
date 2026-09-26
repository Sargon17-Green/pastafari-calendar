# QA de español — estado intermedio de todo el sitio

## Alcance

La revisión cubre `es-ES` en todo el sitio, no solo `/about/`: UI principal, búsqueda de fechas, día de trabajo, comparación, vista anual, búsqueda inversa, errores y estados, guía de usuario, footer, metadata, manifest y textos ARIA/accesibilidad.

## Correcciones

- Se añadieron las cuatro claves contractuales que faltaban.
- Se restauró el significado completo y actual en `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` y `guide.6.body`.
- Queried day/date se unificó como `día consultado / fecha consultada`.
- Se eliminaron restos de inglés técnico en `/about/`: all-day, términos mixtos de Seer, hosted production y similares.

## Verificación

- 258/258 message keys.
- Sin claves faltantes ni extra.
- Todos los conjuntos `{placeholder}` coinciden con el contrato inglés.
- Sin truncamientos semánticos sospechosos.
- `/about/` contiene exactamente 29 stable IDs en el mismo orden que el semantic master, sin duplicados.
- Las dos tablas tienen 19 y 9 filas.
- No hay texto hebreo accidental.
- El escaneo dirigido de English technical prose queda limpio; la coincidencia final con `locales` era el plural español normal de `local`, no una fuga del literal API.
- Se conservaron las fórmulas, hashes y literales obligatorios, incluidos `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` y `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Gates abiertos

Este archivo **no demuestra** que todo el sitio haya sido revisado en una sesión LLM separada cuya conversación se llevara íntegramente en español. Por tanto, el gate obligatorio de `linguistic QA` sigue abierto.

También quedan pendientes el render QA real en desktop y 390 px mobile, accessibility, PWA/offline y language switching.

## Estado

Texto, UI y semantic contract están listos para el siguiente gate. El estado correcto ahora es **semantic QA**, no `linguistic QA`.
