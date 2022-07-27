<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
#app {
  background-color: #ffd370;
  font-family: "NotoSansTC" !important;
}
</style>
