<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { byCategory, search, categories, sortByPrice } from '../catalog.js'
import { items, status, error, load, ensureLoaded } from '../store.js'
import ItemList from '../components/ItemList.vue'

const router = useRouter()

const query = ref('')
const category = ref('')
const sortDir = ref('desc')

onMounted(ensureLoaded)

const visible = computed(() => {
  let list = items.value ?? []
  if (category.value !== '') list = byCategory(list, category.value)
  list = search(list, query.value)
  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))
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

  <p v-if="status === 'idle' || status === 'loading'">A carregar…</p>

  <div v-else-if="status === 'error'">
    <p>Erro: {{ error }}</p>
    <button @click="load">Tentar de novo</button>
  </div>

  <div v-else>
    <p v-if="visible.length === 0">Sem resultados para "{{ query }}"</p>
    <p v-else>{{ visible.length }} de {{ items.length }} itens</p>

    <ItemList
      :items="visible"
      @select="router.push({ name: 'item', params: { id: $event } })"
    />
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>