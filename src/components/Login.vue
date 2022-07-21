<template>
  <div id="app" class="d-flex align-center flex-wrap">
    <div class="container">
      <div class="mb-4 text-h5 title text-center col-12">線上代辦事項紀錄</div>
      <v-text-field
        background-color="white"
        class="input rounded-lg mx-auto"
        label="Email"
        v-model="email"
        filled
        clearable
      ></v-text-field>
      <v-text-field
        background-color="white"
        class="input rounded-lg mx-auto"
        label="密碼"
        v-model="password"
        filled
        clearable
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot:before {
  border: none !important;
}

#app {
  height: 400px;
  .container {
    width: 350px;
    .title {
      font-family: "NotoSansTC" !important;
    }
    .input {
      width: 300px !important;
    }
  }
}
</style>