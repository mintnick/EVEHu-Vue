<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import vueDebounce from 'vue-debounce'


const route = useRoute()
const router = useRouter()
const vDebounce = vueDebounce({ lock: true, defaultTime: '100ms' })
const search_query = ref()
const suggestions = ref([])
const show_suggestions = ref(false)

const server = computed(() => {
  if (route.fullPath == '/') return undefined
  if (route.fullPath.slice(0, 3) == '/sr') return 'sr'
  if (route.fullPath.slice(0, 3) == '/tq') return 'tq'
  if (route.fullPath.slice(0, 3) == '/if') return 'if'

  return undefined
})

async function fetchSuggestions() {
  if(!search_query.value.trim() || !server) {
    suggestions.value = []
    show_suggestions.value = false
    return
  }

  try {
    const response = await fetch(`http://localhost:3002/${server.value}/suggestions?q=${encodeURIComponent(search_query.value)}`)
    suggestions.value = await response.json()
    show_suggestions.value = suggestions.value.length > 0
    // console.log(suggestions.value)
  } catch (error) {
    console.log(`Error fetching suggestions: ${error}`)
  }
}

function selectSuggestion(item: any) {
  search_query.value = ''
  show_suggestions.value = false
  router.push(`/${server.value}/${item.corporation_id ? 'corporation/' + item.corporation_id : 'alliance/' + item.alliance_id}`)
}

</script>

<template>
  <v-app id="v-app" class="d-flex">
    <v-app-bar :elevation="2" rounded density="compact" style="opacity: 90%; overflow: visible !important;">
      <v-app-bar-title>
        <RouterLink to="/" class="text-h5">EVE 户</RouterLink>
      </v-app-bar-title>
      <div id="server-info"></div>
      
      <v-text-field 
        v-if="server"
        prepend-inner-icon="mdi-magnify" variant="solo-filled" density="compact" class="my-auto" :flat="true"
        v-model:model-value="search_query"
        v-debounce:500="fetchSuggestions"
      >
    </v-text-field>

      <v-spacer class="d-none d-sm-block"></v-spacer>

      <v-btn icon href="https://nickning.app/donate" target="_blank">
        <v-icon>mdi-hand-coin-outline</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/mintnick/EVEHu-Vue/" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-list v-if="show_suggestions" class="suggestion-list">
      <v-list-item
      v-for="(item, index) in suggestions"
      :key="index"
      @click="selectSuggestion(item)"
      class="suggestion-item"
      >{{ item['name'] }}</v-list-item>
    </v-list>

    <v-main id="main">
      <v-container class="d-flex flex-column align-center">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
#v-app {
  background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/wallpaper.jpg');
  background-position: center;
  background-size: cover;
}

#app a {
  color: #0E0E0E;
}

#main {
  max-width: 1400px !important;
  margin: auto;
}

.suggestion-list {
  /* border: 1px solid #ccc; */
  max-height: 200px;
  overflow-y: auto;
  background: #FEFEFE;
  position: absolute !important;
  z-index: 99 !important;
  top: 49px;
  width: 30%;
  min-width: 240px;
  left: 33%;
}

.suggestion-item {
  overflow-x: hidden !important;
  min-height: 30px !important;
  padding-top: 1px !important;
  padding-bottom: 1px !important;
}
</style>
