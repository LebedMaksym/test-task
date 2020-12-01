<template>
  <header class="header d-flex align-center">
    <div class="container px-5 d-flex align-center justify-space-between">
      <div class="header__brand text-medium">
        Test App
      </div>
      <base-button
        text="Logout"
        @click="logout"
      />
    </div>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import BaseButton from "@/components/BaseButton.vue";
import auth from "@/store/modules/auth";
@Component({
  components: {BaseButton}
})
export default class TheHeader extends Vue {
  logout(): void {
    auth.logout()
  }
}
</script>

<style lang="scss">
  .header {
    position: relative;
    z-index: 2;
    background: #3E374D;
    height: 60px;
    box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.4);

    &__brand {
      color: white;
      font-size: 20px;
    }
  }
</style>
