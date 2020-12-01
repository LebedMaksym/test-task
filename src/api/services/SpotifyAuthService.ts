import { spotifyAuthInstance as axios } from "@/api/instances";
import { SpotifyRefreshTokenRequest, SpotifyTokenRequest } from "@/models/SpotifyModels";

export default {
  getTokens(payload : SpotifyTokenRequest) {
    return axios.post("/api/token",
      `grant_type=authorization_code&code=${payload.code}&redirect_uri=${payload.redirect_uri}`,
      {
        headers: {
          "Authorization": "Basic " + btoa(`${payload.client_id}:${payload.client_secret}`),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
  },
  refreshToken(payload: SpotifyRefreshTokenRequest) {
    return axios.post("/api/token",
      `grant_type=refresh_token&refresh_token=${payload.refresh_token}`, {
        headers: {
          "Authorization": "Basic " + btoa(`${payload.client_id}:${payload.client_secret}`),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
  }
};
