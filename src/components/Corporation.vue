<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HistoryTable from './HistoryTable.vue';
import TrendChart from './TrendChart.vue';
import { getImageUrl } from './../utils.js'
import { api } from './../utils.js'

const router = useRouter()
const route = useRoute()
let server = route.params.server
let id = route.params.id
const data = ref()
const loading = ref(true)
const trendData = ref([])
const records = ref([])

async function fetchData() {
  try {
    const response = await fetch(`${api}/${server}/corporations/${id}`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    data.value = await response.json()
    for (let i = 7; i > 1; i--) 
      trendData.value.push(data.value.corp_info[`mc_${i}`])
    trendData.value.push(data.value.corp_info.member_count)

    // sperate alliance histyro records
    if (data.value.alliance_history)
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

onBeforeMount(async () => {
  await fetchData()
})

watch(() => route.params.id, (newId) => {
  id = newId
  fetchData()
})
</script>

<template>
  <div v-if="loading" class="lds-dual-ring"></div>
  <div v-else class="d-flex flex-column align-center w-100">
    <h2>{{ data.corp_info.name }}<span v-if="data.corp_info.member_count == 0">[已关闭]</span></h2>
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