<script setup lang="ts">
import { VueCookies } from 'vue-cookies';
import { useTheme } from 'vuetify';
import { inject } from 'vue';

const theme = useTheme()
const $cookies = inject<VueCookies>('$cookies')

// Theme
if ($cookies?.get('theme')) theme.global.name.value = $cookies.get('theme')
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark? 'light' : 'dark'
  $cookies?.set('theme', theme.global.name.value)
}
</script>

<template>
  <v-app id="v-app">
    <v-app-bar :elevation="2" rounded density="compact" style="opacity: 70%;">
      <v-app-bar-title>EVE 户</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon href="https://github.com/mintnick/EVEHu-Vue/" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <!-- <v-btn icon @click="toggleTheme">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn> -->
    </v-app-bar>
  </v-app>
</template>

<style scoped>
#v-app {
  background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/wallpaper.jpg');
  background-position: center;
  background-size: cover;
}
</style>
