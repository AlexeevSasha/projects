import { get } from "../baseRequest";

export const getUserInfo = async (token: string) => get(`${process.env.REACT_APP_IDENTITY}/connect/userinfo`, "application/json", token);
