// 📄 router.js → api-vue/src/router/router.js
import { createRouter, createWebHashHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'
import BookDetail from '../views/BookDetail.vue'

const routes = [
  {
    path: '/',
    component: BookListView
  },
  {
    path: '/livro/:key',
    component: BookDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router