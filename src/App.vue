<template>
  <main class="main">
    <the-header />
    <div class="main__gradient" />
    <router-view class="main__router-view" />
    <transition name="fade">
      <base-notification
        v-if="notification.showMessage"
        :message="notification.message"
        :color="notification.color"
      />
    </transition>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import player from "@/store/modules/player";
import TheHeader from "@/components/TheHeader.vue";
import BaseNotification from "@/components/BaseNotification.vue";
import appState, { Notification } from "@/store/modules/appState";
@Component({
  components: { BaseNotification, TheHeader }
})
export default class App extends Vue {

  get notification() : Notification {
    return appState.notification;
  }

  async created(): Promise<void> {
    await player.initPlayer();
  }
}
</script>
<style lang="scss">
  .main {
    position: relative;
    min-height: 100vh;
    height: 100%;
    background-image: linear-gradient(90deg, #c074b2, #8ab5e8);
    &__router-view {
      position: relative;
      z-index: 2;
    }

    &__gradient {
      top: 0;
      height: 100%;
      z-index: 1;
      width: 100%;
      position: absolute;
      background-image: linear-gradient(transparent, #000);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
