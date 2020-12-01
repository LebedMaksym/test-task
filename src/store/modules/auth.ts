import {
  VuexModule,
  Module,
  Action,
} from "vuex-module-decorators";
import AuthService from "@/api/AuthService";
import { SpotifyTokenRequest } from "@/models/SpotifyModels";

@Module({
  namespaced: true,
  stateFactory: true,
})
export default class Auth extends VuexModule {

  @Action
  async  getTokens(payload: SpotifyTokenRequest) {
    const response = await AuthService.getTokens(payload)
    console.log(response);
  }
}

