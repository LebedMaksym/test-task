<template>
  <header class="header d-flex align-center">
    <div class="container px-5 d-flex align-center justify-space-between">
      <div class="header__brand text-medium">
        Test App
      </div>
      <base-button
        v-if="authorized"
        no-border
        color="transparent"
        border-color="transparent"
        text="Logout"
        @click="logout"
      >
        <span class="material-icons ml-2">
          exit_to_app
        </span>
      </base-button>
    </div>
  </header>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import auth from "@/store/modules/auth";

@Component({ components: { BaseButton } })
export default class TheHeader extends Vue {

  get authorized(): boolean {
    return auth.isAuthorized;
  }

  logout(): void {
    auth.logout();
  }
}
</script>

<style lang="scss">
  .header {
    position: sticky;
    top: 0;
    z-index: 3;
    background: #3E374D;
    height: 60px;
    box-shadow: 0 1px 3px 1px rgba(0,0,0,0.4);

    &__brand {
      color: white;
      font-size: 20px;
    }
  }
</style>
