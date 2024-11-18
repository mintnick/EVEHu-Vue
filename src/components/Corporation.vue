<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
</script>

<template>
    <div>
    Corporation {{ route.params.id }}
  </div>
</template>

<style lang="css" scoped>
</style>