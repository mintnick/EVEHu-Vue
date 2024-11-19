<script setup>
import { getThumbnail, getHistoryThumbnail, formatDate } from '../utils.js'

const props = defineProps({
  server: String,
  data: Object,
})

const isLeave = (item) => {
  if (item.end_date) return true
  return false
}
</script>

<template>
  <div class="d-flex flex-column w-100 align-center">
    <v-sheet
      :height="60"
      width="100%"
      max-width="700"
      color="rgba(0, 0, 0, 0.8)"
      rounded="true"
      class="d-flex justify-space-between px-1 py-auto"
      :style="getHistoryThumbnail(server, item.alliance_id, item.corporation_id)"

      v-for="item in data"
    >
    <v-col cols="4" class="text-center"><a :href="`/corporation/` + item.corporation_id" class="my-auto">{{ item.corporation_name }}</a></v-col>
    <v-col cols="4" class="flex-grow-1 flex-shrink-0 text-center">
      {{ formatDate(server, (item.end_date || item.start_date)) }}
      <span :class="(isLeave(item) ? 'shrinking' : 'rising')">{{  (item.end_date ? '退出' : '加入') }}</span>
    </v-col>
    <v-col cols="4" class="text-center"><a :href="`/alliance/` + item.alliance_id" class="my-auto">{{ item.alliance_name }}</a></v-col>
    </v-sheet>
  </div>
  
</template>

<style lang="css" scoped>
.v-sheet {
  color: #FEFEFE;
}
</style>