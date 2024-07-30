import store from './../../core/redux/store';


export const getToken = () => {
  // const tokenStr = sessionStorage.getItem("auth_data") ? sessionStorage.getItem("auth_data") : localStorage.getItem('auth_data');
  // const token = tokenStr ? JSON.parse(tokenStr) : '';

  // return token.access_token;

  return store.getState().authData.authData.access_token;
};
