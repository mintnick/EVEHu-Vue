<script setup>
import { getThumbnail, getId } from '../utils.js'

const props = defineProps({
  server: String,
  type: String,
  data: Object,
  trend: String,
})

</script>

<template>
  <div class="d-flex flex-column">
    <h3 class="text-center">{{ type == 'alliance' ? '联盟' : '公司' }}</h3>
    <v-sheet
      :height="50"
      width="100%"
      color="rgba(0, 0, 0, 0.8)"
      rounded="true"
      class="d-flex justify-space-between px-1 py-auto"
      :style="getThumbnail(server, type, getId(type, item))"
      
      v-for="item in data"
      >
      <v-col class="text-center"><a :href="`/${type}/` + getId(type, item)" class="my-auto">{{ item.name }}</a></v-col>
      <div class="my-auto" :class="trend">{{ (item.diff_7days > 0 ? '+' : '') + item.diff_7days }}</div>
    </v-sheet>
  </div>
</template>

<style lang="css" scoped>
</style>