<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HistoryTable from './HistoryTable.vue';
import TrendChart from './TrendChart.vue';
import { getImageUrl } from './../utils.js'

const router = useRouter()
const route = useRoute()
const server = route.params.server
const id = route.params.id
const data = ref()
const loading = ref(true)
const trendData = ref([])

async function fetchData() {
  try {
    const response = await fetch(`http://localhost:3002/${server}/alliances/${id}`)
    // const response = await fetch(`http://eve-forge-api.nickning.app/${server}/alliances/${id}`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    data.value = await response.json()
    for (let i = 7; i > 1; i--) 
      trendData.value.push(data.value.alliance_info[`mc_${i}`])
    trendData.value.push(data.value.alliance_info.member_count)
  } catch (error) {
    console.log('Fetch error: ', error)
  } finally {
    loading.value = false
  }
}

onMounted( async () => {
  await fetchData()
  // console.log(data.value.alliance_info)
})

</script>

<template>
  <div v-if="loading" class="lds-dual-ring"></div>
  <div v-else class="d-flex flex-column align-center">
    <h2>{{ data.alliance_info.name }}</h2>
    <!-- <div style="width:100%;height:0; padding-top:128px;position:relative;">
      <img :src="getImageUrl(server, 'alliance', data.alliance_info.alliance_id)" style="position:absolute; top:0; left:40%; width:128px;" />
    </div> -->
    <img :src="getImageUrl(server, 'alliance', data.alliance_info.alliance_id)" />
    <p>
      角色数:{{ data.alliance_info.member_count }}
      公司数:{{ data.alliance_info.corp_count }} 
      <a :href="`https://kb.ceve-market.org/alliance/${data.alliance_info.alliance_id}/`" target="_blank">晨曦击杀榜<v-icon icon="mdi-open-in-new" size="x-small"></v-icon></a>
    </p>

    <!-- <TrendChart v-if="trendData" :trendData="trendData" /> -->

    <div class="d-flex text-center">
      <v-col class="w-50">
        <h3>最近加入</h3>
        <HistoryTable :server="server" type="join" :data="data.join_history" :alliance_name="data.alliance_info.name" />
      </v-col>
      
      <v-col class="w-50">
        <h3>最近离开</h3>
        <HistoryTable :server="server" type="leave" :data="data.leave_history" :alliance_name="data.alliance_info.name" />
      </v-col>
    </div>
    </div>
</template>

<style lang="css" scoped>
</style>