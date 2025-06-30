import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminForm from "../components/AdminForm.vue";
import UserForm from "../components/UserForm.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminForm,
  },
  {
    path: "/survey",
    name: "survey",
    component: UserForm,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/survey",
    name: "user-survey",
    component: () => import("../views/UserSurvey.vue"),
  },
  {
    path: "/admin",
    name: "admin-survey",
    component: () => import("../views/AdminSurvey.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
