import axios from "axios";
import auth from "@/store/modules/auth";
import Vue from "vue"
import router from "@/router"
import setAuthHeaders from "@/api/setAuthHeaders";

export const spotifyAuthInstance = axios.create({
  baseURL: process.env.SPOTIFY_BASE_AUTH_API_URL
})
export const spotifyInstance = axios.create({
  baseURL: process.env.SPOTIFY_BASE_API_URL
})

spotifyInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Vue.$cookies.get("refreshToken")
      if(refreshToken) {
        const accessToken = await auth.refreshAccessToken({
          grant_type: "refresh_token",
          refresh_token : refreshToken,
          client_secret: process.env.SPOTIFY_APP_CLIENT_SECRET ||"",
          client_id: process.env.SPOTIFY_APP_CLIENT_ID || ""
        })
        if(accessToken) {
          Vue.$cookies.set("accessToken", accessToken)
          setAuthHeaders(accessToken)
          return  spotifyInstance(error.config);
        }
        else {
          await router.push({name: "Login"})
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
)
