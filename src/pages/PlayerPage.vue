<template>
  <div>
    <button @click="play">
      >
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import LibraryService from "@/api/LibraryService";
import auth from "@/store/modules/auth";
import SpotifyPlayerLoader from "@/utils/SpotifyPlayerLoader";
import axiosInstance from "@/api/instance";

@Component
export default class MainPage extends Vue {
  songs = []
  currentDeviceId = ""

  async waitForSpotifyWebPlaybackSDKToLoad() {
    return new Promise(resolve => {
      if (window.Spotify) {
        resolve(window.Spotify)
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify)
        }
      }
    })
  }

  async initiatePlayer() {
    const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad()
    const sdk = new Player({
      name: "Test Web Playback SDK",
      volume: 1.0,
      getOAuthToken: callback => { callback(auth.accessToken) }
    })
    // Error handling
    sdk.addListener("initialization_error", ({ message }) => { console.log("Initialization_error: " + message) })
    sdk.addListener("authentication_error", ({ message }) => { console.log("Authentication_error: " + message) })
    sdk.addListener("account_error", ({ message }) => { console.log("Account_error: " + message) })
    sdk.addListener("playback_error", ({ message }) => { console.log("Playback_error: " + message) })
    // Playback status updates
    sdk.addListener("player_state_changed", state => {
      // Update UI information on player state changed
    })
    // Ready
    sdk.addListener("ready", ({ device_id }) => {
      this.currentDeviceId = device_id
      console.log(device_id);
      console.log("Ready with Device Id: ", device_id)
    })
    // Not Ready
    sdk.addListener("not_ready", ({ device_id }) => {
      console.log("Not ready with device Id: ", device_id)
    })
    sdk.connect()
  }

  async created() {
    const response = await LibraryService.getSavedSongs({
      offset: 0,
      limit: 20
    })

    const ms = Date.now()
    await SpotifyPlayerLoader()
    console.log(Date.now() - ms)
    this.songs = response.data.items;
    console.log(this.songs);
    await  this.initiatePlayer()

  }
  async play() {
    console.log(this.songs[0].track.uri);
    await axiosInstance.put("https://api.spotify.com/v1/me/player/play", {
      uris: [this.songs[0].track.uri]
    }, { params : {
      device_id : this.currentDeviceId
    }})
  }
}
</script>

<style scoped>

</style>
