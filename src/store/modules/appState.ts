import {
  VuexModule,
  Module,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "../index";

export interface Notification {
  showMessage: boolean
  message: string
  color?: string
}

@Module({
  name: "appState",
  namespaced: true,
  dynamic: true,
  store
})
class AppState extends VuexModule {

  notification: Notification = {
    showMessage: false,
    message: ""
  }

  @Mutation
  setNotification(notification: Notification) {
    this.notification = notification;

  }
}

export default getModule(AppState);
