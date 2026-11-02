<script setup>
import { computed, reactive } from 'vue'

defineProps({ cats: { type: Array, required: true } })
const emit = defineEmits(['save'])

const empty = { name: '', category: '', price: null, tags: '' }
const form = reactive({ ...empty })

const errors = computed(() => {
  const e = {}
  if (form.name.length < 3) e.name = 'pelo menos 3 caracteres'
  if (!form.category) e.category = 'escolhe uma categoria'
  if (!(form.price > 0)) e.price = 'tem de ser > 0'
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)

function submit() {
  if (!isValid.value) return // nunca confiar no DOM
  emit('save', {
    name: form.name,
    category: form.category,
    price: form.price,
    tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
  })
  Object.assign(form, empty) // não "form = ...", que perderia a reatividade
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2>Novo livro</h2>

    <div>
      <input v-model.trim="form.name" placeholder="Nome" required minlength="3" />
      <small v-if="errors.name">{{ errors.name }}</small>
    </div>

    <div>
      <select v-model="form.category" required>
        <option value="" disabled>Categoria</option>
        <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
      </select>
      <small v-if="errors.category">{{ errors.category }}</small>
    </div>

    <div>
      <input
        v-model.number="form.price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Preço"
        required
      />
      <small v-if="errors.price">{{ errors.price }}</small>
    </div>

    <div>
      <input v-model.trim="form.tags" placeholder="tags, separadas por vírgulas" />
    </div>

    <button :disabled="!isValid">Guardar</button>
  </form>
</template>

<style scoped>
form {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #2e303a;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

small {
  display: block;
  color: #f87171;
}
</style>