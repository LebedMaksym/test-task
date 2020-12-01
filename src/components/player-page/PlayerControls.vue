<template>
  <div class="player-controls align-end d-flex my-3">
    <div class="player-controls__song-details d-flex align-end justify-center">
      <div class="d-flex flex-column align-center">
        <template v-if="image">
          <img
            class="player-controls__image"
            :src="image"
            alt="Track cover"
          >
        </template>
        <div class="text-center mt-3">
          {{ currentTrack.name }}
        </div>
        <div
          v-if="currentTrack.artists.length"
          class="text-center mt-3"
        >
          {{ currentTrack.artists[0].name }}
        </div>
      </div>
    </div>
    <div class="player-controls__track-controls ml-10 flex-1-0 align-center">
      <div class="d-flex justify-center">
        <base-button
          is-icon
          border-color="white"
          color="transparent"
          @click="$emit('click')"
        >
          <span class="material-icons">
            {{ isSongPlaying ? 'pause' : 'play_arrow' }}
          </span>
        </base-button>
      </div>
      <div class="d-flex flex-1-0 mt-2">
        <span class="player-controls__time mr-3">{{ $parseDuration(currentProgressTime) }}</span>
        <vue-slider
          v-model="currentProgressTime"
          :max="currentTrack.duration_ms"
          :dot-size="10"
          tooltip="none"
          :lazy="true"
          class="player-controls__slider flex-1-0"
        />
        <span class="player-controls__time ml-4">
          {{ $parseDuration(currentTrack.duration_ms) }}
        </span>
      </div>
    </div>
    <base-button
      v-if="currentTrack.is_random"
      class="player-controls__like-btn"
      color="white"
      :is-disabled="currentTrack.is_saved"
      text-color="#f95402"
      no-border
      border-color="#f95402"
      is-icon
      @click="saveTrack"
    >
      <span class="material-icons">
        {{ currentTrack.is_saved ? 'favorite' : 'favorite_border' }}
      </span>
    </base-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import VueSlider from "vue-slider-component";
import { SpotifyTrack } from "@/models/SpotifyModels";
import player from "@/store/modules/player";
import appState from "@/store/modules/appState";

@Component({
  components: {
    BaseButton,
    VueSlider
  }
})
export default class PlayerControls extends Vue {

  get currentTrack(): SpotifyTrack | null {
    return player.currentTrack;
  }

  get isSongPlaying(): boolean {
    return player.isSongPlaying;
  }

  get currentProgressTime(): number {
    return player.currentTrackProgressTime;
  }

  set currentProgressTime(time: number) {
    player.setCurrentTrackProgressTime(time);
    this.$emit("slider-update", time);
  }

  get image(): string {
    if (this.currentTrack?.album.images) {
      return this.currentTrack.album.images[0].url;
    } else {
      return "";
    }
  }

  async saveTrack(): Promise<void> {
    if (this.currentTrack) {
      const success = await player.saveSong(this.currentTrack.id);
      if (success) {
        player.setCurrentTrack({ ...this.currentTrack, is_saved: true });
        await player.getSongsList({
          offset: 0,
          limit: 10
        });
        appState.setNotification({
          message: "Successfuly saved track",
          showMessage: true,
          color: "#1DB954"
        });
      }
    }
  }

}
</script>

<style lang="scss">
@import "src/assets/scss/mixins";

.player-controls {
  @include xs {
    margin-bottom: 0.75em;
    flex-direction: column;
    align-items: center;
  }

  &__song-details {
    color: white;
    width: 200px;
    font-size: 18px;
    @include xs {
      font-size: 14px;
    }
  }

  &__track-controls {
    @include xs {
      width: 100%;
      margin-top: 0.5rem;
      margin-left: 0;
    }
  }

  &__image {
    height: 60px;
    width: 60px;
  }

  &__slider {
    width: 100%;
  }

  &__time {
    color: white;
    font-size: 14px;
  }

  &__like-btn {
    top: 20px;
    right: 20px;
    position: absolute;
  }
}

</style>
