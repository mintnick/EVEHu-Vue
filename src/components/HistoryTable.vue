<script setup>
import { computed } from 'vue';
import { getThumbnail, getHistoryThumbnail, formatDate } from '../utils.js'

const props = defineProps({
  server: String,
  type: String,
  data: Object,
  alliance_name: String,
  corporation_name: String,
})

const fullSize = computed(() => {
  if (!props['alliance_name'] && !props['corporation_name']) return true
  return false
})
</script>

<template>
  <div class="d-flex flex-column w-100 align-center">
    <div v-for="item in data" class="w-100">
      <v-sheet
        :height="60"
        width="100%"
        max-width="700"
        color="rgba(0, 0, 0, 0.8)"
        rounded="true"
        class="d-flex justify-space-between px-1 py-auto"
        :style="getHistoryThumbnail(server, item.alliance_id, item.corporation_id, alliance_name, corporation_name)"
      >
      <v-col v-if="!corporation_name" class="text-center"><a :href="`/${server}/corporation/` + item.corporation_id" class="my-auto">{{ item.corporation_name ?? corporation_name }}</a></v-col>
      <v-col class="flex-grow-1 flex-shrink-0 text-center">
        {{ formatDate(server, (item.end_date || item.start_date), fullSize) }}
        <span :class="type ?? (item.end_date ? 'leave' : 'join')" style="white-space: nowrap;">{{  (item.end_date ? '退出' : '加入') }}</span>
      </v-col>
      <v-col v-if="!alliance_name" class="text-center"><a :href="`/${server}/alliance/` + item.alliance_id" class="my-auto">{{ item.alliance_name ?? alliance_name }}</a></v-col>
      </v-sheet>

      <v-sheet
        v-if="!alliance_name && item.end_date"
        :height="60"
        width="100%"
        max-width="700"
        color="rgba(0, 0, 0, 0.8)"
        rounded="true"
        class="d-flex justify-space-between px-1 py-auto"
        :style="getHistoryThumbnail(server, item.alliance_id, item.corporation_id, alliance_name, corporation_name)"
      >
      <v-col v-if="!corporation_name" class="text-center"><a :href="`/${server}/corporation/` + item.corporation_id" class="my-auto">{{ item.corporation_name ?? corporation_name }}</a></v-col>
      <v-col class="flex-grow-1 flex-shrink-0 text-center">
        {{ formatDate(server, item.start_date, fullSize) }}
        <span class="join" style="white-space: nowrap;">加入</span>
      </v-col>
      <v-col v-if="!alliance_name" class="text-center"><a :href="`/${server}/alliance/` + item.alliance_id" class="my-auto">{{ item.alliance_name ?? alliance_name }}</a></v-col>
      </v-sheet>
    </div>
  </div>
  
</template>

<style lang="css" scoped>
.v-sheet {
  color: #FEFEFE;
}
</style>