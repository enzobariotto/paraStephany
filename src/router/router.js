// 📄 router.js → api-vue/src/router/router.js
import { createRouter, createWebHashHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'
import BookDetail from '../views/BookDetail.vue'

const routes = [
  {
    path: '/',
    component: BookListView   // tela principal com lista e busca
  },
  {
    path: '/livro/:key',      // :key é o identificador do livro na Open Library
    component: BookDetail
  }
]

// createWebHashHistory usa # na URL (ex: /#/livro/...), dispensando configuração no servidor
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router