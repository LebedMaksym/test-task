import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import auth from "@/store/modules/auth";
import setAuthHeaders from "@/api/setAuthHeaders";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "loginPage" */ "../pages/LoginPage.vue"),
    meta: {
      title: "Login",
      showHeader: false
    }
  },
  {
    path: "/",
    name: "Player",
    component: () =>
      import(/* webpackChunkName: "loginPage" */ "../pages/PlayerPage.vue"),
    meta: {
      showHeader: true,
      title: "Player",
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

router.beforeEach(async(to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  if(!auth.isAuthorized && to.name !== "Login") {
    const accessToken = Vue.$cookies.get("accessToken")
    const refreshToken = Vue.$cookies.get("refreshToken")
    if(refreshToken && accessToken) {
      setAuthHeaders(accessToken)
      auth.setAccessToken(accessToken)
      auth.setRefreshToken(refreshToken)
      auth.setIsAuthorized(true)
      next()
    }
    else {
      next({ name: "Login" })
    }
  }
  else {
    next()
  }
})


export default router;
