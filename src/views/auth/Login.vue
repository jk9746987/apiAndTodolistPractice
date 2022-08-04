<template>
  <div>
    <!-- #elevation標籤可更改陰影 -->
    <v-card
      color="transparent"
      elevation="0"
      max-width="400"
      class="mx-auto auth_container"
    >
      <div class="mb-4 text-h5 title text-center col-12">線上代辦事項紀錄</div>
      <div class="tab_container col-12 d-flex justify-center">
        <div class="d-flex justify-center pr-3">
          <span class="auth_button btn_login choice">登入</span>
        </div>
        <div class="d-flex justify-center pl-3">
          <router-link :to="{ name: 'Register' }" class="auth_button"
            >註冊帳號</router-link
          >
        </div>
      </div>
      <div class="form">
        <div class="input_container">
          <v-text-field
            background-color="white"
            class="input rounded-lg mx-auto"
            label="Email"
            v-model="loginEmail"
            filled
            clearable
          ></v-text-field>
          <div class="null_remind mx-auto">{{ loginEmailError }}</div>
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
          <div class="null_remind mx-auto">{{ loginPasswordError }}</div>
        </div>
      </div>
      <div class="col-12 d-flex justify-center">
        <v-btn
          class="white--text rounded-lg"
          width="300"
          height="50"
          color="#333333"
          @click="send"
          >登入</v-btn
        >
      </div>
    </v-card>
    <Message :message="message" ref="message" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { POST_SIGN_IN } from "@/store/action_type";
import Message from "@/components/Message";
export default {
  name: "Home",
  components: { Message },
  data() {
    return {
      loginEmail: null,
      loginPassword: null,
      loginEmailError: null,
      loginPasswordError: null,
      message: null,
    };
  },
  methods: {
    ...mapActions("Auth", {
      postSignIn: POST_SIGN_IN,
    }),
    resetData() {
      this.loginEmail = null;
      this.loginPassword = null;
      this.loginEmailError = null;
      this.loginPasswordError = null;
    },
    send() {
      this.loginSend();
    },
    loginSend() {
      if (
        this.loginEmail &&
        this.loginPassword &&
        this.loginPassword.length >= 6
      ) {
        this.postSignIn({
          email: this.loginEmail,
          password: this.loginPassword,
        })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
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
      this.loginEmailError = !this.loginEmail ? "此欄位不可為空" : null;
      this.loginPasswordError = !this.loginPassword
        ? "此欄位不可為空"
        : this.loginPassword.length < 6
        ? "不可小於6碼"
        : null;
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
  height: 600px;
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
    width: 400px;
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
