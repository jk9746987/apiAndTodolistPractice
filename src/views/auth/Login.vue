<template>
  <div>
    <!-- #elevation標籤可更改陰影 -->
    <v-card
      color="transparent"
      elevation="0"
      class="auth_container d-flex justify-center"
    >
      <div class="inner">
        <div class="mb-4 text-h5 title text-center col-12">
          線上代辦事項紀錄
        </div>
        <div class="tab_container col-12 mb-4 d-flex justify-center">
          <div class="d-flex justify-center pr-3">
            <span class="auth_button btn_login choice">登入</span>
          </div>
          <div class="d-flex justify-center pl-3">
            <router-link :to="{ name: 'Register' }" class="auth_button"
              >註冊帳號</router-link
            >
          </div>
        </div>
        <v-form class="form">
          <div class="input_container">
            <v-text-field
              autocomplete="off"
              background-color="white"
              class="input rounded-lg mx-auto"
              label="Email"
              v-model="login.email"
              filled
              clearable
            ></v-text-field>
            <div class="null_remind mx-auto">{{ error.email }}</div>
          </div>
          <div class="input_container">
            <v-text-field
              autocomplete="off"
              background-color="white"
              filled
              clearable
              v-model="login.password"
              :append-icon="loginPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="loginPasswordShow ? 'text' : 'password'"
              label="密碼"
              class="input rounded-lg mx-auto"
              @click:append="loginPasswordShow = !loginPasswordShow"
              placeholder="不可小於6碼"
            ></v-text-field>
            <div class="null_remind mx-auto">{{ error.password }}</div>
          </div>
        </v-form>
        <div class="col-12 d-flex justify-center">
          <v-btn
            class="white--text rounded-lg"
            width="300"
            height="50"
            color="#333333"
            @click="sendBtn"
            >登入</v-btn
          >
        </div>
      </div>
    </v-card>
    <Message :message="message" ref="message" />
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { POST_SIGN_IN } from "@/store/action_type";
import Message from "@/components/Message";
import Loading from "vue-loading-overlay";

export default {
  name: "Login",
  components: { Message, Loading },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      error: {
        email: "",
        password: "",
      },
      message: null,
      isLoading: false,
      loginPasswordShow: false,
    };
  },
  methods: {
    ...mapActions("Auth", {
      postSignIn: POST_SIGN_IN,
    }),
    resetData() {
      this.login.email = "";
      this.login.password = "";
      this.error.email = "";
      this.error.password = "";
    },
    sendBtn() {
      this.sendError();
      this.loginSend();
    },
    loginSend() {
      if (
        this.login.email &&
        this.login.password &&
        this.login.password.length >= 6
      ) {
        this.isLoading = true;
        this.postSignIn({
          email: this.login.email,
          password: this.login.password,
        })
          .then(() => {
            this.isLoading = false;
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            this.isLoading = false;
            this.message = {
              title: err.response.data.message,
              description: `電子信箱或密碼輸入錯誤`,
            };
            this.$nextTick(() => {
              this.$refs.message.message_dialog = true;
            });
          });
      }
    },
    sendError() {
      this.error.email = !this.login.email ? "此欄位不可為空" : "";
      this.error.password = !this.login.password
        ? "此欄位不可為空"
        : this.login.password.length < 6
        ? "不可小於6碼"
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.theme--light.v-text-field > .v-input__control > .v-input__slot:before) {
  border: none;
}

:deep(.v-label--active) {
  transform: translateY(-15px) scale(0.75);
}

.auth_container {
  height: 650px;
  .tab_container {
    .auth_button {
      width: 120px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 5px;
      color: rgba(0, 0, 0, 0.87);
      text-decoration: none;
    }
    .choice {
      background-color: #333333;
      border-radius: 10px;
      color: white;
    }
    .btn_login::after {
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
  .form {
    padding-bottom: 0;
    .input {
      width: 300px !important;
    }
    .input_container {
      position: relative;
      margin-bottom: 10px;
      .null_remind {
        color: #d87355;
        width: 300px;
        position: absolute;
        top: 60px;
        left: 25px;
      }
    }
  }
}
</style>
