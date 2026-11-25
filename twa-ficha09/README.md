# TWA — Ficha 09

API de catálogo em Express com configuração por variáveis de ambiente,
validação com Zod, paginação e tratamento centralizado de erros.

## Como correr

Na pasta `twa-ficha09`, com Node.js 22.9 ou posterior:

```sh
npm install
npm run dev
```

A API arranca em `http://localhost:3000`. Para usar outra porta, cria um
`.env` a partir do `.env.example` e altera `PORT`.

Para correr o teste da Ficha 08, mantém o servidor na porta 3000 e, noutro
terminal na mesma pasta, executa:

```sh
node check.mjs
```

O teste passa quando termina sem apresentar mensagens.

## O que está feito

- Separação entre a aplicação (`app.js`), o arranque (`server.js`) e a configuração (`config.js`).
- Rotas, dados em memória e esquemas da entidade `items` em `src/entities/items`.
- Validação do POST, PUT, PATCH e dos parâmetros da listagem.
- Paginação em `/api/items?page=1&limit=2` e respostas de erro em JSON.

## Reflexão

1. O servidor valida porque qualquer cliente pode enviar pedidos diretamente à API. O Zod também limpa os dados, aplica valores por omissão e remove campos fora do esquema, como `id` e `foo`.
2. A rota ou a função de dados deteta que o recurso não existe e lança o `404`. O handler central formata a resposta para todas as entidades. No M2, pode também converter um `CastError` causado por um ID malformado num `400`.
3. O `.env` contém valores da máquina, como a porta e o endereço da base de dados, e pode conter credenciais. O `.env.example` documenta as variáveis com valores de exemplo. Guardar o `.env` no Git pode expor credenciais e partilhar configurações específicas de uma máquina.
4. Nos três frameworks, o POST tem uma rota, um handler e uma resposta JSON com estado HTTP. O Express usa middleware para validação e erros, o Fastify integra validação por esquema e o Hono usa middleware e APIs Web. Escolheria Hono para um Cloudflare Worker porque foi concebido para funcionar nesse runtime.

## Declaração de uso de IA
Esta ficha foi feita em casa com apoio de IA conforme permitido.