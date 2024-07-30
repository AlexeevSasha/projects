export interface IAuthorization {
    remember: boolean;
    login: string;
    password: string;
}

export interface IAuthData {
    isLoading: boolean;
    userInfo: IUserInfo;
    authData: IAuthInfo;
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
    remember: boolean;
}
