
export interface IAuthorization {
  login: string;
  password: string;
}

export interface AuthState {
  alert: IAlertState;
  isLoading: boolean;
  authInfo: IAuthInfo;
  userInfo: IUserInfo;
}

export interface IAuthInfo {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

export interface IUserInfo {
  name: string;
  picture: string;
  policy: string;
  alert: string;
}

export interface IAuthDataResponse {
  userInfoResponse: IUserInfo;
  authDataResponse: IAuthInfo;
}

export interface IAlertState {
  message: string;
  type: "success" | "info" | "warning" | "error" | undefined;
}
