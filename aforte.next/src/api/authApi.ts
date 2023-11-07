import { api } from "./baseApi";

export const authLogin = (body: any) =>
  api.post("users/authenticate/login", body);

  export const authSMSCode = (body: any) =>
  api.post("users/authenticate/confirm", body);
