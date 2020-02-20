<template>
  <div class="todo_list">
    <div class="todo_list__form">
      <div 
        class="todo_list__form__name"
        @click="focusName"
      >
        <template v-if="!isFocus">
          <h3 class="todo_list__form__name__heading">{{ newName }}</h3>
        </template>
        <template v-else-if="isFocus && !isHome">
          <input 
            class="todo_list__form__name__input"
            type="text"
            v-model="newName"
            ref="input"
          >
          <div class="todo_list__form__name__actions">
            <div  
              class="todo_list__form__name__actions__action"
              @click.stop="editListName"
            >
              <img 
                class="todo_list__form__name__actions__action__img"
                src="@/assets/images/ok.png"
              >
            </div>
            <div 
              class="todo_list__form__name__actions__action"
              @click.stop="cancel"
            >
              <img 
                class="todo_list__form__name__actions__action__img"
                src="@/assets/images/cancel.png"
              >
            </div>
          </div>
        </template>
      </div>
      <div class="todo_list__form__todo__wrapper">
        <Todo
          v-for="(todo, index) in todos" :key="index"
          :isActive="todo.isActive"
          :name="todo.name"
          :indexTodo="index"
          :isHome="isHome"
          @toggle="toggleTodoActive"
          @edit="editTodoName"
          @remove="removeTodo"
        />
      </div>
    </div>
    <div class="todo_list__actions">
      <div 
        class="todo_list__actions__action"
        @click="removeList"
      >
        <img 
          class="todo_list__actions__action__img"
          src="@/assets/images/remove.png"
        >
      </div>
      <div 
        v-if="isHome"
        class="todo_list__actions__action edit"
        @click="editListMove"
      >
        <img 
          class="todo_list__actions__action__img"
          src="@/assets/images/edit.png"
        >
      </div>
      <div 
        v-if="!isHome"
        class="todo_list__actions__action add"
        @click="addTodo"
      >
        <img 
          class="todo_list__actions__action__img"
          src="@/assets/images/plus.png"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import Todo from "./Todo";
import eventBus from "@/utils/eventBus";

export default {
  name: "TodoList",
  components: {
    Todo
  },
  props: {
    todos: {
      type: Array
    },
    name: {
      type: String
    },
    indexList: {
      type: Number
    }
  },
  data() {
    return {
      newName: "",
      isFocus: null
    }
  },
  computed: {
    isHome() {
      return this.$route.path === "/";
    }
  },
  watch: {
    name(val) {
      this.newName = val;
    }
  },
  created() {
    this.newName = this.name;
  },
  methods: {
    ...mapMutations({
      EDIT_TODO_ACTIVE: "EDIT_TODO_ACTIVE",
      EDIT_TODO_NAME: "EDIT_TODO_NAME",
      EDIT_LIST_NAME: "EDIT_LIST_NAME",
      REMOVE_LIST: "REMOVE_LIST",
      REMOVE_TODO: "REMOVE_TODO",
      ADD_TODO: "ADD_TODO"
    }),

    focusName() {
      if (this.isHome) return;
      this.isFocus = true;
      setTimeout(() => this.$refs.input.focus());
    },
    
    editListName() {
      const payload = {
        name: this.newName,
        indexList: this.indexList
      };

      this.EDIT_LIST_NAME(payload);
      this.isFocus = false;
    },
    
    cancel() {
      eventBus.$emit("modalShow", {
        ok: () => {
          this.newName = this.name;
          this.isFocus = false;
        }
      });
    },

    toggleTodoActive(indexTodo) {
      const payload = {
        indexList: this.indexList,
        indexTodo: indexTodo
      };
      this.EDIT_TODO_ACTIVE(payload);
    },

    removeList() {
      eventBus.$emit("modalShow", {
        ok: () => {
          if (!this.isHome) this.$router.push("/");
          this.REMOVE_LIST(this.indexList)
        }
      });
    },

    editListMove() {
      this.$router.push("/" + this.indexList);
    },

    addTodo() {
      const payload = {
        indexList: this.indexList,
        name: "Новый пункт",
        isActive: null
      }
      this.ADD_TODO(payload);
    },

    editTodoName({ indexTodo, name }) {
      const payload = {
        indexList: this.indexList,
        indexTodo: indexTodo,
        name,
      };
      this.EDIT_TODO_NAME(payload);
    },

    removeTodo({ indexTodo }) {
      const payload = {
        indexList: this.indexList,
        indexTodo: indexTodo
      };
      this.REMOVE_TODO(payload);
    }
  }
}
</script>

<style lang="scss">
.todo_list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    border-radius: 20px;
    background: #fff;

    &__name {
      width: 90%;
      margin-bottom: 20px;
      padding: 10px 0;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background: $todo-name-background;
      color: #fff;

      &__heading {
        margin: 0;
        height: 20px;
      }

      &__input {
        width: 90%;
        border: none;
        border-bottom: 1px solid #fff;
        font-size: 16px;
        font-weight: bold;
        background: none;
        color: #fff;
        outline: none;
      }

      &__actions {
        display: flex;
        justify-content: flex-end;
        padding: 10px 20px 0 20px;

        &__action {
          width: 30px;
          margin-right: 5px;
          cursor: pointer;

          &__img {
            width: 100%;
          }
        }
      }
    }

    &__todo {
      &__wrapper {
        width: 100%;
        padding: 0 15px 15px 15px;
        box-sizing: border-box;
      }
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    width: 20%;

    &__action {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background: $action-background;
      border-radius: 10px;
      margin-bottom: 10px;
      transition: .4s;
      user-select: none;
      cursor: pointer;

      &__img {
        width: 40px;
      }

      &.edit & {
        &__img {
          width: 30px;
        }
      }

      &.add & {
        &__img {
          width: 30px;
        }
      }

      &:hover {
        background: $action-hover-background;
      }
    }
  }
}
</style>