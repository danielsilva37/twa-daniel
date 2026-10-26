<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null },
})

const emit = defineEmits(['select'])
</script>

<template>
  <ul id="list">
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="emit('select', item.id)"
    >
      {{ item.name }} — {{ item.price }}€
    </li>
  </ul>
</template>

<style scoped>
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
</style>