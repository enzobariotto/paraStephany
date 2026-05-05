<script setup>
// 📄 BookListView.vue → api-vue/src/views/BookListView.vue
// View da tela inicial: usa o composable e o componente BookList.

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooks } from '../composables/useBooks.js'
import BookList from '../components/BookList.vue'

const router = useRouter()
const input  = ref('')

const { books, page, total, loading, error, fetchBooks, search, prevPage, nextPage } = useBooks()

// Remove o prefixo '/works/' que a API inclui na chave, pois já está no path da rota
const goToDetail = (book) => {
  router.push('/livro/' + book.key.replace('/works/', ''))
}

// Carrega os livros automaticamente assim que a view é exibida
onMounted(fetchBooks)
</script>

<template>
  <div class="container">
    <h1>📚 Biblioteca</h1>

    <div class="search-bar">
      <input
        v-model="input"
        @keyup.enter="search(input)"
        placeholder="Buscar livro..."
      />
      <button @click="search(input)">Buscar</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-else-if="loading">Carregando...</p>

    <template v-else>
      <BookList :books="books" @select="goToDetail" />

      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">←</button>
        <span>{{ page }} / {{ total }}</span>
        <button @click="nextPage" :disabled="page === total">→</button>
      </div>
    </template>
  </div>
</template>