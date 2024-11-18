import { createApp } from 'vue'

// import './style.css'

// Vuetify
import 'vuetify/lib/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).mount('#app')
