import { spotifyInstance as axios} from "@/api/instances";
import { SpotifySavedSongsRequest, SpotifyPlayRequest } from "@/models/SpotifyModels";

export default {
  getSavedSongs(payload : SpotifySavedSongsRequest) {
    return axios.get("me/tracks", {
      params: {
        offset: payload.offset,
        limit: payload.limit,
      }
    })
  },

  getRandomTrack(query : string) {
    return axios.get("/search",  {
      params : {
        q: query,
        type: "track",
        offset: Math.floor(Math.random() * 1000),
        limit: 1
      }
    })
  },

  playSong(payload: SpotifyPlayRequest) {
    return axios.put("me/player/play", {
      uris: payload.uris,
      position_ms: payload.position_ms
    }, {
      params: {
        device_id: payload.device_id
      }
    })
  },

  pauseSong(device_id : string) {
    return axios.put("me/player/pause", {}, {
      params : {
        device_id
      }
    })
  }
}
