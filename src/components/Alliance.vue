<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import HistoryTable from './HistoryTable.vue';
import TrendChart from './TrendChart.vue';
import { getImageUrl } from './../utils.js'
import { api } from './../utils.js'

const route = useRoute()
let server = route.params.server
let id = route.params.id
const data = ref()
const loading = ref(true)
const trendData = ref([])

async function fetchData() {
  try {
    loading.value = true
    const response = await fetch(`${api}/${server}/alliances/${id}`)
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

onBeforeMount(async () => {
  await fetchData()
})
</script>

<template>
  <div v-if="loading" class="lds-dual-ring"></div>
  <div v-else class="d-flex flex-column align-center w-100">
    <h2>{{ data.alliance_info.name }}<span v-if="data.alliance_info.member_count == 0">[已关闭]</span></h2>
    <img :src="getImageUrl(server, 'alliance', data.alliance_info.alliance_id)" />
    <p>
      角色数:{{ data.alliance_info.member_count }}
      公司数:{{ data.alliance_info.corp_count }}
      <a :href="`https://kb.ceve-market.org/alliance/${data.alliance_info.alliance_id}/`" target="_blank">晨曦击杀榜<v-icon
          icon="mdi-open-in-new" size="x-small"></v-icon></a>
    </p>

    <div class="w-100">
      <TrendChart v-if="trendData" :trendData="trendData" />
    </div>

    <v-row v-if="data.join_history || data.leave_history" class="d-flex text-center">
      <v-col>
        <h3>最近加入</h3>
        <HistoryTable :server="server" type="join" :data="data.join_history" :alliance_name="data.alliance_info.name" />
      </v-col>

      <v-col>
        <h3>最近离开</h3>
        <HistoryTable :server="server" type="leave" :data="data.leave_history"
          :alliance_name="data.alliance_info.name" />
      </v-col>
    </v-row>

    <h3 class="mt-3">成员</h3>
    <v-sheet v-if="data.corporations.length" class="d-flex flex-wrap" color="rgba(0,0,0,0)">
      <v-sheet v-for="item in data.corporations" style="background-repeat: no-repeat; background-position: center;"
        :style="`background-image:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), URL(${getImageUrl(server, 'corporation', item.corporation_id)})`"
        :height="50" class="pa-2 mr-2 mb-2">
        <a :href="`/${server}/corporation/${item.corporation_id}`">{{ item.name }}</a>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<style lang="css" scoped>
.v-sheet {
  color: #FEFEFE;
}
</style>