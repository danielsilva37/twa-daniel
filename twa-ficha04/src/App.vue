<script setup>
import { ref, computed } from 'vue'
import { byCategory, search, categories, sortByPrice } from './catalog.js'

const status = ref('loading') // 'loading' | 'error' | 'ready'
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

async function load() {
  status.value = 'loading'
  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    items.value = data
    status.value = 'ready'
  } catch (err) {
    error.value = err.message
    status.value = 'error'
  }
}

const visible = computed(() => {
  let list = items.value
  if (category.value !== '') list = byCategory(list, category.value)
  list = search(list, query.value)
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value))

const selected = computed(() =>
  items.value.find((i) => i.id === selectedId.value),
)

load()
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

    <ul id="list">
      <li
        v-for="item in visible"
        :key="item.id"
        :class="{ selected: item.id === selectedId }"
        @click="selectedId = item.id"
      >
        {{ item.name }} — {{ item.price }}€
      </li>
    </ul>

    <section v-if="selected">
      <h2>{{ selected.name }}</h2>
      <p>Preço: {{ selected.price }}€</p>
      <p>Tags: {{ selected.tags.join(', ') }}</p>
      <p>Autor: {{ selected.author.name }} ({{ selected.author.country }})</p>
    </section>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

#list {
  list-style: none;
  padding: 0;
}

#list li {
  padding: 8px 12px;
  border: 1px solid #2e303a;
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: pointer;
}

#list li:hover {
  background: rgba(192, 132, 252, 0.1);
}

#list li.selected {
  border-color: #c084fc;
  background: rgba(192, 132, 252, 0.15);
}

section {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #2e303a;
  border-radius: 6px;
}
</style>