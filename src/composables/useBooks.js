// 📄 useBooks.js → api-vue/src/composables/useBooks.js
// Composable que encapsula estado e ações da listagem de livros.

import { ref } from 'vue'
import { searchBooks } from '../services/bookService.js'

export function useBooks() {
  const books   = ref([])
  const query   = ref('romance')
  const page    = ref(1)
  const total   = ref(1)
  const loading = ref(false)
  const error   = ref(null)

  const fetchBooks = async () => {
    loading.value = true
    error.value   = null
    try {
      const result   = await searchBooks(query.value, page.value)
      books.value    = result.books
      total.value    = result.totalPages
    } catch (e) {
      error.value = 'Erro ao buscar livros. Tente novamente.'
    } finally {
      loading.value = false
    }
  }

  const search = (input) => {
    if (!input.trim()) return
    query.value = input
    page.value  = 1
    fetchBooks()
  }

  const prevPage = () => {
    if (page.value > 1) { page.value--; fetchBooks() }
  }

  const nextPage = () => {
    if (page.value < total.value) { page.value++; fetchBooks() }
  }

  return {
    books, query, page, total, loading, error,
    fetchBooks, search, prevPage, nextPage
  }
}