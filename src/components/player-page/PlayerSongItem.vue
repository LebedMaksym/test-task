<template>
  <div class="player-song-item my-3">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <base-button
          :is-disabled="disableButton"
          :color="btnDetails.color"
          :border-color="btnDetails.color"
          class="mr-3"
          is-icon
          @click="$emit('click')"
        >
          <span class="material-icons">
            {{ btnDetails.icon }}
          </span>
        </base-button>
        <div v-if="image">
          <img
            class="player-song-item__image mr-3"
            :src="image"
            alt=""
          >
        </div>
        <div class="player-song-item__details d-flex flex-column  ">
          <span class="player-song-item__name text-medium">
            {{ track.name }}
          </span>
          <span
            v-if="track.artists.length"
            class="player-song-item__artist"
          >
            {{ track.artists[0].name }}
          </span>
        </div>
      </div>
      <div
        v-if="showDuration"
        class="player-song-item__duration ml-3"
      >
        {{ $parseDuration(track.duration_ms) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import { SpotifyTrack } from "@/models/SpotifyModels";
import player from "@/store/modules/player";

interface BtnDetails {
  icon: string,
  color: string
}

@Component({
  components: {
    BaseButton
  }
})
export default class PlayerSongItem extends Vue {
  @Prop() track!: SpotifyTrack
  @Prop({ default: true, type: Boolean }) showDuration! : boolean

  get isCurrentTrack(): boolean {
    return this.track.id === this.currentTrackId;
  }

  get isSongPlaying(): boolean {
    return player.isSongPlaying;
  }

  get disableButton(): boolean {
    return !player.currentDeviceId || player.isLoading;
  }

  get btnDetails(): BtnDetails {
    return {
      icon: this.isCurrentTrack && this.isSongPlaying ? "pause" : "play_arrow",
      color: this.isCurrentTrack && this.isSongPlaying ? "blue" : "#1DB954"
    };
  }

  get currentTrackId(): string {
    if (player.currentTrack) {
      return player.currentTrack.id;
    } else {
      return "";
    }
  }

  get image(): string {
    try {
      return this.track.album.images[0].url;
    } catch {
      return "";
    }
  }
}
</script>

<style lang="scss">

.player-song-item {
  &__details {
    font-size: 14px;
  }

  &__name {
    color: white;
  }
  &__artist {
    color: #c2c2c2;
  }

  &__image {
    height: 40px;
    width: 40px;
  }

  &__duration {
    color: #c2c2c2;
    font-size: 14px;
  }
}

</style>
