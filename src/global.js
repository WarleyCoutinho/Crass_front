import Vue from "vue";

export const userKey = "__crass";
// export const baseApiUrl = "http://192.168.12.200:3000";
const hostname = window.location.hostname;
export const baseApiUrl = `http://${hostname}:3000`;

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data });
  } else if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}

export default {
  baseApiUrl,
  showError,
  userKey,
};
