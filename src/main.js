import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './assets/main.css' // your custom styles should come after vuetify

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
