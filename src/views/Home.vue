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
          <div class="container d-flex align-center" v-if="login">
            <div class="form_container mx-auto">
              <div class="mb-4 text-h5 title text-center col-12">
                線上代辦事項紀錄
              </div>
              <div class="input_container">
                <v-text-field
                  background-color="white"
                  class="input rounded-lg mx-auto"
                  label="Email"
                  v-model="loginEmail"
                  filled
                  clearable
                ></v-text-field>
                <div class="null_remind mx-auto">此欄位不可為空</div>
              </div>
              <div class="input_container">
                <v-text-field
                  background-color="white"
                  class="input rounded-lg mx-auto"
                  label="密碼"
                  v-model="loginPassword"
                  filled
                  clearable
                  placeholder="不可小於6碼"
                ></v-text-field>
                <div class="null_remind mx-auto">此欄位不可為空</div>
              </div>
            </div>
          </div>
          <div v-if="register" class="container d-flex align-center">
            <div class="form_container mx-auto">
              <div class="mb-4 text-h5 title text-center">註冊帳號</div>
              <div class="input_container">
                <v-text-field
                  background-color="white"
                  class="input rounded-lg mx-auto"
                  label="Email"
                  v-model="registerEmail"
                  filled
                  clearable
                ></v-text-field>
                <div class="null_remind mx-auto">此欄位不可為空</div>
              </div>
              <div class="input_container">
                <v-text-field
                  background-color="white"
                  class="input rounded-lg mx-auto"
                  label="您的暱稱"
                  v-model="nickName"
                  filled
                  clearable
                ></v-text-field>
                <div class="null_remind mx-auto">此欄位不可為空</div>
              </div>
              <div class="input_container">
                <v-text-field
                  background-color="white"
                  class="input rounded-lg mx-auto"
                  label="密碼"
                  v-model="registerPassword"
                  filled
                  clearable
                  placeholder="不可小於6碼"
                ></v-text-field>
                <div class="null_remind mx-auto">此欄位不可為空</div>
              </div>
              <div class="input_container">
                <v-text-field
                  background-color="white"
                  class="input rounded-lg mx-auto"
                  label="再次輸入密碼"
                  v-model="againPassword"
                  filled
                  clearable
                  placeholder="不可小於6碼"
                ></v-text-field>
                <div class="null_remind mx-auto">此欄位不可為空</div>
              </div>
            </div>
          </div>
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
export default {
  name: "Home",
  components: {},
  data() {
    return {
      login: false,
      register: false,
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      againPassword: "",
      nickName: "",
    };
  },
  computed: {},
  methods: {
    loginFn() {
      this.register = false;
      this.login = true;
      this.registerEmail = "";
      this.registerPassword = "";
      this.againPassword = "";
      this.nickName = "";
    },
    registerFn() {
      this.login = false;
      this.register = true;
      this.loginEmail = "";
      this.loginPassword = "";
    },
    loginSend() {},
    registerSend() {},
  },
  mounted() {
    this.loginFn();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot:before {
  border: none !important;
}

::v-deep .v-label--active {
  transform: translateY(-15px) scale(0.75);
}

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
  .container {
    height: 430px;
    width: 400px;
    font-family: "NotoSansTC" !important;
    .input {
      width: 300px !important;
    }
    .form_container {
      width: 350px;
    }
    .title {
      font-family: "NotoSansTC" !important;
    }
    .input_container {
      position: relative;
      .null_remind {
        color: #d87355;
        width: 300px;
        position: absolute;
        top: 57px;
        left: 25px;
      }
    }
  }
}
</style>
