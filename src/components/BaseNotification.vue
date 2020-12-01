<template>
  <div
    class="notification d-flex justify-center align-center pa-0"
  >
    <div
      class="notification__content px-4 py-3"
      :style="{ background : color }"
    >
      <p class="text-center">{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import appState from "@/store/modules/appState";

@Component
export default class BaseNotification extends Vue {
  @Prop({ default : false }) message! : string;
  @Prop({ default : "#ed4e15" }) color! : string;

  created() {
    setTimeout(() => {
      appState.setNotification({
        message : "",
        showMessage: false
      });
    }, 3000);
  }
}
</script>

<style lang="scss">
  .notification {
    position: fixed;
    width: 100%;
    z-index: 3;
    top: 70px;
    &__content {
      max-width: 200px;
      border-radius: 6px;
      box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.4);
      color: white;
    }
  }
</style>
