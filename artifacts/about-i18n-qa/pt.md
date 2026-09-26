# QA Português (Brasil) — estado intermediário do site inteiro

## Escopo

A revisão cobre `pt-BR` no site inteiro, não apenas `/about/`: interface principal, busca de data, dia de trabalho, comparação, visão anual, busca inversa, erros e estados, guia do usuário, footer, metadata, manifest e textos ARIA/acessibilidade.

## Correções

Faltavam quatro chaves do contrato:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

`manifest.defaultDescription` estava em inglês.

Também foram restauradas informações semânticas em `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body` e `guide.6.body`: dia Pastafari atual como padrão, localização ativa do observador, limite astronômico baseado em Vênus conforme `ASTRONOMICAL-DAY.md`, reset de busca e dia de trabalho e persistência do dia de trabalho escolhido.

Queried day foi uniformizado como `dia consultado` e queried date como `data consultada`.

## `/about/`

Foram removidos os poucos resíduos de inglês comum:
- `all-day` em prosa virou “evento de dia inteiro”;
- os endpoints do Seer ficaram como literais em `code`;
- `native`, `container`, `exact`, `restart` e `hosted production` foram naturalizados;
- a conversão reversa usa “dia consultado”.

Commits principais:
- `695af888784c600d8dda2702aa53d86a1d29c5e9`
- `12370d13809b6be72568f208bf1b9cedca23aa53`

## Verificação

- 258/258 message keys.
- Nenhuma chave ausente ou extra.
- Todos os conjuntos `{placeholder}` coincidem com o contrato em inglês.
- Nenhuma abreviação semântica suspeita.
- As coincidências exatas com espanhol são poucas e compatíveis com nomes, formatos e formas genuinamente compartilhadas; não há sinal de fallback amplo.
- `/about/` preserva exatamente 29 stable IDs na mesma ordem do semantic master, sem duplicatas.
- As tabelas têm 19 e 9 linhas.
- Não há hebraico acidental.
- A busca direcionada por prosa técnica inglesa comum está limpa.
- Fórmulas, hashes e literais obrigatórios continuam intactos, incluindo `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149` e `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Gates ainda abertos

Este arquivo **não prova** que o site inteiro foi revisado em uma sessão LLM separada cuja própria conversa ocorreu integralmente em português brasileiro. Portanto o gate obrigatório de `linguistic QA` continua aberto.

Também faltam render QA real em desktop e 390 px mobile, accessibility, PWA/offline e language switching.

## Status

Texto, UI e contrato semântico estão prontos para o próximo gate. O estado correto agora é **semantic QA**, não `linguistic QA`.
