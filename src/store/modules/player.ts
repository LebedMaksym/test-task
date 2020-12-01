import {
  VuexModule,
  Module,
  getModule,
  Action, Mutation,
} from "vuex-module-decorators";
import AuthService from "@/api/AuthService";
import { SpotifyTokenRequest } from "@/models/SpotifyModels";
import store from "@/store/index"
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

}

export default getModule(Auth)

