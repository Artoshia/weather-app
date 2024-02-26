import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'

import { getLocation } from './components/apiHandler'

const store = createPinia()

const app = createApp(App)
app.use(store)
app.mount('#app')
getLocation()
