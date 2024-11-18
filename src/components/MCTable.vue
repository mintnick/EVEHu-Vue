<script setup>

const props = defineProps({
  type: String,
  data: Object,
})

const getId = (item) => {
  if (props['type'] == "alliance") return item.alliance_id
  else if (props['type'] == "corporation") return item.corporation_id
}

const getThumbnail = (id) => {
  const url = "https://image.evepc.163.com/" + (props['type'] == 'alliance' ? 'Alliance' : 'Corporation') + '/' + id + '_128.png'
  
  return {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
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
    :style="getThumbnail(getId(item))"
    
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