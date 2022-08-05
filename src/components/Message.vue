<template>
  <div>
    <v-dialog v-model="message_dialog" width="400">
      <v-card color="#ffd370" class="d-flex flex-wrap">
        <div class="d-flex justify-end col-12 pa-0">
          <v-icon class="icon" large @click="message_dialog = false"
            >mdi-close</v-icon
          >
        </div>
        <div class="col-12 d-flex justify-center pa-0">
          {{ title }}
        </div>
        <div
          class="col-12 mb-6 d-flex justify-center"
          :class="
            title === '註冊發生錯誤' || title === '登入失敗' ? 'red--text' : ''
          "
        >
          {{ description }}
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "message",
  props: ["message"],
  data() {
    return {
      message_dialog: false,
    };
  },
  computed: {
    title() {
      return this.message ? this.message.title : null;
    },
    description() {
      return this.message ? this.message.description : null;
    },
  },
  watch: {
    message_dialog: {
      handler(n) {
        if (n === false && this.title === "註冊成功") {
          this.$router.push({ name: "Login" });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
  overflow-x: hidden;
}
.icon {
  cursor: pointer;
}
</style>