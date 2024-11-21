<script setup>
import { getThumbnail, getId } from '../utils.js'

const props = defineProps({
  server: String,
  type: String,
  data: Object,
})

</script>

<template>
  <div class="d-flex flex-column table">
    <h3 class="text-center">{{ type == 'alliance' ? '联盟' : '公司' }}</h3>
    <v-sheet
      :height="60"
      width="100%"
      color="rgba(0, 0, 0, 0.8)"
      rounded="true"
      class="d-flex justify-space-between px-1 py-auto"
      :style="getThumbnail(server, type, getId(type, item))"
      
      v-for="item in data"
      >
      <v-col class="text-center"><a :href="`/${server}/${type}/` + getId(type, item)" class="my-auto">{{ item.name }}</a></v-col>
      <div class="my-auto">{{ item.member_count }}</div>
    </v-sheet>
  </div>
</template>

<style lang="css" scoped>
.v-sheet {
  color: #FEFEFE;
}
</style>