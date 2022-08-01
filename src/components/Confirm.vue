<template>
  <v-row justify="center">
    <v-dialog v-model="confirm_dialog" max-width="350">
      <v-card color="#ffd370">
        <v-card-title class="justify-center">
          確定要刪除此待辦事項嗎？
        </v-card-title>
        <v-card-actions class="justify-space-around pb-4 col-8 mx-auto">
          <v-btn color="black" outlined @click="deleteTodo"> 刪除 </v-btn>
          <v-btn color="black" outlined @click="confirm_dialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { DELETE_TODOS } from "@/store/action_type";
export default {
  name: "confirm",
  data() {
    return {
      confirm_dialog: false,
      detail: null,
    };
  },
  methods: {
    ...mapActions("Home", { deleteTodos: DELETE_TODOS }),
    deleteTodo() {
      this.deleteTodos({ id: this.detail.id })
        .then(() => {
          this.$emit("reloadTodo");
          this.confirm_dialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$parent.getTodo();
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-btn) {
  font-family: "NotoSansTC" !important;
}
</style>