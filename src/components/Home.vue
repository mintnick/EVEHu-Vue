<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MCTable from './MCTable.vue';
import TrendTable from './TrendTable.vue';
import HistoryTable from './HistoryTable.vue';

const route = useRoute()
const data = ref()
const loading = ref(true)
const top_alliances = ref([])
const top_corporations = ref([])
const server = route.params.server

async function fetchHomepage() {
  try {
    const response = await fetch(`http://localhost:3002/${server}`)
    // const response = await fetch(`http://eve-forge-api.nickning.app/${server}`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    data.value = await response.json()
    // console.log(data.value)
  } catch (error) {
    console.log('Fetch error: ', error)
  } finally {
    loading.value = false
  }
}

onMounted( async () => {
  await fetchHomepage()
})
</script>

<template>
  <div v-if="loading" class="lds-dual-ring"></div>
  <h2>最多角色数量</h2>
  <div class="d-flex w-100">
    <MCTable v-if="data && data.topAlliances" :server="server" type="alliance" :data="data.topAlliances" class="w-50 pr-1"/>
    <MCTable v-if="data && data.topAlliances" :server="server" type="corporation" :data="data.topCorporations" class="w-50 pl-1"/>
  </div>

  <h2 class="mt-3">七日内增长</h2>
  <div class="d-flex w-100">
    <TrendTable v-if="data && data.risingAlliances" :server="server" type="alliance" :data="data.risingAlliances" trend="rising" class="w-50 pr-1" />
    <TrendTable v-if="data && data.risingCorporations" :server="server" type="corporation" :data="data.risingCorporations" trend="rising" class="w-50 pl-1" />
  </div>

  <h2 class="mt-3">七日内下降</h2>
  <div class="d-flex w-100">
    <TrendTable v-if="data && data.shrinkingAlliances" :server="server" type="alliance" :data="data.shrinkingAlliances" trend="shrinking" class="w-50 pr-1" />
    <TrendTable v-if="data && data.shrinkingCorporations" :server="server" type="corporation" :data="data.shrinkingCorporations" trend="shrinking" class="w-50 pl-1" />
  </div>

  <h2 class="mt-3">近期雇佣变动</h2>
  <div class="d-flex w-100">
    <HistoryTable v-if="data && data.recentHistory" :server="server" :data="data.recentHistory" />
  </div>
</template>

<style scoped>

</style>