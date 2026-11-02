# Ficha 06 — Rotas e paginação

## Como correr
npm install && npm run dev

## O que está feito
- Vue Router com três páginas à volta dos componentes da Ficha 05: `CatalogPage` (`/`), `ItemPage` (`/items/:id`) e `NewItemPage` (`/items/new`), mais uma rota apanha-tudo com `NotFound` (404).
- O estado saiu do `App.vue` para `src/store.js` (refs ao nível do módulo), por isso sobrevive à navegação.
- `App.vue` ficou só com o `<nav>` e o `<RouterView>`.
- O detalhe lê o id do URL (`route.params.id`) e mostra "not found" se o item não existe.
- `/pokemon?page=N`: lista paginada da PokéAPI, com a página no URL (`route.query`), `watch` + `useLoad`, botões Prev/Next desativados nos extremos e "Page x of y".
- `catalog.js` e `check.js` reaproveitados (`node check.js` passa em silêncio).

## Declaração de IA
Esta ficha foi feita em casa com apoio de IA conforme permitido.

## Perguntas de reflexão
1. Com um `ref`, o reload voltava à página 1, o botão back não recuava de página e não dava para enviar o link da página 3. No URL, tudo isso funciona.
2. O item aparece na lista porque o `store.js` é um módulo avaliado uma vez e os refs ficam em memória enquanto a app corre. No reload a app arranca de novo e o store volta a ser carregado do `items.json`, por isso o item criado desaparece. No M2 a API guarda os dados, e sobrevivem ao reload.
3. `/` → `/items/1` monta o `ItemPage`, por isso corre o `onMounted`. `/items/1` → `/items/2` reutiliza o componente e o `onMounted` não volta a correr, por isso preciso de um `watch` quando tenho de fazer algo (como carregar dados) ao mudar o id.
4. Para o projeto, SPA: é uma app com dados e ecrãs interativos, sem necessidade de SEO. Para o site público da ISLA, SSR ou SSG: o conteúdo tem de aparecer logo na primeira pintura e ser indexado pelos motores de busca.