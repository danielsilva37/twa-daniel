# Ficha 04 — O catálogo em Vue

## Como correr
npm install && npm run dev

## O que está feito
- Projeto Vite com template Vue, componente único `App.vue` (`<script setup>`, `<template>`, `<style scoped>`).
- Estado em `ref`, valores derivados em `computed` (`visible`, `cats`, `selected`).
- `load()` com fetch a `/items.json` e os estados loading / error / ready (com botão "Tentar de novo").
- Pesquisa, filtro por categoria, ordenação por preço e detalhe do item selecionado.
- `catalog.js` e `check.js` reaproveitados da Ficha 03 (`node check.js` passa em silêncio).

## Declaração de IA
Esta ficha foi feita em casa com apoio de IA conforme permitido.

## Perguntas de reflexão
## Perguntas de reflexão
1. O estado (`state`) passou para os `ref` no `App.vue`. O `render()` desapareceu: o `<template>` descreve a página e o Vue desenha-a. Os handlers (`addEventListener`) passaram a `v-model` e `@click` no template.
2. Um `ref` é uma caixa com o valor lá dentro. No script uso `.value` para abrir a caixa; no template o Vue abre-a por mim, por isso escrevo só `items`.
3. O `computed` recalcula-se sozinho quando `items`, `query`, `category` ou `sortDir` mudam. Com um `ref` eu tinha de o atualizar à mão em cada handler, e se me esquecesse de um, a lista ficava desatualizada.
4. O `:key` deixa o Vue identificar cada item da lista, para reaproveitar o elemento certo quando a lista muda. Se usar o índice numa lista que reordena, a chave passa a apontar para outro item e o Vue pode reaproveitar o elemento errado (por exemplo, trocar o estado ou o foco).