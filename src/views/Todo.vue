<template>
  <div id="app">
    <div class="top col-12 d-flex justify-space-between align-center">
      <router-link to="/">
        <v-img
          src="@/assets/image/logo.svg"
          width="350"
          class="mx-auto"
          contain
          alt=""
        />
      </router-link>
      <div class="d-flex topAndright">
        <div class="mr-4">Hi, {{ nickname }} 您好</div>
        <div>登出</div>
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
            v-for="(item, index) in status"
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
                v-if="item.done === false"
                @click="item.done = !item.done"
                >mdi-square-outline</v-icon
              >
              <v-icon
                class="mr-3"
                v-if="item.done === true"
                @click="item.done = !item.done"
                >mdi-square</v-icon
              >
              <div
                class="txt"
                @click="item.done = !item.done"
                :class="item.done === true ? 'complete_todo' : ''"
              >
                {{ item.txt }}
              </div>
            </div>
            <div class="button_container">
              <v-icon @click="editTodo(item)" :disabled="item.done"
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
            <div class="button_container">
              <v-icon @click="confirmEdit(item)">mdi-check</v-icon>
              <v-icon @click="deleteTodo(item)">mdi-close</v-icon>
            </div>
          </div>
          <v-divider inset class="mx-auto"></v-divider>
        </div>
        <div class="total_todo px-7 mx-2 mt-4 d-flex justify-space-between">
          <div>共 {{ todoStatus }} 個待完成項目</div>
          <div class="complete" @click="clearComplete">清除已完成項目</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "todo",
  data() {
    return {
      newTodo: null,
      todoField: null,
      editInput: null,
      status: ["全部", "待完成", "已完成"],
      choiceStatus: "全部",
      count: 0,
      todoList: [
        {
          id: 1,
          txt: "haha1",
          done: false,
        },
        {
          id: 2,
          txt: "haha2",
          done: false,
        },
        {
          id: 3,
          txt: "haha3",
          done: false,
        },
      ],
    };
  },
  computed: {
    ...mapState("Home", ["nickname"]),
    todoStatus() {
      let number = 0;
      this.filterTodoList.forEach((item) => {
        if (!item.done) {
          number++;
        }
      });
      return number;
    },
    filterTodoList() {
      let choiceStatusList = [];
      switch (this.status[this.count]) {
        case "全部":
          return this.todoList;
        case "待完成":
          this.todoList.forEach((item) => {
            if (!item.done) {
              choiceStatusList.push(item);
            }
          });
          return choiceStatusList;
        case "已完成":
          this.todoList.forEach((item) => {
            if (item.done) {
              choiceStatusList.push(item);
            }
          });
          return choiceStatusList;
        default:
          return "";
      }
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        this.todoList.push({
          id: Date.now(),
          txt: this.newTodo,
          done: false,
        });
      }
      this.newTodo = null;
    },
    choice_status(item, index) {
      this.choiceStatus = item;
      this.count = index;
      this.todoField = null;
    },
    editTodo(data) {
      this.todoField = data;
      this.editInput = data.txt;
      this.$nextTick(() => {
        this.$refs[`focusInput${data.id}`][0].focus();
      });
    },
    confirmEdit(data) {
      data.txt = this.editInput;
      this.todoField = null;
    },
    deleteTodo(data) {
      this.todoList.forEach((item, index) => {
        if (item.id === data.id) {
          this.todoList.splice(index, 1);
        }
      });
    },
    clearComplete() {
      let uncompleteList = [];
      this.todoList.forEach((item) => {
        if (!item.done) {
          uncompleteList.push(item);
        }
      });
      this.todoList = uncompleteList;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-text-field__details {
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
      }
    }
    .total_todo {
      .complete {
        color: #9f9a91;
        cursor: pointer;
      }
    }
  }
}

.input_container ::v-deep .v-icon {
  font-size: 45px;
}
</style>