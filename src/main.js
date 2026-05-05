// 📄 main.js → api-vue/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './assets/main.css'

// Cria a aplicação Vue, registra o roteador e monta no elemento #app do index.html
createApp(App)
  .use(router)
  .mount('#app')