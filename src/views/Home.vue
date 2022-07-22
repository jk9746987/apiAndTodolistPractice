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
          class="mx-auto left_container"
        >
          <div class="mb-4 text-h5 title text-center col-12">
            線上代辦事項紀錄
          </div>
          <div class="btn_container col-12 d-flex justify-center">
            <div class="d-flex justify-center pr-3">
              <span
                class="btn btn_login"
                @click="loginFn"
                :class="login ? 'choice' : ''"
                >登入</span
              >
            </div>
            <div class="d-flex justify-center pl-3">
              <span
                class="btn"
                @click="registerFn"
                :class="register ? 'choice' : ''"
                >註冊帳號</span
              >
            </div>
          </div>
          <div class="container" v-if="login">
            <div class="form_container mx-auto">
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
          <div v-if="register" class="container">
            <div class="form_container mx-auto">
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
          <div class="send_container col-12 d-flex justify-center">
            <v-btn
              class="send white--text rounded-lg"
              width="300"
              height="50"
              color="#333333"
              >{{ send }}</v-btn
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
  computed: {
    send() {
      return this.login ? "登入" : "註冊";
    },
  },
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
  font-family: "NotoSansTC" !important;
  .left_container {
    height: 600px;
    .btn_container {
      div .choice {
        background-color: #333333;
        border-radius: 10px;
        color: white;
      }
      div .btn {
        width: 120px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "NotoSansTC";
        cursor: pointer;
        margin: 5px;
      }
      div .btn_login::after {
        content: "";
        width: 2px;
        height: 55px;
        background-color: #333333;
        position: relative;
        right: -61px;
        top: 0;
      }
    }

    .title {
      font-family: "NotoSansTC" !important;
    }
    .container {
      width: 400px;
      .input {
        width: 300px !important;
      }
      .form_container {
        width: 350px;
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
    .send_container {
      .send {
      }
    }
  }
}
</style>
