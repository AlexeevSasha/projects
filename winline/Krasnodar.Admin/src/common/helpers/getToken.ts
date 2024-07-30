import store from "./../../core/redux/store";

export const getToken = () => store.getState().authData.authData.access_token;
