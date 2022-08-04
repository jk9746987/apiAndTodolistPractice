<template>
  <div id="app">
    <div class="top col-12 d-flex justify-space-between align-center">
      <div class="col-9 col-sm-8">
        <v-img src="@/assets/image/logo.svg" width="350" contain alt="" />
      </div>
      <div class="d-flex topAndright">
        <div class="mr-4 d-none d-md-block">Hi, {{ nickName }} 您好</div>
        <button @click="signOut">登出</button>
      </div>
    </div>
    <div class="outside mx-auto pb-4">
      <div class="input_container mb-6">
        <v-text-field
          solo
          v-model.trim="newTodo"
          append-icon="mdi-plus-box"
          x-large
          @click="todoField = null"
          placeholder="新增待辦事項"
          @click:append="addTodo"
          class="rounded-lg"
          height="50"
          @keyup.enter="addTodo"
        ></v-text-field>
      </div>
      <div class="todo_content rounded-lg pb-5 mb-4">
        <div class="status_container d-flex justify-space-around align-center">
          <div
            v-for="(item, index) in tab"
            :key="index"
            @click="choice_status(item, index)"
            class="col-4 text-center"
            :class="count === index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
        <div class="todo_detail" v-for="item in filterTodoList" :key="item.id">
          <div
            class="
              item_container
              d-flex
              justify-space-between
              align-center
              px-7
              mx-2
              mb-3
              mt-4
            "
            v-if="todoField !== item"
          >
            <div class="txt_container d-flex">
              <v-icon
                class="mr-3"
                v-if="item.completed_at === null || item.completed_at === false"
                @click="toggleTodoStatus(item)"
                >mdi-square-outline</v-icon
              >
              <v-icon
                class="mr-3"
                v-if="item.completed_at"
                @click="toggleTodoStatus(item)"
                >mdi-square</v-icon
              >
              <div
                class="txt"
                @click="toggleTodoStatus(item)"
                :class="item.completed_at ? 'complete_todo' : ''"
              >
                {{ item.content }}
              </div>
            </div>
            <div class="button_container col-3 pa-0">
              <v-icon
                @click="editTodo(item)"
                :disabled="item.completed_at !== null"
                >mdi-pencil</v-icon
              >
              <v-icon @click="deleteTodo(item)">mdi-close</v-icon>
            </div>
          </div>
          <div
            class="
              item_edit_container
              d-flex
              justify-space-between
              align-center
              px-7
              mx-2
              mb-3
              mt-4
            "
            v-if="todoField === item"
          >
            <input
              type="text"
              @keyup.enter="confirmEdit(item)"
              class="edit_input px-4"
              v-model="editInput"
              :ref="`focusInput${item.id}`"
              @keyup.esc="todoField = null"
            />
            <div class="button_container col-1">
              <v-icon @click="confirmEdit(item)">mdi-check</v-icon>
              <v-icon @click="deleteTodo(item)">mdi-close</v-icon>
            </div>
          </div>

          <v-divider inset class="mx-auto"></v-divider>
        </div>
        <div class="total_todo px-7 mx-2 mt-4 d-flex justify-space-between">
          <div>共 {{ todoStatus }} 個待完成項目</div>
          <button
            class="complete"
            @click="clearComplete"
            :disabled="completeTodo === 0"
          >
            清除已完成項目
          </button>
        </div>
      </div>
    </div>
    <Confirm ref="confirm" @reloadTodo="getTodo" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { _axios } from "@/common/api";
