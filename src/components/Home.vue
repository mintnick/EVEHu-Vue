<script setup>
import { ref, onMounted } from 'vue';

const data = ref()
const loading = ref(true)

async function fetchHomepage() {
  try {
    const response = await fetch('http://localhost:3002')
    if (!response.ok) {
      throw new Error('Cannot fetch api')
    }
    data.value = await response.json()
    console.log(data.value)
  } catch (error) {
    console.log('Fetch error: ', error)
  } finally {
    loading.value = false
  }
}

onMounted( async () => {
  fetchHomepage()
})
</script>

<template>
  <!-- <div v-if="loading" class="lds-dual-ring"></div> -->
  <div class="lds-dual-ring"></div>
  <h2>最多角色数量</h2>
  <h2>最快增长</h2>
  <h2>最快下降</h2>
  <h2>近期雇佣变动</h2>
</template>

<style scoped>
</style>