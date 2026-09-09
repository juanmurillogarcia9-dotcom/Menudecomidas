import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'quasar/src/css/index.sass'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'

import { router } from './routers/routes.js'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
})

app.use(router)

app.mount('#app')