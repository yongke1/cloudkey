import VueRouter from "vue-router";
import routes from "./router";
import Vue from "@assets/js/element/element"
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;


