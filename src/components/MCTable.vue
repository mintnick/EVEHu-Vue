<script setup>
import getThumbnail from './../utils/get-thumbnail.js'

const props = defineProps({
  type: String,
  data: Object,
})

const getId = (item) => {
  if (props['type'] == "alliance") return item.alliance_id
  else if (props['type'] == "corporation") return item.corporation_id
}

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
    :style="getThumbnail(type, getId(item))"
    
    v-for="item in data"
    >
    <a :href="`/${type}/` + getId(item)" class="my-auto">{{ item.name }}</a>
    <div class="my-auto">{{ item.member_count }}</div>
  </v-sheet>
</div>
</template>

<style lang="css" scoped>
.v-sheet {
  color: #FEFEFE;
}
</style>