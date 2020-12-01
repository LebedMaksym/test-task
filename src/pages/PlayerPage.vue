<template>
  <div class="container pa-5">
    <player-song-item
      v-for="song in songsList"
      :key="song.track.id"
      :track="song.track"
      @click="songItemControlHandler(song.track)"
    />
    <player-controls
      v-if="currentTrack"
      @slider-update="sliderUpdatedHandler"
    />
    <button @click="getRandomTrack">
      Get random track
    </button>
    <div v-if="currentRandomTrack">
      <div>
        {{ currentRandomTrack.name }}
      </div>
      <div>
        {{ currentRandomTrack.artists[0].name }}
      </div>
      <button @click="saveSong(currentRandomTrack.id)">
        like
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import player from "@/store/modules/player";
import { SpotifyTrack, SpotifySong } from "@/models/SpotifyModels";
import BaseButton from "@/components/BaseButton.vue";
import PlayerSongItem from "@/components/player-page/PlayerSongItem.vue";
import PlayerControls from "@/components/player-page/PlayerControls.vue";

@Component({
  components: {
    PlayerControls,
    PlayerSongItem,
    BaseButton

  }
})
export default class PlayerPage extends Vue {
    loading = false
    interval: any = 0

    get songsList() : SpotifySong[] {
      return player.songsList
    }
    get currentRandomTrack() : SpotifyTrack | null {
      return player.currentRandomTrack
    }

    get currentTrack() : SpotifyTrack | null {
      return player.currentTrack
    }

    get isSongPlaying(): boolean {
      return player.isSongPlaying
    }

    startBouncer() {
      const currentTrackDuration = this.currentTrack?.duration_ms || 0
      this.interval = setInterval(() => {
        if(player.currentTrackProgressTime + 500 >= currentTrackDuration ) {
          player.setCurrentTrackProgressTime(currentTrackDuration)
          player.setCurrentTrackProgressTime(0)
          player.setIsSongPlaying(false)
          clearInterval(this.interval)
          return
        }
        player.setCurrentTrackProgressTime(player.currentTrackProgressTime + 500)
      }, 500)
    }

    async sliderUpdatedHandler(progress: number) {
      clearInterval(this.interval)
      const success = await player.playSong()
      if(success) {
        this.startBouncer()
      }
    }

    async songItemControlHandler(track: SpotifyTrack) {
      const isCurrentTrack = this.currentTrack && this.currentTrack.id === track.id
      if(isCurrentTrack && this.isSongPlaying) {
        const success = await player.pauseSong()
        if(success) {
          clearInterval(this.interval)
        }
      }
      else if(isCurrentTrack && !this.isSongPlaying) {
        const success = await player.playSong()
        if(success) {
          this.startBouncer()
        }
      }
      else {
        clearInterval(this.interval)
        player.setCurrentTrack(track)
        player.setCurrentTrackProgressTime(0)
        const success = await player.playSong()
        if(success) {
          this.startBouncer()
        }
      }
    }


    getRandomTrack() {
      player.getRandomTrack()
    }

    async saveSong(id: string) {
      await player.saveSong(id)
      await player.getSongsList({
        offset: 0,
        limit: 10
      })
    }

    async created() : Promise<void>  {
      this.loading = true
      await player.getSongsList({
        offset: 0,
        limit: 10
      })
      this.loading = false
    }

}
</script>

<style scoped>

</style>
