import Vue from "vue";
import Vuex from "vuex";

import { recordStorage, readStorage } from "@/services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoLists: []
  },
  mutations: {
    INIT(state) {
      let todoLists = readStorage("todoLists");
      if (!todoLists || !Array.isArray(todoLists)) {
        todoLists = [];
        recordStorage("todoLists", todoLists);
      }

      state.todoLists = todoLists;
    },

    REMOVE_LIST(state, indexList) {
      let todoLists = state.todoLists;
      todoLists.splice(indexList, 1);

      state.todoLists = todoLists;
      recordStorage("todoLists", todoLists);
    },

    ADD_LIST(state, payload) {
      if (!("name" in payload && "todos" in payload)) return;
      let todoLists = [...state.todoLists];
      todoLists.push(payload);
      
      state.todoLists = todoLists;
      recordStorage("todoLists", todoLists);
    },

    EDIT_LIST_NAME(state, payload) {
      const { indexList, name } = payload;
      const list = state.todoLists[indexList];
      
      list.name = name;
      recordStorage("todoLists", state.todoLists);
    },

    ADD_TODO(state, payload) {
      if (!("name" in payload && "isActive" in payload && "indexList" in payload)) return;
      const { indexList, name, isActive } = payload;
      let todoList = [...state.todoLists[indexList].todos];
      todoList.push({ name, isActive });
      
      state.todoLists[indexList].todos = todoList;
      recordStorage("todoLists", state.todoLists);
    },

    EDIT_TODO_ACTIVE(state, payload) {
      const { indexList, indexTodo } = payload;
      const todo = state.todoLists[indexList].todos[indexTodo];
      
      todo.isActive = !todo.isActive;
      recordStorage("todoLists", state.todoLists);
    },

    EDIT_TODO_NAME(state, payload) {
      const { indexList, indexTodo, name } = payload;
      const todo = state.todoLists[indexList].todos[indexTodo];
      
      todo.name = name;
      recordStorage("todoLists", state.todoLists);
    },

    REMOVE_TODO(state, payload) {
      const { indexList, indexTodo } = payload;
      const todoList = [...state.todoLists[indexList].todos];

      todoList.splice(indexTodo, 1);
      
      state.todoLists[indexList].todos.push({ });
      state.todoLists[indexList].todos = todoList;
      recordStorage("todoLists", state.todoLists);
    },
  }
})
