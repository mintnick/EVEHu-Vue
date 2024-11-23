<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import vueDebounce from 'vue-debounce'
//@ts-ignore
import { api } from './utils.js'


const route = useRoute()
const router = useRouter()
const vDebounce = vueDebounce({ lock: true, defaultTime: '100ms' })
const search_query = ref()
const suggestions = ref([])
const show_suggestions = ref(false)
const drawer = ref(false)

const server_list = [
  { title: '晨曦', value: 'sr'},
  { title: '宁静', value: 'tq'},
  { title: '曙光', value: 'if'},
]

const other_list = [
  { title: '设置文件管理', value: 'https://nickning.app/esm'},
  { title: 'AT 阵容模拟', value: 'https://nickning.app/atdraft'},
]

const link_list = [
  { title: '捐赠', value: 'https://nickning.app/donate'},
  { title: 'GitHub', value: 'https://github.com/mintnick/EVEHu-Vue'},
]

const server = computed(() => {
  if (route.fullPath == '/') return undefined
  const server_str = route.fullPath.slice(0, 3)
  if (server_str == '/sr') return 'sr'
  if (server_str == '/tq') return 'tq'
  if (server_str == '/if') return 'if'

  return undefined
})

async function fetchSuggestions() {
  if(!search_query.value.trim() || !server) {
    suggestions.value = []
    show_suggestions.value = false
    return
  }

  try {
    const response = await fetch(`${api}/${server.value}/suggestions?q=${encodeURIComponent(search_query.value)}`)
    suggestions.value = await response.json()
    show_suggestions.value = suggestions.value.length > 0
  } catch (error) {
    console.log(`Error fetching suggestions: ${error}`)
  }
}

function selectSuggestion(item: any) {
  search_query.value = ''
  show_suggestions.value = false
  if (item.corporation_id)
    router.push({ name: `corporation`, params: {server: server.value, id: item.corporation_id}})
  else if (item.alliance_id)
    router.push({ name: `alliance`, params: {server: server.value, id: item.alliance_id}})
}

</script>

<template>
  <v-app id="v-app" class="d-flex">
    <v-app-bar :elevation="2" rounded density="compact" style="opacity: 90%; overflow: visible !important;">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-title class="d-none d-sm-block">
        <RouterLink to="/" class="text-h5">EVE 户</RouterLink>
      </v-app-bar-title>
      
      <v-text-field 
        id="search-bar"
        v-if="server"
        prepend-inner-icon="mdi-magnify" 
        variant="solo-filled"
        density="compact" 
        class="my-auto"
        :flat="true"
        label="搜索"
        v-model:model-value="search_query"
        v-debounce:500="fetchSuggestions"
        style="max-width: 280px;"
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

    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="text-center"
      color="rgba(255, 255, 255, 0.8)"
      width="150"
    >
      <v-list>
        <RouterLink v-for="item in server_list" :to="`/${item.value}`">
          <v-list-item>{{ item.title }}</v-list-item>
        </RouterLink>
      </v-list>
      <v-divider />
      <v-list>
        <a v-for="item in other_list" :href="item.value" target="_blank">
          <v-list-item>{{ item.title }}</v-list-item>
        </a>
      </v-list>
      <v-divider />
      <v-list>
        <a v-for="item in link_list" :href="item.value" target="_blank">
          <v-list-item>{{ item.title }}</v-list-item>
        </a>
      </v-list>
    </v-navigation-drawer>

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
        <RouterView :key="route.fullPath" />
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

/* #search-bar {
  max-width: 100px !important;
} */

.suggestion-list {
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
