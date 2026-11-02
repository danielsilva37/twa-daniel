<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

// o URL é a fonte de verdade: a página vive em ?page=, não num ref
const page = computed(() => Number(route.query.page ?? 1))

const { status, error, data, load } = useLoad(() => list(page.value))

watch(page, load) // o onMounted do useLoad fez o primeiro carregamento

const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

function go(p) {
  router.push({ query: { page: p } })
}
</script>

<template>
  <h1>Pokémon</h1>

  <p v-if="status === 'loading'">A carregar…</p>

  <div v-else-if="status === 'error'">
    <p>Erro: {{ error }}</p>
    <button @click="load">Tentar de novo</button>
  </div>

  <div v-else-if="data">
    <div class="pager">
      <button :disabled="page <= 1" @click="go(page - 1)">Prev</button>
      <span>Page {{ page }} of {{ pages }}</span>
      <button :disabled="page >= pages" @click="go(page + 1)">Next</button>
    </div>

    <ul>
      <li v-for="p in data.results" :key="p.name">{{ p.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.pager {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 6px 12px;
  border: 1px solid #2e303a;
  border-radius: 6px;
  margin-bottom: 6px;
}
</style>