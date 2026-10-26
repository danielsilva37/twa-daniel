<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <section>
    <h2>{{ item.name }}</h2>
    <p>Preço: {{ item.price }}€</p>
    <p>Tags: {{ item.tags.join(', ') }}</p>
    <p v-if="item.author">Autor: {{ item.author.name }} ({{ item.author.country }})</p>
  </section>
</template>

<style scoped>
section {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #2e303a;
  border-radius: 6px;
}
</style>