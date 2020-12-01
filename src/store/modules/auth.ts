import {
  VuexModule,
  Module,
  getModule,
  Action, Mutation,
} from "vuex-module-decorators";
import AuthService from "@/api/services/SpotifyAuthService";
import { SpotifyTokenRequest, SpotifyRefreshTokenRequest } from "@/models/SpotifyModels";
import store from "@/store/index"
import router from "@/router"
import Vue from "vue"
import setAuthHeaders from "@/api/setAuthHeaders";

@Module({
  namespaced: true,
  name: "auth",
  dynamic: true,
  store
}

)
class Auth extends VuexModule {
  isAuthorized = false
  accessToken = ""
  refreshToken = ""

  @Mutation
  setAccessToken(token: string) {
    this.accessToken = token
  }

  @Mutation
  setRefreshToken(token: string) {
    this.refreshToken = token
  }

  @Mutation
  setIsAuthorized(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized
  }

  @Action
  async logout() {
    Vue.$cookies.remove("accessToken")
    Vue.$cookies.remove("refreshToken")
    setAuthHeaders("")
    this.setAccessToken("")
    this.setRefreshToken("")
    this.setIsAuthorized(false)
    await router.push({name: "Login"})
  }

  @Action
  async getTokens(payload: SpotifyTokenRequest) {
    try {
      const response = await AuthService.getTokens(payload)
      this.setAccessToken(response.data.access_token)
      this.setRefreshToken(response.data.refresh_token)
      this.setIsAuthorized(true)
      Vue.$cookies.set("accessToken", this.accessToken)
      Vue.$cookies.set("refreshToken", this.refreshToken)
      setAuthHeaders(this.accessToken)
    }
    catch  {
      return
    }
  }

  @Action({commit: "setAccessToken"})
  async refreshAccessToken(payload: SpotifyRefreshTokenRequest) {
    try {
      const response = await AuthService.refreshToken(payload)
      return response.data.access_token
    }
    catch {
      return null
    }
  }
}

export default getModule(Auth)

