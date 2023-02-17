/* routes 부분을 수정해주었다. */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Board from "../views/Board.vue";
import BoardList from "../views/board/List.vue";
import BoardDetail from "../views/board/Detail.vue";
import Todo from "../views/todo/Todo.vue";
import TodoView from "../views/todo/TodoView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/", // 라우트경로
    name: "home", // 라우트 명칭
    component: Home // 라우트에 해당하는 컴포넌트
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/board1",
    name: "board",
    component: Board
  },
  {
    path: "/board",
    name: "board-list",
    component: BoardList
  },
  {
    path: "/board/:id",
    name: "board-detail",
    component: BoardDetail
  },
  {
    path: "/todo",
    name: "todo",
    component: Todo
  },
  {
    path: "/todo/:id",
    name: "todo-id",
    component: TodoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
