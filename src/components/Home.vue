<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import MCTable from './MCTable.vue';
import TrendTable from './TrendTable.vue';
import HistoryTable from './HistoryTable.vue';
import { api } from './../utils.js'

const route = useRoute()
const data = ref()
const server_info = ref()
const loading = ref(true)
const top_alliances = ref([])
const top_corporations = ref([])
const server = route.params.server
const server_name = computed(() => {
  if (server == 'sr') return '晨曦'
  else if (server == 'tq') return '宁静'
})

async function fetchData() {
  try {
    let response = await fetch(`${api}/${server}`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    data.value = await response.json()

    response = await fetch(`${api}/${server}/info`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    server_info.value = await response.json()
  } catch (error) {
    console.log('Fetch error: ', error)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await fetchData()
})
</script>

<template>
  <div v-if="loading" class="lds-dual-ring"></div>
  <h3 v-if="server_info">
    服务器：<span class="highlight">{{ server_name }} </span>
    当前在线：<span class="highlight">{{ server_info.players }}</span>
  </h3>
  <h3 v-if="server_info">
    <span class="highlight">{{ server_info.alli_count }}</span>个联盟 
    <span class="highlight">{{ server_info.corp_count }}</span>个公司 
    <span class="highlight">{{ server_info.total }}</span>个角色
  </h3>

  <h2 class="mt-3">最多角色数量</h2>
  <div class="d-flex w-100 justify-center">
    <MCTable v-if="data && data.topAlliances" :server="server" type="alliance" :data="data.topAlliances" class="w-50 pr-1"/>
    <MCTable v-if="data && data.topAlliances" :server="server" type="corporation" :data="data.topCorporations" class="w-50 pl-1"/>
  </div>

  <h2 class="mt-3">七日内增长</h2>
  <div class="d-flex w-100 justify-center">
    <TrendTable v-if="data && data.risingAlliances" :server="server" type="alliance" :data="data.risingAlliances" trend="rising" class="w-50 pr-1" />
    <TrendTable v-if="data && data.risingCorporations" :server="server" type="corporation" :data="data.risingCorporations" trend="rising" class="w-50 pl-1" />
  </div>

  <h2 class="mt-3">七日内下降</h2>
  <div class="d-flex w-100 justify-center">
    <TrendTable v-if="data && data.shrinkingAlliances" :server="server" type="alliance" :data="data.shrinkingAlliances" trend="shrinking" class="w-50 pr-1" />
    <TrendTable v-if="data && data.shrinkingCorporations" :server="server" type="corporation" :data="data.shrinkingCorporations" trend="shrinking" class="w-50 pl-1" />
  </div>

  <h2 class="mt-3">近期雇佣加入</h2>
  <div class="d-flex w-100 justify-center">
    <HistoryTable v-if="data && data.recentJoinHistory" :server="server" type="join" :data="data.recentJoinHistory" />
  </div>
  <h2 class="mt-3">近期雇佣退出</h2>
  <div class="d-flex w-100 justify-center">
    <HistoryTable v-if="data && data.recentLeaveHistory" :server="server" type="leave" :data="data.recentLeaveHistory" />
  </div>
</template>

<style scoped>

</style>