import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/login/index.vue";
import Home from "../views/home/index.vue";
import User from "../views/user/index.vue";
import Project from "../views/project/index.vue";
import Signature from "../views/signature/index.vue";
import Agreement from "../views/agreement/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
  },
  {
    path: "/agreement",
    name: "Agreement",
    component: Agreement,
  },
  {
    path: "/signature",
    name: "Signature",
    component: Signature,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
