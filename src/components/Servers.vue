<script setup>
import { onBeforeMount, ref } from 'vue'
import { api } from './../utils.js'

const sr_players = ref()
const tq_players = ref()
const if_players = ref()

async function fetchData() {
  try {
    let response = await fetch(`https://ali-esi.evepc.163.com/latest/status/?datasource=serenity`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    sr_players.value = (await response.json())?.players

    response = await fetch(`https://esi.evetech.net/latest/status/?datasource=tranquility`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    tq_players.value = (await response.json())?.players

    response = await fetch(`https://ali-esi.evepc.163.com/latest/status/?datasource=infinity`)
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    if_players.value = (await response.json())?.players
  } catch (error) {
    console.log('Fetch error: ', error)
  }
}

onBeforeMount(async() => {
  await fetchData()
})
</script>

<template>
  <div class="d-flex flex-column ga-10 mt-5 text-center">
    <div>
      <v-btn href="/sr" size="x-large" class="w-100">晨曦 Serenity</v-btn>
      <p v-if="sr_players">在线：{{ sr_players }}</p>
    </div>
    <div>
      <v-btn disabled href="/tq" size="x-large" class="w-100">宁静 Tranquility</v-btn>
      <p v-if="tq_players">在线：{{ tq_players }}</p>
    </div>
    <div>
      <v-btn disabled href="/if" size="x-large" class="w-100">曙光 Infinity</v-btn>
      <p v-if="if_players">在线：{{ if_players }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.v-btn {
  color: black;
}
</style>