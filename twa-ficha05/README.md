# Ficha 05 — Componentes e formulários

## Como correr
npm install && npm run dev

## O que está feito
- `App.vue` dividido em componentes filhos: `ItemList`, `ItemDetail` e `ItemForm`.
- Props para baixo (`defineProps`) e eventos para cima (`defineEmits`): `select` e `save`.
- Formulário com rascunho (`reactive`), `v-model` com modificadores, validação em HTML e em `computed`.
- `useLoad` (composable) com os estados loading / error / ready e `getJSON` em `src/api`.
- `watch(query)` que limpa a seleção ao escrever na pesquisa.
- `catalog.js` e `check.js` reaproveitados (`node check.js` passa em silêncio).

## Declaração de IA
Esta ficha foi feita em casa com apoio de IA conforme permitido.

## Perguntas de reflexão
1. O filho recebe `selectedId` como prop, que é só de leitura e pertence ao pai. Com o `emit`, o filho só pede e o pai decide, por isso o estado fica num único sítio.
2. Se o valor é calculado a partir de outros (`visible`), uso `computed`. Se tenho de fazer algo quando um valor muda (limpar a seleção), uso `watch`.
3. O `useLoad` poupa-me repetir o `load`, os três estados e o `onMounted` em cada ecrã. Se o `onMounted` estivesse no componente, cada ecrã teria de o escrever e eu podia esquecer-me.
4. O HTML dá resposta rápida, mas pode ser contornado. O `computed` protege o submit no browser, mas o DOM pode ser alterado. Só a validação da API protege os dados, porque qualquer pessoa pode chamá-la sem passar pelo meu formulário.