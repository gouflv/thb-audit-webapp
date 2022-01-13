import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/login/index.vue";
import Home from "../views/home/index.vue";
import User from "../views/user/index.vue";
import Project from "../views/project/index.vue";
import FaceResult from "../views/face-result/index.vue";
import Signature from "../views/signature/index.vue";
import Agreement from "../views/agreement/index.vue";
import AuditConfirm from "../views/audit-confirm/index.vue";
import { app } from "../store/app";

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
    path: "/project/:id",
    name: "Project",
    component: Project,
  },
  {
    path: "/face-result",
    name: "FaceResult",
    component: FaceResult,
  },
  {
    path: "/agreement/:id",
    name: "Agreement",
    component: Agreement,
  },
  {
    path: "/signature/:id",
    name: "Signature",
    component: Signature,
  },
  {
    path: "/audit-confirm/:id",
    name: "AuditConfirm",
    component: AuditConfirm,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!app.hasToken() && to.name !== "Login") {
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;
