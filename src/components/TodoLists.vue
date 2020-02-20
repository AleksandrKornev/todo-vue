<template>
  <div class="todo_lists__wrapper">
    <div class="todo_lists">
      <template v-if="!isSingleList">
        <TodoList
          v-for="(todoList, index) in todoLists" :key="index"
          :todos="todoList.todos"
          :name="todoList.name"
          :indexList="index"
        />
        <CreateTodoList v-if="isCreateList" />
      </template>
      <template v-else>
        <TodoList
          v-for="(todoList, index) in todoLists" :key="index"
          :todos="todoList.todos"
          :name="todoList.name"
          :indexList="indexSingleList"
        />
      </template>
    </div>
  </div>
</template>

<script>
import TodoList from "./TodoList";
import CreateTodoList from "./CreateTodoList";

export default {
  name: "TodoLists",
  components: {
    TodoList,
    CreateTodoList
  },
  props: {
    todoLists: {
      type: Array
    },
    isCreateList: {
      type: Boolean
    },
    isSingleList: {
      type: Boolean
    },
    indexSingleList: {
      type: Number
    }
  }
}
</script>

<style lang="scss">
.todo_lists {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 100vh;
    padding: 30px;
    box-sizing: border-box;
    overflow-y: auto;
  }

  flex-shrink: 0;
  width: $todo-list-width;
}
</style>