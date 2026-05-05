<script setup>
// 📄 BookList.vue → api-vue/src/components/BookList.vue
// Componente reutilizável: renderiza a lista de livros.

import { getCoverUrl } from '../services/bookService.js'

defineProps({
  books: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select'])
</script>

<template>
  <div class="book-list">
    <div
      v-for="book in books"
      :key="book.key"
      class="book-item"
      @click="emit('select', book)"
    >
      <img
        v-if="getCoverUrl(book.cover_i)"
        :src="getCoverUrl(book.cover_i)"
        :alt="book.title"
        height="50"
      />

      <div class="book-info">
        <strong>{{ book.title }}</strong>
        <span>{{ book.author_name?.[0] || 'Autor desconhecido' }}</span>
      </div>
    </div>
  </div>
</template>