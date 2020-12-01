import moment from "moment-timezone";
import appState from "@/store/modules/appState";

declare module "vue/types/vue" {
  interface Vue {
    $convertDate: (date: string | Date, format?: string) => string;
    $convertDateToUTC: (date: string | Date, format?: string) => string;
  }
}

export default {
  //eslint-disable-next-line
  install(Vue: any) {
    Vue.prototype.$convertDate = (
      date: string,
      format?: string | undefined
    ): string => {
      return moment
        .tz(date, "UTC")
        .clone()
        .tz(appState.userTimeZone)
        .format(format || moment.defaultFormatUtc);
    };
    Vue.prototype.$convertDateToUTC = (
      date: string,
      format?: string
    ): string => {
      return moment
        .tz(date, appState.userTimeZone)
        .clone()
        .tz("UTC")
        .format(format || moment.defaultFormatUtc);
    };
  }
};
