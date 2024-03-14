import { IUser } from "@/modules/user/interfaces/user";

export interface IAuthSighIn extends Pick<IUser, "email"> {
  password: string;
}
export interface IAuthSighUp extends Pick<IUser, "email" | "lastname" | "firstname"> {
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  access_token: string;
}
