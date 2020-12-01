<template>
  <div class="login-page container pa-5">
    <template v-if="showAuthBtn">
      <p class="login-page__description">
        Please authorize with Spotify to have possibility to listen your music
      </p>
      <base-button
        class="mt-5"
        is-full-width
        text="Authorize"
        @click="goToAuth"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SpotifyAuthRequest } from "@/models/SpotifyModels";
import auth from "@/store/modules/auth";
import BaseButton from "@/components/BaseButton.vue";

const authScopes = [
  "user-read-playback-state",
  "user-library-read user-library-modify",
  "streaming app-remote-control",
  "user-read-email",
  "user-read-private",
  "ugc-image-upload"];

@Component({
  components: { BaseButton }
})
export default class LoginPage extends Vue {
  showAuthBtn = true

  authLinkBuilder(params : SpotifyAuthRequest) : string {
    let authLink = `${process.env.SPOTIFY_BASE_AUTH_API_URL}/authorize?`;
    for (const paramsKey in params) {
      authLink += `${paramsKey}=${params[paramsKey as keyof SpotifyAuthRequest]}&`;
    }
    return authLink.slice(0,-1);
  }
  goToAuth() : void {
    location.href = this.authLinkBuilder({
      client_id: process.env.SPOTIFY_APP_CLIENT_ID || "",
      redirect_uri: location.href,
      scope: authScopes.join(" "),
      response_type: "code"
    });
  }
  async created() : Promise<void> {
    const code = this.$route.query.code as string;
    if(code) {
      this.showAuthBtn = false;
      await this.$router.replace({ name: "Login", query: {} });
      await auth.getTokens({
        grant_type: "authorization_code",
        code : code,
        redirect_uri: location.href,
        client_secret: process.env.SPOTIFY_APP_CLIENT_SECRET ||"",
        client_id: process.env.SPOTIFY_APP_CLIENT_ID || ""
      });
    }
    if(auth.isAuthorized) {
      await this.$router.push({ name: "Player" });
    }
  }
}
</script>

<style lang="scss">
.login-page {
  max-width: 400px;
  &__description {
    text-align: center;
    color: white;
  }
}
</style>
