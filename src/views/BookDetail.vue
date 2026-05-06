<script setup>
// BookDetail.vue → api-vue/src/views/BookDetail.vue
// View de detalhes de um livro.
 
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBook } from '../services/bookService.js'
 
const route  = useRoute()
const router = useRouter()
 
const book    = ref(null)
const loading = ref(true)
const error   = ref(null)
 
// Busca os detalhes do livro usando a chave extraída da URL (:key)
onMounted(async () => {
  try {
    book.value = await getBook(route.params.key)
  } catch {
    error.value = 'Não foi possível carregar o livro.'
  } finally {
    loading.value = false
  }
})
</script>
 
<template>
  <div class="container">
    <button @click="router.back()">← Voltar</button>
 
    <p v-if="error" class="error">{{ error }}</p>
    <p v-else-if="loading">Carregando...</p>
 
    <div v-else class="detail">
      <img v-if="book.cover" :src="book.cover" :alt="book.title" height="200" />
      <h2>{{ book.title }}</h2>
      <p class="authors">{{ book.authors.join(', ') }}</p>
      <p>{{ book.desc || 'Sem descrição disponível.' }}</p>
    </div>
  </div>
</template>
 