import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import ByTodoList from "@/views/ByTodoList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:index",
    name: "ByTodoList",
    component: ByTodoList
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
