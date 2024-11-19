<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HistoryTable from './HistoryTable.vue';
const router = useRouter()
const route = useRoute()

const server = route.params.server
const id = route.params.id
const data = ref()
const loading = ref(true)

async function fetchData() {
  try {
    const response = await fetch(`http://localhost:3002/${server}/alliances/${id}`)
    // const response = await fetch(`http://eve-forge-api.nickning.app/${server}/alliances/${id}`)
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
  await fetchData()
  console.log(data.value)
})

</script>

<template>
  <div v-if="loading" class="lds-dual-ring"></div>
  <div v-else class="d-flex flex-column align-center">
    <h2>{{ data.alliance_info.name }}</h2>
    <p>角色数:{{ data.alliance_info.member_count }} 公司数:{{ data.alliance_info.corp_count }}</p>

    <div class="d-flex text-center">
      <v-col class="w-50">
        <h3>军团加入</h3>
        <HistoryTable :server="server" type="join" :data="data.join_history" :alliance_name="data.alliance_info.name" />
      </v-col>
      
      <v-col class="w-50">
        <h3>军团离开</h3>
        <HistoryTable :server="server" type="leave" :data="data.leave_history" :alliance_name="data.alliance_info.name" />
      </v-col>
    </div>
    </div>
</template>

<style lang="css" scoped>
</style>