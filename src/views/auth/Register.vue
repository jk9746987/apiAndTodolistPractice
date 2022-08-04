<template>
  <div>
    <!-- #elevation標籤可更改陰影 -->
    <v-card
      color="transparent"
      elevation="0"
      max-width="400"
      class="mx-auto left_container"
    >
      <div class="mb-4 text-h5 title text-center col-12">線上代辦事項紀錄</div>
      <div class="btn_container col-12 d-flex justify-center">
        <div class="d-flex justify-center pr-3">
          <router-link :to="{ name: 'Login' }" class="btn btn_login"
            >登入</router-link
          >
        </div>
        <div class="d-flex justify-center pl-3">
          <span class="btn choice">註冊帳號</span>
        </div>
      </div>
      <div class="container">
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
            <div class="null_remind mx-auto">{{ registerEmailError }}</div>
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
            <div class="null_remind mx-auto">{{ nickNameError }}</div>
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
            <div class="null_remind mx-auto">
              {{ registerPasswordError }}
            </div>
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
            <div class="null_remind mx-auto">{{ againPasswordError }}</div>
          </div>
        </div>
      </div>
      <div class="col-12 d-flex justify-center">
        <v-btn
          class="white--text rounded-lg"
          width="300"
          height="50"
          color="#333333"
          @click="send"
          >註冊</v-btn
        >
      </div>
    </v-card>
    <Message :message="message" ref="message" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { POST_REGISTER } from "@/store/action_type";
import Message from "@/components/Message";
export default {
  name: "Home",
  components: { Message },
  data() {
    return {
      registerEmail: null,
      registerPassword: null,
      againPassword: null,
      nickName: null,
      registerEmailError: null,
      registerPasswordError: null,
      nickNameError: null,
      againPasswordError: null,
      message: null,
    };
  },
  methods: {
    ...mapActions("Login", {
      postRegister: POST_REGISTER,
    }),
    send() {
      this.sendError();
      this.registerSend();
    },
    registerSend() {
      if (
        this.registerEmail &&
        this.nickName &&
        this.registerPassword &&
        this.registerPassword === this.againPassword
      ) {
        this.postRegister({
          email: this.registerEmail,
          nickname: this.nickName,
          password: this.registerPassword,
        })
          .then((res) => {
            console.log(res);
            this.message = {
              title: res.data.message,
              description: `${res.data.nickname}歡迎使用本服務！`,
            };
            this.$nextTick(() => {
              this.$refs.message.message_dialog = true;
            });
          })
          .catch((err) => {
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
      this.registerEmailError = !this.registerEmail ? "此欄位不可為空" : null;
      this.nickNameError = !this.nickName ? "此欄位不可為空" : null;
      this.registerPasswordError = !this.registerPassword
        ? "此欄位不可為空"
        : this.registerPassword.length < 6
        ? "不可小於6碼"
        : null;
      this.againPasswordError = !this.againPassword
        ? "此欄位不可為空"
        : this.againPassword.length > 0 &&
          this.againPassword !== this.registerPassword
        ? "再次輸入密碼錯誤"
        : null;
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-input__slot:before) {
  border: none !important;
}

:deep(.v-label--active) {
  transform: translateY(-15px) scale(0.75);
}
.left_container {
  height: 600px;
  .btn_container {
    div .btn {
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
    div .choice {
      background-color: #333333;
      border-radius: 10px;
      color: white;
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
    padding-bottom: 0;
    .input {
      width: 300px !important;
    }
    .form_container {
      width: 350px;
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
