import { IBuildAuthData, IBuildRefresh } from "../interfaces/IAuthRefresh";

export const buildAuthDataRequest = (dataUser: IBuildAuthData | IBuildRefresh) => {
  return "password" in dataUser
    ? "client_id=admin.client" +
        `&client_secret=${process.env.REACT_APP_API_SECRET}` +
        "&grant_type=password" +
        "&scope=openid profile offline_access admin-api policy clubsync-api" +
        `&username=${dataUser.login}` +
        `&password=${dataUser.password}`
    : "client_id=admin.client" +
        `&client_secret=${process.env.REACT_APP_API_SECRET}` +
        "&grant_type=refresh_token" +
        `&refresh_token=${dataUser.refreshToken}`;
};
