import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "../index";
import auth from "@/store/modules/auth";

@Module({
  name: "appState",
  store
})

class AppState extends VuexModule {

}

export default getModule(AppState);
