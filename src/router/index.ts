import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Dashboard",
  //   component: () =>
  //   meta: {
  //     title: "Dashboard",
  //     showInNav: true,
  //     icon: "mdi-monitor-dashboard"
  //   }
  // }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});


export default router;
