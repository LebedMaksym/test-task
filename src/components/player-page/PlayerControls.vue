<template>
  <div class="player-controls my-3">
    <div class="player-controls__song-details d-flex justify-center">
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
          class="text-center mt-1"
        >
          {{ currentTrack.artists[0].name }}
        </div>
      </div>
    </div>
    <div class="d-flex justify-space-between mt-2">
      <span class="player-controls__time mr-3">{{ $parseDuration(currentProgressTime) }}</span>
      <vue-slider
        v-model="currentProgressTime"
        :max="currentTrack.duration_ms"
        :dot-size="10"
        tooltip="none"
        :lazy="true"
        class="player-controls__slider"
      />
      <span class="player-controls__time ml-4">{{ $parseDuration(currentTrack.duration_ms) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import BaseButton from "@/components/BaseButton.vue";
import VueSlider from "vue-slider-component";
import { SpotifyTrack } from "@/models/SpotifyModels";
import player from "@/store/modules/player";

@Component({
  components: {
    BaseButton,
    VueSlider
  }
})
export default class PlayerControls extends Vue {

  get currentTrack(): SpotifyTrack | null {
    return player.currentTrack
  }

  get currentProgressTime() {
    return player.currentTrackProgressTime
  }
  set currentProgressTime(time: number) {
    player.setCurrentTrackProgressTime(time)
    this.$emit("slider-update", time)
  }

  get image(): string {
    if (this.currentTrack?.album.images) {
      return this.currentTrack.album.images[0].url
    } else return ""
  }

}
</script>

<style lang="scss">
.player-controls {
  &__song-details {
    color: white;
    font-size: 18px;
  }

  &__image {
    height: 60px;
    width: 60px;
  }

  &__slider {
    flex: 1 0;
  }
  &__time {
    color: white;
    font-size: 14px;
  }
}

</style>
