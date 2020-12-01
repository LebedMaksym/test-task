declare module "vue/types/vue" {
  interface Vue {
    $parseDuration: (duration: number) => string;
  }
}

export default {
  //eslint-disable-next-line
  install(Vue: any) {
    Vue.prototype.$parseDuration = (
      duration: number
    ): string => {
      const time = new Date(1000*Math.round(duration/1000));
      const minutes = time.getUTCMinutes();
      const seconds = time.getUTCSeconds();
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds }`;
    };
  }
};
