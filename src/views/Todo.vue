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
    <div class="outside d-flex justify-center align-center mx-auto">
      <div class="inside mx-auto">
        <div class="input_container mb-6">
          <v-text-field
            solo
            v-model="test"
            append-icon="mdi-plus-box"
            x-large
            placeholder="新增待辦事項"
            @click:append="testfn"
            class="rounded-lg"
            height="50"
          ></v-text-field>
        </div>
        <div class="todo_content rounded-lg pb-5">
          <div
            class="status_container d-flex justify-space-around align-center"
          >
            <div
              v-for="(item, index) in status"
              :key="index"
              @click="choice_status(index)"
              class="col-4 text-center"
              :class="count === index ? 'active' : ''"
            >
              {{ item }}
            </div>
          </div>
          <div class="todo_detail" v-for="item in todoList" :key="item.id">
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
            >
              <div class="txt_container d-flex">
                <v-icon>mdi-square-outline</v-icon>
                <v-icon>mdi-square</v-icon>
                <div class="txt">{{ item.txt }}</div>
              </div>
              <div class="button_container">
                <v-icon>mdi-pencil</v-icon>
                <v-icon>mdi-close</v-icon>
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
            >
              <input type="text" class="edit_input px-4" />
              <div class="button_container">
                <v-icon>mdi-check</v-icon>
                <v-icon>mdi-close</v-icon>
              </div>
            </div>
            <v-divider inset class="mx-auto"></v-divider>
          </div>
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
      test: null,
      testList: [],
      status: ["全部", "待完成", "已完成"],
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
  },
  methods: {
    testfn() {
      console.log("hahaha");
    },
    choice_status(index) {
      this.count = index;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-text-field__details {
  display: none;
}
#app {
  background: linear-gradient(
    172.7deg,
    #ffd370 5.12%,
    #ffd370 53.33%,
    #ffffff 53.45%
  );
  .top {
    height: 80px;
    .topAndright {
      font-size: 20px;
    }
  }

  .outside {
    width: 700px;
    height: calc(100vh - 80px);
    .inside {
      width: 100%;
      height: 500px;
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
    }
  }
}

.input_container ::v-deep .v-icon {
  font-size: 45px;
}
</style>