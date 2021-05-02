import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Actu from "../views/Actu.vue";
import About from "../views/About.vue";
import Profil from "../views/Profil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Actu",
    name: "Actu",
    component: Actu,
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/Profil/:userid",
    name: "Profil",
    component: Profil,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
