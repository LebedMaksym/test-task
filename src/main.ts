import Vue from "vue";
import VueRouter from "vue-router"
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies"
import durationToTimeParser from "@/plugins/durationToTimeParser";

import "./assets/scss/index.scss"
import "vue-slider-component/theme/default.css"


(window as any).onSpotifyWebPlaybackSDKReady = () => {
  console.log("initiated empty function");
}

Vue.use(durationToTimeParser)
Vue.use(VueCookies)
Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


