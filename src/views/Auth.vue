<template>
  <div id="app" class="d-flex justify-center align-center">
    <v-row class="col-6 d-none d-md-flex justify-center align-center flex-wrap">
      <v-col class="col-12">
        <v-img
          src="@/assets/image/logo.svg"
          width="350"
          class="mx-auto"
          contain
          alt=""
        />
      </v-col>
      <v-col class="col-12">
        <v-img
          src="@/assets/image/person_background.svg"
          class="mx-auto"
          width="400"
          contain
        />
      </v-col>
    </v-row>
    <v-row class="col-12 col-md-6">
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#app {
  min-height: 100%;
}
</style>
