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
        <div class="tab_container col-12 d-flex mb-4 justify-center">
          <div class="d-flex justify-center pr-3">
            <router-link :to="{ name: 'Login' }" class="auth_button btn_login"
              >登入</router-link
            >
          </div>
          <div class="d-flex justify-center pl-3">
            <span class="auth_button choice">註冊帳號</span>
          </div>
        </div>
        <v-form class="form">
          <div class="input_container">
            <v-text-field
              autocomplete="off"
              background-color="white"
              class="input rounded-lg mx-auto"
              label="Email"
              v-model="register.email"
              filled
              clearable
            ></v-text-field>
            <div class="null_remind mx-auto">{{ error.email }}</div>
          </div>
          <div class="input_container">
            <v-text-field
              autocomplete="off"
              background-color="white"
              class="input rounded-lg mx-auto"
              label="您的暱稱"
              v-model="register.nickName"
              filled
              clearable
            ></v-text-field>
            <div class="null_remind mx-auto">{{ error.nickName }}</div>
          </div>
          <div class="input_container">
            <v-text-field
              autocomplete="off"
              background-color="white"
              filled
              clearable
              v-model="register.password"
              :append-icon="registerPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="registerPasswordShow ? 'text' : 'password'"
              label="密碼"
              class="input rounded-lg mx-auto"
              @click:append="registerPasswordShow = !registerPasswordShow"
              placeholder="不可小於6碼"
            ></v-text-field>
            <div class="null_remind mx-auto">
              {{ error.password }}
            </div>
          </div>
          <div class="input_container">
            <v-text-field
              autocomplete="off"
              background-color="white"
              filled
              clearable
              v-model="register.again"
              :append-icon="againPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="againPasswordShow ? 'text' : 'password'"
              label="再次輸入密碼"
              class="input rounded-lg mx-auto"
              @click:append="againPasswordShow = !againPasswordShow"
              placeholder="不可小於6碼"
            ></v-text-field>
            <div class="null_remind mx-auto">{{ error.again }}</div>
          </div>
        </v-form>
        <div class="col-12 d-flex justify-center">
          <v-btn
            class="white--text rounded-lg"
            width="300"
            height="50"
            color="#333333"
            @click="sendBtn"
            >註冊</v-btn
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
import { POST_REGISTER } from "@/store/action_type";
import Message from "@/components/Message";
import Loading from "vue-loading-overlay";
export default {
  name: "Register",
  components: { Message, Loading },
  data() {
    return {
      register: {
        email: "",
        password: "",
        again: "",
        nickName: "",
      },
      registerEmail: null,
      registerPassword: null,
      againPassword: null,
      nickName: null,
      error: {
        email: "",
        password: "",
        again: "",
        nickName: "",
      },
      registerEmailError: null,
      registerPasswordError: null,
      nickNameError: null,
      againPasswordError: null,
      message: null,
      isLoading: false,
      registerPasswordShow: false,
      againPasswordShow: false,
    };
  },
  methods: {
    ...mapActions("Auth", {
      postRegister: POST_REGISTER,
    }),
    sendBtn() {
      this.sendError();
      this.registerSend();
    },
    registerSend() {
      if (
        this.register.email &&
        this.register.nickName &&
        this.register.password &&
        this.register.password === this.register.again
      ) {
        this.isLoading = true;
        this.postRegister({
          email: this.register.email,
          nickname: this.register.nickName,
          password: this.register.password,
        })
          .then((res) => {
            this.isLoading = false;
            this.message = {
              title: res.data.message,
              description: `${res.data.nickname}歡迎使用本服務！`,
            };
            this.$nextTick(() => {
              this.$refs.message.message_dialog = true;
            });
          })
          .catch((err) => {
            this.isLoading = false;
            this.message = {
              title: err.response.data.message,
              description: err.response.data.error[0],
            };
            this.$nextTick(() => {
              this.$refs.message.message_dialog = true;
            });
          });
      }
    },
    sendError() {
      this.error.email = !this.register.email ? "此欄位不可為空" : "";
      this.error.nickName = !this.register.nickName ? "此欄位不可為空" : "";
      this.error.password = !this.register.password
        ? "此欄位不可為空"
        : this.register.password.length < 6
        ? "不可小於6碼"
        : "";
      this.error.again = !this.register.again
        ? "此欄位不可為空"
        : this.register.again.length > 0 &&
          this.register.again !== this.register.password
        ? "再次輸入密碼錯誤"
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
