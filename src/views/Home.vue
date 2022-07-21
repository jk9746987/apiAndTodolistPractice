<template>
  <div id="app" class="d-flex justify-center align-center">
    <v-row class="col-6 d-flex justify-center align-center flex-wrap">
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
    <v-row class="col-6">
      <v-col>
        <!-- #elevation標籤可更改陰影 -->
        <v-card
          color="transparent"
          elevation="0"
          max-width="400"
          class="
            mx-auto
            form_container
            d-flex
            justify-center
            align-center
            flex-wrap
          "
        >
          <Login v-if="login" />
          <Register v-if="register" />
          <div class="d-flex justify-center">
            <span class="btn" @click="loginFn" :class="login ? 'choice' : ''"
              >登入</span
            >
          </div>
          <div class="d-flex justify-center">
            <span
              class="btn"
              @click="registerFn"
              :class="register ? 'choice' : ''"
              >註冊帳號</span
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Register from "@/components/Register";

export default {
  name: "Home",
  components: { Login, Register },
  data() {
    return {
      login: false,
      register: false,
    };
  },
  methods: {
    loginFn() {
      this.register = false;
      this.login = true;
    },
    registerFn() {
      this.login = false;
      this.register = true;
    },
  },
  mounted() {
    this.loginFn();
  },
};
</script>

<style lang="scss" scoped>
#app {
  min-height: 100%;
  .form_container {
    div .choice {
      background-color: #333333;
      border-radius: 10px;
      color: white;
    }
    div .btn {
      width: 130px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "NotoSansTC";
      cursor: pointer;
      margin: 5px;
    }
  }
}
</style>
