<template>
  <div class="player-page container pa-3">
    <template v-if="currentTrack">
      <player-controls
        class="mb-10"
        @slider-update="sliderUpdatedHandler"
        @click="songItemControlHandler(currentTrack)"
      />
    </template>
    <div
      v-if="loading"
      class="player-page__preloader d-flex justify-center align-center"
    >
      <base-spinner />
    </div>
    <template v-else>
      <div class="d-flex justify-center">
        <base-button
          :is-disabled="!currentDeviceId || loading || isPlaybackLoading"
          color="transparent"
          border-color="white"
          text="Play random track"
          @click="playRandomTrack"
        >
          <span class="material-icons">
            play_arrow
          </span>
        </base-button>
      </div>
      <template v-if="songsList.length">
        <div class="player-page__songs-list">
          <player-song-item
            v-for="song in songsList"
            :key="song.track.id"
            :track="song.track"
            @click="songItemControlHandler(song.track)"
          />
        </div>
        <player-songs-pagination v-if="pagination.hasPrevious || pagination.hasNext" />
      </template>
      <div
        v-else
        class="d-flex justify-center mt-5 color-white"
      >
        No saved songs
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import player from "@/store/modules/player";
import { SpotifyTrack, SpotifySong, SpotifyTrackListPagination } from "@/models/SpotifyModels";
import BaseButton from "@/components/BaseButton.vue";
import PlayerSongItem from "@/components/player-page/PlayerSongItem.vue";
import PlayerControls from "@/components/player-page/PlayerControls.vue";
import BaseSpinner from "@/components/BaseSpinner.vue";
import PlayerSongsPagination from "@/components/player-page/PlayerSongsPagination.vue";

@Component({
  components: {
    PlayerSongsPagination,
    BaseSpinner,
    PlayerControls,
    PlayerSongItem,
    BaseButton
  }
})
export default class PlayerPage extends Vue {

  interval: any = 0

  get songsList(): SpotifySong[] {
    return player.songsList;
  }

  get pagination() : SpotifyTrackListPagination {
    return player.pagination;
  }

  get loading(): boolean {
    return player.isLoading;
  }

  get isPlaybackLoading() : boolean {
    return player.isPlaybackLoading;
  }

  get currentDeviceId(): string {
    return player.currentDeviceId;
  }

  get currentTrack(): SpotifyTrack | null {
    return player.currentTrack;
  }

  get isSongPlaying(): boolean {
    return player.isSongPlaying;
  }

  async playRandomTrack() : Promise<void> {
    await player.getRandomTrack();
    if(player.currentRandomTrack) {
      player.setIsSongPlaying(false);
      await this.songItemControlHandler({ ...player.currentRandomTrack, is_random : true });
    }
  }

  startBouncer(): void {
    const currentTrackDuration = this.currentTrack?.duration_ms || 0;
    this.interval = setInterval(() => {
      if (player.currentTrackProgressTime + 500 >= currentTrackDuration) {
        player.setCurrentTrackProgressTime(currentTrackDuration);
        player.setCurrentTrackProgressTime(0);
        player.setIsSongPlaying(false);
        clearInterval(this.interval);
        return;
      }
      player.setCurrentTrackProgressTime(player.currentTrackProgressTime + 500);
    }, 500);
  }

  async sliderUpdatedHandler() : Promise<void> {
    clearInterval(this.interval);
    const success = await player.playSong();
    if (success) {
      this.startBouncer();
    }
  }

  async songItemControlHandler(track: SpotifyTrack): Promise<void> {
    const isCurrentTrack = this.currentTrack && this.currentTrack.id === track.id;
    if (isCurrentTrack && this.isSongPlaying) {
      const success = await player.pauseSong();
      if (success) {
        clearInterval(this.interval);
      }
    } else if (isCurrentTrack && !this.isSongPlaying) {
      const success = await player.playSong();
      if (success) {
        this.startBouncer();
      }
    } else {
      clearInterval(this.interval);
      player.setCurrentTrack(track);
      player.setCurrentTrackProgressTime(0);
      const success = await player.playSong();
      if (success) {
        this.startBouncer();
      }
    }
  }

  created() {
    player.getSongsList({
      offset: 0,
      limit: 10
    });
  }
}
</script>

<style lang="scss">
.player-page {
  &__preloader {
    min-height: 550px;
  }
  &__line-separator {
    height: 1px;
    background: black;
  }
}
</style>