import {
  GET_TODOS,
  POST_TODOS,
  PUT_TODOS,
  DELETE_TODOS,
  PATCH_TODOS,
  DELETE_SIGN_OUT,
} from "@/store/action_type";
import Confirm from "@/components/Confirm";
export default {
  name: "todo",
  components: {
    Confirm,
  },
  data() {
    return {
      newTodo: null,
      todoField: null,
      editInput: null,
      tab: ["全部", "待完成", "已完成"],
      choiceStatus: "全部",
      count: 0,
      todoList: [],
      completeList: [],
    };
  },
  computed: {
    ...mapState("Home", ["nickname"]),
    todoStatus() {
      let number = 0;
      this.filterTodoList.forEach((item) => {
        if (!item.completed_at) {
          number++;
        }
      });
      return number;
    },
    filterTodoList() {
      let choiceStatusList = [];
      switch (this.tab[this.count]) {
        case "全部":
          return this.todoList;
        case "待完成":
          this.todoList.forEach((item) => {
            if (!item.completed_at) {
              choiceStatusList.push(item);
            }
          });
          return choiceStatusList;
        case "已完成":
          this.todoList.forEach((item) => {
            if (item.completed_at) {
              choiceStatusList.push(item);
            }
          });
          return choiceStatusList;
        default:
          return "";
      }
    },
    completeTodo() {
      return this.todoList.filter((item) => {
        return item.completed_at !== null;
      }).length;
    },
    nickName() {
      return localStorage.getItem("nickName");
    },
  },
  methods: {
    ...mapActions("Home", {
      getTodos: GET_TODOS,
      postTodos: POST_TODOS,
      putTodos: PUT_TODOS,
      deleteTodos: DELETE_TODOS,
      patchTodos: PATCH_TODOS,
      deleteSignOut: DELETE_SIGN_OUT,
    }),
    addTodo() {
      if (this.newTodo) {
        this.postTodos({
          todo: this.newTodo,
        })
          .then(() => {
            this.newTodo = null;
            this.getTodo();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    choice_status(item, index) {
      this.choiceStatus = item;
      this.count = index;
      this.todoField = null;
    },
    editTodo(data) {
      this.todoField = data;
      this.editInput = data.content;
      this.$nextTick(() => {
        // 由於ref是可變的加上回傳的是一個陣列，故後面需補上[0]
        this.$refs[`focusInput${data.id}`][0].focus();
      });
    },
    confirmEdit(data) {
      data.content = this.editInput;
      this.putTodos({ id: data.id, editTodo: data.content });
      this.editInput = null;
      this.todoField = null;
    },
    deleteTodo(data) {
      this.$nextTick(() => {
        let list = [];
        list.push(data);
        this.$refs.confirm.confirm_dialog = true;
        this.$refs.confirm.detail = list;
      });
    },
    clearComplete() {
      this.completeList = [];
      this.todoList.forEach((item) => {
        if (item.completed_at !== null) {
          this.completeList.push(item);
        }
      });
      this.$nextTick(() => {
        this.$refs.confirm.confirm_dialog = true;
        this.$refs.confirm.detail = this.completeList;
      });
    },
    getTodo() {
      this.getTodos()
        .then((res) => {
          this.todoList = res.data.todos;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleTodoStatus(data) {
      this.patchTodos({ id: data.id })
        .then(() => {
          this.getTodo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signOut() {
      this.deleteSignOut()
        .then(() => {
          localStorage.removeItem("set_token");
          localStorage.removeItem("nickName");
          _axios.defaults.headers.common["Authorization"] = "";
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getTodo();
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-text-field__details) {
  display: none;
}

#app {
  height: 100vh;
  background: linear-gradient(
    172.7deg,
    #ffd370 5.12%,
    #ffd370 53.33%,
    #ffffff 53.45%,
    #ffffff 94.32%
  );
  .top {
    height: 80px;
    .topAndright {
      font-size: 20px;
    }
  }

  .outside {
    width: 700px;
    margin-top: 30px;
    @media (max-width: 960px) {
      width: 500px;
    }
    @media (max-width: 600px) {
      width: 350px;
    }
  }
  .todo_content {
    background-color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    .status_container {
      height: 50px;
      div {
        border-bottom: 2px solid #efefef;
      }
      .active {
        border-bottom: 2px solid #333333;
      }
    }
    .todo_detail {
      .edit_input {
        border: 2px solid black;
        width: 80%;
        height: 40px;
        border-radius: 10px;
      }
      .edit_input:focus {
        outline: none;
        border: 3px solid #ec8f3f;
      }
      .txt_container {
        .complete_todo {
          text-decoration: line-through;
          color: #9f9a91;
        }
        .txt {
          // 當英文過多時自動換行
          overflow-wrap: break-word;
          width: 530px;
          @media (max-width: 960px) {
            width: 350px;
          }
          @media (max-width: 600px) {
            width: 200px;
          }
        }
      }
    }
    .total_todo {
      .complete {
        color: #9f9a91;
      }
    }
  }
}

.input_container :deep(.v-icon) {
  font-size: 45px;
}
</style>