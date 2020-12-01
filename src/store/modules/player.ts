import {
  VuexModule,
  Module,
  getModule,
  Action, Mutation,
} from "vuex-module-decorators";
import store from "@/store/index";
import auth from "@/store/modules/auth";
import SpotifyService from "@/api/services/SpotifyService";
import { SpotifySavedSongsRequest, SpotifySong, SpotifyTrack, SpotifyTrackListPagination } from "@/models/SpotifyModels";
import appState from "@/store/modules/appState";

@Module({
  namespaced: true,
  name: "player",
  dynamic: true,
  store
}
)
class Player extends VuexModule {
    currentRandomTrack: SpotifyTrack | null = null
    currentTrack: SpotifyTrack | null = null
    currentTrackProgressTime = 0;
    currentDeviceId = ""
    isSongPlaying = false
    songsList: SpotifySong[] = []
    isLoading = false
    pagination: SpotifyTrackListPagination = {
      hasNext: false,
      hasPrevious: false,
      offset: 0,
      total: 0
    }

    @Mutation
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    }

    @Mutation
    setPagination(pagination: SpotifyTrackListPagination) {
      this.pagination = pagination;
    }

    @Mutation
    setCurrentTrack(track: SpotifyTrack) {
      this.currentTrack = track;
    }

    @Mutation
    setIsSongPlaying(isSongPlaying: boolean) {
      this.isSongPlaying = isSongPlaying;
    }

    @Mutation
    setCurrentTrackProgressTime(time: number) {
      this.currentTrackProgressTime = time;
    }

    @Mutation
    setCurrentDeviceId(id: string) {
      this.currentDeviceId = id;
    }

    @Mutation
    setSongsList(songsList: SpotifySong []) {
      this.songsList = songsList;
    }

    @Mutation
    setRandomSong(randomTrack: SpotifyTrack) {
      this.currentRandomTrack = randomTrack;
    }

    @Action
    async playSong() {
      try {
        if (this.currentTrack) {
          await SpotifyService.playSong({
            device_id: this.currentDeviceId,
            uris: [this.currentTrack.uri],
            position_ms: this.currentTrackProgressTime,
          });
          this.setIsSongPlaying(true);
          return true;
        }
      } catch {
        return false;
      }
    }

    @Action
    async pauseSong() {
      try {
        await SpotifyService.pauseSong(this.currentDeviceId);
        this.setIsSongPlaying(false);
        return true;
      } catch(e) {
        return false;
      }
    }

    @Action({ commit: "setRandomSong" })
    async getRandomTrack() {
      const characters = "abcdefghijklmnopqrstuvwxyz";
      const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
      let randomSearch = "";

      switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + "%";
        break;
      case 1:
        randomSearch = "%" + randomCharacter + "%";
        break;
      }

      try {
        const response = await SpotifyService.getRandomTrack(randomSearch);
        if (response.data.tracks.items.length) {
          return response.data.tracks.items[0];
        }
      } catch (e) {
        appState.setNotification({
          message: e.message || e.toString(),
          showMessage: true
        });
        return null;
      }
    }

    @Action({ commit: "setSongsList" })
    async getSongsList(payload: SpotifySavedSongsRequest) {
      try {
        this.setLoading(true);
        const response = await SpotifyService.getSavedSongs(payload);
        this.setPagination({
          hasPrevious: Boolean(response.data.previous),
          hasNext: Boolean(response.data.next),
          total: response.data.total,
          offset: response.data.offset
        });
        this.setLoading(false);
        return response.data.items;
      } catch(e) {
        this.setLoading(false);
        appState.setNotification({
          message: e.message || e.toString(),
          showMessage: true
        });
        return [];
      }
    }

    @Action
    async initPlayer() {
      const waitForSpotifyWebPlaybackSDKToLoad = async() => {
        return new Promise((resolve) => {
          if (window.Spotify) {
            resolve(window.Spotify);
          } else {
            window.onSpotifyWebPlaybackSDKReady = () => {
              resolve(window.Spotify);
            };
          }
        });
      };
      const spotify: any = await waitForSpotifyWebPlaybackSDKToLoad();
      const player = new spotify.Player({
        name: "Spotify Player",
        getOAuthToken: (callback: (token: string) => void) => {
          callback(auth.accessToken);
        }
      });
      player.addListener("ready", ({ device_id }: Spotify.WebPlaybackInstance) => {
        this.setCurrentDeviceId(device_id);
      });

      player.addListener("not_ready", () => {
        appState.setNotification({
          message: "Unable connect to Spotify player",
          showMessage: true
        });
      });
      await player.connect();
    }

    @Action
    async saveSong(id: string) {
      try {
        await SpotifyService.saveSong(id);
        return true;
      } catch(e) {
        appState.setNotification({
          message: e.message || e.toString(),
          showMessage: true
        });
        return false;
      }
    }
}

export default getModule(Player);

