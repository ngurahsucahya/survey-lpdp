import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminForm from "../components/AdminForm.vue";
import UserForm from "../components/UserForm.vue";
import FaqView from "../views/FaqView.vue";
import GuidelineView from "../views/GuidelineView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/faq",
    name: "faq",
    component: FaqView,
  },
  {
    path: "/guideline",
    name: "Guideline",
    component: GuidelineView,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
