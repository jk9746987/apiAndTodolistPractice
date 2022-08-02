<template>
  <v-row justify="center">
    <v-dialog v-model="confirm_dialog" max-width="350">
      <v-card color="#ffd370">
        <v-card-title class="justify-center pb-2" v-if="listLength === 1">
          確定要刪除此待辦事項嗎？
        </v-card-title>
        <v-card-title class="justify-center pb-2" v-else>
          確定要刪除這 {{ listLength }} 項事項嗎？
        </v-card-title>
        <v-card-actions class="justify-space-around pb-5 pt-0 col-8 mx-auto">
          <v-btn class="delete" @click="deleteTodo"> 刪除 </v-btn>
          <v-btn class="cencel" @click="confirm_dialog = false"> 取消 </v-btn>
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
  computed: {
    listLength() {
      return this.detail.filter((item) => {
        return item.completed_at;
      }).length;
    },
  },
  methods: {
    ...mapActions("Home", { deleteTodos: DELETE_TODOS }),
    deleteTodo() {
      console.log(this.detail);
      Promise.all(
        this.detail.map((item) => {
          return this.deleteTodos({
            id: item.id,
          });
        })
      )
        .then(() => {
          this.$emit("reloadTodo");
          this.confirm_dialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-btn) {
  font-family: "NotoSansTC" !important;
}

.delete {
  background-color: red !important;
  color: white;
}

.cencel {
  background-color: #ec8f3f !important;
  color: white;
}
</style>