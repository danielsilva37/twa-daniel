<script setup>
import { ref, computed, watch } from 'vue'
import { byCategory, search, categories, sortByPrice } from './catalog.js'
import { getJSON } from './api/getJSON.js'
import { useLoad } from './composables/useLoad.js'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'

const { status, error, data: items, load } = useLoad(() => getJSON('/items.json'))

const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

const visible = computed(() => {
  let list = items.value ?? []
  if (category.value !== '') list = byCategory(list, category.value)
  list = search(list, query.value)
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))

const selected = computed(() =>
  (items.value ?? []).find((i) => i.id === selectedId.value),
)

const nextId = computed(() => Math.max(0, ...(items.value ?? []).map((i) => i.id)) + 1)

watch(query, () => {
  selectedId.value = null
})

function addItem(item) {
  items.value.push({ id: nextId.value, ...item })
}
</script>

<template>
  <h1>Catálogo de Livros</h1>

  <div class="controls">
    <input v-model="query" type="text" placeholder="Pesquisar..." />

    <select v-model="category">
      <option value="">All</option>
      <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
    </select>

    <button @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'">
      Ordenar por preço {{ sortDir === 'desc' ? '↓' : '↑' }}
    </button>
  </div>

  <p v-if="status === 'loading'">A carregar…</p>

  <div v-else-if="status === 'error'">
    <p>Erro: {{ error }}</p>
    <button @click="load">Tentar de novo</button>
  </div>

  <div v-else>
    <p v-if="visible.length === 0">Sem resultados para "{{ query }}"</p>
    <p v-else>{{ visible.length }} de {{ items.length }} itens</p>

    <ItemList :items="visible" :selected-id="selectedId" @select="selectedId = $event" />

    <ItemDetail v-if="selected" :item="selected" />

    <ItemForm :cats="cats" @save="addItem" />
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>