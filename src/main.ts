import { createApp } from 'vue'

import './style.css'

// Vuetify
import 'vuetify/lib/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// vue-cookies
import VueCookies from 'vue-cookies'

// Components
import App from './App.vue'
// @ts-ignore
import router from './router.js'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

createApp(App)
.use(vuetify)
.use(VueCookies, { expires: '1m'})
.use(router)
.mount('#app')
