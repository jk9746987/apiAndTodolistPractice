<template>
  <div id="app">
    <div class="mb-4 text-h5 title text-center">註冊帳號</div>
    <v-text-field
      background-color="white"
      class="input rounded-lg"
      label="Email"
      v-model="email"
      filled
      clearable
    ></v-text-field>
    <v-text-field
      background-color="white"
      class="input rounded-lg"
      label="密碼"
      v-model="password"
      filled
      clearable
    ></v-text-field>
    <v-text-field
      background-color="white"
      class="input rounded-lg"
      label="您的暱稱"
      v-model="nickname"
      filled
      clearable
    ></v-text-field>
    <v-text-field
      background-color="white"
      class="input rounded-lg"
      label="再次輸入密碼"
      v-model="passwordAgain"
      filled
      clearable
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      nickname: "",
      passwordAgain: "",
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
  .title {
    font-family: "NotoSansTC" !important;
  }
  .input {
    width: 300px;
  }
}
</style>