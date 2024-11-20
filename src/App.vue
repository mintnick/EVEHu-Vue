<script setup lang="ts">
</script>

<template>
  <v-app id="v-app">
    <v-app-bar :elevation="2" rounded density="compact" style="opacity: 90%;">
      <v-app-bar-title>
        <RouterLink to="/" class="text-h5">EVE 户</RouterLink>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon href="https://nickning.app/donate" target="_blank">
        <v-icon>mdi-hand-coin-outline</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/mintnick/EVEHu-Vue/" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex flex-column align-center">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
#v-app {
  background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/wallpaper.jpg');
  background-position: center;
  background-size: cover;
}

#app a {
  color: #0E0E0E;
}
</style>
