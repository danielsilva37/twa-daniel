# Ficha 08 — Uma API REST com Express

## Como correr
npm install && npm run dev
(servidor em http://localhost:3000; com ele a correr, `node check.mjs` noutro terminal)

## O que está feito
- Servidor Express 5 com `"type": "module"` e `node --watch`.
- `GET /api/items` (com `?q=`), `GET /api/items/:id` (404 em JSON), `POST` (201 ou 400 com `errors`), `PUT` e `DELETE` (204).
- Rotas num `Router()` em `src/items/router.js`; `app.js` só tem os middlewares (logger, `express.json()`, 404 em JSON) e monta o router.
- Dados em memória, carregados de `data/items.json`; `catalog.js` reutilizado na pesquisa.
- `check.mjs` testa a API com `fetch` e `node:assert` (silêncio = tudo bem).

## Declaração de IA
Esta ficha foi feita em casa com apoio de IA conforme permitido.

## Perguntas de reflexão
1. Quem decide o estado é o servidor. O `fetch` só rejeita quando não há resposta; um 404 é uma resposta válida (o servidor respondeu), por isso chega como `res.ok === false` e cabe ao cliente decidir o que fazer.
2. O `express.json()` tem de estar antes das rotas porque a fila de middlewares corre por ordem: se vier depois, o handler já correu e `req.body` é `undefined`. Sem o cabeçalho `Content-Type: application/json`, o `express.json()` não lê o corpo e `req.body` fica `undefined`.
3. Igual: os dados vivem em memória e desaparecem. Diferente: o `create()` do M1 corre no browser e o POST corre num servidor. No M2 o MongoDB guarda os dados e eles sobrevivem ao reinício.
4. Igual: rota, handler, resposta em JSON e código de estado. Diferente: o Laravel dá muito feito (modelo, validação, ORM) e cada pedido corre num processo novo; o Node mantém o processo a correr, por isso o array em memória sobrevive entre pedidos, e em PHP não sobreviveria.