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
const records = ref([])

async function fetchData() {
  try {
    const response = await fetch(`http://localhost:3002/${server}/corporations/${id}`)
    // const response = await fetch(`http://eve-forge-api.nickning.app/${server}/corporations/${id}`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    data.value = await response.json()
    for (let i = 7; i > 1; i--) 
      trendData.value.push(data.value.corp_info[`mc_${i}`])
    trendData.value.push(data.value.corp_info.member_count)

    // sperate alliance histyro records
    for (const record of data.value.alliance_history) {
      records.value.push({...record})
      if (record.end_date) {
        records.value.push({
          ...record,
          end_date: null,
        })
      }
    }
  } catch (error) {
    console.log('Fetch error: ', error)
  } finally {
    loading.value = false
  }
}

onMounted( async () => {
  await fetchData()
  // console.log(data.value.alliance_history)
  // console.log(records.value)
})
</script>

<template>
  <div v-if="loading" class="lds-dual-ring"></div>
  <div v-else class="d-flex flex-column align-center w-100">
    <h2>{{ data.corp_info.name }}</h2>
    <h4 v-if="data.alliance_name">
      <a :href="`/${server}/alliance/${data.corp_info.alliance_id}`">{{ data.alliance_name }}</a>
      </h4>
      <div class="d-flex ga-5">
        <img :src="getImageUrl(server, 'corporation', data.corp_info.corporation_id)" />
        <img v-if="data.corp_info.alliance_id" :src="getImageUrl(server, 'alliance', data.corp_info.alliance_id)" />
      </div>
      <p>
        角色数:{{ data.corp_info.member_count }}
        <a :href="`https://kb.ceve-market.org/corp/${data.corp_info.corporation_id}/`" target="_blank">晨曦击杀榜<v-icon icon="mdi-open-in-new" size="x-small"></v-icon></a>
      </p>

    <TrendChart v-if="trendData" :trendData="trendData" />

    <div v-if="data.alliance_history" class="mt-3">
      <h4 class="text-center">最近雇佣变动</h4>
      <HistoryTable :server="server" :data="records" :corporation_name="data.corp_info.name"/>
    </div>
  </div>
</template>

<style lang="css" scoped>
.v-sheet {
  color: #FEFEFE;
}
</style>