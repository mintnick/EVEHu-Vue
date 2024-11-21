<script setup>
import { onBeforeMount, ref } from 'vue'
import { api } from './../utils.js'

const sr_info = ref()
const tq_info = ref()
const if_info = ref()

async function fetchData() {
  try {
    let response = await fetch(`${api}/sr/info`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    sr_info.value = await response.json()

    response = await fetch(`${api}/tq/info`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    tq_info.value = await response.json()

    response = await fetch(`${api}/if/info`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    if_info.value = await response.json()
  } catch (error) {
    console.log('Fetch error: ', error)
  }
}

onBeforeMount(async() => {
  await fetchData()
})
</script>

<template>
  <div class="d-flex flex-column ga-10 mt-5">
    <div class="w-100 text-center">
      <v-btn href="/sr" size="x-large" class="w-100">晨曦 Serenity</v-btn>
      <p v-if="sr_info">在线：{{ sr_info.players }} 总数：{{ Number(sr_info.total).toLocaleString() }}</p>
    </div>
    <div>
      <v-btn disabled href="/tq" size="x-large" class="w-100">宁静 Tranquility</v-btn>
      <p v-if="tq_info">在线：{{ tq_info.players }} 总数：{{ Number(tq_info.total).toLocaleString() }}</p>
    </div>
    <div>
      <v-btn disabled href="/if" size="x-large" class="w-100">曙光 Infinity</v-btn>
      <p v-if="if_info">在线：{{ if_info.players }} 总数：{{ Number(if_info.total).toLocaleString() }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.v-btn {
  color: black;
}
</style>