<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '../catalog.js'
import { items, status, ensureLoaded, addItem } from '../store.js'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()

onMounted(ensureLoaded)

const cats = computed(() => categories(items.value ?? []))

function onSave(item) {
  const id = addItem(item)
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <RouterLink to="/">← Items</RouterLink>

  <p v-if="status !== 'ready'">A carregar…</p>
  <ItemForm v-else :cats="cats" @save="onSave" />
</template>