import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import router from './router/router'
import { test1 } from './components/alter/alter.js'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})
const app = createApp(App)
app.config.globalProperties.msg = 'hello'
app.use(router).use(vuetify).mount('#app')


app.config.globalProperties.alter = test1