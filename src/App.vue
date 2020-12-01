<template>
  <main class="main">
    <the-header v-if="this.$route.meta.showHeader" />
    <div class="main__gradient"></div>
    <router-view class="main__router-view" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import player from "@/store/modules/player";
import TheHeader from "@/components/TheHeader.vue";
@Component({
  components: {TheHeader}
})
export default class App extends Vue {
  async created(): Promise<void> {
    await player.initPlayer()
  }
}
</script>
<style lang="scss">
  .main {
    min-height: 100vh;
    background-image: linear-gradient(90deg, #c074b2, #8ab5e8);
    &__router-view {
      position: relative;
      z-index: 2;
    }

    &__gradient {
      z-index: 1;
      top: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: linear-gradient(transparent, #000);
    }
  }
</style>
