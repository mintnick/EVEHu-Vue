import { createApp } from 'vue'

// import './style.css'

// Vuetify
import 'vuetify/lib/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vue-i18n
import { createI18n } from 'vue-i18n'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const i18n = createI18n({

})

createApp(App)
.use(vuetify)
.use(i18n)
.mount('#app')
